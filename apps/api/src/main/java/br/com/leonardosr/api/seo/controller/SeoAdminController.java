package br.com.leonardosr.api.seo.controller;

import br.com.leonardosr.api.seo.dto.SeoSettingDto;
import br.com.leonardosr.api.seo.dto.SeoSettingRequest;
import br.com.leonardosr.api.seo.service.ISeoSettingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/settings/seo")
@Tag(name = "SEO admin", description = "Configurações administrativas de SEO")
public class SeoAdminController {
    private final ISeoSettingService seoSettingService;

    public SeoAdminController(ISeoSettingService seoSettingService) {
        this.seoSettingService = seoSettingService;
    }

    @GetMapping
    @Operation(summary = "Consultar configurações de SEO")
    public SeoSettingDto getSeo() {
        return SeoSettingDto.from(seoSettingService.get());
    }

    @PutMapping
    @Operation(summary = "Atualizar configurações de SEO")
    public SeoSettingDto updateSeo(@RequestBody @Valid SeoSettingRequest request) {
        return SeoSettingDto.from(seoSettingService.upsert(request));
    }
}
