import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { safeFetch } from "@/lib/api/errors";
import { getProjects } from "@/lib/api/public";
import { ProjectsList } from "./projects-list";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Projetos reais de Leonardo Silva Ribeiro — decisões técnicas, stack e resultados.",
  alternates: { canonical: "/projetos" },
  openGraph: {
    title: "Projetos | Leonardo Silva Ribeiro",
    description:
      "Projetos reais de Leonardo Silva Ribeiro — decisões técnicas, stack e resultados.",
    url: "https://leonardosr.com.br/projetos",
  },
};

export default async function ProjetosPage() {
  const projects = await safeFetch(getProjects, [], "projetos.list");

  return (
    <>
      <PageHeader
        eyebrow="Projetos"
        title="Construções reais"
        lede="Sistemas em produção, demonstrações e estudos de arquitetura."
      />
      <Container className="py-12 md:py-16">
        {projects.length === 0 ? (
          <p className="text-[color:var(--fg-muted)]">
            Projetos em carregamento.
          </p>
        ) : (
          <ProjectsList projects={projects} />
        )}
      </Container>
    </>
  );
}
