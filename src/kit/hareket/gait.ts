// ===== kit/hareket/gait.ts — yürüyüş / sürütme / koşu çözücüsü (KAREYE BAĞLI, deterministik) =====
// Uyarlama: JDhruv14/line-art-animation `lib/gait.ts` (MIT).
//   MIT License — Copyright (c) 2026 JDhruv14
//   Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
//   files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
//   modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
//   is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be
//   included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
//
// Bu dosya BAĞIMSIZDIR (import yok): tools/bolum_dogrula.mjs de doğrudan içe aktarır (Node tip ayıklama) → basış kareleri tek kaynaktan.
//
// İki katman:
//  1) `gait()` — kaynağın birebir taşıması (figür birimi, faz → poz). Faz zamandan değil kareden: `gaitFaz(p, fps, period)`.
//  2) `adimCoz()` — DÜNYA çözücüsü (Remotion kiti için). Kaynağın dört kuralı korunur, ama faz zaman yerine OLAY listesinden gelir:
//     · basan ayak dünya koordinatında SABİT (kaynakta "ayak yol hızıyla geri kayar"; burada ayak hiç hareket etmez → kayma 0),
//     · salınan ayak minimum-jerk yol + alçak kalkış (koşuda topuk tekmesi),
//     · topuk kalkışı: duruşun son %14'ünde ayak parmak ucunda döner; konuşta topuk önce değer (burun hafif kalkık) sonra düzleşir,
//     · kalça yüksekliği bacak erişiminden (sinüs zıplaması yok): basılı ayaklar kalçayı aşağı çeker, ayaklar ayrıkken iner.
//     Ek (kanal kuralları): zemin y = f(x) (eğim/merdiven) — salınan ayak altındaki zeminin üstünden geçer (basamak kenarına girmez);
//     yokuş çıkışta öne eğilme + kısa adım, inişte geriye yaslanma. Basış kareleri = temas (foley) listesi.

export type Vec = [number, number];
const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));
const smooth = (e0: number, e1: number, x: number) => { const t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };
const minJerk = (s: number) => { s = clamp(s, 0, 1); return s * s * s * (10 - 15 * s + 6 * s * s); };
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// ---------------------------------------------------------------- 1) kaynak gait() ----------------------------------------------------------------
export type GaitKind = "walk" | "shuffle" | "run";
export interface GaitOptions { kind?: GaitKind; period?: number; duty?: number; stride?: number; lift?: number; heelOff?: number; heelKick?: number; thigh?: number; shin?: number; ankleY?: number; ground?: number; toe?: number }
export interface Foot { ankle: Vec; knee: Vec; pitch: number; stance: boolean }
export interface Pose { hip: Vec; feet: [Foot, Foot]; front: 0 | 1; bob: number }
export interface Gait extends Required<GaitOptions> { speed: number; pose(phase: number, go?: number): Pose }

function knee(hip: Vec, ankle: Vec, l1: number, l2: number): Vec {
  const dx = ankle[0] - hip[0], dy = ankle[1] - hip[1];
  const d = Math.min(Math.hypot(dx, dy), l1 + l2 - 0.01);
  const th = Math.atan2(dy, dx);
  const al = Math.acos(clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1));
  const c1: Vec = [hip[0] + l1 * Math.cos(th - al), hip[1] + l1 * Math.sin(th - al)];
  const c2: Vec = [hip[0] + l1 * Math.cos(th + al), hip[1] + l1 * Math.sin(th + al)];
  return c1[0] > c2[0] ? c1 : c2;
}

export const GAIT_PRESETS: Record<GaitKind, Required<Omit<GaitOptions, "kind">>> = {
  walk: { period: 1.0, duty: 0.62, stride: 24, lift: 3.4, heelOff: 15, heelKick: 0, thigh: 23, shin: 23, ankleY: 118.4, ground: 120, toe: 4.2 },
  shuffle: { period: 0.9, duty: 0.64, stride: 18, lift: 2.4, heelOff: 12, heelKick: 0, thigh: 23, shin: 23, ankleY: 116, ground: 120, toe: 4.2 },
  run: { period: 0.5, duty: 0.36, stride: 16, lift: 12, heelOff: 10, heelKick: 3.5, thigh: 13, shin: 13, ankleY: 118, ground: 120, toe: 3 },
};

