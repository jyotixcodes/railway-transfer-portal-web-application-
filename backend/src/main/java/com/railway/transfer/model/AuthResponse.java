package com.railway.transfer.model;

public record AuthResponse(
    String token,
    String role,
    String name,
    boolean verified
) {}