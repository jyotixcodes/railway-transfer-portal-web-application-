package com.railway.transfer.service;

import com.railway.transfer.model.TransferRequest;
import com.railway.transfer.model.User;
import com.railway.transfer.repository.TransferRequestRepository;
import com.railway.transfer.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final TransferRequestRepository transferRepository;

    public AdminService(UserRepository userRepository,
                        TransferRequestRepository transferRepository) {
        this.userRepository = userRepository;
        this.transferRepository = transferRepository;
    }

    // Get all unverified users
    public List<User> getUnverifiedUsers() {
        return userRepository.findByVerified(false);
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Verify a user
    public String verifyUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setVerified(true);
        userRepository.save(user);
        return "User " + user.getName() + " has been verified successfully.";
    }

    // Reject / unverify a user
    public String rejectUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setVerified(false);
        userRepository.save(user);
        return "User " + user.getName() + " has been rejected.";
    }

    // Get all transfer requests
    public List<TransferRequest> getAllTransferRequests() {
        return transferRepository.findAll();
    }

    // Approve a transfer request
    public String approveTransfer(Long requestId) {
        TransferRequest request = transferRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus(TransferRequest.Status.APPROVED);
        transferRepository.save(request);
        return "Transfer request " + requestId + " has been approved.";
    }

    // Close a transfer request
    public String closeTransfer(Long requestId) {
        TransferRequest request = transferRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus(TransferRequest.Status.CLOSED);
        transferRepository.save(request);
        return "Transfer request " + requestId + " has been closed.";
    }
}