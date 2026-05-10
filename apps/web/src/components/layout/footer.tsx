import Link from "next/link";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)]">
      <Container className="flex flex-col gap-4 py-8 text-sm text-[color:var(--fg-muted)] md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Leonardo Silva Ribeiro.</p>
        <div className="flex gap-4">
          <Link href="/privacidade">Privacidade</Link>
          <Link href="/termos">Termos</Link>
        </div>
      </Container>
    </footer>
  );
}
