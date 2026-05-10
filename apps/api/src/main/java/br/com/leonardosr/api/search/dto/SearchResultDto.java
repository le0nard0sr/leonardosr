package br.com.leonardosr.api.search.dto;

public record SearchResultDto(String kind, String slug, String title, String summary, double rank) {}
