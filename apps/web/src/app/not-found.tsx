import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

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
      <div className="mt-8">
        <Button href="/">Voltar para o início</Button>
      </div>
    </Container>
  );
}
