// ===== Yarasa sürüsü (tasarim.md §3.4) — defter ve ÇÖL-ÜS AYNI parametre seti =====
// Konum = f(seed_i, kare): Math.random yok; kameraya/ekrana rastgelelik bağlanmaz (çağıran sürüyü DEKOR koordinatında çizer,
// kamera dönüşümü dışarıda). Izgara yok: 3 yoğun çekirdek (gauss yaş/faz) + seyrek öksüzler; boy ölçeği seed'li.
// Geometri: kaynaktan yükselen sarmal; yarıçap log-spiral r = a·e^{bθ} (yükseldikçe genişleyen koni), yon −1 = ters saat.
// mod "surekli": yaş döngüsel (döngü yüksekliği kadrajı aşar → sarma kadraj dışında olur, birey "belirmez").
// mod "bas": bireyler bas karesinden sonra sırayla kaynaktan çıkar (P08 bulut yükselir).
import React from "react";
import { random } from "remotion";
import { Yarasa, YarasaStil } from "./Yarasa";

export type SuruAyar = {
  n: number; seed: number;
  kaynak: [number, number];      // çıkış noktası (dekor px)
  a?: number; b?: number;        // log-spiral: başlangıç yarıçapı px, büyüme / radyan
  yon?: 1 | -1;                  // −1 ters saat
  omega?: number;                // radyan / kare
  yukselis?: number;             // px / kare
  egim?: number;                 // sarmal elipsinin basıklığı (0.2–0.5)
  kayma?: number;                // yükseldikçe yatay kayma (px / px)
  u?: [number, number];          // gövde px aralığı (derinlik)
  mod?: "surekli" | "bas"; bas?: number; yayilim?: number; // bas: ilk çıkış karesi; yayilim: çıkış süresi (kare)
  donem?: number;                // surekli: döngü boyu (kare)
  faz0?: number;                 // 0–1 sürü fazı (döngü eşleşmesi: P01 p0 = P12 son)
  stil?: YarasaStil; kenar?: boolean; arkaIsik?: boolean;
};
const g = (s: number, k: string) => random(`${s}:${k}`);
const gauss = (s: number, k: string) => { const u = Math.max(1e-6, g(s, k + "a")), v = g(s, k + "b"); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };

export type Birey = { x: number; y: number; u: number; aci: number; faz: number; yas: number };
export const suruBireyler = (A: SuruAyar, p: number): Birey[] => {
  const a = A.a ?? 14, b = A.b ?? 0.09, yon = A.yon ?? -1, om = A.omega ?? 0.045, ry = A.yukselis ?? 2.2, eg = A.egim ?? 0.32, ky = A.kayma ?? 0.12;
  const [u0, u1] = A.u ?? [5, 12], don = A.donem ?? 900, faz0 = A.faz0 ?? 0;
  const konum = (yas: number, ph: number, r0: number) => {
    const th = om * yas, r = (a + r0) * Math.exp(b * th), h = ry * yas;
    return { x: A.kaynak[0] + yon * r * Math.cos(th + ph) + ky * h, y: A.kaynak[1] - h + r * eg * Math.sin(th + ph), d: Math.sin(th + ph) };
  };
  const out: Birey[] = [];
  for (let i = 0; i < A.n; i++) {
    const s = A.seed, k = `y${i}`;
    // çekirdek ataması: %78 üç çekirdekten birine (yaş gauss), %22 öksüz (düzgün dağılım)
    const c = g(s, k + "c"), oksuz = c > 0.78, ci = Math.floor(c * 3.85) % 3;
    const merkez = [0.12, 0.45, 0.78][ci];
    const t0 = oksuz ? g(s, k + "t") : (merkez + gauss(s, k + "g") * 0.07 + 1) % 1;
    const ph = g(s, k + "p") * 2 * Math.PI, r0 = (g(s, k + "r") - 0.3) * a * 1.4;
    let yas: number;
    if ((A.mod ?? "surekli") === "surekli") yas = ((t0 + faz0) * don + p) % don;
    else { yas = p - (A.bas ?? 0) - t0 * (A.yayilim ?? 120); if (yas < 0) continue; }
    const q = konum(yas, ph, r0), q2 = konum(yas + 1, ph, r0);
    const boy = u0 + (u1 - u0) * g(s, k + "u");
    const u = boy * (1 + 0.22 * q.d) * Math.min(1, 0.45 + yas / 90);
    const aci = (Math.atan2(q2.y - q.y, q2.x - q.x) * 180) / Math.PI + 90;
    out.push({ x: q.x, y: q.y, u, aci, faz: (p / 20 + g(s, k + "f")) % 1, yas });
  }
  return out;
};

// Akış çizgileri (defter): sarmalın kendisi, dash ofseti kayar (40 px/sn)
export const akisYolu = (A: SuruAyar, ph: number, yasMaks: number) => {
  const a = A.a ?? 14, b = A.b ?? 0.09, yon = A.yon ?? -1, om = A.omega ?? 0.045, ry = A.yukselis ?? 2.2, eg = A.egim ?? 0.32, ky = A.kayma ?? 0.12;
  const pts: string[] = [];
  for (let yas = 0; yas <= yasMaks; yas += 6) {
    const th = om * yas, r = a * Math.exp(b * th), h = ry * yas;
    pts.push(`${(A.kaynak[0] + yon * r * Math.cos(th + ph) + ky * h).toFixed(1)},${(A.kaynak[1] - h + r * eg * Math.sin(th + ph)).toFixed(1)}`);
  }
  return "M" + pts.join(" L");
};

export const Suru: React.FC<{ A: SuruAyar; p: number; olcek?: number }> = ({ A, p, olcek = 1 }) => {
  const B = suruBireyler(A, p).sort((x, y) => x.u - y.u); // küçük (uzak) önce
  return <g>{B.map((q, i) => <Yarasa key={i} z={{ x: q.x, y: q.y, u: q.u * olcek, aci: q.aci, faz: q.faz, kanat: 0.08, stil: A.stil ?? "siluet", kenar: A.kenar, arkaIsik: A.arkaIsik }} />)}</g>;
};
