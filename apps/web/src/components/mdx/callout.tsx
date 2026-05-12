import type { ReactNode } from "react";

type Variant = "info" | "tip" | "warning" | "danger";

const STYLES: Record<
  Variant,
  { border: string; bg: string; icon: string; label: string }
> = {
  info: {
    border: "border-blue-500/40",
    bg: "bg-blue-500/5",
    icon: "ℹ",
    label: "Info",
  },
  tip: {
    border: "border-green-500/40",
    bg: "bg-green-500/5",
    icon: "✦",
    label: "Dica",
  },
  warning: {
    border: "border-amber-500/40",
    bg: "bg-amber-500/5",
    icon: "⚠",
    label: "Atenção",
  },
  danger: {
    border: "border-red-500/40",
    bg: "bg-red-500/5",
    icon: "✕",
    label: "Perigo",
  },
};

type CalloutProps = {
  variant?: Variant;
  title?: string;
  children: ReactNode;
};

export function Callout({ variant = "info", title, children }: CalloutProps) {
  const s = STYLES[variant];
  return (
    <div
      className={`my-6 rounded-[6px] border ${s.border} ${s.bg} p-4`}
      role="note"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 shrink-0 text-sm" aria-hidden>
          {s.icon}
        </span>
        <div className="min-w-0">
          {title ? (
            <p className="mb-1 text-sm font-semibold text-[color:var(--fg)]">
              {title}
            </p>
          ) : (
            <p className="mb-1 text-sm font-semibold text-[color:var(--fg)]">
              {s.label}
            </p>
          )}
          <div className="text-sm leading-7 text-[color:var(--fg-muted)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
