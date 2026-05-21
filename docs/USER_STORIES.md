# Heritage Tailoring — Technical User Stories & Product Requirements

# Product Vision

Heritage Tailoring is a modern catalog and discovery platform for a family tailoring business specializing in:
- fabrics and textile materials
- tailoring tools and sewing equipment
- beads and decorative accessories
- traditional clothing rental
- costume rental
- tailoring services
- custom tailoring consultation

The platform is NOT designed as a full e-commerce checkout marketplace.

The primary business flow is:

Discovery → Product Browsing → Inquiry → WhatsApp Consultation → Manual Conversion

The experience should prioritize:
- trust
- craftsmanship
- visual browsing
- accessibility for all ages
- mobile-first experience
- SEO discoverability
- WhatsApp conversion

---

# Product Philosophy

The platform should behave as:

"A digital discovery and consultation platform for a trusted tailoring atelier."

NOT:
"A fully automated online marketplace."

The UX should emphasize:
- clarity
- trustworthiness
- human interaction
- consultation-first experience
- realistic operational workflows

Avoid:
- fake urgency
- fake stock counters
- fake best-seller systems
- misleading inventory claims

Prefer:
- curated collections
- craftsmanship storytelling
- transparent availability messaging
- image-first browsing

---

# Priority Levels

## P0 — Critical / MVP Core
Required for launch and business operation.

Examples:
- product catalog
- search
- WhatsApp CTA
- CMS CRUD
- mobile responsiveness
- SEO basics
- image optimization

---

## P1 — Important / Growth Features
Strong UX and operational improvements.

Examples:
- aliases/local names
- dynamic attributes
- related products
- analytics tracking
- advanced filtering

---

## P2 — Enhancement / Nice-to-Have
Polish and advanced optimization.

Examples:
- typo tolerance
- advanced recommendations
- advanced analytics dashboards
- enhanced animations

---

# Implementation Status Matrix (Source of Truth)

This section is the canonical implementation tracker used before starting tasks or refactors.

## Status Conventions
- Status enum: `Not Started`, `In Progress`, `Implemented`, `Verified`, `Deferred`
- Evidence must link to concrete proof such as routes, components, tests, PRs, or commits.
- `Last Verified` uses `YYYY-MM-DD`.

