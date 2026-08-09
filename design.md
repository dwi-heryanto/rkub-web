# RKUB Redesign — Phase 1: Design System + Homepage

## Status
Approved design spec. Ready for implementation plan.

## Context
RKUB is a family tailoring store catalog website. It is not a full e-commerce platform. The primary conversion mechanism is WhatsApp inquiry. The redesign is inspired by [regrocery.co](https://regrocery.co/) and aims for a warm, editorial, market-like feel.

## Goals
1. Establish a new locked design system (colors, typography, spacing, components).
2. Redesign the homepage to balance editorial warmth with category-first product discovery.
3. Improve mobile UX with a contextual bottom action bar and sticky navigation.
4. Keep WhatsApp conversion visible and accessible on every page.
5. Define a lightweight data contract for categories, products, and site settings.

## Non-goals (Phase 1)
- Redesign catalog page.
- Redesign product detail page.
- Modify CMS schema or Payload collections.
- Implement new search/filter backend.
- Add dark mode.

## Design Principles
- Warm cream canvas with deep forest green accent.
- Editorial serif display (Lora) + humanist sans body (Source Sans 3).
- Pill-shaped primary actions; rounded cards; no heavy shadows.
- Generous whitespace; full-bleed photography; low visual complexity.
- Mobile-first; thumb-reachable actions; sticky conversion paths.

## Color Tokens

| Token | Value | Role |
|---|---|---|
| `--color-paper` | `#f7f5f0` | Page background |
| `--color-paper-2` | `#ffffff` | Cards, elevated surfaces |
| `--color-ink` | `#1a1814` | Primary text, headings |
| `--color-ink-2` | `#5a5650` | Secondary/muted text |
| `--color-rule` | `#e3dfd6` | Borders, dividers |
| `--color-accent` | `#2f4f3f` | Primary CTA, links, badges |
| `--color-accent-ink` | `#f7f5f0` | Text on accent |
| `--color-focus` | `#4a7c6f` | Focus rings |

## Typography

- **Display:** Lora, weight 600, roman, tracking `-0.02em`.
- **Body:** Source Sans 3, weight 400.
- **Scale:**
  - `--text-base`: 1rem
  - `--text-lg`: 1.125rem
  - `--text-xl`: 1.375rem
  - `--text-2xl`: 1.75rem
  - `--text-3xl`: 2.25rem
  - `--text-display`: clamp(2.5rem, 7vw, 5.5rem)

## Spacing

4-point scale:
- `--space-xs`: 0.5rem
- `--space-sm`: 0.75rem
- `--space-md`: 1rem
- `--space-lg`: 1.5rem
- `--space-xl`: 2rem
- `--space-2xl`: 3rem
- `--space-3xl`: 5rem
- `--page-gutter`: clamp(1rem, 4vw, 2.5rem)

## Radii
- Cards: 16px
- Inputs: 12px
- Buttons (pill): 9999px

## Motion
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- Hover: 200ms
- Page transitions: 300ms
- Reduced motion: opacity-only, ≤150ms

## Navigation

### Top Bar
- Sticky, height 3.5rem mobile / 4rem desktop.
- Left: wordmark "Stitch & Sew" in Lora 600.
- Right: search icon, hamburger menu.
- Transparent over hero; transitions to `--color-paper` with 1px `--color-rule` border on scroll.

### Mobile Menu
- Full-screen overlay.
- Close button top-right.
- Links: Home, Catalog, Services, Rentals, About, Support, Contact.
- WhatsApp CTA at bottom.

### Bottom Action Bar (mobile only)
- Sticky, background `--color-paper-2`, top border `--color-rule`.
- Contextual actions per page:
  - **Homepage:** Home · Catalog · Search · Chat on WhatsApp
  - **Catalog:** Home · Filters · Search · Chat on WhatsApp
  - **Product detail:** Back · Save · Share · Inquire on WhatsApp
- WhatsApp action is always a filled pill in `--color-accent`.

### Desktop Navigation
- Top bar expands to inline links: Catalog, Services, Rentals, About, Contact.
- WhatsApp pill stays top-right.

## Homepage Sections

1. **Hero**
   - Full-bleed background image.
   - Oversized Lora headline: "Heritage in every stitch".
   - One-line subhead.
   - Single pill CTA: "Browse the catalog".

2. **Category Band**
   - Title: "Shop by category".
   - 6 rounded cards: Fabrics, Beads & Accessories, Tailoring Tools, Traditional Clothing, Rental Costumes, Tailoring Services.
   - Each card: image/icon + category name + arrow.

3. **Featured Products**
   - Title: "Curated for you".
   - 4-up grid desktop, 2-up tablet, 1-up mobile.
   - Product cards: image, name, price, category tag.
   - "View all" pill link.

4. **Services + Rental Teaser**
   - Two-column alternating layout.
   - Tailoring services image + text + CTA.
   - Rental costumes image + text + CTA.
   - Background: `--color-paper-2`.

5. **Trust/Social Proof**
   - Short testimonial or "Family-run since [year]" block.
   - Optional Instagram gallery strip.

6. **WhatsApp CTA Band**
   - Full-bleed `--color-accent` background.
   - Headline: "Need help finding the right fabric?"
   - Subhead: "Chat with us on WhatsApp".
   - Pill button: "Chat on WhatsApp".

7. **Footer**
   - Sign-off: "Yours, Stitch & Sew".
   - Hours, address, map link.
   - Links: Privacy, Shipping, Sizing, Fabric Care.
   - Social links.

## Component Inventory

| Component | Purpose |
|---|---|
| `TopNav` | Sticky header |
| `MobileMenu` | Full-screen menu |
| `BottomActionBar` | Sticky mobile actions |
| `Hero` | Homepage hero |
| `CategoryCard` | Category band cards |
| `ProductCard` | Product grid cards |
| `SectionHeader` | Reusable section title |
| `WhatsAppBand` | Full-bleed CTA |
| `Footer` | Page footer |
| `PillButton` | Primary/secondary CTAs |
| `IconButton` | Search, menu, close |

## Data Contract

### Category
```ts
interface Category {
  slug: string;
  name: string;
  description?: string;
  image: string;
  href: string;
}
```

### Product
```ts
interface Product {
  slug: string;
  name: string;
  aliases: string[];
  category: string;
  unitPrice: string;
  description: string;
  image: string;
  gallery: string[];
  tags: string[];
  attributes: Attribute[];
}

interface Attribute {
  key: string;
  label: string;
  value: string;
}
```

### Site Settings
```ts
interface SiteSettings {
  siteName: string;
  whatsappNumber: string;
  address?: string;
  hours?: string;
  mapUrl?: string;
}
```

### Dynamic Attributes
- Each category defines relevant attributes.
- Admins can add, remove, and reorder attributes per category without code changes.
- Frontend renders attributes generically from the `attributes` array.

## Files to Change

- `design.md`
- `tokens.css`
- `src/app/(frontend)/globals.css`
- `src/app/(frontend)/layout.tsx`
- `src/app/(frontend)/page.tsx`
- `src/components/navbar.tsx`
- `src/components/footer.tsx`
- `src/components/whatsapp-button.tsx`
- `src/components/whatsapp-fab.tsx`
- `src/components/ui/button.tsx`
- `src/components/theme-toggle.tsx` (remove usage)

## Files to Create

- `src/components/bottom-action-bar.tsx`
- `src/components/mobile-menu.tsx`
- `src/components/hero.tsx`
- `src/components/category-card.tsx`
- `src/components/section-header.tsx`
- `src/components/whatsapp-band.tsx`

## Worktree
This refactor will be implemented in a new git worktree to isolate changes from the main branch.

## Risks
- New photography/imagery needed to match editorial quality.
- Removing dark mode may affect users who preferred it.
- Bottom action bar takes up mobile viewport space.

## Next Steps
1. Invoke `writing-plans` skill to create implementation plan.
2. Create git worktree.
3. Implement design system tokens.
4. Build navigation and bottom action bar.
5. Build homepage sections.
6. Validate with accessibility and visual regression tests.
