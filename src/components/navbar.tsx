/* Hallmark · component: navbar · archetype: N9 edge-aligned minimal · genre: editorial
 * nav: N9 · wordmark Lora · CTA accent-filled · space is the design
 */

"use client";

import Link from "next/link";
import { Search } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function Navbar() {
  const waUrl = createWhatsAppUrl("Hello, I would like to inquire about your products.");

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-[var(--color-bg)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-bg)]/80">
      <nav
        className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-[var(--space-md)] py-4 sm:px-[var(--space-lg)]"
        style={{ paddingLeft: "clamp(1rem, 4vw, 2.5rem)", paddingRight: "clamp(1rem, 4vw, 2.5rem)" }}
      >
        {/* Wordmark — Lora display, left */}
        <Link
          href="/"
          className="shrink-0 font-[var(--font-display)] text-xl font-semibold tracking-[-0.01em] text-[var(--color-ink)] no-underline"
        >
          Stitch &amp; Sew
        </Link>

        {/* Vast empty middle — the space IS the design */}

        {/* Right group: search + theme + WhatsApp CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/catalog"
            className="hidden rounded-md p-2 text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)] sm:block"
            aria-label="Search catalog"
          >
            <Search className="h-4 w-4" />
          </Link>
          <ThemeToggle />
          <Link
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ size: "chip" }),
              "rounded-lg bg-[var(--color-accent)] text-white hover:opacity-90",
            )}
          >
            Inquire
          </Link>
        </div>
      </nav>
    </header>
  );
}
