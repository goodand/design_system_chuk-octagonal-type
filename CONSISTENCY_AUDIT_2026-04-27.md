# Chuk Design System — 전체 HTML 정합성 감사 보고서

- **감사일**: 2026-04-27
- **감사 대상**: 프로젝트 루트의 15개 `.html` + 5개 사양 `.md`
- **현행 캐논**: `design.v0.6.0.md` + `design-extension.v0.6.0.md` + `Chuk Design System v0.6.0.html`
- **요약**: v0.6.0이 "정합 캐논"이지만 **(1) 측정값을 가진 Harmony Test가 캐논을 따르지 않고**, **(2) lab 3종은 여전히 IBM Plex 시대에 머물러 있으며**, **(3) spacing/typography 토큰이 CSS로 컴파일되지 않아 사양과 산출물이 수동 동기화에 의존**합니다.

---

## A. 캐논 단절 — 즉시 결정 필요

### A1. 폰트 시스템 — Pretendard 표준에 lab 파일 3종이 미동기화 ⚠️ HIGH
| 파일 | font-family | 캐논 일치 |
|---|---|---|
| `Chuk Design System v0.5.1 / v0.6.0.html` | `'Pretendard Variable', Pretendard, …` | ✅ |
| `Harmony Test.html` | `Pretendard, …` (Variable 아님) | △ static 빌드 |
| `Jamo Lab.html` | `'IBM Plex Sans KR'` | ❌ |
| `Weight Lab.html` | `'IBM Plex Sans KR'` | ❌ |
| `Gong Font Analysis.html` | `'IBM Plex Sans KR'` (Google Fonts CDN) | ❌ |
| `v0.2 ~ v0.5.html` | `'IBM Plex Sans KR'` (로컬 ttf) | 레거시 |

`design.md`가 "Pretendard is the system of record"이고 모든 Harmony Test 측정값이 Pretendard 기준인데, **lab/analysis 파일 3종은 여전히 IBM Plex로 측정** → 측정값 자체의 신뢰도가 갈라짐.

### A2. R1–R9 시스템 룰의 두 개 정의가 동일 슬롯에 존재 ⚠️ HIGH
- **v0.5.1 `system_rules`**: 1 system at a time / 95-5 ratio / vertex-only accent / structural lines = ink … (운영 룰)
- **v0.6.0 `system_rules`**: 팔각형 마스터 그리드 / 허용 각도 / 축 무게 위계 / 챔퍼 / 심볼 위계 … (PDF page 5 캐논)
- v0.6.0이 BREAKING으로 재정의했고 v0.5.1의 룰은 `r9_operating_rules`로 강등.
- v0.5.1 HTML `.rules` 섹션은 9개 카드를 렌더하는데, JSX 데이터가 어느 정의를 따르는지 HTML만 봐서는 알 수 없음 → JSX (`ds-v051.jsx`, `ds-v060.jsx`) 비교 검증 필요.

### A3. R7 (vertex-only accent) 위반 — v0.5.1에서 미해결, v0.6.0에서 사후 정당화
v0.5.1 R7 = "Octagon vertex = accent injection point (only)". 그런데 v0.5.1 HTML에 vertex가 아닌 곳에 accent 적용:
- `.hierarchy .node.core .name { color: var(--accent); }` — 텍스트
- `.triad .primary h3 .en { color: var(--accent); }` — 영문 헤딩
- `.dodont .dd.dont .badge { background: var(--accent); }` — 배지
- `.subreview .srv.winner .tag { color: var(--accent); }` — 태그

v0.6.0이 `accent_scope.accent_symbol` ("core node mark" 명시 추가) + `accent_ui` (verdict pill / badge / selected state)로 사후 분기하면서 위 대부분이 정당화되었으나, **v0.5.1 산출물은 자기 시스템 룰에 어긋난 채 출고**된 셈.

---

## B. 토큰 값 불일치

### B1. `--ink-3` (보조 회색) 두 개의 값
| 파일 | 값 |
|---|---|
| `design.md`, DS v0.2–v0.6.0 | `#8a8a8a` (캐논) |
| `Jamo Lab.html` | `#7a7a7a` ❌ |
| `Weight Lab.html` | `#7a7a7a` ❌ |
| `Gong Font Analysis.html` | **미정의** ❌ |

### B2. `--line` 두 개의 값
| 파일 | 값 |
|---|---|
| 캐논 | `#e6e1d6` (warm/beige) |
| `Gong Font Analysis.html` | `#e6e6e6` (neutral gray) ❌ |

### B3. `--bg` — 결정 불일치 잔존
- v0.6.0 `decision_log`: `bg-canonical = #f4f3ef` (2026-04-27 결정).
- 그러나 **`Harmony Test.html`은 여전히 `#f5f2e8`** (warm cream) 사용. `design-extension.v0.6.0.md`도 "deprecated in v0.6.0"라 명시 → **HT만 업데이트 미반영**.
- 후속 효과: HT 본문 안 콘트라스트 인용값 `16.45` (검정 vs `#f5f2e8`) 가 새 캐논(`#f4f3ef` 기준 `16.59`)과 맞지 않음. `contrast_table`이 v0.6.0에서 새로 측정된 값들을 가지고 있는데 HT는 이전 값 그대로.

