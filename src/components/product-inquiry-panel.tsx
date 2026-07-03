"use client";

import { useState } from "react";

import { WhatsAppButton } from "@/components/whatsapp-button";
import { createInquiryMessage, createWhatsAppUrl } from "@/lib/whatsapp";
import type { Product } from "@/types/catalog";

interface ProductInquiryPanelProps {
  product: Pick<Product, "name" | "unitPrice">;
  location: string;
  showQuantity?: boolean;
  className?: string;
}

export function ProductInquiryPanel({
  product,
  location,
  showQuantity = false,
  className,
}: ProductInquiryPanelProps) {
  const [quantity, setQuantity] = useState(1);

  const message = showQuantity && quantity > 1
    ? `${createInquiryMessage(product)}\nQuantity: ${quantity}`
    : createInquiryMessage(product);

  const whatsappUrl = createWhatsAppUrl(message);

  return (
    <div className={className}>
      {showQuantity ? (
        <div className="space-y-3 border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-primary">Quantity</p>
            <div className="flex items-center rounded-lg border border-border bg-white">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 text-primary hover:bg-muted transition-colors"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="border-x border-border px-3 py-1 text-sm" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 text-primary hover:bg-muted transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
          <p className="text-xs text-(--color-text-muted)">
            Stock availability may vary. Please inquire for bulk orders.
          </p>
        </div>
      ) : null}

      <WhatsAppButton
        url={whatsappUrl}
        location={location}
        productName={product.name}
        className="mt-4 w-full"
      >
        Inquire via WhatsApp
      </WhatsAppButton>
    </div>
  );
}
