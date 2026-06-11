"use client";

import { useEffect, useState } from "react";
import type { Theme } from "@/lib/theme";

declare global {
  interface Window {
    toggleAaacatTheme?: () => Theme;
    getAaacatTheme?: () => Theme;
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const sync = () => {
      const current =
        window.getAaacatTheme?.() ??
        (document.documentElement.classList.contains("dark") ? "dark" : "light");
      setTheme(current);
    };

    sync();
    setMounted(true);

    window.addEventListener("aaacat-theme-change", sync);
    return () => window.removeEventListener("aaacat-theme-change", sync);
  }, []);

  const toggle = () => {
    if (window.toggleAaacatTheme) {
      const next = window.toggleAaacatTheme();
      setTheme(next);
      return;
    }

    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(next);
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem("aaacat-theme", next);
    } catch {
      /* ignore */
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="relative z-10 rounded-md border border-border bg-muted/60 p-2 text-foreground transition-colors hover:bg-muted"
      aria-label="切换主题"
      aria-pressed={mounted ? theme === "dark" : undefined}
    >
      {mounted && theme === "dark" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          />
        </svg>
      )}
    </button>
  );
}
