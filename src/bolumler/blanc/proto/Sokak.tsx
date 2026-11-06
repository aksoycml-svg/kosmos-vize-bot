import React from "react";
import { random, useCurrentFrame } from "remotion";

// Ay ışıklı Paris sokağı, 1834 — tamamen vektör, katmanlı (paralaks için)
type P = [number, number];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lp = (a: P, b: P, t: number): P => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
// derinlik: z=1 yakın, z=ZMAX uzak → ekran parametresi
const ZMAX = 7;
const sz = (z: number) => (1 - 1 / z) / (1 - 1 / ZMAX);

// Cephe dörtgenleri: üst-yakın, üst-uzak, alt-uzak, alt-yakın
const SOL = { A: [-80, -150] as P, B: [410, 600] as P, C: [410, 1130] as P, D: [-80, 2050] as P };
const SAG = { A: [1160, -150] as P, B: [670, 600] as P, C: [670, 1130] as P, D: [1160, 2050] as P };
type Q = typeof SOL;
const cephe = (q: Q, z: number, v: number): P => { const t = sz(z); return lp(lp(q.A, q.B, t), lp(q.D, q.C, t), v); };
const poly = (pts: P[]) => pts.map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ");

// ---- Haussmann öncesi (1830'lar) Paris evleri ----
const SIVA = ["#4f4a5a", "#5a5160", "#4a5262", "#575a66", "#5e5560", "#4c4856"];
const PANJUR = ["#23342e", "#3a2a22", "#2a3040"];

// cephe üzerinde (z,v) dörtgeni
const dq = (q: Q, z1: number, z2: number, v1: number, v2: number): P[] => [cephe(q, z1, v1), cephe(q, z2, v1), cephe(q, z2, v2), cephe(q, z1, v2)];

