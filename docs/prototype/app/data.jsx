/* global React */
// data.jsx — mock data for the prototype
const { } = React;

const PROFILE = {
  name: "Leonardo Silva Ribeiro",
  initials: "LSR",
  role: "Engenheiro de Software",
  tagline: "Desenvolvimento de soluções web modernas com React, Next.js e Spring Boot — unindo experiência institucional, arquitetura de sistemas e foco em entrega de valor.",
  short: "Construo aplicações web completas há mais de 10 anos, com ênfase em portais corporativos, APIs REST, segurança e arquitetura.",
  location: "Brasília, DF — Brasil",
  email: "contato@leonardosr.com.br",
  privacyEmail: "privacidade@leonardosr.com.br",
  github: "github.com/leonardosr",
  linkedin: "linkedin.com/in/leonardosr",
  youtube: "youtube.com/@leonardosr",
  domain: "leonardosr.com.br",
  status: "Aberto a conversas técnicas e oportunidades selecionadas.",
};

const TECHS = [
  { name: "React", cat: "Frontend", level: "Avançado" },
  { name: "Next.js", cat: "Frontend", level: "Avançado" },
  { name: "TypeScript", cat: "Frontend", level: "Avançado" },
  { name: "Tailwind CSS", cat: "Frontend", level: "Proficiente" },
  { name: "MDX", cat: "Frontend", level: "Proficiente" },
  { name: "Java", cat: "Backend", level: "Avançado" },
  { name: "Spring Boot", cat: "Backend", level: "Avançado" },
  { name: "Spring Security", cat: "Segurança", level: "Avançado" },
  { name: "Spring Data JPA", cat: "Backend", level: "Avançado" },
  { name: "Bean Validation", cat: "Backend", level: "Proficiente" },
  { name: "PostgreSQL", cat: "Banco de dados", level: "Avançado" },
  { name: "Flyway", cat: "Banco de dados", level: "Proficiente" },
  { name: "Postgres FTS", cat: "Banco de dados", level: "Proficiente" },
  { name: "OAuth2 / OIDC", cat: "Segurança", level: "Proficiente" },
  { name: "Keycloak", cat: "Segurança", level: "Proficiente" },
  { name: "JWT", cat: "Segurança", level: "Avançado" },
  { name: "Docker", cat: "DevOps", level: "Proficiente" },
  { name: "GitHub Actions", cat: "DevOps", level: "Proficiente" },
  { name: "Cloudflare", cat: "DevOps", level: "Proficiente" },
  { name: "Liferay", cat: "Portais e integrações", level: "Avançado" },
  { name: "API REST", cat: "Portais e integrações", level: "Avançado" },
  { name: "JUnit", cat: "Qualidade e testes", level: "Proficiente" },
  { name: "Testing Library", cat: "Qualidade e testes", level: "Proficiente" },
  { name: "Playwright", cat: "Qualidade e testes", level: "Iniciante" },
];

const TECH_CATEGORIES = [
  "Frontend",
  "Backend",
  "Banco de dados",
  "Segurança",
  "DevOps",
  "Portais e integrações",
  "Qualidade e testes",
];

