package br.com.leonardosr.api;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;

@SpringBootTest
@ActiveProfiles("test")
public abstract class AbstractIntegrationTest {
    private static final String PROVIDER_PROPERTY = "IT_DATABASE_PROVIDER";
    private static final String PROVIDER_TESTCONTAINERS = "testcontainers";
    private static final String PROVIDER_COMPOSE = "compose";

    private static final String DATABASE_PROVIDER = databaseProvider();

    @SuppressWarnings("resource")
    private static final PostgreSQLContainer<?> POSTGRES = new PostgreSQLContainer<>("postgres:17-alpine")
            .withDatabaseName("leonardosr-test")
            .withUsername("leonardosr")
            .withPassword("leonardosr");

    static {
        if (PROVIDER_TESTCONTAINERS.equals(DATABASE_PROVIDER)) {
            POSTGRES.start();
        }
    }

    @DynamicPropertySource
    static void registerProperties(DynamicPropertyRegistry registry) {
        if (PROVIDER_COMPOSE.equals(DATABASE_PROVIDER)) {
            registry.add("spring.datasource.url", AbstractIntegrationTest::composeJdbcUrl);
            registry.add("spring.datasource.username", () -> property("IT_COMPOSE_DB_USER", "leonardosr"));
            registry.add("spring.datasource.password", () -> property("IT_COMPOSE_DB_PASSWORD", "leonardosr"));
            return;
        }

        registry.add("spring.datasource.url", POSTGRES::getJdbcUrl);
        registry.add("spring.datasource.username", POSTGRES::getUsername);
        registry.add("spring.datasource.password", POSTGRES::getPassword);
    }

    private static String databaseProvider() {
        var provider = System.getenv(PROVIDER_PROPERTY);
        if (provider == null || provider.isBlank()) {
            provider = System.getProperty(PROVIDER_PROPERTY);
        }
        if (provider == null || provider.isBlank()) {
            return PROVIDER_TESTCONTAINERS;
        }

        var normalized = provider.trim().toLowerCase();
        if (PROVIDER_TESTCONTAINERS.equals(normalized) || PROVIDER_COMPOSE.equals(normalized)) {
            return normalized;
        }

        throw new IllegalArgumentException(
                "IT_DATABASE_PROVIDER deve ser 'testcontainers' ou 'compose', mas recebeu: " + provider);
    }

    private static String composeJdbcUrl() {
        var host = property("IT_COMPOSE_DB_HOST", "127.0.0.1");
        var port = property("IT_COMPOSE_DB_PORT", property("POSTGRES_HOST_PORT", "5432"));
        var database = property("IT_COMPOSE_DB_NAME", "leonardosr");
        return "jdbc:postgresql://%s:%s/%s".formatted(host, port, database);
    }

    private static String property(String name, String fallback) {
        var value = System.getenv(name);
        if (value == null || value.isBlank()) {
            value = System.getProperty(name);
        }
        return value == null || value.isBlank() ? fallback : value;
    }
}
