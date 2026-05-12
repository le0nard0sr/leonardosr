import type { Metadata } from "next";
import type { SeoSettings } from "@/lib/api/types";

export function buildBaseMetadata(seo: SeoSettings): Metadata {
  return {
    metadataBase: new URL(seo.siteUrl ?? "https://leonardosr.com.br"),
    title: {
      default: seo.defaultTitle,
      template: `%s | ${seo.defaultAuthorName}`,
    },
    description: seo.defaultDescription,
    applicationName: "leonardosr.com.br",
    verification: {
      ...(seo.googleVerification ? { google: seo.googleVerification } : {}),
      ...(seo.bingVerification
        ? { other: { "msvalidate.01": [seo.bingVerification] } }
        : {}),
    },
    openGraph: {
      type: "website",
      locale: seo.defaultLocale ?? "pt_BR",
      url: seo.siteUrl,
      siteName: seo.defaultAuthorName,
      title: seo.defaultTitle,
      description: seo.defaultDescription,
      images: [
        {
          url: seo.defaultOgImageUrl ?? "/og/fallback.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      ...(seo.twitterHandle
        ? { creator: seo.twitterHandle, site: seo.twitterHandle }
        : {}),
    },
  };
}

export function buildAbsoluteUrl(seo: SeoSettings, path: string): string {
  const base = seo.siteUrl ?? "https://leonardosr.com.br";
  return `${base}${path}`;
}
