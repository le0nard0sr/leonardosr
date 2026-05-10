package br.com.leonardosr.api.media.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record UploadUrlRequest(
        @NotBlank String originalFilename,
        @NotBlank String mimeType,
        @Positive long sizeBytes,
        @NotBlank String altText,
        String usage) {}
