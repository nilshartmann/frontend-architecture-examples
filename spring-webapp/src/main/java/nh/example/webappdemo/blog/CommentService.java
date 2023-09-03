package nh.example.webappdemo.blog;

import jakarta.validation.constraints.Size;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

/**
 * Think of this as a remote service (that might be slow or unavailable for some time)
 */
@Service
public class CommentService {

    private static final Logger log = LoggerFactory.getLogger(CommentService.class);

    private final RestClient restClient;

    public CommentService() {
        this.restClient = RestClient.builder().
            baseUrl("http://localhost:8081/api/comments")
            .build();
    }

    public List<Comment> getCommentsForPost(int postId) {
        var comments = this.restClient.get()
            .uri("/{id}", postId)
            .retrieve()
            .body(new ParameterizedTypeReference<List<Comment>>() {
            });

        log.info("Comments received {}", comments);

        return comments;
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

    record AddCommentRequestBody(String name, String comment) {
    }

    public void addCommentForPost(int postId, @Size(min = 3) String name, String comment) {
        log.info("Creating comment name: '{}', comment: '{}'", name, comment);
        var result = this.restClient.post()
            .uri("/{id}", postId)
            .body(new AddCommentRequestBody(name, comment))
            .retrieve().toBodilessEntity().getStatusCode();

        log.info("Post Comment returned status code {}", result);
        // irl we would handle the result here, but for our demo is not needed
    }

}
