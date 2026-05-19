"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppFab() {
  const url = createWhatsAppUrl("Hello, I want to ask about your catalog and tailoring services.");

  return (
    <Button
      variant="primary"
      onClick={() => trackEvent("whatsapp_click", { location: "fab" })}
      className="fixed bottom-5 right-5 z-40"
    >
      <Link href={url} target="_blank" rel="noreferrer" aria-label="Contact via WhatsApp">
        WhatsApp
      </Link>
    </Button>
  );
}
