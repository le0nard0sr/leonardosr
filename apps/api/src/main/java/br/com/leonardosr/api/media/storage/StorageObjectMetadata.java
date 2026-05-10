package br.com.leonardosr.api.media.storage;

public record StorageObjectMetadata(String contentType, long sizeBytes, String checksum) {}
