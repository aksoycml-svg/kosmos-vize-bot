// ===== 1940'lar yüzsüz kompars siluetleri (tasarim.md §5) — tek ton düz dolgu, kontur yok, yüz yok =====
// Ayrışma silüetle: sapkali (Moyzisch 1.80 m, geniş omuz, KENARLI ŞAPKA: kenar profilde ileri → yön okutur) · yasli (elçi 1.76 m,
// omuz öne, 6° kambur) · uzun-ince (yetkili 1.84 m, dar omuz, baş öne) · topuzlu (sekreter 1.62 m, ensede topuz).
// Yön okuması (Paris dersi): baş ovalinde burun–çene profili + şapka kenarının önü uzun; kenar ışığı = biçimin ışık yönüne kaydırılmış kopyası.
// Geometri metre; ayak tabanı (0,0), yukarı −y. yon 1 sağa bakar. poz "oturan": kalça oturak yüksekliğinde (oturak m), uyluk `bacakYon` yönünde.
// govdeYon: gövdenin baktığı yön (oturan + geri dönük baş için baş `yon`, gövde `govdeYon`). kirp: yalnız bu y'nin (ekran) üstü çizilir.
import React, { useId } from "react";
import type { P } from "../../tipler";
import { yumusakYol } from "../../../rig/Kukla";

export type Siluet40Kod = "sapkali" | "yasli" | "uzun-ince" | "topuzlu";
type Olcu = { H: number; omuz: number; bel: number; etek: number; etekY: number; egim: number; basOne: number };
const OLCU: Record<Siluet40Kod, Olcu> = {
  sapkali: { H: 1.8, omuz: 0.5, bel: 0.4, etek: 0.44, etekY: 0.62, egim: 0, basOne: 0.01 },
  yasli: { H: 1.76, omuz: 0.43, bel: 0.38, etek: 0.4, etekY: 0.7, egim: 6, basOne: 0.04 },
  "uzun-ince": { H: 1.84, omuz: 0.4, bel: 0.32, etek: 0.36, etekY: 0.74, egim: 2, basOne: 0.03 },
  topuzlu: { H: 1.62, omuz: 0.36, bel: 0.28, etek: 0.4, etekY: 0.42, egim: 0, basOne: 0.01 },
};
export const SILUET40_KODLARI = Object.keys(OLCU) as Siluet40Kod[];
export const siluet40Boy = (k: Siluet40Kod) => OLCU[k].H;

const dz = (q: [number, number][]) => q.map(([x, y]) => [x, -y] as [number, number]);

