import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/seo/json-ld";
import { ApiError } from "@/lib/api/client";
import {
  getProfile,
  getProjectBySlug,
  getProjects,
  getSeoSettings,
} from "@/lib/api/public";
import { safeFetch } from "@/lib/api/errors";
import { buildBreadcrumbsFor } from "@/lib/seo/breadcrumbs";
import { buildBreadcrumbSchema, buildProjectSchema } from "@/lib/seo/json-ld";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const projects = await getProjects();
    return projects.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await getProjectBySlug(slug);
    return {
      title: project.name,
      description: project.summary,
      alternates: { canonical: `/projetos/${slug}` },
      openGraph: {
        title: project.name,
        description: project.summary,
        url: `https://leonardosr.com.br/projetos/${slug}`,
      },
    };
  } catch {
    return { title: "Projeto" };
  }
}

export default async function ProjetoDetalhePage({ params }: PageProps) {
  const { slug } = await params;

  let project;
  try {
    project = await getProjectBySlug(slug);
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 404) notFound();
      if (
        error.status === 503 &&
        process.env.NEXT_PHASE === "phase-production-build"
      )
        notFound();
    }
    throw error;
  }

  const publishedYear = project.publishedAt
    ? new Date(project.publishedAt).getFullYear()
    : null;

  const [seo, profile] = await Promise.all([
    safeFetch(getSeoSettings, null, "projeto.seo"),
    safeFetch(getProfile, null, "projeto.profile"),
  ]);

  const bcItems = buildBreadcrumbsFor(
    "projetos",
    slug,
    project.name,
    seo?.siteUrl,
  );

  return (
    <>
      {seo && profile && (
        <JsonLd data={buildProjectSchema(project, profile, seo)} />
      )}
      <JsonLd data={buildBreadcrumbSchema(bcItems)} />

      {/* BREADCRUMB */}
      <div className="border-b border-[color:var(--border)]">
        <Container className="py-3">
          <Breadcrumbs
            items={[
              { label: "início", href: "/" },
              { label: "projetos", href: "/projetos" },
              { label: project.slug },
            ]}
          />
        </Container>
      </div>

      {/* HERO */}
      <section className="border-b border-[color:var(--border)]">
        <Container className="py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
            <div>
              <p className="font-mono text-sm text-[color:var(--fg-faint)]">
                Projeto{publishedYear ? ` · ${publishedYear}` : ""}
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-normal md:text-5xl">
                {project.name}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[color:var(--fg-muted)]">
                {project.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech.slug}
                    className="rounded-[4px] border border-[color:var(--border)] px-2.5 py-1 font-mono text-xs text-[color:var(--fg-muted)]"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {project.repositoryUrl && (
                  <Button href={project.repositoryUrl}>Repositório ↗</Button>
                )}
                {project.demoUrl && (
                  <Button href={project.demoUrl} variant="secondary">
                    Demo ↗
                  </Button>
                )}
              </div>
            </div>
            <aside className="self-start rounded-[8px] border border-[color:var(--border)] bg-[color:var(--bg-subtle)] p-5">
              <dl className="grid gap-4 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-[0.08em] text-[color:var(--fg-faint)]">
                    Status
                  </dt>
                  <dd className="mt-1 font-medium">Publicado</dd>
                </div>
                {publishedYear && (
                  <div>
                    <dt className="text-xs uppercase tracking-[0.08em] text-[color:var(--fg-faint)]">
                      Ano
                    </dt>
                    <dd className="mt-1 font-medium">{publishedYear}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs uppercase tracking-[0.08em] text-[color:var(--fg-faint)]">
                    Stack
                  </dt>
                  <dd className="mt-1 font-mono text-xs text-[color:var(--fg-muted)]">
                    {project.technologies.map((t) => t.name).join(", ")}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </Container>
      </section>

      {/* DESCRIÇÃO */}
      {project.description && project.description !== project.summary && (
        <section className="border-b border-[color:var(--border)]">
          <Container className="py-12 md:py-16">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-normal">
                Sobre o projeto
              </h2>
              <p className="mt-5 leading-8 text-[color:var(--fg-muted)]">
                {project.description}
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* NAVEGAÇÃO */}
      <Container className="py-8">
        <Button href="/projetos" variant="secondary">
          ← Todos os projetos
        </Button>
      </Container>
    </>
  );
}
