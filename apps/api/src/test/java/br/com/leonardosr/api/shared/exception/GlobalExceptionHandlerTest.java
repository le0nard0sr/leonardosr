package br.com.leonardosr.api.shared.exception;

import static org.hamcrest.Matchers.not;
import static org.hamcrest.Matchers.startsWith;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import br.com.leonardosr.api.contact.controller.ContactPublicController;
import br.com.leonardosr.api.contact.service.IContactService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

class GlobalExceptionHandlerTest {
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        var validator = new LocalValidatorFactoryBean();
        validator.afterPropertiesSet();

        mockMvc = MockMvcBuilders.standaloneSetup(
                        new ContactPublicController(org.mockito.Mockito.mock(IContactService.class)), new TestController())
                .setControllerAdvice(new GlobalExceptionHandler())
                .setValidator(validator)
                .build();
    }

    @Test
    void invalidRequestBodyReturnsProblemDetailsWithFieldErrors() throws Exception {
        mockMvc.perform(post("/api/public/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                {
                                  "email": "valor-invalido",
                                  "subject": "Assunto",
                                  "message": "Mensagem"
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_PROBLEM_JSON))
                .andExpect(jsonPath("$.type").value("/problems/validation-error"))
                .andExpect(jsonPath("$.title").value("Erro de validação"))
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.detail").value("A requisição contém campos inválidos."))
                .andExpect(jsonPath("$.instance").value("/api/public/contact"))
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.errors[0].field").value("email"))
                .andExpect(jsonPath("$.errors[0].rejectedValue").value("valor-invalido"));
    }

    @Test
    void responseStatusExceptionReturnsProblemDetails() throws Exception {
        mockMvc.perform(get("/test/not-found"))
                .andExpect(status().isNotFound())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_PROBLEM_JSON))
                .andExpect(jsonPath("$.type").value("/problems/not-found"))
                .andExpect(jsonPath("$.code").value("NOT_FOUND"))
                .andExpect(jsonPath("$.detail").value("Recurso de teste não encontrado"))
                .andExpect(jsonPath("$.instance").value("/test/not-found"));
    }

    @Test
    void malformedJsonReturnsProblemDetails() throws Exception {
        mockMvc.perform(post("/api/public/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{"))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_PROBLEM_JSON))
                .andExpect(jsonPath("$.type").value("/problems/malformed-json"))
                .andExpect(jsonPath("$.code").value("MALFORMED_JSON"));
    }

    @Test
    void unsupportedMethodReturnsProblemDetails() throws Exception {
        mockMvc.perform(post("/test/method"))
                .andExpect(status().isMethodNotAllowed())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_PROBLEM_JSON))
                .andExpect(jsonPath("$.type").value("/problems/method-not-allowed"))
                .andExpect(jsonPath("$.code").value("METHOD_NOT_ALLOWED"));
    }

    @Test
    void unexpectedExceptionReturnsSafeProblemDetails() throws Exception {
        mockMvc.perform(get("/test/unexpected"))
                .andExpect(status().isInternalServerError())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_PROBLEM_JSON))
                .andExpect(jsonPath("$.type").value("/problems/internal-error"))
                .andExpect(jsonPath("$.code").value("INTERNAL_ERROR"))
                .andExpect(jsonPath("$.detail").value("Não foi possível processar a requisição."))
                .andExpect(jsonPath("$.detail", not(startsWith("java.lang"))));
    }

    @RestController
    @RequestMapping("/test")
    static class TestController {
        @GetMapping("/not-found")
        void notFound() {
            throw new NotFoundException("Recurso de teste não encontrado");
        }

        @GetMapping("/method")
        void method() {
            // Endpoint usado apenas para forçar 405 via POST nos testes.
        }

        @GetMapping("/unexpected")
        void unexpected() {
            throw new IllegalStateException("Falha interna com detalhe sensível");
        }
    }
}
