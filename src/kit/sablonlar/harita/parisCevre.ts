// ===== `paris-cevre` görünümü: 1870 kuşatma planı coğrafyası (mekanlar.md §5H.2–5H.3) =====
// ProjeksiyonKm: S 33 px/km, merkez (2.335°D, 48.857°K) → (540, 900). Konumlar [G] ±33 px; okuma değişmez.
// Hepsi modül yüklenirken bir kez hesaplanır (seed `parisHarita: 171`), kare başına değişmez → doku kaynamaz.
import { egri, enYakin, icinde, kumulatif, mesafe, noktaS, ofset, Pt, rng, titret, yolD, kesikDesen } from "./cizgi";

export const ProjeksiyonKm = { merkez: [540, 900] as Pt, S: 33, lon0: 2.335, lat0: 48.857 };
export const pjKm = (lon: number, lat: number): Pt => [540 + (lon - 2.335) * 73.25 * 33, 900 - (lat - 48.857) * 111.2 * 33];
export const SEED = 171;

// ---- palet (§5H.3; hepsi C* ≤ 26, kılıf imza bandı dışında; kırmızı/sarı metal yok) ----
export const PK = {
  arazi: "#d9c49a", surIci: "#cbb487", nehir: "#e3d6b6", su: "#6f7f78", tarama: "#8a7a5c", kontur: "#4a4237", murekkep: "#1c1915",
  halka: "#3e4c63", isaret: "#52627a", prusya: "#8a93a0", ikon: "#e9dfc9", serit: "#5a5048", hilal: "#6d6a63",
};

// ---- nehirler ----
const SEINE_K: Pt[] = [[880, 1430], [816, 1359], [729, 1054], [656, 977], [569, 911], [504, 874], [388, 962], [272, 1017], [257, 944], [279, 845], [347, 794],
  [424, 698], [530, 687], [559, 606], [477, 540], [335, 588], [252, 632], [117, 761], [-120, 860]];
const MARNE_K: Pt[] = [[1180, 860], [1011, 889], [1011, 1109], [861, 1036], [729, 1054]];
export const SEINE = titret(egri(SEINE_K, false, 3), SEED + 1);
export const MARNE = titret(egri(MARNE_K, false, 3), SEED + 2);
export const CITE: { c: Pt; rx: number; ry: number; aci: number } = { c: [569, 911], rx: 15, ry: 4.5, aci: 37 };
const NEHIR_ORNEK = [...SEINE, ...MARNE];
export const nehreUzak = (q: Pt, d: number) => enYakin(q, NEHIR_ORNEK) >= d;

// ---- sur (Thiers): bastiyon izi — dış zigzag 5 px + iç rampart 2.5 px (8 px içeride) ----
const SUR_K: Pt[] = [[560, 748], [624, 760], [678, 786], [716, 836], [729, 900], [716, 966], [676, 1022], [610, 1050], [540, 1052], [478, 1036], [424, 992],
  [372, 958], [339, 922], [341, 866], [354, 818], [410, 784], [487, 764]];
export const SUR = egri(SUR_K, true, 2);
const SUR_C = kumulatif([...SUR, SUR[0]]);
// iç taraf: kapalı eğri saat yönünde (ekran) → sol normal dışarı bakar; işaret ölçümle seçilir
const ICE = (() => { const t = ofset(SUR, 8, true); return icinde(t[0], SUR) ? 8 : -8; })();
export const SUR_IC = titret(ofset(SUR, ICE, true), SEED + 4, 1.0, 40, true);
export const SUR_DIS = (() => {
  const r = rng(SEED + 3), L = SUR_C[SUR_C.length - 1], pts: Pt[] = [];
  const cevre = [...SUR, SUR[0]];
  let s = 0;
  while (s < L - 20) {
    const w = 30 + r() * 12, s1 = Math.min(L, s + w), sm = (s + s1) / 2;
    const a = noktaS(cevre, SUR_C, s), m = noktaS(cevre, SUR_C, sm);
    const n: Pt = [-m.t[1], m.t[0]]; // sol normal
    const dis = -Math.sign(ICE); // ICE içe dönük normal işareti → dış = ters
    pts.push(a.p, [m.p[0] + n[0] * dis * 14, m.p[1] + n[1] * dis * 14]);
    s = s1;
  }
  return titret(pts, SEED + 5, 0.8, 40, true);
})();
export const SUR_D = { dis: yolD(SUR_DIS, true), ic: yolD(SUR_IC, true), dolgu: yolD(SUR, true) };

// ---- 16 fort (bastiyonlu beşgen; Mont-Valérien 34 px) ----
export const FORTLAR: [string, Pt][] = [["Mont-Valérien", [245, 849]], ["Issy", [364, 1043]], ["Vanves", [434, 1054]], ["Montrouge", [509, 1080]], ["Bicêtre", [593, 1087]],
  ["Ivry", [683, 1080]], ["Charenton", [726, 1061]], ["Vincennes", [782, 951]], ["Nogent", [878, 951]], ["Rosny", [910, 849]], ["Noisy", [849, 812]],
  ["Romainville", [787, 786]], ["Aubervilliers", [685, 702]], ["Est", [610, 628]], ["Double-Couronne", [590, 590]], ["La Briche", [571, 551]]];
