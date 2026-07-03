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
    description: "Open the map for directions and quick access to our atelier.",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.1545954117346!2d103.94361207518355!3d1.0451079624791475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d98d50dcf00725%3A0xc33ccb6808efc28e!2sRumah%20Kreasi%20Usaha%20Bersama!5e0!3m2!1sen!2sid!4v1779774330410!5m2!1sen!2sid",
    placeUrl: "https://maps.app.goo.gl/qj3HXKyooLFZd2Hq8",
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
