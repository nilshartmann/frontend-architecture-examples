package nh.example.webappdemo.web;

import nh.example.webappdemo.blog.BlogPostRepository;
import nh.example.webappdemo.commentservice.CommentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/steps/15")
public class BlogController15 {

    private static final Logger log = LoggerFactory.getLogger(BlogController15.class);

    private final BlogPostRepository blogPostRepository;
    private final CommentService commentService;

    public BlogController15(BlogPostRepository blogPostRepository, CommentService commentService) {
        this.blogPostRepository = blogPostRepository;
        this.commentService = commentService;
    }

    public record CommentFormData(String name, String comment) {
        static CommentFormData empty() {
            return new CommentFormData("", "");
        }
    }

    @GetMapping("")
    public String index() {
        return "redirect:/steps/15/post/1";
    }

    @GetMapping("post/{postId}")
    public ModelAndView getPost(@PathVariable int postId) {
        log.info("Post Id {}", postId);

        var modelAndView = populateModel(postId);

        return modelAndView;
    }

    @PostMapping("post/{postId}")
    public ModelAndView addComment(@PathVariable int postId, @ModelAttribute("commentFormData") CommentFormData commentFormData) {
        log.info("COMMENT FORM DATA {}", commentFormData);

        try {
            commentService.addCommentForPost(postId, commentFormData.name(), commentFormData.comment());
        } catch (Exception ex) {
            log.error("Could not add comment: " + ex, ex);

            var error = "Could not save comment: " + ex.getLocalizedMessage();
            var model = populateModel(postId);
            model.getModelMap().addAttribute("commentFormData", commentFormData);
            model.getModelMap().addAttribute("commentFormError", error);
            return model;
        }

        return populateModel(postId);
    }

    @GetMapping("post/{postId}/comments")
    public ModelAndView getComments(@PathVariable int postId) {
        var comments = commentService.getCommentsForPostFromRemoteServiceThatIsVerySlow(postId);
        log.info("Comments received {}", comments);
        var model = new ModelAndView("steps/10/comments");
        model.getModelMap().addAttribute("comments", comments);
        return model;
    }

    public record NewsletterFormData(String email) {
    }

    @PostMapping("post/subscribe")
    public ModelAndView subscribeToNewsletter(
        @ModelAttribute("newsletterFormData") NewsletterFormData newsletterFormData) {
        log.info("Subscribte to newsletter {}", newsletterFormData);

        var model = new ModelAndView("/steps/15/blogpost :: newsletterForm");
        if (!newsletterFormData.email().contains("@")) {
            model.getModelMap().addAttribute("newsletterFormDataErrorMsg", "Please enter valid email adress!");
            model.getModelMap().addAttribute("newsletterFormData", newsletterFormData);
        } else {
            model.getModelMap().addAttribute("newsletterFormDataMsg", "Succesfully subscribed!");
        }
        return model;
    }

    private ModelAndView populateModel(int postId) {
        var modelAndView = new ModelAndView("/steps/15/blogpost");
        var model = modelAndView.getModelMap();
        var post = blogPostRepository.getPostById(postId);

        model.addAttribute("postId", postId);
        model.addAttribute("post", post);
        model.addAttribute("commentFormData", CommentFormData.empty());


        if (postId > 1) {
            model.addAttribute("prevUrl", "/steps/15/post/" + (postId - 1));
        }
        if (postId < blogPostRepository.getPostCount()) {
            model.addAttribute("nextUrl", "/steps/15/post/" + (postId + 1));
        }

        return modelAndView;

    }
}
