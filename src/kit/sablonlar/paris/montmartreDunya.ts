// ===== KE-PK-S2 MONTMARTRE — tek dünya modeli (mekanlar.md §2v2.3, §2v2-H.2/H.3) =====
// Orijin = Niépce sepetinin zemin merkezi. X sağa (batı), h yukarı, Z ileri (güney; hale: ağza doğru). Metre.
// Pinhole + lens kaydırma (dikeyler dik): x = 540 + (X − Xk)·F/z, y = U + (e − h)·F/z, z = Z − Zk. Elle ekran koordinatı yok:
// her nesne dünyadan izdüşürülür; plan kamerası (cs/cx/cy) bunun üstüne 2B zoom'dur (dekor = cs 1 ekranı, mekanlar §2v2.5).
// TEK IŞIK: ISIK_YON → gölge (golgeNokta), ışık alan yüz (isikta), tarama/kenar ışığı yönü aynı vektörden.
import type { P } from "../../tipler";

export type V3 = [number, number, number];
export type Kam = { F: number; X: number; e: number; Z: number; U: number };
export const KAMERA: Record<"meydan" | "yukleme" | "sepet", Kam> = {
  meydan: { F: 1500, X: 0, e: 1.6, Z: -14.42, U: 1304 },
  yukleme: { F: 1500, X: 0.1, e: 1.0, Z: -3.4, U: 900 },
  sepet: { F: 1500, X: 0.1, e: 1.25, Z: -3.4, U: 668 }, // sepetle birlikte havada: e = sepet tabanına göre (rim + 0.30)
};
export const YAKIN_Z = 0.25; // kameradan bu kadar yakın nokta çizilmez / zemin çokgeni burada kırpılır
export const pr = (k: Kam, X: number, h: number, Z: number): P => {
  const z = Math.max(1e-3, Z - k.Z);
  return [540 + ((X - k.X) * k.F) / z, k.U + ((k.e - h) * k.F) / z];
};
export const prV = (k: Kam, v: V3) => pr(k, v[0], v[1], v[2]);
export const pxm = (k: Kam, Z: number) => k.F / Math.max(1e-3, Z - k.Z);

// ---- ışık (ışığa doğru birim vektör; X sağ, h yukarı, Z ileri) ----
export type IsikAd = "gunMontmartre" | "haleSabah";
export const ISIK_YON: Record<IsikAd, V3> = {
  gunMontmartre: [-0.692, 0.208, 0.692], // tasarım §14.1: güneş 45° solda-önde, 12°
  haleSabah: [-0.413, 0.208, 0.887], // mekanlar §2v2-H.3: aynı güneş, kamera 161° → 25° solda
};
/** h yüksekliğindeki noktanın zemindeki (h0) gölgesi: (X + gx·Δh, Z + gz·Δh) — meydan (3.325, −3.325), hale (1.988, −4.264) */
export const golgeVek = (isik: IsikAd): [number, number] => { const [x, y, z] = ISIK_YON[isik]; return [-x / y, -z / y]; };
export const golgeNokta = (isik: IsikAd, v: V3, h0 = 0): [number, number] => { const g = golgeVek(isik), d = v[1] - h0; return [v[0] + g[0] * d, v[2] + g[1] * d]; };
export const isikta = (isik: IsikAd, n: V3) => { const L = ISIK_YON[isik]; return n[0] * L[0] + n[1] * L[1] + n[2] * L[2] > 0.02; };

