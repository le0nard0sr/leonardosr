package br.com.leonardosr.api.content.validation;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import br.com.leonardosr.api.domain.ContentType;
import br.com.leonardosr.api.shared.exception.ValidationException;
import jakarta.validation.Validation;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import tools.jackson.databind.ObjectMapper;

class TypeSpecificFieldsValidatorTest {
    private final TypeSpecificFieldsValidator validator = new TypeSpecificFieldsValidator(
            new ObjectMapper(), Validation.buildDefaultValidatorFactory().getValidator());

    @Test
    void rejectsTypeSpecificFieldsForRegularArticle() {
        assertThatThrownBy(() -> validator.validate(ContentType.ARTICLE, Map.of("anything", true)))
                .isInstanceOf(ValidationException.class)
                .hasMessageContaining("type_specific_fields deve ser nulo");
    }

    @Test
    void rejectsLabFieldsMissingRequiredKeys() {
        assertThatThrownBy(() -> validator.validate(ContentType.LAB, Map.of("demonstrationUrl", "https://demo.test")))
                .isInstanceOf(ValidationException.class)
                .hasMessageContaining("sourceCodeUrl");
    }

    @Test
    void rejectsLabFieldsWithInvalidDifficultyEnum() {
        assertThatThrownBy(() -> validator.validate(
                        ContentType.LAB,
                        Map.of(
                                "demonstrationUrl", "https://demo.test",
                                "sourceCodeUrl", "https://repo.test",
                                "isDidactic", true,
                                "difficultyLevel", "EXPERT")))
                .isInstanceOf(ValidationException.class);
    }

    @Test
    void rejectsLabFieldsWithInvalidUrl() {
        assertThatThrownBy(() -> validator.validate(
                        ContentType.LAB,
                        Map.of(
                                "demonstrationUrl", "not-a-url",
                                "sourceCodeUrl", "https://repo.test",
                                "isDidactic", true,
                                "difficultyLevel", "INTERMEDIATE")))
                .isInstanceOf(ValidationException.class)
                .hasMessageContaining("demonstrationUrl");
    }

    @Test
    void acceptsValidLabFields() {
        assertThatCode(() -> validator.validate(
                        ContentType.LAB,
                        Map.of(
                                "demonstrationUrl", "https://demo.test",
                                "sourceCodeUrl", "https://repo.test",
                                "isDidactic", true,
                                "difficultyLevel", "INTERMEDIATE")))
                .doesNotThrowAnyException();
    }

    @Test
    void acceptsValidArchitectureFields() {
        assertThatCode(() -> validator.validate(
                        ContentType.ARCHITECTURE,
                        Map.of(
                                "components", List.of(Map.of("name", "Next.js", "role", "Frontend")),
                                "flow", "Front consome API.",
                                "advantages", List.of("SEO"),
                                "risks", List.of("Operação distribuída"),
                                "whenToUse", "Sites editoriais.")))
                .doesNotThrowAnyException();
    }

    @Test
    void rejectsArchitectureMissingComponents() {
        assertThatThrownBy(() -> validator.validate(
                        ContentType.ARCHITECTURE,
                        Map.of(
                                "flow", "Fluxo",
                                "advantages", List.of("a"),
                                "risks", List.of("r"),
                                "whenToUse", "quando")))
                .isInstanceOf(ValidationException.class)
                .hasMessageContaining("components");
    }

    @Test
    void rejectsArchitectureComponentWithBlankName() {
        assertThatThrownBy(() -> validator.validate(
                        ContentType.ARCHITECTURE,
                        Map.of(
                                "components", List.of(Map.of("name", "", "role", "Frontend")),
                                "flow", "Fluxo",
                                "advantages", List.of("a"),
                                "risks", List.of("r"),
                                "whenToUse", "quando")))
                .isInstanceOf(ValidationException.class)
                .hasMessageContaining("components");
    }
}
