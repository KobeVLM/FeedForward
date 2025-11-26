package com.bibit.feedforward.feedforward.controller;

import com.bibit.feedforward.feedforward.entity.ResponseEntity;
import com.bibit.feedforward.feedforward.service.ResponseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/responses")
public class ResponseController {

    private final ResponseService responseService;

    public ResponseController(ResponseService responseService) {
        this.responseService = responseService;
    }

    @PostMapping
    public ResponseEntity writeResponse(@RequestBody ResponseEntity response) {
        return responseService.writeResponse(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity getResponseById(@PathVariable UUID id) {
        return responseService.getResponseById(id);
    }

    @GetMapping("/feedback/{feedbackId}")
    public List<ResponseEntity> getResponsesByFeedback(@PathVariable UUID feedbackId) {
        return responseService.getResponsesByFeedback(feedbackId);
    }

    @PutMapping("/{id}")
    public ResponseEntity editResponse(@PathVariable UUID id, @RequestBody ResponseEntity response) {
        return responseService.editResponse(id, response);
    }

    @DeleteMapping("/{id}")
    public String deleteResponse(@PathVariable UUID id) {
        return responseService.deleteResponse(id);
    }
}
