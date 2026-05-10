# ADR-003 — Modelo editorial unificado

## Status

Aceita

## Contexto

O produto terá artigos, vídeos, tutoriais, estudos de caso, laboratórios, arquiteturas e séries. Conteúdos precisam compartilhar busca, tags, SEO e relacionamento entre si.

## Decisão

Usar um modelo editorial unificado em `content`.

`LAB` e `ARCHITECTURE` são tipos de `content` com campos próprios em `type_specific_fields`, validados por DTOs específicos. `SERIES` não é tipo de conteúdo; série é uma coleção própria ligada por `series_content` com `sort_order`.

## Consequências

- Busca, tags, SEO e publicação ficam centralizados.
- Campos específicos são tratados por validação por tipo.
- Séries podem ordenar conteúdos sem duplicar o modelo editorial.
