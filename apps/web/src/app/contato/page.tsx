import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { safeFetch } from "@/lib/api/errors";
import { getProfile } from "@/lib/api/public";
import type { Profile } from "@/lib/api/types";
import { submitContactAction } from "./actions";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com Leonardo Silva Ribeiro para conversas técnicas e oportunidades.",
};

const FALLBACK_PROFILE: Profile = {
  id: 0,
  displayName: "Leonardo Silva Ribeiro",
  professionalTitle: "",
  headline: "",
  shortBio: "",
  fullBio: "",
};

export default async function ContatoPage() {
  const profile = await safeFetch(
    getProfile,
    FALLBACK_PROFILE,
    "contato.profile",
  );

  return (
    <>
      <PageHeader
        eyebrow="Contato"
        title="Vamos conversar"
        lede="Disponível para conversas técnicas, projetos e oportunidades."
      />
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <div>
            <ContactForm action={submitContactAction} />
          </div>

          <aside className="grid gap-4 self-start">
            <div className="rounded-[8px] border border-[color:var(--border)] bg-[color:var(--bg-subtle)] p-5">
              <p className="text-xs uppercase tracking-[0.08em] text-[color:var(--fg-faint)]">
                Canais diretos
              </p>
              <div className="mt-4 grid gap-3 text-sm">
                {profile.contactEmailAlias ? (
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                    <a
                      href={`mailto:${profile.contactEmailAlias}`}
                      className="font-mono text-[color:var(--fg-muted)] transition hover:text-[color:var(--fg)]"
                    >
                      {profile.contactEmailAlias}
                    </a>
                  </div>
                ) : null}
                {profile.linkedinUrl ? (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[color:var(--fg-muted)] transition hover:text-[color:var(--fg)]"
                  >
                    LinkedIn ↗
                  </a>
                ) : null}
                {profile.githubUrl ? (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[color:var(--fg-muted)] transition hover:text-[color:var(--fg)]"
                  >
                    GitHub ↗
                  </a>
                ) : null}
              </div>
            </div>

            <div className="rounded-[8px] border border-[color:var(--border)] bg-[color:var(--bg-subtle)] p-5">
              <p className="text-xs uppercase tracking-[0.08em] text-[color:var(--fg-faint)]">
                LGPD
              </p>
              <p className="mt-3 text-xs leading-5 text-[color:var(--fg-muted)]">
                Sua mensagem é armazenada por até 12 meses e anonimizada
                automaticamente após esse prazo.
                {profile.privacyEmailAlias ? (
                  <>
                    {" "}
                    Para solicitar exclusão, escreva para{" "}
                    <a
                      href={`mailto:${profile.privacyEmailAlias}`}
                      className="font-mono underline"
                    >
                      {profile.privacyEmailAlias}
                    </a>
                    .
                  </>
                ) : null}
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
