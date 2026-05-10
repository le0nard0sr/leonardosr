"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ProjetoError({ error, reset }: ErrorProps) {
  return (
    <Container className="py-24 text-center">
      <p className="font-mono text-sm text-[color:var(--fg-faint)]">erro</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-normal">
        Não foi possível carregar o projeto
      </h1>
      <p className="mt-4 text-[color:var(--fg-muted)]">{error.message}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>Tentar novamente</Button>
        <Button href="/projetos" variant="secondary">
          Ver todos os projetos
        </Button>
      </div>
    </Container>
  );
}
