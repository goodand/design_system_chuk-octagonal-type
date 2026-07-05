// symbols/Symbols.jsx — v0.4
// Three-symbol hierarchy for Chuk DS.
// v0.4 adds variant support for Gear and Iceberg to explore
// sub-symbol consistency with the Chuk (Core) symbol.

// ── 축 — unchanged from v0.3 ──────────────────────────────────
function ChukSymbol({
  size = 280, color = '#141414', accent = '#d9531e', variant = 'final',
}) {
  const VB = 600, cx = VB / 2, cy = VB / 2, R = VB * 0.38;
  const V = {
    v0:    { thin: 6,  thick: 38, dotR: 40, dotColor: accent,   dotShape: 'circle' },
    value: { thin: 6,  thick: 38, dotR: 40, dotColor: '#9a9a9a', dotShape: 'circle' },
    hue:   { thin: 6,  thick: 38, dotR: 40, dotColor: '#141414', dotShape: 'circle' },
    scale: { thin: 3,  thick: 52, dotR: 22, dotColor: accent,   dotShape: 'circle' },
    shape: { thin: 6,  thick: 38, dotR: 32, dotColor: accent,   dotShape: 'octagon' },
    final: { thin: 3,  thick: 50, dotR: 20, dotColor: accent,   dotShape: 'octagon' },
  }[variant] || {};
  const { thin, thick, dotR, dotColor, dotShape } = V;
  const rays = [0, 45, 90, 135].map(d => {
    const rad = d * Math.PI / 180;
    const dx = Math.cos(rad) * R, dy = Math.sin(rad) * R;
    return { x1: cx - dx, y1: cy - dy, x2: cx + dx, y2: cy + dy };
  });
  const octPts = [];
  for (let k = 0; k < 8; k++) {
    const a = Math.PI / 8 + k * Math.PI / 4;
    octPts.push([cx + dotR * Math.cos(a), cy + dotR * Math.sin(a)]);
  }
  const octD = 'M ' + octPts.map(p => p.map(v => v.toFixed(2)).join(',')).join(' L ') + ' Z';
  return (
    <svg viewBox={`0 0 ${VB} ${VB}`} width={size} height={size} style={{ display: 'block' }}>
      {rays.map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
          stroke={color} strokeWidth={thin} strokeLinecap="butt" />
      ))}
      <rect x={cx - thick / 2} y={cy - R} width={thick} height={R * 2} fill={color} />
      {dotShape === 'octagon'
        ? <path d={octD} fill={dotColor} />
        : <circle cx={cx} cy={cy} r={dotR} fill={dotColor} />}
    </svg>
  );
}

