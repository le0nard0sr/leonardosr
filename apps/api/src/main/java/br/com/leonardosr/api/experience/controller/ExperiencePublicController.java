package br.com.leonardosr.api.experience.controller;

import br.com.leonardosr.api.domain.PublicationStatus;
import br.com.leonardosr.api.experience.dto.ExperienceDto;
import br.com.leonardosr.api.repository.ExperienceRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.OffsetDateTime;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/experiences")
@Tag(name = "Experiências públicas", description = "Experiências profissionais publicadas")
public class ExperiencePublicController {
    private final ExperienceRepository experienceRepository;

    public ExperiencePublicController(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    @GetMapping
    @Transactional(readOnly = true)
    @Operation(summary = "Listar experiências públicas")
    public List<ExperienceDto> experiences() {
        return experienceRepository
                .findByStatusAndPublishedAtLessThanEqualOrderBySortOrderAsc(PublicationStatus.PUBLISHED, now())
                .stream()
                .map(ExperienceDto::from)
                .toList();
    }

    private OffsetDateTime now() {
        return OffsetDateTime.now();
    }
}
