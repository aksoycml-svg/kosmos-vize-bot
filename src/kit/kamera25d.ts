// ===== 2.5D fiziksel kamera (paylaşılan modül; ilk kullanan: Ben-my-Chree LIMAN / GEMI-INSERT / KIYI-BATARYA) =====
// Yalnız EKLEME: eski şablonlar bu dosyayı içe aktarmaz (eski render'lar piksel-aynı).
// Dünya (şablon başına): x sağ, y yukarı, z ileri (m). Kamera = iğne deliği: konum C, pan (y ekseni, + sağa), tilt (+ yukarı), F px.
//   lens_mm → F = mm · 30 px  (tam kare 36 mm yatay ↔ 1080 px; 375 mm ≈ 11 250 px, yatay görüş 5.5°)
//   odak_z (m) + diyafram (f-sayısı N) → ince mercek bulanıklığı: CoC px = a · F · |1/z − 1/odak|, a = f/N = F/(30 000 · N)
//   dolly_zoom {konu}: F(t) = F0 · |konu − C(t)| / |konu − C(0)| → konunun ekran boyu sabit, arka plan büyür, ön plan küçülür (türetilir)
// Katman (plaka): kendi z'sinde düz bir düzlem, REFERANS kamerada ekran px ile çizilir; her karede gerçek izdüşümle afin matrise eşlenir
//   (paralaks, dolly ve dolly zoom buradan; doku seed'i plaka koordinatına bağlı → kamera hareketinde kaynamaz).
import { Easing, interpolate } from "remotion";

export type V3 = [number, number, number];
type Egri = "giris" | "inout" | "lineer";
export type Kamera25 = {
  kare: number[];
  konum_yol?: V3[]; konum_kare?: number[];      // m
  yon_yol?: [number, number][]; yon_kare?: number[]; // [pan°, tilt°]
  lens_mm?: number[]; lens_kare?: number[];
  odak_z?: number[]; odak_kare?: number[];      // netlik mesafesi (kamera ekseninde m) — rack focus kendi zamanlamasıyla
  diyafram?: number;                            // f-sayısı
  egri?: Egri; odak_egri?: Egri;
  dolly_zoom?: { konu: V3 };
  merkez?: [number, number];                    // optik merkez (lens kaydırma); varsayılan 540, 960
  ekipman?: "slider" | "dolly" | "jib" | "crane" | "steadicam" | "tripod"; // belge + varsayılan eğri (tripod/steadicam lineer değil inout)
};
export type Kam25 = { C: V3; pan: number; tilt: number; F: number; odak: number; N: number; a: number; merkez: [number, number] };

export const mmF = (mm: number) => mm * 30;
const D2R = Math.PI / 180;
const GIRIS = Easing.bezier(0.16, 1, 0.3, 1), INOUT = Easing.inOut(Easing.cubic);
const egriF = (e?: Egri) => (e === "lineer" ? Easing.linear : e === "giris" ? GIRIS : INOUT);
const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const yol = (p: number, kare: number[], v: number[], e: (t: number) => number) =>
  v.length === 1 || kare.length < 2 ? v[0] : interpolate(p, kare.slice(0, v.length), v, { ...cl, easing: e });

/** Kamera durumu (karede). varsayilan: şablonun görünüm kaydı (json yalnız ezer). */
export const kamera25 = (j: Partial<Kamera25> | undefined, p: number, v: Kamera25): Kam25 => {
  const k: Kamera25 = { ...v, ...(j ?? {}) };
  const e = egriF(k.egri);
  const kk = (ozel?: number[]) => ozel ?? k.kare;
  const konum = k.konum_yol ?? [[0, 0, 0]];
  const C: V3 = [0, 1, 2].map((i) => yol(p, kk(k.konum_kare), konum.map((q) => q[i]), e)) as V3;
  const yon = k.yon_yol ?? [[0, 0]];
  const pan = yol(p, kk(k.yon_kare), yon.map((q) => q[0]), e), tilt = yol(p, kk(k.yon_kare), yon.map((q) => q[1]), e);
  let F = mmF(yol(p, kk(k.lens_kare), k.lens_mm ?? [50], e));
  if (k.dolly_zoom) {
    const F0 = mmF((k.lens_mm ?? [50])[0]), c0 = konum[0], u = k.dolly_zoom.konu;
    F = (F0 * Math.hypot(u[0] - C[0], u[1] - C[1], u[2] - C[2])) / Math.hypot(u[0] - c0[0], u[1] - c0[1], u[2] - c0[2]);
  }
  const odak = yol(p, kk(k.odak_kare), k.odak_z ?? [1e6], egriF(k.odak_egri ?? k.egri));
  const N = k.diyafram ?? 16;
  return { C, pan, tilt, F, odak, N, a: F / (30000 * N), merkez: k.merkez ?? [540, 960] };
};

