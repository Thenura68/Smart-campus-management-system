package com.smartcampus.ticket.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.smartcampus.ticket.dto.TicketCreateDTO;
import com.smartcampus.ticket.dto.TicketImageResponseDTO;
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
            @RequestPart(value = "images", required = false) MultipartFile[] images) {

        Long currentUserId = 2L;

        System.out.println("Images received in controller: " + (images == null ? 0 : images.length));
        if (images != null) {
            for (MultipartFile image : images) {
                System.out.println("Controller file: " + image.getOriginalFilename());
            }
        }

        TicketResponseDTO createdTicket = ticketService.createTicket(dto, currentUserId);

        if (images != null && images.length > 0) {
            ticketImageService.uploadImages(createdTicket.getId(), java.util.Arrays.asList(images));
        }

        return ResponseEntity.ok(createdTicket);
    }

    @GetMapping
    public ResponseEntity<List<TicketResponseDTO>> getMyTickets() {
        Long currentUserId = 2L;
        return ResponseEntity.ok(ticketService.getMyTickets(currentUserId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketResponseDTO> getTicketById(@PathVariable Long id) {
        Long currentUserId = 2L;
        return ResponseEntity.ok(ticketService.getTicketById(id, currentUserId));
    }

    @GetMapping("/{id}/images")
    public ResponseEntity<List<TicketImageResponseDTO>> getTicketImages(@PathVariable Long id) {
        Long currentUserId = 2L;
        return ResponseEntity.ok(ticketImageService.getImagesByTicketId(id, currentUserId));
    }


//TEMPORARYYYYyyy
    @PostMapping(value = "/test-upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> testUpload(
            @RequestPart(value = "images", required = false) MultipartFile[] images) {

        System.out.println("TEST images count = " + (images == null ? 0 : images.length));

        if (images != null) {
            for (MultipartFile file : images) {
                System.out.println("TEST file = " + file.getOriginalFilename());
            }
        }

        return ResponseEntity.ok("received = " + (images == null ? 0 : images.length));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUserTicket(@PathVariable Long id) {
        Long userId = 2L; // temporary (same as your current setup)
        ticketService.deleteTicketForUser(id, userId);
        return ResponseEntity.ok("Ticket deleted successfully");
    }

}