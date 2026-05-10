package br.com.leonardosr.api.media.controller;

import br.com.leonardosr.api.media.dto.ConfirmUploadRequest;
import br.com.leonardosr.api.media.dto.MediaDto;
import br.com.leonardosr.api.media.dto.UpdateMediaAssetRequest;
import br.com.leonardosr.api.media.dto.UploadUrlRequest;
import br.com.leonardosr.api.media.dto.UploadUrlResponse;
import br.com.leonardosr.api.media.service.IMediaAssetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/media-assets")
@Tag(name = "Mídias admin", description = "Upload, confirmação e gestão de mídias")
public class MediaAdminController {
    private final IMediaAssetService mediaAssetService;

    public MediaAdminController(IMediaAssetService mediaAssetService) {
        this.mediaAssetService = mediaAssetService;
    }

    @PostMapping("/upload-url")
    @Operation(summary = "Criar URL pré-assinada de upload")
    public UploadUrlResponse uploadUrl(@RequestBody @Valid UploadUrlRequest request) {
        return mediaAssetService.createUploadUrl(request);
    }

    @PostMapping("/{id}/confirm")
    @Operation(summary = "Confirmar upload de mídia")
    public MediaDto confirm(@PathVariable Long id, @RequestBody ConfirmUploadRequest request) {
        return MediaDto.from(mediaAssetService.confirm(id, request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar metadados de mídia")
    public MediaDto updateMedia(@PathVariable Long id, @RequestBody @Valid UpdateMediaAssetRequest request) {
        return MediaDto.from(mediaAssetService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Remover mídia")
    public void deleteMedia(@PathVariable Long id) {
        mediaAssetService.delete(id);
    }
}
