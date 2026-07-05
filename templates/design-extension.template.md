# ═══════════════════════════════════════════════════════════════════
# DESIGN SYSTEM — EXTENSION TEMPLATE
# ═══════════════════════════════════════════════════════════════════
# Purpose: All extended context that does NOT belong in the canonical
# token file (`design.template.md`). This includes:
#   • pending color decisions / experiments
#   • components catalog
#   • logo / brand primitive specs
#   • harmony test outcomes
#   • accent (or any dual-scope token) semantic scope
#   • contrast table
#   • system rules (R1..Rn)
#   • operating rules (runtime checks supporting a parent rule)
#
# Replace every <PLACEHOLDER>. Delete sections that do not apply.
# ═══════════════════════════════════════════════════════════════════

name: "<DESIGN_SYSTEM_NAME> — Extension"
version: "<SEMVER>"
companion: "<CANONICAL_FILENAME>"            # e.g. "design.v0.6.0.md"
authors:
  - "<AUTHOR_OR_AGENT_1>"
  - "<AUTHOR_OR_AGENT_2>"
changelog:
  <VERSION>:
    - "<CHANGE_NOTE_1>"
    - "<CHANGE_NOTE_2>"

# ─── SOURCES ─────────────────────────────────────────────────────
# Files / reports that ground this extension. List system-of-record
# documents, empirical tests, audited primitives, audit prompts,
# and prior verdict reports here so re-audits are reproducible.
sources:
  - file:   "<HTML_OR_PDF_OF_RECORD>"
    role:   "<ROLE_DESCRIPTION>"            # e.g. "System of record"
  - file:   "<EMPIRICAL_TEST_FILE>"
    role:   "<ROLE_DESCRIPTION>"            # e.g. "Empirical verification"
  - file:   "<AUDITED_PRIMITIVE_PATH>"
    role:   "<ROLE_DESCRIPTION>"            # e.g. "Audited primitive"
  - file:   "<RE_AUDIT_PROMPT>"
    role:   "Reproducible re-audit instructions"
  - report: "<AUDIT_REPORT_LABEL_1>"
    verdict: "<VERDICT_STRING>"             # e.g. "FINAL: WARN / COMPATIBLE_WITH_RULES"
  - report: "<AUDIT_REPORT_LABEL_2>"
    verdict: "<VERDICT_STRING>"

# ─── COLORS PENDING REVIEW ──────────────────────────────────────
# Token decisions that are not yet locked. Document each candidate
# with source + note, log decisions with date, and never silently
# adopt — promote to `design.<version>.md` only after `chosen` is set.
colors_pending_review:
  status: "<awaiting user approval | resolved | abandoned>"
  proposed_by: "<PERSON_OR_AGENT>"
  rationale: |
    <WHY_THIS_PROPOSAL_EXISTS>
  candidates:
    <TOKEN_NAME>:
      - { value: "<HEX>", source: "<SOURCE>", note: "<NOTE>" }
      - { value: "<HEX>", source: "<SOURCE>", note: "<NOTE>" }
    # Optional: third-party design system slot mappings
    surface_slots:
      - <SLOT_NAME_1>
      - <SLOT_NAME_2>
    role_slots:
      - { role: <ROLE>, mapping: <CORE_TOKEN>, pending_value: "<HEX>" }
  decision_log:
    - { date: "<YYYY-MM-DD>", key: "<DECISION_KEY>", options: ["<A>","<B>"], chosen: "<A_OR_NULL>" }
    - { date: pending,        key: "<DECISION_KEY>", options: ["<A>"],       chosen: null }

# ─── ACCENT (OR DUAL-SCOPE TOKEN) SCOPE ─────────────────────────
# Use this pattern for any token that has the same hex but different
# semantic meaning across symbol vs. UI contexts (or any other split).
# Future variants (dark mode / a11y) may diverge — keep them separate.
accent_scope:
  accent_symbol:
    hex: "<HEX>"
    used_in:
      - "<SYMBOL_CONTEXT_1>"
      - "<SYMBOL_CONTEXT_2>"
    forbidden_in:
      - "body text"
      - "border lines"
      - "background fills"
  accent_ui:
    hex: "<HEX>"
    used_in:
      - "<UI_CONTEXT_1>"                   # e.g. "rule_number"
      - "<UI_CONTEXT_2>"                   # e.g. "verdict_pill"
      - "<UI_CONTEXT_3>"                   # e.g. "badge"
    forbidden_in:
      - "long-form headings"
      - "running body text"
      - "border lines wider than 1px"
      - "background fills"

