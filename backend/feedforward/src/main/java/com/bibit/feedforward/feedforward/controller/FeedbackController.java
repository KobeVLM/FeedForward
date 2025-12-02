package com.bibit.feedforward.feedforward.controller;

import com.bibit.feedforward.feedforward.entity.FeedbackEntity;
import com.bibit.feedforward.feedforward.service.FeedbackService;
import org.springframework.web.bind.annotation.*;

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
    public List<FeedbackEntity> getAllFeedback() {
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
}
