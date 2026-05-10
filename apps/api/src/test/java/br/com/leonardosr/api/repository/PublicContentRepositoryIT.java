package br.com.leonardosr.api.repository;

import static org.assertj.core.api.Assertions.assertThat;

import br.com.leonardosr.api.AbstractIntegrationTest;
import br.com.leonardosr.api.domain.Content;
import br.com.leonardosr.api.domain.ContentType;
import br.com.leonardosr.api.domain.PublicationStatus;
import java.time.OffsetDateTime;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
class PublicContentRepositoryIT extends AbstractIntegrationTest {

    @Autowired
    private ContentRepository contentRepository;

    @Test
    void publicListingExcludesDraftAndArchived() {
        contentRepository.saveAndFlush(content("public-published-1", PublicationStatus.PUBLISHED));
        contentRepository.saveAndFlush(content("public-draft-1", PublicationStatus.DRAFT));
        contentRepository.saveAndFlush(content("public-archived-1", PublicationStatus.ARCHIVED));

        var visible = contentRepository.findByStatusAndPublishedAtLessThanEqualOrderByPublishedAtDesc(
                PublicationStatus.PUBLISHED, OffsetDateTime.now());

        assertThat(visible)
                .extracting(Content::getSlug)
                .contains("public-published-1")
                .doesNotContain("public-draft-1", "public-archived-1");
    }

    @Test
    void typeFilterReturnsOnlyMatchingPublished() {
        contentRepository.saveAndFlush(content("public-article-2", PublicationStatus.PUBLISHED));
        contentRepository.saveAndFlush(typedContent("public-lab-2", ContentType.LAB));
        contentRepository.saveAndFlush(typedContent("public-architecture-2", ContentType.ARCHITECTURE));

        var labs = contentRepository.findByTypeAndStatusAndPublishedAtLessThanEqualOrderByPublishedAtDesc(
                ContentType.LAB, PublicationStatus.PUBLISHED, OffsetDateTime.now());

        assertThat(labs)
                .extracting(Content::getSlug)
                .contains("public-lab-2")
                .doesNotContain("public-article-2", "public-architecture-2");
    }

    private Content content(String slug, PublicationStatus status) {
        var content = new Content();
        content.setSlug(slug);
        content.setTitle("Título " + slug);
        content.setSummary("Resumo");
        content.setBody("# " + slug);
        content.setType(ContentType.ARTICLE);
        content.setStatus(status);
        return content;
    }

    private Content typedContent(String slug, ContentType type) {
        var content = content(slug, PublicationStatus.PUBLISHED);
        content.setType(type);
        return content;
    }
}
