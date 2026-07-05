// weight-lab.jsx — Three approaches to the "Bold looks like a shape, not a letter" problem.
// A. Weight redefine   — Bold=2.3u, rebuild Thin/Regular geometrically below it
// B. 4-weight expand   — Thin/Reg/Bold live in letter range; 3.0u split off as Display
// C. Chamfer ramp      — keep old weights, grow chamfer% per weight to lighten Bold visually

const GRID = 16;
const U = 36;
const VB = GRID * U;

// ── primitives ────────────────────────────────────────────────────
// chL/chR: chamfer flags for the left/right end-caps (H) or top/bottom (V).
// When a stroke attaches to another stroke, the attached end should be flat
// (no chamfer) so the join is clean. Free ends stay chamfered.
function EndH({ x1, x2, yc, w, ch, chL=true, chR=true, fill='#141414' }) {
  const t = yc - w/2, b = yc + w/2;
  const cL = chL ? ch : 0, cR = chR ? ch : 0;
  const d =
    `M ${x1+cL} ${t} L ${x2-cR} ${t} L ${x2} ${t+cR} L ${x2} ${b-cR}` +
    ` L ${x2-cR} ${b} L ${x1+cL} ${b} L ${x1} ${b-cL} L ${x1} ${t+cL} Z`;
  return <path d={d} fill={fill}/>;
}
function EndV({ xc, y1, y2, w, ch, chT=true, chB=true, fill='#141414' }) {
  const l = xc - w/2, r = xc + w/2;
  const cT = chT ? ch : 0, cB = chB ? ch : 0;
  const d =
    `M ${l+cT} ${y1} L ${r-cT} ${y1} L ${r} ${y1+cT} L ${r} ${y2-cB}` +
    ` L ${r-cB} ${y2} L ${l+cB} ${y2} L ${l} ${y2-cB} L ${l} ${y1+cT} Z`;
  return <path d={d} fill={fill}/>;
}

function Grid() {
  const lines = [];
  for (let i = 0; i <= GRID; i++) {
    lines.push(<line key={'h'+i} x1={0} x2={VB} y1={i*U} y2={i*U}
      stroke="#00000010" strokeWidth={i%4===0?1:0.5}/>);
    lines.push(<line key={'v'+i} x1={i*U} x2={i*U} y1={0} y2={VB}
      stroke="#00000010" strokeWidth={i%4===0?1:0.5}/>);
  }
  return <g>{lines}</g>;
}

// Render the 4 test glyphs (ㅡ ㅣ ㅜ ㅏ) for a given weight spec.
function GlyphSet({ wh, wv, ch }) {
  const Wh = wh * U, Wv = wv * U, CH = ch * U;
  const y  = VB/2, xc = VB/2;
  const x1 = 2*U, x2 = 14*U;
  const y1 = 2*U, y2 = 14*U;
  const mk = (content, lbl) => (
    <div className="gc">
      <svg viewBox={`0 0 ${VB} ${VB}`}>
        <Grid/>
        {content}
      </svg>
      <div className="lbl">{lbl}</div>
    </div>
  );
  return (
    <div className="glyphs">
      {mk(<EndH x1={x1} x2={x2} yc={y} w={Wh} ch={CH}/>, 'ㅡ')}
      {mk(<EndV xc={xc} y1={y1} y2={y2} w={Wv} ch={CH}/>, 'ㅣ')}
      {mk(<>
        <EndH x1={x1} x2={x2} yc={y} w={Wh} ch={CH}/>
        <EndV xc={xc} y1={y} y2={y2} w={Wv} ch={CH}/>
      </>, 'ㅜ')}
      {mk(<>
        <EndV xc={10*U} y1={y1} y2={y2} w={Wv} ch={CH}/>
        {/* ㅡ stub attaches to the vertical's right edge — butt-join on the left, chamfer only on the free right end. Overlap 1 chamfer unit so the join is solid. */}
        <EndH x1={10*U + Wv/2 - CH} x2={14*U} yc={y} w={Wh} ch={CH} chL={false}/>
      </>, 'ㅏ')}
    </div>
  );
}

// ── approach specs ────────────────────────────────────────────────
// Rule throughout: ㅣ (wv) = 1.15 × ㅡ (wh).  Chamfer shown as absolute u + % of wh.
const A_WEIGHTS = [
  // A — redefine downward so Bold=2.30u. Geometric: Regular = √(1.15×2.30)=1.625 ≈ 1.63
  { label: 'Thin',    wh: 1.15, wv: 1.32, ch: 1.15*0.25 },
  { label: 'Regular', wh: 1.63, wv: 1.87, ch: 1.63*0.25 },
  { label: 'Bold',    wh: 2.30, wv: 2.65, ch: 2.30*0.25 },
];

