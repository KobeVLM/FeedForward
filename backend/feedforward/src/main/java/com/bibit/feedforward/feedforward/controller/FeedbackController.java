package com.bibit.feedforward.feedforward.controller;

import com.bibit.feedforward.feedforward.dto.DashboardStatisticsDTO;
import com.bibit.feedforward.feedforward.dto.UserStatisticsDTO;
import com.bibit.feedforward.feedforward.entity.FeedbackEntity;
import com.bibit.feedforward.feedforward.service.FeedbackService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping
    public FeedbackEntity submitFeedback(@RequestBody FeedbackEntity feedback) {
        return feedbackService.submitFeedback(feedback);
    }

    @GetMapping
    public List<FeedbackEntity> getAllFeedback(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) FeedbackEntity.Status status,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) FeedbackEntity.Priority priority,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        
        // If any filter is provided, use search and filter method
        if (search != null || status != null || categoryId != null || priority != null || startDate != null || endDate != null) {
            return feedbackService.searchAndFilterFeedback(search, status, categoryId, priority, startDate, endDate);
        }
        
        return feedbackService.getAllFeedback();
    }

    @GetMapping("/{id}")
    public FeedbackEntity getFeedbackById(@PathVariable UUID id) {
        return feedbackService.getFeedbackById(id);
    }

    @PutMapping("/{id}")
    public FeedbackEntity editFeedback(@PathVariable UUID id, @RequestBody FeedbackEntity feedback) {
        return feedbackService.editFeedback(id, feedback);
    }

    @DeleteMapping("/{id}")
    public String deleteFeedback(@PathVariable UUID id) {
        return feedbackService.deleteFeedback(id);
    }

    @PatchMapping("/{id}/status")
    public FeedbackEntity updateStatus(@PathVariable UUID id, @RequestParam String status) {
        return feedbackService.updateStatus(id, FeedbackEntity.Status.valueOf(status.toUpperCase()));
    }
    
    // Statistics endpoints
    @GetMapping("/statistics")
    public DashboardStatisticsDTO getDashboardStatistics() {
        return feedbackService.getDashboardStatistics();
    }
    
    @GetMapping("/statistics/user/{userId}")
    public UserStatisticsDTO getUserStatistics(@PathVariable UUID userId) {
        return feedbackService.getUserStatistics(userId);
    }
}
