import type { MDXComponents } from "mdx/types";
import type { ReactElement } from "react";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { ComparisonTable } from "@/components/mdx/comparison-table";
import { ArchitectureDiagram } from "@/components/mdx/architecture-diagram";
import { VideoEmbed } from "@/components/mdx/video-embed";
import { RepositoryLink } from "@/components/mdx/repository-link";
import { StepList } from "@/components/mdx/step-list";
import { WarningBox } from "@/components/mdx/warning-box";
import { InfoBox } from "@/components/mdx/info-box";
import { headingToText, slugifyHeading } from "@/lib/toc";

const proseHeading =
  "scroll-mt-24 font-semibold tracking-normal text-[color:var(--fg)]";

const BASE_COMPONENTS: MDXComponents = {
  h1: ({ children }) => (
    <h1 className={`${proseHeading} text-4xl leading-tight`}>{children}</h1>
  ),
  h2: ({ children }) => {
    const id = slugifyHeading(headingToText(children));
    return (
      <h2 id={id} className={`${proseHeading} scroll-mt-24 mt-12 text-2xl`}>
        {children}
      </h2>
    );
  },
  h3: ({ children }) => {
    const id = slugifyHeading(headingToText(children));
    return (
      <h3 id={id} className={`${proseHeading} scroll-mt-24 mt-9 text-xl`}>
        {children}
      </h3>
    );
  },
  p: ({ children }) => (
    <p className="mt-5 leading-8 text-[color:var(--fg-muted)]">{children}</p>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="font-medium text-[color:var(--accent)] underline decoration-[color:var(--accent-soft)] underline-offset-4"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 text-[color:var(--fg-muted)]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 text-[color:var(--fg-muted)]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-[color:var(--fg)]">{children}</strong>
  ),
  code: ({ children }) => (
    <code className="rounded px-1.5 py-0.5 font-mono text-sm bg-[color:var(--bg-subtle)] text-[color:var(--fg)]">
      {children}
    </code>
  ),
  pre: ({ children }) => {
    const codeEl = children as ReactElement<{
      className?: string;
      children?: string;
    }>;
    const className = codeEl?.props?.className ?? "";
    const lang = className.replace("language-", "") || "text";
    const code = (codeEl?.props?.children ?? "").trimEnd();
    return <CodeBlock code={code} lang={lang} />;
  },
  Callout,
  CodeBlock,
  ComparisonTable,
  ArchitectureDiagram,
  VideoEmbed,
  RepositoryLink,
  StepList,
  WarningBox,
  InfoBox,
};

export function getMdxComponents(extra: MDXComponents = {}): MDXComponents {
  return { ...BASE_COMPONENTS, ...extra };
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...BASE_COMPONENTS, ...components };
}
