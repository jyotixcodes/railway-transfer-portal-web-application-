package com.railway.transfer.service;

import com.railway.transfer.model.*;
import com.railway.transfer.repository.*;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TransferService {

    private final TransferRequestRepository transferRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public TransferService(TransferRequestRepository transferRepository,
                           UserRepository userRepository,
                           NotificationService notificationService) {
        this.transferRepository = transferRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    public TransferRequest postRequest(String email, TransferRequestDTO dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isVerified())
            throw new RuntimeException("Your account is not verified yet.");

        TransferRequest request = new TransferRequest();
        request.setUser(user);
        request.setDesiredZone(dto.desiredZone());
        request.setDesiredStation(dto.desiredStation());
        request.setReason(dto.reason());
        request.setStatus(TransferRequest.Status.OPEN);

        TransferRequest saved = transferRepository.save(request);

        // Send notification to the user
        notificationService.sendNotification(user,
            "Your transfer request to " + dto.desiredZone() +
            " - " + dto.desiredStation() + " has been posted successfully.");

        // Check for potential matches and notify
        checkAndNotifyMatches(saved, user);

        return saved;
    }

    // Check if any existing open request matches this new one
    private void checkAndNotifyMatches(TransferRequest newRequest, User newUser) {
        List<TransferRequest> potentialMatches = transferRepository
            .findByDesiredZoneAndStatus(
                newUser.getCurrentZone(),
                TransferRequest.Status.OPEN);

        for (TransferRequest match : potentialMatches) {
            // Don't match with yourself
            if (match.getUser().getId().equals(newUser.getId())) continue;

            // Check if the other person wants to come to our zone
            if (match.getDesiredZone().equalsIgnoreCase(newUser.getCurrentZone()) ||
                match.getDesiredZone().equalsIgnoreCase(newRequest.getDesiredZone())) {

                // Notify both users
                notificationService.sendNotification(newUser,
                    "Potential match found! " + match.getUser().getName() +
                    " from " + match.getUser().getCurrentZone() +
                    " wants to transfer to your zone.");

                notificationService.sendNotification(match.getUser(),
                    "Potential match found! " + newUser.getName() +
                    " from " + newUser.getCurrentZone() +
                    " wants to transfer to your zone.");
            }
        }
    }

    public List<TransferRequest> getMyRequests(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return transferRepository.findByUser(user);
    }

    public List<TransferRequest> searchRequests(String zone, String station) {
        if (station != null && !station.isEmpty()) {
            return transferRepository
                .findByDesiredZoneAndDesiredStationAndStatus(
                    zone, station, TransferRequest.Status.OPEN);
        }
        return transferRepository
            .findByDesiredZoneAndStatus(zone, TransferRequest.Status.OPEN);
    }

    public List<TransferRequest> getAllOpenRequests() {
        return transferRepository.findByStatus(TransferRequest.Status.OPEN);
    }

    public TransferRequest closeRequest(Long requestId, String email) {
        TransferRequest request = transferRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (!request.getUser().getEmail().equals(email))
            throw new RuntimeException("You can only close your own requests");

        request.setStatus(TransferRequest.Status.CLOSED);
        return transferRepository.save(request);
    }
}