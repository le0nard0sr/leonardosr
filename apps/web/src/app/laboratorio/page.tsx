import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

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

export default function LaboratorioPage() {
  return (
    <PageHeader
      eyebrow="Em breve"
      title="Laboratório"
      lede="Experimentos técnicos e provas de conceito estão a caminho. Esta seção será ativada no próximo marco."
    />
  );
}
