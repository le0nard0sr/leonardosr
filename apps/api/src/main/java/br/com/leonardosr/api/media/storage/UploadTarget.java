package br.com.leonardosr.api.media.storage;

import java.util.Map;

public record UploadTarget(String storageKey, String uploadUrl, Map<String, String> headers) {}
