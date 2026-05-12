"use client";

import { useState } from "react";

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={copy}
      type="button"
      aria-label="Copiar código"
      className="absolute right-3 top-3 rounded-[4px] border border-[color:var(--border)] bg-[color:var(--bg-subtle)] px-2 py-1 font-mono text-[10px] text-[color:var(--fg-faint)] transition hover:text-[color:var(--fg)]"
    >
      {copied ? "copiado" : "copiar"}
    </button>
  );
}
