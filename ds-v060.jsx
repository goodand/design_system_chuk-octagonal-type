// ds-v060.jsx — Chuk Design System v0.6.0
// Changes from v0.5.1:
//  - R4: chamfer scope clarified (Axis ray/bar exempt as orthogonal datum)
//  - R7: accent_symbol vs accent_ui split (same hex, separated semantics)
//  - Contrast table rewritten with explicit pair labels
//  - Visible element counts split into 4 named counts
//  - SVG primitive made transparent (background rect removed)
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
      <TypeScale />
      <Footer />
    </div>
  );
}

function Masthead() {
  return (
    <div className="masthead">
      <div className="brand">축 <span className="sep">/</span> CHUK DESIGN SYSTEM</div>
      <div className="meta">v0.6.0 · 2026 · Canonical Release</div>
    </div>
  );
}

function Hero() {
  return (
    <div className="hero">
      <div>
        <div className="eyebrow">Design System v0.6.0 — Canonical Release</div>
        <h1>하나의 <span className="mark">축</span>,<br/>두 개의 보조,<br/>하나의 문법.</h1>
        <p className="lede">
          v0.6.0은 외부 평가 9건을 모두 닫은 canonical release입니다.
          <b> R1–R9</b>를 PDF 원문에 정렬하고, <b>accent</b>를 symbol/UI로 분리하고,
          <b> R4 챔퍼 법칙</b>의 적용 범위를 명시하고, contrast table을 pair label로 재작성했습니다.
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
    { tag: 'PROPOSAL A', title: '팔각 정점 반복', subtitle: 'Octagonal Vertex Motif',
      gearVar: 'vertex', iceVar: 'vertex',
      verdict: '중심에 "정점" 하나씩. 축과의 문법적 반복이 생긴다.' },
    { tag: 'PROPOSAL B', title: '45° 챔퍼 법칙', subtitle: 'Edge-Language Law',
      gearVar: 'chamfer', iceVar: 'chamfer',
      verdict: 'Gear 이빨·Iceberg 파셋만 챔퍼. Axis ray/bar는 orthogonal datum 예외 (R4 v0.6.0).' },
    { tag: 'FINAL · A + B', title: '정점 + 챔퍼 결합', subtitle: 'Combined · Selected',
      gearVar: 'final', iceVar: 'final', winner: true,
      verdict: '형태 반복(A) × 표면 규칙(B). 세 심볼이 "같은 장인의 손"에서 나온 것처럼 읽힌다.' },
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
    { n: 'R1', h: '팔각형 마스터 그리드', p: '모든 심볼·자모는 팔각형 바운딩 박스와 8방향 축 위에서 설계된다. 정점 각도 22.5° / 67.5° / 112.5° / 157.5°.' },
    { n: 'R2', h: '허용 각도', p: '0° · 45° · 90° · 135° 네 방향만. 30° / 60° / 임의 각도 금지.' },
    { n: 'R3', h: '축의 무게 위계', p: '세로 막대(가장 무거움) > 수평 광선 > 대각 광선. 모든 사이즈에서 위계 보존.' },
    { n: 'R4', h: '45° 챔퍼 법칙 (v0.6.0 정정)', p: '챔퍼는 Gear primitive의 facet과 glyph terminal에만 적용. Axis primitive의 ray·bar terminal은 orthogonal datum으로서 예외 — 축의 직교성 보존.' },
    { n: 'R5', h: '심볼 위계', p: 'Core × 1 (축) · Sub × 2 (Gear, Iceberg). 세 보조를 동시에 사용하지 않는다.' },
    { n: 'R6', h: '팔각 정점 반복', p: '팔각형의 8개 정점은 시스템 전반의 anchor point — UI marker, chart, layout grid가 이 위치에 정렬된다.' },
    { n: 'R7', h: '색 위계 (v0.6.0 정정)', p: 'Symbol geometry 내부: accent는 팔각 정점에만. UI 영역: accent는 status/interaction marker(rule num, verdict pill, badge)에만. 본문·border 사용 금지.' },
    { n: 'R8', h: '타입·심볼 정렬', p: 'Logo lockup baseline은 Pretendard cap height에 정렬. 심볼 막대는 글자 vertical axis(center.x ≡ glyph centerline)에 정렬.' },
    { n: 'R9', h: '로고 × 본문 공존', p: '4 DO + 4 DON\'T (§05 dodont). r9_operating_rules로 운영 디테일 분리.' },
  ];
  return (
    <section>
      <div className="section-head">
        <div className="num">04</div>
        <h2>System Rules · v0.6.0 Canonical</h2>
        <div className="caption">9 Rules · PDF 원문 동기화</div>
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
            <li>45° vs ㅅ: 추정 51–53° → 차이 6–8°, <b>충돌 위험 ✗</b></li>
            <li>결론: <b>회피 규칙 필요</b></li>
          </ul>
        </div>
        <div className="tr-col">
          <div className="tr-tag">Report 2 · SVG 확보 후</div>
          <h4>chuk-logo.v0.6.0.svg 706 bytes 판독 완료</h4>
          <div className="tr-verdict pass">FINAL: PASS / COMPATIBLE</div>
          <ul>
            <li>viewBox <b>0 0 600 600</b>, transparent primitive (배경 rect 제거)</li>
            <li>logo_primitives <b>6</b> · semantic_groups <b>3</b></li>
            <li>정팔각형 정칙성: 변 길이 <b>15.30/15.32</b>, 편차 0.016</li>
            <li>ㅅ/ㅈ 실측 <b>65–70°</b> → Δ20–25°, <b>분리 ✓</b></li>
            <li>결론: <b>8/8 통과</b>, #141414 hex 충돌은 컨테이너 분리 조건부</li>
          </ul>
        </div>
      </div>

      <div className="coexist">
        <div className="cx-left">
          <div className="cx-tag">Origin · Audit Report</div>
          <h3>측정값이 만든 4+4 규칙</h3>
          <div className="body-text">
            축 로고 SVG는 좌표·색상·대칭·Z-order 모두 PASS.
            Pretendard 96px 본문과 함께 등장할 때의 호환성도 8/8 통과.
          </div>
          <dl>
            <dt>스케일 환산</dt><dd>viewBox 600 → 96px (×0.16)</dd>
            <dt>광선 stroke</dt><dd>0.48px @96 · stem ≈ 6.5px</dd>
            <dt>막대 비율</dt><dd>w/h = 8 / 72.96 = 0.110</dd>
            <dt>팔각형 위계</dt><dd>지름 6.4px · ㅇ ≈ 60px → 9.38×</dd>
            <dt>각도 분리</dt><dd>광선 45° · ㅅ/ㅈ 65–70° (Δ20–25°)</dd>
            <dt>대비비</dt><dd>see contrast_table</dd>
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
          <div className="lockup-spec">
            symbol 120 · gap 22 · word 56/700/-0.03em
          </div>
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
          <tr><td>곡률 차이</td><td className="num">circle vs 8-gon</td><td className="pass">PASS</td><td>시각 언어 분리</td></tr>
          <tr><td>광선 stroke vs 본문 stem</td><td className="num">0.48 / 6.5 = 0.074</td><td className="pass">PASS</td><td>hairline</td></tr>
          <tr><td>막대 width / cap height</td><td className="num">8 / 72.96 = 0.110</td><td className="pass">PASS</td><td>한 글자 stem로 오인 안됨</td></tr>
          <tr><td>ㅁ vs 팔각형</td><td className="num">round-rect vs sharp octagon</td><td className="pass">PASS</td><td>모서리 반경 차이</td></tr>
          <tr><td>광선 45° vs ㅅ/ㅈ 사선</td><td className="num">45° vs 65–70° (Δ20–25°)</td><td className="pass">PASS</td><td>인접 8px 이내 금지</td></tr>
          <tr><td>본문 컬럼 720px 대비 막대폭</td><td className="num">8 ≤ 180 (≤ 25%)</td><td className="pass">PASS</td><td>컬럼으로 오인 안됨</td></tr>
          <tr><td>본문 검정 vs 막대 검정</td><td className="num">#141414 ≡ #141414</td><td className="pass">PASS*</td><td>* 컨테이너 분리 조건부</td></tr>
        </tbody>
      </table>

      <div className="contrast-table-wrap">
        <h4 className="ct-title">Contrast Table · v0.6.0 (pair labels explicit)</h4>
        <table className="audit-table">
          <thead>
            <tr>
              <th>Foreground</th>
              <th>Background</th>
              <th>Ratio</th>
              <th>Verdict</th>
              <th>Use</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>ink #141414</td><td>bg #f4f3ef</td><td className="num">16.59</td><td className="pass">AAA</td><td>primary body text</td></tr>
            <tr><td>ink #141414</td><td>paper #faf9f5</td><td className="num">17.10</td><td className="pass">AAA</td><td>card body text</td></tr>
            <tr><td>ink-subtle #4a4a4a</td><td>bg #f4f3ef</td><td className="num">8.34</td><td className="pass">AAA</td><td>secondary text</td></tr>
            <tr><td>ink-muted #8a8a8a</td><td>bg #f4f3ef</td><td className="num">3.30</td><td>AA Large</td><td>captions only</td></tr>
            <tr><td>accent #d9531e</td><td>bg #f4f3ef</td><td className="num">3.63</td><td>AA Large</td><td>vertex/UI status — never body</td></tr>
            <tr><td>accent #d9531e</td><td>ink #141414</td><td className="num">4.57</td><td className="pass">AA</td><td>accent on dark surface</td></tr>
            <tr><td>paper #faf9f5</td><td>ink #141414</td><td className="num">16.45</td><td className="pass">AAA</td><td>inverted text on dark stage</td></tr>
            <tr><td>line #e6e1d6</td><td>bg #f4f3ef</td><td className="num">1.17</td><td>non-text</td><td>dividers only</td></tr>
          </tbody>
        </table>
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
    { n: 'ink',         c: '#141414', fg: '#faf9f5', usage: 'body / structural' },
    { n: 'ink-subtle',  c: '#4a4a4a', fg: '#faf9f5', usage: 'secondary text' },
    { n: 'ink-muted',   c: '#8a8a8a', fg: '#faf9f5', usage: 'captions / meta' },
    { n: 'line',        c: '#e6e1d6', fg: '#141414', border: true, usage: 'dividers / borders' },
    { n: 'bg',          c: '#f4f3ef', fg: '#141414', border: true, usage: 'page surface' },
    { n: 'paper',       c: '#faf9f5', fg: '#141414', border: true, usage: 'raised cards' },
    { n: 'accent',      c: '#d9531e', fg: '#faf9f5', usage: 'see accent_scope' },
    { n: 'grid-guide',  c: '#cfd2d8', fg: '#141414', border: true, usage: 'tech drawings' },
  ];
  return (
    <section>
      <div className="section-head">
        <div className="num">07</div>
        <h2>Palette</h2>
        <div className="caption">8 CORE tokens · design.v0.6.0.md</div>
      </div>
      <div className="palette palette-8">
        {swatches.map(s => (
          <div key={s.n} className="sw" style={{
            background: s.c, color: s.fg,
            borderRight: s.border ? '1px solid #e6e1d6' : undefined,
          }}>
            <div className="swn">{s.n}</div>
            <div className="swu">{s.usage}</div>
            <div className="swc">{s.c.toUpperCase()}</div>
          </div>
        ))}
      </div>
      <div className="note">
        <b>accent</b>는 동일 hex이지만 의미상 둘로 분리: <span className="mono">accent_symbol</span> (octagon vertex 전용) ·
        <span className="mono"> accent_ui</span> (rule num · verdict pill · badge). design-extension.v0.6.0.md → accent_scope 참조.
      </div>
    </section>
  );
}

