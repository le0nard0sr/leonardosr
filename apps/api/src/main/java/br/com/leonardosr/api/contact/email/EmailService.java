package br.com.leonardosr.api.contact.email;

public interface EmailService {
    void sendContactNotification(String fromName, String fromEmail, String subject, String message);
}
