package com.bibit.feedforward.feedforward.service;

import com.bibit.feedforward.feedforward.entity.ResponseEntity;
import com.bibit.feedforward.feedforward.repository.ResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class ResponseService {

    @Autowired
    private ResponseRepository responseRepository;

    public ResponseEntity writeResponse(ResponseEntity response) {
        return responseRepository.save(response);
    }

    public ResponseEntity editResponse(UUID id, ResponseEntity responseDetails) {
        ResponseEntity response = getResponseById(id);
        response.setBody(responseDetails.getBody());
        return responseRepository.save(response);
    }

    public List<ResponseEntity> getResponsesByFeedback(UUID feedbackId) {
        return responseRepository.findByFeedback_FeedbackId(feedbackId);
    }

    public ResponseEntity getResponseById(UUID id) {
        return responseRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Response " + id + " not found"));
    }

    public String deleteResponse(UUID id) {
        if (responseRepository.existsById(id)) {
            responseRepository.deleteById(id);
            return "Response " + id + " is successfully deleted!";
        } else {
            return "Response " + id + " does not exist.";
        }
    }
}
