package com.bibit.feedforward.feedforward.service;

import com.bibit.feedforward.feedforward.entity.AttachmentEntity;
import com.bibit.feedforward.feedforward.repository.AttachmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class AttachmentService {

    @Autowired
    private AttachmentRepository attachmentRepository;

    // CREATE a new attachment
    public AttachmentEntity createAttachment(AttachmentEntity attachment) {
        return attachmentRepository.save(attachment);
    }

    // READ all attachments
    public List<AttachmentEntity> getAllAttachments() {
        return attachmentRepository.findAll();
    }

    // GET an attachment by ID
    public AttachmentEntity getAttachmentById(UUID id) {
        return attachmentRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Attachment " + id + " not found"));
    }

    // UPDATE an attachment
    public AttachmentEntity updateAttachment(UUID id, AttachmentEntity attachmentDetails) {
        AttachmentEntity attachment = getAttachmentById(id);

        attachment.setFileUrl(attachmentDetails.getFileUrl());
        attachment.setFileName(attachmentDetails.getFileName());
        attachment.setFileType(attachmentDetails.getFileType());
        attachment.setFeedback(attachmentDetails.getFeedback());
        attachment.setUploadedBy(attachmentDetails.getUploadedBy());

        return attachmentRepository.save(attachment);
    }

    // DELETE an attachment
    public String deleteAttachment(UUID id) {
        if (attachmentRepository.existsById(id)) {
            attachmentRepository.deleteById(id);
            return "Attachment " + id + " is successfully deleted!";
        } else {
            return "Attachment " + id + " does not exist.";
        }
    }
}
