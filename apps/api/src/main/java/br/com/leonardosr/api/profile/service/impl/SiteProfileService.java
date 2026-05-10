package br.com.leonardosr.api.profile.service.impl;

import br.com.leonardosr.api.domain.SiteProfile;
import br.com.leonardosr.api.profile.dto.ProfileRequest;
import br.com.leonardosr.api.profile.service.ISiteProfileService;
import br.com.leonardosr.api.repository.SiteProfileRepository;
import br.com.leonardosr.api.shared.exception.ConflictException;
import br.com.leonardosr.api.shared.exception.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SiteProfileService implements ISiteProfileService {
    private final SiteProfileRepository repository;

    public SiteProfileService(SiteProfileRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    @Override
    public SiteProfile get() {
        return repository.findAll().stream()
                .findFirst()
                .orElseThrow(() -> new NotFoundException("Perfil do site não encontrado"));
    }

    @Transactional
    @Override
    public SiteProfile upsert(ProfileRequest request) {
        var profile = repository.findAll().stream().findFirst().orElseGet(SiteProfile::new);
        apply(profile, request);
        return repository.save(profile);
    }

    @Transactional
    @Override
    public SiteProfile create(ProfileRequest request) {
        if (repository.count() > 0) {
            throw new ConflictException("site_profile é singleton e já existe");
        }
        var profile = new SiteProfile();
        apply(profile, request);
        return repository.save(profile);
    }

    private void apply(SiteProfile profile, ProfileRequest request) {
        profile.setDisplayName(request.displayName());
        profile.setProfessionalTitle(request.professionalTitle());
        profile.setHeadline(request.headline());
        profile.setShortBio(request.shortBio());
        profile.setFullBio(request.fullBio());
        profile.setLocationLabel(request.locationLabel());
        profile.setLinkedinUrl(request.linkedinUrl());
        profile.setGithubUrl(request.githubUrl());
        profile.setTwitterUrl(request.twitterUrl());
        profile.setYoutubeUrl(request.youtubeUrl());
        profile.setContactEmailAlias(request.contactEmailAlias());
        profile.setPrivacyEmailAlias(request.privacyEmailAlias());
        profile.setImageUrlAllowlist(request.imageUrlAllowlist());
    }
}
