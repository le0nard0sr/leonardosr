# ADR-004 — MDX e segurança editorial

## Status

Aceita

## Contexto

Conteúdos técnicos do site (`ARTICLE`, `TUTORIAL`, `LAB`, `ARCHITECTURE`, `CASE_STUDY`, `TECH_NOTE`, `VIDEO`, `ARTICLE_WITH_VIDEO`) são escritos em MDX e renderizados pelo Next.js. O MDX permite componentes React arbitrários, imports e HTML bruto, abrindo superfície para XSS, vazamento de credenciais via imports remotos, scripts inline e injeção de markup quando o conteúdo for editado por humanos no painel administrativo (M6+).

O backend Spring Boot é o ponto onde o conteúdo é persistido e validado antes de transitar para `PUBLISHED`. O frontend, por sua vez, faz a compilação real do MDX e a renderização — só ele tem visibilidade da árvore JSX final.

## Alternativas consideradas

1. **Validar apenas no frontend** — descartado: o backend é a fronteira de confiança; aceitar MDX inseguro no banco transformaria qualquer leitura subsequente (RSS, OG, JSON-LD, sitemap, exportações) em vetor de ataque.
2. **Confiar em um sanitizador HTML genérico** (ex.: OWASP Java HTML Sanitizer aplicado direto no MDX) — descartado: MDX não é HTML; sanitizar antes da compilação remove tags válidas do Markdown e não cobre JSX.
3. **Permitir HTML bruto com allowlist** — diferido: aumenta a superfície sem ganho editorial claro na v1; reabordável em ADR específica futura caso surja necessidade real.
4. **Validação polimórfica de `type_specific_fields` via DTOs Jackson + Bean Validation** — adotada: uma camada explícita por tipo (`LabFieldsDTO`, `ArchitectureFieldsDTO`) é mais auditável que checagens ad-hoc em `Map<String, Object>`.

## Decisão

MDX é o formato editorial unificado, mas a validação ocorre em **duas camadas**:

**Backend (M2 parcial, M6 completo).** `POST /api/admin/contents/{id}/preview-validate` rejeita:

- linhas começando com `import` (regex `^\\s*import\\s+`);
- HTML bruto identificado por padrão `<tag` lowercase;
- componentes JSX fora de uma allowlist configurável (vazia no M2; biblioteca editorial em M4);
- imagens externas em `![]()` cujo host esteja fora de `site_profile.image_url_allowlist` (vírgula-separada);
- URLs de imagem malformadas — viram erro de validação, não 500.

`type_specific_fields` é validado polimorficamente via Jackson `convertValue(...)` para `LabFieldsDTO` ou `ArchitectureFieldsDTO`, aplicando Bean Validation (`@NotBlank`, `@NotEmpty`, `@NotNull`). Tipos que não usam o campo exigem `null`.

OWASP Java HTML Sanitizer entra como dependência preventiva, sem habilitar HTML bruto na v1.

**Frontend (M4).** Compila o MDX com a biblioteca editorial real (`Callout`, `CodeBlock`, `ComparisonTable`, `ArchitectureDiagram`, etc.) e bloqueia publicação se a renderização falhar. DOMPurify fica como dependência preventiva, exercitada apenas se HTML bruto vier a ser permitido.

A transição `DRAFT → PUBLISHED` só é habilitada quando ambas as camadas reportam OK.

## Consequências

- O banco recebe apenas MDX que sobreviveu a duas validações independentes — superfície de XSS reduzida.
- Allowlist de componentes começa conservadora (vazia) e é refinada quando a biblioteca editorial existir; conteúdos LAB/ARCHITECTURE no seed do M2 só podem usar Markdown puro até M4.
- HTML bruto continua proibido até ADR futura específica que detalhe tags permitidas, sanitização e testes de regressão.
- `type_specific_fields` ganha contrato declarativo verificável por testes (DTOs anotados) em vez de checagens textuais frágeis.
- Conteúdos em produção poderão ser revalidados em massa rodando `preview-validate` sobre o corpus existente — útil quando a allowlist mudar.
