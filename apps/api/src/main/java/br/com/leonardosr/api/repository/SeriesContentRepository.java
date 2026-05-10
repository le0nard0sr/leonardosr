package br.com.leonardosr.api.repository;

import br.com.leonardosr.api.domain.SeriesContent;
import br.com.leonardosr.api.domain.SeriesContentId;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface SeriesContentRepository extends JpaRepository<SeriesContent, SeriesContentId> {
    @Query("select sc from SeriesContent sc where sc.series.id = :seriesId order by sc.sortOrder asc")
    List<SeriesContent> findBySeriesIdOrderBySortOrderAsc(Long seriesId);

    @Modifying
    @Query("delete from SeriesContent sc where sc.series.id = :seriesId")
    void deleteBySeriesId(Long seriesId);
}
