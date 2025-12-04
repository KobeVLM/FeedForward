package com.bibit.feedforward.feedforward.service;

import com.bibit.feedforward.feedforward.entity.FeedbackEntity;
import com.bibit.feedforward.feedforward.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Override
    public FeedbackEntity submitFeedback(FeedbackEntity feedback) {
        return feedbackRepository.save(feedback);
    }

    @Override
    public FeedbackEntity editFeedback(UUID id, FeedbackEntity feedback) {
        FeedbackEntity existing = feedbackRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Feedback " + id + " not found"));
        existing.setTitle(feedback.getTitle());
        existing.setDescription(feedback.getDescription());
        existing.setStatus(feedback.getStatus());
        // Set other fields as needed
        return feedbackRepository.save(existing);
    }

    @Override
    public String deleteFeedback(UUID id) {
        if (feedbackRepository.findById(id).isPresent()) {
            feedbackRepository.deleteById(id);
            return "Feedback " + id + " is successfully deleted!";
        } else {
            return "Feedback " + id + " does not exist.";
        }
    }

    @Override
    public List<FeedbackEntity> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    @Override
    public FeedbackEntity getFeedbackById(UUID id) {
        return feedbackRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Feedback " + id + " not found"));
    }

    @Override
    public FeedbackEntity updateStatus(UUID id, FeedbackEntity.Status status) {
        FeedbackEntity feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Feedback " + id + " not found"));
        feedback.setStatus(status);
        return feedbackRepository.save(feedback);
    }
}