# ADR-013 — PostgreSQL local, Flyway e Spotless no Marco 1

## Status

Aceita

## Contexto

O Marco 1 precisa de ambiente local reproduzível com PostgreSQL, Flyway e validação Maven em Java 25 LTS. Durante a validação, PostgreSQL 18 exigiu ajustes de volume e não foi reconhecido pela combinação atual de Flyway/Spring Boot.

Também foi avaliado o uso de Palantir Java Format no Spotless, mas a ferramenta falhou com Java 25 por incompatibilidade com APIs internas do `javac`.

## Decisão

Usar PostgreSQL 17 no Docker Compose local do Marco 1 e incluir `flyway-database-postgresql` no backend.

Configurar Spotless no Maven apenas com normalização segura de whitespace e newline enquanto não houver formatter Java compatível e estável para Java 25 no projeto.

## Consequências

- O ambiente local fica validado com `postgres:17-alpine`, Flyway e Spring Boot 4.0.6.
- PostgreSQL 18 pode ser reavaliado em marco futuro, quando a compatibilidade de Flyway estiver confirmada.
- A formatação Java fica conservadora no Marco 1, sem aplicar Palantir Java Format.
