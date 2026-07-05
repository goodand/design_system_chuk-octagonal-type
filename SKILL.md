---
name: axis-design
description: Use this skill to generate well-branded interfaces and assets for Axis (축) — an AI Hangul font / design system generator — either for production or throwaway prototypes/mocks/decks. Contains brand guidelines, color tokens, typography, fonts, logo assets, and a flagship UI kit for the Axis Studio product.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, landing pages, etc.), copy assets out of `assets/` and `fonts/` into the artifact's own folder and create static HTML files for the user to view. The `colors_and_type.css` file is the single source of truth for all tokens — load it as a linked stylesheet or inline its `:root` block.

If working on production code, you can copy assets and read the rules in `README.md` to become an expert in designing with this brand. The `ui_kits/axis_studio/*.jsx` files are intentionally simple, cosmetic recreations — they are not production code, but they encode the correct visual vocabulary.

Core rules to honor, always:
- **Black ink on white paper.** Neutrals (`--ink-000` → `--ink-900`) carry the UI. Accents are registration marks only (`--mark-red`, `--mark-navy`, `--mark-cyan`) — never saturated fills for buttons or large surfaces.
- **No gradients, no shadows, no emoji.** Use hairline rules and plate-number metadata instead of elevation or decoration.
- **Mono + Hangul pairing.** JetBrains Mono 600–700 for Latin display; Noto Sans KR for Korean body. Plate labels (`PL.042`) are mono, UPPERCASE, 0.18em tracking.
- **1px hairlines are a graphic element**, not a decoration. Cards are 1px-bordered, radius 0–2px, no shadow.
- **Icons are 1.5px-stroke geometric line icons.** Lucide CDN is the approved fallback. Never fill icons, never mix stroke weights.
- **The spine layout** (a vertical 1px rule down the center) anchors hero and marketing compositions and reinforces the product's central "axis" metaphor.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions (audience, surface, length, Korean-primary vs bilingual, static vs interactive), and act as an expert designer who outputs HTML artifacts *or* production code, depending on the need.
