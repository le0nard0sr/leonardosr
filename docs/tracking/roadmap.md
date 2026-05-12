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

| ID   | Status    | Critério de conclusão                     | Evidência/verificação                                                                                                                                                                  | Pendências                                            | Última atualização |
| ---- | --------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------ |
| —    | Concluído | Catch-all substituído por rotas dedicadas | `app/[[...slug]]/page.tsx` removido; 11 rotas dedicadas criadas                                                                                                                        | Nenhuma                                               | 2026-05-10         |
| T054 | Concluído | OG image dinâmica                         | 8 arquivos `opengraph-image.tsx`: global, Sobre, Experiência, Stack, Projetos, Currículo, Contato e dinâmica por projeto (`/projetos/[slug]`) via `next/og`; todos com `force-dynamic` | fallback.png estático (pendência M5 — requer `sharp`) | 2026-05-11         |
| —    | Concluído | ADR-006 criada                            | `docs/adr/006-metadata-og-fetch-ssr.md` registrando metadata, OG, cache SSR, safeFetch e o que fica para M5                                                                            | Nenhuma                                               | 2026-05-10         |
| —    | Concluído | canonical + openGraph por rota            | `alternates.canonical` e bloco `openGraph` adicionados em 10 pages (todas as rotas públicas, incluindo Privacidade e Termos); canonical fixo removido do layout raiz                   | Nenhuma                                               | 2026-05-11         |
| —    | Concluído | Placeholders M4 + nav corrigida           | `conteudos/page.tsx`, `laboratorio/page.tsx`, `arquiteturas/page.tsx` criados (eyebrow "Em breve"); `/laboratorio` adicionado ao `header.tsx`; nav sem links para 404                  | Nenhuma                                               | 2026-05-11         |

### Débitos técnicos registrados (a resolver no M5)

| Débito                                | Descrição                                                                                                                                                                                                                                                                                                  | Impacto                         | Marco alvo |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ---------- |
| `force-dynamic` no layout raiz        | `export const dynamic = "force-dynamic"` no `RootLayout` impede ISR de HTML em todas as rotas. Data Cache (`revalidate: 60`) ainda funciona; o TTFB por request é rápido porque os dados são cacheados. Solução definitiva: mover para por-página + `safeFetch` tolerante a `NEXT_PHASE_PRODUCTION_BUILD`. | Baixo (dados cacheados mitigam) | M5         |
| Fallback PNG `public/og/fallback.png` | ADR-006 prevê fallback estático 1200×630; geração requer `sharp` indisponível no ambiente de build.                                                                                                                                                                                                        | Baixo (OG dinâmica funcional)   | M5         |
| Storybook para componentes DS novos   | `PageHeader`, `Stat`, `ProjectCard`, `TimelineRow`, `TechCell`, `FilterBar` sem stories.                                                                                                                                                                                                                   | Baixo (documentação visual)     | M5         |

### Gate final do M3

