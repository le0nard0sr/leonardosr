import Link from "next/link";
import type { Content } from "@/lib/api/types";
import { Card } from "./card";

const TYPE_LABEL: Record<Content["type"], string> = {
  ARTICLE: "Artigo",
  VIDEO: "Vídeo",
  ARTICLE_WITH_VIDEO: "Artigo + Vídeo",
  TUTORIAL: "Tutorial",
  CASE_STUDY: "Estudo de caso",
  TECH_NOTE: "Nota técnica",
  LAB: "Laboratório",
  ARCHITECTURE: "Arquitetura",
};

type ContentCardProps = {
  content: Content;
  href?: string;
};

export function ContentCard({ content, href }: ContentCardProps) {
  const isVideo =
    content.type === "VIDEO" || content.type === "ARTICLE_WITH_VIDEO";
  const thumbnailId = content.youtubeVideoId;

  return (
    <Link href={href ?? `/conteudos/${content.slug}`} className="block h-full">
      <Card className="flex h-full flex-col gap-4 transition hover:border-[color:var(--accent)]">
        {isVideo && thumbnailId ? (
          // eslint-disable-next-line @next/next/no-img-element -- thumbnail YouTube; remotePatterns evitado intencionalmente no M4
          <img
            src={`https://img.youtube.com/vi/${thumbnailId}/hqdefault.jpg`}
            alt={content.title}
            width={480}
            height={270}
            className="aspect-video w-full rounded-[4px] object-cover"
          />
        ) : null}

        <div className="flex items-start justify-between gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-[color:var(--fg-faint)]">
            {TYPE_LABEL[content.type]}
          </span>
          {content.readingTime && !isVideo ? (
            <span className="shrink-0 font-mono text-xs text-[color:var(--fg-faint)]">
              {content.readingTime} min
            </span>
          ) : content.videoDuration ? (
            <span className="shrink-0 font-mono text-xs text-[color:var(--fg-faint)]">
              {content.videoDuration}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold leading-snug tracking-normal">
            {content.title}
          </h3>
          <p className="text-sm leading-6 text-[color:var(--fg-muted)]">
            {content.summary}
          </p>
        </div>

        {content.tags.length > 0 ? (
          <div className="mt-auto flex flex-wrap gap-2">
            {content.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.slug}
                className="rounded-[4px] border border-[color:var(--border)] px-2 py-1 text-xs text-[color:var(--fg-muted)]"
              >
                {tag.name}
              </span>
            ))}
          </div>
        ) : null}
      </Card>
    </Link>
  );
}
