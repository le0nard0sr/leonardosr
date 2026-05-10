package br.com.leonardosr.api.contact.email;

import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Component
public class ContactEmailRenderer {
    private final TemplateEngine templateEngine;

    public ContactEmailRenderer(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    public String render(String fromName, String fromEmail, String subject, String message) {
        var context = new Context();
        context.setVariable("fromName", fromName == null || fromName.isBlank() ? "Não informado" : fromName);
        context.setVariable("fromEmail", fromEmail);
        context.setVariable("subject", subject);
        context.setVariable("message", message);
        return templateEngine.process("email/contact-notification", context);
    }
}
