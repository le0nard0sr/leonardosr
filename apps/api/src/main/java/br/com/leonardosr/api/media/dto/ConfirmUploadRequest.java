package br.com.leonardosr.api.media.dto;

public record ConfirmUploadRequest(String checksum, Integer width, Integer height) {}
