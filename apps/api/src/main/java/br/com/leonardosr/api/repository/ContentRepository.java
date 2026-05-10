package br.com.leonardosr.api.repository;

import br.com.leonardosr.api.domain.Content;
import br.com.leonardosr.api.domain.ContentType;
import br.com.leonardosr.api.domain.PublicationStatus;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ContentRepository extends JpaRepository<Content, Long> {
    List<Content> findByStatusAndPublishedAtLessThanEqualOrderByPublishedAtDesc(
            PublicationStatus status, OffsetDateTime now);

    List<Content> findByTypeAndStatusAndPublishedAtLessThanEqualOrderByPublishedAtDesc(
            ContentType type, PublicationStatus status, OffsetDateTime now);

    Optional<Content> findBySlugAndStatusAndPublishedAtLessThanEqual(
            String slug, PublicationStatus status, OffsetDateTime now);

    boolean existsByTagsIdAndStatus(Long tagId, PublicationStatus status);

    boolean existsByTechnologiesIdAndStatus(Long technologyId, PublicationStatus status);

    @Query(
            """
            select distinct c from Content c
            left join c.tags t
            left join c.technologies te
            where c.status = :status
              and c.publishedAt <= :now
              and (:type is null or c.type = :type)
              and (:tagSlug is null or t.slug = :tagSlug)
              and (:technologySlug is null or te.slug = :technologySlug)
            order by c.publishedAt desc
            """)
    List<Content> findPublicContents(
            @Param("status") PublicationStatus status,
            @Param("now") OffsetDateTime now,
            @Param("type") ContentType type,
            @Param("tagSlug") String tagSlug,
            @Param("technologySlug") String technologySlug);

    @Query(
            """
            select distinct c from Content c
            join c.tags t
            where c.status = :status
              and c.publishedAt <= :now
              and t.slug = :tagSlug
            order by c.publishedAt desc
            """)
    List<Content> findPublicByTagSlug(
            @Param("status") PublicationStatus status,
            @Param("now") OffsetDateTime now,
            @Param("tagSlug") String tagSlug);
}
