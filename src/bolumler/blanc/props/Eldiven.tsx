import React from "react";
import { BL, ink } from "../../../doku/sabitler";

// Kahraman eldiveni (glacé, beyaz; sırtta üç çizgili dikiş) — manşet kenarının BİR noktasından tutulmuş hâlde.
// Yerel orijin = kıstırma noktası (manşetin en yüksek noktası), +y aşağı. Deri yumuşak: manşet kıstırılan yerde katlanır,
// ağız eğik (tutulmayan kenar aşağıda), parmaklar ayrık ve hafif kıvrık sarkar. golge: tek renk gölge kopyası.
// P01, P10 (masada), P15 (buruşuk), P16 (düşen), P19 (EldivenEl), P23.
export const Eldiven: React.FC<{ golge?: boolean; golgeRenk?: string; renk?: string }> = ({ golge, golgeRenk = "#14110d", renk = BL.gloveHero }) => {
  const g = renk, gk = "#d4c9b0", c = golge ? golgeRenk : g;
  const st = golge ? {} : { stroke: ink(g), strokeWidth: 2, strokeLinejoin: "round" as const };
  const parmak = (d: string, i: number) => <path key={i} d={d} fill={c} {...st} />;
  return (
    <g>
      {parmak("M -10 64 Q -32 78 -36 104 Q -38 116 -28 116 Q -20 114 -18 100 Q -14 86 -2 82 Z", 9)}
      {parmak("M -6 118 Q -12 150 -10 182 Q -9 194 0 193 Q 8 191 8 180 Q 8 150 10 120 Z", 0)}
      {parmak("M 10 122 Q 8 160 12 200 Q 14 212 23 210 Q 31 207 30 196 Q 28 160 28 124 Z", 1)}
      {parmak("M 28 124 Q 32 160 38 194 Q 41 205 49 202 Q 56 198 54 187 Q 48 156 45 122 Z", 2)}
      {parmak("M 45 120 Q 52 146 60 168 Q 64 178 71 175 Q 77 171 74 162 Q 66 140 60 116 Z", 3)}
      <path d="M -10 30 Q -16 70 -8 122 Q 26 132 62 118 Q 70 80 64 38 Z" fill={c} {...st} />
      {!golge && <>
        <path d="M 40 44 Q 52 80 50 118 Q 58 116 62 116 Q 68 80 62 40 Z" fill={gk} opacity={0.75} />
        {[6, 22, 38].map((x) => <path key={x} d={`M ${x} 58 Q ${x + 2} 82 ${x + 1} 108`} stroke={BL.gloveDikis} strokeWidth={2} fill="none" />)}
        <path d="M -4 96 Q 20 104 52 96" stroke={gk} strokeWidth={2.4} fill="none" />
        {[2, 20, 37, 52].map((x, i) => <path key={i} d={`M ${x} ${150 + i * 6} q 5 3 10 0`} stroke={gk} strokeWidth={1.6} fill="none" />)}
      </>}
      {/* manşet: kıstırılan yerde katlanmış, ağız eğik */}
      <path d="M 0 0 Q -14 18 -10 34 Q 26 44 64 40 Q 70 30 66 20 Q 34 18 0 0 Z" fill={c} {...st} />
      {!golge && <>
        <path d="M 0 0 Q 34 12 66 20 Q 40 30 6 10 Z" fill="#7e7360" />
        <path d="M 2 2 L 8 22 M 4 4 L 16 18 M 0 6 L 2 24" stroke={ink(g)} strokeWidth={1.6} opacity={0.6} />
        <path d="M -8 30 Q 26 40 62 36" stroke={ink(g)} strokeWidth={1.3} opacity={0.5} fill="none" />
      </>}
    </g>
  );
};
