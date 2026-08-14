package com.gauranga.farm.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String identifier; // email or mobile
    private String password;
}
