# design.v0.6.0.md 를 단일 소스(SSOT)로 격상하기 위한 개선 분석

- **분석일**: 2026-04-27
- **전제**: `design.v0.6.0.md` + `design-extension.v0.6.0.md` 가 시스템 전체의 단일 진실(Single Source of Truth). 모든 HTML/JSX 산출물은 이 파일을 변경하지 않고는 토큰을 바꿀 수 없어야 한다.
- **현 상태 진단**: `CONSISTENCY_AUDIT_v0.6.0_2026-04-27.md` 참조. SSOT가 되기 위해 막고 있는 5개 구조적 갭을 아래에 정리한다.

---

## 1. SSOT 격상의 본질 — "캐논이 변하면 산출물이 변한다" 가 성립하는가?

현재 답: **❌ 성립하지 않는다.**

| 캐논 슬롯 | HTML 측 매핑 | 캐논 변경 시 HTML 자동 반영? |
|---|---|---|
| `colors.ink` | `--ink` | ✅ 값만 변경하면 즉시 반영 (변수명 같음) |
| `colors.ink-subtle` | `--ink-2` | ❌ 이름 다름. 캐논에서 `ink-subtle`을 `ink-secondary`로 이름 변경해도 HTML 무영향 |
| `colors.ink-muted` | `--ink-3` | ❌ 동일 |
| `colors.grid-guide` | `--grid` | ❌ 동일 |
| `colors.accent` | `--accent-symbol`/`--accent-ui` (v0.6.0만) | △ accent_scope 의미 분기는 v0.6.0 정/print에만 |
| `typography.*` 9개 | (CSS 클래스 없음) | ❌ HTML이 px값 하드코딩 |
| `spacing.*` 9개 | (CSS 변수 없음) | ❌ HTML이 px값 하드코딩 |
| `components.*` 시그니처 | 마크업 구조 | △ 그리드/카운트는 일치하나 검증 자동화 부재 |

→ 캐논은 **참조 문서**이지 **빌드 입력**이 아님. SSOT가 되려면 캐논 → CSS 변수/클래스/마크업 시그니처로 *기계적으로* 흐르는 채널이 필요.

---

## 2. 5개 구조적 갭 (SSOT 가로막는 요인)

### G1. 변수명 매핑 부재 (HIGHEST)
- 캐논: `ink-subtle / ink-muted / grid-guide`
- HTML: `--ink-2 / --ink-3 / --grid`
- 결과: 캐논 텍스트 grep으로 HTML 사용처를 찾을 수 없음. 토큰 추적성 0.

**개선안 A (캐논을 HTML에 맞춤)** — 비용 최소
- `design.v0.6.0.md → colors:` 슬롯 키를 `ink / ink-2 / ink-3 / line / bg / paper / accent / grid` 로 리네임.
- 이미 모든 HTML이 이 이름을 쓰고 있으므로 docs 한 파일만 수정.
- 단점: STITCH 표준 슬롯명(`ink-subtle / ink-muted`) 과 어긋남. MD3 surface_slots와 의미적 거리.

**개선안 B (HTML을 캐논에 맞춤)** — 권장
- 모든 HTML의 `--ink-2 → --ink-subtle`, `--ink-3 → --ink-muted`, `--grid → --grid-guide` 일괄 치환.
- 이행 보조: 한시적으로 `:root` 안에 alias 유지 (`--ink-2: var(--ink-subtle);`) → HTML 사용처 점진 전환.
- 영향 파일: 15 HTML + 4 JSX (ds-v060.jsx, harmony-test.jsx, jamo-lab.jsx, weight-lab.jsx)
- 장점: 향후 docs 수정만으로 토큰 의미 변경 가능 (예: dark mode에서 `ink-subtle` 정의 변경 → 모든 산출물 자동 반영)

### G2. accent 의미 분기 미전파
- 캐논: `accent_scope.accent_symbol` / `accent_ui` 분리 (별도 의미 토큰)
- 적용: v0.6.0 정/print 2개 파일만
- 미적용: v0.5.1 / v0.5.1-print / v0.5 이하 / Harmony Test / Lab 3종 (총 13개)

