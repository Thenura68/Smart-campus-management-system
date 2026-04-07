package com.smartcampus.ticket.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartcampus.ticket.dto.TicketCreateDTO;
import com.smartcampus.ticket.dto.TicketResponseDTO;
import com.smartcampus.ticket.service.TicketService;

@RestController
@RequestMapping("/api/user/tickets")
public class TicketUserController {

    private final TicketService ticketService;

    public TicketUserController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public ResponseEntity<TicketResponseDTO> createTicket(@RequestBody TicketCreateDTO dto) {
        Long currentUserId = 2L; // temporary for testing
        TicketResponseDTO createdTicket = ticketService.createTicket(dto, currentUserId);
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