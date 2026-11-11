// ===== kit/hareket/motion.ts — küçük fizik: yay, sarkaç, meltem, dizi (KAREYE BAĞLI, deterministik) =====
// Uyarlama: JDhruv14/line-art-animation `lib/motion.ts` (MIT).
//   MIT License — Copyright (c) 2026 JDhruv14
//   Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
//   files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
//   modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
//   is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be
//   included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
//
// Remotion farkı: kaynakta yay/sarkaç durumlu nesnedir (rAF her karede step). Remotion her kareyi bağımsız (çoklu sekme) çizer, bu
// yüzden burada durum YOK: değer = `bas` karesinden `p` karesine sabit alt adımlarla yeniden benzetim (aynı girdi → aynı çıktı).
// Maliyet O((p − bas) · alt); birkaç yüz kare için önemsiz. Math.random yok (tohumlu üreteç). pointerWind yerine `meltem` (zamana bağlı).

export type P = [number, number];
export const clamp = (x: number, a: number, b: number): number => Math.max(a, Math.min(b, x));
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
export const smooth = (e0: number, e1: number, x: number): number => { const t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };
export const ease = (t: number): number => smooth(0, 1, t);
/** minimum-jerk: salınan ayak / ele geçen nesne yolu (hız ve ivme uçlarda 0) */
export const minJerk = (s: number): number => { s = clamp(s, 0, 1); return s * s * s * (10 - 15 * s + 6 * s * s); };

/** Tohumlu üreteç (statik çizim; her yüklemede aynı). */
export function tohumlu(seed = 11): (a?: number, b?: number) => number {
  let s = Math.max(1, Math.floor(seed)) % 2147483647;
  return (a = 0, b = 1) => { s = (s * 16807) % 2147483647; return a + ((s - 1) / 2147483646) * (b - a); };
}

/** Katmanlı sinüs: döngü gibi okunmayan organik kıpırtı (t saniye). */
export const wobble = (t: number, k = 1): number => Math.sin(t * 1.3 * k) * 0.6 + Math.sin(t * 2.7 * k + 1.7) * 0.3 + Math.sin(t * 5.1 * k + 4.1) * 0.1;

/** Meltem (pointerWind yerine): yavaş taban + iki yavaş dalga + seyrek esinti; ≈ taban ± 0.5. t saniye. */
export const meltem = (t: number, taban = 0.3, tohum = 3): number =>
  taban + 0.25 * Math.sin(t * 0.21 + tohum) + 0.15 * Math.sin(t * 0.67 + tohum * 1.7) + 0.12 * Math.max(0, Math.sin(t * 0.13 + tohum * 0.4)) ** 6 * wobble(t * 2, 1.3);

export type Tekme = { kare: number; v: number }; // o karede hıza eklenen itki (kaynak: kick)

/**
 * Sönümlü yay (kaynak: spring) — hareket eden gövdeye bağlı her şey: yen, kese, kulak, kolların bacaklara ters salınımı.
 * hedef(q): q karesindeki hedef değer. Döner: p karesindeki değer. sertlik/sonum kaynakla aynı birim (1/s², 1/s).
 */
export function yayKare(o: { hedef: (q: number) => number; bas: number; p: number; fps: number; sertlik?: number; sonum?: number; x0?: number; v0?: number; alt?: number; tekme?: Tekme[] }): number {
  const { hedef, bas, p, fps, sertlik = 40, sonum = 6, alt = 4, tekme = [] } = o;
  let x = o.x0 ?? hedef(bas), v = o.v0 ?? 0;
  const dt = 1 / (fps * alt);
  for (let q = bas; q < p; q++) {
    for (const t of tekme) if (t.kare === q) v += t.v;
    for (let i = 0; i < alt; i++) { const h = hedef(q + i / alt); v += (sertlik * (h - x) - sonum * v) * dt; x += v * dt; }
  }
  return x;
}

/**
 * Sarkaç (kaynak: pendulum; açı radyan) — asılı şeyler: fener, kese, perde, tabela, kafes. kuvvet(q) = o karenin itkisi
 * (rüzgâr, taşıyıcının ivmesi). Kaynakla aynı doğrusal model: a'' = −sertlik·a + kuvvet − sonum·a'.
 */
export function sarkacKare(o: { kuvvet: (q: number) => number; bas: number; p: number; fps: number; sertlik?: number; sonum?: number; a0?: number; v0?: number; alt?: number; tekme?: Tekme[] }): number {
  const { kuvvet, bas, p, fps, sertlik = 10, sonum = 1.1, alt = 4, tekme = [] } = o;
  let a = o.a0 ?? 0, v = o.v0 ?? 0;
  const dt = 1 / (fps * alt);
  for (let q = bas; q < p; q++) {
    for (const t of tekme) if (t.kare === q) v += t.v;
    for (let i = 0; i < alt; i++) { v += (-a * sertlik + kuvvet(q + i / alt) - v * sonum) * dt; a += v * dt; }
  }
  return a;
}

/**
 * Asılı nesne (fiziksel sarkaç): askı noktası aski(q) (dekor px) hareket eder, nesne ip boyu `boy_m` ucunda sallanır.
 * Sertlik = g/L, kuvvet = −(askının yatay ivmesi)/L (+ rüzgâr). Taşıyıcı hızlanınca geri kalır, durunca ileri savrulur ve söner.
 * Döner: açı (derece, 0 = dik aşağı, + = ucu +x'e) ve uç noktası (px). Kese (kemer), fener (sopa ucu), balon sepeti ipi, kafes.
 */
export function asiliNesne(o: { aski: (q: number) => P; bas: number; p: number; fps: number; pxm: number; boy_m: number; ruzgar?: (q: number) => number; sonum?: number; a0_derece?: number; tekme?: Tekme[] }): { aci: number; uc: P } {
  const { aski, bas, p, fps, pxm, boy_m, ruzgar, sonum = 1.1, tekme } = o;
  const L = Math.max(0.03, boy_m), g = 9.81;
  const ivme = (q: number) => { const h = 0.5; const a = aski(q - h)[0], b = aski(q)[0], c = aski(q + h)[0]; return ((c - 2 * b + a) / (h * h)) * fps * fps / pxm; }; // m/s²
  const a = sarkacKare({ kuvvet: (q) => -ivme(q) / L + (ruzgar ? ruzgar(q) / L : 0), bas, p, fps, sertlik: g / L, sonum, a0: ((o.a0_derece ?? 0) * Math.PI) / 180, tekme });
  const [x, y] = aski(p);
  return { aci: (a * 180) / Math.PI, uc: [x + Math.sin(a) * L * pxm, y + Math.cos(a) * L * pxm] };
}

export type DiziAdim = { from: string; to: string; u: number };
/** Adlandırılmış pozlar zinciri (kaynak: sequence): [["otur", 42], ["esne", 54], …] kare cinsinden. Bitince null. */
export function dizi(adimlar: Array<[ad: string, kare: number]>): (q: number) => DiziAdim | null {
  const top = adimlar.reduce((a, s) => a + s[1], 0);
  return (q) => {
    if (q < 0 || q >= top) return null;
    let acc = 0, onceki = adimlar[0][0];
    for (const [ad, d] of adimlar) { if (q < acc + d) return { from: onceki, to: ad, u: (q - acc) / d }; acc += d; onceki = ad; }
    return null;
  };
}
