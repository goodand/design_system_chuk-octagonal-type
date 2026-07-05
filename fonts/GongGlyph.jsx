// "공" glyph built on the Octagonal Master Grid.
// Every stroke is 0° / 90° / 45° / 135°. No curves. Ever.
//
// Grid convention (per syllable block):
//   1000 x 1000 viewBox, centered
//   Octagon bounding box fills the block with a small outer margin
//   Stroke weight is parameterized so we can explore
//     - Strategy 1 (Stable): heavy ㅇ, light ㄱ+ㅗ
//     - Strategy 2 (Energy): heaviest ㅗ vertical (axis), medium ㅇ, light ㄱ

const { useMemo } = React;

// --- OCTAGON GEOMETRY -------------------------------------------------
// Regular octagon inscribed in a square of side S, centered at (cx, cy).
// Chamfer fraction c = (1 - 1/(1+√2))/2 ≈ 0.1464 → each corner is cut at 45°.
function octagonPath(cx, cy, size, cornerRadius = 0) {
  const s = size / 2;
  const c = s * (Math.SQRT2 - 1) / Math.SQRT2; // distance from corner the cut starts
  // 8 vertices, clockwise from top-left-of-top edge
  const pts = [
    [cx - s + c, cy - s], [cx + s - c, cy - s],
    [cx + s,     cy - s + c], [cx + s,     cy + s - c],
    [cx + s - c, cy + s], [cx - s + c, cy + s],
    [cx - s,     cy + s - c], [cx - s,     cy - s + c],
  ];
  if (cornerRadius <= 0) {
    return 'M' + pts.map(p => p.join(',')).join(' L ') + ' Z';
  }
  // Tiny fillets at each vertex — purely optical.
  let d = '';
  for (let i = 0; i < pts.length; i++) {
    const prev = pts[(i + pts.length - 1) % pts.length];
    const curr = pts[i];
    const next = pts[(i + 1) % pts.length];
    const v1 = normalize([prev[0] - curr[0], prev[1] - curr[1]]);
    const v2 = normalize([next[0] - curr[0], next[1] - curr[1]]);
    const a = [curr[0] + v1[0] * cornerRadius, curr[1] + v1[1] * cornerRadius];
    const b = [curr[0] + v2[0] * cornerRadius, curr[1] + v2[1] * cornerRadius];
    d += (i === 0 ? 'M' : ' L') + a.join(',');
    d += ` Q ${curr[0]},${curr[1]} ${b.join(',')}`;
  }
  d += ' Z';
  return d;
}
function normalize([x, y]) { const L = Math.hypot(x, y); return [x / L, y / L]; }

