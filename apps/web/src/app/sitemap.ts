import type { MetadataRoute } from "next";
import { safeFetch } from "@/lib/api/errors";
import {
  getContents,
  getProjects,
  getSeoSettings,
  getSeries,
  getTags,
} from "@/lib/api/public";
import { STATIC_ROUTES } from "@/lib/seo/sitemap-routes";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seo = await safeFetch(getSeoSettings, null, "sitemap.seo");
  const siteUrl = seo?.siteUrl ?? "https://leonardosr.com.br";

  const now = new Date().toISOString();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1.0 : 0.8,
  }));

  const [projects, contents, series, tags] = await Promise.all([
    safeFetch(getProjects, [], "sitemap.projects"),
    safeFetch(getContents, [], "sitemap.contents"),
    safeFetch(getSeries, [], "sitemap.series"),
    safeFetch(getTags, [], "sitemap.tags"),
  ]);

  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${siteUrl}/projetos/${p.slug}`,
    lastModified: p.publishedAt ?? now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const contentEntries: MetadataRoute.Sitemap = contents
    .filter((c) => !c.publishedAt || new Date(c.publishedAt) <= new Date())
    .map((c) => {
      let path = "/conteudos";
      if (c.type === "LAB") path = "/laboratorio";
      else if (c.type === "ARCHITECTURE") path = "/arquiteturas";
      return {
        url: `${siteUrl}${path}/${c.slug}`,
        lastModified: c.publishedAt ?? now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    });

  const seriesEntries: MetadataRoute.Sitemap = series.map((s) => ({
    url: `${siteUrl}/conteudos/series/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const tagEntries: MetadataRoute.Sitemap = tags.map((t) => ({
    url: `${siteUrl}/tags/${t.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [
    ...staticEntries,
    ...projectEntries,
    ...contentEntries,
    ...seriesEntries,
    ...tagEntries,
  ];
}
