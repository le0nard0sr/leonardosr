package br.com.leonardosr.api.repository;

import br.com.leonardosr.api.domain.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {}
