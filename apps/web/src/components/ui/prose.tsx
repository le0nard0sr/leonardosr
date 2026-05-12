import type { HTMLAttributes, PropsWithChildren } from "react";

export function Prose({
  children,
  className = "",
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={`max-w-[var(--max-w-text)] text-base leading-8 text-[color:var(--fg-muted)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
