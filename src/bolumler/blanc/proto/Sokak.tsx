import React from "react";
import { Easing, interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";

// Ay ışıklı Paris sokağı, 1834 (Haussmann öncesi) — tamamen vektör, katmanlı
type P = [number, number];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lp = (a: P, b: P, t: number): P => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
const ZMAX = 7;
const sz = (z: number) => (1 - 1 / z) / (1 - 1 / ZMAX);
const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const SOL = { A: [-80, -150] as P, B: [410, 600] as P, C: [410, 1130] as P, D: [-80, 2050] as P };
const SAG = { A: [1160, -150] as P, B: [670, 600] as P, C: [670, 1130] as P, D: [1160, 2050] as P };
type Q = typeof SOL;
const cephe = (q: Q, z: number, v: number): P => { const t = sz(z); return lp(lp(q.A, q.B, t), lp(q.D, q.C, t), v); };
const poly = (pts: P[]) => pts.map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ");
const dq = (q: Q, z1: number, z2: number, v1: number, v2: number): P[] => [cephe(q, z1, v1), cephe(q, z2, v1), cephe(q, z2, v2), cephe(q, z1, v2)];
// sokak zemini: z derinliği, u (0 sol duvar … 1 sağ duvar)
const zemin = (z: number, u: number): P => { const t = sz(z); return [lerp(lerp(-80, 410, t), lerp(1160, 670, t), u), lerp(2050, 1130, t)]; };

// Cephe üzerine perspektife yakın yazı (afin)
const Yazi: React.FC<{ q: Q; side: "sol" | "sag"; z1: number; z2: number; v1: number; v2: number; text: string; color?: string }> = ({ q, side, z1, z2, v1, v2, text, color = "#e9d9b0" }) => {
  const [za, zb] = side === "sol" ? [z1, z2] : [z2, z1];
  const p0 = cephe(q, za, v1), p1 = cephe(q, zb, v1), p3 = cephe(q, za, v2);
  const W = 400, H = 60;
  const m = [(p1[0] - p0[0]) / W, (p1[1] - p0[1]) / W, (p3[0] - p0[0]) / H, (p3[1] - p0[1]) / H, p0[0], p0[1]];
  return (
    <g transform={`matrix(${m.map((n) => n.toFixed(4)).join(",")})`}>
      <text x={W / 2} y={H * 0.78} textAnchor="middle" fontFamily="'Playfair Display', serif" fontWeight={900} fontSize={H * 0.82} fill={color} textLength={W * 0.86} lengthAdjust="spacingAndGlyphs">{text}</text>
    </g>
  );
};

// ---- 1830'lar Paris evi ----
const SIVA = ["#6a6170", "#73697a", "#5f6676", "#6d6f7c", "#7a6c70", "#655f6e"];
const PANJUR = ["#2f4a40", "#4a3328", "#33405a"];
const DUKKAN = ["#1f3a30", "#4a1c22", "#1f2a45"];

type EvTanim = { z1: number; z2: number; dukkan?: string };
const EVLER_SOL: EvTanim[] = [{ z1: 1, z2: 1.55, dukkan: "BOULANGERIE" }, { z1: 1.55, z2: 2.2 }, { z1: 2.2, z2: 2.9, dukkan: "VINS" }, { z1: 2.9, z2: 3.8 }, { z1: 3.8, z2: 5 }, { z1: 5, z2: 7 }];
const EVLER_SAG: EvTanim[] = [{ z1: 1, z2: 1.55, dukkan: "CHAPELIER" }, { z1: 1.55, z2: 2.2 }, { z1: 2.2, z2: 3.6, dukkan: "CAFÉ" }, { z1: 3.6, z2: 4.6 }, { z1: 4.6, z2: 5.6 }, { z1: 5.6, z2: 7 }];

const Ev: React.FC<{ q: Q; side: "sol" | "sag"; e: EvTanim; idx: number; frame: number }> = ({ q, side, e, idx, frame }) => {
  const { z1, z2 } = e;
  const r = (k: string) => random(`${side}${idx}${k}`);
  const top = 0.02 + r("top") * 0.16;
  const renk = SIVA[Math.floor(r("c") * SIVA.length)];
  const yari = !e.dukkan && r("yari") < 0.35;
  const out = side === "sol" ? -1 : 1;
  const a = cephe(q, z1, top), b = cephe(q, z2, top);
  const hNear = cephe(q, z1, 1)[1] - cephe(q, z1, top)[1];
  const hFar = cephe(q, z2, 1)[1] - cephe(q, z2, top)[1];
  const roofA: P = [a[0] + out * hNear * 0.1, a[1] - hNear * 0.3];
  const roofB: P = [b[0] + out * hFar * 0.1, b[1] - hFar * 0.3];
  const katlar = 3;
  const kolon = z2 - z1 > 0.9 ? 3 : 2;
  const els: React.ReactNode[] = [];
  const zemKat = e.dukkan ? 0.72 : 0.78;
  els.push(<polygon key="g" points={poly(dq(q, z1, z2, top, 1))} fill={renk} />);
  // ay ışığı yukarıdan, sokak dibi karanlık (ortam kapanması)
  els.push(<polygon key="isik" points={poly(dq(q, z1, z2, top, 1))} fill="url(#cepheIsik)" />);
  // köşe taşları (quoin)
  for (let k = 0; k < 14; k++) { const v1 = top + (k * (1 - top)) / 14; const w = k % 2 ? 0.05 : 0.08; els.push(<polygon key={`q${k}`} points={poly(dq(q, z1, z1 + w * (z2 - z1), v1, v1 + (1 - top) / 14 - 0.004))} fill="#ffffff" opacity={0.07} />); }
  // korniş
  els.push(<polygon key="kor" points={poly(dq(q, z1, z2, top, top + 0.018))} fill="#a3a0b4" opacity={0.55} />);
  els.push(<polygon key="kor2" points={poly(dq(q, z1, z2, top + 0.018, top + 0.03))} fill="#000" opacity={0.28} />);
  // kat silmeleri
  for (let k = 1; k < katlar; k++) { const v = top + 0.04 + ((zemKat - top - 0.04) * k) / katlar; els.push(<polygon key={`s${k}`} points={poly(dq(q, z1, z2, v - 0.008, v))} fill="#ffffff" opacity={0.1} />); }
  // yarı ahşap
  if (yari) {
    for (let k = 0; k <= katlar; k++) { const v = top + 0.04 + ((zemKat - top - 0.04) * k) / katlar; els.push(<polyline key={`yk${k}`} points={poly([cephe(q, z1, v), cephe(q, z2, v)])} stroke="#2a2026" strokeWidth={6} fill="none" />); }
    for (let c = 0; c <= 5; c++) { const z = z1 + ((z2 - z1) * c) / 5; els.push(<polyline key={`yd${c}`} points={poly([cephe(q, z, top + 0.03), cephe(q, z, zemKat)])} stroke="#2a2026" strokeWidth={5} fill="none" />); }
    for (let k = 0; k < katlar; k++) { const v1 = top + 0.04 + ((zemKat - top - 0.04) * k) / katlar, v2 = top + 0.04 + ((zemKat - top - 0.04) * (k + 1)) / katlar; els.push(<polyline key={`yx${k}`} points={poly([cephe(q, z1, v1), cephe(q, z1 + (z2 - z1) / 5, v2)])} stroke="#2a2026" strokeWidth={4} fill="none" />); }
  }
  // pencereler
  for (let k = 0; k < katlar; k++) {
    const v = top + 0.07 + ((zemKat - top - 0.06) * k) / katlar;
    const dv = (zemKat - top - 0.06) / katlar * 0.62;
    for (let c = 0; c < kolon; c++) {
      if (r(`yok${k}${c}`) < 0.08) continue;
      const zc = z1 + ((z2 - z1) * (c + 0.5)) / kolon + (r(`kz${k}${c}`) - 0.5) * 0.05 * (z2 - z1);
      const w = (0.15 * (z2 - z1)) / kolon * (1 + r(`kw${k}${c}`) * 0.25);
      const lit = r(`lit${k}${c}`) < 0.36;
      const warm = r(`wc${k}${c}`) < 0.5 ? "#ffb357" : "#ff9a40";
      const pan = PANJUR[Math.floor(r(`pj${k}${c}`) * PANJUR.length)];
      const acik = r(`ac${k}${c}`);
      const fl = 0.9 + Math.sin(frame * 0.06 + k * 2 + c * 5) * 0.06;
      els.push(
        <g key={`w${k}${c}`}>
          {/* taş söve */}
          <polygon points={poly(dq(q, zc - w * 1.18, zc + w * 1.18, v - 0.012, v + dv + 0.01))} fill="#b9b4c4" opacity={0.28} />
          <polygon points={poly(dq(q, zc - w, zc + w, v, v + dv))} fill={lit ? warm : "#1a2033"} opacity={lit ? fl : 1} />
          {lit && <polygon points={poly(dq(q, zc - w * 0.95, zc - w * 0.35, v, v + dv))} fill="#a8502a" opacity={0.55} />}
          {lit && <polygon points={poly(dq(q, zc - w, zc + w, v, v + dv))} fill={warm} opacity={0.4} style={{ filter: "blur(10px)" }} />}
          {!lit && <polygon points={poly(dq(q, zc - w, zc, v, v + dv * 0.5))} fill="#7f93c8" opacity={0.12} />}
          {/* kayıtlar */}
          <polyline points={poly([cephe(q, zc, v), cephe(q, zc, v + dv)])} stroke="#1b1d2a" strokeWidth={2} fill="none" />
          {[0.33, 0.66].map((t) => <polyline key={t} points={poly([cephe(q, zc - w, v + dv * t), cephe(q, zc + w, v + dv * t)])} stroke="#1b1d2a" strokeWidth={1.4} fill="none" />)}
          {/* lento */}
          <polygon points={poly(dq(q, zc - w * 1.3, zc + w * 1.3, v - 0.024, v - 0.012))} fill="#c9c3d2" opacity={0.35} />
          {/* panjurlar (lamelli) */}
          {acik < 0.8 && [[zc - w * 2.05, zc - w * 1.05], [zc + w * 1.05, zc + w * 2.05]].map(([pa, pb], i) => (
            <g key={i}>
              <polygon points={poly(dq(q, pa, pb, v, v + dv))} fill={pan} />
              {Array.from({ length: 6 }).map((_, j) => <polyline key={j} points={poly([cephe(q, pa, v + (dv * (j + 1)) / 7), cephe(q, pb, v + (dv * (j + 1)) / 7)])} stroke="#000" strokeWidth={1} opacity={0.35} fill="none" />)}
            </g>
          ))}
          {/* sardunya saksısı */}
          {k > 0 && r(`cicek${k}${c}`) < 0.35 && (
            <g>
              <polygon points={poly(dq(q, zc - w * 1.05, zc + w * 1.05, v + dv, v + dv + 0.014))} fill="#6a3a24" />
              {Array.from({ length: 5 }).map((_, j) => { const p0 = cephe(q, zc - w + (2 * w * j) / 4, v + dv - 0.004); return <circle key={j} cx={p0[0]} cy={p0[1]} r={Math.max(3, hNear * 0.006)} fill={j % 2 ? "#d0324a" : "#2f6a3a"} />; })}
            </g>
          )}
          {/* balkon demiri (alt katlarda) */}
          {k === 0 && r(`blk${c}`) < 0.6 && (
            <g>
              <polyline points={poly([cephe(q, zc - w * 1.3, v + dv * 0.62), cephe(q, zc + w * 1.3, v + dv * 0.62)])} stroke="#0f111a" strokeWidth={3} fill="none" />
              {Array.from({ length: 7 }).map((_, j) => { const zz = zc - w * 1.3 + (2.6 * w * j) / 6; return <polyline key={j} points={poly([cephe(q, zz, v + dv * 0.62), cephe(q, zz, v + dv)])} stroke="#0f111a" strokeWidth={1.6} fill="none" />; })}
            </g>
          )}
        </g>,
      );
    }
  }
  // zemin kat
  if (e.dukkan) {
    const renkD = DUKKAN[Math.floor(r("dk") * DUKKAN.length)];
    const lit = e.dukkan === "CAFÉ" || r("dl") < 0.4;
    els.push(
      <g key="dukkan">
        <polygon points={poly(dq(q, z1 + 0.03 * (z2 - z1), z2 - 0.03 * (z2 - z1), zemKat, 1))} fill={renkD} />
        <polygon points={poly(dq(q, z1 + 0.03 * (z2 - z1), z2 - 0.03 * (z2 - z1), zemKat, zemKat + 0.045))} fill="#120f14" opacity={0.6} />
        <Yazi q={q} side={side} z1={z1 + 0.08 * (z2 - z1)} z2={z2 - 0.08 * (z2 - z1)} v1={zemKat + 0.004} v2={zemKat + 0.042} text={e.dukkan} color={e.dukkan === "CAFÉ" ? "#ffd27a" : "#e7d6a8"} />
        <polygon points={poly(dq(q, z1 + 0.1 * (z2 - z1), z1 + 0.55 * (z2 - z1), zemKat + 0.06, 0.96))} fill={lit ? "#ffb357" : "#151a28"} opacity={lit ? 0.92 : 1} />
        {lit && <polygon points={poly(dq(q, z1 + 0.1 * (z2 - z1), z1 + 0.55 * (z2 - z1), zemKat + 0.06, 0.96))} fill="#ff9a40" opacity={0.6} style={{ filter: "blur(22px)" }} />}
        {[0.25, 0.4].map((t) => <polyline key={t} points={poly([cephe(q, z1 + t * (z2 - z1), zemKat + 0.06), cephe(q, z1 + t * (z2 - z1), 0.96)])} stroke="#140f12" strokeWidth={3} fill="none" />)}
        <polygon points={poly(dq(q, z1 + 0.65 * (z2 - z1), z1 + 0.85 * (z2 - z1), zemKat + 0.07, 1))} fill="#120d10" />
      </g>,
    );
  } else {
    const zd = z1 + (z2 - z1) * (0.3 + r("kapi") * 0.35);
    els.push(<g key="kapi"><polygon points={poly(dq(q, zd - 0.02 * (z2 - z1), zd + 0.2 * (z2 - z1), 0.8, 1))} fill="#b9b4c4" opacity={0.22} /><polygon points={poly(dq(q, zd, zd + 0.18 * (z2 - z1), 0.82, 1))} fill="#231a1c" /></g>);
  }
  // çatı: arduvaz sıraları + mahya + çatı pencereleri + bacalar
  els.push(<polygon key="cati" points={poly([a, b, roofB, roofA])} fill="#2c3550" />);
  for (let k = 1; k < 6; k++) els.push(<polyline key={`ar${k}`} points={poly([lp(a, roofA, k / 6), lp(b, roofB, k / 6)])} stroke="#1c2236" strokeWidth={1.5} fill="none" />);
  els.push(<polyline key="mahya" points={poly([roofA, roofB])} stroke="#a9b8e6" strokeWidth={2.5} opacity={0.6} fill="none" />);
  for (let d = 0; d < kolon; d++) {
    const t = (d + 0.5) / kolon;
    const m = lp(lp(a, b, t), lp(roofA, roofB, t), 0.3);
    const hh = (hNear + (hFar - hNear) * t) * 0.05;
    const dl = r(`dl${d}`) < 0.18;
    els.push(<g key={`dor${d}`}>
      <polygon points={poly([[m[0] - hh * 0.55, m[1]], [m[0] + hh * 0.55, m[1]], [m[0] + hh * 0.55, m[1] - hh], [m[0], m[1] - hh * 1.55], [m[0] - hh * 0.55, m[1] - hh]])} fill="#3a4262" />
      <polyline points={poly([[m[0] - hh * 0.6, m[1] - hh], [m[0], m[1] - hh * 1.6], [m[0] + hh * 0.6, m[1] - hh]])} stroke="#a9b8e6" strokeWidth={1.5} opacity={0.5} fill="none" />
      <rect x={m[0] - hh * 0.28} y={m[1] - hh * 0.9} width={hh * 0.56} height={hh * 0.75} fill={dl ? "#ffb357" : "#141a2c"} />
    </g>);
  }
  const ch = lp(roofA, roofB, 0.2 + r("bac") * 0.6); const cw = Math.max(9, hNear * 0.035);
  els.push(<g key="baca"><rect x={ch[0] - cw} y={ch[1] - cw * 3} width={cw * 2} height={cw * 3.3} fill="#5a4a52" /><rect x={ch[0] - cw * 1.1} y={ch[1] - cw * 3.1} width={cw * 2.2} height={cw * 0.4} fill="#7a6a70" />{[0, 1, 2].map((i) => <rect key={i} x={ch[0] - cw * 0.9 + i * cw * 0.65} y={ch[1] - cw * 3.9} width={cw * 0.45} height={cw * 0.9} fill="#8a5a42" />)}</g>);
  return <g>{els}</g>;
};

const Cephe: React.FC<{ q: Q; side: "sol" | "sag"; frame: number }> = ({ q, side, frame }) => {
  const list = side === "sol" ? EVLER_SOL : EVLER_SAG;
  return <g>{list.map((e, i) => ({ e, i })).reverse().map(({ e, i }) => <Ev key={i} q={q} side={side} e={e} idx={i} frame={frame} />)}</g>;
};

// Notre-Dame (1834: sivri kule yok) — sokağın ucunda, ay ışığında
const Uzak: React.FC = () => (
  <g>
    <g transform="translate(540,1035) scale(1.05)">
      <g fill="#262e52">
        <rect x={-120} y={-330} width={74} height={330} />
        <rect x={46} y={-330} width={74} height={330} />
        <rect x={-46} y={-235} width={92} height={235} />
        <rect x={-128} y={-338} width={90} height={12} />
        <rect x={38} y={-338} width={90} height={12} />
        <rect x={-50} y={-244} width={100} height={10} />
      </g>
      {[-120, 46].map((x) => <rect key={x} x={x} y={-330} width={6} height={330} fill="#9fb3ea" opacity={0.35} />)}
      <circle cx={0} cy={-160} r={32} fill="#1b2140" />
      <circle cx={0} cy={-160} r={32} fill="#ffb357" opacity={0.3} />
      {[-104, -76, 62, 90].map((x) => <rect key={x} x={x} y={-300} width={14} height={70} rx={7} fill="#141a33" />)}
      {[-30, 0, 30].map((x) => <path key={x} d={`M ${x - 12} 0 L ${x - 12} -60 Q ${x} -78 ${x + 12} -60 L ${x + 12} 0 Z`} fill="#141a33" />)}
    </g>
    <path d="M 400 860 L 430 840 L 452 852 L 452 818 L 466 818 L 466 858 L 482 870 L 482 1140 L 400 1140 Z" fill="#20284a" />
    <path d="M 680 870 L 652 846 L 632 856 L 632 826 L 618 826 L 618 860 L 598 878 L 598 1140 L 680 1140 Z" fill="#20284a" />
  </g>
);

const Zemin: React.FC = () => {
  const rows: React.ReactNode[] = [];
  let k = 0;
  for (let z = 1; z < ZMAX; z *= 1.045) {
    const t = sz(z), t2 = sz(z * 1.045);
    const y1 = lerp(2050, 1130, t), y2 = lerp(2050, 1130, t2);
    const xl = lerp(-80, 410, t), xr = lerp(1160, 670, t);
    const n = 16, w = (xr - xl) / n;
    for (let i = -1; i < n + 1; i++) {
      const x = xl + i * w + (k % 2) * w * 0.5;
      const rr = random(`st${k}-${i}`);
      const c = Math.round(48 + rr * 22);
      rows.push(<rect key={`${k}-${i}`} x={x + w * 0.06} y={y2 + (y1 - y2) * 0.08} width={w * 0.88} height={(y1 - y2) * 0.84} rx={Math.min(w, y1 - y2) * 0.35} fill={`rgb(${c},${c + 4},${c + 18})`} />);
      if (rr > 0.6) rows.push(<rect key={`h${k}-${i}`} x={x + w * 0.2} y={y2 + (y1 - y2) * 0.15} width={w * 0.5} height={(y1 - y2) * 0.18} rx={3} fill="#b9c8f0" opacity={0.12} />);
    }
    k++;
  }
  return (
    <g>
      <polygon points="-80,2050 410,1130 670,1130 1160,2050" fill="#171b28" />
      {rows}
      {/* ortadan su oluğu (caniveau) */}
      <polygon points="498,2050 538,1130 542,1130 582,2050" fill="#0c0f18" />
      <polygon points="526,2050 539.5,1130 540.5,1130 554,2050" fill="#9fb3ea" opacity={0.25} />
    </g>
  );
};

// Sokağın ortasına iple asılı yağ lambası (réverbère) — 1830'lar Paris'inin simgesi
export const REVERBERE_Z = 2.3;
export const reverbere = (frame: number) => {
  const l = cephe(SOL, REVERBERE_Z, 0.36), r = cephe(SAG, REVERBERE_Z, 0.36);
  const mid: P = [(l[0] + r[0]) / 2, (l[1] + r[1]) / 2 + 90];
  const sway = Math.sin(frame * 0.045) * 4;
  return { l, r, mid, lamp: [mid[0] + sway, mid[1] + 60] as P, sway };
};
const Reverbere: React.FC<{ frame: number; fl: number }> = ({ frame, fl }) => {
  const { l, r, mid, lamp, sway } = reverbere(frame);
  return (
    <g>
      <path d={`M ${l[0]} ${l[1]} Q ${mid[0]} ${mid[1] + 40} ${r[0]} ${r[1]}`} stroke="#0a0c14" strokeWidth={3} fill="none" />
      <line x1={mid[0]} y1={mid[1] + 8} x2={lamp[0]} y2={lamp[1] - 26} stroke="#0a0c14" strokeWidth={2.5} />
      <g transform={`translate(${lamp[0]},${lamp[1]}) rotate(${sway * 0.8})`}>
        <circle r={150 + fl * 8} fill="#ffb357" opacity={0.28} style={{ filter: "blur(30px)" }} />
        <path d="M -16 -26 L 16 -26 L 22 10 L -22 10 Z" fill="#ffd98f" stroke="#0a0c14" strokeWidth={3} />
        <path d="M -20 -26 L 20 -26 L 0 -42 Z" fill="#0a0c14" />
        <rect x={-24} y={10} width={48} height={6} fill="#0a0c14" />
        <circle r={10} cy={-6} fill="#fff4d0" />
      </g>
    </g>
  );
};

// Üç renkli bayrak (1830'dan beri), dalgalanır
const Bayrak: React.FC<{ frame: number }> = ({ frame }) => {
  const p = cephe(SAG, 1.75, 0.3);
  const L = 150, H = 100;
  const wave = (x: number) => Math.sin(frame * 0.12 - x * 0.05) * (x / L) * 12;
  const strip = (x0: number, x1: number, c: string) => {
    const pts: P[] = [];
    for (let x = x0; x <= x1; x += 10) pts.push([x, wave(x)]);
    for (let x = x1; x >= x0; x -= 10) pts.push([x, H + wave(x)]);
    return <polygon points={poly(pts.map(([x, y]) => [-x, y] as P))} fill={c} />;
  };
  return (
    <g transform={`translate(${p[0]},${p[1]}) rotate(28)`}>
      <line x1={0} y1={0} x2={-L - 30} y2={0} stroke="#1a1418" strokeWidth={6} />
      <g transform="translate(-20,0)">
        {strip(0, 50, "#2a3f7e")}{strip(50, 100, "#d9d4c8")}{strip(100, 150, "#a8262c")}
        <polygon points={poly([[-0, 0], [-150, wave(150)], [-150, H + wave(150)], [0, H]])} fill="url(#bayrakGolge)" />
      </g>
    </g>
  );
};

// Duvar ilanı
const Ilan: React.FC = () => (
  <g>
    <polygon points={poly(dq(SOL, 1.9, 2.12, 0.6, 0.72))} fill="#d9cfb2" opacity={0.85} />
    <Yazi q={SOL} side="sol" z1={1.92} z2={2.1} v1={0.605} v2={0.635} text="AVIS" color="#2a1c14" />
    {[0.65, 0.67, 0.69].map((v) => <polyline key={v} points={poly([cephe(SOL, 1.93, v), cephe(SOL, 2.09, v)])} stroke="#3a2c20" strokeWidth={2} opacity={0.6} fill="none" />)}
  </g>
);

// Kafe terası: masa + sandalye siluetleri
const Teras: React.FC = () => (
  <g>
    {[[2.5, 0.9], [2.9, 0.88], [3.3, 0.9]].map(([z, u], i) => {
      const [x, y] = zemin(z, u); const s = 1 / z * 2.2;
      return (
        <g key={i} transform={`translate(${x},${y}) scale(${s})`}>
          <ellipse cx={0} cy={-62} rx={30} ry={8} fill="#2a2024" />
          <rect x={-3} y={-62} width={6} height={62} fill="#1a1416" />
          <path d="M 30 0 L 30 -40 L 52 -40 L 52 -80 M 30 -40 L 30 -36" stroke="#1a1416" strokeWidth={5} fill="none" />
        </g>
      );
    })}
  </g>
);

// Çatıda kedi — gözleri fareyi izler
export const Kedi: React.FC<{ frame: number; bakX: number }> = ({ frame, bakX }) => {
  const p = cephe(SOL, 2.25, 0.0);
  const kuyruk = Math.sin(frame * 0.08) * 18;
  return (
    <g transform={`translate(${p[0] - 70},${p[1] - 120}) scale(1.1)`}>
      <path d={`M 34 -6 Q 60 -10 ${62 + kuyruk * 0.3} ${-40 + kuyruk}`} stroke="#07080e" strokeWidth={6} fill="none" strokeLinecap="round" />
      <ellipse cx={14} cy={-14} rx={24} ry={14} fill="#07080e" />
      <circle cx={-10} cy={-30} r={11} fill="#07080e" />
      <path d="M -18 -38 L -16 -50 L -9 -40 Z M -6 -40 L -2 -51 L 2 -39 Z" fill="#07080e" />
      <circle cx={-14 + bakX * 2} cy={-31} r={2.2} fill="#d8f07a" />
      <circle cx={-6 + bakX * 2} cy={-31} r={2.2} fill="#d8f07a" />
    </g>
  );
};

// Fare: oluktan çıkar, koklar, baston vuruşunda kaçar
export const Fare: React.FC<{ t: number; tap: number }> = ({ t, tap }) => {
  const frame = useCurrentFrame() * 30 / useVideoConfig().fps;
  // yol: oluk (540,1560) → sağa (690,1600) dur → vuruşta sola kaç
  const cikis = interpolate(t, [1.2, 2.6], [0, 1], { ...cl, easing: Easing.inOut(Easing.quad) });
  const kac = interpolate(t, [tap + 0.05, tap + 0.75], [0, 1], { ...cl, easing: Easing.in(Easing.quad) });
  if (t < 1.2 || kac >= 1) return null;
  let x = lerp(548, 700, cikis), y = lerp(1500, 1585, cikis);
  if (kac > 0) { x = lerp(700, -120, kac); y = lerp(1585, 1700, kac); }
  const yon = kac > 0 ? -1 : 1;
  const kos = cikis < 1 || kac > 0;
  const hiz = kac > 0 ? 2.2 : 1;
  const koklama = !kos || (t > 2.6 && kac === 0) ? Math.sin(frame * 1.3) * 2.5 : 0;
  const ayak = kos ? Math.sin(frame * 1.6 * hiz) : 0;
  const s = 0.9;
  return (
    <g transform={`translate(${x},${y}) scale(${yon * s},${s})`}>
      <path d={`M -26 -6 Q -60 ${-4 + ayak * 6} -84 ${6 - ayak * 4}`} stroke="#3a2a2a" strokeWidth={3} fill="none" strokeLinecap="round" />
      <ellipse cx={0} cy={-12} rx={30} ry={14} fill="#2e2428" />
      <ellipse cx={-6} cy={-18} rx={20} ry={7} fill="#4a3a3e" opacity={0.6} />
      <g transform={`translate(26,${-14 + koklama * 0.3}) rotate(${koklama})`}>
        <path d="M -6 -9 Q 14 -8 22 0 Q 14 6 -6 7 Z" fill="#2e2428" />
        <circle cx={22} cy={0} r={2.6} fill="#c98a8a" />
        <circle cx={6} cy={-12} r={6} fill="#4a3638" />
        <circle cx={9} cy={-3} r={2} fill="#0a0608" />
        <circle cx={9.6} cy={-3.6} r={0.7} fill="#fff" />
        <path d="M 20 1 L 34 -3 M 20 2 L 34 4" stroke="#8a7a7a" strokeWidth={0.8} />
      </g>
      {[-16, 14].map((fx, i) => <line key={i} x1={fx} y1={-2} x2={fx + (i ? ayak : -ayak) * 6} y2={3} stroke="#2e2428" strokeWidth={4} strokeLinecap="round" />)}
    </g>
  );
};

const Gokyuzu: React.FC<{ frame: number }> = ({ frame }) => (
  <g>
    <rect x={-300} y={-400} width={1700} height={1600} fill="url(#gok)" />
    {Array.from({ length: 140 }).map((_, i) => { const x = random(`sx${i}`) * 1600 - 260, y = random(`sy${i}`) * 900 - 380; const tw = 0.5 + 0.5 * Math.sin(frame * 0.08 + i); return <circle key={i} cx={x} cy={y} r={0.8 + random(`sr${i}`) * 1.6} fill="#e8eeff" opacity={0.3 + tw * 0.5} />; })}
    <circle cx={560} cy={300} r={240} fill="url(#ayHale)" />
    <circle cx={560} cy={300} r={78} fill="#f2f0e6" />
    <circle cx={540} cy={285} r={16} fill="#d8d6cc" opacity={0.6} />
    <circle cx={585} cy={320} r={11} fill="#d8d6cc" opacity={0.5} />
    <circle cx={560} cy={300} r={78} fill="url(#ayGolge)" />
    {Array.from({ length: 6 }).map((_, i) => { const w = 260 + random(`cw${i}`) * 300; const x = ((random(`cx${i}`) * 1600 + frame * (0.5 + random(`cv${i}`) * 0.7)) % 1900) - 500; const y = 160 + random(`cy${i}`) * 300; return <ellipse key={i} cx={x} cy={y} rx={w} ry={w * 0.15} fill="#7f8fbe" opacity={0.26} style={{ filter: "blur(14px)" }} />; })}
  </g>
);

const Duman: React.FC<{ x: number; y: number; frame: number; seed: string }> = ({ x, y, frame, seed }) => (
  <g>
    {Array.from({ length: 10 }).map((_, i) => {
      const life = ((frame * 0.5 + i * 18 + random(seed + i) * 30) % 180) / 180;
      return <circle key={i} cx={x + life * 70 + Math.sin(life * 6 + i) * 10} cy={y - life * 220} r={10 + life * 40} fill="#8b93ad" opacity={(1 - life) * 0.22} style={{ filter: "blur(6px)" }} />;
    })}
  </g>
);

export const Tanimlar: React.FC = () => (
  <defs>
    <linearGradient id="gok" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#070b1f" /><stop offset="0.55" stopColor="#1b2852" /><stop offset="1" stopColor="#40507e" /></linearGradient>
    <radialGradient id="ayHale"><stop offset="0" stopColor="#dfe8ff" stopOpacity="0.55" /><stop offset="1" stopColor="#dfe8ff" stopOpacity="0" /></radialGradient>
    <radialGradient id="ayGolge" cx="0.7" cy="0.7" r="0.8"><stop offset="0.6" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#3a4060" stopOpacity="0.35" /></radialGradient>
    <linearGradient id="cepheIsik" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#c8d6ff" stopOpacity="0.16" /><stop offset="0.5" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#05060c" stopOpacity="0.55" /></linearGradient>
    <linearGradient id="bayrakGolge" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#000" stopOpacity="0.1" /><stop offset="1" stopColor="#000" stopOpacity="0.45" /></linearGradient>
    <filter id="siva" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.035 0.06" numOctaves="3" seed="4" /><feColorMatrix type="saturate" values="0" /><feComponentTransfer><feFuncA type="table" tableValues="0 0.35" /></feComponentTransfer></filter>
  </defs>
);

export const FENER: P = cephe(SOL, 1.75, 0.6);
const Fener: React.FC<{ fl: number }> = ({ fl }) => {
  const [x, y] = FENER;
  return (
    <g>
      <path d={`M ${x - 40} ${y - 70} L ${x + 30} ${y - 70} L ${x + 30} ${y - 60}`} stroke="#0b0d14" strokeWidth={7} fill="none" />
      <path d={`M ${x - 40} ${y - 70} Q ${x - 10} ${y - 40} ${x - 40} ${y - 20}`} stroke="#0b0d14" strokeWidth={5} fill="none" />
      <path d={`M ${x + 14} ${y - 60} L ${x + 46} ${y - 60} L ${x + 40} ${y - 10} L ${x + 20} ${y - 10} Z`} fill="#ffd68a" stroke="#0b0d14" strokeWidth={4} />
      <path d={`M ${x + 10} ${y - 62} L ${x + 50} ${y - 62} L ${x + 30} ${y - 80} Z`} fill="#0b0d14" />
      <circle cx={x + 30} cy={y - 36} r={70 + fl * 6} fill="#ffb456" opacity={0.35} style={{ filter: "blur(18px)" }} />
    </g>
  );
};

export const Sokak: React.FC<{ katman: "gok" | "uzak" | "orta"; t?: number; tap?: number }> = ({ katman, t = 0, tap = 99 }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame() * 30 / fps; // 30 fps eşdeğeri zaman
  const fl = Math.sin(frame * 0.7) * 0.5 + Math.sin(frame * 1.9) * 0.3;
  if (katman === "gok") return <Gokyuzu frame={frame} />;
  if (katman === "uzak") return <g><Uzak /><Duman x={440} y={820} frame={frame} seed="d1" /><Duman x={640} y={830} frame={frame} seed="d2" /></g>;
  const { lamp } = reverbere(frame);
  return (
    <g>
      <Zemin />
      {/* ıslak zemin yansımaları */}
      <ellipse cx={lamp[0]} cy={1420} rx={45} ry={200} fill="#ffb357" opacity={0.22 + fl * 0.03} style={{ filter: "blur(14px)" }} />
      <ellipse cx={560} cy={1230} rx={36} ry={140} fill="#cfdcff" opacity={0.16} style={{ filter: "blur(10px)" }} />
      <ellipse cx={FENER[0] + 70} cy={1680} rx={60} ry={260} fill="#ffb456" opacity={0.2 + fl * 0.03} style={{ filter: "blur(16px)" }} />
      <ellipse cx={cephe(SAG, 2.6, 0.95)[0] - 30} cy={1500} rx={70} ry={200} fill="#ff9d3a" opacity={0.2} style={{ filter: "blur(18px)" }} />
      <Cephe q={SOL} side="sol" frame={frame} />
      <Cephe q={SAG} side="sag" frame={frame} />
      {/* sıva dokusu */}
      <g style={{ mixBlendMode: "multiply" }}>
        <polygon points={poly([SOL.A, SOL.B, SOL.C, SOL.D])} filter="url(#siva)" fill="#fff" />
        <polygon points={poly([SAG.A, SAG.B, SAG.C, SAG.D])} filter="url(#siva)" fill="#fff" />
      </g>
      <Ilan />
      <Teras />
      <Bayrak frame={frame} />
      <Fener fl={fl} />
      <Reverbere frame={frame} fl={fl} />
      <Fare t={t} tap={tap} />
    </g>
  );
};
