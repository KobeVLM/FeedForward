package com.bibit.feedforward.feedforward.dto;

public class UserStatisticsDTO {
    private long totalFeedbackSubmitted;
    private long pendingCount;
    private long inReviewCount;
    private long respondedCount;
    private long resolvedCount;

    public UserStatisticsDTO() {
    }

    public UserStatisticsDTO(long totalFeedbackSubmitted, long pendingCount, long inReviewCount, long respondedCount, long resolvedCount) {
        this.totalFeedbackSubmitted = totalFeedbackSubmitted;
        this.pendingCount = pendingCount;
        this.inReviewCount = inReviewCount;
        this.respondedCount = respondedCount;
        this.resolvedCount = resolvedCount;
    }

    public long getTotalFeedbackSubmitted() {
        return totalFeedbackSubmitted;
    }

    public void setTotalFeedbackSubmitted(long totalFeedbackSubmitted) {
        this.totalFeedbackSubmitted = totalFeedbackSubmitted;
    }

    public long getPendingCount() {
        return pendingCount;
    }

    public void setPendingCount(long pendingCount) {
        this.pendingCount = pendingCount;
    }

    public long getInReviewCount() {
        return inReviewCount;
    }

    public void setInReviewCount(long inReviewCount) {
        this.inReviewCount = inReviewCount;
    }

    public long getRespondedCount() {
        return respondedCount;
    }

    public void setRespondedCount(long respondedCount) {
        this.respondedCount = respondedCount;
    }

    public long getResolvedCount() {
        return resolvedCount;
    }

    public void setResolvedCount(long resolvedCount) {
        this.resolvedCount = resolvedCount;
    }
}
