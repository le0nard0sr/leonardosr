import type { Content, SeoSettings } from "@/lib/api/types";

function encodeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(dateStr: string): string {
  return new Date(dateStr).toUTCString();
}

export function buildRssFeed(contents: Content[], seo: SeoSettings): string {
  const siteUrl = seo.siteUrl ?? "https://leonardosr.com.br";
  const title = encodeXml(seo.defaultTitle ?? "Leonardo Silva Ribeiro");
  const description = encodeXml(
    seo.defaultDescription ??
      "Conteúdos técnicos sobre arquitetura web moderna.",
  );
  const author = encodeXml(seo.defaultAuthorName ?? "Leonardo Silva Ribeiro");
  const now = new Date().toUTCString();

  const items = contents
    .filter((c) => c.publishedAt && new Date(c.publishedAt) <= new Date())
    .map((c) => {
      const contentPath =
        c.type === "LAB"
          ? "/laboratorio"
          : c.type === "ARCHITECTURE"
            ? "/arquiteturas"
            : "/conteudos";
      const link = encodeXml(`${siteUrl}${contentPath}/${c.slug}`);
      const itemTitle = encodeXml(c.title);
      const summary = encodeXml(c.summary ?? "");
      const pubDate = toRfc822(c.publishedAt!);
      return `    <item>
      <title>${itemTitle}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${summary}</description>
      <author>${author}</author>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${title}</title>
    <link>${encodeXml(siteUrl)}</link>
    <description>${description}</description>
    <language>${seo.defaultLocale ?? "pt-BR"}</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${encodeXml(`${siteUrl}/rss.xml`)}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}
