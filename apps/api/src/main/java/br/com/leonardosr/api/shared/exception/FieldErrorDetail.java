package br.com.leonardosr.api.shared.exception;

public record FieldErrorDetail(String field, String message, Object rejectedValue) {}
