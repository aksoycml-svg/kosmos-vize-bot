// ===== KE-S2 GALATA-TEPE (Evliya Uçuşları; mekanlar.md §2 + §2.4a R3, tasarim.md v1.6 §1.2 / §3.3 / §4.2 / §4.5; K5) =====
// gorunum "tepe", saat "gun" (sabah, güneş ENE, yan-kontra). P01 B (plan içi kesme sonrası) + P08 (taş düşüşü, vinç takibi).
// Dekor px; kamera katDonusum. Sahne kurgusu (kukla tiyatrosu dekoru, "doğru iskelet, sade yüzey"):
//   • Ufuk y 829 = ayakta figürün baş hizası (göz seki + 1.65 m). Figür ayak y → px/m = (y − 829)/1.65 (ayak 1250 → 255 px/m).
//   • Seki (tepe katını çevreleyen 1.2 m taş yürüme yeri) üst yüzü y 1150 (tepe katı duvar dibi) → 1264 (dış dudak). Figür ve taş dudakta
//     (ayak 1250, 255 px/m); tepe katı duvarı 1.2 m geride (195 px/m: taş sırası 0.45 m = 88 px, kemerli açıklık 1.0 m).
//     [K5 sapması, raporlu: mekanlar §2.3 duvar dibini 1250'de veriyordu; ayak 1250 + taşın dış kenardan düşmesi ile birlikte tutmuyordu.]
//   • Çıkıntı x 640–900: dudağın sağ ucunda kalın taş levha + tek sade konsol; gevşek taş dudağın üstünde (x 750–790). KORKULUK YOK.
//   • Gövde (seki = gövdenin üst yüzü) dudaktan aşağı, 255 px/m sabit (vinç: taş sabit boyda), sıra 115 px, her 4. sıra koyu; ×5.5 stilize
//     kısaltma, gövde tabanı y 3560; dipte iki ev çatısı (#6e5240 tek ton, alçak eğim, desensiz) ve aralarındaki sokak; taş y 3580'de düşer.
//   • Külah: kurşun, düz koni (yükseklik = taban çapı), saçak taşması %10, alem/pencere/bayrak yok; tepesi kadraj üstünde.
//   • Uzak katmanlar (gök, Asya kıyısı, Boğaz: f 0; şehir çatıları f 0.35) — vinçte gövde örter.
// Yasak benzerlikler (§2.4a): deniz feneri (tepe katında ışık/cam yok, açıklıklar koyu), roket (korniş + koyu kemer bandı koniyi gövdeden
// ayırır, geniş saçak), burç (mazgal yok), kilise (yarım daire kemer, çan/haç yok).
// TEK IŞIK: güneş yonlu, gölge vektörü (−2.64, +1.09) (sola ve kameraya). Kukla ışığı, kanat tonu, gölgeler, terminatör ve parlama buradan.
// Tarama yalnız kemer içi (III), korniş altı (II), terminatör (II); geniş gölge yüzü düz ton. Hezarfen kostümünde tarama yok (rig bant 0).
import React from "react";
import { interpolate } from "remotion";
import { Golge, Isik } from "../../../doku/Isik";
import { KonturTitreme } from "../../../doku/KonturTitreme";
import { RenkKaydi, Tarama } from "../../../doku/Tarama";
import { DOKU_SEED, ink, karistir, lerp, P, poly, rnd, tonla } from "../../../doku/sabitler";
import { Kukla, Poz } from "../../../rig/Kukla";
import { kuklaIsigi } from "../../../rig/RigIsik";
import { AYAK_TABAN, govdeDunya, kolIK } from "../../../rig/kinematik";
import { KanatCiz, kanatGeo } from "../../props/evliya";
import { karakterBul } from "../../karakterler";
import { karakterPoz } from "../../jestler";
import type { Karakter, Prop } from "../../tipler";
import { cl, CIKIS, deger, ekranNokta, GIRIS, INOUT, kameraHesapla, katDonusum, KameraDurum } from "../../zaman";
import { param, Sablon, SablonProps } from "../../ortak";
import { RIG_BIRIM_M } from "../sarayburnu/geo";

const S = DOKU_SEED.galata;
export const GT = {
  ufuk: 829, goz: 1.65, ayakY: 1250, duvarDip: 1150, dudak: 1264, duvarPxm: 195, pxm: 255,
  duvarX: [-540, 700] as [number, number], tepeUst: 565, kornis: [507, 565] as [number, number], sacak: 492, kulahTaban: [-540, 760] as [number, number],
  kapi: { x: [163, 418] as [number, number], tepe: 672 }, sagAciklik: { x: [560, 650] as [number, number], tepe: 700 },
  seki: [-540, 900] as [number, number], cikinti: [640, 900] as [number, number], konsol: [690, 742] as [number, number],
  govdeX: [-540, 1060] as [number, number], govdeTaban: 3560, sira: 115,
  catilar: [{ x: [100, 560] as [number, number] }, { x: [820, 1250] as [number, number] }], sirt: 3330, sacakEv: 3420,
  tasYer: 3580,
};
const R = {
  gok: ["#a9b6bf", "#cfcfc4", "#e6dcc0"], parlama: "#f6e8c0", asya: "#9aa2a4", bogaz: "#7c9090", bogazIsik: "#e4dcc4",
  tas: "#9a8f7e", tasGolge: "#6b6357", tasKoyu: "#5e574c", derz: "#4e473f", sekiUst: "#7e7466", tasKirik: "#b4aa96",
  kursun: "#7c8288", kursunIsik: "#a3a8aa", aciklik: "#2a2620", cati: "#6e5240", catiGolge: "#4e3a2e", evDuvar: "#8a7660", evGolge: "#5e5040",
  sehirPus: "#a49c90", toprak: "#8a7a5c", kontra: "#3a3634", kenar: "#f0d79a", toz: "#a9a69c", // soğuk gri: sıcak kum tonu (#b8a888) toprak üstünde imza bandına (#c4a874 ΔE<15) düşüyordu
};
const ISIK: Isik = { tip: "yonlu", yon: [-2.64, 1.09], renk: "#f0d79a", ad: "güneş ENE (kontra-yan)" };
const pxmY = (y: number) => Math.max(1, (y - GT.ufuk) / GT.goz);
// K6 silindir yasası (mekanlar R4 §2.3a, B9): eksen x 300; u = (x − 300)/a, e(u) = 1 − √(1 − u²) (gerçek elips); A(y) = 0.30·|y − 829|.
// Göz hizasının üstündeki kenarlar uçlara doğru AŞAĞI (∩), altındakiler YUKARI (∪). Yarı genişlik a: duvar 400 · korniş 430 · külah saçağı 460 ·
// seki dudağı 560 (A 100 sabit). Kontrol: saçak x0 516 / x760 593 · korniş üstü 535 / 604 · duvar üstü 592 / 644 · duvar dibi 1117 / 1054 · dudak 1243 (x640).
export const EKSEN = 300;
export const silE = (u: number) => { const v = Math.max(-1, Math.min(1, u)); return 1 - Math.sqrt(1 - v * v); };
export const silindirY = (x: number, y: number, a = 400, A?: number) => { const e = silE((x - EKSEN) / a), Ay = A ?? 0.3 * Math.abs(y - GT.ufuk); return y + (y < GT.ufuk ? 1 : -1) * Ay * e; };
export const W = (q: P, a = 400, A?: number): P => [q[0], silindirY(q[0], q[1], a, A)];
const Wp = (a: P, b: P, n = 16, aa = 400, A?: number): P[] => Array.from({ length: n + 1 }).map((_, i) => W([lerp(a[0], b[0], i / n), lerp(a[1], b[1], i / n)], aa, A));
const A_DUDAK = 100, a_DUDAK = 560, a_KORNIS = 430, a_SACAK = 460;
const dudakY = (x: number) => silindirY(x, GT.dudak, a_DUDAK, A_DUDAK);

