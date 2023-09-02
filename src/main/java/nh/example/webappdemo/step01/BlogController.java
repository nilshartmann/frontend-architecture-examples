package nh.example.webappdemo.step01;

import nh.example.webappdemo.BlogPostRepository;
import nh.example.webappdemo.comments.CommentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/steps/01")
public class BlogController {

    private static final Logger log = LoggerFactory.getLogger(BlogController.class);

    private final BlogPostRepository blogPostRepository;
    private final CommentService commentService;

    public BlogController(BlogPostRepository blogPostRepository, CommentService commentService) {
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
        return "redirect:/steps/01/post/1";
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

    public record NewsletterFormData(String email) {
    }

    // PROBLEM:
    //   to populate the model, we need postId 😱
    //   is this great from architecture point-of-view?
    @PostMapping("post/subscribe")
    public ModelAndView subscribeToNewsletter(
        @RequestParam int postId,
        @ModelAttribute("newsletterFormData") NewsletterFormData newsletterFormData) {

        log.info("Subscribte to newsletter {}", newsletterFormData);

        // PROBLEM 2:
        //   we'd like to redirect to original page (without 'post/subscribe')
        //   but we cannot (easily) because then we could not send the
        //   success message

        var model = populateModel(postId);
        model.getModelMap().addAttribute("newsletterFormDataMsg", "Succesfully subscribed!");

        return model;
    }

    private ModelAndView populateModel(int postId) {
        var modelAndView = new ModelAndView("steps/01/blogpost");
        var model = modelAndView.getModelMap();
        var post = blogPostRepository.getPostById(postId);
        var comments = commentService.getCommentsForPost(postId);

        model.addAttribute("postId", postId);
        model.addAttribute("post", post);
        model.addAttribute("comments", comments);
        model.addAttribute("commentFormData", CommentFormData.empty());


        if (postId > 1) {
            model.addAttribute("prevUrl", "/steps/01/post/" + (postId - 1));
        }
        if (postId < blogPostRepository.getPostCount()) {
            model.addAttribute("nextUrl", "/steps/01/post/" + (postId + 1));
        }

        return modelAndView;

    }
}
