package com.bibit.feedforward.feedforward.repository;

import com.bibit.feedforward.feedforward.entity.ActivityLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLogEntity, UUID> {
    List<ActivityLogEntity> findByUser_UserId(UUID userId);
    List<ActivityLogEntity> findByAction(String action);
    List<ActivityLogEntity> findByTimestampBetween(LocalDateTime start, LocalDateTime end);
    List<ActivityLogEntity> findTop50ByOrderByTimestampDesc();
}
