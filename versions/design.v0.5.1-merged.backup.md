---
name: Chuk Design System v0.5
version: 0.5.1
authors:
  - STITCH (Color & Symbol Specialist Agent)
  - Chuk Design Team
sources:
  - file: Chuk Design System v0.5.html
    role: System of record (rules, hierarchy, coexistence)
  - file: Harmony Test.html
    role: Empirical verification (Pretendard × 축 logo, 8/8 PASS)
  - file: exports/chuk-logo.svg
    role: Audited primitive (FINAL: PASS / COMPATIBLE)
  - report: Audit Report 1 (PNG-only) — FINAL WARN / COMPATIBLE_WITH_RULES
  - report: Audit Report 2 (SVG-confirmed) — FINAL PASS / COMPATIBLE
  - audit_summary: |
      Two-stage audit produced 4 DO + 4 DON'T rules + 8-item Pretendard
      compatibility table. R9 (Logo × Body Type Coexistence) codifies
      these into the system. Empirically verified in Harmony Test.html
      across 4 visual patterns (A lockup / B section anchor / C display
      / D vertex mark) and a conflict heatmap of 8 cells.

# ── COLORS ─────────────────────────────────────────────────────
# STATUS: PENDING USER DECISION
#
# STITCH (Color & Symbol Specialist Agent) proposed an MD3 surface
# system on top of our 5 CORE tokens. Claude does NOT auto-adopt
# these — the user makes the final call on every color token.
#
# Below:
#   (A) CORE · 5 tokens — already agreed in DS v0.5 + Harmony Test.
#                         These are the source of truth and stay.
#   (B) STITCH PROPOSAL · MD3 slots — kept under a separate key,
#                         marked `pending: true`. Do not consume
#                         from this block until user approves.
colors:
  # ─ (A) CORE · agreed, in production ─
  ink:                       '#141414'   # body, structural lines, bar
  ink-subtle:                '#4a4a4a'   # secondary text
  ink-muted:                 '#8a8a8a'   # captions, mono details
  line:                      '#e6e1d6'   # dividers, card borders
  bg:                        '#f4f3ef'   # page surface  ← PENDING confirmation (see decisions below)
  paper:                     '#faf9f5'   # raised cards, stages
  accent:                    '#d9531e'   # vertex mark ONLY · 5% rule
  grid-guide:                '#cfd2d8'   # technical drawings only

# ─ (B) STITCH PROPOSAL · pending user decision ─
colors_pending_review:
  status: "awaiting user approval"
  proposed_by: "STITCH (Color & Symbol Specialist Agent)"
  notes: |
    Material Design 3 surface system. Useful for tooling interop
    (Figma MD3 plugins, Android themes), but not required for the
    Chuk visual identity. User decides whether to adopt, partially
    adopt, or reject.
  candidates:
    bg:
      - { value: '#f4f3ef', source: 'DS v0.5',          note: 'neutral cream · matches WCAG 16.45/3.60 measurements' }
      - { value: '#f5f2e8', source: 'Harmony Test v0.2', note: 'warmer cream' }
      - { value: '#fdf8f8', source: 'STITCH',            note: 'pinkish white — risks hue collision with accent' }
    accent-deep:
      - { value: '#ab3600', source: 'STITCH', note: 'darker orange for hover/pressed states' }
    surface_slots:    # MD3 surface tonal layers
      - surface-dim, surface-bright
      - surface-container-{lowest, low, default, high, highest}
      - surface-tint, surface-variant
      - inverse-surface, inverse-on-surface
      - outline, outline-variant
    role_slots:       # MD3 semantic roles
      - primary, on-primary, primary-container, on-primary-container, inverse-primary
      - secondary, on-secondary, secondary-container, on-secondary-container
      - tertiary, on-tertiary, tertiary-container, on-tertiary-container
      - error,  on-error,  error-container,  on-error-container
  decision_log:
    - { date: pending, key: bg,                 chosen: null }
    - { date: pending, key: accent-deep,        chosen: null }
    - { date: pending, key: surface_slots,      chosen: null }
    - { date: pending, key: role_slots,         chosen: null }

# ── TYPOGRAPHY ─────────────────────────────────────────────────
# CORRECTED: Pretendard is the system of record. All Harmony Test
# audits (stem 6.5px / ㅅ·ㅈ 65–70° / ㅇ 60px / 8/8 PASS) were
# measured against Pretendard. STITCH's Work Sans single-stack and
# my earlier IBM Plex Sans KR proposal are both rejected.
#
# Stack:
#   - Primary (KR + Latin):  Pretendard (300 / 500 / 600 / 700)
#   - Mono:                  ui-monospace, SF Mono, Menlo (system)
# Coexistence rule (R9): logo strokes are hairlines (≤ stem × 1/8),
# logo octagon ≤ ㅇ × 0.16, never within 8px of ㅅ/ㅈ glyphs.
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
  page-max-width:      1320px
  margin-page:         56px      # outer page padding
  section-gap:         96px      # between top-level sections
  container-padding:   48px      # inside hierarchy / typeboard / hero-mark
  card-padding:        32px      # inside coexist columns / triad cells
  inner-padding:       24px      # inside dodont cells / combo cells
  element-gap-lg:      48px      # hero gutter
  element-gap-md:      18px      # section-head gap · review row gap
  element-gap-sm:      12px      # in-cell gap (label → desc)
  element-gap-xs:      6px       # within compact rows

