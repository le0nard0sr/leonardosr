package br.com.leonardosr.api.seo.dto;

import br.com.leonardosr.api.domain.MediaAsset;
import br.com.leonardosr.api.domain.MediaAssetStatus;
import br.com.leonardosr.api.domain.SeoSetting;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class PublicSeoDtoTest {

    private SeoSetting baseSeo() {
        var seo = new SeoSetting();
        seo.setDefaultTitle("Title");
        seo.setDefaultDescription("Description");
        seo.setDefaultLocale("pt_BR");
        seo.setDefaultAuthorName("Author");
        seo.setSiteUrl("https://leonardosr.com.br");
        seo.setMediaCdnBaseUrl("https://cdn.leonardosr.com.br");
        seo.setRobotsPolicy("disallow_admin");
        return seo;
    }

    @Test
    void from_withoutOgImage_returnsNullOgImageUrl() {
        var dto = PublicSeoDto.from(baseSeo());
        assertThat(dto.defaultOgImageUrl()).isNull();
    }

    @Test
    void from_withPendingOgImage_returnsNullOgImageUrl() {
        var seo = baseSeo();
        var asset = new MediaAsset();
        asset.setStatus(MediaAssetStatus.PENDING);
        asset.setPublicUrl("https://cdn.leonardosr.com.br/og.png");
        seo.setDefaultOgImage(asset);
        assertThat(PublicSeoDto.from(seo).defaultOgImageUrl()).isNull();
    }

    @Test
    void from_withActiveOgImage_returnsOgImageUrl() {
        var seo = baseSeo();
        var asset = new MediaAsset();
        asset.setStatus(MediaAssetStatus.ACTIVE);
        asset.setPublicUrl("https://cdn.leonardosr.com.br/og.png");
        seo.setDefaultOgImage(asset);
        assertThat(PublicSeoDto.from(seo).defaultOgImageUrl())
                .isEqualTo("https://cdn.leonardosr.com.br/og.png");
    }

    @Test
    void from_withTrailingSiteUrl_normalizesUrl() {
        var seo = baseSeo();
        seo.setSiteUrl("https://leonardosr.com.br/");
        assertThat(PublicSeoDto.from(seo).siteUrl()).isEqualTo("https://leonardosr.com.br");
    }

    @Test
    void from_siteUrlWithoutTrailingSlash_unchanged() {
        assertThat(PublicSeoDto.from(baseSeo()).siteUrl()).isEqualTo("https://leonardosr.com.br");
    }

    @Test
    void from_withVerificationTokens_exposesTokens() {
        var seo = baseSeo();
        seo.setGoogleVerification("google-token-123");
        seo.setBingVerification("bing-token-456");
        var dto = PublicSeoDto.from(seo);
        assertThat(dto.googleVerification()).isEqualTo("google-token-123");
        assertThat(dto.bingVerification()).isEqualTo("bing-token-456");
    }

    @Test
    void from_withoutVerificationTokens_returnsNulls() {
        var dto = PublicSeoDto.from(baseSeo());
        assertThat(dto.googleVerification()).isNull();
        assertThat(dto.bingVerification()).isNull();
    }
}
