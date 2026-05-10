package br.com.leonardosr.api.search.controller;

import br.com.leonardosr.api.search.dto.SearchResultDto;
import br.com.leonardosr.api.search.service.ISearchService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/search")
@Tag(name = "Busca pública", description = "Busca textual em conteúdos e projetos publicados")
public class SearchPublicController {
    private final ISearchService searchService;

    public SearchPublicController(ISearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    @Operation(summary = "Buscar conteúdos e projetos")
    public List<SearchResultDto> search(@RequestParam String q) {
        return searchService.search(q);
    }
}
