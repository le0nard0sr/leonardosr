package br.com.leonardosr.api.seo.service.impl;

import br.com.leonardosr.api.domain.SeoSetting;
import br.com.leonardosr.api.repository.SeoSettingRepository;
import br.com.leonardosr.api.seo.dto.SeoSettingRequest;
import br.com.leonardosr.api.seo.service.ISeoSettingService;
import br.com.leonardosr.api.shared.exception.ConflictException;
import br.com.leonardosr.api.shared.exception.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SeoSettingService implements ISeoSettingService {
    private final SeoSettingRepository repository;

    public SeoSettingService(SeoSettingRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    @Override
    public SeoSetting get() {
        return repository.findAll().stream()
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Configuração SEO não encontrada"));
    }

    @Transactional
    @Override
    public SeoSetting upsert(SeoSettingRequest request) {
        var seo = repository.findAll().stream().findFirst().orElseGet(SeoSetting::new);
        apply(seo, request);
        return repository.save(seo);
    }

    @Transactional
    @Override
    public SeoSetting create(SeoSettingRequest request) {
        if (repository.count() > 0) {
            throw new ConflictException("seo_setting é singleton e já existe");
        }
        var seo = new SeoSetting();
        apply(seo, request);
        return repository.save(seo);
    }

    private void apply(SeoSetting seo, SeoSettingRequest request) {
        seo.setDefaultTitle(request.defaultTitle());
        seo.setDefaultDescription(request.defaultDescription());
        seo.setDefaultLocale(request.defaultLocale());
        seo.setDefaultAuthorName(request.defaultAuthorName());
        seo.setSiteUrl(request.siteUrl());
        seo.setMediaCdnBaseUrl(request.mediaCdnBaseUrl());
        seo.setTwitterHandle(request.twitterHandle());
        seo.setRobotsPolicy(request.robotsPolicy());
        seo.setGoogleVerification(request.googleVerification());
        seo.setBingVerification(request.bingVerification());
    }
}
