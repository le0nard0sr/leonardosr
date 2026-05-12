import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ContentCard } from "@/components/ui/content-card";
import { PageHeader } from "@/components/ui/page-header";
import { ApiError } from "@/lib/api/client";
import { getTags, getTagBySlug } from "@/lib/api/public";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const tags = await getTags();
    return tags.map((t) => ({ slug: t.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { tag } = await getTagBySlug(slug);
    return {
      title: tag.name,
      description:
        tag.description ?? `Conteúdos técnicos com a tag "${tag.name}".`,
      alternates: { canonical: `/tags/${slug}` },
      openGraph: {
        title: `${tag.name} | Leonardo Silva Ribeiro`,
        description:
          tag.description ?? `Conteúdos técnicos com a tag "${tag.name}".`,
        url: `https://leonardosr.com.br/tags/${slug}`,
      },
    };
  } catch {
    return { title: "Tag" };
  }
}

export default async function TagDetalhePage({ params }: PageProps) {
  const { slug } = await params;

  let tagDetail;
  try {
    tagDetail = await getTagBySlug(slug);
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

  const { tag, contents } = tagDetail;

  return (
    <>
      <PageHeader
        eyebrow="Tag"
        title={tag.name}
        lede={
          tag.description ??
          `Todos os conteúdos publicados com a tag "${tag.name}".`
        }
      />

      <Container className="py-12 md:py-16">
        {contents.length === 0 ? (
          <p className="text-[color:var(--fg-muted)]">
            Nenhum conteúdo publicado com esta tag ainda.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {contents.map((content) => (
              <ContentCard key={content.slug} content={content} />
            ))}
          </div>
        )}

        <div className="mt-12">
          <Link
            href="/conteudos"
            className="font-mono text-sm text-[color:var(--fg-faint)] hover:text-[color:var(--fg)]"
          >
            ← Todos os conteúdos
          </Link>
        </div>
      </Container>
    </>
  );
}
