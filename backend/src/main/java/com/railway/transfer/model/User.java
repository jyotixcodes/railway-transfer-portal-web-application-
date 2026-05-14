package com.railway.transfer.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "users")
public class User {
	
	
	

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String employeeId;

    @Column(unique = true, nullable = false)
    private String pfNumber;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    private String designation;
    private String department;
    private String currentZone;
    private String currentStation;

    private boolean verified = false;

    @Enumerated(EnumType.STRING)
    private Role role = Role.EMPLOYEE;

    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Role {
        EMPLOYEE, ADMIN
    }

    // ── Constructors ──────────────────────────────────────
    public User() {}

    private User(Builder builder) {
        this.employeeId    = builder.employeeId;
        this.pfNumber      = builder.pfNumber;
        this.name          = builder.name;
        this.email         = builder.email;
        this.password      = builder.password;
        this.designation   = builder.designation;
        this.department    = builder.department;
        this.currentZone   = builder.currentZone;
        this.currentStation = builder.currentStation;
        this.verified      = builder.verified;
        this.role          = builder.role;
    }

    // ── Getters ───────────────────────────────────────────
    public Long getId()                  { return id; }
    public String getEmployeeId()        { return employeeId; }
    public String getPfNumber()          { return pfNumber; }
    public String getName()              { return name; }
    public String getEmail()             { return email; }
    public String getPassword()          { return password; }
    public String getDesignation()       { return designation; }
    public String getDepartment()        { return department; }
    public String getCurrentZone()       { return currentZone; }
    public String getCurrentStation()    { return currentStation; }
    public boolean isVerified()          { return verified; }
    public Role getRole()                { return role; }
    public LocalDateTime getCreatedAt()  { return createdAt; }

    // ── Setters ───────────────────────────────────────────
    public void setId(Long id)                        { this.id = id; }
    public void setEmployeeId(String employeeId)      { this.employeeId = employeeId; }
    public void setPfNumber(String pfNumber)          { this.pfNumber = pfNumber; }
    public void setName(String name)                  { this.name = name; }
    public void setEmail(String email)                { this.email = email; }
    public void setPassword(String password)          { this.password = password; }
    public void setDesignation(String designation)    { this.designation = designation; }
    public void setDepartment(String department)      { this.department = department; }
    public void setCurrentZone(String currentZone)    { this.currentZone = currentZone; }
    public void setCurrentStation(String s)           { this.currentStation = s; }
    public void setVerified(boolean verified)         { this.verified = verified; }
    public void setRole(Role role)                    { this.role = role; }
    public void setCreatedAt(LocalDateTime t)         { this.createdAt = t; }

    // ── Builder ───────────────────────────────────────────
    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String employeeId;
        private String pfNumber;
        private String name;
        private String email;
        private String password;
        private String designation;
        private String department;
        private String currentZone;
        private String currentStation;
        private boolean verified = false;
        private Role role = Role.EMPLOYEE;

        public Builder employeeId(String v)     { this.employeeId = v;     return this; }
        public Builder pfNumber(String v)       { this.pfNumber = v;       return this; }
        public Builder name(String v)           { this.name = v;           return this; }
        public Builder email(String v)          { this.email = v;          return this; }
        public Builder password(String v)       { this.password = v;       return this; }
        public Builder designation(String v)    { this.designation = v;    return this; }
        public Builder department(String v)     { this.department = v;     return this; }
        public Builder currentZone(String v)    { this.currentZone = v;    return this; }
        public Builder currentStation(String v) { this.currentStation = v; return this; }
        public Builder verified(boolean v)      { this.verified = v;       return this; }
        public Builder role(Role v)             { this.role = v;           return this; }

        public User build() { return new User(this); }
    }
}