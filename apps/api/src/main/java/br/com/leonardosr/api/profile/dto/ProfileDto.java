package br.com.leonardosr.api.profile.dto;

import br.com.leonardosr.api.domain.MediaAsset;
import br.com.leonardosr.api.domain.MediaAssetStatus;
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
        String curriculumUrl,
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
                curriculumUrl(profile.getCurriculumMedia()),
                profile.getImageUrlAllowlist());
    }

    private static String curriculumUrl(MediaAsset curriculumMedia) {
        if (curriculumMedia == null || curriculumMedia.getStatus() != MediaAssetStatus.ACTIVE) {
            return null;
        }
        return curriculumMedia.getPublicUrl();
    }
}
