# PRD — Site Pessoal leonardosr.com.br

**Produto:** Site pessoal e plataforma de conteúdo técnico de Leonardo Silva Ribeiro
**Domínio:** `leonardosr.com.br`
**Versão do PRD:** 1.1.3
**Data:** 09/05/2026
**Status:** Pronto para implementação assistida por Codex, Claude ou equipe de desenvolvimento
**Perfil principal do projeto:** Portfólio profissional, autoridade técnica e hub de conteúdos sobre React, Next.js e Spring Boot

---

## Changelog

### 1.1.2 → 1.1.3 (análise estática com Sonar)

A versão 1.1.3 incorpora SonarQube como ferramenta de análise contínua de qualidade, segurança e manutenibilidade, sem alterar arquitetura nem antecipar complexidade:

- **RNF05** ganhou subseção "Análise estática com Sonar", definindo cobertura para backend Java/Spring Boot e frontend TypeScript/Next.js, com Quality Gate inicialmente informativo.
- **Marco 8** ganhou entrega de integração Sonar no pipeline de CI/CD e critério de conclusão correspondente.
- **Tracking** ganhou tarefa T072 (classificada como Produção, prioridade Média).
- **Seção 6.5** ganhou ADR-013 sobre escolha entre SonarQube Cloud e Server.
- **Backlog futuro** registrou itens de evolução: Quality Gate bloqueante na branch principal, meta mínima de cobertura após estabilização e SonarQube Server local em Docker para aprendizado.
- **Riscos** ganhou item sobre Quality Gate bloqueante prematuro com mitigação (iniciar informativo, evoluir gradualmente).

A proposta deixa explícito que Sonar **não substitui** ESLint, Prettier, Spotless, testes automatizados, Sentry ou revisão manual — atua como camada complementar de inspeção contínua. SonarQube Cloud é priorizado pela simplicidade operacional e, conforme política comercial vigente, tende a ser a opção adequada para repositórios públicos (cenário esperado para vitrine técnica); SonarQube Server fica como alternativa para repositório privado, restrição de custo ou aprendizado em ambiente self-hosted.

### 1.1.1 → 1.1.2 (refinamentos finais)

A versão 1.1.2 incorpora 11 ajustes de precisão sem alteração de escopo:

- **Tema claro/escuro**: redação ajustada para esclarecer que a implementação pode ser própria ou via biblioteca, desde que use cookie no servidor (não `localStorage`).
- **`site_profile`**: adicionado campo `display_name` (nome público), que faltava no modelo apesar de RF01 referenciá-lo.
- **Categoria removida**: "categoria" e "categoria principal" eliminadas de RF06, RF18 e modelo de dados. Tags cobrem a função de classificação editorial e SEO.
- **Visibilidade pública (nova Seção 6.7)**: regra central explícita de que endpoints públicos, sitemap, RSS, busca e dados estruturados retornam apenas entidades `PUBLISHED` com `published_at` preenchido e ≤ data atual.
- **Ciclo de vida da publicação (nova Seção 6.8)**: regras explícitas de `published_at` (set on first publish, never changed; re-publicação não altera; edições posteriores tocam apenas `updated_at`).
- **Normalização de MDX para busca**: RF17 ganhou regra de normalização do MDX para texto pesquisável antes de compor o `tsvector`, evitando indexar nomes de componentes JSX como ruído.
- **HTML bruto proibido em MDX na v1**: RF06.6 endurecida — HTML bruto vetado; habilitação futura via ADR específica.
- **MIME types e limites de upload**: RF22 detalhou tipos permitidos (`image/jpeg`, `image/png`, `image/webp`, `application/pdf`), SVG fora da v1 e limites de tamanho por tipo de mídia.
- **Anonimização manual de mensagem**: novo endpoint `POST /api/admin/contact-messages/{id}/anonymize` para atender solicitações LGPD individuais antes do prazo de 12 meses.
- **Proteção de tags/tecnologias em uso**: RF18 e RF04 ganharam regra de bloqueio de exclusão física para tags e tecnologias associadas a conteúdos publicados; preserva links e SEO.
- **`preview-validate` clarificado**: backend valida regras de domínio e allowlist; frontend Next.js valida compilação real do MDX. Ambas validações precisam estar OK para habilitar a transição `DRAFT` → `PUBLISHED`.

### 1.1 → 1.1.1 (saneamento)

A versão 1.1.1 incorpora 22 ajustes de saneamento, sem expansão de escopo:

- **Modelo editorial unificado de verdade**: `SERIES` deixa de ser tipo de `content`; `LAB` e `ARCHITECTURE` entram como tipos. Campos próprios de Lab e Architecture passam por `type_specific_fields` (JSONB) com DTOs validados (`LabFieldsDTO`, `ArchitectureFieldsDTO`).
- **Templates de e-mail**: React Email substituído por **Thymeleaf** como motor padrão (FreeMarker como alternativa mediante ADR). React Email vai para Backlog futuro.
- **Topologia de domínios e autenticação**: nova Seção 6.6 com decisão preferencial (subdomínios separados), regras de cookie, CORS e CSRF; ADR-012 novo.
- **Cronograma de SEO**: Search Console e Bing Webmaster divididos entre Marco 5 (preparação) e Marco 8 (ativação).
- **Modelo enriquecido**: novas entidades `site_profile` (página Sobre, links profissionais), `seo_setting` (configurações SEO no admin) e tabela `series_content` com `sort_order`.
- **LGPD**: `contact_message` ganha `anonymized_at` (job de anonimização após 12 meses) em vez de soft delete.
- **Busca**: `search_vector` com `coalesce` e montagem via SQL nativo.
- **MDX**: regras de segurança detalhadas dividindo responsabilidades entre backend (OWASP Java HTML Sanitizer, regras de domínio) e frontend (DOMPurify, compilação e renderização).
- **Mídia**: fluxo de upload pré-assinado com confirmação completo, status `PENDING`/`ACTIVE`/`DELETED`.
- **Tracking**: coluna de classificação tripartite adicionada; 8 tarefas novas (T064–T071) e divisão de T057.
- **Governança**: papel `ADMIN` único na versão inicial; política de seed documentada; ADR-011 atualizado para fixar o banco como fonte de verdade pós-Marco 6.
- **Refinamentos**: Lighthouse CI distinguido de CrUX; ressalva de volume para CrUX; linguagem cautelosa sobre Plausible e banner; aliases `contato@` e `privacidade@`; tarefa de SPF/DKIM/DMARC.

### 1.0 → 1.1

A versão 1.1 incorporou 28 modificações: classificação tripartite, decisões pendentes fechadas (Tailwind, MDX, Postgres FTS, Plausible, cookie de sessão, tema via cookie), lacunas preenchidas (LGPD, storage abstrato, e-mail abstrato, monitoramento de erros, cache, métricas, plano editorial, Search Console, Core Web Vitals, backup), refinamentos de vitrine (OG dinâmico, Shiki, TOC, Storybook, ADRs, fontes locais, OpenAPI tipado, pre-commit/Conventional Commits) e correções de inconsistência.

---

## 0. Classificação tripartite das entregas

Cada requisito e cada entrega deste PRD é classificado em uma das três categorias abaixo, que indicam **criticidade e momento de incorporação** no projeto. A classificação não substitui os marcos cronológicos da Seção 15 — ela complementa, ajudando a priorizar dentro de cada marco.

### 0.1 Essenciais de arquitetura

Decisões fundacionais. Definem como o sistema é construído. Difíceis ou caras de mudar depois. Devem estar presentes desde o Marco 1 ou Marco 2.

### 0.2 Essenciais para produção

Não são fundacionais, mas precisam estar prontos antes do site ir ao ar publicamente. Tipicamente entram entre os Marcos 5 e 8.

### 0.3 Diferenciais de vitrine

Elevam a percepção de qualidade do projeto e o valor de aprendizado. O site funcionaria sem, mas o objetivo declarado é vitrine técnica, então valem o investimento.

---

## 1. Visão do produto

O `leonardosr.com.br` será um site pessoal profissional, moderno, minimalista e tecnicamente robusto, destinado a apresentar a experiência profissional de Leonardo Silva Ribeiro, divulgar projetos, publicar artigos, hospedar páginas de apoio a vídeos do YouTube e demonstrar domínio prático nas tecnologias React, Next.js e Spring Boot.

O site deve funcionar simultaneamente como:

1. **Portfólio profissional** — apresentando trajetória, stack, projetos, experiências e formas de contato.
2. **Hub de conteúdo técnico** — reunindo artigos, vídeos, tutoriais, séries e estudos de caso.
3. **Vitrine técnica** — demonstrando boas práticas de arquitetura frontend, backend, SEO, acessibilidade, performance, segurança, observabilidade e deploy.
4. **Base de autoridade profissional** — fortalecendo presença digital, reputação técnica e indexação em mecanismos de busca.

---

## 2. Objetivos

### 2.1 Objetivo geral

Construir uma plataforma pessoal completa, com design minimalista e moderno, otimizada para SEO desde o início, capaz de divulgar experiência profissional, projetos, artigos e vídeos técnicos relacionados principalmente a React, Next.js e Spring Boot.

### 2.2 Objetivos específicos

- Apresentar Leonardo Silva Ribeiro como profissional experiente em desenvolvimento de soluções web modernas.
- Destacar competências em React, Next.js, TypeScript, Java, Spring Boot, APIs REST, segurança, autenticação, integração de sistemas e portais corporativos.
- Publicar artigos técnicos e vídeos em uma estrutura unificada de conteúdos.
- Criar páginas dedicadas para vídeos do YouTube, com texto complementar, tags, links, código-fonte e conteúdos relacionados.
- Implementar SEO técnico e editorial desde a fundação do projeto.
- Criar um painel administrativo para gestão de conteúdos, projetos, tags, séries, vídeos, perfil e configurações de SEO.
- Permitir evolução futura para newsletter, trilhas de estudo, cursos, área de downloads e integração ampliada com YouTube e GitHub.
- Servir como projeto demonstrativo real de arquitetura com Next.js no frontend e Spring Boot no backend.
- Servir como instrumento contínuo de aprendizado em padrões arquiteturais (Ports & Adapters, abstração de provedores externos, decisões registradas em ADRs).

### 2.3 Métricas de sucesso

KPIs concretos para os primeiros 12 meses pós-lançamento. Metas de tráfego são indicativas e poderão ser ajustadas após os primeiros 90 dias com dados reais.

- **Conteúdo:** 2 publicações por mês, podendo ser artigo, vídeo ou artigo com vídeo.
- **SEO:** crescimento mensal de impressões no Google Search Console; ao menos 3 palavras-chave entre as 20 primeiras posições do Google em 12 meses.
- **Tráfego (indicativo):** 500 visitantes únicos/mês em 6 meses; 2.000/mês em 12 meses.
- **Qualidade técnica:** Lighthouse ≥ 95 nas páginas públicas principais (ressalvas em RNF01).
- **Engajamento:** monitorar tempo médio de leitura nas páginas de artigo. **Não estabelecer meta de bounce rate** — em conteúdo técnico, visitante que entra, resolve dúvida e sai não é falha.
- **Lead técnico:** ao menos 5 mensagens de contato qualificadas por trimestre.

---

## 3. Público-alvo

### 3.1 Público primário

- Recrutadores técnicos.
- Gestores de tecnologia.
- Profissionais de TI.
- Desenvolvedores interessados em React, Next.js e Spring Boot.
- Pessoas que pesquisam conteúdos técnicos no Google ou YouTube.

### 3.2 Público secundário

- Colegas de trabalho.
- Alunos ou iniciantes em desenvolvimento web.
- Profissionais interessados em portais corporativos, APIs e arquitetura de aplicações.
- Pessoas interessadas em carreira pública de TI, desenvolvimento corporativo e boas práticas em projetos institucionais.

---

## 4. Posicionamento

### 4.1 Mensagem central

> Leonardo Silva Ribeiro — Desenvolvimento de soluções web modernas com React, Next.js e Spring Boot, unindo experiência institucional, arquitetura de sistemas e foco em entrega de valor.

### 4.2 Tom de comunicação

- Profissional.
- Claro.
- Técnico sem ser excessivamente acadêmico.
- Minimalista.
- Didático.
- Confiável.
- Direto.

### 4.3 Percepção desejada

O visitante deve sair com a percepção de que Leonardo é um profissional maduro, tecnicamente sólido, com experiência prática em sistemas corporativos, capaz de explicar temas complexos de forma clara e de construir soluções web completas.

---

## 5. Escopo geral

O projeto deve incluir, desde sua primeira entrega completa:

1. Página inicial.
2. Página Sobre.
3. Página Experiência.
4. Página Stack Técnica.
5. Página Projetos.
6. Página Conteúdos.
7. Página Artigos.
8. Página Vídeos.
9. Página Séries.
10. Página Laboratório.
11. Página Arquiteturas.
12. Página Currículo.
13. Página Contato.
14. Página de Política de Privacidade.
15. Página de Termos de Uso.
16. Painel administrativo (incluindo gestão de perfil e configurações de SEO).
17. API backend em Spring Boot.
18. Banco de dados PostgreSQL.
19. SEO técnico completo.
20. Integração com YouTube.
21. Integração com GitHub.
22. Analytics e monitoramento.
23. Camada abstrata de storage de mídia.
24. Camada abstrata de envio de e-mail.
25. Deploy automatizado.
26. Documentação técnica.
27. Storybook publicado para o design system.
28. Pasta `/docs/adr/` com decisões arquiteturais.

---

## 6. Arquitetura proposta

### 6.1 Frontend

- **Next.js** com App Router.
- **React.**
- **TypeScript** com tipagem estrita.
- **Tailwind CSS v4** como padrão principal de estilização. Tokens de design (cores, espaçamentos, tipografia) definidos em `@theme` no CSS, com variáveis CSS para tema claro/escuro. CSS global é permitido apenas para tokens, reset, tipografia de conteúdo MDX, blocos de código e ajustes pontuais de componentes complexos.
- **MDX** como formato oficial dos conteúdos técnicos, com biblioteca própria de componentes editoriais (ver RF06).
- **Componentização reutilizável**, documentada em Storybook.
- **Renderização híbrida** com preferência por páginas estáticas (SSG) ou ISR quando beneficiar SEO.
- **Suporte a tema claro e escuro** com persistência via cookie lido no servidor, evitando flash visual no carregamento inicial. O tema é aplicado no elemento `<html>` antes da renderização da página. A implementação pode ser própria, usando cookie + Server Components + classe no `<html>`, ou baseada em biblioteca como `next-themes`, desde que não dependa exclusivamente de `localStorage` e não gere troca perceptível de tema após a hidratação.
- **Fontes locais** via `next/font/local` com `font-display: swap`. Padrão: uma família principal com variações de peso. Segunda fonte só com ganho visual claro registrado em ADR.
- **Geração de tipos TypeScript** a partir do contrato OpenAPI exportado pelo backend, via `openapi-typescript`.
- **Pré-compilação de gramáticas e temas Shiki** em build time.
- **Geração de RSS** (`/rss.xml`) como rota Next.js consumindo a API pública (não como endpoint backend).
- **Sanitização de MDX** complementar via DOMPurify quando HTML bruto for permitido.
- **Design responsivo.**
- **Acessibilidade desde os componentes base.**

### 6.2 Backend

