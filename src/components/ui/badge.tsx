import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-pill)] bg-[--color-soft-peach] px-3 py-1 text-xs font-semibold text-[--color-forest-canopy]",
        className,
      )}
      {...props}
    />
  );
}
