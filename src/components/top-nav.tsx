"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

import { MobileMenu } from "@/components/mobile-menu";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const links = [
  { href: "/catalog?tab=tools", label: "Tools" },
  { href: "/catalog?tab=fabric", label: "Fabrics" },
  { href: "/catalog?tab=rental", label: "Rentals" },
  { href: "/services", label: "Services" },
];

export function TopNav({ whatsappNumber }: { whatsappNumber: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const waUrl = createWhatsAppUrl("Hello, I want to inquire about your products and services.", whatsappNumber);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 8);

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-200",
        scrolled ? "border-b border-[var(--color-rule)] bg-[var(--color-paper)]/95 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-base font-semibold tracking-[0.18em] text-[var(--color-ink)] uppercase">
          Stitch &amp; Sew
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          <Link
            href="/catalog"
            aria-label="Search catalog"
            className={cn(buttonVariants({ variant: "ghost", size: "chip" }), "h-10 w-10 px-0")}
          >
            <Search className="h-4 w-4" />
          </Link>

          <div className="hidden items-center gap-1 md:flex lg:gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-paper-2)]"
              >
                {link.label}
              </Link>
            ))}
            <Link href={waUrl} target="_blank" rel="noreferrer" className={buttonVariants({ size: "chip" })}>
              WhatsApp
            </Link>
          </div>

          <button
            type="button"
            className={cn(buttonVariants({ variant: "secondary", size: "chip" }), "h-10 w-10 px-0 md:hidden")}
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="top-nav-menu"
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}