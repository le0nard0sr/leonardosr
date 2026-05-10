package br.com.leonardosr.api.repository;

import br.com.leonardosr.api.domain.Experience;
import br.com.leonardosr.api.domain.PublicationStatus;
import java.time.OffsetDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    List<Experience> findByStatusAndPublishedAtLessThanEqualOrderBySortOrderAsc(
            PublicationStatus status, OffsetDateTime now);

    boolean existsByTechnologiesIdAndStatus(Long technologyId, PublicationStatus status);
}
