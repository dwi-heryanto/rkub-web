import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sizing Guide | RKUB Family Tailoring Store",
  description: "General sizing guide for rentals and tailoring requests.",
};

export default function SizingGuidePage() {
  return (
    <article className="mx-auto max-w-3xl space-y-4 pb-12">
      <h1 className="text-3xl font-bold">Sizing Guide</h1>
      <p className="text-[var(--color-text-muted)]">
        Share chest, waist, hip, and height measurements in WhatsApp for the fastest recommendation.
      </p>
    </article>
  );
}
