package br.com.leonardosr.api.series.service.impl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import br.com.leonardosr.api.AbstractIntegrationTest;
import br.com.leonardosr.api.domain.Content;
import br.com.leonardosr.api.domain.ContentType;
import br.com.leonardosr.api.domain.PublicationStatus;
import br.com.leonardosr.api.domain.Series;
import br.com.leonardosr.api.domain.SeriesContent;
import br.com.leonardosr.api.repository.ContentRepository;
import br.com.leonardosr.api.repository.SeriesContentRepository;
import br.com.leonardosr.api.repository.SeriesRepository;
import br.com.leonardosr.api.series.dto.ReorderSeriesRequest;
import br.com.leonardosr.api.shared.exception.ValidationException;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
class SeriesServiceIT extends AbstractIntegrationTest {

    @Autowired
    private SeriesService seriesService;

    @Autowired
    private SeriesRepository seriesRepository;

    @Autowired
    private SeriesContentRepository seriesContentRepository;

    @Autowired
    private ContentRepository contentRepository;

    @Test
    void reorderRenumbersSequentiallyInsideTransaction() {
        var series = seriesRepository.saveAndFlush(newSeries("series-reorder"));
        var first = contentRepository.saveAndFlush(newContent("series-reorder-1"));
        var second = contentRepository.saveAndFlush(newContent("series-reorder-2"));
        var third = contentRepository.saveAndFlush(newContent("series-reorder-3"));
        seriesContentRepository.saveAndFlush(new SeriesContent(series, first, 1));
        seriesContentRepository.saveAndFlush(new SeriesContent(series, second, 2));
        seriesContentRepository.saveAndFlush(new SeriesContent(series, third, 3));

        seriesService.reorder(series.getId(), new ReorderSeriesRequest(List.of(third.getId(), first.getId(), second.getId())));

        var ordered = seriesContentRepository.findBySeriesIdOrderBySortOrderAsc(series.getId());
        assertThat(ordered).extracting(item -> item.getContent().getId())
                .containsExactly(third.getId(), first.getId(), second.getId());
        assertThat(ordered).extracting(SeriesContent::getSortOrder).containsExactly(1, 2, 3);
    }

    @Test
    void reorderRejectsDuplicateContentIds() {
        var series = seriesRepository.saveAndFlush(newSeries("series-duplicates"));
        var content = contentRepository.saveAndFlush(newContent("series-duplicates-1"));

        assertThatThrownBy(() -> seriesService.reorder(
                        series.getId(),
                        new ReorderSeriesRequest(List.of(content.getId(), content.getId()))))
                .isInstanceOf(ValidationException.class)
                .hasMessageContaining("duplicatas");
    }

    private Series newSeries(String slug) {
        var series = new Series();
        series.setSlug(slug);
        series.setTitle("Série " + slug);
        series.setDescription("Descrição da série de teste.");
        series.setStatus(PublicationStatus.DRAFT);
        return series;
    }

    private Content newContent(String slug) {
        var content = new Content();
        content.setSlug(slug);
        content.setTitle("Título " + slug);
        content.setSummary("Resumo");
        content.setBody("# " + slug);
        content.setType(ContentType.ARTICLE);
        content.setStatus(PublicationStatus.PUBLISHED);
        return content;
    }
}