| US ID | Priority | Status | Evidence | Last Verified |
| --- | --- | --- | --- | --- |
| US-001 | P0 | Verified | [src/app/page.tsx](../src/app/page.tsx), [src/app/catalog/page.tsx](../src/app/catalog/page.tsx) | 2026-05-21 |
| US-002 | P0 | Verified | [src/app/catalog/page.tsx](../src/app/catalog/page.tsx), [tests/catalog-visual.spec.ts](../tests/catalog-visual.spec.ts) | 2026-05-21 |
| US-003 | P0 | In Progress | [src/app/api/search/route.ts](../src/app/api/search/route.ts), [src/lib/search.ts](../src/lib/search.ts), [supabase/migrations/001_catalog_search.sql](../supabase/migrations/001_catalog_search.sql) | 2026-05-21 |
| US-004 | P1 | Implemented | [src/app/catalog/page.tsx](../src/app/catalog/page.tsx), [src/types/catalog.ts](../src/types/catalog.ts) | 2026-05-21 |
| US-005 | P0 | Verified | [src/app/products/[slug]/page.tsx](../src/app/products/[slug]/page.tsx), [src/components/product-card.tsx](../src/components/product-card.tsx) | 2026-05-21 |
| US-006 | P1 | Implemented | [src/types/catalog.ts](../src/types/catalog.ts), [src/data/seed/catalog.ts](../src/data/seed/catalog.ts) | 2026-05-21 |
| US-007 | P1 | Implemented | [src/app/products/[slug]/page.tsx](../src/app/products/[slug]/page.tsx), [src/data/products.ts](../src/data/products.ts) | 2026-05-21 |
| US-008 | P0 | Verified | [src/lib/whatsapp.ts](../src/lib/whatsapp.ts), [src/components/whatsapp-button.tsx](../src/components/whatsapp-button.tsx), [src/components/whatsapp-fab.tsx](../src/components/whatsapp-fab.tsx) | 2026-05-21 |
| US-009 | P1 | Implemented | [src/lib/analytics.ts](../src/lib/analytics.ts), [src/components/analytics-scripts.tsx](../src/components/analytics-scripts.tsx) | 2026-05-21 |
| US-010 | P0 | Verified | [src/app/catalog/page.tsx](../src/app/catalog/page.tsx), [src/data/seed/catalog.ts](../src/data/seed/catalog.ts) | 2026-05-21 |
| US-011 | P0 | Implemented | [src/lib/whatsapp.ts](../src/lib/whatsapp.ts), [src/app/catalog/page.tsx](../src/app/catalog/page.tsx) | 2026-05-21 |
| US-012 | P0 | Verified | [src/app/services/page.tsx](../src/app/services/page.tsx) | 2026-05-21 |
| US-013 | P0 | In Progress | [src/app/services/page.tsx](../src/app/services/page.tsx), [src/app/api/uploads/route.ts](../src/app/api/uploads/route.ts) | 2026-05-21 |
| US-014 | P0 | Deferred | [docs/TODO.md](./TODO.md) (`Payload CMS integration: deferred`) | 2026-05-21 |
| US-015 | P1 | Deferred | [src/payload/fields/dynamicAttributes.ts](../src/payload/fields/dynamicAttributes.ts), [docs/TODO.md](./TODO.md) | 2026-05-21 |
| US-016 | P1 | Deferred | [src/payload/collections/Products.ts](../src/payload/collections/Products.ts), [docs/TODO.md](./TODO.md) | 2026-05-21 |
| US-017 | P1 | Implemented | [src/lib/seo.ts](../src/lib/seo.ts), [src/app/layout.tsx](../src/app/layout.tsx), [src/app/products/[slug]/page.tsx](../src/app/products/[slug]/page.tsx) | 2026-05-21 |
| US-018 | P1 | Implemented | [src/components/analytics-scripts.tsx](../src/components/analytics-scripts.tsx), [src/lib/analytics.ts](../src/lib/analytics.ts) | 2026-05-21 |
| US-019 | P0 | Verified | [src/app/globals.css](../src/app/globals.css), [src/components/navbar.tsx](../src/components/navbar.tsx), [src/components/whatsapp-fab.tsx](../src/components/whatsapp-fab.tsx) | 2026-05-21 |
| US-020 | P0 | Verified | [next.config.ts](../next.config.ts), [src/app/catalog/page.tsx](../src/app/catalog/page.tsx), [src/app/products/[slug]/page.tsx](../src/app/products/[slug]/page.tsx) | 2026-05-21 |
| US-021 | P0 | Verified | [src/app/sitemap.ts](../src/app/sitemap.ts), [src/app/robots.ts](../src/app/robots.ts), [src/lib/seo.ts](../src/lib/seo.ts) | 2026-05-21 |

---

# 1. Product Catalog & Discovery

## US-001 — Browse Product Categories
Priority: P0

As a customer,  
I want to browse products by category,  
so that I can quickly navigate to relevant products and services.

### Functional Requirements
Support categories:
- Fabrics
- Beads & Accessories
- Tailoring Tools
- Rental Costumes
- Traditional Clothing
- Tailoring Services

Categories must support:
- title
- image/icon
- slug
- SEO metadata

### Technical Notes
- Categories managed via Payload CMS
- SEO-friendly routes
- Mobile responsive category navigation

### Empty State
If a category has no products:
- show friendly message
- suggest related categories
- show WhatsApp inquiry CTA

---

## US-002 — Browse Product Catalog
Priority: P0

As a customer,  
I want to browse products visually through a responsive catalog,  
so that I can discover products easily across mobile and desktop devices.

### Functional Requirements
- Responsive product grid
- Pagination or infinite scroll
- Product cards include:
  - image
  - name
  - category
  - pricing unit
- Mobile-first layout

### Technical Notes
- Cloudinary optimized images
- Lazy loading enabled
- Skeleton loading states required

### Loading State
- Product skeleton cards
- Placeholder image containers

### Empty State
If no products exist:
- show informative placeholder
- suggest categories
- display inquiry CTA

---

## US-003 — Search Products Using Official & Local Names
Priority: P0

As a customer,  
I want to search products using official names or local/common names,  
so that I can find products even if I do not know the formal product terminology.

### Functional Requirements
Search supports:
- product name
- aliases/local names
- tags
- categories

Features:
- autocomplete suggestions
- mobile-friendly search
- optional typo tolerance

### Technical Notes
- PostgreSQL full-text search
- Alias array indexing
- Search query optimization

### Example
Official Product:
- Premium Brocade Lace

