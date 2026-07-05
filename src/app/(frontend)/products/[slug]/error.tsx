"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ProductError({ reset }: { reset: () => void }) {
  return (
    <Card className="mx-auto max-w-md space-y-4 p-8 text-center">
      <AlertCircle className="mx-auto h-12 w-12 text-red-600" />
      <h2 className="text-lg font-semibold">Product unavailable</h2>
      <p className="text-sm text-(--color-text-muted)">
        We couldn&apos;t load this product. It may have been moved or is temporarily unavailable.
      </p>
      <div className="flex justify-center gap-3">
        <button type="button" onClick={reset} className={cn(buttonVariants({ variant: "secondary" }))}>
          Try again
        </button>
        <Link href="/catalog" className={cn(buttonVariants({ variant: "ghost" }))}>
          Back to Catalog
        </Link>
      </div>
    </Card>
  );
}
