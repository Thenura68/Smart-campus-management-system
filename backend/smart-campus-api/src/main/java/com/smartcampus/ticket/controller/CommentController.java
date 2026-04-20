package com.smartcampus.ticket.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartcampus.ticket.dto.CommentCreateDTO;
import com.smartcampus.ticket.dto.CommentUpdateDTO;
import com.smartcampus.ticket.model.Comment;
import com.smartcampus.ticket.service.CommentService;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin
public class CommentController {

    private final CommentService commentService;

    // constructor injection
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // add a comment
    @PostMapping("/ticket/{ticketId}")
    public Comment addComment(
            @PathVariable Long ticketId,
            @RequestBody CommentCreateDTO dto
    ) {
        Long currentUserId = 2L; // 🔥 temporary (later from JWT)
        return commentService.addComment(ticketId, dto, currentUserId);
    }

    // get comments
    @GetMapping("/ticket/{ticketId}")
    public List<Comment> getComments(@PathVariable Long ticketId) {
        return commentService.getCommentsByTicketId(ticketId);
    }

    // update comments
    @PutMapping("/{commentId}")
    public Comment updateComment(
            @PathVariable Long commentId,
            @RequestBody CommentUpdateDTO dto
    ) {
        Long currentUserId = 2L;
        return commentService.updateComment(commentId, dto, currentUserId);
    }

    // delete comments
    @DeleteMapping("/{commentId}")
    public void deleteComment(@PathVariable Long commentId) {
        Long currentUserId = 2L;
        commentService.deleteComment(commentId, currentUserId);
    }
}