"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { THEME_STORAGE_KEY } from "@/lib/theme";

type Theme = "light" | "dark";

function resolveCurrentTheme(): Theme {
  if (typeof document !== "undefined") {
    const fromDataset = document.documentElement.dataset.theme;
    if (fromDataset === "light" || fromDataset === "dark") {
      return fromDataset;
    }
  }

  if (typeof window !== "undefined") {
    try {
      const fromStorage = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (fromStorage === "light" || fromStorage === "dark") {
        return fromStorage;
      }
    } catch {
      // ignore storage access issues in restricted browsers
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  }

  return "light";
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(() => resolveCurrentTheme());
  const actionLabel = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  useEffect(() => {
    const syncTheme = () => {
      setTheme(resolveCurrentTheme());
    };

    const observer = new MutationObserver(() => {
      syncTheme();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    window.addEventListener("storage", syncTheme);
    return () => {
      observer.disconnect();
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // ignore storage access issues in restricted browsers
    }
  };

  return (
    <Button
      type="button"
      variant="secondary"
      className={className}
      onClick={toggleTheme}
      aria-label={actionLabel}
      suppressHydrationWarning
    >
      {actionLabel}
    </Button>
  );
}
