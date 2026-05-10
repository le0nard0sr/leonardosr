import Link from "next/link";
import { Container } from "@/components/ui/container";
import { safeFetch } from "@/lib/api/errors";
import { getProfile } from "@/lib/api/public";

export async function Footer() {
  const profile = await safeFetch(
    getProfile,
    {
      id: 0,
      displayName: "Leonardo Silva Ribeiro",
      professionalTitle: "React, Next.js e Spring Boot",
      headline: "Arquitetura e desenvolvimento web moderno.",
      shortBio: "Portfólio profissional e hub de conteúdo técnico.",
      fullBio: "Perfil em carregamento.",
    },
    "footer.profile",
  );

  return (
    <footer className="border-t border-[color:var(--border)]">
      <Container className="grid gap-8 py-8 text-sm text-[color:var(--fg-muted)] md:grid-cols-[1fr_auto]">
        <div>
          <p className="font-medium text-[color:var(--fg)]">
            {profile.displayName}
          </p>
          <p className="mt-2 max-w-md">{profile.shortBio}</p>
          <p className="mt-4">
            © {new Date().getFullYear()} Leonardo Silva Ribeiro.
          </p>
        </div>
        <div className="grid gap-3 md:text-right">
          <Link href="/privacidade">Privacidade</Link>
          <Link href="/termos">Termos</Link>
          {profile.contactEmailAlias ? (
            <a href={`mailto:${profile.contactEmailAlias}`}>
              {profile.contactEmailAlias}
            </a>
          ) : null}
          {profile.privacyEmailAlias ? (
            <a href={`mailto:${profile.privacyEmailAlias}`}>
              {profile.privacyEmailAlias}
            </a>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
