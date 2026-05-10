import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { safeFetch } from "@/lib/api/errors";
import { getExperiences, getProfile, getTechnologies } from "@/lib/api/public";
import type { Profile } from "@/lib/api/types";

export const metadata: Metadata = {
  title: "Currículo",
  description:
    "Currículo de Leonardo Silva Ribeiro — experiência profissional, stack técnica e projetos.",
};

const FALLBACK_PROFILE: Profile = {
  id: 0,
  displayName: "Leonardo Silva Ribeiro",
  professionalTitle: "React · Next.js · Spring Boot",
  headline: "Arquitetura e desenvolvimento web moderno.",
  shortBio: "Portfólio profissional e hub de conteúdos técnicos.",
  fullBio: "",
};

export default async function CurriculoPage() {
  const [profile, experiences, technologies] = await Promise.all([
    safeFetch(getProfile, FALLBACK_PROFILE, "curriculo.profile"),
    safeFetch(getExperiences, [], "curriculo.experiences"),
    safeFetch(getTechnologies, [], "curriculo.technologies"),
  ]);

  const principalTechs = technologies.filter(
    (t) =>
      t.level === "principal" ||
      t.level === "avancado" ||
      t.level === "avançado",
  );

  return (
    <>
      <PageHeader
        eyebrow="Currículo"
        title="Resumo profissional"
        lede="Versão web com foco em experiência, stack e links profissionais."
      />
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          {/* MAIN */}
          <article className="min-w-0">
            <header className="border-b border-[color:var(--border)] pb-8">
              <h2 className="text-3xl font-semibold tracking-normal">
                {profile.displayName}
              </h2>
              <p className="mt-2 font-mono text-sm text-[color:var(--fg-muted)]">
                {profile.professionalTitle}
                {profile.locationLabel ? ` · ${profile.locationLabel}` : ""}
              </p>
              <div className="mt-3 flex flex-wrap gap-4 font-mono text-xs text-[color:var(--fg-faint)]">
                {profile.contactEmailAlias && (
                  <a href={`mailto:${profile.contactEmailAlias}`}>
                    {profile.contactEmailAlias}
                  </a>
                )}
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github ↗
                  </a>
                )}
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    linkedin ↗
                  </a>
                )}
              </div>
            </header>

            {profile.shortBio && (
              <section className="border-b border-[color:var(--border)] py-8">
                <h3 className="text-xs uppercase tracking-[0.08em] text-[color:var(--fg-faint)]">
                  Resumo
                </h3>
                <p className="mt-3 leading-7 text-[color:var(--fg-muted)]">
                  {profile.headline}
                </p>
              </section>
            )}

            {principalTechs.length > 0 && (
              <section className="border-b border-[color:var(--border)] py-8">
                <h3 className="text-xs uppercase tracking-[0.08em] text-[color:var(--fg-faint)]">
                  Stack principal
                </h3>
                <p className="mt-3 font-mono text-sm text-[color:var(--fg-muted)]">
                  {principalTechs.map((t) => t.name).join(" · ")}
                </p>
              </section>
            )}

            {experiences.length > 0 && (
              <section className="py-8">
                <h3 className="text-xs uppercase tracking-[0.08em] text-[color:var(--fg-faint)]">
                  Experiência
                </h3>
                <div className="mt-4 grid gap-6">
                  {experiences.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold">{exp.role}</p>
                          <p className="text-sm text-[color:var(--fg-muted)]">
                            {exp.organization}
                          </p>
                        </div>
                        <span className="shrink-0 font-mono text-xs text-[color:var(--fg-faint)]">
                          {new Date(exp.startDate).getFullYear()}
                          {" – "}
                          {exp.current
                            ? "atual"
                            : exp.endDate
                              ? new Date(exp.endDate).getFullYear()
                              : "atual"}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[color:var(--fg-muted)]">
                        {exp.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* SIDE */}
          <aside className="grid gap-4 self-start">
            <div className="rounded-[8px] border border-[color:var(--border)] bg-[color:var(--bg-subtle)] p-5">
              <p className="text-xs uppercase tracking-[0.08em] text-[color:var(--fg-faint)]">
                Download
              </p>
              <div className="mt-4 grid gap-2">
                {profile.curriculumUrl ? (
                  <Button href={profile.curriculumUrl}>Baixar PDF ↓</Button>
                ) : (
                  <p className="text-sm text-[color:var(--fg-muted)]">
                    PDF em preparação.
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-[8px] border border-[color:var(--border)] bg-[color:var(--bg-subtle)] p-5">
              <p className="text-xs uppercase tracking-[0.08em] text-[color:var(--fg-faint)]">
                Links
              </p>
              <div className="mt-4 grid gap-2 font-mono text-sm">
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[color:var(--fg-muted)] transition hover:text-[color:var(--fg)]"
                  >
                    LinkedIn ↗
                  </a>
                )}
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[color:var(--fg-muted)] transition hover:text-[color:var(--fg)]"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
