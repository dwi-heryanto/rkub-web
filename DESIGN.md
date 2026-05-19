---
name: Workable Style
colors:
  surface: '#f8f9ff'
  surface-dim: '#d4dae6'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef4ff'
  surface-container: '#e8eefa'
  surface-container-high: '#e2e9f4'
  surface-container-highest: '#dce3ee'
  on-surface: '#151c24'
  on-surface-variant: '#404946'
  inverse-surface: '#2a313a'
  inverse-on-surface: '#eaf1fd'
  outline: '#707976'
  outline-variant: '#bfc8c5'
  surface-tint: '#32675e'
  primary: '#002823'
  on-primary: '#ffffff'
  primary-container: '#004038'
  on-primary-container: '#76aca1'
  inverse-primary: '#9bd1c6'
  secondary: '#43655d'
  on-secondary: '#ffffff'
  secondary-container: '#c2e7dd'
  on-secondary-container: '#476961'
  tertiary: '#002823'
  on-tertiary: '#ffffff'
  tertiary-container: '#004038'
  on-tertiary-container: '#00b5a2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b6ede2'
  primary-fixed-dim: '#9bd1c6'
  on-primary-fixed: '#00201b'
  on-primary-fixed-variant: '#174f47'
  secondary-fixed: '#c5eae0'
  secondary-fixed-dim: '#aacec4'
  on-secondary-fixed: '#00201b'
  on-secondary-fixed-variant: '#2b4d46'
  tertiary-fixed: '#25fde4'
  tertiary-fixed-dim: '#00dfc8'
  on-tertiary-fixed: '#00201c'
  on-tertiary-fixed-variant: '#005047'
  background: '#f8f9ff'
  on-background: '#151c24'
  surface-variant: '#dce3ee'
  canvas-porcelain: '#fff5ee'
  white: '#ffffff'
  harbor-mist: '#333942'
  muted-sage: '#00544c'
  soft-peach: '#fde8ce'
  muted-mandarin: '#ffdcbf'
  sky-haze: '#bee9f4'
  lime-glow: '#d5ff4d'
  spring-bud: '#7edcaf'
  fresh-teal-gradient: 'linear-gradient(90deg, #00f5dc 0%, #d5ff4d 48.5%, #b773ff
    100%)'
typography:
  display:
    fontFamily: Open Sans
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.0'
  heading-lg:
    fontFamily: Open Sans
    fontSize: 56px
    fontWeight: '700'
    lineHeight: '1.13'
  heading-lg-mobile:
    fontFamily: Open Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.1'
  heading:
    fontFamily: Open Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.17'
  heading-sm:
    fontFamily: Open Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.22'
  subheading:
    fontFamily: Open Sans
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.25'
  body:
    fontFamily: Open Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Open Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  serif-accent:
    fontFamily: Merriweather
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 40px
  xxl: 64px
  section-gap: 32px
  card-padding: 32px
  element-gap: 8px
---

# Workable — Style Reference
> Clean canvas, purposeful accents

**Theme:** light

Workable employs a direct and dynamic visual language, built on a clean canvas with a distinctive teal and dark forest green palette. Components are designed to be lightweight, with rounded corners that soften the strong typographic choices. Color is used purposefully for clear accents, interactive states, and to differentiate content blocks, while maintaining an overall sense of order and professionalism. The system balances functional clarity with subtle visual interest, avoiding heavy ornamentation.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Canvas Porcelain | `#fff5ee` | `--color-canvas-porcelain` | Page background, primary light surface |
| White | `#ffffff` | `--color-white` | Card backgrounds, elevated UI elements |
| Midnight Ink | `#0f161e` | `--color-midnight-ink` | Primary text, strong headings, dark UI elements |
| Harbor Mist | `#333942` | `--color-harbor-mist` | Subtle text, muted links, secondary information |
| Forest Canopy | `#012620` | `--color-forest-canopy` | Dark section backgrounds, hero background, decorative fills |
| Deep Teal | `#004038` | `--color-deep-teal` | Primary text color for navigation and headings, outlined button borders, active states |
| Fresh Teal | `linear-gradient(90deg, rgb(0, 245, 220), rgb(213, 255, 77) 48.5%, rgb(183, 115, 255))` | `--color-fresh-teal` | Card backgrounds, tag backgrounds, vibrant accents; Key product graphic fills, vibrant UI elements |
| Muted Sage | `#00544c` | `--color-muted-sage` | Secondary text, sub-brand accents, borders |
| Soft Peach | `#fde8ce` | `--color-soft-peach` | Informational card backgrounds, subtle highlight surfaces |
| Muted Mandarin | `#ffdcbf` | `--color-muted-mandarin` | Accent card backgrounds |
| Sky Haze | `#bee9f4` | `--color-sky-haze` | Accent card backgrounds |
| Lime Glow | `#d5ff4d` | `--color-lime-glow` | Decorative stroke, vibrant highlighting in illustrations |
| Spring Bud | `#7edcaf` | `--color-spring-bud` | Highlight text, decorative fills and borders |

## Tokens — Typography

### Proxima Nova — Primary UI typeface for all content including navigation, body text, headings, and buttons. Its clean, sans-serif structure provides clarity and a modern feel. · `--font-proxima-nova`
- **Substitute:** Open Sans
- **Weights:** 400, 700
- **Sizes:** 16px, 18px, 20px, 24px, 32px, 56px, 72px
- **Line height:** 1.00, 1.13, 1.14, 1.17, 1.20, 1.22, 1.25, 1.38, 1.50, 1.56, 1.75
- **Letter spacing:** normal
- **Role:** Primary UI typeface for all content including navigation, body text, headings, and buttons. Its clean, sans-serif structure provides clarity and a modern feel.

