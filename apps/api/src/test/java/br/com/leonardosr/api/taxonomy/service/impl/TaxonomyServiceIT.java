package br.com.leonardosr.api.taxonomy.service.impl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import br.com.leonardosr.api.AbstractIntegrationTest;
import br.com.leonardosr.api.domain.Content;
import br.com.leonardosr.api.domain.ContentType;
import br.com.leonardosr.api.domain.PublicationStatus;
import br.com.leonardosr.api.domain.Tag;
import br.com.leonardosr.api.domain.Technology;
import br.com.leonardosr.api.repository.ContentRepository;
import br.com.leonardosr.api.repository.TagRepository;
import br.com.leonardosr.api.repository.TechnologyRepository;
import br.com.leonardosr.api.shared.exception.ConflictException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

@Transactional
class TaxonomyServiceIT extends AbstractIntegrationTest {

    @Autowired
    private TaxonomyService taxonomyService;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private TechnologyRepository technologyRepository;

    @Autowired
    private ContentRepository contentRepository;

    @Test
    void deleteTagBlockedWhenAssociatedToPublishedContent() {
        var tag = tagRepository.saveAndFlush(newTag("rxjs"));
        var content = newContent("rxjs-article", PublicationStatus.PUBLISHED);
        content.getTags().add(tag);
        contentRepository.saveAndFlush(content);

        assertThatThrownBy(() -> taxonomyService.deleteTag(tag.getId()))
                .isInstanceOf(ConflictException.class)
                .hasMessageContaining("publicado");
    }

    @Test
    void deleteTagSucceedsWhenAssociatedOnlyToDraftContent() {
        var tag = tagRepository.saveAndFlush(newTag("temp-tag"));
        var draft = newContent("temp-draft", PublicationStatus.DRAFT);
        draft.getTags().add(tag);
        contentRepository.saveAndFlush(draft);

        taxonomyService.deleteTag(tag.getId());

        assertThat(tagRepository.findById(tag.getId())).isEmpty();
    }

    @Test
    void deleteTechnologyBlockedWhenAssociatedToPublishedContent() {
        var technology = technologyRepository.saveAndFlush(newTechnology("redis"));
        var content = newContent("redis-article", PublicationStatus.PUBLISHED);
        content.getTechnologies().add(technology);
        contentRepository.saveAndFlush(content);

        assertThatThrownBy(() -> taxonomyService.deleteTechnology(technology.getId()))
                .isInstanceOf(ConflictException.class)
                .hasMessageContaining("publicada");
    }

    private Tag newTag(String slug) {
        var tag = new Tag();
        tag.setName(slug);
        tag.setSlug(slug);
        return tag;
    }

    private Technology newTechnology(String slug) {
        var tech = new Technology();
        tech.setName(slug);
        tech.setSlug(slug);
        tech.setCategory("Backend");
        return tech;
    }

    private Content newContent(String slug, PublicationStatus status) {
        var content = new Content();
        content.setSlug(slug);
        content.setTitle("Título " + slug);
        content.setSummary("Resumo");
        content.setBody("# " + slug);
        content.setType(ContentType.ARTICLE);
        content.setStatus(status);
        return content;
    }
}
