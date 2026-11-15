// ===== ÇÖL-ÜS dünya modeli (yarasa-bombasi mekanlar.md §1.1–1.2; TEK KAYNAK) =====
// m; X doğu, Z kuzey, h yukarı. Orijin O = B1 cephe tabanı (tank ortasının arkası). Cephe yönü d = az 305°, dış normal n = az 215°.
// Kamera: x = 540 + F·xc/zc, y = U − F·(h − göz)/zc (dikeyler dik). Görünüm = kamera kaydı; dolly k iki görünüm arasında doğrusal.
// Güneş az 288°, yükseklik 9° (tasarım §1.3, mekanlar §1.2): gölge, kenar ışığı, yüz tonu bu vektörden. Gölge boyu ≤ 5·h (abartı sınırı).
// Saçak (mekanlar §1.2 denetim noktalarından türetildi): saçak altı YATAY h 3.0 (t 0…1.0), alın tahtası 3.0–3.15, mertek uçları
// 0.05×0.14 m, 0.61 m arayla, saçak altında (h 2.86–3.0). Duvar üstü 3.0 · döşeme +0.45 · saçak gölge bandı 0.54 m.
import type { P } from "../../tipler";

export type V3 = [number, number, number]; // [X, h, Z]
export const D: [number, number] = [-0.819, 0.574], N: [number, number] = [-0.574, -0.819];
/** cephe yerel (s: d boyunca, t: n boyunca, h) → dünya */
export const W = (s: number, t: number, h: number): V3 => [s * D[0] + t * N[0], h, s * D[1] + t * N[1]];

export type Gorunum = "genis" | "tank-alti" | "yanik" | "yangin-kenar" | "yangin";
type Kam = { C: [number, number]; goz: number; az: number; F: number; U: number };
export const KAMERALAR: Record<"genis" | "tank-alti" | "yanik", Kam> = {
  genis: { C: [5.2, -15.6], goz: 1.7, az: 335, F: 1400, U: 1010 },
  // kalibrasyon (motion): mekanlar (2.47,−5.02)/320° tankın altından B1 cephesine bakıyordu (ufuk dilimi yok) → tank ekseni boyunca, uçtan
  "tank-alti": { C: [3.1, -4.12], goz: 0.3, az: 309, F: 1400, U: 1180 },
  yanik: { C: [-2.54, -4.33], goz: 0.6, az: 40, F: 1150, U: 1470 },
};
export const temelKam = (g: Gorunum): Kam => KAMERALAR[g === "yangin-kenar" || g === "yangin" ? "genis" : g];
/** dolly: a → b, k 0…1 (az kısa yoldan) */
export const kamKaris = (a: Kam, b: Kam, k: number): Kam => {
  let dz = b.az - a.az; if (dz > 180) dz -= 360; if (dz < -180) dz += 360;
  const L = (x: number, y: number) => x + (y - x) * k;
  return { C: [L(a.C[0], b.C[0]), L(a.C[1], b.C[1])], goz: L(a.goz, b.goz), az: a.az + dz * k, F: L(a.F, b.F), U: L(a.U, b.U) };
};
export type Proj = { kam: Kam; P: (v: V3) => P | null; z: (v: V3) => number; pxm: (v: V3) => number; yon: (az: number, el: number) => P };
export const projeksiyon = (kam: Kam): Proj => {
  const a = (kam.az * Math.PI) / 180, f: [number, number] = [Math.sin(a), Math.cos(a)], r: [number, number] = [Math.cos(a), -Math.sin(a)];
  const z = (v: V3) => (v[0] - kam.C[0]) * f[0] + (v[2] - kam.C[1]) * f[1];
  const P = (v: V3): P | null => {
    const zc = z(v); if (zc < 0.05) return null;
    const xc = (v[0] - kam.C[0]) * r[0] + (v[2] - kam.C[1]) * r[1];
    return [540 + (kam.F * xc) / zc, kam.U - (kam.F * (v[1] - kam.goz)) / zc];
  };
  // sonsuz uzaklıktaki yön (az, yükseklik derece) → ekran
  const yon = (az: number, el: number): P => {
    const da = ((az - kam.az) * Math.PI) / 180, t = Math.tan(da);
    return [540 + kam.F * t, kam.U - (kam.F * Math.tan((el * Math.PI) / 180)) / Math.cos(da)];
  };
  return { kam, P, z, pxm: (v) => kam.F / Math.max(0.05, z(v)), yon };
};

// ---- güneş ----
export const GUNES = { az: 288, el: 9 };
const ga = (GUNES.az * Math.PI) / 180, ge = (GUNES.el * Math.PI) / 180;
export const S: V3 = [Math.sin(ga) * Math.cos(ge), Math.sin(ge), Math.cos(ga) * Math.cos(ge)]; // güneşe doğru
export const GOLGE_MAKS = 5 / (1 / Math.tan(ge)); // 6.3h → 5h ölçeği
/** noktanın zemindeki gölgesi (≤ 5h) */
export const zeminGolge = (v: V3): V3 => { const k = (v[1] / S[1]) * GOLGE_MAKS; return [v[0] - S[0] * k, 0, v[2] - S[2] * k]; };
export const isik = (n: V3) => n[0] * S[0] + n[1] * S[1] + n[2] * S[2];

