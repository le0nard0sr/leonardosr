package br.com.leonardosr.api.media.storage;

public interface StorageService {
    UploadTarget createUploadTarget(String storageKey, String mimeType, long sizeBytes);

    StorageObjectMetadata head(String storageKey);

    void deleteObject(String storageKey);
}