const B_WEIGHTS = [
  // B — 4-weight. Geometric from 1.40 to 3.45 over 3 steps: ratio = (3.45/1.40)^(1/3) ≈ 1.350
  { label: 'Thin',    wh: 1.40, wv: 1.61, ch: 1.40*0.25 },
  { label: 'Regular', wh: 1.89, wv: 2.17, ch: 1.89*0.25 },
  { label: 'Bold',    wh: 2.55, wv: 2.93, ch: 2.55*0.25 },
  { label: 'Display', wh: 3.45, wv: 3.97, ch: 3.45*0.25, accent: true },
];

const C_WEIGHTS = [
  // C — keep original 1.4 / 2.2 / 3.0, ramp chamfer % aggressively.
  { label: 'Thin',    wh: 1.40, wv: 1.61, ch: 1.40*0.25 },  // 25%
  { label: 'Regular', wh: 2.20, wv: 2.53, ch: 2.20*0.35 },  // 35%
  { label: 'Bold',    wh: 3.00, wv: 3.45, ch: 3.00*0.45, accent: true },  // 45%
];

// ── layout ────────────────────────────────────────────────────────
function WeightCol({ W }) {
  const pct = (W.wh / GRID * 100).toFixed(1);
  return (
    <div className="wcol" style={W.accent ? { borderColor: 'var(--accent)' } : null}>
      <div className="wch">
        <div className="wct">{W.label}</div>
        <div className="wcs">ㅡ {W.wh.toFixed(2)}u · {pct}%</div>
      </div>
      <GlyphSet wh={W.wh} wv={W.wv} ch={W.ch}/>
      <div className="wcs" style={{padding:'6px 12px', borderTop:'1px solid var(--line)', color:'var(--ink-3)'}}>
        ㅣ {W.wv.toFixed(2)}u · chamfer {W.ch.toFixed(2)}u ({(W.ch/W.wh*100).toFixed(0)}%)
      </div>
    </div>
  );
}

function Approach({ badge, title, sub, desc, weights, verdict }) {
  const cls = 'wrow w' + weights.length;
  return (
    <section className="approach">
      <div className="ah">
        <span className="badge">{badge}</span>
        <h2>{title}</h2>
        <span className="sub">{sub}</span>
      </div>
      <div className="desc">{desc}</div>
      <div className={cls}>
        {weights.map(W => <WeightCol key={W.label} W={W}/>)}
      </div>
      <div className="verdict">{verdict}</div>
    </section>
  );
}

function App() {
  return (
    <div className="lab">
      <header>
        <h1>Weight Lab · 3 Approaches</h1>
        <div className="meta">v0.5 · 16×16 grid · ㅣ = 1.15 × ㅡ · chamfer rules vary per approach</div>
      </header>

      <Approach
        badge="A"
        title="웨이트 재정의"
        sub="redefine downward · geometric 1.15 → 1.63 → 2.30"
        desc="Bold=2.30u(14.4%)를 상한선으로 고정. Thin/Regular를 그 아래로 기하수열 재배치 — 세 웨이트 모두 타이포그래피 범위 안에서 명확히 구분됨. 가장 정공법."
        weights={A_WEIGHTS}
        verdict={<>
          <b>장점</b> — 세 웨이트 모두 "글자"로 읽힘. 간격이 고르게 지각됨(기하 수열).&nbsp;
          <b>단점</b> — Thin이 1.15u로 얇아져 작은 크기에서 희미해질 수 있음.
        </>}
      />

      <Approach
        badge="B"
        title="4-웨이트 확장"
        sub="split Display off · thin/reg/bold stay in letter range"
        desc="기존 3.0u+ 블록감을 'Display' 등급으로 분리하고, Thin~Bold는 본문 범위(1.40~2.55u)에 집중. 로고·대형 타이틀에는 Display를 사용."
        weights={B_WEIGHTS}
        verdict={<>
          <b>장점</b> — Display가 별도 레벨이므로 "도형 같음"이 의도된 역할로 변환됨. 본문 3 웨이트는 깔끔.&nbsp;
          <b>단점</b> — 시스템 복잡도 +1. 4-웨이트를 유지·문서화할 비용 발생.
        </>}
      />

      <Approach
        badge="C"
        title="챔퍼 차등"
        sub="keep weights · ramp chamfer 25% → 35% → 45%"
        desc="획 두께는 원래 스케일(1.4/2.2/3.0) 그대로 두고, 웨이트가 굵어질수록 챔퍼 비율을 공격적으로 키워 Bold를 시각적으로 가볍게 만든다. 정량적으로는 두꺼워도 지각상 덜 묵직함."
        weights={C_WEIGHTS}
        verdict={<>
          <b>장점</b> — Bold의 존재감 유지, 팔각형 모티브가 Bold에서 가장 강하게 드러남(브랜드 강조).&nbsp;
          <b>단점</b> — 챔퍼 비율이 웨이트별로 달라 "하나의 체계"라는 인상이 약해질 수 있음.
        </>}
      />

      <footer>
        <b>비교 포인트</b> — 각 접근에서 (1) Bold 열이 "글자"로 읽히는가 (2) 세 웨이트의 간격이 고르게 보이는가 (3) 얇은 크기에서도 유지되는가를 확인하세요. 선택 후 <code>glyph-engine</code>에 확정 반영됩니다.
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
