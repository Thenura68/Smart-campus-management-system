package com.smartcampus.ticket.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.smartcampus.ticket.dto.CommentCreateDTO;
import com.smartcampus.ticket.dto.CommentUpdateDTO;
import com.smartcampus.ticket.model.Comment;
import com.smartcampus.ticket.model.Ticket;
import com.smartcampus.ticket.repository.CommentRepository;
import com.smartcampus.ticket.repository.TicketRepository;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final TicketRepository ticketRepository;

    public CommentServiceImpl(CommentRepository commentRepository, TicketRepository ticketRepository) {
        this.commentRepository = commentRepository;
        this.ticketRepository = ticketRepository;
    }

    @Override
    public Comment addComment(Long ticketId, CommentCreateDTO dto, Long currentUserId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        Comment comment = new Comment();
        comment.setTicketId(ticket.getId());
        comment.setUserId(currentUserId);
        comment.setMessage(dto.getMessage());
        comment.setCreatedAt(LocalDateTime.now());
        comment.setUpdatedAt(null);

        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> getCommentsByTicketId(Long ticketId) {
        ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        return commentRepository.findByTicketIdOrderByCreatedAtAsc(ticketId);
    }

    @Override
    public Comment updateComment(Long commentId, CommentUpdateDTO dto, Long currentUserId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!comment.getUserId().equals(currentUserId)) {
            throw new RuntimeException("You can only edit your own comment");
        }

        comment.setMessage(dto.getMessage());
        comment.setUpdatedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }

    @Override
    public void deleteComment(Long commentId, Long currentUserId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!comment.getUserId().equals(currentUserId)) {
            throw new RuntimeException("You can only delete your own comment");
        }

        commentRepository.delete(comment);
    }
}