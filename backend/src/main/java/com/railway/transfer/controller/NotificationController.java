package com.railway.transfer.controller;

import com.railway.transfer.model.Notification;
import com.railway.transfer.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    // Get all notifications
    @GetMapping
    public ResponseEntity<List<Notification>> getAll(Authentication authentication) {
        return ResponseEntity.ok(
            notificationService.getMyNotifications(authentication.getName()));
    }

    // Get unread notifications
    @GetMapping("/unread")
    public ResponseEntity<List<Notification>> getUnread(Authentication authentication) {
        return ResponseEntity.ok(
            notificationService.getUnreadNotifications(authentication.getName()));
    }

    // Get unread count (for bell icon)
    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> getCount(Authentication authentication) {
        long count = notificationService.countUnread(authentication.getName());
        return ResponseEntity.ok(Map.of("unreadCount", count));
    }

    // Mark one as read
    @PutMapping("/read/{id}")
    public ResponseEntity<String> markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
        return ResponseEntity.ok("Notification marked as read.");
    }

    // Mark all as read
    @PutMapping("/read-all")
    public ResponseEntity<String> markAllAsRead(Authentication authentication) {
        notificationService.markAllAsRead(authentication.getName());
        return ResponseEntity.ok("All notifications marked as read.");
    }
}