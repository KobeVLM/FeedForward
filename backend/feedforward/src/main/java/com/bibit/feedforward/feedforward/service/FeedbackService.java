package com.bibit.feedforward.feedforward.service;

import com.bibit.feedforward.feedforward.entity.FeedbackEntity;
import com.bibit.feedforward.feedforward.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public FeedbackEntity submitFeedback(FeedbackEntity feedback) {
        return feedbackRepository.save(feedback);
    }

    public FeedbackEntity editFeedback(UUID id, FeedbackEntity feedbackDetails) {
        FeedbackEntity feedback = getFeedbackById(id);

        feedback.setTitle(feedbackDetails.getTitle());
        feedback.setDescription(feedbackDetails.getDescription());
        feedback.setCategory(feedbackDetails.getCategory());
        feedback.setPriority(feedbackDetails.getPriority());
        feedback.setTags(feedbackDetails.getTags());

        return feedbackRepository.save(feedback);
    }

    public String deleteFeedback(UUID id) {
        if (feedbackRepository.existsById(id)) {
            feedbackRepository.deleteById(id);
            return "Feedback " + id + " is successfully deleted!";
        } else {
            return "Feedback " + id + " does not exist.";
        }
    }

    public List<FeedbackEntity> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    public FeedbackEntity getFeedbackById(UUID id) {
        return feedbackRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Feedback " + id + " not found"));
    }

    public FeedbackEntity updateStatus(UUID id, FeedbackEntity.Status status) {
        FeedbackEntity feedback = getFeedbackById(id);
        feedback.setStatus(status);
        return feedbackRepository.save(feedback);
    }
}
