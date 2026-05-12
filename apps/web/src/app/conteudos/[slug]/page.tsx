import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { ContentCard } from "@/components/ui/content-card";
import { SeriesNav } from "@/components/ui/series-nav";
import { Toc } from "@/components/ui/toc";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { JsonLd } from "@/components/seo/json-ld";
import { ApiError } from "@/lib/api/client";
import {
  getContentBySlug,
  getContents,
  getProfile,
  getSeoSettings,
  getSeriesBySlug,
} from "@/lib/api/public";
import { safeFetch } from "@/lib/api/errors";
import { extractToc } from "@/lib/toc";
import { getMdxComponents } from "@/mdx-components";
import { buildBreadcrumbsFor } from "@/lib/seo/breadcrumbs";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildVideoSchema,
} from "@/lib/seo/json-ld";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ series?: string }>;
};

export async function generateStaticParams() {
  try {
    const contents = await getContents();
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
    return {
      title: content.title,
      description: content.summary,
      alternates: { canonical: `/conteudos/${slug}` },
      openGraph: {
        title: `${content.title} | Leonardo Silva Ribeiro`,
        description: content.summary,
        url: `https://leonardosr.com.br/conteudos/${slug}`,
      },
    };
  } catch {
    return { title: "Conteúdo" };
  }
}

const TYPE_LABEL: Record<string, string> = {
  ARTICLE: "Artigo",
  VIDEO: "Vídeo",
  ARTICLE_WITH_VIDEO: "Artigo + Vídeo",
  TUTORIAL: "Tutorial",
  CASE_STUDY: "Estudo de caso",
  TECH_NOTE: "Nota técnica",
  LAB: "Laboratório",
  ARCHITECTURE: "Arquitetura",
};

export default async function ConteudoDetalhePage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const { series: seriesSlug } = await searchParams;

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

  const [seo, profile] = await Promise.all([
    safeFetch(getSeoSettings, null, "conteudo.seo"),
    safeFetch(getProfile, null, "conteudo.profile"),
  ]);

  const toc = extractToc(content.body);
  const showToc = toc.length > 0 && (content.readingTime ?? 0) > 5;

  const publishedAt = content.publishedAt
    ? new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(content.publishedAt))
    : null;

  // Navegação de série calculada no servidor
  let seriesNav: {
    prev: typeof content | null;
    next: typeof content | null;
    seriesTitle: string;
    seriesSlug: string;
  } | null = null;

  if (seriesSlug) {
    const series = await safeFetch(
      () => getSeriesBySlug(seriesSlug),
      null,
      "conteudo.series-nav",
    );
    if (series) {
      const ordered = [...series.contents].sort(
        (a, b) => a.sortOrder - b.sortOrder,
      );
      const idx = ordered.findIndex((i) => i.content.slug === slug);
      seriesNav = {
        prev: idx > 0 ? ordered[idx - 1].content : null,
        next: idx < ordered.length - 1 ? ordered[idx + 1].content : null,
        seriesTitle: series.title,
        seriesSlug: series.slug,
      };
    }
  }

  const related =
    content.tags.length > 0
      ? await safeFetch(
          () => getContents({ tag: content.tags[0].slug }),
          [],
          "conteudo.related",
        ).then((all) => all.filter((c) => c.slug !== slug).slice(0, 3))
      : [];

  const bcItems = buildBreadcrumbsFor(
    "conteudos",
    slug,
    content.title,
    seo?.siteUrl,
  );
  const videoSchema =
    seo && (content.youtubeVideoId || content.youtubeUrl)
      ? buildVideoSchema(content, seo)
      : null;

  return (
    <>
      {seo && profile && (
        <JsonLd data={buildArticleSchema(content, profile, seo)} />
      )}
      {videoSchema && <JsonLd data={videoSchema} />}
      <JsonLd data={buildBreadcrumbSchema(bcItems)} />
      <ReadingProgress />

      {/* BREADCRUMB */}
      <div className="border-b border-[color:var(--border)]">
        <Container className="py-3">
          <Breadcrumbs
            items={[
              { label: "início", href: "/" },
              { label: "conteúdos", href: "/conteudos" },
              { label: slug },
            ]}
          />
        </Container>
      </div>

      {/* HERO */}
      <section className="border-b border-[color:var(--border)]">
        <Container className="py-12 md:py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-mono text-xs text-[color:var(--fg-faint)]">
              <span className="uppercase tracking-[0.08em]">
                {TYPE_LABEL[content.type] ?? content.type}
              </span>
              {publishedAt ? (
                <>
                  <span>·</span>
                  <time dateTime={content.publishedAt ?? undefined}>
                    {publishedAt}
                  </time>
                </>
              ) : null}
              {content.readingTime && content.type !== "VIDEO" ? (
                <>
                  <span>·</span>
                  <span>{content.readingTime} min de leitura</span>
                </>
              ) : content.videoDuration ? (
                <>
                  <span>·</span>
                  <span>{content.videoDuration}</span>
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

      {/* CORPO */}
      <Container className="py-12 md:py-16">
        {/* TOC mobile: colapsável no topo */}
        {showToc ? (
          <div className="mb-8 lg:hidden">
            <Toc items={toc} collapsible />
          </div>
        ) : null}

        <div className={showToc ? "grid gap-12 lg:grid-cols-[1fr_220px]" : ""}>
          <article className="prose-content min-w-0">
            {seriesNav ? (
              <div className="mb-10">
                <SeriesNav
                  prev={seriesNav.prev}
                  next={seriesNav.next}
                  seriesTitle={seriesNav.seriesTitle}
                  seriesSlug={seriesNav.seriesSlug}
                />
              </div>
            ) : null}

            <MDXRemote source={content.body} components={getMdxComponents()} />

            {seriesNav ? (
              <div className="mt-10">
                <SeriesNav
                  prev={seriesNav.prev}
                  next={seriesNav.next}
                  seriesTitle={seriesNav.seriesTitle}
                  seriesSlug={seriesNav.seriesSlug}
                />
              </div>
            ) : null}
          </article>

          {/* TOC desktop: sticky sidebar */}
          {showToc ? (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <Toc items={toc} />
              </div>
            </aside>
          ) : null}
        </div>
      </Container>

      {/* CONTEÚDOS RELACIONADOS */}
      {related.length > 0 ? (
        <section className="border-t border-[color:var(--border)]">
          <Container className="py-12 md:py-16">
            <h2 className="mb-6 text-xl font-semibold tracking-normal">
              Conteúdos relacionados
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <ContentCard key={c.slug} content={c} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* NAVEGAÇÃO */}
      <div className="border-t border-[color:var(--border)]">
        <Container className="py-8">
          <Link
            href="/conteudos"
            className="font-mono text-sm text-[color:var(--fg-faint)] hover:text-[color:var(--fg)]"
          >
            ← Todos os conteúdos
          </Link>
        </Container>
      </div>
    </>
  );
}
