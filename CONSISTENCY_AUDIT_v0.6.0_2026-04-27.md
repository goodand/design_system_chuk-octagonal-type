# Chuk DS — v0.6.0 캐논 vs 전체 HTML 정합성 감사

- **감사일**: 2026-04-27
- **기준 캐논**: `design.v0.6.0.md` + `design-extension.v0.6.0.md`
- **감사 대상**: 프로젝트 루트의 모든 `.html` (15개)
- **방식**: 각 HTML의 `:root` 토큰, 페이지 레이아웃, font-family, hero h1, accent 분기, R7 적용 범위 등을 캐논과 1:1 비교

---

## 0. 요약 (Top-line)

| 항목 | v0.6.0 캐논과 일치하는 파일 |
|---|---|
| **CORE 8 토큰 이름 1:1 일치** | **0 / 15** ⚠️ — 캐논은 `--ink-subtle / --ink-muted / --grid-guide` 인데 모든 HTML이 `--ink-2 / --ink-3 / --grid` 를 사용 |
| **CORE 8 토큰 *값* 일치 (`--bg #f4f3ef` 포함)** | 12/15 (HT, Gong Font Analysis 일부, Jamo/Weight Lab 일부 제외) |
| **`--accent-symbol` / `--accent-ui` 분기 존재** | **2 / 15** — `v0.6.0.html`, `v0.6.0-print.html` 만 |
| **font-family = Pretendard Variable** | 4/15 — `v0.5.1`, `v0.5.1-print`, `v0.6.0`, `v0.6.0-print` |
| **font-family = Pretendard (static)** | 1/15 — `Harmony Test` |
| **font-family = IBM Plex Sans KR (레거시)** | 8/15 — v0.2~v0.5, `Jamo Lab`, `Weight Lab`, `Gong Font Analysis` |
| **page max-width = 1320px** | 9/15 |
| **hero h1 = 76px** | 12/13 (hero가 있는 모든 파일 중) — HT만 80px |
| **R7 (accent_ui ≠ accent_symbol) 분리 코드 적용** | 2/15 — v0.6.0 정/print만 |

> **가장 큰 단절**: 캐논 `colors:` 슬롯의 토큰 이름(`ink-subtle / ink-muted / grid-guide`)이 **어느 HTML에도 존재하지 않음**. 모든 HTML은 v0.5 시대의 `--ink-2 / --ink-3 / --grid` 명명을 그대로 유지. 즉 캐논과 HTML은 **이름 레벨에서 호환되지 않음**.

---

## 1. 토큰 명명 레벨 단절 ⚠️ HIGHEST

### 1.1 `colors` 슬롯 이름 매핑
| 캐논(`design.v0.6.0.md → colors`) | 모든 HTML | 일치 여부 |
|---|---|---|
| `ink` | `--ink` | ✅ |
| `ink-subtle` `#4a4a4a` | `--ink-2` `#4a4a4a` | ❌ 이름만 다름 |
| `ink-muted` `#8a8a8a` | `--ink-3` `#8a8a8a` (Lab는 `#7a7a7a`) | ❌ 이름만 다름 |
| `line` | `--line` | ✅ |
| `bg` | `--bg` | ✅ |
| `paper` | `--paper` | ✅ |
| `accent` | `--accent` (v0.6.0만 `--accent-symbol/--accent-ui` 추가) | ✅ 값, △ 분기 |
| `grid-guide` | `--grid` | ❌ 이름만 다름 |

→ **결정 필요**: 캐논 측 명명을 HTML에 맞추거나(`ink-2 / ink-3 / grid`로 표기 변경), HTML을 캐논에 맞추거나(`--ink-subtle / --ink-muted / --grid-guide`로 일괄 리네임). 현 상태로는 docs와 코드의 변수명이 영원히 1:1로 맺어지지 않음.

---

## 2. 파일별 상세 표

