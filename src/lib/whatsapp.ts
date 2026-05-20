import type { Product } from "@/types/catalog";

export const FALLBACK_PHONE_NUMBER = "628123456789";

export function createInquiryMessage(product: Pick<Product, "name" | "unitPrice">) {
  return [
    "Hello, I want to ask about this product:",
    `Product: ${product.name}`,
    `Price: ${product.unitPrice}`,
    "Is this item still available?",
  ].join("\n");
}

export function createWhatsAppUrl(message: string, phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || FALLBACK_PHONE_NUMBER) {
  const cleanPhone = phone.replace(/[^\d]/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}