// --- THE GLYPH --------------------------------------------------------
function GongGlyph({
  size = 480,
  strategy = 'stable',   // 'stable' | 'energy' | 'uniform'
  showGrid = false,
  color = '#141414',
  gridColor = '#D0D4DB',
  cornerRadius = 4,       // tiny chamfer on octagon vertices
}) {
  // viewBox is 1000 wide; one syllable block
  const VB = 1000;
  const padY = 30;
  const blockH = VB - padY * 2;

  // Vertical layout: divide block into 3 bands (ㄱ, ㅗ, ㅇ) stacked
  // Band heights are tuned for Hangul balance — ㅇ gets the most room.
  const gakH = blockH * 0.26;
  const oH   = blockH * 0.30;
  const ngH  = blockH * 0.36;
  const gap  = (blockH - gakH - oH - ngH) / 2;

  const gakY  = padY;
  const oY    = padY + gakH + gap;
  const ngY   = padY + gakH + gap + oH + gap;

  // Horizontal: everything is centered on cx and shares the same inner width
  const cx = VB / 2;
  const innerW = VB * 0.72; // consistent letter width across all jamo

  // Stroke weights by strategy
  const W = (() => {
    switch (strategy) {
      case 'stable':  return { gak: 60, oStem: 60, oBar: 60, ng: 110 };
      case 'energy':  return { gak: 60, oStem: 130, oBar: 70, ng: 90 };
      case 'uniform': return { gak: 80, oStem: 80, oBar: 80, ng: 80 };
      default:        return { gak: 60, oStem: 60, oBar: 60, ng: 100 };
    }
  })();

  // --- ㄱ -------------------------------------------------------------
  // Horizontal across top, dropping at right with a 45° chamfer.
  const gakLeft = cx - innerW / 2;
  const gakRight = cx + innerW / 2;
  const gakBottom = gakY + gakH;
  const chamfer = Math.min(gakH * 0.35, innerW * 0.12);

  const gakPath = useMemo(() => {
    // Outer outline of the ㄱ stroke, drawn as a filled shape so we control
    // the 45° chamfer at the corner precisely.
    const t = W.gak;
    // outer path: top-left → top-right (before chamfer) → diagonal → down to bottom-right → inner...
    return `
      M ${gakLeft} ${gakY}
      L ${gakRight - chamfer} ${gakY}
      L ${gakRight} ${gakY + chamfer}
      L ${gakRight} ${gakBottom}
      L ${gakRight - t} ${gakBottom}
      L ${gakRight - t} ${gakY + chamfer + t * 0.4}
      L ${gakRight - chamfer - t * 0.4} ${gakY + t}
      L ${gakLeft} ${gakY + t}
      Z
    `.trim();
  }, [W.gak, gakLeft, gakRight, gakY, gakBottom, chamfer]);

  // --- ㅗ -------------------------------------------------------------
  const oStemW = W.oStem;
  const oStemH = oH * 0.62;
  const oBarW  = innerW;
  const oBarH  = W.oBar;
  const oStemX = cx - oStemW / 2;
  const oBarY  = oY + oH - oBarH;

  // --- ㅇ (octagon) ---------------------------------------------------
  const ngSize = Math.min(innerW, ngH);
  const ngCx = cx;
  const ngCy = ngY + ngH / 2;
  const ngWeight = W.ng;
  const outerOct = octagonPath(ngCx, ngCy, ngSize, cornerRadius);
  const innerOct = octagonPath(ngCx, ngCy, ngSize - ngWeight * 2, Math.max(0, cornerRadius - 2));

  // --- Grid overlay --------------------------------------------------
  const grid = showGrid ? (
    <g stroke={gridColor} strokeWidth={1.5} fill="none" opacity={0.9}>
      {/* Master octagon */}
      <path d={octagonPath(VB / 2, VB / 2, VB * 0.92, 0)} strokeDasharray="6 6" />
      {/* 8-direction axes through center */}
      {[0, 45, 90, 135].map(deg => {
        const r = VB * 0.48;
        const rad = (deg * Math.PI) / 180;
        const dx = Math.cos(rad) * r, dy = Math.sin(rad) * r;
        return (
          <line key={deg}
            x1={VB/2 - dx} y1={VB/2 - dy}
            x2={VB/2 + dx} y2={VB/2 + dy}
            strokeDasharray="4 5" />
        );
      })}
      {/* Per-jamo baselines */}
      <line x1={0} y1={gakY} x2={VB} y2={gakY} strokeDasharray="2 4" opacity={0.5}/>
      <line x1={0} y1={gakY + gakH} x2={VB} y2={gakY + gakH} strokeDasharray="2 4" opacity={0.5}/>
      <line x1={0} y1={oY + oH} x2={VB} y2={oY + oH} strokeDasharray="2 4" opacity={0.5}/>
      <line x1={0} y1={ngY + ngH} x2={VB} y2={ngY + ngH} strokeDasharray="2 4" opacity={0.5}/>
    </g>
  ) : null;

  return (
    <svg viewBox={`0 0 ${VB} ${VB}`} width={size} height={size} style={{display:'block'}}>
      {grid}

      {/* ㄱ */}
      <path d={gakPath} fill={color} />

      {/* ㅗ — vertical axis then horizontal base */}
      <rect x={oStemX} y={oY + (oH - oBarH - oStemH)} width={oStemW} height={oStemH} fill={color}/>
      <rect x={cx - oBarW/2} y={oBarY} width={oBarW} height={oBarH} fill={color}/>

      {/* ㅇ — hollow octagon */}
      <path d={outerOct + ' ' + innerOct} fillRule="evenodd" fill={color}/>
    </svg>
  );
}

window.GongGlyph = GongGlyph;
window.octagonPath = octagonPath;
