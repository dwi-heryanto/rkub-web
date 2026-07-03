"use client";

import { useState } from "react";
import { Info } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { createWhatsAppUrl } from "@/lib/whatsapp";

interface ServiceRequestFormProps {
  whatsappNumber: string;
}

export function ServiceRequestForm({ whatsappNumber }: ServiceRequestFormProps) {
  const [detail, setDetail] = useState("");

  const message = detail.trim()
    ? `Hello, I want to request tailoring services.\n\nDetails:\n${detail.trim()}`
    : "Hello, I want to request tailoring services. Can I share my garment details and timeline?";

  const waLink = createWhatsAppUrl(message, whatsappNumber);

  return (
    <Card className="bg-white p-5 shadow-none">
      <CardContent className="space-y-4 p-0">
        <label htmlFor="service-request" className="text-sm font-semibold text-foreground">
          How can we help you today?
        </label>
        <p className="text-sm text-(--color-text-muted)">
          e.g., &quot;Hemming a suit jacket&quot;, &quot;Tapering dress pants&quot;, or &quot;Custom silk blouse design.&quot;
        </p>
        <textarea
          id="service-request"
          name="service-request"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          className="min-h-36 w-full rounded-card border border-border bg-white p-4 text-sm text-foreground outline-hidden focus:border-primary"
          placeholder="Provide details about the garment, fabric type (if known), and specific alterations required..."
        />
        <WhatsAppButton url={waLink} location="services_request" className="w-full sm:w-auto">
          Request via WhatsApp
        </WhatsAppButton>
        <p className="flex items-center justify-center gap-2 text-center text-xs text-(--color-text-muted)">
          <Info className="h-4 w-4" />
          Clicking this button will open WhatsApp and pre-fill your message to our master tailor.
        </p>
      </CardContent>
    </Card>
  );
}
