import { safeFetch } from "@/lib/api/errors";
import { getContents, getSeoSettings } from "@/lib/api/public";
import { buildRssFeed } from "@/lib/seo/rss";

export const revalidate = 3600;

export async function GET() {
  const [seo, contents] = await Promise.all([
    safeFetch(getSeoSettings, null, "rss.seo"),
    safeFetch(getContents, [], "rss.contents"),
  ]);

  if (!seo) {
    return new Response("Service unavailable", { status: 503 });
  }

  const xml = buildRssFeed(contents, seo);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": `s-maxage=${revalidate}, stale-while-revalidate`,
    },
  });
}
