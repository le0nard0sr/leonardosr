"use client";

type FilterBarProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  allLabel?: string;
};

export function FilterBar({
  options,
  value,
  onChange,
  allLabel = "Todas",
}: FilterBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto border-b border-[color:var(--border)] pb-4">
      {[allLabel, ...options].map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={[
            "h-9 shrink-0 rounded-[4px] border px-3 font-mono text-xs transition",
            value === option
              ? "border-[color:var(--accent)] bg-[color:var(--accent-soft)] text-[color:var(--accent)]"
              : "border-[color:var(--border)] text-[color:var(--fg-muted)] hover:text-[color:var(--fg)]",
          ].join(" ")}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
