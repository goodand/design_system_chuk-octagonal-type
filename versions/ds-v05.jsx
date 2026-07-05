// ds-v05.jsx — Chuk Design System v0.5
// New: Logo × Body Type 공존 규칙 (R9, §08).
// Origin — SVG audit report on exports/chuk-logo.svg returned
//   FINAL: PASS / COMPATIBLE — and produced 4 DO + 4 DON'T rules.
//   This file codifies those rules into the design system.
const { useState } = React;
const WINNER = 'final';

function App() {
  return (
    <div className="page">
      <Masthead />
      <Hero />
      <SubReview />
      <Hierarchy />
      <Triad />
      <Rules />
      <Coexist />
      <Combinations />
      <Palette />
      <Footer />
    </div>
  );
}

function Masthead() {
  return (
    <div className="masthead">
      <div className="brand">축 <span className="sep">/</span> CHUK DESIGN SYSTEM</div>
      <div className="meta">v0.5 · 2026 · Logo × Body Type</div>
    </div>
  );
}

function Hero() {
  return (
    <div className="hero">
      <div>
        <div className="eyebrow">Design System v0.5 — Release Notes</div>
        <h1>하나의 <span className="mark">축</span>,<br/>두 개의 보조,<br/>하나의 문법.</h1>
        <p className="lede">
          v0.4는 보조 심볼 <b>Gear</b>·<b>Iceberg</b>가 축과 같은 문법을 공유하도록 재설계했습니다.
          핵심은 두 가지: <b>(A) 팔각형 정점(Octagonal Vertex)</b>을 세 심볼 모두에 심고,
          <b>(B) 45° 챔퍼 법칙</b>을 예외 없이 적용하는 것. 두 제안을 결합한 <b>(A + B) final</b>을 채택했습니다.
        </p>
      </div>
      <div className="hero-mark">
        <ChukSymbol size={'85%'} color="#141414" accent="#d9531e" variant={WINNER}/>
      </div>
    </div>
  );
}

function SubReview() {
  const rows = [
    {
      tag: 'PROPOSAL A', title: '팔각 정점 반복',
      subtitle: 'Octagonal Vertex Motif',
      gearVar: 'vertex', iceVar: 'vertex',
      verdict: '중심에 "정점" 하나씩. 축과의 문법적 반복이 생긴다. 다만 가장자리 직각(Gear)·부드러운 면(Iceberg)이 남아 완전히 통일되진 않음.',
    },
    {
      tag: 'PROPOSAL B', title: '45° 챔퍼 법칙',
      subtitle: 'Edge-Language Law',
      gearVar: 'chamfer', iceVar: 'chamfer',
      verdict: '모든 꺾임이 45° 면으로 정리. 제조업적 디테일과 기하학적 리듬이 확립되지만, 중심 포인트가 없어 Core와의 연결이 약함.',
    },
    {
      tag: 'FINAL · A + B', title: '정점 + 챔퍼 결합',
      subtitle: 'Combined · Selected',
      gearVar: 'final', iceVar: 'final', winner: true,
      verdict: '형태 반복(A) × 표면 규칙(B). 세 심볼이 "같은 장인의 손"에서 나온 것처럼 읽힌다. → v0.4 채택.',
    },
  ];
  return (
    <section>
      <div className="section-head">
        <div className="num">01</div>
        <h2>Sub-Symbol Review · Gear × Iceberg</h2>
        <div className="caption">3 proposals → 1 winner</div>
      </div>
      <div className="subreview">
        {rows.map((r, i) => (
          <div key={i} className={"srv" + (r.winner ? ' winner' : '')}>
            <div className="hd">
              <div className="tag">{r.tag}</div>
              {r.winner && <div className="mark">★ Selected</div>}
            </div>
            <h5>{r.title}</h5>
            <div className="sub">{r.subtitle}</div>
            <div className="pair">
              <div className="box">
                <div className="lbl">Sub A · Gear</div>
                <div className="stage">
                  <GearSymbol size={'100%'} color={r.winner ? '#f4f3ef' : '#141414'} accent="#d9531e" variant={r.gearVar}/>
                </div>
              </div>
              <div className="box">
                <div className="lbl">Sub B · Iceberg</div>
                <div className="stage">
                  <IcebergSymbol size={'100%'} color={r.winner ? '#f4f3ef' : '#141414'} accent="#d9531e" variant={r.iceVar}/>
                </div>
              </div>
            </div>
            <div className="verdict">{r.verdict}</div>
          </div>
        ))}
      </div>
      <div className="note">
        팔각 정점 모티프는 세 심볼을 하나의 어휘로 묶고, 45° 챔퍼는 그 어휘를 한 문체로 다듬습니다.
        Iceberg의 이중 톤(수면 위/아래)은 <b>의미 층</b>을 표현하므로 통일 대상에서 제외.
      </div>
    </section>
  );
}

