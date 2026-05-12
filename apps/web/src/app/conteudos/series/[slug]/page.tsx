import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ContentCard } from "@/components/ui/content-card";
import { ApiError } from "@/lib/api/client";
import { getSeries, getSeriesBySlug } from "@/lib/api/public";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const series = await getSeries();
    return series.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const series = await getSeriesBySlug(slug);
    return {
      title: series.title,
      description: series.description,
      alternates: { canonical: `/conteudos/series/${slug}` },
      openGraph: {
        title: `${series.title} | Leonardo Silva Ribeiro`,
        description: series.description,
        url: `https://leonardosr.com.br/conteudos/series/${slug}`,
      },
    };
  } catch {
    return { title: "Série" };
  }
}

export default async function SeriesDetalhePage({ params }: PageProps) {
  const { slug } = await params;

  let series;
  try {
    series = await getSeriesBySlug(slug);
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

  const items = [...series.contents].sort((a, b) => a.sortOrder - b.sortOrder);

  const published = items.filter((i) => i.content.publishedAt).length;
  const total = items.length;

  return (
    <>
      <PageHeader
        eyebrow="Série"
        title={series.title}
        lede={series.description}
      />

      <Container className="py-12 md:py-16">
        {/* PROGRESSO */}
        <div className="mb-10 rounded-[8px] border border-[color:var(--border)] bg-[color:var(--bg-subtle)] p-5">
          <div className="mb-2 flex items-center justify-between font-mono text-xs text-[color:var(--fg-faint)]">
            <span>Progresso da série</span>
            <span>
              {published}/{total} publicados
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--border)]">
            <div
              className="h-full rounded-full bg-[color:var(--accent)]"
              style={{
                width:
                  total > 0
                    ? `${Math.round((published / total) * 100)}%`
                    : "0%",
              }}
            />
          </div>
        </div>

        {/* CONTEÚDOS */}
        {items.length === 0 ? (
          <p className="text-[color:var(--fg-muted)]">
            Nenhum conteúdo nesta série ainda.
          </p>
        ) : (
          <ol className="space-y-4">
            {items.map((item, idx) => (
              <li key={item.content.slug} className="flex gap-4">
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[color:var(--border)] font-mono text-xs text-[color:var(--fg-faint)]">
                  {idx + 1}
                </span>
                <div className="min-w-0 flex-1">
                  {item.content.publishedAt ? (
                    <ContentCard
                      content={item.content}
                      href={`/conteudos/${item.content.slug}?series=${slug}`}
                    />
                  ) : (
                    <div className="rounded-[8px] border border-dashed border-[color:var(--border)] p-4">
                      <p className="font-mono text-xs uppercase tracking-[0.08em] text-[color:var(--fg-faint)]">
                        Em breve
                      </p>
                      <p className="mt-1 text-sm text-[color:var(--fg-muted)]">
                        {item.content.title}
                      </p>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}

        {/* NAVEGAÇÃO */}
        <div className="mt-12">
          <Link
            href="/conteudos/series"
            className="font-mono text-sm text-[color:var(--fg-faint)] hover:text-[color:var(--fg)]"
          >
            ← Todas as séries
          </Link>
        </div>
      </Container>
    </>
  );
}
