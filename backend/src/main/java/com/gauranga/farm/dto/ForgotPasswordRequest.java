package com.gauranga.farm.dto;

import lombok.Data;

@Data
public class ForgotPasswordRequest {
    private String email;
    private String mobile;
    private String newPassword;
}
