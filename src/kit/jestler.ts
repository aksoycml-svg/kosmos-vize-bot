// ===== Jest kütüphanesi (Blanc rig hareketlerinden) =====
// Her jest (pz, p, çağrı) → hedef poz alanları + zarf. Karışım: sayısal alanlar zarfla lerp, kesikli alanlar (ağız, şapka) zarf > .5'te.
// Temas üreten jestler (baston-vur, it-cek, eldiven-giy) temas karelerini `jestTemaslari` ile verir: bolum.json temaslar[] ile
// aynı kareler olmalı (doğrulayıcı denetler) — ses aynı listeden yerleşir.
import { Easing, interpolate } from "remotion";
import type { Agiz, Palet, Poz } from "../rig/Kukla";
import { AGIZLAR } from "../rig/Kukla";
import { yuru as yuruDongu, visem } from "../rig/Kukla";
import { bastonAcisi, bastonUcu, elYerel, AYAK_TABAN } from "../rig/kinematik";
import { GLOVE } from "../bolumler/blanc/palet";
import type { JestCagri, Karakter, P } from "./tipler";
import { cl, deger, zarf } from "./zaman";
import { kuklaYuru } from "./hareket/kuklaYuru";
import { turAdi, zeminOrnek } from "./hareket/gait";
// Sarkan nesneler (kese, fener, balon sepeti ipi, kafes) ve gövdeye bağlı yaylı ekler: kareye bağlı yay/sarkaç.
//   asiliNesne({ aski: (q) => elDunya(...), bas, p, fps: 60, pxm, boy_m: 0.25 }) → { aci (°, 0 = dik), uc } — taşıyıcı hızlanınca geri
//   kalır, durunca ileri savrulur ve söner. yayKare({ hedef, bas, p, fps }) → gecikmeli değer (yen, kol salınımı). Ayrıntı: KATALOG.md "Hareket".
export { asiliNesne, sarkacKare, yayKare, meltem } from "./hareket/motion";
import { karakterBul, YUZLER } from "./karakterler";

export type Yerlesim = {
  yer: (z: number, u: number) => { x: number; y: number; s: number }; // y = zemin (ayak tabanı) ekran y
  faz: (dz: number, du: number) => number;                              // yürüyüş fazı (radyan) / birim yol
};

const YURUYUS = Easing.bezier(0.25, 0.05, 0.45, 1);
export const DUR: Omit<Poz, "x" | "y"> = { thighF: -3, kneeF: 3, thighB: 4, kneeB: 2, shF: 4, elF: -10, shB: 6, elB: -12, tails: 1, breathe: 0, blinkF: 0, blinkB: 0, hat: null, cane: null };

type Hedef = Partial<Poz>;
const SAYISAL: (keyof Poz)[] = ["thighF", "kneeF", "footF", "thighB", "kneeB", "footB", "shF", "elF", "shB", "elB", "tails", "headTilt", "headY", "lookX", "lookY", "blinkF", "blinkB", "browF", "browB", "lean", "bodyY", "sway", "caneArka", "cane"];
const karis = (pz: Poz, h: Hedef, w: number) => {
  if (w <= 0) return;
  for (const k of SAYISAL) {
    const v = h[k];
    if (typeof v !== "number") continue;
    const a = (pz[k] as number | undefined) ?? 0;
    (pz as Record<string, unknown>)[k] = a + (v - a) * w;
  }
  if (w > 0.5) {
    if (h.agiz) pz.agiz = h.agiz;
    if (h.hat !== undefined) pz.hat = h.hat;
  }
};
const n = (v: unknown, d: number) => (typeof v === "number" ? v : d);

// ---- tek tek jestler: (pz, p, c) → void (pz'yi değiştirir) ----
type JestFn = (pz: Poz, p: number, c: JestCagri, k: Karakter) => void;

