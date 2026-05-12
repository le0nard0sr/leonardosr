import type { MDXComponents } from "mdx/types";

const proseHeading =
  "scroll-mt-24 font-semibold tracking-normal text-[color:var(--fg)]";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className={`${proseHeading} text-4xl leading-tight`}>{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className={`${proseHeading} mt-12 text-2xl`}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className={`${proseHeading} mt-9 text-xl`}>{children}</h3>
    ),
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
      <strong className="font-semibold text-[color:var(--fg)]">
        {children}
      </strong>
    ),
    ...components,
  };
}
