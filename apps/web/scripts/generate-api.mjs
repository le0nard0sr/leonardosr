const apiDocsUrl = `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080"}/v3/api-docs`;
const output = "src/lib/api/schema.ts";

async function main() {
  try {
    const response = await fetch(apiDocsUrl, { method: "GET" });
    if (!response.ok) {
      console.warn(`[generate:api] OpenAPI indisponível em ${apiDocsUrl}; schema não regenerado.`);
      return;
    }
  } catch {
    console.warn(`[generate:api] API indisponível em ${apiDocsUrl}; schema não regenerado.`);
    return;
  }

  const { spawnSync } = await import("node:child_process");
  const command = process.platform === "win32" ? "npx.cmd" : "npx";
  const result = spawnSync(command, ["openapi-typescript", apiDocsUrl, "-o", output], {
    stdio: "inherit",
    shell: false,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

main();
