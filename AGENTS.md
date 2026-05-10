# AGENTS.md

Responda sempre em português do Brasil.

## Fonte de verdade

- Use `docs/prd/prd_leonardosr_site_pessoal_v2.md` como fonte principal de produto, arquitetura, requisitos e Definition of Done.
- Use `docs/prototype/` apenas como referência visual descartável: navegação, densidade, hierarquia, tom, tokens e padrões de tela. Não copie a arquitetura do protótipo, CDN, Babel no browser, hash router ou dados mockados como implementação final.
- Use `docs/tracking/roadmap.md` como controle operacional de execução dos marcos.
- O PRD é referência de produto; o roadmap é a fonte oficial de progresso, evidências, pendências e bloqueios.

## Tracking de execução

- Após concluir qualquer atividade ou marco, atualize `docs/tracking/roadmap.md` com status e evidência.
- Não marque item como `Concluído` sem evidência verificável.
- Registre bloqueios no tracking antes de devolver a tarefa ao usuário.

## Ciclo Git/GitHub

- Use branches por marco, começando por `m1/fundacao-tecnica-design-system`; para marcos seguintes, mantenha o padrão `m{numero}/{descricao-curta}`.
- Crie commits convencionais, em português, agrupados por intenção e sem misturar mudanças fora do escopo.
- Para publicação de marco, abra PR como draft e use `gh` para autenticação, inspeção remota e criação de PR quando disponível.
- Antes de qualquer commit ou push, revise `git status`, o diff e o staged diff em busca de secrets.
- Nunca versione `.env`, tokens, senhas, chaves privadas, certificados ou credenciais reais; versione apenas `.env.example` com valores fictícios.
- Se houver suspeita de secret no diff ou no histórico, interrompa a publicação e registre o bloqueio em `docs/tracking/roadmap.md`.

## Produto

- O projeto é o site pessoal e plataforma de conteúdo técnico `leonardosr.com.br`.
- Deve funcionar como portfólio profissional, hub de conteúdos técnicos, vitrine de arquitetura e base de autoridade sobre React, Next.js e Spring Boot.
- Tom do produto: profissional, claro, minimalista, técnico sem excesso acadêmico, didático, confiável e direto.

## Stack obrigatória

- Frontend: Next.js App Router, React, TypeScript estrito, Tailwind CSS v4, MDX, Storybook, Shiki, npm e fontes locais via `next/font/local`.
- Backend: Java 25 LTS, Spring Boot 4.0.6, Spring Framework 7.x, Maven, Spring Web, Spring Data JPA, Spring Security, Spring Session, Bean Validation, Flyway, OpenAPI/Swagger e Actuator.
- Banco: PostgreSQL com Full-Text Search nativo em português.
- Infra local: Docker Compose com frontend, backend, PostgreSQL 17 e MinIO.

## Decisões que não devem ser alteradas sem ADR

- Conteúdos usam modelo editorial unificado.
- `LAB` e `ARCHITECTURE` são tipos de `content` com `type_specific_fields` validados por DTOs próprios.
- `SERIES` não é tipo de conteúdo; série é coleção via `series_content` com `sort_order`.
- O banco de dados vira fonte de verdade para conteúdos publicados e rascunhos após ativação do admin.
- RSS é rota do Next.js em `/rss.xml`, não endpoint do backend.
- Autenticação admin usa cookie de sessão HttpOnly/Secure com CSRF explícito, não JWT.
- Papel inicial único: `ADMIN`; não implementar RBAC granular na primeira versão.
- Templates de e-mail ficam no backend com Thymeleaf; não usar React Email na versão inicial.

## Segurança e compliance

- Validar e sanitizar MDX em duas camadas: backend com OWASP Java HTML Sanitizer e regras de domínio; frontend com compilação real e DOMPurify quando HTML bruto for permitido.
- Restringir CORS conforme a topologia definida no PRD.
- Registrar ADR-012 antes de implementar autenticação administrativa.
- Mensagens de contato devem ser anonimizadas após 12 meses via Spring Scheduling; não usar soft delete como solução LGPD principal.

## UI e experiência

- Preserve a linha visual do protótipo: interface minimalista, densa, editorial, com alto contraste, tema claro/escuro e acento terroso.
- Use layout responsivo, foco visível, navegação por teclado e hierarquia semântica correta.
- Páginas públicas exigem metadata, URL amigável, headings bem estruturados, Open Graph quando aplicável e atenção a Lighthouse.
- Componentes de design system ou componentes editoriais MDX devem ser documentados no Storybook.

## Rotas principais

- Públicas: `/`, `/sobre`, `/experiencia`, `/stack`, `/projetos`, `/projetos/[slug]`, `/conteudos`, `/conteudos/artigos`, `/conteudos/videos`, `/conteudos/series`, `/conteudos/[slug]`, `/laboratorio`, `/laboratorio/[slug]`, `/arquiteturas`, `/arquiteturas/[slug]`, `/curriculo`, `/contato`, `/privacidade`, `/termos`, `/rss.xml`.
- Admin: `/admin`, `/admin/conteudos`, `/admin/videos`, `/admin/projetos`, `/admin/tags`, `/admin/series`, `/admin/tecnologias`, `/admin/experiencias`, `/admin/midias`, `/admin/mensagens`, `/admin/perfil`, `/admin/configuracoes/seo`.

## Definition of Done

- Build executado com sucesso.
- Testes aplicáveis passando.
- Responsividade e acessibilidade básica verificadas.
- SEO considerado em toda página pública.
- Console sem erros visíveis.
- OpenAPI atualizado para qualquer endpoint público ou administrativo.
- ADR criado em `docs/adr/` para decisão arquitetural não óbvia.
- Storybook atualizado para componentes de design system ou editoriais.
- Validação de segurança aplicada em entrada de usuário, MDX, upload, contato e admin.
- Tracking atualizado conforme a seção "Tracking de execução".
