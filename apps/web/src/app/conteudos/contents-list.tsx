"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ContentCard } from "@/components/ui/content-card";
import { FilterBar } from "@/components/ui/filter-bar";
import type { Content } from "@/lib/api/types";

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
};

export function ConteudosList({ contents }: ConteudosListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const raw = searchParams.get("type") ?? "Todos";
  const filter = FILTER_OPTIONS.includes(raw as FilterKey) ? raw : "Todos";

  const filtered =
    filter === "Todos"
      ? contents
      : contents.filter((c) =>
          FILTER_TYPES[filter as FilterKey].includes(c.type),
        );

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "Todos") {
      params.delete("type");
    } else {
      params.set("type", value);
    }
    const qs = params.toString();
    router.replace(`/conteudos${qs ? `?${qs}` : ""}`, { scroll: false });
  }

  return (
    <div>
      <FilterBar
        options={FILTER_OPTIONS}
        value={filter}
        onChange={handleChange}
        allLabel="Todos"
      />
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
