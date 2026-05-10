package br.com.leonardosr.api.profile.dto;

import static org.assertj.core.api.Assertions.assertThat;

import br.com.leonardosr.api.domain.MediaAsset;
import br.com.leonardosr.api.domain.MediaAssetStatus;
import br.com.leonardosr.api.domain.SiteProfile;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

class ProfileDtoTest {
    @Test
    void exposesCurriculumUrlWhenMediaAssetIsActive() {
        var profile = profile();
        var media = new MediaAsset();
        media.setStatus(MediaAssetStatus.ACTIVE);
        media.setPublicUrl("https://cdn.leonardosr.com.br/curriculo.pdf");
        ReflectionTestUtils.setField(profile, "curriculumMedia", media);

        var dto = ProfileDto.from(profile);

        assertThat(dto.curriculumUrl()).isEqualTo("https://cdn.leonardosr.com.br/curriculo.pdf");
    }

    @Test
    void omitsCurriculumUrlWhenMediaAssetIsNotActive() {
        var profile = profile();
        var media = new MediaAsset();
        media.setStatus(MediaAssetStatus.PENDING);
        media.setPublicUrl("https://cdn.leonardosr.com.br/curriculo.pdf");
        ReflectionTestUtils.setField(profile, "curriculumMedia", media);

        var dto = ProfileDto.from(profile);

        assertThat(dto.curriculumUrl()).isNull();
    }

    private SiteProfile profile() {
        var profile = new SiteProfile();
        profile.setDisplayName("Leonardo Silva Ribeiro");
        profile.setProfessionalTitle("Analista de TI");
        profile.setHeadline("Arquitetura e desenvolvimento web moderno.");
        profile.setShortBio("Bio curta.");
        profile.setFullBio("Bio completa.");
        return profile;
    }
}
