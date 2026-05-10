"use client";

import { useState } from "react";

type Theme = "dark" | "light";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") {
      return "dark";
    }

    return document.documentElement.dataset.theme === "light"
      ? "light"
      : "dark";
  });

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.cookie = `lsr-theme=${next}; Path=/; SameSite=Lax; Max-Age=31536000`;
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="h-9 rounded-[6px] border border-[color:var(--border-strong)] px-3 text-sm text-[color:var(--fg-muted)] transition hover:bg-[color:var(--bg-subtle)] hover:text-[color:var(--fg)]"
      aria-label="Alternar tema"
    >
      {theme === "dark" ? "Claro" : "Escuro"}
    </button>
  );
}
