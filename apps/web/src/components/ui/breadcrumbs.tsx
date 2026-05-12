import Link from "next/link";

type BreadcrumbItem = { label: string; href?: string };

type Props = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 font-mono text-xs text-[color:var(--fg-faint)]"
    >
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <span aria-hidden="true">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-[color:var(--fg)]">
              {item.label}
            </Link>
          ) : (
            <span className="text-[color:var(--fg-muted)]" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
