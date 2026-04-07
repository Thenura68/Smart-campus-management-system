package com.smartcampus.notification.service;

import java.util.List;

import com.smartcampus.notification.model.Notification;
import com.smartcampus.notification.model.NotificationType;

public interface NotificationService {

    Notification createNotification(Long userId, NotificationType type, String message, Long referenceId);

    List<Notification> getUserNotifications(Long userId);

    Notification markAsRead(Long notificationId, Long userId);

    Notification getById(Long id);
}