const Ev: React.FC<{ q: Q; side: "sol" | "sag"; z1: number; z2: number; idx: number; frame: number }> = ({ q, side, z1, z2, idx, frame }) => {
  const r = (k: string) => random(`${side}${idx}${k}`);
  const top = 0.02 + r("top") * 0.2; // farklı çatı yükseklikleri
  const renk = SIVA[Math.floor(r("c") * SIVA.length)];
  const yari = r("yari") < 0.3; // yarı ahşap karkas
  const out = side === "sol" ? -1 : 1;
  const a = cephe(q, z1, top), b = cephe(q, z2, top);
  const hNear = cephe(q, z1, 1)[1] - cephe(q, z1, top)[1];
  const hFar = cephe(q, z2, 1)[1] - cephe(q, z2, top)[1];
  const roofA: P = [a[0] + out * hNear * 0.12, a[1] - hNear * 0.34];
  const roofB: P = [b[0] + out * hFar * 0.12, b[1] - hFar * 0.34];
  const katlar = 3 + (r("k") < 0.5 ? 1 : 0);
  const kolon = z2 - z1 > 0.9 ? 3 : 2;
  const els: React.ReactNode[] = [];
  // gövde
  els.push(<polygon key="g" points={poly(dq(q, z1, z2, top, 1))} fill={renk} />);
  // sıva lekeleri / yıpranma
  els.push(<polygon key="l" points={poly(dq(q, z1 + (z2 - z1) * 0.1, z1 + (z2 - z1) * 0.6, top + 0.15, top + 0.4))} fill="#000" opacity={0.08} />);
  // yarı ahşap kirişler
  if (yari) {
    for (let k = 0; k <= katlar; k++) { const v = top + ((1 - top) * k) / (katlar + 0.4); els.push(<polyline key={`yk${k}`} points={poly([cephe(q, z1, v), cephe(q, z2, v)])} stroke="#1f1b22" strokeWidth={5} fill="none" />); }
    for (let c = 0; c <= 4; c++) { const z = z1 + ((z2 - z1) * c) / 4; els.push(<polyline key={`yd${c}`} points={poly([cephe(q, z, top), cephe(q, z, 0.72)])} stroke="#1f1b22" strokeWidth={4} fill="none" />); }
    els.push(<polyline key="yx" points={poly([cephe(q, z1, top + 0.05), cephe(q, z1 + (z2 - z1) * 0.25, top + 0.2)])} stroke="#1f1b22" strokeWidth={4} fill="none" />);
  }
  // pencereler: düzensiz, panjurlu
  for (let k = 0; k < katlar; k++) {
    const v = top + 0.06 + ((0.7 - top) * k) / katlar + (r(`kv${k}`) - 0.5) * 0.02;
    const dv = 0.075 + r(`kh${k}`) * 0.025;
    for (let c = 0; c < kolon; c++) {
      if (r(`yok${k}${c}`) < 0.12) continue;
      const zc = z1 + ((z2 - z1) * (c + 0.5)) / kolon + (r(`kz${k}${c}`) - 0.5) * 0.08 * (z2 - z1);
      const w = 0.16 * (z2 - z1) / kolon * (1 + r(`kw${k}${c}`) * 0.4);
      const lit = r(`lit${k}${c}`) < 0.32;
      const fl = Math.sin(frame * 0.05 + k + c * 3) * 0.08;
      const warm = r(`wc${k}${c}`) < 0.5 ? "#ffad4a" : "#ff9238";
      const pan = PANJUR[Math.floor(r(`pj${k}${c}`) * PANJUR.length)];
      const acik = r(`ac${k}${c}`);
      els.push(
        <g key={`w${k}${c}`}>
          <polygon points={poly(dq(q, zc - w, zc + w, v, v + dv))} fill={lit ? warm : "#151a2a"} opacity={lit ? 0.9 + fl : 1} />
          {lit && <polygon points={poly(dq(q, zc - w, zc + w, v, v + dv))} fill={warm} opacity={0.45} style={{ filter: "blur(9px)" }} />}
          <polyline points={poly([cephe(q, zc, v), cephe(q, zc, v + dv)])} stroke="#0f1220" strokeWidth={2} fill="none" />
          {/* panjurlar */}
          {acik < 0.75 && <polygon points={poly(dq(q, zc - w * 2, zc - w, v, v + dv))} fill={pan} />}
          {acik < 0.75 && <polygon points={poly(dq(q, zc + w, zc + w * 2, v, v + dv))} fill={pan} />}
          {acik >= 0.75 && <polygon points={poly(dq(q, zc - w, zc + w, v, v + dv))} fill={pan} opacity={0.92} />}
          {/* denizlik */}
          <polyline points={poly([cephe(q, zc - w * 1.2, v + dv + 0.006), cephe(q, zc + w * 1.2, v + dv + 0.006)])} stroke="#2a2a36" strokeWidth={3} fill="none" />
        </g>,
      );
    }
  }
  // zemin kat: kemerli kapı / dükkan
  const zd = z1 + (z2 - z1) * (0.25 + r("kapi") * 0.4);
  els.push(<polygon key="kapi" points={poly(dq(q, zd, zd + 0.16 * (z2 - z1), 0.78, 1))} fill="#14121a" />);
  // asılı dükkan tabelası
  if (r("tabela") < 0.45) {
    const p0 = cephe(q, z1 + (z2 - z1) * 0.15, 0.7);
    const len = hNear * 0.12 * -out;
    els.push(<g key="tb"><line x1={p0[0]} y1={p0[1]} x2={p0[0] + len} y2={p0[1]} stroke="#0c0e16" strokeWidth={4} /><rect x={Math.min(p0[0] + len * 0.25, p0[0] + len * 0.95)} y={p0[1] + 4} width={Math.abs(len) * 0.5} height={hNear * 0.035} fill="#3a2c1e" stroke="#0c0e16" strokeWidth={3} /></g>);
  }
  // çatı: dik, kurşun-arduvaz + çatı pencereleri + baca kümeleri
  els.push(<polygon key="cati" points={poly([a, b, roofB, roofA])} fill="#232a3e" />);
  els.push(<polyline key="catik" points={poly([a, b])} stroke="#151826" strokeWidth={5} fill="none" />);
  els.push(<polyline key="mahya" points={poly([roofA, roofB])} stroke="#8d9ac4" strokeWidth={2} opacity={0.5} fill="none" />);
  for (let d = 0; d < kolon; d++) {
    const t = (d + 0.5) / kolon;
    const base = lp(a, b, t), tip = lp(roofA, roofB, t);
    const m = lp(base, tip, 0.35); const hh = (hNear + (hFar - hNear) * t) * 0.09;
    els.push(<g key={`dor${d}`}><polygon points={poly([[m[0] - hh * 0.5, m[1]], [m[0] + hh * 0.5, m[1]], [m[0] + hh * 0.5, m[1] - hh], [m[0], m[1] - hh * 1.5], [m[0] - hh * 0.5, m[1] - hh]])} fill="#2b3048" />
      <rect x={m[0] - hh * 0.25} y={m[1] - hh * 0.85} width={hh * 0.5} height={hh * 0.7} fill={r(`dl${d}`) < 0.35 ? "#ffad4a" : "#111526"} /></g>);
  }
  const ch = lp(roofA, roofB, 0.2 + r("bac") * 0.6); const cw = Math.max(10, hNear * 0.04);
  els.push(<g key="baca"><rect x={ch[0] - cw} y={ch[1] - cw * 3} width={cw * 2} height={cw * 3.2} fill="#3a3040" />{[0, 1, 2].map((i) => <rect key={i} x={ch[0] - cw + i * cw * 0.7} y={ch[1] - cw * 3.8} width={cw * 0.45} height={cw * 0.9} fill="#6a4a3a" />)}</g>);
  return <g>{els}</g>;
};

