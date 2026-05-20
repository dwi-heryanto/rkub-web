# RKUB Web Progress Tracker

## Summary
- Current phase: **Stitch Redesign Refresh (v2)**
- Source project: **Modern Tailoring Digital Catalog** (`8598452241295074689`)
- Payload CMS integration: **deferred** (intentional)

## Core Foundation
- [x] Apply DESIGN.md color palette and typography base tokens
- [x] Build responsive homepage sections (hero, categories, highlights, gallery, FAQ, CTA)
- [x] Implement reusable UI primitives (button, card, badge, input, tabs, etc.)
- [x] Add product catalog and product detail pages
- [x] Add WhatsApp conversion flow (CTA + floating action button)
- [x] Add SEO baseline (metadata, robots, sitemap, local business schema)
- [x] Fix Next.js 16 dynamic route params handling for `/products/[slug]`
- [x] Introduce shadcn/ui baseline (`components.json`) and migrate key controls
- [x] Add optional light/dark theme changer (non-priority)

## Current Redesign Status (Already Done)
- [x] Import latest Stitch hosted exports (HTML + screenshots) using `scripts/download-stitch-assets.sh`
- [x] Refresh `stitch/screens.manifest.csv` with latest screen set and hosted URLs
- [x] Apply shared navbar direction from Stitch detail reference (`dcd3ea8749c54abb884727ae3c73a94e`)
- [x] Add shared global footer and remove dependency on page-specific footer pattern
- [x] Expand `/catalog` mode support to include `rental`, `fabric`, `tools`, `traditional`, and `materials`
- [x] Add URL-driven filtering for fabric/tools modes (`tab`, `color`, `width`, `toolKind`)
- [x] Seed baseline tailoring-tools catalog items for cutting/measuring/hand-sewing/pressing
- [x] Add baseline `/services` page aligned to Stitch services screen direction

## Stitch Rework (Updated Screen Set)
- [x] Rework `/` to match `67c84fe27aaf4856b85c09d313da8d8a` (Homepage - Heritage Tailoring)
- [x] Rework `/catalog?tab=traditional` to match `34eae86e999440a385c2d4fd43d0bb45` (Traditional Clothing - Updated)
- [x] Rework `/catalog?tab=tools` to match `4db2b1c140204cc9b8730da21d27a09a` (Tailoring Tools)
- [x] Rework `/catalog?tab=materials` to match `fddc3074bba144698054337fae0a7e2a` (Materials Catalog - Including Beads)
- [x] Rework `/catalog?tab=rental` to match `b0ebea72d2d446b2925dbea77bf51cb9` (Updated Rental Catalog)
- [x] Rework `/products/premium-brocade-lace` to match `dcd3ea8749c54abb884727ae3c73a94e`
- [x] Add detail variant for `/products/premium-glass-seed-beads` from `790bc7395ef247c5b650d8a4e6588730`
- [x] Add detail variant for `/products/gingher-shears-tool` from `e066d9aa4eeb4de5a25cfae580ebdd8c`
- [x] Add detail variant for `/products/premium-javanese-beskap` from `18edeffe4eda4836ac07cfd0a19be61c`
- [x] Finalize `/services` parity vs `579869a81daf4d7588ada4cf98677262`
- [x] Consolidate token usage from both design systems:
- [x] `asset-stub-assets-6bba25e210bd44c3a7c33c10c553b733-1779227066713`
- [x] `asset-stub-assets-74f14d30c2b9423b95ca56102975ad60-1779265690867`
- [x] shadcn/ui migration: continue migrating remaining handmade UI components to shadcn/ui primitives (cards, buttons, inputs, tabs) and audit/remove any unused handmade UI helper components (`ui/chip`) to keep primitive usage consistent across the codebase
- [x] cleanup old implementation/design/components that are not aligned with the latest Stitch screen set and design direction
- [x] run thorough WCAG contrast and accessibility audit against latest screens and update any failing elements (color, typography, spacing) to meet standards


## QA and Launch Follow-up
- [ ] Remove remaining style mismatches against latest DESIGN.md updates
- [ ] Replace fallback seed content with fully managed Payload CMS content in production (deferred for now)
- [ ] Validate Supabase search ranking and typo tolerance against real catalog data
- [x] Continue migrating remaining handmade UI components to shadcn/ui primitives (cards, buttons, inputs, tabs)
- [x] Audit and either migrate/remove unused handmade UI helper components (`ui/chip`) to keep primitive usage consistent
- [ ] Finalize launch checklist (analytics verification, accessibility pass, production QA)
- [x] Run full-site axe audit and produce report
- [x] Add CI job to run Playwright + axe on PRs
- [ ] Update Playwright visual baselines after redesign pass and run accessibility sweep
- [ ] Open PR for primary button text change and add dev guidance note
- [x] Update `DETAIL.md` final section again after UI parity is complete
