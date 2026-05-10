import type { Metadata } from "next";
import { ProseLayout } from "@/components/layout/prose-layout";
import Conteudo from "@/content/legal/termos.mdx";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos de uso do site leonardosr.com.br — direitos autorais, licenças e limitação de responsabilidade.",
};

export default function TermosPage() {
  return (
    <ProseLayout
      eyebrow="Legal"
      title="Termos de Uso"
      lede="Regras de uso do site, licenças de conteúdo e limitação de responsabilidade."
    >
      <Conteudo />
    </ProseLayout>
  );
}
