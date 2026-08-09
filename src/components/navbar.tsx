"use client";

import Link from "next/link";
import { useState } from "react";

import { ClientSearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { cn } from "@/lib/utils";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const links = [
  { href: "/catalog?tab=tools", label: "Tools" },
  { href: "/catalog?tab=fabric", label: "Fabrics" },
  { href: "/catalog?tab=rental", label: "Rentals" },
  { href: "/services", label: "Services" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const waUrl = createWhatsAppUrl("Hello, I want to inquire about your products and services.");

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border-strong)] bg-[var(--color-bg)]/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold text-[var(--color-deep-teal)]">
          Stitch & Sew
        </Link>
        <div className="hidden items-center gap-2 md:flex">
          <ClientSearchInput
            placeholder="Search..."
            location="navbar_search"
            className="w-48"
            inputClassName="min-h-9 py-2 text-sm"
          />
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-1 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-soft-peach)] hover:text-[var(--color-deep-teal)]"
            >
              {link.label}
            </Link>
          ))}
          <WhatsAppButton url={waUrl} location="navbar" size="sm">
            WhatsApp Inquiry
          </WhatsAppButton>
        </div>
        <Button
          type="button"
          variant="secondary"
          className="md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          Menu
        </Button>
      </nav>
      <div
        className={cn(
          "border-t border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-4 sm:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-text)]"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <WhatsAppButton url={waUrl} location="navbar_mobile" className="w-full" onClick={() => setOpen(false)}>
            WhatsApp Inquiry
          </WhatsAppButton>
        </div>
      </div>
    </header>
  );
}
