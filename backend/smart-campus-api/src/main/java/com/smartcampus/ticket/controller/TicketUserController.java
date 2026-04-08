package com.smartcampus.ticket.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.smartcampus.ticket.dto.TicketCreateDTO;
import com.smartcampus.ticket.dto.TicketResponseDTO;
import com.smartcampus.ticket.service.TicketImageService;
import com.smartcampus.ticket.service.TicketService;

@RestController
@RequestMapping("/api/user/tickets")
public class TicketUserController {

    private final TicketService ticketService;
    private final TicketImageService ticketImageService;

    public TicketUserController(TicketService ticketService, TicketImageService ticketImageService) {
        this.ticketService = ticketService;
        this.ticketImageService = ticketImageService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TicketResponseDTO> createTicket(
            @ModelAttribute TicketCreateDTO dto,
            @RequestParam(value = "images", required = false) List<MultipartFile> images) {

        Long currentUserId = 2L; // temporary for testing

        TicketResponseDTO createdTicket = ticketService.createTicket(dto, currentUserId);

        if (images != null && !images.isEmpty()) {
            ticketImageService.uploadImages(createdTicket.getId(), images);
        }

        return ResponseEntity.ok(createdTicket);
    }

    @GetMapping
    public ResponseEntity<List<TicketResponseDTO>> getMyTickets() {
        Long currentUserId = 2L; // temporary for testing
        return ResponseEntity.ok(ticketService.getMyTickets(currentUserId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketResponseDTO> getTicketById(@PathVariable Long id) {
        Long currentUserId = 2L; // temporary for testing
        return ResponseEntity.ok(ticketService.getTicketById(id, currentUserId));
    }
}