package br.com.leonardosr.api.media.dto;

import jakarta.validation.constraints.NotBlank;

public record UpdateMediaAssetRequest(@NotBlank String altText) {}
