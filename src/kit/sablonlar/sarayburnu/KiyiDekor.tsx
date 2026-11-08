// ===== SARAYBURNU `kiyi` dekoru (mekanlar.md §1.2 katman tablosu; gece) =====
// Uzak → yakın: gök (3 düz basamak + şenlik duman bandı) · Asya kıyısı · ağaç kütlesi · sur (+ sol uç kare kule) · KÖŞK (17 px/m) ·
// deniz (düz taban + perspektif dalga çizgileri + yansıma kolonları) · rıhtım dudağı · rıhtım döşemesi (ufuk noktasına yakınsayan derzler).
// Minyatür düz alan: gradyan yok, yüzey başına ≤ 2 ton basamağı. Rıhtım ve suda tarama yok. Seed sabit (DOKU_SEED.sarayburnu / rihtim).
import React from "react";
import { KonturTitreme } from "../../../doku/KonturTitreme";
import { DOKU_SEED, ink, P, poly, rnd } from "../../../doku/sabitler";
import { KIYI, zeminD, zeminY } from "./geo";
import { SinanPasaKosk } from "./SinanPasaKosk";

export const KIYI_GECE = {
  gok: ["#12141c", "#1c2232", "#2c3246"], dumanBant: "#3e3834", asya: "#232838", agac: ["#181c26", "#1e2230"], sur: "#2e2e34",
  deniz: "#161c26", dalga: "#2c3444", dudak: "#55545a", doseme: "#45444a", derz: "#2a2a30", pencere: "#f2c070", murekkep: "#1c2030",
};
export type KoskKonum = { su_cizgisi: number; ust: number; x: [number, number]; px_m: number };
export const KOSK_VARSAYILAN: KoskKonum = { su_cizgisi: 762, ust: 534, x: [740, 928], px_m: 17 };

const S = DOKU_SEED.sarayburnu;

export const KiyiUzak: React.FC<{ kosk: KoskKonum }> = ({ kosk }) => {
  const R = KIYI_GECE;
  const kx = (kosk.x[0] + kosk.x[1]) / 2;
  // Asya kıyısı: alçak dalgalı tek ton şerit (ışık noktası yok)
  const asya: P[] = [[-400, 720]];
  for (let x = -400; x <= 640; x += 40) asya.push([x, 704 - 6 * Math.sin(x * 0.011 + 1) - 4 * rnd(S, `a${x}`)]);
  asya.push([640, 720]);
  // ağaç kütlesi: yuvarlak tepeler, iki ton (servi ve saray binası yok)
  const agaclar = Array.from({ length: 16 }).map((_, i) => ({ x: 570 + i * 40 + rnd(S, `tx${i}`) * 18, y: 600 + rnd(S, `ty${i}`) * 34, r: 26 + rnd(S, `tr${i}`) * 18, t: i % 3 === 0 ? 1 : 0 }));
  // sur: sol kanat (kule x 560 → köşk), sağ kanat kameraya yaklaşır (üst 660 → 615, alt 762 → 795)
  const surSol: P[] = [[560, kosk.su_cizgisi], [560, 660], [kosk.x[0], 660], [kosk.x[0], kosk.su_cizgisi]];
  const surSag: P[] = [[kosk.x[1], kosk.su_cizgisi], [kosk.x[1], 660], [1180, 615], [1400, 600], [1400, 805], [1180, 795]];
  return (
    <g>
      {/* gök: 3 düz basamak (tepe y < −200 · orta −200…460 · ufuk 460…720) */}
      <rect x={-1200} y={-2600} width={3480} height={2400} fill={R.gok[0]} />
      <rect x={-1200} y={-200} width={3480} height={660} fill={R.gok[1]} />
      <rect x={-1200} y={460} width={3480} height={262} fill={R.gok[2]} />
      {/* şenlik duman bandı (P02 sonrası kalıcı) */}
      <path d={`M -1200 610 Q -300 596 300 608 Q 800 620 1400 602 L 2280 606 L 2280 662 Q 900 668 300 656 Q -300 650 -1200 660 Z`} fill={R.dumanBant} opacity={0.5} />
      <polygon points={poly(asya)} fill={R.asya} />
      <KonturTitreme derinlik="uzak" seed={S}>
        {agaclar.map((a, i) => <ellipse key={i} cx={a.x} cy={a.y} rx={a.r} ry={a.r * 0.8} fill={R.agac[a.t]} />)}
        <rect x={560} y={630} width={640} height={40} fill={R.agac[0]} />
        {/* sur + sol uç kare kule (9 m, üstü y 609); moloz/kesme karışık — gece düz ton */}
        <polygon points={poly(surSol)} fill={R.sur} stroke={ink(R.sur)} strokeWidth={2} />
        <rect x={560} y={609} width={70} height={kosk.su_cizgisi - 609} fill={R.sur} stroke={ink(R.sur)} strokeWidth={2} />
        <polygon points={poly(surSag)} fill={R.sur} stroke={ink(R.sur)} strokeWidth={2} />
        <SinanPasaKosk x={kx} suY={kosk.su_cizgisi} pxm={kosk.px_m} saat="gece" kontur={2.4} />
      </KonturTitreme>
    </g>
  );
};

