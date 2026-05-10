package br.com.leonardosr.api.domain;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "media_asset")
public class MediaAsset {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "storage_key", nullable = false, unique = true, length = 512)
  private String storageKey;

  @Column(name = "public_url", length = 1024)
  private String publicUrl;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 32)
  private MediaAssetStatus status = MediaAssetStatus.PENDING;

  @Column(name = "original_filename", nullable = false)
  private String originalFilename;

  @Column(name = "mime_type", nullable = false, length = 128)
  private String mimeType;

  @Column(name = "size_bytes", nullable = false)
  private long sizeBytes;

  private Integer width;
  private Integer height;

  @Column(name = "blur_data_url", columnDefinition = "text")
  private String blurDataUrl;

  @Column(length = 128)
  private String checksum;

  @Column(name = "alt_text", nullable = false)
  private String altText;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "created_by")
  private AppUser createdBy;

  @Column(name = "created_at", nullable = false)
  private OffsetDateTime createdAt;

  @Column(name = "updated_at", nullable = false)
  private OffsetDateTime updatedAt;

  @Column(name = "deleted_at")
  private OffsetDateTime deletedAt;

  @PrePersist
  void prePersist() {
    var now = OffsetDateTime.now();
    createdAt = now;
    updatedAt = now;
  }

  @PreUpdate
  void preUpdate() {
    updatedAt = OffsetDateTime.now();
  }

  public Long getId() {
    return id;
  }

  public String getStorageKey() {
    return storageKey;
  }

  public void setStorageKey(String storageKey) {
    this.storageKey = storageKey;
  }

  public String getPublicUrl() {
    return publicUrl;
  }

  public void setPublicUrl(String publicUrl) {
    this.publicUrl = publicUrl;
  }

  public MediaAssetStatus getStatus() {
    return status;
  }

  public void setStatus(MediaAssetStatus status) {
    this.status = status;
  }

  public String getOriginalFilename() {
    return originalFilename;
  }

  public void setOriginalFilename(String originalFilename) {
    this.originalFilename = originalFilename;
  }

  public String getMimeType() {
    return mimeType;
  }

  public void setMimeType(String mimeType) {
    this.mimeType = mimeType;
  }

  public long getSizeBytes() {
    return sizeBytes;
  }

  public void setSizeBytes(long sizeBytes) {
    this.sizeBytes = sizeBytes;
  }

  public String getAltText() {
    return altText;
  }

  public void setAltText(String altText) {
    this.altText = altText;
  }

  public OffsetDateTime getDeletedAt() {
    return deletedAt;
  }

  public void setWidth(Integer width) {
    this.width = width;
  }

  public void setHeight(Integer height) {
    this.height = height;
  }

  public void setChecksum(String checksum) {
    this.checksum = checksum;
  }

  public void markDeleted() {
    status = MediaAssetStatus.DELETED;
    deletedAt = OffsetDateTime.now();
  }
}
