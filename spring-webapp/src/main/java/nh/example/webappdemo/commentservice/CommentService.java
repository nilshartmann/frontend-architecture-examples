package nh.example.webappdemo.commentservice;

import jakarta.validation.constraints.Size;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

/**
 * Think of this as a remote service (that might be slow or unavailable for some time)
 */
@Service
@Validated
public class CommentService {

    private static final Logger log = LoggerFactory.getLogger(CommentService.class);

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> getCommentsForPost(int postId) {
        return this.commentRepository.findCommentsForBlog(postId);
    }

    public List<Comment> getCommentsForPostFromRemoteServiceThatIsVerySlow(int postId) {
        log.info("Waiting for remote service to retrieve comments");
        try {
            Thread.sleep(2500);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        return getCommentsForPost(postId);
    }


    public void addCommentForPost(int postId, @Size(min = 3) String name, String comment) {
        this.commentRepository.addComment(postId, name, comment);
    }

}