/** Siluet yolları (metre, yukarı −y). Baş yönü `yon`a göre (sağa bakan çizilir, aynalama dışarıda). */
export const siluet40Yol = (kod: Siluet40Kod, o: { oturan?: number; govdeDon?: boolean; profil?: boolean } = {}) => {
  // profil: yandan görünüş (gövde derinliği ≈ omuz genişliğinin %58'i; göğüs önde, sırt düz)
  const O0 = OLCU[kod], O = o.profil ? { ...O0, omuz: O0.omuz * 0.58, bel: O0.bel * 0.62, etek: O0.etek * 0.6 } : O0;
  const otur = o.oturan; // oturak yüksekliği (m) ya da undefined
  const kalca = otur !== undefined ? otur + 0.06 : O.H * 0.5;
  const omuzY = otur !== undefined ? kalca + 0.32 * O.H : 0.82 * O.H; // kalça → omuz ≈ 0.32 H
  const basM = omuzY + 0.06, w = O.omuz / 2, b = O.bel / 2;
  const t = Math.tan((O.egim * Math.PI) / 180);
  const sh = (x: number, y: number): [number, number] => [x + t * (y - kalca), y];
  // gövde (ceket/palto): omuz yuvarlak, sırt düz, bel hafif içe
  const gov = dz([
    sh(-0.05, omuzY + 0.06), sh(-w * 0.75, omuzY + 0.03), sh(-w, omuzY - 0.06), sh(-w * 0.95, omuzY - 0.3), sh(-b, kalca + 0.1),
    sh(-b * 1.05, kalca - (otur !== undefined ? 0.04 : O.H * 0.5 - O.etekY)), sh(b * 1.1, kalca - (otur !== undefined ? 0.04 : O.H * 0.5 - O.etekY)),
    sh(b, kalca + 0.1), sh(w * 0.95, omuzY - 0.3), sh(w, omuzY - 0.06), sh(w * 0.75, omuzY + 0.03), sh(0.05, omuzY + 0.06),
  ]);
  let yol = yumusakYol(gov);
  // bacaklar
  if (otur === undefined) {
    const lg = (x0: number) => `M ${x0 - 0.065} ${-(O.etekY + 0.02)} L ${x0 + 0.065} ${-(O.etekY + 0.02)} L ${x0 + 0.06} 0 L ${x0 + 0.13} 0 L ${x0 + 0.13} -0.06 L ${x0 - 0.065} -0.06 Z`;
    yol += ` ${lg(-0.07)} ${lg(0.07)}`;
  } else {
    // oturan: uyluk öne (sağa) yatay, baldır aşağı (zemine)
    yol += ` M ${-b} ${-(kalca + 0.08)} L ${0.45} ${-(kalca + 0.08)} Q ${0.53} ${-(kalca + 0.02)} ${0.5} ${-(kalca - 0.08)} L ${0.47} 0 L ${0.33} 0 L ${0.35} ${-(kalca - 0.08)} L ${-b} ${-(kalca - 0.08)} Z`;
  }
  // boyun + baş (oval + burun–çene profili sağda)
  const bx = t * (basM - kalca) + O.basOne, by = basM + 0.115;
  const bas = `M ${bx - 0.03} ${-(omuzY + 0.02)} L ${bx + 0.035} ${-(omuzY + 0.02)} L ${bx + 0.04} ${-(by - 0.08)} `
    + `L ${bx + 0.075} ${-(by - 0.075)} Q ${bx + 0.09} ${-(by - 0.05)} ${bx + 0.085} ${-(by - 0.03)} L ${bx + 0.1} ${-(by + 0.0)} Q ${bx + 0.098} ${-(by + 0.015)} ${bx + 0.086} ${-(by + 0.02)} `
    + `Q ${bx + 0.08} ${-(by + 0.11)} ${bx - 0.005} ${-(by + 0.115)} Q ${bx - 0.09} ${-(by + 0.1)} ${bx - 0.088} ${-(by + 0.0)} Q ${bx - 0.085} ${-(by - 0.08)} ${bx - 0.03} ${-(by - 0.1)} Z`;
  let basYol = bas;
  if (kod === "sapkali") {
    // kenarlı fötr: tepe 0.11 m, ortada çökük; kenar önde uzun (0.085) ve hafif aşağı, arkada kısa (0.05) ve kalkık → yön okutur
    const ty = by + 0.075;
    basYol += ` M ${bx - 0.09} ${-ty} Q ${bx - 0.082} ${-(ty + 0.06)} ${bx - 0.066} ${-(ty + 0.082)} Q ${bx - 0.035} ${-(ty + 0.098)} ${bx - 0.002} ${-(ty + 0.084)} Q ${bx + 0.035} ${-(ty + 0.098)} ${bx + 0.062} ${-(ty + 0.08)} Q ${bx + 0.08} ${-(ty + 0.055)} ${bx + 0.088} ${-ty} Z`;
    basYol += ` M ${bx - 0.14} ${-(ty + 0.012)} Q ${bx - 0.1} ${-(ty - 0.002)} ${bx} ${-(ty - 0.004)} Q ${bx + 0.12} ${-(ty - 0.006)} ${bx + 0.175} ${-(ty - 0.03)} L ${bx + 0.17} ${-(ty - 0.045)} Q ${bx + 0.1} ${-(ty - 0.024)} ${bx} ${-(ty - 0.026)} Q ${bx - 0.1} ${-(ty - 0.024)} ${bx - 0.142} ${-(ty - 0.004)} Z`;
  }
  if (kod === "topuzlu") basYol += ` M ${bx - 0.1} ${-(by + 0.0)} a 0.055 0.05 0 1 0 0.0001 0 Z`;
  return { yol, basYol, kalca, omuzY, basM: by, omuz: [t * (omuzY - kalca) + w * 0.85, omuzY - 0.05] as [number, number] };
};

export const SiluetFigur40: React.FC<{ kod: Siluet40Kod; ayak: P; pxm: number; renk: string; kenar?: { renk: string; dx: number; dy?: number }; yon?: 1 | -1; basYon?: 1 | -1; oturan?: number; kirp?: number; golge?: boolean; donus?: number; profil?: boolean }> = ({ kod, ayak, pxm, renk, kenar, yon = 1, basYon, oturan, kirp, golge = true, donus = 0, profil }) => {
  const id = "s40" + useId().replace(/:/g, "");
  const { yol, basYol } = siluet40Yol(kod, { oturan, profil });
  const tr = `translate(${ayak[0]} ${ayak[1]}) scale(${pxm * yon} ${pxm}) rotate(${donus})`;
  const trB = `translate(${ayak[0]} ${ayak[1]}) scale(${pxm * (basYon ?? yon)} ${pxm}) rotate(${donus})`;
  return (
    <g clipPath={kirp !== undefined ? `url(#${id})` : undefined}>
      {kirp !== undefined && <defs><clipPath id={id}><rect x={-5000} y={-5000} width={10000} height={kirp + 5000} /></clipPath></defs>}
      {golge && oturan === undefined && <ellipse cx={ayak[0]} cy={ayak[1]} rx={0.3 * pxm} ry={0.05 * pxm} fill="#14120f" opacity={0.5} />}
      {kenar && <g transform={`translate(${kenar.dx} ${kenar.dy ?? 0})`} fill={kenar.renk}><path d={yol} transform={tr} /><path d={basYol} transform={trB} /></g>}
      <path d={yol} transform={tr} fill={renk} />
      <path d={basYol} transform={trB} fill={renk} />
    </g>
  );
};
