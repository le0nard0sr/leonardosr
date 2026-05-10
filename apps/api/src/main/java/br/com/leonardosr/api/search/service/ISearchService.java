package br.com.leonardosr.api.search.service;

import br.com.leonardosr.api.search.dto.SearchResultDto;
import java.util.List;

public interface ISearchService {
    void refreshContentVector(Long contentId);

    void refreshProjectVector(Long projectId);

    List<SearchResultDto> search(String query);
}
