// ===== Paris / Dagron eli — tek gravür dili (tasarım §15.1 + §15.1b C2 el dili düzeltmesi) =====
// Tek siluet: avuç + 4 parmak + avuçtan doğan başparmak + ağ (başparmak–işaret arası tek konkav yay). Çizim sırası (b.1):
//   (1) tüm parçaların ince ışık konturu → (2) tüm parçaların gölgeye kaydırılmış koyu kopyası (yük konturu; ışık kenarında
//   dolgunun altında kalır) → (3) tüm dolgular KONTURSUZ (parçalar kesiştiği yerde iç çizgi kalmaz) → (4) 2 ton ten: gölge şeridi
//   = siluet − ışığa kaydırılmış siluet (0.045 E, sert tek kenar) → (5) gölge tarafında kontura bitişik, içe incelen kısa tarama
//   (bütçeli: E_ekran ≥ 400 → ≤ 14, küçük el → ≤ 6; seed 2305; konturu izlemez).
// YOK: iç kontur, bilek yayı (el manşet kenarında düz kesilir: yerel x ≥ bilekX), tendon, tırnak yayı, kenar ışığı şeridi.
// Yerel çerçeve: bilek (0,0), +x parmaklara, başparmak −y tarafında, birim = E (bilek → orta parmak ucu).
// `olcek` = ekran px / çizim px (kamera cs): kontur/tarama ölçüleri §15.1b'de EKRAN px'tir.
// Katman: `"arka"` avuç + ağ + 4 parmak, `"on"` yalnız başparmak (kâğıt/nesne araya girer), `"hepsi"` hepsi.
// `"on"` başparmak tam konturunu taşır (P10: avuç kâğıdın arkasında); `onMaske` → avuç/ağ üstünde konturu gizlenir (tutulan nesne arası).
import React, { useId } from "react";
import type { P } from "../../tipler";
import { rnd } from "../../../doku/sabitler";

export type ParmakPoz = { a: number; b: number; k?: number; gizli?: boolean }; // a yayılma°, b PIP bükülmesi° (+ avuç yönü), k kısalma
export type GravurPoz = { parmak: [ParmakPoz, ParmakPoz, ParmakPoz, ParmakPoz]; bas: { a: number; b: number; k?: number } };
export const GRAVUR_POZ: Record<"olcu" | "tutus" | "gevsek" | "kistir" | "cimdik", GravurPoz> = {
  // P05 ölçü (§15.1.5 / b.2): avuç masaya yatık, dört parmak düz yan yana; başparmak işaret ekseninden −50°, yatık, uç 6° işarete
  olcu: { parmak: [{ a: -1, b: 4 }, { a: 0, b: 5 }, { a: 1, b: 6 }, { a: 2, b: 8, k: 0.97 }], bas: { a: -50, b: 6 } },
  // P10 okuyan tutuşu: parmaklar kâğıdın arkasına kıvrık; başparmak kâğıt ön yüzünde (açı LanternOda'da ekran açısından: dikeyden 30°)
  tutus: { parmak: [{ a: -8, b: 22, k: 0.92 }, { a: -2, b: 26, k: 0.9 }, { a: 4, b: 30, k: 0.86 }, { a: 10, b: 34, k: 0.82 }], bas: { a: -10, b: 6 } },
  // boştaki el (P09 kuşu taşıyan): gevşek yarı açık, bükülme serçeye doğru 15 → 25°, başparmak ekseni el eksenine yakın
  gevsek: { parmak: [{ a: -4, b: 15, k: 0.95 }, { a: 0, b: 18, k: 0.93 }, { a: 4, b: 22, k: 0.9 }, { a: 8, b: 25, k: 0.88 }], bas: { a: -22, b: 6 } },
  // memur eli: zarfın kenarını başparmakla (üst) işaret/orta (alt) arasında kıstırır
  kistir: { parmak: [{ a: 0, b: 30, k: 0.88 }, { a: 6, b: 62, k: 0.66 }, { a: 10, b: 74, k: 0.58 }, { a: 14, b: 80, k: 0.52 }], bas: { a: -16, b: 4, k: 1.15 } },
  // zarf kapağı / sayfa ucu: başparmak ve işaret uçları buluşur, diğerleri gevşek kıvrık
  cimdik: { parmak: [{ a: -12, b: 34, k: 0.86 }, { a: 4, b: 70, k: 0.62 }, { a: 10, b: 80, k: 0.55 }, { a: 16, b: 85, k: 0.5 }], bas: { a: -10, b: 6, k: 1.1 } },
};
export type GravurPalet = { isik: string; golge: string; konturYuk: string; konturIsik: string; kenar: string; tarama: string; manset: string; mansetGolge: string };
export const GRAVUR_PALET: Record<"paris" | "dagron", GravurPalet> = {
  paris: { isik: "#d6b49c", golge: "#8f7360", konturYuk: "#5a4438", konturIsik: "#a8836c", kenar: "#f0c4a8", tarama: "#6a4f40", manset: "#5d5f63", mansetGolge: "#3e3f44" },
  dagron: { isik: "#c9a58a", golge: "#8e6a52", konturYuk: "#5a4132", konturIsik: "#a07f66", kenar: "#e6c9b4", tarama: "#6a4f40", manset: "#4a3a2c", mansetGolge: "#2e2318" },
};

