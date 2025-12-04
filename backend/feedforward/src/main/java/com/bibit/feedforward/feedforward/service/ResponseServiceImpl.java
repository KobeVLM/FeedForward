package com.bibit.feedforward.feedforward.service;

import com.bibit.feedforward.feedforward.entity.ResponseEntity;
import com.bibit.feedforward.feedforward.repository.ResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class ResponseServiceImpl implements ResponseService {

    @Autowired
    private ResponseRepository responseRepository;

    @Override
    public ResponseEntity writeResponse(ResponseEntity response) {
        return responseRepository.save(response);
    }

    @Override
    public ResponseEntity editResponse(UUID id, ResponseEntity response) {
        ResponseEntity existing = responseRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Response " + id + " not found"));
        existing.setBody(response.getBody());
        existing.setAuthorId(response.getAuthorId());
        existing.setFeedback(response.getFeedback());
        // Optionally update createdAt if needed, but usually not for edits
        return responseRepository.save(existing);
    }

    @Override
    public List<ResponseEntity> getResponsesByFeedback(UUID feedbackId) {
        // This assumes you have a field feedbackId in ResponseEntity and a corresponding method in the repository
        // If not, you need to implement this in the repository
        throw new UnsupportedOperationException("Implement getResponsesByFeedback in ResponseRepository if needed");
    }

    @Override
    public ResponseEntity getResponseById(UUID id) {
        return responseRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Response " + id + " not found"));
    }

    @Override
    public String deleteResponse(UUID id) {
        if (responseRepository.findById(id).isPresent()) {
            responseRepository.deleteById(id);
            return "Response " + id + " is successfully deleted!";
        } else {
            return "Response " + id + " does not exist.";
        }
    }
}