import type { ReactNode } from "react";

type Step = { title: string; children?: ReactNode };

type StepListProps = {
  steps: Step[];
};

export function StepList({ steps }: StepListProps) {
  return (
    <ol className="my-6 space-y-4">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent)] font-mono text-xs font-bold text-white">
            {i + 1}
          </span>
          <div className="min-w-0 pt-0.5">
            <p className="font-semibold text-[color:var(--fg)]">{step.title}</p>
            {step.children ? (
              <div className="mt-1 text-sm leading-7 text-[color:var(--fg-muted)]">
                {step.children}
              </div>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
