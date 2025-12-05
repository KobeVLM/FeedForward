package com.bibit.feedforward.feedforward.service;

import com.bibit.feedforward.feedforward.dto.DashboardStatisticsDTO;
import com.bibit.feedforward.feedforward.dto.UserStatisticsDTO;
import com.bibit.feedforward.feedforward.entity.FeedbackEntity;
import com.bibit.feedforward.feedforward.repository.FeedbackRepository;
import com.bibit.feedforward.feedforward.repository.UserRepository;
import com.bibit.feedforward.feedforward.repository.CategoryRepository;
import com.bibit.feedforward.feedforward.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private TagRepository tagRepository;

    public FeedbackEntity submitFeedback(FeedbackEntity feedback) {
        return feedbackRepository.save(feedback);
    }
    
    public FeedbackEntity submitFeedbackFromDTO(com.bibit.feedforward.feedforward.dto.FeedbackDTO feedbackDTO) {
        // Validate required fields
        if (feedbackDTO.getUserId() == null) {
            throw new IllegalArgumentException("User ID is required");
        }
        if (feedbackDTO.getTitle() == null || feedbackDTO.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Title is required");
        }
        if (feedbackDTO.getDescription() == null || feedbackDTO.getDescription().isEmpty()) {
            throw new IllegalArgumentException("Description is required");
        }
        
        // Look up the user who is creating the feedback
        var createdByUser = userRepository.findById(feedbackDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + feedbackDTO.getUserId()));
        
        // Look up the category
        var category = feedbackDTO.getCategoryId() != null 
                ? categoryRepository.findById(feedbackDTO.getCategoryId())
                        .orElseThrow(() -> new RuntimeException("Category not found with ID: " + feedbackDTO.getCategoryId()))
                : null;
        
        // Look up tags if provided
        List<com.bibit.feedforward.feedforward.entity.TagEntity> tags = new ArrayList<>();
        if (feedbackDTO.getTagIds() != null && !feedbackDTO.getTagIds().isEmpty()) {
            for (Long tagId : feedbackDTO.getTagIds()) {
                var tag = tagRepository.findById(tagId)
                        .orElseThrow(() -> new RuntimeException("Tag not found with ID: " + tagId));
                tags.add(tag);
            }
        }
        
        // Create the feedback entity
        FeedbackEntity feedback = new FeedbackEntity();
        feedback.setTitle(feedbackDTO.getTitle());
        feedback.setDescription(feedbackDTO.getDescription());
        feedback.setCategory(category);
        feedback.setCreatedBy(createdByUser); // This is the critical field that was missing!
        feedback.setTags(tags);
        
        // Set priority, default to MEDIUM if not provided
        if (feedbackDTO.getPriority() != null && !feedbackDTO.getPriority().isEmpty()) {
            try {
                feedback.setPriority(FeedbackEntity.Priority.valueOf(feedbackDTO.getPriority().toUpperCase()));
            } catch (IllegalArgumentException e) {
                feedback.setPriority(FeedbackEntity.Priority.MEDIUM);
            }
        } else {
            feedback.setPriority(FeedbackEntity.Priority.MEDIUM);
        }
        
        // Set initial status
        feedback.setStatus(FeedbackEntity.Status.PENDING);
        
        // Set timestamps
        feedback.setCreatedAt(LocalDateTime.now());
        feedback.setUpdatedAt(LocalDateTime.now());
        
        // Save and return
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
    
    // Statistics methods
    public DashboardStatisticsDTO getDashboardStatistics() {
        DashboardStatisticsDTO stats = new DashboardStatisticsDTO();
        
        stats.setTotalFeedback(feedbackRepository.count());
        stats.setPendingCount(feedbackRepository.countByStatus(FeedbackEntity.Status.PENDING));
        stats.setInReviewCount(feedbackRepository.countByStatus(FeedbackEntity.Status.IN_REVIEW));
        stats.setRespondedCount(feedbackRepository.countByStatus(FeedbackEntity.Status.RESPONDED));
        stats.setResolvedCount(feedbackRepository.countByStatus(FeedbackEntity.Status.RESOLVED));
        stats.setTotalUsers(userRepository.count());
        stats.setTotalCategories(categoryRepository.count());
        stats.setTotalTags(tagRepository.count());
        
        return stats;
    }
    
    public UserStatisticsDTO getUserStatistics(UUID userId) {
        UserStatisticsDTO stats = new UserStatisticsDTO();
        
        stats.setTotalFeedbackSubmitted(feedbackRepository.countByCreatedBy_UserId(userId));
        stats.setPendingCount(feedbackRepository.countByCreatedBy_UserIdAndStatus(userId, FeedbackEntity.Status.PENDING));
        stats.setInReviewCount(feedbackRepository.countByCreatedBy_UserIdAndStatus(userId, FeedbackEntity.Status.IN_REVIEW));
        stats.setRespondedCount(feedbackRepository.countByCreatedBy_UserIdAndStatus(userId, FeedbackEntity.Status.RESPONDED));
        stats.setResolvedCount(feedbackRepository.countByCreatedBy_UserIdAndStatus(userId, FeedbackEntity.Status.RESOLVED));
        
        return stats;
    }
    
    // Search and filter method
    public List<FeedbackEntity> searchAndFilterFeedback(
            String search,
            FeedbackEntity.Status status,
            Long categoryId,
            FeedbackEntity.Priority priority,
            LocalDateTime startDate,
            LocalDateTime endDate) {
        
        List<FeedbackEntity> results = new ArrayList<>();
        
        // If no filters, return all
        if (search == null && status == null && categoryId == null && priority == null && startDate == null && endDate == null) {
            return feedbackRepository.findAll();
        }
        
        // Start with all feedback
        results = feedbackRepository.findAll();
        
        // Apply search filter
        if (search != null && !search.isEmpty()) {
            results = feedbackRepository.findByTitleContainingOrDescriptionContaining(search, search);
        }
        
        // Filter by status
        if (status != null) {
            results.retainAll(feedbackRepository.findByStatus(status));
        }
        
        // Filter by category
        if (categoryId != null) {
            results.retainAll(feedbackRepository.findByCategory_CategoryId(categoryId));
        }
        
        // Filter by priority
        if (priority != null) {
            results.retainAll(feedbackRepository.findByPriority(priority));
        }
        
        // Filter by date range
        if (startDate != null && endDate != null) {
            results.retainAll(feedbackRepository.findByCreatedAtBetween(startDate, endDate));
        }
        
        return results;
    }
}
