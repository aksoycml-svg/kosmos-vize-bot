import React, { useId } from "react";
import { Derinlik, DOKU_YOGUNLUK, Esleme, ink, parca, poly, rnd, tonla, P } from "./sabitler";

// ===== Ahşap yüzey: AHSAP-MESE / CEVIZ / DOSEME / BOYALI (mekanlar.md 1.3) =====
// Damar parçanın uzun ekseni (u) boyunca. boyut: [uzunluk, genişlik] nominal px.
// tahta: v yönünde kaç tahta (döşeme, masa üstü). Aşınma: ellerin/ayakların değdiği kenarda açık bant.
export type AhsapTur = "mese" | "ceviz" | "doseme" | "boyali";
export const AHSAP = {
  mese: { taban: "#7a5230", acik: "#a07848", koyu: "#3b2818", damarAralik: 9, damarA: 0.22, asinma: "#c49a68" },
  ceviz: { taban: "#5b3d25", acik: "#7a5532", koyu: "#3b2818", damarAralik: 6, damarA: 0.15, asinma: "#c9a070" },
  doseme: { taban: "#5a4630", acik: "#6e5a40", koyu: "#3b2c1c", damarAralik: 9, damarA: 0.18, asinma: "#8a7458" },
  boyali: { taban: "#2f4a40", acik: "#46665a", koyu: "#22362f", damarAralik: 12, damarA: 0.2, asinma: "#7a5a3c" },
};

export const AhsapYuzey: React.FC<{
  m: Esleme; boyut: [number, number]; tur: AhsapTur; seed: number; derinlik?: Derinlik;
  taban?: string; tahta?: number; budak?: number; asinma?: ("ust" | "alt" | "sol" | "sag")[]; pah?: boolean; cizgiKalinlik?: number; kenarKontur?: boolean;
}> = ({ m, boyut, tur, seed, derinlik = "orta", taban, tahta = 1, budak = 0, asinma = [], pah = true, cizgiKalinlik = 1.2, kenarKontur = true }) => {
  const id = "ah" + useId().replace(/:/g, "");
  const A = AHSAP[tur];
  const k = DOKU_YOGUNLUK[derinlik];
  const base = taban ?? A.taban;
  const [W, H] = boyut;
  const els: React.ReactNode[] = [];
  const th = 1 / tahta;
  for (let t = 0; t < tahta; t++) {
    const v1 = t * th, v2 = (t + 1) * th;
    const renk = tonla(base, (rnd(seed, `t${t}`) - 0.5) * 0.1);
    els.push(<polygon key={`t${t}`} points={poly(parca(m, 0, 1, v1, v2))} fill={renk} />);
    // damar: sin tabanlı dalgalı yollar
    const n = Math.max(2, Math.round((H / tahta) / A.damarAralik));
    for (let i = 1; i < n; i++) {
      const ph = rnd(seed, `ph${t}-${i}`) * 6.28, amp = (3 / H) * (0.6 + rnd(seed, `am${t}-${i}`));
      const fr = 2 + rnd(seed, `fr${t}-${i}`) * 3;
      const v0 = v1 + (th * i) / n;
      const pts: P[] = [];
      const u0 = rnd(seed, `us${t}-${i}`) * 0.2, uE = 0.8 + rnd(seed, `ue${t}-${i}`) * 0.2;
      for (let s = 0; s <= 28; s++) { const u = u0 + ((uE - u0) * s) / 28; pts.push(m(u, v0 + Math.sin(u * fr * 6.28 + ph) * amp)); }
      els.push(<polyline key={`d${t}-${i}`} points={poly(pts)} stroke={ink(renk)} strokeWidth={cizgiKalinlik} opacity={A.damarA * k} fill="none" strokeLinecap="round" />);
    }
    // tahta derzi + pah
    if (t > 0) els.push(<polyline key={`z${t}`} points={poly([m(0, v1), m(1, v1)])} stroke={A.koyu} strokeWidth={2.2} opacity={0.75} fill="none" />);
    if (pah) els.push(<polyline key={`ph${t}`} points={poly([m(0, v1 + 0.004), m(1, v1 + 0.004)])} stroke="#c9a070" strokeWidth={1.4} opacity={0.35 * k} fill="none" />);
    // döşeme: çivi başları
    if (tur === "doseme") for (const u of [0.04, 0.96]) for (const dv of [0.3, 0.7]) { const c = m(u, v1 + th * dv); els.push(<circle key={`c${t}${u}${dv}`} cx={c[0]} cy={c[1]} r={2} fill="#2a2016" opacity={0.8} />); }
  }
  // budak: iç içe 3 elips
  for (let b = 0; b < budak; b++) {
    const u = 0.15 + rnd(seed, `bu${b}`) * 0.7, v = 0.15 + rnd(seed, `bv${b}`) * 0.7;
    [22, 14, 8].forEach((r, j) => {
      const pts: P[] = Array.from({ length: 16 }).map((_, s) => m(u + (Math.cos((s / 16) * 6.28) * r * 1.6) / W, v + (Math.sin((s / 16) * 6.28) * r * 0.7) / H));
      els.push(<polygon key={`b${b}${j}`} points={poly(pts)} fill={j === 2 ? A.koyu : "none"} stroke={A.koyu} strokeWidth={1.2} opacity={0.3 * k} />);
    });
  }
  const bant = (yer: "ust" | "alt" | "sol" | "sag") => {
    const g = 0.06;
    return yer === "ust" ? parca(m, 0, 1, 0, g) : yer === "alt" ? parca(m, 0, 1, 1 - g, 1) : yer === "sol" ? parca(m, 0, g, 0, 1) : parca(m, 1 - g, 1, 0, 1);
  };
  const yon = { ust: ["0", "0", "0", "1"], alt: ["0", "1", "0", "0"], sol: ["0", "0", "1", "0"], sag: ["1", "0", "0", "0"] } as const;
  return (
    <g>
      <defs>
        {asinma.map((y) => <linearGradient key={y} id={`${id}${y}`} x1={yon[y][0]} y1={yon[y][1]} x2={yon[y][2]} y2={yon[y][3]}><stop offset="0" stopColor={A.asinma} stopOpacity={0.35 * k} /><stop offset="1" stopColor={A.asinma} stopOpacity={0} /></linearGradient>)}
      </defs>
      {els}
      {asinma.map((y) => <polygon key={y} points={poly(bant(y))} fill={`url(#${id}${y})`} />)}
      {kenarKontur && <polygon points={poly(parca(m, 0, 1, 0, 1))} fill="none" stroke={ink(base)} strokeWidth={2} strokeLinejoin="round" />}
    </g>
  );
};
