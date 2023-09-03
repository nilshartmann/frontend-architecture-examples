package nh.example.webappdemo.blog;

public record Comment(int id, int postId, String name, String comment) {
}
