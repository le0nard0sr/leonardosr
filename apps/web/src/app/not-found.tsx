import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-normal text-[color:var(--accent)]">
        404
      </p>
      <h1 className="mt-4 text-4xl font-semibold">Página não encontrada.</h1>
      <p className="mx-auto mt-4 max-w-xl text-[color:var(--fg-muted)]">
        A página que você procura não existe ou foi movida.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button href="/">Ir para o início</Button>
        <Button href="/conteudos" variant="secondary">
          Ver conteúdos
        </Button>
        <Button href="/projetos" variant="secondary">
          Ver projetos
        </Button>
        <Button href="/contato" variant="secondary">
          Entre em contato
        </Button>
      </div>
    </Container>
  );
}
