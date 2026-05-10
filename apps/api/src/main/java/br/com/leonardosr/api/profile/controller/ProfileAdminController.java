package br.com.leonardosr.api.profile.controller;

import br.com.leonardosr.api.profile.dto.ProfileDto;
import br.com.leonardosr.api.profile.dto.ProfileRequest;
import br.com.leonardosr.api.profile.service.ISiteProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/profile")
@Tag(name = "Perfil admin", description = "Administração do perfil do site")
public class ProfileAdminController {
    private final ISiteProfileService siteProfileService;

    public ProfileAdminController(ISiteProfileService siteProfileService) {
        this.siteProfileService = siteProfileService;
    }

    @GetMapping
    @Operation(summary = "Consultar perfil no admin")
    public ProfileDto getProfile() {
        return ProfileDto.from(siteProfileService.get());
    }

    @PutMapping
    @Operation(summary = "Atualizar perfil do site")
    public ProfileDto updateProfile(@RequestBody @Valid ProfileRequest request) {
        return ProfileDto.from(siteProfileService.upsert(request));
    }
}
