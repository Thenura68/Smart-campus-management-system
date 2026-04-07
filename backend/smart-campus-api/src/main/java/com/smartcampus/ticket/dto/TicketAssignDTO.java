package com.smartcampus.ticket.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TicketAssignDTO {
    @NotNull
    private Long technicianId;
}