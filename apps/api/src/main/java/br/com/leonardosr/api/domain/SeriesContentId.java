package br.com.leonardosr.api.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class SeriesContentId implements Serializable {
    @Column(name = "series_id")
    private Long seriesId;

    @Column(name = "content_id")
    private Long contentId;

    public SeriesContentId() {}

    public SeriesContentId(Long seriesId, Long contentId) {
        this.seriesId = seriesId;
        this.contentId = contentId;
    }

    public Long getSeriesId() { return seriesId; }
    public Long getContentId() { return contentId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SeriesContentId that)) return false;
        return Objects.equals(seriesId, that.seriesId) && Objects.equals(contentId, that.contentId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(seriesId, contentId);
    }
}
