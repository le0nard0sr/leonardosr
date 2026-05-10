package br.com.leonardosr.api.media.service.impl;

import br.com.leonardosr.api.domain.MediaAsset;
import br.com.leonardosr.api.domain.MediaAssetStatus;
import br.com.leonardosr.api.media.dto.ConfirmUploadRequest;
import br.com.leonardosr.api.media.dto.UpdateMediaAssetRequest;
import br.com.leonardosr.api.media.dto.UploadUrlRequest;
import br.com.leonardosr.api.media.dto.UploadUrlResponse;
import br.com.leonardosr.api.media.service.IMediaAssetService;
import br.com.leonardosr.api.media.storage.StorageService;
import br.com.leonardosr.api.repository.MediaAssetRepository;
import br.com.leonardosr.api.repository.SeoSettingRepository;
import br.com.leonardosr.api.shared.exception.ConflictException;
import br.com.leonardosr.api.shared.exception.NotFoundException;
import br.com.leonardosr.api.shared.exception.ValidationException;
import java.text.Normalizer;
import java.util.Locale;
import java.util.Set;
import java.util.UUID;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MediaAssetService implements IMediaAssetService {
  private static final Set<String> ALLOWED_MIME_TYPES =
      Set.of("image/jpeg", "image/png", "image/webp", "application/pdf");
  private static final long COVER_LIMIT = 5L * 1024L * 1024L;
  private static final long INTERNAL_LIMIT = 10L * 1024L * 1024L;

  private final MediaAssetRepository repository;
  private final SeoSettingRepository seoSettingRepository;
  private final StorageService storageService;
  private final JdbcTemplate jdbcTemplate;

  public MediaAssetService(
      MediaAssetRepository repository,
      SeoSettingRepository seoSettingRepository,
      StorageService storageService,
      JdbcTemplate jdbcTemplate) {
    this.repository = repository;
    this.seoSettingRepository = seoSettingRepository;
    this.storageService = storageService;
    this.jdbcTemplate = jdbcTemplate;
  }

  @Transactional
  @Override
  public UploadUrlResponse createUploadUrl(UploadUrlRequest request) {
    validateUpload(request.mimeType(), request.sizeBytes(), request.usage());
    var storageKey =
        "media/%s/%s-%s"
            .formatted(
                request.usage() == null || request.usage().isBlank()
                    ? "general"
                    : slug(request.usage()),
                UUID.randomUUID(),
                slug(request.originalFilename()));
    var target =
        storageService.createUploadTarget(storageKey, request.mimeType(), request.sizeBytes());

    var asset = new MediaAsset();
    asset.setStorageKey(storageKey);
    asset.setOriginalFilename(request.originalFilename());
    asset.setMimeType(request.mimeType());
    asset.setSizeBytes(request.sizeBytes());
    asset.setAltText(request.altText());
    asset.setPublicUrl(publicUrl(storageKey));
    repository.save(asset);

    return new UploadUrlResponse(asset.getId(), storageKey, target.uploadUrl(), target.headers());
  }

  @Transactional
  @Override
  public MediaAsset confirm(Long id, ConfirmUploadRequest request) {
    var asset =
        repository.findById(id).orElseThrow(() -> new NotFoundException("Mídia não encontrada"));
    var metadata = storageService.head(asset.getStorageKey());
    if (metadata.sizeBytes() > 0 && metadata.sizeBytes() != asset.getSizeBytes()) {
      throw new ValidationException("Tamanho do objeto enviado não confere com o declarado");
    }
    if (metadata.contentType() != null
        && !"application/octet-stream".equals(metadata.contentType())
        && !metadata.contentType().equals(asset.getMimeType())) {
      throw new ValidationException("Content-Type do objeto enviado não confere com o declarado");
    }
    asset.setChecksum(request.checksum() != null ? request.checksum() : metadata.checksum());
    asset.setWidth(request.width());
    asset.setHeight(request.height());
    asset.setStatus(MediaAssetStatus.ACTIVE);
    asset.setPublicUrl(publicUrl(asset.getStorageKey()));
    return repository.save(asset);
  }

  @Transactional
  @Override
  public MediaAsset update(Long id, UpdateMediaAssetRequest request) {
    var asset =
        repository.findById(id).orElseThrow(() -> new NotFoundException("Mídia não encontrada"));
    asset.setAltText(request.altText());
    return repository.save(asset);
  }

  @Transactional
  @Override
  public void delete(Long id) {
    var asset =
        repository.findById(id).orElseThrow(() -> new NotFoundException("Mídia não encontrada"));
    if (hasActiveReference(id)) {
      throw new ConflictException("Mídia referenciada por entidade ativa não pode ser removida");
    }
    storageService.deleteObject(asset.getStorageKey());
    asset.markDeleted();
    repository.save(asset);
  }

  private void validateUpload(String mimeType, long sizeBytes, String usage) {
    if (!ALLOWED_MIME_TYPES.contains(mimeType)) {
      throw new ValidationException("Tipo de arquivo não permitido");
    }
    var limit = "cover".equalsIgnoreCase(usage) ? COVER_LIMIT : INTERNAL_LIMIT;
    if (sizeBytes > limit) {
      throw new ValidationException("Arquivo excede o limite permitido para o uso informado");
    }
  }

  private boolean hasActiveReference(Long id) {
    var sql =
        """
        SELECT EXISTS (
            SELECT 1 FROM content WHERE cover_image_id = ? AND status <> 'ARCHIVED'
            UNION ALL SELECT 1 FROM project WHERE cover_image_id = ? AND status <> 'ARCHIVED'
            UNION ALL SELECT 1 FROM series WHERE cover_image_id = ? AND status <> 'ARCHIVED'
            UNION ALL SELECT 1 FROM site_profile WHERE curriculum_media_id = ?
            UNION ALL SELECT 1 FROM seo_setting WHERE default_og_image_id = ?
            UNION ALL SELECT 1 FROM content WHERE (type_specific_fields ->> 'diagramMediaId') = CAST(? AS TEXT)
        )
        """;
    return Boolean.TRUE.equals(
        jdbcTemplate.queryForObject(sql, Boolean.class, id, id, id, id, id, id));
  }

  private String publicUrl(String storageKey) {
    var base =
        seoSettingRepository.findAll().stream()
            .findFirst()
            .map(seo -> seo.getMediaCdnBaseUrl())
            .orElse("http://localhost:9000/leonardosr-media");
    return base.replaceAll("/$", "") + "/" + storageKey;
  }

  private String slug(String value) {
    return Normalizer.normalize(value.toLowerCase(Locale.ROOT), Normalizer.Form.NFD)
        .replaceAll("\\p{M}", "")
        .replaceAll("[^a-z0-9.]+", "-")
        .replaceAll("(^-|-$)", "");
  }
}
