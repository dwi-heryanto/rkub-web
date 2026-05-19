import type { Product } from "@/types/catalog";

export const categories = [
  { slug: "tailoring-tools", label: "Tailoring Tools" },
  { slug: "fabrics", label: "Fabrics" },
  { slug: "beads-accessories", label: "Beads & Accessories" },
  { slug: "rental-costumes", label: "Rental Costumes" },
  { slug: "traditional-clothing", label: "Traditional Clothing" },
  { slug: "decorative-materials", label: "Decorative Materials" },
  { slug: "tailoring-services", label: "Tailoring Services" },
] as const;

export const products: Product[] = [
  {
    id: "fabric-brocade-lace",
    slug: "premium-brocade-lace",
    name: "Premium Brocade Lace",
    aliases: ["brokat", "brukat", "lace kebaya", "kain pesta"],
    category: "fabrics",
    tags: ["lace", "kebaya", "wedding"],
    unitPrice: "Rp 45.000/meter",
    description: "Elegant brocade lace for kebaya, formal dress, and special occasions.",
    image: "/gallery/fabric-brocade.svg",
    gallery: ["/gallery/fabric-brocade.svg", "/gallery/fabric-roll.svg"],
    attributes: [
      { key: "color", label: "Color", value: "Ivory" },
      { key: "material", label: "Material", value: "Polyester lace blend" },
      { key: "width", label: "Width", value: "120 cm" },
      { key: "motif", label: "Motif", value: "Floral" },
    ],
  },
  {
    id: "bead-pearl-4mm",
    slug: "pearl-bead-4mm",
    name: "Pearl Bead 4mm",
    aliases: ["manik mutiara", "beads kecil", "mutiara"],
    category: "beads-accessories",
    tags: ["embroidery", "wedding", "handcraft"],
    unitPrice: "Rp 12.000/pack",
    description: "Classic pearl beads suitable for bridal and decorative tailoring accents.",
    image: "/gallery/bead-pearl.svg",
    gallery: ["/gallery/bead-pearl.svg", "/gallery/bead-set.svg"],
    attributes: [
      { key: "color", label: "Color", value: "White" },
      { key: "size", label: "Size", value: "4mm" },
      { key: "finish", label: "Finish", value: "Glossy" },
    ],
  },
  {
    id: "rental-kebaya-bali",
    slug: "kebaya-bali-rental",
    name: "Kebaya Bali Rental",
    aliases: ["sewa kebaya", "kostum adat bali", "baju adat"],
    category: "rental-costumes",
    tags: ["rental", "traditional", "event"],
    unitPrice: "Rp 180.000/hari",
    description: "Traditional Bali kebaya set available in multiple sizes and colors.",
    image: "/gallery/rental-kebaya.svg",
    gallery: ["/gallery/rental-kebaya.svg", "/gallery/rental-showcase.svg"],
    attributes: [
      { key: "size", label: "Size", value: "S - XL" },
      { key: "gender", label: "Gender", value: "Women" },
      { key: "region", label: "Region", value: "Bali" },
      { key: "age_group", label: "Age Group", value: "Teens - Adults" },
    ],
  },
  {
    id: "service-custom-tailoring",
    slug: "custom-tailoring-service",
    name: "Custom Tailoring Service",
    aliases: ["jahit custom", "jahit kebaya", "tailor request"],
    category: "tailoring-services",
    tags: ["tailoring", "custom", "measurement"],
    unitPrice: "Mulai Rp 250.000",
    description: "Custom tailoring based on your design references and body measurements.",
    image: "/gallery/service-tailoring.svg",
    gallery: ["/gallery/service-tailoring.svg", "/gallery/service-measure.svg"],
    attributes: [
      { key: "timeline", label: "Timeline", value: "3 - 7 days" },
      { key: "consultation", label: "Consultation", value: "Available via WhatsApp" },
    ],
  },
];

export const testimonials = [
  {
    name: "Nina",
    quote: "The catalog is easy to browse and WhatsApp ordering is super practical.",
  },
  {
    name: "Arif",
    quote: "The rental options are clear and the staff responds quickly.",
  },
];

export const faqs = [
  {
    question: "Can I ask for custom tailoring?",
    answer: "Yes. Share your design reference, size, and event date through WhatsApp.",
  },
  {
    question: "How do rentals work?",
    answer: "Pick your preferred costume, confirm size and date, then reserve through WhatsApp.",
  },
];
