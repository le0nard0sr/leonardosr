# ADR-001 — Next.js para o frontend

## Status

Aceita

## Contexto

O produto precisa combinar portfólio, hub de conteúdo técnico, SEO forte, renderização eficiente e experiência editorial moderna.

## Decisão

Usar Next.js com App Router, React e TypeScript estrito como base do frontend.

## Consequências

- Páginas públicas podem usar SSG, ISR e Server Components conforme o caso.
- SEO, metadata, sitemap e RSS ficam próximos da camada de apresentação.
- O frontend deve manter contrato tipado com o backend via OpenAPI nos próximos marcos.
