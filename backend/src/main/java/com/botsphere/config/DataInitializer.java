package com.botsphere.config;

import com.botsphere.entity.FAQ;
import com.botsphere.repository.FAQRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private FAQRepository faqRepository;
    
    @Override
    public void run(String... args) throws Exception {
        if (faqRepository.count() == 0) {
            // Initialize comprehensive FAQs
            faqRepository.save(new FAQ("What are your business hours?", 
                "Our business hours are Monday to Friday, 9 AM to 6 PM EST. We are closed on weekends and major holidays.", "General"));
            
            faqRepository.save(new FAQ("How can I reset my password?", 
                "You can reset your password by clicking 'Forgot Password' on the login page and following the instructions sent to your email.", "Account"));
            
            faqRepository.save(new FAQ("How do I contact support?", 
                "You can contact support by creating a ticket through this chat, emailing support@botsphere.com, or calling 1-800-BOTSPHERE.", "Support"));
            
            faqRepository.save(new FAQ("What payment methods do you accept?", 
                "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and cryptocurrency payments.", "Billing"));
            
            faqRepository.save(new FAQ("How do I cancel my subscription?", 
                "You can cancel your subscription anytime from your account settings under 'Billing & Subscription' or contact our support team.", "Billing"));
            
            faqRepository.save(new FAQ("Is my data secure?", 
                "Yes, we use enterprise-grade encryption, secure data centers, and comply with GDPR, CCPA, and SOC 2 standards to protect your data.", "Security"));
            
            faqRepository.save(new FAQ("How do I integrate the chatbot with my website?", 
                "You can integrate our chatbot using our JavaScript widget, REST API, or WordPress plugin. Full documentation is available in your dashboard.", "Integration"));
            
            faqRepository.save(new FAQ("What languages does the chatbot support?", 
                "Our AI chatbot supports over 50 languages including English, Spanish, French, German, Chinese, Japanese, and many more.", "Features"));
            
            faqRepository.save(new FAQ("Can I customize the chatbot responses?", 
                "Yes, you can train the chatbot with custom responses, upload your own knowledge base, and configure conversation flows.", "Features"));
            
            faqRepository.save(new FAQ("Do you offer a free trial?", 
                "Yes, we offer a 14-day free trial with full access to all features. No credit card required to start your trial.", "General"));
        }
    }
}