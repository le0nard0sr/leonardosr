package br.com.leonardosr.api.repository;

import br.com.leonardosr.api.domain.Tag;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findBySlug(String slug);

    boolean existsBySlug(String slug);
}
