export interface HeroContent {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface HighlightItem {
  title: string;
  description: string;
}

export interface GalleryItem {
  title: string;
  description: string;
  image: string;
}

export interface Testimonial {
  name: string;
  quote: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface HomepageContent {
  hero: HeroContent;
  highlights: HighlightItem[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
  whatsappCta: { title: string; description: string; message: string };
  map: { title: string; description: string; embedUrl?: string; placeUrl?: string };
}

export interface SiteSettings {
  siteName: string;
  description: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  seo: {
    title: string;
    description: string;
    image?: string;
  };
}
