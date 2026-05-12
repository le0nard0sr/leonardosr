import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { LabCard } from "@/components/ui/lab-card";
import { PageHeader } from "@/components/ui/page-header";
import { safeFetch } from "@/lib/api/errors";
import { getContents } from "@/lib/api/public";

export const metadata: Metadata = {
  title: "Laboratório",
  description: "Experimentos técnicos, provas de conceito e demos interativas.",
  alternates: { canonical: "/laboratorio" },
  openGraph: {
    title: "Laboratório | Leonardo Silva Ribeiro",
    description:
      "Experimentos técnicos, provas de conceito e demos interativas.",
    url: "https://leonardosr.com.br/laboratorio",
  },
};

export default async function LaboratorioPage() {
  const contents = await safeFetch(
    () => getContents({ type: "LAB" }),
    [],
    "laboratorio.list",
  );

  return (
    <>
      <PageHeader
        eyebrow="Laboratório"
        title="Experimentos técnicos"
        lede="Provas de conceito, demos interativas e projetos didáticos com código-fonte aberto."
      />
      <Container className="py-12 md:py-16">
        {contents.length === 0 ? (
          <p className="text-[color:var(--fg-muted)]">
            Nenhum experimento publicado ainda.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {contents.map((content) => (
              <LabCard key={content.slug} content={content} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
