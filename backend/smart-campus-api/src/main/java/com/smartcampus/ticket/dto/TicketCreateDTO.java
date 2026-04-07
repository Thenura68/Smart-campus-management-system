package com.smartcampus.ticket.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TicketCreateDTO {
    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotBlank
    private String priority;

    private Long resourceId;
}