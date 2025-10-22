package com.botsphere.service;

import com.botsphere.entity.Ticket;
import com.botsphere.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TicketService {
    
    @Autowired
    private TicketRepository ticketRepository;
    
    public Ticket createTicket(String subject, String description, String customerEmail) {
        Ticket ticket = new Ticket();
        ticket.setSubject(subject);
        ticket.setDescription(description);
        ticket.setCustomerEmail(customerEmail);
        ticket.setCreatedAt(LocalDateTime.now());
        ticket.setUpdatedAt(LocalDateTime.now());
        
        return ticketRepository.save(ticket);
    }
    
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }
    
    public List<Ticket> getOpenTickets() {
        return ticketRepository.findByStatus(Ticket.TicketStatus.OPEN);
    }
    
    public Ticket updateTicketStatus(Long ticketId, Ticket.TicketStatus status) {
        Ticket ticket = ticketRepository.findById(ticketId).orElse(null);
        if (ticket != null) {
            ticket.setStatus(status);
            ticket.setUpdatedAt(LocalDateTime.now());
            return ticketRepository.save(ticket);
        }
        return null;
    }
    
    public Ticket assignAgent(Long ticketId, String agentName) {
        Ticket ticket = ticketRepository.findById(ticketId).orElse(null);
        if (ticket != null) {
            ticket.setAssignedAgent(agentName);
            ticket.setStatus(Ticket.TicketStatus.IN_PROGRESS);
            ticket.setUpdatedAt(LocalDateTime.now());
            return ticketRepository.save(ticket);
        }
        return null;
    }
}