package com.smartcampus.ticket.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.smartcampus.notification.model.NotificationType;
import com.smartcampus.notification.service.NotificationService;
import com.smartcampus.ticket.dto.TicketCreateDTO;
import com.smartcampus.ticket.dto.TicketResponseDTO;
import com.smartcampus.ticket.model.Ticket;
import com.smartcampus.ticket.model.TicketStatus;
import com.smartcampus.ticket.repository.TicketRepository;

@Service
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;
    private final NotificationService notificationService;

    public TicketServiceImpl(TicketRepository ticketRepository,NotificationService notificationService) {
        this.ticketRepository = ticketRepository;
        this.notificationService = notificationService;

    }

    @Override
    public TicketResponseDTO createTicket(TicketCreateDTO dto, Long currentUserId) {
        Ticket ticket = new Ticket();
        ticket.setTitle(dto.getTitle());
        ticket.setDescription(dto.getDescription());
        ticket.setPriority(dto.getPriority());
        ticket.setStatus(TicketStatus.OPEN);
        ticket.setCreatedBy(currentUserId);
        ticket.setResourceId(dto.getResourceId());
        ticket.setAssignedTo(null);
        ticket.setResolutionNotes(null);
        ticket.setCreatedAt(LocalDateTime.now());
        ticket.setUpdatedAt(null);

        Ticket savedTicket = ticketRepository.save(ticket);
        return mapToResponseDTO(savedTicket);
    }

    @Override
    public List<TicketResponseDTO> getMyTickets(Long currentUserId) {
        List<Ticket> tickets = ticketRepository.findByCreatedByOrderByCreatedAtDesc(currentUserId);
        List<TicketResponseDTO> responseList = new ArrayList<>();

        for (Ticket ticket : tickets) {
            responseList.add(mapToResponseDTO(ticket));
        }

        return responseList;
    }
    @Override
    public TicketResponseDTO getTicketById(Long ticketId, Long currentUserId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        if (!ticket.getCreatedBy().equals(currentUserId)) {
            throw new RuntimeException("You cannot access this ticket");
        }

        return mapToResponseDTO(ticket);
    }

    @Override
    public List<TicketResponseDTO> getAllTickets() {
        List<Ticket> tickets = ticketRepository.findAll();
        List<TicketResponseDTO> responseList = new ArrayList<>();

        for (Ticket ticket : tickets) {
            responseList.add(mapToResponseDTO(ticket));
        }

        return responseList;
    }

    @Override
    public void assignTechnician(Long ticketId, Long technicianId) {

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        ticket.setAssignedTo(technicianId);
        ticket.setStatus(TicketStatus.ASSIGNED);
        ticket.setUpdatedAt(LocalDateTime.now());

        ticketRepository.save(ticket);

        notificationService.createNotification(
            technicianId,
            NotificationType.TICKET_ASSIGNED,
            "You have been assigned to ticket #" + ticketId,
            ticketId
        );
    }

    @Override
    public List<TicketResponseDTO> getAssignedTickets(Long technicianId) {
        List<Ticket> tickets = ticketRepository.findByAssignedToOrderByCreatedAtDesc(technicianId);
        List<TicketResponseDTO> responseList = new ArrayList<>();

        for (Ticket ticket : tickets) {
            responseList.add(mapToResponseDTO(ticket));
        }

        return responseList;
    }

    @Override
    public void updateTicketStatus(Long ticketId, String status, Long technicianId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        if (ticket.getAssignedTo() == null || !ticket.getAssignedTo().equals(technicianId)) {
            throw new RuntimeException("This ticket is not assigned to this technician");
        }

        ticket.setStatus(TicketStatus.valueOf(status.toUpperCase()));
        ticket.setUpdatedAt(LocalDateTime.now());

        ticketRepository.save(ticket);
    }

    @Override
    public void updateResolution(Long ticketId, String resolutionNotes, Long technicianId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        if (ticket.getAssignedTo() == null || !ticket.getAssignedTo().equals(technicianId)) {
            throw new RuntimeException("This ticket is not assigned to this technician");
        }

        ticket.setResolutionNotes(resolutionNotes);
        ticket.setUpdatedAt(LocalDateTime.now());

        ticketRepository.save(ticket);
    }


    private TicketResponseDTO mapToResponseDTO(Ticket ticket) {
        TicketResponseDTO dto = new TicketResponseDTO();
        dto.setId(ticket.getId());
        dto.setTitle(ticket.getTitle());
        dto.setDescription(ticket.getDescription());
        dto.setPriority(ticket.getPriority());
        dto.setStatus(ticket.getStatus().name());
        dto.setCreatedBy(ticket.getCreatedBy());
        dto.setResourceId(ticket.getResourceId());
        dto.setAssignedTo(ticket.getAssignedTo());
        dto.setResolutionNotes(ticket.getResolutionNotes());
        dto.setCreatedAt(ticket.getCreatedAt());
        dto.setUpdatedAt(ticket.getUpdatedAt());
        return dto;
    }
}