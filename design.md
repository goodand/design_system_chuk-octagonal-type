---
name: Chuk Design System
version: 0.5.1
companion: design-extension.md
authors:
  - STITCH (Color & Symbol Specialist Agent)
  - Chuk Design Team
notes: |
  Canonical token surface for the Chuk Design System.
  This file holds ONLY the STITCH standard slots: colors / typography / spacing.
  All extended context (pending color decisions, components, logo primitive,
  harmony test outcomes, system rules R1–R9) lives in `design-extension.md`.

# ── COLORS ─────────────────────────────────────────────────────
# CORE 8 tokens — agreed in DS v0.5 + Harmony Test (8/8 PASS).
# MD3 surface/role slots are NOT adopted here; they are tracked
# in design-extension.md under `colors_pending_review` until the
# user approves them.
colors:
  ink:         '#141414'   # body text · structural lines · bar
  ink-subtle:  '#4a4a4a'   # secondary text
  ink-muted:   '#8a8a8a'   # captions · mono details
  line:        '#e6e1d6'   # dividers · card borders
  bg:          '#f4f3ef'   # page surface
  paper:       '#faf9f5'   # raised cards · stages
  accent:      '#d9531e'   # vertex mark only · 5% rule
  grid-guide:  '#cfd2d8'   # technical drawings only

# ── TYPOGRAPHY ─────────────────────────────────────────────────
# Pretendard is the system of record. All Harmony Test audits
# (stem 6.5px / ㅅ·ㅈ 65–70° / ㅇ 60px / 8/8 PASS) were measured
# against Pretendard. Mono is the system stack only.
typography:
  display-hero:
    fontFamily:   "Pretendard, -apple-system, system-ui, sans-serif"
    fontSize:     76px
    fontWeight:   '700'
    lineHeight:   '1.0'
    letterSpacing: -0.035em
    usage:        "Hero h1 · cover titles · 1 per page"
  headline-section:
    fontFamily:   "Pretendard, -apple-system, system-ui, sans-serif"
    fontSize:     26px
    fontWeight:   '700'
    lineHeight:   '1.2'
    letterSpacing: -0.02em
    usage:        "section h2 · §-numbered headings"
  headline-card:
    fontFamily:   "Pretendard, -apple-system, system-ui, sans-serif"
    fontSize:     18px
    fontWeight:   '700'
    lineHeight:   '1.3'
    letterSpacing: -0.01em
    usage:        "rule cards · combo cells · DO/DON'T labels"
  body-lede:
    fontFamily:   "Pretendard, -apple-system, system-ui, sans-serif"
    fontSize:     17px
    fontWeight:   '400'
    lineHeight:   '1.65'
    letterSpacing: -0.01em
    usage:        "hero lede · section intros"
  body-main:
    fontFamily:   "Pretendard, -apple-system, system-ui, sans-serif"
    fontSize:     14px
    fontWeight:   '400'
    lineHeight:   '1.6'
    letterSpacing: -0.01em
    usage:        "default running text"
  body-small:
    fontFamily:   "Pretendard, -apple-system, system-ui, sans-serif"
    fontSize:     12px
    fontWeight:   '400'
    lineHeight:   '1.6'
    letterSpacing: 0
    usage:        "captions · audit table · note"
  label-mono:
    fontFamily:   "ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize:     11px
    fontWeight:   '500'
    lineHeight:   '1.2'
    letterSpacing: 0.1em
    usage:        "section numbers · verdict tags"
  eyebrow:
    fontFamily:   "ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize:     10px
    fontWeight:   '500'
    lineHeight:   '1.0'
    letterSpacing: 0.24em
    textTransform: uppercase
    usage:        "rv tags · cap text · meta"
  meta-data:
    fontFamily:   "ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize:     10px
    fontWeight:   '400'
    lineHeight:   '1.6'
    letterSpacing: 0.02em
    usage:        "audit numbers · params · footnotes"

# ── SPACING ────────────────────────────────────────────────────
spacing:
  page-max-width:     1320px
  margin-page:        56px      # outer page padding
  section-gap:        96px      # between top-level sections
  container-padding:  48px      # inside hierarchy / typeboard / hero-mark
  card-padding:       32px      # inside coexist columns / triad cells
  inner-padding:      24px      # inside dodont cells / combo cells
  element-gap-lg:     48px      # hero gutter
  element-gap-md:     18px      # section-head gap · review row gap
  element-gap-sm:     12px      # in-cell gap (label → desc)
  element-gap-xs:     6px       # within compact rows
---
