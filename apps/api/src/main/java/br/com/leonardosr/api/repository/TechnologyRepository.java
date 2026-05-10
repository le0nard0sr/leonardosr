package br.com.leonardosr.api.repository;

import br.com.leonardosr.api.domain.Technology;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TechnologyRepository extends JpaRepository<Technology, Long> {
    Optional<Technology> findBySlug(String slug);

    boolean existsBySlug(String slug);
}