| 파일 | font-family (sans) | max-width | hero h1 | --bg | --ink-3/-muted | --line | accent 분기 | 캐논 격차 |
|---|---|---|---|---|---|---|---|---|
| **`Chuk Design System v0.6.0.html`** | Pretendard Variable ✅ | 1320 ✅ | 76px ✅ | `#f4f3ef` ✅ | `#8a8a8a` ✅ | `#e6e1d6` ✅ | `--accent-symbol` + `--accent-ui` ✅ | **표준** (단, 토큰명 §1) |
| **`Chuk Design System v0.6.0-print.html`** | Pretendard Variable ✅ | 1320 ✅ | 76px ✅ | `#f4f3ef` ✅ | `#8a8a8a` ✅ | `#e6e1d6` ✅ | `--accent-symbol` + `--accent-ui` ✅ | **표준** (§1) |
| `Chuk Design System v0.5.1.html` | Pretendard Variable ✅ | 1320 ✅ | 76px ✅ | `#f4f3ef` ✅ | `#8a8a8a` ✅ | `#e6e1d6` ✅ | `--accent` 단일 ❌ | R7 분기 미적용 |
| `Chuk Design System v0.5.1-print.html` | Pretendard Variable ✅ | 1320 ✅ | 76px ✅ | `#f4f3ef` ✅ | `#8a8a8a` ✅ | `#e6e1d6` ✅ | `--accent` 단일 ❌ | R7 분기 미적용 |
| `Chuk Design System v0.5.html` | IBM Plex Sans KR ❌ | 1320 ✅ | 76px ✅ | `#f4f3ef` ✅ | `#8a8a8a` ✅ | `#e6e1d6` ✅ | `--accent` 단일 ❌ | 폰트 + R7 |
| `Chuk Design System v0.4.html` | IBM Plex Sans KR ❌ | 1320 ✅ | 76px ✅ | `#f4f3ef` ✅ | `#8a8a8a` ✅ | `#e6e1d6` ✅ | `--accent` 단일 ❌ | 폰트 + R7 |
| `Chuk Design System v0.4-inline.html` | IBM Plex Sans KR ❌ | 1320 ✅ | 76px ✅ | `#f4f3ef` ✅ | `#8a8a8a` ✅ | `#e6e1d6` ✅ | `--accent` 단일 ❌ | 폰트 + R7 |
| `Chuk Design System v0.4-print.html` | IBM Plex Sans KR ❌ | 1320 ✅ | 76px ✅ | `#f4f3ef` ✅ | `#8a8a8a` ✅ | `#e6e1d6` ✅ | `--accent` 단일 ❌ | 폰트 + R7 |
| `Chuk Design System v0.4 (standalone).html` | (bundler template — 동일 추정) | 동일 | 동일 | 동일 | 동일 | 동일 | 단일 | 폰트 + R7 |
| `Chuk Design System v0.3.html` | IBM Plex Sans KR ❌ | 1320 ✅ | 76px ✅ | `#f4f3ef` ✅ | `#8a8a8a` ✅ | `#e6e1d6` ✅ | `--accent` 단일 ❌ | 폰트 + R7 |
| `Chuk Design System v0.2.html` | IBM Plex Sans KR ❌ | 1320 ✅ | 76px ✅ | `#f4f3ef` ✅ | `#8a8a8a` ✅ | `#e6e1d6` ✅ | `--accent` 단일 ❌ | 폰트 + R7 |
| **`Harmony Test.html`** | Pretendard (static, *not* Variable) △ | **1280 ❌** | **80px ❌** | **`#f5f2e8` ❌** | `#8a8a8a` ✅ | `#e6e1d6` ✅ | `--accent` 단일 ❌ | **bg / 폭 / hero / 폰트빌드 / R7** |
| `Jamo Lab.html` | IBM Plex Sans KR ❌ | **1200 ❌** | (n/a) | `#f4f3ef` ✅ | **`#7a7a7a` ❌** | `#e6e1d6` ✅ | `--accent` 단일 ❌ | 폰트 + 폭 + ink-3 |
| `Weight Lab.html` | IBM Plex Sans KR ❌ | **1400 ❌** | (n/a) | `#f4f3ef` ✅ | **`#7a7a7a` ❌** | `#e6e1d6` ✅ | `--accent` 단일 ❌ | 폰트 + 폭 + ink-3 |
| `Gong Font Analysis.html` | IBM Plex Sans KR (Google CDN) ❌ | **1280 ❌** | (n/a, 56px ratio 사용) | `#f4f3ef` ✅ | **미정의 ❌** | **`#e6e6e6` ❌** | `--accent` 단일 ❌ | 폰트 + 폭 + 토큰 누락 + line |

> v0.4 (standalone) 은 `__bundler/template` 안에 시리얼라이즈되어 grep에 풀 형태로 잡히지 않으나, 본 파일은 v0.4의 인라인 번들 출력으로 v0.4와 동일 토큰/폰트로 추정.

---

## 3. R7 (색 위계 — accent_symbol vs accent_ui) 적용 현황

캐논(`design-extension.v0.6.0.md → accent_scope`)은 accent를 두 의미 토큰으로 분기하고, v0.6.0.html은 CSS 변수에 그대로 반영했다. **다른 파일들은 모두 단일 `--accent` 만 사용**.

