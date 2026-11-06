// Ortak doku sistemi sabitleri (mekanlar.md 1.2, 1.5)
import { random } from "remotion";

export type P = [number, number];
export type Derinlik = "uzak" | "orta" | "yakin" | "insert";

// Her mekânın doku tohumu sabit: doku kaynamaz
export const DOKU_SEED = { borsa: 101, harita: 7, sokakBdx: 4, tours: 23, kule: 37, paris: 53, catiBdx: 61, catiKati: 67, yatak: 71, mahkeme: 83, kanun: 89, wifi: 97 } as const;
export const KONTUR: Record<Derinlik, number> = { uzak: 3, orta: 4, yakin: 6, insert: 8 };
export const TITREME: Record<Derinlik, number> = { uzak: 1.2, orta: 2.0, yakin: 2.6, insert: 3.0 };
// kural 4: doku mesafeyle sadeleşir (opaklık çarpanı)
export const DOKU_YOGUNLUK: Record<Derinlik, number> = { uzak: 0.4, orta: 0.7, yakin: 1.0, insert: 1.2 };

// kural 3: saf siyah/beyaz yok
export const EN_KOYU = "#14110d";
export const EN_ACIK = "#f4ecd8";

// Bölüm paleti (tasarim.md 6) — onaylı orkestra kararı: direk #8fb2d8
export const BL = {
  paper: "#e9dfc9", ink: "#1c1915", red: "#b3261e", redLit: "#e5483c", gold: "#b8862b",
  gloveHero: "#f4efe2", gloveDikis: "#b9ad92",
  direkMavi: "#8fb2d8", direkGolge: "#5f7a96", direkAsinma: "#7a5a3c", kolSiyah: "#1c1915", kolKenar: "#5a5a62", karsiAgirlik: "#8a8d94",
  brass: "#c9a24a", brassLight: "#f1d48a", brassDark: "#7a5a1f",
  amber: "#ffb357", amberDeep: "#ff9a40", amberLight: "#ffd98f", candle: "#ffcf70", rimCool: "#c4d6ff",
  gecGunGok: "#e8c88a", gecGunGok2: "#f2e2b8", gecGunGunes: "#f2c27a",
  kenevir: "#a07a48", paket: "#b08a5a", paketIsik: "#d0ab78", paketGolge: "#7e5e38", ip: "#d8c9a0",
  tebesir: "#f3eddc", tahta: "#1f2a26",
};

// ---- renk yardımcıları ----
const hex2rgb = (h: string) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const rgb2hex = (r: number, g: number, b: number) => "#" + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
export const rgb2hsl = (h: string): [number, number, number] => {
  const [r, g, b] = hex2rgb(h).map((v) => v / 255);
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2;
  if (mx === mn) return [0, 0, l];
  const d = mx - mn, s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
  const hh = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [hh / 6, s, l];
};
export const hsl2hex = (h: number, s: number, l: number) => {
  if (s === 0) return rgb2hex(l * 255, l * 255, l * 255);
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
  const f = (t: number) => { t = (t + 1) % 1; return t < 1 / 6 ? p + (q - p) * 6 * t : t < 1 / 2 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p; };
  return rgb2hex(f(h + 1 / 3) * 255, f(h) * 255, f(h - 1 / 3) * 255);
};
// Kontur rengi: dolgunun L×0.45, S×0.8 — asla #000
export const ink = (hex: string) => { const [h, s, l] = rgb2hsl(hex); return hsl2hex(h, s * 0.8, Math.max(0.07, l * 0.45)); };
// Gravür mürekkebi (G3): mimari iç kontur karakter konturuyla aynı aileden — dolgunun L×0.28, S×0.7; asla #000
export const murekkep = (hex: string) => { const [h, s, l] = rgb2hsl(hex); return hsl2hex(h, s * 0.7, Math.max(0.06, Math.min(0.2, l * 0.28))); };
// Mimari kontur ailesi (11.4 → A4 G3, telefon önce): dış siluet : iç kontur (kemer, söve, silme, korniş) : tarama ≈ 5.5 : 3 : 1.6 (orta)
export const MIMARI_KONTUR: Record<Derinlik, { dis: number; ic: number }> = { uzak: { dis: 2, ic: 1.2 }, orta: { dis: 5, ic: 3 }, yakin: { dis: 6, ic: 4.4 }, insert: { dis: 7, ic: 5 } };
// Açıklık kaydırma (L ± oran)
export const tonla = (hex: string, dL: number) => { const [h, s, l] = rgb2hsl(hex); return hsl2hex(h, s, Math.max(0.05, Math.min(0.94, l * (1 + dL)))); };
export const karistir = (a: string, b: string, t: number) => { const A = hex2rgb(a), B = hex2rgb(b); return rgb2hex(A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t); };

// Sabit tohumlu rastgele (remotion random deterministik)
export const rnd = (seed: number | string, k: string | number) => random(`${seed}:${k}`);

// ---- geometri ----
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const lp = (a: P, b: P, t: number): P => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
export const poly = (pts: P[]) => pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
// Dörtgen eşlemesi: A sol-üst, B sağ-üst, C sağ-alt, D sol-alt; (u,v) ∈ [0,1]²
export type Esleme = (u: number, v: number) => P;
export const dortgen = (A: P, B: P, C: P, D: P): Esleme => (u, v) => lp(lp(A, B, u), lp(D, C, u), v);
export const dikdortgen = (x: number, y: number, w: number, h: number): Esleme => (u, v) => [x + u * w, y + v * h];
export const parca = (m: Esleme, u1: number, u2: number, v1: number, v2: number): P[] => [m(u1, v1), m(u2, v1), m(u2, v2), m(u1, v2)];
