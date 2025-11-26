package com.bibit.feedforward.feedforward.service.impl;

import com.bibit.feedforward.feedforward.entity.FeedbackEntity;
import com.bibit.feedforward.feedforward.repository.FeedbackRepository;
import com.bibit.feedforward.feedforward.service.FeedbackService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public FeedbackServiceImpl(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    @Override
    public FeedbackEntity submitFeedback(FeedbackEntity feedback) {
        feedback.setCreatedAt(LocalDateTime.now());
        return feedbackRepository.save(feedback);
    }

    @Override
    public FeedbackEntity editFeedback(UUID id, FeedbackEntity feedback) {
        FeedbackEntity existing = feedbackRepository.findById(id).orElseThrow();

        existing.setTitle(feedback.getTitle());
        existing.setDescription(feedback.getDescription());
        existing.setCategory(feedback.getCategory());
        existing.setUpdatedAt(LocalDateTime.now());

        return feedbackRepository.save(existing);
    }

    @Override
    public String deleteFeedback(UUID id) {
        feedbackRepository.deleteById(id);
        return "Feedback deleted successfully.";
    }

    @Override
    public List<FeedbackEntity> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    @Override
    public FeedbackEntity getFeedbackById(UUID id) {
        return feedbackRepository.findById(id).orElseThrow();
    }

    @Override
    public FeedbackEntity updateStatus(UUID id, FeedbackEntity.Status status) {
        FeedbackEntity feedback = feedbackRepository.findById(id).orElseThrow();

        feedback.setStatus(status);
        feedback.setUpdatedAt(LocalDateTime.now());

        if (status == FeedbackEntity.Status.IN_REVIEW) {
            feedback.setReviewedAt(LocalDateTime.now());
        }
        if (status == FeedbackEntity.Status.RESOLVED) {
            feedback.setResolvedAt(LocalDateTime.now());
        }

        return feedbackRepository.save(feedback);
    }
}