### 3.1 v0.6.0.html에서 정확히 R7대로 분기된 곳 ✅
- `.hero h1 .mark` → `var(--accent-symbol)` (로고 마크 = 심볼 영역)
- `.hierarchy .node.core .name` → `var(--accent-symbol)` (core node mark)
- `.section-head .num` → `var(--accent-ui)` (rule_number)
- `.rule .n` → `var(--accent-ui)` (rule_number)
- `.subreview .srv .mark` → `var(--accent-ui)` (selected_state mark)
- `.subreview .srv.winner .tag` → `var(--accent-ui)` (selected_state)
- `.two-reports .tr-verdict.pass` 텍스트 색 → `var(--accent-ui)` (verdict_pill)

### 3.2 v0.5.1 이전(`v0.2~v0.5`, `v0.5.1`, `v0.5.1-print`, `Harmony Test`) ❌ 회색지대
모든 위 위치가 단일 `--accent` 로 칠해져 있음. 같은 hex라 시각 결과는 동일하나 **의미 분리가 없어 R7 검증 불가**.

특히 v0.5.1 R7(구버전) = "vertex-only accent injection" 기준에서 보면 다음은 **자기 시스템 룰 위반**:
- `.hierarchy .node.core .name { color: var(--accent); }` (텍스트)
- `.subreview .srv.winner .tag { color: var(--accent); }` (태그)
- `.two-reports .tr-verdict.pass` 텍스트 (verdict)

v0.6.0이 R7을 재정의하며 위 케이스들을 `accent_ui` 로 사후 정당화함 → **v0.5.1 산출물은 자기 시대의 R7을 위반한 채 출고된 셈**. v0.6.0 적용 여부는 `--accent` → `--accent-ui` 리네임만으로 해결됨.

---

## 4. Harmony Test.html — 캐논 자기검증 보고서의 메타 모순 ⚠️

Harmony Test는 캐논이 인용하는 **"empirical verification (8/8 PASS)"** 의 출처이지만, 검증을 수행하면서도 v0.6.0 캐논과 5곳에서 어긋남:

| 항목 | v0.6.0 캐논 | Harmony Test |
|---|---|---|
| `--bg` | `#f4f3ef` (decision_log 2026-04-27) | **`#f5f2e8`** (deprecated by v0.6.0) |
| `.eyebrow` color | `--ink-subtle` (= `--ink-2`) | **`--accent`** |
| `.eyebrow` font-weight | `500` | `600` |
| `.hero h1` font-size | `76px` | `80px` |
| `.hero h1` line-height | `1.0` | `0.98` |
| Pretendard build | Variable (dynamic-subset) | static (`pretendard.min.css`) |

후속 효과: HT 본문에 인용된 콘트라스트 값 `16.45`(검정 vs `#f5f2e8`) 가 v0.6.0 `contrast_table` 신측정값 `16.59` (검정 vs `#f4f3ef`) 와 정합되지 않음. **본문 텍스트가 자기 새 캐논과 충돌**.

또한 `design-extension.v0.6.0.md → logo.element_counts` 가 4-way split (logo_primitives 6 / svg_visible_nodes 6 / semantic_groups 3) 로 정의되었으나, **HT 본문은 여전히 "5개 가시 요소" 라고 적고 있음** → 본문이 자기 캐논 인용과 다름.

---

## 5. lab/analysis 3종 — 다른 폰트로 측정한 값을 v0.6.0이 인용 ⚠️

`design.v0.6.0.md → typography` 주석:
> "All Harmony Test audits (stem 6.5px / ㅅ·ㅈ 65–70° / ㅇ 60px / 8/8 PASS) were measured against Pretendard."

그러나 lab/analysis 파일은 모두 IBM Plex Sans KR로 측정:

| 파일 | 측정 폰트 | 캐논이 인용하는 측정값과의 관계 |
|---|---|---|
| `Jamo Lab.html` | IBM Plex Sans KR | ㅅ·ㅈ 각도 측정 — 캐논이 인용하는 65–70° 의 원천일 가능성. **but Pretendard 기준 재측정 필요** |
| `Weight Lab.html` | IBM Plex Sans KR | stem 6.5px 측정 — 동일 |
| `Gong Font Analysis.html` | IBM Plex Sans KR (Google Fonts CDN) | ㅇ 60px 측정 — 동일 |

