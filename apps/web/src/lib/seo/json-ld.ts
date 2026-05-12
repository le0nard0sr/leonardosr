import type { Content, Profile, Project, SeoSettings } from "@/lib/api/types";

type JsonLdObject = Record<string, unknown>;

export function buildPersonSchema(
  profile: Profile,
  seo: SeoSettings,
): JsonLdObject {
  const siteUrl = seo.siteUrl ?? "https://leonardosr.com.br";
  const sameAs: string[] = [];
  if (profile.linkedinUrl) sameAs.push(profile.linkedinUrl);
  if (profile.githubUrl) sameAs.push(profile.githubUrl);
  if (profile.twitterUrl) sameAs.push(profile.twitterUrl);
  if (profile.youtubeUrl) sameAs.push(profile.youtubeUrl);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.displayName,
    url: siteUrl,
    jobTitle: profile.professionalTitle,
    description: profile.shortBio,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function buildWebSiteSchema(seo: SeoSettings): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seo.defaultAuthorName ?? "Leonardo Silva Ribeiro",
    url: seo.siteUrl ?? "https://leonardosr.com.br",
    description: seo.defaultDescription,
  };
}

export function buildProjectSchema(
  project: Project,
  profile: Profile,
  seo: SeoSettings,
): JsonLdObject {
  const siteUrl = seo.siteUrl ?? "https://leonardosr.com.br";
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.summary,
    url: `${siteUrl}/projetos/${project.slug}`,
    ...(project.publishedAt ? { datePublished: project.publishedAt } : {}),
    author: {
      "@type": "Person",
      name: profile.displayName,
      url: siteUrl,
    },
  };
}

function getContentUrlPath(type: Content["type"]): string {
  if (type === "LAB") return "/laboratorio";
  if (type === "ARCHITECTURE") return "/arquiteturas";
  return "/conteudos";
}

export function buildArticleSchema(
  content: Content,
  profile: Profile,
  seo: SeoSettings,
): JsonLdObject {
  const siteUrl = seo.siteUrl ?? "https://leonardosr.com.br";
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.title,
    description: content.summary,
    url: `${siteUrl}${getContentUrlPath(content.type)}/${content.slug}`,
    ...(content.publishedAt ? { datePublished: content.publishedAt } : {}),
    author: {
      "@type": "Person",
      name: profile.displayName,
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: profile.displayName,
      url: siteUrl,
    },
  };
}

export function buildVideoSchema(
  content: Content,
  seo: SeoSettings,
): JsonLdObject | null {
  if (!content.youtubeVideoId && !content.youtubeUrl) return null;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: content.title,
    description: content.summary,
    ...(content.publishedAt ? { uploadDate: content.publishedAt } : {}),
    ...(content.youtubeVideoId
      ? {
          embedUrl: `https://www.youtube.com/embed/${content.youtubeVideoId}`,
        }
      : {}),
    ...(content.videoDuration ? { duration: content.videoDuration } : {}),
    publisher: {
      "@type": "Person",
      name: seo.defaultAuthorName ?? "Leonardo Silva Ribeiro",
    },
  };
}

export type BreadcrumbItem = { name: string; url?: string };

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}