const J: Record<string, JestFn> = {
  konus: (pz, p, c) => {
    if (p < c.bas || p >= c.bit) return;
    const metin = String(c.ops?.metin ?? "eme ama");
    const harf = metin.replace(/\s+/g, "");
    const i = Math.floor((p - c.bas) / n(c.ops?.hiz, 5));
    pz.agiz = harf.length ? visem(harf[i % harf.length]) : (i % 2 ? "E" : "M");
  },
  isaret: (pz, p, c) => karis(pz, { shF: n(c.ops?.aci, -95), elF: -6 }, zarf(p, c.bas, c.bit)),
  "sapka-kaldir": (pz, p, c) => {
    const kol = interpolate(p, [c.bas, c.bas + 14, c.bas + 18, c.bit - 10, c.bit], [0, 1.04, 1, 1, 0], { ...cl, easing: Easing.bezier(0.16, 1, 0.3, 1) });
    karis(pz, { shF: -168, elF: -14, headTilt: -6 }, kol);
    if (kol > 0.35) { const [hx, hy] = elYerel(pz, true, [2, 6]); pz.hat = { x: hx + 8, y: hy + 14, r: -14 }; }
  },
  "baston-vur": (pz, p, c) => {
    const on = c.ops?.el === "on";
    const vurus = n(c.ops?.vurus, c.bas + (c.bit - c.bas) * 0.6);
    const hedefX = n(c.ops?.hedefX, on ? 60 : -48);
    const a0 = bastonAcisi(pz, hedefX, on); // temas açısı (uç taşta)
    // kaldırma yönü: ucu YUKARI götüren işaret (taşa gömülmez)
    const isaret = bastonUcu(pz, a0 + 10, on)[1] < bastonUcu(pz, a0 - 10, on)[1] ? 1 : -1;
    const kalk = p < c.bas || p > vurus + 10 ? 0
      : p <= vurus ? interpolate(p, [c.bas, (c.bas + vurus) / 2, vurus], [0, 1, 0], { ...cl, easing: Easing.in(Easing.quad) })
      : interpolate(p, [vurus, vurus + 3, vurus + 10], [0, 0.12, 0], cl); // küçük sekme, sonra yerleşir
    const aci = a0 + isaret * 32 * kalk;
    if (on) { pz.cane = aci; pz.shF += -10 * kalk; } else { pz.caneArka = aci; pz.shB += -10 * kalk; }
  },
  esne: (pz, p, c) => {
    const w = zarf(p, c.bas, c.bit, 0.35, 0.25);
    // K2 (D5): yakın planda kocaman "esneme" ağzı (çene düşer, gözler sıkı kapalı, kaşlar kalkar); genel planda küçük "O".
    // ops.agiz ile ezilebilir ("O" | "esneme"). Ağız zarf > .5'te açılır — tepe anı = esneme sesi (temas listesine yazılır).
    const tur = String(c.ops?.agiz ?? (pz.yakin ? "esneme" : "O"));
    // K4 (v4 P08) "uykulu": sıkılmış/uykulu esneme — kapaklar YARI inik ve ağır (göz sıkılmaz), kaşlar gevşek ve hafif düşük
    // (acı/sıkma okunmaz), yuvarlak orta açık ağız, baş yavaşça geri. Kapak zarftan önce iner, sonra kalkar (ağırlık).
    if (tur === "uykulu") {
      const kapak = zarf(p, Math.max(0, c.bas - 10), c.bit, 0.45, 0.3);
      karis(pz, { blinkF: 0.42, blinkB: 0.42, browF: -0.35, browB: -0.35 }, kapak);
      karis(pz, { headTilt: -12, headY: -3, agiz: "uykulu", lookY: 0.5, blinkF: 0.55, blinkB: 0.55 }, w);
      return;
    }
    const buyuk = tur === "esneme";
    karis(pz, { headTilt: buyuk ? -16 : -11, headY: buyuk ? -4 : 0, blinkF: buyuk ? 1 : 0.9, blinkB: buyuk ? 1 : 0.9, browF: buyuk ? 1.4 : 0.9, browB: buyuk ? 1.4 : 0.9, agiz: buyuk ? "esneme" : "O", lookY: -0.3 }, w);
  },
  "it-cek": (pz, p, c) => {
    const w = zarf(p, c.bas, c.bit, 0.15, 0.15);
    const t = n(c.ops?.tekrar, 3);
    const ph = interpolate(p, [c.bas, c.bit], [0, t * Math.PI * 2], cl);
    karis(pz, { shF: -42 + 18 * Math.sin(ph), elF: -58 + 22 * Math.cos(ph), lean: 2 + 1.5 * Math.sin(ph) }, w);
  },
  "eldiven-giy": (pz, p, c) => {
    const w = zarf(p, c.bas, c.bit, 0.25, 0.2);
    karis(pz, { shF: -52, elF: -78, shB: -44, elB: -84, lookY: 0.6, headTilt: 7 }, w);
  },
  fisilda: (pz, p, c) => {
    const w = zarf(p, c.bas, c.bit, 0.2, 0.1);
    // K3: hasta yüzde küçük fısıltı ağzı (diş görünmez)
    const seri: Agiz[] = pz.hasta ? ["fisilti", "M", "fisilti", "dinlen", "fisilti", "M"] : ["S", "E", "M", "dinlen", "O", "S"];
    karis(pz, { blinkF: 0.5, blinkB: 0.5, headTilt: 4, lookY: 0.35, browF: 0.4, browB: 0.4, agiz: seri[Math.floor((p - c.bas) / n(c.ops?.hiz, 10)) % seri.length] }, w);
  },
  yaz: (pz, p, c) => karis(pz, { shF: -38, elF: -88 + Math.sin(p * 0.9) * 5, lookY: 0.7, headTilt: 6 }, zarf(p, c.bas, c.bit)),
  bak: (pz, p, c) => karis(pz, { lookX: n(c.ops?.x, 0), lookY: n(c.ops?.y, 0), headTilt: n(c.ops?.egim, 0) }, zarf(p, c.bas, c.bit, 0.3, 0.2)),
};

