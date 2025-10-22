package com.botsphere.controller;

import com.botsphere.entity.FAQ;
import com.botsphere.service.FAQService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/faq")
@CrossOrigin(origins = "http://localhost:5173")
public class FAQController {
    
    @Autowired
    private FAQService faqService;
    
    @GetMapping
    public ResponseEntity<List<FAQ>> getAllFAQs() {
        return ResponseEntity.ok(faqService.getAllFAQs());
    }
    
    @PostMapping
    public ResponseEntity<FAQ> createFAQ(@RequestBody FAQ faq) {
        return ResponseEntity.ok(faqService.saveFAQ(faq));
    }
}