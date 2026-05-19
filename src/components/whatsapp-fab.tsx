"use client";

import { buttonVariants } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppFab() {
  const url = createWhatsAppUrl("Hello, I want to ask about your catalog and tailoring services.");

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent("whatsapp_click", { location: "fab" })}
      className={cn(buttonVariants({ variant: "primary" }), "fixed bottom-5 right-5 z-40")}
      aria-label="Contact via WhatsApp"
    >
      WhatsApp
    </a>
  );
}
