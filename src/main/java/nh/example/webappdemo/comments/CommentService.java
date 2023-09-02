package nh.example.webappdemo.comments;

import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Think of this as a remote service (that might be slow or unavailable for some time)
 */
@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> getCommentsForPost(int postId) {
        return this.commentRepository.findCommentsForBlog(postId);
    }

}
