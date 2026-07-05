// ds-v03.jsx — Chuk Design System v0.3
// Review round: "접점" variant exploration + winner applied globally.
const { useState } = React;

// The winning variant, chosen from the 4 proposals (details in ReviewSection below).
const WINNER = 'final';

function App() {
  return (
    <div className="page">
      <Masthead />
      <Hero />
      <ReviewSection />
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
      <div className="meta">v0.3 · 2026 · Contact-Point Refinement</div>
    </div>
  );
}

function Hero() {
  return (
    <div className="hero">
      <div>
        <div className="eyebrow">Design System v0.3 — Release Notes</div>
        <h1>하나의 <span className="mark">축</span>,<br/>두 개의 보조,<br/>하나의 그리드.</h1>
        <p className="lede">
          v0.3은 <b>축 심볼의 "접점"</b>을 재설계했습니다.
          원형 접점이 과도하게 드러나는 문제를 해결하기 위해 4가지 시안을 검토,
          <b>세로선을 두껍게 · 방사선을 가늘게 · 접점을 팔각형으로 축소</b>하는 방향을 채택했습니다.
          이로써 축 심볼은 Gear의 팔각형 언어와 자연스럽게 호응합니다.
        </p>
      </div>
      <div className="hero-mark">
        <ChukSymbol size={'85%'} color="#141414" accent="#d9531e" variant={WINNER}/>
      </div>
    </div>
  );
}

// ── 접점 variant review ─────────────────────────────────────────────
function ReviewSection() {
  const options = [
    { tag: '(1) VALUE', title: '명도 낮춤', variant: 'value',
      verdict: '접점이 배경에 녹아 축의 중심성이 약해진다. 레드가 주던 포인트가 완전히 사라짐.',
      params: 'dot · #9a9a9a (gray-600)\nr 40 · axis 38' },
    { tag: '(2) HUE', title: '색상 변경 (ink)', variant: 'hue',
      verdict: '톤은 통일되지만 접점이 축 자체와 분리되지 않아 "점"이라는 역할이 희석.',
      params: 'dot · #141414 (ink)\nr 40 · axis 38' },
    { tag: '(3) SCALE', title: '축 두껍게 · 접점 축소', variant: 'scale',
      verdict: '위계가 또렷해진다. 축이 비로소 "축"으로 읽히고 접점은 보조 역할로 물러남.',
      params: 'axis 52 · rays 3\ndot · circle r22' },
    { tag: '(4) SHAPE', title: '접점을 팔각형으로', variant: 'shape',
      verdict: 'Gear의 팔각형 언어와 일관성이 생긴다. 접점이 "그리드 위의 정점"처럼 읽힘.',
      params: 'axis 38 · rays 6\ndot · octagon r32' },
    { tag: 'FINAL', title: '(3) + (4) 결합', variant: 'final',
      verdict: '세 심볼 전체가 동일한 팔각 그리드 언어로 수렴. 축은 기둥, 접점은 정점, Gear는 확장.\n→ v0.3 채택.',
      params: 'axis 50 · rays 3\ndot · octagon r20' },
  ];

  return (
    <section>
      <div className="section-head">
        <div className="num">01</div>
        <h2>Design Review · 접점 Refinement</h2>
        <div className="caption">4 proposals → 1 winner</div>
      </div>
      <div className="review">
        {options.map((o, i) => {
          const last = i === options.length - 1;
          return (
            <div className="rv" key={i}>
              <div className="tag">{o.tag}</div>
              <h5>{o.title}</h5>
              <div className="stage">
                <ChukSymbol size={'100%'} color={last ? '#f4f3ef' : '#141414'} accent="#d9531e" variant={o.variant}/>
              </div>
              <div className="verdict">{o.verdict}</div>
              <div className="params" style={{whiteSpace:'pre-line'}}>{o.params}</div>
              {last && <div className="mark">★ Selected</div>}
            </div>
          );
        })}
      </div>
      <div className="note">
        원형 접점은 시선을 지나치게 끌어 축의 수직성을 약화시켰습니다.
        (3)의 <b>스트로크 위계 재분배</b>와 (4)의 <b>팔각형화</b>를 결합함으로써,
        접점은 <b>"Octagonal Master Grid의 한 정점"</b>으로 정확히 의미화됩니다.
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
            <GearSymbol size={96} color="#141414"/>
            <div className="role">Sub Symbol A</div>
            <div className="name">톱니바퀴 · Gear</div>
            <div className="concept">SEAMLESS · 절차</div>
          </div>
          <div className="node">
            <IcebergSymbol size={96} color="#141414"/>
            <div className="role">Sub Symbol B</div>
            <div className="name">빙산 · Iceberg</div>
            <div className="concept">MEANINGFUL · 의미</div>
          </div>
        </div>
      </div>
      <div className="note">
        세 심볼 모두 팔각형 정점을 공유합니다. 축의 접점, Gear의 톱니 8개, 빙산의 45° 파셋 — 모두 동일한 8방향 축 위에 있습니다.
      </div>
    </section>
  );
}

