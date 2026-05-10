package br.com.leonardosr.api.contact.email;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

@Service
@ConditionalOnProperty(name = "app.email.provider", havingValue = "noop", matchIfMissing = true)
public class NoopEmailService implements EmailService {
    private static final Logger LOGGER = LoggerFactory.getLogger(NoopEmailService.class);
    private final ContactEmailRenderer renderer;

    public NoopEmailService(ContactEmailRenderer renderer) {
        this.renderer = renderer;
    }

    @Override
    public void sendContactNotification(String fromName, String fromEmail, String subject, String message) {
        var html = renderer.render(fromName, fromEmail, subject, message);
        LOGGER.info("E-mail noop de contato renderizado para {} com assunto {}: {}", fromEmail, subject, html);
    }
}
