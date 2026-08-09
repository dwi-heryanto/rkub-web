"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { WhatsAppButton } from "@/components/whatsapp-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const links = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
  { href: "/services", label: "Services" },
  { href: "/catalog?tab=rental", label: "Rentals" },
  { href: "/#about", label: "About" },
  { href: "/support/sizing-guide", label: "Support" },
  { href: "/#contact", label: "Contact" },
];

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute("disabled") && !element.getAttribute("aria-hidden"));
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const waUrl = createWhatsAppUrl("Hello, I want to inquire about your products and services.");

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const focusFirstElement = () => {
      const focusables = panelRef.current ? getFocusableElements(panelRef.current) : [];
      (focusables[0] ?? closeButtonRef.current)?.focus();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const focusables = getFocusableElements(panelRef.current);
      if (!focusables.length) {
        return;
      }

      const currentIndex = focusables.indexOf(document.activeElement as HTMLElement);
      const nextIndex = event.shiftKey
        ? (currentIndex <= 0 ? focusables.length - 1 : currentIndex - 1)
        : (currentIndex === focusables.length - 1 ? 0 : currentIndex + 1);

      event.preventDefault();
      focusables[nextIndex]?.focus();
    };

    const timeoutId = window.setTimeout(focusFirstElement, 0);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(timeoutId);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="top-nav-menu"
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            className="absolute inset-0 bg-(--color-forest-canopy)/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          />

          <motion.div
            ref={panelRef}
            className="relative flex h-full flex-col px-4 py-4 sm:px-6"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <Link href="/" className="text-base font-semibold tracking-[0.18em] text-white uppercase" onClick={onClose}>
                Stitch &amp; Sew
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                className={cn(buttonVariants({ variant: "ghost", size: "chip" }), "h-10 w-10 border border-white/15 bg-white/10 text-white hover:bg-white/15")}
                onClick={onClose}
                aria-label="Close navigation menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col justify-between gap-8 py-6">
              <nav aria-label="Mobile" className="grid gap-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-lg font-medium text-white transition-colors hover:bg-white/10"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="space-y-4 rounded-3xl border border-white/10 bg-white/8 p-5 text-white">
                <div className="space-y-1">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Need help fast?</p>
                  <p className="text-sm text-white/80">Send a WhatsApp message and we will respond directly.</p>
                </div>
                <WhatsAppButton
                  url={waUrl}
                  location="mobile_menu"
                  variant="default"
                  className="h-12 w-full rounded-2xl px-5 text-sm font-semibold"
                >
                  <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                </WhatsAppButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}