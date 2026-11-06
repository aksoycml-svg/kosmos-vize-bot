import React, { useId } from "react";
import { ink, rnd } from "./sabitler";

// ===== Eski dalgalı cam, küçük kare camlar (CAM-ESKI) =====
// Dış görünüm (children) cam başına hafif dalgalı bozulur (sabit seed), cam başına ton farkı,
// 45° yansıma şeridi, birkaç hava kabarcığı, ahşap kayıtlar.
export const PencereEskiCam: React.FC<{
  x: number; y: number; w: number; h: number; kayit?: [number, number]; dalga?: number; yansima?: number;
  cerceve?: string; kayitKalinlik?: number; seed?: number; children: React.ReactNode;
}> = ({ x, y, w, h, kayit = [2, 3], dalga = 6, yansima = 0.1, cerceve = "#5b3d25", kayitKalinlik = 7, seed = 31, children }) => {
  const id = "pc" + useId().replace(/:/g, "");
  const [nc, nr] = kayit;
  const cw = w / nc, ch = h / nr;
  return (
    <g>
      <defs>
        <clipPath id={`${id}c`}><rect x={x} y={y} width={w} height={h} /></clipPath>
        <filter id={`${id}d`} filterUnits="userSpaceOnUse" x={x - 20} y={y - 20} width={w + 40} height={h + 40}>
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.03" numOctaves={1} seed={seed} />
          <feDisplacementMap in="SourceGraphic" scale={dalga} xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <linearGradient id={`${id}y`} x1="0" y1="0" x2="1" y2="1"><stop offset="0.35" stopColor="#fff8e8" stopOpacity={0} /><stop offset="0.45" stopColor="#fff8e8" stopOpacity={yansima} /><stop offset="0.52" stopColor="#fff8e8" stopOpacity={0} /></linearGradient>
      </defs>
      <g clipPath={`url(#${id}c)`}>
        <g filter={`url(#${id}d)`}>{children}</g>
        {Array.from({ length: nc * nr }).map((_, i) => {
          const c = i % nc, r = Math.floor(i / nc);
          return <rect key={i} x={x + c * cw} y={y + r * ch} width={cw} height={ch} fill="#fffaf0" opacity={0.03 + rnd(seed, `t${i}`) * 0.04} />;
        })}
        <rect x={x} y={y} width={w} height={h} fill="#9fb0c0" opacity={0.1} />
        <rect x={x} y={y} width={w} height={h} fill={`url(#${id}y)`} />
        {Array.from({ length: 5 }).map((_, i) => <circle key={`k${i}`} cx={x + rnd(seed, `kx${i}`) * w} cy={y + rnd(seed, `ky${i}`) * h} r={1.5} fill="#fffaf0" opacity={0.45} />)}
      </g>
      {/* kayıtlar */}
      {Array.from({ length: nc - 1 }).map((_, i) => <rect key={`v${i}`} x={x + (i + 1) * cw - kayitKalinlik / 2} y={y} width={kayitKalinlik} height={h} fill={cerceve} stroke={ink(cerceve)} strokeWidth={1.5} />)}
      {Array.from({ length: nr - 1 }).map((_, i) => <rect key={`h${i}`} x={x} y={y + (i + 1) * ch - kayitKalinlik / 2} width={w} height={kayitKalinlik} fill={cerceve} stroke={ink(cerceve)} strokeWidth={1.5} />)}
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={cerceve} strokeWidth={kayitKalinlik * 1.6} />
      <rect x={x - kayitKalinlik * 0.8} y={y - kayitKalinlik * 0.8} width={w + kayitKalinlik * 1.6} height={h + kayitKalinlik * 1.6} fill="none" stroke={ink(cerceve)} strokeWidth={2} />
    </g>
  );
};
