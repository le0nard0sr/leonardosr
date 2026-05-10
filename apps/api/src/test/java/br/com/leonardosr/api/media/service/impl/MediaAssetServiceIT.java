package br.com.leonardosr.api.media.service.impl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import br.com.leonardosr.api.AbstractIntegrationTest;
import br.com.leonardosr.api.domain.MediaAsset;
import br.com.leonardosr.api.domain.MediaAssetStatus;
import br.com.leonardosr.api.media.dto.ConfirmUploadRequest;
import br.com.leonardosr.api.media.dto.UploadUrlRequest;
import br.com.leonardosr.api.repository.MediaAssetRepository;
import br.com.leonardosr.api.shared.exception.ConflictException;
import br.com.leonardosr.api.shared.exception.ValidationException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;

@Transactional
class MediaAssetServiceIT extends AbstractIntegrationTest {

    @Autowired
    private MediaAssetService mediaAssetService;

    @Autowired
    private MediaAssetRepository mediaAssetRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    void uploadUrlRejectsMimeTypeOutsideAllowlist() {
        var request = new UploadUrlRequest("malicious.exe", "application/x-msdownload", 1024L, "alt", null);

        assertThatThrownBy(() -> mediaAssetService.createUploadUrl(request))
                .isInstanceOf(ValidationException.class)
                .hasMessageContaining("Tipo de arquivo");
    }

    @Test
    void uploadUrlRejectsCoverAboveFiveMegabytes() {
        var sixMb = 6L * 1024L * 1024L;
        var request = new UploadUrlRequest("capa.jpg", "image/jpeg", sixMb, "alt", "cover");

        assertThatThrownBy(() -> mediaAssetService.createUploadUrl(request))
                .isInstanceOf(ValidationException.class)
                .hasMessageContaining("limite");
    }

    @Test
    void deleteSuccedsWhenAssetIsUnreferenced() {
        var asset = mediaAssetRepository.saveAndFlush(activeAsset("media/free.jpg"));

        mediaAssetService.delete(asset.getId());

        var reloaded = mediaAssetRepository.findById(asset.getId()).orElseThrow();
        assertThat(reloaded.getStatus()).isEqualTo(MediaAssetStatus.DELETED);
        assertThat(reloaded.getDeletedAt()).isNotNull();
    }

    @Test
    void deleteIsBlockedWhenAssetIsReferencedByActiveSiteProfile() {
        seedSeoSetting();
        var asset = mediaAssetRepository.saveAndFlush(activeAsset("media/cv.pdf"));
        seedSiteProfileWithCurriculum(asset.getId());

        assertThatThrownBy(() -> mediaAssetService.delete(asset.getId()))
                .isInstanceOf(ConflictException.class)
                .hasMessageContaining("referenciada");
    }

    @Test
    void confirmUploadAcceptsNoopHeadAndMarksActive() {
        var asset = mediaAssetRepository.saveAndFlush(pendingAsset("media/draft.jpg", 2048L));

        var confirmed = mediaAssetService.confirm(asset.getId(), new ConfirmUploadRequest(null, 800, 600));

        assertThat(confirmed.getStatus()).isEqualTo(MediaAssetStatus.ACTIVE);
        assertThat(confirmed.getPublicUrl()).isNotBlank();
    }

    private MediaAsset activeAsset(String key) {
        var asset = pendingAsset(key, 1024L);
        asset.setStatus(MediaAssetStatus.ACTIVE);
        return asset;
    }

    private MediaAsset pendingAsset(String key, long sizeBytes) {
        var asset = new MediaAsset();
        asset.setStorageKey(key);
        asset.setOriginalFilename("file.jpg");
        asset.setMimeType("image/jpeg");
        asset.setSizeBytes(sizeBytes);
        asset.setAltText("alt");
        return asset;
    }

    private void seedSeoSetting() {
        jdbcTemplate.update(
                """
                INSERT INTO seo_setting
                    (default_title, default_description, default_locale, default_author_name,
                     site_url, media_cdn_base_url, robots_policy, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
                """,
                "Title",
                "Description",
                "pt_BR",
                "Author",
                "https://leonardosr.com.br",
                "https://cdn.leonardosr.com.br",
                "allow");
    }

    private void seedSiteProfileWithCurriculum(Long mediaId) {
        jdbcTemplate.update(
                """
                INSERT INTO site_profile
                    (display_name, professional_title, headline, short_bio, full_bio,
                     curriculum_media_id, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, NOW())
                """,
                "Leonardo",
                "Analista",
                "Headline",
                "Short bio",
                "Full bio",
                mediaId);
    }
}
