# 축 (Chuk) — Octagonal Type System

한글 자소(字素)의 **축(軸)** 을 팔각형(Octagon) 기하로 재구성한 타입/브랜드 디자인 시스템입니다.
Chuk은 서체·색·기호를 하나의 좌표계 위에서 다루며, 모든 규칙은 측정값(Harmony Test)으로 검증됩니다.

> **Main = v0.6.0.** 이 저장소는 Chuk Octagonal Type System의 canonical 표면을 담습니다.
> 누락된 계보/브랜드 서사는 Axis_DesignSystem research 자료(`docs/AXIS_ORIGIN.md`, `assets/logo-axis-*.svg`)로 보완했습니다.

---

## 핵심 개념

- **8 core color tokens** — `ink / ink-subtle / ink-muted / line / bg / paper / accent(#d9531e) / grid-guide`
  (DS v0.5 + Harmony Test 8/8 PASS 기준으로 확정)
- **Pretendard = system of record** — 모든 하모니 측정(stem 6.5px · ㅅ/ㅈ 65–70° · ㅇ 60px)이 Pretendard 기준
- **Octagon glyph engine** — 자소를 팔각 좌표로 그리는 `glyph-engine.jsx` / `fonts/GongGlyph.jsx`
- **R1–R9 시스템 규칙 + accent_scope + contrast_table** — `design-extension.v0.6.0.md`
- **규범적 운영 규칙(4 DO / 4 DON'T)** — 타입 공존 규칙을 `components.dodont`로 강제

## 저장소 구조

```
design.v0.6.0.md                 # canonical token surface (colors/type/spacing)
design-extension.v0.6.0.md       # R1–R9, accent_scope, contrast_table, logo primitive
design.md / design-extension.md  # latest working head
templates/                       # design.template.md · design-extension.template.md
Chuk Design System v0.6.0.html   # 렌더 스펙 (+ -print)
*.jsx                            # ds-v060 / glyph-engine / harmony-test / showcase / *-lab
symbols/ · fonts/                # Symbols.jsx · GongGlyph.jsx
exports/                         # chuk-logo.{svg,png} + audit prompt
colors_and_type.css              # 토큰 CSS + @font-face
docs/AXIS_ORIGIN.md              # Axis 계보 서사 (gap-fill)
assets/logo-axis-*.svg           # Axis wordmark/mark/stack (gap-fill)
CONSISTENCY_AUDIT_* · SSOT_IMPROVEMENT_* · VISUAL_STRATEGY.md · PRETENDARD_ANALYSIS_FINAL.md
```

## 렌더링

`*.html` 는 React 18 + Babel Standalone(CDN)로 브라우저에서 바로 열립니다. 별도 빌드 불필요.

## 폰트

Pretendard · IBM Plex Sans KR · Noto Sans KR 은 모두 **공개 OFL 폰트**라 이 저장소에 바이너리로 포함하지 않습니다. `fonts/README.md` 참고.

---

*System of record: Pretendard · Authored by STITCH (Color & Symbol Specialist) + Chuk Design Team · v0.6.0*