- **Status:** Concluído.
- **Verificações executadas:**
  - `mvn -B -f apps/api/pom.xml test` → 22 testes unitários; BUILD SUCCESS.
  - `mvn -B -f apps/api/pom.xml spotless:check` → BUILD SUCCESS.
  - `npm run web:lint` → sem erros (pós correções Codex).
  - `npm run web:typecheck` → sem erros (pós correções Codex).
  - `npm run web:build` → BUILD SUCCESS; rotas geradas com OG por segmento.
  - PR draft aberto: [#4](https://github.com/le0nard0sr/leonardosr/pull/4)
  - Correções da revisão Codex (2ª rodada): canonical + openGraph em Privacidade e Termos; placeholders M4 para `/conteudos`, `/laboratorio`, `/arquiteturas`; `/laboratorio` adicionado à nav.
- **Validação manual/smoke:** `/`, `/sobre`, `/experiencia`, `/stack`, `/curriculo`, `/contato`, `/projetos`, `/conteudos`, `/laboratorio`, `/arquiteturas`, `/privacidade`, `/termos` retornaram `200`; `/projetos/inexistente` retornou `404`; canonical validado em `/conteudos`, `/laboratorio`, `/arquiteturas`, `/privacidade`, `/termos`; OG images globais e segmentadas retornaram `200 image/png`; `POST /api/public/contact` válido retornou `received` com `id`; honeypot preenchido retornou `received` com `id: null`.
- **Pendências:** nenhuma para o gate final do M3.
- **Bloqueios:** nenhum.
- **Última atualização:** 2026-05-11

## Marco 4 — Hub editorial unificado

**Branch:** `m4/hub-editorial-unificado`
**Objetivo:** Implementar hub editorial unificado — todas as rotas de conteúdo público funcionando com dados reais do backend.

---

### M4-B1 — Base editorial frontend e contratos

| ID  | Status    | Critério de conclusão                                                             | Evidência/verificação                                                                                      | Pendências | Última atualização |
| --- | --------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------- | ------------------ |
| —   | Concluído | Branch `m4/hub-editorial-unificado` criada                                        | `git checkout -b m4/hub-editorial-unificado`                                                               | —          | 2026-05-12         |
| —   | Concluído | Tipos `Content`, `Tag`, `Series`, `SeriesItem`, `TagDetail` em `lib/api/types.ts` | Arquivo atualizado com todos os tipos editoriais                                                           | —          | 2026-05-12         |
| —   | Concluído | Loaders SSR em `lib/api/public.ts` com `REVALIDATE_LIST`/`REVALIDATE_DETAIL`      | `getContents`, `getContentBySlug`, `getSeries`, `getSeriesBySlug`, `getTags`, `getTagBySlug` implementados | —          | 2026-05-12         |
| —   | Concluído | `ContentCard` criado                                                              | `src/components/ui/content-card.tsx`; thumbnail `<img>` para vídeos; sem iframe em listagem                | —          | 2026-05-12         |
| —   | Concluído | `SeriesCard` criado                                                               | `src/components/ui/series-card.tsx`; barra de progresso calculada por publicados/total                     | —          | 2026-05-12         |
| —   | Concluído | `typecheck`, `lint` e `build` passando                                            | Zero erros; build gerou 22 rotas; `eslint-disable` comentado para `<img>` intencional                      | —          | 2026-05-12         |

---

### M4-B2 — Listagens públicas

| ID   | Status    | Critério de conclusão                                                           | Evidência/verificação                                                                                                                                                    | Pendências | Última atualização |
| ---- | --------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | ------------------ |
| T018 | Concluído | `/conteudos` — hub geral com FilterBar por tipo e tag (URL compartilhável)      | `contents-list.tsx` client com `useSearchParams` + `router.replace`; `<Suspense>` no page server; `ConteudosList` com `FILTER_TYPES` mapeando todos os 4 filtros         | —          | 2026-05-12         |
| T018 | Concluído | `/conteudos/artigos` — listagem filtrada por `type=ARTICLE`                     | `app/conteudos/artigos/page.tsx` com `safeFetch(() => getContents({ type: "ARTICLE" }))` e grid de `ContentCard`                                                         | —          | 2026-05-12         |
| T018 | Concluído | `/conteudos/videos` — listagem VIDEO + ARTICLE_WITH_VIDEO mesclados e ordenados | `app/conteudos/videos/page.tsx` com `Promise.all`; merge + `sort` por `publishedAt`; thumbnails `<img>` sem iframe                                                       | —          | 2026-05-12         |
| T018 | Concluído | `/conteudos/series` — listagem de séries com `SeriesCard`                       | `app/conteudos/series/page.tsx` com `safeFetch(getSeries)`; grid de `SeriesCard` com barra de progresso                                                                  | —          | 2026-05-12         |
| —    | Concluído | `/laboratorio` e `/arquiteturas` — substituir placeholders com listagens reais  | `laboratorio/page.tsx` com `LabCard`; `arquiteturas/page.tsx` com `ArchitectureCard`; ambos com `getContents({ type })`                                                  | —          | 2026-05-12         |
| —    | Concluído | OG images estáticas em todas as listagens                                       | `opengraph-image.tsx` criado em `/conteudos`, `/conteudos/artigos`, `/conteudos/videos`, `/conteudos/series`, `/laboratorio`, `/arquiteturas`; todos com `force-dynamic` | —          | 2026-05-12         |
| —    | Concluído | `typecheck`, `lint` e `build` passando                                          | `npm run web:typecheck` → zero erros; `npm run web:lint` → zero erros; `npm run web:build` → BUILD SUCCESS; todas as 6 listagens e 6 OG images no output                 | —          | 2026-05-12         |

---

### M4-B3 — Página individual de conteúdo e MDX

| ID   | Status    | Critério de conclusão                                                                                                                               | Evidência/verificação                                                                                                                                                                         | Pendências | Última atualização |
| ---- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------ |
| —    | Concluído | `next-mdx-remote` e `@mdx-js/mdx` instalados                                                                                                        | `npm install next-mdx-remote @mdx-js/mdx` executado; `package.json` atualizado                                                                                                                | —          | 2026-05-12         |
| T019 | Concluído | `/conteudos/[slug]` renderiza MDX com componentes editoriais                                                                                        | `app/conteudos/[slug]/page.tsx` com `MDXRemote source={content.body} components={getMdxComponents()}`; `generateStaticParams`; `notFound()` em 404; `ApiError` distinguido de erros gerais    | —          | 2026-05-12         |
| T056 | Concluído | Biblioteca MDX: 9 componentes (Callout, CodeBlock, ComparisonTable, ArchitectureDiagram, VideoEmbed, RepositoryLink, StepList, WarningBox, InfoBox) | Todos em `components/mdx/`; registrados em `mdx-components.tsx` via `BASE_COMPONENTS`; `getMdxComponents()` e `useMDXComponents()` expõem o mesmo mapa                                        | —          | 2026-05-12         |
| T055 | Concluído | TOC com IDs alinhados (`slugifyHeading` + `headingToText`) em `lib/toc.ts`                                                                          | `extractToc()` extrai h2/h3 do MDX; h2/h3 em `mdx-components.tsx` geram `id` via `slugifyHeading(headingToText(children))`; `Toc` client component com `IntersectionObserver` para item ativo | —          | 2026-05-12         |
| T055 | Concluído | Barra de progresso de leitura                                                                                                                       | `ReadingProgress` client component com scroll listener e `role="progressbar"`; exibida em toda página de detalhe                                                                              | —          | 2026-05-12         |
| T020 | Concluído | `VideoEmbed` com lazy loading (facade thumbnail → iframe)                                                                                           | `VideoEmbed` client: thumbnail `<img>` → iframe com `autoplay=1` ao clicar; sem iframe antecipado; disponível no MDX via `<VideoEmbed videoId="..." />`                                       | —          | 2026-05-12         |
| T069 | Concluído | `lib/mdx-validate.ts` — utilitário de compilação (base para M6)                                                                                     | `validateMdx(source)` compila via `@mdx-js/mdx` e retorna `{ ok: boolean; error?: string }`; escopo: valida sintaxe MDX no frontend; regras de allowlist ficam no backend                     | —          | 2026-05-12         |
| —    | Concluído | Conteúdos relacionados no rodapé                                                                                                                    | Busca `getContents({ tag: content.tags[0].slug })`; filtra slug atual; exibe até 3 `ContentCard`; seção omitida se vazia                                                                      | —          | 2026-05-12         |
| —    | Concluído | OG image dinâmica por conteúdo; `error.tsx`                                                                                                         | `opengraph-image.tsx` busca título e tipo via `getContentBySlug`; `error.tsx` com botão "Tentar novamente" (client boundary)                                                                  | —          | 2026-05-12         |
| —    | Concluído | `typecheck`, `lint` e `build` passando                                                                                                              | Zero erros; `/conteudos/[slug]` aparece como SSG no output do build                                                                                                                           | —          | 2026-05-12         |

---

### M4-B4 — Séries e Tags

| ID   | Status    | Critério de conclusão                                                | Evidência/verificação                                                                                                                                                                             | Pendências | Última atualização |
| ---- | --------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------ |
| T021 | Concluído | `/conteudos/series/[slug]` — conteúdos em ordem; link com `?series=` | `app/conteudos/series/[slug]/page.tsx`; items ordenados por `sortOrder`; `ContentCard` recebe `href=/conteudos/${slug}?series=${seriesSlug}`; itens não publicados exibem placeholder "Em breve"  | —          | 2026-05-12         |
| T021 | Concluído | Navegação prev/next calculada no servidor (sem SWR)                  | `SeriesNav` component recebe `prev`, `next`, `seriesTitle`, `seriesSlug` como props; calculado em `page.tsx` via `searchParams.series`; sem fetch client-side; exibido acima e abaixo do conteúdo | —          | 2026-05-12         |
| T022 | Concluído | `/tags/[slug]` — conteúdos da tag; sem projetos no M4                | `app/tags/[slug]/page.tsx`; `getTagBySlug` retorna `{ tag, contents }`; grid de `ContentCard`; sem seção de projetos (backend não expõe)                                                          | —          | 2026-05-12         |
| —    | Concluído | `generateStaticParams`, `notFound()`, OG images em série e tag       | `generateStaticParams` em série (via `getSeries`) e tag (via `getTags`); `notFound()` para 404; `opengraph-image.tsx` dinâmico em ambas as rotas                                                  | —          | 2026-05-12         |
| —    | Concluído | `typecheck`, `lint` e `build` passando                               | Zero erros; `/conteudos/series/[slug]` e `/tags/[slug]` no output do build como SSG                                                                                                               | —          | 2026-05-12         |

---

### M4-B5 — Lab, Arquiteturas, Storybook e gate final

| ID   | Status    | Critério de conclusão                                                  | Evidência/verificação                                                                                                                                                                                                                        | Pendências | Última atualização |
| ---- | --------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------ |
| —    | Concluído | `/laboratorio/[slug]` com `LabFieldsDTO` + validação de tipo           | `parseLabFields()` com type guards; `content.type !== "LAB"` → `notFound()`; painel lateral com botões Demo/Código; `MDXRemote`; `error.tsx`; OG image                                                                                       | —          | 2026-05-12         |
| —    | Concluído | `/arquiteturas/[slug]` com `ArchitectureFieldsDTO` + validação de tipo | `parseArchFields()` com type guards para `components[]`, `flow`, `advantages[]`, `risks[]`, `whenToUse`; `diagramMediaId` exibe placeholder; `content.type !== "ARCHITECTURE"` → `notFound()`; `MDXRemote`; `error.tsx`; OG image            | —          | 2026-05-12         |
| T056 | Concluído | Stories no Storybook para todos os componentes M4                      | Stories criadas junto dos componentes: `ContentCard` (5 variantes), `SeriesCard` (3), `SeriesNav` (3), `Toc` (3), `Callout` (5), `CodeBlock` (5, incluindo linhas destacadas), `ComparisonTable`, `RepositoryLink`, `StepList`, `VideoEmbed` | —          | 2026-05-12         |
| —    | Concluído | Gate final: build, typecheck, lint, testes backend, Storybook          | `web:typecheck` ✅ · `web:lint` ✅ · `web:build` ✅ (39 rotas) · `mvn test` ✅ 22 testes · `spotless:check` ✅ · `build-storybook` ✅                                                                                                        | —          | 2026-05-12         |
| —    | Concluído | PR draft aberto                                                        | [PR #5](https://github.com/le0nard0sr/leonardosr/pull/5) na branch `m4/hub-editorial-unificado`                                                                                                                                              | —          | 2026-05-12         |

### Correções pós-revisão Codex (M4)

- Status: Concluído
- Evidência/verificação:
  - **Filtros por tag e tecnologia em `/conteudos`**: `page.tsx` busca `getTags()` e `getTechnologies()` em paralelo; `contents-list.tsx` expõe dois `<select>` nativos que refletem filtros na URL (`?tag=`, `?technology=`); filtragem AND client-side entre tipo, tag e tecnologia.
  - **CodeBlock `pre`/`code` MDX**: `mdx-components.tsx` agora mapeia `pre` (extrai `lang` do `className` e roteia para `CodeBlock`) e `code` (inline); fenced blocks Markdown passam automaticamente pelo `CodeBlock` com Shiki.
  - **Copy-to-clipboard**: `copy-button.tsx` criado ("use client"); `code-block.tsx` inclui `CopyButton` com posicionamento absoluto; botão exibe "copiar" / "copiado" com feedback de 2s; padding-right ajustado para não sobrepor código.
  - **TOC mobile colapsável**: `toc.tsx` recebe `collapsible?: boolean`; quando `true`, envolve em `<details>/<summary>`; `[slug]/page.tsx` renderiza `<Toc collapsible />` antes do artigo (`lg:hidden`) e TOC sticky na sidebar (`hidden lg:block`).
  - **Destaque de linhas**: `highlightCode()` aceita `highlightLines?: number[]` e marca linhas do HTML Shiki com `line--highlighted`; `CodeBlock` expõe `highlightLines` para MDX (`<CodeBlock highlightLines={[2, 4]} />`); Storybook cobre variante com linhas destacadas.
  - **Smoke Docker Compose M4**: `docker compose build` e `docker compose up -d --force-recreate api web` passaram; `docker compose ps` confirmou `api`, `web`, `postgres` healthy e `minio` em execução; API `/actuator/health`, `/api/public/contents` e `/api/public/series/arquitetura-de-aplicacoes-web` retornou `200`; páginas públicas M4 retornaram `200`; `/laboratorio/react-puro-ou-nextjs` e `/arquiteturas/laboratorio-api-rest-spring` retornaram `404` conforme esperado; OG images principais retornaram `200 image/png`.
  - **Smoke visual via Playwright CLI**: wrapper vendorizado em `.codex/vendor_imports` validado via Git Bash; `/conteudos` abriu com título correto, snapshot exibiu hub, filtros e cards seedados; clique em `Artigos` atualizou a URL para `/conteudos?type=Artigos`; navegação para `/conteudos/react-puro-ou-nextjs` carregou detalhe MDX e relacionados; screenshot salvo em `output/playwright/m4-conteudo-detalhe.png`; console registrou apenas `404` de `/favicon.ico`.
  - Gate pós-correções: `web:typecheck` ✅ · `web:lint` ✅ · `web:build` ✅ · `mvn test` ✅ · `spotless:check` ✅ · `build-storybook` ✅.
- Pendências: nenhuma para o fechamento do M4.
- Última atualização: 2026-05-12

### Suíte Playwright E2E pós-M4

- Status: Concluído
- Evidência/verificação: `@playwright/test` adicionado; scripts `test:e2e`, `test:e2e:headed`, `test:e2e:ui` e `test:e2e:install` criados; `playwright.config.ts` configurado para rodar contra Docker Compose real; artefatos `.playwright-cli/`, `output/playwright/`, `playwright-report/` e `test-results/` ignorados no Git; suíte inicial em `tests/e2e/critical-flows.spec.ts` cobre fluxos críticos públicos e M4 em Chromium desktop/mobile; `apps/web/public/favicon.ico` elimina o `404` de favicon no console; Definition of Done atualizada para exigir Playwright quando a tarefa envolver comportamento navegável/testável em browser.
- Gates: `npm run web:typecheck` passou; `npm run web:lint` passou; `npm run test:e2e:install` passou; `curl /favicon.ico` retornou `200 image/x-icon`; `npm run test:e2e` passou com 26 testes; `npm run web:build` passou; `npm --workspace @leonardosr/web run build-storybook` passou com warnings conhecidos de tamanho; `mvn -B -f apps/api/pom.xml test` passou com 22 testes; `mvn -B -f apps/api/pom.xml spotless:check` passou.
- Pendências: nenhuma para a suíte Playwright pós-M4.
- Última atualização: 2026-05-12

---

## Marco 5 — SEO técnico avançado (preparação)

**Branch:** `m5/seo-tecnico-avancado`
**Objetivo:** Implementar SEO técnico completo (sitemap, robots, RSS, JSON-LD, Twitter Cards, breadcrumbs, meta-verificação Google/Bing) e preparar base para ativação pós-deploy do M8. Inclui débitos do M3: remover `force-dynamic` global, gerar fallback OG estático, completar stories de DS.

---

### M5-B1 — Backend público SEO + tipos frontend

| ID  | Status    | Critério                                                                                     | Evidência                                                                                                             | Pendências                                        | Última atualização |
| --- | --------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------------ |
| —   | Concluído | `GET /api/public/settings/seo` retorna `PublicSeoDto` enxuto + `getSeoSettings()` SSR pronto | `mvn test` → 29 testes unitários (7 novos `PublicSeoDtoTest`); `spotless:check` ✅; `web:typecheck` ✅; `web:lint` ✅ | OpenAPI a regenerar quando API estiver disponível | 2026-05-12         |

---

### M5-B2 — Sitemap, robots, RSS

| ID   | Status  | Critério                                                                                | Evidência | Pendências                          | Última atualização |
| ---- | ------- | --------------------------------------------------------------------------------------- | --------- | ----------------------------------- | ------------------ |
| T023 | Backlog | `/sitemap.xml` lista rotas estáticas + dinâmicas com lastModified                       | —         | —                                   | —                  |
| T024 | Backlog | `/robots.txt` reflete `seo.robotsPolicy` (`allow`/`disallow_admin`) e bloqueia `/admin` | —         | Suporte real a `custom` no M6 admin | —                  |
| T027 | Backlog | `/rss.xml` retorna feed RSS 2.0 válido                                                  | —         | —                                   | —                  |

---

### M5-B3 — JSON-LD, Twitter Cards, Breadcrumbs, meta-verificação, 404

| ID    | Status  | Critério                                                              | Evidência | Pendências | Última atualização |
| ----- | ------- | --------------------------------------------------------------------- | --------- | ---------- | ------------------ |
| T025  | Backlog | JSON-LD Person/Article/Video/Breadcrumb passa em validator.schema.org | —         | —          | —                  |
| T026  | Backlog | Twitter Cards em todas as páginas + meta-verificação Google/Bing      | —         | —          | —                  |
| T057a | Backlog | Breadcrumbs componente reutilizável + JSON-LD BreadcrumbList          | —         | —          | —                  |
| —     | Backlog | 404 otimizada com `robots: noindex` e CTAs                            | —         | —          | —                  |

---

### M5-B4 — Débitos M3: force-dynamic global, safeFetch, OG fallback, stories DS

| ID              | Status    | Critério                                                        | Evidência                                                                                            | Pendências | Última atualização |
| --------------- | --------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------- | ------------------ |
| —               | Concluído | Build Next sem `force-dynamic` global e tolerante a API offline | `npm run web:build` passa com API offline; `safeFetch` + `ApiError 503→notFound()` em 6 páginas      | —          | 2026-05-12         |
| T054 (fallback) | Concluído | `public/og/fallback.png` gerado e referenciado                  | Script `og:fallback` gera PNG 38638 bytes; arquivo commitado; OG layout reference `/og/fallback.png` | —          | 2026-05-12         |
| —               | Concluído | Stories para 6 componentes DS                                   | `build-storybook` lista page-header, stat, project-card, timeline-row, tech-cell, filter-bar         | —          | 2026-05-12         |

---

### M5-B5 — Lighthouse CI + Playwright E2E + ADRs + gate final + PR draft

| ID   | Status  | Critério                                                            | Evidência | Pendências | Última atualização |
| ---- | ------- | ------------------------------------------------------------------- | --------- | ---------- | ------------------ |
| T058 | Backlog | `.lighthouserc.json` + workflow rodam Lighthouse CI com budgets CWV | —         | —          | —                  |
| —    | Backlog | Playwright E2E cobre sitemap/robots/RSS/JSON-LD/404                 | —         | —          | —                  |
| —    | Backlog | ADR-017 e ADR-018 criados                                           | —         | —          | —                  |
| —    | Backlog | Gate final M5                                                       | —         | —          | —                  |

---

### Consolidação do PRD V3 como fonte de verdade

- Status: Concluído
- Evidência/verificação: `docs/prd/prd_leonardosr_site_pessoal_v3.md` mantido como PRD vigente; PRD anterior removido; `AGENTS.md` atualizado para apontar para o PRD V3; ADR pós-M1 de PostgreSQL/Flyway/Spotless renumerado para `docs/adr/014-postgresql-local-flyway-spotless.md`, preservando `ADR-013` para Sonar conforme PRD V3.
- Impacto no M1: sem retrabalho técnico; mudanças da V3 afetam marcos posteriores, principalmente M2, M6/M8 e M8.
- Pendências: criar `ADR-013` de Sonar no Marco 8, antes de configurar a análise no CI/CD.
- Última atualização: 2026-05-10
