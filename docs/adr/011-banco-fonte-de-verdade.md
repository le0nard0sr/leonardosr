# ADR-011 — Banco como fonte de verdade editorial

## Status

Aceita

## Contexto

Durante M1–M5, o repositório Git carrega o trabalho editorial inicial (seeds em `M2SeedData`) para evitar páginas vazias e permitir desenvolvimento das listagens, FTS e fluxos de mídia sem dependência de um painel administrativo. A partir do M6, o admin entra em produção e passa a ser o único caminho oficial para criar, editar, publicar e arquivar conteúdos, projetos, tags, séries, tecnologias, experiências, mídias, perfil e SEO.

A pergunta é: depois do M6, **onde mora a verdade editorial?** Em arquivos versionados no Git (com migração via Flyway/scripts) ou no banco PostgreSQL gerenciado pelo admin?

## Alternativas consideradas

1. **Git como fonte de verdade permanente** (modelo "content-as-code", semelhante a sites Jekyll/Hugo) — descartado: o admin é parte do produto entregue, e fluxo editorial via PR/merge é fricção desnecessária para o autor único da plataforma. Também complica revisões e rollbacks de campos longos como `body` MDX e `type_specific_fields`.
2. **Híbrido com sincronização bidirecional Git ↔ banco** — descartado: complexidade alta, risco de divergência, e necessidade de estratégia de merge para campos editados nos dois lados. Sem ganho proporcional ao tamanho do projeto.
3. **Banco como fonte de verdade pós-M6** (decisão atual): o admin escreve direto no PostgreSQL, e o repositório mantém apenas seeds idempotentes para desenvolvimento e exemplos.

## Decisão

A partir da ativação do admin no Marco 6, o banco PostgreSQL passa a ser a **fonte de verdade** para conteúdos publicados, rascunhos, projetos, tags, séries, tecnologias, experiências, mídias, perfil do site e configuração SEO.

O repositório Git pode manter:

- **Seeds idempotentes** (`M2SeedData` ou equivalente) para desenvolvimento local e onboarding, sempre verificando `count() == 0` antes de inserir e nunca incluindo credenciais reais ou senhas em texto puro.
- **Migrations Flyway** que evoluem o esquema, nunca o conteúdo editorial em produção.
- **Migrações editoriais excepcionais** (importação de massa, reorganização de tags, etc.) via script versionado em `scripts/`, executado manualmente, com auditoria registrada em `audit_log` e descrito em PR específico.

Backups do PostgreSQL passam a ser o mecanismo primário de recuperação de conteúdo (M8 entrega backup automatizado com retenção e teste de restore).

## Consequências

- O M6 assume governança do conteúdo: sem PR/merge para publicar artigo; sem sync entre Git e banco.
- O ciclo de revisão editorial passa a ser feito no próprio admin (rascunho, preview-validate, publicar) em vez de via Git.
- Riscos novos: perda do banco implica perda de conteúdo. Mitigação: backup diário em M8, teste de restore documentado, replicação de leitura como evolução posterior se SLA exigir.
- O repositório Git deixa de ser histórico do conteúdo. Para auditoria, contamos com `audit_log` (M6) e backups versionados.
- Seeds permanecem úteis para dev local e ambientes efêmeros, mas precisam ser claros sobre serem dados de exemplo (não produção). Convenção: textos de seed começam com "Conteúdo demonstrativo" ou referência ao Marco 2.
- Eventuais ferramentas de "exportar conteúdo para markdown" podem ser escritas no futuro como utilitário de portabilidade, sem afetar a fonte de verdade.
- Secrets, senhas e hashes reais nunca entram em SQL versionado nem em seeds — `ADMIN_INITIAL_PASSWORD_HASH` continua vindo de variável de ambiente.