export function gait(opts: GaitOptions = {}): Gait {
  const kind = opts.kind ?? "walk";
  const o = { ...GAIT_PRESETS[kind], ...opts, kind };
  const { period, duty, stride: S, lift, heelOff, heelKick, thigh, shin, ankleY, ground, toe } = o;
  const reach = (thigh + shin) * 0.983;
  const restHip = ankleY - reach;
  const speed = S / (duty * period);
  const foot = (u: number): Omit<Foot, "knee"> => {
    u = ((u % 1) + 1) % 1;
    if (u < duty) {
      const x = 40 + S / 2 - (S * u) / duty;
      const peel = smooth(duty - 0.14, duty, u);
      const th = (heelOff * peel * Math.PI) / 180;
      const px = x + toe, py = ground, ox = -toe, oy = ankleY - ground;
      return { ankle: [px + ox * Math.cos(th) - oy * Math.sin(th), py + ox * Math.sin(th) + oy * Math.cos(th)], pitch: heelOff * peel, stance: true };
    }
    const s = (u - duty) / (1 - duty);
    const x = 40 - S / 2 + S * minJerk(s) - heelKick * Math.sin(Math.PI * Math.min(1, s * 1.6));
    const y = ankleY - lift * Math.pow(Math.sin(Math.PI * Math.pow(s, heelKick ? 0.7 : 1)), 1.2);
    return { ankle: [x, y], pitch: heelOff * Math.pow(1 - smooth(0, 0.55, s), 1.4), stance: false };
  };
  return {
    ...o, speed,
    pose(phase, go = 1) {
      const raw = [foot(phase), foot(phase + 0.5)];
      if (go < 1) raw.forEach((fo, i) => { const rest = 40 + (i ? -2 : 2); fo.ankle = [rest + (fo.ankle[0] - rest) * go, ankleY + (fo.ankle[1] - ankleY) * go]; fo.pitch *= go; fo.stance = true; });
      let hipY = restHip;
      const half = ((phase % 0.5) + 0.5) % 0.5;
      if (heelKick && go >= 1) hipY = half < duty ? restHip + 1.4 * Math.sin((Math.PI * half) / duty) : restHip - 2.6 * Math.sin((Math.PI * (half - duty)) / (0.5 - duty));
      else for (const fo of raw) if (fo.stance) { const dx = fo.ankle[0] - 40; hipY = Math.max(hipY, fo.ankle[1] - Math.sqrt(Math.max(1, reach * reach - dx * dx))); }
      const hip: Vec = [40, hipY];
      const feet = raw.map((fo) => ({ ...fo, knee: knee(hip, fo.ankle, thigh, shin) })) as [Foot, Foot];
      return { hip, feet, front: feet[0].ankle[0] >= feet[1].ankle[0] ? 0 : 1, bob: hipY - restHip };
    },
  };
}
/** Kareye bağlı faz (kaynak: phase += dt / period). */
export const gaitFaz = (p: number, fps: number, period: number, bas = 0) => (p - bas) / (fps * period);

// ---------------------------------------------------------------- 2) dünya çözücüsü ----------------------------------------------------------------
// Tür varsayılanları METRE (kaynak figür biriminden bacak ≈ 0.9 m ile çevrildi). adim_m = ardışık iki basış arası (sol→sağ) yatay yol.
export type AdimTur = { duty: number; kalkis_m: number; topukKalkis: number; topukTekme_m: number; topukVurus: number; adim_m: number; aralik: [number, number]; egik: number };
export const ADIM_TUR: Record<GaitKind, AdimTur> = {
  walk: { duty: 0.62, kalkis_m: 0.07, topukKalkis: 15, topukTekme_m: 0, topukVurus: 8, adim_m: 0.7, aralik: [0.45, 0.9], egik: 3 },
  shuffle: { duty: 0.64, kalkis_m: 0.045, topukKalkis: 12, topukTekme_m: 0, topukVurus: 3, adim_m: 0.45, aralik: [0.25, 0.6], egik: 2 },
  run: { duty: 0.36, kalkis_m: 0.28, topukKalkis: 10, topukTekme_m: 0.12, topukVurus: 0, adim_m: 1.1, aralik: [0.7, 1.6], egik: 8 },
};
export const turAdi = (t?: string): GaitKind => (t === "run" || t === "kos" ? "run" : t === "shuffle" || t === "surut" ? "shuffle" : "walk");

