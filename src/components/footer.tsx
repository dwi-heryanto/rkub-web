import Link from "next/link";

import { getHomepageContent, getSiteSettings } from "@/lib/cms";
import { createWhatsAppUrl } from "@/lib/whatsapp";

type FooterSettings = Awaited<ReturnType<typeof getSiteSettings>> & {
  hours?: string;
  mapUrl?: string;
};

const internalColumns = [
  {
    title: "Shop",
    links: [
      { href: "/catalog?tab=fabric", label: "Fabrics" },
      { href: "/catalog?tab=materials", label: "Materials" },
      { href: "/catalog?tab=rental", label: "Rentals" },
      { href: "/catalog?tab=tools", label: "Tools" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services", label: "Services" },
      { href: "/catalog?tab=traditional", label: "Traditional Clothing" },
      { href: "/catalog?tab=rental", label: "Costume Rentals" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/support/sizing-guide", label: "Sizing Guide" },
      { href: "/support/fabric-care", label: "Fabric Care" },
      { href: "/support/shipping", label: "Shipping" },
    ],
  },
  {
    title: "Legal",
    links: [{ href: "/support/privacy-policy", label: "Privacy Policy" }],
  },
];

export async function Footer() {
  const [settings, homepage] = await Promise.all([getSiteSettings(), getHomepageContent()]);
  const footerSettings = settings as FooterSettings;
  const waUrl = createWhatsAppUrl("Hello, I have a question and would like to chat.", settings.whatsappNumber);
  const mapUrl = footerSettings.mapUrl?.trim() || homepage.map.placeUrl?.trim() || "https://maps.app.goo.gl/qj3HXKyooLFZd2Hq8";
  const hours = footerSettings.hours?.trim() || "Mon-Sat, 09:00-17:00";
  const socialLinks = [
    { href: waUrl, label: "WhatsApp" },
    { href: mapUrl, label: "Google Maps" },
    { href: `tel:${settings.phone.replace(/[^\d+]/g, "")}`, label: "Call" },
  ];

  return (
    <footer className="border-t border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-ink)]">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.9fr_0.9fr_0.9fr_0.8fr]">
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-ink-2)]">Warm sign-off</p>
              <p className="font-display text-3xl leading-none text-[var(--color-accent)] sm:text-4xl">Yours, Stitch &amp; Sew</p>
            </div>
            <p className="max-w-md text-sm text-[var(--color-ink-2)]">{settings.description}</p>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-ink-2)]">Hours</p>
                <p className="mt-1 font-medium text-[var(--color-ink)]">{hours}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-ink-2)]">Address</p>
                <p className="mt-1 font-medium text-[var(--color-ink)]">{settings.address}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-ink-2)]">Map</p>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-focus)]"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>

          {internalColumns.map((column) => (
            <div key={column.title} className="space-y-3 text-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-ink-2)]">{column.title}</p>
              <div className="flex flex-col gap-2 text-[var(--color-ink)]">
                {column.links.map((link) => (
                  <Link key={link.href} href={link.href} className="transition-colors hover:text-[var(--color-accent)]">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-[var(--color-rule)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--color-ink-2)]">
            © {new Date().getFullYear()} {settings.siteName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label === "Call" ? undefined : "_blank"}
                rel={link.label === "Call" ? undefined : "noreferrer"}
                className="inline-flex items-center rounded-full border border-[var(--color-rule)] bg-[var(--color-paper-2)] px-4 py-2 text-sm font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
