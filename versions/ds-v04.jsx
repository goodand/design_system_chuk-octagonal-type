// ds-v04.jsx — Chuk Design System v0.4
// Review round: Sub-symbol refinement.
// Goal — make Gear & Iceberg share the same visual grammar as 축:
//   (A) Octagonal vertex motif repeated across all three symbols.
//   (B) 45° chamfer law applied without exception.
//   (C) Solid/outline rhythm — optional, kept as-is.
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
      <TypeStress />
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
      <div className="meta">v0.4 · 2026 · Sub-Symbol Refinement</div>
    </div>
  );
}

function Hero() {
  return (
    <div className="hero">
      <div>
        <div className="eyebrow">Design System v0.4 — Release Notes</div>
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
  ];
  return (
    <section>
      <div className="section-head">
        <div className="num">04</div>
        <h2>System Rules</h2>
        <div className="caption">8 Rules · v0.4 updated R4·R6·R7</div>
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

function TypeStress() {
  return (
    <section>
      <div className="section-head">
        <div className="num">05</div>
        <h2>Type System · Stress Test</h2>
        <div className="caption">"젊은공주" 4글자에서 배운 것</div>
      </div>
      <div className="typeboard">
        <TypeCell label="Core" char="공" note="축이 바로 드러나는 기준 글자" />
        <TypeCell label="Hollow" char="은" note="ㅇ의 팔각형 + 받침 구조" />
        <TypeCell label="Complex" char="젊" note="종성 클러스터(ㄻ)의 한계 사례" />
        <TypeCell label="Diagonal" char="주" note="ㅈ·ㅜ의 45° 대각 조합" />
      </div>
      <div className="note">
        결론: 기본 규칙은 유지 가능. 종성 ㄹ의 형태와 ㅈ 다리의 교차각은 v0.5 과제로 이월.
      </div>
    </section>
  );
}

function TypeCell({ label, char, note }) {
  const HasGlyph = typeof window.Glyph === 'function';
  return (
    <div className="tb-cell">
      <div className="label">{label}</div>
      <div style={{width: 140, height: 140}}>
        {HasGlyph
          ? <window.Glyph char={char} size={140} weight={1.8} chamfer={1.8}/>
          : <div style={{fontSize: 120, fontWeight: 700, lineHeight: 1, textAlign:'center'}}>{char}</div>}
      </div>
      <div className="char">{char} · {note}</div>
    </div>
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
