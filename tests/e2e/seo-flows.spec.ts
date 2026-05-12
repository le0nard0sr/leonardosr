import { expect, test } from "@playwright/test";

const CONTENT_SLUG = "react-puro-ou-nextjs";

test.describe("sitemap.xml", () => {
  test("retorna 200 com Content-Type XML e contém URL canônica conhecida", async ({
    request,
  }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("xml");

    const body = await response.text();
    expect(body).toContain("<urlset");
    expect(body).toContain("/sobre");
  });
});

test.describe("robots.txt", () => {
  test("retorna 200, contém Disallow: /admin e linha Sitemap", async ({
    request,
  }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain("Disallow: /admin");
    expect(body).toMatch(/Sitemap:/i);
  });
});

test.describe("rss.xml", () => {
  test("retorna 200 com Content-Type rss+xml e pelo menos um item", async ({
    request,
  }) => {
    const response = await request.get("/rss.xml");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("rss+xml");

    const body = await response.text();
    expect(body).toContain("<rss");
    expect(body).toContain("<item>");
    expect(body).toMatch(/<link>https?:\/\/.+<\/link>/);
  });
});

test.describe("JSON-LD e canonical em página de conteúdo", () => {
  test("página de conteúdo tem script ld+json com @type Article e canonical correto", async ({
    page,
  }) => {
    await page.goto(`/conteudos/${CONTENT_SLUG}`);

    const ldScripts = await page
      .locator('script[type="application/ld+json"]')
      .all();
    expect(ldScripts.length).toBeGreaterThan(0);

    let foundArticle = false;
    for (const script of ldScripts) {
      const content = await script.textContent();
      if (content && content.includes('"Article"')) {
        foundArticle = true;
        const data = JSON.parse(content) as Record<string, unknown>;
        expect(data["@type"]).toBe("Article");
        break;
      }
    }
    expect(foundArticle).toBe(true);

    const canonical = page.locator('link[rel="canonical"]');
    const href = await canonical.getAttribute("href");
    expect(href).toContain(`/conteudos/${CONTENT_SLUG}`);
  });
});

test.describe("404", () => {
  test("rota inexistente retorna 404 com meta noindex", async ({ page }) => {
    const response = await page.goto("/rota-que-nao-existe-m5-seo");
    expect(response?.status()).toBe(404);

    const noindex = await page
      .locator('meta[name="robots"][content*="noindex"]')
      .count();
    expect(noindex).toBeGreaterThan(0);
  });
});
