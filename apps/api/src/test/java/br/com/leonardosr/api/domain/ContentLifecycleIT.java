package br.com.leonardosr.api.domain;

import static org.assertj.core.api.Assertions.assertThat;

import br.com.leonardosr.api.AbstractIntegrationTest;
import br.com.leonardosr.api.repository.ContentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
class ContentLifecycleIT extends AbstractIntegrationTest {

    @Autowired
    private ContentRepository contentRepository;

    @Test
    void preUpdateFillsPublishedAtOnDraftToPublishedTransition() {
        var draft = newContent("draft-to-publish");
        draft.setStatus(PublicationStatus.DRAFT);
        var saved = contentRepository.saveAndFlush(draft);
        assertThat(saved.getPublishedAt()).isNull();

        saved.setStatus(PublicationStatus.PUBLISHED);
        var published = contentRepository.saveAndFlush(saved);

        assertThat(published.getPublishedAt()).isNotNull();
    }

    @Test
    void rePublishDoesNotRewritePublishedAt() {
        var content = newContent("archived-to-publish");
        content.setStatus(PublicationStatus.PUBLISHED);
        var saved = contentRepository.saveAndFlush(content);
        var firstPublishedAt = saved.getPublishedAt();
        assertThat(firstPublishedAt).isNotNull();

        saved.setStatus(PublicationStatus.ARCHIVED);
        contentRepository.saveAndFlush(saved);

        saved.publish();
        var rePublished = contentRepository.saveAndFlush(saved);

        assertThat(rePublished.getPublishedAt()).isEqualTo(firstPublishedAt);
    }

    private Content newContent(String slug) {
        var content = new Content();
        content.setSlug(slug);
        content.setTitle("Título " + slug);
        content.setSummary("Resumo de teste");
        content.setBody("# " + slug + "\n\nCorpo MDX seguro.");
        content.setType(ContentType.ARTICLE);
        return content;
    }
}
