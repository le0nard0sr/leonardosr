import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  PropsWithChildren,
} from "react";

type ButtonProps = PropsWithChildren<
  {
    href?: string;
    variant?: "primary" | "secondary";
  } & ButtonHTMLAttributes<HTMLButtonElement> &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">
>;

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const classes = [
    "inline-flex h-10 items-center justify-center rounded-[6px] border px-4 text-sm font-medium transition",
    variant === "primary"
      ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-white hover:bg-[color:var(--accent-strong)]"
      : "border-[color:var(--border-strong)] bg-transparent text-[color:var(--fg)] hover:bg-[color:var(--bg-subtle)]",
    className,
  ].join(" ");

  if (href) {
    const linkHref = href as Parameters<typeof Link>[0]["href"];

    return (
      <Link href={linkHref} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
