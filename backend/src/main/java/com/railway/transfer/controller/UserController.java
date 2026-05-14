package com.railway.transfer.controller;

import com.railway.transfer.model.UpdateProfileRequest;
import com.railway.transfer.model.User;
import com.railway.transfer.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Get current user profile
    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(Authentication authentication) {
        return ResponseEntity.ok(
            userService.getProfile(authentication.getName()));
    }

    // Update current user profile
    @PutMapping("/profile")
    public ResponseEntity<String> updateProfile(
            @RequestBody UpdateProfileRequest request,
            Authentication authentication) {
        return ResponseEntity.ok(
            userService.updateProfile(authentication.getName(), request));
    }
}