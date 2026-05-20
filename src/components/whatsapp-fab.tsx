"use client";

import { trackEvent } from "@/lib/analytics";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppFab() {
  const url = createWhatsAppUrl("Hello, I want to ask about your catalog and tailoring services.");

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact via WhatsApp"
      onClick={() => trackEvent("whatsapp_click", { location: "fab" })}
      className="fixed bottom-5 right-5 z-40 inline-flex min-h-[48px] items-center justify-center rounded-[var(--radius-card)] border-2 border-white bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(0,0,0,0.34)] transition-colors hover:bg-[#1EBE5D]"
    >
      WhatsApp
    </a>
  );
}
