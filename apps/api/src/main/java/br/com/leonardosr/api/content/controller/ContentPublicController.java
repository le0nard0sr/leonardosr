package br.com.leonardosr.api.content.controller;

import br.com.leonardosr.api.content.dto.ContentDto;
import br.com.leonardosr.api.domain.ContentType;
import br.com.leonardosr.api.domain.PublicationStatus;
import br.com.leonardosr.api.repository.ContentRepository;
import br.com.leonardosr.api.shared.exception.NotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.OffsetDateTime;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/contents")
@Tag(name = "Conteúdos públicos", description = "Conteúdos editoriais publicados")
public class ContentPublicController {
    private final ContentRepository contentRepository;

    public ContentPublicController(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    @GetMapping
    @Transactional(readOnly = true)
    @Operation(summary = "Listar conteúdos públicos")
    public List<ContentDto> contents(
            @RequestParam(required = false) ContentType type,
            @RequestParam(required = false) String tag,
            @RequestParam(required = false) String technology) {
        var items = contentRepository.findPublicContents(
                PublicationStatus.PUBLISHED, now(), type, blankToNull(tag), blankToNull(technology));
        return items.stream().map(ContentDto::from).toList();
    }

    @GetMapping("/{slug}")
    @Transactional(readOnly = true)
    @Operation(summary = "Consultar conteúdo por slug")
    public ContentDto content(@PathVariable String slug) {
        return contentRepository
                .findBySlugAndStatusAndPublishedAtLessThanEqual(slug, PublicationStatus.PUBLISHED, now())
                .map(ContentDto::from)
                .orElseThrow(() -> new NotFoundException("Conteúdo não encontrado"));
    }

    private static String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value;
    }

    private OffsetDateTime now() {
        return OffsetDateTime.now();
    }
}
