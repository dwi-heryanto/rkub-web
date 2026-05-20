UPDATE — CURRENT IMPLEMENTATION STATUS (May 20, 2026)

Design direction has been refreshed to the latest Stitch screen set from project `8598452241295074689` (Modern Tailoring Digital Catalog). This document now tracks both original product requirements and redesign status.

What is already implemented:

* Stitch export pipeline with `curl -L` via `scripts/download-stitch-assets.sh`
* Updated `stitch/screens.manifest.csv` with latest hosted screen URLs
* Shared global navbar style aligned to Stitch detail reference `dcd3ea8749c54abb884727ae3c73a94e`
* Shared global footer added and wired in app layout
* Catalog modes expanded to:
  * `/catalog?tab=rental`
  * `/catalog?tab=fabric`
  * `/catalog?tab=tools`
  * `/catalog?tab=traditional`
  * `/catalog?tab=materials`
* URL-driven catalog filters for `fabric/tools` modes (`tab`, `color`, `width`, `toolKind`)
* Baseline `/services` page aligned to Stitch services direction
* Baseline product detail bento/sticky-CTA layout pass completed
* Seed data expanded with tailoring tools for filter validation

What remains in redesign phase:

* UI parity for the latest Stitch screen set is now complete across homepage, catalog variants, service page, and targeted product detail variants.
* Remaining work has shifted to QA/launch follow-up (visual baseline updates, CI accessibility automation, launch checklist, and production content rollout).

Non-goal for this phase:

* Payload CMS production integration is intentionally deferred until UI parity is complete

---

MASTER PROMPT — Family Tailoring Store Catalog Website (DESIGN SYSTEM INTEGRATED)

You are a senior full-stack engineer, UI/UX architect, and system designer.

Build a modern minimalist catalog website for a family tailoring store business.

The business includes:

* tailoring tools
* sewing equipment
* beads and accessories
* fabrics and textile materials
* traditional clothes rental
* costume rental
* tailoring services
* custom tailoring requests

The website is NOT a full e-commerce platform.

The primary user flow is:

* browse products visually
* search/filter items
* contact store through WhatsApp Business

The website must prioritize:

* simplicity
* mobile-first UX
* SEO optimization
* accessibility
* fast loading
* maintainability
* visual product discovery

⸻

DESIGN SYSTEM REQUIREMENT

Follow the attached DESIGN.md style system strictly.

Design philosophy:

* clean canvas
* soft rounded UI
* approachable interface
* purposeful accent colors
* lightweight flat surfaces
* strong typography
* minimal visual noise

Important design principles:

* minimalist layout
* comfortable spacing
* low visual complexity
* soft color accents
* flat cards without heavy shadows
* clean typography hierarchy
* gallery-focused product browsing
* subtle animation only

TECH STACK

Frontend

* Next.js 16 App Router latest
* TypeScript
* Tailwind CSS
* Framer Motion
* shadcn/ui

CMS

* Payload CMS

Database

* Supabase PostgreSQL

Media Storage

* Cloudinary

Hosting

* Netlify

Analytics

* Google Analytics
* Microsoft Clarity
* Google Search Console

⸻

WEBSITE STRUCTURE

Homepage

Sections:

* hero section
* category showcase
* featured collections
* rental showcase
* tailoring services
* visual gallery blocks
* testimonials
* WhatsApp CTA
* Google Maps section
* FAQ section

The homepage should feel:

* visually organized
* easy to scan
* image-focused
* not overcrowded

⸻

PRODUCT CATALOG SYSTEM

The website must support:

Product Categories

* tailoring tools
* fabrics
* beads & accessories
* rental costumes
* traditional clothing
* decorative materials
* tailoring services

⸻

PRODUCT DETAIL SYSTEM

Each product must support:

* large image gallery
* official product name
* aliases/local names
* pricing unit
* description
* tags
* related products
* WhatsApp inquiry button

⸻

ALIAS SEARCH SYSTEM

Products must support alternative names.

Example:
Official name:

* Premium Brocade Lace

Aliases:

* brokat
* brukat
* lace kebaya
* kain pesta

Search should match:

* name
* aliases
* tags
* categories

Implement:

* PostgreSQL full-text search
* autocomplete search
* typo tolerance if possible

⸻

DYNAMIC ATTRIBUTE SYSTEM

Different categories require different properties.

Examples:

Fabric

* color
* material
* width
* motif

Beads

* color
* size
* finish

Rental Costume

* size
* gender
* region
* age group

⸻

CMS REQUIREMENTS

Payload CMS admin panel must allow admins to:

* add/edit/remove products
* manage categories
* upload images
* manage dynamic attributes
* edit aliases
* manage rental catalog
* manage blog content
* edit SEO metadata

