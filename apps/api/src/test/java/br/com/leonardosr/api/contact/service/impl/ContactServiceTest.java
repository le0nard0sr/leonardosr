package br.com.leonardosr.api.contact.service.impl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import br.com.leonardosr.api.contact.dto.ContactRequest;
import br.com.leonardosr.api.contact.email.EmailService;
import br.com.leonardosr.api.domain.ContactMessage;
import br.com.leonardosr.api.repository.ContactMessageRepository;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;

class ContactServiceTest {
    private final ContactMessageRepository repository = Mockito.mock(ContactMessageRepository.class);
    private final EmailService emailService = Mockito.mock(EmailService.class);
    private final ContactService service = new ContactService(repository, emailService);

    @Test
    void storesContactMessageWithAnonymizedIpAndSendsNotification() {
        when(repository.save(any(ContactMessage.class))).thenAnswer(invocation -> invocation.getArgument(0));
        var request = new ContactRequest("Leonardo", "leo@example.com", "Assunto", "Mensagem", null);

        var saved = service.create(request, "203.0.113.77");

        assertThat(saved.getIpAnonymized()).isEqualTo("203.0.113.0");
        verify(repository).save(any(ContactMessage.class));
        verify(emailService).sendContactNotification("Leonardo", "leo@example.com", "Assunto", "Mensagem");
    }

    @Test
    void ignoresHoneypotWithoutPersistingOrSendingEmail() {
        var request = new ContactRequest("Bot", "bot@example.com", "Spam", "Mensagem", "https://spam.test");

        var saved = service.create(request, "203.0.113.77");

        assertThat(saved.getId()).isNull();
        verify(repository, never()).save(any(ContactMessage.class));
        verify(emailService, never()).sendContactNotification(any(), any(), any(), any());
    }

    @Test
    void anonymizesIpv6UsingPrefix64() {
        when(repository.save(any(ContactMessage.class))).thenAnswer(invocation -> invocation.getArgument(0));
        var request = new ContactRequest("Leonardo", "leo@example.com", "Assunto", "Mensagem", null);
        var captor = ArgumentCaptor.forClass(ContactMessage.class);

        service.create(request, "2001:db8:abcd:1234:ffff:ffff:ffff:ffff");

        verify(repository).save(captor.capture());
        assertThat(captor.getValue().getIpAnonymized()).isEqualTo("2001:db8:abcd:1234:0:0:0:0");
    }
}