const LEN = [0.42, 0.46, 0.43, 0.33]; // işaret, orta, yüzük, serçe (kökten uca, E)
const KOK: P[] = [[0.53, -0.152], [0.56, -0.05], [0.548, 0.054], [0.505, 0.15]];
const GEN0 = [0.115, 0.118, 0.11, 0.098], GEN1 = [0.08, 0.082, 0.078, 0.07];
// avuç: bilek kenarı manşetin altına uzanır (bilekX'te kesilir); tenar kabarıklığı (0.20, −0.235) = başparmak dış kenarının çıkışı;
// tenar → işaret kökü arası kenar içeride: o bölgede silüeti başparmak + ağ yayı verir (avuç kenarı ile ağ arasında basamak kalmaz)
const AVUC: P[] = [[-0.14, -0.152], [0.0, -0.158], [0.1, -0.19], [0.2, -0.235], [0.32, -0.2], [0.46, -0.185], [0.55, -0.16], [0.585, -0.05], [0.57, 0.06], [0.53, 0.16], [0.4, 0.2], [0.22, 0.185], [0.06, 0.168], [0.0, 0.16], [-0.14, 0.158]];

/** konik parça: polyline + genişlikler → kapalı çokgen (uç yarım yuvarlak) */
const konik = (q: P[], w: number[], uc = true): P[] => {
  const n = q.length, sol: P[] = [], sag: P[] = [];
  for (let i = 0; i < n; i++) {
    const a = q[Math.max(0, i - 1)], b = q[Math.min(n - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
    sol.push([q[i][0] + (nx * w[i]) / 2, q[i][1] + (ny * w[i]) / 2]); sag.push([q[i][0] - (nx * w[i]) / 2, q[i][1] - (ny * w[i]) / 2]);
  }
  const out: P[] = [...sol];
  if (uc) {
    const e = q[n - 1], p0 = q[n - 2], d = Math.atan2(e[1] - p0[1], e[0] - p0[0]), r = w[n - 1] / 2;
    for (let k = 1; k < 8; k++) { const t = d + Math.PI / 2 - (k * Math.PI) / 8; out.push([e[0] + Math.cos(t) * r, e[1] + Math.sin(t) * r]); }
  }
  return [...out, ...sag.reverse()];
};
/** Catmull-Rom kapalı eğri → örneklenmiş çokgen */
const egri = (q: P[], n = 6): P[] => {
  const N = q.length, out: P[] = [];
  for (let i = 0; i < N; i++) {
    const p0 = q[(i - 1 + N) % N], p1 = q[i], p2 = q[(i + 1) % N], p3 = q[(i + 2) % N];
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      const f = (j: 0 | 1) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3);
      out.push([f(0), f(1)]);
    }
  }
  return out;
};
const duz = (q: P[]) => `M${q.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join("L")}Z`;
const icinde = (q: P[], x: number, y: number) => {
  let c = false;
  for (let i = 0, j = q.length - 1; i < q.length; j = i++) if ((q[i][1] > y) !== (q[j][1] > y) && x < ((q[j][0] - q[i][0]) * (y - q[i][1])) / (q[j][1] - q[i][1]) + q[i][0]) c = !c;
  return c;
};

