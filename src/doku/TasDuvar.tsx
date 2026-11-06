import React, { useId } from "react";
import { Derinlik, DOKU_YOGUNLUK, Esleme, karistir, parca, poly, rnd, tonla, P } from "./sabitler";

// ===== Taş duvar: TAS-BDX / TUFFEAU / TAS-PARIS (mekanlar.md 1.3) =====
// Yüzey bir eşleme fonksiyonu (u,v)→ekran ile verilir: düz duvar (dikdortgen), perspektifli cephe (dortgen / cephe()).
// boyut: yüzeyin "yakın ölçekteki" nominal px boyutu (blok sayısı buradan çıkar; 1 m ≈ 300 px).
// Katmanlar (en fazla 3 doku + ışık): (a) blok deseni, (b) gözenek/bulutlanma, (c) kullanım izi (yağmur izi, nem, petek).

export type TasTip = "bdx" | "tuffeau" | "paris";
export const TAS = {
  bdx: { taban: "#d6bf8e", derz: "#7e6846", derzA: 0.55, derzW: 1.5, golge: "#8f774f", leke: ["#bfa676", "#c9b07c"], blok: [180, 90] as [number, number], gozenek: 0.16, bulut: "0.6 0.52 0.36", bulutA: 0.5 },
  // tuffeau: büyük, YUMUŞAK sarı/gri bulutlanma (kirli kahve değil) — açık renk multiply, düşük alfa
  tuffeau: { taban: "#e6e0cc", derz: "#cfc6ab", derzA: 0.8, derzW: 3, golge: "#a39b84", leke: ["#dccaa0", "#b9b7ad"], blok: [180, 105] as [number, number], gozenek: 0.07, bulut: "0.86 0.79 0.6", bulutA: 0.35 },
  paris: { taban: "#c9c2b2", derz: "#a29b8c", derzA: 0.6, derzW: 2, golge: "#8a8478", leke: ["#bdb6a8", "#b3ab9c"], blok: [180, 90] as [number, number], gozenek: 0.12, bulut: "0.7 0.68 0.64", bulutA: 0.4 },
};

export type YagmurIzi = { u: number; v: number; gen: number; boy: number };