export const fortYol = (c: Pt, cap: number, seed: number) => {
  const r = rng(seed), a0 = -Math.PI / 2 + (r() - 0.5) * 0.5, R = cap / 2, pts: Pt[] = [];
  for (let i = 0; i < 10; i++) { const a = a0 + (i * Math.PI) / 5, rr = i % 2 === 0 ? R : R * 0.7; pts.push([c[0] + Math.cos(a) * rr, c[1] + Math.sin(a) * rr]); }
  return yolD(pts, true);
};

// ---- tepe taraması (hachure): sırttan aşağı dik kısa çizgiler; KB ışığı → GD yamaç sık + 3 px, KB yamaç seyrek + 2.5 px ----
type Tarama = { a: Pt; b: Pt; w: number };
const ISIK: Pt = [-Math.SQRT1_2, -Math.SQRT1_2]; // ışığın geldiği yön (KB)
const taramaTepe = (c: Pt, r: number, seed: number): Tarama[] => {
  const rn = rng(seed), out: Tarama[] = [];
  let a = rn() * 6.28;
  const son = a + Math.PI * 2;
  while (a < son) {
    const n: Pt = [Math.cos(a), Math.sin(a)], koyu = n[0] * ISIK[0] + n[1] * ISIK[1] < 0;
    const boy = 10 + rn() * 8, ara = (koyu ? 7 : 12) + rn() * 2;
    out.push({ a: [c[0] + n[0] * r, c[1] + n[1] * r], b: [c[0] + n[0] * (r + boy), c[1] + n[1] * (r + boy)], w: koyu ? 3 : 2.5 });
    a += ara / r;
  }
  return out;
};
const taramaSirt = (a: Pt, b: Pt, seed: number): Tarama[] => {
  const rn = rng(seed), out: Tarama[] = [], L = mesafe(a, b), t: Pt = [(b[0] - a[0]) / L, (b[1] - a[1]) / L];
  for (const yan of [1, -1]) {
    const n: Pt = [-t[1] * yan, t[0] * yan], koyu = n[0] * ISIK[0] + n[1] * ISIK[1] < 0;
    for (let s = 4; s < L - 4; s += (koyu ? 7 : 12) + rn() * 2) {
      const boy = 10 + rn() * 8, q: Pt = [a[0] + t[0] * s, a[1] + t[1] * s];
      out.push({ a: [q[0] + n[0] * 3, q[1] + n[1] * 3], b: [q[0] + n[0] * (3 + boy), q[1] + n[1] * (3 + boy)], w: koyu ? 3 : 2.5 });
    }
  }
  return out;
};
export const TARAMA: Tarama[] = [
  ...taramaTepe([559, 797], 26, SEED + 10), // Montmartre
  ...taramaSirt([640, 820], [810, 786], SEED + 11), // Belleville–Romainville sırtı
  ...taramaTepe([245, 849], 44, SEED + 12), // Mont-Valérien
  ...taramaSirt([290, 1092], [470, 1104], SEED + 13), // Meudon–Châtillon
  ...taramaTepe([590, 1125], 18, SEED + 14), // Villejuif
].filter((h) => nehreUzak(h.a, 15) && nehreUzak(h.b, 15) && FORTLAR.every(([, f]) => mesafe(f, h.b) > 20 && mesafe(f, h.a) > 20));

// ---- ormanlar: ø 7 halka + GD'da 5 px gölge çentiği, düzensiz küme ----
const orman = (c: Pt, w: number, h: number, n: number, seed: number): Pt[] => {
  const r = rng(seed), out: Pt[] = [];
  for (let k = 0; k < 400 && out.length < n; k++) {
    const q: Pt = [c[0] + (r() - 0.5) * w, c[1] + (r() - 0.5) * h];
    if (((q[0] - c[0]) / (w / 2)) ** 2 + ((q[1] - c[1]) / (h / 2)) ** 2 > 1) continue;
    if (icinde(q, SUR) || !nehreUzak(q, 16) || out.some((o) => mesafe(o, q) < 13)) continue;
    out.push(q);
  }
  return out;
};
export const AGACLAR: Pt[] = [...orman([322, 886], 76, 96, 24, SEED + 20), ...orman([806, 999], 90, 60, 22, SEED + 21)];

// ---- su çizgileri: nehir içinde kıyıya paralel kesikli (2.5 px) ----
export const SU_CIZGI = [
  { d: yolD(ofset(SEINE, 4)), dash: kesikDesen(SEED + 30, 4000) },
  { d: yolD(ofset(SEINE, -4)), dash: kesikDesen(SEED + 31, 4000) },
  { d: yolD(MARNE), dash: kesikDesen(SEED + 32, 2000) },
];
export const NEHIR_D = { seine: yolD(SEINE), marne: yolD(MARNE) };

// ---- telgraf teli: Cité → KB → kopma (293,548) → kadrajın sol-üst köşesi (§5H.5-B) ----
export const KOPMA: Pt = [293, 548];
export const TEL_K: Pt[] = [[569, 911], [430, 730], KOPMA, [-220, -126]];
