package com.railway.transfer.controller;

import com.railway.transfer.model.TransferRequest;
import com.railway.transfer.model.User;
import com.railway.transfer.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // Get all unverified users
    @GetMapping("/unverified-users")
    public ResponseEntity<List<User>> getUnverifiedUsers() {
        return ResponseEntity.ok(adminService.getUnverifiedUsers());
    }

    // Get all users
    @GetMapping("/all-users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    // Verify a user by ID
    @PutMapping("/verify/{userId}")
    public ResponseEntity<String> verifyUser(@PathVariable Long userId) {
        return ResponseEntity.ok(adminService.verifyUser(userId));
    }

    // Reject / unverify a user
    @PutMapping("/reject/{userId}")
    public ResponseEntity<String> rejectUser(@PathVariable Long userId) {
        return ResponseEntity.ok(adminService.rejectUser(userId));
    }

    // Get all transfer requests
    @GetMapping("/all-transfers")
    public ResponseEntity<List<TransferRequest>> getAllTransfers() {
        return ResponseEntity.ok(adminService.getAllTransferRequests());
    }

    // Approve a transfer request
    @PutMapping("/approve-transfer/{requestId}")
    public ResponseEntity<String> approveTransfer(@PathVariable Long requestId) {
        return ResponseEntity.ok(adminService.approveTransfer(requestId));
    }

    // Close a transfer request
    @PutMapping("/close-transfer/{requestId}")
    public ResponseEntity<String> closeTransfer(@PathVariable Long requestId) {
        return ResponseEntity.ok(adminService.closeTransfer(requestId));
    }
}