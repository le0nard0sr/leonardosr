import type { MetadataRoute } from "next";
import { safeFetch } from "@/lib/api/errors";
import { getSeoSettings } from "@/lib/api/public";

export const revalidate = 86400;

export default async function robots(): Promise<MetadataRoute.Robots> {
  const seo = await safeFetch(getSeoSettings, null, "robots.seo");
  const siteUrl = seo?.siteUrl ?? "https://leonardosr.com.br";
  const policy = seo?.robotsPolicy ?? "disallow_admin";

  const adminRule = { userAgent: "*", disallow: "/admin" } as const;

  if (policy === "allow") {
    return {
      rules: [{ userAgent: "*", allow: "/" }, adminRule],
      sitemap: `${siteUrl}/sitemap.xml`,
    };
  }

  // disallow_admin (default) and custom (falls back to disallow_admin)
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/admin" }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