// ---------------- taş (KE-P5) fiziği: dur → ayakla itilir (kayar) → dudaktan devrilir → serbest düşüş → çarpar, 1 sekme, oturur ----------------
// json kareleri: kare [0, 40, 46, 100, 148] (temas tas-surtme 40, tas-kayma 44, uzak-tik 148). Düşüş y(p) = y46 + ½·g·(p−46)², g, y148 = yere
// koşulundan (json'daki p100 1912 bu eğriyle ±10 px). Dönüş 1 tur / 40 kare.
export type TasDurum = { x: number; y: number; aci: number; yerde: boolean; dustu: boolean };
export const tasCoz = (pr: Prop | undefined, p: number, temas: { surt: number; kay: number; yer: number }): TasDurum => {
  const xs = Array.isArray(pr?.x) ? pr!.x as number[] : [770, 770, 790, 800, 800];
  const x0 = xs[0], xSon = xs[xs.length - 1];
  const y0 = GT.dudak - 8, yKenar = GT.dudak + 4, yYer = GT.tasYer;
  const { surt, kay, yer } = temas;
  const dus = kay + 2;
  if (p < surt) return { x: x0, y: y0, aci: 0, yerde: false, dustu: false };
  // K6 (B8): itme taşı 30 px sağa-öne sürer (bacak bu mesafede uzanır); kayma → devrilme (p kay → kay+2) dudak üstünde öne/sağa 4° → 40°,
  // merkez +10 sağa, +14 aşağı (dudağın dışına) → serbest düşüş bu açıdan devam eder
  const IT = 30;
  if (p < kay) { const u = (p - surt) / (kay - surt), e = u * (2 - u); return { x: lerp(x0, x0 + IT, e), y: lerp(y0, GT.dudak - 2, e), aci: 4 * e, yerde: false, dustu: false }; }
  if (p < dus) { const u = (p - kay) / (dus - kay); return { x: x0 + IT + 10 * u, y: lerp(GT.dudak - 2, yKenar + 10, u), aci: 4 + 36 * u * u, yerde: false, dustu: false }; }
  const g = (2 * (yYer - yKenar - 10)) / (yer - dus) ** 2;
  if (p < yer) { const t = p - dus; return { x: lerp(x0 + IT + 10, xSon, t / (yer - dus)), y: yKenar + 10 + 0.5 * g * t * t, aci: 40 + 9 * t, yerde: false, dustu: true }; }
  const aciYer = 40 + 9 * (yer - dus), otur = Math.round(aciYer / 72) * 72 + 8;
  const t = p - yer;
  const sek = t < 10 ? 16 * Math.sin((Math.PI * t) / 10) : 0;
  return { x: xSon + Math.min(t, 10) * 0.8, y: yYer - sek, aci: lerp(aciYer, otur, Math.min(1, t / 10)), yerde: true, dustu: true };
};
const TAS_PTS: P[] = [[-0.5, 0], [-0.46, -0.52], [-0.12, -0.78], [0.34, -0.66], [0.5, -0.12], [0.3, 0.02]]; // birim (genişlik 1), taban y 0
const TasCiz: React.FC<{ d: TasDurum; w: number }> = ({ d, w }) => {
  // dip sokağında (sağ ev sokağı gölgeler; saçak y 2183'ten aşağı) taş gölgede: #8e8472, ışık kırığı yok — geçiş taşın boyu kadar (gölge kenarı)
  const gol = Math.max(0, Math.min(1, (d.y - 2183) / w));
  // döndürme taş merkezinde (taban üstü 0.38 w); çizim tabanı d.y'ye oturur
  const c: P = [d.x, d.y - 0.38 * w];
  const rot = (q: P): P => { const a = (d.aci * Math.PI) / 180, x = q[0] * w, y = q[1] * w + 0.38 * w; return [c[0] + x * Math.cos(a) - y * Math.sin(a), c[1] + x * Math.sin(a) + y * Math.cos(a)]; };
  const pts = TAS_PTS.map(rot);
  const kirik = ([[0.34, -0.66], [0.5, -0.12], [0.18, -0.3]] as P[]).map(rot); // açık kırık yüz (ışığa bakan sağ-üst)
  const golge = ([[-0.5, 0], [-0.46, -0.52], [-0.2, -0.4], [-0.1, 0.01]] as P[]).map(rot);
  return <g>
    <polygon points={poly(pts)} fill={karistir(R.tas, "#8e8472", gol)} stroke={ink(R.tas)} strokeWidth={Math.max(2.5, w * 0.035)} strokeLinejoin="round" />
    <polygon points={poly(golge)} fill={karistir(R.tasGolge, "#7a705f", gol)} />
    {gol < 1 && <polygon points={poly(kirik)} fill={karistir(R.tasKirik, "#8e8472", gol)} />}
  </g>;
};

// ---------------- Hezarfen bacak FK/IK (tas-it): ön ayak burnu (ayakkabı yerel (40, 10)) hedefe ----------------
const M = { mul: (A: number[], B: number[]) => [A[0] * B[0] + A[2] * B[1], A[1] * B[0] + A[3] * B[1], A[0] * B[2] + A[2] * B[3], A[1] * B[2] + A[3] * B[3], A[0] * B[4] + A[2] * B[5] + A[4], A[1] * B[4] + A[3] * B[5] + A[5]] };
const T = (x: number, y: number) => [1, 0, 0, 1, x, y];
const Rt = (deg: number, cx = 0, cy = 0) => { const r = (deg * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r); return M.mul(M.mul(T(cx, cy), [c, s, -s, c, 0, 0]), T(-cx, -cy)); };
const ap = (m: number[], q: P): P => [m[0] * q[0] + m[2] * q[1] + m[4], m[1] * q[0] + m[3] * q[1] + m[5]];
export const ayakUcu = (pz: Poz, thigh: number, knee: number, foot = 0): P => {
  const s = pz.scale ?? 1, f = pz.facing ?? 1;
  let m = M.mul(T(pz.x, pz.y), [s * f, 0, 0, s, 0, 0]);
  m = M.mul(m, M.mul(T(0, pz.bodyY ?? 0), Rt(pz.lean ?? 0, 0, -226)));
  m = M.mul(m, M.mul(M.mul(M.mul(M.mul(T(14, -226), Rt(thigh)), T(0, 104)), Rt(knee)), M.mul(T(0, 99), Rt(-(thigh + knee) + foot))));
  return ap(m, [40, 10]);
};
const bacakIK = (pz: Poz, hedef: P) => {
  let best = { th: -20, kn: 20 }, e = Infinity;
  for (let th = -95; th <= 10; th += 2.5) for (let kn = 0; kn <= 120; kn += 2.5) { const q = ayakUcu(pz, th, kn); const d = Math.hypot(q[0] - hedef[0], q[1] - hedef[1]); if (d < e) { e = d; best = { th, kn }; } }
  const b0 = best;
  for (let th = b0.th - 2.5; th <= b0.th + 2.5; th += 0.5) for (let kn = b0.kn - 2.5; kn <= b0.kn + 2.5; kn += 0.5) { const q = ayakUcu(pz, th, kn); const d = Math.hypot(q[0] - hedef[0], q[1] - hedef[1]); if (d < e) { e = d; best = { th, kn }; } }
  return best;
};
// ---------------- K6 bacak IK (analitik iki kemik) + düzlemde basan yürüyüş (B3) ----------------
// Bacak: kalça yerel (legX, −226) [lean ile döner], uyluk 104, baldır 99, bilek → taban 15. Diz yalnız geriye bükülür.
const UY = 104, BA = 99, ANK = 15, R_BACAK = 202.5;
const LEG = { F: 14, B: -10 } as const;
export const bilekFK = (pz: Poz, legX: number, thigh: number, knee: number): P => {
  const s = pz.scale ?? 1, f = pz.facing ?? 1;
  let m = M.mul(T(pz.x, pz.y), [s * f, 0, 0, s, 0, 0]);
  m = M.mul(m, M.mul(T(0, pz.bodyY ?? 0), Rt(pz.lean ?? 0, 0, -226)));
  m = M.mul(m, M.mul(M.mul(M.mul(T(legX, -226), Rt(thigh)), T(0, UY)), M.mul(Rt(knee), T(0, BA))));
  return ap(m, [0, 0]);
};
const kalcaEkran = (pz: Poz, legX: number): P => { const s = pz.scale ?? 1, f = pz.facing ?? 1, a = ((pz.lean ?? 0) * Math.PI) / 180; return [pz.x + f * s * legX * Math.cos(a), pz.y + s * (-226 + legX * Math.sin(a) + (pz.bodyY ?? 0))]; };
export const bacakIK2 = (pz: Poz, legX: number, bilek: P) => {
  const s = pz.scale ?? 1, f = pz.facing ?? 1, a = ((pz.lean ?? 0) * Math.PI) / 180, k = kalcaEkran(pz, legX);
  const ex = (bilek[0] - k[0]) / (f * s), ey = (bilek[1] - k[1]) / s;
  const dx = ex * Math.cos(a) + ey * Math.sin(a), dy = -ex * Math.sin(a) + ey * Math.cos(a);
  const d = Math.max(30, Math.min(UY + BA - 0.5, Math.hypot(dx, dy)));
  const phi = Math.atan2(-dx, dy), kn = Math.acos(Math.max(-1, Math.min(1, (d * d - UY * UY - BA * BA) / (2 * UY * BA))));
  const beta = Math.atan2(BA * Math.sin(kn), UY + BA * Math.cos(kn));
  return { th: ((phi - beta) * 180) / Math.PI, kn: (kn * 180) / Math.PI };
};
// ayak durumu: ankraj x (bilek, düz basışta), zemin y, yerden yükseklik h (px), eğim α (°; + topuk kalkık/parmak ucu, − parmak kalkık/topuk)
type AyakD = { x: number; gy: number; h: number; a: number; basili: boolean; u: number };
// α'ya göre bilek hedefi: + → parmak ucu (yerel taban (36,15)) zeminde; − → topuk ((−10,15)) zeminde
const bilekHedef = (A: AyakD, s: number, f: number): P => {
  const r = (A.a * Math.PI) / 180, piv: P = A.a >= 0 ? [36, ANK] : [-10, ANK];
  const rx = piv[0] * Math.cos(r) - piv[1] * Math.sin(r), ry = piv[0] * Math.sin(r) + piv[1] * Math.cos(r);
  const zeminPiv: P = [A.x + f * s * piv[0], A.gy - A.h];
  return [zeminPiv[0] - f * s * rx, zeminPiv[1] - s * ry];
};
// monoton kübik (Fritsch–Carlson): anahtarlar arası hız sürekli, durup kalkma yok
export const pchip = (xs: number[], ys: number[], x: number): number => {
  const n = xs.length; if (n === 1 || x <= xs[0]) return ys[0]; if (x >= xs[n - 1]) return ys[n - 1];
  const h = xs.slice(1).map((v, i) => v - xs[i]), dl = h.map((hh, i) => (ys[i + 1] - ys[i]) / hh);
  const m = xs.map((_, i) => (i === 0 ? dl[0] : i === n - 1 ? dl[n - 2] : dl[i - 1] * dl[i] <= 0 ? 0 : (3 * (h[i - 1] + h[i])) / ((2 * h[i] + h[i - 1]) / dl[i - 1] + (h[i] + 2 * h[i - 1]) / dl[i])));
  let i = 0; while (x > xs[i + 1]) i++;
  const t = (x - xs[i]) / h[i], t2 = t * t, t3 = t2 * t;
  return (2 * t3 - 3 * t2 + 1) * ys[i] + (t3 - 2 * t2 + t) * h[i] * m[i] + (-2 * t3 + 3 * t2) * ys[i + 1] + (t3 - t2) * h[i] * m[i + 1];
};
// Yürüyüş: ayak basma kareleri = json temaslarındaki "adim-tas" (ses ile aynı liste). Ön (yakın) ayak önce. Son iki basış ayakları son duruşa
// getirir; aradakiler eşit aralıklı. Kalça x = basışlarda iki ayağın ortası, aralar pchip (sürekli hız). Arka ayak kalkmadan önce topuğu
// kalkar (parmak ucunda), konan ayak topukla değer, sonra düzleşir. Ayak yolu yere paralel, kavisle kalkar (≤ 0.07 m).
export const yuruCoz = (c: Karakter, temasK: number[], bas: number, bit: number, p: number, sOl: number) => {
  const f = c.yon === -1 ? -1 : 1;
  const xs0 = deger(c.x, c.kare, bas, 540), xs1 = deger(c.x, c.kare, bit, 540);
  const gy = (q: number) => pchipJson(c, q, "y", GT.ayakY);
  const ck = temasK.filter((q) => q > bas && q <= bit + 1).sort((a, b) => a - b);
  const n = ck.length;
  const st = { F: xs0 + f * sOl * LEG.F, B: xs0 + f * sOl * LEG.B }, son = { F: xs1 + f * sOl * LEG.F, B: xs1 + f * sOl * LEG.B };
  const kim = (i: number): "F" | "B" => (i % 2 === 0 ? "F" : "B");
  const E = n >= 2 ? son[kim(n - 2)] : son.F, A0 = st.B;
  const kon = ck.map((_, i) => (i >= n - 2 ? son[kim(i)] : A0 + ((E - A0) * (i + 1)) / Math.max(1, n - 1)));
  type Olay = { kalk: number; kon: number; x0: number; x1: number; g0: number; g1: number };
  const olay: Record<"F" | "B", Olay[]> = { F: [], B: [] };
  const konum = { ...st }, zemin = { F: gy(bas), B: gy(bas) };
  ck.forEach((q, i) => { const k = kim(i); const kalk = i === 0 ? Math.max(bas + 4, q - 16) : Math.max(ck[i - 1] + 2, q - 16); olay[k].push({ kalk, kon: q, x0: konum[k], x1: kon[i], g0: zemin[k], g1: gy(q) }); konum[k] = kon[i]; zemin[k] = gy(q); });
  const ayak = (k: "F" | "B"): AyakD => {
    let x = st[k], g = gy(bas), h = 0, a = 0, basili = true, u = 0;
    for (const o of olay[k]) {
      if (p >= o.kon) { x = o.x1; g = o.g1; a = p < o.kon + 5 ? -14 * (1 - (p - o.kon) / 5) : 0; continue; }
      if (p > o.kalk) { u = (p - o.kalk) / (o.kon - o.kalk); const e = 0.5 - 0.5 * Math.cos(Math.PI * u); x = lerp(o.x0, o.x1, e); g = lerp(o.g0, o.g1, e); h = 0.07 * (sOl * RIG_BIRIM_M / 1.04) * Math.sin(Math.PI * u) ** 0.8; a = u < 0.3 ? 26 * (1 - u / 0.3) : u > 0.75 ? -14 * ((u - 0.75) / 0.25) : 0; basili = false; break; }
      // basılı, kalkmadan önceki 6 kare: topuk kalkar (parmak ucu)
      if (p > o.kalk - 7) a = 26 * Math.min(1, (p - (o.kalk - 7)) / 7);
      break;
    }
    return { x, gy: g, h, a, basili, u };
  };
  const F = ayak("F"), B = ayak("B");
  const kx = [bas, ...ck.slice(0, -1), Math.max(bit, ck[n - 1] ?? bit)];
  const ky = [xs0, ...ck.slice(0, -1).map((q, i) => { const k = kim(i), o = k === "F" ? "B" : "F"; const kk = olay[o].filter((e) => e.kon <= q).pop(); return (kon[i] + (kk ? kk.x1 : st[o])) / 2 - f * sOl * 2; }), xs1];
  return { F, B, x: pchip(kx, ky, p), f };
};
const pchipJson = (c: Karakter, q: number, alan: "x" | "y", v: number) => {
  const arr = (c as unknown as Record<string, unknown>)[alan];
  if (!Array.isArray(arr) || !c.kare) return typeof arr === "number" ? arr : v;
  return pchip(c.kare, arr as number[], q);
};
const karis = (pz: Poz, h: Partial<Poz>, w: number) => { if (w <= 0) return; for (const [k, v] of Object.entries(h)) { if (typeof v !== "number") continue; const a = ((pz as unknown as Record<string, number | undefined>)[k]) ?? 0; (pz as Record<string, unknown>)[k] = a + (v - a) * w; } };