const EXPERIENCES = [
  {
    role: "Analista de Sistemas Sênior",
    org: "Órgão Federal — Coordenação de Desenvolvimento",
    period: "2019 — presente",
    location: "Brasília, DF",
    summary: "Desenvolvimento e sustentação de portais corporativos e sistemas internos, com foco em integrações, segurança e arquitetura de aplicações Java e React.",
    bullets: [
      "Liderança técnica na modernização de portal institucional Liferay → Next.js, reduzindo TTFB em 64%.",
      "Projeto e implementação de API REST corporativa em Spring Boot consumida por 12 sistemas internos.",
      "Adoção de OAuth2 + Keycloak como SSO institucional, padronizando autenticação em toda a coordenação.",
      "Mentoria técnica de 4 desenvolvedores juniores em práticas de Spring Boot, testes e revisão de código.",
    ],
    techs: ["Java", "Spring Boot", "Next.js", "Liferay", "Keycloak", "PostgreSQL"],
  },
  {
    role: "Desenvolvedor Java Pleno",
    org: "Empresa de TI — Setor Público",
    period: "2016 — 2019",
    location: "Brasília, DF",
    summary: "Desenvolvimento de sistemas administrativos para órgãos públicos e manutenção de portais Liferay com integrações via web services.",
    bullets: [
      "Implementação de módulos Liferay para gestão de processos com mais de 8 mil usuários ativos.",
      "Integração com mainframe via SOAP/REST, encapsulando complexidade em serviços Spring.",
      "Migração de aplicações JSF/PrimeFaces para arquitetura React + API REST.",
    ],
    techs: ["Java", "Spring", "Liferay", "JSF", "Oracle", "SOAP"],
  },
  {
    role: "Desenvolvedor Web",
    org: "Consultoria",
    period: "2014 — 2016",
    location: "Brasília, DF",
    summary: "Início de carreira em desenvolvimento web, atuando em projetos de portais e sistemas corporativos para clientes de governo.",
    bullets: [
      "Desenvolvimento full-stack em PHP, Java e jQuery em projetos de curta duração.",
      "Primeira exposição a Spring MVC e Hibernate em projetos de modernização.",
      "Aprendizado prático sobre acessibilidade e padrões e-MAG.",
    ],
    techs: ["PHP", "Java", "jQuery", "MySQL"],
  },
];

const PROJECTS = [
  {
    slug: "portal-institucional-nextjs",
    name: "Portal Institucional — Next.js",
    summary: "Modernização de portal institucional de Liferay para Next.js com SSG/ISR, mantendo integração com API legada via Spring Boot.",
    problem: "Portal monolítico em Liferay com TTFB acima de 1.8s e dificuldade para evoluir camada de apresentação independente do backend.",
    solution: "Frontend Next.js com App Router, ISR e SSG; backend Spring Boot expondo API REST documentada em OpenAPI; cache de borda em Cloudflare.",
    techs: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "Cloudflare"],
    results: ["TTFB p75 de 1.820ms → 640ms", "Lighthouse 96/100/100/100", "Build time reduzido em 38%"],
    repo: "github.com/leonardosr/portal-nextjs",
    status: "PUBLISHED",
    featured: true,
    year: "2025",
  },
  {
    slug: "api-rest-corporativa",
    name: "API REST Corporativa",
    summary: "API REST em Spring Boot para uso transversal por sistemas internos, com autenticação OAuth2, versionamento e contratos OpenAPI.",
    problem: "Cada sistema interno reimplementava acesso a dados de servidores e estruturas, causando inconsistências e gargalos.",
    solution: "API canônica versionada em /v1 e /v2, autenticação via Keycloak, cache em Redis e auditoria estruturada.",
    techs: ["Java", "Spring Boot", "Spring Security", "PostgreSQL", "Keycloak", "Redis"],
    results: ["12 sistemas migrados", "Latência média 84ms p95", "Cobertura de testes 87%"],
    repo: "github.com/leonardosr/api-corporativa",
    status: "PUBLISHED",
    featured: true,
    year: "2024",
  },
  {
    slug: "sso-keycloak-springboot",
    name: "SSO Institucional com Keycloak",
    summary: "Padronização de autenticação corporativa via Keycloak + Spring Security, com integração a Active Directory e MFA.",
    problem: "Múltiplos sistemas com autenticações isoladas, sem MFA e sem auditoria centralizada.",
    solution: "Keycloak federando AD, brokers OIDC, themes customizados e Spring Security configurado por resource server.",
    techs: ["Keycloak", "Spring Security", "OAuth2", "OIDC", "Active Directory"],
    results: ["MFA habilitado em 100% dos sistemas críticos", "Auditoria unificada", "Onboarding técnico documentado"],
    repo: "github.com/leonardosr/sso-keycloak",
    status: "PUBLISHED",
    featured: true,
    year: "2024",
  },
  {
    slug: "leonardosr-com-br",
    name: "leonardosr.com.br",
    summary: "Este site — Next.js + Spring Boot + PostgreSQL como projeto demonstrativo real de arquitetura full-stack.",
    problem: "Espaço próprio para portfólio, conteúdo técnico e demonstração prática de decisões arquiteturais.",
    solution: "App Router, MDX, Postgres FTS, Cloudflare R2, Plausible e ADRs versionadas.",
    techs: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "MDX", "Cloudflare R2"],
    results: ["Em desenvolvimento — código aberto"],
    repo: "github.com/leonardosr/leonardosr-com-br",
    status: "PUBLISHED",
    featured: false,
    year: "2026",
  },
  {
    slug: "monitoramento-actuator",
    name: "Stack de Observabilidade — Actuator + Grafana",
    summary: "Padrão de observabilidade para aplicações Spring Boot internas, incluindo métricas, traces e dashboards.",
    problem: "Aplicações sem instrumentação consistente, dificultando diagnóstico de incidentes em produção.",
    solution: "Actuator + Micrometer + Prometheus + Grafana, com dashboards e alerts versionados em Git.",
    techs: ["Spring Boot", "Micrometer", "Prometheus", "Grafana", "Loki"],
    results: ["MTTR reduzido em 41%", "Dashboards reutilizáveis", "Padrão adotado em 7 squads"],
    repo: null,
    status: "PUBLISHED",
    featured: false,
    year: "2023",
  },
  {
    slug: "migracao-jsf-react",
    name: "Migração JSF → React",
    summary: "Estratégia incremental de substituição de telas JSF/PrimeFaces por React, mantendo backend Java estável.",
    problem: "Aplicações JSF antigas com baixa produtividade, difícil manutenção e UX defasada.",
    solution: "Strangler pattern: React renderizado em containers, comunicando-se com endpoints Spring; migração tela a tela.",
    techs: ["React", "Java", "Spring", "JSF", "Webpack"],
    results: ["18 telas migradas em 9 meses", "Bundle 240KB gz", "Time-to-interactive < 1.5s"],
    repo: null,
    status: "PUBLISHED",
    featured: false,
    year: "2022",
  },
];

