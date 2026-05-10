import type { PropsWithChildren } from "react";

export function Badge({ children }: PropsWithChildren) {
  return (
    <span className="inline-flex rounded-[4px] border border-[color:var(--border-strong)] bg-[color:var(--accent-soft)] px-2.5 py-1 text-xs font-medium text-[color:var(--accent)]">
      {children}
    </span>
  );
}
