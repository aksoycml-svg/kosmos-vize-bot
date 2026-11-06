import React, { useId } from "react";

// Yüzsüz siluet (tasarim.md 0.2; eleştiri A sistemik 7): kukla İKİ tona iner (parlaklığa göre koyu→açık),
// göz beyazı dahil ayrıntı kaybolur ama biçim (şapka profili, omuz, yön) okunur. İsteğe bağlı kenar ışığı:
// ışık tarafına `kenar.dx` kaydırılmış sıcak kopya (anahtar ışık yönünde ince parlak kenar).
const rgb = (h: string) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]; };
const matris = (koyu: string, acik: string, alfa: number) => {
  const a = rgb(koyu), b = rgb(acik);
  // out_c = a_c + (b_c − a_c)·luma ; luma = .3R + .59G + .11B
  return [0, 1, 2].map((c) => { const d = b[c] - a[c]; return `${(0.3 * d).toFixed(3)} ${(0.59 * d).toFixed(3)} ${(0.11 * d).toFixed(3)} 0 ${a[c].toFixed(3)}`; }).join("  ") + `  0 0 0 ${alfa} 0`;
};

export const Siluet: React.FC<{ renk: string; acik?: string; alfa?: number; kenar?: { renk: string; dx: number; dy?: number }; children: React.ReactNode }> = ({ renk, acik, alfa = 1, kenar, children }) => {
  const id = "sl" + useId().replace(/:/g, "");
  const ac = acik ?? renk;
  return (
    <g>
      <defs>
        <filter id={id} colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values={matris(renk, ac, alfa)} /></filter>
        {kenar && <filter id={`${id}k`} colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values={matris(kenar.renk, kenar.renk, alfa)} /></filter>}
      </defs>
      {kenar && <g transform={`translate(${kenar.dx},${kenar.dy ?? 0})`} filter={`url(#${id}k)`}>{children}</g>}
      <g filter={`url(#${id})`}>{children}</g>
    </g>
  );
};
