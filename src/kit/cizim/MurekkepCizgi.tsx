// ===== Kalıcı çizim aracı 1: MÜREKKEP ÇİZGİSİ (Leningrad tur-3g kit kararı; yalnız EKLEME) =====
// Neden: tek kalınlık stroke "clip-art" okunur. Gerçek mürekkep ucu başta/sonda incelir, ortada kalınlaşır; kontur ışık tarafında
// incelir (kayıp kenar), gölge tarafında kalınlaşır. Bu dosya:
//   - murekkepYol(q, ayar)  : açık nokta dizisini incelip kalınlaşan DOLGU yoluna çevirir (perfect-freehand, MIT).
//   - konturYol(d, ayar)    : kapalı bir şeklin çevresine değişken kalınlıkta şerit (ışığa göre ince→kalın), tek path (nonzero).
//   - yolNoktalari(d, adim) : herhangi bir SVG path d'yi nokta dizilerine örnekler (alt yollar ayrı; önbellekli).
//   - <MurekkepCizgi>, <MurekkepKontur>, <BirlesikM> (çok parçalı tek siluet: önce şeritler, sonra dolgular → iç dikiş yok).
//   - murekkepRenk(dolgu)   : dolgunun koyu tonu (saf siyah değil).
// Titreme seed'lidir ve yalnız yay uzunluğuna bağlıdır: kareye/kameraya bağlı DEĞİL → kaynamaz.
// Telefon kuralı: görünür kontur ≥ 1.5 px (360 px'te 0.5 px); uç incelmesi bu sınırın altına yalnız son birkaç pikselde iner.
import React from "react";
import { getStroke } from "perfect-freehand";
import { karistir, rnd } from "../../doku/sabitler";

export type P2 = [number, number];

// ---------------- örnekleme ----------------
const ONBELLEK = new Map<string, P2[][]>();
/** kaba yedek (DOM yoksa): yalnız sayı çiftlerinden çokgen */
const kabaNoktalar = (d: string): P2[][] => {
  const n = (d.match(/-?\d+(\.\d+)?/g) ?? []).map(Number);
  const q: P2[] = []; for (let i = 0; i + 1 < n.length; i += 2) q.push([n[i], n[i + 1]]);
  return q.length ? [q] : [];
};
/** SVG path d → alt yol başına nokta dizisi (eşit aralıklı, ~adim px). Kapalı alt yolda son nokta tekrar edilmez. */
export const yolNoktalari = (d: string, adim = 4): P2[][] => {
  const key = `${adim}|${d}`;
  const c = ONBELLEK.get(key); if (c) return c;
  if (typeof document === "undefined") return kabaNoktalar(d);
  const el = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const out: P2[][] = [];
  for (const sub of d.split(/(?=M)/).map((s) => s.trim()).filter(Boolean)) {
    el.setAttribute("d", sub);
    const L = el.getTotalLength();
    if (!(L > 0.5)) continue;
    const kapali = /[Zz]\s*$/.test(sub), n = Math.max(6, Math.ceil(L / adim));
    const q: P2[] = [];
    for (let i = 0; i < (kapali ? n : n + 1); i++) { const p = el.getPointAtLength((L * i) / n); q.push([p.x, p.y]); }
    out.push(q);
  }
  if (ONBELLEK.size > 4000) ONBELLEK.clear();
  ONBELLEK.set(key, out);
  return out;
};
/** nokta dizisini ~adim px aralıkla yeniden örnekler (doğrusal); egri: Catmull-Rom ile */
export const yenidenOrnekle = (q: P2[], adim = 3, egri = false): P2[] => {
  if (q.length < 2) return q.slice();
  const g = (i: number) => q[Math.max(0, Math.min(q.length - 1, i))];
  const out: P2[] = [];
  for (let i = 0; i < q.length - 1; i++) {
    const a = q[i], b = q[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.ceil(L / adim));
    for (let k = 0; k < n; k++) {
      const t = k / n;
      if (!egri) { out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]); continue; }
      const p0 = g(i - 1), p3 = g(i + 2), t2 = t * t, t3 = t2 * t;
      const f = (j: 0 | 1) => 0.5 * (2 * a[j] + (-p0[j] + b[j]) * t + (2 * p0[j] - 5 * a[j] + 4 * b[j] - p3[j]) * t2 + (-p0[j] + 3 * a[j] - 3 * b[j] + p3[j]) * t3);
      out.push([f(0), f(1)]);
    }
  }
  out.push(q[q.length - 1]);
  return out;
};

// ---------------- renk ----------------
/** mürekkep = dolgunun koyu tonu (mor-kahve mürekkebe doğru %78), asla #000 */
export const murekkepRenk = (dolgu: string, koyuluk = 0.78) => karistir(dolgu, "#140e18", koyuluk);

