package nh.example.webappdemo.api;

import org.springframework.http.ResponseEntity;

public record ApiError(String msg) {
    public static ResponseEntity<?> badRequest(String msg) {

        return ResponseEntity.badRequest().body(new ApiError(msg));
    }
}
