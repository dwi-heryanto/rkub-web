import { createWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppFab() {
  const url = createWhatsAppUrl("Hello, I want to ask about your catalog and tailoring services.");

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 rounded-2xl bg-[--color-deep-teal] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[--color-forest-canopy]"
      aria-label="Contact via WhatsApp"
    >
      WhatsApp
    </a>
  );
}
