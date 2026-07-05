// glyph-engine.jsx
// ───────────────────────────────────────────────────────────────────
// "젊은공주" 4-glyph octagonal type engine.
//
//   Master grid: 16×16 normalized units.
//   Stroke primitives:
//     hStroke(x1,x2, yc, w, ch)       — horizontal, centered on yc
//     vStroke(xc, y1,y2, w, ch)       — vertical, centered on xc
//     dStroke(x1,y1, x2,y2, w, ch)    — 45° diagonal, centered
//     octRing(cx,cy, R, w)            — ㅇ ring (flat-top octagon)
//     squareRing(x,y,w,h, sw, ch)     — ㅁ hollow box
//   Corners are CHAMFERED at 45° by amount `ch` (in grid units).
//   Outer silhouette of each stroke is always drawn with chamfered
//   end-caps so terminals match the 축 logo's visual language.
// ───────────────────────────────────────────────────────────────────

// ── chamfered rectangle ───────────────────────────────────────────
// Returns SVG path `d` string for a rect (x1,y1)-(x2,y2) with optional
// 45° chamfers at each corner. flags = [TL, TR, BR, BL].
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

function hStroke(x1, x2, yc, w, ch) {
  return chamRect(x1, yc - w / 2, x2, yc + w / 2, ch, [1, 1, 1, 1]);
}
function vStroke(xc, y1, y2, w, ch) {
  return chamRect(xc - w / 2, y1, xc + w / 2, y2, ch, [1, 1, 1, 1]);
}

// ── Diagonal (45° only) stroke ────────────────────────────────────
// Draws a slab of thickness w centered on the line from (x1,y1) to (x2,y2).
// End-caps are perpendicular to the slab, then flat-cut back by `ch` to
// match the chamfer language.
function dStroke(x1, y1, x2, y2, w, ch) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const ux = dx / len, uy = dy / len;          // along
  const px = -uy, py = ux;                     // perp
  const hw = w / 2;
  // Pull ends back by ch*0.5 so the cap is flush with perpendicular lines
  const trim = Math.min(ch * 0.7, len * 0.2);
  const ax = x1 + ux * trim, ay = y1 + uy * trim;
  const bx = x2 - ux * trim, by = y2 - uy * trim;
  // 4 corners
  const p1 = [ax + px * hw, ay + py * hw];
  const p2 = [bx + px * hw, by + py * hw];
  const p3 = [bx - px * hw, by - py * hw];
  const p4 = [ax - px * hw, ay - py * hw];
  return `M ${p1[0]} ${p1[1]} L ${p2[0]} ${p2[1]} L ${p3[0]} ${p3[1]} L ${p4[0]} ${p4[1]} Z`;
}

// ── Octagonal ring (ㅇ) ──────────────────────────────────────────
// Flat-top regular octagon inscribed in circle of radius R, centered (cx,cy).
// Returns a combined path (outer + inner with even-odd winding).
function octRing(cx, cy, R, w) {
  // angles for flat-top 8-gon: start at 22.5° (π/8) from horizontal
  const oct = (rad) => {
    const pts = [];
    for (let k = 0; k < 8; k++) {
      const a = Math.PI / 8 + k * Math.PI / 4;
      pts.push([cx + rad * Math.cos(a), cy + rad * Math.sin(a)]);
    }
    return pts;
  };
  const toPath = (pts) => 'M ' + pts.map(p => p.join(' ')).join(' L ') + ' Z';
  const r = R - w;
  return toPath(oct(R)) + ' ' + toPath(oct(r));
}

// ── Square ring (ㅁ) ─────────────────────────────────────────────
function squareRing(x1, y1, x2, y2, w, ch) {
  const outer = chamRect(x1, y1, x2, y2, ch, [1, 1, 1, 1]);
  const ix1 = x1 + w, iy1 = y1 + w;
  const ix2 = x2 - w, iy2 = y2 - w;
  const ic = Math.max(0, ch - w * 0.4);
  const inner = chamRect(ix1, iy1, ix2, iy2, ic, [1, 1, 1, 1]);
  return outer + ' ' + inner;
}

