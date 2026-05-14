package com.railway.transfer.service;

import com.railway.transfer.model.*;
import com.railway.transfer.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // ... rest of the methods stay the same

    public String register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email()))
            throw new RuntimeException("Email already registered");

        if (userRepository.existsByEmployeeId(request.employeeId()))
            throw new RuntimeException("Employee ID already registered");

        if (userRepository.existsByPfNumber(request.pfNumber()))
            throw new RuntimeException("PF Number already registered");

        User user = User.builder()
                .employeeId(request.employeeId())
                .pfNumber(request.pfNumber())
                .name(request.name())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .designation(request.designation())
                .department(request.department())
                .currentZone(request.currentZone())
                .currentStation(request.currentStation())
                .verified(false)
                .role(User.Role.EMPLOYEE)
                .build();

        userRepository.save(user);
        return "Registration successful. Await admin verification.";
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.password(), user.getPassword()))
            throw new RuntimeException("Invalid email or password");

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        return new AuthResponse(token, user.getRole().name(),
                                user.getName(), user.isVerified());
    }
}