// Jest temas kareleri (plan karesi). Doğrulayıcı aynı kuralı sinirlar.json/jestTemas ile uygular.
export const jestTemaslari = (c: JestCagri): { kare: number; olay: string }[] => {
  if (c.ad === "baston-vur") return [{ kare: Math.round(n(c.ops?.vurus, c.bas + (c.bit - c.bas) * 0.6)), olay: "baston-tak" }];
  if (c.ad === "it-cek") { const t = n(c.ops?.tekrar, 3), L = c.bit - c.bas; return Array.from({ length: t }).map((_, i) => ({ kare: Math.round(c.bas + ((i + 0.25) * L) / t), olay: "makara-tik" })); }
  if (c.ad === "eldiven-giy") return [{ kare: Math.round(n(c.ops?.gerilme, (c.bas + c.bit) / 2)), olay: "eldiven-gerilme" }];
  return [];
};

// ---- gait yolu (z/u → ekran) ----
// Kukla birimi / metre (SARAYBURNU geo RIG_BIRIM_M 306 / boy 1.04): pxm = ölçek · 294
const KUKLA_BIRIM_M = 294;
const gaitYolu = (k: Karakter, yj: JestCagri, Y: Yerlesim) => {
  const n = (q: number) => Y.yer(deger(k.z, k.kare, q, 3, YURUYUS), deger(k.u, k.kare, q, 0.5, YURUYUS));
  const orn: [number, number][] = []; let yanal = 0, top = 0;
  for (let q = yj.bas; q <= yj.bit; q++) { const a = n(q); orn.push([a.x, a.y]); if (q > yj.bas) { const b = n(q - 1); yanal += Math.abs(a.x - b.x); top += Math.hypot(a.x - b.x, a.y - b.y); } }
  if (top < 1 || yanal < 0.6 * top) return null; // derinlik ağırlıklı yol: eski döngü
  return { n, zemin: zeminOrnek(orn) };
};

