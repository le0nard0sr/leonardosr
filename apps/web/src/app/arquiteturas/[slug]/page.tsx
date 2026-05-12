import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/ui/container";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { ApiError } from "@/lib/api/client";
import { getContents, getContentBySlug } from "@/lib/api/public";
import { getMdxComponents } from "@/mdx-components";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type ArchComponent = { name: string; role: string };

function parseArchFields(raw: Record<string, unknown> | null | undefined) {
  if (!raw) return null;
  return {
    components: Array.isArray(raw.components)
      ? (raw.components as unknown[]).filter(
          (c): c is ArchComponent =>
            typeof c === "object" &&
            c !== null &&
            typeof (c as Record<string, unknown>).name === "string" &&
            typeof (c as Record<string, unknown>).role === "string",
        )
      : [],
    flow: typeof raw.flow === "string" ? raw.flow : null,
    advantages: Array.isArray(raw.advantages)
      ? raw.advantages.filter((a): a is string => typeof a === "string")
      : [],
    risks: Array.isArray(raw.risks)
      ? raw.risks.filter((r): r is string => typeof r === "string")
      : [],
    whenToUse: typeof raw.whenToUse === "string" ? raw.whenToUse : null,
    diagramMediaId:
      typeof raw.diagramMediaId === "number" ? raw.diagramMediaId : null,
  };
}

export async function generateStaticParams() {
  try {
    const contents = await getContents({ type: "ARCHITECTURE" });
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
    if (content.type !== "ARCHITECTURE") return { title: "Arquitetura" };
    return {
      title: content.title,
      description: content.summary,
      alternates: { canonical: `/arquiteturas/${slug}` },
      openGraph: {
        title: `${content.title} | Leonardo Silva Ribeiro`,
        description: content.summary,
        url: `https://leonardosr.com.br/arquiteturas/${slug}`,
      },
    };
  } catch {
    return { title: "Arquitetura" };
  }
}

export default async function ArquiteturaDetalhePage({ params }: PageProps) {
  const { slug } = await params;

  let content;
  try {
    content = await getContentBySlug(slug);
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

  if (content.type !== "ARCHITECTURE") notFound();

  const arch = parseArchFields(content.typeSpecificFields);

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
            <Link href="/arquiteturas" className="hover:text-[color:var(--fg)]">
              arquiteturas
            </Link>
            <span>/</span>
            <span className="text-[color:var(--fg-muted)]">{slug}</span>
          </nav>
        </Container>
      </div>

      {/* HERO */}
      <section className="border-b border-[color:var(--border)]">
        <Container className="py-12 md:py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-mono text-xs text-[color:var(--fg-faint)]">
              <span className="uppercase tracking-[0.08em]">Arquitetura</span>
              {publishedAt ? (
                <>
                  <span>·</span>
                  <time dateTime={content.publishedAt ?? undefined}>
                    {publishedAt}
                  </time>
                </>
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
        </Container>
      </section>

      {/* SEÇÕES FIXAS */}
      {arch ? (
        <section className="border-b border-[color:var(--border)]">
          <Container className="py-12 md:py-16">
            <div className="grid gap-10 md:grid-cols-2">
              {/* Diagrama */}
              {arch.diagramMediaId ? (
                <div className="md:col-span-2">
                  <h2 className="mb-3 text-lg font-semibold tracking-normal">
                    Diagrama
                  </h2>
                  <div className="flex items-center justify-center rounded-[8px] border border-dashed border-[color:var(--border)] bg-[color:var(--bg-subtle)] p-8 text-sm text-[color:var(--fg-faint)]">
                    Diagrama vinculado (id: {arch.diagramMediaId})
                  </div>
                </div>
              ) : null}

              {/* Componentes */}
              {arch.components.length > 0 ? (
                <div>
                  <h2 className="mb-3 text-lg font-semibold tracking-normal">
                    Componentes
                  </h2>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[color:var(--border)]">
                        <th className="py-2 pr-4 text-left font-semibold text-[color:var(--fg)]">
                          Componente
                        </th>
                        <th className="py-2 text-left font-semibold text-[color:var(--fg)]">
                          Papel
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {arch.components.map((c) => (
                        <tr
                          key={c.name}
                          className="border-b border-[color:var(--border)] last:border-0"
                        >
                          <td className="py-2 pr-4 font-mono text-xs">
                            {c.name}
                          </td>
                          <td className="py-2 text-[color:var(--fg-muted)]">
                            {c.role}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}

              {/* Fluxo */}
              {arch.flow ? (
                <div>
                  <h2 className="mb-3 text-lg font-semibold tracking-normal">
                    Fluxo
                  </h2>
                  <p className="text-sm leading-7 text-[color:var(--fg-muted)]">
                    {arch.flow}
                  </p>
                </div>
              ) : null}

              {/* Vantagens */}
              {arch.advantages.length > 0 ? (
                <div>
                  <h2 className="mb-3 text-lg font-semibold tracking-normal">
                    Vantagens
                  </h2>
                  <ul className="space-y-1.5 text-sm text-[color:var(--fg-muted)]">
                    {arch.advantages.map((a, i) => (
                      <li key={i} className="flex gap-2 leading-6">
                        <span className="mt-0.5 text-[color:var(--accent)]">
                          ✓
                        </span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Riscos */}
              {arch.risks.length > 0 ? (
                <div>
                  <h2 className="mb-3 text-lg font-semibold tracking-normal">
                    Riscos
                  </h2>
                  <ul className="space-y-1.5 text-sm text-[color:var(--fg-muted)]">
                    {arch.risks.map((r, i) => (
                      <li key={i} className="flex gap-2 leading-6">
                        <span className="mt-0.5 text-amber-500">⚠</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Quando usar */}
              {arch.whenToUse ? (
                <div className="md:col-span-2">
                  <h2 className="mb-3 text-lg font-semibold tracking-normal">
                    Quando usar
                  </h2>
                  <p className="text-sm leading-7 text-[color:var(--fg-muted)]">
                    {arch.whenToUse}
                  </p>
                </div>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}

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
            href="/arquiteturas"
            className="font-mono text-sm text-[color:var(--fg-faint)] hover:text-[color:var(--fg)]"
          >
            ← Todas as arquiteturas
          </Link>
        </Container>
      </div>
    </>
  );
}
