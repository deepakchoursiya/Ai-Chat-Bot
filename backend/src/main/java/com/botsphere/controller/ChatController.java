package com.botsphere.controller;

import com.botsphere.dto.ChatRequest;
import com.botsphere.dto.ChatResponse;
import com.botsphere.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class ChatController {
    
    @Autowired
    private ChatService chatService;
    
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Chat service is running!");
    }
    
    @PostMapping("/message")
    public ResponseEntity<ChatResponse> sendMessage(@RequestBody ChatRequest request) {
        try {
            String response = chatService.generateResponse(request.getMessage());
            return ResponseEntity.ok(new ChatResponse(response, request.getSessionId()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(new ChatResponse(
                "I apologize, but I'm experiencing technical difficulties. Please try again in a moment.", 
                request.getSessionId()
            ));
        }
    }
}