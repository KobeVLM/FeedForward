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
@Table(name = "feedback")
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackEntity {

    @Id
    @GeneratedValue
    private UUID feedbackId;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private CategoryEntity category;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    private TagEntity tag;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private UserEntity createdBy;

    @ManyToOne
    @JoinColumn(name = "assigned_to")
    private UserEntity assignedTo;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private DepartmentEntity department;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt;
    private LocalDateTime reviewedAt;
    private LocalDateTime resolvedAt;

    public enum Status {
        PENDING, IN_REVIEW, RESPONDED, RESOLVED
    }
}
