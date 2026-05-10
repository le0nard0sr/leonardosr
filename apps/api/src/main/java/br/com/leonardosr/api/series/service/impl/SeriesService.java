package br.com.leonardosr.api.series.service.impl;

import br.com.leonardosr.api.domain.SeriesContent;
import br.com.leonardosr.api.repository.ContentRepository;
import br.com.leonardosr.api.repository.SeriesContentRepository;
import br.com.leonardosr.api.repository.SeriesRepository;
import br.com.leonardosr.api.series.dto.ReorderSeriesRequest;
import br.com.leonardosr.api.series.service.ISeriesService;
import br.com.leonardosr.api.shared.exception.NotFoundException;
import br.com.leonardosr.api.shared.exception.ValidationException;
import java.util.ArrayList;
import java.util.HashSet;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SeriesService implements ISeriesService {
    private final SeriesRepository seriesRepository;
    private final ContentRepository contentRepository;
    private final SeriesContentRepository seriesContentRepository;

    public SeriesService(
            SeriesRepository seriesRepository,
            ContentRepository contentRepository,
            SeriesContentRepository seriesContentRepository) {
        this.seriesRepository = seriesRepository;
        this.contentRepository = contentRepository;
        this.seriesContentRepository = seriesContentRepository;
    }

    @Transactional
    @Override
    public void reorder(Long seriesId, ReorderSeriesRequest request) {
        var series = seriesRepository.findById(seriesId).orElseThrow(() -> new NotFoundException("Série não encontrada"));
        if (new HashSet<>(request.contentIds()).size() != request.contentIds().size()) {
            throw new ValidationException("A lista de conteúdos da série não pode conter duplicatas");
        }
        var newItems = new ArrayList<SeriesContent>();
        for (var index = 0; index < request.contentIds().size(); index++) {
            var contentId = request.contentIds().get(index);
            var content = contentRepository.findById(contentId)
                    .orElseThrow(() -> new NotFoundException("Conteúdo não encontrado: " + contentId));
            newItems.add(new SeriesContent(series, content, index + 1));
        }
        seriesContentRepository.deleteBySeriesId(seriesId);
        seriesContentRepository.flush();
        seriesContentRepository.saveAll(newItems);
    }
}
