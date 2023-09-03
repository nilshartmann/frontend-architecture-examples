package nh.example.webappdemo.commentservice;

import org.springframework.stereotype.Repository;

import java.util.LinkedList;
import java.util.List;

@Repository
public class CommentRepository {
    private List<Comment> comments = List.of(
        new Comment(1, 1, "Klaus", "Great article, very helpful!"),
        new Comment(2, 1, "Susi", "Well written, sad that flex box is missing here"),
        new Comment(3, 2, "Kathy", "On point, thanks a lot"),
        new Comment(4, 2, "Daniel", "Bla bla bla nothing new here"),
        new Comment(5, 3, "Sarah", "The future is state!"),
        new Comment(6, 3, "Daisy", "I'd still prefer redux as in the good old days")
    );

    public List<Comment> findCommentsForBlog(int postId) {
        return comments.stream().filter(c -> c.postId() == postId).toList();
    }

    public void addComment(int postId, String name, String comment) {
        var id = comments.size() + 1;
        var newComments = new LinkedList<>(comments);
        newComments.add(new Comment(id, postId, name, comment));
        this.comments = newComments;
    }
}