Admin should be able to:

* add new attributes
* remove attributes
* reorder attributes

without developer assistance.

⸻

IMAGE SYSTEM

Use:

* Cloudinary for media storage

DO NOT:

* store base64 images in database

Store only:

* image URLs
* alt text
* metadata

Implement:

* responsive image loading
* lazy loading
* WebP/AVIF optimization
* optimized mobile delivery

⸻

MOBILE-FIRST UX

Prioritize:

* large touch targets
* sticky WhatsApp button
* simple navigation
* lightweight interactions
* easy filtering/searching
* fast loading

The majority of users are expected to come from mobile devices.

⸻

ANIMATION SYSTEM

Use:

* Framer Motion
* subtle transitions
* lightweight hover effects
* smooth page transitions

Avoid:

* excessive animation
* distracting motion
* animation-heavy interfaces

⸻

SEO REQUIREMENTS

Implement:

* dynamic metadata
* OpenGraph
* sitemap.xml
* robots.txt
* schema markup
* local SEO optimization
* semantic HTML

Target local SEO:

* tailoring store
* fabric store
* rental costumes
* traditional clothing rental
* sewing tools

⸻

ANALYTICS REQUIREMENTS

Integrate:

* Google Analytics
* Microsoft Clarity
* Google Search Console

Track:

* WhatsApp clicks
* popular products
* search terms
* category engagement
* mobile usage

⸻

WHATSAPP CONVERSION FLOW

Every product and service should include:

* WhatsApp CTA
* prefilled inquiry message

Example:
“Hello, I want to ask about this product:
Product: Premium Lace
Price: Rp 45.000/meter
Is this item still available?”

⸻

PERFORMANCE REQUIREMENTS

Optimize for:

* mobile performance
* SEO
* fast loading
* image-heavy browsing

Implement:

* lazy loading
* dynamic imports
* image optimization
* code splitting
* SSR/SSG where appropriate

⸻

DEPLOYMENT REQUIREMENTS

Frontend:

* Netlify

Database:

* Supabase PostgreSQL

Media:

* Cloudinary

CMS:

* Payload CMS integrated with Next.js

⸻

STORAGE ABSTRACTION

Implement provider abstraction architecture.

Use:

* environment variables
* upload service abstraction
* provider pattern

Future migration-ready:

* Cloudinary
* Cloudflare R2
* S3

without rewriting application logic.

⸻

REQUIRED DELIVERABLES

Generate:

1. complete folder structure
2. Tailwind theme setup
3. Payload CMS collections
4. dynamic attribute architecture
5. search system
6. filtering system
7. Cloudinary upload system
8. Supabase integration
9. SEO architecture
10. analytics integration
11. responsive layouts
12. reusable UI components
13. TypeScript types
14. loading states
15. empty states
16. error handling
17. mobile-first navigation
18. WhatsApp integration system
19. Netlify deployment configuration
20. scalable production-ready architecture

The final product should feel:

* clean
* approachable
* modern
* visually organized
* easy for all ages
* optimized for product browsing
* optimized for WhatsApp conversion
* maintainable for family business operations
# Implementation Notes (2026-05-20)

- Fixed Next.js 16 dynamic API usage in `/products/[slug]` by unwrapping async `params` before reading `slug`.
- Fixed cross-page anchor navigation: navbar `Services` and `FAQ` now point to `/#services` and `/#faq`.
- Introduced shadcn/ui baseline configuration via `components.json`.
- Migrated catalog filters from handmade controls to shadcn-compatible `Select` (Radix) and `Toggle` components.
- Completed Stitch parity pass for:
  - `/`
  - `/catalog?tab=traditional`
  - `/catalog?tab=tools`
  - `/catalog?tab=materials`
  - `/catalog?tab=rental`
  - `/services`
  - targeted detail variants (`premium-brocade-lace`, `premium-glass-seed-beads`, `gingher-shears-tool`, `premium-javanese-beskap`)
- Consolidated design tokens from both latest design-system assets in `src/app/globals.css` with backward-compatible aliases.
- Removed legacy/unaligned components no longer used by current Stitch direction:
  - `src/components/catalog-browser.tsx`
  - `src/components/ui/chip.tsx`
  - `src/components/ui/input.tsx`
  - `src/components/ui/select.tsx`
  - `src/components/ui/toggle.tsx`
  - `src/components/ui/tabs.tsx`
- Ran contrast/accessibility checks in current test suite:
  - `tests/accessibility.spec.ts`
  - `tests/button-contrast.spec.ts`
  - `tests/scan-button-contrasts.spec.ts`
  - `tests/scan-multiple-pages-contrasts.spec.ts`