**개선안**: `:root` 에 두 변수 추가 + 사용처 리네임 (mechanical):
```css
:root {
  --accent-symbol: #d9531e;  /* hero .mark, hierarchy core */
  --accent-ui:     #d9531e;  /* section num, rule n, verdict, badge */
  --accent: var(--accent-symbol); /* deprecated alias */
}
```
- 5개 사용 위치만 식별: hero `.mark` / hierarchy `.node.core` / section-head `.num` / rule `.n` / subreview/verdict — 자동 sed 가능.

### G3. typography 토큰의 클래스 컴파일 부재
- 캐논 `typography.*` 는 9개 의미 슬롯(`display-hero`, `headline-section`, ..., `meta-data`) 보유
- HTML은 `.hero h1 { font-size: 76px; ... }` 식의 selector-bound 인라인. 의미 슬롯 ↔ selector 매핑 부재

**개선안**: 캐논의 9개 슬롯을 utility 클래스로 컴파일.
```css
:root {
  --t-display-hero-size: 76px;
  --t-display-hero-weight: 700;
  --t-display-hero-lh: 1.0;
  --t-display-hero-track: -0.035em;
  /* ... */
}
.t-display-hero {
  font-size: var(--t-display-hero-size);
  font-weight: var(--t-display-hero-weight);
  line-height: var(--t-display-hero-lh);
  letter-spacing: var(--t-display-hero-track);
}
```
- 마크업: `<h1 class="t-display-hero">…</h1>` — 캐논이 76→72px 로 바꾸면 모든 hero h1 자동 반영.
- 누락 클래스 리스트 (현재 0/9 컴파일): `.t-display-hero / .t-headline-section / .t-headline-card / .t-body-lede / .t-body-main / .t-body-small / .t-label-mono / .t-eyebrow / .t-meta-data`

### G4. spacing 토큰의 CSS 변수 컴파일 부재
- 캐논 `spacing.*` 9개 정의되었으나 HTML은 모두 px 하드코딩
- `.page { max-width: 1320px; padding: 56px 56px 140px; }` 등이 캐논과 결합되어 있지 않음

**개선안**:
```css
:root {
  --space-page-max-width: 1320px;
  --space-margin-page: 56px;
  --space-section-gap: 96px;
  --space-container-padding: 48px;
  --space-card-padding: 32px;
  --space-inner-padding: 24px;
  --space-element-gap-lg: 48px;
  --space-element-gap-md: 18px;
  --space-element-gap-sm: 12px;
  --space-element-gap-xs: 6px;
}
.page { max-width: var(--space-page-max-width); padding: var(--space-margin-page) var(--space-margin-page) 140px; }
.hero { gap: var(--space-element-gap-lg); }
.section-head { gap: var(--space-element-gap-md); }
section { margin-top: var(--space-section-gap); }
```

### G5. 측정값 출처 불일치 (Pretendard ↔ IBM Plex)
- 캐논 주석: "All Harmony Test audits ... measured against Pretendard"
- 그러나 lab 3종(Jamo Lab / Weight Lab / Gong Font Analysis)은 IBM Plex Sans KR로 측정
- 캐논이 인용한 수치(stem 6.5px, ㅅ·ㅈ 65–70°, ㅇ 60px) 의 진위가 lab 파일에서 검증 불가

**개선안**: lab 3종을 Pretendard 기반으로 마이그레이션, 또는 캐논에 출처 명시:
```yaml
typography:
  measurement_source:
    primary: Pretendard Variable (Harmony Test.html)
    auxiliary:
      - file: Jamo Lab.html
        font: IBM Plex Sans KR
        scope: "각도 비교만 (한글 자모 형태 동등성)"
      - file: Weight Lab.html
        font: IBM Plex Sans KR
        scope: "획 굵기 분포만"
      - file: Gong Font Analysis.html
        font: IBM Plex Sans KR
        scope: "ㅇ 형태 비교만"
```

---

## 3. SSOT 격상 로드맵

### Phase 1 — 캐논 자체 정합화 (0.5일)
- [ ] `design.v0.6.0.md → colors:` 슬롯 결정: 명명 안 A 또는 B
- [ ] `design.v0.6.0.md → typography:` 토큰 키를 CSS 클래스 키와 1:1 매칭하도록 정렬 (`display-hero` → `.t-display-hero`)
- [ ] `design.v0.6.0.md → spacing:` 토큰 키를 CSS 변수 키와 1:1 매칭 (`page-max-width` → `--space-page-max-width`)
- [ ] `design-extension.v0.6.0.md → accent_scope:` 가 system_rules R7과 의미 충돌 없는지 1회 점검

