import { MessageCircle } from "lucide-react";

import { WhatsAppButton } from "@/components/whatsapp-button";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface WhatsAppBandProps {
  title: string;
  description: string;
  message: string;
  whatsappNumber?: string;
  ctaLabel?: string;
  location?: string;
  className?: string;
}

export function WhatsAppBand({
  title,
  description,
  message,
  whatsappNumber,
  ctaLabel = "Chat on WhatsApp",
  location = "whatsapp_band",
  className,
}: WhatsAppBandProps) {
  return (
    <section className={cn("overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-accent)] px-6 py-10 text-white sm:px-10 sm:py-12", className)}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <h2 className="font-[var(--font-display)] text-[var(--text-2xl)] font-semibold leading-tight sm:text-[var(--text-3xl)]">
            {title}
          </h2>
          <p className="text-white/80">{description}</p>
        </div>
        <WhatsAppButton
          url={createWhatsAppUrl(message, whatsappNumber)}
          location={location}
          variant="secondary"
          size="lg"
          className={cn("w-fit rounded-full px-6", "text-[var(--color-accent)]")}
        >
          <MessageCircle className="h-4 w-4" />
          {ctaLabel}
        </WhatsAppButton>
      </div>
    </section>
  );
}