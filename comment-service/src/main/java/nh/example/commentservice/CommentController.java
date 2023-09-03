package nh.example.commentservice;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

/**
 * Think of this as a remote service (that might be slow or unavailable for some time)
 */
@RestController
@Validated
public class CommentController {

    private static final Logger log = LoggerFactory.getLogger(CommentController.class);

    private final CommentRepository commentRepository;

    public CommentController(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @GetMapping("/api/comments/{postId}")
    public List<Comment> getCommentsForPost(@PathVariable int postId) {
        log.info("Reading posts for comment {}", postId);

        return this.commentRepository.findCommentsForBlog(postId);
    }

    public record NewCommentData(@Size(min = 3) String name, String comment) {}

    @PostMapping("/api/comments/{postId}")
    public ResponseEntity<?> addCommentForPost(@PathVariable int postId, @Valid @RequestBody NewCommentData data) {
        log.info("Create Comment for post {}: {}", postId, data);

        this.commentRepository.addComment(postId, data.name(), data.comment());

        return ResponseEntity.created(null).build();
    }

    private static void sleep() {
        try {
            Thread.sleep(2500);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

    }

}