### Phase 2 — Token Layer 컴파일 (1일)
- [ ] `tokens.css` 신규 작성 — 캐논의 colors/typography/spacing 을 CSS 변수와 utility 클래스로 컴파일한 *유일한 산출물*
- [ ] 모든 HTML의 `:root { ... }` 블록을 `<link rel="stylesheet" href="tokens.css">` 로 교체 (또는 인라인 import)
- [ ] G1, G3, G4 한 번에 해소

### Phase 3 — R7 분기 일괄 적용 (0.5일)
- [ ] tokens.css 에 `--accent-symbol`, `--accent-ui`, `--accent` (alias) 정의
- [ ] 모든 HTML/JSX의 `var(--accent)` 사용처를 의미별로 리네임:
  - 로고 마크 / hierarchy core → `--accent-symbol`
  - rule num / verdict / badge / selected → `--accent-ui`
- [ ] G2 해소

### Phase 4 — 측정 산출물 정리 (1일)
- [ ] `Harmony Test.html` 의 5개 캐논 어긋남 정정 (bg, eyebrow color/weight, hero h1 size/lh, 콘트라스트 인용)
- [ ] lab 3종을 Pretendard로 마이그레이션 또는 캐논에 측정 출처 메타 추가
- [ ] G5 해소

### Phase 5 — Archive (0.25일)
- [ ] v0.2 / v0.3 / v0.4 / v0.4-inline / v0.4-print / v0.4 (standalone) / v0.5 / v0.5.1 / v0.5.1-print 를 `archive/pre-v0.6/` 로 이동
- [ ] v0.6.0-print 를 main에 통합 후 별도 파일 제거
- [ ] 이후 SSOT 작업은 v0.6.0 한 줄기에서만 진행

---

## 4. SSOT 검증 게이트 (도입 후 유지 위해)

### 게이트 1 — "캐논 grep 가능"
- 정의: 캐논 토큰 키를 grep하면 모든 사용처가 잡힌다.
- 검증: `grep -r "ink-subtle"` 결과가 docs + tokens.css + HTML/JSX 사용처 전부.
- 현재: 0/3 토큰 통과.

### 게이트 2 — "값 변경 1점 수정"
- 정의: 캐논의 한 값을 바꾸면 1회 빌드/리로드만으로 모든 산출물이 반영된다.
- 검증: 시험으로 `--space-section-gap: 96px → 80px` 변경 시 모든 페이지가 변하는가.
- 현재: 0/9 spacing, 0/9 typography 통과.

### 게이트 3 — "구조 시그니처 자동 검증"
- 정의: `components.*` 의 columns/count 가 HTML 마크업과 일치하는지 자동 체크.
- 도구: 간단한 JS 스크립트 (`scripts/validate-canon.js`) 가 캐논 YAML을 파싱하여 각 페이지 DOM의 `.rules > *` 개수, `.dodont > *` 개수 등을 비교.
- 현재: 수동 검증 의존, 자동화 0.

### 게이트 4 — "accent 분기 위반 0건"
- 정의: `--accent` 단독 사용은 deprecated alias로만 허용. 새 코드는 `--accent-symbol` 또는 `--accent-ui` 명시.
- 도구: lint 스크립트 (`scripts/check-accent.js`) 가 HTML/CSS 안 `var(--accent)` 사용을 카운트, alias 마이그레이션 종료 후 0 이어야 통과.
- 현재: 13/15 파일이 단일 `--accent` 사용 — 위반.

---

## 5. 캐논 자체 개선 제안 (design.v0.6.0.md 자체)

### 5.1 명명 일관성
- `colors:` 슬롯의 `ink-subtle / ink-muted` 와 typography 슬롯의 `body-lede / body-main / body-small` 사이 명명 패턴 차이가 큼. ink는 형용사("subtle/muted"), typography는 명사("lede/main/small"). docs 가독성을 위해 둘 중 한 패턴으로 정렬 권장 (예: `ink-100 / ink-300 / ink-500` 같은 numeric scale).

