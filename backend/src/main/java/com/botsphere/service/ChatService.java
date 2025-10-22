package com.botsphere.service;

import com.botsphere.entity.FAQ;
import org.springframework.ai.chat.ChatClient;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Arrays;

@Service
public class ChatService {
    
    @Autowired
    private ChatClient chatClient;
    
    @Autowired
    private FAQService faqService;
    
    @Autowired
    private TicketService ticketService;
    
    private final List<String> escalationKeywords = Arrays.asList(
        "speak to agent", "human agent", "live agent", "escalate", "manager", "supervisor"
    );
    
    public String generateResponse(String userMessage) {
        String lowerMessage = userMessage.toLowerCase();
        
        // Check for escalation keywords
        if (containsEscalationKeyword(lowerMessage)) {
            return handleEscalation();
        }
        
        // Try to find FAQ match first
        FAQ matchedFAQ = faqService.findBestMatch(userMessage);
        if (matchedFAQ != null) {
            return matchedFAQ.getAnswer() + "\n\nWas this helpful? Type 'agent' if you need further assistance.";
        }
        
        // Use AI for complex queries
        try {
            if (chatClient != null) {
                String enhancedPrompt = "You are a helpful customer service assistant. " +
                    "If the user's question seems like it needs human assistance, suggest they type 'agent'. " +
                    "User question: " + userMessage;
                UserMessage message = new UserMessage(enhancedPrompt);
                Prompt prompt = new Prompt(message);
                return chatClient.call(prompt).getResult().getOutput().getContent();
            } else {
                return getDefaultResponse(userMessage);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return getDefaultResponse(userMessage);
        }
    }
    
    private String getDefaultResponse(String userMessage) {
        String lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.contains("hello") || lowerMessage.contains("hi")) {
            return "Hello! I'm here to help you. How can I assist you today?";
        } else if (lowerMessage.contains("help")) {
            return "I'm here to help! You can ask me questions about our services, create support tickets, or request to speak with an agent.";
        } else if (lowerMessage.contains("thank")) {
            return "You're welcome! Is there anything else I can help you with?";
        } else {
            return "I understand you're asking about: \"" + userMessage + "\". " +
                   "I'm currently experiencing some technical difficulties with my AI system. " +
                   "Would you like me to create a support ticket for you, or would you prefer to speak with a live agent? " +
                   "Type 'create ticket' or 'agent' to proceed.";
        }
    }
    
    private boolean containsEscalationKeyword(String message) {
        return escalationKeywords.stream().anyMatch(message::contains);
    }
    
    private String handleEscalation() {
        return "I'm connecting you with a live agent. Please hold on...\n" +
               "In the meantime, you can also create a support ticket by typing 'create ticket'.";
    }
}