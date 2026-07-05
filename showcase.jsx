// showcase.jsx
// "젊은공주" — full spec sheet showcase

const CHARS = ['젊', '은', '공', '주'];

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "weight": 1.6,
  "gridUnits": 16,
  "chamferFactor": 1.0,
  "bold": 2.75
}/*EDITMODE-END*/;

function App() {
  const [weight, setWeight] = React.useState(DEFAULTS.weight);
  const [bold, setBold] = React.useState(DEFAULTS.bold);
  const [chamferFactor, setChamferFactor] = React.useState(DEFAULTS.chamferFactor);
  const [gridUnits, setGridUnits] = React.useState(DEFAULTS.gridUnits);
  const [tweaksOn, setTweaksOn] = React.useState(false);

  // Tweak mode protocol
  React.useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksOn(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksOn(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const setPersisted = (patch) => {
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*');
  };

  const chamfer = weight * chamferFactor;
  const chamferBold = bold * chamferFactor;

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <Masthead />
      <HeroWord weight={weight} chamfer={chamfer} />
      <Divider label="01 — SYSTEM" />
      <SystemSection weight={weight} chamfer={chamfer} />
      <Divider label="02 — CONSTRUCTION" />
      <ConstructionSection weight={weight} chamfer={chamfer} gridUnits={gridUnits} />
      <Divider label="03 — WEIGHT AXIS" />
      <WeightSection regular={weight} bold={bold} chamferReg={chamfer} chamferBold={chamferBold} />
      <Divider label="04 — COMBINATION" />
      <CombinationSection weight={weight} chamfer={chamfer} bold={bold} chamferBold={chamferBold} />
      <Divider label="05 — DOWNLOAD" />
      <DownloadSection weight={weight} chamfer={chamfer} bold={bold} chamferBold={chamferBold} />
      <Colophon />
      {tweaksOn && (
        <TweaksPanel
          weight={weight} setWeight={(v) => { setWeight(v); setPersisted({ weight: v }); }}
          bold={bold} setBold={(v) => { setBold(v); setPersisted({ bold: v }); }}
          chamferFactor={chamferFactor} setChamferFactor={(v) => { setChamferFactor(v); setPersisted({ chamferFactor: v }); }}
          gridUnits={gridUnits} setGridUnits={(v) => { setGridUnits(v); setPersisted({ gridUnits: v }); }}
        />
      )}
    </div>
  );
}

// ── Shared bits ────────────────────────────────────────────────
function Masthead() {
  return (
    <div style={{ padding: '28px 56px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #000' }}>
      <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500 }}>
        축 / Chuk Type Foundry
      </div>
      <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6b6b6b' }}>
        Specimen No. 01 · 젊은공주 · 2026
      </div>
    </div>
  );
}

function Divider({ label }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 24,
      padding: '80px 56px 32px',
    }}>
      <div style={{ fontSize: 11, letterSpacing: '0.24em', fontWeight: 600 }}>{label}</div>
      <div style={{ flex: 1, height: 1, background: '#000' }} />
    </div>
  );
}

