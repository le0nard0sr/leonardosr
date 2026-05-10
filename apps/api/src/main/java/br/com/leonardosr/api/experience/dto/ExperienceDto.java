package br.com.leonardosr.api.experience.dto;

import br.com.leonardosr.api.domain.Experience;
import br.com.leonardosr.api.taxonomy.dto.TechnologyDto;
import java.time.LocalDate;
import java.util.List;

public record ExperienceDto(
        Long id,
        String role,
        String organization,
        LocalDate startDate,
        LocalDate endDate,
        boolean current,
        String summary,
        String description,
        int sortOrder,
        List<TechnologyDto> technologies) {
    public static ExperienceDto from(Experience experience) {
        return new ExperienceDto(
                experience.getId(),
                experience.getRole(),
                experience.getOrganization(),
                experience.getStartDate(),
                experience.getEndDate(),
                experience.isCurrent(),
                experience.getSummary(),
                experience.getDescription(),
                experience.getSortOrder(),
                experience.getTechnologies().stream().map(TechnologyDto::from).toList());
    }
}
