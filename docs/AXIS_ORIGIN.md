# Axis (축) — Design System

> **AI Font System & Design System Generator**
> 한글 폰트 재구성과 레이아웃 최적화를 위한 AI — Korean font reconstruction & layout optimization, powered by AI.

---

## 01 — Product context

**Axis / 축** is an AI system that reconstructs Korean (Hangul) typography from a reference image and re-renders target text in the same style while respecting strict typographic rules: 1:1 syllable-block ratio, uniform scale, consistent baseline, centered visual gravity regardless of 받침 (batchim / final consonant) presence.

The product is fundamentally a **typography tool** that happens to be powered by ML. The brand must therefore feel like something a typographer, letterpress operator, or type foundry would ship — not a generic SaaS AI wrapper.

### Metaphors that shaped the identity

| Metaphor | Translation into the brand |
|---|---|
| **축 / Axis** — a central line all weight aligns to | The logo **is the syllable 축**, reconstructed from only straight lines and points of contact. **ㅊ** = three thin uniform lines (horizontal bar + two diagonals + crown tick resolved as the center node). **ㅜ** = thick vertical (upper half) + thin horizontal. **ㄱ** = thick vertical (lower half) + thin horizontal (half). The thin lines carry the *ㅊ signature* at every weight; the thick vertical spine (ㅜ+ㄱ) is the load-bearing **축** that thickens as weight grows. The vertical + horizontal together also read as the **x-axis / y-axis Cartesian quadrant** — Hangul as coordinate space. |
| **Tripod / camera mount** | Precision, stability, calibration. Plate markers, registration ticks, CMYK calibration bars. |
| **Iceberg — above & below water** | Light UI foreground over a denser, structured substrate (grids, rulers, invisible scaffolding that surfaces on hover). |
| **Hangul as geometric primitives** | ㄱ ㄴ ㄷ ㄹ ㅁ ㅇ rendered as pure lines, circles, rectangles — the "deconstructed 축" in the logo. |
| **Letterpress / type specimen book** | Hairline rules, plate numbers (`PL.042 / 축.01`), thin underlines, monospace metadata. |

### Reference brands studied
- **The Barn Coffee Roasters (Berlin)** — hand-drawn mark over oversized, confident wordmark. Stoic, crafted.
- **Mitsukoshi / Japanese retail identities** — navy-on-white geometric katakana-style marks. Quiet, architectural.
- **Korean cafe/edu brands ("감성커피", "타이노")** — bold, display-first Hangul, high contrast, flat.
- **Heptagon vertex diagrams / above-water below-water iceberg diagrams** — structure visible as visible structure, not decoration.

---

## 02 — Sources

Everything in this system was derived from uploaded references — no live codebase, no Figma, no production app exists yet. The references lived here:

- `uploads/axis_final_Gemini_Generated_Image_miootmiootmiootm.png` → primary mark (축 = ㅊ + ㅜ + ㄱ decomposed to lines + a load-bearing vertical) — reconstructed as `assets/logo-axis-mark.svg`
- `uploads/began_idea_image.png` → the deconstructed "축" glyph studies
- `uploads/font_image.png` → the "고" glyph reconstruction sample
- `uploads/font_use_case_image.png` → the "요" glyph reconstruction sample
- `uploads/font_upload_image.png` → heptagon vertex diagram, "define-the-shape" moment
- `uploads/cafe_brand_Other_Brande_Reference_image.png` → 감성커피 red/white Hangul mark
- `uploads/edu_platform_Other_Brande_Referenceimage.png` → 타이노 rose/white display Hangul
- `uploads/metaphor_minimal_Screenshot 2026-04-21 at 1.05.30 AM.png` → above-water/below-water iceberg diagram
- `uploads/photo_camera_metaphor_image.png` → tripod/camera metaphor
- `uploads/Other_Brande_Referenceimage (7).png` → The Barn Coffee Roasters (Berlin) wordmark
- `uploads/Other_Brande_Referenceimage.png` → Mitsukoshi-style navy Katakana geometric mark
- `uploads/NotoSansKR-*.ttf` → Noto Sans KR weights 100–900

> **Since no production codebase exists,** the UI kit in `ui_kits/axis_studio/` is a first-principles recreation from these metaphors — it should be treated as the **v0 canonical design** and iterated from here, not as a mirror of a prior product.

