import type { HomepageContent, SiteSettings } from "@/types/content";

export const homepageContent: HomepageContent = {
  hero: {
    eyebrow: "Family Tailoring Store Catalog",
    title: "Browse fabrics, tools, rentals, and tailoring services with ease.",
    description:
      "Built for all ages with a clean canvas, soft accents, and comfortable reading. Discover products visually and continue your inquiry via WhatsApp.",
    primaryCta: { label: "Browse Catalog", href: "/catalog" },
    secondaryCta: { label: "Chat on WhatsApp", href: "whatsapp" },
  },
  highlights: [
    {
      title: "Rental Showcase",
      description: "Traditional and costume rentals with clear sizing support and WhatsApp confirmation flow.",
    },
    {
      title: "Custom Tailoring Services",
      description: "Send your design reference, measurements, and timeline for personalized tailoring.",
    },
  ],
  gallery: [
    {
      title: "Fabric Collections",
      description: "Soft textures and curated patterns for weddings and formalwear.",
      image: "/gallery/fabric-roll.svg",
    },
    {
      title: "Accessory Sets",
      description: "Beads, trims, and decorative accents ready for embellishment.",
      image: "/gallery/bead-set.svg",
    },
    {
      title: "Rental Highlights",
      description: "Traditional outfits with quick WhatsApp confirmation.",
      image: "/gallery/rental-showcase.svg",
    },
  ],
  testimonials: [
    {
      name: "Nina",
      quote: "The catalog is easy to browse and WhatsApp ordering is super practical.",
    },
    {
      name: "Arif",
      quote: "The rental options are clear and the staff responds quickly.",
    },
  ],
  faqs: [
    {
      question: "Can I ask for custom tailoring?",
      answer: "Yes. Share your design reference, size, and event date through WhatsApp.",
    },
    {
      question: "How do rentals work?",
      answer: "Pick your preferred costume, confirm size and date, then reserve through WhatsApp.",
    },
  ],
  whatsappCta: {
    title: "Continue on WhatsApp",
    description: "Send a quick message to confirm availability, sizing, and custom requests.",
    message: "Hello, I want to ask about your catalog and tailoring services.",
  },
  map: {
    title: "Find Us",
    description: "Google Maps section placeholder: integrate your real location embed in production.",
  },
};

export const siteSettings: SiteSettings = {
  siteName: "RKUB Family Tailoring Store",
  description: "Minimalist mobile-first catalog for tailoring tools, fabrics, accessories, rentals, and custom tailoring services.",
  address: "Indonesia",
  phone: "+62 812 3456 789",
  whatsappNumber: "+628123456789",
  seo: {
    title: "RKUB Family Tailoring Store",
    description: "Browse tailoring tools, fabrics, beads, accessories, rentals, and custom tailoring services.",
    image: "/gallery/fabric-brocade.svg",
  },
};
