package br.com.leonardosr.api.media.service;

import br.com.leonardosr.api.domain.MediaAsset;
import br.com.leonardosr.api.media.dto.ConfirmUploadRequest;
import br.com.leonardosr.api.media.dto.UpdateMediaAssetRequest;
import br.com.leonardosr.api.media.dto.UploadUrlRequest;
import br.com.leonardosr.api.media.dto.UploadUrlResponse;

public interface IMediaAssetService {
    UploadUrlResponse createUploadUrl(UploadUrlRequest request);

    MediaAsset confirm(Long id, ConfirmUploadRequest request);

    MediaAsset update(Long id, UpdateMediaAssetRequest request);

    void delete(Long id);
}
