import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ContentCard } from "@/components/ui/content-card";
import { PageHeader } from "@/components/ui/page-header";
import { safeFetch } from "@/lib/api/errors";
import { getContents } from "@/lib/api/public";

export const metadata: Metadata = {
  title: "Artigos",
  description:
    "Artigos técnicos sobre React, Next.js, Spring Boot e arquitetura de software.",
  alternates: { canonical: "/conteudos/artigos" },
  openGraph: {
    title: "Artigos | Leonardo Silva Ribeiro",
    description:
      "Artigos técnicos sobre React, Next.js, Spring Boot e arquitetura de software.",
    url: "https://leonardosr.com.br/conteudos/artigos",
  },
};

export default async function ArtigosPage() {
  const contents = await safeFetch(
    () => getContents({ type: "ARTICLE" }),
    [],
    "artigos.list",
  );

  return (
    <>
      <PageHeader
        eyebrow="Artigos"
        title="Artigos técnicos"
        lede="Textos aprofundados sobre React, Next.js, Spring Boot e padrões de arquitetura."
      />
      <Container className="py-12 md:py-16">
        {contents.length === 0 ? (
          <p className="text-[color:var(--fg-muted)]">
            Nenhum artigo publicado ainda.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {contents.map((content) => (
              <ContentCard key={content.slug} content={content} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
