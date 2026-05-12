import { expect, test, type Page } from "@playwright/test";

const ARTICLE_SLUG = "react-puro-ou-nextjs";
const SERIES_SLUG = "arquitetura-de-aplicacoes-web";
const LAB_SLUG = "laboratorio-api-rest-spring";
const ARCHITECTURE_SLUG = "arquitetura-next-spring-postgresql";

const PUBLIC_ROUTES = [
  { path: "/", heading: /Leonardo Silva Ribeiro/i },
  { path: "/sobre", heading: /Leonardo Silva Ribeiro/i },
  { path: "/experiencia", heading: /Trajetória profissional/i },
  { path: "/stack", heading: /Tecnologias e ferramentas/i },
  { path: "/projetos", heading: /Construções reais/i },
  { path: "/contato", heading: /Vamos conversar/i },
  { path: "/privacidade", heading: /Privacidade/i },
  { path: "/termos", heading: /Termos/i },
];

const OG_ROUTES = [
  "/conteudos/opengraph-image",
  `/conteudos/${ARTICLE_SLUG}/opengraph-image`,
  `/laboratorio/${LAB_SLUG}/opengraph-image`,
  `/arquiteturas/${ARCHITECTURE_SLUG}/opengraph-image`,
  `/conteudos/series/${SERIES_SLUG}/opengraph-image`,
  "/tags/react/opengraph-image",
];

test.beforeEach(async ({ page }) => {
  const browserErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      browserErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => browserErrors.push(error.message));

  (page as Page & { browserErrors: string[] }).browserErrors = browserErrors;
});

test.afterEach(async ({ page }) => {
  const { browserErrors } = page as Page & { browserErrors: string[] };
  expect(browserErrors, "console/page errors").toEqual([]);
});

test.describe("rotas públicas principais", () => {
  for (const route of PUBLIC_ROUTES) {
    test(`${route.path} responde e renderiza heading`, async ({ page }) => {
      await gotoOk(page, route.path);
      await expect(
        page.getByRole("heading", { name: route.heading }).first(),
      ).toBeVisible();
    });
  }
});

test.describe("hub editorial M4", () => {
  test("filtra conteúdos por tipo, tag e tecnologia com URL compartilhável", async ({
    page,
  }) => {
    await gotoOk(page, "/conteudos");
    await expect(
      page.getByRole("heading", { name: "Hub editorial" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /React puro/i })).toBeVisible();

    await page.getByRole("button", { name: "Artigos" }).click();
    await expect(page).toHaveURL(/\/conteudos\?type=Artigos/);
    await expect(page.getByRole("link", { name: /React puro/i })).toBeVisible();

    await page.getByLabel("Filtrar por tag").selectOption("react");
    await expect(page).toHaveURL(/tag=react/);
    await expect(page.getByRole("link", { name: /React puro/i })).toBeVisible();

    await page.getByLabel("Filtrar por tecnologia").selectOption("nextjs");
    await expect(page).toHaveURL(/technology=nextjs/);
    await expect(page.getByRole("link", { name: /React puro/i })).toBeVisible();
  });

  test("listagens editoriais renderizam cards e vídeos não usam iframe", async ({
    page,
  }) => {
    await gotoOk(page, "/conteudos/artigos");
    await expect(page.getByRole("link", { name: /React puro/i })).toBeVisible();

    await gotoOk(page, "/conteudos/videos");
    await expect(page.locator("iframe")).toHaveCount(0);

    await gotoOk(page, "/conteudos/series");
    await expect(
      page.getByRole("link", { name: /Arquitetura de aplicações web/i }),
    ).toBeVisible();

    await gotoOk(page, "/laboratorio");
    await expect(page.getByRole("link", { name: /API REST/i })).toBeVisible();

    await gotoOk(page, "/arquiteturas");
    await expect(
      page.getByRole("link", { name: /Next.js, Spring Boot e PostgreSQL/i }),
    ).toBeVisible();
  });

  test("detalhes de conteúdo, série, tag, lab e arquitetura funcionam", async ({
    page,
  }) => {
    await gotoOk(page, `/conteudos/${ARTICLE_SLUG}`);
    await expect(page.getByRole("heading", { name: /React puro/i })).toHaveCount(
      2,
    );
    await expect(
      page.getByRole("heading", { name: "Conteúdos relacionados" }),
    ).toBeVisible();

    await gotoOk(page, `/conteudos/series/${SERIES_SLUG}`);
    await expect(
      page.getByRole("heading", { name: /Arquitetura de aplicações web/i }),
    ).toBeVisible();
    await expect(page.locator(`a[href*="?series=${SERIES_SLUG}"]`)).toHaveCount(
      1,
    );

    await gotoOk(page, `/conteudos/${ARTICLE_SLUG}?series=${SERIES_SLUG}`);
    await expect(
      page.getByRole("navigation", { name: /série/i }).first(),
    ).toBeVisible();

    await gotoOk(page, "/tags/react");
    await expect(
      page.getByRole("heading", { name: "React", exact: true }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /React puro/i })).toBeVisible();

    await gotoOk(page, `/laboratorio/${LAB_SLUG}`);
    await expect(
      page.getByRole("heading", { name: /API REST/i }).first(),
    ).toBeVisible();
    await expect(page.getByText("Didático")).toBeVisible();

    await gotoOk(page, `/arquiteturas/${ARCHITECTURE_SLUG}`);
    await expect(
      page
        .getByRole("heading", { name: /Next.js, Spring Boot e PostgreSQL/i })
        .first(),
    ).toBeVisible();
    await expect(page.getByText("Quando usar")).toBeVisible();
  });

  test("rotas de tipo cruzado retornam 404", async ({ page }) => {
    await gotoWithStatus(page, `/laboratorio/${ARTICLE_SLUG}`, 404);
    await gotoWithStatus(page, `/arquiteturas/${LAB_SLUG}`, 404);
    clearBrowserErrors(page);
  });
});

test("OG images principais retornam PNG", async ({ request }) => {
  for (const route of OG_ROUTES) {
    const response = await request.get(route);
    expect(response.status(), route).toBe(200);
    expect(response.headers()["content-type"], route).toContain("image/png");
  }
});

async function gotoOk(page: Page, path: string) {
  await gotoWithStatus(page, path, 200);
}

async function gotoWithStatus(page: Page, path: string, status: number) {
  const response = await page.goto(path);
  expect(response?.status(), path).toBe(status);
}

function clearBrowserErrors(page: Page) {
  const state = page as Page & { browserErrors: string[] };
  state.browserErrors.length = 0;
}
