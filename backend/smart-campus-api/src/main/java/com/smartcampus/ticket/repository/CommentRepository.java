package com.smartcampus.ticket.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smartcampus.ticket.model.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    //Get all comments for a ticket
    List<Comment> findByTicketId(Long ticketId);

}