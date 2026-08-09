"use client";

import { usePathname } from "next/navigation";

import { WhatsAppButton } from "@/components/whatsapp-button";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppFab() {
  const pathname = usePathname();
  const url = createWhatsAppUrl("Hello, I want to ask about your catalog and tailoring services.");

  // Hide FAB on product detail pages where a sticky mobile CTA bar is shown
  const isProductDetail = pathname.startsWith("/products/");

  if (isProductDetail) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 hidden md:block">
      <WhatsAppButton
        url={url}
        location="fab"
        aria-label="Contact via WhatsApp"
        className="shadow-[0_10px_28px_rgba(0,0,0,0.24)]"
      >
        WhatsApp
      </WhatsAppButton>
    </div>
  );
}