export type GravurParca = { ad: string; d: string; q: P[]; yerel: P[]; on: boolean };
export type GravurElGeo = { parca: GravurParca[]; uc: P[]; basUc: P; kok: P[]; mat: (q: P) => P };
/** yerel → ekran ve parça çokgenleri */
export const gravurElGeo = (bilek: P, aci: number, E: number, poz: GravurPoz, ayna = false): GravurElGeo => {
  const r = (aci * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r), sy = ayna ? -1 : 1;
  const mat = (q: P): P => [bilek[0] + (q[0] * c - q[1] * sy * s) * E, bilek[1] + (q[0] * s + q[1] * sy * c) * E];
  const parca: GravurParca[] = [];
  const ekle = (ad: string, yerel: P[], on = false) => { const q = yerel.map(mat); parca.push({ ad, d: duz(q), q, yerel, on }); };
  const uc: P[] = [];
  // parmaklar (serçe → işaret); kıvrık kısım ekranda kısalır, silüet boğumda kırılır
  [3, 2, 1, 0].forEach((i) => {
    const pz = poz.parmak[i], L = LEN[i] * (pz.k ?? 1), a0 = (pz.a * Math.PI) / 180, b = (pz.b * Math.PI) / 180;
    const k0 = KOK[i], p1: P = [k0[0] + Math.cos(a0) * L * 0.5, k0[1] + Math.sin(a0) * L * 0.5];
    const a1 = a0 + b * 0.35, s2 = L * 0.28 * Math.cos(b * 0.6), p2: P = [p1[0] + Math.cos(a1) * s2, p1[1] + Math.sin(a1) * s2];
    const a2 = a1 + b * 0.35, s3 = L * 0.22 * Math.cos(b * 0.9), p3: P = [p2[0] + Math.cos(a2) * s3, p2[1] + Math.sin(a2) * s3];
    uc[i] = mat(p3);
    if (!pz.gizli) ekle(`p${i}`, konik([k0, p1, p2, p3], [GEN0[i], (GEN0[i] + GEN1[i]) / 2 + 0.006, GEN1[i] + 0.006, GEN1[i]]));
  });
  ekle("avuc", egri(AVUC));
  // başparmak (b.2): dış kenar tenar tepesinden (0.20, −0.235) kesintisiz çıkar; en 0.135 → 0.095; görünen boy 0.38 E; uç 6° işarete
  const ba = (poz.bas.a * Math.PI) / 180, bb = (poz.bas.b * Math.PI) / 180, bk = poz.bas.k ?? 1;
  const u: P = [Math.cos(ba), Math.sin(ba)], nIn: P = [-u[1], u[0]], w0 = 0.135, w1 = 0.095;
  const O: P = [0.2, -0.235], R: P = [O[0] + (nIn[0] * w0) / 2, O[1] + (nIn[1] * w0) / 2], Lb = 0.4 * bk;
  const R0: P = [R[0] - u[0] * 0.08, R[1] - u[1] * 0.08];
  const M: P = [R[0] + u[0] * Lb * 0.55, R[1] + u[1] * Lb * 0.55], u2: P = [Math.cos(ba + bb), Math.sin(ba + bb)];
  const T: P = [M[0] + u2[0] * Lb * 0.45, M[1] + u2[1] * Lb * 0.45];
  // ağ: işaret kökü (0.47, −0.19) → avuç kenarı ile başparmak iç kenarının köşesinde tek konkav yay (r ≈ 0.07 E)
  const W: P = [0.47, -0.19], Rin: P = [O[0] + nIn[0] * w0, O[1] + nIn[1] * w0];
  const eL = Math.hypot(O[0] - W[0], O[1] - W[1]), e: P = [(O[0] - W[0]) / eL, (O[1] - W[1]) / eL];
  const det = -e[0] * u[1] + u[0] * e[1], dx = Rin[0] - W[0], dy = Rin[1] - W[1];
  if (Math.abs(det) > 0.3) {
    const a = (-dx * u[1] + u[0] * dy) / det, b = (e[0] * dy - e[1] * dx) / det;
    if (a > 0.02 && a < 0.4 && b > -0.03 && b < Lb * 0.6) {
      const X: P = [W[0] + e[0] * a, W[1] + e[1] * a], ra = Math.min(0.08, a);
      const A: P = [X[0] - e[0] * ra, X[1] - e[1] * ra], B: P = [X[0] + u[0] * 0.08, X[1] + u[1] * 0.08];
      const yay: P[] = Array.from({ length: 7 }, (_, i) => { const t = i / 6, m = 1 - t; return [m * m * A[0] + 2 * m * t * X[0] + t * t * B[0], m * m * A[1] + 2 * m * t * X[1] + t * t * B[1]] as P; });
      ekle("ag", [W, ...yay, [R[0] + u[0] * 0.02, R[1] + u[1] * 0.02], [0.4, -0.1]]);
    }
  }
  ekle("bas", konik([R0, R, M, T], [w0, w0, (w0 + w1) / 2 + 0.004, w1]), true);
  return { parca, uc, basUc: mat(T), kok: KOK.map(mat), mat };
};