- **Java.**
- **Spring Boot.**
- **Spring Web.**
- **Spring Data JPA.**
- **Spring Security** com cookie de sessão (ver Seção 6.6 para topologia e regras).
- **Spring Session** para gerenciamento de sessão.
- **Spring Scheduling** (`@Scheduled`) para jobs (anonimização LGPD, limpeza de mídia órfã, etc.).
- **Bean Validation** com DTOs específicos por tipo de conteúdo.
- **PostgreSQL** com Full-Text Search nativo.
- **Flyway** para versionamento de schema.
- **OpenAPI/Swagger.** O contrato OpenAPI faz parte do Definition of Done de qualquer endpoint público ou administrativo.
- **Camada de storage abstrata** (Ports & Adapters) compatível com S3, com Cloudflare R2 como provider inicial e MinIO como adapter para ambiente local. Detalhes em RF22.
- **Camada de e-mail abstrata** (Ports & Adapters) com **Thymeleaf** como motor de template padrão (FreeMarker como alternativa mediante ADR). Templates ficam em `src/main/resources/templates/email/` versionados no repositório. Detalhes em RF23.
- **OWASP Java HTML Sanitizer** para sanitização de HTML bruto no backend.
- **Logs estruturados.**
- **Actuator** para health checks.
- **Testes unitários e de integração.**

### 6.3 Banco de dados

Banco recomendado: PostgreSQL.

Principais entidades:

- `content`.
- `project`.
- `tag`.
- `series`.
- `technology`.
- `experience`.
- `contact_message`.
- `media_asset`.
- `user`.
- `audit_log`.
- `site_profile`.
- `seo_setting`.

Tabelas de relacionamento N:N (ver Seção 12 para detalhes):

- `content_tag`.
- `content_technology`.
- `project_technology`.
- `experience_technology`.
- `content_related`.
- `series_content`.

### 6.4 Infraestrutura

Sugestões possíveis (decisão final no momento do deploy):

- **Frontend** na Vercel, Cloudflare Pages ou VPS.
- **Backend** em VPS (Hetzner, Oracle Cloud Always Free), Render, Railway, Fly.io, AWS ou outro provedor.
- **PostgreSQL** gerenciado ou containerizado.
- **Storage de mídia:** Cloudflare R2 em produção; MinIO ou filesystem em desenvolvimento local.
- **E-mail transacional:** Resend (provider de envio), com templates em Thymeleaf no backend.
- **Monitoramento de erros:** Sentry.
- **Analytics:** Plausible (cloud ou auto-hospedado).
- **Docker Compose** para ambiente local (frontend, backend, Postgres, MinIO).
- **GitHub Actions** para CI/CD.
- **Cloudflare** para DNS, cache e proteção básica.

### 6.5 Decisões arquiteturais (ADRs)

Todas as decisões arquiteturais relevantes são registradas em `/docs/adr/` no formato Michael Nygard. ADR é parte do Definition of Done para qualquer decisão arquitetural não óbvia.

Lista nominal inicial obrigatória:

- **ADR-001** — Next.js para o frontend.
- **ADR-002** — Spring Boot para o backend.
- **ADR-003** — Modelo unificado de Conteúdo.
- **ADR-004** — MDX como formato de conteúdo, com modelo editorial unificado (tipos `LAB` e `ARCHITECTURE` via `type_specific_fields` validados por DTOs específicos) e regras de segurança backend + frontend.
- **ADR-005** — Cookie de sessão para auth admin (e não JWT).
- **ADR-006** — Estratégia de SEO técnico.
- **ADR-007** — Storage de mídia: abstração + R2 como provider inicial; fluxo de upload pré-assinado com confirmação; flexibilidade para `blur_data_url` e `checksum`.
- **ADR-008** — Plausible como provider de analytics.
- **ADR-009** — Busca com PostgreSQL Full-Text Search; regras de atualização do `tsvector` com `coalesce` e SQL nativo.
- **ADR-010** — Estratégia de cache e revalidação.
- **ADR-011** — **Banco de dados como fonte de verdade para conteúdos publicados e rascunhos**, a partir da ativação do painel administrativo (Marco 6). O repositório poderá conter conteúdos seed e exemplos para popular o banco em desenvolvimento (via `data.sql` ou `CommandLineRunner`), mas não é a fonte primária após o admin estar em produção. Eventuais migrações de conteúdo do Git para o banco devem ser feitas via script versionado.
- **ADR-012 (novo)** — Topologia de domínios e autenticação administrativa (ver Seção 6.6).
- **ADR-013 (novo)** — SonarQube Cloud para análise estática contínua (ver RNF05): Cloud preferencial pela simplicidade operacional e custo zero em repositório público; Server como alternativa para repositório privado ou aprendizado em ambiente self-hosted.

Novos ADRs criados conforme decisões relevantes surgirem.

### 6.6 Topologia de domínios e autenticação

A topologia de produção deve ser definida antes da implementação da autenticação administrativa.

**Topologia preferencial:**

```
- leonardosr.com.br           → frontend Next.js (incluindo /admin)
- api.leonardosr.com.br       → backend Spring Boot
- storybook.leonardosr.com.br → Storybook publicado
```

**Cenário cross-origin / same-site:**

Embora frontend e backend fiquem em hosts diferentes (cross-origin), ambos compartilham o mesmo domínio registrável (`leonardosr.com.br`). Pelas regras de same-site dos browsers, isso significa que `SameSite=Strict` é tecnicamente viável — porém, na prática, `SameSite=Lax` é o padrão recomendado para evitar quebras em fluxos OAuth/redirect futuros e permitir navegação top-level fluida entre os hosts.

**Implicações para autenticação administrativa:**

- Cookies com `Secure`, `HttpOnly` e `Path=/`.
- `SameSite=Lax` como padrão; `Strict` permitido se validado em ADR-012 para a topologia adotada.
- Atributo `Domain` do cookie:
  - Por padrão, **host-only** (sem atributo `Domain` explícito) — mais seguro quando o cookie é consumido apenas pela API.
  - `Domain=.leonardosr.com.br` apenas quando houver necessidade explícita de compartilhar cookie entre subdomínios, registrada em ADR.
- CORS no backend restrito a `https://leonardosr.com.br` com credentials habilitado (`Access-Control-Allow-Credentials: true`).
- CSRF token explícito emitido pelo backend e enviado pelo frontend em cada requisição de mutação ao admin.
- Logout invalida sessão no servidor (Spring Session).

**Topologia alternativa via reverse proxy (caso opção VPS única seja escolhida):**

```
- leonardosr.com.br         → Next.js
- leonardosr.com.br/api     → proxy para Spring Boot
```

Nesse caso, frontend e backend ficam same-origin: `SameSite=Strict` é viável sem ressalvas e CORS deixa de ser necessário. O reverse proxy (nginx, Caddy ou Traefik) resolve roteamento e SSL.

**Decisão registrada em ADR-012.**

---

## 7. Estrutura de navegação

### 7.1 Menu principal

Menu enxuto, alinhado ao design minimalista:

```text
Início
Projetos
Conteúdos
Laboratório
Stack
Sobre
Contato
```

### 7.2 Submenu de Sobre

```text
Sobre mim
Experiência
Currículo
```

A página inicial deve conter chamada explícita para Experiência, garantindo visibilidade a recrutadores mesmo com Experiência em submenu.

### 7.3 Submenu de Conteúdos

```text
Todos
Artigos
Vídeos
Séries
Tutoriais
Estudos de caso
```

### 7.4 Rotas principais

```text
/
/sobre
/experiencia
/stack
/projetos
/projetos/[slug]
/conteudos
/conteudos/artigos
/conteudos/videos
/conteudos/series
/conteudos/[slug]
/laboratorio          (visão filtrada de content com type=LAB)
/laboratorio/[slug]
/arquiteturas         (visão filtrada de content com type=ARCHITECTURE)
/arquiteturas/[slug]
/curriculo
/contato
/privacidade
/termos
/rss.xml              (gerado pelo Next.js)
/admin
/admin/conteudos
/admin/videos         (visão filtrada de /admin/conteudos)
/admin/projetos
/admin/tags
/admin/series
/admin/tecnologias
/admin/experiencias
/admin/midias
/admin/mensagens
/admin/perfil
/admin/configuracoes/seo
```

---

## 8. Requisitos funcionais

## RF01 — Página inicial

A página inicial deve apresentar, de forma clara e visualmente forte:

- Nome profissional (`site_profile.display_name`).
- Frase de posicionamento.
- Tecnologias principais.
- Botões para projetos, conteúdos e contato.
- Projetos em destaque.
- Conteúdos recentes.
- Vídeos recentes.
- Resumo da experiência com link para a página dedicada.
- Chamada final para contato.

### Critérios de aceitação

- A home deve carregar rapidamente, atendendo às metas de Core Web Vitals em RNF01.
- Deve funcionar bem em desktop, tablet e mobile.
- Deve apresentar metadados próprios de SEO.
- Deve conter links para as principais áreas do site, incluindo Experiência.
- Deve ter visual minimalista, moderno e profissional.

---

## RF02 — Página Sobre

A página Sobre deve apresentar a trajetória profissional, áreas de interesse, forma de atuação e visão técnica. Os textos vêm da entidade `site_profile` (gerenciada pelo admin).

Conteúdos esperados:

- Resumo biográfico profissional.
- Experiência com desenvolvimento de sistemas corporativos.
- Interesse por React, Next.js, Spring Boot, portais, APIs e arquitetura.
- Abordagem de trabalho.
- Links para currículo, LinkedIn, GitHub, YouTube e contato (alimentados por `site_profile`).

### Critérios de aceitação

- Texto editável pelo painel administrativo (`/admin/perfil`).
- Deve conter SEO próprio.
- Deve reforçar autoridade profissional sem parecer currículo extenso.

---

## RF03 — Página Experiência

A página Experiência deve apresentar histórico profissional em formato de linha do tempo ou blocos organizados.

Cada experiência deve conter:

- Cargo ou papel.
- Organização.
- Período.
- Resumo.
- Principais atividades.
- Tecnologias relacionadas.
- Projetos de destaque relacionados.

### Critérios de aceitação

- Deve permitir cadastro e ordenação das experiências via admin.
- Deve permitir ocultar experiências não publicadas (status `DRAFT` ou `ARCHIVED`).
- Deve ter versão resumida e detalhada.

---

## RF04 — Página Stack Técnica

A página Stack deve apresentar tecnologias organizadas por categoria.

Categorias iniciais:

- Frontend.
- Backend.
- Banco de dados.
- Segurança e autenticação.
- DevOps.
- Portais e integrações.
- Qualidade e testes.

Cada tecnologia deve conter:

- Nome.
- Categoria.
- Nível de familiaridade.
- Descrição curta.
- Projetos relacionados.
- Conteúdos relacionados.

### Critérios de aceitação

- Deve permitir filtrar por categoria.
- Deve permitir vincular tecnologias a projetos e conteúdos.
- Deve ser visualmente simples, usando cards ou badges.
- Tecnologias associadas a entidades publicadas não podem ser excluídas fisicamente — a operação `DELETE` é bloqueada pelo backend com resposta informativa, exigindo desvinculação prévia (regra análoga à de tags em RF18).

---

## RF05 — Página Projetos

A página Projetos deve listar projetos profissionais, demonstrativos e estudos de caso.

Cada projeto deve conter:

- Nome.
- Slug.
- Resumo.
- Descrição detalhada.
- Problema resolvido.
- Solução implementada.
- Tecnologias usadas.
- Arquitetura.
- Principais decisões técnicas.
- Resultados ou aprendizados.
- Link para demonstração.
- Link para repositório.
- Imagem de capa (FK para `media_asset`).
- Status (`DRAFT`, `PUBLISHED`, `ARCHIVED`).
- Destaque na home.

### Critérios de aceitação

- Deve ter listagem com filtros por tecnologia.
- Deve ter página detalhada por projeto.
- Deve permitir projetos privados ou sem link público.
- Deve permitir vincular artigos e vídeos relacionados.

---

## RF06 — Conteúdos unificados

O site deve possuir uma área chamada Conteúdos, onde artigos, vídeos, tutoriais, estudos de caso, laboratórios e arquiteturas sejam tratados como tipos de uma mesma entidade editorial.

### 6.1 Tipos de conteúdo

```
ARTICLE
VIDEO
ARTICLE_WITH_VIDEO
TUTORIAL
CASE_STUDY
TECH_NOTE
LAB
ARCHITECTURE
```

A entidade `series` **não é** tipo de conteúdo. Ela representa coleção editorial e organiza conteúdos em sequência via tabela `series_content` (ver RF08).

### 6.2 Conteúdo em MDX

Conteúdos textuais usam **MDX** como formato oficial. Markdown puro é subconjunto válido — artigos simples não precisam usar componentes.

**Biblioteca de componentes editoriais** (documentada no Storybook):

- `Callout` (variantes info, warning, danger, success).
- `CodeBlock` com syntax highlighting via Shiki, suporte a tema dual, copy-to-clipboard e destaque de linhas.
- `ComparisonTable`.
- `ArchitectureDiagram`.
- `VideoEmbed` com lazy loading.
- `RepositoryLink`.
- `StepList`.
- `WarningBox` e `InfoBox`.

**Política:** artigos não devem importar componentes ad hoc; toda interatividade passa pela biblioteca.

### 6.3 Campos de cada conteúdo

Cada conteúdo deve conter:

- Título.
- Slug.
- Resumo.
- Corpo em MDX.
- Tipo (um dos da Seção 6.1).
- `type_specific_fields` (JSONB, opcional) — estrutura validada por DTO específico do tipo (ver Seção 12.13).
- Status (`DRAFT`, `PUBLISHED`, `ARCHIVED`).
- Data agendada de publicação (`scheduled_at`, opcional, usado inicialmente para planejamento editorial; execução automática fica como evolução posterior).
- Tags.
- Imagem de capa (FK para `media_asset`).
- Data de publicação.
- Data de atualização.
- Tempo de leitura.
- Duração do vídeo, quando houver.
- URL do YouTube, quando houver.
- ID do vídeo no YouTube, quando houver.
- Repositório GitHub relacionado, quando houver.
- Projeto relacionado, quando houver.
- Conteúdos relacionados.
- Metadados de SEO.

### 6.4 Apresentação

Em artigos com mais de 1500 palavras:

- **TOC obrigatório**, flutuante na lateral (desktop) ou colapsável no topo (mobile), com seção ativa destacada via IntersectionObserver.
- **Barra de progresso de leitura opcional**, no topo da página — discreta, acessível, com contraste adequado e sem interferir em foco de teclado.

### 6.5 Open Graph dinâmico

Cada artigo, vídeo, projeto e série gera **OG image dinâmica** via `opengraph-image.tsx` do Next.js, com título do conteúdo, tipo de conteúdo e identidade visual do site. Imagem cacheada e estável. **Fallback:** OG image estática global definida para o caso de a geração dinâmica falhar.

### 6.6 Regras de segurança e validação do MDX

A renderização do MDX ocorre no Next.js (Node), não no Spring Boot. A validação acontece em duas camadas:

**Backend (Spring Boot):**

- Apenas usuários autenticados com role `ADMIN` podem criar ou editar MDX.
- Validação de regras de domínio: status (`DRAFT`/`PUBLISHED`/`ARCHIVED`), autoria, tamanho máximo do `body`, slug único.
- Validação por **allowlist de componentes** referenciados no MDX. Parser superficial detecta nomes de componentes JSX e rejeita qualquer um fora da biblioteca editorial registrada.
- Validação de **imports proibidos**: parser que rejeita linhas `import` no MDX, sem exceção.
- **HTML bruto proibido na versão inicial.** Tags HTML diretas no MDX são vetadas. Apenas componentes da biblioteca editorial e a sintaxe Markdown padrão são aceitos. Habilitação futura de subconjunto HTML deverá ser feita via ADR específica, com definição de tags permitidas, sanitização via **OWASP Java HTML Sanitizer** e testes de segurança.
- URLs externas em imagens validadas contra allowlist do `site_profile`.

