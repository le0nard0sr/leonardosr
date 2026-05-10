package br.com.leonardosr.api.series.dto;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record ReorderSeriesRequest(@NotEmpty List<Long> contentIds) {}
