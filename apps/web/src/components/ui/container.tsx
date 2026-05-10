import type { HTMLAttributes, PropsWithChildren } from "react";

export function Container({
  children,
  className = "",
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--max-w)] px-5 md:px-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
