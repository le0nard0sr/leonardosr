# ADR-006 — Estratégia de Metadata Dinâmica, Open Graph e Topologia de Fetch SSR

**Status:** Aceito  
**Data:** 2026-05-10  
**Marco:** M3 — Páginas públicas principais

---

## Contexto

O M3 entrega 11 rotas públicas que precisam de metadata SEO consistente, OG image por segmento e dados vindos da API Spring Boot em Server Components. As decisões desta ADR preparam o terreno para o M5 (SEO técnico avançado) sem antecipar seu escopo.

---

## Decisões

### 1. Metadata por segmento

Cada `page.tsx` exporta `generateMetadata` (ou constante `metadata`) com `title`, `description`, `alternates.canonical` e bloco `openGraph`. O `layout.tsx` raiz mantém defaults globais; segmentos sobrescrevem conforme necessário.

### 2. OG image via `next/og`

Arquivo `opengraph-image.tsx` colocado por segmento. Next.js detecta automaticamente e injeta a URL no `<head>` como `og:image` e `twitter:image`. Implementado em:

- `/app/opengraph-image.tsx` — global, usa `profile.displayName` + `profile.headline`.
- `/app/sobre/opengraph-image.tsx`, `/app/experiencia/opengraph-image.tsx`, `/app/stack/opengraph-image.tsx`, `/app/projetos/opengraph-image.tsx`, `/app/curriculo/opengraph-image.tsx`, `/app/contato/opengraph-image.tsx` — estáticas por segmento.
- `/app/projetos/[slug]/opengraph-image.tsx` — dinâmica por projeto, usa nome e tecnologias.

Fallback estático PNG (`public/og/fallback.png`) foi descartado do M3 — geração via script requer `sharp` ou canvas que não estão disponíveis no ambiente de build. Registrado como pendência do M5 junto com tipografia via fontes locais.

Sem carregamento de fontes externas no M3 para evitar custo de Edge. Registro de melhoria de tipografia com fontes locais fica para M5.

### 3. Estratégia de fetch SSR

- `fetch(..., { next: { revalidate: 60 } })` aplicado em todas as chamadas via `apiRequest<T>` em `src/lib/api/public.ts`.
- `import "server-only"` garante que nenhum helper vaze para o bundle do client.
- `cache()` do React aplicado em `getProfile()` para deduplicar chamadas entre `RootLayout`, `Footer` e páginas no mesmo request.

### 4. Tratamento de erro / fallback

- `safeFetch<T>(loader, fallback, label)` em `src/lib/api/errors.ts`: captura `ApiError` e retorna fallback; em dev loga com prefixo `[api:fallback]`; em produção, relança o erro (não esconde problemas reais).
- Rotas com slug dinâmico (`/projetos/[slug]`): `ApiError.status === 404` → `notFound()`; outros erros → propagam para `error.tsx`.
- `error.tsx` por rota dinâmica para evitar tela em branco em erros de runtime.

### 5. `generateStaticParams` tolerante a falha

`generateStaticParams` em `/projetos/[slug]/page.tsx` usa `try/catch` e retorna `[]` quando a API não está disponível (ex.: build no CI sem Docker). ISR com `revalidate: 60` cobre projetos não pré-gerados.

### 6. JSON-LD mínimo (M3)

JSON-LD `Person` (Home e Sobre) e `WebSite` (root) são diferidos para o M5, onde há especificação completa por tipo de página. Nenhum bloco JSON-LD foi inserido no M3 para evitar dados incompletos indexados.

---

## O que fica para M5

- Sitemap dinâmico (`/sitemap.xml`) alimentado por `seo_setting`.
- `robots.txt` dinâmico via `seo_setting.robots_policy`.
- RSS Feed (`/rss.xml`).
- Tokens de verificação Google Search Console e Bing Webmaster.
- JSON-LD por tipo de página (`Person`, `BlogPosting`, `VideoObject`, `BreadcrumbList`).
- Lighthouse CI com budgets de Core Web Vitals.
- Invalidação de cache por tag (`revalidateTag("profile")`, `revalidateTag("projects")`) a partir do admin do M6.
- Fontes locais no `ImageResponse` de OG para tipografia consistente com o design system.

---

## Alternativas consideradas

| Alternativa                                   | Razão para rejeitar                                                                                                  |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `cache: "no-store"` por padrão                | Custo de SSR sem ganho real; conteúdo muda em janela de minutos a dias.                                              |
| SSG puro com `generateStaticParams` para tudo | Profile e projetos featured podem mudar entre builds; ISR é mais flexível.                                           |
| OG estática manual em `public/og/`            | Com 11 rotas + N projetos exige manutenção manual; `next/og` resolve com código.                                     |
| MDX como rota `page.mdx` diretamente          | Limita layouts personalizados e `generateMetadata` por página; importar MDX de `src/content/legal/` é mais flexível. |
| ADR único cobrindo todo SEO técnico           | Colidiria com o escopo do M5 ("SEO técnico avançado"); separar por marco mantém responsabilidades claras.            |

---

## Consequências

- TTFB previsível e consistente graças ao Data Cache do Next.js.
- SEO por rota sem duplicação de metadata.
- OG image funcional para compartilhamento social desde o M3.
- Preparação limpa para invalidação ativa no M5/M6 sem reescrever a camada de fetch.
