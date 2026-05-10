import Link from "next/link";
import type { Project } from "@/lib/api/types";
import { Badge } from "./badge";
import { Card } from "./card";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const publishedYear = project.publishedAt
    ? new Date(project.publishedAt).getFullYear()
    : "Projeto";

  return (
    <Link href={`/projetos/${project.slug}`} className="block h-full">
      <Card className="flex h-full flex-col gap-5 transition hover:border-[color:var(--accent)]">
        <div className="flex items-start justify-between gap-4">
          <div className="text-xs uppercase tracking-[0.08em] text-[color:var(--fg-faint)]">
            {featured ? "Destaque" : publishedYear}
          </div>
          {project.featured ? <Badge>featured</Badge> : null}
        </div>
        <div>
          <h3 className="text-xl font-semibold tracking-normal">
            {project.name}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[color:var(--fg-muted)]">
            {project.summary}
          </p>
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((technology) => (
            <span
              key={technology.slug}
              className="rounded-[4px] border border-[color:var(--border)] px-2 py-1 text-xs text-[color:var(--fg-muted)]"
            >
              {technology.name}
            </span>
          ))}
        </div>
      </Card>
    </Link>
  );
}
