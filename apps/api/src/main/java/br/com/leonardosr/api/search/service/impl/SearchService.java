package br.com.leonardosr.api.search.service.impl;

import br.com.leonardosr.api.search.dto.SearchResultDto;
import br.com.leonardosr.api.search.service.ISearchService;
import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SearchService implements ISearchService {
    private final JdbcTemplate jdbcTemplate;

    public SearchService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Transactional
    @Override
    public void refreshContentVector(Long contentId) {
        jdbcTemplate.update(
                """
                UPDATE content
                SET search_vector = to_tsvector(
                    'portuguese',
                    coalesce(title, '') || ' ' || coalesce(summary, '') || ' ' ||
                    regexp_replace(coalesce(body, ''), '<[^>]+>|import\\s+[^\\n]+|[{}]', ' ', 'g')
                )
                WHERE id = ?
                """,
                contentId);
    }

    @Transactional
    @Override
    public void refreshProjectVector(Long projectId) {
        jdbcTemplate.update(
                """
                UPDATE project
                SET search_vector = to_tsvector(
                    'portuguese',
                    coalesce(name, '') || ' ' || coalesce(summary, '') || ' ' ||
                    coalesce(description, '') || ' ' || coalesce(problem, '') || ' ' ||
                    coalesce(solution, '') || ' ' || coalesce(architecture, '')
                )
                WHERE id = ?
                """,
                projectId);
    }

    @Transactional(readOnly = true)
    @Override
    public List<SearchResultDto> search(String query) {
        if (query == null || query.isBlank()) {
            return List.of();
        }
        return jdbcTemplate.query(
                """
                WITH q AS (SELECT plainto_tsquery('portuguese', ?) AS query)
                SELECT 'content' AS kind, c.slug, c.title, c.summary,
                       ts_rank_cd(c.search_vector, q.query) AS rank
                  FROM content c, q
                 WHERE c.status = 'PUBLISHED'
                   AND c.published_at <= NOW()
                   AND (c.search_vector @@ q.query
                        OR EXISTS (
                            SELECT 1 FROM content_tag ct
                            JOIN tag t ON t.id = ct.tag_id
                            WHERE ct.content_id = c.id AND t.name ILIKE '%' || ? || '%'
                        ))
                UNION ALL
                SELECT 'project' AS kind, p.slug, p.name AS title, p.summary,
                       ts_rank_cd(p.search_vector, q.query) AS rank
                  FROM project p, q
                 WHERE p.status = 'PUBLISHED'
                   AND p.published_at <= NOW()
                   AND p.search_vector @@ q.query
                 ORDER BY rank DESC, title ASC
                """,
                (rs, rowNum) -> new SearchResultDto(
                        rs.getString("kind"),
                        rs.getString("slug"),
                        rs.getString("title"),
                        rs.getString("summary"),
                        rs.getDouble("rank")),
                query,
                query);
    }
}
