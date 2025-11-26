package com.bibit.feedforward.feedforward.service;

import com.bibit.feedforward.feedforward.entity.FeedbackEntity;

import java.util.List;
import java.util.UUID;

public interface FeedbackService {

    FeedbackEntity submitFeedback(FeedbackEntity feedback);

    FeedbackEntity editFeedback(UUID id, FeedbackEntity feedback);

    String deleteFeedback(UUID id);

    List<FeedbackEntity> getAllFeedback();

    FeedbackEntity getFeedbackById(UUID id);

    FeedbackEntity updateStatus(UUID id, FeedbackEntity.Status status);
}
