package com.bibit.feedforward.feedforward.repository;

import com.bibit.feedforward.feedforward.entity.ResponseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ResponseRepository extends JpaRepository<ResponseEntity, UUID> {
    java.util.List<ResponseEntity> findByFeedback_FeedbackId(UUID feedbackId);
}
