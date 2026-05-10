"use client";

import { useState } from "react";
import { FilterBar } from "@/components/ui/filter-bar";
import { ProjectCard } from "@/components/ui/project-card";
import type { Project } from "@/lib/api/types";

type ProjectsListProps = {
  projects: Project[];
};

export function ProjectsList({ projects }: ProjectsListProps) {
  const allTechs = [
    ...new Set(projects.flatMap((p) => p.technologies.map((t) => t.name))),
  ].sort();
  const [filter, setFilter] = useState("Todas");

  const filtered =
    filter === "Todas"
      ? projects
      : projects.filter((p) => p.technologies.some((t) => t.name === filter));

  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => !featured || p.id !== featured.id);

  return (
    <div className="mt-8">
      <FilterBar options={allTechs} value={filter} onChange={setFilter} />

      {filtered.length === 0 ? (
        <p className="mt-8 text-[color:var(--fg-muted)]">
          Nenhum projeto com essa tecnologia.
        </p>
      ) : (
        <>
          {featured && (
            <div className="mt-8">
              <p className="mb-3 font-mono text-xs text-[color:var(--fg-faint)]">
                Em destaque
              </p>
              <ProjectCard project={featured} featured />
            </div>
          )}
          {rest.length > 0 && (
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
