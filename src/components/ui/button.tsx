import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-[var(--color-accent)] text-white hover:opacity-90",
        secondary:
          "border border-[var(--color-accent)] bg-transparent text-[var(--color-accent)] hover:bg-[var(--color-accent)]/8",
        ghost: "bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-accent)]/8",
        inverse: "bg-[var(--color-paper-2)] text-[var(--color-accent)] hover:opacity-90",
        "outline-light": "border border-white/60 bg-transparent text-white hover:bg-white/10",
      },
      size: {
        default: "min-h-[44px] rounded-[var(--radius-sm)] px-5 py-3 text-sm font-semibold",
        chip: "rounded-[var(--radius-sm)] px-3 py-1 text-xs font-medium",
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
