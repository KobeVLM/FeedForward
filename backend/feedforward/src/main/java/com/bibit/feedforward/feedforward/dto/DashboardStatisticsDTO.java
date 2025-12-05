package com.bibit.feedforward.feedforward.dto;

public class DashboardStatisticsDTO {
    private long totalFeedback;
    private long pendingCount;
    private long inReviewCount;
    private long respondedCount;
    private long resolvedCount;
    private long totalUsers;
    private long totalCategories;
    private long totalTags;

    public DashboardStatisticsDTO() {
    }

    public DashboardStatisticsDTO(long totalFeedback, long pendingCount, long inReviewCount, long respondedCount, long resolvedCount, long totalUsers, long totalCategories, long totalTags) {
        this.totalFeedback = totalFeedback;
        this.pendingCount = pendingCount;
        this.inReviewCount = inReviewCount;
        this.respondedCount = respondedCount;
        this.resolvedCount = resolvedCount;
        this.totalUsers = totalUsers;
        this.totalCategories = totalCategories;
        this.totalTags = totalTags;
    }

    public long getTotalFeedback() {
        return totalFeedback;
    }

    public void setTotalFeedback(long totalFeedback) {
        this.totalFeedback = totalFeedback;
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

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalCategories() {
        return totalCategories;
    }

    public void setTotalCategories(long totalCategories) {
        this.totalCategories = totalCategories;
    }

    public long getTotalTags() {
        return totalTags;
    }

    public void setTotalTags(long totalTags) {
        this.totalTags = totalTags;
    }
}
