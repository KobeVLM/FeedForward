package com.bibit.feedforward.feedforward.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "responses")
@NoArgsConstructor
@AllArgsConstructor
public class ResponseEntity {

    @Id
    @GeneratedValue
    private UUID responseId;

    @ManyToOne
    @JoinColumn(name = "feedback_id")
    private FeedbackEntity feedback;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private UserEntity author;

    @Column(columnDefinition = "TEXT")
    private String body;

    private LocalDateTime createdAt = LocalDateTime.now();

    public UUID getResponseId() {
        return responseId;
    }

    public void setResponseId(UUID responseId) {
        this.responseId = responseId;
    }

    public FeedbackEntity getFeedback() {
        return feedback;
    }

    public void setFeedback(FeedbackEntity feedback) {
        this.feedback = feedback;
    }

    public UserEntity getAuthor() {
        return author;
    }

    public void setAuthor(UserEntity author) {
        this.author = author;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
