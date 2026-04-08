package com.smartcampus.ticket.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartcampus.ticket.dto.TicketAssignDTO;
import com.smartcampus.ticket.dto.TicketResponseDTO;
import com.smartcampus.ticket.service.TicketService;

@RestController
@RequestMapping("/api/admin/tickets")
public class TicketAdminController {

    private final TicketService ticketService;

    public TicketAdminController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping
    public ResponseEntity<List<TicketResponseDTO>> getAllTickets() {
        return ResponseEntity.ok(ticketService.getAllTickets());
    }

    @PutMapping("/{id}/assign")
    public ResponseEntity<String> assignTechnician(
            @PathVariable Long id,
            @RequestBody TicketAssignDTO dto) {

        ticketService.assignTechnician(id, dto.getTechnicianId());

        return ResponseEntity.ok("Technician assigned successfully");
}
}