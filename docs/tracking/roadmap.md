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
- Evidência/verificação: `AGENTS.md` atualizado com stack fixada, regra de tracking, ciclo Git/GitHub e checagem de secrets antes de commit/push; `README.md` atualizado com comando do Storybook; `.gitignore` atualizado para ignorar `*.tsbuildinfo`; `docs/adr/013-postgresql-local-flyway-spotless.md` criado para registrar PostgreSQL 17 local, Flyway e Spotless; `docs/tracking/roadmap.md` atualizado com pendências pós-validação.
- Pendências: nenhuma adicional.
- Última atualização: 2026-05-10
