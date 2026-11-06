import React, { useId } from "react";
import { random, useCurrentFrame } from "remotion";
import { P, poly, rnd, EN_KOYU } from "./sabitler";

// ===== Işık katmanı: kare kare değişen TEK katman (doku sabit, ışık canlı) — mekanlar.md 1.4 =====
export type IsikTip = "mum" | "fener" | "reverbere" | "pencere" | "gunes" | "ay";
export type IsikKaynak = { tip: IsikTip; x: number; y: number; r: number; renk: string; guc?: number; seed?: number };

// titreşim çarpanı (deterministik): mum ±%8 + 3 karede bir rastgele, fener ±%4, diğerleri sabit
export const titresim = (tip: IsikTip, frame: number, seed = 0) => {
  if (tip === "mum") return 1 + Math.sin(frame * 0.35 + seed) * 0.04 + Math.sin(frame * 0.95 + seed * 2) * 0.025 + (random(`mum${seed}-${Math.floor(frame / 3)}`) - 0.5) * 0.04;
  if (tip === "fener") return 1 + Math.sin(frame * 0.2 + seed) * 0.025 + Math.sin(frame * 0.53 + seed) * 0.015;
  if (tip === "reverbere") return 1 + Math.sin(frame * 0.35 + seed) * 0.03;
  return 1;
};

export const IsikKatmani: React.FC<{ kaynaklar: IsikKaynak[]; karisim?: "screen" | "soft-light" | "overlay" }> = ({ kaynaklar, karisim = "screen" }) => {
  const frame = useCurrentFrame();
  const id = "ik" + useId().replace(/:/g, "");
  return (
    <g style={{ mixBlendMode: karisim }}>
      <defs>
        {kaynaklar.map((k, i) => (
          <radialGradient key={i} id={`${id}${i}`}>
            <stop offset="0" stopColor={k.renk} stopOpacity={0.9} />
            <stop offset="0.35" stopColor={k.renk} stopOpacity={0.35} />
            <stop offset="1" stopColor={k.renk} stopOpacity={0} />
          </radialGradient>
        ))}
      </defs>
      {kaynaklar.map((k, i) => {
        const f = titresim(k.tip, frame, k.seed ?? i);
        return <circle key={i} cx={k.x} cy={k.y} r={k.r * (0.97 + 0.03 * f)} fill={`url(#${id}${i})`} opacity={(k.guc ?? 0.5) * f} />;
      })}
    </g>
  );
};

// ===== Huzme: pencereden düşen ışık şeridi + yalnız huzme içinde görünen toz =====
export const Huzme: React.FC<{ kose: [P, P, P, P]; renk?: string; alfa?: number; toz?: { sayi: number; seed: number }; nefes?: number }> = ({ kose, renk = "#fff1c8", alfa = 0.22, toz, nefes = 0.03 }) => {
  const frame = useCurrentFrame();
  const id = "hz" + useId().replace(/:/g, "");
  const n = 1 + Math.sin((frame / 60) * Math.PI * 2 * 0.25) * nefes; // 0.25 Hz nefes (60 fps)
  const [a, b, c, d] = kose;
  const xs = kose.map((p) => p[0]), ys = kose.map((p) => p[1]);
  const bx = Math.min(...xs), by = Math.min(...ys), bw = Math.max(...xs) - bx, bh = Math.max(...ys) - by;
  return (
    <g>
      <defs>
        <linearGradient id={`${id}g`} gradientUnits="userSpaceOnUse" x1={(a[0] + b[0]) / 2} y1={(a[1] + b[1]) / 2} x2={(c[0] + d[0]) / 2} y2={(c[1] + d[1]) / 2}>
          <stop offset="0" stopColor={renk} stopOpacity={alfa * n} />
          <stop offset="1" stopColor={renk} stopOpacity={alfa * 0.35 * n} />
        </linearGradient>
        <clipPath id={`${id}c`}><polygon points={poly(kose)} /></clipPath>
        <filter id={`${id}b`}><feGaussianBlur stdDeviation={6} /></filter>
      </defs>
      <polygon points={poly(kose)} fill={`url(#${id}g)`} filter={`url(#${id}b)`} style={{ mixBlendMode: "screen" }} />
      {toz && (
        <g clipPath={`url(#${id}c)`} style={{ mixBlendMode: "screen" }}>
          {Array.from({ length: toz.sayi }).map((_, i) => {
            const x = bx + ((rnd(toz.seed, `x${i}`) * bw + frame * (rnd(toz.seed, `vx${i}`) - 0.5) * 0.4) % bw + bw) % bw;
            const y = by + ((rnd(toz.seed, `y${i}`) * bh - frame * (0.1 + rnd(toz.seed, `vy${i}`) * 0.25)) % bh + bh) % bh;
            const tw = 0.4 + 0.6 * Math.abs(Math.sin(frame * 0.03 + i));
            return <circle key={i} cx={x} cy={y} r={1 + rnd(toz.seed, `s${i}`) * 2.2} fill="#fff6dc" opacity={0.7 * tw} />;
          })}
        </g>
      )}
    </g>
  );
};

// ===== Temas gölgesi: ayak/baston/nesne zemine bastığı yerde koyu çekirdek + ışığın tersine uzanan yumuşak gölge =====
// isik: ışık kaynağının ZEMİNE izdüşümü (ekran px). Gölge bu noktadan uzağa doğru uzar (0.15 × boy).
export const TemasGolgesi: React.FC<{ x: number; y: number; genislik: number; boy?: number; isik?: P; alfa?: number; renk?: string; yassi?: number }> = ({ x, y, genislik, boy = 0, isik, alfa = 0.5, renk = EN_KOYU, yassi = 0.2 }) => {
  const id = "tg" + useId().replace(/:/g, "");
  let dx = 0, dy = 0;
  if (isik && boy > 0) { const vx = x - isik[0], vy = (y - isik[1]) * 3; const L = Math.hypot(vx, vy) || 1; dx = (vx / L) * boy * 0.15; dy = (vy / L) * boy * 0.15 * 0.33; }
  const aci = (Math.atan2(dy, dx) * 180) / Math.PI;
  const uzun = Math.hypot(dx, dy);
  return (
    <g>
      <defs><filter id={id} x="-50%" y="-200%" width="200%" height="500%"><feGaussianBlur stdDeviation={Math.max(2, genislik * 0.04)} /></filter></defs>
      {uzun > 1 && <ellipse cx={x + dx / 2} cy={y + dy / 2} rx={genislik / 2 + uzun / 2} ry={genislik * yassi * 0.5} transform={`rotate(${aci} ${x + dx / 2} ${y + dy / 2})`} fill={renk} opacity={alfa * 0.55} filter={`url(#${id})`} />}
      <ellipse cx={x} cy={y} rx={genislik / 2} ry={genislik * yassi * 0.5} fill={renk} opacity={alfa * 0.8} filter={`url(#${id})`} />
      <ellipse cx={x} cy={y} rx={genislik * 0.32} ry={genislik * yassi * 0.22} fill={renk} opacity={alfa} />
    </g>
  );
};
