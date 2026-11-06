import React from "react";
import { BL, ink } from "../../../doku/sabitler";
import { ELDIVEN_OLCEK } from "../palet";

// Kahraman eldiveni (glacé, beyaz; sırtta üç çizgili dikiş) — İMZA NESNESİ A. Manşet kenarının BİR noktasından tutulmuş, boş, yassı.
// ÖLÇÜ (tasarim.md 0.6, eleştiri C TC1): eldivenin el kısmı (bilekten orta parmak ucuna) = tutan elin boyu × ELDIVEN_OLCEK (1.05);
// avuç ≈ el kısmının %46'sı; parmaklar dolgun, uçları yuvarlak; manşet ağzı açık (kıstırılan kenar), bilek üstüne ≈ %24 taşar.
// Tasarım birimi: el kısmı 285 birim (y 75 → 360), avuç 130 birim. Yerel orijin = kıstırma noktası (manşet ağzının en yüksek noktası), +y aşağı.
// Yassı boş eldiven: kenar hafif dalgalı, avuçta tek kırışık, parmaklar hafif ayrık ve sarkık. golge: tek renk gölge kopyası.
// P01, P10 (masada), P15 (buruşuk), P16 (düşen), P19 (EldivenEl), P23 — hepsi elBoyu'na bağlı (sabit px değil).
export const ELDIVEN_TASARIM = { elKismi: 285, avuc: 130, toplam: 360 };
export const eldivenOlcek = (elBoyu: number) => (elBoyu * ELDIVEN_OLCEK) / ELDIVEN_TASARIM.elKismi;

const PARMAK: [number, number, number, number][] = [
  // merkez x, genişlik, uzunluk, sarkma açısı (°)
  [3, 30, 150, -5],
  [36, 31, 160, -1],
  [69, 30, 150, 3],
  [101, 26, 118, 8],
];

export const Eldiven: React.FC<{ elBoyu?: number; golge?: boolean; golgeRenk?: string; renk?: string }> = ({ elBoyu = 266, golge, golgeRenk = "#14110d", renk = BL.gloveHero }) => {
  const g = renk, gk = "#d9d2c0", c = golge ? golgeRenk : g;
  const st = golge ? {} : { stroke: ink(g), strokeWidth: 3, strokeLinejoin: "round" as const };
  const k = eldivenOlcek(elBoyu);
  const y0 = 200;
  const parmak = ([cx, w, L, a]: [number, number, number, number], i: number) => {
    const l = cx - w / 2, r = cx + w / 2, u = y0 + L;
    const d = `M ${l} ${y0 - 6} Q ${l - 3} ${y0 + L * 0.5} ${l + 1} ${u - w / 2} Q ${l + 2} ${u + 2} ${cx} ${u + 1} Q ${r - 2} ${u + 2} ${r - 1} ${u - w / 2} Q ${r + 3} ${y0 + L * 0.5} ${r} ${y0 - 6} Z`;
    return (
      <g key={i} transform={`rotate(${a} ${cx} ${y0})`}>
        <path d={d} fill={c} {...st} />
        {!golge && <>
          {/* parmak boyunca gölge (sağ kenar) + iki boğum kırışığı */}
          <path d={`M ${r - 7} ${y0 + 10} Q ${r - 5} ${y0 + L * 0.5} ${r - 7} ${u - w / 2}`} stroke={gk} strokeWidth={6} fill="none" opacity={0.8} />
          <path d={`M ${l + 6} ${y0 + L * 0.42} q ${w * 0.3} 4 ${w - 12} 0`} stroke={gk} strokeWidth={2.4} fill="none" />
          <path d={`M ${l + 7} ${y0 + L * 0.72} q ${w * 0.3} 3 ${w - 14} 0`} stroke={gk} strokeWidth={2} fill="none" />
        </>}
      </g>
    );
  };
  return (
    <g transform={`scale(${k})`}>
      {/* başparmak: avucun sol yanından aşağı-sola sarkar */}
      <path d="M -10 104 Q -40 132 -58 182 Q -66 206 -52 214 Q -36 220 -28 198 Q -18 170 -8 170 Z" fill={c} {...st} />
      {PARMAK.map(parmak)}
      {/* avuç + bilek: kenar hafif dalgalı */}
      <path d="M -10 64 Q -14 92 -12 120 Q -18 150 -14 176 Q -14 196 -12 206 Q 50 214 116 204 Q 120 170 116 140 Q 122 110 116 78 Q 112 70 112 64 Z" fill={c} {...st} />
      {!golge && <>
        <path d="M 96 80 Q 106 120 102 160 Q 104 190 100 204 L 116 204 Q 120 170 116 140 Q 122 110 116 78 Z" fill={gk} opacity={0.8} />
        {/* sırtta üç çizgili dikiş (Paris dikişi) */}
        {[24, 52, 80].map((x) => <path key={x} d={`M ${x} 96 Q ${x + 2} 136 ${x + 1} 176`} stroke={BL.gloveDikis} strokeWidth={3} fill="none" />)}
        {/* avuçta tek kırışık */}
        <path d="M -6 150 Q 40 162 96 146" stroke={gk} strokeWidth={3.2} fill="none" />
        {/* parmak dipleri */}
        {[19, 52, 85].map((x) => <path key={x} d={`M ${x} 198 L ${x + 1} 212`} stroke={ink(g)} strokeWidth={2} opacity={0.6} />)}
      </>}
      {/* manşet: ağzı açık, kıstırılan noktada (orijin) katlanmış; tutulmayan kenar aşağı sarkar */}
      <path d="M 0 0 Q -14 30 -10 66 Q 52 76 112 66 Q 124 46 122 28 Q 62 26 0 0 Z" fill={c} {...st} />
      {!golge && <>
        {/* manşet ağzı: içi gölgeli açıklık */}
        <path d="M 0 0 Q 62 28 122 28 Q 70 6 0 0 Z" fill="#7e7360" />
        <path d="M 0 0 Q 62 28 122 28" stroke={ink(g)} strokeWidth={2.6} fill="none" />
        {/* kıstırılan yerde kumaş çökmesi (yumuşak) */}
        <path d="M 2 4 Q 6 18 4 30 M 6 3 Q 16 14 20 22" stroke={ink(g)} strokeWidth={2} opacity={0.55} fill="none" />
        <path d="M -8 58 Q 52 68 110 58" stroke={gk} strokeWidth={2.4} fill="none" />
      </>}
    </g>
  );
};
