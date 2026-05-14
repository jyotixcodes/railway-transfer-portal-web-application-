package com.railway.transfer.model;

public record TransferRequestDTO(
    String desiredZone,
    String desiredStation,
    String reason
) {}