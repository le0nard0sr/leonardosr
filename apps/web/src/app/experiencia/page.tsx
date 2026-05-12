import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { TimelineRow } from "@/components/ui/timeline-row";
import { safeFetch } from "@/lib/api/errors";
import { getExperiences } from "@/lib/api/public";

export const metadata: Metadata = {
  title: "Experiência",
  description:
    "Trajetória profissional de Leonardo Silva Ribeiro — cargos, organizações e principais entregas.",
  alternates: { canonical: "/experiencia" },
  openGraph: {
    title: "Experiência | Leonardo Silva Ribeiro",
    description:
      "Trajetória profissional de Leonardo Silva Ribeiro — cargos, organizações e principais entregas.",
    url: "https://leonardosr.com.br/experiencia",
  },
};

export default async function ExperienciaPage() {
  const experiences = await safeFetch(getExperiences, [], "experiencia.list");

  return (
    <>
      <PageHeader
        eyebrow="Experiência"
        title="Trajetória profissional"
        lede="Histórico de atuação com desenvolvimento, integração e arquitetura de aplicações web."
      />
      <Container className="py-12 md:py-16">
        {experiences.length === 0 ? (
          <p className="text-[color:var(--fg-muted)]">
            Experiências em carregamento.
          </p>
        ) : (
          <div>
            {experiences.map((experience) => (
              <TimelineRow key={experience.id} experience={experience} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
