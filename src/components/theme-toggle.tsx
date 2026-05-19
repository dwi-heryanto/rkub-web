"use client";

import { Button } from "@/components/ui/button";
import { THEME_STORAGE_KEY } from "@/lib/theme";

type Theme = "light" | "dark";

export function ThemeToggle({ className }: { className?: string }) {
  const toggleTheme = () => {
    const currentTheme = document.documentElement.dataset.theme;
    const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  };

  return (
    <Button type="button" variant="secondary" className={className} onClick={toggleTheme} aria-label="Toggle theme">
      Toggle theme
    </Button>
  );
}
