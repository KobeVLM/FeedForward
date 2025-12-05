package com.bibit.feedforward.feedforward.service;

import com.bibit.feedforward.feedforward.config.FileStorageConfig;
import com.bibit.feedforward.feedforward.entity.AttachmentEntity;
import com.bibit.feedforward.feedforward.entity.FeedbackEntity;
import com.bibit.feedforward.feedforward.entity.UserEntity;
import com.bibit.feedforward.feedforward.repository.AttachmentRepository;
import com.bibit.feedforward.feedforward.repository.FeedbackRepository;
import com.bibit.feedforward.feedforward.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class AttachmentService {

    @Autowired
    private AttachmentRepository attachmentRepository;
    
    @Autowired
    private FeedbackRepository feedbackRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private FileStorageConfig fileStorageConfig;
    
    private final Path fileStorageLocation;
    
    @Autowired
    public AttachmentService(FileStorageConfig fileStorageConfig) {
        this.fileStorageConfig = fileStorageConfig;
        this.fileStorageLocation = Paths.get(fileStorageConfig.getUploadDir())
                .toAbsolutePath().normalize();
    }

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
            AttachmentEntity attachment = getAttachmentById(id);
            
            // Delete file from disk
            try {
                Path filePath = this.fileStorageLocation.resolve(attachment.getFileName()).normalize();
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
                // Log error but continue with database deletion
                System.err.println("Could not delete file: " + e.getMessage());
            }
            
            attachmentRepository.deleteById(id);
            return "Attachment " + id + " is successfully deleted!";
        } else {
            return "Attachment " + id + " does not exist.";
        }
    }
    
    // Store file and create attachment entity
    public AttachmentEntity storeFile(MultipartFile file, UUID feedbackId, UUID uploadedBy) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        
        try {
            // Check if filename contains invalid characters
            if (fileName.contains("..")) {
                throw new RuntimeException("Filename contains invalid path sequence: " + fileName);
            }
            
            // Generate unique filename
            String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;
            
            // Copy file to target location
            Path targetLocation = this.fileStorageLocation.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            
            // Create attachment entity
            AttachmentEntity attachment = new AttachmentEntity();
            attachment.setFileName(uniqueFileName);
            attachment.setFileUrl("/api/attachments/" + attachmentRepository.count() + "/download");
            attachment.setFileType(file.getContentType());
            
            // Set relationships
            FeedbackEntity feedback = feedbackRepository.findById(feedbackId)
                    .orElseThrow(() -> new NoSuchElementException("Feedback not found"));
            attachment.setFeedback(feedback);
            
            UserEntity user = userRepository.findById(uploadedBy)
                    .orElseThrow(() -> new NoSuchElementException("User not found"));
            attachment.setUploadedBy(user);
            
            return attachmentRepository.save(attachment);
        } catch (IOException e) {
            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", e);
        }
    }
    
    // Load file as resource for download
    public Resource loadFileAsResource(UUID attachmentId) {
        try {
            AttachmentEntity attachment = getAttachmentById(attachmentId);
            Path filePath = this.fileStorageLocation.resolve(attachment.getFileName()).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            
            if (resource.exists()) {
                return resource;
            } else {
                throw new RuntimeException("File not found: " + attachment.getFileName());
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("File not found", e);
        }
    }
    
    // Get attachments by feedback ID
    public List<AttachmentEntity> getAttachmentsByFeedbackId(UUID feedbackId) {
        return attachmentRepository.findByFeedback_FeedbackId(feedbackId);
    }
}
