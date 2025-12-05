package com.bibit.feedforward.feedforward.repository;

import com.bibit.feedforward.feedforward.entity.FeedbackEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface FeedbackRepository extends JpaRepository<FeedbackEntity, UUID> {
    
    // Statistics queries
    long countByStatus(FeedbackEntity.Status status);
    long countByCreatedBy_UserId(UUID userId);
    long countByCreatedBy_UserIdAndStatus(UUID userId, FeedbackEntity.Status status);
    
    // Search and filter queries
    List<FeedbackEntity> findByTitleContainingOrDescriptionContaining(String titleKeyword, String descKeyword);
    List<FeedbackEntity> findByStatus(FeedbackEntity.Status status);
    List<FeedbackEntity> findByCategory_CategoryId(Long categoryId);
    List<FeedbackEntity> findByPriority(FeedbackEntity.Priority priority);
    List<FeedbackEntity> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    
    // Combined filters
    List<FeedbackEntity> findByStatusAndCategory_CategoryId(FeedbackEntity.Status status, Long categoryId);
    List<FeedbackEntity> findByStatusAndPriority(FeedbackEntity.Status status, FeedbackEntity.Priority priority);
}
