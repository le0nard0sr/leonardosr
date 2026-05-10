package br.com.leonardosr.api.content.service.impl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import br.com.leonardosr.api.domain.SiteProfile;
import br.com.leonardosr.api.repository.SiteProfileRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

class MdxValidationServiceTest {
    @Test
    void rejectsImportsHtmlAndUnknownJsx() {
        var repository = Mockito.mock(SiteProfileRepository.class);
        when(repository.findAll()).thenReturn(List.of());
        var service = new MdxValidationService(repository);

        var errors = service.validate("import X from './x'\n\n<div>raw</div>\n\n<Callout />");

        assertThat(errors)
                .contains("Imports diretos em MDX são proibidos")
                .contains("HTML bruto em MDX é proibido na v1")
                .contains("Componente MDX fora da allowlist: Callout");
    }

    @Test
    void rejectsExternalImageOutsideProfileAllowlist() {
        var repository = Mockito.mock(SiteProfileRepository.class);
        var profile = new SiteProfile();
        profile.setImageUrlAllowlist("assets.leonardosr.com.br");
        when(repository.findAll()).thenReturn(List.of(profile));
        var service = new MdxValidationService(repository);

        var errors = service.validate("![imagem](https://example.com/a.png)");

        assertThat(errors).contains("Imagem externa fora da allowlist: https://example.com/a.png");
    }

    @Test
    void reportsMalformedExternalImageUrlAsValidationError() {
        var repository = Mockito.mock(SiteProfileRepository.class);
        when(repository.findAll()).thenReturn(List.of());
        var service = new MdxValidationService(repository);

        var errors = service.validate("![imagem](https:///broken.png)");

        assertThat(errors).contains("URL de imagem externa inválida: https:///broken.png");
    }
}