const EVLER: [number, number][] = [[1, 1.55], [1.55, 2.2], [2.2, 2.9], [2.9, 3.8], [3.8, 5], [5, 7]];
const Cephe: React.FC<{ q: Q; side: "sol" | "sag"; frame: number }> = ({ q, side, frame }) => (
  <g>
    {/* uzaktan yakına çiz (yakın evler öne gelsin) */}
    {[...EVLER].reverse().map(([z1, z2], i) => <Ev key={i} q={q} side={side} z1={z1} z2={z2} idx={i} frame={frame} />)}
  </g>
);

// Notre-Dame (1834: sivri kule YOK) + uzak çatılar
const Uzak: React.FC = () => (
  <g>
    
    {/* katedral */}
    <g transform="translate(540,1000)" fill="#141a33">
      <rect x={-118} y={-300} width={70} height={300} />
      <rect x={48} y={-300} width={70} height={300} />
      <rect x={-48} y={-210} width={96} height={210} />
      <circle cx={0} cy={-150} r={30} fill="#3a2e3a" />
      <circle cx={0} cy={-150} r={30} fill="#ffb456" opacity={0.25} />
      {[-104, -76, 62, 90].map((x) => <rect key={x} x={x} y={-270} width={14} height={60} fill="#151a30" rx={7} />)}
      <rect x={-124} y={-306} width={82} height={10} />
      <rect x={42} y={-306} width={82} height={10} />
    </g>
    {/* uzak çatı siluetleri */}
    <path d="M 380 840 L 410 820 L 430 830 L 430 800 L 444 800 L 444 835 L 470 850 L 470 1140 L 380 1140 Z" fill="#202640" />
    <path d="M 700 860 L 672 830 L 650 840 L 650 812 L 638 812 L 638 846 L 612 870 L 612 1140 L 700 1140 Z" fill="#202640" />
  </g>
);

// Kaldırım taşları (perspektifli, ıslak parlama)
export const Zemin: React.FC = () => {
  const rows: React.ReactNode[] = [];
  let k = 0;
  for (let z = 1; z < ZMAX; z *= 1.045) {
    const t = sz(z), t2 = sz(z * 1.045);
    const y1 = lerp(2050, 1130, t), y2 = lerp(2050, 1130, t2);
    const xl = lerp(-80, 410, t), xr = lerp(1160, 670, t);
    const n = 16, w = (xr - xl) / n;
    for (let i = -1; i < n + 1; i++) {
      const off = (k % 2) * w * 0.5;
      const x = xl + i * w + off;
      const r = random(`st${k}-${i}`);
      const c = Math.round(40 + r * 22);
      rows.push(<rect key={`${k}-${i}`} x={x + w * 0.06} y={y2 + (y1 - y2) * 0.08} width={w * 0.88} height={(y1 - y2) * 0.84} rx={Math.min(w, y1 - y2) * 0.35} fill={`rgb(${c},${c + 4},${c + 16})`} />);
    }
    k++;
  }
  return (
    <g>
      <polygon points="-80,2050 410,1130 670,1130 1160,2050" fill="#151925" />
      {rows}
      <polygon points="500,2050 538,1130 542,1130 580,2050" fill="#0c0f18" />
      <polygon points="525,2050 539,1130 541,1130 555,2050" fill="#8fa3d6" opacity={0.22} />
    </g>
  );
};

