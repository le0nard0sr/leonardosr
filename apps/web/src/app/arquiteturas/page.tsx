import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ArchitectureCard } from "@/components/ui/architecture-card";
import { PageHeader } from "@/components/ui/page-header";
import { safeFetch } from "@/lib/api/errors";
import { getContents } from "@/lib/api/public";

export const metadata: Metadata = {
  title: "Arquiteturas",
  description:
    "Diagramas e estudos de arquitetura de software — sistemas distribuídos, microsserviços e padrões.",
  alternates: { canonical: "/arquiteturas" },
  openGraph: {
    title: "Arquiteturas | Leonardo Silva Ribeiro",
    description:
      "Diagramas e estudos de arquitetura de software — sistemas distribuídos, microsserviços e padrões.",
    url: "https://leonardosr.com.br/arquiteturas",
  },
};

export default async function ArquiteturasPage() {
  const contents = await safeFetch(
    () => getContents({ type: "ARCHITECTURE" }),
    [],
    "arquiteturas.list",
  );

  return (
    <>
      <PageHeader
        eyebrow="Arquiteturas"
        title="Estudos de arquitetura"
        lede="Diagramas, análises e decisões de design para sistemas distribuídos, microsserviços e padrões de software."
      />
      <Container className="py-12 md:py-16">
        {contents.length === 0 ? (
          <p className="text-[color:var(--fg-muted)]">
            Nenhuma arquitetura publicada ainda.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {contents.map((content) => (
              <ArchitectureCard key={content.slug} content={content} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
