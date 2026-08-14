package com.gauranga.farm.controller;

import com.gauranga.farm.dto.ChatMessageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class AiChatController {

    @PostMapping
    public ResponseEntity<?> handleChat(@RequestBody ChatMessageRequest request) {
        String userMessage = request.getMessage().toLowerCase();
        String reply;

        // Simple keyword-based AI simulation
        if (userMessage.contains("hello") || userMessage.contains("hi")) {
            reply = "Hello! Welcome to Gauranga Organic Farm. How can I help you today?";
        } else if (userMessage.contains("delivery") || userMessage.contains("deliver")) {
            reply = "We offer next-day delivery for all orders placed before 6 PM. Everything is harvested fresh!";
        } else if (userMessage.contains("organic")) {
            reply = "Yes, all our products are 100% organic and grown without any synthetic pesticides.";
        } else if (userMessage.contains("price") || userMessage.contains("cost")) {
            reply = "You can check all our prices on the 'Shop Fresh' section of our website.";
        } else if (userMessage.contains("milk") || userMessage.contains("ghee") || userMessage.contains("dairy")) {
            reply = "Our dairy products come from premium A2 Gir cows. They are extremely healthy and fresh!";
        } else {
            reply = "Thank you for reaching out! I'm an AI assistant. For complex queries, please contact our support team at support@gaurangafarm.com.";
        }

        // To make it look like a real typing experience, we can just return the reply. 
        // The frontend will handle the typing delay.
        return ResponseEntity.ok(Map.of("reply", reply));
    }
}
