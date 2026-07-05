name: "Chuk Design System v0.6.0 — Extension"
version: "0.6.0"
companion: "design.v0.6.0.md"
authors:
  - "STITCH (Color & Symbol Specialist Agent)"
  - "Chuk Design Team"
changelog:
  v0.6.0:
    - "BREAKING: system_rules R1–R9 redefined to match canonical PDF page 5 (was harmony-operating rules in v0.5.1)"
    - "NEW: r9_operating_rules — old v0.5.1 system_rules content moved here"
    - "FIX: SVG primitive made transparent (background rect removed)"
    - "FIX: contrast_table rewritten with explicit pair labels"
    - "FIX: visible element counts split into 4 named counts (logo_primitives / svg_visible_nodes_excluding_background / svg_visible_nodes_including_background / semantic_groups)"
    - "FIX: R4 chamfer scope clarified — Axis ray/bar exempt as orthogonal datum"
    - "NEW: accent_scope split into accent_symbol / accent_ui (same hex, separate semantics)"

sources:
  - file: "Chuk Design System v0.6.0.html"
    role: "System of record (rules, hierarchy, coexistence)"
  - file: "Harmony Test.html"
    role: "Empirical verification (Pretendard × 축 logo, 8/8 PASS)"
  - file: "exports/chuk-logo.v0.6.0.svg"
    role: "Audited primitive — transparent (FINAL: PASS / COMPATIBLE)"
  - file: "exports/chuk-logo-svg-audit-prompt.md"
    role: "Reproducible re-audit instructions"
  - report: "Audit Report 1 (PNG-only)"
    verdict: "FINAL: WARN / COMPATIBLE_WITH_RULES"
  - report: "Audit Report 2 (SVG-confirmed)"
    verdict: "FINAL: PASS / COMPATIBLE"

colors_pending_review:
  status: "awaiting user approval"
  proposed_by: "STITCH"
  rationale: |
    Material Design 3 surface system on top of the 5 CORE tokens.
    Useful for tooling interop (Figma MD3 plugins, Android themes), but
    not required for the Chuk visual identity.
  candidates:
    bg:
      - { value: "#f4f3ef", source: "DS v0.5", note: "neutral cream — current production (CHOSEN canonical)" }
      - { value: "#f5f2e8", source: "Harmony Test v0.2", note: "warmer cream — deprecated in v0.6.0" }
      - { value: "#fdf8f8", source: "STITCH", note: "pinkish white — risks hue collision with accent" }
    accent-deep:
      - { value: "#ab3600", source: "STITCH", note: "darker orange · hover/pressed states" }
    surface_slots:
      - surface-dim
      - surface-bright
      - surface-container-lowest
      - surface-container-low
      - surface-container
      - surface-container-high
      - surface-container-highest
      - surface-tint
      - surface-variant
      - inverse-surface
      - inverse-on-surface
      - outline
      - outline-variant
    role_slots:
      - { role: primary, ck_mapping: ink, pending_md3_value: "#000000" }
      - { role: secondary, ck_mapping: accent, pending_md3_value: "#ab3600" }
      - { role: tertiary, ck_mapping: line, pending_md3_value: "#000000" }
      - { role: surface, ck_mapping: paper, pending_md3_value: "#faf9f5" }
      - { role: background, ck_mapping: bg, pending_md3_value: "#f4f3ef" }
      - { role: error, ck_mapping: null, pending_md3_value: "#ba1a1a" }
  decision_log:
    - { date: "2026-04-27", key: "bg-canonical", options: ["#f4f3ef","#f5f2e8","#fdf8f8"], chosen: "#f4f3ef" }
    - { date: pending, key: "accent-deep", options: ["#ab3600"], chosen: null }
    - { date: pending, key: "adopt-surface-slots", options: ["yes","no","partial"], chosen: null }
    - { date: pending, key: "adopt-role-slots", options: ["yes","no","partial"], chosen: null }

