package com.railway.transfer.model;

public record RegisterRequest(
    String employeeId,
    String pfNumber,
    String name,
    String email,
    String password,
    String designation,
    String department,
    String currentZone,
    String currentStation
) {}