// ---- 2B yardımcılar ----
export const pts = (a: P[]) => a.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(" ");
export const yolKapali = (a: P[]) => (a.length ? `M${a.map((q) => `${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join("L")}Z` : "");
export const yolAcik = (a: P[]) => (a.length ? `M${a.map((q) => `${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join("L")}` : "");
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const lp2 = (a: P, b: P, t: number): P => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
export const sat = (x: number) => Math.max(0, Math.min(1, x));
export const yumusak = (a: number, b: number, x: number) => { const t = sat((x - a) / (b - a)); return t * t * (3 - 2 * t); };
/** seed'li deterministik sayı üreteci (mulberry32) */
export const rng = (seed: number) => { let s = seed >>> 0; return () => { s = (s + 0x6d2b79f5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };

/** dışbükey zarf (monotone chain), XZ düzleminde */
export const zarf = (a: [number, number][]): [number, number][] => {
  const s = [...a].sort((p, q) => p[0] - q[0] || p[1] - q[1]);
  if (s.length < 3) return s;
  const cr = (o: number[], p: number[], q: number[]) => (p[0] - o[0]) * (q[1] - o[1]) - (p[1] - o[1]) * (q[0] - o[0]);
  const lo: [number, number][] = [], hi: [number, number][] = [];
  for (const p of s) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
  for (const p of [...s].reverse()) { while (hi.length >= 2 && cr(hi[hi.length - 2], hi[hi.length - 1], p) <= 0) hi.pop(); hi.push(p); }
  return [...lo.slice(0, -1), ...hi.slice(0, -1)];
};
/** çokgeni yarı düzleme kırp (Sutherland–Hodgman): f(q) ≥ 0 tarafı kalır */
export const kirp = <T extends number[]>(a: T[], f: (q: T) => number): T[] => {
  const o: T[] = [];
  for (let i = 0; i < a.length; i++) {
    const A = a[i], B = a[(i + 1) % a.length], fa = f(A), fb = f(B);
    if (fa >= 0) o.push(A);
    if ((fa >= 0) !== (fb >= 0)) { const t = fa / (fa - fb); o.push(A.map((v, j) => v + (B[j] - v) * t) as T); }
  }
  return o;
};
/** zemin (h = h0) çokgenini kameranın önünde kırpıp ekrana izdüşür */
export const zeminCokgen = (k: Kam, xz: [number, number][], h0 = 0): P[] =>
  kirp(xz, (q) => q[1] - (k.Z + YAKIN_Z)).map((q) => pr(k, q[0], h0, q[1]));
/** 3B noktalar kümesinin zemindeki gölgesi (zarf) → ekran çokgeni */
export const golgeCokgen = (k: Kam, isik: IsikAd, v: V3[], h0 = 0): P[] => zeminCokgen(k, zarf(v.map((q) => golgeNokta(isik, q, h0))), h0);
/** kutu köşeleri (yaw derece, merkez X/Z, en/derin, h0..h1) */
export const kutu = (cx: number, cz: number, en: number, derin: number, h0: number, h1: number, yaw = 0): V3[] => {
  const r = (yaw * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r);
  const k2 = [[-en / 2, -derin / 2], [en / 2, -derin / 2], [en / 2, derin / 2], [-en / 2, derin / 2]].map(([x, z]) => [cx + x * c - z * s, cz + x * s + z * c]);
  return [...k2.map(([x, z]) => [x, h0, z] as V3), ...k2.map(([x, z]) => [x, h1, z] as V3)];
};

// ---- palet (tasarım §14.2 + mekanlar §2v2.9 / §2v2-H.7; hex'lerin sahibi tasarım) ----
export const PAL = {
  gok: ["#6f86ad", "#8fa3c0", "#a9b7cc", "#cdc6d0", "#f0d0bc"], isima: "#f2c9b2",
  buguUzak: "#dccfcf", buguOrta: "#b0a6c0", parisYakin: "#8d85a6", parisTarak: "#7a7394", parisIsik: "#d8b8a4", duman: "#c3bccd",
  toprak: "#c8ae98", golge: "#8f8aa8", izIc: "#a8949a", cakil: "#d6c1ae", kirik: "#a8949a",
  evIsik: "#e8d0ba", evCephe: "#a39cb6", derin: "#7a7394", cam: "#7f90ab", camParilti: "#f0d4bc", catiKuzey: "#6d6384", catiDogu: "#b39a9e", kenar: "#f0c4a8",
  agac: "#5f5470", siluet: "#45405a",
  balonIsik: "#e6c9b4", vernik: "#ecd9c2", terminator: "#c9b0ac", balonTarama: "#4d4a6e", balonGolge: "#8f8aa8", yansima: "#b59ea2",
  konturIsik: "#9a7f78", konturGolge: "#4d4a6e", agIsik: "#a88f86", agGolge: "#4e4560", halka: "#5a4e5a", halat: "#b59e84", halatGolge: "#6a5a62",
  hortum: "#4a4560", puf: "#d8d2dc",
  hasirIsik: "#b89677", hasirIsikHale: "#937866", kamisIsik: "#c9a98a", hasirGolge: "#6e5a56", sepetKenar: "#4f3d46", sepetIc: "#3e3040",
  sandikIsik: "#b4937a", sandikOn: "#7a6460", sandikDerin: "#4a3f46", demir: "#3a3d42", kulp: "#b59e84",
  torbaIsik: "#d0bba6", torbaOrta: "#a8978f", torbaGolge: "#7a6f86", torbaIp: "#9a8268", kumIz: "#d3c1ac",
  dagronIsik: "#5a5068", dagronGolge: "#3a3550", sepya: "#4a3a2c", ten: "#c9a58a",
  // hale (§2v2-H.7)
  demirMakas: "#4a4560", catiAlt: "#6d6384", camSerit: "#cdc6d0", duvarIsik: "#d8b8a4", kolonGolge: "#8f8aa8", doseme: "#c8ae98", stipple: "#d6c1ae",
  // havadan şehir (§2v2.9 gok/sepet)
  blokIsik: "#e0c8b2", mansardIsik: "#a89fbe", blokGolge: "#9a92ae", sokak: "#9a92ae", bulvar: "#d3bba6", agacNokta: "#6a6280",
  // darbe (tasarım §14.2 P07 + §5)
  kulIsik: "#a39ba6", kulGolge: "#5a556a", parlama: "#f2e6d2", delik: "#2f2d46", yirtikIc: "#ecd9c2", darbeTarama: "#2f2d46",
};
