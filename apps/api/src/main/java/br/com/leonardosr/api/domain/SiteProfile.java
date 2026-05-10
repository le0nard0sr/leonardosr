package br.com.leonardosr.api.domain;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "site_profile")
public class SiteProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "display_name", nullable = false, length = 160)
    private String displayName;

    @Column(name = "professional_title", nullable = false, length = 220)
    private String professionalTitle;

    @Column(nullable = false, length = 260)
    private String headline;

    @Column(name = "short_bio", nullable = false, columnDefinition = "text")
    private String shortBio;

    @Column(name = "full_bio", nullable = false, columnDefinition = "text")
    private String fullBio;

    @Column(name = "location_label", length = 160)
    private String locationLabel;

    @Column(name = "linkedin_url", length = 512)
    private String linkedinUrl;

    @Column(name = "github_url", length = 512)
    private String githubUrl;

    @Column(name = "twitter_url", length = 512)
    private String twitterUrl;

    @Column(name = "youtube_url", length = 512)
    private String youtubeUrl;

    @Column(name = "contact_email_alias")
    private String contactEmailAlias;

    @Column(name = "privacy_email_alias")
    private String privacyEmailAlias;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "curriculum_media_id")
    private MediaAsset curriculumMedia;

    @Column(name = "image_url_allowlist", columnDefinition = "text")
    private String imageUrlAllowlist;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    @PrePersist
    @PreUpdate
    void touch() {
        updatedAt = OffsetDateTime.now();
    }

    public Long getId() { return id; }
    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }
    public String getProfessionalTitle() { return professionalTitle; }
    public void setProfessionalTitle(String professionalTitle) { this.professionalTitle = professionalTitle; }
    public String getHeadline() { return headline; }
    public void setHeadline(String headline) { this.headline = headline; }
    public String getShortBio() { return shortBio; }
    public void setShortBio(String shortBio) { this.shortBio = shortBio; }
    public String getFullBio() { return fullBio; }
    public void setFullBio(String fullBio) { this.fullBio = fullBio; }
    public String getLocationLabel() { return locationLabel; }
    public void setLocationLabel(String locationLabel) { this.locationLabel = locationLabel; }
    public String getLinkedinUrl() { return linkedinUrl; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }
    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }
    public String getTwitterUrl() { return twitterUrl; }
    public void setTwitterUrl(String twitterUrl) { this.twitterUrl = twitterUrl; }
    public String getYoutubeUrl() { return youtubeUrl; }
    public void setYoutubeUrl(String youtubeUrl) { this.youtubeUrl = youtubeUrl; }
    public String getContactEmailAlias() { return contactEmailAlias; }
    public void setContactEmailAlias(String contactEmailAlias) { this.contactEmailAlias = contactEmailAlias; }
    public String getPrivacyEmailAlias() { return privacyEmailAlias; }
    public void setPrivacyEmailAlias(String privacyEmailAlias) { this.privacyEmailAlias = privacyEmailAlias; }
    public String getImageUrlAllowlist() { return imageUrlAllowlist; }
    public void setImageUrlAllowlist(String imageUrlAllowlist) { this.imageUrlAllowlist = imageUrlAllowlist; }
}