/** dünya → kamera koordinatı (x sağ, y yukarı, z ileri) */
export const kameraya = (k: Kam25, X: V3): V3 => {
  const dx = X[0] - k.C[0], dy = X[1] - k.C[1], dz = X[2] - k.C[2];
  const cp = Math.cos(k.pan * D2R), sp = Math.sin(k.pan * D2R), ct = Math.cos(k.tilt * D2R), st = Math.sin(k.tilt * D2R);
  const x1 = dx * cp - dz * sp, z1 = dx * sp + dz * cp;
  return [x1, dy * ct - z1 * st, dy * st + z1 * ct];
};
const dunyaya = (k: Pick<Kam25, "C" | "pan" | "tilt">, c: V3): V3 => {
  const cp = Math.cos(k.pan * D2R), sp = Math.sin(k.pan * D2R), ct = Math.cos(k.tilt * D2R), st = Math.sin(k.tilt * D2R);
  const y1 = c[1] * ct + c[2] * st, z1 = -c[1] * st + c[2] * ct;
  return [k.C[0] + c[0] * cp + z1 * sp, k.C[1] + y1, k.C[2] - c[0] * sp + z1 * cp];
};
export type Izd = { x: number; y: number; z: number; s: number };
/** izdüşüm; kameranın arkasındaysa null. s = px/m */
export const izd = (k: Kam25, X: V3, yakin = 0.05): Izd | null => {
  const c = kameraya(k, X);
  if (c[2] < yakin) return null;
  return { x: k.merkez[0] + (k.F * c[0]) / c[2], y: k.merkez[1] - (k.F * c[1]) / c[2], z: c[2], s: k.F / c[2] };
};
export const izdP = (k: Kam25, X: V3): [number, number] => { const q = izd(k, X); return q ? [q.x, q.y] : [NaN, NaN]; };

/** bulanıklık çemberi (px) ve Gauss σ (disk ≈ σ·2.5); maks kırpma */
export const coc = (k: Kam25, z: number) => k.a * k.F * Math.abs(1 / Math.max(0.05, z) - 1 / k.odak);
export const fluSigma = (k: Kam25, z: number, maks = 16) => Math.min(maks, coc(k, z) / 2.5);

/** Plaka: referans kamerada (ref) ekran px ile çizilmiş, ref ekseninde z derinliğinde düz katman → bu karedeki afin matris */
export type Plaka = { m: string; s: number; z: number; gorunur: boolean; T: (q: [number, number]) => [number, number] };
export const plaka = (ref: Kam25, k: Kam25, z: number): Plaka => {
  const w = (u: number, v: number): V3 => dunyaya(ref, [((u - ref.merkez[0]) * z) / ref.F, (-(v - ref.merkez[1]) * z) / ref.F, z]);
  const c0 = ref.merkez, A = izd(k, w(c0[0], c0[1])), B = izd(k, w(c0[0] + 100, c0[1])), Cq = izd(k, w(c0[0], c0[1] + 100));
  if (!A || !B || !Cq) return { m: "matrix(0 0 0 0 -9999 -9999)", s: 0, z, gorunur: false, T: () => [-9999, -9999] };
  const a = (B.x - A.x) / 100, b = (B.y - A.y) / 100, c = (Cq.x - A.x) / 100, d = (Cq.y - A.y) / 100;
  const e = A.x - a * c0[0] - c * c0[1], f = A.y - b * c0[0] - d * c0[1];
  return { m: `matrix(${a} ${b} ${c} ${d} ${e} ${f})`, s: Math.hypot(a, b), z: A.z, gorunur: true, T: (q) => [a * q[0] + c * q[1] + e, b * q[0] + d * q[1] + f] };
};
/** plaka noktasının dünya konumu (ref kamerada z derinliği) — temas/kilit/çizgi uçları için */
export const plakaDunya = (ref: Kam25, z: number, q: [number, number]): V3 =>
  dunyaya(ref, [((q[0] - ref.merkez[0]) * z) / ref.F, (-(q[1] - ref.merkez[1]) * z) / ref.F, z]);

/** çokgen izdüşümü, yakın düzlemde (z ≥ yakin) Sutherland–Hodgman kırpmasıyla — kameranın arkasına taşan zemin/duvar bozulmaz */
export const izdPoli = (k: Kam25, A: V3[], yakin = 0.05): [number, number][] => {
  const c = A.map((X) => kameraya(k, X)), o: V3[] = [];
  for (let i = 0; i < c.length; i++) {
    const a = c[i], b = c[(i + 1) % c.length], ai = a[2] >= yakin, bi = b[2] >= yakin;
    if (ai) o.push(a);
    if (ai !== bi) { const t = (yakin - a[2]) / (b[2] - a[2]); o.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, yakin]); }
  }
  return o.map((q) => [k.merkez[0] + (k.F * q[0]) / q[2], k.merkez[1] - (k.F * q[1]) / q[2]]);
};
