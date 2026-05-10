package br.com.leonardosr.api.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.media.ArraySchema;
import io.swagger.v3.oas.models.media.IntegerSchema;
import io.swagger.v3.oas.models.media.ObjectSchema;
import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.media.StringSchema;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    OpenAPI leonardoSrOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("LeonardoSR API")
                        .version("0.1.0")
                        .description("API do site pessoal leonardosr.com.br"))
                .components(new Components()
                        .addSchemas("ProblemDetail", problemDetailSchema())
                        .addSchemas("FieldErrorDetail", fieldErrorDetailSchema()));
    }

    private Schema<?> problemDetailSchema() {
        return new ObjectSchema()
                .description("Contrato padrão de erro baseado em Problem Details")
                .addProperty("type", new StringSchema().example("/problems/validation-error"))
                .addProperty("title", new StringSchema().example("Erro de validação"))
                .addProperty("status", new IntegerSchema().example(400))
                .addProperty("detail", new StringSchema().example("A requisição contém campos inválidos."))
                .addProperty("instance", new StringSchema().example("/api/public/contact"))
                .addProperty("code", new StringSchema().example("VALIDATION_ERROR"))
                .addProperty("errors", new ArraySchema().items(new Schema<>().$ref("#/components/schemas/FieldErrorDetail")));
    }

    private Schema<?> fieldErrorDetailSchema() {
        return new ObjectSchema()
                .description("Detalhe de erro de validação por campo")
                .addProperty("field", new StringSchema().example("email"))
                .addProperty("message", new StringSchema().example("deve ser um endereço de e-mail bem formado"))
                .addProperty("rejectedValue", new Schema<>().example("valor-invalido"));
    }
}
