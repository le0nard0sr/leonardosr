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

- Status: Concluído
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
- Gate final do M2: `AbstractIntegrationTest` passou a suportar `IT_DATABASE_PROVIDER=testcontainers|compose`, mantendo Testcontainers como padrão e usando PostgreSQL do Docker Compose como fallback local Windows/Docker Desktop; `POSTGRES_HOST_PORT` permite evitar conflito com PostgreSQL nativo na porta 5432; MinIO local passou a garantir criação do bucket no startup.
- Verificações do gate final do M2: `docker compose ps` confirmou `api`, `web`, `postgres` e `minio` em execução, com Postgres healthy em `0.0.0.0:15432->5432`; `$env:IT_DATABASE_PROVIDER='compose'; $env:POSTGRES_HOST_PORT='15432'; mvn -B -f apps/api/pom.xml verify -DskipITs=false` passou com 17 testes unitários e 15 ITs; `mvn -B -f apps/api/pom.xml verify` passou mantendo ITs pulados por padrão; `mvn -B -f apps/api/pom.xml spotless:check` passou; `docker compose build api` passou; `$env:POSTGRES_HOST_PORT='15432'; docker compose up -d --force-recreate api web` subiu os serviços; `/actuator/health` retornou `UP`.
- Validação manual MinIO: `POST /api/admin/media-assets/upload-url` gerou URL pré-assinada para `m2-minio-check.pdf`; `PUT` no MinIO retornou `200`; `POST /api/admin/media-assets/11/confirm` retornou `status: ACTIVE` e `publicUrl` local.
- Pendências: nenhuma para o gate final do M2.
- Bloqueios: nenhum bloqueio ativo.
- Última atualização: 2026-05-10

## Marco 3 — Páginas públicas principais

### M3-B1 — Backend e contrato

| ID  | Status    | Critério de conclusão                                              | Evidência/verificação                                                                                     | Pendências | Última atualização |
| --- | --------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- | ---------- | ------------------ |
| —   | Concluído | `ProfileDto` expõe `curriculumUrl` derivado de `MediaAsset.ACTIVE` | Campo adicionado em `ProfileDto.java`; `ProfileDtoTest` cobre null e ACTIVE                               | Nenhuma    | 2026-05-10         |
| —   | Concluído | Honeypot `website` descarta spam silenciosamente                   | `ContactRequest.java` com campo opcional; `ContactService` descarta quando preenchido                     | Nenhuma    | 2026-05-10         |
| —   | Concluído | IP anonimizado persistido em `contact_message.ip_anonymized`       | `IpAnonymizer` em `shared/util`; `ContactService` chama `anonymize()`; `ContactMessage` com setter/getter | Nenhuma    | 2026-05-10         |
| —   | Concluído | Testes backend passando                                            | `mvn -B -f apps/api/pom.xml test` → 22 testes unitários; `spotless:check` → BUILD SUCCESS                 | Nenhuma    | 2026-05-10         |

### M3-B2 — Infra frontend

| ID  | Status    | Critério de conclusão                     | Evidência/verificação                                                                                              | Pendências                                | Última atualização |
| --- | --------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- | ------------------ |
| —   | Concluído | Camada SSR com tipos, loaders e safeFetch | `lib/api/types.ts`, `lib/api/public.ts` (server-only), `lib/api/errors.ts` criados                                 | Nenhuma                                   | 2026-05-10         |
| —   | Concluído | MDX local configurado                     | `next.config.ts` com `createMDX`; `mdx-components.tsx`; peers `@mdx-js/loader` e `@mdx-js/react` instalados        | Nenhuma                                   | 2026-05-10         |
| —   | Concluído | Componentes DS criados                    | `PageHeader`, `Stat`, `ProjectCard`, `TimelineRow`, `TechCell`, `FilterBar`, `Prose`, `ProseLayout`, `ContactForm` | Stories para DS reutilizáveis (follow-up) | 2026-05-10         |
| —   | Concluído | Header e footer atualizados               | `header.tsx` com nav completa; `footer.tsx` Server Component com aliases de e-mail                                 | Nenhuma                                   | 2026-05-10         |

### M3-B3 — Rotas institucionais

