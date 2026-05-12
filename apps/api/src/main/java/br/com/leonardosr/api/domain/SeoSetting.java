package br.com.leonardosr.api.domain;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "seo_setting")
public class SeoSetting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "default_title", nullable = false, length = 180)
    private String defaultTitle;

    @Column(name = "default_description", nullable = false, length = 320)
    private String defaultDescription;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "default_og_image_id")
    private MediaAsset defaultOgImage;

    @Column(name = "default_locale", nullable = false, length = 16)
    private String defaultLocale;

    @Column(name = "default_author_name", nullable = false, length = 160)
    private String defaultAuthorName;

    @Column(name = "site_url", nullable = false, length = 512)
    private String siteUrl;

    @Column(name = "media_cdn_base_url", nullable = false, length = 512)
    private String mediaCdnBaseUrl;

    @Column(name = "twitter_handle", length = 80)
    private String twitterHandle;

    @Column(name = "robots_policy", nullable = false, length = 32)
    private String robotsPolicy;

    @Column(name = "google_verification")
    private String googleVerification;

    @Column(name = "bing_verification")
    private String bingVerification;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    @PrePersist
    @PreUpdate
    void touch() {
        updatedAt = OffsetDateTime.now();
    }

    public Long getId() { return id; }
    public String getDefaultTitle() { return defaultTitle; }
    public void setDefaultTitle(String defaultTitle) { this.defaultTitle = defaultTitle; }
    public String getDefaultDescription() { return defaultDescription; }
    public void setDefaultDescription(String defaultDescription) { this.defaultDescription = defaultDescription; }
    public String getDefaultLocale() { return defaultLocale; }
    public void setDefaultLocale(String defaultLocale) { this.defaultLocale = defaultLocale; }
    public String getDefaultAuthorName() { return defaultAuthorName; }
    public void setDefaultAuthorName(String defaultAuthorName) { this.defaultAuthorName = defaultAuthorName; }
    public String getSiteUrl() { return siteUrl; }
    public void setSiteUrl(String siteUrl) { this.siteUrl = siteUrl; }
    public String getMediaCdnBaseUrl() { return mediaCdnBaseUrl; }
    public void setMediaCdnBaseUrl(String mediaCdnBaseUrl) { this.mediaCdnBaseUrl = mediaCdnBaseUrl; }
    public String getTwitterHandle() { return twitterHandle; }
    public void setTwitterHandle(String twitterHandle) { this.twitterHandle = twitterHandle; }
    public String getRobotsPolicy() { return robotsPolicy; }
    public void setRobotsPolicy(String robotsPolicy) { this.robotsPolicy = robotsPolicy; }
    public String getGoogleVerification() { return googleVerification; }
    public void setGoogleVerification(String googleVerification) { this.googleVerification = googleVerification; }
    public String getBingVerification() { return bingVerification; }
    public void setBingVerification(String bingVerification) { this.bingVerification = bingVerification; }
    public MediaAsset getDefaultOgImage() { return defaultOgImage; }
    public void setDefaultOgImage(MediaAsset defaultOgImage) { this.defaultOgImage = defaultOgImage; }
}
