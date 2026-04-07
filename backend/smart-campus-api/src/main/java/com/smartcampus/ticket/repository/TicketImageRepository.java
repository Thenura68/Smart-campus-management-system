package com.smartcampus.ticket.repository;

import com.smartcampus.ticket.model.TicketImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketImageRepository extends JpaRepository<TicketImage, Long> {
    List<TicketImage> findByTicketId(Long ticketId);
}