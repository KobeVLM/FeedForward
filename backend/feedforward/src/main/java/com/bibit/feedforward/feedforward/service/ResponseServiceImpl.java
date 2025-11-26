package com.bibit.feedforward.feedforward.service.impl;

import com.bibit.feedforward.feedforward.entity.FeedbackEntity;
import com.bibit.feedforward.feedforward.entity.ResponseEntity;
import com.bibit.feedforward.feedforward.repository.ResponseRepository;
import com.bibit.feedforward.feedforward.service.ResponseService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ResponseServiceImpl implements ResponseService {

    private final ResponseRepository responseRepository;

    public ResponseServiceImpl(ResponseRepository responseRepository) {
        this.responseRepository = responseRepository;
    }

    @Override
    public ResponseEntity writeResponse(ResponseEntity response) {
        response.setCreatedAt(LocalDateTime.now());
        return responseRepository.save(response);
    }

    @Override
    public ResponseEntity editResponse(UUID id, ResponseEntity response) {
        ResponseEntity existing = responseRepository.findById(id).orElseThrow();

        existing.setBody(response.getBody());
        return responseRepository.save(existing);
    }

    @Override
    public List<ResponseEntity> getResponsesByFeedback(UUID feedbackId) {
        return responseRepository.findAll().stream()
                .filter(r -> r.getFeedback().getFeedbackId().equals(feedbackId))
                .toList();
    }

    @Override
    public ResponseEntity getResponseById(UUID id) {
        return responseRepository.findById(id).orElseThrow();
    }

    @Override
    public String deleteResponse(UUID id) {
        responseRepository.deleteById(id);
        return "Response deleted successfully.";
    }
}
