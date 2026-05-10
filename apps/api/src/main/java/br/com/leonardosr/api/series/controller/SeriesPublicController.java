package br.com.leonardosr.api.series.controller;

import br.com.leonardosr.api.domain.PublicationStatus;
import br.com.leonardosr.api.repository.SeriesRepository;
import br.com.leonardosr.api.series.dto.SeriesDto;
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
@RequestMapping("/api/public/series")
@Tag(name = "Séries públicas", description = "Séries editoriais publicadas")
public class SeriesPublicController {
    private final SeriesRepository seriesRepository;

    public SeriesPublicController(SeriesRepository seriesRepository) {
        this.seriesRepository = seriesRepository;
    }

    @GetMapping
    @Transactional(readOnly = true)
    @Operation(summary = "Listar séries públicas")
    public List<SeriesDto> series() {
        var now = now();
        return seriesRepository
                .findByStatusAndPublishedAtLessThanEqualOrderByPublishedAtDesc(PublicationStatus.PUBLISHED, now)
                .stream()
                .map(series -> SeriesDto.fromPublic(series, now))
                .toList();
    }

    @GetMapping("/{slug}")
    @Transactional(readOnly = true)
    @Operation(summary = "Consultar série por slug")
    public SeriesDto series(@PathVariable String slug) {
        var now = now();
        return seriesRepository
                .findBySlugAndStatusAndPublishedAtLessThanEqual(slug, PublicationStatus.PUBLISHED, now)
                .map(series -> SeriesDto.fromPublic(series, now))
                .orElseThrow(() -> new NotFoundException("Série não encontrada"));
    }

    private OffsetDateTime now() {
        return OffsetDateTime.now();
    }
}