Aliases:
- brokat
- brukat
- lace kebaya

Searching "brokat" must return the product.

### Empty State
If no results found:
- show friendly empty state
- suggest categories
- allow reset search

### Failure State
If search fails:
- show retry action
- fallback to category browsing

---

## US-004 — Filter Products Dynamically
Priority: P1

As a customer,  
I want to filter products by category-specific attributes,  
so that I can narrow down products efficiently.

### Functional Requirements
Support filters:
- color
- material
- size
- motif
- region
- price range

Different categories support different filters.

### Technical Notes
- Dynamic attribute architecture
- CMS-driven filter rendering
- URL query synchronization

### Loading State
- preserve filters during loading
- smooth loading transitions

---

# 2. Product Detail Experience

## US-005 — View Product Details
Priority: P0

As a customer,  
I want to view detailed product information,  
so that I can understand the product before contacting the store.

### Functional Requirements
- Large image gallery
- Zoomable images
- Product specifications
- Related products section
- Mobile responsive layout

### Technical Notes
- Dynamic metadata generation
- Cloudinary optimized images
- Related product query system

### Inventory Reality
Products may not always reflect real-time availability.

Availability statuses:
- Available
- Limited Stock
- Seasonal
- By Request
- Rental Only
- Custom Order

### UX Requirement
Display transparent availability messaging.

Example:
"Availability may change depending on in-store stock. Please confirm via WhatsApp."

### Loading State
- image skeletons
- content placeholders

---

## US-006 — View Dynamic Product Attributes
Priority: P1

As a customer,  
I want products to display specifications relevant to their category,  
so that I can understand the details important to that product type.

### Functional Requirements

Fabric examples:
- material
- width
- motif

Tool examples:
- material
- origin
- dimensions

Rental examples:
- size
- region
- gender

### Technical Notes
- Dynamic attribute schema
- Flexible rendering components
- CMS-managed attributes

---

## US-007 — Discover Related Products
Priority: P1

As a customer,  
I want to see complementary or related products,  
so that I can discover additional relevant items.

### Functional Requirements
- Related product section
- Similar category recommendations
- Tag-based recommendations

### Technical Notes
- Recommendation query system
- Exclude current product logic

---

# 3. WhatsApp Conversion Flow

## US-008 — Contact Store via WhatsApp
Priority: P0

As a customer,  
I want to contact the store directly via WhatsApp,  
so that I can ask about pricing, availability, or custom requests.

### Functional Requirements
- Sticky WhatsApp CTA on mobile
- WhatsApp button on:
  - products
  - rentals
  - services
- Prefilled inquiry messages

### Example Message
"Hello, I want to ask about this product:
Product: Premium Lace
Price: Rp 45.000/meter
Is this item still available?"

### Failure State
If WhatsApp fails to open:
- show phone number fallback
- provide copy contact action

---

## US-009 — Track WhatsApp Conversion
Priority: P1

As a business owner,  
I want WhatsApp inquiries tracked,  
so that I can identify high-performing products and categories.

### Functional Requirements
Track:
- product inquiry clicks
- rental inquiry clicks
- category inquiry clicks

### Technical Notes
- Google Analytics integration
- Microsoft Clarity integration
- Custom event tracking

---

# 4. Rental Catalog

## US-010 — Browse Rental Catalog
Priority: P0

As a customer,  
I want to browse traditional and costume rental items,  
so that I can find suitable attire for events.

### Functional Requirements
- Rental-specific catalog page
- Filter by:
  - region
  - event
  - size
  - gender
- Gallery-focused browsing

### Technical Notes
- Rental item schema
- Category relationship support

### Inventory Reality
Rental availability may change because:
- offline bookings exist
- items may be under maintenance
- reservations may happen manually

### UX Requirement
Display:
"Availability requires confirmation via WhatsApp."

---

## US-011 — Submit Rental Inquiry
Priority: P0

As a customer,  
I want to inquire about rental availability,  
so that I can reserve costumes easily.

### Functional Requirements
- WhatsApp inquiry CTA
- Prefilled rental inquiry message

---

# 5. Tailoring Services

## US-012 — Browse Tailoring Services
Priority: P0

As a customer,  
I want to browse tailoring services,  
so that I can understand what services are offered.

### Functional Requirements
- Service listing page
- Inspiration gallery
- Service categories

---

## US-013 — Submit Tailoring Consultation Request
Priority: P0

As a customer,  
I want to submit tailoring requests with reference images,  
so that I can start consultation for custom clothing.

