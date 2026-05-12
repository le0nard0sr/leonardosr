import type { ReactNode } from "react";
import { Callout } from "./callout";

type WarningBoxProps = { title?: string; children: ReactNode };

export function WarningBox({ title, children }: WarningBoxProps) {
  return (
    <Callout variant="danger" title={title}>
      {children}
    </Callout>
  );
}
