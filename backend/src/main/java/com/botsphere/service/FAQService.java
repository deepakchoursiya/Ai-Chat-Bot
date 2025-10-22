package com.botsphere.service;

import com.botsphere.entity.FAQ;
import com.botsphere.repository.FAQRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FAQService {
    
    @Autowired
    private FAQRepository faqRepository;
    
    public FAQ findBestMatch(String userQuestion) {
        List<FAQ> faqs = faqRepository.findByActiveTrue();
        
        String lowerQuestion = userQuestion.toLowerCase();
        
        // Simple keyword matching - can be enhanced with ML
        for (FAQ faq : faqs) {
            String[] keywords = faq.getQuestion().toLowerCase().split(" ");
            int matches = 0;
            
            for (String keyword : keywords) {
                if (lowerQuestion.contains(keyword) && keyword.length() > 3) {
                    matches++;
                }
            }
            
            // If 60% of keywords match, consider it a good match
            if (matches >= keywords.length * 0.6) {
                return faq;
            }
        }
        
        return null;
    }
    
    public List<FAQ> getAllFAQs() {
        return faqRepository.findByActiveTrue();
    }
    
    public FAQ saveFAQ(FAQ faq) {
        return faqRepository.save(faq);
    }
}