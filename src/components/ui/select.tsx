import type { SelectHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full rounded-[var(--radius-input)] border border-[--color-border] bg-[--color-bg] px-4 py-3 text-sm text-[--color-text] focus:border-[--color-deep-teal] focus:outline-none focus:ring-2 focus:ring-[--color-deep-teal]/20",
        className,
      )}
      {...props}
    />
  );
}
