package com.smartcampus.booking.controller;

import com.smartcampus.booking.dto.BookingCreateDTO;
import com.smartcampus.booking.dto.BookingDecisionDTO;
import com.smartcampus.booking.dto.BookingResponseDTO;
import com.smartcampus.booking.model.BookingStatus;
import com.smartcampus.booking.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test")
public class BookingTestController {
    
    private final BookingService bookingService;
    private static final Long TEST_USER_ID = 1L;
    
    public BookingTestController(BookingService bookingService) {
        this.bookingService = bookingService;
    }
    
    // ========== USER ENDPOINTS ==========
    
    @PostMapping("/bookings")
    public ResponseEntity<BookingResponseDTO> createBooking(@Valid @RequestBody BookingCreateDTO dto) {
        BookingResponseDTO created = bookingService.createBooking(dto, TEST_USER_ID);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @GetMapping("/bookings")
    public ResponseEntity<List<BookingResponseDTO>> getMyBookings() {
        return ResponseEntity.ok(bookingService.getUserBookings(TEST_USER_ID));
    }
    
    @GetMapping("/bookings/{id}")
    public ResponseEntity<BookingResponseDTO> getBookingById(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.getUserBookingById(id, TEST_USER_ID));
    }
    
    @PutMapping("/bookings/{id}/cancel")
    public ResponseEntity<BookingResponseDTO> cancelBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.cancelBooking(id, TEST_USER_ID));
    }
    
    // ========== ADMIN ENDPOINTS ==========
    
    @GetMapping("/admin/bookings")
    public ResponseEntity<List<BookingResponseDTO>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }
    
    @GetMapping("/admin/bookings/pending")
    public ResponseEntity<List<BookingResponseDTO>> getPendingBookings() {
        return ResponseEntity.ok(bookingService.getPendingBookings());
    }
    
    // Approve - Multiple versions to ensure it works
    @PutMapping("/admin/bookings/{id}/approve")
    public ResponseEntity<BookingResponseDTO> approveBooking(@PathVariable Long id) {
        BookingResponseDTO approved = bookingService.approveBooking(id);
        return ResponseEntity.ok(approved);
    }
    
    @PostMapping("/admin/bookings/{id}/approve")
    public ResponseEntity<BookingResponseDTO> approveBookingPost(@PathVariable Long id) {
        BookingResponseDTO approved = bookingService.approveBooking(id);
        return ResponseEntity.ok(approved);
    }
    
    // Reject
    @PutMapping("/admin/bookings/{id}/reject")
    public ResponseEntity<BookingResponseDTO> rejectBooking(
            @PathVariable Long id,
            @Valid @RequestBody BookingDecisionDTO decision) {
        return ResponseEntity.ok(bookingService.rejectBooking(id, decision.getReason()));
    }
    
    @GetMapping("/admin/bookings/{id}")
    public ResponseEntity<BookingResponseDTO> getBookingByIdAdmin(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }
    
    @GetMapping("/admin/bookings/status/{status}")
    public ResponseEntity<List<BookingResponseDTO>> getBookingsByStatus(@PathVariable String status) {
        try {
            BookingStatus bookingStatus = BookingStatus.valueOf(status.toUpperCase());
            return ResponseEntity.ok(bookingService.getBookingsByStatus(bookingStatus));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}