// ===== KE-PK-N4 MEKTUP SAYFASI / FİLM ŞERİDİ — dil-nötr satırlar (tasarım §4.7) =====
// Sayfa bir dörtgen eşlemesiyle (u,v ∈ [0,1]; u sağa, v aşağı) çizilir: perspektif masada, perdede, elde aynı çizim.
// Satırlar 11–14 dalgalı yatay vuruş (kamış/kalem çağrışımı), HARF YOK; kenarda katlama çizgisi. Seed sabit → kaynamaz.
// P05 sayfası = P10 perdesindeki sayfa = P10 kapıda okunan kâğıt (D5 ↔ D7 aynası).
import React from "react";
import { dortgen, Esleme, P, rnd } from "../../../doku/sabitler";

export type SayfaRenk = { yuz: string; golge?: string; satir: string; kat: string; kontur: string };
const pt = (q: P) => `${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
/** satır dalgası (u boyunca), v sabit — kalem vuruşu: başta kalın, aralarda boşluk (kelime) */
export const satirYollari = (m: Esleme, seed: number, n = 13, kenar = 0.11): string[] => {
  const out: string[] = [];
  for (let i = 0; i < n; i++) {
    const v = 0.1 + (0.8 * i) / (n - 1) + (rnd(seed, `v${i}`) - 0.5) * 0.008;
    const son = i === n - 1 ? 0.45 + rnd(seed, `s${i}`) * 0.2 : 1 - kenar - rnd(seed, `s${i}`) * 0.08;
    const bas = kenar + (i === 0 ? 0.12 : 0);
    // kelimeler: 4–6 parça, aralarında boşluk
    let u = bas, j = 0;
    while (u < son - 0.03 && j < 9) {
      const L = Math.min(son - u, 0.07 + rnd(seed, `L${i}.${j}`) * 0.13);
      const q: P[] = [];
      for (let k = 0; k <= 6; k++) { const uu = u + (L * k) / 6; q.push(m(uu, v + Math.sin(uu * 70 + i * 1.7 + j) * 0.0045)); }
      out.push(`M${q.map(pt).join("L")}`);
      u += L + 0.025 + rnd(seed, `b${i}.${j}`) * 0.02; j++;
    }
  }
  return out;
};

export const Sayfa: React.FC<{ kose: [P, P, P, P]; renk: SayfaRenk; seed?: number; cizgi?: number; satirSayi?: number; kontur?: number; kat?: boolean; bulanik?: number; satirAlfa?: number }> = ({ kose, renk, seed = 11, cizgi = 2.4, satirSayi = 13, kontur = 2.5, kat = true, satirAlfa = 0.9 }) => {
  const m = dortgen(...kose);
  const yol = `M${kose.map(pt).join("L")}Z`;
  return (
    <g>
      <path d={yol} fill={renk.yuz} stroke={renk.kontur} strokeWidth={kontur} strokeLinejoin="round" />
      {kat && <path d={`M${pt(m(0.02, 0.5))}L${pt(m(0.98, 0.5))}`} stroke={renk.kat} strokeWidth={Math.max(1.2, cizgi * 0.7)} fill="none" />}
      <g stroke={renk.satir} strokeWidth={cizgi} strokeLinecap="round" fill="none" opacity={satirAlfa}>
        {satirYollari(m, seed, satirSayi).map((d, i) => <path key={i} d={d} />)}
      </g>
    </g>
  );
};
