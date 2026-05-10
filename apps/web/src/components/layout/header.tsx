import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const nav = [
  ["Início", "/"],
  ["Projetos", "/projetos"],
  ["Conteúdos", "/conteudos"],
  ["Laboratório", "/laboratorio"],
  ["Stack", "/stack"],
  ["Sobre", "/sobre"],
  ["Contato", "/contato"],
] as const;

export function Header() {
  return (
    <header className="border-b border-[color:var(--border)] bg-[color:var(--bg)]/90">
      <Container className="flex min-h-16 items-center justify-between gap-6">
        <Link href="/" className="font-semibold">
          Leonardo SR
        </Link>
        <nav
          aria-label="Principal"
          className="hidden items-center gap-5 text-sm text-[color:var(--fg-muted)] md:flex"
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
        <ThemeToggle />
      </Container>
    </header>
  );
}
