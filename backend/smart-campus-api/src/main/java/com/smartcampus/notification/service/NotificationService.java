package com.smartcampus.notification.service;

import java.util.List;

import com.smartcampus.notification.model.Notification;
import com.smartcampus.notification.model.NotificationType;

public interface NotificationService {

    void createNotification(Long userId, NotificationType type, String message, Long referenceId);

    List<Notification> getAllNotificationsByUserId(Long userId);

    List<Notification> getUnreadNotificationsByUserId(Long userId);

    void markNotificationAsRead(Long notificationId);

    void markAllNotificationsAsRead(Long userId);

    int getUnreadCount(Long userId);

    void deleteNotification(Long notificationId);
}