// ───────────────────────────────────────────────────────────────────
// GLYPH BUILDERS
// Each returns array of path-d strings (all filled with fill-rule=evenodd).
// Coordinate system: (0,0) top-left → (16,16) bottom-right.
// ───────────────────────────────────────────────────────────────────

// 젊 = ㅈ(초성) + ㅓ(중성, 오른쪽) + ㄻ(종성, 아래)
// Layout (16×16):
//   ㅈ    : (0..8,  0..7)
//   ㅓ    : (8..16, 0..8)   — vertical stem at x=13, side bar at y=4
//   ㄻ=ㄹ+ㅁ : (0..16, 8.5..15.5)
function build_젊(w, ch) {
  const P = [];
  // ── ㅈ ──
  // top horizontal bar
  P.push(hStroke(0.5, 7.5, 1.2, w, ch));
  // two 45° legs from just under the bar, splaying down-out
  const top = 2.0;
  const bot = 7.2;
  P.push(dStroke(4.0, top, 1.2, bot, w, ch));   // left leg
  P.push(dStroke(4.0, top, 6.8, bot, w, ch));   // right leg

  // ── ㅓ (right side) ──
  // vertical stem
  P.push(vStroke(13.5, 0.5, 7.5, w, ch));
  // side bar (to the LEFT of the stem)
  P.push(hStroke(10.0, 13.5, 4.0, w, ch));

  // ── ㄹ (left half of jongseong) ──
  // Stylized ㄹ: 3 horizontals + 2 alternating verticals (Z-shape).
  const yr1 = 8.8, yr2 = 12.0, yr3 = 15.3;
  const xrL = 0.5, xrR = 7.0;
  P.push(hStroke(xrL,  xrR,  yr1, w, ch));       // top h
  P.push(vStroke(xrR,  yr1,  yr2, w, ch));       // right-down (top-half)
  P.push(hStroke(xrL,  xrR,  yr2, w, ch));       // middle h
  P.push(vStroke(xrL,  yr2,  yr3, w, ch));       // left-down (bottom-half)
  P.push(hStroke(xrL,  xrR,  yr3, w, ch));       // bottom h

  // ── ㅁ (right half of jongseong) ──
  P.push(squareRing(9.0, 8.8, 15.5, 15.3, w, ch));

  return P;
}

// 은 = ㅇ(초성) + ㅡ(중성) + ㄴ(종성)
// Layout:
//   ㅇ : centered top, box (4.5..11.5, 0.5..7.5) — size 7
//   ㅡ : full-width bar at y=9
//   ㄴ : left-vertical + bottom-horizontal across (0.5..15.5, 10.5..15.5)
function build_은(w, ch) {
  const P = [];
  // ㅇ
  const R = 3.5;
  P.push(octRing(8.0, 4.0, R, w));
  // ㅡ
  P.push(hStroke(0.5, 15.5, 9.2, w, ch));
  // ㄴ
  P.push(vStroke(1.5, 10.8, 15.3, w, ch));
  P.push(hStroke(0.5, 15.5, 15.3, w, ch));
  return P;
}

// 공 = ㄱ(초성) + ㅗ(중성) + ㅇ(종성)
// Layout:
//   ㄱ : top-left, horizontal+right-down   (0..9, 0..6)
//   ㅗ : center tick + full horizontal     (tick in 6..8, bar at y=8)
//   ㅇ : bottom centered ring              (box 4.5..11.5, 9..15.5)
function build_공(w, ch) {
  const P = [];
  // ㄱ: top horizontal + right descending vertical (shifted left so ㅗ tick has room)
  P.push(hStroke(1.5, 10.5, 1.2, w, ch));
  P.push(vStroke(10.0, 1.2, 5.5, w, ch));
  // ㅗ: center vertical tick + full-width bar
  P.push(vStroke(8.0, 5.0, 8.2, w, ch));
  P.push(hStroke(0.5, 15.5, 8.2, w, ch));
  // ㅇ: centered octagonal ring
  const R = 3.2;
  P.push(octRing(8.0, 12.4, R, w));
  return P;
}