| ID   | Status    | Critério de conclusão           | Evidência/verificação                                                                                   | Pendências                                     | Última atualização |
| ---- | --------- | ------------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ------------------ |
| T012 | Concluído | Home implementada               | `app/page.tsx` com hero, projetos featured, experiência teaser, CTA final; SSR com `safeFetch`          | Nenhuma                                        | 2026-05-10         |
| T013 | Concluído | Sobre implementada              | `app/sobre/page.tsx` com bio, links sociais, side panel                                                 | Nenhuma                                        | 2026-05-10         |
| T014 | Concluído | Experiência implementada        | `app/experiencia/page.tsx` com `TimelineRow` por experiência ordenada                                   | Nenhuma                                        | 2026-05-10         |
| T015 | Concluído | Stack implementada              | `app/stack/page.tsx` + `stack-content.tsx` (client) com `FilterBar` por categoria e `TechCell`          | Nenhuma                                        | 2026-05-10         |
| —    | Concluído | Currículo implementado          | `app/curriculo/page.tsx` com paper layout, `curriculumUrl` condicional, experiências e stack            | PDF real para ser adicionado quando disponível | 2026-05-10         |
| T053 | Concluído | Privacidade e Termos publicadas | MDX em `src/content/legal/`; rotas `app/privacidade/page.tsx` e `app/termos/page.tsx` via `ProseLayout` | Nenhuma                                        | 2026-05-10         |

### M3-B4 — Projetos e Contato

| ID   | Status    | Critério de conclusão          | Evidência/verificação                                                                                                                                                                | Pendências | Última atualização |
| ---- | --------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | ------------------ |
| T016 | Concluído | Listagem e detalhe de projetos | `app/projetos/page.tsx` com `ProjectsList` (filtro client por tecnologia); `app/projetos/[slug]/page.tsx` com `generateMetadata`, `generateStaticParams`, `notFound()` e `error.tsx` | Nenhuma    | 2026-05-10         |
| T017 | Concluído | Contato implementado           | `app/contato/page.tsx` + `actions.ts` (Server Action com honeypot, validação e `submitContact`); side panel com aliases e disclosure LGPD                                            | Nenhuma    | 2026-05-10         |

### M3-B5 — Metadata, OG e fechamento

| ID   | Status    | Critério de conclusão                     | Evidência/verificação                                                                                               | Pendências                                    | Última atualização |
| ---- | --------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ------------------ |
| —    | Concluído | Catch-all substituído por rotas dedicadas | `app/[[...slug]]/page.tsx` removido; 11 rotas dedicadas criadas                                                     | Nenhuma                                       | 2026-05-10         |
| T054 | Concluído | OG image dinâmica                         | `app/opengraph-image.tsx` (global) e `app/projetos/[slug]/opengraph-image.tsx` (dinâmica por projeto) via `next/og` | Demais rotas com OG específica (follow-up M5) | 2026-05-10         |
| —    | Concluído | ADR-006 criada                            | `docs/adr/006-metadata-og-fetch-ssr.md` registrando metadata, OG, cache SSR, safeFetch e o que fica para M5         | Nenhuma                                       | 2026-05-10         |

### Gate final do M3

- **Status:** Em andamento — aguardando validação manual e PR draft.
- **Verificações executadas:**
  - `mvn -B -f apps/api/pom.xml test` → 22 testes unitários; BUILD SUCCESS.
  - `mvn -B -f apps/api/pom.xml spotless:check` → BUILD SUCCESS.
  - `npm run web:lint` → sem erros.
  - `npm run web:typecheck` → sem erros.
  - `npm run web:build` → BUILD SUCCESS; 11 rotas geradas (/, /sobre, /experiencia, /stack, /curriculo, /contato, /projetos, /projetos/[slug], /privacidade, /termos, /opengraph-image).
- **Pendências:** validação manual das rotas em browser; smoke do formulário de contato; verificação do OG image; PR draft.
- **Bloqueios:** nenhum.
- **Última atualização:** 2026-05-10

---

### Consolidação do PRD V3 como fonte de verdade

- Status: Concluído
- Evidência/verificação: `docs/prd/prd_leonardosr_site_pessoal_v3.md` mantido como PRD vigente; PRD anterior removido; `AGENTS.md` atualizado para apontar para o PRD V3; ADR pós-M1 de PostgreSQL/Flyway/Spotless renumerado para `docs/adr/014-postgresql-local-flyway-spotless.md`, preservando `ADR-013` para Sonar conforme PRD V3.
- Impacto no M1: sem retrabalho técnico; mudanças da V3 afetam marcos posteriores, principalmente M2, M6/M8 e M8.
- Pendências: criar `ADR-013` de Sonar no Marco 8, antes de configurar a análise no CI/CD.
- Última atualização: 2026-05-10
