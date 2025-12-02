package com.bibit.feedforward.feedforward.service;

import com.bibit.feedforward.feedforward.entity.ActivityLogEntity;
import com.bibit.feedforward.feedforward.entity.UserEntity;
import com.bibit.feedforward.feedforward.repository.ActivityLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ActivityLogService {

    @Autowired
    private ActivityLogRepository activityLogRepository;

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
}