# ─── ACCENT SCOPE ────────────────────────────────────────────────
# Same hex, two separate semantic tokens. Future dark-mode or A11y
# variants may diverge.
accent_scope:
  accent_symbol:
    hex: "#d9531e"
    used_in:
      - "octagon vertex (within logo geometry)"
      - "core node mark (within hierarchy diagram)"
    forbidden_in:
      - "body text"
      - "border lines"
      - "background fills"
  accent_ui:
    hex: "#d9531e"
    used_in:
      - "rule_number"
      - "verdict_pill (PASS / WARN)"
      - "DON'T badge"
      - "selected_state / interaction state"
    forbidden_in:
      - "long-form headings"
      - "running body text"
      - "border lines wider than 1px"
      - "background fills"

# ─── COMPONENTS ──────────────────────────────────────────────────
components:
  hero:
    grid: "1.1fr 1fr"
    elements: [eyebrow, h1, lede, hero-mark]
  hierarchy:
    layout: "core-row over sub-row, gap 36px"
    nodes: [core, primary, secondary]
  triad:
    columns: 3
    pattern: "winner column dark (uses `ink`), others use `paper`"
  rules:
    columns: 4
    count: 9
  two-reports:
    columns: 2
    purpose: "Show audit progression — WARN → PASS"
    verdicts:
      report-1: "FINAL: WARN / COMPATIBLE_WITH_RULES"
      report-2: "FINAL: PASS / COMPATIBLE"
  coexist:
    columns: "1.1fr 1fr"
    halves: [origin-audit, reference-lockup]
    metrics:
      scale-factor: "viewBox 600 → 96px (×0.16)"
      ray-stroke: "0.48 px @96 · stem ≈ 6.5 px"
      bar-ratio: "w/h = 8 / 72.96 = 0.110"
      octagon-hierarchy: "diam 6.4 px · ㅇ ≈ 60 px → 9.38×"
      angle-separation: "ray 45° · ㅅ/ㅈ 65–70° (Δ20–25°)"
      contrast-ratios: "see contrast_table"
  dodont:
    columns: 4
    do:
      - { id: 01, label: "컨테이너 분리", rule: "min gap = symbol-width × 0.18" }
      - { id: 02, label: "Hairline 두께", rule: "stroke ≤ stem × 1/8" }
      - { id: 03, label: "크기 위계 ≥ 6×", rule: "octagon ≤ ㅇ × 0.16" }
      - { id: 04, label: "수직축 대칭 보존", rule: "center.x ≡ 300 ± 0.1" }
    dont:
      - { id: 01, label: "#141414 겹침 금지", rule: "no z-overlap on body text" }
      - { id: 02, label: "ㅅ/ㅈ 인접 배치 금지", rule: "min gap ≥ 8 px @96" }
      - { id: 03, label: "ㅇ 크기 팔각형 금지", rule: "octagon ∉ [0.7×, 1.3×] of ㅇ" }
      - { id: 04, label: "광선 굵기 금지", rule: "stroke > stem/8 → reject" }
  audit-table:
    rows: 8
    pass-rate: "8/8"
    note: "Item 8 (#141414 ≡ #141414) is conditional on DO·01."
  combinations:
    columns: 3
    cells: ["축-단독", "축+톱니바퀴", "축+빙산"]
    rule: "축 + ONE auxiliary · never three at once"
  palette:
    columns: 5
    swatches: [ink, ink-subtle, line, paper, accent]

