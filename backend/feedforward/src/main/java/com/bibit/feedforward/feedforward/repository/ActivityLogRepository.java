package com.bibit.feedforward.feedforward.repository;

import com.bibit.feedforward.feedforward.entity.ActivityLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;
import java.util.List;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLogEntity, UUID> {
    List<ActivityLogEntity> findByUser_UserId(UUID userId);
}
