name: "Chuk Design System v0.5.1 — Extension"
version: "0.5.1"
companion: "design.md"
authors:
  - "STITCH (Color & Symbol Specialist Agent)"
  - "Chuk Design Team"

sources:
  - file: "Chuk Design System v0.5.html"
    role: "System of record (rules, hierarchy, coexistence)"
  - file: "Harmony Test.html"
    role: "Empirical verification (Pretendard × 축 logo, 8/8 PASS)"
  - file: "exports/chuk-logo.svg"
    role: "Audited primitive (FINAL: PASS / COMPATIBLE)"
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
      - { value: "#f4f3ef", source: "DS v0.5", note: "neutral cream — current production" }
      - { value: "#f5f2e8", source: "Harmony Test v0.2", note: "warmer cream" }
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
    - { date: pending, key: "bg-canonical", options: ["#f4f3ef","#f5f2e8","#fdf8f8"], chosen: null }
    - { date: pending, key: "accent-deep", options: ["#ab3600"], chosen: null }
    - { date: pending, key: "adopt-surface-slots", options: ["yes","no","partial"], chosen: null }
    - { date: pending, key: "adopt-role-slots", options: ["yes","no","partial"], chosen: null }

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
      contrast-ratios: "16.45 · 4.57 · 3.60"
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

logo:
  source: "exports/chuk-logo.svg"
  viewBox: "0 0 600 600"
  bytes: 776
  visible_elements: 6
  audit:
    octagon:
      vertex-angles: [22.49, 67.51, 112.49, 157.51]
      side-lengths: [15.30, 15.32]
      circumscribed-radius: 20.00
      center: [300.00, 300.00]
    bar:
      x: 275
      width: 50
      height: 456
    rays:
      angles: [0, 45, 90, 135]
      stroke-width: 3
  verdict: "FINAL: PASS / COMPATIBLE (8/8)"
  reaudit: "exports/chuk-logo-svg-audit-prompt.md"

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
      - "WCAG 16.45 / 4.57 / 3.60"
  patterns:
    A: "Logo Lockup — 3 sizes (32 / 56 / 120)"
    B: "Section Anchor — eyebrow + headline"
    C: "Display Headline — color-coded, dark surface"
    D: "Vertex Mark — punctuation-sized octagon"
  resolution_from_report1_to_report2:
    angle-remeasured: "ㅅ/ㅈ 51–53° (estimated) → 65–70° (measured) → Δ20–25° PASS"
    bg-token-unified: "#f5f2e8 (HT) → #f4f3ef (DS v0.5)"
    rules-retained: "All 4+4 avoidance rules kept regardless of PASS"

system_rules:
  R1: "1 system at a time (logo OR Pretendard, never inline mixed)"
  R2: "95/5 mix ratio enforced"
  R3: "Octagon vertex = accent injection point (only)"
  R4: "All structural lines = ink (#141414)"
  R5: "Container boundary preserved by line (#e6e1d6)"
  R6: "Mono = system stack only"
  R7: "Accent restricted to vertex / interaction state"
  R8: "Grid-guide visible only in technical drawings"
  R9: "Logo × Body Type coexistence — 4 DO + 4 DON'T (see components.dodont)"
