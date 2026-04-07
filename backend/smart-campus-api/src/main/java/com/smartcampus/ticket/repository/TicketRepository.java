package com.smartcampus.ticket.repository;

import com.smartcampus.ticket.model.Ticket;
import com.smartcampus.ticket.model.TicketStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByCreatedByOrderByCreatedAtDesc(Long createdBy);
    List<Ticket> findByAssignedToOrderByCreatedAtDesc(Long assignedTo);
    List<Ticket> findByStatusOrderByCreatedAtDesc(TicketStatus status);
}