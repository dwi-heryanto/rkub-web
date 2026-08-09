"use client";

import { usePathname } from "next/navigation";

import { trackEvent } from "@/lib/analytics";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppFab() {
  const pathname = usePathname();
  const url = createWhatsAppUrl("Hello, I want to ask about your catalog and tailoring services.");

  // Hide FAB on product detail pages where a sticky mobile CTA bar is shown
  const isProductDetail = pathname.startsWith("/products/");

  if (isProductDetail) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact via WhatsApp"
      onClick={() => trackEvent("whatsapp_click", { location: "fab" })}
      className="fixed bottom-5 right-5 z-40 hidden min-h-[48px] items-center justify-center rounded-full border-2 border-white bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(0,0,0,0.34)] transition-colors hover:bg-[#1EBE5D] md:inline-flex"
    >
      WhatsApp
    </a>
  );
}
