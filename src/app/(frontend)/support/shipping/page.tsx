import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping | RKUB Family Tailoring Store",
  description: "Shipping and delivery information for catalog orders.",
};

export default function ShippingPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-4 pb-12">
      <h1 className="text-3xl font-bold">Shipping</h1>
      <p className="text-[var(--color-text-muted)]">
        Shipping options, lead times, and costs are confirmed during WhatsApp inquiry based on item type and destination.
      </p>
    </article>
  );
}