function Colophon() {
  return (
    <div style={{ padding: '120px 56px 60px', borderTop: '1px solid #000', marginTop: 80, display: 'flex', justifyContent: 'space-between', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6b6b6b' }}>
      <span>4 glyphs · 16×16 module</span>
      <span>Octagonal · Chamfered · Monoline</span>
      <span>© Chuk 2026</span>
    </div>
  );
}

// ── 01 HERO ────────────────────────────────────────────────────
function HeroWord({ weight, chamfer }) {
  return (
    <div style={{ padding: '80px 56px 40px' }}>
      <div style={{ fontSize: 11, letterSpacing: '0.24em', fontWeight: 600, marginBottom: 48 }}>
        THE SPECIMEN —
      </div>
      <div style={{ display: 'flex', gap: 0, alignItems: 'flex-end' }}>
        {CHARS.map((c, i) => (
          <Glyph key={i} char={c} size={280} weight={weight} chamfer={chamfer} />
        ))}
      </div>
      <div style={{ marginTop: 64, display: 'flex', justifyContent: 'space-between', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6b6b6b' }}>
        <span>젊 · 은 · 공 · 주</span>
        <span>Jeolm · Eun · Gong · Ju</span>
        <span>"Young Princess" — Generator Font</span>
      </div>
    </div>
  );
}

// ── 02 SYSTEM ──────────────────────────────────────────────────
function SystemSection({ weight, chamfer }) {
  return (
    <div style={{ padding: '0 56px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40 }}>
      <SpecCard title="Master Grid" value="16 × 16" detail="Every stroke snaps to integer or half-integer positions on a 16-unit square. Advance width = 1em = 16 units." />
      <SpecCard title="Stroke Weight" value="1.5 / 2.75" detail="Two weights — Regular (1.5u) and Bold (2.75u). All strokes are monoline; no contrast between horizontal and vertical." />
      <SpecCard title="Corner Language" value="45° chamfer" detail="Every terminal and intersection outer corner is cut at 45° by one stroke-weight. Inherited from the 축 logomark." />
      <SpecCard title="ㅇ Construction" value="Flat-top 8-gon" detail="The only non-orthogonal form. A regular octagon rotated 22.5° so its top and bottom edges are flat — reads as circular at display size." />
      <SpecCard title="Jamo Topology" value="5 primitives" detail="hStroke · vStroke · dStroke(45°) · octRing · squareRing. Every glyph in the set is assembled from these 5 primitives only." />
      <SpecCard title="Fill Rule" value="Even-odd" detail="Hollow shapes (ㅇ, ㅁ) are rendered as two overlapping polygons with even-odd fill. Stays crisp at any rasterized size." />
    </div>
  );
}

function SpecCard({ title, value, detail }) {
  return (
    <div style={{ border: '1px solid #000', padding: '24px 24px 28px', minHeight: 180 }}>
      <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6b6b6b', marginBottom: 12 }}>{title}</div>
      <div style={{ fontSize: 32, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 14, fontFamily: '"JetBrains Mono", monospace' }}>{value}</div>
      <div style={{ fontSize: 13, lineHeight: 1.5, color: '#333' }}>{detail}</div>
    </div>
  );
}

// ── 03 CONSTRUCTION ────────────────────────────────────────────
function ConstructionSection({ weight, chamfer, gridUnits }) {
  return (
    <div style={{ padding: '0 56px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
        {CHARS.map((c) => (
          <ConstructionCard key={c} char={c} weight={weight} chamfer={chamfer} gridUnits={gridUnits} />
        ))}
      </div>
    </div>
  );
}

function ConstructionCard({ char, weight, chamfer, gridUnits }) {
  const label = { '젊':'JEOLM / ㅈ+ㅓ+ㄻ', '은':'EUN / ㅇ+ㅡ+ㄴ', '공':'GONG / ㄱ+ㅗ+ㅇ', '주':'JU / ㅈ+ㅜ' }[char];
  return (
    <div>
      <div style={{ border: '1px solid #000', aspectRatio: '1/1', position: 'relative', background: '#fff', padding: 16 }}>
        <Glyph char={char} size={'100%'} weight={weight} chamfer={chamfer} showGrid gridUnits={gridUnits} />
      </div>
      <div style={{ marginTop: 14, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
        {label}
      </div>
      <div style={{ marginTop: 6, fontSize: 11, color: '#6b6b6b', lineHeight: 1.5 }}>
        {descForChar(char)}
      </div>
    </div>
  );
}

function descForChar(c) {
  return {
    '젊': 'Complex syllable. 3-stroke ㅈ on upper-left, ㅓ on the right, and a ㄹ+ㅁ jongseong cluster along the baseline.',
    '은': 'ㅇ + ㅡ + ㄴ stacked on three registers — the ㅇ is a flat-top octagonal ring.',
    '공': 'ㄱ and ㅗ share the upper half; the jongseong ㅇ octagon sits on the baseline, centered.',
    '주': 'ㅈ across the upper register; ㅜ is a full-width horizontal with a descending stem.',
  }[c];
}

// ── 04 WEIGHT ──────────────────────────────────────────────────
function WeightSection({ regular, bold, chamferReg, chamferBold }) {
  return (
    <div style={{ padding: '0 56px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
        <WeightColumn label="Regular" weight={regular} chamfer={chamferReg} />
        <WeightColumn label="Bold" weight={bold} chamfer={chamferBold} />
      </div>
    </div>
  );
}

function WeightColumn({ label, weight, chamfer }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #000', paddingBottom: 12, marginBottom: 24 }}>
        <span style={{ fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: 11, fontFamily: '"JetBrains Mono", monospace', color: '#6b6b6b' }}>
          stroke {weight.toFixed(2)}u
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, alignItems: 'flex-end' }}>
        {CHARS.map((c) => (
          <div key={c} style={{ aspectRatio: '1/1' }}>
            <Glyph char={c} size="100%" weight={weight} chamfer={chamfer} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 05 COMBINATION ─────────────────────────────────────────────
function CombinationSection({ weight, chamfer, bold, chamferBold }) {
  const sizes = [140, 96, 68, 44, 28];
  return (
    <div style={{ padding: '0 56px' }}>
      <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6b6b6b', marginBottom: 28 }}>
        Size Cascade — Regular
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 64 }}>
        {sizes.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: 12 }}>
            <div style={{ display: 'flex' }}>
              {CHARS.map((c) => <Glyph key={c} char={c} size={s} weight={weight} chamfer={chamfer} />)}
            </div>
            <div style={{ marginLeft: 'auto', fontSize: 10, fontFamily: '"JetBrains Mono", monospace', color: '#6b6b6b' }}>{s}px</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6b6b6b', marginBottom: 28 }}>
        Inversion · Framing
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: '#000', padding: '32px 24px', minWidth: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {CHARS.map((c) => (
              <div key={c} style={{ aspectRatio: '1/1' }}>
                <Glyph char={c} size="100%" weight={bold} chamfer={chamferBold} color="#fff" />
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #000', padding: '32px 24px', minWidth: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {CHARS.map((c) => (
              <div key={c} style={{ aspectRatio: '1/1' }}>
                <Glyph char={c} size="100%" weight={bold} chamfer={chamferBold} color="#000" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 06 DOWNLOAD ────────────────────────────────────────────────
function DownloadSection({ weight, chamfer, bold, chamferBold }) {
  return (
    <div style={{ padding: '0 56px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
        {CHARS.map((c) => (
          <div key={c} style={{ border: '1px solid #000', padding: 0 }}>
            <div style={{ padding: 20, borderBottom: '1px solid #000' }}>
              <Glyph char={c} size={'100%'} weight={weight} chamfer={chamfer} />
            </div>
            <div style={{ display: 'flex', borderTop: '0' }}>
              <DLBtn onClick={() => downloadSVG(c, { size: 1000, weight, chamfer })}>
                {c} · Reg
              </DLBtn>
              <DLBtn onClick={() => downloadSVG(c, { size: 1000, weight: bold, chamfer: chamferBold })} alt>
                {c} · Bold
              </DLBtn>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 32, fontSize: 11, color: '#6b6b6b', letterSpacing: '0.05em' }}>
        Downloads are standalone SVG files with viewBox 0 0 16 16 — scale them anywhere without loss.
      </div>
    </div>
  );
}

function DLBtn({ children, onClick, alt }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, padding: '14px 8px', border: 'none',
      background: alt ? '#000' : '#fff', color: alt ? '#fff' : '#000',
      fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600,
      cursor: 'pointer', borderRight: alt ? 'none' : '1px solid #000',
      fontFamily: 'inherit',
    }}>
      ↓ {children}
    </button>
  );
}

// ── Tweaks panel ───────────────────────────────────────────────
function TweaksPanel({ weight, setWeight, bold, setBold, chamferFactor, setChamferFactor, gridUnits, setGridUnits }) {
  return (
    <div style={{
      position: 'fixed', bottom: 20, right: 20, width: 300,
      background: '#000', color: '#fff', padding: 24, zIndex: 100,
      fontSize: 11, letterSpacing: '0.05em',
      boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
    }}>
      <div style={{ fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid #fff' }}>
        Tweaks
      </div>
      <TweakSlider label="Regular weight" value={weight} setValue={setWeight} min={0.8} max={3.5} step={0.05} />
      <TweakSlider label="Bold weight" value={bold} setValue={setBold} min={1.5} max={5} step={0.05} />
      <TweakSlider label="Chamfer × weight" value={chamferFactor} setValue={setChamferFactor} min={0} max={2.5} step={0.05} />
      <TweakOptions label="Grid resolution" value={gridUnits} setValue={setGridUnits} options={[8, 12, 16, 24]} />
    </div>
  );
}

function TweakSlider({ label, value, setValue, min, max, step }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em' }}>
        <span>{label}</span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', color: '#aaa' }}>{Number(value).toFixed(2)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => setValue(parseFloat(e.target.value))}
        style={{ width: '100%', accentColor: '#fff' }}
      />
    </div>
  );
}

function TweakOptions({ label, value, setValue, options }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'flex', gap: 6 }}>
        {options.map((o) => (
          <button key={o} onClick={() => setValue(o)} style={{
            flex: 1, padding: '8px 0', border: '1px solid #fff',
            background: value === o ? '#fff' : 'transparent', color: value === o ? '#000' : '#fff',
            fontSize: 11, fontFamily: '"JetBrains Mono", monospace', cursor: 'pointer',
          }}>{o}</button>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