**Frontend (Next.js / Node):**

- Compilação real do MDX com componentes da biblioteca editorial.
- Validação de renderização: o conteúdo precisa compilar e renderizar sem erros antes que o status possa virar `PUBLISHED`.
- Sanitização adicional via **DOMPurify** (ou equivalente Node) mantida como dependência preventiva, **mas não exercitada na versão inicial** já que HTML bruto está proibido no backend (ver acima).
- Geração de preview no admin antes da publicação.

**Política operacional:**

- Conteúdo com erro de compilação ou renderização não pode ser publicado. **Fluxo de validação:** o admin chama `POST /api/admin/contents/{id}/preview-validate`; o backend valida regras de domínio, allowlist de componentes, imports proibidos e regras de segurança textual. Em paralelo, o frontend Next.js compila e renderiza o MDX localmente. **Apenas com ambas validações OK** a UI habilita a transição `DRAFT` → `PUBLISHED`.
- Imports diretos no MDX são proibidos sem exceção.
- Apenas componentes registrados na biblioteca editorial podem ser usados (allowlist).
- HTML bruto é proibido na versão inicial. Habilitação futura via ADR específica, com definição de tags permitidas, sanitização obrigatória e testes de segurança.

### 6.7 Visibilidade pública

Endpoints públicos, sitemap, RSS, busca pública, dados estruturados (JSON-LD) e quaisquer páginas indexáveis devem retornar **apenas entidades com `status = PUBLISHED`** e, quando aplicável, `published_at` preenchido e menor ou igual à data atual. Conteúdos `DRAFT`, `ARCHIVED`, sem `published_at` ou com publicação futura agendada **não devem aparecer** em rotas públicas, sitemap, RSS, busca pública ou dados estruturados.

Esta regra é central e se aplica a todas as entidades publicáveis (`content`, `project`, `series`, `experience`).

### 6.8 Regras de ciclo de vida da publicação

- Ao publicar uma entidade pela primeira vez (transição `DRAFT` → `PUBLISHED`), o backend deve preencher `published_at` com a data/hora atual, **se ainda estiver nulo**.
- Re-publicações (após `ARCHIVED` → `PUBLISHED`) **não alteram** `published_at`. Apenas `updated_at` é atualizado.
- Edições posteriores em entidade já publicada atualizam apenas `updated_at`, sem tocar `published_at`.
- O campo `scheduled_at` **não tem efeito em endpoints públicos** enquanto a publicação automática agendada não for implementada (Backlog futuro). Apenas entidades com `status = PUBLISHED` e `published_at` preenchido aparecem publicamente — `scheduled_at` é hoje apenas planejamento editorial visível no admin.

Estas regras se aplicam a `content`, `project`, `series` e `experience`.

### Critérios de aceitação

- Deve haver listagem geral de conteúdos.
- Deve haver filtros por tipo, tecnologia e tag.
- Deve haver busca textual (RF17).
- Deve haver página individual por conteúdo.
- Artigos e vídeos devem poder aparecer juntos em listagens e trilhas.
- TOC deve aparecer em artigos longos.
- OG image deve ser gerada por conteúdo, com fallback estático.
- Tipos `LAB` e `ARCHITECTURE` exibem campos próprios definidos em `type_specific_fields`.

---

## RF07 — Página de vídeos

A página de vídeos deve listar vídeos publicados ou planejados para o YouTube. É uma visão filtrada de `content` com `type IN (VIDEO, ARTICLE_WITH_VIDEO)`.

Cada vídeo deve ter:

- Thumbnail.
- Título.
- Resumo.
- Duração.
- Tags.
- Data de publicação.
- Link para assistir.
- Página dedicada no site.
- Embed do YouTube apenas na página de detalhe, evitando múltiplos iframes na listagem.

### Critérios de aceitação

- A listagem não deve carregar vários iframes simultaneamente.
- A página individual deve ter vídeo incorporado, descrição, links, código-fonte e conteúdos relacionados.
- Cada vídeo deve ter URL própria no site.
- Cada vídeo deve ter metadados próprios de SEO e dados estruturados `VideoObject` quando possível.

---

## RF08 — Séries de conteúdo

O site deve permitir organizar conteúdos em séries.

Exemplos de séries:

- Spring Boot na prática.
- React e Next.js para aplicações modernas.
- Arquitetura de aplicações web.
- Segurança em APIs.
- Portais corporativos e experiência digital.

A entidade `series` é **coleção editorial**, não tipo de conteúdo. A relação entre séries e conteúdos é feita pela tabela associativa `series_content` (ver Seção 12.11), que permite:

- Um conteúdo pertencer a múltiplas séries.
- Ordenação por série via `sort_order`.
- Navegação anterior/próximo dentro de cada série.

Cada série deve conter:

- Nome.
- Slug.
- Descrição.
- Imagem de capa (FK para `media_asset`).
- Status (`DRAFT`, `PUBLISHED`, `ARCHIVED`).
- Progresso de publicação (calculado: razão entre conteúdos publicados e total na série).

### Critérios de aceitação

- Deve ser possível visualizar todos os conteúdos de uma série em ordem.
- Deve ser possível combinar artigos e vídeos na mesma série.
- Deve haver navegação para conteúdo anterior e próximo dentro da série.
- Conteúdo pode aparecer em mais de uma série simultaneamente.

---

## RF09 — Laboratório

A seção Laboratório apresenta experimentos técnicos e demonstrações práticas. **Implementada como visão filtrada de `content` com `type = LAB`**, usando `type_specific_fields` validados pelo `LabFieldsDTO`.

Exemplos:

- Formulário com validação.
- Consumo de API.
- Mini dashboard.
- Demonstração de autenticação.
- Comparação de renderização React e Next.js.
- Componentes acessíveis.
- Exemplos de integração frontend e backend.

Campos próprios do `LabFieldsDTO` (em `type_specific_fields`):

- `demonstration_url` (URL pública da demonstração).
- `source_code_url` (link para repositório ou snippet).
- `is_didactic` (boolean: didático ou produção).
- `difficulty_level` (`BEGINNER` | `INTERMEDIATE` | `ADVANCED`).

Campos comuns (vindos de `content`):

- Título, slug, resumo, corpo MDX, tags, tecnologias, conteúdos relacionados, status, SEO, capa.

### Critérios de aceitação

- Deve ter página própria em `/laboratorio/[slug]`.
- Deve deixar claro se o experimento é didático ou produção (`is_didactic`).
- Deve poder ser vinculado a artigos e vídeos.

---

## RF10 — Arquiteturas

A seção Arquiteturas apresenta desenhos, explicações e decisões técnicas sobre arquiteturas de aplicações. **Implementada como visão filtrada de `content` com `type = ARCHITECTURE`**, usando `type_specific_fields` validados pelo `ArchitectureFieldsDTO`.

Exemplos:

- Next.js + Spring Boot + PostgreSQL.
- React + Spring Boot + Keycloak.
- Spring Boot + Docker + PostgreSQL.
- API REST com autenticação JWT.
- Portal com micro frontends.

Campos próprios do `ArchitectureFieldsDTO` (em `type_specific_fields`):

- `diagram_media_id` (FK para `media_asset`).
- `components` (lista de strings ou objetos com nome + papel).
- `flow` (texto descritivo do fluxo de comunicação).
- `advantages` (lista de strings).
- `risks` (lista de strings).
- `when_to_use` (texto descritivo).

Campos comuns (vindos de `content`):

- Título, slug, resumo, corpo MDX, tags, tecnologias, projetos relacionados, status, SEO, capa.

### Critérios de aceitação

- Deve ter página própria em `/arquiteturas/[slug]`.
- Diagrama vem da entidade `media_asset` via `diagram_media_id`.
- Deve permitir vincular projetos, artigos e vídeos.
- Deve ter SEO próprio.

---

## RF11 — Currículo

A página Currículo deve apresentar versão profissional resumida e permitir download em PDF.

Conteúdos esperados:

- Resumo profissional.
- Stack principal.
- Experiência.
- Formação.
- Certificações ou cursos.
- Projetos relevantes.
- Links profissionais.

O PDF é referenciado em `site_profile.curriculum_media_id`.

### Critérios de aceitação

- Deve ter botão para download em PDF.
- O PDF pode ser estático inicialmente.
- Deve ser possível atualizar o arquivo do currículo via admin.

---

## RF12 — Contato

A página Contato deve permitir que visitantes entrem em contato.

Campos do formulário:

- Nome.
- E-mail.
- Assunto.
- Mensagem.

Recursos:

- Validação no frontend e backend.
- Proteção anti-spam.
- Mensagem de sucesso.
- Armazenamento no banco.
- Notificação por e-mail ao admin via camada abstrata de e-mail (RF23).

O e-mail de contato exibido é o alias `site_profile.contact_email_alias` (ex.: `contato@leonardosr.com.br`), nunca o e-mail pessoal.

### Critérios de aceitação

- O formulário deve validar campos obrigatórios.
- Não deve expor e-mail pessoal de forma desnecessária.
- Deve registrar data, IP anonimizado ou metadados mínimos, respeitando privacidade.
- Notificação ao admin deve usar a camada abstrata, não acoplar diretamente ao provider.

---

## RF13 — Painel administrativo

O painel administrativo deve permitir gerenciar:

- Conteúdos (todos os tipos: artigo, vídeo, lab, arquitetura, etc.).
- Vídeos (visão filtrada).
- Projetos.
- Tags.
- Séries (coleções).
- Tecnologias.
- Experiências.
- Mídias (entidade `media_asset`).
- Mensagens de contato.
- **Perfil do site** (entidade `site_profile`, em `/admin/perfil`).
- **Configurações de SEO** (entidade `seo_setting`, em `/admin/configuracoes/seo`).

### Critérios de aceitação

- Deve exigir autenticação (ver RF14).
- Deve permitir criar, editar, publicar, arquivar e excluir registros.
- Deve ter editor MDX com pré-visualização.
- Deve permitir registrar `scheduled_at` para planejamento editorial.
- Deve permitir upload de mídias com `alt_text` e geração de `blur_data_url` quando viável.
- Deve exibir conteúdos agendados, mas **não publicar automaticamente** na versão inicial.
- Deve registrar data de criação e atualização.
- Deve ter interface simples e funcional.

---

## RF14 — Autenticação administrativa

O painel administrativo deve ser protegido por login, conforme **Seção 6.6** (Topologia de domínios e autenticação).

**Mecanismo:**

- Cookie de sessão `HttpOnly`, `Secure`, gerenciado por Spring Session.
- `SameSite` conforme topologia: `Lax` por padrão na topologia preferencial (subdomínios), `Strict` viável em reverse proxy single-domain. Decisão registrada em ADR-012.
- CSRF protection obrigatória nas rotas administrativas com token explícito.
- Senhas armazenadas com BCrypt ou Argon2.

**Política de papéis na versão inicial:**

Na versão inicial haverá apenas o papel `ADMIN`. Todo usuário autenticado é administrador com acesso total ao painel. O campo `user.role` (enum) fica preparado para futura expansão com papéis adicionais (`EDITOR`, `REVIEWER`, etc.), mas **não haverá matriz de permissões implementada** na primeira entrega.

Verificações de autorização ficam em `@PreAuthorize("hasRole('ADMIN')")` simples, sem ACL granular.

### Critérios de aceitação

- Apenas usuários autorizados devem acessar `/admin`.
- Senhas devem ser armazenadas com algoritmo seguro.
- Deve haver proteção contra acesso não autorizado à API administrativa.
- Sessão deve ser invalidável (logout efetivo).
- Topologia e configuração de cookie aderentes à Seção 6.6.

---

## RF15 — Integração com GitHub

O site deve permitir exibir repositórios selecionados do GitHub.

Funcionalidades:

- Cadastrar repositório manualmente.
- Opcionalmente consultar dados públicos da API do GitHub.
- Exibir linguagem principal, estrelas, descrição e link.
- Vincular repositório a projeto, artigo, vídeo ou laboratório.

### Critérios de aceitação

- A ausência da API do GitHub não deve quebrar o site.
- Deve haver fallback para dados cadastrados manualmente.

---

## RF16 — Integração com YouTube

O site deve permitir cadastrar vídeos do YouTube e, futuramente, sincronizar dados públicos.

Funcionalidades:

- Cadastrar URL do vídeo.
- Extrair ou informar manualmente o ID do vídeo.
- Exibir thumbnail.
- Incorporar vídeo em página dedicada.
- Informar duração, descrição e data.
- Vincular vídeo a artigo, série, projeto ou tag.

### Critérios de aceitação

- Vídeos devem ter página própria no site.
- O embed deve ser carregado de forma otimizada (lazy load, thumbnail).
- O conteúdo textual da página deve complementar o vídeo para SEO.

---

## RF17 — Busca

O site deve possuir busca por conteúdos e projetos.

**Implementação:** PostgreSQL Full-Text Search com `tsvector`, índice GIN e dicionário em português (`portuguese`). Ranking por `ts_rank`.

**Regra de atualização do `search_vector`:**

O `content.search_vector` é recalculado em camada de aplicação (Spring Service) sempre que:

- Conteúdo é criado ou atualizado.
- Tags ou tecnologias do conteúdo são alteradas.
- Tag ou tecnologia referenciada tem o nome alterado (cascata).

A montagem do `tsvector` é executada via **query nativa, função SQL armazenada ou repository específico**, para preservar os recursos do PostgreSQL FTS. O Spring Service orquestra; a construção em si é delegada à camada de banco.

**Normalização do MDX para indexação:**

Antes de compor o `search_vector`, o campo `body` em MDX deve ser **normalizado para texto pesquisável**: remoção de marcações JSX, nomes de componentes, atributos, frontmatter e qualquer trecho que não agregue valor à busca. Blocos de código podem ser incluídos ou omitidos conforme configuração, mas a decisão deve ser consistente em todo o sistema. A normalização é responsabilidade do Service que orquestra o recálculo, antes de delegar à query nativa.

**Tratamento de NULL obrigatório via `coalesce`:**

```sql
setweight(to_tsvector('portuguese', coalesce(title, '')), 'A')
|| setweight(to_tsvector('portuguese', coalesce(summary, '')), 'B')
|| setweight(to_tsvector('portuguese', coalesce(body, '')), 'C')
|| setweight(to_tsvector('portuguese', coalesce(tag_names, '')), 'B')
|| setweight(to_tsvector('portuguese', coalesce(technology_names, '')), 'B')
```

Mesma regra aplicada a `project.search_vector`.

**Migração futura para Meilisearch ou solução equivalente** deve ser avaliada com base em qualidade da busca: necessidade de tolerância a erros de digitação, sinônimos, autocomplete avançado, ranking customizado, ou degradação perceptível da experiência. Não há gatilho automático por volume.

### Critérios de aceitação

- A busca deve funcionar em desktop e mobile.
- Deve retornar resultados organizados por relevância.
- Deve permitir navegação para o item encontrado.
- Busca por nome de tag ou tecnologia deve retornar conteúdos relacionados.

---

## RF18 — Tags

O site deve possuir sistema de tags.

Exemplos de tags:

- React.
- Next.js.
- Spring Boot.
- Java.
- TypeScript.
- API REST.
- OAuth2.
- JWT.
- Keycloak.
- PostgreSQL.
- Docker.
- SEO.
- Acessibilidade.

