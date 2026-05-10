package br.com.leonardosr.api.domain;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "series_content")
public class SeriesContent {
    @EmbeddedId
    private SeriesContentId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("seriesId")
    @JoinColumn(name = "series_id")
    private Series series;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("contentId")
    @JoinColumn(name = "content_id")
    private Content content;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    public SeriesContent() {}

    public SeriesContent(Series series, Content content, int sortOrder) {
        this.series = series;
        this.content = content;
        this.sortOrder = sortOrder;
        this.id = new SeriesContentId(series.getId(), content.getId());
    }

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

    public Content getContent() { return content; }
    public int getSortOrder() { return sortOrder; }
    public void setSortOrder(int sortOrder) { this.sortOrder = sortOrder; }
}
