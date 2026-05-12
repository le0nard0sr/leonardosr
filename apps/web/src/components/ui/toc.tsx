"use client";

import { useEffect, useRef, useState } from "react";
import type { TocItem } from "@/lib/toc";

type TocProps = {
  items: TocItem[];
  collapsible?: boolean;
};

export function Toc({ items, collapsible }: TocProps) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0 },
    );

    headings.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [items]);

  if (items.length === 0) return null;

  const list = (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item.id} className={item.level === 3 ? "pl-3" : undefined}>
          <a
            href={`#${item.id}`}
            className={[
              "block leading-snug transition-colors",
              activeId === item.id
                ? "text-[color:var(--accent)]"
                : "text-[color:var(--fg-faint)] hover:text-[color:var(--fg-muted)]",
            ].join(" ")}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );

  if (collapsible) {
    return (
      <details className="rounded-[6px] border border-[color:var(--border)] p-3">
        <summary className="cursor-pointer select-none font-mono text-xs uppercase tracking-[0.08em] text-[color:var(--fg-faint)]">
          Neste artigo
        </summary>
        <nav aria-label="Índice" className="mt-3 text-sm">
          {list}
        </nav>
      </details>
    );
  }

  return (
    <nav aria-label="Índice" className="text-sm">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.08em] text-[color:var(--fg-faint)]">
        Neste artigo
      </p>
      {list}
    </nav>
  );
}
