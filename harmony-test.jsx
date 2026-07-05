// harmony-test.jsx
// ─────────────────────────────────────────────────────────────────
// Pretendard × 축(Chuk) Harmony Test
// Demonstrates 4 visual patterns from VISUAL_STRATEGY.md
// ─────────────────────────────────────────────────────────────────

const { useState, useMemo } = React;

// ── Color tokens ───────────────────────────────────────────────────
const C = {
  cream: '#F4EFE6',
  ink: '#1A1814',
  inkSoft: '#2A2620',
  red: '#C73E2C',
  redDark: '#A8321F',
  gray: '#6B655C',
  graySoft: '#9A9388',
  line: '#D8D0C2',
  lineSoft: '#E8E0D2',
};

// ═══════════════════════════════════════════════════════════════════
// CHUK GLYPH RENDERER (octagonal)
// 16×16 master grid, chamfered at 2 units, monolinear stroke = 2.4
// ═══════════════════════════════════════════════════════════════════

function chamRect(x1, y1, x2, y2, ch, flags) {
  const [tl, tr, br, bl] = flags;
  const c = Math.min(ch, (x2 - x1) / 2, (y2 - y1) / 2);
  let d = '';
  d += `M ${x1 + (tl ? c : 0)} ${y1}`;
  d += ` L ${x2 - (tr ? c : 0)} ${y1}`;
  if (tr) d += ` L ${x2} ${y1 + c}`;
  d += ` L ${x2} ${y2 - (br ? c : 0)}`;
  if (br) d += ` L ${x2 - c} ${y2}`;
  d += ` L ${x1 + (bl ? c : 0)} ${y2}`;
  if (bl) d += ` L ${x1} ${y2 - c}`;
  d += ` L ${x1} ${y1 + (tl ? c : 0)}`;
  if (tl) d += ` L ${x1 + c} ${y1}`;
  d += ' Z';
  return d;
}

// Octagonal ring (for ㅇ) — outer & inner octagons
function octRingPath(cx, cy, R, sw) {
  const a = R / Math.sqrt(2 + Math.sqrt(2)); // octagon side half
  const r = R; // outer "radius"
  const s = R - R * 0.293; // chamfer offset (1 - 1/sqrt(2) approx, but tuned)
  const ch = R * 0.293; // chamfer amount

  // Outer octagon path
  const outer = chamRect(cx - r, cy - r, cx + r, cy + r, ch, [1, 1, 1, 1]);
  // Inner octagon (hollow)
  const ri = R - sw;
  const chi = ri * 0.293;
  const inner = chamRect(cx - ri, cy - ri, cx + ri, cy + ri, chi, [1, 1, 1, 1]);
  return outer + ' ' + inner;
}

// 축 octagonal "ㅇ" — square frame
function ChukO({ size = 80, color = C.ink, weight = 2.4 }) {
  const G = 16;
  const scale = size / G;
  const sw = weight;
  const R = 7; // radius in grid units
  return (
    <svg width={size} height={size} viewBox={`0 0 ${G} ${G}`} style={{ display: 'block' }}>
      <path
        d={octRingPath(8, 8, R, sw)}
        fill={color}
        fillRule="evenodd"
      />
    </svg>
  );
}

