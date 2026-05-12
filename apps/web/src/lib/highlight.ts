import { createHighlighter } from "shiki";

let highlighterPromise: ReturnType<typeof createHighlighter> | undefined;

function markHighlightedLines(html: string, highlightLines: number[]) {
  if (highlightLines.length === 0) return html;

  const highlighted = new Set(highlightLines);
  let lineNumber = 0;

  return html.replace(/<span class="line"/g, (match) => {
    lineNumber += 1;
    if (!highlighted.has(lineNumber)) return match;
    return '<span class="line line--highlighted" data-highlighted-line="true"';
  });
}

export async function highlightCode(
  code: string,
  lang = "ts",
  highlightLines: number[] = [],
) {
  highlighterPromise ??= createHighlighter({
    themes: ["github-dark", "github-light"],
    langs: ["ts", "tsx", "js", "jsx", "java", "bash", "json", "yaml"],
  });

  const highlighter = await highlighterPromise;

  const html = highlighter.codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });

  return markHighlightedLines(html, highlightLines);
}
