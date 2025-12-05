package com.bibit.feedforward.feedforward.dto;

import java.util.UUID;

public class AuthResponse {
    private UUID userId;
    private String universityEmail;
    private String displayName;
    private String role;
    private String department;
    private String message;

    public AuthResponse() {
    }

    public AuthResponse(UUID userId, String universityEmail, String displayName, String role, String department, String message) {
        this.userId = userId;
        this.universityEmail = universityEmail;
        this.displayName = displayName;
        this.role = role;
        this.department = department;
        this.message = message;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getUniversityEmail() {
        return universityEmail;
    }

    public void setUniversityEmail(String universityEmail) {
        this.universityEmail = universityEmail;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