// yürüyüş: adım uzunluğu 0.75 m (yarım döngü), faz = yol / 1.5 m · 2π; ayak basma kareleri = faz π/2 + nπ geçişleri (temas listesi için)
const ADIM_M = 0.75;
export const yuruYol = (c: Karakter, bas: number, p: number, pxm: number) => {
  let yol = 0, x0 = deger(c.x, c.kare, bas, 540);
  for (let q = bas + 1; q <= p; q++) { const x1 = deger(c.x, c.kare, q, 540); yol += Math.abs(x1 - x0) / pxm; x0 = x1; }
  return yol;
};
export const adimKareleri = (c: Karakter, pxm: number): number[] => {
  const j = (c.jestler ?? []).find((q) => q.ad === "yuru"); if (!j) return [];
  const out: number[] = []; let n = 1;
  for (let p = j.bas; p <= j.bit; p++) { const yol = yuruYol(c, j.bas, p, pxm); if (yol >= n * ADIM_M) { out.push(p); n++; } }
  return out;
};


const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const g0 = param<string>(plan, "gorunum", "tepe"), saat = param<string>(plan, "saat", "gun");
  if (g0 !== "tepe" || saat !== "gun") throw new Error(`[GALATA-TEPE] gorunum "${g0}" / saat "${saat}" kurulmadı (kurulu: tepe+gun)`);
  const uid = "gt" + React.useId().replace(/:/g, "");
  const temas = (ses: string, v: number) => (plan.temaslar ?? []).find((t) => t.ses === ses)?.kare ?? v;
  const tasPr = (plan.props ?? []).find((q) => q.tur === "tas");
  const tasK = { surt: temas("tas-surtme", 40), kay: temas("tas-kayma", 44), yer: temas("uzak-tik", 148) };
  const tas = tasPr ? tasCoz(tasPr, p, tasK) : null;
  const tasW = (tasPr as (Prop & { boyut_dekor_px?: number }) | undefined)?.boyut_dekor_px ?? 95;

  // ---- kamera (+ takip: prop ekranda sabit y; vinç) ----
  const kamAt = (q: number): KameraDurum => {
    const k = kameraHesapla(plan.kamera, q);
    const tk = plan.kamera?.takip;
    if (tk && tasPr && tk.prop === (tasPr.id ?? "tas") && q >= tk.kare[0] && q <= tk.kare[1]) {
      const tq = tasCoz(tasPr, q, tasK);
      const cyT = tk.ekran_y - 960 - (tq.y - 0.38 * tasW - 960) * k.cs;
      const w = interpolate(q, [tk.kare[0], tk.kare[0] + 8], [0, 1], { ...cl, easing: INOUT });
      return { ...k, cy: lerp(k.cy, cyT, w) };
    }
    return k;
  };
  const k = kamAt(p);
  const hiz = k.cy - kamAt(p - 1).cy; // ekran px / kare (hızlı dönüşte iz kopyaları)

  // ---- Hezarfen ----
  const isikAd = String(param<string>(plan, "isik", "kontra"));
  // K6 (B13, tasarım v1.7 §1.2): kontra siluet katmanı α .68 (≤ .75; .72 ile kaftan G−R 2.8 ölçüldü < 3; eski .94 "gölge adam"), kaftan yeşili sezilsin
  const siluet = param<number | undefined>(plan, "siluet", undefined) ?? (isikAd.includes("siluet") ? 0.68 : 0.3);
  const hz = (plan.karakterler ?? []).find((c) => c.kim === "hezarfen");
  type HD = { pz: Poz; palet: ReturnType<typeof karakterBul>["palet"]; ayak: P; pxm: number; adimlar: number[]; ayaklar: { x: number; gy: number; h: number }[] };
  const adimTemas = (plan.temaslar ?? []).filter((t) => t.ses === "adim-tas").map((t) => t.kare);
  const hd: HD | null = hz ? (() => {
    const yj = (hz.jestler ?? []).find((j) => j.ad === "yuru");
    // K6 (B3): yürürken konum pchip (anahtar karelerde durup kalkma yok); duruşta json değeri
    let x = yj ? pchipJson(hz, p, "x", 700) : deger(hz.x, hz.kare, p, 700);
    const y = yj ? pchipJson(hz, p, "y", GT.ayakY) : deger(hz.y, hz.kare, p, GT.ayakY);
    const pxm = pxmY(y), s = (pxm / RIG_BIRIM_M) * 1.04;
    const ozel = new Set(["yuru", "tas-it", "egil", "dogrul"]);
    const d = karakterPoz({ ...hz, z: 0, u: 0, kare: undefined, jestler: (hz.jestler ?? []).filter((j) => !ozel.has(j.ad)) }, p, { yer: () => ({ x, y, s }), faz: () => 0 });
    const pz = d.pz; pz.x = x; pz.y = y + AYAK_TABAN * s; pz.scale = s;
    // duruş: eller kuşakta (tasarım §3.4 "ayakta, dik, eller kuşakta"), dik gövde
    { const a = kolIK(pz, govdeDunya(pz, [50, -256]), true), b = kolIK(pz, govdeDunya(pz, [34, -262]), false); pz.shF = a.sh; pz.elF = a.el; pz.shB = b.sh; pz.elB = b.el; pz.lean = 0; }
    const f = pz.facing ?? 1;
    let ayaklar = [{ x: x + f * s * (LEG.F + 13), gy: y, h: 0 }, { x: x + f * s * (LEG.B + 13), gy: y, h: 0 }];
    if (yj && p >= yj.bas - 1 && p <= yj.bit + 8) {
      // K6 (B3): düzlemde basan yürüyüş — ayaklar zemine basar (kaymaz), kalça iki bacağın erişimine göre iner, arka ayak parmak ucunda
      const W0 = yuruCoz(hz, adimTemas, yj.bas, yj.bit, p, s);
      const amt = interpolate(p, [yj.bas - 1, yj.bas + 4, yj.bit, yj.bit + 8], [0, 1, 1, 0], cl);
      x = W0.x; pz.x = x; pz.lean = 3 * amt;
      const AF = W0.F, AB = W0.B;
      const hedefF = bilekHedef(AF, s, f), hedefB = bilekHedef(AB, s, f);
      // kalça yüksekliği: basılı ayakların erişimi (R = 202.5 birim, dize hafif büküm); salınımdaki ayak kalkışta azalarak, konuşa yakın artarak katılır
      const gerek = (h: P, legX: number) => { const kx = pz.x + f * s * legX; const dx = h[0] - kx, R = R_BACAK * s; return h[1] - Math.sqrt(Math.max(0, R * R - dx * dx)) + 226 * s; };
      const sm = (a: number, b: number, v: number) => { const t = Math.max(0, Math.min(1, (v - a) / (b - a))); return t * t * (3 - 2 * t); };
      const tF = gerek(hedefF, LEG.F), tB = gerek(hedefB, LEG.B);
      const agirlik = (A: AyakD) => (A.basili ? 1 : Math.max(1 - sm(0, 0.35, A.u), sm(0.6, 1, A.u)));
      const taban = AF.basili && AB.basili ? Math.max(tF, tB) : AF.basili ? tF : tB;
      const pzY = Math.max(taban, lerp(taban, tF, agirlik(AF)), lerp(taban, tB, agirlik(AB)));
      pz.y = lerp(pz.y, pzY, amt); pz.bodyY = 0;
      const ikF = bacakIK2(pz, LEG.F, hedefF), ikB = bacakIK2(pz, LEG.B, hedefB);
      pz.thighF = lerp(pz.thighF, ikF.th, amt); pz.kneeF = lerp(pz.kneeF, ikF.kn, amt); pz.footF = lerp(pz.footF ?? 0, AF.a - pz.lean, amt);
      pz.thighB = lerp(pz.thighB, ikB.th, amt); pz.kneeB = lerp(pz.kneeB, ikB.kn, amt); pz.footB = lerp(pz.footB ?? 0, AB.a - pz.lean, amt);
      // kollar bacakların tersine (eller kuşaktan hafif açılır)
      const sw = Math.max(-1, Math.min(1, (AF.x - AB.x) / (0.4 * pxm))) * f;
      pz.shF += 10 * sw * amt; pz.shB -= 10 * sw * amt;
      ayaklar = [{ x: AF.x + f * s * 13, gy: AF.gy, h: AF.h }, { x: AB.x + f * s * 13, gy: AB.gy, h: AB.h }];
    }
    const egil = (hz.jestler ?? []).find((j) => j.ad === "egil" && p >= j.bas - 2 && p <= j.bit + 12);
    if (egil) { const w = interpolate(p, [egil.bas, egil.bas + 14, egil.bit - 8, egil.bit], [0, 1, 1, 0], { ...cl, easing: INOUT }); karis(pz, { lean: Number(egil.ops?.aci ?? 14), lookY: 0.7, headTilt: 9, thighF: -6, kneeF: 8 }, w); }
    // tas-it (K6 B8): ön ayak geri çekilir (bas→temas−2), taşa vurur (temas), bacak UZANARAK taşı dudağa kadar iter (kayma) — ağırlık öne kayar
    // (gövde 0.05 m öne, 5° öne eğilir; arka ayak yerinde kalır: IK), taş öne/sağa devrilir (tasCoz), ayak çekilir ve yere basar (bit−4)
    const tj = (hz.jestler ?? []).find((j) => j.ad === "tas-it");
    if (tj && tasPr && p >= tj.bas && p <= tj.bit + 2) {
      const tc = Number(tj.ops?.temas ?? tasK.surt), kay = tasK.kay, son = tj.bit - 4;
      const dur = ayakUcu(pz, pz.thighF, pz.kneeF, pz.footF ?? 0);
      const bDur = bilekFK(pz, LEG.B, pz.thighB, pz.kneeB);
      const kayma = interpolate(p, [tc - 2, kay, kay + 4, son], [0, 1, 1, 0], { ...cl, easing: INOUT });
      pz.x += f * 0.05 * pxm * kayma; pz.lean = (pz.lean ?? 0) + 5 * kayma;
      pz.y += 0.02 * pxm * kayma; // ağırlık öne: kalça hafif iner (arka bacak erişimi)
      { const ik = bacakIK2(pz, LEG.B, bDur); pz.thighB = ik.th; pz.kneeB = ik.kn; pz.footB = -(pz.lean ?? 0); }
      const tasNoktasi = (q: number): P => { const t = tasCoz(tasPr, q, tasK); return [t.x - 0.48 * tasW, t.y - 0.22 * tasW]; };
      const geri: P = [dur[0] - 0.14 * pxm, dur[1] - 0.12 * pxm];
      let hedef: P, w = 1;
      if (p < tc - 2) { const u = GIRIS(interpolate(p, [tj.bas, tc - 2], [0, 1], cl)); hedef = [lerp(dur[0], geri[0], u), lerp(dur[1], geri[1], u)]; }
      else if (p < tc) { const u = interpolate(p, [tc - 2, tc], [0, 1], { ...cl, easing: (v) => v * v }); const t = tasNoktasi(tc); hedef = [lerp(geri[0], t[0], u), lerp(geri[1], t[1], u)]; }
      else if (p <= kay) hedef = tasNoktasi(p);
      else { const u = interpolate(p, [kay, son], [0, 1], { ...cl, easing: INOUT }); const t = tasNoktasi(kay); hedef = [lerp(t[0], dur[0], u), lerp(t[1] - (u < 0.6 ? 0.06 * pxm * Math.sin(Math.PI * u / 0.6) : 0), dur[1], u)]; w = p > son ? 0 : 1; }
      if (w > 0) { const ik = bacakIK(pz, hedef); pz.thighF = ik.th; pz.kneeF = ik.kn; pz.footF = 0; }
      karis(pz, { shB: -24, elB: -30 }, interpolate(p, [tj.bas, tc, son, tj.bit], [0, 1, 1, 0], cl)); // arka kol dengede açılır
      const tF = ayakUcu(pz, pz.thighF, pz.kneeF, pz.footF ?? 0);
      ayaklar = [{ x: tF[0] - f * 27 * s, gy: y, h: Math.max(0, y - (tF[1] + 5 * s)) }, { x: bDur[0] + f * s * 13, gy: y, h: 0 }];
    }
    return { pz, palet: d.palet, ayak: [x, y], pxm, adimlar: adimTemas.filter((q) => yj && q > yj.bas && q <= yj.bit + 1), ayaklar };
  })() : null;

  // figür filtre/maske bölgesi (dekor px): figürün çevresi ile sınırlı — geniş bölge cs 2'de Chromium'da döşeme/kırpma artefaktı veriyordu
  const fb: [number, number, number, number] = hd ? [hd.ayak[0] - 1.3 * hd.pxm, hd.ayak[1] - 2.4 * hd.pxm, 2.6 * hd.pxm, 2.7 * hd.pxm] : [0, 0, 1, 1];
  // ---- kilit ----
  if (hd) {
    kilit.push({ ad: "hezarfen ayak", p: ekranNokta(k, hd.ayak), tur: "ayak" });
    kilit.push({ ad: "hezarfen yüz", p: ekranNokta(k, [hd.ayak[0] + 0.1 * hd.pxm, hd.ayak[1] - 1.55 * hd.pxm]), tur: "yuz" });
    if (hd.adimlar.some((q) => Math.abs(q - p) <= 1)) kilit.push({ ad: "adım (basma)", p: ekranNokta(k, [hd.ayaklar[0].x, hd.ayaklar[0].gy]), tur: "temas" });
  }
  if (tas) kilit.push({ ad: "taş", p: ekranNokta(k, [tas.x, tas.y]), tur: [tasK.surt, tasK.kay, tasK.yer].some((q) => Math.abs(q - p) <= 1) ? "temas" : "dokunus" });

  // ---- çizim ----
  const kn = (c: string, wd = 4) => ({ stroke: ink(c), strokeWidth: wd, strokeLinejoin: "round" as const });
  const tozPr = param<{ bas: number; bit: number } | null>(plan, "toz", null);
  const kontraKenar = 3 / Math.max(0.5, k.cs); // kenar ışığı ekranda ≈3 px (tasarım 2 px; 360 px'te kayboluyordu)

  const Ana = (
    <g>
      {/* ===== gövde (dikey şerit; dudaktan tabana) ===== */}
      <Govde />
      {/* dip: sokak toprağı + iki ev (kameraya yakın, saçak altı görünür) */}
      <Dip />
      {/* ===== tepe katı + külah ===== */}
      <TepeKati />
      {/* ===== seki üst yüzü (ışıklı) + dudak + çıkıntı ===== */}
      <Seki kn={kn} />
    </g>
  );

  const figur = hd ? (() => {
    const pz = hd.pz;
    const ki = kuklaIsigi(ISIK, hd.ayak, 600 * (pz.scale ?? 1), { murekkep: "#2a2620", kamera: k.cs, seed: S + 41 });
    const kg = kanatGeo(0, pz.lean ?? 0, RIG_BIRIM_M, -400, -122, -56);
    const kanatIsik = 1 - siluet;
    const arka = <>{<KanatCiz pts={kg.uzak} katli={1} isik={kanatIsik} olcekEkran={(pz.scale ?? 1) * k.cs} uzak kat={kg.katli} aile="gun" />}{<KanatCiz pts={kg.yakin} katli={1} isik={kanatIsik} olcekEkran={(pz.scale ?? 1) * k.cs} kat={kg.katli} aile="gun" />}</>;
    // K6 (B2): kanat Kukla'nın `arka` yuvası yerine aynı dönüşümle (pz.x/y · ölçek · bodyY · lean) figürün ARKASINA ayrı çizilir — `arka`
    // yuvasında Chromium bazı karelerde (P08 p216/p240) kanadı hiç boyamıyordu (taban kopyada yok, maskelerde var → "hayalet")
    const s0 = pz.scale ?? 1, f0 = pz.facing ?? 1;
    return <g>
      <g transform={`translate(${pz.x},${pz.y}) scale(${s0 * f0},${s0}) translate(0,${pz.bodyY ?? 0}) rotate(${pz.lean ?? 0},0,-226)`}>{arka}</g>
      <Kukla p={hd.palet} pz={pz} golgesiz isik={ki} />
    </g>;
  })() : null;

  const sahne = (
    <g>
      {Ana}
      {/* gölge: yalnız seki üst yüzünde (sola-kameraya, uzun); K6 B3: çekirdek (keskin siyah elips, "delik") kaldırıldı — temas gölgesi ayak başına */}
      {hd && <g clipPath={`url(#${uid}gy)`}><Golge isik={ISIK} ayak={hd.ayak} h={600 * (hd.pz.scale ?? 1) * 0.9} genislik={100 * (hd.pz.scale ?? 1)} alfa={0.5} stil="gravur" cekirdek={false} seed={S + 7} /></g>}
      {/* Hezarfen + kontra siluet + kenar ışığı (güneş sağda) */}
      {/* K6 (B3): her ayağın altında yumuşak temas gölgesi (iki eş merkezli basık elips; ayak kalktıkça küçülür/silinmez — yükseklikle orantılı) */}
      {hd && hd.ayaklar.map((a, i) => { const w = Math.max(0, 1 - a.h / (0.08 * hd.pxm)); if (w <= 0) return null; const rx = 0.13 * hd.pxm * (0.7 + 0.3 * w); return <g key={i} opacity={w}>
        <ellipse cx={a.x} cy={a.gy - 1} rx={rx} ry={0.028 * hd.pxm} fill="#2a2620" opacity={0.18} />
        <ellipse cx={a.x} cy={a.gy - 1} rx={rx * 0.65} ry={0.017 * hd.pxm} fill="#2a2620" opacity={0.28} />
      </g>; })}
      {/* K6 (B2): siluet ve kenar ışığı SVG filtresi yerine ALFA MASKESİYLE (figürün kendi alfası) — filtre bölgesi Chromium'da bazı karelerde arka
          katmanları (kanat, arka kol) düşürüp yarı saydam "hayalet" bırakıyordu. Kanat her karede opak; durum değişimi yok. */}
      {figur && <g>
        {figur}
        {siluet > 0 && <rect x={fb[0]} y={fb[1]} width={fb[2]} height={fb[3]} fill={siluet >= 0.5 ? "#383b2e" : R.kontra} opacity={siluet} mask={`url(#${uid}fa)`} />}
        <rect x={fb[0]} y={fb[1]} width={fb[2]} height={fb[3]} fill={R.kenar} mask={`url(#${uid}km)`} />
      </g>}
      {/* taş (dudakta figürün 0.02 m önünde → onu örter; düşerken gövdenin önünde; yerde iki çatı arasındaki sokakta) */}
      {tas && <TasCiz d={tas} w={tasW} />}
      {tas && tozPr && p >= tozPr.bas && <Toz x={tasCoz(tasPr, tasK.yer, tasK).x} y={GT.tasYer} p={p - tozPr.bas} sekme={temas("tas-sekme", tasK.yer + 10) - tozPr.bas} />}
    </g>
  );

  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <RenkKaydi>
        {/* ===== uzak katmanlar (f 0) ===== */}
        <g transform={katDonusum(k, 0)}><Gok /></g>
        <g transform={katDonusum(k, 0.35)}><Sehir /></g>
        {/* hızlı vinç dönüşü (p166–200): şeridin 2 iz kopyası α .25 (kamera hareketi, fade değil) */}
        {Math.abs(hiz) > 40 && [-0.5, 0.5].map((f, i) => <g key={i} opacity={0.25} transform={`translate(0,${-hiz * f})`}><g transform={katDonusum(k, 1)}><Govde /></g></g>)}
        <g transform={katDonusum(k, 1)}>
          <defs>
            {/* gölge yalnız güneşe açık seki + çıkıntı üst yüzüne düşer; dudaktan aşağısı (gövde yüzü) kontra ışıkta zaten gölgede → görünmez */}
            <clipPath id={`${uid}gy`}><polygon points={poly(sekiYuz())} /><rect x={GT.cikinti[0]} y={CIKINTI_UST} width={GT.cikinti[1] - GT.cikinti[0]} height={GT.dudak - CIKINTI_UST} /></clipPath>
            {hd && <>
              <mask id={`${uid}fa`} maskUnits="userSpaceOnUse" x={fb[0]} y={fb[1]} width={fb[2]} height={fb[3]} style={{ maskType: "alpha" }}>{figur}</mask>
              {/* aynı maske iki yerden (siluet + kenar) kullanılınca Chromium arka katmanları düşürüyordu → kenar için ayrı kopya */}
              <mask id={`${uid}fa3`} maskUnits="userSpaceOnUse" x={fb[0]} y={fb[1]} width={fb[2]} height={fb[3]} style={{ maskType: "alpha" }}>{figur}</mask>
              <mask id={`${uid}fa2`} maskUnits="userSpaceOnUse" x={fb[0]} y={fb[1]} width={fb[2]} height={fb[3]} style={{ maskType: "alpha" }}><g transform={`translate(${-kontraKenar},${kontraKenar * 0.4})`}>{figur}</g></mask>
              <mask id={`${uid}km`} maskUnits="userSpaceOnUse" x={fb[0]} y={fb[1]} width={fb[2]} height={fb[3]}>
                <rect x={fb[0]} y={fb[1]} width={fb[2]} height={fb[3]} fill="#ffffff" mask={`url(#${uid}fa3)`} />
                <rect x={fb[0]} y={fb[1]} width={fb[2]} height={fb[3]} fill="#000000" mask={`url(#${uid}fa2)`} />
              </mask>
            </>}
          </defs>
          {sahne}
        </g>
      </RenkKaydi>
    </svg>
  );
};

