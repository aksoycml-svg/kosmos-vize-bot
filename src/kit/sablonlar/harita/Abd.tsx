// ===== HARITA `harita_gorunum: "abd"` (yarasa-bombasi KE-8, tasarim.md §7) =====
// Kıta 48 eyalet (us-atlas 3, ABD Census sınırları, kamu malı; topojson → sadeleştirilmiş lon/lat, abd.json). Albers eş alan konik
// (paralel 29.5°/45.5°, λ0 −96°). bolge: ulusal (bbox −125,24,−66,50 → 920 px) | dogu (−82.5,37,−75,41.5 → 900 px), merkez (540, 960).
// Kâğıt: parşömen (doygunluk .62), kara #e0d3b4 + tarama 2.5 px α .22, eyalet sınırı 2.5 px #8a7f6a, kıyı 4 px #2b2f45. Yazı YOK
// (etiketler yazı katmanında: harita_etiketleri dekor px — `abdNokta` ile hesaplanır, KATALOG'da tablo).
// Ekler: zarf_ikon {bas,bit,boyut_px} rota ucunu izler · koy_ikon {lonlat, ev_n, ikon_px, ciz{bas,bit,stagger}} · suru_ikon {bas,bit,lonlat,n}
// · isaret {lonlat, bas} turuncu halka · magara_ikon {lonlat}. Rota/iğne/kamera_takip Harita.tsx'in ortak kodundan (projeksiyon değişir).
import React from "react";
import { interpolate, random } from "remotion";
import abd from "./abd.json";
import type { Plan } from "../../tipler";
import { param } from "../../ortak";
import { cl, GIRIS } from "../../zaman";
import { Yarasa } from "../../props/yarasa/Yarasa";

type XY = [number, number];
const D2R = Math.PI / 180, F1 = 29.5 * D2R, F2 = 45.5 * D2R, F0 = 37.5 * D2R, L0 = -96;
const n = (Math.sin(F1) + Math.sin(F2)) / 2, C = Math.cos(F1) ** 2 + 2 * n * Math.sin(F1), r0 = Math.sqrt(C - 2 * n * Math.sin(F0)) / n;
const albers = (lon: number, lat: number): XY => { const r = Math.sqrt(C - 2 * n * Math.sin(lat * D2R)) / n, t = n * (lon - L0) * D2R; return [r * Math.sin(t), r0 - r * Math.cos(t)]; };
export const BOLGE: Record<string, { bbox: [number, number, number, number]; w: number }> = { ulusal: { bbox: [-125, 24, -66, 50], w: 920 }, dogu: { bbox: [-82.5, 37, -75, 41.5], w: 900 } };
const fitCache: Record<string, (lon: number, lat: number) => XY> = {};
export const abdProj = (bolge: string) => {
  if (fitCache[bolge]) return fitCache[bolge];
  const B = BOLGE[bolge] ?? BOLGE.ulusal, [a, b, c, d] = B.bbox, Q: XY[] = [];
  for (let i = 0; i <= 10; i++) for (let j = 0; j <= 10; j++) Q.push(albers(a + ((c - a) * i) / 10, b + ((d - b) * j) / 10));
  const x0 = Math.min(...Q.map((q) => q[0])), x1 = Math.max(...Q.map((q) => q[0])), y0 = Math.min(...Q.map((q) => q[1])), y1 = Math.max(...Q.map((q) => q[1]));
  const S = B.w / (x1 - x0), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  return (fitCache[bolge] = (lon, lat) => { const [x, y] = albers(lon, lat); return [540 + (x - cx) * S, 960 - (y - cy) * S]; });
};
export const abdMi = (plan: Plan) => param<string>(plan, "harita_gorunum", "") === "abd";
export const abdPj = (plan: Plan) => abdProj(param<string>(plan, "bolge", "ulusal"));
const yolCache: Record<string, { eyalet: string; ulke: string }> = {};
const yollar = (bolge: string) => {
  if (yolCache[bolge]) return yolCache[bolge];
  const pj = abdProj(bolge), A = abd as { eyalet: number[][][]; ulke: number[][][] };
  const d = (R: number[][][]) => R.map((r) => "M" + r.map(([lo, la]) => pj(lo, la).map((v) => v.toFixed(1)).join(",")).join("L") + "Z").join(" ");
  return (yolCache[bolge] = { eyalet: d(A.eyalet), ulke: d(A.ulke) });
};

