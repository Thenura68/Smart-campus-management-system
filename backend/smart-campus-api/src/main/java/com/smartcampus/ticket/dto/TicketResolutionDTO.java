package com.smartcampus.ticket.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TicketResolutionDTO {
    @NotBlank
    private String resolutionNotes;
}