→ 캐논은 "Pretendard로 측정"이라 명시하나 측정 도구 3개는 IBM Plex로 측정 중. **데이터 출처 불일치**.

또한 토큰 자체도 캐논과 어긋남:
- Jamo Lab / Weight Lab: `--ink-3: #7a7a7a` (캐논 `#8a8a8a`)
- Gong Font Analysis: `--line: #e6e6e6` (캐논 `#e6e1d6`), `--paper`/`--ink-3` 누락

---

## 6. 토큰 컴파일 누락 (캐논 vs 실 HTML)

캐논 `design.v0.6.0.md` 가 정의했지만 **어떤 HTML도 CSS 변수/클래스로 노출하지 않은** 슬롯:

### 6.1 `spacing` 9개 토큰 — 0/9 컴파일됨
- `page-max-width / margin-page / section-gap / container-padding / card-padding / inner-padding / element-gap-lg / element-gap-md / element-gap-sm / element-gap-xs`
- 모든 HTML이 px값 하드코딩 (`56px`, `96px`, `48px`, ...)
- 캐논값 변경 시 HTML 자동 반영 불가

### 6.2 `typography` 9개 토큰 — 0/9 컴파일됨
- `display-hero / headline-section / headline-card / body-lede / body-main / body-small / label-mono / eyebrow / meta-data`
- 대응 클래스(`.t-display-hero` 등)이 어느 HTML에도 없음 → typography 토큰은 사양상 존재만 하고 실 코드와 연결되지 않음

### 6.3 `colors_pending_review.surface_slots / role_slots` — 0/13 컴파일됨
- 의도된 보류 항목이므로 정상

---

## 7. 컴포넌트 시그니처 일치 검증

캐논 `components.*` 정의와 실 HTML의 시그니처 비교:

| 컴포넌트 | 캐논 | v0.6.0.html | v0.5.1.html | 비고 |
|---|---|---|---|---|
| `hero.grid` | `1.1fr 1fr` | ✅ | ✅ | HT는 `1.2fr 1fr` ❌ |
| `hero.elements` | `[eyebrow, h1, lede, hero-mark]` | ✅ | ✅ | |
| `hierarchy.layout` | `core-row over sub-row, gap 36px` | ✅ | ✅ | |
| `triad.columns` | 3 | ✅ | ✅ | |
| `rules.columns × count` | 4 × 9 | ✅ | ✅ | |
| `two-reports.columns` | 2 | ✅ | ✅ | |
| `coexist.columns` | `1.1fr 1fr` | ✅ | ✅ | |
| `dodont.columns` | 4 | ✅ | ✅ | DO 4 + DON'T 4 라벨 일치 |
| `audit-table.rows` | 8 | ✅ | ✅ | |
| `combinations.columns × cells` | 3 × `[축-단독, 축+톱니바퀴, 축+빙산]` | ✅ | ✅ | |
| `palette.columns × swatches` | 5 × `[ink, ink-subtle, line, paper, accent]` | ✅ | ✅ | 단, HTML은 swatch 5개 + accent 6번째일 수도 — JSX 검증 필요 |

→ **v0.6.0.html과 v0.5.1.html은 컴포넌트 시그니처 레벨에서는 캐논과 완전 일치**. 차이는 토큰 분기와 R7 적용에만 있음.

---

## 8. 로고 SVG 참조 일치성

캐논 `design-extension.v0.6.0.md → logo.source` = `exports/chuk-logo.v0.6.0.svg` (706 bytes, 투명).

| 위치 | 참조 SVG | 캐논 일치 |
|---|---|---|
| `Chuk Design System v0.6.0.html` | (Symbols.jsx 또는 인라인) — JSX 측정 필요 | △ |
| `Chuk Design System v0.5.1.html` | `exports/chuk-logo.svg` (776 bytes, bg 포함) ❌ | ❌ 구버전 |
| `Harmony Test.html` | 인라인 SVG path 하드코딩 — 어떤 파일과도 디커플링 | ❌ 동기화 불가 |
| `exports/chuk-logo-on-warm-cream.svg` | `legacy_with_background` 으로 보관됨 | ✅ 의도된 archive |

---

## 9. 우선순위 액션

### 🔴 P0 — 캐논과 자기검증 산출물의 자기모순
1. **`Harmony Test.html` 정합화** — 4건 동시 정정:
   - `--bg: #f5f2e8` → `#f4f3ef`
   - `.hero h1` 80→76px, line-height 0.98→1.0
   - `.eyebrow` color `--accent`→`--ink-2`, font-weight 600→500
   - 본문 콘트라스트 인용 `16.45` → `16.59` + `contrast_table` 페어 라벨 사용
   - 본문 "5개 가시 요소" → v0.6.0 4-way 카운트(`logo_primitives: 6 / semantic_groups: 3`)
