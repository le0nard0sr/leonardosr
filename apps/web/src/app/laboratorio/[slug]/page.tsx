import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { ApiError } from "@/lib/api/client";
import { getContents, getContentBySlug } from "@/lib/api/public";
import { getMdxComponents } from "@/mdx-components";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const DIFFICULTY_LABEL: Record<string, string> = {
  BEGINNER: "Iniciante",
  INTERMEDIATE: "Intermediário",
  ADVANCED: "Avançado",
};

function parseLabFields(raw: Record<string, unknown> | null | undefined) {
  if (!raw) return null;
  return {
    demonstrationUrl:
      typeof raw.demonstrationUrl === "string" ? raw.demonstrationUrl : null,
    sourceCodeUrl:
      typeof raw.sourceCodeUrl === "string" ? raw.sourceCodeUrl : null,
    isDidactic: typeof raw.isDidactic === "boolean" ? raw.isDidactic : false,
    difficultyLevel: ["BEGINNER", "INTERMEDIATE", "ADVANCED"].includes(
      raw.difficultyLevel as string,
    )
      ? (raw.difficultyLevel as "BEGINNER" | "INTERMEDIATE" | "ADVANCED")
      : null,
  };
}

export async function generateStaticParams() {
  try {
    const contents = await getContents({ type: "LAB" });
    return contents.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const content = await getContentBySlug(slug);
    if (content.type !== "LAB") return { title: "Laboratório" };
    return {
      title: content.title,
      description: content.summary,
      alternates: { canonical: `/laboratorio/${slug}` },
      openGraph: {
        title: `${content.title} | Leonardo Silva Ribeiro`,
        description: content.summary,
        url: `https://leonardosr.com.br/laboratorio/${slug}`,
      },
    };
  } catch {
    return { title: "Laboratório" };
  }
}

export default async function LabDetalhePage({ params }: PageProps) {
  const { slug } = await params;

  let content;
  try {
    content = await getContentBySlug(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  if (content.type !== "LAB") notFound();

  const lab = parseLabFields(content.typeSpecificFields);

  const publishedAt = content.publishedAt
    ? new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(content.publishedAt))
    : null;

  return (
    <>
      <ReadingProgress />

      {/* BREADCRUMB */}
      <div className="border-b border-[color:var(--border)]">
        <Container className="py-3">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-xs text-[color:var(--fg-faint)]"
          >
            <Link href="/" className="hover:text-[color:var(--fg)]">
              início
            </Link>
            <span>/</span>
            <Link href="/laboratorio" className="hover:text-[color:var(--fg)]">
              laboratório
            </Link>
            <span>/</span>
            <span className="text-[color:var(--fg-muted)]">{slug}</span>
          </nav>
        </Container>
      </div>

      {/* HERO */}
      <section className="border-b border-[color:var(--border)]">
        <Container className="py-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
            <div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[color:var(--fg-faint)]">
                <span className="uppercase tracking-[0.08em]">Laboratório</span>
                {publishedAt ? (
                  <>
                    <span>·</span>
                    <time dateTime={content.publishedAt ?? undefined}>
                      {publishedAt}
                    </time>
                  </>
                ) : null}
                {lab?.difficultyLevel ? (
                  <span className="rounded-[4px] border border-[color:var(--border)] px-2 py-0.5">
                    {DIFFICULTY_LABEL[lab.difficultyLevel]}
                  </span>
                ) : null}
                {lab?.isDidactic ? (
                  <span className="rounded-[4px] border border-[color:var(--border)] px-2 py-0.5">
                    Didático
                  </span>
                ) : null}
              </div>
              <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-normal md:text-4xl">
                {content.title}
              </h1>
              <p className="mt-4 text-lg leading-8 text-[color:var(--fg-muted)]">
                {content.summary}
              </p>
              {content.tags.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {content.tags.map((tag) => (
                    <Link
                      key={tag.slug}
                      href={`/tags/${tag.slug}`}
                      className="rounded-[4px] border border-[color:var(--border)] px-2 py-1 text-xs text-[color:var(--fg-muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            {/* PAINEL LATERAL */}
            {lab ? (
              <aside className="self-start rounded-[8px] border border-[color:var(--border)] bg-[color:var(--bg-subtle)] p-5">
                <div className="flex flex-col gap-3">
                  {lab.demonstrationUrl ? (
                    <Button href={lab.demonstrationUrl}>Ver demo ↗</Button>
                  ) : null}
                  {lab.sourceCodeUrl ? (
                    <Button href={lab.sourceCodeUrl} variant="secondary">
                      Ver código ↗
                    </Button>
                  ) : null}
                </div>
              </aside>
            ) : null}
          </div>
        </Container>
      </section>

      {/* CORPO MDX */}
      <Container className="py-12 md:py-16">
        <article className="prose-content max-w-3xl">
          <MDXRemote source={content.body} components={getMdxComponents()} />
        </article>
      </Container>

      {/* NAVEGAÇÃO */}
      <div className="border-t border-[color:var(--border)]">
        <Container className="py-8">
          <Link
            href="/laboratorio"
            className="font-mono text-sm text-[color:var(--fg-faint)] hover:text-[color:var(--fg)]"
          >
            ← Todos os experimentos
          </Link>
        </Container>
      </div>
    </>
  );
}
