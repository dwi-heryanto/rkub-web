import type { Metadata } from "next";
import { CalendarDays, Info, Scissors, Shirt, Wrench } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { getSiteSettings } from "@/lib/cms";

export const metadata: Metadata = createMetadata(
  "Tailoring Services | RKUB Family Tailoring Store",
  "Alterations, custom tailoring, and garment repairs with direct WhatsApp request flow.",
  "/services",
);

const services = [
  {
    title: "Alterations",
    description: "Precise adjustments to ready-to-wear garments for an impeccable silhouette.",
    icon: Scissors,
  },
  {
    title: "Custom Tailoring",
    description: "Bespoke suits, shirts, and dresses built from the ground up to your exact measurements.",
    icon: Shirt,
  },
  {
    title: "Repairs",
    description: "Expert restoration, re-lining, and mending to extend the life of your favorite pieces.",
    icon: Wrench,
  },
];

export default async function ServicesPage() {
  const settings = await getSiteSettings();
  const waLink = createWhatsAppUrl(
    "Hello, I want to request tailoring services. Can I share my garment details and timeline?",
    settings.whatsappNumber,
  );

  return (
    <div className="space-y-12 pb-12">
      <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2">
            <Scissors className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Bespoke Tailoring</span>
          </div>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Perfect fit,
            <br />
            <span className="text-primary">masterfully crafted.</span>
          </h1>
          <p className="max-w-xl text-2xl leading-relaxed text-[var(--color-text-muted)]">
            From simple alterations to complete custom garments, our master tailors ensure every stitch serves your individual style and comfort.
          </p>
          <div className="grid gap-6 border-t border-border pt-6 md:grid-cols-3">
            {services.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="space-y-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-white">
          <div className="aspect-[4/5] bg-[url('/gallery/service-tailoring.svg')] bg-cover bg-center" />
          <div className="absolute inset-x-6 bottom-6 flex items-center justify-between rounded-xl border border-white/50 bg-white/90 px-4 py-3 backdrop-blur">
            <div>
              <p className="text-sm font-semibold">Consultations</p>
              <p className="text-xs text-[var(--color-text-muted)]">Available by appointment</p>
            </div>
            <CalendarDays className="h-5 w-5 text-primary" />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border-y border-border bg-[var(--color-sky-haze)]/20 p-6 sm:p-10">
        <div className="mx-auto max-w-3xl space-y-5">
          <div className="space-y-2 text-center">
            <h2 className="text-4xl font-bold">Describe your request</h2>
            <p className="text-base text-[var(--color-text-muted)]">Tell us what you need, and we&apos;ll prepare a quote and timeline.</p>
          </div>
          <Card className="bg-white p-5 shadow-none">
            <CardContent className="space-y-4 p-0">
              <label className="text-sm font-semibold text-foreground">How can we help you today?</label>
              <p className="text-sm text-[var(--color-text-muted)]">
                e.g., &quot;Hemming a suit jacket&quot;, &quot;Tapering dress pants&quot;, or &quot;Custom silk blouse design.&quot;
              </p>
              <textarea
                className="min-h-36 w-full rounded-[var(--radius-card)] border border-border bg-white p-4 text-sm text-foreground outline-none focus:border-[var(--color-deep-teal)]"
                placeholder="Provide details about the garment, fabric type (if known), and specific alterations required..."
              />
              <a href={waLink} target="_blank" rel="noreferrer">
                <Button className="w-full sm:w-auto">Request via WhatsApp</Button>
              </a>
              <p className="flex items-center justify-center gap-2 text-center text-xs text-[var(--color-text-muted)]">
                <Info className="h-4 w-4" />
                Clicking this button will open WhatsApp and pre-fill a message to our master tailor.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