// 축 ㅁ (square with chamfered corners)
function ChukSquare({ size = 80, color = C.ink, weight = 2.4 }) {
  const G = 16;
  const sw = weight;
  const ch = 2;
  const outer = chamRect(1, 1, 15, 15, ch, [1, 1, 1, 1]);
  const inner = chamRect(1 + sw, 1 + sw, 15 - sw, 15 - sw, ch - sw / 2, [1, 1, 1, 1]);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${G} ${G}`} style={{ display: 'block' }}>
      <path d={outer + ' ' + inner} fill={color} fillRule="evenodd" />
    </svg>
  );
}

// 축 core symbol (8-direction radial + thick vertical axis)
function ChukSymbol({ size = 80, color = C.ink }) {
  const G = 16;
  const cx = 8, cy = 8;
  const sw = 1.6;
  const swMain = 2.4;
  const len = 6;
  const ch = 0.8;

  // 4 cardinal arms
  const arms = [];
  // vertical axis (thicker - the 축)
  arms.push(<path key="v" d={chamRect(cx - swMain / 2, cy - len, cx + swMain / 2, cy + len, ch, [1, 1, 1, 1])} fill={color} />);
  // horizontal arm
  arms.push(<path key="h" d={chamRect(cx - len, cy - sw / 2, cx + len, cy + sw / 2, ch, [1, 1, 1, 1])} fill={color} />);

  // 4 diagonals (45°)
  const dlen = 4.5;
  for (let i = 0; i < 4; i++) {
    const angle = (Math.PI / 4) + (i * Math.PI / 2);
    const dx = Math.cos(angle) * dlen;
    const dy = Math.sin(angle) * dlen;
    arms.push(
      <line
        key={`d${i}`}
        x1={cx} y1={cy}
        x2={cx + dx} y2={cy + dy}
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="butt"
      />
    );
  }

  // central node
  arms.push(<circle key="c" cx={cx} cy={cy} r={1.6} fill={color} />);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${G} ${G}`} style={{ display: 'block' }}>
      {arms}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PAGE SHELL
// ═══════════════════════════════════════════════════════════════════

function HarmonyTest() {
  return (
    <div style={{
      minHeight: '100vh',
      background: C.cream,
      color: C.ink,
      fontFamily: 'Pretendard, -apple-system, sans-serif',
      paddingBottom: 120,
    }}>
      <Header />
      <Intro />
      <Section00_Comparison />
      <PatternA />
      <PatternB />
      <PatternC />
      <PatternD />
      <AntiPatterns />
      <Footer />
    </div>
  );
}

