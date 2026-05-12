import type { Metadata } from "next";
import { ProseLayout } from "@/components/layout/prose-layout";
import Conteudo from "@/content/legal/privacidade.mdx";

export const metadata: Metadata = {
  title: "Privacidade",
  description:
    "Política de privacidade do site leonardosr.com.br — tratamento de dados, LGPD e cookies.",
  alternates: { canonical: "/privacidade" },
  openGraph: {
    title: "Privacidade | Leonardo Silva Ribeiro",
    description:
      "Política de privacidade do site leonardosr.com.br — tratamento de dados, LGPD e cookies.",
    url: "https://leonardosr.com.br/privacidade",
  },
};

export default function PrivacidadePage() {
  return (
    <ProseLayout
      eyebrow="Legal"
      title="Política de Privacidade"
      lede="Como seus dados são tratados neste site e seus direitos como titular."
    >
      <Conteudo />
    </ProseLayout>
  );
}
