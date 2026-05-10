package br.com.leonardosr.api.contact.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(
        @Size(max = 160) String name,
        @NotBlank @Email @Size(max = 255) String email,
        @NotBlank @Size(max = 180) String subject,
        @NotBlank @Size(max = 5000) String message) {}
