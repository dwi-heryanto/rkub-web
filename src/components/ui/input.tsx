import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-[var(--radius-input)] border border-[--color-border] bg-[--color-bg] px-4 py-3 text-sm text-[--color-text] placeholder:text-[--color-text-muted] focus:border-[--color-deep-teal] focus:outline-none focus:ring-2 focus:ring-[--color-deep-teal]/20",
        className,
      )}
      {...props}
    />
  );
}
