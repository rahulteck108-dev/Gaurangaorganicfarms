package com.gauranga.farm.controller;

import com.gauranga.farm.model.ContactMessage;
import com.gauranga.farm.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @PostMapping
    public ResponseEntity<?> submitContactMessage(@RequestBody ContactMessage contactMessage) {
        contactMessageRepository.save(contactMessage);
        return ResponseEntity.ok(Map.of("message", "Message saved successfully"));
    }
}
