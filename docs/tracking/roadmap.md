# Roadmap de execução

Status permitidos: `Backlog`, `Em andamento`, `Concluído`, `Bloqueado`.

## Marco 1 — Fundação técnica e design system

| ID   | Status    | Critério de conclusão                                          | Evidência/verificação                                                                                                   | Pendências                                                             | Última atualização |
| ---- | --------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------ |
| T001 | Concluído | Repositório criado com Next.js e TypeScript                    | `git init`, `npm run typecheck`, `npm run lint` e `npm run build` executados com sucesso                                | Nenhuma                                                                | 2026-05-09         |
| T002 | Concluído | Projeto Spring Boot executando localmente                      | `mvn test` executado com Java 25 LTS e Spring Boot 4.0.6                                                                | Nenhuma                                                                | 2026-05-09         |
| T003 | Concluído | Frontend, backend, banco e MinIO executando localmente         | `docker compose build` e `docker compose up -d`; web `200`, API `/actuator/health` `UP`, Postgres healthy e MinIO `200` | Nenhuma                                                                | 2026-05-09         |
| T004 | Concluído | Componentes base implementados                                 | `Button`, `Card`, `Badge`, `Container`, `SectionHeading` e `ThemeToggle` criados                                        | Refinar conforme evolução visual                                       | 2026-05-09         |
| T005 | Concluído | Header, footer e estrutura de páginas criados                  | Layout público, catch-all de rotas públicas e `npm run build` executado com sucesso                                     | Nenhuma                                                                | 2026-05-09         |
| T006 | Concluído | Alternância funcionando sem flash visual                       | Tema lido por cookie no SSR e alternado por `ThemeToggle`; typecheck e build passaram                                   | Nenhuma                                                                | 2026-05-09         |
| T007 | Concluído | Metadata base configurada                                      | Metadata global configurada em `apps/web/src/app/layout.tsx`                                                            | Expandir metadata por página nos próximos marcos                       | 2026-05-09         |
| T046 | Concluído | Storybook rodando local; commits validados via Commitlint      | `npm --workspace @leonardosr/web run build-storybook` executado com sucesso; Husky/lint-staged/Commitlint configurados  | Nenhuma                                                                | 2026-05-09         |
| T047 | Concluído | Fontes locais carregando; código com syntax highlighting Shiki | Camada de fonte local preparada com fallback e utilitário Shiki criado                                                  | Substituir placeholders por arquivos reais de fonte quando disponíveis | 2026-05-09         |
| T063 | Concluído | Decisão de topologia registrada antes da implementação de auth | `docs/adr/012-topologia-dominios-autenticacao.md` criado                                                                | Revalidar antes do Marco 6                                             | 2026-05-09         |

### Fechamento do Marco 1

- Concluídos: estrutura base frontend/backend, Docker Compose validado, design system inicial, layout público, tema, SEO global, Storybook, hooks de qualidade, ADRs iniciais e tracking.
- Pendências: substituir placeholders por arquivos reais de fonte quando a escolha tipográfica for fechada; expandir metadata por página nos próximos marcos; revalidar a topologia antes do Marco 6; acompanhar warnings de tamanho do build do Storybook; tratar vulnerabilidades reportadas pelo `npm audit` sem aplicar `audit fix --force` automaticamente.
- Bloqueios: nenhum bloqueio registrado no momento.
- Próximos passos: iniciar Marco 2 com modelo de dados, migrations, API pública e contratos OpenAPI de domínio.

### Atualização documental pós-M1

- Status: Concluído
- Evidência/verificação: `AGENTS.md` atualizado com stack fixada, regra de tracking, ciclo Git/GitHub e checagem de secrets antes de commit/push; `README.md` atualizado com comando do Storybook; `.gitignore` atualizado para ignorar `*.tsbuildinfo`; `docs/adr/014-postgresql-local-flyway-spotless.md` criado para registrar PostgreSQL 17 local, Flyway e Spotless; `docs/tracking/roadmap.md` atualizado com pendências pós-validação.
- Pendências: nenhuma adicional.
- Última atualização: 2026-05-10

## Marco 2 — Modelo de dados, API pública e contratos

### Implementação inicial do M2

