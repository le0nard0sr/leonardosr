package br.com.leonardosr.api.contact.email;

import jakarta.annotation.PostConstruct;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;

@Service
@ConditionalOnProperty(name = "app.email.provider", havingValue = "resend")
public class ResendEmailService implements EmailService {
    private static final URI RESEND_ENDPOINT = URI.create("https://api.resend.com/emails");

    private final ContactEmailRenderer renderer;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient;
    private final String apiKey;
    private final String from;
    private final String adminTo;

    public ResendEmailService(
            ContactEmailRenderer renderer,
            ObjectMapper objectMapper,
            @Value("${app.email.resend-api-key:}") String apiKey,
            @Value("${app.email.from}") String from,
            @Value("${app.email.admin-to}") String adminTo) {
        this.renderer = renderer;
        this.objectMapper = objectMapper;
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
        this.apiKey = apiKey;
        this.from = from;
        this.adminTo = adminTo;
    }

    @PostConstruct
    void validateConfiguration() {
        Assert.hasText(apiKey, "RESEND_API_KEY ausente: configure app.email.resend-api-key para usar o provider resend");
        Assert.hasText(from, "app.email.from ausente para o provider resend");
        Assert.hasText(adminTo, "app.email.admin-to ausente para o provider resend");
    }

    @Override
    public void sendContactNotification(String fromName, String fromEmail, String subject, String message) {
        var html = renderer.render(fromName, fromEmail, subject, message);
        var payload = serialize(Map.of(
                "from", from,
                "to", List.of(adminTo),
                "reply_to", fromEmail,
                "subject", subject,
                "html", html));
        var request = HttpRequest.newBuilder(RESEND_ENDPOINT)
                .timeout(Duration.ofSeconds(15))
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(payload))
                .build();
        try {
            var response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                throw new IllegalStateException("Resend retornou status " + response.statusCode());
            }
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Envio de e-mail interrompido", exception);
        } catch (Exception exception) {
            throw new IllegalStateException("Falha ao enviar e-mail pelo Resend", exception);
        }
    }

    private String serialize(Map<String, Object> payload) {
        try {
            return objectMapper.writeValueAsString(payload);
        } catch (JacksonException exception) {
            throw new IllegalStateException("Falha ao serializar payload do Resend", exception);
        }
    }
}