### B4. 페이지 폭 — 5종
| 파일 | max-width |
|---|---|
| DS v0.2–v0.6.0 | `1320px` ✅ 캐논 |
| Harmony Test | `1280px` |
| Gong Font Analysis | `1280px` |
| Jamo Lab | `1200px` |
| Weight Lab | `1400px` |

### B5. Hero h1 크기
- 캐논(`design.md → display-hero`): **76px**
- DS v0.2–v0.6.0: 76px ✅
- Harmony Test: **80px** ❌
- Gong Font Analysis: 56px (다른 페이지 종류이지만 hero 토큰 불사용)

### B6. Body 기본 weight
- v0.6.0 changelog: "body weight standardized at 400 (was inconsistent 300/400 in v0.5.x)"
- v0.2–v0.5 (IBM Plex): `300`
- v0.5.1+ (Pretendard): `400`
- Lab 파일들: 미지정/혼재 — 여전히 IBM Plex 300 가정

---

## C. 토큰 시스템 자체의 컴파일 누락

### C1. spacing 토큰 0/9 컴파일됨
`page-max-width / margin-page / section-gap / container-padding / card-padding / inner-padding / element-gap-*` 9개 모두 정의되어 있으나 모든 HTML이 **하드코딩된 px 값을 직접 사용**. 토큰을 변경해도 HTML이 자동 반영되지 않는 구조.

### C2. typography 토큰 0/9 컴파일됨
`display-hero / headline-section / headline-card / body-lede / body-main / body-small / label-mono / eyebrow / meta-data` 9개 토큰 정의는 있으나 **대응 클래스 없음** (`.ts-row` 안에서만 그려짐).

### C3. v0.6.0 `accent_symbol` / `accent_ui` 분리는 의미만, 강제 없음
```css
--accent-symbol: #d9531e;
--accent-ui: #d9531e;
--accent: var(--accent-symbol);
```
같은 hex의 alias라 잘못 쓰여도 검출 불가.

---

## D. 로고 SVG의 사실 불일치

### D1. "visible elements" 개수 모순
| 출처 | 개수 |
|---|---|
| `design-extension.md` (v0.5.1) | `visible_elements: 6` |
| `Harmony Test.html` 본문 ("Report 2") | "5개 가시 요소 모두 정확" |
| `design-extension.v0.6.0.md` | `logo_primitives: 6 / svg_visible_nodes: 6 / semantic_groups: 3` |

v0.5.1 시점에 이미 모순 — Harmony Test는 5, design-extension은 6. v0.6.0이 4-way split으로 사후 해소했으나 **HT 본문 텍스트는 여전히 "5"라고 적고 있음**.

### D2. SVG 파일 두 개 공존
- `exports/chuk-logo.svg` (v0.5.1, 776 bytes, 배경 rect 포함 가능성)
- `exports/chuk-logo.v0.6.0.svg` (706 bytes, 투명)
- `exports/chuk-logo-on-warm-cream.svg` (deprecated alias)

v0.5.1 HTML은 776-byte 버전, v0.6.0 HTML은 706-byte 버전 → 동일 로고가 두 SVG에서 옴.

### D3. Harmony Test의 인라인 SVG는 어느 파일과도 디커플링
HT는 SVG path 하드코딩 — `chuk-logo.svg` 파일을 import하지 않음. 로고를 수정해도 HT는 자동 갱신 안 됨.

---

## E. Harmony Test의 자체 토큰 일탈

| 항목 | 캐논 | HT |
|---|---|---|
| `.eyebrow` color | `var(--ink-2)` | **`var(--accent)`** |
| `.eyebrow` font-weight | `500` | `600` |
| `.hero h1` font-size | `76px` | `80px` |
| `.hero h1` line-height | `1.0` | `0.98` |
| Pretendard CSS | `pretendardvariable-dynamic-subset.css` | `pretendard.min.css` (static) |
| letter-spacing tags | `0.24em` (DS canon) | 페이지 안에 `0.18em / 0.20em / 0.22em / 0.24em` 4종 혼재 |

HT는 시스템 검증 보고서이면서 자기가 검증하는 시스템의 토큰을 따르지 않음 → meta 모순.

---

## F. 명세 ↔ 산출물 동기화 갭

| 항목 | 사양 | 실 HTML |
|---|---|---|
| `components.hero.elements` | `[eyebrow, h1, lede, hero-mark]` | ✅ 일치 |
| `components.rules.count` | `9` | ✅ 일치 |
| `components.audit-table.rows` | `8` | ✅ 일치 |
| `components.dodont` 4 DO + 4 DON'T | ✅ 일치 |
| `coexist.metrics.contrast-ratios` (v0.5.1) | `"16.45 · 4.57 · 3.60"` | 페어 라벨 모호 |
| `contrast_table` (v0.6.0) | 8 페어 명시 | HT 본문은 v0.5.1 형식 그대로 인용 |
| `harmony.mix-ratio: 95/5` | HT stats 영역 ✅ |
| Logo `visible_elements` | D1 모순 |

