// ===== KE-PK-F1 KOMPARS SİLUET SETİ (tasarim.md §3.1) =====
// Tek ton düz dolgu, kontur yok, yüz yok (baş düz oval), şapka/kepi/arma/etek yok; ayrışma yalnız boy sınıfı + duruş.
// Kodlar: yetiskin-a (1.70 m, dar/dik) · yetiskin-b (1.62 m, geniş omuz, öne eğik) · cocuk (1.05 m, baş oranı büyük) ·
// omuzda-cubuk (yetiskin-a + omuzda ince uzun çubuk; model iddiası yok).
// Geometri metre cinsinden, ayak tabanı (0,0), yukarı −y. Ekrana: ayak noktası + pxm (ekran px/m). yon 1 sağa, −1 sola bakar.
// Kenar ışığı: aynı biçimin ışık yönüne kaydırılmış düz kopyası (2 px). Pencere/kapı içi: `klip` (ekran dikdörtgeni) ile bel yukarı.
// Temas gölgesi: ayakta ve kırpılmamışken ayak altında koyu elips (golge: false ile kapatılır).
import React, { useId } from "react";
import type { P } from "../../tipler";

export type SiluetKod = "yetiskin-a" | "yetiskin-b" | "cocuk" | "omuzda-cubuk";
export const SILUET_KODLARI: SiluetKod[] = ["yetiskin-a", "yetiskin-b", "cocuk", "omuzda-cubuk"];
type Olcu = { H: number; omuz: number; etek: number; etekY: number; basR: [number, number]; egim: number };
const OLCU: Record<SiluetKod, Olcu> = {
  "yetiskin-a": { H: 1.7, omuz: 0.4, etek: 0.4, etekY: 0.46, basR: [0.092, 0.115], egim: 0 },
  "yetiskin-b": { H: 1.62, omuz: 0.5, etek: 0.48, etekY: 0.44, basR: [0.097, 0.113], egim: 7 },
  "cocuk": { H: 1.05, omuz: 0.27, etek: 0.28, etekY: 0.3, basR: [0.088, 0.1], egim: 0 },
  "omuzda-cubuk": { H: 1.7, omuz: 0.4, etek: 0.4, etekY: 0.46, basR: [0.092, 0.115], egim: 0 },
};
export const siluetBoy = (kod: SiluetKod) => OLCU[kod].H;

const yol = (kod: SiluetKod, bakis: number): string => {
  const o = OLCU[kod], H = o.H, bas = H - o.basR[1];
  const om = H - 2 * o.basR[1] - 0.06, w = o.omuz / 2, e = o.etek / 2;
  const sh = (x: number, y: number): string => { const t = Math.tan((o.egim * Math.PI) / 180) * y; return `${(x + t).toFixed(4)} ${(-y).toFixed(4)}`; };
  const boyunW = 0.055;
  const gov = [
    `M ${sh(-boyunW, om + 0.05)}`, `C ${sh(-boyunW, om + 0.01)} ${sh(-w * 0.8, om + 0.02)} ${sh(-w, om - 0.06)}`,
    `C ${sh(-w - 0.02, om - 0.3)} ${sh(-e - 0.01, o.etekY + 0.3)} ${sh(-e, o.etekY)}`,
    `L ${sh(-0.035, o.etekY)}`, `L ${sh(-0.11, 0.03)}`, `L ${sh(-0.14, 0)}`, `L ${sh(-0.01, 0)}`, `L ${sh(-0.005, o.etekY - 0.04)}`,
    `L ${sh(0.01, o.etekY - 0.04)}`, `L ${sh(0.02, 0)}`, `L ${sh(0.15, 0)}`, `L ${sh(0.11, 0.03)}`, `L ${sh(0.04, o.etekY)}`,
    `L ${sh(e, o.etekY)}`, `C ${sh(e + 0.01, o.etekY + 0.3)} ${sh(w + 0.02, om - 0.3)} ${sh(w, om - 0.06)}`,
    `C ${sh(w * 0.8, om + 0.02)} ${sh(boyunW, om + 0.01)} ${sh(boyunW, om + 0.05)}`, "Z",
  ].join(" ");
  // baş: düz oval, bakış yönüne hafif kayık (yüz yok)
  const bx = 0.018 * bakis + Math.tan((o.egim * Math.PI) / 180) * bas;
  const [rx, ry] = o.basR;
  const basYol = `M ${(bx - rx).toFixed(4)} ${(-bas).toFixed(4)} A ${rx} ${ry} 0 1 0 ${(bx + rx).toFixed(4)} ${(-bas).toFixed(4)} A ${rx} ${ry} 0 1 0 ${(bx - rx).toFixed(4)} ${(-bas).toFixed(4)} Z`;
  const cubuk = kod === "omuzda-cubuk" ? ` M ${sh(0.13, 1.02)} L ${sh(-0.36, 2.3)} L ${sh(-0.34, 2.31)} L ${sh(0.155, 1.03)} Z` : "";
  return `${gov} ${basYol}${cubuk}`;
};

export const SiluetFigur: React.FC<{ kod: SiluetKod; ayak: P; pxm: number; renk: string; kenar?: { renk: string; dx: number; dy?: number }; yon?: 1 | -1; bakis?: number; klip?: [number, number, number, number]; golge?: boolean; golgeRenk?: string }> = ({ kod, ayak, pxm, renk, kenar, yon = 1, bakis = 1, klip, golge = true, golgeRenk = "#14120f" }) => {
  const id = "sf" + useId().replace(/:/g, "");
  const d = yol(kod, bakis);
  const tr = `translate(${ayak[0]} ${ayak[1]}) scale(${pxm * yon} ${pxm})`;
  return (
    <g clipPath={klip ? `url(#${id})` : undefined}>
      {klip && <defs><clipPath id={id}><rect x={klip[0]} y={klip[1]} width={klip[2]} height={klip[3]} /></clipPath></defs>}
      {golge && !klip && <ellipse cx={ayak[0]} cy={ayak[1]} rx={0.28 * pxm} ry={0.05 * pxm} fill={golgeRenk} opacity={0.45} />}
      {kenar && <path d={d} transform={`translate(${kenar.dx} ${kenar.dy ?? 0}) ${tr}`} fill={kenar.renk} />}
      <path d={d} transform={tr} fill={renk} />
    </g>
  );
};
