package com.bibit.feedforward.feedforward.repository;

import com.bibit.feedforward.feedforward.entity.FeedbackEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface FeedbackRepository extends JpaRepository<FeedbackEntity, UUID> {

}
