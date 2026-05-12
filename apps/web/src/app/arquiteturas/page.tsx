import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

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

export default function ArquiteturasPage() {
  return (
    <PageHeader
      eyebrow="Em breve"
      title="Arquiteturas"
      lede="Diagramas e estudos de arquitetura de software estão a caminho. Esta seção será ativada no próximo marco."
    />
  );
}