// Duvar feneri (ışık kaynağı)
export const FENER: P = cephe(SOL, 1.75, 0.6);
const Fener: React.FC<{ fl: number }> = ({ fl }) => {
  const [x, y] = FENER;
  return (
    <g>
      <path d={`M ${x - 40} ${y - 70} L ${x + 30} ${y - 70} L ${x + 30} ${y - 60}`} stroke="#0b0d14" strokeWidth={7} fill="none" />
      <path d={`M ${x - 40} ${y - 70} Q ${x - 10} ${y - 40} ${x - 40} ${y - 20}`} stroke="#0b0d14" strokeWidth={5} fill="none" />
      <path d={`M ${x + 14} ${y - 60} L ${x + 46} ${y - 60} L ${x + 40} ${y - 10} L ${x + 20} ${y - 10} Z`} fill="#ffd68a" stroke="#0b0d14" strokeWidth={4} />
      <path d={`M ${x + 10} ${y - 62} L ${x + 50} ${y - 62} L ${x + 30} ${y - 80} Z`} fill="#0b0d14" />
      <circle cx={x + 30} cy={y - 36} r={60 + fl * 6} fill="#ffb456" opacity={0.35} style={{ filter: "blur(18px)" }} />
    </g>
  );
};

export const Gokyuzu: React.FC<{ frame: number }> = ({ frame }) => (
  <g>
    <defs>
      <linearGradient id="gok" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#070b1f" />
        <stop offset="0.55" stopColor="#1b2852" />
        <stop offset="1" stopColor="#3a4a78" />
      </linearGradient>
      <radialGradient id="ayHale" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#dfe8ff" stopOpacity="0.55" />
        <stop offset="1" stopColor="#dfe8ff" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect x={-300} y={-400} width={1700} height={1600} fill="url(#gok)" />
    {Array.from({ length: 120 }).map((_, i) => { const x = random(`sx${i}`) * 1600 - 260, y = random(`sy${i}`) * 900 - 380; const tw = 0.5 + 0.5 * Math.sin(frame * 0.08 + i); return <circle key={i} cx={x} cy={y} r={0.8 + random(`sr${i}`) * 1.6} fill="#e8eeff" opacity={0.35 + tw * 0.5} />; })}
    <circle cx={560} cy={300} r={220} fill="url(#ayHale)" />
    <circle cx={560} cy={300} r={78} fill="#f2f0e6" />
    <circle cx={540} cy={285} r={16} fill="#d8d6cc" opacity={0.6} />
    <circle cx={585} cy={320} r={11} fill="#d8d6cc" opacity={0.5} />
    {/* sürüklenen bulutlar */}
    {Array.from({ length: 6 }).map((_, i) => { const w = 260 + random(`cw${i}`) * 300; const x = ((random(`cx${i}`) * 1600 + frame * (0.7 + random(`cv${i}`))) % 1900) - 500; const y = 160 + random(`cy${i}`) * 300; return <ellipse key={i} cx={x} cy={y} rx={w} ry={w * 0.16} fill="#6f7fae" opacity={0.28} style={{ filter: "blur(14px)" }} />; })}
  </g>
);

// Baca dumanı
const Duman: React.FC<{ x: number; y: number; frame: number; seed: string }> = ({ x, y, frame, seed }) => (
  <g>
    {Array.from({ length: 10 }).map((_, i) => {
      const life = ((frame * 0.6 + i * 18 + random(seed + i) * 30) % 180) / 180;
      return <circle key={i} cx={x + life * 70 + Math.sin(life * 6 + i) * 10} cy={y - life * 220} r={10 + life * 40} fill="#8b93ad" opacity={(1 - life) * 0.25} style={{ filter: "blur(6px)" }} />;
    })}
  </g>
);

export const Sokak: React.FC<{ katman: "gok" | "uzak" | "orta" }> = ({ katman }) => {
  const frame = useCurrentFrame();
  const fl = Math.sin(frame * 0.7) * 0.5 + Math.sin(frame * 1.9) * 0.3;
  if (katman === "gok") return <Gokyuzu frame={frame} />;
  if (katman === "uzak") return <g><Uzak /><Duman x={430} y={800} frame={frame} seed="d1" /><Duman x={640} y={812} frame={frame} seed="d2" /></g>;
  return (
    <g>
      <Zemin />
      {/* ıslak zemin yansımaları */}
      <ellipse cx={560} cy={1230} rx={40} ry={150} fill="#cfdcff" opacity={0.18} style={{ filter: "blur(10px)" }} />
      <ellipse cx={FENER[0] + 60} cy={1650} rx={60} ry={260} fill="#ffb456" opacity={0.22 + fl * 0.03} style={{ filter: "blur(16px)" }} />
      <ellipse cx={cephe(SAG, 3.1, 0.95)[0] - 20} cy={1560} rx={80} ry={220} fill="#ff9d3a" opacity={0.2} style={{ filter: "blur(18px)" }} />
      <Cephe q={SOL} side="sol" frame={frame} />
      <Cephe q={SAG} side="sag" frame={frame} />
      <Fener fl={fl} />
    </g>
  );
};
