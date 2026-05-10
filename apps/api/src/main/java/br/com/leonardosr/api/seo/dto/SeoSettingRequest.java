package br.com.leonardosr.api.seo.dto;

import jakarta.validation.constraints.NotBlank;

public record SeoSettingRequest(
        @NotBlank String defaultTitle,
        @NotBlank String defaultDescription,
        @NotBlank String defaultLocale,
        @NotBlank String defaultAuthorName,
        @NotBlank String siteUrl,
        @NotBlank String mediaCdnBaseUrl,
        String twitterHandle,
        @NotBlank String robotsPolicy,
        String googleVerification,
        String bingVerification) {}
