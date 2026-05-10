package br.com.leonardosr.api.seo.service;

import br.com.leonardosr.api.domain.SeoSetting;
import br.com.leonardosr.api.seo.dto.SeoSettingRequest;

public interface ISeoSettingService {
    SeoSetting get();

    SeoSetting upsert(SeoSettingRequest request);

    SeoSetting create(SeoSettingRequest request);
}
