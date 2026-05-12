import Link from "next/link";
import type { Content } from "@/lib/api/types";
import { Card } from "./card";

type ArchitectureCardProps = {
  content: Content;
};

export function ArchitectureCard({ content }: ArchitectureCardProps) {
  return (
    <Link href={`/arquiteturas/${content.slug}`} className="block h-full">
      <Card className="flex h-full flex-col gap-4 transition hover:border-[color:var(--accent)]">
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-[color:var(--fg-faint)]">
          Arquitetura
        </span>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold leading-snug tracking-normal">
            {content.title}
          </h3>
          <p className="text-sm leading-6 text-[color:var(--fg-muted)]">
            {content.summary}
          </p>
        </div>

        {content.tags.length > 0 ? (
          <div className="mt-auto flex flex-wrap gap-2">
            {content.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.slug}
                className="rounded-[4px] border border-[color:var(--border)] px-2 py-1 text-xs text-[color:var(--fg-muted)]"
              >
                {tag.name}
              </span>
            ))}
          </div>
        ) : null}
      </Card>
    </Link>
  );
}