---

## 03 — Index / file manifest

```
.
├── README.md                — this file
├── SKILL.md                 — Agent Skills manifest (Claude Code compatible)
├── colors_and_type.css      — CSS custom-properties for type, color, spacing, motion
├── fonts/                   — Noto Sans KR (9 weights), self-hosted
├── assets/                  — Logos, reference imagery, brand marks
│   ├── logo-axis-mark.svg         — primary mark (jamo-decomposed 축)
│   ├── logo-axis-wordmark.svg     — horizontal lockup
│   ├── logo-axis-stack.svg        — stacked lockup w/ tagline
│   ├── axis-logo-asterisk.png     — source mark (for reference)
│   ├── axis-logo-chuk.png         — deconstructed 축 studies
│   ├── reference-font-*.png       — AI-reconstructed glyph samples
│   └── ref-*.png                  — mood / reference brands
├── preview/                 — registered design-system cards (Design System tab)
└── ui_kits/
    └── axis_studio/         — flagship product: the Axis web studio
        ├── README.md
        ├── index.html
        └── *.jsx            — modular components
```

---

## 04 — Content fundamentals

**Tone.** Quiet, precise, editorial. Axis speaks like a typographer explaining their craft — never like an AI demo. Prefer nouns over verbs; prefer understatement over enthusiasm. The reader is assumed to be a designer or a designer-adjacent person who already cares about typography.

**Voice attributes.**
- **Architectural** — every word earns its place, the way every glyph stroke earns its weight.
- **Bilingual, effortlessly** — Korean and English coexist on every surface without translation-lag. Korean is the source language for product names; English is the working lingua franca.
- **Specific, never marketing-speak** — "uniform scale across syllables" is allowed. "AI-powered typography for the modern age" is not.

**Grammatical pattern.**
- First person plural when speaking as Axis itself: "We align. We calibrate. We don't compress."
- Second person when instructing the user: "Drop a specimen. Type your text. Axis does the rest."
- Never "I"; Axis is a studio, not a chatbot persona.

**Casing.**
- Sentence case for UI labels and body copy.
- `UPPERCASE WITH WIDE TRACKING` (0.18em) for eyebrow labels, plate numbers, section markers.
- Product names and the wordmark: **AXIS** (all caps, mono) paired with **축** (Hangul).
- Korean follows standard orthography — no forced casing.

**Numbers, metadata, specimens.**
Letterpress convention: `PL.042 · 축.01 · HANGUL-24PT · 12 WEIGHTS`. Treat metadata like plate numbers on a specimen sheet.

**Emoji / icons.** **No emoji, ever.** Icons are 1px-stroke line glyphs, geometric, or thin mono-weight SVG. Unicode marks (✕, →, ↗, +, ·, /) are welcome because they read as typography, not decoration.

**Examples (copy from the product).**
- Hero: "Typography as infrastructure. / 한글을 구조로."
- Empty state: "Drop a specimen. Or paste a glyph URL."
- Progress: "Measuring stroke contrast · 2/7"
- Button: "Render" (not "Generate AI Font Now!")
- Disabled: "Needs a specimen"
- Error: "This image has no legible glyphs. Try another plate."
- Feature: "Uniform scale across all 11,172 Hangul syllable blocks."

---

## 05 — Visual foundations

