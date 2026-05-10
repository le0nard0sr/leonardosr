package br.com.leonardosr.api.profile.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ProfileRequest(
        @NotBlank String displayName,
        @NotBlank String professionalTitle,
        @NotBlank String headline,
        @NotBlank String shortBio,
        @NotBlank String fullBio,
        String locationLabel,
        String linkedinUrl,
        String githubUrl,
        String twitterUrl,
        String youtubeUrl,
        @Email String contactEmailAlias,
        @Email String privacyEmailAlias,
        String imageUrlAllowlist) {}
