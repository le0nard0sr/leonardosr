package br.com.leonardosr.api.taxonomy.controller;

import br.com.leonardosr.api.content.dto.ContentDto;
import br.com.leonardosr.api.domain.PublicationStatus;
import br.com.leonardosr.api.repository.ContentRepository;
import br.com.leonardosr.api.repository.TagRepository;
import br.com.leonardosr.api.repository.TechnologyRepository;
import br.com.leonardosr.api.shared.exception.NotFoundException;
import br.com.leonardosr.api.taxonomy.dto.TagDto;
import br.com.leonardosr.api.taxonomy.dto.TechnologyDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public")
@Tag(name = "Taxonomias públicas", description = "Tags e tecnologias públicas")
public class TaxonomyPublicController {
    private final TagRepository tagRepository;
    private final TechnologyRepository technologyRepository;
    private final ContentRepository contentRepository;

    public TaxonomyPublicController(
            TagRepository tagRepository, TechnologyRepository technologyRepository, ContentRepository contentRepository) {
        this.tagRepository = tagRepository;
        this.technologyRepository = technologyRepository;
        this.contentRepository = contentRepository;
    }

    @GetMapping("/technologies")
    @Transactional(readOnly = true)
    @Operation(summary = "Listar tecnologias")
    public List<TechnologyDto> technologies() {
        return technologyRepository.findAll().stream().map(TechnologyDto::from).toList();
    }

    @GetMapping("/tags")
    @Transactional(readOnly = true)
    @Operation(summary = "Listar tags")
    public List<TagDto> tags() {
        return tagRepository.findAll().stream().map(TagDto::from).toList();
    }

    @GetMapping("/tags/{slug}")
    @Transactional(readOnly = true)
    @Operation(summary = "Consultar tag por slug")
    public Map<String, Object> tag(@PathVariable String slug) {
        var tag = tagRepository.findBySlug(slug).orElseThrow(() -> new NotFoundException("Tag não encontrada"));
        var contents = contentRepository
                .findPublicByTagSlug(PublicationStatus.PUBLISHED, now(), slug)
                .stream()
                .map(ContentDto::from)
                .toList();
        return Map.of("tag", TagDto.from(tag), "contents", contents);
    }

    private OffsetDateTime now() {
        return OffsetDateTime.now();
    }
}
