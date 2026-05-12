import Link from "next/link";
import type { Content } from "@/lib/api/types";
import { Card } from "./card";

const DIFFICULTY_LABEL: Record<string, string> = {
  BEGINNER: "Iniciante",
  INTERMEDIATE: "Intermediário",
  ADVANCED: "Avançado",
};

type LabCardProps = {
  content: Content;
};

export function LabCard({ content }: LabCardProps) {
  const fields = content.typeSpecificFields as Record<string, unknown> | null;
  const difficulty =
    fields && typeof fields.difficultyLevel === "string"
      ? fields.difficultyLevel
      : null;
  const isDidactic =
    fields && typeof fields.isDidactic === "boolean"
      ? fields.isDidactic
      : false;

  return (
    <Link href={`/laboratorio/${content.slug}`} className="block h-full">
      <Card className="flex h-full flex-col gap-4 transition hover:border-[color:var(--accent)]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-[color:var(--fg-faint)]">
            Lab
          </span>
          {difficulty ? (
            <span className="rounded-[4px] border border-[color:var(--border)] px-2 py-0.5 font-mono text-xs text-[color:var(--fg-muted)]">
              {DIFFICULTY_LABEL[difficulty] ?? difficulty}
            </span>
          ) : null}
          {isDidactic ? (
            <span className="rounded-[4px] border border-[color:var(--border)] px-2 py-0.5 font-mono text-xs text-[color:var(--fg-muted)]">
              Didático
            </span>
          ) : null}
        </div>

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
