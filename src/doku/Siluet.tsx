import React, { useId } from "react";

// Yüzsüz siluet (tasarim.md 0.2; eleştiri A sistemik 7): kuklanın yalnız BİÇİMİ kalır (alfa maskesi) — göz, bıyık,
// yüz ayrıntısı tamamen kaybolur. İki ton: üstten alta dikey degrade (acik → renk). İsteğe bağlı kenar ışığı:
// ışık tarafına dx kaydırılmış düz kopya (anahtar ışık yönünde ince parlak kenar). kutu: figürün kabaca sınırı (degrade için).
export const Siluet: React.FC<{ renk: string; acik?: string; alfa?: number; kenar?: { renk: string; dx: number; dy?: number }; kutu?: [number, number, number, number]; children: React.ReactNode }> = ({ renk, acik, alfa = 1, kenar, kutu, children }) => {
  const id = "sl" + useId().replace(/:/g, "");
  const [x, y, w, h] = kutu ?? [-3000, -3000, 6000, 6000];
  return (
    <g>
      <defs>
        {/* her pikseli beyaza çevir, alfayı koru → maske */}
        <filter id={`${id}f`} colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" /></filter>
        <mask id={`${id}m`} maskUnits="userSpaceOnUse" x={-3000} y={-3000} width={6000} height={6000}><g filter={`url(#${id}f)`}>{children}</g></mask>
        <linearGradient id={`${id}g`} gradientUnits="userSpaceOnUse" x1={0} y1={y} x2={0} y2={y + h}><stop offset="0" stopColor={acik ?? renk} /><stop offset="0.55" stopColor={renk} /><stop offset="1" stopColor={renk} /></linearGradient>
      </defs>
      {kenar && <g transform={`translate(${kenar.dx},${kenar.dy ?? 0})`}><rect x={x} y={y} width={w} height={h} fill={kenar.renk} opacity={alfa} mask={`url(#${id}m)`} /></g>}
      <rect x={x} y={y} width={w} height={h} fill={`url(#${id}g)`} opacity={alfa} mask={`url(#${id}m)`} />
    </g>
  );
};
