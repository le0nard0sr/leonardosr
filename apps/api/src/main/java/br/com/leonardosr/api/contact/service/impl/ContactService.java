package br.com.leonardosr.api.contact.service.impl;

import br.com.leonardosr.api.contact.dto.ContactRequest;
import br.com.leonardosr.api.contact.email.EmailService;
import br.com.leonardosr.api.contact.service.IContactService;
import br.com.leonardosr.api.domain.ContactMessage;
import br.com.leonardosr.api.repository.ContactMessageRepository;
import br.com.leonardosr.api.shared.util.IpAnonymizer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContactService implements IContactService {
    private final ContactMessageRepository repository;
    private final EmailService emailService;

    public ContactService(ContactMessageRepository repository, EmailService emailService) {
        this.repository = repository;
        this.emailService = emailService;
    }

    @Transactional
    @Override
    public ContactMessage create(ContactRequest request, String remoteIp) {
        if (isHoneypotFilled(request)) {
            return new ContactMessage();
        }

        var message = new ContactMessage();
        message.setName(request.name());
        message.setEmail(request.email());
        message.setSubject(request.subject());
        message.setMessage(request.message());
        message.setIpAnonymized(IpAnonymizer.anonymize(remoteIp));
        var saved = repository.save(message);
        emailService.sendContactNotification(request.name(), request.email(), request.subject(), request.message());
        return saved;
    }

    private boolean isHoneypotFilled(ContactRequest request) {
        return request.website() != null && !request.website().isBlank();
    }
}
