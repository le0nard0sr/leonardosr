package br.com.leonardosr.api.repository;

import br.com.leonardosr.api.domain.PublicationStatus;
import br.com.leonardosr.api.domain.Series;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeriesRepository extends JpaRepository<Series, Long> {
    List<Series> findByStatusAndPublishedAtLessThanEqualOrderByPublishedAtDesc(
            PublicationStatus status, OffsetDateTime now);

    Optional<Series> findBySlugAndStatusAndPublishedAtLessThanEqual(
            String slug, PublicationStatus status, OffsetDateTime now);
}
