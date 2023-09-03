package nh.example.webappdemo.web;

import nh.example.webappdemo.blog.BlogPostRepository;
import nh.example.webappdemo.blog.CommentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller("steps/01")
@RequestMapping("/steps/01")
public class BlogController01 {

    private static final Logger log = LoggerFactory.getLogger(BlogController01.class);

    private final BlogPostRepository blogPostRepository;
    private final CommentService commentService;

    public BlogController01(BlogPostRepository blogPostRepository, CommentService commentService) {
        this.blogPostRepository = blogPostRepository;
        this.commentService = commentService;
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

    private ModelAndView populateModel(int postId) {
        var modelAndView = new ModelAndView("/steps/01/blogpost");
        var model = modelAndView.getModelMap();
        var post = blogPostRepository.getPostById(postId);
        var comments = commentService.getCommentsForPost(postId);

        model.addAttribute("postId", postId);
        model.addAttribute("post", post);
        model.addAttribute("comments", comments);


        if (postId > 1) {
            model.addAttribute("prevUrl", "/steps/01/post/" + (postId - 1));
        }
        if (postId < blogPostRepository.getPostCount()) {
            model.addAttribute("nextUrl", "/steps/01/post/" + (postId + 1));
        }

        return modelAndView;

    }
}
