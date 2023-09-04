package nh.example.webappdemo.api;

import nh.example.webappdemo.blog.BlogPost;
import nh.example.webappdemo.blog.BlogPostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(originPatterns = "http://localhost:[*]")
public class BlogRestController {

    private static final Logger log = LoggerFactory.getLogger(BlogRestController.class);

    private final BlogPostRepository blogPostRepository;

    public BlogRestController(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }

    record GetBlogPostResponse(BlogPost post, Integer prevPostId, Integer nextPostId) {
    }

    @GetMapping("/api/post/{postId}")
    public ResponseEntity<?> getPost(@PathVariable int postId) {
        log.info("Read post '{}'", postId);

        var post = blogPostRepository.getPostById(postId);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }

        var prevPostId = postId > 1 ? (postId - 1) : null;
        var nextPostId = postId < blogPostRepository.getPostCount() ?  (postId + 1) : null;

        return ResponseEntity.ok(new GetBlogPostResponse(post, prevPostId, nextPostId));
    }
}