function Hierarchy() {
  return (
    <section>
      <div className="section-head">
        <div className="num">02</div>
        <h2>Symbol Hierarchy</h2>
        <div className="caption">Core × 1 · Sub × 2</div>
      </div>
      <div className="hierarchy">
        <div className="core-row">
          <div className="node core">
            <ChukSymbol size={120} color="#141414" accent="#d9531e" variant={WINNER}/>
            <div className="role">Core Symbol</div>
            <div className="name">축 · Axis</div>
            <div className="concept">RELIABLE · 신뢰</div>
          </div>
        </div>
        <svg width="100%" height="48" viewBox="0 0 1000 48" preserveAspectRatio="none">
          <line x1="500" y1="0" x2="500" y2="24" stroke="#141414" strokeWidth="1.5"/>
          <line x1="260" y1="24" x2="740" y2="24" stroke="#141414" strokeWidth="1.5"/>
          <line x1="260" y1="24" x2="260" y2="48" stroke="#141414" strokeWidth="1.5"/>
          <line x1="740" y1="24" x2="740" y2="48" stroke="#141414" strokeWidth="1.5"/>
        </svg>
        <div className="sub-row">
          <div className="node">
            <GearSymbol size={96} color="#141414" accent="#d9531e" variant={WINNER}/>
            <div className="role">Sub Symbol A</div>
            <div className="name">톱니바퀴 · Gear</div>
            <div className="concept">SEAMLESS · 절차</div>
          </div>
          <div className="node">
            <IcebergSymbol size={96} color="#141414" accent="#d9531e" variant={WINNER}/>
            <div className="role">Sub Symbol B</div>
            <div className="name">빙산 · Iceberg</div>
            <div className="concept">MEANINGFUL · 의미</div>
          </div>
        </div>
      </div>
      <div className="note">
        세 심볼이 공유하는 것: ① <b>팔각형 정점</b> (축의 접점 / Gear의 중심 / 빙산의 무게중심),
        ② <b>45° 챔퍼 종단</b>, ③ <b>동일한 8방향 축</b>.
      </div>
    </section>
  );
}

