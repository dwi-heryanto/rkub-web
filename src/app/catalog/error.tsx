"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CatalogError({ reset }: { reset: () => void }) {
  return (
    <Card className="border-[--color-border-strong] text-sm text-[--color-text-muted]">
      Something went wrong while loading the catalog.
      <Button variant="secondary" onClick={reset} className="ml-3 min-h-0 px-3 py-1 text-sm">
        Try again
      </Button>
    </Card>
  );
}