// ---------------- seed'li düşük frekans gürültü (yay uzunluğuna bağlı) ----------------
const gurultu = (seed: number, k: string) => {
  const f = [0.011, 0.027, 0.061].map((v, i) => v * (0.8 + 0.4 * rnd(seed, `${k}f${i}`)));
  const ph = [0, 1, 2].map((i) => rnd(seed, `${k}p${i}`) * Math.PI * 2);
  return (s: number) => (Math.sin(s * f[0] + ph[0]) * 0.5 + Math.sin(s * f[1] + ph[1]) * 0.33 + Math.sin(s * f[2] + ph[2]) * 0.17);
};

// ---------------- açık çizgi ----------------
export type MurekkepAyar = {
  /** en kalın yer (px, görünen çap) */
  kalinlik: number;
  /** baş / son incelme uzunluğu (px); 0 = kesik uç. Varsayılan: çizgi boyunun %30'u (en çok 40 px) */
  ucBas?: number; ucSon?: number;
  /** basınç: t (0..1) → 0..1 ya da nokta başına dizi. Varsayılan göbek: 0.55 + 0.45·sin(πt)^0.7 */
  basinc?: ((t: number) => number) | number[];
  /** basıncın kalınlığa etkisi (perfect-freehand thinning), 0..1 */
  incelme?: number;
  /** seed'li yanal titreme (px) ve kalınlık oynaması (oran) */
  titreme?: number; kalinlikOyna?: number;
  seed?: number;
  /** Catmull-Rom ile yumuşat (seyrek kontrol noktaları için) */
  egri?: boolean;
};
const varsBasinc = (t: number) => 0.55 + 0.45 * Math.sin(Math.PI * t) ** 0.7;
const yolStr = (pts: number[][]): string => {
  if (pts.length < 3) return "";
  const f = (v: number) => v.toFixed(1);
  let d = `M${f(pts[0][0])},${f(pts[0][1])}Q`;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length];
    d += `${f(a[0])},${f(a[1])} ${f((a[0] + b[0]) / 2)},${f((a[1] + b[1]) / 2)} `;
  }
  return d + "Z";
};
/** açık nokta dizisi → incelip kalınlaşan mürekkep dolgu yolu (path d) */
export const murekkepYol = (q0: P2[], a: MurekkepAyar): string => {
  if (q0.length < 2) return "";
  const seed = a.seed ?? 1, tit = a.titreme ?? 0.35, ko = a.kalinlikOyna ?? 0.12;
  const q = yenidenOrnekle(q0, 3, !!a.egri);
  let L = 0; const s: number[] = [0];
  for (let i = 1; i < q.length; i++) { L += Math.hypot(q[i][0] - q[i - 1][0], q[i][1] - q[i - 1][1]); s.push(L); }
  const gy = gurultu(seed, "y"), gk = gurultu(seed, "k");
  const inc = a.incelme ?? 0.75;
  const size = a.kalinlik / (1 + inc); // perfect-freehand: yarıçap = size·(0.5 + inc·(p − 0.5)) → p=1'de çap ≈ kalinlik
  const pts = q.map((p, i) => {
    const t = L > 0 ? s[i] / L : 0;
    const a0 = q[Math.max(0, i - 1)], b0 = q[Math.min(q.length - 1, i + 1)], dx = b0[0] - a0[0], dy = b0[1] - a0[1], l = Math.hypot(dx, dy) || 1;
    const y = gy(s[i]) * tit;
    const bas = Array.isArray(a.basinc) ? (a.basinc[Math.round(t * (a.basinc.length - 1))] ?? 1) : (a.basinc ?? varsBasinc)(t);
    return [p[0] - (dy / l) * y, p[1] + (dx / l) * y, Math.max(0.02, Math.min(1, bas * (1 + gk(s[i]) * ko)))];
  });
  const uc = Math.min(40, L * 0.3);
  const out = getStroke(pts, {
    size, thinning: inc, smoothing: 0.55, streamline: 0.12, simulatePressure: false, last: true,
    start: { taper: a.ucBas ?? uc, cap: true }, end: { taper: a.ucSon ?? uc, cap: true },
  });
  return yolStr(out);
};

