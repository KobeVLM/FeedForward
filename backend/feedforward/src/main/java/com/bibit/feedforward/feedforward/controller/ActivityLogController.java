package com.bibit.feedforward.feedforward.controller;

import com.bibit.feedforward.feedforward.entity.ActivityLogEntity;
import com.bibit.feedforward.feedforward.service.ActivityLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/activity-logs")
public class ActivityLogController {

    @Autowired
    private ActivityLogService activityLogService;

    @GetMapping
    public List<ActivityLogEntity> getAllLogs(
            @RequestParam(required = false) UUID userId,
            @RequestParam(required = false) String action,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        
        // Filter by user
        if (userId != null) {
            return activityLogService.getLogsByUser(userId);
        }
        
        // Filter by action
        if (action != null) {
            return activityLogService.getLogsByAction(action);
        }
        
        // Filter by date range
        if (startDate != null && endDate != null) {
            return activityLogService.getLogsByDateRange(startDate, endDate);
        }
        
        return activityLogService.getAllLogs();
    }

    @GetMapping("/recent")
    public List<ActivityLogEntity> getRecentLogs(@RequestParam(defaultValue = "50") int limit) {
        return activityLogService.getRecentActivityLogs(limit);
    }

    @GetMapping("/user/{userId}")
    public List<ActivityLogEntity> getLogsByUser(@PathVariable UUID userId) {
        return activityLogService.getLogsByUser(userId);
    }
}
