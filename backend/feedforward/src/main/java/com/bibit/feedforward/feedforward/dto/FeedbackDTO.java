package com.bibit.feedforward.feedforward.dto;

import com.bibit.feedforward.feedforward.entity.FeedbackEntity;
import java.util.List;
import java.util.UUID;
import java.util.Map;

public class FeedbackDTO {
    private String title;
    private String description;
    private Long categoryId;
    private FeedbackEntity.Priority priority;
    private List<Long> selectedTags;
    private UUID userId;
    private Map<String, Object> createdBy;

    public FeedbackDTO() {}

    public FeedbackDTO(String title, String description, Long categoryId, 
                       FeedbackEntity.Priority priority, List<Long> selectedTags, UUID userId) {
        this.title = title;
        this.description = description;
        this.categoryId = categoryId;
        this.priority = priority;
        this.selectedTags = selectedTags;
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public FeedbackEntity.Priority getPriority() {
        return priority;
    }

    public void setPriority(FeedbackEntity.Priority priority) {
        this.priority = priority;
    }

    public List<Long> getSelectedTags() {
        return selectedTags;
    }

    public void setSelectedTags(List<Long> selectedTags) {
        this.selectedTags = selectedTags;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public Map<String, Object> getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Map<String, Object> createdBy) {
        this.createdBy = createdBy;
    }
}