// ── Header ────────────────────────────────────────────────────────
function Header() {
  return (
    <header style={{
      borderBottom: `1px solid ${C.line}`,
      padding: '32px 64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <ChukSymbol size={32} color={C.red} />
        <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '0.02em' }}>
          축 (Chuk) × Pretendard
        </div>
      </div>
      <div style={{ fontSize: 12, color: C.gray, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        Harmony Test · v0.1
      </div>
    </header>
  );
}

// ── Intro ─────────────────────────────────────────────────────────
function Intro() {
  return (
    <section style={{ padding: '120px 64px 80px', maxWidth: 1200 }}>
      <div style={{ fontSize: 11, color: C.red, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>
        Visual Strategy
      </div>
      <h1 style={{
        fontSize: 88,
        fontWeight: 700,
        lineHeight: 0.95,
        letterSpacing: '-0.03em',
        margin: 0,
        marginBottom: 32,
        textWrap: 'balance',
      }}>
        Pretendard로 말하고,<br/>
        <span style={{ color: C.red }}>축</span>으로 외친다.
      </h1>
      <p style={{
        fontSize: 20,
        lineHeight: 1.5,
        color: C.inkSoft,
        maxWidth: 720,
        margin: 0,
      }}>
        Pretendard는 본문의 <strong>흐름(Flow)</strong>, 축은 브랜드의 <strong>중심(Core)</strong>.
        같은 평면에서 만나지 않고, 위계로 분리한다. 충돌은 해결하지 않고, 자산으로 만든다.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 24,
        marginTop: 80,
        paddingTop: 32,
        borderTop: `1px solid ${C.line}`,
      }}>
        {[
          { k: '95%', l: 'Pretendard 비중', s: 'Body, UI, labels' },
          { k: '5%', l: '축 비중', s: 'Logo, anchor, icon' },
          { k: '4', l: 'Visual Patterns', s: 'A · B · C · D' },
          { k: '6', l: 'Anti-patterns', s: 'Forbidden combinations' },
        ].map((x, i) => (
          <div key={i}>
            <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em' }}>
              {x.k}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 12 }}>{x.l}</div>
            <div style={{ fontSize: 12, color: C.gray, marginTop: 4 }}>{x.s}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Section 0: Side-by-side primitive comparison ──────────────────
function Section00_Comparison() {
  return (
    <section style={{ padding: '80px 64px', borderTop: `1px solid ${C.line}`, background: '#fff' }}>
      <SectionHeader index="00" title="Primitive Comparison" subtitle="두 시스템의 시각 DNA, 같은 크기에서 직접 비교" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginTop: 64 }}>
        {/* Pretendard column */}
        <div>
          <div style={{ fontSize: 11, color: C.gray, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24 }}>
            Pretendard · 가로 타원 1.14:1
          </div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', marginBottom: 32 }}>
            <div style={{ fontFamily: 'Pretendard', fontSize: 240, lineHeight: 0.85, fontWeight: 500 }}>ㅇ</div>
            <div style={{ fontFamily: 'Pretendard', fontSize: 240, lineHeight: 0.85, fontWeight: 500 }}>ㅁ</div>
            <div style={{ fontFamily: 'Pretendard', fontSize: 240, lineHeight: 0.85, fontWeight: 500 }}>ㅅ</div>
          </div>
          <div style={{ fontSize: 13, color: C.inkSoft, lineHeight: 1.6 }}>
            가로 타원 ㅇ · 직각 cut 종단 · 53° 대각선 · monolinear (ㅣ/ㅡ = 1.00)
          </div>
        </div>

        {/* 축 column */}
        <div>
          <div style={{ fontSize: 11, color: C.red, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24 }}>
            축 (Chuk) · 정팔각 1:1
          </div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', marginBottom: 32 }}>
            <div style={{ width: 200, height: 200 }}><ChukO size={200} weight={3.2} /></div>
            <div style={{ width: 200, height: 200 }}><ChukSquare size={200} weight={3.2} /></div>
            <div style={{ width: 200, height: 200 }}><ChukSymbol size={200} /></div>
          </div>
          <div style={{ fontSize: 13, color: C.inkSoft, lineHeight: 1.6 }}>
            정팔각 ㅇ · 45° 챔퍼 종단 · 45° 대각선 · ㅣ = 1.15× ㅡ
          </div>
        </div>
      </div>

      {/* Conflict heatmap */}
      <div style={{ marginTop: 80, paddingTop: 48, borderTop: `1px solid ${C.line}` }}>
        <div style={{ fontSize: 11, color: C.gray, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24 }}>
          Conflict Heatmap
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: C.line }}>
          {[
            ['ㅇ 형태', '타원 vs 팔각', 'HIGH'],
            ['종단', '직각 vs 챔퍼', 'HIGH'],
            ['대각선', '53° vs 45°', 'MED'],
            ['꺾임부', '직각 vs 챔퍼', 'MED'],
            ['획 대비', '1.00 vs 1.15', 'MED'],
            ['깔끔함', 'clean / clean', 'LOW'],
            ['직선성', 'geo / oct', 'LOW'],
            ['모던함', 'modern / modern', 'LOW'],
          ].map(([label, detail, level], i) => (
            <div key={i} style={{
              background: '#fff',
              padding: 24,
              minHeight: 100,
            }}>
              <div style={{
                fontSize: 9,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: level === 'HIGH' ? C.red : level === 'MED' ? '#B8860B' : C.gray,
                fontWeight: 700,
                marginBottom: 8,
              }}>
                ● {level}
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 12, color: C.gray }}>{detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section header helper ─────────────────────────────────────────
function SectionHeader({ index, title, subtitle, accent }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: accent || C.red, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>
        Pattern {index}
      </div>
      <h2 style={{ fontSize: 48, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em', margin: 0, marginBottom: 12 }}>
        {title}
      </h2>
      <p style={{ fontSize: 16, color: C.gray, margin: 0, maxWidth: 560 }}>
        {subtitle}
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PATTERN A — Logo Lockup
// ═══════════════════════════════════════════════════════════════════
function PatternA() {
  return (
    <section data-screen-label="A Logo Lockup" style={{ padding: '120px 64px', borderTop: `1px solid ${C.line}` }}>
      <SectionHeader index="A" title="Logo Lockup" subtitle="축 심볼과 Pretendard 워드마크의 결합. 수직 정렬과 간격이 핵심." />

      <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48 }}>
        {/* Live example */}
        <div style={{
          background: '#fff',
          border: `1px solid ${C.line}`,
          padding: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 320,
          position: 'relative',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <ChukSymbol size={64} color={C.ink} />
            <div style={{
              fontFamily: 'Pretendard',
              fontSize: 48,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}>
              Pretendard <span style={{ color: C.gray, fontWeight: 400 }}>Co.</span>
            </div>
          </div>
          {/* Tag */}
          <div style={{ position: 'absolute', top: 16, left: 16, fontSize: 10, color: C.gray, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            ✓ Correct
          </div>
        </div>

        {/* Spec sheet */}
        <div style={{ background: C.cream, border: `1px solid ${C.line}`, padding: 32 }}>
          <div style={{ fontSize: 10, color: C.gray, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>
            Spec
          </div>
          <SpecRow label="축 심볼" value="64px, ink" />
          <SpecRow label="Wordmark" value="Pretendard 700" />
          <SpecRow label="Cap height" value="48px → 35px cap" />
          <SpecRow label="간격" value="20px (≈30% × symbol)" />
          <SpecRow label="정렬" value="symbol center = cap center" />
          <SpecRow label="색" value="ink black, single tone" />
        </div>
      </div>

      {/* Variations */}
      <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {[
          { sym: 32, font: 24, label: 'Small (nav)' },
          { sym: 48, font: 36, label: 'Medium (header)' },
          { sym: 80, font: 60, label: 'Large (hero)' },
        ].map((v, i) => (
          <div key={i} style={{
            background: '#fff',
            border: `1px solid ${C.line}`,
            padding: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            minHeight: 180,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: v.sym * 0.3 }}>
              <ChukSymbol size={v.sym} color={C.ink} />
              <div style={{
                fontFamily: 'Pretendard',
                fontSize: v.font,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}>
                Pretendard
              </div>
            </div>
            <div style={{ fontSize: 11, color: C.gray, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {v.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SpecRow({ label, value }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 0',
      borderBottom: `1px solid ${C.lineSoft}`,
      fontSize: 13,
    }}>
      <span style={{ color: C.gray }}>{label}</span>
      <span style={{ fontWeight: 500, fontFamily: 'Pretendard' }}>{value}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PATTERN B — Section Anchor
// ═══════════════════════════════════════════════════════════════════
function PatternB() {
  return (
    <section data-screen-label="B Section Anchor" style={{ padding: '120px 64px', borderTop: `1px solid ${C.line}`, background: '#fff' }}>
      <SectionHeader index="B" title="Section Anchor" subtitle="큰 축 글리프가 섹션 시작을 표시. Pretendard 본문은 그 아래로 흐른다." />

      <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
        {/* Example 1 */}
        <article style={{ background: C.cream, padding: 48, border: `1px solid ${C.line}` }}>
          <div style={{ marginBottom: 32 }}>
            <ChukO size={120} color={C.ink} weight={4} />
          </div>
          <div style={{
            fontSize: 11,
            color: C.red,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 12,
            fontFamily: 'Pretendard',
          }}>
            공지사항
          </div>
          <h3 style={{
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            margin: 0,
            marginBottom: 16,
            fontFamily: 'Pretendard',
          }}>
            새로운 디자인 시스템 v0.5 발표
          </h3>
          <p style={{
            fontSize: 15,
            lineHeight: 1.65,
            color: C.inkSoft,
            margin: 0,
            fontFamily: 'Pretendard',
          }}>
            축(Chuk) Octagonal Type System의 다섯 번째 버전이 공개되었습니다.
            본문은 Pretendard로, 브랜드 모먼트는 축 글리프로 처리하여
            두 시스템의 충돌을 위계로 변환했습니다.
          </p>
        </article>

        {/* Example 2 */}
        <article style={{ background: C.cream, padding: 48, border: `1px solid ${C.line}` }}>
          <div style={{ marginBottom: 32 }}>
            <ChukSquare size={120} color={C.ink} weight={4} />
          </div>
          <div style={{
            fontSize: 11,
            color: C.red,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 12,
            fontFamily: 'Pretendard',
          }}>
            구조 원칙
          </div>
          <h3 style={{
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            margin: 0,
            marginBottom: 16,
            fontFamily: 'Pretendard',
          }}>
            모듈은 16×16 그리드 위에 선다
          </h3>
          <p style={{
            fontSize: 15,
            lineHeight: 1.65,
            color: C.inkSoft,
            margin: 0,
            fontFamily: 'Pretendard',
          }}>
            모든 축 글리프는 16 단위 정사각 마스터 그리드에서 시작합니다.
            획 두께, 챔퍼, 정점은 모두 그리드 단위로 정의되며,
            이는 Pretendard의 자유로운 vector 구조와 명확히 구분됩니다.
          </p>
        </article>
      </div>

      <div style={{
        marginTop: 32,
        padding: 24,
        background: C.cream,
        border: `1px dashed ${C.line}`,
        fontSize: 13,
        color: C.gray,
        fontFamily: 'Pretendard',
      }}>
        <strong style={{ color: C.ink }}>규칙</strong> — 축 글리프 = 64–120px (display) · 본문 텍스트 = 14–18px (body).
        두 시스템이 같은 시각 무게로 만나지 않도록 크기로 명확히 분리한다.
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PATTERN C — Chamfer Frame Card
// ═══════════════════════════════════════════════════════════════════
function PatternC() {
  // CSS clip-path for 4-corner 45° chamfer
  const chamferClip = (ch = 16) => ({
    clipPath: `polygon(${ch}px 0, calc(100% - ${ch}px) 0, 100% ${ch}px, 100% calc(100% - ${ch}px), calc(100% - ${ch}px) 100%, ${ch}px 100%, 0 calc(100% - ${ch}px), 0 ${ch}px)`,
  });

  return (
    <section data-screen-label="C Chamfer Frame" style={{ padding: '120px 64px', borderTop: `1px solid ${C.line}` }}>
      <SectionHeader index="C" title="Chamfer Frame Card" subtitle="Pretendard 텍스트를 축의 챔퍼 컨테이너로 감싼다. 텍스트는 건드리지 않고 프레임만 챔퍼." />

      <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {/* Card 1 — Stat */}
        <div style={{ position: 'relative', padding: 2, background: C.ink, ...chamferClip(20) }}>
          <div style={{
            background: C.cream,
            padding: 32,
            ...chamferClip(18),
            minHeight: 220,
          }}>
            <div style={{ fontSize: 11, color: C.red, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Pretendard', marginBottom: 12 }}>
              Density
            </div>
            <div style={{ fontFamily: 'Pretendard', fontSize: 64, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 8 }}>
              16×16
            </div>
            <div style={{ fontFamily: 'Pretendard', fontSize: 14, color: C.inkSoft, lineHeight: 1.5 }}>
              Master grid — 모든 글리프가 256개 단위 셀 위에 놓인다.
            </div>
          </div>
        </div>

        {/* Card 2 — Action */}
        <div style={{ position: 'relative', padding: 2, background: C.red, ...chamferClip(20) }}>
          <div style={{
            background: '#fff',
            padding: 32,
            ...chamferClip(18),
            minHeight: 220,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: 11, color: C.red, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Pretendard', marginBottom: 12 }}>
                실행
              </div>
              <h4 style={{ fontFamily: 'Pretendard', fontSize: 22, fontWeight: 700, margin: 0, marginBottom: 8, letterSpacing: '-0.02em' }}>
                Harmony Test 시작
              </h4>
              <p style={{ fontFamily: 'Pretendard', fontSize: 13, color: C.gray, margin: 0, lineHeight: 1.5 }}>
                네 가지 패턴을 직접 비교해보세요.
              </p>
            </div>
            <button style={{
              fontFamily: 'Pretendard',
              fontWeight: 600,
              fontSize: 14,
              background: C.red,
              color: '#fff',
              border: 'none',
              padding: '12px 24px',
              cursor: 'pointer',
              alignSelf: 'flex-start',
              clipPath: `polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)`,
            }}>
              ENTER →
            </button>
          </div>
        </div>

        {/* Card 3 — Quote */}
        <div style={{ position: 'relative', padding: 2, background: C.ink, ...chamferClip(20) }}>
          <div style={{
            background: C.ink,
            color: C.cream,
            padding: 32,
            ...chamferClip(18),
            minHeight: 220,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <div style={{ fontFamily: 'Pretendard', fontSize: 20, fontWeight: 500, lineHeight: 1.4, letterSpacing: '-0.01em' }}>
              "Pretendard로 말하고, 축으로 외친다."
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24 }}>
              <ChukSymbol size={24} color={C.cream} />
              <div style={{ fontFamily: 'Pretendard', fontSize: 12, color: C.graySoft, letterSpacing: '0.05em' }}>
                Visual Strategy · 2026
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 32,
        padding: 24,
        background: C.cream,
        border: `1px dashed ${C.line}`,
        fontSize: 13,
        color: C.gray,
        fontFamily: 'Pretendard',
      }}>
        <strong style={{ color: C.ink }}>규칙</strong> — 챔퍼는 컨테이너에만 적용 (clip-path).
        내부 텍스트는 Pretendard 그대로 — 가로 타원 ㅇ, 직각 cut, 53° 대각선 모두 보존.
        축 시스템은 <em>프레임</em>으로만 존재한다.
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PATTERN D — Display Headline
// ═══════════════════════════════════════════════════════════════════
function PatternD() {
  return (
    <section data-screen-label="D Display Headline" style={{
      padding: '120px 64px',
      borderTop: `1px solid ${C.line}`,
      background: C.ink,
      color: C.cream,
    }}>
      <SectionHeader index="D" title="Display Headline" subtitle="브랜드 단어 한 글자만 축 글리프로. 나머지는 Pretendard." accent={C.red} />

      <div style={{ marginTop: 80, display: 'flex', flexDirection: 'column', gap: 80 }}>
        {/* Example 1 — "축은 새로운 시작입니다" */}
        <div>
          <div style={{ fontSize: 10, color: C.graySoft, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'Pretendard' }}>
            Example 1 · 단일 단어 강조
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 16,
            fontFamily: 'Pretendard',
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            flexWrap: 'wrap',
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
              <ChukO size={120} color={C.red} weight={4.5} />
            </span>
            <span>은 새로운 시작입니다.</span>
          </div>
          <div style={{ fontSize: 12, color: C.graySoft, marginTop: 24, fontFamily: 'Pretendard', letterSpacing: '0.05em' }}>
            "축" → 축 팔각 ㅇ (display) · 나머지 → Pretendard 700
          </div>
        </div>

        {/* Example 2 — Tagline */}
        <div style={{ borderTop: `1px solid ${C.inkSoft}`, paddingTop: 64 }}>
          <div style={{ fontSize: 10, color: C.graySoft, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'Pretendard' }}>
            Example 2 · 태그라인
          </div>
          <div style={{
            fontFamily: 'Pretendard',
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            maxWidth: 1100,
            textWrap: 'balance',
          }}>
            모든 디자인은 <span style={{ color: C.red }}>중심</span>이 필요하다.<br/>
            우리는 그 중심을 <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              verticalAlign: 'middle',
            }}>
              <ChukSymbol size={56} color={C.red} />
            </span> 이라 부른다.
          </div>
          <div style={{ fontSize: 12, color: C.graySoft, marginTop: 32, fontFamily: 'Pretendard', letterSpacing: '0.05em' }}>
            본문 = Pretendard 600 · 강조어 "중심" = 빨강 컬러 코딩 · "축" = 축 심볼 inline
          </div>
        </div>

        {/* Example 3 — Numerals */}
        <div style={{ borderTop: `1px solid ${C.inkSoft}`, paddingTop: 64 }}>
          <div style={{ fontSize: 10, color: C.graySoft, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'Pretendard' }}>
            Example 3 · 숫자와 결합
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 32,
          }}>
            {[
              { num: '01', label: '하나의 중심', sym: 'O' },
              { num: '04', label: '네 가지 패턴', sym: 'M' },
              { num: '16', label: '마스터 그리드', sym: 'X' },
            ].map((x, i) => (
              <div key={i} style={{ borderLeft: `2px solid ${C.red}`, paddingLeft: 24 }}>
                <div style={{
                  fontFamily: 'Pretendard',
                  fontSize: 88,
                  fontWeight: 700,
                  lineHeight: 0.9,
                  letterSpacing: '-0.04em',
                  color: C.cream,
                }}>
                  {x.num}
                </div>
                <div style={{
                  fontFamily: 'Pretendard',
                  fontSize: 16,
                  color: C.graySoft,
                  marginTop: 16,
                  letterSpacing: '0.02em',
                }}>
                  {x.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ANTI-PATTERNS
// ═══════════════════════════════════════════════════════════════════
function AntiPatterns() {
  return (
    <section data-screen-label="Anti-patterns" style={{ padding: '120px 64px', borderTop: `1px solid ${C.line}` }}>
      <div>
        <div style={{ fontSize: 11, color: C.red, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>
          Anti-patterns
        </div>
        <h2 style={{ fontSize: 48, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em', margin: 0, marginBottom: 12 }}>
          이렇게 쓰지 않는다
        </h2>
        <p style={{ fontSize: 16, color: C.gray, margin: 0, maxWidth: 560 }}>
          충돌이 보이는 자리에서 두 시스템이 같은 시각 무게로 만나는 순간, 둘 다 죽는다.
        </p>
      </div>

      <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {/* Anti 1 — inline mix */}
        <AntiCard
          title="Inline 혼용"
          desc="본문 안에 축 글리프를 inline 삽입"
          why="가로 타원 ㅇ과 팔각 ㅇ이 같은 줄, 같은 크기로 부딪힌다."
        >
          <div style={{ fontFamily: 'Pretendard', fontSize: 18, lineHeight: 1.6, color: C.ink }}>
            오늘의 <span style={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle' }}>
              <ChukO size={20} color={C.ink} weight={2.4} />
            </span>지사항을 확인하세요. 본문은 <span style={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle' }}>
              <ChukSymbol size={20} color={C.ink} />
            </span>축 시스템과 충돌합니다.
          </div>
        </AntiCard>

        {/* Anti 2 — same-size adjacency */}
        <AntiCard
          title="동일 크기 인접"
          desc="같은 px 크기로 나란히 배치"
          why="ㅇ의 1.14:1 vs 1:1 비율 차이가 시각적으로 어긋나 보인다."
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', padding: '20px 0' }}>
            <div style={{ fontFamily: 'Pretendard', fontSize: 80, fontWeight: 600, lineHeight: 1 }}>ㅇ</div>
            <ChukO size={80} color={C.ink} weight={3} />
            <div style={{ fontFamily: 'Pretendard', fontSize: 80, fontWeight: 600, lineHeight: 1 }}>ㅇ</div>
          </div>
        </AntiCard>

        {/* Anti 3 — chamfer on text */}
        <AntiCard
          title="Pretendard에 챔퍼 강제"
          desc="본문 텍스트 모서리를 깎음"
          why="Pretendard의 가독성과 정체성이 모두 훼손된다."
        >
          <div style={{
            fontFamily: 'Pretendard',
            fontSize: 64,
            fontWeight: 700,
            color: C.ink,
            textAlign: 'center',
            padding: '20px 0',
            clipPath: `polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)`,
            background: C.cream,
            border: `2px dashed ${C.red}`,
          }}>
            폰트
          </div>
        </AntiCard>

        {/* Anti 4 — overuse */}
        <AntiCard
          title="과다 사용"
          desc="페이지에 축 글리프 5개 이상"
          why="희소성이 사라지면 강조 효과도 사라진다."
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '16px 0', justifyContent: 'center' }}>
            {[...Array(7)].map((_, i) => (
              <ChukO key={i} size={32} color={C.ink} weight={2.4} />
            ))}
          </div>
        </AntiCard>

        {/* Anti 5 — pixel rounding on chuk */}
        <AntiCard
          title="축에 픽셀 라운드"
          desc="축의 각진 종단을 라운드로 변경"
          why="축의 정체성(45° 챔퍼)이 사라져 평범한 sans-serif가 된다."
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0' }}>
            <svg width={120} height={120} viewBox="0 0 16 16">
              <rect x={1} y={1} width={14} height={14} rx={3} ry={3} fill="none" stroke={C.ink} strokeWidth={2.4} />
            </svg>
          </div>
        </AntiCard>

        {/* Anti 6 — multi-color chuk */}
        <AntiCard
          title="축에 다채색 적용"
          desc="축 시스템을 여러 색으로 분산"
          why="단일 강조색 원칙이 깨지면 사용자가 시스템 전환을 인지하지 못한다."
        >
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', padding: '20px 0' }}>
            <ChukO size={60} color="#3B82F6" weight={3} />
            <ChukO size={60} color="#10B981" weight={3} />
            <ChukO size={60} color="#F59E0B" weight={3} />
            <ChukO size={60} color="#8B5CF6" weight={3} />
          </div>
        </AntiCard>
      </div>
    </section>
  );
}

function AntiCard({ title, desc, why, children }) {
  return (
    <div style={{
      background: '#fff',
      border: `1px solid ${C.line}`,
      padding: 24,
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        top: 16, right: 16,
        fontSize: 10,
        fontWeight: 700,
        color: C.red,
        letterSpacing: '0.15em',
      }}>
        ✗ DON'T
      </div>
      <div style={{
        background: C.cream,
        padding: 24,
        marginBottom: 20,
        marginTop: 16,
        minHeight: 140,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {children}
      </div>
      <div style={{ fontFamily: 'Pretendard', fontSize: 16, fontWeight: 700, marginBottom: 6, letterSpacing: '-0.01em' }}>
        {title}
      </div>
      <div style={{ fontFamily: 'Pretendard', fontSize: 13, color: C.inkSoft, marginBottom: 8 }}>
        {desc}
      </div>
      <div style={{ fontFamily: 'Pretendard', fontSize: 12, color: C.gray, lineHeight: 1.5 }}>
        {why}
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      borderTop: `1px solid ${C.line}`,
      padding: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: C.cream,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <ChukSymbol size={32} color={C.red} />
        <div style={{ fontSize: 12, color: C.gray, letterSpacing: '0.05em', fontFamily: 'Pretendard' }}>
          축(Chuk) Octagonal Type System × Pretendard · Harmony Test v0.1
        </div>
      </div>
      <div style={{ fontSize: 12, color: C.gray, letterSpacing: '0.05em', fontFamily: 'Pretendard' }}>
        2026 · Visual Strategy Lab
      </div>
    </footer>
  );
}

// ── Mount ─────────────────────────────────────────────────────────
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HarmonyTest />);
