import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const nav = [
  ["Início", "/"],
  ["Projetos", "/projetos"],
  ["Conteúdos", "/conteudos"],
  ["Arquiteturas", "/arquiteturas"],
  ["Stack", "/stack"],
  ["Sobre", "/sobre"],
  ["Contato", "/contato"],
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--bg)]/90 backdrop-blur">
      <Container className="flex min-h-16 items-center justify-between gap-6">
        <Link href="/" className="font-semibold tracking-normal">
          leonardo<span className="text-[color:var(--fg-muted)]">sr</span>
        </Link>
        <nav
          aria-label="Principal"
          className="hidden items-center gap-5 text-sm text-[color:var(--fg-muted)] lg:flex"
        >
          {nav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="transition hover:text-[color:var(--fg)]"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/contato"
            className="hidden h-9 items-center rounded-[6px] border border-[color:var(--border-strong)] px-3 text-sm text-[color:var(--fg)] transition hover:bg-[color:var(--bg-subtle)] md:inline-flex"
          >
            Conversar
          </Link>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