// ── Gear — variants ────────────────────────────────────────────
//   v0      — original (square teeth, 90° ends)
//   vertex  — Proposal A: add small accent octagon at the exact center (vertex motif)
//   chamfer — Proposal B: each tooth end cut at 45° (edge-language law)
//   final   — A + B combined: chamfered teeth + inner vertex accent
function GearSymbol({ size = 280, color = '#141414', accent = '#d9531e', variant = 'final' }) {
  const VB = 600, cx = VB / 2, cy = VB / 2;
  const R_outer = VB * 0.38;
  const R_inner = VB * 0.28;
  const R_hole = VB * 0.10;
  const teeth = 8;

  const applyChamfer = variant === 'chamfer';  // 'final' keeps straight square teeth (Proposal A) + vertex
  const showVertex   = variant === 'vertex'  || variant === 'final';

  // Half-angle subtended by one tooth at the hub. Drives tooth width.
  const baseToothHalf = Math.PI / teeth * 0.42;

  // Each tooth is built as a RECTANGULAR BLOCK:
  //   - its two side walls are parallel (rise perpendicularly from the hub circle)
  //   - its top is a flat arc-chord at R_outer
  //   - between teeth the gap drops at 90° to the flat valley floor at R_inner
  // This matches the user's reference (Proposal A — straight teeth, 90° valleys).
  const pts = [];
  for (let i = 0; i < teeth; i++) {
    const a = i * (2 * Math.PI / teeth);
    // perpendicular offset at the hub (tangent direction) to produce parallel walls
    const tooth_w = Math.sin(baseToothHalf) * R_inner * 2; // tooth width at the hub
    const tanX = -Math.sin(a), tanY = Math.cos(a);         // unit tangent at angle a
    const radX =  Math.cos(a), radY =  Math.sin(a);        // unit radial at angle a

    // inner-left (at hub)
    pts.push([cx + radX * R_inner - tanX * tooth_w/2,
              cy + radY * R_inner - tanY * tooth_w/2]);
    // outer-left (straight up along radial)
    pts.push([cx + radX * R_outer - tanX * tooth_w/2,
              cy + radY * R_outer - tanY * tooth_w/2]);
    if (applyChamfer) {
      // chamfer corners on the tooth top
      const ch = (R_outer - R_inner) * 0.22;
      pts.push([cx + radX * R_outer - tanX * tooth_w/2 + tanX * ch - radX * ch,
                cy + radY * R_outer - tanY * tooth_w/2 + tanY * ch - radY * ch]);
      pts.push([cx + radX * R_outer + tanX * tooth_w/2 - tanX * ch - radX * ch,
                cy + radY * R_outer + tanY * tooth_w/2 - tanY * ch - radY * ch]);
    }
    // outer-right
    pts.push([cx + radX * R_outer + tanX * tooth_w/2,
              cy + radY * R_outer + tanY * tooth_w/2]);
    // inner-right (at hub)
    pts.push([cx + radX * R_inner + tanX * tooth_w/2,
              cy + radY * R_inner + tanY * tooth_w/2]);
    // valley floor between this tooth and the next — follow hub arc
    const aNext = (i + 1) * (2 * Math.PI / teeth);
    const tanXn = -Math.sin(aNext), tanYn = Math.cos(aNext);
    const radXn =  Math.cos(aNext), radYn =  Math.sin(aNext);
    pts.push([cx + radXn * R_inner - tanXn * tooth_w/2,
              cy + radYn * R_inner - tanYn * tooth_w/2]);
  }
  const outerPath = 'M ' + pts.map(p => p.map(v => v.toFixed(2)).join(',')).join(' L ') + ' Z';

  // inner octagonal hole (unchanged)
  const holePts = [];
  for (let k = 0; k < 8; k++) {
    const a = Math.PI / 8 + k * Math.PI / 4;
    holePts.push([cx + R_hole * Math.cos(a), cy + R_hole * Math.sin(a)]);
  }
  const holePath = 'M ' + holePts.map(p => p.map(v => v.toFixed(2)).join(',')).join(' L ') + ' Z';

  // vertex accent — small orange octagon inside the hole
  const vertR = R_hole * 0.48;
  const vertPts = [];
  for (let k = 0; k < 8; k++) {
    const a = Math.PI / 8 + k * Math.PI / 4;
    vertPts.push([cx + vertR * Math.cos(a), cy + vertR * Math.sin(a)]);
  }
  const vertPath = 'M ' + vertPts.map(p => p.map(v => v.toFixed(2)).join(',')).join(' L ') + ' Z';

  return (
    <svg viewBox={`0 0 ${VB} ${VB}`} width={size} height={size} style={{ display: 'block' }}>
      {/* gear body — when vertex is active, fill the inner octagon hole with accent instead of cutting it */}
      {showVertex
        ? <>
            <path d={outerPath} fill={color} />
            <path d={holePath} fill={accent} />
          </>
        : <path d={outerPath + ' ' + holePath} fill={color} fillRule="evenodd" />
      }
    </svg>
  );
}

