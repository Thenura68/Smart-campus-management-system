package com.smartcampus.ticket.service;

import java.util.List;

import com.smartcampus.ticket.dto.TicketCreateDTO;
import com.smartcampus.ticket.dto.TicketResponseDTO;

public interface TicketService {

    TicketResponseDTO createTicket(TicketCreateDTO dto, Long currentUserId);

    List<TicketResponseDTO> getMyTickets(Long currentUserId);

    TicketResponseDTO getTicketById(Long ticketId, Long currentUserId);

    List<TicketResponseDTO> getAllTickets();
}