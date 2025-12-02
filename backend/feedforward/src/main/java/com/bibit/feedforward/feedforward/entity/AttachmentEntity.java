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

    private String fileUrl;
    private String fileName;
    private String fileType;

    @ManyToOne
    @JoinColumn(name = "uploaded_by")
    private UserEntity uploadedBy;

    private LocalDateTime uploadedAt = LocalDateTime.now();

    public UUID getAttachmentId() {
        return attachmentId;
    }

    public void setAttachmentId(UUID attachmentId) {
        this.attachmentId = attachmentId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public FeedbackEntity getFeedback() {
        return feedback;
    }

    public void setFeedback(FeedbackEntity feedback) {
        this.feedback = feedback;
    }

    public UserEntity getUploadedBy() {
        return uploadedBy;
    }

    public void setUploadedBy(UserEntity uploadedBy) {
        this.uploadedBy = uploadedBy;
    }

    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(LocalDateTime uploadedAt) {
        this.uploadedAt = uploadedAt;
    }
}
