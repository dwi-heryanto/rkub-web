"use client";

import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import type { AnchorHTMLAttributes } from "react";

import { buttonVariants } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  url: string;
  children: ReactNode;
  location: string;
  productName?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
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
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </a>
  );
}
