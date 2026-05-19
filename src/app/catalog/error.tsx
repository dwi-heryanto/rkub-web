"use client";

import { Button } from "@/components/ui/button";

export default function CatalogError({ reset }: { reset: () => void }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-[--color-border-strong] bg-[--color-surface] p-6 text-sm text-[--color-text-muted]">
      Something went wrong while loading the catalog.
      <Button variant="secondary" onClick={reset} className="ml-3 min-h-0 px-3 py-1 text-sm">
        Try again
      </Button>
    </div>
  );
}
