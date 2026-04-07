package com.smartcampus.notification.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartcampus.notification.model.Notification;
import com.smartcampus.notification.service.NotificationService;

@RestController
@RequestMapping("/api/user/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public ResponseEntity<List<Notification>> getMyNotifications() {
        Long currentUserId = 2L; // temporary for testing
        return ResponseEntity.ok(notificationService.getUserNotifications(currentUserId));
    }

    @GetMapping("/{id}")
    public Notification getNotificationById(@PathVariable Long id) {
        return notificationService.getById(id);
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<Notification> markAsRead(@PathVariable Long id) {
        Long currentUserId = 2L; // temporary for testing
        return ResponseEntity.ok(notificationService.markAsRead(id, currentUserId));
    }
}