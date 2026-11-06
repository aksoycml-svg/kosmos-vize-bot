import React, { useId } from "react";

// Yüzsüz siluet (tasarim.md 0.2): kukla tek düz renge iner (göz beyazı dahil), derinliğe göre ton.
// Gündüz: yakın #5a4a3c · orta #7a6a58 · uzak #9a8a74. Gece: #1c1a22 / #2a2c3c / #3a3c52.
export const Siluet: React.FC<{ renk: string; alfa?: number; children: React.ReactNode }> = ({ renk, alfa = 1, children }) => {
  const id = "sl" + useId().replace(/:/g, "");
  const n = parseInt(renk.slice(1), 16);
  const [r, g, b] = [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  return (
    <g>
      <defs><filter id={id} colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values={`0 0 0 0 ${r.toFixed(3)}  0 0 0 0 ${g.toFixed(3)}  0 0 0 0 ${b.toFixed(3)}  0 0 0 ${alfa} 0`} /></filter></defs>
      <g filter={`url(#${id})`}>{children}</g>
    </g>
  );
};
