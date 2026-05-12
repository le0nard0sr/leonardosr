"use client";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ConteudoError({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <h2 className="text-2xl font-semibold">Algo deu errado</h2>
      <p className="max-w-sm text-[color:var(--fg-muted)]">
        {error.message || "Ocorreu um erro ao carregar este conteúdo."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-[6px] border border-[color:var(--border)] px-4 py-2 text-sm font-medium transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
      >
        Tentar novamente
      </button>
    </div>
  );
}
