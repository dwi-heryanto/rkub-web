import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-deep-teal)]/30 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-[var(--color-deep-teal)] !text-white hover:bg-[var(--color-forest-canopy)]",
        secondary:
          "border border-[var(--color-deep-teal)] bg-transparent text-[var(--color-deep-teal)] hover:bg-[var(--color-soft-peach)]",
        ghost: "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-soft-peach)]",
        inverse: "bg-white !text-primary hover:bg-[#f7f7f7]",
        "outline-light": "border border-white/60 bg-transparent !text-white hover:bg-white/10",
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

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { }

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
