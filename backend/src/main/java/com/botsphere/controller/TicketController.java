package com.botsphere.controller;

import com.botsphere.entity.Ticket;
import com.botsphere.service.TicketService;
import com.botsphere.dto.TicketRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:5173")
public class TicketController {
    
    @Autowired
    private TicketService ticketService;
    
    @PostMapping
    public ResponseEntity<Ticket> createTicket(@RequestBody TicketRequest request) {
        Ticket ticket = ticketService.createTicket(
            request.getSubject(), 
            request.getDescription(), 
            request.getCustomerEmail()
        );
        return ResponseEntity.ok(ticket);
    }
    
    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {
        return ResponseEntity.ok(ticketService.getAllTickets());
    }
    
    @GetMapping("/open")
    public ResponseEntity<List<Ticket>> getOpenTickets() {
        return ResponseEntity.ok(ticketService.getOpenTickets());
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<Ticket> updateStatus(@PathVariable Long id, @RequestParam String status) {
        Ticket.TicketStatus ticketStatus = Ticket.TicketStatus.valueOf(status.toUpperCase());
        Ticket updated = ticketService.updateTicketStatus(id, ticketStatus);
        return ResponseEntity.ok(updated);
    }
}