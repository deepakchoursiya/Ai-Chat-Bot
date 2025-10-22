package com.botsphere.dto;

public class TicketRequest {
    private String subject;
    private String description;
    private String customerEmail;
    
    public TicketRequest() {}
    
    public TicketRequest(String subject, String description, String customerEmail) {
        this.subject = subject;
        this.description = description;
        this.customerEmail = customerEmail;
    }
    
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }
}