/** Yokuşta adım kısalır: çıkışta ≤ %30, inişte ≤ %15 (eğim derece, + yukarı). */
export const yokusKisalt = (egim: number) => (egim >= 0 ? 1 - 0.3 * clamp(egim / 20, 0, 1) : 1 - 0.15 * clamp(-egim / 20, 0, 1));

/**
 * Basış kareleri — YOL KURALI (tek kaynak; doğrulayıcı da bunu çağırır). i. basış (0'dan) etkin yol (i + 1 − duty)·adım'ı geçtiği ilk kare:
 * duruştan ilk adım yarım (≈ adım), sonrakiler tam adım; basış anında konan ayak kalçanın duty·adım önünde.
 * x(q), yer(q) = kalçanın altındaki zemin y (px), pxm(q). Etkin yol = Σ |Δx|/pxm / yokusKisalt(eğim).
 */
export function basisKareleri(o: { bas: number; bit: number; x: (q: number) => number; yer: (q: number) => number; pxm: (q: number) => number; adim_m?: number; tur?: GaitKind }): { kare: number; d: number }[] {
  const T = ADIM_TUR[o.tur ?? "walk"], A = o.adim_m ?? T.adim_m;
  const out: { kare: number; d: number }[] = [];
  let d = 0, i = 0;
  for (let q = o.bas + 1; q <= o.bit; q++) {
    const dx = o.x(q) - o.x(q - 1), dz = o.yer(q) - o.yer(q - 1), pm = Math.max(1e-6, o.pxm(q));
    const eg = (Math.atan2(-dz * Math.sign(dx || 1), Math.abs(dx) || 1e-6) * 180) / Math.PI;
    d += Math.abs(dx) / pm / yokusKisalt(Math.abs(dx) > 1e-6 ? eg : 0);
    while (d >= (i + 1 - T.duty) * A) { out.push({ kare: q, d }); i++; }
  }
  return out;
}

export type AyakDurum = { bilek: Vec; zemin: Vec; aci: number; basili: boolean; u: number; h: number; x: number };
export type Basis = { kare: number; ayak: 0 | 1; x: number; y: number };
export type AdimCikti = { x: number; kalcaY: number; egim: number; lean: number; bob: number; ayak: [AyakDurum, AyakDurum]; on: 0 | 1; basislar: Basis[]; tur: GaitKind };
export type AdimGirdi = {
  p: number; bas: number; bit: number;
  x: (q: number) => number;              // kalça x (dekor px) q karesinde
  zemin: (x: number) => number;          // zemin y (px) dünya x'inde (eğim, merdiven: basamak fonksiyonu)
  pxm: (q: number) => number;            // px/m (derinlikle)
  yon: 1 | -1;
  tur?: GaitKind; adim_m?: number;
  basislar?: number[];                   // json temas kareleri (TEMAS = SES). Verilmezse yol kuralı (basisKareleri)
  ilk?: 0 | 1;                           // ilk adımı atan ayak (0 = ön/yakın F, 1 = arka B)
  ofset: [number, number];               // duruşta bilek x − kalça x (yön-yerel px) [F, B] — rig duruş pozundan (bas/bit'te poz birebir)
  baslangic?: [number, number];          // bas'ta bilek x (dünya) — verilmezse x(bas) + yon·ofset
  bitis?: [number, number];              // bit'te bilek x (dünya) — verilmezse x(bit) + yon·ofset
  kalcaOfs: (lean: number) => [Vec, Vec]; // kalça eklemi − kalça pivotu (yön-yerel px) [F, B]
  erisim: number;                        // kalça→bilek duruş mesafesi (px; dinlenik kalça yüksekliği)
  azami: number;                         // kalça→bilek en uzun (px; IK sınırı)
  ayakGeo: { topuk: number; burun: number; bilek: number }; // yön-yerel px: topuk/burun x (bilekten), bilek yüksekliği (tabandan)
  egik?: number;                         // taban gövde eğimi (derece); verilmezse tür varsayılanı
};

