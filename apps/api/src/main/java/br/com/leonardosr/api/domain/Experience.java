package br.com.leonardosr.api.domain;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "experience")
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 180)
    private String role;

    @Column(nullable = false, length = 180)
    private String organization;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(nullable = false)
    private boolean current;

    @Column(nullable = false, columnDefinition = "text")
    private String summary;

    @Column(columnDefinition = "text")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private PublicationStatus status = PublicationStatus.DRAFT;

    @Column(name = "scheduled_at")
    private OffsetDateTime scheduledAt;

    @Column(name = "published_at")
    private OffsetDateTime publishedAt;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;

    @ManyToMany
    @JoinTable(
            name = "experience_technology",
            joinColumns = @JoinColumn(name = "experience_id"),
            inverseJoinColumns = @JoinColumn(name = "technology_id"))
    private Set<Technology> technologies = new LinkedHashSet<>();

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

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

    public Long getId() { return id; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getOrganization() { return organization; }
    public void setOrganization(String organization) { this.organization = organization; }
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    public boolean isCurrent() { return current; }
    public void setCurrent(boolean current) { this.current = current; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public PublicationStatus getStatus() { return status; }
    public void setStatus(PublicationStatus status) { this.status = status; }
    public OffsetDateTime getPublishedAt() { return publishedAt; }
    public int getSortOrder() { return sortOrder; }
    public void setSortOrder(int sortOrder) { this.sortOrder = sortOrder; }
    public Set<Technology> getTechnologies() { return technologies; }
}
