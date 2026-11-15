// ===== SALON (Leningrad 1942, Filarmoni Büyük Salonu) — tek dünya modeli (mekanlar.md §2–§5) =====
// Dünya: u yanal (m, sağ +), h yükseklik (m), z derinlik (m, kameradan sahneye). Kamera: pinhole, sapma (yaw) + eğim (pitch).
// Her ekran noktası buradan hesaplanır; seed/rastgelelik dünyaya bağlıdır (kamera hareketinde kaynamaz).
import { interpolate } from "remotion";
import type { P } from "../../../doku/sabitler";

export type V3 = [number, number, number];
export type SalonKam = { F: number; u: number; h: number; yaw: number; pitch: number };
const R = Math.PI / 180;

/** P12 crane + tilt (mekanlar §3): f0 h1.35/−1° → f96 h1.9/+3° → f208 h2.3/+4° (sınır). 35 mm → F 1575. */
export const salonKamera = (p: number, yol?: { f: number[]; h: number[]; egim: number[] }): SalonKam => {
  const y = yol ?? { f: [0, 96, 208], h: [1.35, 1.9, 2.3], egim: [-1, 3, 4] };
  const o = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
  return { F: 1575, u: -1.0, yaw: 3, h: interpolate(p, y.f, y.h, o), pitch: interpolate(p, y.f, y.egim, o) };
};

/** dünya → ekran [x, y, derinlik] */
export const prj = (K: SalonKam, u: number, h: number, z: number): [number, number, number] => {
  const dx = u - K.u, dy = h - K.h;
  const cy = Math.cos(K.yaw * R), sy = Math.sin(K.yaw * R);
  const x1 = dx * cy - z * sy, z1 = dx * sy + z * cy;
  const cp = Math.cos(K.pitch * R), sp = Math.sin(K.pitch * R);
  const y2 = dy * cp - z1 * sp, z2 = dy * sp + z1 * cp;
  return [540 + (K.F * x1) / z2, 960 - (K.F * y2) / z2, z2];
};
export const ek = (K: SalonKam, u: number, h: number, z: number): P => { const q = prj(K, u, h, z); return [q[0], q[1]]; };
export const pxm = (K: SalonKam, u: number, h: number, z: number) => K.F / prj(K, u, h, z)[2];
export const ptsS = (a: P[]) => a.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(" ");
export const dunyaPoly = (K: SalonKam, v: V3[]) => ptsS(v.map((q) => ek(K, q[0], q[1], q[2])));
/** yatay (h sabit) daire → ekran çokgeni */
export const yatayCember = (K: SalonKam, c: V3, r: number, n = 28): P[] =>
  Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return ek(K, c[0] + Math.cos(a) * r, c[1], c[2] + Math.sin(a) * r); });

// ---- mimari ölçüler (mekanlar §2) ----
export const SALON = {
  nef: 6, galeriDis: 9, galeriH: 5, sutunZ: [12, 16, 20, 24, 28], sutunR: 0.5, tabanH: 0.6, govdeUst: 8.8, baslikUst: 10,
  sacakUst: 11.4, tavan: 13, arkaZ: 30, sahneOn: 11, sahneArka: 20, sahneH: 1.0,
  kademe: [{ z: 15, h: 1.4 }, { z: 17, h: 1.8 }, { z: 19, h: 2.2 }],
  avizeZ: [6, 10, 14, 18, 22], avizeU: [-3, 3], avizeH: 7.5,
};

