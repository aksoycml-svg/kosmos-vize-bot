// ===== KE-PK-S3 DAGRON-INSERT — masa dünyası (mekanlar.md §3v2.3–3v2.6) =====
// MasaPerspektif: kamera masanın H = 0.42 m üstünde, 35° aşağı bakar, F 1176, ana nokta (540, 960) → masa ufku y 137.
// Masa koordinatı: X sağa, Y kameradan ileri (m), h yukarı; orijin kameranın masadaki izdüşümü. Her nesne 3B izdüşümle çizilir
// (2B ölçek YOK — 0.18 m'lik kutu kamera yüksekliğinin %43'ü). Arka duvar Y 1.207 (ekran y 627).
// TEK IŞIK `ISIK_YON.atolye`: kış güneşi 18°, kameranın sol-önünden; gölge = h × 3.08 × (0.766, 0.643) masa düzleminde, arka kenarı aşan duvara tırmanır.
import type { P } from "../../tipler";

export type V3 = [number, number, number];
export const MASA = { F: 1176, H: 0.42, egim: 35, arkaY: 1.207 };
const SN = Math.sin((MASA.egim * Math.PI) / 180), CS = Math.cos((MASA.egim * Math.PI) / 180);
/** derinlik (kamera ekseni boyunca) */
export const mz = (Y: number, h = 0) => Y * CS + (MASA.H - h) * SN;
/** masa dünyası → dekor ekranı (cs 1) */
export const mp = (X: number, Y: number, h = 0): P => {
  const z = Math.max(1e-3, mz(Y, h)), v = Y * SN + (h - MASA.H) * CS;
  return [540 + (MASA.F * X) / z, 960 - (MASA.F * v) / z];
};
export const mpV = (v: V3) => mp(v[0], v[1], v[2]);
/** yatay ölçek (dekor px/m) bu noktada */
export const mpx = (Y: number, h = 0) => MASA.F / Math.max(1e-3, mz(Y, h));
/** dekor ekran noktası → masa düzlemi (h = h0) */
export const masaTers = (x: number, y: number, h0 = 0): [number, number] => {
  const q = (960 - y) / MASA.F, H = MASA.H - h0;
  const Y = (H * (CS + q * SN)) / (SN - q * CS);
  return [((x - 540) * mz(Y, h0)) / MASA.F, Y];
};

// ---- ışık: kaynaktan sahneye yön (mekanlar §3v2.4) ----
export const ISIK_ATOLYE: V3 = [0.729, 0.611, -0.309];
/** noktanın gölgesi: masa (h 0) ya da arka duvar (Y arkaY) üstünde */
export const golgeMasa = (X: number, Y: number, h: number): V3 => {
  if (h <= 0) return [X, Y, 0];
  const L = ISIK_ATOLYE, s = h / -L[2], Ys = Y + L[1] * s;
  if (Ys <= MASA.arkaY) return [X + L[0] * s, Ys, 0];
  const s2 = (MASA.arkaY - Y) / L[1];
  return [X + L[0] * s2, MASA.arkaY, h + L[2] * s2];
};
/** yüz ışıkta mı (normal · ışığa doğru > 0) */
export const isikta = (n: V3) => -(n[0] * ISIK_ATOLYE[0] + n[1] * ISIK_ATOLYE[1] + n[2] * ISIK_ATOLYE[2]) > 0.02;

// ---- palet (mekanlar §3v2.6; C* ≤ 28, L* ≤ 88, kırmızı 0, sarı metal 0) ----
export const DP = {
  masa: "#a07c64", masaGolge: "#5a4a5a", damarIsik: "#6e5448", damarGolge: "#3e3446", asinma: "#b58f74", derz: "#3e3446",
  badana: "#e6d3c0", badanaGolge: "#9c94ae", badanaTarama: "#6d6384",
  tuffeau: "#e3d6c2", tuffeauGolge: "#a6a0b8", derzIsik: "#c4b0a8", derzGolge: "#7d7599",
  raf: "#b4937a", rafGolge: "#7a6460", rafDerin: "#4a3f46", camKenar: "#d8ccbc", camYuz: "#8a8494",
  sayfa: "#e8d8c4", sayfaGolge: "#a9a0b8", satir: "#7a6458", kat: "#bdb7a6",
  serit: "#5a5048", seritKenar: "#8a7466", seritCizgi: "#3e3446",
  kutu: "#b4937a", kutuSol: "#a5866f", kutuGolge: "#7a6460", kutuDerin: "#4a3f46", demir: "#3a3d42", demirIsik: "#8a8494",
  cam: "#b9c4d6", hilal: "#e2dccf", isikHatti: "#e4dccb",
  celik: "#8a8494", celikGolge: "#4e4a5e",
  kece: "#4a4a5c", keceKenar: "#3a3550",
  kenar: "#f0c4a8", murekkep: "#2f2a3a", kontur: "#3a2f3a",
};
