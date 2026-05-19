# rkub-web

A minimalist, mobile-first catalog website for a family tailoring store.

## Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS
- shadcn/ui (Radix-based component primitives)
- Framer Motion
- Payload CMS schema stubs
- Supabase-hosted Postgres (via Payload CMS) with Cloudinary-ready abstractions

## Key Features

- Soft minimalist design system based on warm canvas colors and strong readability
- Homepage sections for catalog discovery, rental/services, testimonials, FAQ, and map placeholder
- Catalog browsing with category filter, alias-aware search, and simple typo tolerance
- Product detail pages with attributes, image gallery, and WhatsApp prefilled inquiry CTA
- SEO foundations: metadata, OpenGraph, robots.txt, sitemap.xml, local business schema
- Analytics script hooks for Google Analytics and Microsoft Clarity
- Storage provider abstraction for Cloudinary/S3/R2 migration readiness
- Stable section navigation from any page (`Services` and `FAQ` links route to homepage anchors)

## Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_CLARITY_ID=
NEXT_PUBLIC_GSC_VERIFICATION=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_PAYLOAD_URL=
PAYLOAD_URL=
STORAGE_PROVIDER=cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_FOLDER=rkub
DATABASE_URL=
```

## Run

```bash
npm install
npm run dev
npm run lint
npm run build
```

## UI Components (shadcn/ui)

- Project-level shadcn config is available in `/components.json`.
- Current catalog filters use shadcn-style Radix Select and Toggle primitives.
- To add more shadcn components later, use the shadcn CLI and keep outputs in `src/components/ui`.

## Payload CMS

- Payload admin is expected at `/admin` within the same Next.js deployment.
- REST API is expected at `/api` (set `PAYLOAD_URL` / `NEXT_PUBLIC_PAYLOAD_URL` when hosted separately).
- Supabase is used only as the managed Postgres host for Payload; apply SQL in `supabase/migrations` to enable FTS indexes.

## Cloudinary Signed Uploads

The upload API route (`/api/uploads`) returns signed Cloudinary parameters. Provide `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` to enable signing.