// ---- palet (tasarım §2.1 / §2.5, mekanlar §5.1 / §6) — renk sahibi tasarım; burada yeni renk yok ----
export const LG = {
  gece: "#262a4e", golge: "#3e3b5c", derin: "#2f2d46", hacim: "#4a4062", orta: "#6d6384", uzak: "#b98a9e",
  kenar: "#f0c4a8", kenarLamba: "#e6b5a0", havuz: ["#efd0b6", "#e4bc98", "#c8a98e"], altin: "#e8c9a4",
  sutIsik: "#e6cfba", sutOrta: "#b8a3a6", sutGolge: "#6d6384", sutDerin: "#3e3b5c",
  metal: "#5a4638", filaman: "#d89a7a", cekirdek: "#efd0b6", toz: "#f0d2b8", tavanLeke: "#c8a98e",
  sivaIsik: "#c9b3a4", sivaGolge: "#5b5575", cam: "#a9b7cc",
  tahtaIsik: "#c8a98e", tahtaGolge: "#5b5575", derz: "#5b5575", sahneOn: "#4a3a44",
  koltukIsik: "#8a6a68", koltukGolge: "#4a3a44", koltukDerin: "#3e2f38", cerceve: "#3a3550",
  ten: "#d6b49c", tenGolge: "#8f7360", palto: ["#4f4668", "#5a5068", "#4f5a62"], kasket: "#4a4d44",
  ceket: "#4a4668", ceketGolge: "#2f2d46", ceketIsik: "#6a6488", pantolon: "#34334a", gomlek: "#b8b09c", sac: "#2a2226",
  muzisyen: ["#5a5068", "#4f5a62", "#625a52", "#4a4d44"], keman: "#7a4f45", sehpa: "#3a3d42", sehpaKenar: "#c4b5a8", nota: "#cdbfa8",
  davulGovde: "#4a3a44", kasnak: "#8f8aa8",
  cubuk: "#F0B14E", cubukGolge: "#B97F34", cubukKenar: "#FBDFA0", cubukSpek: "#FFF1CC", cubukKontur: "#7a4f2a",
  tarama: "#2f2d46",
};

// ---- ışık: tek kaynak = yanan avizelerin ağırlık merkezi (mekanlar §5.1) ----
export type AvizeDurum = { u: number; z: number; yanik: number; filaman: number; hale: number };
/** dalga: z6 f30 · z10 f43 · z14 f56 · z18 f69 · z22 f80 (bas = 30'a göre kaydırılır); yanik 8 karede, hale 22 karede radyal büyür */
export const avizeler = (p: number, bas = 30): AvizeDurum[] => {
  const t = [0, 13, 26, 39, 50];
  return SALON.avizeZ.flatMap((z, i) => SALON.avizeU.map((u, j) => {
    const t0 = bas + t[i] + (j ? 1 : -1); // çift içinde ±1 kare faz farkı (seed yerine sabit, kaynamaz)
    const o = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
    return {
      u, z,
      filaman: p >= t0 && p < t0 + 4 ? 1 : 0,
      yanik: interpolate(p, [t0 + 4, t0 + 12], [0, 1], o),
      hale: interpolate(p, [t0 + 4, t0 + 26], [0, 1], { ...o, easing: (x) => 1 - (1 - x) ** 3 }),
    };
  }));
};
export const isikMerkezi = (A: AvizeDurum[]): V3 => {
  const s = A.reduce((a, q) => a + q.yanik, 0) || 1;
  return [A.reduce((a, q) => a + q.u * q.yanik, 0) / s, SALON.avizeH, A.reduce((a, q) => a + q.z * q.yanik, 0) / s];
};
/** nokta ışıktan h0 düzlemine atılan gölge noktası */
export const golgeNokta = (L: V3, q: V3, h0: number): V3 => {
  const t = (L[1] - h0) / Math.max(1e-3, L[1] - q[1]);
  return [L[0] + (q[0] - L[0]) * t, h0, L[2] + (q[2] - L[2]) * t];
};
export const zarf = (a: P[]): P[] => {
  const s = [...a].sort((A, B) => A[0] - B[0] || A[1] - B[1]);
  const cr = (o: P, A: P, B: P) => (A[0] - o[0]) * (B[1] - o[1]) - (A[1] - o[1]) * (B[0] - o[0]);
  const lo: P[] = [], hi: P[] = [];
  for (const v of s) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], v) <= 0) lo.pop(); lo.push(v); }
  for (const v of [...s].reverse()) { while (hi.length >= 2 && cr(hi[hi.length - 2], hi[hi.length - 1], v) <= 0) hi.pop(); hi.push(v); }
  return [...lo.slice(0, -1), ...hi.slice(0, -1)];
};
