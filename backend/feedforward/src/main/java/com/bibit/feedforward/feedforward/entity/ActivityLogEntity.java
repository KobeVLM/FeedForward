package com.bibit.feedforward.feedforward.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "activity_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ActivityLogEntity {

    @Id
    @GeneratedValue
    private UUID logId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private String action; // e.g., "CREATE_FEEDBACK", "LOGIN", "UPDATE_STATUS"

    private String entityType;
    private UUID entityId;

    @Column(columnDefinition = "TEXT")
    private String details;

    private LocalDateTime timestamp = LocalDateTime.now();

    public UUID getLogId() {
        return logId;
    }

    public void setLogId(UUID logId) {
        this.logId = logId;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getEntityType() {
        return entityType;
    }

    public void setEntityType(String entityType) {
        this.entityType = entityType;
    }

    public UUID getEntityId() {
        return entityId;
    }

    public void setEntityId(UUID entityId) {
        this.entityId = entityId;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}
