import React, { useId } from "react";
import { P, poly, rnd } from "./sabitler";

// ===== Islak kaldırım su birikintileri (KALDIRIM-ISLAK) =====
// zemin(z,u) sözleşmesiyle çizilir; birikinti = gök + yakındaki ışık kaynağının aynası.
// Dalga DONUK (sabit seed); yalnız bir şey geçerse yerel halka (bu bileşen dışında).
export type Birikinti = { z: number; u: number; rz: number; ru: number };

export const IslakKaldirim: React.FC<{
  zemin: (z: number, u: number) => P; birikinti: Birikinti[]; seed: number;
  gok?: [string, string]; isiklar?: { x: number; renk: string; guc?: number }[];
}> = ({ zemin, birikinti, seed, gok = ["#6a7aa8", "#121a34"], isiklar = [] }) => {
  const id = "ik" + useId().replace(/:/g, "");
  return (
    <g>
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor={gok[1]} /><stop offset="0.6" stopColor={gok[1]} /><stop offset="1" stopColor={gok[0]} /></linearGradient>
        <filter id={`${id}d`}><feTurbulence type="fractalNoise" baseFrequency="0.02 0.08" numOctaves={1} seed={seed} /><feDisplacementMap in="SourceGraphic" scale={4} xChannelSelector="R" yChannelSelector="G" /></filter>
        <filter id={`${id}b`}><feGaussianBlur stdDeviation={8} /></filter>
      </defs>
      {birikinti.map((b, i) => {
        const pts: P[] = Array.from({ length: 18 }).map((_, s) => {
          const a = (s / 18) * Math.PI * 2, n = 0.75 + rnd(seed, `b${i}-${s}`) * 0.45;
          return zemin(b.z + Math.sin(a) * b.rz * n, b.u + Math.cos(a) * b.ru * n);
        });
        const xs = pts.map((p) => p[0]);
        const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
        return (
          <g key={i}>
            <defs><clipPath id={`${id}c${i}`}><polygon points={poly(pts)} /></clipPath></defs>
            <polygon points={poly(pts)} fill={`url(#${id}g)`} opacity={0.92} />
            <g clipPath={`url(#${id}c${i})`}>
              {isiklar.map((l, j) => Math.abs(l.x - cx) < 320 && <rect key={j} x={l.x - 18} y={Math.min(...pts.map((p) => p[1])) - 10} width={36} height={400} fill={l.renk} opacity={(l.guc ?? 0.6) * (1 - Math.abs(l.x - cx) / 320)} filter={`url(#${id}b)`} />)}
              {/* gök aynası: uzak yarıda açık bant (ay ışıklı gök yansır) */}
              <ellipse cx={cx} cy={Math.min(...pts.map((p) => p[1]))} rx={(Math.max(...xs) - Math.min(...xs)) * 0.55} ry={(Math.max(...pts.map((p) => p[1])) - Math.min(...pts.map((p) => p[1]))) * 0.45} fill={gok[0]} opacity={0.75} filter={`url(#${id}b)`} />
              {/* uzak kenarda gök ışığı şeridi (ayna), dalga donuk */}
              <polyline points={poly(pts.filter((q) => q[1] < (Math.min(...pts.map((p) => p[1])) + Math.max(...pts.map((p) => p[1]))) / 2))} stroke="#c4d6ff" strokeWidth={4} opacity={0.5} fill="none" filter={`url(#${id}d)`} />
            </g>
            <polygon points={poly(pts)} fill="none" stroke="#c4d6ff" strokeWidth={1.2} opacity={0.35} />
          </g>
        );
      })}
    </g>
  );
};