function Triad() {
  const rows = [
    { primary: true, name: '축', en: 'Axis', concept: 'Reliable · 신뢰',
      role: 'Core', keywords: ['안정적', '일관적', '흔들리지 않는'],
      desc: '무게를 받치는 수직의 축. 시스템의 모든 것이 이 한 선 위에서 균형을 잡는다.',
      symbol: <ChukSymbol size={'88%'} color="#f4f3ef" accent="#d9531e" variant={WINNER}/> },
    { name: '톱니바퀴', en: 'Gear', concept: 'Seamless · 절차',
      role: 'Sub A', keywords: ['연속적', '연결된', '맞물린'],
      desc: '하나가 돌면 다음이 돈다. 끊김 없이 맞물려 작동하는 흐름과 단계의 은유.',
      symbol: <GearSymbol size={'88%'} color="#141414" accent="#d9531e" variant={WINNER}/> },
    { name: '빙산', en: 'Iceberg', concept: 'Meaningful · 의미',
      role: 'Sub B', keywords: ['자연스러운', '본질적', '보이지 않는 깊이'],
      desc: '수면 위는 일부일 뿐. 보이는 것 아래에 더 많은 의미와 본질이 잠겨 있다.',
      symbol: <IcebergSymbol size={'88%'} color="#141414" accent="#d9531e" variant={WINNER}/> },
  ];
  return (
    <section>
      <div className="section-head">
        <div className="num">03</div>
        <h2>Metaphor · Concept · Role</h2>
        <div className="caption">시각 메타포 → 개념 → 역할</div>
      </div>
      <div className="triad">
        {rows.map((r, i) => (
          <div key={i} className={"cell" + (r.primary ? ' primary' : '')}>
            <div className="cap">{r.role}</div>
            <h3>{r.name} <span className="en">· {r.en}</span></h3>
            <div className="glyph-frame">{r.symbol}</div>
            <dl>
              <dt>Concept</dt><dd>{r.concept}</dd>
              <dt>Keywords</dt><dd>{r.keywords.join(' · ')}</dd>
            </dl>
            <div className="desc">{r.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Rules() {
  const items = [
    { n: 'R1', h: '팔각형 마스터 그리드', p: '모든 심볼·자모는 팔각형 바운딩 박스와 8방향 축 위에서 설계된다.' },
    { n: 'R2', h: '허용 각도', p: '0° · 45° · 90° · 135° 네 방향만. 원은 정팔각형으로 번역된다.' },
    { n: 'R3', h: '축의 무게 위계', p: '세로 축 > 방사선 > 접점. 접점은 방사선보다 작게.' },
    { n: 'R4', h: '45° 챔퍼 법칙', p: '모든 꺾임·종단은 45°로 잘라낸다. 심볼·글자 예외 없음. (v0.4에서 Gear 이빨·Iceberg 파셋에 강제 적용)' },
    { n: 'R5', h: '심볼 위계', p: '축은 핵심, 톱니·빙산은 보조. 보조는 축 없이는 단독으로 쓰이지 않는다.' },
    { n: 'R6', h: '팔각 정점 반복', p: '세 심볼 모두 "팔각형 정점"을 최소 하나씩 갖는다. 축—접점 / Gear—중심 / Iceberg—무게중심. (v0.4 신규)' },
    { n: 'R7', h: '색 위계', p: '잉크(#141414) · 크림(#f4f3ef) · 레드 액센트(#d9531e). 레드는 오직 "팔각 정점"에만.' },
    { n: 'R8', h: '타입 · 심볼 정렬', p: '글자 "공"의 가운데 점과 심볼의 팔각 정점은 같은 기준선 위에 놓인다.' },
    { n: 'R9', h: '로고 × 본문 공존', p: '축 로고와 Pretendard 본문은 같은 페이지에서 만나도 충돌하지 않는다. §08 4가지 DO/DON\'T로 정의. (v0.5 신규)' },
  ];
  return (
    <section>
      <div className="section-head">
        <div className="num">04</div>
        <h2>System Rules</h2>
        <div className="caption">9 Rules · v0.5 added R9</div>
      </div>
      <div className="rules">
        {items.map(r => (
          <div key={r.n} className="rule">
            <div className="n">{r.n}</div>
            <h4>{r.h}</h4>
            <p>{r.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── §05 · v0.5 신규: Logo × Body Type 공존 규칙 ─────────────
// 출처: SVG 판독 보고서 (FINAL: PASS / COMPATIBLE)
//   - 광선 stroke 0.48px @96 vs Pretendard stem 6.5px @96
//   - 막대 8px / cap 72.96px = 0.110
//   - 팔각형 외접 지름 6.4px @96, Pretendard ㅇ ≈60px → 9.38× 위계
//   - 광선 45° vs Pretendard ㅅ/ㅈ 65–70° → 차이 20–25°
//   - 막대와 본문이 동일 #141414 → 분리 배치 필수
function Coexist() {
  return (
    <section>
      <div className="section-head">
        <div className="num">05</div>
        <h2>Logo × Body Type 공존 규칙</h2>
        <div className="caption">두 보고서 · WARN → PASS / COMPATIBLE</div>
      </div>

      <div className="two-reports">
        <div className="tr-col">
          <div className="tr-tag">Report 1 · PNG only</div>
          <h4>SVG 미업로드 상태</h4>
          <div className="tr-verdict warn">FINAL: WARN / COMPATIBLE_WITH_RULES</div>
          <ul>
            <li>좌표·색상·정렬: PNG 기준 일치 ✓</li>
            <li>SVG 메타·DOM·Z-order: 검증 불가 — 원본 부재</li>
            <li>수직 광선: 막대와 동일색으로 중첩, 독립 식별 불가</li>
            <li>45° vs ㅅ: 추정 51–53° → 차이 6–8°, <b>충돌 위험 ✗</b></li>
            <li>결론: <b>회피 규칙 필요</b></li>
          </ul>
        </div>
        <div className="tr-col">
          <div className="tr-tag">Report 2 · SVG 확보 후</div>
          <h4>chuk-logo.svg 776 bytes 판독 완료</h4>
          <div className="tr-verdict pass">FINAL: PASS / COMPATIBLE</div>
          <ul>
            <li>viewBox <b>0 0 600 600</b>, 5개 가시 요소 정확</li>
            <li>정팔각형 정칙성: 변 길이 <b>15.30/15.32 교대</b>, 편차 0.016</li>
            <li>중심 (300.00, 300.00), 외접 R=20.00</li>
            <li>ㅅ/ㅈ 실측 <b>65–70°</b> 재반영 → Δ20–25°, <b>분리 ✓</b></li>
            <li>결론: <b>8/8 통과</b>, #141414 hex 충돌은 컨테이너 분리 조건부</li>
          </ul>
        </div>
      </div>

      <div className="coexist">
        <div className="cx-left">
          <div className="cx-tag">Origin · Audit Report</div>
          <h3>측정값이 만든 4+4 규칙</h3>
          <div style={{fontSize: 13, lineHeight: 1.65, color: 'var(--ink-2)'}}>
            축 로고 SVG는 좌표·색상·대칭·Z-order 모두 PASS.
            Pretendard 96px 본문과 함께 등장할 때의 호환성도 8/8 통과 — 단,
            <b style={{color:'var(--ink)'}}> 막대와 본문이 같은 #141414</b>이고,
            <b style={{color:'var(--ink)'}}> 광선 45°와 ㅅ/ㅈ 사선(65–70°)이 같은 사선 계열로 보일 위험</b>이 있어
            아래 8개 규칙으로 분리 배치를 강제한다.
          </div>
          <dl>
            <dt>스케일 환산</dt><dd>viewBox 600 → 96px (×0.16)</dd>
            <dt>광선 stroke</dt><dd>0.48px @96 · stem ≈ 6.5px</dd>
            <dt>막대 비율</dt><dd>w/h = 8 / 72.96 = 0.110</dd>
            <dt>팔각형 위계</dt><dd>지름 6.4px · ㅇ ≈ 60px → 9.38×</dd>
            <dt>각도 분리</dt><dd>광선 45° · ㅅ/ㅈ 65–70° (Δ20–25°)</dd>
            <dt>대비비</dt><dd>16.45 · 4.57 · 3.60</dd>
          </dl>
        </div>
        <div className="cx-right">
          <div className="cx-tag">Reference Lockup</div>
          <div className="cx-stage">
            <div className="lockup">
              <div style={{width: 120, height: 120}}>
                <ChukSymbol size={'100%'} color="#141414" accent="#d9531e" variant={WINNER}/>
              </div>
              <div className="word">축</div>
            </div>
          </div>
          <div style={{fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.06em', fontFamily: "'IBM Plex Mono', monospace"}}>
            symbol 120 · gap 22 · word 56/700/-0.03em
          </div>
        </div>
      </div>

      <div className="dodont">
        <div className="dd do">
          <div className="badge">DO · 01</div>
          <div className="stage">
            <div style={{display:'flex', alignItems:'center', gap: 14}}>
              <div style={{width: 64, height: 64}}>
                <ChukSymbol size={'100%'} color="#141414" accent="#d9531e" variant={WINNER}/>
              </div>
              <div style={{fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em'}}>축</div>
            </div>
          </div>
          <div className="label">컨테이너 분리</div>
          <div className="desc">로고와 본문이 같은 #141414일 때, 둘은 다른 박스/배경 영역에 둔다. 겹치면 식별 불가.</div>
          <div className="nums">min gap = symbol-width × 0.18</div>
        </div>

        <div className="dd do">
          <div className="badge">DO · 02</div>
          <div className="stage">
            <svg viewBox="0 0 200 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
              <line x1="30" y1="50" x2="90" y2="50" stroke="#141414" strokeWidth="0.48"/>
              <text x="110" y="58" fontSize="22" fontWeight="700" fill="#141414" fontFamily="system-ui">텍스트</text>
              <text x="30" y="82" fontSize="7" fill="#8a8a8a" fontFamily="monospace">0.48 px</text>
              <text x="110" y="82" fontSize="7" fill="#8a8a8a" fontFamily="monospace">stem ≈ 6.5 px</text>
            </svg>
          </div>
          <div className="label">Hairline 두께 유지</div>
          <div className="desc">96px 기준 광선 stroke 0.48px는 본문 stem의 1/13 — hairline 성격을 유지한다.</div>
          <div className="nums">stroke ≤ stem × 1/8</div>
        </div>

        <div className="dd do">
          <div className="badge">DO · 03</div>
          <div className="stage">
            <div style={{display:'flex', alignItems:'baseline', gap: 18}}>
              <div style={{fontSize: 84, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1}}>ㅇ</div>
              <svg viewBox="0 0 40 40" width="24" height="24">
                <path d="M 36.96,21.53 L 32.65,28 L 24.74,30.12 L 16.83,28 L 12.51,21.53 L 12.51,13.47 L 16.83,7 L 24.74,4.88 L 32.65,7 L 36.96,13.47 Z" fill="#d9531e" transform="translate(0 0)"/>
                <path d="M 30.39,22.65 L 22.65,30.39 L 17.35,30.39 L 9.61,22.65 L 9.61,17.35 L 17.35,9.61 L 22.65,9.61 L 30.39,17.35 Z" fill="#d9531e"/>
              </svg>
            </div>
          </div>
          <div className="label">크기 위계 ≥ 6×</div>
          <div className="desc">팔각형은 본문 ㅇ 대비 1/9 (6.4 vs 60px) 이하로 유지 — vertex mark 성격.</div>
          <div className="nums">octagon ≤ ㅇ × 0.16</div>
        </div>

        <div className="dd do">
          <div className="badge">DO · 04</div>
          <div className="stage">
            <svg viewBox="0 0 200 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
              <rect x="96" y="15" width="8" height="70" fill="#141414"/>
              <line x1="96" y1="50" x2="104" y2="50" stroke="#d9531e" strokeWidth="0"/>
              <text x="100" y="96" fontSize="7" textAnchor="middle" fill="#8a8a8a" fontFamily="monospace">x=300 · w=50</text>
            </svg>
          </div>
          <div className="label">수직축 대칭 보존</div>
          <div className="desc">막대는 viewBox 중심 x=300, w=50 구조 유지. 좌우 비대칭 lockup 금지.</div>
          <div className="nums">center.x ≡ 300 ± 0.1</div>
        </div>
      </div>

      <div className="dodont">
        <div className="dd dont">
          <div className="badge">DON'T · 01</div>
          <div className="stage" style={{position:'relative'}}>
            <div style={{fontSize: 36, fontWeight: 700, color: '#141414'}}>본문 위에 축</div>
            <div style={{position:'absolute', left:'46%', top:'10%', bottom:'10%', width: 6, background:'#141414'}}/>
          </div>
          <div className="label">#141414 겹침 금지</div>
          <div className="desc">본문 위에 같은 검정 막대를 올리지 않는다. 글자와 막대가 구분되지 않는다.</div>
          <div className="nums">overlap z-conflict</div>
        </div>

        <div className="dd dont">
          <div className="badge">DON'T · 02</div>
          <div className="stage">
            <div style={{display:'flex', alignItems:'center', gap: 4}}>
              <div style={{fontSize: 64, fontWeight: 700, lineHeight: 1}}>ㅅ</div>
              <svg viewBox="0 0 60 60" width="40" height="40">
                <line x1="8" y1="8" x2="52" y2="52" stroke="#141414" strokeWidth="1"/>
                <line x1="52" y1="8" x2="8" y2="52" stroke="#141414" strokeWidth="1"/>
              </svg>
            </div>
          </div>
          <div className="label">ㅅ/ㅈ 인접 배치 금지</div>
          <div className="desc">광선 45° vs ㅅ/ㅈ 사선 65–70°. 8px 이내 거리에서 같은 사선 계열로 읽힌다.</div>
          <div className="nums">min gap ≥ 8 px @96</div>
        </div>

        <div className="dd dont">
          <div className="badge">DON'T · 03</div>
          <div className="stage">
            <div style={{display:'flex', alignItems:'baseline', gap: 8}}>
              <div style={{fontSize: 64, fontWeight: 700, lineHeight: 1}}>ㅇ</div>
              <svg viewBox="0 0 60 60" width="56" height="56">
                <path d="M 55.4,22.96 L 45.45,42.69 L 34.55,49.4 L 22.96,49.4 L 5.6,37.04 L 5.6,22.96 L 14.55,9.31 L 25.45,2.6 L 37.04,5.6 L 55.4,22.96 Z" fill="none" stroke="#d9531e" strokeWidth="1.5"/>
              </svg>
            </div>
          </div>
          <div className="label">ㅇ 크기 팔각형 금지</div>
          <div className="desc">팔각형을 Pretendard ㅇ의 0.7×–1.3× 범위로 키우지 않는다. 닫힌 원형 도형으로 충돌.</div>
          <div className="nums">octagon ∉ [0.7×, 1.3×] of ㅇ</div>
        </div>

        <div className="dd dont">
          <div className="badge">DON'T · 04</div>
          <div className="stage">
            <svg viewBox="0 0 200 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
              <line x1="30" y1="50" x2="90" y2="50" stroke="#141414" strokeWidth="3"/>
              <text x="110" y="58" fontSize="18" fontWeight="700" fill="#141414" fontFamily="system-ui">본문</text>
              <text x="30" y="82" fontSize="7" fill="#d9531e" fontFamily="monospace">3 px ✗</text>
            </svg>
          </div>
          <div className="label">광선 굵기 금지</div>
          <div className="desc">광선 stroke를 본문 stem의 1/8 이상으로 키우지 않는다. hairline 위계가 깨진다.</div>
          <div className="nums">stroke > stem/8 → reject</div>
        </div>
      </div>

      <table className="audit-table">
        <thead>
          <tr>
            <th style={{width:'42%'}}>Pretendard 호환성 항목</th>
            <th style={{width:'30%'}}>측정값</th>
            <th style={{width:'12%'}}>판정</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>ㅇ vs 팔각형 외접지름</td><td className="num">60 / 6.4 = 9.38×</td><td className="pass">PASS</td><td>위계 분리</td></tr>
          <tr><td>곡률 차이 (ㅇ 곡선 vs 팔각 직선 8변)</td><td className="num">circle vs 8-gon</td><td className="pass">PASS</td><td>시각 언어 분리</td></tr>
          <tr><td>광선 stroke vs 본문 stem</td><td className="num">0.48 / 6.5 = 0.074</td><td className="pass">PASS</td><td>hairline</td></tr>
          <tr><td>막대 width / cap height</td><td className="num">8 / 72.96 = 0.110</td><td className="pass">PASS</td><td>한 글자 stem로 오인 안됨</td></tr>
          <tr><td>ㅁ vs 팔각형</td><td className="num">round-rect vs sharp octagon</td><td className="pass">PASS</td><td>모서리 반경 차이</td></tr>
          <tr><td>광선 45° vs ㅅ/ㅈ 사선</td><td className="num">45° vs 65–70° (Δ20–25°)</td><td className="pass">PASS</td><td>인접 8px 이내 금지</td></tr>
          <tr><td>본문 컬럼 720px 대비 막대폭</td><td className="num">8 ≤ 180 (≤ 25%)</td><td className="pass">PASS</td><td>컬럼으로 오인 안됨</td></tr>
          <tr><td>본문 검정 vs 막대 검정</td><td className="num">#141414 ≡ #141414</td><td className="pass">PASS*</td><td>* 컨테이너 분리 조건부</td></tr>
        </tbody>
      </table>

      <div className="note">
        결론: <b>FINAL — PASS / COMPATIBLE</b>. 8/8 항목 통과, 단 검정 hex 동일성 1건은
        DO·01(컨테이너 분리)을 지키는 조건부 통과. 위 8개 규칙은 R9의 운영 디테일이며,
        Lockup·Document·Slide·Web 모든 매체에 동일하게 적용한다.
      </div>
    </section>
  );
}

function Combinations() {
  return (
    <section>
      <div className="section-head">
        <div className="num">06</div>
        <h2>Combinations</h2>
        <div className="caption">축 + 보조의 결합 용법</div>
      </div>
      <div className="combo">
        <ComboCell title="축 단독" tag="HERO">
          <div style={{display:'grid', placeItems:'center', width:'100%', height:'100%'}}>
            <div style={{width:'60%', maxWidth: 220, aspectRatio:'1/1'}}>
              <ChukSymbol size={'100%'} color="#141414" accent="#d9531e" variant={WINNER}/>
            </div>
          </div>
          <p>메인 브랜드 표기. 제품 헤로, 공식 문서 커버에 사용.</p>
        </ComboCell>
        <ComboCell title="축 + 톱니바퀴" tag="PROCESS">
          <div style={{display:'flex', alignItems:'center', gap: '8%', justifyContent:'center', width:'100%'}}>
            <div style={{flex:'0 1 50%', maxWidth: 180, aspectRatio:'1/1'}}>
              <ChukSymbol size={'100%'} color="#141414" accent="#d9531e" variant={WINNER}/>
            </div>
            <div style={{width:1, height: '50%', background:'#141414', opacity:0.3, flex:'0 0 1px'}}/>
            <div style={{flex:'0 1 32%', maxWidth: 110, aspectRatio:'1/1'}}>
              <GearSymbol size={'100%'} color="#141414" accent="#d9531e" variant={WINNER}/>
            </div>
          </div>
          <p>프로세스·운영·자동화. 두 심볼 모두 팔각 정점 + 45° 챔퍼.</p>
        </ComboCell>
        <ComboCell title="축 + 빙산" tag="DEPTH">
          <div style={{display:'flex', alignItems:'center', gap: '8%', justifyContent:'center', width:'100%'}}>
            <div style={{flex:'0 1 50%', maxWidth: 180, aspectRatio:'1/1'}}>
              <ChukSymbol size={'100%'} color="#141414" accent="#d9531e" variant={WINNER}/>
            </div>
            <div style={{width:1, height: '50%', background:'#141414', opacity:0.3, flex:'0 0 1px'}}/>
            <div style={{flex:'0 1 32%', maxWidth: 110, aspectRatio:'1/1'}}>
              <IcebergSymbol size={'100%'} color="#141414" accent="#d9531e" variant={WINNER}/>
            </div>
          </div>
          <p>본질·리서치. 수중 무게중심의 팔각 정점이 "보이지 않는 핵심"을 표현.</p>
        </ComboCell>
      </div>
      <div className="note">
        세 심볼을 동시에 배치하지 않습니다. 하나의 서사에는 <b>축 + 하나의 보조</b>만.
      </div>
    </section>
  );
}

function ComboCell({ title, tag, children }) {
  const arr = React.Children.toArray(children);
  const stage = arr[0]; const body = arr.slice(1);
  return (
    <div className="combo-cell">
      <div className="head"><h4>{title}</h4><div className="tag">{tag}</div></div>
      <div className="stage">{stage}</div>
      {body}
    </div>
  );
}

function Palette() {
  const swatches = [
    { n: 'Ink', c: '#141414', fg: '#f4f3ef' },
    { n: 'Ink-2', c: '#4a4a4a', fg: '#f4f3ef' },
    { n: 'Cream', c: '#f4f3ef', fg: '#141414', border: true },
    { n: 'Paper', c: '#faf9f5', fg: '#141414', border: true },
    { n: 'Accent', c: '#d9531e', fg: '#f4f3ef' },
  ];
  return (
    <section>
      <div className="section-head">
        <div className="num">07</div>
        <h2>Palette</h2>
        <div className="caption">5 tokens · Accent는 팔각 정점에만</div>
      </div>
      <div className="palette">
        {swatches.map(s => (
          <div key={s.n} className="sw" style={{
            background: s.c, color: s.fg,
            borderRight: s.border ? '1px solid #e6e1d6' : undefined,
          }}>
            <div className="swn">{s.n}</div>
            <div className="swc">{s.c.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <span>축 · <b>Design System v0.4</b></span>
      <span>Octagonal Grid · Vertex Motif · 45° Chamfer Law</span>
      <span>© Chuk 2026</span>
    </footer>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
