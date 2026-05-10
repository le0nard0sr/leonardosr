import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { safeFetch } from "@/lib/api/errors";
import { getTechnologies } from "@/lib/api/public";
import { StackContent } from "./stack-content";

export const metadata: Metadata = {
  title: "Stack",
  description:
    "Stack técnica de Leonardo Silva Ribeiro — React, Next.js, TypeScript, Java, Spring Boot e PostgreSQL.",
};

export default async function StackPage() {
  const technologies = await safeFetch(
    getTechnologies,
    [],
    "stack.technologies",
  );

  return (
    <>
      <PageHeader
        eyebrow="Stack"
        title="Tecnologias e ferramentas"
        lede="Visão organizada das tecnologias usadas em produção, com nível de domínio e contexto de uso."
      />
      <Container className="py-12 md:py-16">
        {technologies.length === 0 ? (
          <p className="text-[color:var(--fg-muted)]">Stack em carregamento.</p>
        ) : (
          <StackContent technologies={technologies} />
        )}
      </Container>
    </>
  );
}
