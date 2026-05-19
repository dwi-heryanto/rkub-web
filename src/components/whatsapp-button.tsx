"use client";

import type { ReactNode } from "react";

import { buttonVariants } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  url: string;
  children: ReactNode;
  location: string;
  productName?: string;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
}

export function WhatsAppButton({
  url,
  children,
  location,
  productName,
  className,
  variant = "primary",
}: WhatsAppButtonProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent("whatsapp_click", { location, product: productName || "" })}
      className={cn(buttonVariants({ variant }), className)}
    >
      {children}
    </a>
  );
}
