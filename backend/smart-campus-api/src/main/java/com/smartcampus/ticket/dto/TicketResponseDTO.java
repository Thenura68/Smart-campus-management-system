package com.smartcampus.ticket.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TicketResponseDTO {
    private Long id;
    private String title;
    private String description;
    private String priority;
    private String status;
    private Long createdBy;
    private Long resourceId;
    private Long assignedTo;
    private String resolutionNotes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}