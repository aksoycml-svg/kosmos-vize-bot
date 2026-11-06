// Kukla ileri kinematiği: tutulan nesne eli takip eder, baston ucu zemine basar (taşa gömülmez).
// Kukla.tsx dönüşüm zinciriyle birebir aynı.
import type { Poz } from "./Kukla";

type M = [number, number, number, number, number, number]; // a b c d e f (SVG matrix)
const mul = (A: M, B: M): M => [A[0] * B[0] + A[2] * B[1], A[1] * B[0] + A[3] * B[1], A[0] * B[2] + A[2] * B[3], A[1] * B[2] + A[3] * B[3], A[0] * B[4] + A[2] * B[5] + A[4], A[1] * B[4] + A[3] * B[5] + A[5]];
const T = (x: number, y: number): M => [1, 0, 0, 1, x, y];
const R = (deg: number, cx = 0, cy = 0): M => { const r = (deg * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r); return mul(mul(T(cx, cy), [c, s, -s, c, 0, 0]), T(-cx, -cy)); };
const S = (sx: number, sy: number): M => [sx, 0, 0, sy, 0, 0];
const ap = (m: M, p: [number, number]): [number, number] => [m[0] * p[0] + m[2] * p[1] + m[4], m[1] * p[0] + m[3] * p[1] + m[5]];

// Ayak tabanı yerel y = −7 (ayakkabı altı). Zemin noktasına basmak için pz.y = zeminY + AYAK_TABAN·ölçek.
export const AYAK_TABAN = 7;

// Elin (eldiven merkezi) Kukla-yerel koordinatı (dış ölçek/öteleme ÖNCESİ; pz.hat bu çerçevede).
const kolMatris = (pz: Poz, on: boolean): M => {
  const sway = pz.sway ?? 0;
  const kx = on ? 40 + sway * 3 : -30 - sway * 3;
  const govde = mul(T(0, pz.bodyY ?? 0), R(pz.lean ?? 0, 0, -226));
  return mul(mul(mul(mul(mul(govde, T(kx, -380)), R(on ? pz.shF : pz.shB)), T(0, 88)), R(on ? pz.elF : pz.elB)), T(0, 90));
};
export const elYerel = (pz: Poz, on = true, ofset: [number, number] = [0, 0]) => ap(kolMatris(pz, on), ofset);
export const dunyaya = (pz: Poz, p: [number, number]): [number, number] => ap(mul(T(pz.x, pz.y), S((pz.scale ?? 1) * (pz.facing ?? 1), pz.scale ?? 1)), p);
export const elDunya = (pz: Poz, on = true, ofset: [number, number] = [0, 0]) => dunyaya(pz, elYerel(pz, on, ofset));
// Baston ucu (ön el, cane açısı): Kukla.tsx'te baston ucu yerel (0, 252)
export const bastonUcu = (pz: Poz, cane: number) => ap(mul(kolMatris(pz, true), R(cane)), [0, 252]);
// Baston ucunu zemine (yerel y = −AYAK_TABAN) indiren açıyı bul; önde (bakış yönünde) olanı seç
export const bastonAcisi = (pz: Poz, min = -10, max = 80) => {
  let best = min, err = Infinity;
  for (let a = min; a <= max; a += 0.1) { const [, y] = bastonUcu(pz, a); const e = Math.abs(y + AYAK_TABAN); if (e < err) { err = e; best = a; } }
  return best;
};