const INK = "#2b2f45";
export const AbdHarita: React.FC<{ plan: Plan; kat: "alt" | "ust"; p: number; uc?: XY; cs: number }> = ({ plan, kat, p, uc, cs }) => {
  const bolge = param<string>(plan, "bolge", "ulusal"), Y = yollar(bolge), pj = abdProj(bolge);
  if (kat === "alt") return (
    <g>
      <defs><pattern id="abdTarama" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><line x1="0" y1="4.5" x2="9" y2="4.5" stroke={INK} strokeWidth="2.5" opacity="0.22" /></pattern></defs>
      <path d={Y.ulke} fill={INK} stroke={INK} strokeWidth={7} strokeLinejoin="round" opacity={0.5} />
      <path d={Y.eyalet} fill="#e0d3b4" stroke="#8a7f6a" strokeWidth={2.5 / Math.sqrt(cs)} strokeLinejoin="round" />
      <path d={Y.ulke} fill="url(#abdTarama)" />
      <path d={Y.ulke} fill="none" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
    </g>
  );
  const ik = (v: number) => v / cs; // ikon ekran px → dekor
  const mg = param<{ lonlat: XY } | null>(plan, "magara_ikon", null);
  const isr = param<{ lonlat: XY; bas?: number } | null>(plan, "isaret", null);
  const koy = param<{ lonlat: XY; ev_n?: number; ikon_px?: number; ciz?: { bas: number; bit: number; stagger?: number } } | null>(plan, "koy_ikon", null);
  const su = param<{ bas: number; bit: number; lonlat: XY; n?: number } | null>(plan, "suru_ikon", null);
  const zr = param<{ bas: number; bit: number; boyut_px?: number } | null>(plan, "zarf_ikon", null);
  return (
    <g>
      {mg && (() => { const [x, y] = pj(...mg.lonlat), s = ik(56) / 56; return <g transform={`translate(${x},${y}) scale(${s})`}><path d="M-28,10 Q-26,-22 0,-24 Q26,-22 28,10 Z" fill="#463f5c" stroke={INK} strokeWidth={3} />{[-14, 0, 14].map((dx, i) => <Yarasa key={i} z={{ x: dx, y: -34 - (i % 2) * 8, u: 7, faz: 0.2 * i, stil: "dolu" }} />)}</g>; })()}
      {isr && p >= (isr.bas ?? 0) && (() => { const [x, y] = pj(...isr.lonlat), t = GIRIS(interpolate(p, [isr.bas ?? 0, (isr.bas ?? 0) + 14], [0, 1], cl)); return <circle cx={x} cy={y} r={ik(30) * (0.6 + 0.4 * t)} fill="none" stroke="#D8501F" strokeWidth={ik(7)} />; })()}
      {koy && (() => { const [x, y] = pj(...koy.lonlat), N = koy.ev_n ?? 4, s = ik(koy.ikon_px ?? 112) / 112;
        return Array.from({ length: N }).map((_, i) => { const a = (i / N) * 6.28 + random(`kv${i}`) * 0.8, rr = 70 + 50 * random(`kr${i}`), hx = x + Math.cos(a) * rr * s, hy = y + Math.sin(a) * rr * s * 0.6;
          const c = koy.ciz ? interpolate(p, [koy.ciz.bas + i * (koy.ciz.stagger ?? 8), koy.ciz.bas + i * (koy.ciz.stagger ?? 8) + 16], [0, 1], cl) : 1; if (c <= 0) return null;
          return <g key={i} transform={`translate(${hx},${hy}) scale(${s * (0.85 + 0.3 * random(`ks${i}`))})`}><path d="M-40,40 L-40,-6 L0,-42 L40,-6 L40,40 Z M-12,40 L-12,12 L12,12 L12,40" fill="#e9dfc9" stroke={INK} strokeWidth={6} strokeLinejoin="round" pathLength={1} strokeDasharray={`${c} 1.02`} /></g>; }); })()}
      {su && p >= su.bas && (() => { const [x, y] = pj(...su.lonlat), t = GIRIS(interpolate(p, [su.bas, su.bit], [0, 1], cl));
        return Array.from({ length: su.n ?? 16 }).map((_, i) => { const a = random(`sa${i}`) * 6.28, d = 30 + 60 * random(`sd${i}`);
          return <Yarasa key={i} z={{ x: x + Math.cos(a) * d * ik(1) + (1 - t) * ik(-60), y: y - ik(110) + Math.sin(a) * d * 0.5 * ik(1) - (1 - t) * ik(260), u: ik(9), faz: (p / 20 + random(`sf${i}`)) % 1, kanat: 0.1, stil: "dolu" }} />; }); })()}
      {zr && uc && p >= zr.bas && (() => { const b = ik(zr.boyut_px ?? 140), t = GIRIS(interpolate(p, [zr.bas, zr.bas + 12], [0, 1], cl));
        return <g transform={`translate(${uc[0]},${uc[1] - b * 0.75}) scale(${t})`}><rect x={-b / 2} y={-b * 0.33} width={b} height={b * 0.66} fill="#d6c8a8" stroke={INK} strokeWidth={ik(4)} /><path d={`M${-b / 2},${-b * 0.33} L0,${b * 0.05} L${b / 2},${-b * 0.33}`} fill="none" stroke={INK} strokeWidth={ik(3.5)} /></g>; })()}
    </g>
  );
};