### 5.2 누락 슬롯 보강
- 현재 캐논에는 `border-radius`, `shadow`, `transition` 토큰이 없음. v0.6.0 HTML이 모두 `border-radius: 0` (chamfer 불가에 따른 의도)이라 사실상 단일값이지만, **명시적 정의 부재**가 미래 변경 시 갈등 야기 가능.
- 제안 추가:
  ```yaml
  radii:
    none: 0     # default — 시스템 룰 R4 (orthogonal datum)
    chamfer-45: "polygon(...)"  # gear primitive only
  shadows:
    none: none   # default — flat system
  motion:
    duration-fast: 120ms
    duration-base: 240ms
    easing-base: cubic-bezier(0.2, 0.0, 0.2, 1.0)
  ```

### 5.3 `colors_pending_review` decision_log 동기화
- v0.6.0 결정: `bg-canonical = #f4f3ef` (2026-04-27) 완료
- 그러나 `colors_pending_review.candidates.bg` 에 여전히 3개 후보가 나열되어 있음 (chosen 표시 없이)
- 결정된 항목은 `chosen: true` 마크 또는 `archived` 분기로 이동 권장

### 5.4 audit 결과 inline 인용 일관화
- 현재 캐논은 `harmony.conflict-heatmap` 안에 `"see contrast_table"` 같은 cross-reference를 사용
- 그러나 `harmony.resolution_from_report1_to_report2` 는 본문에 값을 직접 인용 (`"#f5f2e8 (HT) → #f4f3ef (DS v0.5) → canonical in v0.6.0"`)
- 인용 스타일 불일치 — 한 가지로 통일 권장 (cross-ref 우선)

### 5.5 logo 측정값의 단위 누락
- `logo.audit.octagon.side-lengths: [15.30, 15.32]` — viewBox 좌표인지, mm인지, px인지 단위 명시 없음
- viewBox 600 기준임을 본문에서 추론 가능하나, 명시 권장:
  ```yaml
  octagon:
    coordinate-space: "viewBox 0 0 600 600"
    unit: "viewBox-units"
    side-lengths: [15.30, 15.32]
  ```

### 5.6 components 시그니처에 마크업 selector 명시
- 현재: `components.rules: { columns: 4, count: 9 }`
- 제안: `selector: ".rules > .rule"` 추가 → 자동 검증 게이트(게이트 3) 가 정확히 어디를 카운트할지 알 수 있음:
  ```yaml
  rules:
    selector: ".rules"
    item-selector: ".rules > .rule"
    columns: 4
    count: 9
  ```

---

## 6. 결론 — SSOT까지 남은 거리

- 캐논의 **개념적 완성도**는 높음 (v0.6.0이 v0.5.1의 자기모순들을 잘 정리함).
- 그러나 **빌드 채널이 없음** — docs와 산출물은 사실상 *우연히* 정합 상태.
- 위 Phase 1–5 (총 약 3.25일 작업) 완료 시 SSOT 게이트 1–4를 모두 통과 가능.
- 가장 임팩트 큰 1개 작업: **`tokens.css` 작성** (Phase 2). G1/G3/G4를 한 번에 해결하고, 이후 모든 캐논 변경이 단일 파일 수정으로 반영됨.

---

## 부록 — 단일 작업 우선순위 (시간 대비 효과)

| 순위 | 작업 | 소요 | 효과 |
|---|---|---|---|
| 1 | `tokens.css` 작성 + HTML들의 `:root` 블록 교체 | 4h | G1+G3+G4 해소, 게이트 1·2 통과 |
| 2 | accent 분기 일괄 리네임 (`--accent` → `--accent-symbol`/`--accent-ui`) | 2h | G2 해소, 게이트 4 통과 |
| 3 | Harmony Test 5건 정정 | 1h | 자기검증 보고서의 메타 모순 제거 |
| 4 | v0.5.1 이하 archive 이동 | 0.5h | 유지 표면 1/3로 감소 |
| 5 | validate-canon.js 작성 | 3h | 게이트 3 통과, CI 도입 가능 |
| 6 | lab 3종 Pretendard 마이그레이션 (또는 메타 표기) | 4h | G5 해소 |
| 7 | 캐논 자체 개선 (§5.1–5.6) | 2h | docs 가독성/추적성 향상 |

> **최소 투자로 SSOT 격상**: 1+2+3+4 = **7.5시간**. 게이트 1·2·4 통과, 메타 모순 해소, 유지 표면 축소.