// ── Iceberg — variants ─────────────────────────────────────────
//   v0      — original (solid tip + outline body, rounded-ish lower facets)
//   vertex  — Proposal A: add small octagonal hollow at body's mass-center
//   chamfer — Proposal B: redraw lower body with strict 45° facets
//   final   — A + B combined
function IcebergSymbol({ size = 280, color = '#141414', accent = '#d9531e', variant = 'final', waterline = '#4a4a4a' }) {
  const VB = 600, cx = VB / 2;
  const waterY = VB * 0.35;
  const tipTop = waterY - VB * 0.24;

  const applyChamfer = variant === 'chamfer' || variant === 'final';
  const showVertex   = variant === 'vertex'  || variant === 'final';

  // Above-water tip (strict 45° triangle-ish) — same across variants
  const topPts = [
    [cx - VB * 0.14, waterY],
    [cx - VB * 0.04, tipTop],
    [cx + VB * 0.05, tipTop - VB * 0.03],
    [cx + VB * 0.17, waterY],
  ];

  // Below-water body.
  //   chamfer/final → asymmetric polygon using ONLY 0°/45°/90°/135° edges.
  //     Irregular on purpose — Iceberg expresses uncertainty & hidden depth,
  //     unlike the symmetric axis/gear. 135° is the "variation" of 45° that
  //     tilts the form without breaking the octagonal grammar.
  //   otherwise   → original organic polygon.
  let botPts;
  if (applyChamfer) {
    // All diagonal moves have |dx|==|dy| so every slope is ±45° (= 45°/135°).
    // Traced clockwise from top-left, then back to start.
    botPts = [
      [cx - VB * 0.36, waterY],                 // A  top-left at waterline
      [cx + VB * 0.30, waterY],                 // B  top-right at waterline (horizontal)
      [cx + VB * 0.40, waterY + VB * 0.10],     // C  45° down-right
      [cx + VB * 0.40, waterY + VB * 0.22],     // D  straight down (90°)
      [cx + VB * 0.22, waterY + VB * 0.40],     // E  135° down-left  (dx=-0.18,dy=+0.18)
      [cx + VB * 0.04, waterY + VB * 0.40],     // F  horizontal bottom
      [cx - VB * 0.18, waterY + VB * 0.18],     // G  135° up-left    (dx=-0.22,dy=-0.22)
      [cx - VB * 0.42, waterY + VB * 0.18],     // H  horizontal left
      [cx - VB * 0.42, waterY + VB * 0.12],     // I  vertical up (90°)
      // close to A: dx=+0.06, dy=-0.12  — NOT 45°. Fix by inserting one more pt.
      [cx - VB * 0.36, waterY + VB * 0.06],     // J  45° up-right   (dx=+0.06,dy=-0.06)
      // J → A : dx=0, dy=-0.06  (vertical) ✓
    ];
  } else {
    const botBottomY = VB * 0.90;
    botPts = [
      [cx - VB * 0.30, waterY],
      [cx + VB * 0.32, waterY],
      [cx + VB * 0.38, waterY + VB * 0.12],
      [cx + VB * 0.24, waterY + VB * 0.38],
      [cx + VB * 0.06, botBottomY],
      [cx - VB * 0.14, botBottomY - VB * 0.04],
      [cx - VB * 0.36, waterY + VB * 0.30],
      [cx - VB * 0.40, waterY + VB * 0.14],
    ];
  }

  const topPath = 'M ' + topPts.map(p => p.map(v => v.toFixed(2)).join(',')).join(' L ') + ' Z';
  const botPath = 'M ' + botPts.map(p => p.map(v => v.toFixed(2)).join(',')).join(' L ') + ' Z';

  // Vertex octagon — placed slightly off-center to reinforce irregularity
  const vCx = cx - VB * 0.04;
  const vCy = waterY + VB * 0.26;
  const vR  = VB * 0.085;
  const vPts = [];
  for (let k = 0; k < 8; k++) {
    const a = Math.PI / 8 + k * Math.PI / 4;
    vPts.push([vCx + vR * Math.cos(a), vCy + vR * Math.sin(a)]);
  }
  const vPath = 'M ' + vPts.map(p => p.map(v => v.toFixed(2)).join(',')).join(' L ') + ' Z';

  return (
    <svg viewBox={`0 0 ${VB} ${VB}`} width={size} height={size} style={{ display: 'block' }}>
      {/* waterline */}
      <line x1={VB * 0.08} y1={waterY} x2={VB * 0.92} y2={waterY}
        stroke={waterline} strokeWidth={2} strokeDasharray="6 6" opacity={0.55} />
      {/* above-water solid */}
      <path d={topPath} fill={color} />
      {/* below-water */}
      <path d={botPath} fill={color} opacity={0.22} />
      <path d={botPath} fill="none" stroke={color} strokeWidth={3} />
      {/* vertex accent */}
      {showVertex && <path d={vPath} fill={accent} />}
    </svg>
  );
}

window.ChukSymbol = ChukSymbol;
window.GearSymbol = GearSymbol;
window.IcebergSymbol = IcebergSymbol;
