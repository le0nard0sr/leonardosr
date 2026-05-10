package br.com.leonardosr.api.media.storage;

import io.minio.BucketExistsArgs;
import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.RemoveObjectArgs;
import io.minio.StatObjectArgs;
import io.minio.http.Method;
import jakarta.annotation.PostConstruct;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

@Service
@ConditionalOnProperty(name = "app.storage.provider", havingValue = "minio")
public class MinioStorageService implements StorageService {
    private final MinioClient client;
    private final String bucket;

    public MinioStorageService(
            @Value("${app.storage.endpoint}") String endpoint,
            @Value("${app.storage.access-key}") String accessKey,
            @Value("${app.storage.secret-key}") String secretKey,
            @Value("${app.storage.bucket}") String bucket) {
        this.client = MinioClient.builder()
                .endpoint(endpoint)
                .credentials(accessKey, secretKey)
                .build();
        this.bucket = bucket;
    }

    @PostConstruct
    void ensureBucketExists() {
        try {
            var exists = client.bucketExists(BucketExistsArgs.builder().bucket(bucket).build());
            if (!exists) {
                client.makeBucket(MakeBucketArgs.builder().bucket(bucket).build());
            }
        } catch (Exception exception) {
            throw new IllegalStateException("Falha ao preparar bucket do storage", exception);
        }
    }

    @Override
    public UploadTarget createUploadTarget(String storageKey, String mimeType, long sizeBytes) {
        try {
            var url = client.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder()
                    .method(Method.PUT)
                    .bucket(bucket)
                    .object(storageKey)
                    .expiry(15, TimeUnit.MINUTES)
                    .extraHeaders(Map.of("Content-Type", mimeType))
                    .build());
            return new UploadTarget(storageKey, url, Map.of("Content-Type", mimeType));
        } catch (Exception exception) {
            throw new IllegalStateException("Falha ao gerar URL pré-assinada", exception);
        }
    }

    @Override
    public StorageObjectMetadata head(String storageKey) {
        try {
            var stat = client.statObject(StatObjectArgs.builder().bucket(bucket).object(storageKey).build());
            return new StorageObjectMetadata(stat.contentType(), stat.size(), stat.etag());
        } catch (Exception exception) {
            throw new IllegalStateException("Falha ao consultar objeto no storage", exception);
        }
    }

    @Override
    public void deleteObject(String storageKey) {
        try {
            client.removeObject(RemoveObjectArgs.builder().bucket(bucket).object(storageKey).build());
        } catch (Exception exception) {
            throw new IllegalStateException("Falha ao remover objeto do storage", exception);
        }
    }
}
