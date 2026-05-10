# ADR-009 — Busca com PostgreSQL Full-Text Search

## Status

Aceita

## Contexto

A plataforma precisa buscar conteúdos (`content`) e projetos (`project`) em português, com filtros e ranking simples, sobre o corpus editorial do site (artigos, tutoriais, laboratórios, arquiteturas e estudos de caso). Volume esperado nos primeiros 12 meses é baixo (centenas de documentos), mas com requisito de relevância razoável, suporte a stemming PT-BR e busca complementar por nome de tag.

A topologia já inclui PostgreSQL como banco transacional. Adicionar um motor externo (Meilisearch, Typesense, OpenSearch) ampliaria custo de infra, deploy e operação no M2 sem benefício proporcional ao volume.

## Alternativas consideradas

1. **Meilisearch / Typesense gerenciado** — descartado para a v1: introduz infra adicional, sincronização de índice, latência de propagação e custo. Reavaliar quando o corpus passar de poucos milhares de documentos ou quando ranking sofisticado (typo tolerance, faceting) for requisito editorial.
2. **`ILIKE` com índices `gin_trgm_ops`** — descartado: não tolera stemming PT-BR (plurais, conjugações), não calcula relevância, e exige extensão `pg_trgm` adicional para performance. Bom para "contém" simples, ruim para busca editorial.
3. **PostgreSQL FTS com `to_tsvector` + `ts_rank_cd`** — adotada.
4. **Atualização do `tsvector` via trigger SQL** — descartada para a v1: empurra lógica de normalização de MDX (remover JSX/imports/chaves) para PL/pgSQL, dificultando teste e evolução. Optamos por atualizar o `tsvector` na camada de aplicação (`SearchService.refreshContentVector`/`refreshProjectVector`) chamada pelo seed e por handlers de publicação. Reavaliável se houver fluxos que escrevam direto no banco sem passar pelo backend.

## Decisão

Usar PostgreSQL Full-Text Search com configuração `portuguese`, colunas `search_vector TSVECTOR` em `content` e `project`, índices GIN sobre essas colunas e atualização em camada de aplicação.

Antes de indexar MDX, o `SearchService` normaliza o body removendo tags HTML, linhas `import` e chaves (`{`/`}`) para evitar ruído de nomes de componentes JSX e props. Os campos `title`/`name`, `summary` e `body` são concatenados com `coalesce(..., '')` para tolerar nulos.

A query de busca pública combina:

- `search_vector @@ plainto_tsquery('portuguese', :q)` — busca semântica;
- `EXISTS (... tag.name ILIKE '%' || :q || '%')` — busca complementar por nome de tag;
- ranking por `ts_rank_cd(search_vector, query)`;
- filtro `status = 'PUBLISHED' AND published_at <= NOW()` (PRD §6.7).

## Consequências

- A busca opera no banco já provisionado, sem nova infra ou job de sincronização.
- Stemming PT-BR cobre conjugações e plurais comuns (ex.: "arquiteturas" casa "arquitetura").
- Índice GIN em `search_vector` mantém latência baixa para o volume previsto (seek sub-100ms até dezenas de milhares de documentos).
- Atualizações de `tsvector` precisam ser disparadas explicitamente pelo backend ao publicar/editar — fluxos que ignorem o `SearchService` deixam o índice desatualizado. Mitigação: handlers de publicação no M6 chamarão o refresh, e há possibilidade de job de reconciliação no M8.
- Quando o corpus crescer ou houver demanda por features avançadas (typo tolerance, faceted search, sinônimos editoriais), a porta `SearchService` permite plugar um adapter externo sem mudar os controllers públicos.
- O ranking é simples (`ts_rank_cd` sem boost por seção) — suficiente para o M2; pesos por campo (`setweight`) podem ser introduzidos quando a UI de busca pedir destaque por título vs. corpo.
