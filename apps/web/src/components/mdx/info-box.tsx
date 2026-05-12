import type { ReactNode } from "react";
import { Callout } from "./callout";

type InfoBoxProps = { title?: string; children: ReactNode };

export function InfoBox({ title, children }: InfoBoxProps) {
  return (
    <Callout variant="info" title={title}>
      {children}
    </Callout>
  );
}
