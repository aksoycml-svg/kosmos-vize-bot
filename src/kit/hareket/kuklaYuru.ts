// ===== kit/hareket/kuklaYuru.ts — gait dünya çözücüsü → Kukla pozu (rig bağlantısı) =====
// gait.ts (MIT, telif JDhruv14 — uyarlama) çözümünü Kukla bacak zincirine (kalça (±legX, −226), uyluk 104, baldır 99, bilek → taban 15)
// analitik iki kemik IK ile bağlar. Basan ayak dünya koordinatında sabit; kalça bacak erişiminden; kol bacağa ters; uzun etek
// (osmanli) `etekOto` ile öndeki bacağa göre açılıp kapanır. Eski `yuru(phi)` (Kukla.tsx) olduğu gibi durur (bayrak: ops.cozucu).
//
// Kullanım (şablon):
//   const r = kuklaYuru(pz, { p, bas, bit, x: (q) => …, zemin: (x) => …, pxm: (q) => …, tur: "walk", adim_m, basislar });
//   // pz artık yürüyen poz; r.ayak[0|1].zemin = temas gölgesi noktası; r.basislar = foley/temas listesi (json temaslarıyla aynı olmalı)
import type { Poz } from "../../rig/Kukla";
import { adimCoz, AdimCikti, GaitKind, Vec } from "./gait";

export const RIG_BACAK = { UY: 104, BA: 99, ANK: 15, KALCA_Y: -226, LEG: [14, -10] as [number, number], TOPUK: -10, BURUN: 36 };
const { UY, BA } = RIG_BACAK;
const rad = (d: number) => (d * Math.PI) / 180;

/** Kalça eklemi dünya noktası (Kukla dönüşüm zinciri: translate(x,y) scale(s·f, s) · translate(0, bodyY) rotate(lean, 0, −226) · (legX, −226)). */
export const kalcaDunya = (pz: Poz, legX: number): Vec => {
  const s = pz.scale ?? 1, f = pz.facing ?? 1, a = rad(pz.lean ?? 0);
  return [pz.x + f * s * legX * Math.cos(a), pz.y + s * (-226 + legX * Math.sin(a) + (pz.bodyY ?? 0))];
};
/** Bilek dünya noktası (ileri kinematik). */
export const bilekDunya = (pz: Poz, legX: number, thigh: number, knee: number): Vec => {
  const s = pz.scale ?? 1, f = pz.facing ?? 1, a = rad(pz.lean ?? 0);
  const k = kalcaDunya(pz, legX);
  const t = rad(thigh), tk = rad(thigh + knee);
  const lx = -UY * Math.sin(t) - BA * Math.sin(tk), ly = UY * Math.cos(t) + BA * Math.cos(tk); // gövde yerel (rotate(+θ): (0,L) → (−L sinθ, L cosθ))
  const gx = lx * Math.cos(a) - ly * Math.sin(a), gy = lx * Math.sin(a) + ly * Math.cos(a);
  return [k[0] + f * s * gx, k[1] + s * gy];
};
/** Taban noktası (ayakkabı yerel (lx, 15) — topuk −10, burun 36) dünya: ayak açısı foot (gövde yerel) + lean. */
export const tabanDunya = (pz: Poz, legX: number, thigh: number, knee: number, foot: number, lx: number): Vec => {
  const s = pz.scale ?? 1, f = pz.facing ?? 1, b = bilekDunya(pz, legX, thigh, knee), r = rad((pz.lean ?? 0) + foot);
  return [b[0] + f * s * (lx * Math.cos(r) - RIG_BACAK.ANK * Math.sin(r)), b[1] + s * (lx * Math.sin(r) + RIG_BACAK.ANK * Math.cos(r))];
};
/** Analitik iki kemik IK (diz yalnız geriye bükülür). */
export const bacakIK = (pz: Poz, legX: number, bilek: Vec) => {
  const s = pz.scale ?? 1, f = pz.facing ?? 1, a = rad(pz.lean ?? 0), k = kalcaDunya(pz, legX);
  const ex = (bilek[0] - k[0]) / (f * s), ey = (bilek[1] - k[1]) / s;
  const dx = ex * Math.cos(a) + ey * Math.sin(a), dy = -ex * Math.sin(a) + ey * Math.cos(a);
  const d = Math.max(30, Math.min(UY + BA - 0.5, Math.hypot(dx, dy)));
  const phi = Math.atan2(-dx, dy), kn = Math.acos(Math.max(-1, Math.min(1, (d * d - UY * UY - BA * BA) / (2 * UY * BA))));
  const beta = Math.atan2(BA * Math.sin(kn), UY + BA * Math.cos(kn));
  return { th: ((phi - beta) * 180) / Math.PI, kn: (kn * 180) / Math.PI };
};

