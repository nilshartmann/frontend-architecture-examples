package nh.example.webappdemo.step01;

import nh.example.webappdemo.BlogPostRepository;
import nh.example.webappdemo.comments.CommentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

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

    @GetMapping("")
    public String index() {
        return "redirect:/steps/01/post/1";
    }

    @GetMapping("post/{postId}")
    public String post(@PathVariable int postId, Model model) {
        log.info("Post Id {}", postId);

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


        return "steps/01/blogpost";
    }
}
