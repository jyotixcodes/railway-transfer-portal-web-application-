package com.railway.transfer.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "transfer_requests")
public class TransferRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String desiredZone;
    private String desiredStation;
    private String reason;

    @Enumerated(EnumType.STRING)
    private Status status = Status.OPEN;

    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Status {
        OPEN, MATCHED, APPROVED, CLOSED
    }

    // ── Constructors ──────────────────────────────────────
    public TransferRequest() {}

    // ── Getters ───────────────────────────────────────────
    public Long getId()                  { return id; }
    public User getUser()                { return user; }
    public String getDesiredZone()       { return desiredZone; }
    public String getDesiredStation()    { return desiredStation; }
    public String getReason()            { return reason; }
    public Status getStatus()            { return status; }
    public LocalDateTime getCreatedAt()  { return createdAt; }

    // ── Setters ───────────────────────────────────────────
    public void setId(Long id)                        { this.id = id; }
    public void setUser(User user)                    { this.user = user; }
    public void setDesiredZone(String desiredZone)    { this.desiredZone = desiredZone; }
    public void setDesiredStation(String s)           { this.desiredStation = s; }
    public void setReason(String reason)              { this.reason = reason; }
    public void setStatus(Status status)              { this.status = status; }
    public void setCreatedAt(LocalDateTime t)         { this.createdAt = t; }
}