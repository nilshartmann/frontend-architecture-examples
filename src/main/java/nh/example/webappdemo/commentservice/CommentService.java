package nh.example.webappdemo.commentservice;

import jakarta.validation.constraints.Size;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

/**
 * Think of this as a remote service (that might be slow or unavailable for some time)
 */
@Service
@Validated
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> getCommentsForPost(int postId) {
        return this.commentRepository.findCommentsForBlog(postId);
    }

    public void addCommentForPost(int postId, @Size(min = 3) String name, String comment) {
        this.commentRepository.addComment(postId, name, comment);
    }

}
