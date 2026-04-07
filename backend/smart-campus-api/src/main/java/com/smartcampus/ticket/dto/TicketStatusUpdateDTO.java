package com.smartcampus.ticket.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TicketStatusUpdateDTO {
    @NotBlank
    private String status;
}