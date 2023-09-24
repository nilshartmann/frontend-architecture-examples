package nh.example.commentservice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Think of this as a remote service (that might be slow or unavailable for some time)
 */
@RestController
@CrossOrigin(originPatterns = "http://localhost:[*]")
@Validated
public class CommentController {

    private static final Logger log = LoggerFactory.getLogger(CommentController.class);

    private final CommentRepository commentRepository;

    public CommentController(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @GetMapping("/api/comments/{postId}")
    public List<Comment> getCommentsForPost(@PathVariable int postId, @RequestParam Optional<Long> slowDown) {
        log.info("Reading posts for comment {}", postId);

        slowDown.ifPresent(this::sleep);

        return this.commentRepository.findCommentsForBlog(postId);
    }

    public record NewCommentData(String name, String comment) {}

    @PostMapping("/api/comments/{postId}")
    public ResponseEntity<?> addCommentForPost(@PathVariable int postId, @RequestBody NewCommentData data, @RequestParam Optional<Long> slowDown) {
        log.info("Create Comment for post {}: {}", postId, data);

        slowDown.ifPresent(this::sleep);

        if (data.name() == null || data.name().trim().isBlank()) {
            return ResponseEntity.badRequest().body(new ApiError("Please provide name"));
        }

        if (data.comment() == null || data.comment.length() <3 ) {
            return ResponseEntity.badRequest().body(new ApiError("Comment must be at least three chars"));
        }


        this.commentRepository.addComment(postId, data.name(), data.comment());

        return ResponseEntity.created(null).build();
    }

    private void sleep(long timeout) {
        try {
            Thread.sleep(timeout);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

    }

}
