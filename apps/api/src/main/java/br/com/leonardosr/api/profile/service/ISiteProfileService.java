package br.com.leonardosr.api.profile.service;

import br.com.leonardosr.api.domain.SiteProfile;
import br.com.leonardosr.api.profile.dto.ProfileRequest;

public interface ISiteProfileService {
    SiteProfile get();

    SiteProfile upsert(ProfileRequest request);

    SiteProfile create(ProfileRequest request);
}
