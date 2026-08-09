"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

import { WhatsAppButton } from "@/components/whatsapp-button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import type { Product } from "@/types/catalog";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact" | "rental" | "materials" | "featured";
  showWhatsAppAction?: boolean;
  whatsappUrl?: string;
  className?: string;
}

const aspectClass: Record<NonNullable<ProductCardProps["variant"]>, string> = {
  default: "aspect-4/3",
  compact: "aspect-square",
  rental: "aspect-3/4",
  materials: "aspect-4/3",
  featured: "aspect-auto h-52",
};

export function ProductCard({
  product,
  variant = "default",
  showWhatsAppAction = false,
  whatsappUrl,
  className,
}: ProductCardProps) {
  const resolvedWhatsAppUrl = whatsappUrl ?? createWhatsAppUrl(`Hello, I want to ask about: ${product.name} (${product.unitPrice}). Is this available?`);
  const aspect = aspectClass[variant];

  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className={cn("h-full", className)}
    >
      <Card className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border-[var(--color-rule)] bg-[var(--color-paper-2)] p-0 transition-all duration-200 hover:shadow-[var(--shadow-soft)]">
        <Link href={`/products/${product.slug}`} className="flex h-full flex-col">
          <div className={cn("relative overflow-hidden bg-[var(--color-paper)]", aspect)}>
            <Image
              src={product.image}
              alt={product.name}
              fill={variant !== "featured"}
              width={variant === "featured" ? 704 : undefined}
              height={variant === "featured" ? 396 : undefined}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {product.tags[0] ? (
              <span className="absolute left-3 top-3 rounded-full border border-[var(--color-rule)] bg-[var(--color-paper-2)]/90 px-3 py-1 text-[11px] font-semibold text-[var(--color-accent)] backdrop-blur">
                {product.tags[0]}
              </span>
            ) : null}
          </div>
          <div className="flex grow flex-col p-5">
            <span className="inline-flex w-fit rounded-full bg-[var(--color-accent)]/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
              {product.category.replace(/-/g, " ")}
            </span>
            <h3 className="mt-3 text-base font-semibold text-[var(--color-ink)]">{product.name}</h3>
            <p className="mt-1 text-sm font-semibold text-[var(--color-accent)]">{product.unitPrice}</p>
            {showWhatsAppAction ? (
              <div className="mt-auto pt-4">
                <WhatsAppButton
                  url={resolvedWhatsAppUrl}
                  location="catalog_card"
                  aria-label={`Inquire about ${product.name} via WhatsApp`}
                  variant="outline"
                  size="chip"
                  className="w-full border border-[var(--color-rule)]"
                >
                  <MessageCircle className="h-4 w-4" /> Inquire
                </WhatsAppButton>
              </div>
            ) : null}
          </div>
        </Link>
      </Card>
    </motion.article>
  );
}