// ---- karakter → poz ----
export type KarakterDurum = { pz: Poz; palet: Palet; louis: boolean; ayak: P; boyPx: number };
export const karakterPoz = (k: Karakter, p: number, Y: Yerlesim): KarakterDurum => {
  const kayit = karakterBul(k.kim);
  const z = deger(k.z, k.kare, p, 3, YURUYUS), u = deger(k.u, k.kare, p, 0.5, YURUYUS);
  const g = Y.yer(z, u);
  const pz: Poz = { ...DUR, x: g.x, y: g.y + AYAK_TABAN * g.s, scale: g.s, facing: k.yon ?? 1 };
  // nefes + doğal göz kırpma (seed: isim)
  const sd = k.kim.length * 37;
  pz.breathe = Math.sin(p * 0.07 + sd);
  const kp = (p + sd) % 230;
  const kirp = kp < 9 ? Math.sin((kp / 9) * Math.PI) : 0;
  pz.blinkF = kirp; pz.blinkB = kirp;
  // K3: "hasta" ifadesi ağız değil yüz durumu; bilinmeyen ifade → dinlen (doğrulayıcı uyarır)
  const ifade = k.yuz?.ifade ?? "dinlen";
  pz.hasta = ifade === "hasta" ? 1 : 0;
  pz.agiz = (AGIZLAR as string[]).includes(ifade) ? (ifade as Agiz) : "dinlen";
  pz.ter = !!k.yuz?.ter;
  pz.yatik = k.poz === "yatik";
  pz.lookX = k.yuz?.bakis?.[0] ?? 0.8; pz.lookY = k.yuz?.bakis?.[1] ?? 0;
  pz.browF = k.yuz?.kas ?? 0; pz.browB = k.yuz?.kas ?? 0;
  pz.yakin = k.yuz?.yakin;
  const jestler = k.jestler ?? [];
  // yürüyüş: faz = kat edilen yol × şablon fazı (ayak kaymaz); zarf kısa giriş/çıkış
  const yj = jestler.find((j) => j.ad === "yuru" && p >= j.bas - 1 && p <= j.bit + 8);
  const gaitYol = yj && yj.ops?.cozucu === "gait" ? gaitYolu(k, yj, Y) : null;
  if (yj && gaitYol) {
    // kit/hareket gait (bayrak ops.cozucu = "gait"): basan ayak sabit, kalça erişimden, uzun etek öndeki bacağı izler.
    // Basışlar: ops.basislar (json temas kareleri) ya da yol kuralı (ops.adim_m). Yalnız YANAL yol (ekranda yatay ağırlıklı); derinlik
    // ağırlıklı yolda (kameraya doğru/uzağa) profil rig ayak basamaz → eski döngü (doğrulayıcı uyarır).
    const pc = Math.max(yj.bas, Math.min(yj.bit, p)), g0 = gaitYol.n(pc);
    const bs = Array.isArray(yj.ops?.basislar) ? (yj.ops!.basislar as number[]) : undefined;
    const r = kuklaYuru({ ...pz, x: g0.x, y: g0.y + AYAK_TABAN * g0.s, scale: g0.s }, {
      p: pc, bas: yj.bas, bit: yj.bit, x: (q) => gaitYol.n(q).x, zemin: gaitYol.zemin, pxm: (q) => gaitYol.n(q).s * KUKLA_BIRIM_M, olcek: (q) => gaitYol.n(q).s,
      tur: turAdi(String(yj.ops?.tur ?? "walk")), adim_m: typeof yj.ops?.adim_m === "number" ? yj.ops.adim_m : undefined, basislar: bs,
      ilk: yj.ops?.ilk === 1 ? 1 : 0, egik: 3 * interpolate(p, [yj.bas, yj.bas + 6, yj.bit - 6, yj.bit], [0, 1, 1, 0], cl) + 1.5,
    });
    Object.assign(pz, r.pz);
  } else if (yj) {
    let yol = 0, z0 = deger(k.z, k.kare, yj.bas, 3, YURUYUS), u0 = deger(k.u, k.kare, yj.bas, 0.5, YURUYUS);
    for (let q = yj.bas + 1; q <= Math.min(p, yj.bit); q++) {
      const z1 = deger(k.z, k.kare, q, 3, YURUYUS), u1 = deger(k.u, k.kare, q, 0.5, YURUYUS);
      yol += Y.faz(Math.abs(z1 - z0), Math.abs(u1 - u0)); z0 = z1; u0 = u1;
    }
    const amt = interpolate(p, [yj.bas, yj.bas + 4, yj.bit - 6, yj.bit + 2], [1, 1, 1, 0], cl);
    const w = yuruDongu(yol + n(yj.ops?.faz, Math.PI / 2), amt);
    Object.assign(pz, w);
    pz.lean = (w.lean ?? 0) * amt + 1.5;
  }
  let palet: Palet = { ...kayit.palet, ...(k.yuzVaryant ? YUZLER[k.yuzVaryant] ?? {} : {}), ...(k.palet ?? {}) };
  // baston aksesuarı: dinlenirken uç taşta (arka el)
  if (k.aksesuar?.includes("baston")) { pz.shB = -14; pz.elB = -40; pz.caneArka = bastonAcisi(pz, -48, false); }
  for (const j of jestler) {
    if (j.ad === "yuru") continue;
    if (j.ad === "eldiven-giy" && p >= n(j.ops?.gerilme, (j.bas + j.bit) / 2)) palet = { ...palet, glove: GLOVE.hero };
    const f = J[j.ad];
    if (f && p >= j.bas - 2 && p <= j.bit + 12) f(pz, p, j, k);
  }
  return { pz, palet, louis: !!kayit.louis, ayak: [g.x, g.y], boyPx: 600 * g.s };
};
