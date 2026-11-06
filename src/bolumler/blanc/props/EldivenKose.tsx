import React from "react";
import type { Poz } from "../../../rig/Kukla";
import { ink } from "../../../doku/sabitler";
import { CEP_ELDIVEN } from "../palet";

// ===== EldivenKose — Louis'nin sağ göğüs cebinden taşan kahraman eldiveni (İMZA NESNESİ B; tasarim.md 0.6) =====
// Kart/bilet/rozet DEĞİL: cep ağzından yukarı taşan İKİ YUVARLAK PARMAK UCU (biri ≈ %16 yüksek), aralarında kumaş kıvrımı,
// sağda öne sarkan manşet kumaşı, cep ağzı çizgisi kumaşın ARKASINDA (kumaş cepten taşar), −12° sarkma.
// Yerel orijin = cep ağzının ortası; +y aşağı. w = cep ağzı genişliği (çizildiği koordinat biriminde); yükseklik ≈ 0.62 w.
export const EldivenKose: React.FC<{ w: number; cepRenk: string }> = ({ w, cepRenk }) => {
  const k = w / 50; // tasarım ölçüsü 50 × 31 birim
  const { renk, golge, agiz, aci } = CEP_ELDIVEN;
  const kontur = "#8a7f68";
  return (
    <g transform={`rotate(${aci}) scale(${k})`}>
      {/* cebin içine giren kısım (gölgede) */}
      <path d="M -22 0 L 22 0 L 20 6 L -20 6 Z" fill={agiz} />
      {/* arka parmak ucu (sağ, alçak) */}
      <path d="M 2 2 L 2 -16 Q 2 -25 10.5 -25 Q 19 -25 19 -16 L 19 2 Z" fill={golge} stroke={kontur} strokeWidth={1.5} strokeLinejoin="round" />
      {/* ön parmak ucu (sol, yüksek) */}
      <path d="M -17 2 L -17 -22 Q -17 -31 -8 -31 Q 1 -31 1 -22 L 1 2 Z" fill={renk} stroke={kontur} strokeWidth={1.5} strokeLinejoin="round" />
      {/* parmak ucu boğumu: 1 ışık + 1 gölge */}
      <path d="M -13 -24 Q -8 -28 -3 -24" stroke="#ffffff" strokeOpacity={0.7} strokeWidth={1.4} fill="none" />
      <path d="M -15 -12 Q -8 -9 -1 -12" stroke={golge} strokeWidth={1.6} fill="none" />
      <path d="M 5 -8 Q 10.5 -5 16 -8" stroke={kontur} strokeOpacity={0.6} strokeWidth={1.2} fill="none" />
      {/* aralarında kumaş kıvrımı + öne sarkan manşet kumaşı (sağ) */}
      <path d="M 1 -18 Q 3 -8 1 2" stroke={kontur} strokeWidth={1.3} fill="none" />
      <path d="M 17 -6 Q 26 -4 27 4 Q 22 8 17 5 Z" fill={renk} stroke={kontur} strokeWidth={1.4} strokeLinejoin="round" />
      {/* cep ağzı (ceket kumaşının üst kenarı) — kumaşın ÖNÜNDE kalan alt dudak; üst kenar eldivenin arkasında */}
      <path d="M -25 1.5 Q 0 4 25 1.5 L 25 6 Q 0 8.5 -25 6 Z" fill={cepRenk} stroke={ink(cepRenk)} strokeWidth={1.3} />
    </g>
  );
};

// Kukla üstüne bindirme: rig yerel (−40, −318) = YAKIN göğüs (3/4 pozda revers ile sırt silueti arasında; facing −1'de sağ göğüs).
// Eski (40, −325) uzak göğüsteydi ve ön kol (x 40'tan sarkar) cebi örtüyordu (eleştiri C BC7). Ekran boyu (boyPx = 620·ölçek·kamera) < 400 ise çizilmez (geniş plan; rozet okunmasın).
// Ekran genişliği: yakın (boy ≥ 1100) ≥ 50 px, orta ≥ 30 px; doğal boy 24 birim (≈ 7 cm) bunun altına inmez.
export const CEP_YEREL: [number, number] = [-40, -318];
export const cepGenislik = (pz: Poz, kamera = 1): number | null => {
  const s = (pz.scale ?? 1) * kamera, boy = 620 * s;
  if (boy < CEP_ELDIVEN.genisBoyPx) return null;
  const hedefPx = boy >= 1100 ? CEP_ELDIVEN.yakinPx[0] : CEP_ELDIVEN.ortaPx[0];
  return Math.max(24, hedefPx / s);
};
export const CepEldiven: React.FC<{ pz: Poz; kamera?: number; cepRenk?: string }> = ({ pz, kamera = 1, cepRenk = "#74222f" }) => {
  const w = cepGenislik(pz, kamera);
  if (w === null) return null;
  return (
    <g transform={`translate(${pz.x},${pz.y}) scale(${(pz.scale ?? 1) * (pz.facing ?? 1)},${pz.scale ?? 1}) translate(0,${pz.bodyY ?? 0}) rotate(${pz.lean ?? 0},0,-226) translate(${(pz.sway ?? 0) * 2},0)`}>
      <g transform={`translate(${CEP_YEREL[0]},${CEP_YEREL[1]})`}><EldivenKose w={w} cepRenk={cepRenk} /></g>
    </g>
  );
};
