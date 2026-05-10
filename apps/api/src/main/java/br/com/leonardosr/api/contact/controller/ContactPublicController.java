package br.com.leonardosr.api.contact.controller;

import br.com.leonardosr.api.contact.dto.ContactRequest;
import br.com.leonardosr.api.contact.dto.ContactResponse;
import br.com.leonardosr.api.contact.service.IContactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/contact")
@Tag(name = "Contato público", description = "Recebimento de mensagens de contato")
public class ContactPublicController {
    private final IContactService contactService;

    public ContactPublicController(IContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    @Operation(summary = "Enviar mensagem de contato")
    public ContactResponse contact(@RequestBody @Valid ContactRequest request) {
        var saved = contactService.create(request);
        return new ContactResponse(saved.getId(), "received");
    }
}