# ─── COMPONENTS ──────────────────────────────────────────────────
# One entry per component on the system canvas. Document layout,
# columns, counts, and any geometric/numerical metrics that would
# otherwise drift. This is the contract for re-implementation.
components:
  hero:
    grid: "<GRID_RATIO>"                   # e.g. "1.1fr 1fr"
    elements: [<ELEM_1>, <ELEM_2>, <ELEM_3>]

  hierarchy:
    layout: "<LAYOUT_DESCRIPTION>"
    nodes: [<NODE_1>, <NODE_2>, <NODE_3>]

  triad:
    columns: <N>
    pattern: "<PATTERN_DESCRIPTION>"

  rules:
    columns: <N>
    count: <N>

  two-reports:
    columns: <N>
    purpose: "<PURPOSE>"
    verdicts:
      report-1: "<VERDICT_STRING>"
      report-2: "<VERDICT_STRING>"

  coexist:
    columns: "<GRID_RATIO>"
    halves: [<HALF_1>, <HALF_2>]
    metrics:
      <METRIC_KEY_1>: "<VALUE>"
      <METRIC_KEY_2>: "<VALUE>"

  dodont:
    columns: <N>
    do:
      - { id: 01, label: "<DO_LABEL>",   rule: "<RULE_STRING>" }
      - { id: 02, label: "<DO_LABEL>",   rule: "<RULE_STRING>" }
    dont:
      - { id: 01, label: "<DONT_LABEL>", rule: "<RULE_STRING>" }
      - { id: 02, label: "<DONT_LABEL>", rule: "<RULE_STRING>" }

  audit-table:
    rows: <N>
    pass-rate: "<X/Y>"
    note: "<CONDITIONAL_NOTE>"

  combinations:
    columns: <N>
    cells: [<CELL_1>, <CELL_2>, <CELL_3>]
    rule: "<COMBINATION_RULE>"

  palette:
    columns: <N>
    swatches: [<TOKEN_1>, <TOKEN_2>, <TOKEN_3>]

# ─── LOGO / BRAND PRIMITIVE ─────────────────────────────────────
# Pin EVERY measurable property. Disambiguate counts (logo primitives
# vs. raw SVG nodes vs. semantic groups) — these collapse without care.
logo:
  source: "<SVG_PATH>"
  viewBox: "<X Y W H>"                     # e.g. "0 0 600 600"
  bytes: <N>
  background: "<TRANSPARENT_OR_FILL_DESCRIPTION>"
  legacy_with_background: "<LEGACY_PATH_OR_REMOVE_LINE>"

  element_counts:
    logo_primitives:                            <N>   # conceptual units
    svg_visible_nodes_excluding_background:     <N>
    svg_visible_nodes_including_background:     <N>
    semantic_groups:                            <N>

  audit:
    <PRIMITIVE_NAME_1>:
      <PROPERTY_1>: <VALUE>
      <PROPERTY_2>: <VALUE>
      fill: "<HEX_AND_TOKEN>"               # e.g. "#d9531e (accent_symbol)"
    <PRIMITIVE_NAME_2>:
      <PROPERTY_1>: <VALUE>
      fill: "<HEX_AND_TOKEN>"
      terminal: "<TERMINAL_RULE_AND_EXEMPTIONS>"

  verdict: "<VERDICT_STRING>"               # e.g. "FINAL: PASS / COMPATIBLE (8/8)"
  reaudit: "<RE_AUDIT_PROMPT_PATH>"