---

## G. 부수적 잡다한 불일치

1. **`Gong Font Analysis.html`** 은 `--paper`, `--ink-3`, `--ink-subtle` 토큰이 미정의 — 다른 모든 파일과 토큰 슬롯이 다름.
2. **v0.5.1**에는 5-column `.review` legacy CSS가 잔존. v0.6.0에서 제거됨.
3. **Mono 폰트 stack 두 가지**:
   - v0.2–v0.5: `'IBM Plex Mono', ui-monospace, monospace` (외부 CDN)
   - v0.5.1, v0.6.0: `ui-monospace, 'SF Mono', Menlo, monospace` (system stack only — `r9_operating_rules.mono_system_stack_only` 적용)
4. **selection 색**: HT만 `::selection { background: #d9531e; color: #f5f2e8; }` 정의, DS HTML에는 없음.
5. **Print 변형 정책 비일관**:
   - v0.4-print: 별도 `@media print` 파일
   - v0.5.1-print: 별도 파일, main과 거의 동일
   - v0.6.0-print: main이 이미 `@media print` 인라인 — 별도 파일 의미 약함.
6. **의존 그래프**: lab 파일은 GongGlyph만, DS는 `GongGlyph.jsx + glyph-engine.jsx + Symbols.jsx` 3개 모두 — 자급도 차이.

---

## H. 우선순위별 권고 액션

### 🔴 P0 — 자기모순(같은 페이지 안 또는 본문이 명세와 다른 것)
1. **Harmony Test.html bg를 `#f5f2e8` → `#f4f3ef`로 통일**, 본문의 "16.45 · 4.57 · 3.60" 인용을 v0.6.0 `contrast_table` 페어 라벨로 교체.
2. **HT 본문의 "5개 가시 요소"** 표현을 v0.6.0의 4-way 카운트 표기로 교체.
3. **v0.5.1 산출물의 R7 위반(`accent` on hierarchy core, triad winner, badge 등)** 을 v0.6.0 분기(`accent_symbol` vs `accent_ui`)로 명시적 마이그레이션 — v0.5.1은 deprecated 표기 권장.

### 🟠 P1 — 토큰 일관성
4. **`--ink-3` 통일** (`#7a7a7a` → `#8a8a8a`) — Jamo Lab, Weight Lab.
5. **`--line` 통일** (`#e6e6e6` → `#e6e1d6`) — Gong Font Analysis. 누락된 `--paper`, `--ink-3` 추가.
6. **page max-width 결정** — 1320 / 1280 / 1400 중 캐논 채택 후 5개 파일 정렬.
7. **Hero h1 76px로 통일** — HT의 80px 정정.

### 🟡 P2 — 시스템 컴파일
8. **spacing 토큰을 CSS 변수로 노출** (`--space-section: 96px;` 등) → 모든 HTML이 변수 참조.
9. **typography 토큰을 클래스로 노출** (`.t-display-hero`, `.t-eyebrow` 등).
10. **lab 3종(Jamo Lab / Weight Lab / Gong Font Analysis)을 Pretendard로 마이그레이션**, 또는 명시적으로 "IBM Plex 기반 R&D 산출물" 로 격리.

### 🟢 P3 — 정리
11. SVG 단일화: `chuk-logo.svg` 를 v0.6.0 transparent 버전으로 교체, 레거시는 `archive/`로 이동.
12. v0.5.1 / v0.5.1-print / v0.4-print / v0.4-inline / v0.4 (standalone) — **현 상태 보존인지 deprecate인지** 결정.
13. v0.6.0-print 별도 파일 의미 검토 — main의 `@media print`와 동일하다면 통합.

---

## 부록 — 검토한 파일 목록 (2026-04-27)

**HTML (15)**
- `Chuk Design System v0.2.html`
- `Chuk Design System v0.3.html`
- `Chuk Design System v0.4.html`
- `Chuk Design System v0.4-inline.html`
- `Chuk Design System v0.4 (standalone).html`
- `Chuk Design System v0.4-print.html`
- `Chuk Design System v0.5.html`
- `Chuk Design System v0.5.1.html`
- `Chuk Design System v0.5.1-print.html`
- `Chuk Design System v0.6.0.html`
- `Chuk Design System v0.6.0-print.html`
- `Harmony Test.html`
- `Jamo Lab.html`
- `Weight Lab.html`
- `Gong Font Analysis.html`

**Markdown 사양 (5)**
- `design.md` (v0.5.1)
- `design-extension.md` (v0.5.1)
- `design.v0.6.0.md`
- `design-extension.v0.6.0.md`
- `templates/design.template.md`, `templates/design-extension.template.md`
