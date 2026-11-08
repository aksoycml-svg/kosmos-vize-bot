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
import { Kukla, Poz, yuru as yuruDongu } from "../../../rig/Kukla";
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
// Silindir eğriliği (tepe katı, R ≈ 6 m; en yakın nokta x −178, sağ siluet x 700): göz hizasının (829) üstündeki yatay çizgiler siluete doğru
// AŞAĞI, altındakiler YUKARI kıvrılır (yakın kısım ufuktan uzak). Stilize genlik 50 px (gerçek ≈ 2×; kukla dekoru).
export const W = (q: P): P => { const u = Math.max(-1, Math.min(1, (q[0] + 178) / 878)); const A = (50 * (GT.ufuk - q[1])) / (GT.ufuk - GT.sacak); return [q[0], q[1] + A * u * u]; };
const Wp = (a: P, b: P, n = 16): P[] => Array.from({ length: n + 1 }).map((_, i) => W([lerp(a[0], b[0], i / n), lerp(a[1], b[1], i / n)]));

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
  if (p < kay) { const u = (p - surt) / (kay - surt); return { x: lerp(x0, x0 + 16, u), y: lerp(y0, GT.dudak - 2, u), aci: 4 * u, yerde: false, dustu: false }; }
  if (p < dus) { const u = (p - kay) / (dus - kay); return { x: x0 + 16 + 3 * u, y: lerp(GT.dudak - 2, yKenar, u), aci: 4 + 22 * u, yerde: false, dustu: false }; }
  const g = (2 * (yYer - yKenar)) / (yer - dus) ** 2;
  if (p < yer) { const t = p - dus; return { x: lerp(x0 + 19, xSon, t / (yer - dus)), y: yKenar + 0.5 * g * t * t, aci: 26 + 9 * t, yerde: false, dustu: true }; }
  const aciYer = 26 + 9 * (yer - dus), otur = Math.round(aciYer / 72) * 72 + 8;
  const t = p - yer;
  const sek = t < 10 ? 16 * Math.sin((Math.PI * t) / 10) : 0;
  return { x: xSon + Math.min(t, 10) * 0.8, y: yYer - sek, aci: lerp(aciYer, otur, Math.min(1, t / 10)), yerde: true, dustu: true };
};
const TAS_PTS: P[] = [[-0.5, 0], [-0.46, -0.52], [-0.12, -0.78], [0.34, -0.66], [0.5, -0.12], [0.3, 0.02]]; // birim (genişlik 1), taban y 0
const TasCiz: React.FC<{ d: TasDurum; w: number }> = ({ d, w }) => {
  // döndürme taş merkezinde (taban üstü 0.38 w); çizim tabanı d.y'ye oturur
  const c: P = [d.x, d.y - 0.38 * w];
  const rot = (q: P): P => { const a = (d.aci * Math.PI) / 180, x = q[0] * w, y = q[1] * w + 0.38 * w; return [c[0] + x * Math.cos(a) - y * Math.sin(a), c[1] + x * Math.sin(a) + y * Math.cos(a)]; };
  const pts = TAS_PTS.map(rot);
  const kirik = ([[0.34, -0.66], [0.5, -0.12], [0.18, -0.3]] as P[]).map(rot); // açık kırık yüz (ışığa bakan sağ-üst)
  const golge = ([[-0.5, 0], [-0.46, -0.52], [-0.2, -0.4], [-0.1, 0.01]] as P[]).map(rot);
  return <g>
    <polygon points={poly(pts)} fill={R.tas} stroke={ink(R.tas)} strokeWidth={Math.max(2.5, w * 0.035)} strokeLinejoin="round" />
    <polygon points={poly(golge)} fill={R.tasGolge} />
    <polygon points={poly(kirik)} fill={R.tasKirik} />
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
  const siluet = param<number | undefined>(plan, "siluet", undefined) ?? (isikAd.includes("siluet") ? 0.94 : 0.3);
  const hz = (plan.karakterler ?? []).find((c) => c.kim === "hezarfen");
  type HD = { pz: Poz; palet: ReturnType<typeof karakterBul>["palet"]; ayak: P; pxm: number; adimlar: number[] };
  const hd: HD | null = hz ? (() => {
    const x = deger(hz.x, hz.kare, p, 700), y = deger(hz.y, hz.kare, p, GT.ayakY);
    const pxm = pxmY(y), s = (pxm / RIG_BIRIM_M) * 1.04;
    const ozel = new Set(["yuru", "tas-it", "egil", "dogrul"]);
    const d = karakterPoz({ ...hz, z: 0, u: 0, kare: undefined, jestler: (hz.jestler ?? []).filter((j) => !ozel.has(j.ad)) }, p, { yer: () => ({ x, y, s }), faz: () => 0 });
    const pz = d.pz; pz.x = x; pz.y = y + AYAK_TABAN * s; pz.scale = s;
    // duruş: eller kuşakta (tasarım §3.4 "ayakta, dik, eller kuşakta"), dik gövde
    { const a = kolIK(pz, govdeDunya(pz, [50, -256]), true), b = kolIK(pz, govdeDunya(pz, [34, -262]), false); pz.shF = a.sh; pz.elF = a.el; pz.shB = b.sh; pz.elB = b.el; pz.lean = 0; }
    const yj = (hz.jestler ?? []).find((j) => j.ad === "yuru");
    if (yj && p >= yj.bas - 1 && p <= yj.bit + 8) {
      const yol = yuruYol(hz, yj.bas, Math.min(p, yj.bit), pxm);
      const amt = interpolate(p, [yj.bas, yj.bas + 6, yj.bit - 6, yj.bit + 4], [0, 1, 1, 0], cl);
      const w = yuruDongu((yol / (2 * ADIM_M)) * 2 * Math.PI + Math.PI / 2, amt);
      Object.assign(pz, { ...w, shF: lerp(pz.shF, w.shF - 6, amt), elF: lerp(pz.elF, w.elF, amt), shB: lerp(pz.shB, w.shB, amt), elB: lerp(pz.elB, w.elB, amt) });
      pz.lean = (w.lean ?? 0) * amt;
      // uzun entari + kaftan: diz bükümü %60 (tam döngüde arka baldır yataya yaklaşıp "koşu/diz çökme" okunuyordu)
      pz.kneeF = (pz.kneeF ?? 0) * 0.6; pz.kneeB = (pz.kneeB ?? 0) * 0.6;
    }
    const egil = (hz.jestler ?? []).find((j) => j.ad === "egil" && p >= j.bas - 2 && p <= j.bit + 12);
    if (egil) { const w = interpolate(p, [egil.bas, egil.bas + 14, egil.bit - 8, egil.bit], [0, 1, 1, 0], { ...cl, easing: INOUT }); karis(pz, { lean: Number(egil.ops?.aci ?? 14), lookY: 0.7, headTilt: 9, thighF: -6, kneeF: 8 }, w); }
    // tas-it: ön ayak geri çekilir (p bas→temas−2), taşa vurur (temas), taşı dudağa kadar iter (kayma), çekilir ve yere basar (bit−4)
    const tj = (hz.jestler ?? []).find((j) => j.ad === "tas-it");
    if (tj && tasPr && p >= tj.bas && p <= tj.bit + 2) {
      const tc = Number(tj.ops?.temas ?? tasK.surt), kay = tasK.kay, son = tj.bit - 4;
      const dur = ayakUcu(pz, pz.thighF, pz.kneeF, pz.footF ?? 0);
      const tasNoktasi = (q: number): P => { const t = tasCoz(tasPr, q, tasK); return [t.x - 0.48 * tasW, t.y - 0.22 * tasW]; };
      const geri: P = [dur[0] - 0.12 * pxm, dur[1] - 0.16 * pxm];
      let hedef: P, w = 1;
      if (p < tc - 2) { const u = GIRIS(interpolate(p, [tj.bas, tc - 2], [0, 1], cl)); hedef = [lerp(dur[0], geri[0], u), lerp(dur[1], geri[1], u)]; }
      else if (p < tc) { const u = interpolate(p, [tc - 2, tc], [0, 1], { ...cl, easing: (v) => v * v }); const t = tasNoktasi(tc); hedef = [lerp(geri[0], t[0], u), lerp(geri[1], t[1], u)]; }
      else if (p <= kay) hedef = tasNoktasi(p);
      else { const u = interpolate(p, [kay, son], [0, 1], { ...cl, easing: INOUT }); const t = tasNoktasi(kay); hedef = [lerp(t[0], dur[0], u), lerp(t[1] - (u < 0.6 ? 0.06 * pxm * Math.sin(Math.PI * u / 0.6) : 0), dur[1], u)]; w = p > son ? 0 : 1; }
      const lb = interpolate(p, [tj.bas, tc, kay, son], [0, -5, -4, 0], cl); pz.lean = (pz.lean ?? 0) + lb; // denge: geri yaslanır
      if (w > 0) { const ik = bacakIK(pz, hedef); pz.thighF = ik.th; pz.kneeF = ik.kn; pz.footF = 0; }
      karis(pz, { shB: -24, elB: -30 }, interpolate(p, [tj.bas, tc, son, tj.bit], [0, 1, 1, 0], cl)); // arka kol dengede açılır
    }
    return { pz, palet: d.palet, ayak: [x, y], pxm, adimlar: adimKareleri(hz, pxm) };
  })() : null;

  // figür filtre/maske bölgesi (dekor px): figürün çevresi ile sınırlı — geniş bölge cs 2'de Chromium'da döşeme/kırpma artefaktı veriyordu
  const fb: [number, number, number, number] = hd ? [hd.ayak[0] - 1.3 * hd.pxm, hd.ayak[1] - 2.4 * hd.pxm, 2.6 * hd.pxm, 2.7 * hd.pxm] : [0, 0, 1, 1];
  // ---- kilit ----
  if (hd) {
    kilit.push({ ad: "hezarfen ayak", p: ekranNokta(k, hd.ayak), tur: "ayak" });
    kilit.push({ ad: "hezarfen yüz", p: ekranNokta(k, [hd.ayak[0] + 0.1 * hd.pxm, hd.ayak[1] - 1.55 * hd.pxm]), tur: "yuz" });
    if (hd.adimlar.some((q) => Math.abs(q - p) <= 1)) kilit.push({ ad: "adım (basma)", p: ekranNokta(k, hd.ayak), tur: "temas" });
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
    return <Kukla p={hd.palet} pz={pz} golgesiz isik={ki} arka={arka} />;
  })() : null;

  const sahne = (
    <g>
      {Ana}
      {/* gölge: yalnız seki üst yüzünde (sola-kameraya, uzun) */}
      {hd && <g clipPath={`url(#${uid}gy)`}><Golge isik={ISIK} ayak={hd.ayak} h={600 * (hd.pz.scale ?? 1) * 0.9} genislik={100 * (hd.pz.scale ?? 1)} alfa={0.5} stil="gravur" seed={S + 7} /></g>}
      {/* Hezarfen + kontra siluet + kenar ışığı (güneş sağda) */}
      {figur && <g>
        {figur}
        {siluet > 0 && <g filter={`url(#${uid}fs)`} opacity={siluet}>{figur}</g>}
        <g mask={`url(#${uid}km)`}><g filter={`url(#${uid}fk)`}>{figur}</g></g>
      </g>}
      {/* taş (dudakta figürün 0.02 m önünde → onu örter; düşerken gövdenin önünde; yerde iki çatı arasındaki sokakta) */}
      {tas && <TasCiz d={tas} w={tasW} />}
      {tas && tozPr && p >= tozPr.bas && <Toz x={tas.x} y={GT.tasYer} p={p - tozPr.bas} L={tozPr.bit - tozPr.bas} />}
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
            <filter id={`${uid}fs`} filterUnits="userSpaceOnUse" x={fb[0]} y={fb[1]} width={fb[2]} height={fb[3]}><feFlood floodColor={R.kontra} /><feComposite in2="SourceAlpha" operator="in" /></filter>
            <filter id={`${uid}fk`} filterUnits="userSpaceOnUse" x={fb[0]} y={fb[1]} width={fb[2]} height={fb[3]}><feFlood floodColor={R.kenar} /><feComposite in2="SourceAlpha" operator="in" /></filter>
            <filter id={`${uid}fw`} filterUnits="userSpaceOnUse" x={fb[0]} y={fb[1]} width={fb[2]} height={fb[3]}><feFlood floodColor={"#ffffff"} /><feComposite in2="SourceAlpha" operator="in" /></filter>
            <filter id={`${uid}fb`} filterUnits="userSpaceOnUse" x={fb[0]} y={fb[1]} width={fb[2]} height={fb[3]}><feFlood floodColor={"#000000"} /><feComposite in2="SourceAlpha" operator="in" /></filter>
            {/* gölge yalnız güneşe açık seki üst yüzüne düşer; dudaktan aşağısı (gövde yüzü) kontra ışıkta zaten gölgede → görünmez */}
            <clipPath id={`${uid}gy`}><polygon points={poly([...Array.from({ length: 25 }).map((_, i) => W([lerp(GT.seki[0], 700, i / 24), GT.duvarDip])), [GT.seki[1], W([700, GT.duvarDip])[1]], [GT.seki[1], GT.dudak], [GT.seki[0], GT.dudak]])} /></clipPath>
            {hd && <mask id={`${uid}km`} maskUnits="userSpaceOnUse" x={fb[0]} y={fb[1]} width={fb[2]} height={fb[3]}>
              <g filter={`url(#${uid}fw)`}>{figur}</g>
              <g filter={`url(#${uid}fb)`} transform={`translate(${-kontraKenar},${kontraKenar * 0.4})`}>{figur}</g>
            </mask>}
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
// yukarıdan bakılan Galata/Tophane çatıları: kutu = çatı + bir duvar yüzü; y 870 → 2400, boy 6 → 60 px; y < 1100 hava perspektifi tek ton
const Sehir: React.FC = () => {
  // kutu = alçak eğimli çatı (yukarıdan: geniş yamuk, tek ton, desensiz) + bir duvar yüzü; aralarda sokak boşlukları; pus y < 1180
  const out: React.ReactNode[] = [];
  out.push(<rect key="z" x={-2000} y={870} width={5000} height={3000} fill={karistir(R.sehirPus, R.toprak, 0.35)} />);
  let y = 872, sat = 0;
  while (y < 2400) {
    const s = 6 + ((y - 870) / 1530) * 54, pus = Math.max(0, Math.min(1, (1180 - y) / 310));
    let x = 560 + rnd(S, `sx${sat}`) * 2 * s;
    while (x < 1500) {
      const w = s * (1.2 + rnd(S, `w${sat}-${x | 0}`) * 1.6), h = s * (0.5 + rnd(S, `h${sat}-${x | 0}`) * 0.3);
      const bos = rnd(S, `b${sat}-${x | 0}`) < 0.18;
      if (!bos) {
        const dy = (rnd(S, `y${sat}-${x | 0}`) - 0.5) * s * 0.4, ton = (rnd(S, `t${sat}-${x | 0}`) - 0.5) * 0.12;
        const cati = karistir(tonla(R.cati, ton), R.sehirPus, 0.15 + 0.85 * pus), golge = karistir(R.catiGolge, R.sehirPus, 0.2 + 0.8 * pus), duvar = karistir(tonla(R.evDuvar, ton), R.sehirPus, 0.2 + 0.8 * pus);
        const yy = y + dy;
        out.push(<g key={`${sat}-${x | 0}`}>
          <rect x={x} y={yy + h * 0.6} width={w} height={h * 0.55} fill={duvar} />
          <rect x={x} y={yy + h * 0.6} width={w * 0.12} height={h * 0.55} fill={golge} />
          <polygon points={poly([[x - s * 0.05, yy + h * 0.62], [x + w * 0.06, yy], [x + w * 0.94, yy], [x + w + s * 0.05, yy + h * 0.62]])} fill={cati} />
          <line x1={x + w * 0.1} y1={yy + h * 0.25} x2={x + w * 0.9} y2={yy + h * 0.25} stroke={golge} strokeWidth={Math.max(1, s * 0.05)} />
        </g>);
      }
      x += w + s * (0.35 + rnd(S, `g${sat}-${x | 0}`) * 0.9);
    }
    y += s * 1.15; sat++;
  }
  return <g>{out}</g>;
};
// taş sıraları (düz gölge tonu + derz + her 4. sıra koyu + her 9. blokta kırık köşe). x0..x1, y0..y1, sıra yüksekliği h, blok 0.5–0.9 m
const Siralar: React.FC<{ x: [number, number]; y: [number, number]; h: number; pxm: number; seed: number; koyuSira?: boolean; sagEgri?: number; egri?: boolean }> = ({ x, y, h, pxm, seed, koyuSira, sagEgri = 0, egri }) => {
  const E = (q: P): P => (egri ? W(q) : q);
  const out: React.ReactNode[] = [];
  const n = Math.ceil((y[1] - y[0]) / h);
  let blok = 0;
  for (let r = 0; r < n; r++) {
    const y0 = y[0] + r * h, y1 = Math.min(y[1], y0 + h);
    const ton = koyuSira && r % 4 === 3 ? R.tasKoyu : tonla(R.tasGolge, (rnd(seed, `r${r}`) - 0.5) * 0.05);
    out.push(egri ? <polygon key={`s${r}`} points={poly([...Wp([x[0], y0], [x[1], y0]), ...Wp([x[1], y1], [x[0], y1])])} fill={ton} /> : <rect key={`s${r}`} x={x[0]} y={y0} width={x[1] - x[0]} height={y1 - y0} fill={ton} />);
    let xx = x[0] - rnd(seed, `o${r}`) * 0.6 * pxm;
    while (xx < x[1]) {
      let bw = (0.5 + rnd(seed, `b${r}-${xx | 0}`) * 0.4) * pxm;
      if (sagEgri > 0 && xx > x[1] - sagEgri) bw *= Math.max(0.35, (x[1] - xx) / sagEgri); // silindir: sağ uçta bloklar daralır
      xx += bw;
      if (xx < x[1] - 4) { const a = E([xx, y0]), b = E([xx, y1]); out.push(<line key={`d${r}-${blok}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={R.derz} strokeWidth={2} strokeOpacity={0.55} />); }
      if (++blok % 9 === 0 && xx < x[1] - 30) out.push(<polygon key={`k${r}-${blok}`} points={poly(([[xx - 2, y0 + 2], [xx - 2 - 0.12 * pxm, y0 + 2], [xx - 2, y0 + 0.1 * pxm]] as P[]).map(E))} fill={R.derz} opacity={0.5} />);
    }
    out.push(egri ? <polyline key={`h${r}`} points={poly(Wp([x[0], y1], [x[1], y1]))} fill="none" stroke={R.derz} strokeWidth={2} strokeOpacity={0.55} /> : <line key={`h${r}`} x1={x[0]} y1={y1} x2={x[1]} y2={y1} stroke={R.derz} strokeWidth={2} strokeOpacity={0.55} />);
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
const Dip: React.FC = () => (
  <g>
    {/* gövde tabanı ile toprak (sıkıştırılmış, nötr) */}
    <rect x={-1200} y={GT.govdeTaban} width={3600} height={1400} fill={R.toprak} />
    <line x1={-1200} y1={GT.govdeTaban} x2={1060} y2={GT.govdeTaban} stroke={ink(R.tasGolge)} strokeWidth={5} />
    <rect x={-1200} y={GT.govdeTaban} width={2260} height={10} fill="#4e473f" opacity={0.6} />
    {GT.catilar.map((c, i) => {
      const [a, b] = c.x, sol = i === 0;
      return <g key={i}>
        {/* ev duvarı (saçak altından aşağı) + gölge yüzü (güneş sağda → sol kısım) */}
        <rect x={a + 18} y={GT.sacakEv + 14} width={b - a - 36} height={1200} fill={R.evDuvar} {...{ stroke: ink(R.evDuvar), strokeWidth: 4 }} />
        <rect x={a + 18} y={GT.sacakEv + 14} width={(b - a - 36) * (sol ? 0.18 : 0.3)} height={1200} fill={R.evGolge} />
        {/* çatı: alçak eğim, tek ton, desensiz; kalça ucu gölgede; saçak altı koyu bant */}
        <polygon points={poly([[a, GT.sacakEv], [a + 70, GT.sirt], [b - 70, GT.sirt], [b, GT.sacakEv]])} fill={R.cati} {...{ stroke: ink(R.cati), strokeWidth: 4, strokeLinejoin: "round" as const }} />
        <polygon points={poly([[a, GT.sacakEv], [a + 70, GT.sirt], [a + 70, GT.sacakEv]])} fill={R.catiGolge} />
        <rect x={a + 4} y={GT.sacakEv} width={b - a - 8} height={14} fill="#3e2e24" />
      </g>;
    })}
  </g>
);
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
  // külah: düz koni (yükseklik = taban çapı ≈ 9 m · 195), apeks kadraj üstünde; taban (saçak) silindir gibi kıvrılır; sırt çizgisi apekse
  // yakınsar; saçak %10 taşar (760). Dikiş çizgileri 0.6 m aralıkla apekse yakınsar (yakın görünüm).
  const apeks: P = [-178, GT.sacak - 1755];
  const [kb0, kb1] = GT.kulahTaban;
  const sacakEgri = Wp([kb0, GT.sacak], [kb1, GT.sacak], 24);
  const sirtTaban = W([690, GT.sacak]);
  const dikis = Array.from({ length: 14 }).map((_, i) => kb0 + 60 + i * 0.6 * dp).filter((x) => x < kb1 - 20);
  const duvarUst = Wp([x0, GT.tepeUst], [x1, GT.tepeUst]), duvarAlt = Wp([x1, GT.duvarDip], [x0, GT.duvarDip]);
  const kornis = [...Wp([x0 - 40, GT.kornis[0]], [x1 + 30, GT.kornis[0]]), ...Wp([x1 + 30, GT.kornis[1]], [x0 - 40, GT.kornis[1]])];
  const kornisAlt = [...Wp([x0 - 40, GT.kornis[1] - 26], [x1 + 30, GT.kornis[1] - 26]), ...Wp([x1 + 30, GT.kornis[1]], [x0 - 40, GT.kornis[1]])];
  const kornisUstIsik = [...Wp([x0 - 40, GT.kornis[0]], [x1 + 30, GT.kornis[0]]), ...Wp([x1 + 30, GT.kornis[0] + 12], [x0 - 40, GT.kornis[0] + 12])];
  return <g>
    <KonturTitreme derinlik="orta" seed={S + 9}>
      {/* duvar: düz gölge tonu, taş sıraları 0.45 m (silindir eğriliğiyle) */}
      <Siralar x={[x0, x1]} y={[GT.tepeUst, GT.duvarDip]} h={0.45 * dp} pxm={dp} seed={S + 3} sagEgri={200} egri />
      <polyline points={poly(duvarAlt)} fill="none" stroke={ink(R.tasGolge)} strokeWidth={4} />
      {/* terminatör bandı (II, x 600–680) + ışıklı sağ uç (680–700) */}
      <Tarama sekil={[W([600, GT.tepeUst]), W([680, GT.tepeUst]), W([680, GT.duvarDip]), W([600, GT.duvarDip])]} basamak="II" aci={60} renk={R.derz} derinlik="orta" seed={S + 4} />
      <polygon points={poly([W([680, GT.tepeUst]), W([700, GT.tepeUst]), W([700, GT.duvarDip]), W([680, GT.duvarDip])])} fill={R.tas} />
      <line x1={x1} y1={W([x1, GT.kornis[1]])[1]} x2={x1} y2={W([x1, GT.duvarDip])[1]} stroke={ink(R.tas)} strokeWidth={4} />
      {/* kemerli açıklıklar (yarım daire): içi koyu, kemer içinde III + ton */}
      {[[kx0, kx1, GT.kapi.tepe], [sx0, sx1, GT.sagAciklik.tepe]].map(([a, b, t], i) => {
        const yol = kemerYol(a, b, t, GT.duvarDip).map(W);
        const ic = kemerYol(a, b, t, GT.duvarDip).slice(1, -1).concat([[b - 26, t + (b - a) / 2], [a + 26, t + (b - a) / 2]] as P[]).map(W);
        return <g key={i}>
          <polygon points={poly(yol)} fill={R.aciklik} stroke={ink(R.tasGolge)} strokeWidth={5} strokeLinejoin="round" />
          <Tarama sekil={ic} basamak="III" aci={60} renk="#1c1a16" derinlik="orta" seed={S + 10 + i} />
        </g>;
      })}
      {/* korniş (0.3 m, öne taşar; üst kenarı ışık) + korniş altı II */}
      <polygon points={poly(kornis)} fill={R.tasGolge} stroke={ink(R.tasGolge)} strokeWidth={4} strokeLinejoin="round" />
      <polygon points={poly(kornisUstIsik)} fill={tonla(R.tasGolge, 0.18)} />
      <polygon points={poly([W([x1 - 10, GT.kornis[0]]), W([x1 + 30, GT.kornis[0]]), W([x1 + 30, GT.kornis[1]]), W([x1 - 10, GT.kornis[1]])])} fill={R.tas} />
      <Tarama sekil={kornisAlt} basamak="II" aci={60} renk={R.derz} derinlik="orta" seed={S + 12} />
      {/* saçak altı (alçak gözden görünür) */}
      <polygon points={poly([...sacakEgri, ...Wp([kb1, GT.kornis[0]], [kb0, GT.kornis[0]], 24)])} fill={R.derz} />
      {/* külah: gölge yüzü + ışıklı dar şerit (sırt → sağ kenar) + dikişler */}
      <polygon points={poly([...sacakEgri, apeks, [kb0 - 2000, apeks[1]], [kb0 - 2000, GT.sacak]])} fill={R.kursun} stroke={ink(R.kursun)} strokeWidth={4} strokeLinejoin="round" />
      <polygon points={poly([sirtTaban, ...sacakEgri.filter((q) => q[0] > sirtTaban[0]), apeks])} fill={R.kursunIsik} />
      {dikis.map((x, i) => { const b0 = W([x, GT.sacak]); return <line key={i} x1={b0[0]} y1={b0[1]} x2={lerp(b0[0], apeks[0], 0.5)} y2={lerp(b0[1], apeks[1], 0.5)} stroke={x > 690 ? "#c2c6c6" : "#5e6268"} strokeWidth={1.8} strokeOpacity={0.35} />; })}
      <line x1={sirtTaban[0]} y1={sirtTaban[1]} x2={apeks[0]} y2={apeks[1]} stroke={ink(R.kursun)} strokeWidth={2} strokeOpacity={0.5} />
      <polyline points={poly(duvarUst)} fill="none" stroke={ink(R.tasGolge)} strokeWidth={3} />
    </KonturTitreme>
  </g>;
};
const Seki: React.FC<{ kn: (c: string, w?: number) => object }> = ({ kn }) => {
  const [s0, s1] = GT.seki, [c0, c1] = GT.cikinti;
  return <KonturTitreme derinlik="orta" seed={S + 15}>
    {/* üst yüz: güneşe açık yatay taş levha (bir ton açık), 3 levha derzi; ön dudak çizgisi */}
    {/* üst yüzün arka kenarı tepe katı duvar dibini izler (silindir: sağa doğru yükselir); 700'den sonra seki halkası arkaya döner (gök/şehir önünde) */}
    <polygon points={poly([...Wp([s0, GT.duvarDip], [700, GT.duvarDip], 24), [s1, W([700, GT.duvarDip])[1] + 6], [s1, GT.dudak], [s0, GT.dudak]])} fill={R.sekiUst} {...kn(R.sekiUst, 3)} />
    {[-120, 260, 560].map((x, i) => { const a = W([x, GT.duvarDip]); return <line key={i} x1={a[0]} y1={a[1]} x2={x - 18} y2={GT.dudak} stroke={R.derz} strokeWidth={2} strokeOpacity={0.55} />; })}
    {/* dudak (ön kenar) ışık çizgisi */}
    <rect x={s0} y={GT.dudak - 5} width={s1 - s0} height={5} fill={tonla(R.sekiUst, 0.16)} />
    {/* çıkıntı: dudağın sağ ucunda kalın levha (ön yüzü 0.14 m) + tek sade taş konsol */}
    <rect x={c0} y={GT.dudak} width={c1 - c0} height={36} fill={R.tasGolge} {...kn(R.tasGolge, 4)} />
    <rect x={c1 - 10} y={GT.dudak} width={10} height={36} fill={R.tas} />
    <polygon points={poly([[GT.konsol[0], GT.dudak + 36], [GT.konsol[1], GT.dudak + 36], [GT.konsol[1] - 8, GT.dudak + 100], [GT.konsol[0] + 14, GT.dudak + 100]])} fill={R.tasGolge} {...kn(R.tasGolge, 4)} />
    <Tarama sekil={[[GT.konsol[0], GT.dudak + 36], [GT.konsol[1], GT.dudak + 36], [GT.konsol[1] - 8, GT.dudak + 100], [GT.konsol[0] + 14, GT.dudak + 100]]} basamak="II" aci={60} renk={R.derz} derinlik="orta" seed={S + 16} />
    <rect x={c0} y={GT.dudak + 36} width={c1 - c0} height={10} fill={R.derz} opacity={0.55} />
  </KonturTitreme>;
};
// E4 toz: yere çarpışta yere paralel halka + 10 parçacık; yükselir, yayılır, sonra YERE OTURUR (küçülerek), fade yok
const Toz: React.FC<{ x: number; y: number; p: number; L: number }> = ({ x, y, p, L }) => {
  const u = Math.max(0, Math.min(1, p / L));
  return <g>
    {Array.from({ length: 10 }).map((_, i) => {
      const yon = (i % 2 ? 1 : -1) * (0.4 + rnd(S, `tz${i}`) * 0.6);
      const dx = yon * 140 * Math.sqrt(u), dy = -50 * (0.5 + rnd(S, `ty${i}`)) * Math.sin(Math.PI * Math.min(1, u * 1.15));
      const r = (16 + rnd(S, `tr${i}`) * 12) * (1 - 0.75 * u);
      return <ellipse key={i} cx={x + dx} cy={y + dy - r * 0.3} rx={r * 1.3} ry={r} fill={R.toz} opacity={0.55} />;
    })}
    <ellipse cx={x} cy={y} rx={30 + 150 * Math.sqrt(u)} ry={(8 + 24 * Math.sqrt(u)) * (1 - 0.6 * u)} fill="none" stroke={R.toz} strokeWidth={6 * (1 - 0.7 * u)} opacity={0.6} />
  </g>;
};

const arsiv = () => "gunduzMineral" as const;
export const GALATA_TEPE: Sablon = { Sahne, arsiv };
void CIKIS; void Golge;
