package br.com.leonardosr.api.seo.dto;

import br.com.leonardosr.api.domain.MediaAsset;
import br.com.leonardosr.api.domain.MediaAssetStatus;
import br.com.leonardosr.api.domain.SeoSetting;

public record PublicSeoDto(
        String defaultTitle,
        String defaultDescription,
        String defaultLocale,
        String defaultAuthorName,
        String defaultOgImageUrl,
        String siteUrl,
        String mediaCdnBaseUrl,
        String twitterHandle,
        String robotsPolicy,
        String googleVerification,
        String bingVerification) {

    public static PublicSeoDto from(SeoSetting seo) {
        return new PublicSeoDto(
                seo.getDefaultTitle(),
                seo.getDefaultDescription(),
                seo.getDefaultLocale(),
                seo.getDefaultAuthorName(),
                resolveOgImageUrl(seo.getDefaultOgImage()),
                normalizeSiteUrl(seo.getSiteUrl()),
                seo.getMediaCdnBaseUrl(),
                seo.getTwitterHandle(),
                seo.getRobotsPolicy(),
                seo.getGoogleVerification(),
                seo.getBingVerification());
    }

    private static String resolveOgImageUrl(MediaAsset asset) {
        if (asset == null || asset.getStatus() != MediaAssetStatus.ACTIVE) {
            return null;
        }
        return asset.getPublicUrl();
    }

    private static String normalizeSiteUrl(String siteUrl) {
        if (siteUrl == null) return null;
        return siteUrl.endsWith("/") ? siteUrl.substring(0, siteUrl.length() - 1) : siteUrl;
    }
}