**Proteção contra exclusão de tags em uso:**

Tags associadas a entidades publicadas (conteúdos, projetos ou experiências com `status = PUBLISHED`) **não podem ser excluídas fisicamente**. A operação `DELETE` deve ser bloqueada pelo backend com resposta informativa, exigindo desvinculação prévia da tag dos itens publicados. Esta regra preserva slugs e links públicos já indexados.

A mesma regra se aplica a tecnologias (ver RF04).

### Critérios de aceitação

- Cada tag deve ter página própria.
- A página da tag deve listar conteúdos, vídeos e projetos relacionados.
- Tags devem contribuir para navegação e SEO interno.
- Exclusão de tag em uso é bloqueada pelo backend.

---

## RF19 — Analytics

O site deve possuir analytics para acompanhar desempenho.

**Provider padrão:** **Plausible** (cloud ou auto-hospedado).

Métricas desejadas:

- Páginas mais acessadas.
- Conteúdos mais lidos.
- Vídeos mais acessados pelo site.
- Origem de tráfego.
- Termos de busca, quando disponível.
- Cliques em contato, GitHub e LinkedIn.

**Sobre banner de cookies:** na configuração padrão do Plausible (sem cookies, sem coleta de dados pessoais identificáveis), o uso de banner de consentimento não é necessário. A Política de Privacidade deve informar o uso de analytics anônimo. Caso a configuração do analytics seja alterada (ex.: ativação de scripts adicionais que coletem PII), a necessidade de consentimento deverá ser reavaliada.

**Google Analytics** fica fora do escopo inicial. Pode ser avaliado futuramente caso haja necessidade de integração com Google Ads, funis avançados ou comparação com outras propriedades. Decisão registrada em ADR-008.

### Critérios de aceitação

- Analytics deve respeitar privacidade.
- Deve evitar impacto relevante em performance.
- Deve ser documentado.

---

## RF20 — RSS Feed

O site deve disponibilizar feed RSS para conteúdos publicados.

**Implementação:** rota Next.js em `/rss.xml` (`app/rss.xml/route.ts`) que consome a API pública e gera o feed. **Não é endpoint do backend.** Essa é a abordagem mais idiomática no ecossistema Next.js e desacopla o backend do formato de feed.

### Critérios de aceitação

- O feed deve incluir título, resumo, URL e data de publicação.
- Deve funcionar para artigos, vídeos e conteúdos gerais.
- Acessível em `https://leonardosr.com.br/rss.xml`.

---

## RF21 — Conformidade LGPD

O site deve estar em conformidade com a Lei Geral de Proteção de Dados.

Requisitos:

- **Página de Política de Privacidade** acessível em `/privacidade`, descrevendo dados coletados, finalidades, bases legais, retenção, compartilhamento e direitos do titular. Deve informar uso de analytics anônimo (Plausible).
- **Página de Termos de Uso** acessível em `/termos`.
- **Aviso de cookies** dispensável na configuração padrão (Plausible cookie-less). Caso provider seja trocado ou scripts adicionais que coletem PII sejam ativados, banner deverá ser implementado.
- **Base legal** registrada para o formulário de contato (consentimento + legítimo interesse).
- **Política de retenção** de mensagens de contato: 12 meses, com **anonimização automática** após esse período (ver RF12 e Seção 12.7).
- **Canal para solicitação** de acesso, correção ou exclusão de dados pessoais — por formulário ou e-mail no alias `site_profile.privacy_email_alias` (ex.: `privacidade@leonardosr.com.br`). Endpoint específico poderá ser implementado se houver demanda real.

### Critérios de aceitação

- Páginas de Privacidade e Termos publicadas e linkadas no footer.
- Política de retenção implementada como rotina automática no backend (job de anonimização).
- Canal de solicitação documentado e funcional.
- Aliases de e-mail expostos no lugar do e-mail pessoal.

---

## RF22 — Camada de storage abstrata

O backend deve implementar uma camada de storage compatível com S3, abstraída atrás de uma interface (padrão Ports & Adapters).

**Requisitos gerais:**

- **Interface de domínio** (ex.: `MediaStorageService`) com operações de upload, geração de URL pré-assinada, exclusão e leitura de metadados.
- **Provider inicial recomendado:** Cloudflare R2.
- **Adapter para ambiente local:** MinIO em Docker Compose ou filesystem local.
- A aplicação não deve depender diretamente de detalhes do provider fora da camada de infraestrutura.

**Fluxo completo de upload:**

```
1. Admin solicita upload:
   POST /api/admin/media-assets/upload-url
   body: { filename, mime_type, size_bytes }

2. Backend cria registro media_asset com status=PENDING e retorna:
   {
     mediaAssetId,
     uploadUrl,           (URL pré-assinada para PUT direto ao R2/MinIO)
     storageKey,
     expiresAt
   }

3. Frontend faz PUT direto no uploadUrl com o arquivo binário.

4. Frontend confirma upload:
   POST /api/admin/media-assets/{mediaAssetId}/confirm
   body: { width?, height? }

5. Backend valida:
   - Arquivo existe no storage (HEAD na storageKey).
   - Tamanho corresponde ao informado.
   - Marca media_asset.status = ACTIVE.
   - Popula public_url a partir de seo_setting.media_cdn_base_url + storage_key.
   - Tenta gerar blur_data_url quando viável (regras abaixo).
   - Tenta calcular checksum quando viável (regras abaixo).

6. Job de limpeza diário:
   - Remove media_asset PENDING com mais de 24h.
   - Remove arquivos órfãos no storage.

7. Exclusão de mídia:
   - Admin solicita exclusão.
   - Backend verifica se há referência ativa em conteúdo PUBLISHED ou
     entidade não arquivada (cover_image_id, diagram_media_id, etc.).
   - Se houver referência ativa, exclusão é bloqueada com mensagem ao admin.
   - Se não houver, status passa para DELETED e o objeto físico é removido
     do storage (delete real, não apenas marca lógica).
```

**Regras de flexibilidade:**

- **`blur_data_url`:** gerado quando tecnicamente viável para imagens suportadas (formatos rasterizados comuns). Caso a geração falhe (formato não suportado, biblioteca indisponível), o asset permanece válido sem placeholder blur — campo fica `NULL`.
- **`checksum`:** calculado e validado quando o provider de storage o expõe de forma compatível (ETag em S3-compatible, por exemplo). Em multipart upload, validação pode ser pulada com log de aviso. Em qualquer caso, ausência de checksum não bloqueia a confirmação.

**Tipos de mídia permitidos e limites:**

Tipos inicialmente permitidos no upload via admin:

- `image/jpeg`
- `image/png`
- `image/webp`
- `application/pdf`

**SVG fica fora da versão inicial**, salvo ADR específica, por risco de scripts embutidos e necessidade de sanitização própria (com biblioteca como `svg-sanitizer` ou equivalente). Demais formatos (GIF, TIFF, BMP, vídeo, áudio) também ficam fora da v1.

Limites de tamanho (configuráveis via env, com defaults):

- Imagens de capa (`content.cover_image_id`, `project.cover_image_id`, `series.cover_image_id`, `seo_setting.default_og_image_id`): até **5 MB**.
- Imagens internas em conteúdo MDX e diagramas de arquitetura (`ArchitectureFieldsDTO.diagram_media_id`): até **10 MB**.
- PDF de currículo (`site_profile.curriculum_media_id`): até **10 MB**.

Validação de tipo e tamanho ocorre em três pontos:

1. **No `upload-url`**: backend rejeita `mime_type` fora da allowlist e `size_bytes` acima do limite antes de gerar URL pré-assinada.
2. **Na URL pré-assinada**: configurada com `Content-Type` e `Content-Length` esperados, para que o storage rejeite uploads divergentes.
3. **No `confirm`**: backend valida via HEAD que o objeto carregado bate com o tipo e tamanho declarados.

### Critérios de aceitação

- Trocar provider deve exigir apenas implementação de novo adapter, sem alterar código de domínio.
- Configuração de provider via variáveis de ambiente.
- Fluxo PENDING → ACTIVE → DELETED implementado corretamente.
- Bloqueio de exclusão com referência ativa funcionando.
- MIME types e limites de tamanho validados nas três camadas.
- Decisão registrada em ADR-007.

---

## RF23 — Camada de e-mail abstrata

O backend deve encapsular envio de e-mail em uma interface de serviço, permitindo troca de provider sem alterar código de domínio.

Requisitos:

- **Interface de domínio** (ex.: `EmailService`) com operação de envio parametrizada por template e destinatário.
- **Provider inicial recomendado:** Resend (envio).
- **Motor de template padrão:** **Thymeleaf**, integrado nativamente ao Spring Boot. Templates ficam em `src/main/resources/templates/email/` versionados no repositório.
- **FreeMarker** poderá ser usado como alternativa, mas apenas mediante justificativa registrada em ADR.
- **React Email** fica fora do escopo inicial. Caso seja desejado no futuro como vitrine, será adotado com etapa Node de pré-renderização documentada em ADR — não como integração direta com Spring Boot.
- **Tipos de e-mail iniciais:**
  - Notificação ao admin sobre nova mensagem de contato.
  - Confirmação ao remetente (futuro).

### Critérios de aceitação

- Trocar provider de envio deve exigir apenas implementação de novo adapter (SES, SMTP, etc.).
- Templates revisáveis em pull request (Thymeleaf no repositório).
- Configuração de provider via variáveis de ambiente.

---

## 9. Requisitos não funcionais

## RNF01 — Performance

O site deve atingir as seguintes metas no p75:

- **LCP** < 2,5s.
- **INP** < 200ms.
- **CLS** < 0,1.
- **TTFB** < 600ms para páginas dinâmicas.
- **Lighthouse score** ≥ 95 em Performance, Accessibility, Best Practices e SEO **nas páginas públicas principais sem embeds externos pesados**. Páginas com embed de vídeo (YouTube) devem usar lazy loading e thumbnail; nelas a meta de Performance pode ser ≥ 90, com motivo registrado em ADR.
- **Lighthouse CI** configurado no pipeline com budgets de Performance, Acessibilidade, Best Practices e SEO, atuando como proteção contra regressões em **métricas de laboratório**.
- **Core Web Vitals reais (de campo)** são acompanhados via Google Search Console e CrUX após o deploy (Marco 8), **quando houver volume de tráfego suficiente para gerar dados confiáveis** (sites de baixo tráfego podem não aparecer no CrUX). Na ausência de dados de campo, Lighthouse CI e PageSpeed Insights são as referências.

Práticas obrigatórias:

- Imagens otimizadas (formatos modernos, lazy loading, dimensões definidas, `blur_data_url` em capas quando viável).
- Listagens de vídeos não carregam múltiplos iframes.
- Código JavaScript reduzido ao necessário; preferência por Server Components.
- Fontes locais via `next/font/local`.

## RNF02 — SEO

SEO é requisito estrutural, não tarefa final.

O projeto deve implementar:

- Metadados únicos por página.
- Títulos e descrições otimizados.
- URLs amigáveis.
- Slugs estáveis.
- Canonical URLs.
- Open Graph (incluindo OG image dinâmico — RF06).
- Twitter/X Cards.
- Sitemap dinâmico.
- Robots.txt.
- Dados estruturados JSON-LD.
- Breadcrumbs.
- Hierarquia correta de headings.
- Conteúdo textual complementar em páginas de vídeo.
- Páginas dedicadas para cada vídeo, lab e arquitetura.
- Imagens com texto alternativo (campo `alt_text` em `media_asset`).
- Estratégia de links internos.
- Páginas de tags indexáveis quando fizer sentido.
- Controle de indexação de páginas administrativas e rascunhos.
- Verificação no Google Search Console e Bing Webmaster Tools (preparação no Marco 5, ativação no Marco 8).
- Configurações alimentadas pela entidade `seo_setting`.

## RNF03 — Acessibilidade

- Navegação por teclado.
- Foco visível.
- Contraste adequado.
- HTML semântico.
- Labels em formulários.
- Textos alternativos em imagens (campo `alt_text` obrigatório em uploads via admin).
- Estados de erro acessíveis.
- Componentes compatíveis com leitores de tela.

## RNF04 — Segurança

- Área administrativa protegida por cookie de sessão (RF14, Seção 6.6).
- Validação no frontend e backend.
- Validação de segurança do MDX em duas camadas (RF06.6): backend com allowlist de componentes, imports proibidos e bloqueio de HTML bruto; frontend com compilação e renderização real do MDX. **OWASP Java HTML Sanitizer** e **DOMPurify** ficam previstos como dependências preventivas, sem exercício na v1 (HTML bruto proibido). Sua ativação efetiva fica condicionada a ADR específica caso HTML bruto venha a ser habilitado no futuro.
- Proteção contra XSS.
- Proteção contra CSRF nas rotas administrativas com token explícito.
- CORS configurado conforme Seção 6.6.
- Secrets fora do repositório.
- Senhas com hash seguro (BCrypt ou Argon2).
- Rate limit no formulário de contato.

## RNF05 — Manutenibilidade

- Código organizado por domínio.
- Componentes reutilizáveis.
- Separação clara entre frontend público, frontend administrativo e backend.
- Documentação de setup.
- Scripts de desenvolvimento padronizados.
- Tipagem forte com TypeScript.
- Tipos do frontend gerados a partir do contrato OpenAPI.
- DTOs no backend, incluindo DTOs específicos para `type_specific_fields` por tipo de conteúdo.
- Migrations versionadas com Flyway.
- ADRs para decisões arquiteturais (Seção 6.5).

**Disciplina de repositório (obrigatório):**

- **Husky + lint-staged** com ESLint, Prettier e `tsc --noEmit` no frontend.
- **Spotless** ou formatter equivalente no backend Java.
- **Commitlint** com Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, etc.).

**Disciplina de repositório (opcional / etapa posterior):**

- Release Please ou changelog automático.
- Checkstyle muito rígido.

### Análise estática com Sonar

O projeto deverá prever integração com **SonarQube Cloud** (provider preferencial) ou **SonarQube Server** (alternativa) para análise contínua de qualidade, segurança e manutenibilidade do código. A escolha entre as duas opções fica registrada em **ADR-013**.

**Cobertura da análise**, quando aplicável:

- Backend Java/Spring Boot.
- Frontend TypeScript/Next.js.
- Bugs.
- Vulnerabilidades.
- Security hotspots.
- Code smells.
- Duplicação de código.
- Cobertura de testes (consumindo relatórios JaCoCo no backend e lcov no frontend, gerados pelo pipeline antes do scan).
- Dívida técnica.
- Quality Gate.

**Política de Quality Gate em duas fases:**

Na configuração inicial, o Quality Gate é **informativo** — serve como instrumento de aprendizado, inspeção e acompanhamento da qualidade, sem bloquear merges nem deploys. Após estabilização dos testes automatizados, da cobertura mínima e do pipeline de CI/CD, o Quality Gate poderá passar a **bloquear merges na branch principal**. A transição é registrada em ADR de evolução.

**Sobre custo e licenciamento:**

SonarQube Cloud será priorizado pela simplicidade operacional e, conforme política comercial vigente, tende a ser a opção mais adequada para repositórios públicos (cenário esperado para vitrine técnica do projeto). Caso o repositório seja privado ou haja restrição de custo, **SonarQube Server self-hosted** (containerizado via Docker) permanece como alternativa válida — com trade-off de operação adicional e ganho de aprendizado em DevOps.

**Relação com outras ferramentas:**

