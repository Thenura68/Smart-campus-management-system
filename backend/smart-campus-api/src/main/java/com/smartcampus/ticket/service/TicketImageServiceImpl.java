package com.smartcampus.ticket.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.smartcampus.ticket.model.TicketImage;
import com.smartcampus.ticket.repository.TicketImageRepository;

@Service
public class TicketImageServiceImpl implements TicketImageService {

    private final TicketImageRepository ticketImageRepository;

    private static final String UPLOAD_DIR = "uploads/tickets";

    public TicketImageServiceImpl(TicketImageRepository ticketImageRepository) {
        this.ticketImageRepository = ticketImageRepository;
    }

    @Override
    public List<TicketImage> uploadImages(Long ticketId, List<MultipartFile> files) {

        if (files == null || files.isEmpty()) {
            return List.of();
        }

        if (files.size() > 3) {
            throw new RuntimeException("Maximum 3 images allowed");
        }

        List<TicketImage> savedImages = new ArrayList<>();

        try {

            Path uploadPath = Paths.get(UPLOAD_DIR).toAbsolutePath().normalize();

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            for (MultipartFile file : files) {

                String contentType = file.getContentType();

                if (contentType == null || !contentType.startsWith("image/")) {
                    throw new RuntimeException("Only image files are allowed");
                }

                String originalFileName = file.getOriginalFilename();

                String safeFileName =
                        UUID.randomUUID() + "_" + (originalFileName != null ? originalFileName : "image");

                Path targetPath = uploadPath.resolve(safeFileName);

                Files.copy(file.getInputStream(), targetPath);

                TicketImage image = new TicketImage();
                image.setTicketId(ticketId);
                image.setFileName(originalFileName);
                image.setFilePath(targetPath.toString());
                image.setFileSize(file.getSize());
                image.setUploadedAt(LocalDateTime.now());

                savedImages.add(ticketImageRepository.save(image));
            }

        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to upload image: " + e.getMessage());
        }

        return savedImages;
    }

    @Override
    public List<TicketImage> getImagesByTicketId(Long ticketId) {
        return ticketImageRepository.findByTicketId(ticketId);
    }
}