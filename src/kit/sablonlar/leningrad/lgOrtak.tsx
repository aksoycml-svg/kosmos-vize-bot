// ===== Leningrad ortak yardımcıları (BODRUM, SOKAK-LG; SALON tur-4 dili) — yalnız EKLEME, eski şablonlar bunu içe aktarmaz =====
// - LgBaski: SALON tur-4 baskı zinciri (RenkKaydi 2.2/1.5 + kâğıt lifi multiply α .12 + sabit gren overlay α .14), şablon içinde.
// - cr / pS: Catmull-Rom yol ve nokta dizisi.
// - Hilal: bir şeklin kaydırılmış kopyasıyla maskelenmiş ince hilal (kenar ışığı, alttan yansıma) — net kenar, bulanıklık yok.
// - Dunya: kamera25d sarmalayıcı (dünya → ekran, çokgen, plaka kutusu, zarf).
import React, { useId } from "react";
import { staticFile } from "remotion";
import { RenkKaydi } from "../../../doku/Tarama";
import { izd, izdPoli, Kam25, V3 } from "../../kamera25d";
import { zarf } from "./salonDunya";

export type P2 = [number, number];
export const pS = (a: P2[]) => a.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(" ");
/** Catmull-Rom (kapalı/açık) → path d */
export const cr = (a: P2[], kapali = true) => {
  const n = a.length, g = (i: number) => a[kapali ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  let d = `M${a[0][0].toFixed(1)},${a[0][1].toFixed(1)}`;
  for (let i = 0; i < (kapali ? n : n - 1); i++) {
    const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)},${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)},${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return kapali ? d + " Z" : d;
};
export const duzYol = (a: P2[]) => `M${a.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(" L")} Z`;

/** SALON tur-4 baskı dili: renk kaydı + kâğıt lifi + sabit gren (kaynamaz) */
export const LgBaski: React.FC<{ children: React.ReactNode; lif?: number; gren?: number }> = ({ children, lif = 0.12, gren = 0.14 }) => {
  const id = "lb" + useId().replace(/:/g, "");
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <RenkKaydi dx={2.2} dy={1.5}>{children}</RenkKaydi>
      <defs><pattern id={`${id}gr`} patternUnits="userSpaceOnUse" width={512} height={512}><image href={staticFile("doku/gren-512.png")} width={512} height={512} /></pattern></defs>
      <image href={staticFile("doku/kagit-lif.png")} x={0} y={0} width={1080} height={1920} preserveAspectRatio="none" style={{ mixBlendMode: "multiply" }} opacity={lif} />
      <rect x={0} y={0} width={1080} height={1920} fill={`url(#${id}gr)`} style={{ mixBlendMode: "overlay" }} opacity={gren} />
    </svg>
  );
};

/** hilal: şekil − (şekil + kayma). Kenar ışığı (kayma ışığın tersine) ve alttan yansıma için; maske, bulanıklık yok. */
export const Hilal: React.FC<{ d: string; renk: string; dx: number; dy: number; alfa?: number; blend?: "screen" | "normal" }> = ({ d, renk, dx, dy, alfa = 1, blend = "normal" }) => {
  const id = "hl" + useId().replace(/:/g, "");
  return <g>
    <defs><mask id={id} maskUnits="userSpaceOnUse" x={-500} y={-500} width={2100} height={2900}>
      <path d={d} fill="#fff" /><path d={d} fill="#000" transform={`translate(${dx} ${dy})`} />
    </mask></defs>
    <path d={d} fill={renk} mask={`url(#${id})`} opacity={alfa} style={blend === "screen" ? { mixBlendMode: "screen" } : undefined} />
  </g>;
};

/** kırpılı grup (clipPath, yol ya da nokta dizisi) */
export const Kirp: React.FC<{ d: string; children: React.ReactNode }> = ({ d, children }) => {
  const id = "kp" + useId().replace(/:/g, "");
  return <g><defs><clipPath id={id}><path d={d} /></clipPath></defs><g clipPath={`url(#${id})`}>{children}</g></g>;
};

/** dünya sarmalayıcı (kamera25d) */
export const dunya = (K: Kam25) => {
  const E = (X: V3): P2 => { const q = izd(K, X, 0.02); return q ? [q.x, q.y] : [NaN, NaN]; };
  const S = (X: V3) => izd(K, X, 0.02)?.s ?? 0;
  const poli = (A: V3[]) => pS(izdPoli(K, A, 0.03) as P2[]);
  const poliD = (A: V3[]) => duzYol(izdPoli(K, A, 0.03) as P2[]);
  const kutu = (A: V3[]) => zarf(A.map(E)) as P2[]; // dışbükey zarf (ışık levhası kesitleri)
  return { E, S, poli, poliD, kutu };
};
export type Dunya = ReturnType<typeof dunya>;
