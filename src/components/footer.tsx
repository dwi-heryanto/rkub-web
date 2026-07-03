import Link from "next/link";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  const waUrl = createWhatsAppUrl("Hello, I have a question and would like to chat.");

  return (
    <footer className="bg-[var(--color-deep-teal)] text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-3">
          <Link href="/" className="text-lg font-bold">
            Stitch & Sew
          </Link>
          <p className="text-sm text-white/80">
            Crafting premium garments and providing exquisite fabrics with a direct and practical inquiry flow.
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-semibold text-white/90">Navigate</p>
          <div className="flex flex-col gap-2 text-white/70">
            <Link href="/catalog?tab=tools">Tools</Link>
            <Link href="/catalog?tab=fabric">Fabrics</Link>
            <Link href="/catalog?tab=rental">Rentals</Link>
            <Link href="/services">Services</Link>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-semibold text-white/90">Support</p>
          <div className="flex flex-col gap-2 text-white/70">
            <Link href="/support/sizing-guide">Sizing Guide</Link>
            <Link href="/support/fabric-care">Fabric Care</Link>
            <Link href="/support/shipping">Shipping</Link>
            <Link href="/support/privacy-policy">Privacy Policy</Link>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold text-white/90">Quick Inquiry</p>
          <p className="text-white/70">Have a specific request? Chat with our specialist directly.</p>
          <WhatsAppButton
            url={waUrl}
            location="footer_quick_inquiry"
            variant="inverse"
            className="px-4 py-2 font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
          >
            WhatsApp Us Now
          </WhatsAppButton>
        </div>
      </div>
    </footer>
  );
}
