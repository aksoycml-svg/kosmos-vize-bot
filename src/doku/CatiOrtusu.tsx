import React from "react";
import { Derinlik, DOKU_YOGUNLUK, Esleme, karistir, parca, poly, rnd, tonla, P } from "./sabitler";

// ===== Çatı örtüsü: ARDUVAZ / TUILE-CANAL / CINKO (mekanlar.md 1.3) =====
// m: u mahya boyunca (0..1), v mahyadan (0) saçağa (1). boyut: [mahya uzunluğu, eğim boyu] nominal px.
// gece: 0..1 gece mavisine karışım (ay ışığı paleti).
export type CatiTip = "arduvaz" | "tuileCanal" | "cinko";
const CATI = {
  arduvaz: { taban: "#3c4660", koyu: "#2c3550", isik: "#6a7896", cizgi: "#1c2236" },
  tuileCanal: { taban: "#a8603e", koyu: "#5e2e1e", isik: "#c98a62", cizgi: "#5e2e1e" },
  cinko: { taban: "#8a8f98", koyu: "#6a6f78", isik: "#b8bec8", cizgi: "#6a6f78" },
};
const GECE = "#1b2236";

export const CatiOrtusu: React.FC<{ m: Esleme; boyut: [number, number]; tip: CatiTip; seed: number; derinlik?: Derinlik; gece?: number; likenli?: boolean; mahya?: string }> = ({ m, boyut, tip, seed, derinlik = "orta", gece = 0, likenli, mahya }) => {
  const C = CATI[tip];
  const k = DOKU_YOGUNLUK[derinlik];
  const g = (c: string) => karistir(c, GECE, gece);
  const [W, H] = boyut;
  const els: React.ReactNode[] = [];
  els.push(<polygon key="z" points={poly(parca(m, 0, 1, 0, 1))} fill={g(C.taban)} />);
  if (tip === "tuileCanal") {
    // dönüşümlü dışbükey sırt (açık) / oluk (koyu), 34 px periyot; sıralar dalgalı
    const n = Math.max(3, Math.round(W / 34));
    const rows = Math.max(2, Math.round(H / 46));
    for (let i = 0; i < n; i++) {
      const u1 = i / n, u2 = (i + 0.5) / n, u3 = (i + 1) / n;
      const ton = (rnd(seed, `c${i}`) - 0.5) * 0.16;
      els.push(<polygon key={`o${i}`} points={poly(parca(m, u2, u3, 0, 1))} fill={g(C.koyu)} opacity={0.7} />);
      els.push(<polygon key={`s${i}`} points={poly(parca(m, u1, u2, 0, 1))} fill={g(tonla(C.taban, ton))} />);
      if (k > 0.3) els.push(<polyline key={`h${i}`} points={poly([m(u1 + 0.12 / n, 0), m(u1 + 0.12 / n, 1)])} stroke={g(C.isik)} strokeWidth={Math.max(1, 2 * k)} opacity={0.7} fill="none" />);
    }
    // sıra bindirmeleri: düzensiz, dalgalı
    for (let r = 1; r < rows; r++) {
      const pts: P[] = [];
      for (let s = 0; s <= n * 2; s++) pts.push(m(s / (n * 2), r / rows + (s % 2 ? 0.25 : -0.1) / rows * 0.35 + (rnd(seed, `r${r}-${s}`) - 0.5) * 0.12 / rows));
      els.push(<polyline key={`r${r}`} points={poly(pts)} stroke={g(C.cizgi)} strokeWidth={Math.max(1, 1.8 * k)} opacity={0.55} fill="none" />);
    }
    if (likenli) for (let l = 0; l < 6; l++) { const c = m(rnd(seed, `lu${l}`), rnd(seed, `lv${l}`)); els.push(<ellipse key={`l${l}`} cx={c[0]} cy={c[1]} rx={6 + rnd(seed, `lr${l}`) * 10} ry={3 + rnd(seed, `ly${l}`) * 4} fill={g("#8a8a5a")} opacity={0.25 * k} />); }
  } else if (tip === "arduvaz") {
    const rows = Math.max(2, Math.round(H / 30)), cols = Math.max(3, Math.round(W / 22));
    for (let r = 0; r < rows; r++) {
      const off = (r % 2) * 0.5;
      if (k > 0.5) for (let c = 0; c < cols; c++) {
        const u1 = (c + off) / cols, u2 = Math.min(1, u1 + 0.96 / cols);
        if (u1 >= 1) continue;
        els.push(<polygon key={`p${r}-${c}`} points={poly(parca(m, u1, u2, r / rows, (r + 0.95) / rows))} fill={g(tonla(C.taban, (rnd(seed, `p${r}-${c}`) - 0.5) * 0.12))} />);
      }
      els.push(<polyline key={`a${r}`} points={poly([m(0, r / rows), m(1, r / rows)])} stroke={g(C.cizgi)} strokeWidth={1.5} fill="none" />);
    }
  } else {
    const n = Math.max(2, Math.round(W / 180));
    for (let i = 1; i < n; i++) {
      els.push(<polyline key={`d${i}`} points={poly([m(i / n, 0), m(i / n, 1)])} stroke={g(C.koyu)} strokeWidth={3} fill="none" />);
      els.push(<polyline key={`e${i}`} points={poly([m(i / n + 0.004, 0), m(i / n + 0.004, 1)])} stroke={g(C.isik)} strokeWidth={1} fill="none" />);
    }
  }
  if (mahya) els.push(<polyline key="mh" points={poly([m(0, 0), m(1, 0)])} stroke={mahya} strokeWidth={2.5} opacity={0.6} fill="none" />);
  return <g>{els}</g>;
};