- Status: Em andamento
- Evidência/verificação: branch `m2/modelo-dados-api-publica` criada; migration Flyway `V1__m2_initial_domain.sql`; entidades JPA, repositories, services, endpoints públicos e endpoints admin mínimos adicionados; validação parcial de MDX (`preview-validate`), storage/e-mail por portas, seeds idempotentes, geração OpenAPI/TypeScript resiliente, ADR-004, ADR-007, ADR-009 e ADR-011 criados.
- Verificações executadas: `mvn -f apps/api test` passou com 5 testes; `mvn -f apps/api spotless:check` passou; `npm run web:typecheck` passou; `npm run web:lint` passou; `npm run web:build` passou fora do sandbox após falha `EPERM` no build do Next.js; `npm --workspace @leonardosr/web run generate:api` passou com aviso esperado de API local indisponível.
- Revisão pós-implementação: corrigido `NoopStorageService.head` para não quebrar `confirm` em dev; pipeline de e-mail passou a renderizar template Thymeleaf também no noop; adapter Resend por HTTP adicionado; ADR-007 explicitou uso do adapter S3-compatible para R2; reorder rejeita duplicatas; validação MDX trata URL malformada; `published_at` também é protegido em update; seeds ampliados para ~15 tags.
- Verificações pós-revisão: `mvn -f apps/api test` passou com 7 testes; `mvn -f apps/api spotless:check` passou.
- Endurecimento (rodada 4): `ResendEmailService` agora serializa payload via Jackson `ObjectMapper` e valida `RESEND_API_KEY`/`from`/`admin-to` em `@PostConstruct`; `application-test.yml` migrado para PostgreSQL via Testcontainers através de `AbstractIntegrationTest` (suite IT com `@SpringBootTest` real isolada via `maven-failsafe-plugin` e `-DskipITs=false`); `LeonardoSrApiApplicationTests` renomeado para `LeonardoSrApiApplicationIT` com smoke `contextLoads`; cobertura IT adicionada para regras de domínio (`ContentLifecycleIT`, `PublicContentRepositoryIT`, `MediaAssetServiceIT`, `TaxonomyServiceIT`, `SeriesServiceIT`); endpoint `/api/public/contents` ganhou filtros opcionais `?tag=` e `?technology=` (via `ContentRepository.findPublicContents` JPQL) e `tags/{slug}` passou a usar query dedicada em vez de filtro em memória; `TypeSpecificFieldsValidator` agora desserializa `Map` para `LabFieldsDTO`/`ArchitectureFieldsDTO` com Jackson e aplica Bean Validation, integrado ao endpoint `preview-validate`; ADR-004, ADR-009 e ADR-011 reescritas com alternativas consideradas e consequências detalhadas.
- Revisão Codex pós-rodada 4: corrigida validação cascata de `ArchitectureComponentDTO` em `type_specific_fields`; campos URL de `LabFieldsDTO` agora usam Bean Validation de URL; `ResendEmailService` recebeu timeout de conexão/requisição; serialização pública de séries passou a filtrar conteúdos não publicados/futuros.
- Verificações pós-revisão Codex: `mvn -B -f apps/api/pom.xml verify` passou com 12 testes unitários e ITs pulados por padrão; `mvn -B -f apps/api/pom.xml spotless:check` passou.
- Verificações pós-endurecimento: `mvn -B -f apps/api/pom.xml verify` passou com 10 testes unitários (Surefire) e suite IT corretamente pulada (`Tests are skipped`) por default; `mvn -B -f apps/api/pom.xml spotless:check` passou.
- Refatoração estrutural da API: controllers públicos/admin divididos por recurso; `ApiDtos` quebrado em DTOs individuais; services reorganizados por domínio com interfaces `I*`; portas de e-mail/storage movidas para `contact.email` e `media.storage`; exceções transversais movidas para `shared.exception`; testes ajustados para os novos pacotes; ADR-015 criada para registrar a convenção.
- Verificações pós-refatoração estrutural: `mvn -B -f apps/api/pom.xml test` passou com 12 testes unitários; `mvn -B -f apps/api/pom.xml verify` passou com 12 testes unitários e ITs pulados por padrão; `mvn -B -f apps/api/pom.xml spotless:check` passou; `docker compose ps` confirmou Docker Desktop/daemon indisponível.
- Documentação Swagger pós-refatoração: controllers reorganizados receberam `@Tag` e `@Operation` para manter agrupamento e descrições explícitas no OpenAPI; `mvn -B -f apps/api/pom.xml test` e `mvn -B -f apps/api/pom.xml spotless:check` passaram com 12 testes unitários.
- Tratamento global de erros: `GlobalExceptionHandler` criado com `ProblemDetail`, extensões `code`/`errors`, suporte a validação de request body, JSON malformado, método HTTP não suportado, media type não suportado, `ResponseStatusException`, `ConstraintViolationException` e erro inesperado com log server-side; OpenAPI passou a registrar schemas `ProblemDetail` e `FieldErrorDetail`; ADR-016 criada para registrar o padrão de erro da API.
- Verificações pós-Problem Details: `mvn -B -f apps/api/pom.xml test` passou com 17 testes unitários; `mvn -B -f apps/api/pom.xml verify` passou com 17 testes unitários e ITs pulados por padrão; `mvn -B -f apps/api/pom.xml spotless:check` passou.
- Validação Docker pós-Problem Details: corrigida compatibilidade de runtime com Spring Boot 4/Jackson 3 (`tools.jackson.databind.ObjectMapper`) e bind de CORS por `Binder`; `docker compose build api` passou; `docker compose up -d --force-recreate api web` subiu `api`, `web`, `postgres` e `minio`; `/actuator/health` retornou `UP`; `/api/public/profile` retornou `200`; `/v3/api-docs` retornou 20 paths, incluindo controllers públicos e admin, corrigindo o sintoma de Swagger vazio.
- Pendências: com Docker disponível, rodar `mvn -B -f apps/api/pom.xml verify -DskipITs=false` para exercitar a suite IT (≈12 métodos) contra PostgreSQL real via Testcontainers; validar fluxo MinIO manualmente.
- Bloqueios: nenhum bloqueio ativo para validação básica de Docker Compose/API.
- Última atualização: 2026-05-10

### Consolidação do PRD V3 como fonte de verdade

- Status: Concluído
- Evidência/verificação: `docs/prd/prd_leonardosr_site_pessoal_v3.md` mantido como PRD vigente; PRD anterior removido; `AGENTS.md` atualizado para apontar para o PRD V3; ADR pós-M1 de PostgreSQL/Flyway/Spotless renumerado para `docs/adr/014-postgresql-local-flyway-spotless.md`, preservando `ADR-013` para Sonar conforme PRD V3.
- Impacto no M1: sem retrabalho técnico; mudanças da V3 afetam marcos posteriores, principalmente M2, M6/M8 e M8.
- Pendências: criar `ADR-013` de Sonar no Marco 8, antes de configurar a análise no CI/CD.
- Última atualização: 2026-05-10
