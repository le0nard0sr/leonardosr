package br.com.leonardosr.api.domain;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "content")
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 180)
    private String slug;

    @Column(nullable = false, length = 220)
    private String title;

    @Column(nullable = false, columnDefinition = "text")
    private String summary;

    @Column(nullable = false, columnDefinition = "text")
    private String body;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 40)
    private ContentType type;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "type_specific_fields", columnDefinition = "jsonb")
    private Map<String, Object> typeSpecificFields;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private PublicationStatus status = PublicationStatus.DRAFT;

    @Column(name = "scheduled_at")
    private OffsetDateTime scheduledAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cover_image_id")
    private MediaAsset coverImage;

    @Column(name = "youtube_url", length = 512)
    private String youtubeUrl;

    @Column(name = "youtube_video_id", length = 80)
    private String youtubeVideoId;

    @Column(name = "video_duration", length = 80)
    private String videoDuration;

    @Column(name = "reading_time")
    private Integer readingTime;

    @Column(name = "published_at")
    private OffsetDateTime publishedAt;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    @Column(name = "seo_title", length = 180)
    private String seoTitle;

    @Column(name = "seo_description", length = 320)
    private String seoDescription;

    @Column(name = "canonical_url", length = 512)
    private String canonicalUrl;

    @Column(nullable = false)
    private boolean featured;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToMany
    @JoinTable(
            name = "content_tag",
            joinColumns = @JoinColumn(name = "content_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<Tag> tags = new LinkedHashSet<>();

    @ManyToMany
    @JoinTable(
            name = "content_technology",
            joinColumns = @JoinColumn(name = "content_id"),
            inverseJoinColumns = @JoinColumn(name = "technology_id"))
    private Set<Technology> technologies = new LinkedHashSet<>();

    @PrePersist
    void prePersist() {
        var now = OffsetDateTime.now();
        createdAt = now;
        updatedAt = now;
        if (status == PublicationStatus.PUBLISHED && publishedAt == null) {
            publishedAt = now;
        }
    }

    @PreUpdate
    void preUpdate() {
        if (status == PublicationStatus.PUBLISHED && publishedAt == null) {
            publishedAt = OffsetDateTime.now();
        }
        updatedAt = OffsetDateTime.now();
    }

    public void publish() {
        if (publishedAt == null) {
            publishedAt = OffsetDateTime.now();
        }
        status = PublicationStatus.PUBLISHED;
    }

    public Long getId() { return id; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getBody() { return body; }
    public void setBody(String body) { this.body = body; }
    public ContentType getType() { return type; }
    public void setType(ContentType type) { this.type = type; }
    public Map<String, Object> getTypeSpecificFields() { return typeSpecificFields; }
    public void setTypeSpecificFields(Map<String, Object> typeSpecificFields) { this.typeSpecificFields = typeSpecificFields; }
    public PublicationStatus getStatus() { return status; }
    public void setStatus(PublicationStatus status) { this.status = status; }
    public String getYoutubeUrl() { return youtubeUrl; }
    public void setYoutubeUrl(String youtubeUrl) { this.youtubeUrl = youtubeUrl; }
    public String getYoutubeVideoId() { return youtubeVideoId; }
    public void setYoutubeVideoId(String youtubeVideoId) { this.youtubeVideoId = youtubeVideoId; }
    public String getVideoDuration() { return videoDuration; }
    public void setVideoDuration(String videoDuration) { this.videoDuration = videoDuration; }
    public Integer getReadingTime() { return readingTime; }
    public void setReadingTime(Integer readingTime) { this.readingTime = readingTime; }
    public OffsetDateTime getPublishedAt() { return publishedAt; }
    public String getSeoTitle() { return seoTitle; }
    public void setSeoTitle(String seoTitle) { this.seoTitle = seoTitle; }
    public String getSeoDescription() { return seoDescription; }
    public void setSeoDescription(String seoDescription) { this.seoDescription = seoDescription; }
    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }
    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }
    public Set<Tag> getTags() { return tags; }
    public Set<Technology> getTechnologies() { return technologies; }
}
