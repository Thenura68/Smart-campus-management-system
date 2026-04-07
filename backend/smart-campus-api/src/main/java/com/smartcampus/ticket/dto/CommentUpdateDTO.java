package com.smartcampus.ticket.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CommentUpdateDTO {
    @NotBlank
    private String message;
}