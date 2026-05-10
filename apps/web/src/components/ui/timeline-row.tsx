import type { Experience } from "@/lib/api/types";

type TimelineRowProps = {
  experience: Experience;
};

export function TimelineRow({ experience }: TimelineRowProps) {
  return (
    <article className="grid gap-4 border-t border-[color:var(--border)] py-8 md:grid-cols-[220px_1fr]">
      <div className="font-mono text-sm text-[color:var(--fg-muted)]">
        {formatPeriod(
          experience.startDate,
          experience.endDate,
          experience.current,
        )}
      </div>
      <div>
        <h2 className="text-2xl font-semibold tracking-normal">
          {experience.role}
        </h2>
        <p className="mt-1 text-sm text-[color:var(--fg-muted)]">
          {experience.organization}
        </p>
        <p className="mt-4 leading-7 text-[color:var(--fg-muted)]">
          {experience.description || experience.summary}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {experience.technologies.map((technology) => (
            <span
              key={technology.slug}
              className="rounded-[4px] bg-[color:var(--bg-mute)] px-2.5 py-1 text-xs text-[color:var(--fg-muted)]"
            >
              {technology.name}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function formatPeriod(start: string, end?: string | null, current?: boolean) {
  const startYear = new Date(start).getFullYear();
  if (current) {
    return `${startYear} - atual`;
  }
  return `${startYear} - ${end ? new Date(end).getFullYear() : "atual"}`;
}
