import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export function Chip({ className, isActive, ...props }: ChipProps) {
  return (
    <button
      type={props.type ?? "button"}
      className={cn(
        "inline-flex items-center rounded-[var(--radius-pill)] border px-3 py-1 text-xs font-medium transition",
        isActive
          ? "border-[--color-deep-teal] bg-[--color-deep-teal] text-white"
          : "border-[--color-border] bg-white text-[--color-text] hover:border-[--color-deep-teal]",
        className,
      )}
      {...props}
    />
  );
}
