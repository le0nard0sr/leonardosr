import type { PropsWithChildren } from "react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Prose } from "@/components/ui/prose";

type ProseLayoutProps = PropsWithChildren<{
  eyebrow: string;
  title: string;
  lede: string;
}>;

export function ProseLayout({
  eyebrow,
  title,
  lede,
  children,
}: ProseLayoutProps) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} lede={lede} />
      <Container className="py-12 md:py-16">
        <Prose>{children}</Prose>
      </Container>
    </>
  );
}
