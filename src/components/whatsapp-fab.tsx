\"use client\";

import { trackEvent } from \"@/lib/analytics\";
import { createWhatsAppUrl } from \"@/lib/whatsapp\";

export function WhatsAppFab() {
  const url = createWhatsAppUrl("Hello, I want to ask about your catalog and tailoring services.");

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent("whatsapp_click", { location: "fab" })}
      className="fixed bottom-5 right-5 z-40 rounded-[var(--radius-card)] bg-[--color-deep-teal] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[--color-forest-canopy]"
      aria-label="Contact via WhatsApp"
    >
      WhatsApp
    </a>
  );
}
