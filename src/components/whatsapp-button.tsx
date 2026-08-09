"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import type { AnchorHTMLAttributes } from "react";

import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const whatsappButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border text-sm font-semibold transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:opacity-90",
        outline: "border-[var(--color-accent)] bg-transparent text-[var(--color-accent)] hover:bg-[var(--color-accent)]/8",
        light: "border-[var(--color-rule)] bg-[var(--color-paper-2)] text-[var(--color-ink)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
      },
      size: {
        default: "h-11 px-5 py-3",
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-12 px-6 py-3 text-base",
        chip: "h-8 px-3 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface WhatsAppButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  url: string;
  children: ReactNode;
  location: string;
  productName?: string;
  variant?: VariantProps<typeof whatsappButtonVariants>["variant"];
  size?: VariantProps<typeof whatsappButtonVariants>["size"];
}

export function WhatsAppButton({
  url,
  children,
  location,
  productName,
  className,
  variant = "default",
  size = "default",
  onClick,
  ...props
}: WhatsAppButtonProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      onClick={(event) => {
        trackEvent("whatsapp_click", { location, product: productName || "" });
        onClick?.(event);
      }}
      className={cn(whatsappButtonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </a>
  );
}
