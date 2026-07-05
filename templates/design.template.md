---
# ═══════════════════════════════════════════════════════════════════
# DESIGN SYSTEM — CANONICAL TEMPLATE
# ═══════════════════════════════════════════════════════════════════
# Purpose: Canonical token surface for a design system.
# Holds ONLY STITCH standard slots: colors / typography / spacing.
# All extended context (pending decisions, components, logo, harmony,
# system rules, accent scope, contrast table, operating rules) lives
# in the companion `design-extension.template.md`.
#
# Replace every <PLACEHOLDER> and example value with project specifics.
# Delete any slot that does not apply.
# ═══════════════════════════════════════════════════════════════════

name: <DESIGN_SYSTEM_NAME>                    # e.g. "Chuk Design System"
version: <SEMVER>                             # e.g. "0.6.0"
companion: <EXTENSION_FILENAME>               # e.g. "design-extension.v0.6.0.md"
authors:
  - <AUTHOR_OR_AGENT_1>
  - <AUTHOR_OR_AGENT_2>
changelog:
  <VERSION>:
    - "<CHANGE_NOTE_1>"
    - "<CHANGE_NOTE_2>"
notes: |
  <ONE_PARAGRAPH_SCOPE_DESCRIPTION>
  Describe what this file owns vs. what is delegated to the
  companion extension file. Reference any harmony tests, audits,
  or external sources of truth.

# ── COLORS ─────────────────────────────────────────────────────
# CORE tokens — keep this list small (5–8). Anything experimental
# or pending review goes into the extension under `colors_pending_review`.
# If a token has dual semantic scope, document scope in extension
# under `accent_scope` (or equivalent) and reference it here.
colors:
  ink:         '<HEX>'      # body text · structural lines
  ink-subtle:  '<HEX>'      # secondary text
  ink-muted:   '<HEX>'      # captions · mono details
  line:        '<HEX>'      # dividers · card borders
  bg:          '<HEX>'      # page surface (canonical)
  paper:       '<HEX>'      # raised cards · stages
  accent:      '<HEX>'      # see <EXTENSION_FILENAME> → accent_scope
  grid-guide:  '<HEX>'      # technical drawings only

# ── TYPOGRAPHY ─────────────────────────────────────────────────
# Pin one type system as system of record. Mono should be a
# system stack unless a custom mono is shipped.
# Font stacks here MUST match the production HTML 1:1.
typography:
  display-hero:
    fontFamily:    "<SANS_STACK>"
    fontSize:      <PX>px                     # e.g. 76px
    fontWeight:    '<WEIGHT>'                 # e.g. '700'
    lineHeight:    '<LH>'                     # e.g. '1.0'
    letterSpacing: <TRACKING>em               # e.g. -0.035em
    usage:         "<WHERE_USED>"

  headline-section:
    fontFamily:    "<SANS_STACK>"
    fontSize:      <PX>px
    fontWeight:    '<WEIGHT>'
    lineHeight:    '<LH>'
    letterSpacing: <TRACKING>em
    usage:         "<WHERE_USED>"

  headline-card:
    fontFamily:    "<SANS_STACK>"
    fontSize:      <PX>px
    fontWeight:    '<WEIGHT>'
    lineHeight:    '<LH>'
    letterSpacing: <TRACKING>em
    usage:         "<WHERE_USED>"

  body-lede:
    fontFamily:    "<SANS_STACK>"
    fontSize:      <PX>px
    fontWeight:    '<WEIGHT>'
    lineHeight:    '<LH>'
    letterSpacing: <TRACKING>em
    usage:         "<WHERE_USED>"

  body-main:
    fontFamily:    "<SANS_STACK>"
    fontSize:      <PX>px
    fontWeight:    '<WEIGHT>'                 # body weight should be standardized
    lineHeight:    '<LH>'
    letterSpacing: <TRACKING>em
    usage:         "default running text"

  body-small:
    fontFamily:    "<SANS_STACK>"
    fontSize:      <PX>px
    fontWeight:    '<WEIGHT>'
    lineHeight:    '<LH>'
    letterSpacing: <TRACKING>em
    usage:         "captions · audit table · note"

  label-mono:
    fontFamily:    "<MONO_STACK>"             # e.g. "ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize:      <PX>px
    fontWeight:    '<WEIGHT>'
    lineHeight:    '<LH>'
    letterSpacing: <TRACKING>em
    usage:         "section numbers · verdict tags"

  eyebrow:
    fontFamily:    "<MONO_STACK>"
    fontSize:      <PX>px
    fontWeight:    '<WEIGHT>'
    lineHeight:    '<LH>'
    letterSpacing: <TRACKING>em
    textTransform: uppercase
    usage:         "tags · cap text · meta"

  meta-data:
    fontFamily:    "<MONO_STACK>"
    fontSize:      <PX>px
    fontWeight:    '<WEIGHT>'
    lineHeight:    '<LH>'
    letterSpacing: <TRACKING>em
    usage:         "audit numbers · params · footnotes"

# ── SPACING ────────────────────────────────────────────────────
# Use semantic names (page/section/container/card/inner/element)
# — not t-shirt sizes. Tokens here are pixels; convert at usage site.
spacing:
  page-max-width:     <PX>px        # e.g. 1320px
  margin-page:        <PX>px        # outer page padding
  section-gap:        <PX>px        # between top-level sections
  container-padding:  <PX>px        # inside hierarchy / hero / large containers
  card-padding:       <PX>px        # inside card-level containers
  inner-padding:      <PX>px        # inside compact cells
  element-gap-lg:     <PX>px        # large element gutter
  element-gap-md:     <PX>px        # medium element gap
  element-gap-sm:     <PX>px        # in-cell gap (label → desc)
  element-gap-xs:     <PX>px        # tight rows
---