const TAGS = [
  "Spring Boot", "Next.js", "React", "TypeScript", "PostgreSQL", "Arquitetura",
  "OAuth2", "JWT", "Keycloak", "API REST", "Segurança", "SEO", "Acessibilidade",
  "Testes", "Performance", "Liferay", "Docker", "MDX",
];

const CONTENTS = [
  {
    slug: "spring-boot-camada-storage-abstrata",
    title: "Camada de storage abstrata em Spring Boot com Cloudflare R2",
    summary: "Como modelar uma camada de storage compatível com S3 usando Ports & Adapters, mantendo MinIO no desenvolvimento e R2 em produção.",
    type: "ARTICLE",
    typeLabel: "Artigo",
    tags: ["Spring Boot", "Arquitetura", "Cloudflare"],
    techs: ["Java", "Spring Boot", "Cloudflare R2", "MinIO"],
    publishedAt: "2026-04-22",
    readTime: 11,
    series: "spring-boot-na-pratica",
    seriesIndex: 3,
    featured: true,
  },
  {
    slug: "next-app-router-isr-real-mundo",
    title: "App Router e ISR no mundo real: cache, revalidação e webhooks",
    summary: "Matriz de cache por tipo de página, decisões de ISR vs SSG e como integrar webhooks de admin para revalidação on-demand.",
    type: "ARTICLE",
    typeLabel: "Artigo",
    tags: ["Next.js", "Performance", "Arquitetura"],
    techs: ["Next.js", "TypeScript", "Cloudflare"],
    publishedAt: "2026-04-09",
    readTime: 14,
    series: "react-nextjs",
    seriesIndex: 2,
    featured: true,
  },
  {
    slug: "postgres-fts-busca-pt-br",
    title: "Busca em português com Postgres FTS — coalesce, peso e ranking",
    summary: "Implementação prática de busca full-text em PostgreSQL com dicionário em português, montagem de tsvector via SQL nativo e cuidados com NULL.",
    type: "ARTICLE_WITH_VIDEO",
    typeLabel: "Artigo + Vídeo",
    tags: ["PostgreSQL", "Spring Boot"],
    techs: ["PostgreSQL", "Java", "Spring Data JPA"],
    publishedAt: "2026-03-28",
    readTime: 9,
    duration: "18:42",
    youtubeId: "dQw4w9WgXcQ",
    featured: true,
  },
  {
    slug: "oauth2-keycloak-spring-security",
    title: "OAuth2 + Keycloak + Spring Security — guia institucional",
    summary: "Federação com AD, brokers OIDC, configuração de resource server e os erros que você não quer cometer em produção.",
    type: "ARTICLE",
    typeLabel: "Artigo",
    tags: ["OAuth2", "Keycloak", "Segurança", "Spring Boot"],
    techs: ["Keycloak", "Spring Security", "Java"],
    publishedAt: "2026-03-12",
    readTime: 17,
    series: "seguranca-apis",
    seriesIndex: 1,
  },
  {
    slug: "video-arquitetura-next-spring-postgres",
    title: "Arquitetura: Next.js + Spring Boot + PostgreSQL em 25 minutos",
    summary: "Walkthrough da arquitetura do leonardosr.com.br: separação de domínios, fluxo de dados, cache e decisões de deploy.",
    type: "VIDEO",
    typeLabel: "Vídeo",
    tags: ["Arquitetura", "Next.js", "Spring Boot"],
    techs: ["Next.js", "Spring Boot", "PostgreSQL"],
    publishedAt: "2026-02-25",
    duration: "25:14",
    youtubeId: "dQw4w9WgXcQ",
    featured: true,
  },
  {
    slug: "lab-form-validacao-react-hook-form-zod",
    title: "Formulário com validação — React Hook Form + Zod",
    summary: "Lab didático de formulário acessível, com validação em camadas, tratamento de erros e mensagens em PT-BR.",
    type: "LAB",
    typeLabel: "Laboratório",
    tags: ["React", "Acessibilidade", "TypeScript"],
    techs: ["React", "TypeScript", "Zod"],
    publishedAt: "2026-02-18",
    readTime: 6,
    labFields: {
      demonstration_url: "lab.leonardosr.com.br/form-validacao",
      source_code_url: "github.com/leonardosr/lab-form-validacao",
      is_didactic: true,
      difficulty_level: "BEGINNER",
    },
  },
  {
    slug: "lab-consumo-api-rest-server-actions",
    title: "Consumo de API REST com Server Actions",
    summary: "Lab que compara Server Actions, Route Handlers e fetch direto, mostrando trade-offs práticos.",
    type: "LAB",
    typeLabel: "Laboratório",
    tags: ["Next.js", "API REST"],
    techs: ["Next.js", "TypeScript"],
    publishedAt: "2026-02-04",
    readTime: 8,
    labFields: {
      demonstration_url: "lab.leonardosr.com.br/server-actions",
      source_code_url: "github.com/leonardosr/lab-server-actions",
      is_didactic: true,
      difficulty_level: "INTERMEDIATE",
    },
  },
  {
    slug: "arquitetura-next-spring-postgres",
    title: "Arquitetura — Next.js + Spring Boot + PostgreSQL",
    summary: "Diagrama detalhado, vantagens, riscos e quando adotar essa arquitetura para portais corporativos e produtos próprios.",
    type: "ARCHITECTURE",
    typeLabel: "Arquitetura",
    tags: ["Arquitetura", "Next.js", "Spring Boot", "PostgreSQL"],
    techs: ["Next.js", "Spring Boot", "PostgreSQL"],
    publishedAt: "2026-01-28",
    readTime: 12,
    archFields: {
      components: ["Next.js (App Router)", "Spring Boot API", "PostgreSQL", "Cloudflare R2", "Cloudflare CDN"],
      flow: "Browser → Cloudflare → Next.js (SSG/ISR) → API Spring Boot → PostgreSQL. Mídias servidas direto do R2.",
      advantages: ["Separação clara de responsabilidades", "SEO e performance nativos", "Backend evoluível independentemente"],
      risks: ["Complexidade operacional dupla", "Latência adicional cross-origin", "Necessidade de contrato OpenAPI versionado"],
      whenToUse: "Aplicações com requisitos sérios de SEO, autenticação corporativa e necessidade de evoluir frontend e backend de forma independente.",
    },
  },
  {
    slug: "tutorial-mdx-componentes-editoriais",
    title: "Tutorial: biblioteca de componentes editoriais em MDX",
    summary: "Como construir Callout, CodeBlock e ComparisonTable reutilizáveis, com Storybook e validação por allowlist.",
    type: "TUTORIAL",
    typeLabel: "Tutorial",
    tags: ["MDX", "React", "Next.js"],
    techs: ["Next.js", "MDX", "Storybook"],
    publishedAt: "2026-01-14",
    readTime: 10,
  },
  {
    slug: "case-migracao-liferay-nextjs",
    title: "Estudo de caso: migrando portal Liferay para Next.js",
    summary: "9 meses, 18 telas, zero downtime. As decisões, as dores, e o que faria diferente.",
    type: "CASE_STUDY",
    typeLabel: "Estudo de caso",
    tags: ["Liferay", "Next.js", "Arquitetura"],
    techs: ["Liferay", "Next.js", "Java"],
    publishedAt: "2025-12-20",
    readTime: 16,
  },
  {
    slug: "tech-note-flyway-baseline",
    title: "Tech note — Flyway baseline em projetos legados",
    summary: "Como introduzir Flyway em uma base sem versionamento sem causar surpresa em produção.",
    type: "TECH_NOTE",
    typeLabel: "Tech note",
    tags: ["PostgreSQL", "Spring Boot"],
    techs: ["Flyway", "PostgreSQL", "Spring Boot"],
    publishedAt: "2025-12-08",
    readTime: 4,
  },
];