A inclusão do Sonar **não substitui** ESLint, Prettier, Spotless, testes automatizados, Sentry, revisão manual ou boas práticas de arquitetura. Sonar atua como **camada complementar de inspeção contínua**, especialmente útil para detectar duplicação de código, complexidade ciclomática, security hotspots e dívida técnica acumulada — dimensões que linters tradicionais cobrem parcialmente ou não cobrem.

## RNF06 — Observabilidade

- Logs estruturados no backend.
- Health check da API via Actuator.
- Métricas mínimas de disponibilidade.

**Plano de backup detalhado:**

- **Frequência:** dump diário do PostgreSQL via cron.
- **Destino:** Cloudflare R2 ou Backblaze B2.
- **Retenção rolling:** 7 backups diários + 4 semanais + 3 mensais.
- **Criptografia:** **obrigatória** se o dump contiver dados pessoais sensíveis (mensagens de contato com nome, e-mail, IP). **Recomendada** caso contrário. Documentar geração, armazenamento e rotação da chave.
- **Teste de restore:** procedimento documentado e executado trimestralmente. Registrar data e resultado em log de operação.

## RNF07 — Responsividade

- O site deve funcionar bem em mobile, tablet e desktop.
- O layout deve priorizar leitura confortável em telas pequenas.

## RNF08 — Compatibilidade

- Compatível com navegadores modernos.
- Sem dependência de recursos experimentais não suportados amplamente.

## RNF09 — Monitoramento de erros

- **Provider:** Sentry (free tier).
- **Frontend:** integração com Next.js, source maps publicados no Sentry, release tracking via CI/CD.
- **Backend:** integração com Spring Boot via SDK oficial.
- **Alertas** configurados para erros críticos.
- Implementação no Marco 7 (pré-publicação).

## RNF10 — Estratégia de cache e revalidação

Matriz de cache por tipo de página, com tempos **configuráveis externamente** (variáveis de ambiente ou tabela do admin):

| Tipo de página                          | Estratégia | Padrão                                                  |
| --------------------------------------- | ---------- | ------------------------------------------------------- |
| Estáticas (Sobre, Stack, Currículo)     | SSG        | Revalidação on-demand via webhook do admin              |
| Listagens (Conteúdos, Projetos)         | ISR        | `revalidate: 3600` (1h)                                 |
| Detalhe de artigo/vídeo/lab/arquitetura | ISR        | `revalidate: 86400` (24h) + on-demand no publish/update |
| Sitemap                                 | ISR        | `revalidate: 3600`                                      |
| RSS (`/rss.xml`)                        | ISR        | `revalidate: 3600`                                      |

**Cabeçalhos** `Cache-Control` apropriados na API pública (`s-maxage`, `stale-while-revalidate`).

Os valores padrão são pontos de partida; ajustes ficam por configuração sem deploy.

---

## 10. Estratégia de SEO desde o início

## 10.1 Princípios

- Cada página deve ter uma intenção de busca clara.
- Cada conteúdo deve responder uma pergunta ou necessidade real.
- Vídeos não devem depender apenas do YouTube; cada vídeo deve ter uma página própria no site.
- Artigos e vídeos devem se complementar.
- Tags e séries devem fortalecer links internos.
- Conteúdo técnico deve ser escrito de forma clara, com exemplos, código e contexto.

## 10.2 SEO técnico

Implementar no Next.js:

- `metadata` global alimentado por `seo_setting`.
- `generateMetadata` para rotas dinâmicas.
- `sitemap.ts` dinâmico.
- `robots.ts` (alimentado por `seo_setting.robots_policy`).
- `opengraph-image.tsx` (geração dinâmica por conteúdo, com fallback estático).
- `twitter-image` quando aplicável.
- `manifest`.
- Canonical URLs.
- JSON-LD por tipo de página.
- `app/rss.xml/route.ts` para RSS.

## 10.3 Dados estruturados sugeridos

Usar JSON-LD para:

- `Person` na página Sobre ou Home (alimentado por `site_profile`).
- `WebSite` na Home.
- `Article` em artigos.
- `VideoObject` em vídeos.
- `BreadcrumbList` em páginas internas.
- `CollectionPage` em listagens.
- `CreativeWorkSeries` para séries.
- `SoftwareSourceCode` ou `TechArticle` para conteúdos técnicos, quando aplicável.

## 10.4 SEO editorial

Cada conteúdo deve conter:

- Título claro.
- Resumo objetivo.
- Headings organizados.
- Introdução que responda rapidamente ao tema.
- Exemplos práticos.
- Links internos.
- Links para projetos relacionados.
- Links para repositório, quando houver.
- Conclusão.
- Metadescrição editável.

## 10.5 SEO para vídeos

Cada vídeo deve ter página dedicada com:

- Título otimizado.
- Resumo textual.
- Embed do YouTube com lazy loading.
- Transcrição ou resumo expandido, quando possível.
- Links citados.
- Repositório ou material complementar.
- Conteúdos relacionados.
- Dados estruturados `VideoObject`.
- Thumbnail estável.

## 10.6 Monitoramento de indexação

**Marco 5 (preparação):**

- Criar contas no Google Search Console e Bing Webmaster Tools.
- Gerar tokens de verificação e armazenar em `seo_setting.google_verification` e `seo_setting.bing_verification`.
- Implementar metadados de verificação no frontend (alimentados por `seo_setting`).
- Configurar Lighthouse CI no pipeline.

**Marco 8 (ativação, pós-deploy):**

- Verificar domínio no Google Search Console.
- Verificar domínio no Bing Webmaster.
- Submeter `sitemap.xml` em ambos.
- Configurar alertas para erros de indexação e regressões de Core Web Vitals.
- Auditoria pós-deploy (PageSpeed Insights, Rich Results Test, validação de schema).

## 10.7 Estratégia de palavras-chave inicial

Temas prioritários:

- React.
- Next.js.
- Spring Boot.
- Java.
- TypeScript.
- API REST.
- Spring Security.
- OAuth2.
- JWT.
- Keycloak.
- PostgreSQL.
- Docker.
- Portais corporativos.
- Desenvolvimento web moderno.
- Arquitetura de aplicações web.
- SEO com Next.js.

Exemplos de conteúdos iniciais:

- React puro ou Next.js: quando usar cada um?
- Como criar uma API REST com Spring Boot.
- Como estruturar um projeto Next.js moderno.
- Autenticação com JWT e Spring Security.
- OAuth2 e OpenID Connect explicados de forma simples.
- Como organizar projetos React para aplicações corporativas.
- Next.js, SEO e performance para sites profissionais.
- Criando uma arquitetura com Next.js, Spring Boot e PostgreSQL.

---

## 11. Design e experiência do usuário

## 11.1 Direção visual

- Minimalista.
- Moderno.
- Profissional.
- Elegante.
- Com bastante espaço em branco.
- Tipografia forte e legível.
- Cards discretos.
- Animações suaves e não invasivas.

## 11.2 Cores sugeridas

Opção principal:

- Fundo: branco ou cinza muito claro.
- Texto: grafite ou quase preto.
- Destaque: azul, verde ou roxo discreto.
- Bordas: cinza claro.

## 11.3 Tipografia

- **Fontes locais** carregadas via `next/font/local` com `font-display: swap`.
- Padrão: **uma família principal** com variações de peso (regular, medium, semibold, bold).
- Segunda fonte para títulos só com ganho visual claro registrado em ADR.
- Preload das fontes do above-the-fold.

## 11.4 Componentes principais

- Header fixo ou semi-fixo.
- Menu responsivo.
- Hero section.
- Cards de projeto.
- Cards de conteúdo.
- Cards de vídeo.
- Badges de tecnologia.
- Filtros.
- Busca.
- Breadcrumbs.
- Botões de ação.
- Footer completo (com links para Privacidade e Termos, e aliases de e-mail).
- Tema claro/escuro com persistência em cookie.
- Componentes editoriais MDX (RF06).

## 11.5 Design system documentado

- Todos os componentes do design system documentados em **Storybook**.
- Storybook publicado em subdomínio próprio: `storybook.leonardosr.com.br`.
- Componentes editoriais MDX (RF06) também documentados no Storybook.
- Deploy estático do Storybook via Vercel ou Cloudflare Pages.

---

## 12. Modelo de dados

## 12.1 Content

```text
id
slug
title
summary
body                  (MDX)
type                  (ARTICLE | VIDEO | ARTICLE_WITH_VIDEO | TUTORIAL |
                       CASE_STUDY | TECH_NOTE | LAB | ARCHITECTURE)
type_specific_fields  (JSONB nullable; validado por DTO conforme type — ver 12.13)
status                (DRAFT | PUBLISHED | ARCHIVED)
scheduled_at          (planejamento; execução automática em etapa posterior)
cover_image_id        (FK media_asset)
youtube_url
youtube_video_id
video_duration
reading_time
published_at
created_at
updated_at
seo_title
seo_description
canonical_url
featured
project_id
search_vector         (tsvector para PostgreSQL FTS)
```

**Nota:** `series_id` foi removido. Relação com séries via tabela `series_content` (ver 12.11).

## 12.2 Project

```text
id
slug
name
summary
description
problem
solution
architecture
results
repository_url
demo_url
cover_image_id        (FK media_asset)
status                (DRAFT | PUBLISHED | ARCHIVED)
featured
created_at
updated_at
seo_title
seo_description
search_vector
```

## 12.3 Tag

```text
id
name
slug
description
created_at
updated_at
```

## 12.4 Series

```text
id
slug
title
description
cover_image_id        (FK media_asset)
status                (DRAFT | PUBLISHED | ARCHIVED)
created_at
updated_at
seo_title
seo_description
```

## 12.5 Technology

```text
id
name
slug
category
description
level
created_at
updated_at
```

## 12.6 Experience

```text
id
role
organization
start_date
end_date
current
summary
description
status                (DRAFT | PUBLISHED | ARCHIVED)
sort_order
created_at
updated_at
```

## 12.7 ContactMessage

```text
id
name                   (nullable após anonimização)
email                  (nullable após anonimização)
subject
message
status
ip_anonymized          (nullable após anonimização)
created_at
read_at
anonymized_at          (registra quando virou anônima; NULL enquanto ativa)
```

**Política de retenção:** após 12 meses, mensagens são anonimizadas via job agendado. SQL de referência:

```sql
UPDATE contact_message
SET name = NULL,
    email = NULL,
    subject = '[anonimizado]',
    message = '[anonimizado após período de retenção]',
    ip_anonymized = NULL,
    anonymized_at = NOW()
WHERE created_at < NOW() - INTERVAL '12 months'
  AND anonymized_at IS NULL;
```

O job registra apenas log operacional (data, quantidade de registros anonimizados); não armazena os dados removidos.

## 12.8 User

```text
id
name
email
password_hash
role                   (enum; na versão inicial apenas ADMIN)
active
created_at
updated_at
```

**Política de papéis na versão inicial:** apenas `ADMIN`. Campo `role` preparado para expansão futura, sem matriz de permissões implementada.

## 12.9 MediaAsset

```text
id
storage_key            (chave no provider; fonte de verdade)
public_url             (cache regenerável a partir de storage_key + seo_setting.media_cdn_base_url)
status                 (PENDING | ACTIVE | DELETED)
original_filename
mime_type
size_bytes
width
height
blur_data_url          (placeholder para next/image; gerado quando viável, NULL caso contrário)
checksum               (SHA-256 quando provider expõe de forma compatível; NULL caso contrário)
alt_text
created_by             (FK user)
created_at
updated_at
deleted_at             (registra quando passou para DELETED; objeto físico removido neste momento)
```

**Regras de `public_url`:**

- `storage_key` é a fonte de verdade para localizar o objeto.
- `public_url` é cache do path público regenerável a partir de `storage_key` + `seo_setting.media_cdn_base_url`.
- `public_url` é recalculado e atualizado quando `storage_key` muda ou quando `seo_setting.media_cdn_base_url` muda (último caso requer job de atualização em massa).
- Código de domínio jamais usa `public_url` como identificador.

## 12.10 AuditLog

```text
id
user_id
action
entity_type
entity_id
changes               (JSONB)
created_at
```

## 12.11 Tabelas de relacionamento N:N

```text
content_tag           (content_id, tag_id, PRIMARY KEY (content_id, tag_id))
content_technology    (content_id, technology_id, PRIMARY KEY (content_id, technology_id))
project_technology    (project_id, technology_id, PRIMARY KEY (project_id, technology_id))
experience_technology (experience_id, technology_id, PRIMARY KEY (experience_id, technology_id))
content_related       (content_id, related_content_id, sort_order,
                       PRIMARY KEY (content_id, related_content_id))

series_content        (series_id, content_id, sort_order, created_at, updated_at,
                       PRIMARY KEY (series_id, content_id),
                       UNIQUE (series_id, sort_order))
```

A tabela `series_content` permite que um conteúdo pertença a múltiplas séries e que cada série defina sua própria ordem. A constraint `UNIQUE (series_id, sort_order)` garante ordem consistente por série.

## 12.12 Enum de status

Enum único para entidades publicáveis: `DRAFT`, `PUBLISHED`, `ARCHIVED`.

Aplicado a `content`, `project`, `series`, `experience`.

Campo `scheduled_at` (timestamp opcional) incluído nas entidades publicáveis para planejamento editorial. Execução automática (job que muda `DRAFT` → `PUBLISHED`) fica como evolução posterior; inicialmente o campo serve apenas para visualização no admin.

## 12.13 DTOs de `type_specific_fields`

O JSONB de `content.type_specific_fields` é validado por DTOs específicos do tipo. **Não é campo livre.**

### LabFieldsDTO (para `type = LAB`)

```text
demonstration_url       (URL pública da demonstração)
source_code_url         (link para repositório ou snippet)
is_didactic             (boolean: didático ou produção)
difficulty_level        (BEGINNER | INTERMEDIATE | ADVANCED)
```

### ArchitectureFieldsDTO (para `type = ARCHITECTURE`)

```text
diagram_media_id        (FK media_asset)
components              (lista de objetos: { name, role })
flow                    (texto descritivo)
advantages              (lista de strings)
risks                   (lista de strings)
when_to_use             (texto descritivo)
```

Tipos sem campos extras (`ARTICLE`, `VIDEO`, `TUTORIAL`, etc.) deixam `type_specific_fields` como `NULL`.

A validação acontece no save (`@Valid` em campo polimórfico via Jackson com discriminador `type`) e na deserialização. Cada DTO tem schema documentado neste PRD e validação no backend.

## 12.14 SiteProfile

Singleton (registro único, garantido via constraint ou validação no service).

```text
id
display_name             (ex.: "Leonardo Silva Ribeiro" — nome exibido publicamente)
professional_title       (ex.: "Analista de TI · React · Next.js · Spring Boot")
headline                 (frase de posicionamento da home)
short_bio                (resumo da home)
full_bio                 (corpo da página Sobre)
location_label           (ex.: "Brasília/DF, Brasil")
linkedin_url
github_url
twitter_url
youtube_url              (canal do YouTube)
contact_email_alias      (ex.: contato@leonardosr.com.br)
privacy_email_alias      (ex.: privacidade@leonardosr.com.br)
curriculum_media_id      (FK media_asset)
updated_at
```

## 12.15 SeoSetting

Singleton.

