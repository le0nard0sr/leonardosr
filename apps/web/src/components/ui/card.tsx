import type { HTMLAttributes, PropsWithChildren } from "react";

export function Card({
  children,
  className = "",
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={`rounded-[8px] border border-[color:var(--border)] bg-[color:var(--bg-subtle)] p-5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
