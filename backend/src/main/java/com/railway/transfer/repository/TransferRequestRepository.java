package com.railway.transfer.repository;

import com.railway.transfer.model.TransferRequest;
import com.railway.transfer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransferRequestRepository extends JpaRepository<TransferRequest, Long> {

    // Get all requests by a specific user
    List<TransferRequest> findByUser(User user);

    // Get all OPEN requests for searching/matching
    List<TransferRequest> findByStatus(TransferRequest.Status status);

    // Search by desired zone
    List<TransferRequest> findByDesiredZoneAndStatus(
        String desiredZone, TransferRequest.Status status);

    // Search by desired zone and station
    List<TransferRequest> findByDesiredZoneAndDesiredStationAndStatus(
        String desiredZone, String desiredStation, TransferRequest.Status status);
}