```text
id
default_title
default_description
default_og_image_id      (FK media_asset)
default_locale           (ex.: "pt_BR")
default_author_name      (ex.: "Leonardo Silva Ribeiro")
site_url                 (canonical base, ex.: "https://leonardosr.com.br")
media_cdn_base_url       (base do CDN para mídia, alimenta media_asset.public_url)
twitter_handle
robots_policy            (allow | disallow_admin | custom)
google_verification      (token para Search Console, gerado em M5)
bing_verification        (token para Bing Webmaster, gerado em M5)
updated_at
```

Esses dados alimentam o `metadata` global do Next.js, geração de OG fallback, sitemap base, JSON-LD (`default_locale`, `default_author_name`) e verificação de Search Console/Bing.

---

## 13. API sugerida

## 13.1 Endpoints públicos

```text
GET  /api/public/profile
GET  /api/public/experiences
GET  /api/public/technologies
GET  /api/public/projects
GET  /api/public/projects/{slug}
GET  /api/public/contents
GET  /api/public/contents?type=LAB
GET  /api/public/contents?type=ARCHITECTURE
GET  /api/public/contents/{slug}
GET  /api/public/tags
GET  /api/public/tags/{slug}
GET  /api/public/series
GET  /api/public/series/{slug}
GET  /api/public/search?q=...
POST /api/public/contact
```

**Nota sobre RSS:** o feed RSS é gerado pelo frontend Next.js em `/rss.xml`, consumindo os endpoints públicos. Não há endpoint backend dedicado a RSS.

## 13.2 Endpoints administrativos

```text
POST   /api/admin/auth/login
POST   /api/admin/auth/logout
GET    /api/admin/auth/csrf

GET    /api/admin/contents
POST   /api/admin/contents
PUT    /api/admin/contents/{id}
DELETE /api/admin/contents/{id}
POST   /api/admin/contents/{id}/publish
POST   /api/admin/contents/{id}/archive
POST   /api/admin/contents/{id}/preview-validate    (backend valida regras de domínio, allowlist, imports, segurança textual; compilação real do MDX é validada pelo frontend Next.js — habilita publish apenas quando ambas validações estiverem OK)

GET    /api/admin/projects
POST   /api/admin/projects
PUT    /api/admin/projects/{id}
DELETE /api/admin/projects/{id}

GET    /api/admin/tags
POST   /api/admin/tags
PUT    /api/admin/tags/{id}
DELETE /api/admin/tags/{id}

GET    /api/admin/series
POST   /api/admin/series
PUT    /api/admin/series/{id}
DELETE /api/admin/series/{id}
PUT    /api/admin/series/{id}/contents              (ajusta lista e sort_order de series_content)

GET    /api/admin/technologies
POST   /api/admin/technologies
PUT    /api/admin/technologies/{id}
DELETE /api/admin/technologies/{id}

GET    /api/admin/experiences
POST   /api/admin/experiences
PUT    /api/admin/experiences/{id}
DELETE /api/admin/experiences/{id}

GET    /api/admin/media-assets
POST   /api/admin/media-assets/upload-url           (gera URL pré-assinada; cria registro PENDING)
POST   /api/admin/media-assets/{id}/confirm         (confirma upload; transição para ACTIVE)
PUT    /api/admin/media-assets/{id}                 (atualiza alt_text e metadados)
DELETE /api/admin/media-assets/{id}                 (bloqueia se houver referência ativa)

GET    /api/admin/contact-messages
PUT    /api/admin/contact-messages/{id}/read
POST   /api/admin/contact-messages/{id}/anonymize    (anonimização manual antes dos 12 meses; típico em solicitação LGPD do titular)

GET    /api/admin/profile
PUT    /api/admin/profile

GET    /api/admin/settings/seo
PUT    /api/admin/settings/seo
```

**Nota:** todos os endpoints (públicos e administrativos) devem ter contrato OpenAPI atualizado. O contrato faz parte do Definition of Done (Seção 18). Tipos TypeScript do frontend são gerados a partir desse contrato.

---

## 14. Requisitos de conteúdo inicial

Criar conteúdo inicial para evitar site vazio.

## 14.1 Projetos iniciais

1. `leonardosr.com.br` — site pessoal com Next.js e Spring Boot.
2. API de conteúdos com Spring Boot.
3. Dashboard administrativo em React/Next.js.
4. Arquitetura Next.js + Spring Boot + PostgreSQL.
5. Estudo de caso sobre portal institucional ou solução corporativa.

## 14.2 Artigos iniciais

1. React puro ou Next.js: quando usar cada um?
2. Criando uma API REST com Spring Boot.
3. Como estruturar uma aplicação Next.js moderna.
4. Autenticação com JWT e Spring Security.
5. Arquitetura com Next.js, Spring Boot e PostgreSQL.

## 14.3 Vídeos planejados

1. Apresentação do site e da proposta do canal.
2. Criando uma API REST com Spring Boot.
3. Criando uma interface com React e Next.js.
4. Integrando frontend Next.js com backend Spring Boot.
5. Publicando aplicação com Docker.

## 14.4 Séries iniciais

1. Spring Boot na prática.
2. React e Next.js para aplicações modernas.
3. Arquitetura de aplicações web.

## 14.5 Plano editorial

- **Cadência:** 2 conteúdos por mês, podendo ser artigo, vídeo ou artigo com vídeo. Revisada trimestralmente.
- **Workflow:**
  1. Ideia (registrada em `IDEAS.md`).
  2. Outline.
  3. Draft.
  4. Revisão própria com 24h de "descanso".
  5. Publicação.
  6. Divulgação no LinkedIn e X.
- **Calendário trimestral** com temas amarrados às séries iniciais.
- **Backlog de ideias** mantido em `IDEAS.md` no repositório.

## 14.6 Política de seed inicial

Seeds iniciais (Marco 2) devem incluir, no mínimo:

- **Usuário admin inicial**, criado via variável de ambiente (`ADMIN_INITIAL_EMAIL`, `ADMIN_INITIAL_PASSWORD_HASH`) ou script seguro de bootstrap. **Nunca em SQL versionado em texto puro.**
- **`site_profile`** inicial com placeholders dos campos obrigatórios (preenchidos depois via admin).
- **`seo_setting`** inicial com `default_locale=pt_BR`, `default_author_name`, `site_url` e `media_cdn_base_url` configuráveis via env.
- **Tags principais** (lista de ~15 tags da Seção RF18: React, Next.js, Spring Boot, Java, TypeScript, etc.).
- **Tecnologias principais** organizadas pelas categorias de RF04 (Frontend, Backend, Banco, Segurança, DevOps, Portais, Qualidade).
- **3 a 5 projetos demonstrativos** em status `PUBLISHED` ou `DRAFT` (definidos na Seção 14.1).
- **2 a 3 conteúdos demonstrativos** em status `PUBLISHED` ou `DRAFT` (da Seção 14.2).
- **1 série inicial** com pelo menos 1 conteúdo associado via `series_content`.

---

## 15. Marcos do projeto

## Marco 1 — Fundação técnica e design system

**Objetivo:** Criar base do projeto, identidade visual, componentes principais e ambiente de desenvolvimento.

Entregas:

- Repositório criado.
- Estrutura frontend Next.js com TypeScript estrito.
- Estrutura backend Spring Boot.
- Docker Compose local (frontend, backend, Postgres, MinIO).
- PostgreSQL local.
- **Storybook** configurado.
- **Pre-commit hooks** (Husky + lint-staged) com ESLint, Prettier, `tsc`, Spotless.
- **Commitlint** com Conventional Commits.
- **Fontes locais** via `next/font/local`.
- **Shiki** configurado com pré-compilação em build time.
- Design system inicial.
- Layout base.
- Header, footer, botões, cards e badges.
- Tema claro e escuro com persistência em cookie.
- Configuração inicial de SEO global.
- ADRs iniciais: ADR-001, ADR-002, ADR-003, ADR-012 (topologia).

Critério de conclusão:

- Aplicação frontend e backend executando localmente.
- Layout base navegável.
- Storybook executando localmente.
- Primeiros componentes documentados no Storybook.
- 4 ADRs iniciais publicados.

---

## Marco 2 — Modelo de dados, API pública e integrações arquiteturais

**Objetivo:** Implementar entidades principais, migrations, endpoints públicos e camadas de abstração.

Entregas:

- Entidades JPA: `content` (com `type_specific_fields` JSONB), `project`, `tag`, `series`, `technology`, `experience`, `contact_message`, `media_asset`, `user`, `audit_log`, `site_profile`, `seo_setting`.
- DTOs específicos: `LabFieldsDTO`, `ArchitectureFieldsDTO` com validação Jackson + `@Valid`.
- Tabelas N:N incluindo `series_content` com `sort_order`.
- Enum de status padronizado (`DRAFT` / `PUBLISHED` / `ARCHIVED`) e campo `scheduled_at`.
- Migrations Flyway.
- Repositories.
- Services.
- DTOs de API.
- Endpoints públicos.
- Configuração de **PostgreSQL Full-Text Search** com `coalesce` e SQL nativo.
- **Camada de storage abstrata** com adapter R2 e adapter MinIO local; fluxo PENDING → ACTIVE → DELETED.
- **Camada de e-mail abstrata** com adapter Resend e templates Thymeleaf em `src/main/resources/templates/email/`.
- **Política de seed inicial** implementada (Seção 14.6).
- **Política de papel `ADMIN` único** aplicada ao Spring Security.
- OpenAPI gerado e revisado.
- **Geração de tipos TypeScript** a partir do OpenAPI configurada no pipeline.
- ADRs: ADR-004 (com tipos LAB/ARCHITECTURE e DTOs), ADR-007 (com fluxo de upload), ADR-009 (com regras do tsvector), ADR-011 (banco como fonte de verdade).

Critério de conclusão:

- API pública retornando perfil, projetos, conteúdos (incluindo LAB e ARCHITECTURE como filtros), tags, séries, tecnologias e experiências.
- Banco versionado com migrations.
- Busca FTS funcional via endpoint, incluindo busca por tag.
- Upload de mídia funcionando localmente (MinIO) e em produção (R2) via fluxo confirmado.
- Tipos TS atualizados automaticamente a partir do OpenAPI.
- Seed inicial aplicado em ambiente de desenvolvimento.

---

## Marco 3 — Páginas públicas principais

**Objetivo:** Implementar páginas institucionais do site.

Entregas:

- Home (com chamada para Experiência, alimentada por `site_profile`).
- Sobre (alimentada por `site_profile`).
- Experiência.
- Stack.
- Currículo (PDF via `site_profile.curriculum_media_id`).
- Contato (com integração à camada de e-mail; aliases expostos).
- Projetos.
- Detalhe de projeto.
- **Página de Política de Privacidade** (`/privacidade`).
- **Página de Termos de Uso** (`/termos`).
- **OG image dinâmica** (com fallback estático global).
- Aliases de e-mail expostos em footer e páginas relevantes.
- ADR-006.

Critério de conclusão:

- Navegação pública principal completa, conforme menu da Seção 7.
- Dados vindos da API.
- Páginas responsivas.
- Páginas de Privacidade e Termos linkadas no footer.
- Compartilhamento social mostra OG image correta.

---

## Marco 4 — Conteúdos, vídeos, séries, laboratório e arquiteturas

**Objetivo:** Implementar hub editorial unificado.

Entregas:

- Listagem de conteúdos.
- Filtros por tipo, tag e tecnologia.
- Página de artigo (com TOC e barra de progresso opcional em artigos longos).
- **Biblioteca de componentes editoriais MDX** (Callout, CodeBlock, ComparisonTable, ArchitectureDiagram, VideoEmbed, RepositoryLink, StepList, WarningBox, InfoBox).
- Página de vídeo.
- Página de série (consumindo `series_content` com ordenação).
- Página de tag.
- **Página de laboratório** (visão filtrada `type=LAB` com `LabFieldsDTO` exibindo demonstração e código).
- **Página de arquitetura** (visão filtrada `type=ARCHITECTURE` com `ArchitectureFieldsDTO` exibindo diagrama, componentes, fluxo, vantagens, riscos, quando usar).
- Conteúdos relacionados.
- Embed otimizado do YouTube (lazy loading, thumbnail).
- **Validação de segurança MDX no frontend** (Next.js): compilação real, DOMPurify se houver HTML bruto.

Critério de conclusão:

- Artigos e vídeos funcionando como tipos de conteúdo.
- Vídeos com página dedicada e conteúdo textual complementar.
- TOC funcionando em artigos com mais de 1500 palavras.
- Componentes editoriais documentados no Storybook.
- Lab e Architecture com seus campos próprios renderizados corretamente.
- Validação de renderização bloqueia publicação de MDX inválido.

---

## Marco 5 — SEO técnico avançado (preparação)

**Objetivo:** Implementar SEO completo e preparar para ativação pós-deploy.

Entregas:

- Metadados dinâmicos por página, alimentados por `seo_setting`.
- Canonical URLs.
- Open Graph (incluindo dinâmico do M3).
- Twitter Cards.
- Sitemap dinâmico.
- Robots.txt (alimentado por `seo_setting.robots_policy`).
- JSON-LD por tipo de página (incluindo `Person` alimentado por `site_profile`).
- Breadcrumbs.
- Página 404 otimizada.
- **RSS Feed em `/rss.xml`** gerado pelo Next.js.
- Ajuste de headings.
- **Criação de contas no Google Search Console e Bing Webmaster**; tokens armazenados em `seo_setting`.
- Implementação de meta tags de verificação no frontend.
- **Lighthouse CI** configurado com budgets para Core Web Vitals.

Critério de conclusão:

- Todas as páginas públicas relevantes com metadados únicos.
- Sitemap, robots e RSS funcionando.
- Dados estruturados validados em páginas principais.
- Contas no Search Console e Bing criadas, tokens prontos.
- Lighthouse CI bloqueando regressões de performance.

---

## Marco 6 — Painel administrativo

**Objetivo:** Criar área administrativa para gestão do conteúdo.

Entregas:

- Login administrativo (cookie de sessão conforme Seção 6.6).
- CSRF protection nas rotas admin com endpoint `GET /api/admin/auth/csrf`.
- Verificação de papel `ADMIN` via `@PreAuthorize`.
- CRUD de conteúdos (com editor MDX, validação backend de imports e allowlist, sanitização OWASP, e validação `preview-validate` antes de publicar).
- CRUD de projetos.
- CRUD de tags.
- CRUD de séries (com gestão de `series_content` e `sort_order`).
- CRUD de tecnologias.
- CRUD de experiências.
- CRUD de mídias (`media_asset`) com upload via fluxo confirmado.
- Gestão de mensagens de contato (somente leitura e marcar como lida; sem delete manual — anonimização via job).
- **Gestão de perfil** (`/admin/perfil` para editar `site_profile`).
- **Gestão de configurações de SEO** (`/admin/configuracoes/seo` para editar `seo_setting`).
- Editor MDX com pré-visualização interna.
- Publicação e arquivamento.
- Suporte a `scheduled_at` (planejamento, sem execução automática).
- ADR-005.

**Banco passa a ser fonte de verdade após este marco** (ADR-011).

Critério de conclusão:

- Admin autenticado gerencia dados principais sem necessidade de alteração direta no banco.
- Upload de mídia funcionando via fluxo confirmado.
- Validação de MDX (backend + frontend) bloqueando conteúdo inválido na publicação.
- Perfil e configurações de SEO editáveis via admin.

---

## Marco 7 — Integrações e analytics

**Objetivo:** Adicionar integrações com YouTube, GitHub e ferramentas de métricas.

Entregas:

