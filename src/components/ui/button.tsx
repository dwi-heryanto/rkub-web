import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-card)] px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-deep-teal]/30 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-[--color-deep-teal] text-white hover:bg-[--color-forest-canopy]",
        secondary: "bg-[--color-soft-peach] text-[--color-text] hover:bg-[--color-muted-mandarin]",
        ghost: "bg-white text-[--color-deep-teal] hover:bg-[--color-soft-peach]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant }), className)} {...props} />;
}