// ---- B1 / tank ölçüleri ----
export const B1 = { sSol: 4.9, sSag: -4.2, derin: 6.1, duvar: 3.0, mahya: 4.1, doseme: 0.45, sacak: 1.0, alinAlt: 3.0, alinUst: 3.15, mertek: 0.61, mertekH: 0.14, bant: 0.54, pencere: { s0: -3.0 - 0.45, s1: -3.0 + 0.45, h0: 1.2, h1: 2.6 } };
export const TANK = { t: 1.1, h: 1.35, r: 0.8, L: 3.8, semer: [1.2, -1.2], semerH: [0.4, 0.55], ayakT: 0.65 };
export const mertekS = (): number[] => { const o: number[] = []; for (let s = B1.sSol - 0.3; s > B1.sSag + 0.1; s -= B1.mertek) o.push(s); return o; };

// ---- kutu (dışbükey, yüz başına normal) ----
export type Yuz = { k: V3[]; n: V3 };
export const kutu = (s0: number, s1: number, t0: number, t1: number, h0: number, h1: number): Yuz[] => {
  const c = (s: number, t: number, h: number) => W(s, t, h);
  const nd: V3 = [D[0], 0, D[1]], nn: V3 = [N[0], 0, N[1]];
  return [
    { k: [c(s0, t1, h0), c(s1, t1, h0), c(s1, t1, h1), c(s0, t1, h1)], n: nn },                 // ön (kameraya)
    { k: [c(s0, t0, h0), c(s1, t0, h0), c(s1, t0, h1), c(s0, t0, h1)], n: [-nn[0], 0, -nn[2]] },
    { k: [c(s1, t0, h0), c(s1, t1, h0), c(s1, t1, h1), c(s1, t0, h1)], n: [-nd[0], 0, -nd[2]] }, // s1 < s0 → sağ uç (−d)
    { k: [c(s0, t0, h0), c(s0, t1, h0), c(s0, t1, h1), c(s0, t0, h1)], n: nd },
    { k: [c(s0, t0, h1), c(s1, t0, h1), c(s1, t1, h1), c(s0, t1, h1)], n: [0, 1, 0] },
    { k: [c(s0, t0, h0), c(s1, t0, h0), c(s1, t1, h0), c(s0, t1, h0)], n: [0, -1, 0] },
  ];
};
/** yüz kameraya bakıyor mu */
export const gorunur = (y: Yuz, kam: Kam) => {
  const m = y.k.reduce((a, q) => [a[0] + q[0] / 4, a[1] + q[1] / 4, a[2] + q[2] / 4] as V3, [0, 0, 0] as V3);
  return (kam.C[0] - m[0]) * y.n[0] + (kam.goz - m[1]) * y.n[1] + (kam.C[1] - m[2]) * y.n[2] > 0;
};

// ---- tank silindiri: eksen d, merkez W(0, t, h); φ: 0 = n (kameraya), 90 = yukarı ----
export const tankNokta = (s: number, phi: number): V3 => {
  const c = Math.cos((phi * Math.PI) / 180), sn = Math.sin((phi * Math.PI) / 180);
  return W(s, TANK.t + TANK.r * c, TANK.h + TANK.r * sn);
};
export const tankNormal = (phi: number): V3 => { const c = Math.cos((phi * Math.PI) / 180), sn = Math.sin((phi * Math.PI) / 180); return [N[0] * c, sn, N[1] * c]; };
/** ışın (o + s·L) silindirle kesişir mi → en yakın s */
export const tankKesis = (o: V3, L: V3): number | null => {
  // silindir yerel: a = d yönü, b = n yönü, h
  const toLoc = (v: V3, nokta: boolean) => {
    const x = v[0] - (nokta ? TANK.t * N[0] : 0), z = v[2] - (nokta ? TANK.t * N[1] : 0);
    return [x * D[0] + z * D[1], x * N[0] + z * N[1], v[1] - (nokta ? TANK.h : 0)];
  };
  const O = toLoc(o, true), V = toLoc(L, false);
  const A = V[1] * V[1] + V[2] * V[2], B = 2 * (O[1] * V[1] + O[2] * V[2]), C = O[1] * O[1] + O[2] * O[2] - TANK.r * TANK.r;
  const disk = B * B - 4 * A * C; if (A < 1e-9 || disk < 0) return null;
  const s = (-B - Math.sqrt(disk)) / (2 * A); if (s < 0) return null;
  const ax = O[0] + V[0] * s; return Math.abs(ax) <= TANK.L / 2 ? s : null;
};

// ---- tünek noktaları (dünya; yarasa ayak teması) — semer kirişi alt yüzü (h 0.40), tank–semer oyuğu, saçak altı ----
export type Tunek = { id: string; v: V3; yuzey: "semer" | "oyuk" | "sacak" };
export const TUNEKLER: Tunek[] = [
  ...[-1.2, 1.2].flatMap((s, j) => [0.45, 0.75, 1.05, 1.4, 1.7].map((t, i) => ({ id: `semer${j}-${i}`, v: W(s + (i % 2 ? 0.05 : -0.05), t + (j ? 0.04 : 0), TANK.semerH[0]), yuzey: "semer" as const }))),
  ...[-1.55].map((s, i) => ({ id: `oyuk${i}`, v: W(s, TANK.t + 0.35, TANK.h - TANK.r * 0.93), yuzey: "oyuk" as const })),
  ...mertekS().filter((s) => s < 2.5 && s > -3.5).map((s, i) => ({ id: `sacak${i}`, v: W(s - 0.3, 0.45 + (i % 3) * 0.15, B1.alinAlt), yuzey: "sacak" as const })),
];
