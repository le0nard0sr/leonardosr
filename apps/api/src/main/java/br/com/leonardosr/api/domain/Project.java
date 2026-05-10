package br.com.leonardosr.api.domain;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 180)
    private String slug;

    @Column(nullable = false, length = 180)
    private String name;

    @Column(nullable = false, columnDefinition = "text")
    private String summary;

    @Column(nullable = false, columnDefinition = "text")
    private String description;

    @Column(columnDefinition = "text")
    private String problem;

    @Column(columnDefinition = "text")
    private String solution;

    @Column(columnDefinition = "text")
    private String architecture;

    @Column(columnDefinition = "text")
    private String results;

    @Column(name = "repository_url", length = 512)
    private String repositoryUrl;

    @Column(name = "demo_url", length = 512)
    private String demoUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cover_image_id")
    private MediaAsset coverImage;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private PublicationStatus status = PublicationStatus.DRAFT;

    @Column(name = "scheduled_at")
    private OffsetDateTime scheduledAt;

    @Column(name = "published_at")
    private OffsetDateTime publishedAt;

    @Column(nullable = false)
    private boolean featured;

    @ManyToMany
    @JoinTable(
            name = "project_technology",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "technology_id"))
    private Set<Technology> technologies = new LinkedHashSet<>();

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    @Column(name = "seo_title", length = 180)
    private String seoTitle;

    @Column(name = "seo_description", length = 320)
    private String seoDescription;

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
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getRepositoryUrl() { return repositoryUrl; }
    public void setRepositoryUrl(String repositoryUrl) { this.repositoryUrl = repositoryUrl; }
    public String getDemoUrl() { return demoUrl; }
    public void setDemoUrl(String demoUrl) { this.demoUrl = demoUrl; }
    public PublicationStatus getStatus() { return status; }
    public void setStatus(PublicationStatus status) { this.status = status; }
    public OffsetDateTime getPublishedAt() { return publishedAt; }
    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }
    public Set<Technology> getTechnologies() { return technologies; }
    public String getSeoTitle() { return seoTitle; }
    public void setSeoTitle(String seoTitle) { this.seoTitle = seoTitle; }
    public String getSeoDescription() { return seoDescription; }
    public void setSeoDescription(String seoDescription) { this.seoDescription = seoDescription; }
}
