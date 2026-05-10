import type { Technology } from "@/lib/api/types";

type TechCellProps = {
  technology: Technology;
};

const levelWidths: Record<string, string> = {
  principal: "w-full",
  avancado: "w-5/6",
  avançado: "w-5/6",
  intermediario: "w-2/3",
  intermediário: "w-2/3",
  iniciante: "w-1/3",
};

export function TechCell({ technology }: TechCellProps) {
  const level = technology.level?.toLowerCase() ?? "principal";
  const width = levelWidths[level] ?? "w-2/3";

  return (
    <div className="rounded-[8px] border border-[color:var(--border)] bg-[color:var(--bg-subtle)] p-4">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-semibold">{technology.name}</h3>
        <span className="text-xs text-[color:var(--fg-faint)]">
          {technology.category}
        </span>
      </div>
      {technology.description ? (
        <p className="mt-3 text-sm leading-6 text-[color:var(--fg-muted)]">
          {technology.description}
        </p>
      ) : null}
      <div className="mt-4 h-1.5 rounded-full bg-[color:var(--bg-mute)]">
        <div
          className={`h-full rounded-full bg-[color:var(--accent)] ${width}`}
        />
      </div>
    </div>
  );
}
