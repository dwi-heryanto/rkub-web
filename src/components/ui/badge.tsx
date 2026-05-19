import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center rounded-[var(--radius-pill)] px-3 py-1 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "bg-[--color-soft-peach] text-[--color-forest-canopy]",
        suggestion: "bg-[--color-sky-haze] font-medium text-[--color-forest-canopy]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}