### Source Serif Pro — Used sparingly for specific body copy elements, offering a contrasting serif touch. · `--font-source-serif-pro`
- **Substitute:** Merriweather
- **Weights:** 400
- **Sizes:** 24px
- **Line height:** 1.50
- **Letter spacing:** normal
- **Role:** Used sparingly for specific body copy elements, offering a contrasting serif touch.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| body-sm | 16px | 1.5 | — | `--text-body-sm` |
| body | 18px | 1.5 | — | `--text-body` |
| subheading | 20px | 1.25 | — | `--text-subheading` |
| heading-sm | 24px | 1.22 | — | `--text-heading-sm` |
| heading | 32px | 1.17 | — | `--text-heading` |
| heading-lg | 56px | 1.13 | — | `--text-heading-lg` |
| display | 72px | 1 | — | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 8px

**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 8 | 8px | `--spacing-8` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 40 | 40px | `--spacing-40` |
| 64 | 64px | `--spacing-64` |
| 88 | 88px | `--spacing-88` |
| 104 | 104px | `--spacing-104` |

### Border Radius

| Element | Value |
|---------|-------|
| cards | 16px |
| badges | 25px |
| buttons | 16px |
| navigation | 8px |

### Layout

- **Section gap:** 32px
- **Card padding:** 32px
- **Element gap:** 8px

## Components

### Primary Ghost Button
**Role:** Call to action with minimal visual weight

Background transparent, text color #0f161, 0px border-radius, no padding defined. Best for inline actions or secondary CTA when a filled button is elsewhere.

### Secondary Ghost Button
**Role:** Outlined action with rounded corners

Background transparent, text color #0f161, 16px border-radius. Often used for navigation CTAs.

### Default Card
**Role:** Content container for features or information blocks

Background #ffffff, 16px border-radius, 32px padding on all sides. No shadow.

### Highlight Card - Soft Peach
**Role:** Emphasized content container with a warm background tint

Background #fde8ce, 16px border-radius, 32px padding on all sides. No shadow.

### Highlight Card - Fresh Teal
**Role:** Emphasized content container with a vivid background tint

Background #00f5dc, 16px border-radius, 32px padding on all sides. No shadow.

### Highlight Card - Muted Mandarin
**Role:** Emphasized content container with a warm orange background tint

Background #ffdcbf, 16px border-radius, 32px padding on all sides. No shadow.

### Ghost Badge
**Role:** Informational tag or label

Background transparent, text color #0f161, 0px border-radius, no padding defined. Used for meta-information.

### Navigation Link Button
**Role:** Actionable link within navigation

Text color #0f161, 16px border-radius, 0px padding. Used for 'Log in' and 'Request a demo'.

### Contained Navigation Button
**Role:** The primary call to action in the navigation bar

Background #004038, text color white, 16px border-radius. This is a filled button, contrasting with the ghost type.

## Do's and Don'ts

### Do
- Use Proxima Nova for all text elements to maintain typographic consistency.
- Apply 16px border-radius to all cards and buttons for a unified, soft edge.
- Utilize Forest Canopy (#012620) for dark section backgrounds and Deep Teal (#004038) for primary action outlines or filled navigation buttons.
- Employ 32px padding for internal card content and around main section elements.
- Maintain an 8px elementGap between smaller UI components for comfortable dense layouts.
- Prioritize Canvas Porcelain (#fff5ee) as the primary page background to create a clean, light base.
- Use Fresh Teal (#00f5dc) and Soft Peach (#fde8ce) as background tints for cards to visually group or highlight content.

### Don't
- Avoid arbitrary color usage; reserve brand and accent colors for functional roles or distinct highlights, not general decoration.
- Do not introduce complex shadows or extreme elevation; the design favors flat surfaces and subtle distinctions.
- Refrain from using overly decorative fonts; stick to Proxima Nova and Source Serif Pro for a clear, modern appearance.
- Do not deviate from the established 16px and 8px border-radii; random smaller or larger radii will break visual cohesion.
- Avoid dense, unbroken blocks of text; break content with headings, lists, and visual components.
- Do not use dark backgrounds for general page content; restrict them to hero sections or distinct visual breaks.
- Refrain from using system default link colors; ensure all links use either Midnight Ink (#0f161e) or Harbor Mist (#333942) unless an explicit accent link style is defined.

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Canvas Porcelain | `#fff5ee` | Base page background |
| 1 | White | `#ffffff` | Primary card and elevated component background |
| 2 | Soft Peach | `#fde8ce` | Accentuated card backgrounds for differentiation |
| 3 | Muted Mandarin | `#ffdcbf` | Secondary accent card background |
| 4 | Sky Haze | `#bee9f4` | Tertiary accent card background |

## Imagery

This system primarily uses photography for human elements (diverse faces in cards) and abstract, colorful gradients for product-focused graphics. Photography is typically tightly cropped to faces, conveying a relatable human connection. Illustrations are characterized by abstract shapes and bold gradients, often resembling fluid organic forms rather than hard-edged geometry. Icons (when visible) are typically outlined with a moderate stroke weight, emphasizing clarity and lightness. Imagery serves both decorative atmosphere, product showcase, and providing human context within the UI. The density of imagery is moderate, used to break up text and add visual interest, rather than overwhelming the layout.

## Layout

The page primarily uses a full-bleed structure, with content sections extending across the viewport width, though a clear implicit max-width ensures readability. Hero sections often feature a full-bleed background (e.g., Forest Canopy) with centered headings. Content typically alternates between two-column layouts (text left, image right) and centered stacks. Feature sections use a 3-column card grid. Vertical spacing between sections is consistent at 32px, creating a comfortable yet information-dense rhythm. The navigation is a persistent top bar featuring a logo, product/pricing links, and two call-to-action buttons, maintaining a fixed presence.