# ─── LOGO PRIMITIVE ──────────────────────────────────────────────
logo:
  source: "exports/chuk-logo.v0.6.0.svg"
  viewBox: "0 0 600 600"
  bytes: 706
  background: "transparent (no <rect> background — host container provides surface)"
  legacy_with_background: "exports/chuk-logo-on-warm-cream.svg (deprecated, retained for archive)"
  # Four named counts — replaces ambiguous "visible_elements"
  element_counts:
    logo_primitives: 6              # 4 rays + 1 bar + 1 octagon (conceptual units)
    svg_visible_nodes_excluding_background: 6
    svg_visible_nodes_including_background: 6   # background removed in v0.6.0; equals above
    semantic_groups: 3              # rays-group + bar + octagon
  audit:
    octagon:
      vertex-angles: [22.49, 67.51, 112.49, 157.51]
      side-lengths: [15.30, 15.32]
      circumscribed-radius: 20.00
      center: [300.00, 300.00]
      fill: "#d9531e (accent_symbol)"
    bar:
      x: 275
      y: 72
      width: 50
      height: 456
      fill: "#141414 (ink)"
      terminal: "orthogonal (R4 exempt — Axis datum)"
    rays:
      angles: [0, 45, 90, 135]
      stroke-width: 3
      stroke-linecap: "butt"
      stroke: "#141414 (ink)"
      terminal: "orthogonal (R4 exempt — Axis datum)"
  verdict: "FINAL: PASS / COMPATIBLE (8/8)"
  reaudit: "exports/chuk-logo-svg-audit-prompt.md"

# ─── HARMONY ─────────────────────────────────────────────────────
harmony:
  primary-stack: "Pretendard + 축 logo"
  mix-ratio: "95% Pretendard / 5% 축"
  conflict-heatmap:
    HIGH:
      - "ㅇ 형태 (1.14:1 vs 1:1)"
      - "색상 hex (#141414 ≡ #141414) — resolved by DO·01"
    MED:
      - "대각선 각도 45° vs 65–70°"
      - "종단/꺾임 (직각 vs 챔퍼)"
    LOW:
      - "획 굵기 0.074"
      - "막대 비율 0.110"
      - "컬럼 점유 ≤ 25%"
      - "see contrast_table"
  patterns:
    A: "Logo Lockup — 3 sizes (32 / 56 / 120)"
    B: "Section Anchor — eyebrow + headline"
    C: "Display Headline — color-coded, dark surface"
    D: "Vertex Mark — punctuation-sized octagon"
  resolution_from_report1_to_report2:
    angle-remeasured: "ㅅ/ㅈ 51–53° (estimated) → 65–70° (measured) → Δ20–25° PASS"
    bg-token-unified: "#f5f2e8 (HT) → #f4f3ef (DS v0.5) → canonical in v0.6.0"
    rules-retained: "All 4+4 avoidance rules kept regardless of PASS"

# ─── CONTRAST TABLE (v0.6.0 — replaces ambiguous 16.45·4.57·3.60) ─
contrast_table:
  notes: |
    Computed from CORE 8 hex with WCAG 2.1 relative-luminance formula.
    "AA" = 4.5:1 normal text, "AA Large" = 3:1 large text/non-text,
    "AAA" = 7:1 normal text. Pair labels are explicit — no ambiguity
    about which color is foreground.
  pairs:
    - { fg: "ink #141414",    bg: "bg #f4f3ef",    ratio: 16.59, verdict: "AAA",         use: "primary body text" }
    - { fg: "ink #141414",    bg: "paper #faf9f5", ratio: 17.10, verdict: "AAA",         use: "card body text" }
    - { fg: "ink-subtle #4a4a4a", bg: "bg #f4f3ef", ratio: 8.34, verdict: "AAA",        use: "secondary text" }
    - { fg: "ink-muted #8a8a8a",  bg: "bg #f4f3ef", ratio: 3.30, verdict: "AA Large only", use: "captions only — never body" }
    - { fg: "accent #d9531e", bg: "bg #f4f3ef",    ratio: 3.63, verdict: "AA Large only", use: "vertex mark · UI status — never body text" }
    - { fg: "accent #d9531e", bg: "ink #141414",   ratio: 4.57, verdict: "AA boundary",  use: "accent on dark surface (Display Headline)" }
    - { fg: "paper #faf9f5",  bg: "ink #141414",   ratio: 16.45, verdict: "AAA",         use: "inverted text on dark stage" }
    - { fg: "line #e6e1d6",   bg: "bg #f4f3ef",    ratio: 1.17, verdict: "non-text only", use: "dividers · borders — never text" }

