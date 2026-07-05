import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | RKUB Family Tailoring Store",
  description: "How RKUB handles inquiry and customer information.",
};

export default function PrivacyPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-4 pb-12">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="text-[var(--color-text-muted)]">
        We only use customer information to respond to inquiries, fulfill requests, and improve service communication.
      </p>
    </article>
  );
}
