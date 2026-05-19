import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-deep-teal]/30 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-[--color-deep-teal] text-white hover:bg-[--color-forest-canopy]",
        secondary:
          "border border-[--color-deep-teal] bg-transparent text-[--color-deep-teal] hover:bg-[--color-soft-peach]",
        ghost: "bg-transparent text-[--color-text] hover:bg-[--color-soft-peach]",
        chip: "border border-[--color-border] bg-white text-[--color-text] hover:border-[--color-deep-teal]",
        chipActive: "border border-[--color-deep-teal] bg-[--color-deep-teal] text-white",
      },
      size: {
        default: "min-h-[44px] rounded-[var(--radius-card)] px-5 py-3 text-sm font-semibold",
        chip: "rounded-[var(--radius-pill)] px-3 py-1 text-xs font-medium",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant }), className)} {...props} />;
}
