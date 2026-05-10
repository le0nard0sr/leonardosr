package br.com.leonardosr.api.shared.exception;

import jakarta.validation.ConstraintViolationException;
import java.net.URI;
import java.util.Comparator;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    private static final String CODE = "code";
    private static final String ERRORS = "errors";

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException exception,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {
        var problem = problem(
                HttpStatus.BAD_REQUEST,
                "/problems/validation-error",
                "Erro de validação",
                "A requisição contém campos inválidos.",
                "VALIDATION_ERROR",
                request);
        problem.setProperty(
                ERRORS,
                exception.getBindingResult().getFieldErrors().stream()
                        .sorted(Comparator.comparing(FieldError::getField))
                        .map(error -> new FieldErrorDetail(
                                error.getField(), error.getDefaultMessage(), safeRejectedValue(error)))
                        .toList());
        return problemResponse(problem, headers);
    }

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(
            HttpMessageNotReadableException exception,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {
        var problem = problem(
                HttpStatus.BAD_REQUEST,
                "/problems/malformed-json",
                "JSON inválido",
                "O corpo da requisição não pôde ser lido.",
                "MALFORMED_JSON",
                request);
        return problemResponse(problem, headers);
    }

    @Override
    protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(
            HttpRequestMethodNotSupportedException exception,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {
        var problem = problem(
                HttpStatus.METHOD_NOT_ALLOWED,
                "/problems/method-not-allowed",
                "Método HTTP não suportado",
                "O método HTTP informado não é suportado para este recurso.",
                "METHOD_NOT_ALLOWED",
                request);
        return problemResponse(problem, headers);
    }

    @Override
    protected ResponseEntity<Object> handleHttpMediaTypeNotSupported(
            HttpMediaTypeNotSupportedException exception,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {
        var problem = problem(
                HttpStatus.UNSUPPORTED_MEDIA_TYPE,
                "/problems/unsupported-media-type",
                "Tipo de mídia não suportado",
                "O Content-Type informado não é suportado para este recurso.",
                "UNSUPPORTED_MEDIA_TYPE",
                request);
        return problemResponse(problem, headers);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Object> handleConstraintViolation(ConstraintViolationException exception, WebRequest request) {
        var problem = problem(
                HttpStatus.BAD_REQUEST,
                "/problems/validation-error",
                "Erro de validação",
                "A requisição contém campos inválidos.",
                "VALIDATION_ERROR",
                request);
        problem.setProperty(
                ERRORS,
                exception.getConstraintViolations().stream()
                        .map(violation -> new FieldErrorDetail(
                                violation.getPropertyPath().toString(),
                                violation.getMessage(),
                                safeRejectedValue(violation.getInvalidValue(), violation.getPropertyPath().toString())))
                        .toList());
        return problemResponse(problem, new HttpHeaders());
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Object> handleResponseStatus(ResponseStatusException exception, WebRequest request) {
        var status = HttpStatus.resolve(exception.getStatusCode().value());
        if (status == null) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        var code = codeFor(status);
        var problem = problem(
                status,
                typeFor(code),
                titleFor(status),
                exception.getReason() == null ? titleFor(status) : exception.getReason(),
                code,
                request);
        return problemResponse(problem, new HttpHeaders());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleUnexpected(Exception exception, WebRequest request) {
        LOGGER.error("Erro inesperado ao processar requisição", exception);
        var problem = problem(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "/problems/internal-error",
                "Erro interno",
                "Não foi possível processar a requisição.",
                "INTERNAL_ERROR",
                request);
        return problemResponse(problem, new HttpHeaders());
    }

    private ProblemDetail problem(
            HttpStatus status, String type, String title, String detail, String code, WebRequest request) {
        var problem = ProblemDetail.forStatusAndDetail(status, detail);
        problem.setType(URI.create(type));
        problem.setTitle(title);
        problem.setInstance(URI.create(instance(request)));
        problem.setProperty(CODE, code);
        return problem;
    }

    private ResponseEntity<Object> problemResponse(ProblemDetail problem, HttpHeaders headers) {
        var responseHeaders = new HttpHeaders();
        responseHeaders.putAll(headers);
        responseHeaders.setContentType(MediaType.APPLICATION_PROBLEM_JSON);
        return new ResponseEntity<>(problem, responseHeaders, HttpStatusCode.valueOf(problem.getStatus()));
    }

    private String instance(WebRequest request) {
        if (request instanceof ServletWebRequest servletWebRequest) {
            return servletWebRequest.getRequest().getRequestURI();
        }
        return "/";
    }

    private Object safeRejectedValue(FieldError error) {
        return safeRejectedValue(error.getRejectedValue(), error.getField());
    }

    private Object safeRejectedValue(Object value, String field) {
        if (value == null || isSensitive(field)) {
            return null;
        }
        return value;
    }

    private boolean isSensitive(String field) {
        var normalized = field == null ? "" : field.toLowerCase();
        return normalized.contains("password")
                || normalized.contains("senha")
                || normalized.contains("token")
                || normalized.contains("secret")
                || normalized.contains("key")
                || normalized.contains("credential");
    }

    private String codeFor(HttpStatus status) {
        return switch (status) {
            case BAD_REQUEST -> "VALIDATION_ERROR";
            case NOT_FOUND -> "NOT_FOUND";
            case CONFLICT -> "CONFLICT";
            case UNAUTHORIZED -> "UNAUTHORIZED";
            case FORBIDDEN -> "FORBIDDEN";
            default -> status.is4xxClientError() ? "REQUEST_ERROR" : "INTERNAL_ERROR";
        };
    }

    private String typeFor(String code) {
        return switch (code) {
            case "VALIDATION_ERROR" -> "/problems/validation-error";
            case "NOT_FOUND" -> "/problems/not-found";
            case "CONFLICT" -> "/problems/conflict";
            case "UNAUTHORIZED" -> "/problems/unauthorized";
            case "FORBIDDEN" -> "/problems/forbidden";
            case "REQUEST_ERROR" -> "/problems/request-error";
            default -> "/problems/internal-error";
        };
    }

    private String titleFor(HttpStatus status) {
        return switch (status) {
            case BAD_REQUEST -> "Erro de validação";
            case NOT_FOUND -> "Recurso não encontrado";
            case CONFLICT -> "Conflito";
            case UNAUTHORIZED -> "Não autenticado";
            case FORBIDDEN -> "Acesso negado";
            default -> status.is4xxClientError() ? "Erro na requisição" : "Erro interno";
        };
    }
}
