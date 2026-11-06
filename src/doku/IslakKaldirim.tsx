import React, { useId } from "react";
import { P, poly, rnd } from "./sabitler";

// ===== Islak kaldırım su birikintisi (KALDIRIM-ISLAK) — gerçek ayna =====
// Alçak kameradan birikinti, üstündeki dünyayı ters çevirip gösterir: uzak kenarda gök (açık), ışık kaynaklarının
// x hizasında dikey uzamış parlak yansıma (réverbère, fener), karşı cephe pencerelerinin amber lekeleri.
// Dalga DONUK (sabit seed); yalnız bir şey geçerse yerel halka (bu bileşen dışında).
export type Birikinti = { z: number; u: number; rz: number; ru: number };
export type Yansima = { x: number; renk: string; guc?: number; gen?: number };

export const IslakKaldirim: React.FC<{
  zemin: (z: number, u: number) => P; birikinti: Birikinti[]; seed: number;
  gok?: [string, string]; isiklar?: Yansima[]; pencereler?: Yansima[];
}> = ({ zemin, birikinti, seed, gok = ["#8a9ccc", "#141c38"], isiklar = [], pencereler = [] }) => {
  const id = "ik" + useId().replace(/:/g, "");
  return (
    <g>
      <defs>
        <filter id={`${id}d`} x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.015 0.09" numOctaves={1} seed={seed} /><feDisplacementMap in="SourceGraphic" scale={5} xChannelSelector="R" yChannelSelector="G" /></filter>
        <filter id={`${id}b`} x="-50%" y="-20%" width="200%" height="140%"><feGaussianBlur stdDeviation={4} /></filter>
        <filter id={`${id}k`} x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation={1.2} /></filter>
      </defs>
      {birikinti.map((b, i) => {
        const pts: P[] = Array.from({ length: 20 }).map((_, s) => {
          const a = (s / 20) * Math.PI * 2, n = 0.8 + rnd(seed, `b${i}-${s}`) * 0.35;
          return zemin(b.z + Math.sin(a) * b.rz * n, b.u + Math.cos(a) * b.ru * n);
        });
        const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
        const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
        return (
          <g key={i}>
            <defs>
              <clipPath id={`${id}c${i}`}><polygon points={poly(pts)} /></clipPath>
              <linearGradient id={`${id}g${i}`} gradientUnits="userSpaceOnUse" x1={0} y1={y0} x2={0} y2={y1}><stop offset="0" stopColor={gok[0]} /><stop offset="0.55" stopColor={gok[1]} /><stop offset="1" stopColor="#0b1020" /></linearGradient>
            </defs>
            <g clipPath={`url(#${id}c${i})`}>
              <rect x={x0 - 10} y={y0 - 10} width={x1 - x0 + 20} height={y1 - y0 + 20} fill={`url(#${id}g${i})`} />
              <g filter={`url(#${id}d)`}>
                {pencereler.filter((w) => w.x > x0 - 20 && w.x < x1 + 20).map((w, j) => <rect key={`w${j}`} x={w.x - (w.gen ?? 10) / 2} y={y0 + (y1 - y0) * 0.15} width={w.gen ?? 10} height={(y1 - y0) * 0.55} fill={w.renk} opacity={w.guc ?? 0.7} />)}
                {isiklar.map((l, j) => Math.abs(l.x - (x0 + x1) / 2) < (x1 - x0) * 0.9 && (
                  <g key={`l${j}`} filter={`url(#${id}b)`}>
                    <rect x={l.x - (l.gen ?? 22) / 2} y={y0 - 6} width={l.gen ?? 22} height={y1 - y0 + 12} fill={l.renk} opacity={l.guc ?? 0.85} />
                    <rect x={l.x - (l.gen ?? 22) / 6} y={y0} width={(l.gen ?? 22) / 3} height={(y1 - y0) * 0.8} fill="#fff4d8" opacity={0.85} />
                  </g>
                ))}
              </g>
            </g>
            {/* ıslak kenar: ince parlak çizgi (ay kenar ışığı) + uzak kenarda koyu taş kenarı */}
            <polygon points={poly(pts)} fill="none" stroke="#c4d6ff" strokeWidth={1.6} opacity={0.55} filter={`url(#${id}k)`} />
          </g>
        );
      })}
    </g>
  );
};
