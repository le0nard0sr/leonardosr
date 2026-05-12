type StatProps = {
  value: string;
  label: string;
};

export function Stat({ value, label }: StatProps) {
  return (
    <div className="border-l border-[color:var(--border-strong)] pl-4">
      <div className="font-mono text-xl font-semibold text-[color:var(--fg)]">
        {value}
      </div>
      <div className="mt-1 text-xs uppercase tracking-[0.08em] text-[color:var(--fg-muted)]">
        {label}
      </div>
    </div>
  );
}
