import { highlightCode } from "@/lib/highlight";
import { CopyButton } from "./copy-button";

type CodeBlockProps = {
  code: string;
  lang?: string;
  title?: string;
};

export async function CodeBlock({ code, lang = "ts", title }: CodeBlockProps) {
  const html = await highlightCode(code, lang);

  return (
    <div className="relative my-6 overflow-hidden rounded-[6px] border border-[color:var(--border)]">
      {title ? (
        <div className="border-b border-[color:var(--border)] bg-[color:var(--bg-subtle)] px-4 py-2 font-mono text-xs text-[color:var(--fg-muted)]">
          {title}
        </div>
      ) : null}
      <CopyButton code={code} />
      <div
        className="overflow-x-auto text-sm [&>pre]:p-4 [&>pre]:pr-16"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
