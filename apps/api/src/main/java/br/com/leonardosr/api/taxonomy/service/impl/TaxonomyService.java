package br.com.leonardosr.api.taxonomy.service.impl;

import br.com.leonardosr.api.domain.PublicationStatus;
import br.com.leonardosr.api.repository.ContentRepository;
import br.com.leonardosr.api.repository.ExperienceRepository;
import br.com.leonardosr.api.repository.ProjectRepository;
import br.com.leonardosr.api.repository.TagRepository;
import br.com.leonardosr.api.repository.TechnologyRepository;
import br.com.leonardosr.api.shared.exception.ConflictException;
import br.com.leonardosr.api.taxonomy.service.ITaxonomyService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TaxonomyService implements ITaxonomyService {
    private final TagRepository tagRepository;
    private final TechnologyRepository technologyRepository;
    private final ContentRepository contentRepository;
    private final ProjectRepository projectRepository;
    private final ExperienceRepository experienceRepository;

    public TaxonomyService(
            TagRepository tagRepository,
            TechnologyRepository technologyRepository,
            ContentRepository contentRepository,
            ProjectRepository projectRepository,
            ExperienceRepository experienceRepository) {
        this.tagRepository = tagRepository;
        this.technologyRepository = technologyRepository;
        this.contentRepository = contentRepository;
        this.projectRepository = projectRepository;
        this.experienceRepository = experienceRepository;
    }

    @Transactional
    @Override
    public void deleteTag(Long id) {
        if (contentRepository.existsByTagsIdAndStatus(id, PublicationStatus.PUBLISHED)) {
            throw new ConflictException("Tag associada a conteúdo publicado não pode ser excluída");
        }
        tagRepository.deleteById(id);
    }

    @Transactional
    @Override
    public void deleteTechnology(Long id) {
        if (contentRepository.existsByTechnologiesIdAndStatus(id, PublicationStatus.PUBLISHED)
                || projectRepository.existsByTechnologiesIdAndStatus(id, PublicationStatus.PUBLISHED)
                || experienceRepository.existsByTechnologiesIdAndStatus(id, PublicationStatus.PUBLISHED)) {
            throw new ConflictException("Tecnologia associada a entidade publicada não pode ser excluída");
        }
        technologyRepository.deleteById(id);
    }
}
