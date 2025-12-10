package com.bibit.feedforward.feedforward.repository;

import com.bibit.feedforward.feedforward.entity.NotificationEntity;
import com.bibit.feedforward.feedforward.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface NotificationRepository extends JpaRepository<NotificationEntity, UUID> {
    List<NotificationEntity> findByUserOrderByCreatedAtDesc(UserEntity user);
    
    List<NotificationEntity> findByUserAndIsReadFalseOrderByCreatedAtDesc(UserEntity user);
    
    Optional<NotificationEntity> findByNotificationId(UUID notificationId);
    
    long countByUserAndIsReadFalse(UserEntity user);
}
