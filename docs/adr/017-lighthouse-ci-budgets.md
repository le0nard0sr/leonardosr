# ADR-017 — Lighthouse CI: budgets e estratégia de qualidade CWV

**Data:** 2026-05-12
**Status:** Aceito

## Contexto

O PRD (RNF02) exige que todas as páginas públicas atinjam score Lighthouse ≥ 90 (performance), ≥ 95 (SEO, acessibilidade) e ≥ 90 (best-practices). Core Web Vitals alvo: LCP < 2500 ms, CLS < 0.1, TBT < 300 ms.

Precisamos de uma forma automatizada e reprodutível de verificar essas métricas antes de merges no main.

## Decisão

Usar **@lhci/cli** (Lighthouse CI) com:

- `numberOfRuns: 3` e mediana por run para reduzir variabilidade de CI
- Preset `desktop` (servidor SSR otimizado para desktop como caminho principal)
- Budget assertions em modo `error` para performance, SEO, acessibilidade e best-practices
- Upload para `temporary-public-storage` para histórico visual sem infraestrutura própria
- Workflow GitHub Actions **exclusivo do LHCI** — lint, typecheck, build e testes ficam para o pipeline geral do M8

### Rotas amostradas

Seis URLs representativas cobrindo conteúdo estático, listas e detalhes:
`/`, `/sobre`, `/projetos`, `/conteudos`, `/curriculo`, `/contato`

### Budgets definidos

| Métrica        | Threshold | Nível |
| -------------- | --------- | ----- |
| performance    | ≥ 0.90    | error |
| seo            | ≥ 0.95    | error |
| accessibility  | ≥ 0.95    | error |
| best-practices | ≥ 0.90    | error |
| LCP            | < 2500 ms | error |
| CLS            | < 0.10    | error |
| TBT            | < 300 ms  | error |
| FCP            | < 2000 ms | warn  |

Performance ≥ 0.90 é universal — sem exceção para páginas com embed de vídeo (alinhado ao PRD RNF02).

## Alternativas consideradas

- **WebPageTest / PageSpeed Insights**: sem integração nativa com PRs; requer token externo.
- **next/bundle-analyzer**: mede tamanho de bundle, não CWV reais em runtime.
- **Assertion nível `warn` para todos**: não bloqueia regressões — rejeitado.

## Consequências

- Regressões de performance bloqueiam o merge — intencional.
- Variabilidade do Lighthouse em CI pode causar flakiness: `numberOfRuns: 3` mitiga, mas em casos extremos pode ser necessário ajustar budgets ou usar `warn` em métricas voláteis.
- Workflow depende de `docker compose up` completo — tempo de CI aumenta ~2-3 min.
- Quando o volume de conteúdo crescer, adicionar rotas de detalhe (conteudos/[slug]) ao sample.