// 주 = ㅈ(초성) + ㅜ(중성)
// Layout:
//   ㅈ : top, wider than in 젊             (1..15, 0.5..7)
//   ㅜ : bottom, full-width + descender    (bar y=9, tick x=8)
function build_주(w, ch) {
  const P = [];
  // ㅈ: top h-bar + two splaying 45° legs
  P.push(hStroke(1.5, 14.5, 1.2, w, ch));
  P.push(dStroke(8.0, 2.0, 3.5, 7.0, w, ch));    // left leg
  P.push(dStroke(8.0, 2.0, 12.5, 7.0, w, ch));   // right leg
  // ㅜ: full bar + descending tick
  P.push(hStroke(0.5, 15.5, 9.2, w, ch));
  P.push(vStroke(8.0, 9.2, 15.3, w, ch));
  return P;
}

const GLYPHS = { '젊': build_젊, '은': build_은, '공': build_공, '주': build_주 };

// ───────────────────────────────────────────────────────────────────
// Glyph React component
// ───────────────────────────────────────────────────────────────────
function Glyph({
  char, size = 200, weight = 1.5, chamfer, showGrid = false,
  color = '#000', bg = 'transparent', showGuides = false, strokeColor,
  gridUnits = 16,
}) {
  const ch = chamfer ?? weight;
  const builder = GLYPHS[char];
  if (!builder) return <span style={{ width: size, height: size, display: 'inline-block' }} />;
  let paths;
  try { paths = builder(weight, ch); } catch (e) { paths = []; console.error(e); }

  const gridLines = [];
  if (showGrid) {
    for (let i = 0; i <= gridUnits; i++) {
      const p = (i / gridUnits) * 16;
      const major = i % 4 === 0;
      gridLines.push(
        <line key={'v'+i} x1={p} y1={0} x2={p} y2={16}
          stroke={major ? 'rgba(0,0,0,0.18)' : 'rgba(0,0,0,0.06)'} strokeWidth={major ? 0.04 : 0.025} />,
        <line key={'h'+i} x1={0} y1={p} x2={16} y2={p}
          stroke={major ? 'rgba(0,0,0,0.18)' : 'rgba(0,0,0,0.06)'} strokeWidth={major ? 0.04 : 0.025} />
      );
    }
  }

  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      style={{ display: 'block', background: bg, shapeRendering: 'geometricPrecision' }}
    >
      {showGrid && <g>{gridLines}</g>}
      {paths.map((d, i) => (
        <path key={i} d={d} fill={color} fillRule="evenodd" />
      ))}
      {strokeColor && paths.map((d, i) => (
        <path key={'s'+i} d={d} fill="none" stroke={strokeColor} strokeWidth={0.04} />
      ))}
    </svg>
  );
}

// ── SVG string export (for download) ──────────────────────────────
function glyphToSVG(char, { size = 1000, weight = 1.5, chamfer, color = '#000' } = {}) {
  const ch = chamfer ?? weight;
  const builder = GLYPHS[char];
  if (!builder) return '';
  const paths = builder(weight, ch);
  const body = paths.map(d => `  <path d="${d}" fill="${color}" fill-rule="evenodd"/>`).join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${size}" height="${size}">
${body}
</svg>`;
}

function downloadSVG(char, opts) {
  const svg = glyphToSVG(char, opts);
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `${char}.svg`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

Object.assign(window, { Glyph, glyphToSVG, downloadSVG, GLYPHS });
