package com.bibit.feedforward.feedforward.service;

import com.bibit.feedforward.feedforward.entity.NotificationEntity;
import com.bibit.feedforward.feedforward.entity.UserEntity;
import com.bibit.feedforward.feedforward.entity.FeedbackEntity;
import com.bibit.feedforward.feedforward.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class NotificationService {
    
    @Autowired
    private NotificationRepository notificationRepository;
    
    public NotificationEntity createNotification(UserEntity user, String message, FeedbackEntity relatedFeedback) {
        NotificationEntity notification = new NotificationEntity();
        notification.setUser(user);
        notification.setMessage(message);
        notification.setRelatedFeedback(relatedFeedback);
        notification.setIsRead(false);
        return notificationRepository.save(notification);
    }
    
    public List<NotificationEntity> getUserNotifications(UserEntity user) {
        return notificationRepository.findByUserOrderByCreatedAtDesc(user);
    }
    
    public List<NotificationEntity> getUnreadNotifications(UserEntity user) {
        return notificationRepository.findByUserAndIsReadFalseOrderByCreatedAtDesc(user);
    }
    
    public long getUnreadCount(UserEntity user) {
        return notificationRepository.countByUserAndIsReadFalse(user);
    }
    
    public NotificationEntity markAsRead(UUID notificationId) {
        return notificationRepository.findByNotificationId(notificationId).map(notif -> {
            notif.setIsRead(true);
            return notificationRepository.save(notif);
        }).orElse(null);
    }
    
    public void markAllAsRead(UserEntity user) {
        List<NotificationEntity> unreadNotifications = notificationRepository.findByUserAndIsReadFalseOrderByCreatedAtDesc(user);
        for (NotificationEntity notif : unreadNotifications) {
            notif.setIsRead(true);
            notificationRepository.save(notif);
        }
    }
    
    public void deleteNotification(UUID notificationId) {
        notificationRepository.deleteById(notificationId);
    }
}
