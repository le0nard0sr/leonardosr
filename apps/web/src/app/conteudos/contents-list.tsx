"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ContentCard } from "@/components/ui/content-card";
import { FilterBar } from "@/components/ui/filter-bar";
import type { Content, Tag, Technology } from "@/lib/api/types";

type FilterKey = "Artigos" | "Vídeos" | "Lab" | "Arquitetura";

const FILTER_TYPES: Record<FilterKey, Content["type"][]> = {
  Artigos: ["ARTICLE", "ARTICLE_WITH_VIDEO"],
  Vídeos: ["VIDEO", "ARTICLE_WITH_VIDEO"],
  Lab: ["LAB"],
  Arquitetura: ["ARCHITECTURE"],
};

const FILTER_OPTIONS: FilterKey[] = ["Artigos", "Vídeos", "Lab", "Arquitetura"];

type ConteudosListProps = {
  contents: Content[];
  tags: Tag[];
  technologies: Technology[];
};

export function ConteudosList({
  contents,
  tags,
  technologies,
}: ConteudosListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const rawType = searchParams.get("type") ?? "Todos";
  const filter = FILTER_OPTIONS.includes(rawType as FilterKey)
    ? rawType
    : "Todos";
  const activeTag = searchParams.get("tag") ?? "";
  const activeTech = searchParams.get("technology") ?? "";

  const filtered = contents.filter((c) => {
    const typeOk =
      filter === "Todos" || FILTER_TYPES[filter as FilterKey].includes(c.type);
    const tagOk = !activeTag || c.tags.some((t) => t.slug === activeTag);
    const techOk =
      !activeTech || c.technologies.some((t) => t.slug === activeTech);
    return typeOk && tagOk && techOk;
  });

  function buildUrl(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, val] of Object.entries(updates)) {
      if (val) {
        params.set(key, val);
      } else {
        params.delete(key);
      }
    }
    const qs = params.toString();
    return `/conteudos${qs ? `?${qs}` : ""}`;
  }

  function handleTypeChange(value: string) {
    router.replace(buildUrl({ type: value === "Todos" ? "" : value }), {
      scroll: false,
    });
  }

  function handleTagChange(e: React.ChangeEvent<HTMLSelectElement>) {
    router.replace(buildUrl({ tag: e.target.value }), { scroll: false });
  }

  function handleTechChange(e: React.ChangeEvent<HTMLSelectElement>) {
    router.replace(buildUrl({ technology: e.target.value }), { scroll: false });
  }

  const selectClass =
    "h-9 rounded-[4px] border border-[color:var(--border)] bg-[color:var(--bg)] px-3 font-mono text-xs text-[color:var(--fg-muted)] transition hover:text-[color:var(--fg)] focus:outline-none focus:ring-1 focus:ring-[color:var(--accent)]";

  return (
    <div>
      <FilterBar
        options={FILTER_OPTIONS}
        value={filter}
        onChange={handleTypeChange}
        allLabel="Todos"
      />

      {(tags.length > 0 || technologies.length > 0) && (
        <div className="mt-4 flex flex-wrap gap-3">
          {tags.length > 0 && (
            <select
              value={activeTag}
              onChange={handleTagChange}
              className={selectClass}
              aria-label="Filtrar por tag"
            >
              <option value="">Todas as tags</option>
              {tags.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name}
                </option>
              ))}
            </select>
          )}
          {technologies.length > 0 && (
            <select
              value={activeTech}
              onChange={handleTechChange}
              className={selectClass}
              aria-label="Filtrar por tecnologia"
            >
              <option value="">Todas as tecnologias</option>
              {technologies.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="mt-8 text-[color:var(--fg-muted)]">
          Nenhum conteúdo disponível.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((content) => (
            <ContentCard key={content.slug} content={content} />
          ))}
        </div>
      )}
    </div>
  );
}
