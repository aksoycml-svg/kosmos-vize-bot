import React, { useId } from "react";
import { Derinlik, TITREME } from "./sabitler";

// El çizimi kontur titremesi: katman grubuna bir kez uygulanır (her nesneye değil).
// Seed sabit → kontur kaynamaz. Ölçek derinliğe göre (uzak 1.2 … insert 3.0).
export const KonturTitreme: React.FC<{ derinlik: Derinlik; seed: number; olcek?: number; children: React.ReactNode }> = ({ derinlik, seed, olcek, children }) => {
  const id = "kt" + useId().replace(/:/g, "");
  return (
    <g>
      <defs>
        <filter id={id} x="-2%" y="-2%" width="104%" height="104%" colorInterpolationFilters="sRGB">
          <feTurbulence type="turbulence" baseFrequency="0.018" numOctaves={2} seed={seed} result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale={olcek ?? TITREME[derinlik]} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter={`url(#${id})`}>{children}</g>
    </g>
  );
};
