package br.com.leonardosr.api.series.controller;

import br.com.leonardosr.api.series.dto.ReorderSeriesRequest;
import br.com.leonardosr.api.series.service.ISeriesService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/series")
@Tag(name = "Séries admin", description = "Administração de séries editoriais")
public class SeriesAdminController {
    private final ISeriesService seriesService;

    public SeriesAdminController(ISeriesService seriesService) {
        this.seriesService = seriesService;
    }

    @PutMapping("/{id}/contents")
    @Operation(summary = "Reordenar conteúdos de uma série")
    public void reorderSeries(@PathVariable Long id, @RequestBody @Valid ReorderSeriesRequest request) {
        seriesService.reorder(id, request);
    }
}
