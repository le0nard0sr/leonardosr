import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ContentCard } from "@/components/ui/content-card";
import { PageHeader } from "@/components/ui/page-header";
import { safeFetch } from "@/lib/api/errors";
import { getContents } from "@/lib/api/public";

export const metadata: Metadata = {
  title: "Vídeos",
  description:
    "Vídeos técnicos sobre React, Next.js, Spring Boot e arquitetura de software.",
  alternates: { canonical: "/conteudos/videos" },
  openGraph: {
    title: "Vídeos | Leonardo Silva Ribeiro",
    description:
      "Vídeos técnicos sobre React, Next.js, Spring Boot e arquitetura de software.",
    url: "https://leonardosr.com.br/conteudos/videos",
  },
};

export default async function VideosPage() {
  const [videos, articlesWithVideo] = await Promise.all([
    safeFetch(() => getContents({ type: "VIDEO" }), [], "videos.list"),
    safeFetch(
      () => getContents({ type: "ARTICLE_WITH_VIDEO" }),
      [],
      "articles-with-video.list",
    ),
  ]);

  const all = [...videos, ...articlesWithVideo].sort((a, b) =>
    (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""),
  );

  return (
    <>
      <PageHeader
        eyebrow="Vídeos"
        title="Vídeos técnicos"
        lede="Vídeos do YouTube com páginas dedicadas, conteúdo textual complementar e código-fonte."
      />
      <Container className="py-12 md:py-16">
        {all.length === 0 ? (
          <p className="text-[color:var(--fg-muted)]">
            Nenhum vídeo publicado ainda.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {all.map((content) => (
              <ContentCard key={content.slug} content={content} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
