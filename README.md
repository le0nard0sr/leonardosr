# leonardosr.com.br

Site pessoal e plataforma de conteúdo técnico de Leonardo Silva Ribeiro.

## Requisitos

- Node.js 22 LTS
- npm 10+
- Java 25 LTS
- Maven 3.9+
- Docker e Docker Compose

## Estrutura

- `apps/web`: frontend Next.js com App Router.
- `apps/api`: backend Spring Boot.
- `docs/adr`: decisões arquiteturais.
- `docs/tracking/roadmap.md`: acompanhamento operacional dos marcos.

## Setup local

```bash
npm install
npm run web:dev
```

Em outro terminal:

```bash
cd apps/api
mvn spring-boot:run
```

Ambiente completo:

```bash
docker compose up --build
```

O Docker Compose do Marco 1 sobe web, API, PostgreSQL e MinIO. O Storybook roda separado:

```bash
npm run storybook
```

Depois acesse `http://localhost:6006`.

## Portas

- Web: `http://localhost:3000`
- API: `http://localhost:8080`
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- Actuator health: `http://localhost:8080/actuator/health`
- Storybook: `http://localhost:6006`
- MinIO Console: `http://localhost:9001`
- PostgreSQL: `localhost:5432`

## Qualidade

```bash
npm run lint
npm run typecheck
npm run build
cd apps/api && mvn test spotless:check
```
