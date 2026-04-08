package com.smartcampus.ticket.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.smartcampus.ticket.model.TicketImage;

public interface TicketImageService {

    List<TicketImage> uploadImages(Long ticketId, List<MultipartFile> files);

    List<TicketImage> getImagesByTicketId(Long ticketId);
}