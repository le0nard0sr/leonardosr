import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SeriesCard } from "@/components/ui/series-card";
import { PageHeader } from "@/components/ui/page-header";
import { safeFetch } from "@/lib/api/errors";
import { getSeries } from "@/lib/api/public";

export const metadata: Metadata = {
  title: "Séries",
  description:
    "Séries de conteúdo técnico sobre React, Next.js, Spring Boot e arquitetura de software.",
  alternates: { canonical: "/conteudos/series" },
  openGraph: {
    title: "Séries | Leonardo Silva Ribeiro",
    description:
      "Séries de conteúdo técnico sobre React, Next.js, Spring Boot e arquitetura de software.",
    url: "https://leonardosr.com.br/conteudos/series",
  },
};

export default async function SeriesPage() {
  const series = await safeFetch(getSeries, [], "series.list");

  return (
    <>
      <PageHeader
        eyebrow="Séries"
        title="Séries de conteúdo"
        lede="Conjuntos organizados de artigos e vídeos para aprofundamento progressivo em um tema."
      />
      <Container className="py-12 md:py-16">
        {series.length === 0 ? (
          <p className="text-[color:var(--fg-muted)]">
            Nenhuma série publicada ainda.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {series.map((s) => (
              <SeriesCard key={s.slug} series={s} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