// Deniz: düz taban + yatay kısa dalga çizgileri (3 px; aralık ufukta 8 px → y 1250'de 40 px). Gradyan/gürültü yok.
export const KiyiDeniz: React.FC<{ p: number; cs: number }> = ({ p, cs }) => {
  const R = KIYI_GECE, Sd = DOKU_SEED.sarayburnu + 7;
  const satirlar: React.ReactNode[] = [];
  let y = 728, i = 0;
  while (y < KIYI.dudakUst - 4 && i < 200) {
    const t = (y - 720) / (1250 - 720), ara = 8 + 32 * t;
    const n = 7 + Math.round(rnd(Sd, `n${i}`) * 5);
    for (let j = 0; j < n; j++) {
      const x0 = -200 + rnd(Sd, `x${i}${j}`) * 1480 + Math.sin(p * 0.02 + i) * 3, L = (20 + rnd(Sd, `l${i}${j}`) * 40) * (0.6 + 0.8 * t);
      satirlar.push(<line key={`${i}-${j}`} x1={x0} y1={y} x2={x0 + L} y2={y} stroke={R.dalga} strokeWidth={Math.min(4, 3 / cs) * (0.6 + 0.4 * t)} strokeLinecap="round" />);
    }
    y += ara; i++;
  }
  return (
    <g>
      <rect x={-1200} y={720} width={3480} height={KIYI.rihtimUst - 720 + 2} fill={R.deniz} />
      {satirlar}
    </g>
  );
};

// Yansıma kolonu: ışık kaynağının altında kesik yatay şeritler (dikey kolon); kaynak gökte değilse rıhtım dudağından yukarı
export const YansimaKolonu: React.FC<{ x: number; y0: number; y1: number; renk: string; alfa: number; gen: number; seed: number; p: number }> = ({ x, y0, y1, renk, alfa, gen, seed, p }) => {
  const parcalar: React.ReactNode[] = [];
  const yon = y1 > y0 ? 1 : -1;
  let y = y0, i = 0;
  while ((y1 - y) * yon > 0 && i < 60) {
    const t = Math.abs(y - y0) / Math.abs(y1 - y0);
    const w = gen * (1 - 0.55 * t) * (0.6 + 0.6 * rnd(seed, `w${i}${Math.floor(p / 10)}`));
    const ox = (rnd(seed, `o${i}${Math.floor(p / 10)}`) - 0.5) * gen * 0.5;
    parcalar.push(<line key={i} x1={x + ox - w / 2} y1={y} x2={x + ox + w / 2} y2={y} stroke={renk} strokeWidth={2.5 + 2 * (1 - t)} strokeOpacity={alfa * (1 - 0.6 * t)} strokeLinecap="round" />);
    y += yon * (5 + 9 * t); i++;
  }
  return <g>{parcalar}</g>;
};

// Rıhtım dudağı + döşeme: kesme taş 0.6 × 0.4 m, derzler ufuk noktasına yakınsar; her 7. blokta kırık köşe. Işık havuzu üstüne ekran karışımıyla.
export const KiyiRihtim: React.FC<{ altY?: number }> = ({ altY = 2700 }) => {
  const R = KIYI_GECE, Sd = DOKU_SEED.rihtim;
  const [ux, uy] = KIYI.un;
  const dMax = zeminD(KIYI.rihtimUst), sira: number[] = [];
  for (let d = dMax; zeminY(d) < altY && d > 0.5; d -= 0.4) sira.push(d);
  const derzler: React.ReactNode[] = [];
  for (let i = 0; i < sira.length; i++) {
    const d = sira[i], dn = d - 0.4, ya = zeminY(d), yb = zeminY(Math.max(0.45, dn));
    const kal = Math.max(1.2, Math.min(4, (yb - ya) * 0.06));
    derzler.push(<line key={`h${i}`} x1={-1200} y1={ya} x2={2280} y2={ya} stroke={R.derz} strokeWidth={kal} />);
    const kay = i % 2 ? 0.3 : 0;
    for (let X = -14 + kay; X < 14; X += 0.6) {
      const xa = ux + (X * KIYI.f) / d, xb = ux + (X * KIYI.f) / Math.max(0.45, dn);
      if ((xa < -1200 && xb < -1200) || (xa > 2280 && xb > 2280)) continue;
      derzler.push(<line key={`v${i}_${X.toFixed(1)}`} x1={xa} y1={ya} x2={xb} y2={yb} stroke={R.derz} strokeWidth={kal * 0.8} />);
      if (Math.round((X + 14) / 0.6 + i * 3) % 7 === 0) {
        const c = Math.min(22, (yb - ya) * 0.35);
        derzler.push(<polygon key={`k${i}_${X.toFixed(1)}`} points={poly([[xa, ya], [xa + c, ya], [xa + (xb - xa) * 0.3, ya + c * 0.7]])} fill={R.derz} opacity={0.8} />);
      }
    }
  }
  void uy;
  const centik = [140, 410, 760, 980].map((x, i) => <rect key={i} x={x + rnd(Sd, `c${i}`) * 40} y={KIYI.dudakUst + 4} width={18 + rnd(Sd, `cw${i}`) * 14} height={9} fill={R.derz} />);
  return (
    <g>
      <rect x={-1200} y={KIYI.dudakUst} width={3480} height={KIYI.rihtimUst - KIYI.dudakUst} fill={R.dudak} stroke={ink(R.dudak)} strokeWidth={2} />
      {centik}
      <rect x={-1200} y={KIYI.rihtimUst} width={3480} height={altY - KIYI.rihtimUst} fill={R.doseme} />
      {derzler}
    </g>
  );
};
