import { highlightCode } from "@/lib/highlight";
import { CopyButton } from "./copy-button";

type CodeBlockProps = {
  code: string;
  lang?: string;
  title?: string;
  highlightLines?: number[];
};

export async function CodeBlock({
  code,
  lang = "ts",
  title,
  highlightLines = [],
}: CodeBlockProps) {
  const html = await highlightCode(code, lang, highlightLines);

  return (
    <div className="relative my-6 overflow-hidden rounded-[6px] border border-[color:var(--border)]">
      {title ? (
        <div className="border-b border-[color:var(--border)] bg-[color:var(--bg-subtle)] px-4 py-2 font-mono text-xs text-[color:var(--fg-muted)]">
          {title}
        </div>
      ) : null}
      <CopyButton code={code} />
      <div
        className="overflow-x-auto text-sm [&_.line--highlighted]:-mx-4 [&_.line--highlighted]:block [&_.line--highlighted]:border-l-2 [&_.line--highlighted]:border-[color:var(--accent)] [&_.line--highlighted]:bg-[color:var(--accent-soft)] [&_.line--highlighted]:pl-[calc(1rem-2px)] [&_.line--highlighted]:pr-4 [&>pre]:p-4 [&>pre]:pr-16"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
