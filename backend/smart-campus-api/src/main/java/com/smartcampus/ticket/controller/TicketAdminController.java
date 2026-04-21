package com.smartcampus.ticket.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartcampus.ticket.dto.TicketAssignDTO;
import com.smartcampus.ticket.dto.TicketImageResponseDTO;
import com.smartcampus.ticket.dto.TicketResponseDTO;
import com.smartcampus.ticket.service.TicketImageService;
import com.smartcampus.ticket.service.TicketService;


@RestController
@RequestMapping("/api/admin/tickets")
@PreAuthorize("hasRole('ADMIN')")  // ← ADD THIS - Only ADMIN can access
public class TicketAdminController {

    private final TicketService ticketService;
    private final TicketImageService ticketImageService;

    public TicketAdminController(TicketService ticketService, TicketImageService ticketImageService) {
        this.ticketService = ticketService;
        this.ticketImageService = ticketImageService;
    }

    @GetMapping
    public ResponseEntity<List<TicketResponseDTO>> getAllTickets(
            @AuthenticationPrincipal UserDetails userDetails) {  // ← ADD THIS PARAMETER
        
        Long adminId = Long.parseLong(userDetails.getUsername());  // ← Get admin ID from JWT
        System.out.println("Admin ID: " + adminId + " is viewing all tickets");
        
        return ResponseEntity.ok(ticketService.getAllTickets());
    }

    @PutMapping("/{id}/assign")
    public ResponseEntity<String> assignTechnician(
            @PathVariable Long id,
            @RequestBody TicketAssignDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {  // ← ADD THIS PARAMETER
        
        Long adminId = Long.parseLong(userDetails.getUsername());
        System.out.println("Admin ID: " + adminId + " is assigning technician to ticket " + id);
        
        ticketService.assignTechnician(id, dto.getTechnicianId());
        return ResponseEntity.ok("Technician assigned successfully");
    }

    @GetMapping("/{id}/images")
    public ResponseEntity<List<TicketImageResponseDTO>> getTicketImagesForAdmin(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {  // ← ADD THIS PARAMETER
        
        Long adminId = Long.parseLong(userDetails.getUsername());
        System.out.println("Admin ID: " + adminId + " is viewing images for ticket " + id);
        
        return ResponseEntity.ok(ticketImageService.getImagesByTicketIdForAdmin(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTicket(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {  // ← ADD THIS PARAMETER
        
        Long adminId = Long.parseLong(userDetails.getUsername());
        System.out.println("Admin ID: " + adminId + " is deleting ticket " + id);
        
        ticketService.deleteTicket(id);
        return ResponseEntity.ok("Ticket and related images deleted successfully");
    }
}