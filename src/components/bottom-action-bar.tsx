"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Bookmark, Home, LayoutGrid, MessageCircle, Search, Share2, SlidersHorizontal } from "lucide-react";

import { createWhatsAppUrl } from "@/lib/whatsapp";

interface BottomActionBarProps {
  whatsappNumber: string;
}

type Action =
  | {
      label: string;
      icon: React.ReactNode;
      href: string;
      external?: boolean;
      pill?: boolean;
      onClick?: never;
    }
  | {
      label: string;
      icon: React.ReactNode;
      href?: never;
      external?: never;
      pill?: boolean;
      onClick: () => void;
    };

function ActionButton({ action }: { action: Action }) {
  const baseClassName = action.pill
    ? "flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-3 py-2 text-[11px] font-semibold text-white shadow-[0_10px_24px_rgba(37,211,102,0.22)] transition-colors hover:bg-[#1EBE5D]"
    : "flex min-h-14 flex-1 flex-col items-center justify-center gap-1 rounded-2xl border border-[var(--color-rule)] bg-white/90 px-2 py-2 text-[11px] font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-paper-2)]";

  const content = (
    <>
      {action.icon}
      <span className={action.pill ? "whitespace-nowrap" : "leading-tight"}>{action.label}</span>
    </>
  );

  if ("href" in action) {
    return (
      <Link
        href={action.href}
        target={action.external ? "_blank" : undefined}
        rel={action.external ? "noreferrer" : undefined}
        className={baseClassName}
        aria-label={action.label}
      >
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={action.onClick} className={baseClassName} aria-label={action.label}>
      {content}
    </button>
  );
}

export function BottomActionBar({ whatsappNumber }: BottomActionBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isCatalog = pathname.startsWith("/catalog");
  const isProductDetail = pathname.startsWith("/products/");

  const waMessage = isProductDetail
    ? "Hello, I want to ask about this product on the website."
    : isCatalog
      ? "Hello, I want help choosing from the catalog."
      : "Hello, I want to ask about your products and services.";
  const whatsappUrl = createWhatsAppUrl(waMessage, whatsappNumber);

  const shareCurrentPage = async () => {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({ title: document.title, url });
      return;
    }

    await navigator.clipboard.writeText(url);
  };

  const saveCurrentPage = async () => {
    await navigator.clipboard.writeText(window.location.href);
  };

  const backToPreviousPage = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/catalog");
  };

  const actions: Action[] = isProductDetail
    ? [
        { label: "Back", icon: <ArrowLeft className="h-4 w-4" />, onClick: backToPreviousPage },
        { label: "Save", icon: <Bookmark className="h-4 w-4" />, onClick: saveCurrentPage },
        { label: "Share", icon: <Share2 className="h-4 w-4" />, onClick: shareCurrentPage },
        {
          label: "Inquire on WhatsApp",
          icon: <MessageCircle className="h-4 w-4" />,
          href: whatsappUrl,
          external: true,
          pill: true,
        },
      ]
    : isCatalog
      ? [
          { label: "Home", icon: <Home className="h-4 w-4" />, href: "/" },
          { label: "Filters", icon: <SlidersHorizontal className="h-4 w-4" />, href: "#catalog-browser" },
          { label: "Search", icon: <Search className="h-4 w-4" />, onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
          {
            label: "Chat on WhatsApp",
            icon: <MessageCircle className="h-4 w-4" />,
            href: whatsappUrl,
            external: true,
            pill: true,
          },
        ]
      : [
          { label: "Home", icon: <Home className="h-4 w-4" />, href: "/" },
          { label: "Catalog", icon: <LayoutGrid className="h-4 w-4" />, href: "/catalog" },
          { label: "Search", icon: <Search className="h-4 w-4" />, onClick: () => router.push("/catalog") },
          {
            label: "Chat on WhatsApp",
            icon: <MessageCircle className="h-4 w-4" />,
            href: whatsappUrl,
            external: true,
            pill: true,
          },
        ];

  return (
    <section
      aria-label="Bottom action bar"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--color-rule)] bg-[var(--color-paper)]/95 backdrop-blur-md md:hidden"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-4 gap-2 px-3 py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] sm:px-6">
        {actions.map((action) => (
          <ActionButton key={action.label} action={action} />
        ))}
      </div>
    </section>
  );
}