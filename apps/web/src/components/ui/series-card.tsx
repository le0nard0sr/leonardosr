import Link from "next/link";
import type { Series } from "@/lib/api/types";
import { Card } from "./card";

type SeriesCardProps = {
  series: Series;
};

export function SeriesCard({ series }: SeriesCardProps) {
  const total = series.contents.length;
  const published = series.contents.filter((i) => i.content.publishedAt).length;
  const progressPct = total > 0 ? Math.round((published / total) * 100) : 0;

  return (
    <Link href={`/conteudos/series/${series.slug}`} className="block h-full">
      <Card className="flex h-full flex-col gap-4 transition hover:border-[color:var(--accent)]">
        <div className="text-xs uppercase tracking-[0.08em] text-[color:var(--fg-faint)]">
          Série · {total} {total === 1 ? "conteúdo" : "conteúdos"}
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold leading-snug tracking-normal">
            {series.title}
          </h3>
          <p className="text-sm leading-6 text-[color:var(--fg-muted)]">
            {series.description}
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-1.5">
          <div className="flex items-center justify-between font-mono text-xs text-[color:var(--fg-faint)]">
            <span>Progresso</span>
            <span>
              {published}/{total} publicados
            </span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-[color:var(--border)]">
            <div
              className="h-full rounded-full bg-[color:var(--accent)]"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </Card>
    </Link>
  );
}
