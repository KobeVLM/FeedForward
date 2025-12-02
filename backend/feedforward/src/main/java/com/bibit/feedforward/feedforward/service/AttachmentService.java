package com.bibit.feedforward.feedforward.service;

import com.bibit.feedforward.feedforward.entity.AttachmentEntity;
import com.bibit.feedforward.feedforward.repository.AttachmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
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
        Optional<AttachmentEntity> attachment = attachmentRepository.findById(id);
        if (attachment.isPresent()) {
            return attachment.get();
        } else {
            throw new NoSuchElementException("Attachment " + id + " not found");
        }
    }

    // UPDATE an attachment
    public AttachmentEntity updateAttachment(UUID id, AttachmentEntity attachmentDetails) {
        AttachmentEntity attachment = new AttachmentEntity();
        try {
            // Search for the attachment by ID
            attachment = attachmentRepository.findById(id).get();
            attachment.setFilePath(attachmentDetails.getFilePath());
            attachment.setFileName(attachmentDetails.getFileName());
            attachment.setContentType(attachmentDetails.getContentType());
            attachment.setFeedback(attachmentDetails.getFeedback());
            attachment.setUploadedBy(attachmentDetails.getUploadedBy());
            return attachmentRepository.save(attachment);
        } catch (NoSuchElementException ex) {
            throw new NoSuchElementException("Attachment " + id + " not found");
        }
    }

    // DELETE an attachment
    public String deleteAttachment(UUID id) {
        String msg = "";
        if (attachmentRepository.findById(id).isPresent()) {
            attachmentRepository.deleteById(id);
            msg = "Attachment " + id + " is successfully deleted!";
        } else {
            msg = "Attachment " + id + " does not exist.";
        }
        return msg;
    }
}
