package br.com.leonardosr.api.profile.controller;

import br.com.leonardosr.api.profile.dto.ProfileDto;
import br.com.leonardosr.api.repository.SiteProfileRepository;
import br.com.leonardosr.api.shared.exception.NotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/profile")
@Tag(name = "Perfil público", description = "Dados públicos do perfil profissional")
public class ProfilePublicController {
    private final SiteProfileRepository siteProfileRepository;

    public ProfilePublicController(SiteProfileRepository siteProfileRepository) {
        this.siteProfileRepository = siteProfileRepository;
    }

    @GetMapping
    @Transactional(readOnly = true)
    @Operation(summary = "Consultar perfil público")
    public ProfileDto profile() {
        return siteProfileRepository.findAll().stream()
                .findFirst()
                .map(ProfileDto::from)
                .orElseThrow(() -> new NotFoundException("Perfil não encontrado"));
    }
}
