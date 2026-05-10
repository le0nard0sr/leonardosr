package br.com.leonardosr.api.seo.dto;

import br.com.leonardosr.api.domain.SeoSetting;

public record SeoSettingDto(
        Long id,
        String defaultTitle,
        String defaultDescription,
        String defaultLocale,
        String defaultAuthorName,
        String siteUrl,
        String mediaCdnBaseUrl,
        String twitterHandle,
        String robotsPolicy,
        String googleVerification,
        String bingVerification) {
    public static SeoSettingDto from(SeoSetting seo) {
        return new SeoSettingDto(
                seo.getId(),
                seo.getDefaultTitle(),
                seo.getDefaultDescription(),
                seo.getDefaultLocale(),
                seo.getDefaultAuthorName(),
                seo.getSiteUrl(),
                seo.getMediaCdnBaseUrl(),
                seo.getTwitterHandle(),
                seo.getRobotsPolicy(),
                seo.getGoogleVerification(),
                seo.getBingVerification());
    }
}
