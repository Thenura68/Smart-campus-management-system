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

import com.smartcampus.ticket.dto.TicketImageResponseDTO;
import com.smartcampus.ticket.dto.TicketResolutionDTO;
import com.smartcampus.ticket.dto.TicketResponseDTO;
import com.smartcampus.ticket.dto.TicketStatusUpdateDTO;
import com.smartcampus.ticket.service.TicketImageService;
import com.smartcampus.ticket.service.TicketService;

@RestController
@RequestMapping("/api/technician/tickets")
@PreAuthorize("hasRole('TECHNICIAN')")  // ← ADD THIS - Only TECHNICIAN can access
public class TicketTechnicianController {

    private final TicketService ticketService;
    private final TicketImageService ticketImageService;

    public TicketTechnicianController(TicketService ticketService, TicketImageService ticketImageService) {
        this.ticketService = ticketService;
        this.ticketImageService = ticketImageService;
    }

    @GetMapping
    public ResponseEntity<List<TicketResponseDTO>> getAssignedTickets(
            @AuthenticationPrincipal UserDetails userDetails) {  // ← ADD THIS PARAMETER
        
        Long technicianId = Long.parseLong(userDetails.getUsername());  // ← Get technician ID from JWT (NO MORE HARDCODED!)
        System.out.println("Technician ID: " + technicianId + " is viewing assigned tickets");
        
        return ResponseEntity.ok(ticketService.getAssignedTickets(technicianId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateTicketStatus(
            @PathVariable Long id,
            @RequestBody TicketStatusUpdateDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {  // ← ADD THIS PARAMETER
        
        Long technicianId = Long.parseLong(userDetails.getUsername());  // ← Get technician ID from JWT
        System.out.println("Technician ID: " + technicianId + " is updating ticket " + id + " status to " + dto.getStatus());
        
        ticketService.updateTicketStatus(id, dto.getStatus(), technicianId);
        return ResponseEntity.ok("Ticket status updated successfully");
    }

    @PutMapping("/{id}/resolution")
    public ResponseEntity<String> updateResolution(
            @PathVariable Long id,
            @RequestBody TicketResolutionDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {  // ← ADD THIS PARAMETER
        
        Long technicianId = Long.parseLong(userDetails.getUsername());
        System.out.println("Technician ID: " + technicianId + " is adding resolution to ticket " + id);
        
        ticketService.updateResolution(id, dto.getResolutionNotes(), technicianId);
        return ResponseEntity.ok("Resolution updated successfully");
    }

    @GetMapping("/{id}/images")
    public ResponseEntity<List<TicketImageResponseDTO>> getTicketImages(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {  // ← ADD THIS PARAMETER
        
        Long technicianId = Long.parseLong(userDetails.getUsername());
        System.out.println("Technician ID: " + technicianId + " is viewing images for ticket " + id);
        
        return ResponseEntity.ok(ticketImageService.getImagesByTicketIdForTechnician(id, technicianId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTicket(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {  // ← ADD THIS PARAMETER
        
        Long technicianId = Long.parseLong(userDetails.getUsername());
        System.out.println("Technician ID: " + technicianId + " is deleting ticket " + id);
        
        ticketService.deleteTicketForTechnician(id, technicianId);
        return ResponseEntity.ok("Ticket deleted successfully");
    }
}