package com.gauranga.farm.controller;

import com.gauranga.farm.dto.LoginRequest;
import com.gauranga.farm.model.User;
import com.gauranga.farm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email is already in use!"));
        }
        if (userRepository.existsByMobile(user.getMobile())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Mobile number is already in use!"));
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByEmailOrMobile(
                loginRequest.getIdentifier(), loginRequest.getIdentifier());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Login successful");
                response.put("user", Map.of(
                        "id", user.getId(),
                        "fullname", user.getFullname(),
                        "email", user.getEmail(),
                        "role", user.getRole()
                ));
                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials!"));
    }
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody com.gauranga.farm.dto.ForgotPasswordRequest request) {
        Optional<User> userOptional = userRepository.findByEmailAndMobile(request.getEmail(), request.getMobile());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            userRepository.save(user);
            return ResponseEntity.ok(Map.of("message", "Password reset successful"));
        }
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "No user found with the provided email and mobile number."));
    }
}
