# rkub-web

A minimalist, mobile-first catalog website for a family tailoring store.

## Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS
- Framer Motion
- Payload CMS schema stubs
- Supabase/Cloudinary-ready abstractions

## Key Features

- Soft minimalist design system based on warm canvas colors and strong readability
- Homepage sections for catalog discovery, rental/services, testimonials, FAQ, and map placeholder
- Catalog browsing with category filter, alias-aware search, and simple typo tolerance
- Product detail pages with attributes, image gallery, and WhatsApp prefilled inquiry CTA
- SEO foundations: metadata, OpenGraph, robots.txt, sitemap.xml, local business schema
- Analytics script hooks for Google Analytics and Microsoft Clarity
- Storage provider abstraction for Cloudinary/S3/R2 migration readiness

## Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_CLARITY_ID=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
STORAGE_PROVIDER=cloudinary
CLOUDINARY_CLOUD_NAME=
DATABASE_URL=
```

## Run

```bash
npm install
npm run dev
npm run lint
npm run build
```
