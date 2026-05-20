"use client";

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
  variant?: "primary" | "secondary" | "ghost" | "inverse" | "outline-light";
  size?: "default" | "chip";
}

export function WhatsAppButton({
  url,
  children,
  location,
  productName,
  className,
  variant = "primary",
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