function Triad() {
  const rows = [
    {
      primary: true, name: '축', en: 'Axis', concept: 'Reliable · 신뢰',
      role: 'Core',
      keywords: ['안정적', '일관적', '흔들리지 않는'],
      desc: '무게를 받치는 수직의 축. 시스템의 모든 것이 이 한 선 위에서 균형을 잡는다.',
      symbol: <ChukSymbol size={'88%'} color="#f4f3ef" accent="#d9531e" variant={WINNER}/>,
    },
    {
      name: '톱니바퀴', en: 'Gear', concept: 'Seamless · 절차',
      role: 'Sub A',
      keywords: ['연속적', '연결된', '맞물린'],
      desc: '하나가 돌면 다음이 돈다. 끊김 없이 맞물려 작동하는 흐름과 단계의 은유.',
      symbol: <GearSymbol size={'88%'} color="#141414"/>,
    },
    {
      name: '빙산', en: 'Iceberg', concept: 'Meaningful · 의미',
      role: 'Sub B',
      keywords: ['자연스러운', '본질적', '보이지 않는 깊이'],
      desc: '수면 위는 일부일 뿐. 보이는 것 아래에 더 많은 의미와 본질이 잠겨 있다.',
      symbol: <IcebergSymbol size={'88%'} color="#141414"/>,
    },
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
    { n: 'R3', h: '축의 무게 위계', p: '세로 축 > 방사선 > 접점. v0.3부터 접점은 방사선보다 작게 쓴다.' },
    { n: 'R4', h: '45° 챔퍼', p: '꺾임·종단은 항상 45°로 잘라낸다. 직각을 피하고, 과한 라운드를 피한다.' },
    { n: 'R5', h: '심볼 위계', p: '축은 핵심, 톱니·빙산은 보조. 보조는 축 없이는 단독으로 쓰이지 않는다.' },
    { n: 'R6', h: '접점은 팔각형', p: '모든 "접점/정점"은 팔각형으로 그린다. 원은 오직 Gear의 중앙 축 구멍에만.' },
    { n: 'R7', h: '색 위계', p: '잉크(#141414) · 크림(#f4f3ef) · 레드 액센트(#d9531e). 레드는 축의 접점에만.' },
    { n: 'R8', h: '타입 · 심볼 정렬', p: '글자 "공"의 가운데 점과 축 심볼의 중심 정점은 같은 기준선 위에 놓인다.' },
  ];
  return (
    <section>
      <div className="section-head">
        <div className="num">04</div>
        <h2>System Rules</h2>
        <div className="caption">8 Rules · v0.3 updated</div>
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
        "젊은공주"는 폰트 시스템이 <b>가장 어려운 한글 조합</b>에서도 무너지지 않는지 확인하기 위한 스트레스 테스트였습니다.
        결론: 기본 규칙은 유지 가능하되, 종성 ㄹ의 형태와 ㅈ 다리의 교차각은 별도 최적화가 필요합니다 — v0.4 과제로 이월.
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
              <GearSymbol size={'100%'} color="#141414"/>
            </div>
          </div>
          <p>프로세스·운영·자동화. 두 심볼 모두 팔각형 언어로 수렴.</p>
        </ComboCell>
        <ComboCell title="축 + 빙산" tag="DEPTH">
          <div style={{display:'flex', alignItems:'center', gap: '8%', justifyContent:'center', width:'100%'}}>
            <div style={{flex:'0 1 50%', maxWidth: 180, aspectRatio:'1/1'}}>
              <ChukSymbol size={'100%'} color="#141414" accent="#d9531e" variant={WINNER}/>
            </div>
            <div style={{width:1, height: '50%', background:'#141414', opacity:0.3, flex:'0 0 1px'}}/>
            <div style={{flex:'0 1 32%', maxWidth: 110, aspectRatio:'1/1'}}>
              <IcebergSymbol size={'100%'} color="#141414"/>
            </div>
          </div>
          <p>본질·리서치. 축이 수면 위의 기둥, 빙산이 아래 잠긴 의미.</p>
        </ComboCell>
      </div>
      <div className="note">
        세 심볼을 동시에 배치하지 않습니다. 하나의 서사에는 <b>축 + 하나의 보조</b>만 등장합니다.
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
        <div className="caption">5 tokens · Accent는 축의 접점에만</div>
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
      <span>축 · <b>Design System v0.3</b></span>
      <span>Octagonal Grid · 3-Symbol Hierarchy · IBM Plex Sans KR (local)</span>
      <span>© Chuk 2026</span>
    </footer>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
