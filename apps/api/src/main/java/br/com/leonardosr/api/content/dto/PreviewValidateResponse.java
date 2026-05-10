package br.com.leonardosr.api.content.dto;

import java.util.List;

public record PreviewValidateResponse(boolean valid, List<String> errors) {}
