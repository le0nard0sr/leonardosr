package br.com.leonardosr.api.repository;

import br.com.leonardosr.api.domain.Project;
import br.com.leonardosr.api.domain.PublicationStatus;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByStatusAndPublishedAtLessThanEqualOrderByPublishedAtDesc(
            PublicationStatus status, OffsetDateTime now);

    Optional<Project> findBySlugAndStatusAndPublishedAtLessThanEqual(
            String slug, PublicationStatus status, OffsetDateTime now);

    boolean existsByTechnologiesIdAndStatus(Long technologyId, PublicationStatus status);
}
