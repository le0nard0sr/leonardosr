package br.com.leonardosr.api.media.storage;

import java.util.Map;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

@Service
@ConditionalOnProperty(name = "app.storage.provider", havingValue = "noop", matchIfMissing = true)
public class NoopStorageService implements StorageService {
    @Override
    public UploadTarget createUploadTarget(String storageKey, String mimeType, long sizeBytes) {
        return new UploadTarget(storageKey, "http://localhost:9000/noop/" + storageKey, Map.of("Content-Type", mimeType));
    }

    @Override
    public StorageObjectMetadata head(String storageKey) {
        return new StorageObjectMetadata("application/octet-stream", 0L, null);
    }

    @Override
    public void deleteObject(String storageKey) {
        // Noop adapter for local development and tests without object storage credentials.
    }
}
