"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/catalog", label: "Catalog" },
  { href: "/#services", label: "Services" },
  { href: "/#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[--color-border] bg-[--color-bg]/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold text-[--color-deep-teal]">
          RKUB Tailoring
        </Link>
        <div className="hidden items-center gap-4 sm:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-[--color-text] hover:text-[--color-deep-teal]">
              {link.label}
            </Link>
          ))}
          <Link href="/catalog">
            <Button variant="secondary">Browse</Button>
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex items-center rounded-[var(--radius-card)] border border-[--color-border] px-3 py-2 text-sm font-semibold text-[--color-text] sm:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          Menu
        </button>
      </nav>
      <div
        className={cn(
          "border-t border-[--color-border] bg-[--color-bg] px-4 py-4 sm:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[--color-text]"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/catalog" onClick={() => setOpen(false)}>
            <Button variant="secondary" className="w-full">
              Browse Catalog
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
