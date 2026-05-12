import type { ReactNode } from "react";
import { Children, isValidElement } from "react";

export function headingToText(children: ReactNode): string {
  return Children.toArray(children)
    .map((c) => {
      if (typeof c === "string" || typeof c === "number") return String(c);
      if (isValidElement(c) && c.props) {
        const props = c.props as { children?: ReactNode };
        return headingToText(props.children);
      }
      return "";
    })
    .join("");
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export type TocItem = { id: string; text: string; level: 2 | 3 };

export function extractToc(mdx: string): TocItem[] {
  const matches = [...mdx.matchAll(/^(#{2,3})\s+(.+)$/gm)];
  return matches.map(([, hashes, text]) => ({
    id: slugifyHeading(text),
    text,
    level: hashes.length as 2 | 3,
  }));
}
