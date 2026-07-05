// jamo-lab.jsx — v0.5 Jamo Primitive Lab (Thin / Regular / Bold × BEFORE / AFTER)
// R1 octagonal grid · R4 45° chamfer · ㅣ = 1.15 × ㅡ (constant ratio)
// VERTEX option moved to Icon system (per v0.5 decision).

const GRID = 16;
const U = 40;
const VB = GRID * U;

const WEIGHTS = [
  // Geometric spacing up to Bold: Regular = √(Thin × Bold)
  // Thin 1.40u / Regular 1.79u / Bold 2.30u ; ㅣ = 1.15×; chamfer = 25% of weight.
  { key: 'thin',    label: 'Thin',    wh: 1.40, wv: 1.61, ch: 0.35 },  // 25% of 1.40
  { key: 'regular', label: 'Regular', wh: 1.79, wv: 2.06, ch: 0.45 },  // 25% of 1.79
  { key: 'bold',    label: 'Bold',    wh: 2.30, wv: 2.65, ch: 0.58 },  // 25% of 2.30
];

function EndCappedHStroke({ x1, x2, yc, w, ch, color = '#141414' }) {
  const t = yc - w / 2, b = yc + w / 2;
  const d =
    `M ${x1+ch} ${t} L ${x2-ch} ${t} L ${x2} ${t+ch} L ${x2} ${b-ch}` +
    ` L ${x2-ch} ${b} L ${x1+ch} ${b} L ${x1} ${b-ch} L ${x1} ${t+ch} Z`;
  return <path d={d} fill={color} />;
}
function EndCappedVStroke({ xc, y1, y2, w, ch, color = '#141414' }) {
  const l = xc - w / 2, r = xc + w / 2;
  const d =
    `M ${l+ch} ${y1} L ${r-ch} ${y1} L ${r} ${y1+ch} L ${r} ${y2-ch}` +
    ` L ${r-ch} ${y2} L ${l+ch} ${y2} L ${l} ${y2-ch} L ${l} ${y1+ch} Z`;
  return <path d={d} fill={color} />;
}
function FullChamferHStroke({ x1, x2, yc, w, ch, color = '#141414' }) {
  const t = yc - w / 2, b = yc + w / 2;
  // Four-corner chamfer — the old engine behavior (BEFORE).
  const d =
    `M ${x1+ch} ${t} L ${x2-ch} ${t} L ${x2} ${t+ch} L ${x2} ${b-ch}` +
    ` L ${x2-ch} ${b} L ${x1+ch} ${b} L ${x1} ${b-ch} L ${x1} ${t+ch} Z`;
  return <path d={d} fill={color} />;
}
// (Note: because the long edges are flat in both versions when there's
//  no other stroke to compare against, the visible difference shows up
//  at crossings — not here. The BEFORE/AFTER columns are kept for parity
//  and to make the intersection panel legible.)

function Octagon({ cx, cy, r, color }) {
  const pts = [];
  for (let k = 0; k < 8; k++) {
    const a = Math.PI / 8 + k * Math.PI / 4;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  const d = 'M ' + pts.map(p => p.map(v => v.toFixed(2)).join(',')).join(' L ') + ' Z';
  return <path d={d} fill={color} />;
}

function GridBG({ show }) {
  if (!show) return null;
  const lines = [];
  for (let i = 0; i <= GRID; i++) {
    lines.push(<line key={'h'+i} x1={0} x2={VB} y1={i*U} y2={i*U}
      stroke="#00000012" strokeWidth={i%4===0?1:0.5}/>);
    lines.push(<line key={'v'+i} x1={i*U} x2={i*U} y1={0} y2={VB}
      stroke="#00000012" strokeWidth={i%4===0?1:0.5}/>);
  }
  return <g>{lines}</g>;
}

function Panel({ title, subtitle, grid, children }) {
  return (
    <div className="p">
      <div className="ph">
        <div className="pt">{title}</div>
        <div className="ps">{subtitle}</div>
      </div>
      <svg viewBox={`0 0 ${VB} ${VB}`} width="100%" style={{display:'block', background:'#faf9f5'}}>
        <GridBG show={grid}/>
        {children}
      </svg>
    </div>
  );
}

function App() {
  const y  = VB / 2;
  const x1 = 2*U, x2 = 14*U;
  const xc = VB / 2;
  const y1 = 2*U, y2 = 14*U;

  return (
    <div className="lab">
      <header>
        <h1>Jamo Primitive Lab · ㅡ × ㅣ</h1>
        <div className="meta">v0.5 · 16×16 grid · ㅣ = 1.15 × ㅡ · weights: Thin · Regular · Bold</div>
      </header>

      {WEIGHTS.map(W => {
        const Wh = W.wh * U, Wv = W.wv * U, CH = W.ch * U;
        return (
          <section key={W.key}>
            <h2>{W.label} <span className="tag">ㅡ {W.wh}u · ㅣ {W.wv}u · chamfer {W.ch}u</span></h2>
            <div className="row4">
              <Panel title="ㅡ" subtitle="end-caps only" grid>
                <EndCappedHStroke x1={x1} x2={x2} yc={y} w={Wh} ch={CH}/>
              </Panel>
              <Panel title="ㅣ" subtitle="1.15× · end-caps only" grid>
                <EndCappedVStroke xc={xc} y1={y1} y2={y2} w={Wv} ch={CH}/>
              </Panel>
              <Panel title="ㅜ preview" subtitle="intersection" grid>
                <EndCappedHStroke x1={x1} x2={x2} yc={y} w={Wh} ch={CH}/>
                <EndCappedVStroke xc={xc} y1={y} y2={y2} w={Wv} ch={CH}/>
              </Panel>
              <Panel title="ㅏ preview" subtitle="ㅣ + short ㅡ stub" grid>
                <EndCappedVStroke xc={10*U} y1={y1} y2={y2} w={Wv} ch={CH}/>
                <EndCappedHStroke x1={10*U + Wv/2} x2={14*U} yc={y} w={Wh} ch={CH}/>
              </Panel>
            </div>
          </section>
        );
      })}

      <div className="note">
        VERTEX option removed from font scope — moved to Icon system (per v0.5 decision).
        Three weights shown so chamfer and stroke-weight can be judged on thin glyphs, not just bold.
        ㅡ·ㅣ 비례는 1.15× 고정 — 축 심볼의 "세로선 &gt; 방사선" 위계를 그대로 반영.
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
