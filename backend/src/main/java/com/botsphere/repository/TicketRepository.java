package com.botsphere.repository;

import com.botsphere.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByStatus(Ticket.TicketStatus status);
    List<Ticket> findByCustomerEmail(String customerEmail);
    List<Ticket> findByAssignedAgent(String agentName);
}