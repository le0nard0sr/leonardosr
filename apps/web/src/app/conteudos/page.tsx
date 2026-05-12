import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { safeFetch } from "@/lib/api/errors";
import { getContents } from "@/lib/api/public";
import { ConteudosList } from "./contents-list";

export const metadata: Metadata = {
  title: "Conteúdos",
  description:
    "Artigos, vídeos, laboratórios e arquiteturas técnicas sobre React, Next.js, Spring Boot e arquitetura de software.",
  alternates: { canonical: "/conteudos" },
  openGraph: {
    title: "Conteúdos | Leonardo Silva Ribeiro",
    description:
      "Artigos, vídeos, laboratórios e arquiteturas técnicas sobre React, Next.js, Spring Boot e arquitetura de software.",
    url: "https://leonardosr.com.br/conteudos",
  },
};

export default async function ConteudosPage() {
  const contents = await safeFetch(getContents, [], "conteudos.list");

  return (
    <>
      <PageHeader
        eyebrow="Conteúdos"
        title="Hub editorial"
        lede="Artigos, vídeos, laboratórios e arquiteturas técnicas sobre React, Next.js, Spring Boot e arquitetura de software."
      />
      <Container className="py-12 md:py-16">
        <Suspense>
          <ConteudosList contents={contents} />
        </Suspense>
      </Container>
    </>
  );
}