- Cadastro estruturado de vídeos do YouTube.
- Integração opcional com API do GitHub.
- **Plausible** configurado.
- Eventos de clique.
- Monitoramento básico.
- Health check da API.
- **Sentry** configurado em frontend e backend, com source maps e release tracking.
- **Configuração de DNS de e-mail** (SPF, DKIM, DMARC) para domínios `contato@`, `privacidade@`, `noreply@`.
- ADRs: ADR-008, ADR-010.

Critério de conclusão:

- Dados de vídeos e repositórios exibidos adequadamente.
- Métricas básicas coletadas no Plausible.
- Erros capturados no Sentry com release tracking.
- E-mails enviados sem cair em spam (validados em Mail-Tester e MXToolbox).

---

## Marco 8 — Qualidade, segurança e deploy

**Objetivo:** Preparar aplicação para produção e ativar SEO em produção.

Entregas:

- Testes unitários.
- Testes de integração.
- Testes de componentes críticos.
- Revisão de acessibilidade.
- Revisão de segurança.
- Configuração de CI/CD.
- Deploy frontend.
- Deploy backend.
- Banco em produção.
- **Storybook publicado** em `storybook.leonardosr.com.br`.
- Configuração de domínio.
- HTTPS.
- **Plano de backup automatizado** com retenção rolling e teste de restore documentado.
- **Job de anonimização LGPD** (Spring Scheduling) configurado.
- **Integração com SonarQube Cloud** (ou SonarQube Server como alternativa) configurada no pipeline de CI/CD, com análise inicial do backend Java/Spring Boot e do frontend TypeScript/Next.js. Quality Gate em modo informativo. Geração de relatórios de cobertura (JaCoCo + lcov) integrada ao scan.
- **Ativação SEO em produção:**
  - Verificação de domínio no Google Search Console.
  - Verificação de domínio no Bing Webmaster.
  - Submissão do `sitemap.xml` em ambos.
  - Configuração de alertas para erros de indexação e Core Web Vitals.
  - Auditoria pós-deploy (PageSpeed Insights, Rich Results Test, validação de schema).

Critério de conclusão:

- Site publicado em `leonardosr.com.br`.
- API em produção em `api.leonardosr.com.br` (ou conforme topologia escolhida).
- Admin protegido conforme Seção 6.6.
- SEO técnico validado e ativo.
- Storybook público acessível.
- Backup executando diariamente com restore testado.
- Job de anonimização agendado e funcional.
- Análise Sonar executando no pipeline a cada PR e push na branch principal, com relatório disponível e Quality Gate inicialmente informativo.

---

## 16. Tracking de gerenciamento

## 16.1 Quadro de acompanhamento sugerido

Status possíveis:

```text
Backlog
Priorizado
Em desenvolvimento
Em revisão
Em teste
Concluído
Bloqueado
```

Prioridade:

```text
Alta
Média
Baixa
```

Classificação tripartite:

```text
Arquitetura
Produção
Vitrine
—            (operacional, sem classificação)
```

## 16.2 Tabela de tracking

| ID    | Marco    | Item                                                                                        | Tipo            | Classificação | Prioridade | Status  | Critério de conclusão                                                                                                                                                               |
| ----- | -------- | ------------------------------------------------------------------------------------------- | --------------- | ------------- | ---------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T001  | M1       | Criar repositório frontend                                                                  | Técnico         | Arquitetura   | Alta       | Backlog | Repositório criado com Next.js e TypeScript                                                                                                                                         |
| T002  | M1       | Criar repositório backend                                                                   | Técnico         | Arquitetura   | Alta       | Backlog | Projeto Spring Boot executando localmente                                                                                                                                           |
| T003  | M1       | Configurar Docker Compose                                                                   | Técnico         | Arquitetura   | Alta       | Backlog | Frontend, backend, banco e MinIO executando localmente                                                                                                                              |
| T004  | M1       | Criar design system inicial                                                                 | UX/UI           | Vitrine       | Alta       | Backlog | Componentes base implementados                                                                                                                                                      |
| T005  | M1       | Criar layout público base                                                                   | Frontend        | Arquitetura   | Alta       | Backlog | Header, footer e estrutura de páginas criados                                                                                                                                       |
| T006  | M1       | Configurar tema claro e escuro via cookie                                                   | Frontend        | Arquitetura   | Média      | Backlog | Alternância funcionando sem flash visual                                                                                                                                            |
| T007  | M1       | Configurar SEO global                                                                       | SEO             | Arquitetura   | Alta       | Backlog | Metadata base configurada                                                                                                                                                           |
| T008  | M2       | Criar migrations iniciais                                                                   | Backend         | Arquitetura   | Alta       | Backlog | Flyway executando com tabelas principais                                                                                                                                            |
| T009  | M2       | Criar entidades principais                                                                  | Backend         | Arquitetura   | Alta       | Backlog | Entidades JPA implementadas                                                                                                                                                         |
| T010  | M2       | Criar endpoints públicos                                                                    | Backend         | Arquitetura   | Alta       | Backlog | Endpoints retornando dados publicados                                                                                                                                               |
| T011  | M2       | Criar documentação OpenAPI                                                                  | Backend         | Arquitetura   | Média      | Backlog | Swagger acessível em ambiente local                                                                                                                                                 |
| T012  | M3       | Implementar Home                                                                            | Frontend        | Produção      | Alta       | Backlog | Home responsiva com dados reais ou seed                                                                                                                                             |
| T013  | M3       | Implementar Sobre                                                                           | Frontend        | Produção      | Alta       | Backlog | Página com conteúdo profissional inicial                                                                                                                                            |
| T014  | M3       | Implementar Experiência                                                                     | Frontend        | Produção      | Média      | Backlog | Timeline ou cards de experiência                                                                                                                                                    |
| T015  | M3       | Implementar Stack                                                                           | Frontend        | Produção      | Média      | Backlog | Tecnologias categorizadas                                                                                                                                                           |
| T016  | M3       | Implementar Projetos                                                                        | Frontend        | Produção      | Alta       | Backlog | Listagem e detalhe de projetos                                                                                                                                                      |
| T017  | M3       | Implementar Contato                                                                         | Fullstack       | Produção      | Alta       | Backlog | Formulário validado e persistido                                                                                                                                                    |
| T018  | M4       | Implementar listagem de conteúdos                                                           | Frontend        | Produção      | Alta       | Backlog | Lista com filtros por tipo e tag                                                                                                                                                    |
| T019  | M4       | Implementar página de artigo                                                                | Frontend        | Produção      | Alta       | Backlog | Artigo renderizado com SEO próprio                                                                                                                                                  |
| T020  | M4       | Implementar página de vídeo                                                                 | Frontend        | Produção      | Alta       | Backlog | Vídeo com embed otimizado e texto complementar                                                                                                                                      |
| T021  | M4       | Implementar séries                                                                          | Fullstack       | Produção      | Média      | Backlog | Série com conteúdos ordenados via series_content                                                                                                                                    |
| T022  | M4       | Implementar páginas de tags                                                                 | Frontend        | Produção      | Média      | Backlog | Tag exibe conteúdos relacionados                                                                                                                                                    |
| T023  | M5       | Implementar sitemap dinâmico                                                                | SEO             | Produção      | Alta       | Backlog | Sitemap gerado com páginas públicas                                                                                                                                                 |
| T024  | M5       | Implementar robots.txt                                                                      | SEO             | Produção      | Alta       | Backlog | Admin e rascunhos bloqueados                                                                                                                                                        |
| T025  | M5       | Implementar JSON-LD                                                                         | SEO             | Produção      | Alta       | Backlog | Person, Article, VideoObject e BreadcrumbList                                                                                                                                       |
| T026  | M5       | Implementar Open Graph                                                                      | SEO             | Produção      | Alta       | Backlog | Compartilhamento social com imagem e descrição                                                                                                                                      |
| T027  | M5       | Implementar RSS Feed em /rss.xml (Next.js)                                                  | SEO             | Produção      | Média      | Backlog | Feed acessível e válido                                                                                                                                                             |
| T028  | M6       | Implementar autenticação admin                                                              | Segurança       | Arquitetura   | Alta       | Backlog | Admin protegido por cookie de sessão + CSRF                                                                                                                                         |
| T029  | M6       | Implementar CRUD de conteúdos                                                               | Admin           | Produção      | Alta       | Backlog | Criar, editar, publicar e arquivar conteúdo                                                                                                                                         |
| T030  | M6       | Implementar CRUD de projetos                                                                | Admin           | Produção      | Alta       | Backlog | Projetos gerenciáveis no painel                                                                                                                                                     |
| T031  | M6       | Implementar CRUD de tags                                                                    | Admin           | Produção      | Média      | Backlog | Tags gerenciáveis no painel                                                                                                                                                         |
| T032  | M6       | Implementar CRUD de séries                                                                  | Admin           | Produção      | Média      | Backlog | Séries gerenciáveis no painel com ordenação                                                                                                                                         |
| T033  | M6       | Implementar editor MDX                                                                      | Admin           | Produção      | Alta       | Backlog | Conteúdo editável com pré-visualização                                                                                                                                              |
| T034  | M7       | Configurar GitHub integration                                                               | Integração      | Vitrine       | Média      | Backlog | Repositórios exibidos ou cadastrados manualmente                                                                                                                                    |
| T035  | M7       | Configurar YouTube integration                                                              | Integração      | Produção      | Média      | Backlog | Vídeos cadastrados e exibidos corretamente                                                                                                                                          |
| T036  | M7       | Configurar Analytics (Plausible)                                                            | Métricas        | Produção      | Alta       | Backlog | Métricas básicas funcionando                                                                                                                                                        |
| T037  | M8       | Criar testes backend                                                                        | Qualidade       | Produção      | Alta       | Backlog | Services e controllers testados                                                                                                                                                     |
| T038  | M8       | Criar testes frontend                                                                       | Qualidade       | Produção      | Média      | Backlog | Componentes críticos testados                                                                                                                                                       |
| T039  | M8       | Revisar acessibilidade                                                                      | Qualidade       | Produção      | Alta       | Backlog | Navegação por teclado e foco visível                                                                                                                                                |
| T040  | M8       | Revisar segurança                                                                           | Segurança       | Produção      | Alta       | Backlog | Admin, CORS, validação e sanitização revisados                                                                                                                                      |
| T041  | M8       | Configurar CI/CD                                                                            | DevOps          | Produção      | Alta       | Backlog | Pipeline executando build e testes                                                                                                                                                  |
| T042  | M8       | Realizar deploy frontend                                                                    | DevOps          | Produção      | Alta       | Backlog | Site público acessível                                                                                                                                                              |
| T043  | M8       | Realizar deploy backend                                                                     | DevOps          | Produção      | Alta       | Backlog | API pública acessível                                                                                                                                                               |
| T044  | M8       | Configurar domínio e HTTPS                                                                  | DevOps          | Produção      | Alta       | Backlog | `leonardosr.com.br` com HTTPS conforme Seção 6.6                                                                                                                                    |
| T045  | M8       | Auditoria SEO final                                                                         | SEO             | Produção      | Alta       | Backlog | Sitemap, robots, metadata e schema validados                                                                                                                                        |
| T046  | M1       | Configurar Storybook + Conventional Commits + pre-commit hooks                              | DevEx           | Vitrine       | Alta       | Backlog | Storybook rodando local; commits validados via Commitlint                                                                                                                           |
| T047  | M1       | Configurar next/font local e Shiki com pré-compilação                                       | Frontend        | Vitrine       | Alta       | Backlog | Fontes locais carregando; código com syntax highlighting Shiki                                                                                                                      |
| T048  | M2       | Criar entidade media_asset, relacionamentos N:N e enum de status                            | Backend         | Arquitetura   | Alta       | Backlog | Entidades implementadas e migrations executadas                                                                                                                                     |
| T049  | M2       | Configurar Postgres FTS para busca em português com coalesce                                | Backend         | Arquitetura   | Alta       | Backlog | Endpoint de busca retornando resultados ranqueados, busca por tag funcional                                                                                                         |
| T050  | M2       | Configurar geração de tipos TS via OpenAPI                                                  | DevEx           | Arquitetura   | Alta       | Backlog | Tipos TS gerados no pipeline a partir do contrato                                                                                                                                   |
| T051  | M2       | Implementar interface de storage com adapter R2 + MinIO local + fluxo de upload confirmado  | Backend         | Arquitetura   | Alta       | Backlog | Upload PENDING → ACTIVE → DELETED funcionando em ambos adapters                                                                                                                     |
| T052  | M2       | Implementar interface de e-mail com adapter Resend e templates Thymeleaf                    | Backend         | Arquitetura   | Alta       | Backlog | Envio de notificação de contato funcionando                                                                                                                                         |
| T053  | M3       | Criar páginas de Privacidade e Termos                                                       | Compliance      | Produção      | Alta       | Backlog | Páginas publicadas e linkadas no footer                                                                                                                                             |
| T054  | M3       | Implementar OG image dinâmica + fallback estática                                           | SEO             | Vitrine       | Alta       | Backlog | OG personalizada por conteúdo, com fallback funcionando                                                                                                                             |
| T055  | M4       | Implementar TOC e barra de progresso em artigos longos                                      | Frontend        | Vitrine       | Média      | Backlog | TOC obrigatório acima de 1500 palavras                                                                                                                                              |
| T056  | M4       | Implementar biblioteca de componentes editoriais MDX                                        | Frontend        | Vitrine       | Alta       | Backlog | Componentes documentados no Storybook                                                                                                                                               |
| T057a | M5       | Preparar Search Console e Bing Webmaster (criação de contas, tokens em seo_setting)         | SEO             | Produção      | Alta       | Backlog | Contas criadas; tokens prontos no admin                                                                                                                                             |
| T057b | M8       | Ativar Search Console e Bing Webmaster pós-deploy (verificação + submissão de sitemap)      | SEO             | Produção      | Alta       | Backlog | Domínios verificados, sitemaps submetidos, alertas configurados                                                                                                                     |
| T058  | M5       | Configurar Lighthouse CI com budgets de laboratório                                         | Qualidade       | Produção      | Alta       | Backlog | Pipeline falha em regressões                                                                                                                                                        |
| T059  | M7       | Configurar Sentry frontend e backend com release tracking                                   | Observabilidade | Produção      | Alta       | Backlog | Erros capturados em ambas camadas                                                                                                                                                   |
| T060  | M7       | Configurar Plausible                                                                        | Métricas        | Produção      | Alta       | Backlog | Eventos chegando ao painel                                                                                                                                                          |
| T061  | M8       | Implementar plano de backup automatizado e testar restore                                   | DevOps          | Produção      | Alta       | Backlog | Backup diário, retenção rolling e restore validado                                                                                                                                  |
| T062  | Contínuo | Manter pasta `/docs/adr/` com lista inicial de ADRs (incluindo ADR-012 e ADR-013)           | Documentação    | Vitrine       | Alta       | Backlog | ADR-001 a ADR-013 publicados; novos ADRs conforme necessidade                                                                                                                       |
| T063  | M1       | Documentar topologia de domínios e autenticação (Seção 6.6 + ADR-012)                       | Arquitetura     | Arquitetura   | Alta       | Backlog | Decisão registrada e validada antes da implementação de auth                                                                                                                        |
| T064  | M2       | Modelar e implementar site_profile com endpoints admin                                      | Backend         | Arquitetura   | Alta       | Backlog | CRUD de perfil funcional, alimentando home e Sobre                                                                                                                                  |
| T065  | M2       | Modelar e implementar seo_setting com endpoints admin                                       | Backend         | Arquitetura   | Alta       | Backlog | Configurações SEO editáveis no admin                                                                                                                                                |
| T066  | M2       | Modelar series_content com sort_order e API de reordenação                                  | Backend         | Arquitetura   | Alta       | Backlog | Navegação anterior/próximo em séries funcionando                                                                                                                                    |
| T067  | M2       | Implementar modelo editorial unificado (tipos LAB/ARCHITECTURE com DTOs específicos)        | Backend         | Arquitetura   | Alta       | Backlog | type_specific_fields validado por LabFieldsDTO e ArchitectureFieldsDTO                                                                                                              |
| T068  | M8       | Implementar job de anonimização LGPD (Spring Scheduling)                                    | Backend         | Produção      | Alta       | Backlog | Job diário anonimizando mensagens com mais de 12 meses                                                                                                                              |
| T069  | M2/M4/M6 | Implementar regras de segurança MDX (backend OWASP + frontend DOMPurify + preview-validate) | Segurança       | Arquitetura   | Alta       | Backlog | MDX validado antes de publicar em ambas camadas                                                                                                                                     |
| T070  | M7       | Configurar SPF, DKIM e DMARC no domínio                                                     | DevOps          | Produção      | Alta       | Backlog | Registros DNS configurados; envio validado em Mail-Tester e MXToolbox sem alertas críticos                                                                                          |
| T071  | M2       | Implementar política de seed inicial documentada                                            | Backend         | Arquitetura   | Alta       | Backlog | Seeds aplicados conforme Seção 14.6                                                                                                                                                 |
| T072  | M8       | Configurar Sonar (Cloud ou Server) no pipeline CI/CD                                        | Qualidade       | Produção      | Média      | Backlog | Análise Sonar executando para backend e frontend a cada PR e push, com relatórios de cobertura (JaCoCo + lcov) integrados, Quality Gate inicialmente informativo, ADR-013 publicado |

