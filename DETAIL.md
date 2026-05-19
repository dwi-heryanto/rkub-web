
Perfect — this design direction is actually VERY good for your project.
It matches your business much better than overly luxury/fashion-heavy UI.  ￼

The uploaded DESIGN.md gives:

* soft minimalist layout
* approachable UI
* strong readability
* colorful but controlled accents
* lightweight cards
* comfortable spacing
* simple navigation

Which is PERFECT for:

* mixed age audiences
* catalog browsing
* tailoring/rental services
* mobile users
* WhatsApp conversion flow

Especially these parts are highly aligned with your project:

* clean canvas aesthetic  ￼
* gallery/card-focused layout  ￼
* minimalist component system  ￼
* comfortable spacing & readability  ￼
* avoiding excessive shadows/effects  ￼

You should absolutely use this as the visual foundation.

⸻

Here is the updated master prompt with the DESIGN.md system integrated:

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

⸻

COLOR SYSTEM

Use the DESIGN.md token system.

Primary colors:

* Background: #fff5ee
* Text: #0f161e
* Deep teal: #004038
* Forest canopy: #012620
* Soft peach: #fde8ce
* Muted mandarin: #ffdcbf
* Sky haze: #bee9f4

Use gradients sparingly.

Avoid:

* random color usage
* neon-heavy interfaces
* excessive dark backgrounds

⸻

TYPOGRAPHY

Primary font:

* Proxima Nova
    Fallback:
* Open Sans

Use:

* large readable typography
* strong heading hierarchy
* comfortable line-height

Avoid:

* decorative fonts
* dense text blocks
* tiny text sizes

⸻

SPACING & SHAPES

Use:

* 8px spacing system
* 16px card/button radius
* 32px card padding
* spacious mobile layout

Avoid:

* sharp corners
* cramped layouts
* inconsistent spacing

⸻

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