/** Dünya çözücüsü. Basan ayak sabit; kayma yalnız IK sınırına takılırsa olur (doğrulayıcı/ölçüm betiği yakalar). */
export function adimCoz(g: AdimGirdi): AdimCikti {
  const tur = g.tur ?? "walk", T = ADIM_TUR[tur], A = g.adim_m ?? T.adim_m, f = g.yon;
  const { p, bas, bit } = g;
  const xs: number[] = []; for (let q = bas; q <= bit; q++) xs.push(g.x(q));
  const xAt = (q: number) => { const c = clamp(q, bas, bit), i = Math.floor(c - bas), t = c - bas - i; return i + 1 < xs.length ? lerp(xs[i], xs[i + 1], t) : xs[xs.length - 1]; };
  const yerQ = (q: number) => g.zemin(xAt(q));
  // etkin yol tablosu (basış konumu: yolun (i+1)·adım'a ulaştığı kalça x'i)
  const D: number[] = [0];
  for (let q = bas + 1; q <= bit; q++) {
    const dx = xAt(q) - xAt(q - 1), dz = yerQ(q) - yerQ(q - 1);
    const eg = (Math.atan2(-dz * Math.sign(dx || 1), Math.abs(dx) || 1e-6) * 180) / Math.PI;
    D.push(D[D.length - 1] + Math.abs(dx) / Math.max(1e-6, g.pxm(q)) / yokusKisalt(Math.abs(dx) > 1e-6 ? eg : 0));
  }
  const xDe = (d: number) => { if (d <= 0) return xs[0]; for (let i = 1; i < D.length; i++) if (D[i] >= d) { const t = (d - D[i - 1]) / Math.max(1e-9, D[i] - D[i - 1]); return lerp(xs[i - 1], xs[i], t); } return NaN; };
  const tk: number[] = (g.basislar && g.basislar.length ? g.basislar.filter((q) => q > bas && q <= bit + 1).sort((a, b) => a - b) : basisKareleri({ bas, bit, x: xAt, yer: yerQ, pxm: g.pxm, adim_m: A, tur }).map((b) => b.kare));
  const n = tk.length;
  const ilk = g.ilk ?? 0;
  const kim = (i: number) => ((ilk + i) % 2) as 0 | 1;
  const st: [number, number] = g.baslangic ?? [xs[0] + f * g.ofset[0], xs[0] + f * g.ofset[1]];
  const son: [number, number] = g.bitis ?? [xs[xs.length - 1] + f * g.ofset[0], xs[xs.length - 1] + f * g.ofset[1]];
  const Dk = (q: number) => D[clamp(Math.round(q - bas), 0, D.length - 1)];
  // konuş konumları
  const kon: number[] = tk.map((q, i) => {
    if (i >= n - 2) return son[kim(i)];
    let hedefD: number;
    if (g.basislar?.length) { const a = Math.max(0, i - 1), b = Math.min(n - 1, i + 1); const ai = n > 1 ? (Dk(tk[b]) - Dk(tk[a])) / Math.max(1, b - a) : A; hedefD = Dk(q) + T.duty * ai; }
    else hedefD = (i + 1) * A;
    const xx = xDe(hedefD);
    return Number.isFinite(xx) ? xx + f * g.ofset[kim(i)] : son[kim(i)];
  });
  // olaylar
  type Olay = { kalk: number; kon: number; x0: number; x1: number; dongu: number };
  const olay: [Olay[], Olay[]] = [[], []];
  const konum: [number, number] = [st[0], st[1]];
  const sonKon: [number | null, number | null] = [null, null];
  tk.forEach((q, i) => {
    const k = kim(i), onceki = i > 0 ? tk[i - 1] : bas;
    const dongu = sonKon[k] !== null ? q - (sonKon[k] as number) : 2 * Math.max(4, q - onceki);
    let kalk = q - Math.round((1 - T.duty) * dongu);
    kalk = Math.max(kalk, (sonKon[k] ?? bas) + 2, bas + 1);
    if (T.duty > 0.5 && i > 0) kalk = Math.max(kalk, onceki + 1); // yürüyüşte öteki ayak basmadan bu ayak kalkmaz (çift destek)
    kalk = Math.min(kalk, q - 3);
    // geri adım yok, son duruşu aşan adım yok
    if (f * (kon[i] - konum[k]) < 0) kon[i] = konum[k];
    if (f * (kon[i] - son[k]) > 0) kon[i] = son[k];
    olay[k].push({ kalk, kon: q, x0: konum[k], x1: kon[i], dongu });
    konum[k] = kon[i]; sonKon[k] = q;
  });
  const kalkis = T.kalkis_m, tekme = T.topukTekme_m;
  const ayak = (k: 0 | 1): AyakDurum => {
    const pmx = g.pxm(p);
    let x = st[k], y = g.zemin(x), aci = 0, basili = true, u = 0;
    let oncekiKon = bas;
    for (const o of olay[k]) {
      if (p >= o.kon) { x = o.x1; y = g.zemin(x); aci = p < o.kon + 6 ? -T.topukVurus * (1 - smooth(o.kon, o.kon + 6, p)) : 0; oncekiKon = o.kon; continue; }
      if (p > o.kalk) {
        u = (p - o.kalk) / (o.kon - o.kalk); basili = false;
        const e = minJerk(u);
        x = lerp(o.x0, o.x1, e) - f * tekme * pmx * Math.sin(Math.PI * Math.min(1, u * 1.6));
        const prof = Math.pow(Math.sin(Math.PI * Math.pow(u, tekme ? 0.7 : 1)), 1.2);
        // ayak altındaki en yüksek zemin (topuk…burun penceresi): basamak kenarına/yokuşa girmez
        let ust = Infinity; for (let j = 0; j <= 6; j++) { const xx = x + f * lerp(g.ayakGeo.topuk, g.ayakGeo.burun, j / 6); ust = Math.min(ust, g.zemin(xx)); }
        const taban = Math.min(lerp(g.zemin(o.x0), g.zemin(o.x1), e), ust);
        y = taban - kalkis * pmx * prof;
        aci = T.topukKalkis * Math.pow(1 - smooth(0, 0.55, u), 1.4) - T.topukVurus * smooth(0.7, 1, u);
        break;
      }
      // basılı; kalkıştan önceki son %14: topuk kalkar, parmak ucunda döner
      const pencere = Math.max(3, 0.14 * o.dongu);
      if (p > o.kalk - pencere && p > oncekiKon + 2) aci = T.topukKalkis * smooth(o.kalk - pencere, o.kalk, p);
      break;
    }
    const zy = g.zemin(x);
    const h = basili ? 0 : Math.max(0, zy - y);
    // bilek: aci ≥ 0 → burun (parmak ucu) zeminde pivot; aci < 0 → topuk pivot (yön-yerel, +aci = burun aşağı)
    const piv: Vec = aci >= 0 ? [g.ayakGeo.burun, g.ayakGeo.bilek] : [g.ayakGeo.topuk, g.ayakGeo.bilek];
    const r = (aci * Math.PI) / 180, rx = piv[0] * Math.cos(r) - piv[1] * Math.sin(r), ry = piv[0] * Math.sin(r) + piv[1] * Math.cos(r);
    const pz: Vec = [x + f * piv[0], (basili ? zy : y)];
    const bilek: Vec = [pz[0] - f * rx, pz[1] - ry];
    return { bilek, zemin: [x, zy], aci, basili, u, h, x };
  };
  const F = ayak(0), B = ayak(1);
  // kalça
  const hx = xAt(p);
  const egim = (() => { const dx = xAt(p + 2) - xAt(p - 2); if (Math.abs(dx) < 1e-3) return 0; return (Math.atan2(-(g.zemin(hx + Math.sign(dx) * 6) - g.zemin(hx - Math.sign(dx) * 6)), 12) * 180) / Math.PI; })();
  const lean = (g.egik ?? T.egik) + (egim >= 0 ? 0.45 * egim : 0.35 * egim);
  const ofs = g.kalcaOfs(lean);
  const kalca = (i: 0 | 1, hy: number): Vec => [hx + f * ofs[i][0], hy + ofs[i][1]];
  // gereken kalça pivot y'si: bacak i bileğe erişsin (R) — y aşağı; pivot ≥ bilek − √(R² − dx²) − ofs.y
  const gerek = (A_: AyakDurum, i: 0 | 1, R: number) => { const dx = A_.bilek[0] - kalca(i, 0)[0]; return A_.bilek[1] - Math.sqrt(Math.max(0, R * R - dx * dx)) - ofs[i][1]; };
  const agirlik = (A_: AyakDurum) => (A_.basili ? 1 : Math.max(1 - smooth(0, 0.35, A_.u), smooth(0.6, 1, A_.u)));
  const basililar = [F, B].filter((a) => a.basili);
  const dinlen = (basililar.length ? Math.max(...basililar.map((a) => a.bilek[1])) : Math.max(F.bilek[1] + F.h, B.bilek[1] + B.h)) - g.erisim - Math.min(ofs[0][1], ofs[1][1]);
  let hy = dinlen;
  if (tur === "run") {
    // koşu: basılı ayak üstünde çöker, uçuşta en yüksek
    const bas0 = [...tk].reverse().find((q) => q <= p), sonra = tk.find((q) => q > p);
    if (bas0 !== undefined && sonra !== undefined) { const h = (p - bas0) / (sonra - bas0), dd = T.duty * 2; hy = h < dd ? dinlen + 0.055 * g.erisim * Math.sin((Math.PI * h) / dd) : dinlen - 0.1 * g.erisim * Math.sin((Math.PI * (h - dd)) / (1 - dd)); }
  }
  for (const [A_, i] of [[F, 0], [B, 1]] as [AyakDurum, 0 | 1][]) { const w = agirlik(A_); if (w > 0) hy = Math.max(hy, lerp(dinlen, gerek(A_, i, g.erisim), w)); }
  // IK sınırı: hiçbir bacak azami erişimi aşmaz (aşarsa ayak kayar)
  for (const [A_, i] of [[F, 0], [B, 1]] as [AyakDurum, 0 | 1][]) hy = Math.max(hy, gerek(A_, i, g.azami - 0.5));
  // basışlar (tüm liste; ses aynı listeden)
  const basislar: Basis[] = tk.map((q, i) => ({ kare: q, ayak: kim(i), x: kon[i], y: g.zemin(kon[i]) }));
  const on: 0 | 1 = f * (F.bilek[0] - B.bilek[0]) >= 0 ? 0 : 1;
  return { x: hx, kalcaY: hy, egim, lean, bob: hy - dinlen, ayak: [F, B], on, basislar, tur };
}

