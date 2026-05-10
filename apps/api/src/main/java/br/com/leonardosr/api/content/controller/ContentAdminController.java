package br.com.leonardosr.api.content.controller;

import br.com.leonardosr.api.content.dto.PreviewValidateResponse;
import br.com.leonardosr.api.content.service.IMdxValidationService;
import br.com.leonardosr.api.content.validation.TypeSpecificFieldsValidator;
import br.com.leonardosr.api.repository.ContentRepository;
import br.com.leonardosr.api.shared.exception.NotFoundException;
import br.com.leonardosr.api.shared.exception.ValidationException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/contents")
@Tag(name = "Conteúdos admin", description = "Validação e operações administrativas de conteúdo")
public class ContentAdminController {
    private final IMdxValidationService mdxValidationService;
    private final TypeSpecificFieldsValidator typeSpecificFieldsValidator;
    private final ContentRepository contentRepository;

    public ContentAdminController(
            IMdxValidationService mdxValidationService,
            TypeSpecificFieldsValidator typeSpecificFieldsValidator,
            ContentRepository contentRepository) {
        this.mdxValidationService = mdxValidationService;
        this.typeSpecificFieldsValidator = typeSpecificFieldsValidator;
        this.contentRepository = contentRepository;
    }

    @PostMapping("/{id}/preview-validate")
    @Operation(summary = "Validar prévia de conteúdo")
    public PreviewValidateResponse previewValidate(@PathVariable Long id) {
        var content = contentRepository.findById(id).orElseThrow(() -> new NotFoundException("Conteúdo não encontrado"));
        var errors = new ArrayList<>(mdxValidationService.validate(content.getBody()));
        try {
            typeSpecificFieldsValidator.validate(content.getType(), content.getTypeSpecificFields());
        } catch (ValidationException violation) {
            errors.add(violation.getReason());
        }
        return new PreviewValidateResponse(errors.isEmpty(), errors);
    }
}