const SERIES = [
  {
    slug: "spring-boot-na-pratica",
    name: "Spring Boot na prática",
    description: "Série prática sobre Spring Boot em produção: arquitetura, segurança, persistência e operações.",
    coverHint: "spring-boot",
    contentSlugs: [
      "spring-boot-camada-storage-abstrata",
      "postgres-fts-busca-pt-br",
      "oauth2-keycloak-spring-security",
      "tech-note-flyway-baseline",
    ],
    plannedTotal: 8,
  },
  {
    slug: "react-nextjs",
    name: "React e Next.js para aplicações modernas",
    description: "Do App Router às decisões de cache. Foco em aplicações reais, com SEO e performance.",
    coverHint: "react",
    contentSlugs: [
      "next-app-router-isr-real-mundo",
      "tutorial-mdx-componentes-editoriais",
      "lab-consumo-api-rest-server-actions",
    ],
    plannedTotal: 6,
  },
  {
    slug: "seguranca-apis",
    name: "Segurança em APIs",
    description: "OAuth2, OIDC, JWT, CSRF, CORS — o conjunto mínimo para APIs corporativas confiáveis.",
    coverHint: "seguranca",
    contentSlugs: [
      "oauth2-keycloak-spring-security",
    ],
    plannedTotal: 5,
  },
  {
    slug: "arquitetura-aplicacoes",
    name: "Arquitetura de aplicações web",
    description: "Decisões, trade-offs e padrões reutilizáveis em arquiteturas full-stack modernas.",
    coverHint: "arquitetura",
    contentSlugs: [
      "arquitetura-next-spring-postgres",
      "case-migracao-liferay-nextjs",
    ],
    plannedTotal: 7,
  },
];