---

## 17. Definition of Ready

Uma tarefa estará pronta para desenvolvimento quando possuir:

- Descrição clara.
- Tipo identificado.
- Prioridade definida.
- **Classificação tripartite** (Arquitetura / Produção / Vitrine), quando aplicável.
- Critério de aceitação.
- Dependências conhecidas.
- Referência visual ou técnica, quando necessário.

---

## 18. Definition of Done

Uma tarefa será considerada concluída quando:

- Código implementado.
- Build executado com sucesso.
- Testes aplicáveis passando.
- Critérios de aceitação atendidos.
- Responsividade verificada.
- Acessibilidade básica considerada.
- SEO considerado quando a tarefa envolver página pública.
- Sem erros visíveis no console.
- **Contrato OpenAPI atualizado**, quando a tarefa envolver endpoint público ou administrativo.
- **ADR registrado em `/docs/adr/`**, quando a tarefa envolver decisão arquitetural não óbvia.
- **Componente documentado no Storybook**, quando a tarefa envolver criação ou alteração de componente do design system ou componente editorial MDX.
- **Validação de segurança aplicada**, quando a tarefa envolver entrada de usuário ou MDX (RF06.6).
- Revisão realizada.

---

## 19. Critérios gerais de aceite do produto

O produto será considerado entregue quando:

- Todas as páginas públicas principais estiverem implementadas (incluindo Privacidade, Termos, Laboratório e Arquiteturas).
- Conteúdos, vídeos, séries, projetos, perfil, configurações de SEO e mídias forem gerenciáveis.
- O painel administrativo estiver protegido por cookie de sessão + CSRF (conforme Seção 6.6).
- O site estiver publicado no domínio final.
- SEO técnico estiver implementado e ativo (Search Console e Bing verificados).
- Sitemap, robots, RSS e metadados dinâmicos estiverem funcionando.
- OG image dinâmica estiver funcionando com fallback estático.
- Vídeos, labs e arquiteturas possuírem páginas dedicadas com seus campos próprios.
- Formulário de contato estiver funcional, com notificação via camada abstrata de e-mail (Thymeleaf).
- DNS de e-mail (SPF/DKIM/DMARC) configurado.
- Layout estiver responsivo.
- Acessibilidade básica estiver contemplada.
- Storybook público estiver acessível.
- Plano de backup com restore testado estiver em produção.
- Job de anonimização LGPD estiver agendado e funcional.
- Análise Sonar executando no pipeline (com Quality Gate informativo) e ADR-013 publicado.
- Sentry e Plausible estiverem capturando dados.
- Lista inicial de ADRs (ADR-001 a ADR-013) estiver publicada.
- Documentação de instalação e deploy estiver disponível.

---

## 20. Riscos e mitigação

| Risco                                                                                                                                  | Impacto | Mitigação                                                                                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Escopo muito amplo                                                                                                                     |    Alto | Trabalhar por marcos, mantendo tracking atualizado; usar classificação tripartite para priorizar dentro de cada marco                                                                  |
| Backend atrasar publicação                                                                                                             |   Médio | Permitir seed ou conteúdo estático temporário                                                                                                                                          |
| Painel admin consumir muito tempo                                                                                                      |    Alto | Priorizar CRUDs essenciais primeiro                                                                                                                                                    |
| SEO ser tratado tardiamente                                                                                                            |    Alto | Implementar SEO desde as primeiras páginas; preparação no M5, ativação no M8                                                                                                           |
| Vídeos deixarem o site pesado                                                                                                          |   Médio | Usar thumbnails na listagem e embed apenas no detalhe, com lazy loading                                                                                                                |
| Falta de conteúdo inicial                                                                                                              |   Médio | Criar artigos e projetos seed antes do lançamento (Seção 14.6)                                                                                                                         |
| Exposição indevida do admin                                                                                                            |    Alto | Bloquear admin no robots, proteger com cookie de sessão + CSRF + topologia validada                                                                                                    |
| Dependência de APIs externas                                                                                                           |   Médio | Criar fallback manual para GitHub e YouTube; usar adapters para storage e e-mail                                                                                                       |
| Acúmulo de complexidade nas integrações                                                                                                |   Médio | Usar interfaces e adapters; configurar uma integração de cada vez no Marco 7                                                                                                           |
| Perda de dados em produção                                                                                                             |    Alto | Plano de backup automatizado com retenção rolling e teste de restore trimestral                                                                                                        |
| Não conformidade LGPD                                                                                                                  |    Alto | RF21 implementado no Marco 3 e job de anonimização automática no Marco 8                                                                                                               |
| Erros não detectados em produção                                                                                                       |   Médio | Sentry configurado no Marco 7                                                                                                                                                          |
| Regressões de performance                                                                                                              |   Médio | Lighthouse CI no pipeline com budgets configurados                                                                                                                                     |
| XSS via MDX vindo do banco                                                                                                             |    Alto | Validação de segurança em duas camadas (backend OWASP + frontend DOMPurify); allowlist de componentes; imports proibidos                                                               |
| E-mail caindo em spam                                                                                                                  |   Médio | DNS de e-mail configurado (SPF/DKIM/DMARC) no Marco 7 com validação em ferramentas                                                                                                     |
| Auth incompatível com infra                                                                                                            |    Alto | Topologia decidida em Seção 6.6 e ADR-012 antes da implementação                                                                                                                       |
| Sobrescrita acidental de conteúdo no admin                                                                                             |   Médio | `updated_at` visível e botão "duplicar antes de editar" (versionamento completo no backlog futuro)                                                                                     |
| Quality Gate do Sonar configurado cedo demais bloqueia o desenvolvimento por ruídos, falsos positivos ou ausência inicial de cobertura |   Médio | Iniciar com Quality Gate informativo (não bloqueante); revisar achados gradualmente; tornar bloqueante apenas após maturidade mínima de testes e pipeline (ver RNF05 e Backlog futuro) |

---

## 21. Backlog futuro opcional

Mesmo com escopo completo inicial, estes itens podem ficar como evolução posterior:

- Newsletter.
- Área de downloads.
- Comentários em artigos.
- Integração automática com YouTube Data API.
- Integração automática com GitHub Actions para atualizar projetos.
- Geração automática de currículo PDF a partir do banco.
- Área de cursos.
- Sistema de trilhas de aprendizagem.
- Busca avançada com Meilisearch ou Typesense (se a qualidade da FTS degradar).
- Internacionalização em inglês.
- PWA.
- Notificações por e-mail (além da notificação de contato).
- Página pública de changelog.
- Execução automática de publicação agendada (`scheduled_at`).
- Endpoint específico para solicitação de exclusão de dados (LGPD).
- Release Please ou changelog automático.
- Confirmação por e-mail ao remetente do formulário de contato.
- **Versionamento e histórico de revisões de conteúdo** (`content_revision`): permitir restaurar versão anterior de artigo, diff entre versões, retenção configurável.
- **Preview público com token** para revisão externa antes da publicação.
- **React Email** com etapa Node de pré-renderização documentada em ADR (caso seja desejado como vitrine futura).
- **RBAC granular** com papéis adicionais (`EDITOR`, `REVIEWER`).
- **Status por relação na série** (`status_in_series`).
- **Quality Gate bloqueante na branch principal**: evoluir o Sonar de modo informativo para bloqueante em PRs e pushes na main, após estabilização de testes e cobertura.
- **Meta mínima de cobertura de testes**: definir percentual mínimo (a calibrar após primeiros ciclos com dados reais; nunca antes da maturidade dos testes).
- **SonarQube Server local em Docker**: subir Sonar self-hosted via Docker Compose como exercício de DevOps e alternativa a Cloud. Não obrigatório no fluxo de desenvolvimento padrão.

---

## 22. Prompt de implementação para Codex ou Claude

Use o seguinte comando como ponto de partida:

```text
Você é um engenheiro de software sênior responsável por implementar o produto descrito neste PRD 1.1.3.

Leia integralmente o PRD e implemente o projeto por marcos, começando pelo Marco 1.

Regras:
1. Não simplifique o escopo sem registrar a decisão em ADR.
2. Preserve SEO como requisito estrutural desde o início.
3. Use Next.js com App Router, React e TypeScript estrito no frontend.
4. Use Tailwind CSS v4 como padrão de estilização (CSS global apenas para tipografia MDX, blocos de código e ajustes pontuais).
5. Use MDX como formato de conteúdo, com biblioteca própria de componentes editoriais documentada no Storybook.
6. Use Spring Boot, Java, PostgreSQL, Flyway e Spring Security no backend.
7. Implemente camada de storage abstrata (interface + adapter R2 + adapter MinIO local) com fluxo de upload pré-assinado e confirmação (PENDING → ACTIVE → DELETED). Aceite apenas image/jpeg, image/png, image/webp e application/pdf na v1; SVG só com ADR específica; limites de 5 MB para capas e OG, 10 MB para imagens internas, diagramas e PDF de currículo.
8. Implemente camada de e-mail abstrata (interface + adapter Resend) com templates em Thymeleaf no backend (NÃO use React Email).
9. Use cookie de sessão HttpOnly + Secure para auth admin, conforme Seção 6.6 (SameSite=Lax na topologia preferencial; Strict apenas se validado em ADR-012). CSRF protection com token explícito.
10. Adote a topologia de domínios da Seção 6.6 e registre em ADR-012 antes de implementar autenticação.
11. Configure Postgres Full-Text Search com dicionário em português, coalesce para campos nullable e montagem do tsvector via SQL nativo.
12. Modelo editorial unificado: tipos LAB e ARCHITECTURE são content com type_specific_fields validados por LabFieldsDTO e ArchitectureFieldsDTO. SERIES NÃO é tipo de conteúdo — é coleção via series_content com sort_order.
13. LGPD: anonimização (não soft delete) de mensagens de contato após 12 meses via Spring Scheduling.
14. Segurança MDX em duas camadas: backend (OWASP Java HTML Sanitizer disponível mas não exercitado na v1, allowlist de componentes, imports proibidos, HTML bruto proibido) + frontend Next.js (compilação real, DOMPurify mantido como dependência preventiva mas não exercitado). HTML bruto em MDX é proibido na v1; habilitação futura via ADR. Endpoint `preview-validate` no backend valida domínio/allowlist; frontend Next.js valida compilação real; ambas precisam estar OK para publicar.
15. Gere tipos TypeScript no frontend a partir do OpenAPI exportado pelo backend.
16. RSS é gerado pelo Next.js em /rss.xml, NÃO é endpoint do backend.
17. Crie código limpo, organizado por domínio e com boa separação de responsabilidades.
18. Crie Docker Compose com frontend, backend, Postgres e MinIO para ambiente local.
19. Inclua README com instruções de setup.
20. Configure Storybook desde o Marco 1, publicado em subdomínio no Marco 8.
21. Configure pre-commit hooks (Husky, lint-staged, ESLint, Prettier, tsc, Spotless) e Conventional Commits via Commitlint.
22. Use fontes locais via next/font/local.
23. Use Shiki para syntax highlighting com pré-compilação em build time.
24. Papel ADMIN único na versão inicial; não implemente RBAC complexo.
25. Implemente seed inicial conforme Seção 14.6 (admin via env, site_profile, seo_setting, tags, tecnologias, projetos, conteúdos, série inicial).
26. Ao concluir cada marco, atualize o tracking informando tarefas concluídas, pendências e bloqueios.
27. Para páginas públicas, sempre implemente metadados, URL amigável e estrutura adequada de headings.
28. Para vídeos, crie página dedicada com conteúdo textual complementar e embed otimizado.
29. Para qualquer endpoint público ou administrativo, mantenha o contrato OpenAPI atualizado (Definition of Done).
30. Para qualquer decisão arquitetural não óbvia, registre ADR em /docs/adr/ no formato Michael Nygard.
31. Para qualquer componente do design system, documente no Storybook (Definition of Done).
32. Configure SPF, DKIM e DMARC no Marco 7 antes de validar envio de e-mail em produção.
33. Search Console e Bing Webmaster: preparação no Marco 5 (criar contas, gerar tokens em seo_setting), ativação no Marco 8 (verificar domínio, submeter sitemap).
34. SonarQube Cloud (preferencial) ou Server (alternativa) configurado no Marco 8, com análise contínua de backend e frontend, integração de relatórios de cobertura (JaCoCo + lcov) e Quality Gate em modo informativo na primeira fase. Não substitui ESLint, Prettier, Spotless, testes ou Sentry. Decisão registrada em ADR-013.

Comece criando a estrutura inicial do repositório, o layout base do frontend, o projeto Spring Boot, o Docker Compose com MinIO, a configuração inicial de SEO global, o Storybook, os pre-commit hooks e os ADRs ADR-001, ADR-002, ADR-003 e ADR-012 (topologia).
```

---

## 23. Observações finais

Este projeto deve ser tratado como uma plataforma pessoal de longo prazo, não apenas como currículo online. A força do produto estará na combinação de apresentação profissional, conteúdo técnico, vídeos, projetos reais, SEO bem implementado, decisões arquiteturais documentadas e demonstração prática das tecnologias que Leonardo deseja destacar.

O próprio site deve demonstrar aquilo que comunica: domínio em React, Next.js, Spring Boot, arquitetura web moderna, padrões como Ports & Adapters, boas práticas de desenvolvimento, performance, acessibilidade, segurança e SEO.

A versão 1.1.3 do PRD não reduziu escopo nem antecipou lançamento — manteve as bases das versões anteriores e incluiu **análise estática contínua via Sonar** como camada complementar de inspeção, com Quality Gate informativo na primeira fase e evolução para bloqueante registrada no Backlog futuro. A inclusão é compatível com o objetivo de aprendizado (Sonar é ferramenta padrão de mercado em projetos profissionais) e com o posicionamento de vitrine técnica.

Está pronto para implementação assistida por IA.
