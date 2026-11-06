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
export const bastonUcu = (pz: Poz, cane: number, on = true) => ap(mul(kolMatris(pz, on), R(cane)), [0, 252]);
// Baston ucunu zemine (yerel y = −AYAK_TABAN) indiren açıyı bul. Birden çok çözüm varsa ucu hedefX'e
// (yerel x, ör. ön ayağın hemen önü) en yakın olanı seç: baston bacakların/komşu karakterin içinden geçmez.
export const bastonAcisi = (pz: Poz, hedefX = 60, on = true) => {
  let best = 0, skor = Infinity;
  for (let a = -180; a <= 180; a += 0.1) {
    const [x, y] = bastonUcu(pz, a, on);
    const e = Math.abs(y + AYAK_TABAN);
    if (e > 1.2) continue;
    const sk = Math.abs(x - hedefX);
    if (sk < skor) { skor = sk; best = a; }
  }
  return best;
};

// Kol IK: el (eldiven merkezi + ofset) dünya hedefine en yakın omuz/dirsek açıları (dirsek yalnız ileri bükülür).
// Tutulan nesne / dokunulan yüzey: el tam yüzeyde — içinden geçmez.
export const kolIK = (pz: Poz, hedef: [number, number], on = true, ofset: [number, number] = [0, 0], dirsek: [number, number] = [-150, 0]) => {
  let best = { sh: 0, el: 0 }, err = Infinity;
  const dene = (sh: number, el: number) => {
    const q = { ...pz, ...(on ? { shF: sh, elF: el } : { shB: sh, elB: el }) };
    const [x, y] = elDunya(q, on, ofset);
    const e = Math.hypot(x - hedef[0], y - hedef[1]);
    if (e < err) { err = e; best = { sh, el }; }
  };
  for (let sh = -200; sh <= 120; sh += 3) for (let el = dirsek[0]; el <= dirsek[1]; el += 3) dene(sh, el);
  const b0 = best;
  for (let sh = b0.sh - 3; sh <= b0.sh + 3; sh += 0.25) for (let el = b0.el - 3; el <= b0.el + 3; el += 0.25) dene(sh, el);
  return { ...best, hata: err };
};
