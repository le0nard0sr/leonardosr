import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Conteúdos",
  description:
    "Artigos, vídeos e séries técnicas sobre React, Next.js, Spring Boot e arquitetura de software.",
  alternates: { canonical: "/conteudos" },
  openGraph: {
    title: "Conteúdos | Leonardo Silva Ribeiro",
    description:
      "Artigos, vídeos e séries técnicas sobre React, Next.js, Spring Boot e arquitetura de software.",
    url: "https://leonardosr.com.br/conteudos",
  },
};

export default function ConteudosPage() {
  return (
    <PageHeader
      eyebrow="Em breve"
      title="Conteúdos"
      lede="Artigos, vídeos e séries técnicas estão a caminho. Esta seção será ativada no próximo marco."
    />
  );
}
