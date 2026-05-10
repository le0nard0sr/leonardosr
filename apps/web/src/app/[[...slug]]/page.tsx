import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const pages: Record<
  string,
  { eyebrow: string; title: string; description: string }
> = {
  "/": {
    eyebrow: "Portfólio e conteúdo técnico",
    title: "Leonardo Silva Ribeiro",
    description:
      "Desenvolvimento de soluções web modernas com React, Next.js e Spring Boot, unindo experiência institucional, arquitetura de sistemas e foco em entrega de valor.",
  },
  "/sobre": {
    eyebrow: "Sobre",
    title: "Trajetória técnica com foco em sistemas web completos.",
    description:
      "Página base para apresentação profissional, perfil, valores técnicos e links principais.",
  },
  "/experiencia": {
    eyebrow: "Experiência",
    title: "Experiência em portais corporativos, APIs e integrações.",
    description:
      "Linha do tempo profissional e principais entregas entram nos próximos marcos.",
  },
  "/stack": {
    eyebrow: "Stack",
    title: "React, Next.js, TypeScript, Java, Spring Boot e PostgreSQL.",
    description:
      "Visão organizada da stack técnica, níveis de domínio e contexto de uso.",
  },
  "/projetos": {
    eyebrow: "Projetos",
    title: "Projetos reais com decisões, resultados e arquitetura.",
    description:
      "Listagem e detalhes de projetos serão conectados ao modelo de dados nos próximos marcos.",
  },
  "/conteudos": {
    eyebrow: "Conteúdos",
    title: "Artigos, vídeos, séries, tutoriais e estudos de caso.",
    description:
      "Hub editorial preparado para MDX, SEO técnico e páginas dedicadas por conteúdo.",
  },
  "/laboratorio": {
    eyebrow: "Laboratório",
    title: "Experimentos didáticos e demonstrações práticas.",
    description:
      "Labs serão conteúdos do tipo LAB com campos específicos validados no backend.",
  },
  "/arquiteturas": {
    eyebrow: "Arquiteturas",
    title: "Diagramas e decisões arquiteturais explicadas com contexto.",
    description:
      "Arquiteturas serão conteúdos do tipo ARCHITECTURE com campos específicos.",
  },
  "/curriculo": {
    eyebrow: "Currículo",
    title: "Resumo profissional para recrutadores e gestores técnicos.",
    description:
      "Versão web do currículo com foco em experiência, stack e links profissionais.",
  },
  "/contato": {
    eyebrow: "Contato",
    title: "Canal direto para conversas técnicas e oportunidades.",
    description:
      "Formulário funcional e notificação por e-mail serão implementados em marcos posteriores.",
  },
  "/privacidade": {
    eyebrow: "Privacidade",
    title: "Política de privacidade.",
    description:
      "Página legal obrigatória, preparada para detalhar tratamento de dados e LGPD.",
  },
  "/termos": {
    eyebrow: "Termos",
    title: "Termos de uso.",
    description:
      "Página legal obrigatória para regras de uso do site e conteúdos publicados.",
  },
};

type PageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export default async function PublicPage({ params }: PageProps) {
  const { slug = [] } = await params;
  const path = slug.length === 0 ? "/" : `/${slug.join("/")}`;
  const page = pages[path];

  if (!page) {
    notFound();
  }

  return (
    <Container className="py-16 md:py-24">
      <div className="max-w-4xl">
        <Badge>{page.eyebrow}</Badge>
        <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-normal md:text-6xl">
          {page.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--fg-muted)]">
          {page.description}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/projetos">Ver projetos</Button>
          <Button href="/conteudos" variant="secondary">
            Explorar conteúdos
          </Button>
        </div>
      </div>

      <section className="mt-20 grid gap-4 md:grid-cols-3">
        <Card>
          <SectionHeading
            eyebrow="Arquitetura"
            title="Next.js + Spring Boot"
            compact
          />
          <p className="mt-4 text-sm leading-6 text-[color:var(--fg-muted)]">
            Fundação preparada para SEO, API tipada, PostgreSQL, ADRs e evolução
            por marcos.
          </p>
        </Card>
        <Card>
          <SectionHeading
            eyebrow="Conteúdo"
            title="Modelo editorial unificado"
            compact
          />
          <p className="mt-4 text-sm leading-6 text-[color:var(--fg-muted)]">
            Artigos, vídeos, labs e arquiteturas compartilham tags, busca, SEO e
            publicação.
          </p>
        </Card>
        <Card>
          <SectionHeading
            eyebrow="Qualidade"
            title="Design system e tracking"
            compact
          />
          <p className="mt-4 text-sm leading-6 text-[color:var(--fg-muted)]">
            Componentes base documentados no Storybook e execução acompanhada
            por roadmap.
          </p>
        </Card>
      </section>
    </Container>
  );
}
