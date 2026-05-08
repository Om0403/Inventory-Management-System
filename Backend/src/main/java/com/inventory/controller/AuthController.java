package com.inventory.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public String login(@RequestBody LoginRequest request) {

        System.out.println("==== LOGIN DEBUG ====");
        System.out.println("Username: " + request.getUsername());
        System.out.println("Password: " + request.getPassword());

        if (request.getUsername() == null || request.getPassword() == null) {
            throw new RuntimeException("Request body is missing fields");
        }

        if ("admin".equals(request.getUsername()) &&
                "admin123".equals(request.getPassword())) {

            return "dummy-token";
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}