export type KuklaYuruGirdi = {
  p: number; bas: number; bit: number;
  x: (q: number) => number;          // kalça (pz.x) yolu, dekor px
  zemin: (x: number) => number;      // zemin y (dekor px) dünya x'inde
  pxm: (q: number) => number;
  tur?: GaitKind; adim_m?: number; basislar?: number[]; ilk?: 0 | 1;
  baslangic?: [number, number]; bitis?: [number, number];
  olcek?: (q: number) => number;     // rig ölçeği yol boyunca değişiyorsa (derinlik) — duruş ofsetleri bas/bit ölçeğiyle
  kolGenlik?: number;                // kol salınımı (derece; 0 = kollar dokunulmaz, ör. eller kuşakta → 10)
  egik?: number;
};

/**
 * pz: o karenin duruş pozu (x, y = zemin + AYAK_TABAN·s, scale, facing, bacak açıları). Döner: yürüyen poz + çözüm.
 * Duruş bacak açılarından bilek ofsetleri alınır → bas ve bit karesinde poz duruşla birebir (kesmede atlama yok).
 */
export function kuklaYuru(pz0: Poz, g: KuklaYuruGirdi): { pz: Poz; c: AdimCikti } {
  const pz: Poz = { ...pz0 };
  const s = pz.scale ?? 1, f = (pz.facing ?? 1) < 0 ? -1 : 1;
  const dur: Poz = { ...pz0, lean: 0, bodyY: 0 };
  const bF = bilekDunya(dur, RIG_BACAK.LEG[0], pz0.thighF, pz0.kneeF), bB = bilekDunya(dur, RIG_BACAK.LEG[1], pz0.thighB, pz0.kneeB);
  const ofset: [number, number] = [f * (bF[0] - dur.x), f * (bB[0] - dur.x)];
  const kalcaPiv = dur.y - 226 * s;
  const erisim = Math.max(Math.hypot(bF[0] - kalcaDunya(dur, 14)[0], bF[1] - kalcaPiv), Math.hypot(bB[0] - kalcaDunya(dur, -10)[0], bB[1] - kalcaPiv));
  // ölçek yol boyunca değişiyorsa (derinlik) duruş ofsetleri bas/bit karesinin ölçeğiyle: basılı ilk/son ayak ölçek değişiminden kaymaz
  const ol = (q: number) => (g.olcek ? g.olcek(q) / s : 1);
  const baslangic = g.baslangic ?? [g.x(g.bas) + f * ofset[0] * ol(g.bas), g.x(g.bas) + f * ofset[1] * ol(g.bas)];
  const bitis = g.bitis ?? [g.x(g.bit) + f * ofset[0] * ol(g.bit), g.x(g.bit) + f * ofset[1] * ol(g.bit)];
  const c = adimCoz({
    p: g.p, bas: g.bas, bit: g.bit, x: g.x, zemin: g.zemin, pxm: g.pxm, yon: f, tur: g.tur, adim_m: g.adim_m, basislar: g.basislar, ilk: g.ilk,
    ofset, baslangic, bitis, egik: g.egik,
    kalcaOfs: (lean) => RIG_BACAK.LEG.map((lx) => [s * lx * Math.cos(rad(lean)), s * lx * Math.sin(rad(lean))] as Vec) as [Vec, Vec],
    erisim, azami: (UY + BA - 0.5) * s,
    ayakGeo: { topuk: RIG_BACAK.TOPUK * s, burun: RIG_BACAK.BURUN * s, bilek: RIG_BACAK.ANK * s },
  });
  pz.x = c.x; pz.lean = c.lean; pz.bodyY = 0; pz.y = c.kalcaY + 226 * s;
  const ikF = bacakIK(pz, RIG_BACAK.LEG[0], c.ayak[0].bilek), ikB = bacakIK(pz, RIG_BACAK.LEG[1], c.ayak[1].bilek);
  pz.thighF = ikF.th; pz.kneeF = ikF.kn; pz.footF = c.ayak[0].aci - c.lean;
  pz.thighB = ikB.th; pz.kneeB = ikB.kn; pz.footB = c.ayak[1].aci - c.lean;
  // kollar bacakların tersine (öndeki bacağın tarafındaki kol geride); frak eteği yaylanır
  const A = g.kolGenlik ?? 18;
  if (A) { const sw = Math.max(-1, Math.min(1, (f * (c.ayak[0].bilek[0] - c.ayak[1].bilek[0])) / (0.4 * g.pxm(g.p)))); pz.shF += A * sw; pz.shB -= A * sw; pz.tails = 4 + 6 * sw; }
  pz.headY = (pz.headY ?? 0) - 0.25 * c.bob / s; // baş kalçadan hafif geç iner/kalkar
  pz.sway = 0;
  pz.etekOto = true;
  return { pz, c };
}
