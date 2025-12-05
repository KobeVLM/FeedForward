package com.bibit.feedforward.feedforward.service;

import com.bibit.feedforward.feedforward.entity.ActivityLogEntity;
import com.bibit.feedforward.feedforward.entity.UserEntity;
import com.bibit.feedforward.feedforward.repository.ActivityLogRepository;
import com.bibit.feedforward.feedforward.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ActivityLogService {

    @Autowired
    private ActivityLogRepository activityLogRepository;
    
    @Autowired
    private UserRepository userRepository;

    public void logActivity(UserEntity user, String actionType, String details) {
        ActivityLogEntity log = new ActivityLogEntity();
        log.setUser(user);
        log.setAction(actionType);
        log.setDetails(details);
        activityLogRepository.save(log);
    }

    public List<ActivityLogEntity> getAllLogs() {
        return activityLogRepository.findAll();
    }

    public List<ActivityLogEntity> getLogsByUser(UUID userId) {
        return activityLogRepository.findByUser_UserId(userId);
    }
    
    // Log activity with more parameters
    public void logActivity(UUID userId, String action, String entityType, UUID entityId, String details) {
        UserEntity user = userRepository.findById(userId).orElse(null);
        
        ActivityLogEntity log = new ActivityLogEntity();
        log.setUser(user);
        log.setAction(action);
        log.setEntityType(entityType);
        log.setEntityId(entityId);
        log.setDetails(details);
        activityLogRepository.save(log);
    }
    
    // Get recent activity logs
    public List<ActivityLogEntity> getRecentActivityLogs(int limit) {
        return activityLogRepository.findTop50ByOrderByTimestampDesc();
    }
    
    // Get logs by action type
    public List<ActivityLogEntity> getLogsByAction(String action) {
        return activityLogRepository.findByAction(action);
    }
    
    // Get logs by date range
    public List<ActivityLogEntity> getLogsByDateRange(LocalDateTime start, LocalDateTime end) {
        return activityLogRepository.findByTimestampBetween(start, end);
    }
}