2. **토큰명 호환 결정** — `--ink-2/-3/--grid` ↔ `ink-subtle/ink-muted/grid-guide` 둘 중 하나로 통일. 권장: 캐논을 HTML 명명에 맞춰 `ink-subtle` 별칭만 추가하거나, 패치 1회로 HTML 일괄 리네임.

### 🟠 P1 — R7 분기 적용
3. **v0.5.1 / v0.5.1-print 의 `--accent` 사용처를 `--accent-symbol` / `--accent-ui` 로 리네임** (의미 분리만, 시각 결과 동일):
   - `--accent-symbol`: hero `.mark`, hierarchy `.node.core .name`
   - `--accent-ui`: section-head `.num`, rule `.n`, subreview `.mark`/`.tag`, two-reports `.tr-verdict.pass`
4. **v0.2~v0.5 산출물은 deprecated 폴더(`archive/v0.5-and-earlier/`)로 이동** 권장. 또는 v0.6.0 토큰으로 함께 마이그레이션.

### 🟡 P2 — Lab 3종 표준화
5. **`Jamo Lab` / `Weight Lab` / `Gong Font Analysis` 를 Pretendard 기반으로 재측정**, 또는 명시적 헤더로 "IBM Plex 기반 R&D 산출물 — 캐논 측정값과 다름" 표기.
6. **lab들의 `--ink-3: #7a7a7a` → `#8a8a8a`**, `Gong Font Analysis` 의 `--line` `#e6e6e6` → `#e6e1d6`, 누락 토큰(`--paper`, `--ink-3`) 추가, `max-width` 1320으로 통일.

### 🟢 P3 — 시스템 컴파일 (장기)
7. **spacing 토큰을 CSS 변수로 노출** (`--space-section-gap: 96px;` 등) — 모든 HTML이 변수 참조하도록 일괄 치환.
8. **typography 토큰을 클래스로 노출** (`.t-display-hero`, `.t-eyebrow` 등) — 마크업이 캐논 변경에 자동 반응.
9. **v0.6.0-print 별도 파일 의미 검토** — main이 `@media print` 인라인 처리하므로 별도 파일 제거 가능.

---

## 부록 — 검증 기준 데이터 (grep 결과 요약)

### --bg 값 분포
- `#f4f3ef`: v0.2, v0.3, v0.4, v0.4-inline, v0.4-print, v0.5, v0.5.1, v0.5.1-print, v0.6.0, v0.6.0-print, Jamo Lab, Weight Lab, Gong Font Analysis (13/15) ✅
- `#f5f2e8`: Harmony Test (1/15) ❌
- (v0.4 standalone은 bundler template — 동일 추정)

### --ink-3 값 분포
- `#8a8a8a`: 11/15 ✅
- `#7a7a7a`: Jamo Lab, Weight Lab (2/15) ❌
- 미정의: Gong Font Analysis (1/15) ❌

### --line 값 분포
- `#e6e1d6`: 14/15 ✅
- `#e6e6e6`: Gong Font Analysis (1/15) ❌

### page max-width 분포
- `1320px`: 9/15 (모든 DS v0.x) ✅
- `1280px`: Harmony Test, Gong Font Analysis (2/15)
- `1200px`: Jamo Lab (1/15)
- `1400px`: Weight Lab (1/15)

### font-family (sans) 분포
- `'Pretendard Variable', Pretendard, ...`: v0.5.1, v0.5.1-print, v0.6.0, v0.6.0-print (4/15) ✅
- `Pretendard, ...` (static): Harmony Test (1/15) △
- `'IBM Plex Sans KR', system-ui, sans-serif`: v0.2, v0.3, v0.4, v0.4-inline, v0.4-print, v0.5, Jamo Lab, Weight Lab, Gong Font Analysis (9/15) ❌
- bundler 시리얼라이즈: v0.4 (standalone) (1/15) — 동일 추정

### hero h1 font-size 분포
- `76px`: v0.2, v0.3, v0.4, v0.4-inline, v0.4-print, v0.5, v0.5.1, v0.5.1-print, v0.6.0, v0.6.0-print (10/10 hero 보유 DS 파일) ✅
- `80px`: Harmony Test (1/1 외부 파일) ❌
- (Lab/Analysis 3종은 hero 미보유 — 해당 없음)
