// ===== Harita çizgi yardımcıları (KE-PK-H1…H5; mekanlar.md §5H.3) =====
// Saf geometri: seed'li rastgele, Catmull-Rom yoğun örnekleme, yay uzunluğu, alt parça, deterministik el titremesi (filtre değil,
// kaynamaz), ofset (su çizgisi / iç rampart), kısmi çizim. Hepsi dekor px; modül yüklenirken bir kez hesaplanır.
export type Pt = [number, number];

// mulberry32 — seed sabit, kare başına değişmez
export const rng = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const cr = (p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt => {
  const t2 = t * t, t3 = t2 * t;
  const f = (a: number, b: number, c: number, d: number) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
  return [f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])];
};
// Catmull-Rom: kontrol noktalarından geçen yumuşak eğri, ~adim px aralıkla örneklenir
export const egri = (pts: Pt[], kapali = false, adim = 3): Pt[] => {
  const n = pts.length, out: Pt[] = [];
  const g = (i: number): Pt => (kapali ? pts[((i % n) + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
  const son = kapali ? n : n - 1;
  for (let i = 0; i < son; i++) {
    const a = g(i), b = g(i + 1);
    const k = Math.max(2, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / adim));
    for (let j = 0; j < k; j++) out.push(cr(g(i - 1), a, b, g(i + 2), j / k));
  }
  if (!kapali) out.push(pts[n - 1]);
  return out;
};

export const kumulatif = (pl: Pt[]) => {
  const c = [0];
  for (let i = 1; i < pl.length; i++) c.push(c[i - 1] + Math.hypot(pl[i][0] - pl[i - 1][0], pl[i][1] - pl[i - 1][1]));
  return c;
};
// yay uzunluğu s'deki nokta + birim teğet
export const noktaS = (pl: Pt[], c: number[], s: number): { p: Pt; t: Pt } => {
  const L = c[c.length - 1];
  const ss = Math.max(0, Math.min(L, s));
  let lo = 0, hi = c.length - 1;
  while (hi - lo > 1) { const m = (lo + hi) >> 1; if (c[m] <= ss) lo = m; else hi = m; }
  const d = c[hi] - c[lo] || 1, u = (ss - c[lo]) / d;
  const a = pl[lo], b = pl[hi];
  const tx = b[0] - a[0], ty = b[1] - a[1], tl = Math.hypot(tx, ty) || 1;
  return { p: [a[0] + tx * u, a[1] + ty * u], t: [tx / tl, ty / tl] };
};
// [s0, s1] arası alt çizgi
export const parca = (pl: Pt[], c: number[], s0: number, s1: number): Pt[] => {
  if (s1 <= s0) return [];
  const out: Pt[] = [noktaS(pl, c, s0).p];
  for (let i = 0; i < pl.length; i++) if (c[i] > s0 && c[i] < s1) out.push(pl[i]);
  out.push(noktaS(pl, c, s1).p);
  return out;
};
export const yolD = (pl: Pt[], kapali = false) => (pl.length < 2 ? "" : "M" + pl.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join("L") + (kapali ? "Z" : ""));

// birim normaller (sol el: teğeti +90° döndürür; y aşağı ekran koordinatında "sağ" taraf)
export const normaller = (pl: Pt[], kapali = false): Pt[] => pl.map((_, i) => {
  const n = pl.length;
  const a = pl[kapali ? (i - 1 + n) % n : Math.max(0, i - 1)], b = pl[kapali ? (i + 1) % n : Math.min(n - 1, i + 1)];
  const tx = b[0] - a[0], ty = b[1] - a[1], l = Math.hypot(tx, ty) || 1;
  return [-ty / l, tx / l];
});
export const ofset = (pl: Pt[], d: number, kapali = false): Pt[] => {
  const N = normaller(pl, kapali);
  return pl.map((q, i) => [q[0] + N[i][0] * d, q[1] + N[i][1] * d]);
};
// el titremesi: normal boyunca yumuşak gürültü (genlik 1.2 px, dalga 40 px; §5H.3) — deterministik
export const titret = (pl: Pt[], seed: number, genlik = 1.2, dalga = 40, kapali = false): Pt[] => {
  const r = rng(seed), f1 = r() * 6.28, f2 = r() * 6.28, k2 = 0.37 + r() * 0.2;
  const c = kumulatif(pl), N = normaller(pl, kapali);
  return pl.map((q, i) => {
    const s = c[i] / dalga;
    const n = genlik * (0.7 * Math.sin(s * 6.283 + f1) + 0.3 * Math.sin(s * 6.283 * (1 / k2) + f2));
    return [q[0] + N[i][0] * n, q[1] + N[i][1] * n];
  });
};
// seed'li kesik çizgi deseni (segment 30–70 px, boşluk 10–22 px) — su çizgisi
export const kesikDesen = (seed: number, toplam: number, seg: [number, number] = [30, 70], bos: [number, number] = [10, 22]) => {
  const r = rng(seed), d: number[] = [];
  let s = 0;
  while (s < toplam) { const a = seg[0] + r() * (seg[1] - seg[0]), b = bos[0] + r() * (bos[1] - bos[0]); d.push(a, b); s += a + b; }
  return d.map((v) => v.toFixed(1)).join(" ");
};
export const mesafe = (a: Pt, b: Pt) => Math.hypot(a[0] - b[0], a[1] - b[1]);
// noktanın bir çizgi örneğine en yakın uzaklığı (örnekler yoğun)
export const enYakin = (q: Pt, pl: Pt[]) => pl.reduce((m, r) => Math.min(m, (r[0] - q[0]) ** 2 + (r[1] - q[1]) ** 2), Infinity) ** 0.5;
export const icinde = (q: Pt, poly: Pt[]) => {
  let ic = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if (yi > q[1] !== yj > q[1] && q[0] < ((xj - xi) * (q[1] - yi)) / (yj - yi) + xi) ic = !ic;
  }
  return ic;
};
// ikinci dereceden Bezier yay (a → b, şişkinlik = kiriş boyunun oranı, işaret yan seçer), yoğun örnek
export const yay = (a: Pt, b: Pt, siskin: number, adim = 4): Pt[] => {
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
  const k: Pt = [mx - (dy / L) * L * siskin * 2, my + (dx / L) * L * siskin * 2]; // Bezier tepe = kontrolün yarısı → ×2
  const n = Math.max(4, Math.ceil(L / adim)), out: Pt[] = [];
  for (let i = 0; i <= n; i++) { const t = i / n, u = 1 - t; out.push([u * u * a[0] + 2 * u * t * k[0] + t * t * b[0], u * u * a[1] + 2 * u * t * k[1] + t * t * b[1]]); }
  return out;
};
