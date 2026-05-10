package br.com.leonardosr.api.series.dto;

import br.com.leonardosr.api.domain.Series;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Objects;

public record SeriesDto(Long id, String slug, String title, String description, OffsetDateTime publishedAt, List<SeriesItemDto> contents) {
    public static SeriesDto from(Series series) {
        return new SeriesDto(
                series.getId(),
                series.getSlug(),
                series.getTitle(),
                series.getDescription(),
                series.getPublishedAt(),
                series.getContents().stream().map(SeriesItemDto::from).toList());
    }

    public static SeriesDto fromPublic(Series series, OffsetDateTime now) {
        return new SeriesDto(
                series.getId(),
                series.getSlug(),
                series.getTitle(),
                series.getDescription(),
                series.getPublishedAt(),
                series.getContents().stream()
                        .map(item -> SeriesItemDto.fromPublic(item, now))
                        .filter(Objects::nonNull)
                        .toList());
    }
}
