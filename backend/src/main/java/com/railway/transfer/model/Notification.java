package com.railway.transfer.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String message;

    private boolean isRead = false;

    private LocalDateTime createdAt = LocalDateTime.now();

    // ── Constructors ──────────────────────────────────────
    public Notification() {}

    public Notification(User user, String message) {
        this.user = user;
        this.message = message;
        this.isRead = false;
        this.createdAt = LocalDateTime.now();
    }

    // ── Getters ───────────────────────────────────────────
    public Long getId()                 { return id; }
    public User getUser()               { return user; }
    public String getMessage()          { return message; }
    public boolean isRead()             { return isRead; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    // ── Setters ───────────────────────────────────────────
    public void setId(Long id)                      { this.id = id; }
    public void setUser(User user)                  { this.user = user; }
    public void setMessage(String message)          { this.message = message; }
    public void setRead(boolean read)               { this.isRead = read; }
    public void setCreatedAt(LocalDateTime t)       { this.createdAt = t; }
}