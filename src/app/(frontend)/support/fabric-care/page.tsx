import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fabric Care | RKUB Family Tailoring Store",
  description: "Basic care guidance for common fabrics and embellished garments.",
};

export default function FabricCarePage() {
  return (
    <article className="mx-auto max-w-3xl space-y-4 pb-12">
      <h1 className="text-3xl font-bold">Fabric Care</h1>
      <p className="text-[var(--color-text-muted)]">
        Delicate fabrics and embellished pieces should be hand washed or dry cleaned to preserve texture and color.
      </p>
    </article>
  );
}