### Functional Requirements
- Request form
- Image upload
- Event date field
- Service type selection

### Technical Notes
- Cloudinary upload integration
- Optional WhatsApp redirect flow

### Inventory Reality
Tailoring pricing and timelines may vary depending on:
- material availability
- tailoring complexity
- project timeline

### UX Requirement
Avoid rigid automated pricing.
Prefer consultation-based communication.

### Failure State
If upload fails:
- preserve form data
- allow retry upload

---

# 6. CMS & Content Management

## US-014 — Manage Products
Priority: P0

As a business owner,  
I want to manage products from the CMS dashboard,  
so that the storefront stays updated.

### Functional Requirements
- Create/Edit/Delete products
- Upload images
- Manage aliases
- Manage tags
- Manage availability status

### Technical Notes
- Payload CMS collections
- Cloudinary integration

### Failure State
If CMS save fails:
- preserve unsaved changes
- display retry action

---

## US-015 — Manage Dynamic Attributes
Priority: P1

As a business owner,  
I want to manage category-specific attributes,  
so that products can display relevant specifications.

### Functional Requirements
- Add attributes
- Edit attributes
- Remove attributes
- Reorder attributes

### Technical Notes
- Dynamic field rendering
- Attribute template architecture

---

## US-016 — Manage Product Visibility & Availability
Priority: P1

As a business owner,  
I want to control product visibility and inquiry status,  
so that the storefront reflects real operational conditions.

### Functional Requirements
Admin can:
- hide unavailable products
- mark seasonal products
- disable inquiries temporarily
- update pricing quickly

without developer intervention.

---

## US-017 — Manage SEO Metadata
Priority: P1

As a business owner,  
I want to manage SEO metadata,  
so that the website performs well in search engines.

### Functional Requirements
- Meta title
- Meta description
- OpenGraph image
- Canonical URL

### Technical Notes
- Dynamic metadata generation
- Structured schema support

---

# 7. Analytics & Monitoring

## US-018 — Monitor User Behavior
Priority: P1

As a business owner,  
I want to monitor visitor behavior,  
so that I can improve user experience and conversions.

### Functional Requirements
- Session recordings
- Heatmaps
- Scroll tracking
- Click tracking

### Technical Notes
- Microsoft Clarity integration
- Google Analytics integration

---

# 8. Performance & Mobile Experience

## US-019 — Mobile-First Browsing Experience
Priority: P0

As a mobile user,  
I want the website optimized for mobile devices,  
so that browsing feels easy and fast.

### Functional Requirements
- Responsive layouts
- Touch-friendly UI
- Sticky navigation
- Sticky WhatsApp button

### Technical Notes
- Tailwind responsive architecture
- Mobile-first implementation

---

## US-020 — Fast Image Loading
Priority: P0

As a customer,  
I want product images to load quickly,  
so that browsing remains smooth on mobile networks.

### Functional Requirements
- Optimized image delivery
- Lazy loading
- Responsive image sizing

### Technical Notes
- Cloudinary transformations
- WebP/AVIF support
- Next.js image optimization

---

# 9. SEO & Discoverability

## US-021 — Local SEO Optimization
Priority: P0

As a business owner,  
I want the website optimized for local search visibility,  
so that nearby customers can discover the business.

### Functional Requirements
- Google Maps embed
- Store information
- Local schema markup
- Semantic HTML
- Sitemap.xml
- robots.txt

### Technical Notes
- LocalBusiness schema
- Dynamic sitemap generation

---

# 10. Reusable UX System Requirements

## UX Standards
Priority: P0

The platform must include reusable:
- loading states
- empty states
- error states
- skeleton loaders

The interface should never feel:
- broken
- blank
- confusing

---

# 11. Technical Architecture Standards

## Media Architecture
Priority: P0

Use:
- Cloudinary for media storage

DO NOT:
- store base64 images in database

Store only:
- image URL
- alt text
- metadata

---

## Storage Provider Abstraction
Priority: P1

Implement provider abstraction architecture.

Use:
- environment variables
- upload service abstraction
- provider pattern

Future migration-ready for:
- Cloudflare R2
- S3
- Supabase Storage

without rewriting application logic.

---

# 12. Final UX Direction

The final experience should feel:
- approachable
- trustworthy
- organized
- visually curated
- consultation-first
- optimized for all ages
- lightweight and fast
- optimized for WhatsApp conversion