### Color
Axis is **black ink on white paper** — full stop. The neutral ramp (`--ink-050` → `--ink-900`) carries 99% of the UI. Accents are reserved for **registration marks only**:
- `--mark-red` (#C8281E) — calibration / alignment ticks, never as a fill for buttons or text blocks.
- `--mark-navy` (#1B2347) — informational plate markers, reference brand homage (Mitsukoshi).
- `--mark-cyan` (#00A6B8) — CMYK bar, press-proof ornament.

No candy colors. No gradients (see below). No "primary / secondary / success / danger" as saturated fills — status is communicated by 1px hairline color + a letter mark (`OK`, `WARN`, `ERR`) in mono.

### Gradients
**None, by default.** The only gradient allowed is a subtle paper-to-cream vignette on hero full-bleed image surfaces, and the protection gradient under text overlaid on imagery (black 0 → 40% opacity, bottom-anchored). No rainbow/bluish-purple/brand gradients — they actively contradict the letterpress / typographer metaphor.

### Type
- **Display**: JetBrains Mono 600–700. Mono display is the core signature — it reads as *calibration, grid, specimen sheet*. Negative tracking at 96px+ (`-0.02em`). Korean display pairs with Noto Sans KR Bold at matched optical size.
- **Body**: Noto Sans KR 400. Pairs with JetBrains Mono for Latin inside Korean text — the matched x-height makes the mix feel intentional.
- **Mono**: JetBrains Mono 400/500 for meta, plate numbers, timestamps, code samples, and UI eyebrow labels.
- Korean line-height is **1.65**; Latin body is 1.55; display is 1.02–1.15.

### Backgrounds
- **Primary**: `--bg-1` (pure white).
- **Cards / panels**: `--bg-2` (warm off-white, `#F7F7F5`).
- **Wells / fills**: `--bg-3` (`#EFEFEC`).
- **Dark inversions** used sparingly, for hero moments only.
- **Grid paper** — optional `--grid-line` overlay (1px dots, 24px modulus) for "studio" / editor surfaces. Never on marketing surfaces.
- **Imagery** — warm, desaturated, grainy; if color imagery is used it's muted and cool-tinted, never oversaturated. We prefer black-and-white photography of tools, paper, presses, grids, Hangul letterpress blocks.
- **No repeating illustrated patterns.** No mesh gradients. No 3D blobs. No hand-drawn doodles.

### Animation
- **Fast, linear-feeling.** `--dur-1` 120ms, `--dur-2` 200ms, `--dur-3` 320ms. The longest standard duration is 320ms.
- **Easing**: `cubic-bezier(0.2, 0.7, 0.2, 1)` — exits fast, lands softly. No bounces. No elastic. No spring physics.
- **Signature motion**: glyphs align to their axis on load — each Hangul syllable snaps to its baseline with a 200ms translate. Use for hero + empty states only.
- **Hover**: opacity shift on icons (→ 1.0), underline extend on links (left→right, 200ms), ink-darken on buttons (−4% lightness). No scale transforms on hover.
- **Press**: scale(0.98) + 120ms darken. Buttons briefly "seat" into the paper.
- **Page transitions**: a 1px horizontal rule sweeps left-to-right over the viewport (320ms) while content fades in. Evokes a film-strip wipe or platen return.

### Borders, rules, shadows
- **Shadows are essentially forbidden.** We use rules, not elevation.
- A "card" is a 1px hairline box (`--line-1`), no shadow, no radius beyond 2px.
- The only allowed shadow is `--shadow-focus` — a hard two-ring focus ring (2px white inner, 2px black outer). Never soft, never colored.
- **Hairlines** (1px, `--ink-900`) are a core graphic element — use them as section dividers, between nav and content, under eyebrow labels, and as "spine" rules in layouts.

### Layout
- **Spine layouts**: a vertical 1px rule down the center of the viewport (or a column gutter) anchors hero and marketing sections, reinforcing the axis metaphor.
- **Grid**: 12 columns, 72px col width, 24px gutter. Max content width 1280px; hero full-bleed.
- **Baseline grid**: 8px, visible in editor mode.
- **Fixed elements**: top bar is sticky (56px), with 1px bottom hairline. No floating action buttons. No sticky CTAs.
- **Protection gradient over imagery**: linear `rgba(0,0,0,0)` → `rgba(0,0,0,0.4)` from 40% to 100% of the image height; text sits in the bottom 30%.

### Transparency, blur, overlays
- **Almost none.** Axis does not rely on glassmorphism. The only acceptable blur is `backdrop-filter: blur(20px) saturate(1.2)` on a single element: the **floating plate inspector** in the studio (a palette that hovers over a specimen image).
- **Modal backdrops**: solid black at 60% opacity — never blurred.

### Corner radii
- **0px default.** Buttons, inputs, cards: `--r-1` (2px) to soften edges just enough.
- **Pills (`999px`) only on tags and plate markers** — never on primary buttons. A pill button would betray the type-foundry feel.

### Cards
A card is:
- 1px hairline border (`--line-1`)
- 0–2px radius
- `--bg-2` fill
- No shadow
- A mono plate number in the top-right: `PL.042`
- A hairline rule (1px, `--ink-900`) under the title, extending full-width of the card

### Buttons
- Primary: black fill, white label, 2px radius, 12×20 padding, `--t-body-sm` weight 500. No shadow, no gradient. Press = `scale(0.98)` + darker.
- Secondary: white fill, 1px black border, black label. Hover = ink fill invert.
- Tertiary / link-like: no border, underline-on-hover (from-left animation).
- Destructive: same as primary but label is `mark-red`. Never a red fill.

### Form inputs
- 40px tall, 1px border, 2px radius, 12px horizontal padding, mono label floating above.
- Focused: 2px black border (not a ring).
- Disabled: `--bg-3` fill, `--fg-disabled` text, dashed 1px border.

### Iconography
- Thin line (1.5px stroke), geometric, 24×24 viewbox. Prefer **Lucide** (1.5px stroke) as the CDN fallback. The Axis-native icon set leans on letterpress/plate-tool metaphors — crosshair, ruler, axis, tripod, plate, registration-mark, specimen-frame.
- **No emoji.** **No filled/glyph icon fonts** (no Font Awesome). Unicode geometric marks (✕ → ↗ + · /) are welcome.

### Imagery
- **Primary**: letterpress blocks, Hangul type specimens, calibration plates, paper grain — all monochrome or duotone (`--ink-900` + `--paper-cream`).
- **Secondary**: photography of tools (tripod, loupe, ruler) — desaturated, warm-cool split-tone OK.
- **Never**: stock AI-office photos, abstract 3D renders, bluish-purple gradient meshes, emoji-heavy illustration.

---

## 06 — Iconography

Axis uses **thin-line (1.5px stroke) geometric icons**, drawn to match the weight of the Hangul stroke at body size. We ship none natively; instead we **link Lucide from CDN** as a pragmatic baseline (the stroke weight and geometry align with our system), and we **flag any icon in the UI that should eventually be replaced with a custom Axis glyph** — specifically any of: `axis`, `plate`, `registration-mark`, `specimen`, `glyph-box`, `tripod`, `calibration-bar`.

```html
<!-- In any product surface -->
<script src="https://unpkg.com/lucide@latest"></script>
<script>lucide.createIcons();</script>
<i data-lucide="plus" stroke-width="1.5"></i>
```

Rules:
1. **1.5px stroke only.** Never fill icons. Never mix stroke weights.
2. **Color**: `currentColor`, which is `--fg-2` in most contexts. Icons never carry brand color.
3. **Size**: 16 / 20 / 24 / 32 only. No in-between sizes.
4. **Pair with label whenever possible.** Icon-only buttons get a tooltip with the mono label.
5. **No emoji** in product copy, labels, tooltips, marketing, or social.
6. **Unicode geometric marks** (`✕ → ↗ ← + · / ∙ ▪ □ ◻`) are welcome as typographic ornaments.

### Substitution flag
Because no production icon set existed, **Lucide is a substitution**. For v1, Axis should commission a 16-glyph core set: axis, plate, crosshair, registration, baseline, syllable-block, tripod, loupe, ruler, grid, stroke-weight, contrast, upload, render, download, specimen.

---

## 07 — UI Kits

### `ui_kits/axis_studio/`
The flagship product surface: **the Axis Studio**, a web tool where a user uploads a Hangul specimen image, types target text, and receives a rendered image in the same typographic style.

Surfaces covered:
- **Landing / marketing hero** — the "spine" layout
- **Studio (editor)** — upload, specimen inspector, target text, render queue
- **Specimen inspector** — the floating plate palette
- **Render result** — before/after with plate metadata
- **Gallery / specimen archive** — grid of saved renders

See `ui_kits/axis_studio/README.md`.

---

## 08 — Known caveats / substitutions

1. **No production codebase or Figma** — the UI kit is a first-principles v0 derived from the reference imagery. Treat it as an opinionated starting point.
2. **Latin display font = JetBrains Mono (Google Fonts)** — chosen because the original references show a clear typographer/letterpress sensibility and JetBrains Mono's engineered geometry reads as "precision instrument." If Axis commissions a custom mono, it should substitute cleanly via `--font-display`.
3. **Icons = Lucide via CDN** — a substitution. See §06.
4. **Korean body font = Noto Sans KR** — provided by the user, self-hosted in `fonts/`.
5. No production product copy exists; all sample copy is modeled on the brand's voice principles above and should be reviewed by a Korean copywriter before shipping.
