import { createHighlighter } from "shiki";

let highlighterPromise: ReturnType<typeof createHighlighter> | undefined;

export async function highlightCode(code: string, lang = "ts") {
  highlighterPromise ??= createHighlighter({
    themes: ["github-dark", "github-light"],
    langs: ["ts", "tsx", "js", "jsx", "java", "bash", "json", "yaml"],
  });

  const highlighter = await highlighterPromise;

  return highlighter.codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });
}
