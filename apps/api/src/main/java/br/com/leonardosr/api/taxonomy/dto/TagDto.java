package br.com.leonardosr.api.taxonomy.dto;

import br.com.leonardosr.api.domain.Tag;

public record TagDto(Long id, String name, String slug, String description) {
    public static TagDto from(Tag tag) {
        return new TagDto(tag.getId(), tag.getName(), tag.getSlug(), tag.getDescription());
    }
}
