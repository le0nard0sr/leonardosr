"use client";

import { useState } from "react";
import { FilterBar } from "@/components/ui/filter-bar";
import { TechCell } from "@/components/ui/tech-cell";
import type { Technology } from "@/lib/api/types";

type StackContentProps = {
  technologies: Technology[];
};

export function StackContent({ technologies }: StackContentProps) {
  const categories = [...new Set(technologies.map((t) => t.category))].sort();
  const [activeCategory, setActiveCategory] = useState("Todas");

  const filtered =
    activeCategory === "Todas"
      ? technologies
      : technologies.filter((t) => t.category === activeCategory);

  const grouped = filtered.reduce<Record<string, Technology[]>>((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech);
    return acc;
  }, {});

  return (
    <div className="mt-8">
      <FilterBar
        options={categories}
        value={activeCategory}
        onChange={setActiveCategory}
        allLabel="Todas"
      />
      <div className="mt-8 grid gap-12">
        {Object.entries(grouped).map(([category, techs]) => (
          <section key={category}>
            <h2 className="mb-4 font-mono text-sm text-[color:var(--fg-faint)]">
              {category}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {techs.map((tech) => (
                <TechCell key={tech.slug} technology={tech} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
