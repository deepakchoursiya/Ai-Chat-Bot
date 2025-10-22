package com.botsphere;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class BotSphereApplication {
    public static void main(String[] args) {
        SpringApplication.run(BotSphereApplication.class, args);
    }
    
    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        System.out.println("\n=== BotSphere Backend Started Successfully ===");
        System.out.println("Server running on: http://localhost:8081");
        System.out.println("Chat API endpoint: http://localhost:8081/api/chat/message");
        System.out.println("Health check: http://localhost:8081/api/chat/health");
        System.out.println("============================================\n");
    }
}