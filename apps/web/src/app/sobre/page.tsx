import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Prose } from "@/components/ui/prose";
import { safeFetch } from "@/lib/api/errors";
import { getProfile } from "@/lib/api/public";
import type { Profile } from "@/lib/api/types";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Trajetória técnica, abordagem e valores de Leonardo Silva Ribeiro — engenheiro de software com foco em React, Next.js e Spring Boot.",
  alternates: { canonical: "/sobre" },
  openGraph: {
    title: "Sobre | Leonardo Silva Ribeiro",
    description:
      "Trajetória técnica, abordagem e valores de Leonardo Silva Ribeiro — engenheiro de software com foco em React, Next.js e Spring Boot.",
    url: "https://leonardosr.com.br/sobre",
  },
};

const FALLBACK_PROFILE: Profile = {
  id: 0,
  displayName: "Leonardo Silva Ribeiro",
  professionalTitle: "React · Next.js · Spring Boot",
  headline: "Arquitetura e desenvolvimento web moderno com clareza técnica.",
  shortBio: "Portfólio profissional e hub de conteúdos técnicos.",
  fullBio: "",
};

export default async function SobrePage() {
  const profile = await safeFetch(
    getProfile,
    FALLBACK_PROFILE,
    "sobre.profile",
  );

  return (
    <>
      <PageHeader
        eyebrow="Sobre"
        title={profile.displayName}
        lede={profile.headline}
      />
      <Container className="py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          <div>
            <Prose>
              {profile.fullBio ? (
                <p>{profile.fullBio}</p>
              ) : (
                <p>{profile.shortBio}</p>
              )}
            </Prose>
          </div>

          <aside className="grid gap-4 self-start">
            <div className="rounded-[8px] border border-[color:var(--border)] bg-[color:var(--bg-subtle)] p-5">
              <p className="text-xs uppercase tracking-[0.08em] text-[color:var(--fg-faint)]">
                Resumo
              </p>
              <dl className="mt-4 grid gap-3 text-sm">
                <div>
                  <dt className="text-[color:var(--fg-faint)]">Papel</dt>
                  <dd className="font-medium text-[color:var(--fg)]">
                    {profile.professionalTitle}
                  </dd>
                </div>
                {profile.locationLabel && (
                  <div>
                    <dt className="text-[color:var(--fg-faint)]">Local</dt>
                    <dd className="font-medium text-[color:var(--fg)]">
                      {profile.locationLabel}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="rounded-[8px] border border-[color:var(--border)] bg-[color:var(--bg-subtle)] p-5">
              <p className="text-xs uppercase tracking-[0.08em] text-[color:var(--fg-faint)]">
                Links
              </p>
              <div className="mt-4 grid gap-2 text-sm">
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[color:var(--fg-muted)] transition hover:text-[color:var(--fg)]"
                  >
                    GitHub ↗
                  </a>
                )}
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[color:var(--fg-muted)] transition hover:text-[color:var(--fg)]"
                  >
                    LinkedIn ↗
                  </a>
                )}
                {profile.youtubeUrl && (
                  <a
                    href={profile.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[color:var(--fg-muted)] transition hover:text-[color:var(--fg)]"
                  >
                    YouTube ↗
                  </a>
                )}
                {profile.twitterUrl && (
                  <a
                    href={profile.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[color:var(--fg-muted)] transition hover:text-[color:var(--fg)]"
                  >
                    Twitter / X ↗
                  </a>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button href="/curriculo">Ver currículo</Button>
              <Button href="/contato" variant="secondary">
                Entrar em contato
              </Button>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
