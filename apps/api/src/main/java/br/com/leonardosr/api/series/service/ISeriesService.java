package br.com.leonardosr.api.series.service;

import br.com.leonardosr.api.series.dto.ReorderSeriesRequest;

public interface ISeriesService {
    void reorder(Long seriesId, ReorderSeriesRequest request);
}
