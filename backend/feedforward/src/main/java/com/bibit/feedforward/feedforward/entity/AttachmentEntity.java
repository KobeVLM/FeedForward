package com.bibit.feedforward.feedforward.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "attachments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttachmentEntity {

    @Id
    @GeneratedValue
    private UUID attachmentId;

    @ManyToOne
    @JoinColumn(name = "feedback_id")
    private FeedbackEntity feedback;

    private String filePath;
    private String fileName;
    private String contentType;

    @ManyToOne
    @JoinColumn(name = "uploaded_by")
    private UserEntity uploadedBy;

    private LocalDateTime uploadedAt = LocalDateTime.now();
}
