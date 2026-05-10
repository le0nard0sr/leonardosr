package br.com.leonardosr.api.content.validation;

import br.com.leonardosr.api.domain.ContentType;
import br.com.leonardosr.api.domain.DifficultyLevel;
import br.com.leonardosr.api.shared.exception.ValidationException;
import jakarta.validation.Valid;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import org.hibernate.validator.constraints.URL;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

@Component
public class TypeSpecificFieldsValidator {

    public record LabFieldsDTO(
            @NotBlank @URL String demonstrationUrl,
            @NotBlank @URL String sourceCodeUrl,
            @NotNull Boolean isDidactic,
            @NotNull DifficultyLevel difficultyLevel) {}

    public record ArchitectureComponentDTO(@NotBlank String name, @NotBlank String role) {}

    public record ArchitectureFieldsDTO(
            Long diagramMediaId,
            @NotEmpty List<@Valid @NotNull ArchitectureComponentDTO> components,
            @NotBlank String flow,
            @NotEmpty List<@NotBlank String> advantages,
            @NotEmpty List<@NotBlank String> risks,
            @NotBlank String whenToUse) {}

    private final ObjectMapper objectMapper;
    private final Validator validator;

    public TypeSpecificFieldsValidator(ObjectMapper objectMapper, Validator validator) {
        this.objectMapper = objectMapper;
        this.validator = validator;
    }

    public void validate(ContentType type, Map<String, Object> fields) {
        if (type == ContentType.LAB) {
            var dto = convert(fields, LabFieldsDTO.class);
            enforce(dto);
            return;
        }
        if (type == ContentType.ARCHITECTURE) {
            var dto = convert(fields, ArchitectureFieldsDTO.class);
            enforce(dto);
            return;
        }
        if (fields != null && !fields.isEmpty()) {
            throw new ValidationException("type_specific_fields deve ser nulo para o tipo " + type);
        }
    }

    private <T> T convert(Map<String, Object> fields, Class<T> target) {
        if (fields == null) {
            throw new ValidationException(
                    "type_specific_fields é obrigatório para conteúdos do tipo " + target.getSimpleName().replace("FieldsDTO", ""));
        }
        try {
            return objectMapper.convertValue(fields, target);
        } catch (RuntimeException exception) {
            throw new ValidationException(
                    "type_specific_fields inválido para "
                            + target.getSimpleName().replace("FieldsDTO", "")
                            + ": "
                            + rootCauseMessage(exception));
        }
    }

    private String rootCauseMessage(Throwable throwable) {
        var cause = throwable;
        while (cause.getCause() != null && cause.getCause() != cause) {
            cause = cause.getCause();
        }
        return cause.getMessage();
    }

    private <T> void enforce(T dto) {
        Set<ConstraintViolation<T>> violations = validator.validate(dto);
        if (!violations.isEmpty()) {
            var details = violations.stream()
                    .map(violation -> violation.getPropertyPath() + " " + violation.getMessage())
                    .collect(Collectors.joining("; "));
            throw new ValidationException("type_specific_fields inválido: " + details);
        }
    }
}
