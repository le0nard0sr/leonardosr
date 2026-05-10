package br.com.leonardosr.api.project.controller;

import br.com.leonardosr.api.domain.PublicationStatus;
import br.com.leonardosr.api.project.dto.ProjectDto;
import br.com.leonardosr.api.repository.ProjectRepository;
import br.com.leonardosr.api.shared.exception.NotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.OffsetDateTime;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/projects")
@Tag(name = "Projetos públicos", description = "Projetos publicados")
public class ProjectPublicController {
    private final ProjectRepository projectRepository;

    public ProjectPublicController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @GetMapping
    @Transactional(readOnly = true)
    @Operation(summary = "Listar projetos públicos")
    public List<ProjectDto> projects() {
        return projectRepository
                .findByStatusAndPublishedAtLessThanEqualOrderByPublishedAtDesc(PublicationStatus.PUBLISHED, now())
                .stream()
                .map(ProjectDto::from)
                .toList();
    }

    @GetMapping("/{slug}")
    @Transactional(readOnly = true)
    @Operation(summary = "Consultar projeto por slug")
    public ProjectDto project(@PathVariable String slug) {
        return projectRepository
                .findBySlugAndStatusAndPublishedAtLessThanEqual(slug, PublicationStatus.PUBLISHED, now())
                .map(ProjectDto::from)
                .orElseThrow(() -> new NotFoundException("Projeto não encontrado"));
    }

    private OffsetDateTime now() {
        return OffsetDateTime.now();
    }
}