# ── COMPONENTS · v0.5 additions ────────────────────────────────
# Sections present in DS v0.5 + Harmony Test that this design.md
# now formally tracks (so STITCH can re-render or audit).
components:
  hero:
    grid: "1.1fr 1fr"
    elements: [eyebrow, h1, lede, hero-mark]
  hierarchy:
    layout: "core-row over sub-row, gap 36px"
    nodes:  [core, primary, secondary]
  triad:
    columns: 3
    pattern: "winner column dark (var(--ink)), others paper"
  rules:
    columns: 4
    count:   9                    # R1 → R9 (R9 = Logo × Body Type)
  two-reports:
    columns: 2
    purpose: "Show audit progression — WARN → PASS"
    verdicts:
      report-1: "FINAL: WARN / COMPATIBLE_WITH_RULES"
      report-2: "FINAL: PASS / COMPATIBLE"
  coexist:
    columns: "1.1fr 1fr"
    halves:  [origin-audit, reference-lockup]
    metrics:
      scale-factor:        "viewBox 600 → 96px (×0.16)"
      ray-stroke:          "0.48 px @96 · stem ≈ 6.5 px"
      bar-ratio:           "w/h = 8 / 72.96 = 0.110"
      octagon-hierarchy:   "diam 6.4 px · ㅇ ≈ 60 px → 9.38×"
      angle-separation:    "ray 45° · ㅅ/ㅈ 65–70° (Δ20–25°)"
      contrast-ratios:     "16.45 · 4.57 · 3.60"
  dodont:
    columns: 4
    do:
      - { id: 01, label: "컨테이너 분리",   rule: "min gap = symbol-width × 0.18" }
      - { id: 02, label: "Hairline 두께", rule: "stroke ≤ stem × 1/8" }
      - { id: 03, label: "크기 위계 ≥ 6×",  rule: "octagon ≤ ㅇ × 0.16" }
      - { id: 04, label: "수직축 대칭 보존", rule: "center.x ≡ 300 ± 0.1" }
    dont:
      - { id: 01, label: "#141414 겹침 금지",     rule: "no z-overlap on body" }
      - { id: 02, label: "ㅅ/ㅈ 인접 배치 금지",   rule: "min gap ≥ 8 px @96" }
      - { id: 03, label: "ㅇ 크기 팔각형 금지",    rule: "octagon ∉ [0.7×, 1.3×] of ㅇ" }
      - { id: 04, label: "광선 굵기 금지",        rule: "stroke > stem/8 → reject" }
  audit-table:
    rows: 8
    pass-rate: "8/8"
    note:      "Item 8 (#141414 ≡ #141414) is conditional on DO·01."
  combinations:
    columns: 3
    cells:   [축-단독, 축+톱니바퀴, 축+빙산]
    rule:    "축 + ONE auxiliary · never three at once"
  palette:
    columns: 5
    swatches: [Ink, Ink-2, Cream, Paper, Accent]

# ── LOGO PRIMITIVE ─────────────────────────────────────────────
logo:
  source:       "exports/chuk-logo.svg"
  viewBox:      "0 0 600 600"
  bytes:        776
  elements:     5            # 4 rays + 1 bar + 1 octagon (visible)
  audit:
    octagon:
      vertex-angles:  [22.49, 67.51, 112.49, 157.51]
      side-lengths:   [15.30, 15.32]   # alternating
      circumscribed-radius: 20.00
      center:        [300.00, 300.00]
    bar:
      x:            275
      width:        50
      height:       456
    rays:
      angles:       [0, 45, 90, 135]   # ° from horizontal
      stroke-width: 3                  # in viewBox units
  verdict:      "FINAL: PASS / COMPATIBLE (8/8)"

# ── HARMONY TEST OUTCOMES ──────────────────────────────────────
# Empirical results from Harmony Test.html v0.2
harmony:
  primary-stack:    "Pretendard + 축 logo"
  conflict-heatmap:
    HIGH: ["ㅇ 형태 (1.14:1 vs 1:1)", "색상 hex (#141414 ≡ #141414)"]
    MED:  ["대각선 각도 45° vs 65–70°", "종단/꺾임 (직각 vs 챔퍼)"]
    LOW:  ["획 굵기 0.074", "막대 비율 0.110", "컬럼 점유 ≤25%", "WCAG 16.45·4.57·3.60"]
  mix-ratio:        "95% Pretendard / 5% 축"
  patterns:
    A: "Logo Lockup — 3 sizes (32/56/120)"
    B: "Section Anchor — eyebrow + headline"
    C: "Display Headline — color-coded, dark surface"
    D: "Vertex Mark — punctuation-sized octagon"
  resolution-from-report-1-to-2:
    angle-remeasured:    "ㅅ/ㅈ 51–53° (estimated) → 65–70° (measured) → Δ20–25° PASS"
    bg-token-unified:    "#f5f2e8 (HT) → #f4f3ef (DS v0.5)"
    rules-retained:      "All 4+4 avoidance rules kept regardless of PASS"