// ---------------- kapalı kontur (değişken kalınlıkta şerit) ----------------
export type KonturAyar = {
  /** [ışık tarafı, gölge tarafı] görünen kalınlık (px) */
  kalinlik: [number, number];
  /** ışığın EKRANDA gittiği yön (ör. sol-üstten gelen ışık → [0.8, 0.6]); verilmezse tek kalınlık (ortalama) + gürültü */
  isik?: P2;
  /** 0..1: ışığa en çok bakan kenarda çizgi bu oranda kaybolur (kayıp kenar, gravür) */
  kayip?: number;
  /** "orta": kenarın iki yanına eşit (üstüne çizilir) · "dis": yalnız dışa (üstüne çizilir) · "alt": 2× genişlik, dolgunun ALTINA çizilir (BirlesikM) */
  konum?: "orta" | "dis" | "alt";
  titreme?: number; kalinlikOyna?: number; seed?: number; adim?: number;
};
const ss = (a: number, b: number, x: number) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
/** kapalı şekil → çevresinde değişken kalınlıkta şerit (path d, nonzero) */
export const konturYol = (d: string, a: KonturAyar): string => {
  const seed = a.seed ?? 7, tit = a.titreme ?? 0.4, ko = a.kalinlikOyna ?? 0.15, kon = a.konum ?? "orta";
  const L0 = a.isik ? Math.hypot(a.isik[0], a.isik[1]) || 1 : 1, lx = a.isik ? a.isik[0] / L0 : 0, ly = a.isik ? a.isik[1] / L0 : 0;
  let d2 = "";
  yolNoktalari(d, a.adim ?? 3).forEach((q, si) => {
    const n = q.length; if (n < 4) return;
    // yönelim (işaretli alan): dış normal yönü
    let ar = 0; for (let i = 0; i < n; i++) { const p = q[i], r = q[(i + 1) % n]; ar += p[0] * r[1] - r[0] * p[1]; }
    const yon = ar > 0 ? 1 : -1;
    const gy = gurultu(seed + si * 13, "ky"), gk = gurultu(seed + si * 13, "kk");
    const dis: P2[] = [], ic: P2[] = [];
    let s = 0;
    for (let i = 0; i < n; i++) {
      const p = q[i], pr = q[(i - 1 + n) % n], nx = q[(i + 1) % n];
      if (i > 0) s += Math.hypot(p[0] - pr[0], p[1] - pr[1]);
      const tx = nx[0] - pr[0], ty = nx[1] - pr[1], tl = Math.hypot(tx, ty) || 1;
      // ekran koordinatı (y aşağı): saat yönü (ar > 0) şekilde dış normal (ty, −tx)
      const ox = (ty / tl) * yon, oy = (-tx / tl) * yon;
      const golge = a.isik ? ox * lx + oy * ly : 0; // +1: normal ışığın gittiği yöne bakar → gölge tarafı
      let w = a.isik ? a.kalinlik[0] + (a.kalinlik[1] - a.kalinlik[0]) * ss(-0.55, 0.65, golge) : (a.kalinlik[0] + a.kalinlik[1]) / 2;
      if (a.kayip && a.isik) w *= 1 - a.kayip * ss(-0.25, -0.85, golge);
      w = Math.max(0, w * (1 + gk(s) * ko));
      const y = gy(s) * tit, cx = p[0] + ox * y, cy = p[1] + oy * y;
      const [wd, wi] = kon === "orta" ? [w / 2, w / 2] : kon === "dis" ? [w, 0.6] : [w, w];
      dis.push([cx + ox * wd, cy + oy * wd]); ic.push([cx - ox * wi, cy - oy * wi]);
    }
    const f = (v: P2) => `${v[0].toFixed(1)},${v[1].toFixed(1)}`;
    // dış halka ileri + iç halka geri (nonzero: arası dolu, iç boş)
    d2 += `M${dis.map(f).join("L")}Z M${ic.slice().reverse().map(f).join("L")}Z `;
  });
  return d2;
};

// ---------------- bileşenler ----------------
export const MurekkepCizgi: React.FC<MurekkepAyar & { q: P2[]; renk: string; alfa?: number }> = ({ q, renk, alfa = 1, ...a }) =>
  <path d={murekkepYol(q, a)} fill={renk} opacity={alfa} />;

/** d verilirse (açık path) örneklenir */
export const MurekkepYolCizgi: React.FC<MurekkepAyar & { d: string; renk: string; alfa?: number }> = ({ d, renk, alfa = 1, ...a }) =>
  <path d={yolNoktalari(d, 3).map((q) => murekkepYol(q, a)).join(" ")} fill={renk} opacity={alfa} />;

export const MurekkepKontur: React.FC<KonturAyar & { d: string; renk: string; alfa?: number }> = ({ d, renk, alfa = 1, ...a }) =>
  <path d={konturYol(d, a)} fill={renk} opacity={alfa} />;

/** çok parçalı tek siluet: önce bütün değişken şeritler (2× genişlik, dolgunun altında), sonra dolgular → iç dikiş yok, dış kontur ışığa göre */
export const BirlesikM: React.FC<{ d: string[]; dolgu: string; kontur: string; ayar: KonturAyar }> = ({ d, dolgu, kontur, ayar }) => (
  <g>
    <path d={d.map((x, i) => konturYol(x, { ...ayar, konum: "alt", seed: (ayar.seed ?? 7) + i * 31 })).join(" ")} fill={kontur} />
    {d.map((x, i) => <path key={i} d={x} fill={dolgu} />)}
  </g>
);
