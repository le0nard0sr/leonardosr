import type { ReactNode } from "react";
import { Badge } from "./badge";
import { Container } from "./container";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  meta?: ReactNode;
};

export function PageHeader({ eyebrow, title, lede, meta }: PageHeaderProps) {
  return (
    <header className="border-b border-[color:var(--border)] bg-[color:var(--bg-subtle)]/45">
      <Container className="py-14 md:py-20">
        <div className="max-w-4xl">
          <Badge>{eyebrow}</Badge>
          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-normal md:text-6xl">
            {title}
          </h1>
          {lede ? (
            <div className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--fg-muted)]">
              {lede}
            </div>
          ) : null}
          {meta ? <div className="mt-8">{meta}</div> : null}
        </div>
      </Container>
    </header>
  );
}
