package br.com.leonardosr.api.taxonomy.dto;

import br.com.leonardosr.api.domain.Technology;

public record TechnologyDto(Long id, String name, String slug, String category, String description, String level) {
    public static TechnologyDto from(Technology technology) {
        return new TechnologyDto(
                technology.getId(),
                technology.getName(),
                technology.getSlug(),
                technology.getCategory(),
                technology.getDescription(),
                technology.getLevel());
    }
}
