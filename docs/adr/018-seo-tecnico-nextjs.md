# ADR-018 — SEO técnico: estratégia Next.js, endpoint público e dados estruturados

**Data:** 2026-05-12
**Status:** Aceito

## Contexto

O site precisa de SEO técnico completo: sitemap dinâmico, robots.txt configurável, feed RSS, dados estruturados JSON-LD (Person, WebSite, Article, VideoObject, BreadcrumbList), Twitter Cards, meta-verificação Google/Bing e canonical URLs.

O backend já tem a entidade `seo_setting` com campos completos. Precisamos decidir como expor esses dados ao frontend SSR e como implementar cada recurso de SEO no Next.js App Router.

## Decisões

### 1. Endpoint público de SEO

Criado `GET /api/public/settings/seo` retornando `PublicSeoDto` enxuto (campos que o frontend pode usar). Motivações:

- Evita acoplar o frontend ao schema interno do admin
- Permite cache independente no frontend (revalidate: 3600s)
- Segurança: DTO nunca expõe campos administrativos (IDs internos, timestamps, etc.)

`PublicSeoDto.from(SeoSetting)` resolve `defaultOgImageUrl` apenas quando `MediaAsset.status == ACTIVE`. Normaliza `siteUrl` removendo trailing slash.

### 2. Sitemap e robots via route convention Next.js

`app/sitemap.ts` e `app/robots.ts` usam a convenção nativa do Next.js App Router. Motivação: sem dependência externa, cache automático via `export const revalidate`, integrado ao sistema de build.

Sitemap inclui rotas estáticas + dinâmicas (projetos, conteúdos, series, tags). Conteúdos LAB/ARCHITECTURE usam paths `/laboratorio/` e `/arquiteturas/` respectivamente.

`robots.ts` mapeia `robotsPolicy`:

- `allow`: `Allow: /` para todos, `Disallow: /admin` mantido
- `disallow_admin` (padrão): `Disallow: /admin`, restante liberado
- `custom`: degrade gracioso para `disallow_admin` + follow-up M6 para campo de regras custom no admin

`/admin` sempre bloqueado, independente da policy.

### 3. RSS via route handler

`app/rss.xml/route.ts` usa route handler GET. Motivação: RSS não é uma "página" e precisa de Content-Type customizado. `buildRssFeed()` em `lib/seo/rss.ts` centraliza encoding XML e geração RFC-822.

### 4. JSON-LD em Server Component puro

JSON-LD injetado via `<script type="application/ld+json">` em Server Components puros (sem `"use client"`, sem `next/script`). Motivação: dados estruturados são para crawlers, não para o browser; `next/script` adiciona latência desnecessária e pode retardar a indexação.

Escaping seguro via `JSON.stringify` — nunca templating manual de strings JSON.

### 5. Schemas JSON-LD implementados

| Rota                    | Schemas                                                       |
| ----------------------- | ------------------------------------------------------------- |
| Layout (todas)          | Person, WebSite                                               |
| projetos/[slug]         | CreativeWork, BreadcrumbList                                  |
| conteudos/[slug]        | Article, BreadcrumbList, VideoObject (se youtubeUrl presente) |
| laboratorio/[slug]      | Article, BreadcrumbList                                       |
| arquiteturas/[slug]     | Article, BreadcrumbList                                       |
| conteudos/series/[slug] | BreadcrumbList                                                |
| tags/[slug]             | BreadcrumbList                                                |

### 6. Twitter Cards e meta-verificação

`buildBaseMetadata(seo)` retorna `Metadata` com:

- `twitter.card: "summary_large_image"`
- `verification.google` e `verification.other["msvalidate.01"]` quando campos presentes no SEO settings

Tokens de verificação reais NÃO são versionados. Valores fake/dev usados em seed local. Verificação de domínio e submissão de sitemap ficam para M8 (T057b).

### 7. Revalidate por recurso

| Recurso            | Revalidate |
| ------------------ | ---------- |
| `/sitemap.xml`     | 3600s      |
| `/robots.txt`      | 86400s     |
| `/rss.xml`         | 3600s      |
| `getSeoSettings()` | 3600s      |

## Alternativas consideradas

- **next-sitemap (pacote externo)**: inflexível para tipos de conteúdo customizados, adiciona dep de build.
- **JSON-LD via next/script com strategy="beforeInteractive"**: adiciona peso ao bundle client sem necessidade.
- **Endpoint SEO unificado com admin**: expõe campos sensíveis ao público.
- **robots.txt estático**: impossibilita controle via painel admin.

## Consequências

- `getSeoSettings()` é chamado em múltiplos Server Components (layout, detail pages). O `cache()` do React garante uma única requisição HTTP por render tree — sem N+1.
- `siteUrl` é normalizado (sem trailing slash) para uso consistente como prefixo de URLs absolutas.
- Suporte completo a `robotsPolicy=custom` (campo de regras livres no admin) é follow-up para M6.
- Paginação em endpoints para sitemap/RSS é follow-up quando volume crescer.
