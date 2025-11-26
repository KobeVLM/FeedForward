package com.bibit.feedforward.feedforward.service;

import com.bibit.feedforward.feedforward.entity.ResponseEntity;

import java.util.List;
import java.util.UUID;

public interface ResponseService {

    ResponseEntity writeResponse(ResponseEntity response);

    ResponseEntity editResponse(UUID id, ResponseEntity response);

    List<ResponseEntity> getResponsesByFeedback(UUID feedbackId);

    ResponseEntity getResponseById(UUID id);

    String deleteResponse(UUID id);
}
