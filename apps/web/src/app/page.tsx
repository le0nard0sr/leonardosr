import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProjectCard } from "@/components/ui/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stat } from "@/components/ui/stat";
import { safeFetch } from "@/lib/api/errors";
import { getExperiences, getProfile, getProjects } from "@/lib/api/public";
import type { Profile } from "@/lib/api/types";

export const metadata: Metadata = {
  title: "Início",
  description:
    "Portfólio profissional e hub de conteúdo técnico de Leonardo Silva Ribeiro — React, Next.js e Spring Boot.",
};

const FALLBACK_PROFILE: Profile = {
  id: 0,
  displayName: "Leonardo Silva Ribeiro",
  professionalTitle: "React · Next.js · Spring Boot",
  headline: "Arquitetura e desenvolvimento web moderno com clareza técnica.",
  shortBio: "Portfólio profissional e hub de conteúdos técnicos.",
  fullBio: "",
  locationLabel: "Brasil",
};

export default async function HomePage() {
  const [profile, projects, experiences] = await Promise.all([
    safeFetch(getProfile, FALLBACK_PROFILE, "home.profile"),
    safeFetch(getProjects, [], "home.projects"),
    safeFetch(getExperiences, [], "home.experiences"),
  ]);

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const teaserExperiences = experiences.slice(0, 2);

  return (
    <>
      {/* HERO */}
      <section className="border-b border-[color:var(--border)]">
        <Container className="py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
            <div>
              <p className="font-mono text-sm text-[color:var(--fg-muted)]">
                {profile.professionalTitle}
                {profile.locationLabel ? ` · ${profile.locationLabel}` : ""}
              </p>
              <h1 className="mt-5 text-5xl font-semibold leading-tight tracking-normal md:text-7xl">
                {profile.displayName}
              </h1>
              <p className="mt-6 max-w-2xl text-xl leading-8 text-[color:var(--fg-muted)]">
                {profile.headline}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/projetos">Ver projetos</Button>
                <Button href="/contato" variant="secondary">
                  Conversar
                </Button>
              </div>
              <div className="mt-12 flex flex-wrap gap-8">
                <Stat value="10+" label="Anos de carreira" />
                <Stat value="12+" label="Sistemas em produção" />
                <Stat
                  value="Full-stack"
                  label="React · Next.js · Spring Boot"
                />
              </div>
            </div>
            <aside className="hidden self-start lg:block">
              <div className="rounded-[8px] border border-[color:var(--border)] bg-[color:var(--bg-subtle)] p-5">
                <p className="mb-3 font-mono text-xs text-[color:var(--fg-faint)]">
                  ~/profile.json
                </p>
                <pre className="overflow-auto font-mono text-sm leading-7 text-[color:var(--fg-muted)]">
                  {`{
  "nome": "${profile.displayName}",
  "stack": [
    "Next.js", "React",
    "Spring Boot",
    "PostgreSQL"
  ],
  "disponível": true
}`}
                </pre>
                <div className="mt-3 flex items-center gap-2 font-mono text-xs text-[color:var(--fg-faint)]">
                  <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                  uptime · ativo
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* PROJETOS EM DESTAQUE */}
      {featuredProjects.length > 0 && (
        <section className="border-b border-[color:var(--border)]">
          <Container className="py-16 md:py-20">
            <div className="flex items-end justify-between gap-4">
              <SectionHeading
                eyebrow="01 · Projetos em destaque"
                title="Construções recentes"
              />
              <Link
                href="/projetos"
                className="hidden shrink-0 font-mono text-xs text-[color:var(--fg-muted)] transition hover:text-[color:var(--fg)] md:block"
              >
                todos os projetos →
              </Link>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
            <div className="mt-8 md:hidden">
              <Button href="/projetos" variant="secondary">
                Todos os projetos
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* EXPERIÊNCIA TEASER */}
      {teaserExperiences.length > 0 && (
        <section className="border-b border-[color:var(--border)]">
          <Container className="py-16 md:py-20">
            <div className="flex items-end justify-between gap-4">
              <SectionHeading
                eyebrow="02 · Trajetória"
                title="Experiência profissional"
              />
              <Link
                href="/experiencia"
                className="hidden shrink-0 font-mono text-xs text-[color:var(--fg-muted)] transition hover:text-[color:var(--fg)] md:block"
              >
                ver completo →
              </Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {teaserExperiences.map((exp) => (
                <div
                  key={exp.id}
                  className="rounded-[8px] border border-[color:var(--border)] bg-[color:var(--bg-subtle)] p-5"
                >
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
                  <p className="mt-3 text-sm leading-6 text-[color:var(--fg-muted)]">
                    {exp.summary}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA FINAL */}
      <section>
        <Container className="py-16 text-center md:py-24">
          <h2 className="text-3xl font-semibold tracking-normal md:text-4xl">
            Vamos conversar?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[color:var(--fg-muted)]">
            {profile.shortBio}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contato">Entrar em contato</Button>
            <Button href="/curriculo" variant="secondary">
              Ver currículo
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