export const GravurEl: React.FC<{
  bilek: P; aci: number; E: number; poz: GravurPoz; ayna?: boolean; palet?: GravurPalet;
  isik: P; /** ekranda ışığa doğru birim vektör */ taramaAci: number; katman?: "arka" | "on" | "hepsi"; golge?: string; golgeKay?: P;
  olcek?: number; bilekX?: number; onMaske?: boolean;
}> = ({ bilek, aci, E, poz, ayna, palet = GRAVUR_PALET.paris, isik, taramaAci, katman = "hepsi", golge, golgeKay, olcek = 1, bilekX = -0.02, onMaske }) => {
  const uid = "ge" + useId().replace(/:/g, "");
  const g = gravurElGeo(bilek, aci, E, poz, ayna);
  const Es = E * olcek, px = 1 / olcek; // ekran px → çizim px
  const yuk = Math.max(3.5, Math.min(6, 0.0094 * Es)) * px, ince = Math.max(1.0, 0.36 * (yuk / px)) * px;
  const L = Math.hypot(isik[0], isik[1]) || 1, lx = isik[0] / L, ly = isik[1] / L;
  const bant = 0.045 * E;
  const sec = g.parca.filter((p) => katman === "hepsi" || (katman === "on") === p.on);
  // bilek kesimi: yerel x ≥ bilekX yarı düzlemi (manşet kenarı keser; bilekte kontur/yay yok)
  const kes = duz(([[bilekX, -3], [3, -3], [3, 3], [bilekX, 3]] as P[]).map(g.mat));
  if (golge) {
    const [gx, gy] = golgeKay ?? [-lx * 20, -ly * 20];
    return <g><defs><clipPath id={`${uid}x`}><path d={kes} /></clipPath></defs>
      <g transform={`translate(${gx} ${gy})`} fill={golge}><g clipPath={`url(#${uid}x)`}>{sec.map((p) => <path key={p.ad} d={p.d} />)}</g></g></g>;
  }
  // ---- tarama: gölge tarafında kontura bitişik kısa konik çizgiler (b.4) ----
  const buyuk = Es >= 400;
  const butce: Record<string, number> = buyuk ? { avuc: 3, bas: 3, p0: 2, p1: 1, p2: 1, p3: 1 } /* T #11: avuç 6 → 3 (ağda tarak okunuyordu) */ : { avuc: 1, bas: 3, p0: 1, p1: 1 };
  const aralik = (buyuk ? 7 : 6) * px, w0 = (buyuk ? 2.5 : 2) * px, w1 = 0.8 * px;
  const th = (taramaAci * Math.PI) / 180, hd: P = [-Math.sin(th), Math.cos(th)];
  const cizgiler: { ad: string; q: P[] }[] = [];
  for (const pr of sec) {
    const n = butce[pr.ad] ?? 0;
    if (!n) continue;
    const q = pr.q, yl = pr.yerel, N = q.length;
    let alan = 0; for (let i = 0; i < N; i++) { const a = q[i], b = q[(i + 1) % N]; alan += a[0] * b[1] - b[0] * a[1]; }
    const sg = alan > 0 ? 1 : -1;
    const aday: { p: P; nn: P; h: P; puan: number; s: number }[] = [];
    let sToplam = 0;
    for (let i = 0; i < N; i++) {
      const a = q[i], b = q[(i + 1) % N], la = yl[i], lb = yl[(i + 1) % N], ex = b[0] - a[0], ey = b[1] - a[1], el = Math.hypot(ex, ey);
      if (el < 1e-6) continue;
      const nn: P = [(sg * ey) / el, (-sg * ex) / el];
      const adim = Math.max(1, Math.ceil(el / (2 * px)));
      for (let k = 0; k < adim; k++) {
        const t = (k + 0.5) / adim, p: P = [a[0] + ex * t, a[1] + ey * t], lxl = la[0] + (lb[0] - la[0]) * t, s = sToplam + el * t;
        if (lxl < bilekX + 0.06) continue;
        const puan = -(nn[0] * lx + nn[1] * ly);
        if (puan < 0.35) continue;
        const dis: P = [p[0] + nn[0] * 1.5 * px, p[1] + nn[1] * 1.5 * px];
        if (g.parca.some((o) => o !== pr && icinde(o.q, dis[0], dis[1]))) continue;
        let h: P = hd; if (h[0] * -nn[0] + h[1] * -nn[1] < 0) h = [-h[0], -h[1]];
        if (h[0] * -nn[0] + h[1] * -nn[1] < 0.35) continue;
        aday.push({ p, nn, h, puan, s });
      }
      sToplam += el;
    }
    if (!aday.length) continue;
    const en = aday.reduce((m, x) => (x.puan > m.puan ? x : m), aday[0]);
    const secilen = [en];
    const sirali = [...aday].sort((x, y) => Math.abs(x.s - en.s) - Math.abs(y.s - en.s));
    for (const x of sirali) { if (secilen.length >= n) break; if (secilen.every((y) => Math.abs(y.s - x.s) >= aralik)) secilen.push(x); }
    secilen.forEach((x, j) => {
      const Lc = Math.max(0.06, Math.min(0.1, 0.08 * (1 + 0.25 * (2 * rnd(2305, `${pr.ad}${j}`) - 1)))) * E;
      const a: P = [x.p[0] + x.nn[0] * px, x.p[1] + x.nn[1] * px], b: P = [a[0] + x.h[0] * Lc, a[1] + x.h[1] * Lc], pp: P = [-x.h[1], x.h[0]];
      cizgiler.push({ ad: `${pr.ad}${j}`, q: [[a[0] + (pp[0] * w0) / 2, a[1] + (pp[1] * w0) / 2], [b[0] + (pp[0] * w1) / 2, b[1] + (pp[1] * w1) / 2], [b[0] - (pp[0] * w1) / 2, b[1] - (pp[1] * w1) / 2], [a[0] - (pp[0] * w0) / 2, a[1] - (pp[1] * w0) / 2]] });
    });
  }
  const tumAvuc = g.parca.filter((p) => p.ad === "avuc" || p.ad === "ag"); // başparmak konturu yalnız avuç/ağ üstünde gizlenir (parmaklar kâğıt arkasında olabilir)
  const konturMaske = katman === "on" && onMaske;
  return (
    <g>
      <defs>
        <clipPath id={`${uid}x`}><path d={kes} /></clipPath>
        <clipPath id={`${uid}s`}>{sec.map((p) => <path key={p.ad} d={p.d} />)}</clipPath>
        <mask id={`${uid}g`} maskUnits="userSpaceOnUse" x={-4000} y={-4000} width={10000} height={10000}>
          {sec.map((p) => <path key={p.ad} d={p.d} fill="#fff" />)}
          <g transform={`translate(${lx * bant} ${ly * bant})`}>{(katman !== "on" || onMaske ? g.parca : sec).map((p) => <path key={p.ad} d={p.d} fill="#000" />)}</g>
          {/* T #11: parmak uçlarında gölge şeridi yok (uç tonu düz; hilal "yüksük/tırnak" okunuyordu) */}
          {katman !== "on" && g.uc.map((u, i) => <circle key={`u${i}`} cx={u[0]} cy={u[1]} r={0.075 * E} fill="#000" />)}
        </mask>
        {konturMaske && <mask id={`${uid}k`} maskUnits="userSpaceOnUse" x={-4000} y={-4000} width={10000} height={10000}>
          <rect x={-4000} y={-4000} width={10000} height={10000} fill="#fff" />
          {tumAvuc.map((p) => <path key={p.ad} d={p.d} fill="#000" />)}
        </mask>}
      </defs>
      <g clipPath={`url(#${uid}x)`}>
        <g mask={konturMaske ? `url(#${uid}k)` : undefined}>
          {/* (1) ince ışık konturu, (2) gölgeye kaydırılmış koyu kopya (yük) — parça başına değil, tümü dolgulardan ÖNCE */}
          {sec.map((p) => <path key={`i${p.ad}`} d={p.d} fill="none" stroke={palet.konturIsik} strokeWidth={ince * 2} strokeLinejoin="round" />)}
          {sec.map((p) => <path key={`y${p.ad}`} d={p.d} fill={palet.konturYuk} stroke={palet.konturYuk} strokeWidth={ince * 2} strokeLinejoin="round" transform={`translate(${-lx * (yuk - ince)} ${-ly * (yuk - ince)})`} />)}
        </g>
        {/* (3) dolgular kontursuz */}
        {sec.map((p) => <path key={`d${p.ad}`} d={p.d} fill={palet.isik} />)}
        {/* (4) gölge tonu (sert tek kenar) */}
        <g mask={`url(#${uid}g)`}>{sec.map((p) => <path key={`g${p.ad}`} d={p.d} fill={palet.golge} />)}</g>
        {/* (5) kısa tarama */}
        <g clipPath={`url(#${uid}s)`} fill={palet.tarama}>{cizgiler.map((c) => <polygon key={c.ad} points={c.q.map((v) => `${v[0].toFixed(1)},${v[1].toFixed(1)}`).join(" ")} />)}</g>
      </g>
    </g>
  );
};

