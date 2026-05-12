/**
 * Gera apps/web/public/og/fallback.png com o mesmo layout visual do OG dinâmico.
 * Usa ImageResponse de next/og (satori + resvg) — nenhuma dep adicional necessária.
 *
 * Uso: npm --workspace @leonardosr/web run og:fallback
 *
 * Caminho alternativo (se next/og falhar fora do runtime Next):
 *   Capturar screenshot da rota /opengraph-image via Playwright com a stack rodando:
 *   npx playwright screenshot http://localhost:3000/opengraph-image --full-page \
 *     --viewport-size 1200,630 -o apps/web/public/og/fallback.png
 */
import { createElement } from "react";
import { ImageResponse } from "next/og.js";
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = join(__dirname, "../public/og");
const outputPath = join(outputDir, "fallback.png");
const size = { width: 1200, height: 630 };

const el = (type, props, ...children) => createElement(type, props, ...children);

const image = el(
  "div",
  {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "64px",
      background: "#0d0e10",
      fontFamily: "system-ui, sans-serif",
      position: "relative",
    },
  },
  el("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: "#d97757",
    },
  }),
  el(
    "p",
    {
      style: {
        color: "#6b7280",
        fontSize: "20px",
        marginBottom: "16px",
        fontFamily: "monospace",
      },
    },
    "leonardosr.com.br",
  ),
  el(
    "h1",
    {
      style: {
        color: "#ececec",
        fontSize: "56px",
        fontWeight: 600,
        lineHeight: 1.15,
        margin: "0 0 20px",
      },
    },
    "Leonardo Silva Ribeiro",
  ),
  el(
    "p",
    {
      style: {
        color: "#9ca3af",
        fontSize: "28px",
        margin: 0,
      },
    },
    "Arquitetura e desenvolvimento web moderno com clareza técnica.",
  ),
);

try {
  const response = new ImageResponse(image, size);
  await mkdir(outputDir, { recursive: true });
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(outputPath, buffer);
  console.log(`✓ OG fallback gerado: ${outputPath} (${buffer.length} bytes)`);
} catch (err) {
  console.error("✗ Falha ao gerar OG fallback via next/og:", err.message);
  console.error(
    "  Alternativa: rode a stack e capture via Playwright:\n" +
      "  npx playwright screenshot http://localhost:3000/opengraph-image \\\n" +
      "    --full-page --viewport-size 1200,630 -o apps/web/public/og/fallback.png",
  );
  process.exit(1);
}
