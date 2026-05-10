package br.com.leonardosr.api.project.dto;

import br.com.leonardosr.api.domain.Project;
import br.com.leonardosr.api.taxonomy.dto.TechnologyDto;
import java.time.OffsetDateTime;
import java.util.List;

public record ProjectDto(
        Long id,
        String slug,
        String name,
        String summary,
        String description,
        String repositoryUrl,
        String demoUrl,
        boolean featured,
        OffsetDateTime publishedAt,
        List<TechnologyDto> technologies) {
    public static ProjectDto from(Project project) {
        return new ProjectDto(
                project.getId(),
                project.getSlug(),
                project.getName(),
                project.getSummary(),
                project.getDescription(),
                project.getRepositoryUrl(),
                project.getDemoUrl(),
                project.isFeatured(),
                project.getPublishedAt(),
                project.getTechnologies().stream().map(TechnologyDto::from).toList());
    }
}
