# ADR-002 — Spring Boot para o backend

## Status

Aceita

## Contexto

O backend precisa expor API administrativa e pública, persistir dados em PostgreSQL, proteger o admin e demonstrar maturidade em Java/Spring.

## Decisão

Usar Spring Boot 4.0.6, Spring Framework 7.x, Java 25 LTS e Maven.

## Consequências

- A versão inicial usa Java 25 LTS como baseline único.
- Spring Security, Spring Session, Spring Data JPA, Flyway, Validation, Actuator e OpenAPI entram como fundação.
- O projeto deve evitar acoplamento direto a provedores externos, preservando Ports & Adapters nos marcos seguintes.