// ---------------- katmanlar ----------------
const Gok: React.FC = () => (
  <g>
    <rect x={-2000} y={-3000} width={5000} height={3380} fill={R.gok[0]} />
    <rect x={-2000} y={380} width={5000} height={260} fill={R.gok[1]} />
    <rect x={-2000} y={640} width={5000} height={200} fill={R.gok[2]} />
    {/* güneş parlaması: iki düz basamak (radyal gradyan yok), disk yok */}
    <path d="M 960 829 Q 990 560 1180 520 Q 1330 500 1400 600 L 1400 829 Z" fill={R.parlama} opacity={0.18} />
    <path d="M 1050 829 Q 1075 650 1200 625 Q 1310 610 1400 680 L 1400 829 Z" fill={R.parlama} opacity={0.4} />
    {/* Asya kıyısı (tek ton, alçak tepeler) + Boğaz şeridi + güneş yolu kıvılcımları */}
    <path d="M -2000 829 L -2000 812 Q 500 806 700 806 Q 820 790 940 800 Q 1060 786 1180 798 Q 1300 790 3000 805 L 3000 829 Z" fill={R.asya} />
    <rect x={-2000} y={829} width={5000} height={41} fill={R.bogaz} />
    {Array.from({ length: 9 }).map((_, i) => <rect key={i} x={960 + rnd(S, `gy${i}`) * 140} y={834 + i * 4} width={14 + rnd(S, `gw${i}`) * 26} height={2} fill={R.bogazIsik} opacity={0.85} />)}
  </g>
);
// ---------------- K6 aşağıdaki şehir (mekanlar R4 §2.3b, B1): bölge 1 tek ton pus, bölge 2 elle yerleştirilmiş 3 öbek + sokak yarıkları ----------------
// Ev (yukarıdan ≈18°): ön eğim yamuğu (sırttan saçağa 0.28 w, saçakta 0.05 w taşar) gölgede #4e3a2e, sağ kalça üçgeni (0.22 w) ışıklı #6e5240,
// saçak gölge bandı 6 px #3e2e24, ön (+ sol yan) duvar #5e5040. Kontur yalnız çatı dış kenarı 3 px + sırt çizgisi. Satır/ızgara üretimi YOK.
type Ev = { x: [number, number]; sirt: number; duvar: number };
const EVLER: Ev[] = [
  { x: [700, 850], sirt: 1092, duvar: 0.3 },   // A1 (çıkıntının arkasından sırt + kalça ucu)
  { x: [1085, 1300], sirt: 1100, duvar: 0.3 }, // C1
  { x: [930, 1050], sirt: 1118, duvar: 0.3 },  // B1
  { x: [945, 1105], sirt: 1208, duvar: 0.45 }, // B2 (3 kat)
  { x: [1068, 1308], sirt: 1290, duvar: 0.3 }, // gövde sağında aşağı sürer (x > 1060)
  { x: [1062, 1302], sirt: 1470, duvar: 0.3 },
  { x: [1070, 1310], sirt: 1650, duvar: 0.3 },
];
const EvCiz: React.FC<{ e: Ev }> = ({ e }) => {
  const [x0, x1] = e.x, w = x1 - x0, cx = (x0 + x1) / 2, sy = e.sirt, sc = sy + 0.28 * w;
  const xa = x0 - 0.05 * w, xb = x1 + 0.05 * w, sL: P = [cx - 0.25 * w, sy], sR: P = [cx + 0.25 * w, sy];
  const on: P[] = [sL, sR, [xb - 0.22 * w, sc], [xa + 0.22 * w, sc]], sag: P[] = [sR, [xb, sc], [xb - 0.22 * w, sc]], sol: P[] = [sL, [xa + 0.22 * w, sc], [xa, sc]];
  const dis: P[] = [sL, sR, [xb, sc], [xa, sc]];
  return <g>
    <rect x={x0} y={sc + 6} width={w} height={e.duvar * w} fill="#5e5040" />
    <rect x={xa + 4} y={sc} width={xb - xa - 8} height={6} fill="#3e2e24" />
    <polygon points={poly(on)} fill="#4e3a2e" />
    <polygon points={poly(sol)} fill="#4a3628" />
    <polygon points={poly(sag)} fill="#6e5240" />
    <polygon points={poly(dis)} fill="none" stroke={ink("#4e3a2e")} strokeWidth={3} strokeLinejoin="round" />
    <line x1={sL[0]} y1={sy} x2={sR[0]} y2={sy} stroke={ink("#4e3a2e")} strokeWidth={2.5} />
  </g>;
};
const Sehir: React.FC = () => {
  // bölge 1: kıyı çizgisi y 870 ± 3 (seed 138), altı tek ton pus #a49c90 — kutu/çizgi/gradyan yok
  const kiyi: P[] = Array.from({ length: 41 }).map((_, i) => [-2000 + i * 125, 870 + (rnd(138, `k${i}`) - 0.5) * 6] as P);
  return <g>
    <polygon points={poly([...kiyi, [3000, 4000], [-2000, 4000]])} fill={R.sehirPus} />
    {/* bölge 2 (y ≥ 1120, x ≥ 690): ev kütlesi — gölgede ev duvarları tek ton; aralar sokak yarığı */}
    <polygon points={poly([[690, 1150], [860, 1128], [930, 1140], [1100, 1126], [3000, 1126], [3000, 4000], [690, 4000]])} fill="#5e5040" />
    {EVLER.slice(0, 3).map((e, i) => <EvCiz key={i} e={e} />)}
    {/* S2 enine yarık (B1 duvarı ile B2 sırtı arası), sol ucu S1'e bağlanır */}
    <polygon points={poly([[905, 1194], [1110, 1194], [1110, 1208], [900, 1210]])} fill="#4e3a2e" />
    {EVLER.slice(3).map((e, i) => <EvCiz key={i} e={e} />)}
    {/* S1 çapraz yarık: (915, 1264) → (880, 1100), 18 → 10 px, ufuk noktasına doğru sola yatar */}
    <polygon points={poly([[906, 1264], [924, 1264], [885, 1100], [875, 1100]])} fill="#4e3a2e" />
  </g>;
};
// taş sıraları (düz gölge tonu + derz + her 4. sıra koyu + her 9. blokta kırık köşe). egri: silindir yasası (a 400) + bloklar uçlarda × √(1 − u²)
const Siralar: React.FC<{ x: [number, number]; y: [number, number]; h: number; pxm: number; seed: number; koyuSira?: boolean; sagEgri?: number; egri?: boolean }> = ({ x, y, h, pxm, seed, koyuSira, sagEgri = 0, egri }) => {
  const E = (q: P): P => (egri ? W(q) : q);
  const out: React.ReactNode[] = [];
  const n = Math.ceil((y[1] - y[0]) / h);
  let blok = 0;
  for (let r = 0; r < n; r++) {
    const y0 = y[0] + r * h, y1 = Math.min(y[1], y0 + h);
    const ton = koyuSira && r % 4 === 3 ? R.tasKoyu : tonla(R.tasGolge, (rnd(seed, `r${r}`) - 0.5) * 0.05);
    out.push(egri ? <polygon key={`s${r}`} points={poly([...Wp([x[0], y0], [x[1], y0], 32), ...Wp([x[1], y1], [x[0], y1], 32)])} fill={ton} /> : <rect key={`s${r}`} x={x[0]} y={y0} width={x[1] - x[0]} height={y1 - y0} fill={ton} />);
    let xx = x[0] - rnd(seed, `o${r}`) * 0.6 * pxm;
    while (xx < x[1]) {
      let bw = (0.5 + rnd(seed, `b${r}-${xx | 0}`) * 0.4) * pxm;
      if (egri) { const u = Math.max(-1, Math.min(1, (xx - EKSEN) / 400)); bw *= Math.max(0.35, Math.sqrt(1 - u * u)); }
      else if (sagEgri > 0 && xx > x[1] - sagEgri) bw *= Math.max(0.35, (x[1] - xx) / sagEgri);
      xx += bw;
      if (xx < x[1] - 4) { const a = E([xx, y0]), b = E([xx, y1]); out.push(<line key={`d${r}-${blok}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={R.derz} strokeWidth={2} strokeOpacity={0.55} />); }
      if (++blok % 9 === 0 && xx < x[1] - 30) out.push(<polygon key={`k${r}-${blok}`} points={poly(([[xx - 2, y0 + 2], [xx - 2 - 0.12 * pxm, y0 + 2], [xx - 2, y0 + 0.1 * pxm]] as P[]).map(E))} fill={R.derz} opacity={0.5} />);
    }
    out.push(egri ? <polyline key={`h${r}`} points={poly(Wp([x[0], y1], [x[1], y1], 32))} fill="none" stroke={R.derz} strokeWidth={2} strokeOpacity={0.55} /> : <line key={`h${r}`} x1={x[0]} y1={y1} x2={x[1]} y2={y1} stroke={R.derz} strokeWidth={2} strokeOpacity={0.55} />);
  }
  return <g>{out}</g>;
};
const Govde: React.FC = () => {
  const [x0, x1] = GT.govdeX;
  return <g>
    <Siralar x={[x0, x1]} y={[GT.dudak, GT.govdeTaban]} h={GT.sira} pxm={GT.pxm} seed={S + 1} koyuSira sagEgri={260} />
    {/* sağ uç: silindir terminatörü (II, 60 px) + güneşe bakan ışıklı şerit */}
    <Tarama sekil={[[x1 - 90, GT.dudak], [x1 - 30, GT.dudak], [x1 - 30, GT.govdeTaban], [x1 - 90, GT.govdeTaban]]} basamak="II" aci={60} renk={R.derz} derinlik="orta" seed={S + 2} />
    <rect x={x1 - 30} y={GT.dudak} width={30} height={GT.govdeTaban - GT.dudak} fill={R.tas} />
    <line x1={x1} y1={GT.dudak} x2={x1} y2={GT.govdeTaban} stroke={ink(R.tas)} strokeWidth={4} />
  </g>;
};
// ---------------- K6 dip = sokak ağzı, taşın ölçeğinde (255 px/m; mekanlar R4 §2.4, B5) ----------------
// Tek nokta perspektif VP (670, 3152) [p148 kamerasının merkezi, göz sokaktan 1.6 m]; evlerin her yatay kenarı VP doğrusu üzerinde.
// Kuleye dayalı iki ev: duvar köşesi (kule düzlemi) x 471 / 934, saçak ucu x 560 / 845 (0.35 m taşar). Subasman 0–0.9 m (3560–3330),
// ahşap gövde 0.9–5.4 m (3330–2183), alın tahtası 2145–2183, saçak altı #4e3a2e. Çatı yüzü görünmez (kamera saçak altında).
const VP: P = [670, 3152];
const vpN = (q: P, t: number): P => [VP[0] + (q[0] - VP[0]) * t, VP[1] + (q[1] - VP[1]) * t];
const Dip: React.FC = () => {
  // VP doğruları p148 kadrajının kenarına (d x 400 / 940) kadar uzar (mekanlar §2.4 tablo "kadraj kenarına uzantı"); ötesi çizilmez
  const tKenar = (xk: number) => (xk < VP[0] ? (400 - VP[0]) / (xk - VP[0]) : (940 - VP[0]) / (xk - VP[0]));
  const duvar = (xk: number, sol: boolean) => {
    const T = tKenar(xk);
    const ust: P = [xk, 2183], alt: P = [xk, GT.govdeTaban], sub: P = [xk, 3330];
    const yuz = (a: P, b: P, renk: string, k?: string) => <polygon key={k} points={poly([a, b, vpN(b, T), vpN(a, T)])} fill={renk} />;
    return <g>
      {yuz(ust, alt, "#5e5040")}
      {yuz(sub, alt, "#6a6252")}
      {sol && yuz([xk, 2336], ust, "#8a7660")}
      {/* 0.25 m aralıklı yatay tahta çizgileri (VP doğruları) α .25 */}
      {Array.from({ length: 18 }).map((_, i) => { const y = 3330 - 64 * (i + 1); if (y <= 2190) return null; const a: P = [xk, y], b = vpN(a, T); return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#3e2e24" strokeWidth={1.5} strokeOpacity={0.25} />; })}
      <line x1={xk} y1={2183} x2={xk} y2={GT.govdeTaban} stroke={ink("#5e5040")} strokeWidth={4} />
      <line x1={sub[0]} y1={sub[1]} x2={vpN(sub, T)[0]} y2={vpN(sub, T)[1]} stroke={ink("#6a6252")} strokeWidth={3} />
    </g>;
  };
  const sacak = (xk: number, xu: number) => {
    const T = tKenar(xk);
    const d0: P = [xk, 2183], u0: P = [xu, 2183], u1: P = [xu, 2145];
    return <g>
      <polygon points={poly([d0, u0, vpN(u0, T), vpN(d0, T)])} fill="#4e3a2e" />
      <polygon points={poly([u1, u0, vpN(u0, T), vpN(u1, T)])} fill="#3e2e24" stroke={ink("#3e2e24")} strokeWidth={3} strokeLinejoin="round" />
    </g>;
  };
  const zSol = (y: number) => VP[0] + (471 - VP[0]) * ((y - VP[1]) / (GT.govdeTaban - VP[1])), zSag = (y: number) => VP[0] + (934 - VP[0]) * ((y - VP[1]) / (GT.govdeTaban - VP[1]));
  return <g>
    {/* sokak zemini (sıkıştırılmış toprak, gölgede) + kule taban çizgisi */}
    <rect x={-1200} y={GT.govdeTaban} width={3600} height={2400} fill="#7a6c52" />
    <line x1={-1200} y1={GT.govdeTaban} x2={1060} y2={GT.govdeTaban} stroke={ink(R.tasGolge)} strokeWidth={5} />
    <rect x={-1200} y={GT.govdeTaban} width={2260} height={8} fill="#4e473f" opacity={0.5} />
    {/* 4 kırık enine çizgi (perspektif aralık) + 3 çakıl */}
    {[3621, 3703, 3825, 4009].map((y, i) => { const a = zSol(y) + 10, b = zSag(y) - 10, m = lerp(a, b, 0.35 + 0.3 * rnd(141, `z${i}`)); return <g key={i} stroke="#4e3a2e" strokeWidth={2} strokeOpacity={0.25}><line x1={a} y1={y} x2={m - 14} y2={y + 2} /><line x1={m + 10} y1={y + 1} x2={b} y2={y - 1} /></g>; })}
    {/* 3 küçük çakıl (14–22 px): düzensiz basık beşgen, taş tonundan ayrı #6a6252, alt kenarı bir ton koyu (kontur halkası yok: "vida/delik" okunmasın) */}
    {[[600, 3660, 18], [690, 3900, 22], [880, 3720, 14]].map(([x, y, r], i) => { const cx = x + (rnd(141, `c${i}`) - 0.5) * 20; const pts = Array.from({ length: 6 }).map((_, j) => { const a = (j / 6) * Math.PI * 2 + rnd(141, `a${i}${j}`) * 0.5; const rr = (r / 2) * (0.75 + 0.35 * rnd(141, `r${i}${j}`)); return [cx + Math.cos(a) * rr, y + Math.sin(a) * rr * 0.55] as P; }); return <g key={i}><polygon points={poly(pts.map(([a, b]) => [a, b + 2] as P))} fill="#4e473f" opacity={0.6} /><polygon points={poly(pts)} fill="#6a6252" /></g>; })}
    {duvar(471, true)}{duvar(934, false)}
    {sacak(471, 560)}{sacak(934, 845)}
  </g>;
};
const kemerYol = (x0: number, x1: number, tepe: number, taban: number, n = 18): P[] => {
  const r = (x1 - x0) / 2, cx = (x0 + x1) / 2, uz = tepe + r;
  const pts: P[] = [[x0, taban], [x0, uz]];
  for (let i = 1; i < n; i++) { const a = Math.PI - (i / n) * Math.PI; pts.push([cx + r * Math.cos(a), uz - r * Math.sin(a)]); }
  pts.push([x1, uz], [x1, taban]);
  return pts;
};
const TepeKati: React.FC = () => {
  const [x0, x1] = GT.duvarX, dp = GT.duvarPxm;
  const [kx0, kx1] = GT.kapi.x, [sx0, sx1] = GT.sagAciklik.x;
  // K6 (B9): külah = düz koni, apeks (300, −1260) kadraj üstünde; saçak ∩ kavisi (a 460, sağ uç 760/593). Işıklı yüz tabanda x 419–760,
  // apekse daralan geniş şerit; terminatörün gölge yanında 30 px II. Dikişler apekse TAM BOY yelpaze (φ −40…+88°, 4.93° adım). Sırt çizgisi yok.
  const apeks: P = [EKSEN, -1260];
  const [kb0, kb1] = GT.kulahTaban;
  const sac = (x: number): P => W([x, GT.sacak], a_SACAK);
  const sacakEgri = Wp([kb0, GT.sacak], [kb1, GT.sacak], 48, a_SACAK);
  const isikX = 419;
  const isikYuz = [...sacakEgri.filter((q) => q[0] > isikX), apeks];
  const dikis = Array.from({ length: 27 }).map((_, i) => -40 + i * 4.93).filter((ph) => ph <= 88.5).map((ph) => EKSEN + 460 * Math.sin((ph * Math.PI) / 180));
  const duvarUst = Wp([x0, GT.tepeUst], [x1, GT.tepeUst], 32), duvarAlt = Wp([x1, GT.duvarDip], [x0, GT.duvarDip], 32);
  const kx = [x0 - 40, x1 + 30] as const;
  const kornis = [...Wp([kx[0], GT.kornis[0]], [kx[1], GT.kornis[0]], 32, a_KORNIS), ...Wp([kx[1], GT.kornis[1]], [kx[0], GT.kornis[1]], 32, a_KORNIS)];
  const kornisAlt = [...Wp([kx[0], GT.kornis[1] - 26], [kx[1], GT.kornis[1] - 26], 32, a_KORNIS), ...Wp([kx[1], GT.kornis[1]], [kx[0], GT.kornis[1]], 32, a_KORNIS)];
  const kornisUstIsik = [...Wp([kx[0], GT.kornis[0]], [kx[1], GT.kornis[0]], 32, a_KORNIS), ...Wp([kx[1], GT.kornis[0] + 12], [kx[0], GT.kornis[0] + 12], 32, a_KORNIS)];
  const kornisSag = [...Wp([600, GT.kornis[0]], [kx[1], GT.kornis[0]], 8, a_KORNIS), ...Wp([kx[1], GT.kornis[1]], [600, GT.kornis[1]], 8, a_KORNIS)];
  return <g>
    <KonturTitreme derinlik="orta" seed={S + 9}>
      {/* duvar: düz gölge tonu, taş sıraları 0.45 m (silindir yasası, bloklar uçlarda daralır) */}
      <Siralar x={[x0, x1]} y={[GT.tepeUst, GT.duvarDip]} h={0.45 * dp} pxm={dp} seed={S + 3} egri />
      <polyline points={poly(duvarAlt)} fill="none" stroke={ink(R.tasGolge)} strokeWidth={4} />
      {/* terminatör II x 560–600 + ışıklı #9a8f7e x 600–700 (güneş azimutundan; mekanlar §2.3a) */}
      <Tarama sekil={[...Wp([560, GT.tepeUst], [600, GT.tepeUst], 4), ...Wp([600, GT.duvarDip], [560, GT.duvarDip], 4)]} basamak="II" aci={60} renk={R.derz} derinlik="orta" seed={S + 4} />
      <polygon points={poly([...Wp([600, GT.tepeUst], [700, GT.tepeUst], 8), ...Wp([700, GT.duvarDip], [600, GT.duvarDip], 8)])} fill={R.tas} />
      {Array.from({ length: Math.ceil((GT.duvarDip - GT.tepeUst) / (0.45 * dp)) }).map((_, r) => { const y = GT.tepeUst + (r + 1) * 0.45 * dp; return y < GT.duvarDip ? <polyline key={r} points={poly(Wp([600, y], [700, y], 8))} fill="none" stroke={R.derz} strokeWidth={2} strokeOpacity={0.45} /> : null; })}
      <line x1={x1} y1={W([x1, GT.kornis[1]])[1]} x2={x1} y2={W([x1, GT.duvarDip])[1]} stroke={ink(R.tas)} strokeWidth={4} />
      {/* kemerli açıklıklar (yarım daire): içi koyu, kemer içinde III + ton; eşik ve kemer kavisi izler */}
      {[[kx0, kx1, GT.kapi.tepe], [sx0, sx1, GT.sagAciklik.tepe]].map(([a, b, t], i) => {
        const yol = kemerYol(a, b, t, GT.duvarDip).map((q) => W(q));
        const ic = kemerYol(a, b, t, GT.duvarDip).slice(1, -1).concat([[b - 26, t + (b - a) / 2], [a + 26, t + (b - a) / 2]] as P[]).map((q) => W(q));
        return <g key={i}>
          <polygon points={poly(yol)} fill={R.aciklik} stroke={ink(R.tasGolge)} strokeWidth={5} strokeLinejoin="round" />
          <Tarama sekil={ic} basamak="III" aci={60} renk="#1c1a16" derinlik="orta" seed={S + 10 + i} />
        </g>;
      })}
      {/* korniş (0.3 m, a 430, sağ uç 730; üst kenarı 12 px ışık, altında II; x ≥ 600 ışık tonu) */}
      <polygon points={poly(kornis)} fill={R.tasGolge} stroke={ink(R.tasGolge)} strokeWidth={4} strokeLinejoin="round" />
      <polygon points={poly(kornisUstIsik)} fill={tonla(R.tasGolge, 0.18)} />
      <polygon points={poly(kornisSag)} fill={R.tas} />
      <Tarama sekil={kornisAlt} basamak="II" aci={60} renk={R.derz} derinlik="orta" seed={S + 12} />
      {/* saçak altı: saçak kavisi (a 460) ile korniş üstü (a 430) arası koyu bant */}
      <polygon points={poly([...sacakEgri, ...Wp([kb1, GT.kornis[0]], [kb0, GT.kornis[0]], 48, a_KORNIS)])} fill={R.derz} />
      {/* külah: gölge yüzü + ışıklı geniş yüz + terminatör II + dikiş yelpazesi */}
      <polygon points={poly([...sacakEgri, apeks, [kb0 - 2000, apeks[1]], [kb0 - 2000, GT.sacak]])} fill={R.kursun} />
      <polygon points={poly(isikYuz)} fill={R.kursunIsik} />
      <Tarama sekil={[sac(isikX - 30), sac(isikX), apeks]} basamak="II" aci={60} renk="#5e6268" derinlik="orta" seed={S + 13} />
      {dikis.map((x, i) => { const b0 = sac(x); return <line key={i} x1={b0[0]} y1={b0[1]} x2={apeks[0]} y2={apeks[1]} stroke={x > isikX ? "#c2c6c6" : "#5e6268"} strokeWidth={1.8} strokeOpacity={0.35} />; })}
      <polyline points={poly([...sacakEgri, apeks])} fill="none" stroke={ink(R.kursun)} strokeWidth={4} strokeLinejoin="round" />
      <polyline points={poly(duvarUst)} fill="none" stroke={ink(R.tasGolge)} strokeWidth={3} />
    </KonturTitreme>
  </g>;
};
// seki üst yüzü: arka kenar = duvar dibi kavisi (a 400), ön kenar = dudak kavisi (a 560, A 100); sağda halka siluetine (860) döner
const sekiYuz = (): P[] => [...Wp([GT.seki[0], GT.duvarDip], [700, GT.duvarDip], 32), [860, dudakY(860)], ...Wp([860, GT.dudak], [GT.seki[0], GT.dudak], 40, a_DUDAK, A_DUDAK)];
const CIKINTI_UST = 1100;
const Seki: React.FC<{ kn: (c: string, w?: number) => object }> = ({ kn }) => {
  const [c0, c1] = GT.cikinti;
  const dudak = Wp([GT.seki[0], GT.dudak], [900, GT.dudak], 40, a_DUDAK, A_DUDAK);
  return <KonturTitreme derinlik="orta" seed={S + 15}>
    {/* dudak kavisi ile gövde üst sırası (1264) arasındaki dolgu: gövde taşı */}
    <polygon points={poly([...dudak, [900, GT.dudak + 2], [GT.seki[0], GT.dudak + 2]])} fill={R.tasGolge} />
    {/* üst yüz: güneşe açık yatay taş levha (bir ton açık), 3 levha derzi; ön dudak ışık çizgisi */}
    <polygon points={poly(sekiYuz())} fill={R.sekiUst} {...kn(R.sekiUst, 3)} />
    {[-120, 260, 560].map((x, i) => { const a = W([x, GT.duvarDip]); return <line key={i} x1={a[0]} y1={a[1]} x2={x - 18} y2={dudakY(x - 18)} stroke={R.derz} strokeWidth={2} strokeOpacity={0.55} />; })}
    <polyline points={poly(dudak.filter((q) => q[0] <= 860))} fill="none" stroke={tonla(R.sekiUst, 0.16)} strokeWidth={5} />
    {/* çıkıntı: düz levha (kavis almaz) — üst yüz 1100 → 1264, ön yüz 0.14 m + tek sade taş konsol */}
    <rect x={c0} y={CIKINTI_UST} width={c1 - c0} height={GT.dudak - CIKINTI_UST} fill={R.sekiUst} {...kn(R.sekiUst, 3)} />
    <rect x={c0} y={GT.dudak - 5} width={c1 - c0} height={5} fill={tonla(R.sekiUst, 0.16)} />
    <rect x={c0} y={GT.dudak} width={c1 - c0} height={36} fill={R.tasGolge} {...kn(R.tasGolge, 4)} />
    <rect x={c1 - 10} y={GT.dudak} width={10} height={36} fill={R.tas} />
    <polygon points={poly([[GT.konsol[0], GT.dudak + 36], [GT.konsol[1], GT.dudak + 36], [GT.konsol[1] - 8, GT.dudak + 100], [GT.konsol[0] + 14, GT.dudak + 100]])} fill={R.tasGolge} {...kn(R.tasGolge, 4)} />
    <Tarama sekil={[[GT.konsol[0], GT.dudak + 36], [GT.konsol[1], GT.dudak + 36], [GT.konsol[1] - 8, GT.dudak + 100], [GT.konsol[0] + 14, GT.dudak + 100]]} basamak="II" aci={60} renk={R.derz} derinlik="orta" seed={S + 16} />
    <rect x={c0} y={GT.dudak + 36} width={c1 - c0} height={10} fill={R.derz} opacity={0.55} />
  </KonturTitreme>;
};
// ---------------- K6 toz (E4, mekanlar R4 §2.4, B5): 4 (+1 sekmede) düzensiz 6 loblu öbek, yerde kalır; halka/elips/beyaz yok ----------------
// dx, r dekor (taşın çarpma x'ine göre). p0–8: 0.3r → r, yükselir; p8–28: yere iner (dy → −0.3r), basıklaşır (ry ×0.55), yayılır (rx ×1.25); sonra sabit.
const TOZ_OBEK: { dx: number; r: number; tepe: number; gec?: boolean }[] = [{ dx: -40, r: 12, tepe: -24 }, { dx: -22, r: 18, tepe: -32 }, { dx: 8, r: 20, tepe: -28 }, { dx: 36, r: 12, tepe: -18 }, { dx: 30, r: 9, tepe: -12, gec: true }];
const Toz: React.FC<{ x: number; y: number; p: number; sekme: number }> = ({ x, y, p, sekme }) => (
  <g>
    {TOZ_OBEK.map((o, i) => {
      const q = o.gec ? p - sekme : p; if (q < 0) return null;
      const buyu = interpolate(q, [0, 8], [0.3, 1], { ...cl, easing: GIRIS }), in_ = interpolate(q, [8, 28], [0, 1], { ...cl, easing: INOUT });
      const r = o.r * buyu, dy = lerp(o.tepe * Math.min(1, q / 8), -0.3 * o.r, in_), sx = 1.3 * lerp(1, 1.25, in_), sy = lerp(1, 0.55, in_);
      const cx = x + o.dx, cy = y + dy;
      // 6 loblu tırtıklı bulut: lob yarıçapı 0.35 r, merkez çemberi üstünde (seed 140)
      const lob = Array.from({ length: 6 }).map((_, j) => { const a = (j / 6) * Math.PI * 2 + rnd(140, `a${i}${j}`) * 0.6; const rr = r * (0.62 + 0.18 * rnd(140, `r${i}${j}`)); return [cx + Math.cos(a) * rr * sx, cy + Math.sin(a) * rr * sy, 0.35 * r * (1 + 0.3 * rnd(140, `l${i}${j}`))] as [number, number, number]; });
      return <g key={i} opacity={0.75}>
        <ellipse cx={cx} cy={cy} rx={0.72 * r * sx} ry={0.72 * r * sy} fill="#8e8a80" />
        {lob.map(([lx, ly, lr], j) => <ellipse key={j} cx={lx} cy={ly} rx={lr * sx} ry={lr * sy} fill={ly < cy ? "#a9a69c" : "#8e8a80"} />)}
      </g>;
    })}
  </g>
);

const arsiv = () => "gunduzMineral" as const;
export const GALATA_TEPE: Sablon = { Sahne, arsiv };
void CIKIS; void Golge;