/** Örneklerden zemin fonksiyonu: (x, y) çiftleri (ör. json yolu) → doğrusal ara değer, uçlarda sabit. */
export const zeminOrnek = (pts: Vec[]): ((x: number) => number) => {
  const s = [...pts].sort((a, b) => a[0] - b[0]);
  return (x) => {
    if (!s.length) return 0;
    if (x <= s[0][0]) return s[0][1];
    for (let i = 1; i < s.length; i++) if (x <= s[i][0]) { const t = (x - s[i - 1][0]) / Math.max(1e-9, s[i][0] - s[i - 1][0]); return lerp(s[i - 1][1], s[i][1], t); }
    return s[s.length - 1][1];
  };
};
/** Merdiven zemini: x0'dan başlayan n basamak (derinlik, yükseklik px; yükseklik + = yukarı). Adım = basamak derinliği verilmeli. */
export const merdivenZemin = (x0: number, y0: number, derinlik: number, yukseklik: number, n: number, yon: 1 | -1 = 1) => (x: number) => {
  const i = clamp(Math.floor((yon * (x - x0)) / derinlik), -1, n - 1);
  return y0 - (i + 1) * yukseklik;
};
/** Monoton kübik (Fritsch–Carlson) — json anahtar yolu (GalataTepe pchip ile aynı). Doğrulayıcı da kullanır. */
export const pchip = (xs: number[], ys: number[], x: number): number => {
  const n = xs.length; if (n === 1 || x <= xs[0]) return ys[0]; if (x >= xs[n - 1]) return ys[n - 1];
  const h = xs.slice(1).map((v, i) => v - xs[i]), dl = h.map((hh, i) => (ys[i + 1] - ys[i]) / hh);
  const m = xs.map((_, i) => (i === 0 ? dl[0] : i === n - 1 ? dl[n - 2] : dl[i - 1] * dl[i] <= 0 ? 0 : (3 * (h[i - 1] + h[i])) / ((2 * h[i] + h[i - 1]) / dl[i - 1] + (h[i] + 2 * h[i - 1]) / dl[i])));
  let i = 0; while (x > xs[i + 1]) i++;
  const t = (x - xs[i]) / h[i], t2 = t * t, t3 = t2 * t;
  return (2 * t3 - 3 * t2 + 1) * ys[i] + (t3 - 2 * t2 + t) * h[i] * m[i] + (-2 * t3 + 3 * t2) * ys[i + 1] + (t3 - t2) * h[i] * m[i + 1];
};
