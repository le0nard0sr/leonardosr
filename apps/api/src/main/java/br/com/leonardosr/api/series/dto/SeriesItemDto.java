package br.com.leonardosr.api.series.dto;

import br.com.leonardosr.api.content.dto.ContentDto;
import br.com.leonardosr.api.domain.PublicationStatus;
import br.com.leonardosr.api.domain.SeriesContent;
import java.time.OffsetDateTime;

public record SeriesItemDto(int sortOrder, ContentDto content) {
    public static SeriesItemDto from(SeriesContent item) {
        return new SeriesItemDto(item.getSortOrder(), ContentDto.from(item.getContent()));
    }

    public static SeriesItemDto fromPublic(SeriesContent item, OffsetDateTime now) {
        var content = item.getContent();
        if (content.getStatus() != PublicationStatus.PUBLISHED
                || content.getPublishedAt() == null
                || content.getPublishedAt().isAfter(now)) {
            return null;
        }
        return new SeriesItemDto(item.getSortOrder(), ContentDto.from(content));
    }
}