function TypeScale() {
  const styles = [
    { token: 'display-hero',     size: '76 / 700 / 1.0',   tracking: '-0.035em', sample: '하나의 축',                    usage: 'Hero h1 · cover titles · 1 per page',      kind: 'pretendard' },
    { token: 'headline-section', size: '26 / 700 / 1.2',   tracking: '-0.02em',  sample: 'Logo × Body Type 공존',         usage: 'section h2 · §-numbered headings',          kind: 'pretendard' },
    { token: 'headline-card',    size: '18 / 700 / 1.3',   tracking: '-0.01em',  sample: '컨테이너 분리',                  usage: 'rule cards · combo cells · DO/DON\'T',     kind: 'pretendard' },
    { token: 'body-lede',        size: '17 / 400 / 1.65',  tracking: '-0.01em',  sample: '두 시스템은 같은 평면에서 만나지 않는다.',  usage: 'hero lede · section intros',  kind: 'pretendard' },
    { token: 'body-main',        size: '14 / 400 / 1.6',   tracking: '-0.01em',  sample: '축 로고와 Pretendard 본문은 같은 페이지에서 만나도 충돌하지 않는다.', usage: 'default running text', kind: 'pretendard' },
    { token: 'body-small',       size: '12 / 400 / 1.6',   tracking: '0',        sample: '* 컨테이너 분리 조건부 통과.',  usage: 'captions · audit table · note',          kind: 'pretendard' },
    { token: 'label-mono',       size: '11 / 500 / 1.2',   tracking: '0.1em',    sample: 'FINAL: PASS / COMPATIBLE',         usage: 'section numbers · verdict tags',           kind: 'mono' },
    { token: 'eyebrow',          size: '10 / 500 / 1.0',   tracking: '0.24em',   sample: 'DESIGN SYSTEM v0.6.0',                 usage: 'rv tags · cap text · meta',                kind: 'mono', upper: true },
    { token: 'meta-data',        size: '10 / 400 / 1.6',   tracking: '0.02em',   sample: '0.48 px @96 · stem 6.5 px',           usage: 'audit numbers · params · footnotes',     kind: 'mono' },
  ];
  const renderSample = (st) => {
    const [fontSize, fontWeight, lineHeight] = st.size.split(' / ');
    const family = st.kind === 'mono' ? "ui-monospace, 'SF Mono', Menlo, monospace" : "'Pretendard Variable', Pretendard, -apple-system, system-ui, sans-serif";
    return (
      <div style={{
        fontFamily: family,
        fontSize: fontSize + 'px',
        fontWeight,
        lineHeight,
        letterSpacing: st.tracking,
        color: 'var(--ink)',
        textTransform: st.upper ? 'uppercase' : 'none',
        wordBreak: 'keep-all',
      }}>{st.sample}</div>
    );
  };
  return (
    <section>
      <div className="section-head">
        <div className="num">08</div>
        <h2>Type Scale</h2>
        <div className="caption">Pretendard 정본 · 9 styles · v0.6.0 stack</div>
      </div>
      <div className="typescale">
        {styles.map(st => (
          <div key={st.token} className={"ts-row" + (st.kind === 'mono' ? ' ts-mono' : '')}>
            <div className="ts-meta">
              <div className="ts-token">{st.token}</div>
              <div className="ts-spec mono">{st.size}</div>
              <div className="ts-track mono">{st.tracking}</div>
              <div className="ts-usage">{st.usage}</div>
            </div>
            <div className="ts-sample">{renderSample(st)}</div>
          </div>
        ))}
      </div>
      <div className="note">
        본문은 <b>'Pretendard Variable', Pretendard, -apple-system, system-ui, sans-serif</b> stack — design.v0.6.0.md과 1:1 동기화.
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <span>축 · <b>Design System v0.6.0</b></span>
      <span>Octagonal Grid · Vertex Motif · Orthogonal Datum</span>
      <span>© Chuk 2026</span>
    </footer>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
