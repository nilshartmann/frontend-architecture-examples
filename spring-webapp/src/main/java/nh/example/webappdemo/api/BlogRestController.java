package nh.example.webappdemo.api;

import nh.example.webappdemo.blog.BlogPost;
import nh.example.webappdemo.blog.BlogPostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<?> getPost(@PathVariable int postId, @RequestParam Optional<Long> slowDown) {
        log.info("Read post '{}'", postId);

        slowDown.ifPresent(this::sleep);

        var post = blogPostRepository.getPostById(postId);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }

        var prevPostId = postId > 1 ? (postId - 1) : null;
        var nextPostId = postId < blogPostRepository.getPostCount() ?  (postId + 1) : null;

        return ResponseEntity.ok(new GetBlogPostResponse(post, prevPostId, nextPostId));
    }

    public record TocItem(int id, String title) {}
    public record TocResponse(List<TocItem> items){}

    @GetMapping("/api/toc")
    public ResponseEntity<?> getToc(@RequestParam("order_by") Optional<String> orderBy) {

        var posts = blogPostRepository.getPosts(orderBy.orElse("asc"));
        var items = posts.stream().map(p -> new TocItem(p.id(), p.title())).toList();

        return ResponseEntity.ok(new TocResponse(items));
    }

    record GetPostIdsResponse(List<Integer> postIds) {
    }

    @GetMapping("/api/post-ids")
    public ResponseEntity<?> getPostIds() {
        log.info("Reading post ids");
        var postIds = blogPostRepository.getPostIds();
        return ResponseEntity.ok(new GetPostIdsResponse(postIds));
    }

    public record SubscribeToNewsletterRequest(String email) {}

    @PostMapping("/api/newsletter/subscription")
    public ResponseEntity<?> subscribeToNewsletter(@RequestBody SubscribeToNewsletterRequest request, @RequestParam Optional<Long> slowDown) {
        log.info("Subscribe to newsletter... {}", request);

        slowDown.ifPresent(this::sleep);

        if (request.email()==null || request.email().isBlank()) {
            return ApiError.badRequest("Please fill in correct e-mail address");
        }

        return ResponseEntity.ok(null);
    }

    private void sleep(long timeout) {
        try {
            Thread.sleep(timeout);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

    }
}
