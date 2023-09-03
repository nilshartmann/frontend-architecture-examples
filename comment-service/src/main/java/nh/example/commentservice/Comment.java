package nh.example.commentservice;

public record Comment(int id, int postId, String name, String comment) {
}
