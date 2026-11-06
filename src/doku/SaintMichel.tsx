import React from "react";
import { ChappeKule, KonumAdi } from "./ChappeKule";
import { P, poly } from "./sabitler";

// ===== Bordeaux Saint-Michel çan kulesi, 1834 =====
// Külahsız: sivri külah 1768'de yıkıldı, 1860'larda yeniden yapıldı [mekanlar.md 0 #2, G ◐ doğrulanmalı].
// Kesik tepe + üstünde Chappe telgrafı [D kesin: Bordeaux sinyali Saint-Michel'den].
// Notre-Dame kuralının Bordeaux karşılığı: ASLA sivri külah çizilmez.
// (x,y): görünür taban ortası; h: gövde yüksekliği (Chappe hariç).
export const SaintMichel: React.FC<{
  x: number; y: number; h: number; renk: string; kenar?: string; kenarA?: number; detay?: "siluet" | "orta";
  chappe?: { konum: KonumAdi; renk?: string } | null; acikRenk?: string;
}> = ({ x, y, h, renk, kenar = "#9fb3ea", kenarA = 0.25, detay = "siluet", chappe = { konum: "DINLEN" }, acikRenk }) => {
  const w = h * 0.2; // gövde genişliği (altta)
  const wt = w * 0.86; // tepede
  const L = (p: number) => w + (wt - w) * p; // yükseklikle incelme
  const yy = (p: number) => y - h * p;
  const els: React.ReactNode[] = [];
  // ana gövde
  const body: P[] = [[x - L(0) / 2, yy(0)], [x - L(0.93) / 2, yy(0.93)], [x + L(0.93) / 2, yy(0.93)], [x + L(0) / 2, yy(0)]];
  els.push(<polygon key="b" points={poly(body)} fill={renk} />);
  // köşe payandaları: kademeli, gövde kenarlarından dışa taşar
  for (const s of [-1, 1]) {
    const steps = [0, 0.28, 0.55, 0.8];
    steps.forEach((p, i) => {
      const off = w * (0.12 - i * 0.025);
      const p2 = i < steps.length - 1 ? steps[i + 1] : 0.93;
      els.push(<polygon key={`p${s}${i}`} points={poly([[x + s * L(p) / 2, yy(p)], [x + s * (L(p) / 2 + off), yy(p)], [x + s * (L(p2) / 2 + off * 0.9), yy(p2 - 0.02)], [x + s * L(p2) / 2, yy(p2)]])} fill={renk} />);
    });
    // köşe pinakılları (kesik tepe çevresi, kısa)
    const px = x + s * (L(0.93) / 2 + w * 0.04);
    els.push(<polygon key={`pk${s}`} points={poly([[px - w * 0.05, yy(0.93)], [px, yy(1.0)], [px + w * 0.05, yy(0.93)]])} fill={renk} />);
  }
  // korkuluk (balüstrad) — düz kesik tepe
  els.push(<rect key="kor" x={x - L(0.93) / 2 - w * 0.04} y={yy(0.955)} width={L(0.93) + w * 0.08} height={h * 0.025} fill={renk} />);
  // sivri kemerli uzun açıklıklar (çan katı)
  if (detay === "orta" || acikRenk) {
    const ac = acikRenk ?? "#0e1022";
    for (const dx of [-0.2, 0.2]) {
      const cx = x + dx * w, aw = w * 0.13, y1 = yy(0.62), y2 = yy(0.86);
      els.push(<path key={`a${dx}`} d={`M ${cx - aw} ${y1} L ${cx - aw} ${y2 + aw} Q ${cx - aw} ${y2 - aw * 0.4} ${cx} ${y2 - aw * 0.8} Q ${cx + aw} ${y2 - aw * 0.4} ${cx + aw} ${y2 + aw} L ${cx + aw} ${y1} Z`} fill={ac} opacity={0.8} />);
    }
    for (const dx of [-0.15, 0.15]) els.push(<rect key={`d${dx}`} x={x + dx * w - w * 0.04} y={yy(0.35)} width={w * 0.08} height={h * 0.12} rx={w * 0.04} fill={ac} opacity={0.6} />);
  }
  // ay kenar ışığı (sağ kenar)
  els.push(<polyline key="k" points={poly([[x + L(0) / 2, yy(0)], [x + L(0.93) / 2, yy(0.93)]])} stroke={kenar} strokeWidth={Math.max(1, w * 0.03)} opacity={kenarA} fill="none" />);
  return (
    <g>
      {els}
      {chappe && <ChappeKule x={x} y={yy(0.955)} L={w * 0.95} konum={chappe.konum} detay="siluet" siluetRenk={chappe.renk ?? renk} payanda={false} />}
    </g>
  );
};
