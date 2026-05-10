package br.com.leonardosr.api.media.dto;

import br.com.leonardosr.api.domain.MediaAsset;
import br.com.leonardosr.api.domain.MediaAssetStatus;

public record MediaDto(Long id, String publicUrl, String altText, String mimeType, MediaAssetStatus status) {
    public static MediaDto from(MediaAsset asset) {
        if (asset == null) {
            return null;
        }
        return new MediaDto(asset.getId(), asset.getPublicUrl(), asset.getAltText(), asset.getMimeType(), asset.getStatus());
    }
}
