package com.bibit.feedforward.feedforward.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "responses")
public class ResponseEntity {

    @Id
    @GeneratedValue
    private UUID responseId;

    @ManyToOne
    @JoinColumn(name = "feedback_id")
    private FeedbackEntity feedback;

    private String authorId;

    @Column(columnDefinition = "TEXT")
    private String body;

    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters and setters
}
