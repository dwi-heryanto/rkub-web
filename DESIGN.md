# RKUB Minimalist Design System

## Design Principles
- Clean canvas aesthetic with soft, approachable surfaces
- Low visual complexity, high readability, and generous spacing
- Flat cards with subtle borders (avoid heavy shadows)
- Minimalist typography hierarchy with strong headings
- Subtle motion only (gentle hover/transition states)

## Color Tokens
**Background / Canvas**
- Background: #fff5ee
- Surface: #ffffff
- Soft Peach: #fde8ce
- Muted Mandarin: #ffdcbf
- Sky Haze: #bee9f4

**Text / Ink**
- Primary Text: #0f161e
- Muted Text: #4a5663
- Deep Teal: #004038
- Forest Canopy: #012620

**Borders**
- Subtle Border: rgba(15, 22, 30, 0.08)
- Dashed Border: rgba(15, 22, 30, 0.15)

## Typography
- Primary: Proxima Nova
- Fallback: Open Sans, system
- Headings: Bold, clear hierarchy
- Body: Comfortable line-height (1.6)
- Avoid decorative fonts and dense text blocks

## Spacing & Radius
- Spacing scale: 8px system
- Card/Button radius: 16px
- Card padding: 32px (24px on mobile)
- Layout gutters: 16px (mobile), 24px (tablet+)

## Components
- **Cards:** flat, soft borders, no heavy shadow
- **Buttons:** rounded, solid fills, minimal hover shift
- **Inputs:** rounded, soft border, clear focus ring
- **Chips/Badges:** light accent background, readable text
- **Navigation:** simple, clear hierarchy, sticky on scroll

## Motion
- Subtle transitions (150–250ms)
- Hover lift: 1–2px
- Respect prefers-reduced-motion

## Accessibility
- High contrast text on pastel surfaces
- Large touch targets (>= 44px)
- Visible focus states
