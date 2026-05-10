package br.com.leonardosr.api.contact.service;

import br.com.leonardosr.api.contact.dto.ContactRequest;
import br.com.leonardosr.api.domain.ContactMessage;

public interface IContactService {
    ContactMessage create(ContactRequest request);
}
