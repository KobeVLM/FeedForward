package com.bibit.feedforward.feedforward.dto;

import java.util.List;
import java.util.UUID;

public class FeedbackDTO {
    
    private String title;
    private String description;
    private Long categoryId;
    private String priority;
    private List<Long> tagIds;
    private UUID userId; // The authenticated user submitting the feedback
    
    public FeedbackDTO() {
    }
    
    public FeedbackDTO(String title, String description, Long categoryId, String priority, 
                      List<Long> tagIds, UUID userId) {
        this.title = title;
        this.description = description;
        this.categoryId = categoryId;
        this.priority = priority;
        this.tagIds = tagIds;
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
    
    public String getPriority() {
        return priority;
    }
    
    public void setPriority(String priority) {
        this.priority = priority;
    }
    
    public List<Long> getTagIds() {
        return tagIds;
    }
    
    public void setTagIds(List<Long> tagIds) {
        this.tagIds = tagIds;
    }
    
    public UUID getUserId() {
        return userId;
    }
    
    public void setUserId(UUID userId) {
        this.userId = userId;
    }
}
