package br.com.leonardosr.api.media.storage;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

class NoopStorageServiceTest {
    @Test
    void returnsUnknownSizeSoConfirmCanRunInNoopMode() {
        var service = new NoopStorageService();

        var metadata = service.head("media/test.png");

        assertThat(metadata.sizeBytes()).isZero();
    }
}
