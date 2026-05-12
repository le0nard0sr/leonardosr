package br.com.leonardosr.api.seo.controller;

import br.com.leonardosr.api.seo.dto.PublicSeoDto;
import br.com.leonardosr.api.seo.service.ISeoSettingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/settings/seo")
@Tag(name = "SEO público", description = "Configurações públicas de SEO")
public class SeoPublicController {
    private final ISeoSettingService seoSettingService;

    public SeoPublicController(ISeoSettingService seoSettingService) {
        this.seoSettingService = seoSettingService;
    }

    @GetMapping
    @Transactional(readOnly = true)
    @Operation(summary = "Consultar configurações públicas de SEO")
    public PublicSeoDto getSeo() {
        return PublicSeoDto.from(seoSettingService.get());
    }
}
