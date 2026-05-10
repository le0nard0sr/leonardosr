package br.com.leonardosr.api.content.dto;

import br.com.leonardosr.api.domain.Content;
import br.com.leonardosr.api.domain.ContentType;
import br.com.leonardosr.api.taxonomy.dto.TagDto;
import br.com.leonardosr.api.taxonomy.dto.TechnologyDto;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;

public record ContentDto(
        Long id,
        String slug,
        String title,
        String summary,
        String body,
        ContentType type,
        Map<String, Object> typeSpecificFields,
        String youtubeUrl,
        String youtubeVideoId,
        String videoDuration,
        Integer readingTime,
        boolean featured,
        OffsetDateTime publishedAt,
        List<TagDto> tags,
        List<TechnologyDto> technologies) {
    public static ContentDto from(Content content) {
        return new ContentDto(
                content.getId(),
                content.getSlug(),
                content.getTitle(),
                content.getSummary(),
                content.getBody(),
                content.getType(),
                content.getTypeSpecificFields(),
                content.getYoutubeUrl(),
                content.getYoutubeVideoId(),
                content.getVideoDuration(),
                content.getReadingTime(),
                content.isFeatured(),
                content.getPublishedAt(),
                content.getTags().stream().map(TagDto::from).toList(),
                content.getTechnologies().stream().map(TechnologyDto::from).toList());
    }
}
