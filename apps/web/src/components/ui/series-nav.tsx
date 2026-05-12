import Link from "next/link";
import type { Content } from "@/lib/api/types";

type SeriesNavProps = {
  prev: Content | null;
  next: Content | null;
  seriesTitle: string;
  seriesSlug: string;
};

export function SeriesNav({
  prev,
  next,
  seriesTitle,
  seriesSlug,
}: SeriesNavProps) {
  return (
    <nav
      aria-label="Navegação da série"
      className="rounded-[8px] border border-[color:var(--border)] bg-[color:var(--bg-subtle)] p-5"
    >
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-[color:var(--fg-faint)]">
        Série:{" "}
        <Link
          href={`/conteudos/series/${seriesSlug}`}
          className="text-[color:var(--fg-muted)] hover:text-[color:var(--accent)]"
        >
          {seriesTitle}
        </Link>
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        {prev ? (
          <Link
            href={`/conteudos/${prev.slug}?series=${seriesSlug}`}
            className="group flex min-w-0 flex-col gap-1"
          >
            <span className="font-mono text-xs text-[color:var(--fg-faint)]">
              ← Anterior
            </span>
            <span className="truncate text-sm font-medium group-hover:text-[color:var(--accent)]">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/conteudos/${next.slug}?series=${seriesSlug}`}
            className="group flex min-w-0 flex-col items-end gap-1 text-right"
          >
            <span className="font-mono text-xs text-[color:var(--fg-faint)]">
              Próximo →
            </span>
            <span className="truncate text-sm font-medium group-hover:text-[color:var(--accent)]">
              {next.title}
            </span>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