export const TasDuvar: React.FC<{
  m: Esleme; boyut: [number, number]; tip: TasTip; seed: number; derinlik?: Derinlik;
  taban?: string; derz?: string; blok?: [number, number]; gozenek?: boolean; yogunluk?: number;
  yagmurIzi?: YagmurIzi[]; nemBandi?: number; petek?: number; kirlilik?: number; seviye?: [number, number];
}> = ({ m, boyut, tip, seed, derinlik = "orta", taban, derz, blok, gozenek = true, yogunluk, yagmurIzi = [], nemBandi = 0, petek = 0, kirlilik = 0, seviye = [0, 1] }) => {
  const id = "td" + useId().replace(/:/g, "");
  const T = TAS[tip];
  const k = (yogunluk ?? 1) * DOKU_YOGUNLUK[derinlik];
  const base = taban ?? T.taban;
  const derzC = derz ?? (taban ? tonla(taban, -0.28) : T.derz);
  const [bw, bh] = blok ?? T.blok;
  const [W, H] = boyut;
  const nr = Math.max(1, Math.round(H / bh));
  const nc = Math.max(1, W / bw);
  const ru = 1 / nc, rv = 1 / nr;
  const dU = (T.derzW * 0.5) / W, dV = (T.derzW * 0.5) / H;
  const tum = parca(m, 0, 1, seviye[0], seviye[1]);
  const xs = tum.map((p) => p[0]), ys = tum.map((p) => p[1]);
  const bb = { x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) };
  const bloklar: React.ReactNode[] = [];
  for (let r = 0; r < nr; r++) {
    const v1 = r * rv, v2 = (r + 1) * rv;
    if (v2 <= seviye[0] || v1 >= seviye[1]) continue;
    const off = (r % 2) * 0.5 * ru + (rnd(seed, `ro${r}`) - 0.5) * 0.2 * ru;
    for (let c = -1; c < nc + 1; c++) {
      let u1 = c * ru + off, u2 = u1 + ru * (0.85 + rnd(seed, `bw${r}-${c}`) * 0.3);
      if (u2 <= 0 || u1 >= 1) continue;
      u1 = Math.max(0, u1); u2 = Math.min(1, u2);
      const rr = rnd(seed, `b${r}-${c}`);
      let renk = tonla(base, (rr - 0.5) * 0.08);
      // blok başına leke rengi karışımı (tuffeau sarı/gri, bdx bal)
      const lk = rnd(seed, `l${r}-${c}`);
      if (lk < 0.3) renk = karistir(renk, T.leke[lk < 0.15 ? 0 : 1], 0.25 * Math.min(1, k + 0.3));
      bloklar.push(<polygon key={`${r}-${c}`} points={poly(parca(m, u1 + dU, u2 - dU, Math.max(seviye[0], v1) + dV, Math.min(seviye[1], v2) - dV))} fill={renk} />);
      // üst kenar ışığı (ince pah) — yakında
      if (k > 0.6) bloklar.push(<polyline key={`p${r}-${c}`} points={poly([m(u1 + dU, v1 + dV), m(u2 - dU, v1 + dV)])} stroke="#fff6e0" strokeWidth={1} opacity={0.18 * k} fill="none" />);
    }
  }
  const pts = (u1: number, u2: number, v1: number, v2: number) => poly(parca(m, u1, u2, v1, v2));
  return (
    <g>
      <defs>
        <clipPath id={`${id}c`}><polygon points={poly(tum)} /></clipPath>
        <filter id={`${id}g`} filterUnits="userSpaceOnUse" x={bb.x} y={bb.y} width={bb.w} height={bb.h} colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={seed} />
          <feColorMatrix type="matrix" values={`0 0 0 0 0.25  0 0 0 0 0.2  0 0 0 0 0.14  -1.4 0 0 0 0.75`} />
          <feComponentTransfer><feFuncA type="linear" slope={T.gozenek * 2.2 * k} /></feComponentTransfer>
        </filter>
        <filter id={`${id}b`} filterUnits="userSpaceOnUse" x={bb.x} y={bb.y} width={bb.w} height={bb.h} colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency={tip === "tuffeau" ? "0.012" : "0.02"} numOctaves={3} seed={seed + 1} />
          <feColorMatrix type="matrix" values={`0 0 0 0 ${T.bulut.split(" ")[0]}  0 0 0 0 ${T.bulut.split(" ")[1]}  0 0 0 0 ${T.bulut.split(" ")[2]}  2.2 0 0 0 -1.05`} />
          <feComponentTransfer><feFuncA type="linear" slope={T.bulutA * k} /></feComponentTransfer>
        </filter>
        <linearGradient id={`${id}y`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a2e1c" stopOpacity={0.32 * k} /><stop offset="1" stopColor="#3a2e1c" stopOpacity={0} /></linearGradient>
        <linearGradient id={`${id}n`} x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#6e6650" stopOpacity={0.32 * k} /><stop offset="1" stopColor="#6e6650" stopOpacity={0} /></linearGradient>
      </defs>
      {/* (a) harç zemini + bloklar */}
      <polygon points={poly(tum)} fill={karistir(derzC, base, 1 - T.derzA)} />
      {bloklar}
      <g clipPath={`url(#${id}c)`}>
        {/* (b) bulutlanma + gözenek */}
        {gozenek && <rect x={bb.x} y={bb.y} width={bb.w} height={bb.h} filter={`url(#${id}b)`} style={{ mixBlendMode: "multiply" }} />}
        {gozenek && <rect x={bb.x} y={bb.y} width={bb.w} height={bb.h} filter={`url(#${id}g)`} />}
        {/* (c) kullanım izi */}
        {yagmurIzi.map((y, i) => <polygon key={i} points={pts(y.u, y.u + y.gen, y.v, y.v + y.boy)} fill={`url(#${id}y)`} />)}
        {nemBandi > 0 && <polygon points={pts(0, 1, 1 - nemBandi, 1)} fill={`url(#${id}n)`} />}
        {kirlilik > 0 && <polygon points={pts(0, 1, 0, 1)} fill="#2a2016" opacity={kirlilik} />}
        {petek > 0 && Array.from({ length: Math.round(30 * Math.min(1, W / 1000)) }).map((_, i) => {
          const u = rnd(seed, `pu${i}`), v = 1 - rnd(seed, `pv${i}`) * petek;
          const c: P = m(u, v), r = 2 + rnd(seed, `pr${i}`) * 3.5;
          return <ellipse key={`pt${i}`} cx={c[0]} cy={c[1]} rx={r * 1.2} ry={r} fill="#8f876e" opacity={0.35 * k} />;
        })}
      </g>
    </g>
  );
};
