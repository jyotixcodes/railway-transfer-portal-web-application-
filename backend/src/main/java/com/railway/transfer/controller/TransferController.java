package com.railway.transfer.controller;

import com.railway.transfer.model.TransferRequest;
import com.railway.transfer.model.TransferRequestDTO;
import com.railway.transfer.service.TransferService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/transfer")
@CrossOrigin(origins = "http://localhost:3000")
public class TransferController {

    private final TransferService transferService;

    public TransferController(TransferService transferService) {
        this.transferService = transferService;
    }

    // Post a new transfer request
    @PostMapping("/post")
    public ResponseEntity<TransferRequest> postRequest(
            @RequestBody TransferRequestDTO dto,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(transferService.postRequest(email, dto));
    }

    // Get my own requests
    @GetMapping("/my-requests")
    public ResponseEntity<List<TransferRequest>> getMyRequests(
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(transferService.getMyRequests(email));
    }

    // Get all open requests
    @GetMapping("/all")
    public ResponseEntity<List<TransferRequest>> getAllOpen() {
        return ResponseEntity.ok(transferService.getAllOpenRequests());
    }

    // Search by zone and optional station
    @GetMapping("/search")
    public ResponseEntity<List<TransferRequest>> search(
            @RequestParam String zone,
            @RequestParam(required = false) String station) {
        return ResponseEntity.ok(transferService.searchRequests(zone, station));
    }

    // Close a request
    @PutMapping("/close/{id}")
    public ResponseEntity<TransferRequest> closeRequest(
            @PathVariable Long id,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(transferService.closeRequest(id, email));
    }
}
