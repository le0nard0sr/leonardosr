package br.com.leonardosr.api.profile.dto;

import br.com.leonardosr.api.domain.SiteProfile;

public record ProfileDto(
        Long id,
        String displayName,
        String professionalTitle,
        String headline,
        String shortBio,
        String fullBio,
        String locationLabel,
        String linkedinUrl,
        String githubUrl,
        String twitterUrl,
        String youtubeUrl,
        String contactEmailAlias,
        String privacyEmailAlias,
        String imageUrlAllowlist) {
    public static ProfileDto from(SiteProfile profile) {
        return new ProfileDto(
                profile.getId(),
                profile.getDisplayName(),
                profile.getProfessionalTitle(),
                profile.getHeadline(),
                profile.getShortBio(),
                profile.getFullBio(),
                profile.getLocationLabel(),
                profile.getLinkedinUrl(),
                profile.getGithubUrl(),
                profile.getTwitterUrl(),
                profile.getYoutubeUrl(),
                profile.getContactEmailAlias(),
                profile.getPrivacyEmailAlias(),
                profile.getImageUrlAllowlist());
    }
}
