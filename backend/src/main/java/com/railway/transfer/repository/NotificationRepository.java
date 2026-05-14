package com.railway.transfer.repository;

import com.railway.transfer.model.Notification;
import com.railway.transfer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // Get all notifications for a user
    List<Notification> findByUserOrderByCreatedAtDesc(User user);

    // Get only unread notifications
    List<Notification> findByUserAndIsRead(User user, boolean isRead);

    // Count unread notifications
    long countByUserAndIsRead(User user, boolean isRead);
}