/** kol konisi (tek giysi; §15.2.4): omuz → dirsek → bilek, dirsek dışı yuvarlak; genişlikler tam (px). Manşet bandı + gömlek manşeti. */
export const konikKol = (omuz: P, dirsek: P, bilek: P, w: [number, number, number]) => {
  const d1 = Math.atan2(dirsek[1] - omuz[1], dirsek[0] - omuz[0]), d2 = Math.atan2(bilek[1] - dirsek[1], bilek[0] - dirsek[0]);
  const n = (a: number, s: number): P => [Math.cos(a + (s * Math.PI) / 2), Math.sin(a + (s * Math.PI) / 2)];
  const kay = (q: P, v: P, k: number): P => [q[0] + v[0] * k, q[1] + v[1] * k];
  const n1a = n(d1, 1), n1b = n(d1, -1), n2a = n(d2, 1), n2b = n(d2, -1);
  // bükülme yönü: dirseğin dış tarafı
  const cr = Math.sin(d2 - d1); // >0: saat yönü (ekranda) dönüş
  const dis = cr > 0 ? -1 : 1;
  const A = [kay(omuz, n1a, w[0] / 2), kay(dirsek, n1a, w[1] / 2), kay(dirsek, n2a, w[1] / 2), kay(bilek, n2a, w[2] / 2)];
  const B = [kay(omuz, n1b, w[0] / 2), kay(dirsek, n1b, w[1] / 2), kay(dirsek, n2b, w[1] / 2), kay(bilek, n2b, w[2] / 2)];
  const f = (q: P) => `${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
  // dış kenar: dirsekte yay (r ≈ 0.55 w1, kumaş birikimi 1.1×); iç kenar: kıvrım noktasında birleşir
  const disK = dis > 0 ? A : B, icK = dis > 0 ? B : A;
  const ic: P = [(icK[1][0] + icK[2][0]) / 2, (icK[1][1] + icK[2][1]) / 2];
  const ort: P = [(disK[1][0] + disK[2][0]) / 2, (disK[1][1] + disK[2][1]) / 2], v: P = [ort[0] - dirsek[0], ort[1] - dirsek[1]], vl = Math.hypot(v[0], v[1]) || 1;
  const tepe: P = [dirsek[0] + (v[0] / vl) * w[1] * 0.58, dirsek[1] + (v[1] / vl) * w[1] * 0.58];
  const d = `M${f(disK[0])}L${f(disK[1])}Q${f(tepe)} ${f(disK[2])}L${f(disK[3])}L${f(icK[3])}L${f(ic)}L${f(icK[0])}Z`;
  // omuz başı konturu çizilmeyen açık kenar yolu (kol gövdeye karışır)
  const kenar = `M${f(icK[0])}L${f(ic)}L${f(icK[3])}L${f(disK[3])}L${f(disK[2])}Q${f(tepe)} ${f(disK[1])}L${f(disK[0])}`;
  return { d, kenar, dis, ic, ileri: (t: number): P => [bilek[0] + Math.cos(d2) * t, bilek[1] + Math.sin(d2) * t], d2, n2: n2a };
};

/** Eski ElDurum sözleşmesiyle (uç noktası + el açısı + kol açısı + px/m) gravür eli: P05/P09/P04b masa ve kafes elleri.
 *  Poz eşlemesi: kistir/kistirSiki → cimdik (uç = başparmak–işaret buluşması), isaret → gevsek (C2: havada tek parmak YOK),
 *  gevsek → gevsek (uç = orta parmak ucu). Tutulan nesne mutlak koordinatta, avuç/parmaklar ile başparmak ARASINDA çizilir. */
export type ElDurumG = { uc: P; aci: number; kolAci: number; pxm: number; poz: "kistir" | "kistirSiki" | "gevsek" | "isaret"; bukum?: number; dirsekM?: number };
export const GravurElDurum: React.FC<{ d: ElDurumG; tur: "dagron" | "paris"; isik: P; taramaAci: number; tutulan?: React.ReactNode; golge?: string; ayna?: boolean; olcek?: number }> = ({ d, tur, isik, taramaAci, tutulan, golge, ayna, olcek }) => {
  const E = 0.19 * d.pxm, poz = d.poz === "kistir" || d.poz === "kistirSiki" ? GRAVUR_POZ.cimdik : GRAVUR_POZ.gevsek;
  const g0 = gravurElGeo([0, 0], d.aci, E, poz, ayna);
  const ref: P = d.poz === "gevsek" ? g0.uc[1] : d.poz === "isaret" ? g0.uc[0] : [(g0.basUc[0] + g0.uc[0][0]) / 2, (g0.basUc[1] + g0.uc[0][1]) / 2];
  const bilek: P = [d.uc[0] - ref[0], d.uc[1] - ref[1]];
  const r = (d.kolAci * Math.PI) / 180, yon: P = [Math.cos(r), Math.sin(r)];
  const dirsek: P = [bilek[0] - (d.dirsekM ?? 0.26) * d.pxm * yon[0], bilek[1] - (d.dirsekM ?? 0.26) * d.pxm * yon[1]];
  const r2 = r + ((d.bukum ?? 18) * Math.PI) / 180;
  const omuz: P = [dirsek[0] - 0.3 * d.pxm * Math.cos(r2), dirsek[1] - 0.3 * d.pxm * Math.sin(r2)];
  const kol = konikKol(omuz, dirsek, [bilek[0] - yon[0] * 0.02 * E, bilek[1] - yon[1] * 0.02 * E], [0.15 * d.pxm, 0.11 * d.pxm, 0.068 * d.pxm]);
  const pal = GRAVUR_PALET[tur], kolRenk = tur === "dagron" ? "#5a5068" : "#34363d", kolKontur = tur === "dagron" ? "#2e2318" : "#1b1d24";
  if (golge) return <g fill={golge}><path d={kol.d} /><GravurEl bilek={bilek} aci={d.aci} E={E} poz={poz} ayna={ayna} isik={isik} taramaAci={taramaAci} golge={golge} golgeKay={[0, 0]} /></g>;
  const mA = kol.ileri(-0.2 * E), mB = kol.ileri(0), nn = kol.n2, w = 0.034 * d.pxm + 2;
  const q = (o: P, k2: number): P => [o[0] + nn[0] * k2, o[1] + nn[1] * k2];
  return (
    <g>
      <path d={kol.d} fill={kolRenk} stroke={kolKontur} strokeWidth={3} strokeLinejoin="round" />
      <polygon points={[q(mA, w * 1.05), q(mB, w), q(mB, -w), q(mA, -w * 1.05)].map((v) => v.join(",")).join(" ")} fill={pal.manset} stroke={pal.mansetGolge} strokeWidth={2.5} />
      <GravurEl bilek={bilek} aci={d.aci} E={E} poz={poz} ayna={ayna} palet={pal} isik={isik} taramaAci={taramaAci} katman="arka" olcek={olcek} />
      {tutulan}
      <GravurEl bilek={bilek} aci={d.aci} E={E} poz={poz} ayna={ayna} palet={pal} isik={isik} taramaAci={taramaAci} katman="on" olcek={olcek} onMaske />
    </g>
  );
};
