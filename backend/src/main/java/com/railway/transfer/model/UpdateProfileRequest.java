package com.railway.transfer.model;

public record UpdateProfileRequest(
    String name,
    String designation,
    String department,
    String currentZone,
    String currentStation
) {}