# ─── SYSTEM RULES (R1–R9) — v0.6.0 CANONICAL ─────────────────────
# These match the PDF page 5 visual rule cards exactly. Previously
# (v0.5.1) this slot held harmony-operating rules; those have been
# moved to `r9_operating_rules` below.
system_rules:
  R1:
    title: "팔각형 마스터 그리드"
    en: "Octagonal master grid"
    statement: "All geometry constructs from a regular octagon. Vertex angles 22.5° / 67.5° / 112.5° / 157.5°."
  R2:
    title: "허용 각도"
    en: "Permitted angles"
    statement: "0° · 45° · 90° · 135° only. No 30° / 60° / arbitrary angles."
  R3:
    title: "축의 무게 위계"
    en: "Axis weight hierarchy"
    statement: "Vertical bar (heaviest) > horizontal ray > diagonal rays. Hierarchy preserved across all sizes."
  R4:
    title: "45° 챔퍼 법칙 (정정 v0.6.0)"
    en: "45° chamfer law (revised v0.6.0)"
    statement: "45° chamfer applies to Gear primitive facets and glyph terminals only. Axis primitive ray/bar terminals remain orthogonal as datum reference — preserves the orthogonality of the axis system."
  R5:
    title: "심볼 위계"
    en: "Symbol hierarchy"
    statement: "Core symbol × 1 (axis) · Sub symbols × 2 (gear, iceberg). Never three auxiliaries at once."
  R6:
    title: "팔각 정점 반복"
    en: "Octagon vertex repetition"
    statement: "The octagon's 8 vertices act as anchor points across the system — UI markers, charts, layout grids align to these positions."
  R7:
    title: "색 위계 (정정 v0.6.0)"
    en: "Color hierarchy (revised v0.6.0)"
    statement: "Within symbol geometry: accent appears only at octagon vertices. Within system UI: accent reserved for status/interaction markers (rule numbers, verdict pills, badges) — never body text or borders. See accent_scope.accent_symbol vs accent_ui."
  R8:
    title: "타입·심볼 정렬"
    en: "Type · symbol alignment"
    statement: "Logo lockup baselines align to Pretendard cap height. Symbol bar aligns to vertical text axis (center.x ≡ glyph centerline)."
  R9:
    title: "로고 × 본문 공존"
    en: "Logo × body type coexistence"
    statement: "4 DO + 4 DON'T (see components.dodont and r9_operating_rules)."

# ─── R9 OPERATING RULES (moved from v0.5.1 system_rules) ─────────
# These are derived operating rules supporting R9. They are NOT
# the canonical R1–R9 — they live alongside dodont as runtime checks.
r9_operating_rules:
  one_system_at_a_time:
    statement: "Logo OR Pretendard, never inline mixed within a single text run."
  mix_ratio_95_5:
    statement: "95% Pretendard / 5% 축 across any composition. Enforced by visual audit, not by rendering."
  vertex_only_accent_injection:
    statement: "Within logo geometry, accent_symbol appears only at the octagon vertex — never on rays, bar, or other shapes."
  structural_lines_ink:
    statement: "All structural lines use ink (#141414). No accent or color used for structure."
  container_boundary_line:
    statement: "Container boundary preserved by line token (#e6e1d6) at 1px solid."
  mono_system_stack_only:
    statement: "Monospace = ui-monospace, 'SF Mono', Menlo system stack only. No external mono CDN."
  accent_status_states:
    statement: "Within UI, accent_ui marks status/interaction — selected, PASS, error badge, rule number. See accent_scope."
  grid_guide_technical_only:
    statement: "grid-guide token visible only in technical drawings (audit pages, spec sheets). Never in production output."
  logo_body_coexistence:
    statement: "Logo × Body Type coexistence enforced by 4 DO + 4 DON'T rules. See components.dodont."
