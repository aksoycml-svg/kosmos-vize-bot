// ===== Dolly kamera (PARIS-CATI; mekanlar.md §1.3, §9 "DollyKamera") =====
// cs = kamera MESAFESİ (zoom değil). Kamera kilit noktasına (FOE, varsayılan dekor 540,960) doğru δ kadar ilerler:
//   δ(cs) = k·(1 − 1/cs)  (Z_k biriminde, k = 1.31) · katman ölçeği s(d) = d / (d − δ)  (d = Z / Z_k)
// Saf öteleme altında görüntü noktaları FOE'den radyal olarak Z/(Z − Tz) oranında uzaklaşır → katman başına benzerlik dönüşümü,
// düz çizgiler düz kalır (her köşe kendi d'siyle eşlenir). cx/cy sonra eklenir (pan/tilt, bütün katmanlara aynı).
// d − δ < YAKIN olan nokta kameranın dibinde/arkasında: çizilmez (katman) ya da kırpılır (zemin).
import type { P } from "../../tipler";
import type { KameraDurum } from "../../zaman";

export type Dolly = { F: number; e: number; Zk: number; ufuk: number; k: number; foe: P };
// PARIS-CATI v2 (mekanlar §1v2.3): geniş kamera (cs 1) göz teras üstü 2.8 m, lens kaydırmalı yatay eksen, ufuk dekor y 635.
// Dolly = C_w → C_k doğrusal öteleme T = (−0.409, −2.07, +4.566) m; FOE (dolly merkezi) = T yönünün izdüşümü ≠ kılıf.
// Zk 5.056 = kılıf düzlemi (d 1), k 1.419 → cs 2.75'te δ_max 0.9031 (kamera C_k). Ufuk ekranı = 635 + cy (sonsuz s = 1).
export const DOLLY_CATI: Dolly = { F: 1326, e: 2.8, Zk: 5.056, ufuk: 635, k: 1.419, foe: [421.1, 1236.1] };
// kılıf dünya noktası (−0.509, h 0.70, Z 5.056) → dekor (cs 1); ölçüm / kilit noktası (FOE değil)
export const KILIF_DEKOR: P = [406.1, 1185.7];
export const YAKIN = 0.05;
/** dolly yolunda kamera dünya konumu (m; X, h, Z) — FOE ötelemesinden: t = T·δ/δ_max, T_z = δ·Zk */
export const kameraDunya = (D: Dolly, cs: number): [number, number, number] => {
  const tz = delta(D, cs) * D.Zk;
  return [((D.foe[0] - 540) / D.F) * tz, D.e - ((D.foe[1] - D.ufuk) / D.F) * tz, tz];
};

export const delta = (D: Dolly, cs: number) => D.k * (1 - 1 / Math.max(0.5, cs));
export const olcek = (d: number, dl: number) => d / Math.max(1e-3, d - dl);
// dünya (X yanal m, h yükseklik m — terasa göre, Z derinlik m) → taban dekor px + d
export const dunyaTaban = (D: Dolly, X: number, h: number, Z: number): { p: P; d: number } => ({ p: [540 + (D.F * X) / Z, D.ufuk + (D.F * (D.e - h)) / Z], d: Z / D.Zk });
// taban dekor px (d düzleminde) → ekran
export const dollyEkran = (D: Dolly, k: KameraDurum, q: P, d: number): P => {
  const s = olcek(d, delta(D, k.cs));
  return [D.foe[0] + k.cx + (q[0] - D.foe[0]) * s, D.foe[1] + k.cy + (q[1] - D.foe[1]) * s];
};
// ekran → taban dekor (d düzleminde): giriş/çıkış noktalarını kadraj dışına koymak için
export const ekranTaban = (D: Dolly, k: KameraDurum, e: P, d: number): P => {
  const s = olcek(d, delta(D, k.cs));
  return [D.foe[0] + (e[0] - D.foe[0] - k.cx) / s, D.foe[1] + (e[1] - D.foe[1] - k.cy) / s];
};
// Katman eşleyicisi: d düzlemindeki bütün noktalar aynı benzerlik dönüşümüyle (s, ofset)
export type Katman = { d: number; s: number; T: (q: P) => P; gorunur: boolean; svg: string };
export const katman = (D: Dolly, k: KameraDurum, d: number): Katman => {
  const dl = delta(D, k.cs), s = olcek(d, dl);
  const T = (q: P): P => [D.foe[0] + k.cx + (q[0] - D.foe[0]) * s, D.foe[1] + k.cy + (q[1] - D.foe[1]) * s];
  return { d, s, T, gorunur: d - dl >= YAKIN, svg: `translate(${D.foe[0] + k.cx},${D.foe[1] + k.cy}) scale(${s}) translate(${-D.foe[0]},${-D.foe[1]})` };
};
// Dünya noktası → ekran (kendi d'siyle). Yakın düzlemin önündeyse null.
export const dunyaEkran = (D: Dolly, k: KameraDurum, X: number, h: number, Z: number): P | null => {
  const { p, d } = dunyaTaban(D, X, h, Z);
  return d - delta(D, k.cs) < YAKIN ? null : dollyEkran(D, k, p, d);
};
// Bu noktadaki ekran px/m (dünya ölçüsü → ekran)
export const ekranPxm = (D: Dolly, k: KameraDurum, d: number) => (D.F / (d * D.Zk)) * olcek(d, delta(D, k.cs));
// Görünür en yakın derinlik (m): zemin çokgenleri bu Z'de kırpılır
export const enYakinZ = (D: Dolly, k: KameraDurum) => (delta(D, k.cs) + YAKIN + 0.02) * D.Zk;
