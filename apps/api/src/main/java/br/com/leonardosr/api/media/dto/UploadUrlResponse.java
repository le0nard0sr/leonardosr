package br.com.leonardosr.api.media.dto;

import java.util.Map;

public record UploadUrlResponse(Long mediaAssetId, String storageKey, String uploadUrl, Map<String, String> headers) {}
