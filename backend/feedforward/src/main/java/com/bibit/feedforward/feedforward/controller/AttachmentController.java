package com.bibit.feedforward.feedforward.controller;

import com.bibit.feedforward.feedforward.entity.AttachmentEntity;
import com.bibit.feedforward.feedforward.service.AttachmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/attachments")
public class AttachmentController {

    @Autowired
    private AttachmentService attachmentService;

    @PostMapping("/upload")
    public AttachmentEntity uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("feedbackId") UUID feedbackId,
            @RequestParam("userId") UUID userId) {
        return attachmentService.storeFile(file, feedbackId, userId);
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> downloadFile(@PathVariable UUID id) {
        Resource resource = attachmentService.loadFileAsResource(id);
        AttachmentEntity attachment = attachmentService.getAttachmentById(id);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(attachment.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + attachment.getFileName() + "\"")
                .body(resource);
    }

    @GetMapping("/feedback/{feedbackId}")
    public List<AttachmentEntity> getAttachmentsByFeedback(@PathVariable UUID feedbackId) {
        return attachmentService.getAttachmentsByFeedbackId(feedbackId);
    }

    @DeleteMapping("/{id}")
    public String deleteAttachment(@PathVariable UUID id) {
        return attachmentService.deleteAttachment(id);
    }
}
