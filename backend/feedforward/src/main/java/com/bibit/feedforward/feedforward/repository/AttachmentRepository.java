package com.bibit.feedforward.feedforward.repository;

import com.bibit.feedforward.feedforward.entity.AttachmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AttachmentRepository extends JpaRepository<AttachmentEntity, UUID> {
    List<AttachmentEntity> findByFeedback_FeedbackId(UUID feedbackId);
}
