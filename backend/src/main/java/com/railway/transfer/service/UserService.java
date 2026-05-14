package com.railway.transfer.service;

import com.railway.transfer.model.UpdateProfileRequest;
import com.railway.transfer.model.User;
import com.railway.transfer.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getProfile(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public String updateProfile(String email, UpdateProfileRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.name() != null && !request.name().isEmpty())
            user.setName(request.name());

        if (request.designation() != null && !request.designation().isEmpty())
            user.setDesignation(request.designation());

        if (request.department() != null && !request.department().isEmpty())
            user.setDepartment(request.department());

        if (request.currentZone() != null && !request.currentZone().isEmpty())
            user.setCurrentZone(request.currentZone());

        if (request.currentStation() != null && !request.currentStation().isEmpty())
            user.setCurrentStation(request.currentStation());

        userRepository.save(user);
        return "Profile updated successfully.";
    }
}