// Long-form article body for the article detail page (one canonical example)
const ARTICLE_BODY = `
A modelagem de uma camada de storage de mídia parece simples até o momento em que você precisa **trocar o provider** sem reescrever metade da aplicação. É exatamente o problema que Ports & Adapters resolve: separar a intenção do domínio da implementação concreta.

## O problema em concreto

Em projetos Spring Boot que crescem rápido, é comum ver o SDK do S3 espalhado em controllers, services e schedulers. Cada um cria seu próprio cliente, configura credenciais à mão e implementa retry de forma ligeiramente diferente. Quando aparece a oportunidade de migrar para R2 — mais barato, mesmo protocolo — descobrimos que o "compatível com S3" da documentação não é exatamente o que estava sendo usado no código.

A solução começa por reconhecer que **storage é detalhe de infraestrutura**, e não regra de negócio. Nada no domínio precisa saber que existe um bucket, um signing v4, ou um header específico de Cloudflare.

## Definindo a porta

A interface de domínio descreve apenas o que importa para o caso de uso:

\`\`\`java
public interface MediaStorageService {
    UploadIntent createUploadIntent(UploadRequest req);
    void confirmUpload(String storageKey, ConfirmRequest req);
    void delete(String storageKey);
    Optional<MediaMetadata> readMetadata(String storageKey);
}
\`\`\`

Note o que **não** está aqui: bucket, região, credencial, presigner. Isso é detalhe do adapter — não do domínio.

## O adapter para R2

Cloudflare R2 expõe API S3-compatible. Em Java, isso significa que o adapter pode usar o SDK oficial AWS apontando para o endpoint do R2:

\`\`\`java
@Component
@Profile("!local")
class R2MediaStorageAdapter implements MediaStorageService {
    private final S3Client s3;
    private final S3Presigner presigner;
    private final StorageProperties props;

    @Override
    public UploadIntent createUploadIntent(UploadRequest req) {
        var key = generateKey(req);
        var put = PutObjectRequest.builder()
            .bucket(props.bucket())
            .key(key)
            .contentType(req.mimeType())
            .build();
        var signed = presigner.presignPutObject(b -> b
            .signatureDuration(Duration.ofMinutes(15))
            .putObjectRequest(put));
        return new UploadIntent(key, signed.url().toString(), signed.expiration());
    }
}
\`\`\`

## O adapter local com MinIO

Em desenvolvimento, queremos rodar tudo offline. MinIO em Docker Compose preenche o papel:

\`\`\`yaml
minio:
  image: minio/minio:latest
  command: server /data --console-address ":9001"
  ports: ["9000:9000", "9001:9001"]
  environment:
    MINIO_ROOT_USER: minioadmin
    MINIO_ROOT_PASSWORD: minioadmin
\`\`\`

E um adapter alternativo que aponta para \`http://localhost:9000\`. O domínio sequer percebe a diferença.

## Fluxo PENDING → ACTIVE → DELETED

Uploads são processos de duas etapas: cliente pede uma URL pré-assinada, faz PUT direto no storage, e em seguida confirma. Isso evita que o backend manipule binários e libera o servidor para outras tarefas.

> O backend nunca toca no arquivo. Apenas valida que ele existe, marca o registro como \`ACTIVE\` e popula a URL pública.

Um job diário remove registros \`PENDING\` com mais de 24 horas, junto dos arquivos órfãos no storage. Exclusões verificam referências ativas antes de remover de fato.

## Ressalvas

- O \`blur_data_url\` é um *nice-to-have*. Quando a geração falha, o asset continua válido com placeholder padrão.
- O checksum (ETag) ajuda em validações pós-upload, mas em multipart o valor não é o MD5 do arquivo. Documente o comportamento esperado.

## Conclusão

Trocar de provider passa a ser uma decisão econômica, não arquitetural. Você não está preso ao R2, ao S3, nem ao MinIO — está preso à interface, e a interface não muda.
`;

const MESSAGES = [
  { id: 1, name: "Mariana Costa", email: "mariana@empresa.com.br", subject: "Conversa sobre projeto Spring Boot", date: "2026-05-08", status: "new" },
  { id: 2, name: "Recrutamento Tech", email: "recruta@techco.io", subject: "Oportunidade Senior Backend", date: "2026-05-07", status: "new" },
  { id: 3, name: "Pedro Almeida", email: "pedro.almeida@gov.br", subject: "Dúvida sobre artigo de Postgres FTS", date: "2026-05-05", status: "read" },
  { id: 4, name: "Carolina Reis", email: "carol@startup.co", subject: "Convite para palestra", date: "2026-05-02", status: "read" },
  { id: 5, name: "Diego Tavares", email: "dtavares@consultoria.com.br", subject: "Mentoria técnica", date: "2026-04-29", status: "read" },
];

window.MOCK = { PROFILE, TECHS, TECH_CATEGORIES, EXPERIENCES, PROJECTS, TAGS, CONTENTS, SERIES, ARTICLE_BODY, MESSAGES };