# ─── HARMONY ─────────────────────────────────────────────────────
# Empirical pairing of brand primitive against type system.
# Conflict heatmap is HIGH/MED/LOW — be specific about geometric
# or color overlaps that must be resolved by a DO rule.
harmony:
  primary-stack: "<TYPE_+_LOGO_PAIRING>"
  mix-ratio: "<TYPE%_/_LOGO%>"             # e.g. "95% Pretendard / 5% 축"
  conflict-heatmap:
    HIGH:
      - "<CONFLICT_1>"
    MED:
      - "<CONFLICT_1>"
    LOW:
      - "<CONFLICT_1>"
  patterns:
    A: "<PATTERN_NAME_AND_SPEC>"
    B: "<PATTERN_NAME_AND_SPEC>"
    C: "<PATTERN_NAME_AND_SPEC>"
    D: "<PATTERN_NAME_AND_SPEC>"
  resolution_from_report1_to_report2:
    <FIX_KEY_1>: "<BEFORE → AFTER → VERDICT>"
    <FIX_KEY_2>: "<BEFORE → AFTER → VERDICT>"

# ─── CONTRAST TABLE ──────────────────────────────────────────────
# Every pair MUST have an explicit fg/bg label and a use-site
# constraint. Never publish a number without its application.
contrast_table:
  notes: |
    Computed from CORE hex tokens with WCAG 2.1 relative-luminance
    formula. AA = 4.5:1 normal text · AA Large = 3:1 large text /
    non-text · AAA = 7:1 normal text. Pair labels are explicit so
    foreground vs. background is never ambiguous.
  pairs:
    - { fg: "<TOKEN #HEX>", bg: "<TOKEN #HEX>", ratio: <X.XX>, verdict: "<AAA|AA|AA Large only|non-text only>", use: "<USE_SITE>" }
    - { fg: "<TOKEN #HEX>", bg: "<TOKEN #HEX>", ratio: <X.XX>, verdict: "<...>", use: "<USE_SITE>" }
    - { fg: "<TOKEN #HEX>", bg: "<TOKEN #HEX>", ratio: <X.XX>, verdict: "<...>", use: "<USE_SITE>" }

# ─── SYSTEM RULES (R1..Rn) — CANONICAL ──────────────────────────
# Mirror the canonical rule cards exactly (PDF / printed spec).
# Use `title` for native-language label, `en` for English, and
# `statement` for the normative description. Do NOT mix runtime
# operating rules into this slot — those go below.
system_rules:
  R1:
    title: "<NATIVE_TITLE>"
    en:    "<ENGLISH_TITLE>"
    statement: "<NORMATIVE_STATEMENT>"
  R2:
    title: "<NATIVE_TITLE>"
    en:    "<ENGLISH_TITLE>"
    statement: "<NORMATIVE_STATEMENT>"
  R3:
    title: "<NATIVE_TITLE>"
    en:    "<ENGLISH_TITLE>"
    statement: "<NORMATIVE_STATEMENT>"
  R4:
    title: "<NATIVE_TITLE>"
    en:    "<ENGLISH_TITLE>"
    statement: "<NORMATIVE_STATEMENT>"
  R5:
    title: "<NATIVE_TITLE>"
    en:    "<ENGLISH_TITLE>"
    statement: "<NORMATIVE_STATEMENT>"
  R6:
    title: "<NATIVE_TITLE>"
    en:    "<ENGLISH_TITLE>"
    statement: "<NORMATIVE_STATEMENT>"
  R7:
    title: "<NATIVE_TITLE>"
    en:    "<ENGLISH_TITLE>"
    statement: "<NORMATIVE_STATEMENT>"
  R8:
    title: "<NATIVE_TITLE>"
    en:    "<ENGLISH_TITLE>"
    statement: "<NORMATIVE_STATEMENT>"
  R9:
    title: "<NATIVE_TITLE>"
    en:    "<ENGLISH_TITLE>"
    statement: "<NORMATIVE_STATEMENT>"

# ─── OPERATING RULES (runtime checks supporting a parent rule) ──
# Derived rules that operationalize a canonical Rule (commonly the
# coexistence rule, but any parent works). These are runtime audit
# checks, not part of the canonical R1..Rn list.
r9_operating_rules:
  <RULE_KEY_1>:
    statement: "<NORMATIVE_OPERATING_RULE>"
  <RULE_KEY_2>:
    statement: "<NORMATIVE_OPERATING_RULE>"
  <RULE_KEY_3>:
    statement: "<NORMATIVE_OPERATING_RULE>"
