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
      className="h-full"
    >
      <Card className="group flex h-full flex-col overflow-hidden p-0 transition-all duration-200 hover:shadow-(--shadow-soft)">
        <Link href={`/products/${product.slug}`} className="flex h-full flex-col">
          <div className={cn("relative overflow-hidden bg-muted", aspect)}>
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
              <span className="absolute left-3 top-3 rounded-full bg-background px-3 py-1 text-xs font-semibold text-primary">
                {product.tags[0]}
              </span>
            ) : null}
          </div>
          <div className="flex grow flex-col p-5">
            <h3 className="text-base font-semibold text-foreground">{product.name}</h3>
            <p className="mt-1 text-sm font-semibold text-primary">{product.unitPrice}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-primary">
              {product.category.replace(/-/g, " ")}
            </p>
            {showWhatsAppAction ? (
              <div className="mt-auto pt-4">
                <WhatsAppButton
                  url={resolvedWhatsAppUrl}
                  location="catalog_card"
                  aria-label={`Inquire about ${product.name} via WhatsApp`}
                  variant="ghost"
                  size="chip"
                  className="w-full border border-border"
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
