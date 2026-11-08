// ===== SARAYBURNU `kiyi` görünümü (gece) — P01 A, P03, P04, P05, P06 =====
// Konum dili: karakter/prop x/y = DEKOR px, ZEMİN TEMASI (ayak tabanı / kızak altı). Ölçek ufuk–ölçek kuralından:
//   rıhtımdaki (y ≥ 1256) nesne → px/m = (y − 720)/1.5 (json `olcek` yok sayılır, doğrulayıcı farkı uyarır);
//   havadaki / sudaki nesne → px/m = 406.7 × olcek (y'den türetilemez; olcek yoksa 1).
//   bagli karakter (oturan) → prop'un oturağına oturur, ayakları dayamaya basar (json x/y yok sayılır).
// v2 (K1 eleştirisi): bagli.bit (bırakma), fitil tükenir (kalan kömür parça rıhtımda), duman izi tabana bağlı, boş demet suya yatar
// (%50 batık, ±3 px), E3 halka/buhar/sıçrama, Lagâri iniş + yüzme (suya gömülü, su çizgisinde kırpılır), ıslaklık, kanat bırakma → suda kanat,
// köşk basamağı + ıslak el tutunma, yardımcılar arka 3/4 (R14). Kurulmamış ayrıntı: ıslak damlalar (P07), sarık ucunun çözülmesi.
// Tek ışık (mekanlar §0.6): püskürme sürerken (bas+6'dan) anahtar = demet ağzı; değilse meşale (yardımcı 1'in elinde). Köşk penceresi ikincil
// (yalnız kendi halesi + su kolonu, gölge vermez). Gölgeler anahtar ışığın tersine; kukla kenar ışığı aynı kaynaktan (mavi RIM yok).
import React from "react";
import { interpolate } from "remotion";
import { Golge, Isik } from "../../../doku/Isik";
import type { KilitNokta } from "../../../doku/GuvenliAlan";
import { RenkKaydi } from "../../../doku/Tarama";
import { DOKU_SEED, karistir, P } from "../../../doku/sabitler";
import { Kukla, Palet, Poz } from "../../../rig/Kukla";
import { kuklaIsigi } from "../../../rig/RigIsik";
import { AYAK_TABAN, elDunya, govdeDunya, kolIK } from "../../../rig/kinematik";
import { Buhar, Duman, FitilKivilcimi, Puskurme, Sicrama, SuHalkasi, TacSicrama } from "../../../components/GravurEfekt";
import { Baslik, DemetDurum, demetAgizlar, demetFitilUcu, demetOturak, demetOturakKenar, demetTutamak, FisekDemet, Fitil, fitilKivilcimNoktasi, fitilNoktalari, kanatEl, KanatCiz, kanatGeo, Mesale, mesaleAlev, SudaKanat } from "../../props/evliya";
import { karakterBul } from "../../karakterler";
import { karakterPoz, KarakterDurum } from "../../jestler";
import type { Karakter, Plan, Prop } from "../../tipler";
import { cl, deger, ekranNokta, kameraHesapla, katDonusum, zarf } from "../../zaman";
import { param } from "../../ortak";
import { propDurum } from "../../props";
import { BOY_OLCEK, KIYI, pxmSu, pxmZemin, REF_PXM, RIG_BIRIM_M, zemindeMi } from "./geo";
import { KiyiDeniz, KiyiRihtim, KiyiUzak, KIYI_GECE, KOSK_VARSAYILAN, KoskKonum, YansimaKolonu } from "./KiyiDekor";
import { koskPencere } from "./SinanPasaKosk";

const S = DOKU_SEED.sarayburnu;
const KANATLI = new Set(["lagari"]); // kıyı görünümünde sırtta kanat taşıyan (tasarim §3.2: P01 A–P06); durum.kanat 0 → ayrılmış
const MESALECI = "yardimci-1";      // mekanlar §0.6: meşale yardımcı 1'in elinde (json'da mesale prop'u yoksa da elde — tek ışık kaynağı)
const n = (v: unknown, d: number) => (typeof v === "number" ? v : d);
const suBandi = (y: number) => y > KIYI.ufuk + 2 && y < KIYI.dudakUst;

type DemetCoz = { pr: Prop; d: DemetDurum; puskurme: number; suda: { suY: number; bas: number } | null };
type Cizim = { derinlik: number; el: React.ReactNode };
type BagliProp = { prop: string; dx?: number; dy?: number; bit?: number };

const demetPxm = (pr: Prop, p: number, y: number) => {
  const ol = (pr as Prop & { olcek?: number | number[] }).olcek;
  return zemindeMi(y) && ol === undefined ? pxmZemin(y) : REF_PXM * deger(ol as number | number[] | undefined, pr.kare, p, 1);
};
// Demet durumu. Son anahtar suda (y su bandında) ise: o karede suya değer, 12 karede yatar (aci → 90), ekseni su çizgisinde (%50 batık), ±3 px salınır.
// suY: planın `su.y_demet` parametresi — yalnız verildiğinde ve son anahtar orada bitiyorsa demet suya düşmüş sayılır (y'den çıkarım yok: havadaki demet de su bandı y'sinde olabilir)
const demetCoz = (pr: Prop, p: number, puskurmeAralik: { bas: number; bit: number } | null, suY?: number): DemetCoz => {
  const kare = pr.kare ?? [], sonK = kare.length ? kare[kare.length - 1] : 0;
  const ySon = Array.isArray(pr.y) ? pr.y[pr.y.length - 1] : n(pr.y, 1330);
  let x = deger(pr.x, pr.kare, p, 520), y = deger(pr.y, pr.kare, p, 1330), aci = deger(pr.aci, pr.kare, p, 0);
  const pxm = demetPxm(pr, p, y);
  const du = propDurum(pr, p);
  const aktif = puskurmeAralik ? p >= puskurmeAralik.bas && p < puskurmeAralik.bit : true;
  let suda: DemetCoz["suda"] = null;
  if (kare.length > 1 && suY !== undefined && Math.abs(ySon - suY) < 12 && suBandi(ySon) && p >= sonK) {
    const t = interpolate(p, [sonK, sonK + 12], [0, 1], { ...cl, easing: (u) => 1 - (1 - u) ** 3 });
    const sal = 3 * Math.sin((p - sonK) * 0.12) * t;
    aci = aci + (90 - aci) * t;
    y = ySon + 0.55 * pxm * t + sal; // yatınca ağırlık merkezi (0.55 m) su çizgisine iner
    suda = { suY: ySon + sal * 0.3, bas: sonK };
  }
  return { pr, d: { x, y, pxm, aci, titreme: n(du.titreme, 0), bos: n(du.bos, 0), p }, puskurme: aktif ? Math.max(0, Math.min(1, n(du.puskurme, 0))) : 0, suda };
};

// ---- jestler (Evliya): pz'yi değiştirir. Karışım zarfla (giriş bezier(.16,1,.3,1), çıkış hızlı) ----
const karis = (pz: Poz, h: Partial<Poz>, w: number) => {
  if (w <= 0) return;
  for (const [k, v] of Object.entries(h)) { if (typeof v !== "number") continue; const a = ((pz as unknown as Record<string, number | undefined>)[k]) ?? 0; (pz as Record<string, unknown>)[k] = a + (v - a) * w; }
};
const OTURAN: Partial<Poz> = { thighF: -84, kneeF: 78, thighB: -84, kneeB: 78, footF: 0, footB: 0, bodyY: 110, lean: 4 };
const UCUS: Partial<Poz> = { lean: 30, thighF: 18, kneeF: 16, thighB: 26, kneeB: 10, footF: 28, footB: 28, bodyY: 0 };
// sicra (O10): gövde geri (lean −12), iki ayakla küçük geri adım; serbest kol (arka 3/4'te YAKIN kol) yüze kalkar
const SICRA: Partial<Poz> = { lean: -12, thighF: -12, kneeF: 14, thighB: 12, kneeB: 6, headTilt: -8 };
const KOL_YUZE: Partial<Poz> = { shB: -150, elB: -85 };
const YUZME = (p: number): Partial<Poz> => ({ lean: 72, thighF: 22 + 14 * Math.sin(p * 0.35), kneeF: 24, thighB: 30 - 14 * Math.sin(p * 0.35), kneeB: 18, headTilt: -58, bodyY: 0, shF: -150 + 55 * Math.sin(p * 0.18), elF: -30, shB: -150 - 55 * Math.sin(p * 0.18), elB: -30 });
// ıslak (tasarim §3.2): kumaş %25 koyu; sarık soğuk kalır
const islakPalet = (pl: Palet, w: number): Palet => w <= 0 ? pl : ({ ...pl, coat: karistir(pl.coat, "#232c42", w), coatDark: karistir(pl.coatDark, "#161c2c", w), entari: karistir(pl.entari ?? pl.coat, "#59606e", w), hat: karistir(pl.hat, "#a8aaa4", w), hatBand: karistir(pl.hatBand, "#86887e", w), pants: karistir(pl.pants, "#2a2826", w) });

// Işık havuzu (mekanlar §1.2 "meşale havuzunda #7e6a52"): gradyan yerine 2 düz basamak, ekran karışımı → derzler havuzda da okunur
const HavuzDuz: React.FC<{ isik: Isik; guc?: number }> = ({ isik, guc = 1 }) => {
  if (isik.tip !== "nokta" || !isik.havuz) return null;
  const { rx, ry, alfa } = isik.havuz;
  return (
    <g style={{ mixBlendMode: "screen" }}>
      <ellipse cx={isik.zemin[0]} cy={isik.zemin[1]} rx={rx} ry={ry} fill={isik.renk} opacity={alfa * 0.5 * guc} />
      <ellipse cx={isik.zemin[0]} cy={isik.zemin[1]} rx={rx * 0.58} ry={ry * 0.58} fill={isik.renk} opacity={alfa * 0.6 * guc} />
    </g>
  );
};

// K1-2 Y2 okutma: yüzen figürün arkasında 3 kesik dalga izi (V, köşke doğru yüzüş yönünün tersine açılır). Yalnız `okutma.dalga_izi` parametresiyle.
const DalgaIzi: React.FC<{ x: number; y: number; pxm: number; p: number; yon: number; bas: number }> = ({ x, y, pxm, p, yon, bas }) => {
  if (p < bas) return null;
  const t = Math.min(1, (p - bas) / 24);
  return <g>{[0, 1, 2].map((i) => {
    const d0 = (0.35 + i * 0.45) * pxm, d1 = d0 + 0.32 * pxm * t, ac = (0.1 + i * 0.13) * pxm, kay = ((p * 0.6) % (0.45 * pxm));
    return [-1, 1].map((s) => <path key={`${i}${s}`} d={`M ${x - yon * (d0 + kay * 0.3)} ${y + s * ac * 0.18} Q ${x - yon * ((d0 + d1) / 2 + kay * 0.3)} ${y + s * ac * 0.32 - 1} ${x - yon * (d1 + kay * 0.3)} ${y + s * ac * 0.45}`} fill="none" stroke="#9fb0bf" strokeWidth={Math.max(1.2, 0.035 * pxm)} strokeOpacity={0.75 - i * 0.18} strokeLinecap="round" />);
  })}</g>;
};

export type KiyiParam = { fitil?: { bas: number; bit: number }; puskurme?: { bas: number; bit: number; sonuk?: boolean }; kosk_konum?: KoskKonum; su?: { halka?: { bas: number; bit: number }; y_demet?: number }; kosk_basamak?: { x: [number, number]; y: number; adim: number } };
type SudaParam = { bas: number; bit: number; kare: number[]; x: number[]; y: number[]; olcek?: number; halka?: { bas: number } };

export const KiyiSahne: React.FC<{ plan: Plan; p: number; kilit: KilitNokta[]; onceki?: Plan }> = ({ plan, p, kilit, onceki }) => {
  const k = kameraHesapla(plan.kamera, p);
  const fitil = param<KiyiParam["fitil"] | null>(plan, "fitil", null);
  const pusk = param<KiyiParam["puskurme"] | null>(plan, "puskurme", null);
  const kosk = { ...KOSK_VARSAYILAN, ...param<Partial<KoskKonum>>(plan, "kosk_konum", {}) };
  const su = param<KiyiParam["su"] | null>(plan, "su", null);
  const basamak = param<KiyiParam["kosk_basamak"] | null>(plan, "kosk_basamak", null);
  const props = plan.props ?? [];
  const karakterler = plan.karakterler ?? [];

  // ---- prop'lar ----
  const demetPr = props.find((q) => q.tur === "fisek-demet");
  const suDemet = (param<KiyiParam["su"] | null>(plan, "su", null))?.y_demet;
  const demet = demetPr ? demetCoz(demetPr, p, pusk ? { bas: pusk.bas, bit: pusk.bit } : null, suDemet) : null;
  const mesalePr = props.find((q) => q.tur === "mesale");
  const baslikPr = props.find((q) => q.tur === "baslik");
  const kanatPr = props.filter((q) => q.tur === "kanat");
  // başlık: anahtarlıysa kare[1]'de baştan ayrılır; anahtarsızsa (önceki plandan yerde kalan) baştan ayrılmış sayılır
  const baslikKalkti = !!baslikPr && (!(Array.isArray(baslikPr.kare) && baslikPr.kare.length > 1) || p >= baslikPr.kare[1]);
  const baslikSahip = baslikPr ? String((baslikPr as Prop & { sahip?: string }).sahip ?? MESALECI) : "";

  // ---- karakterler: poz + ölçek + konum ----
  type KC = { c: Karakter; d: KarakterDurum; pxm: number; zemin: boolean; derinlik: number; ayak: P; mesale?: { tutamak: P; yon: P }; kanat?: { g: ReturnType<typeof kanatGeo>; acik: number }; suY?: number };
  const kc: KC[] = karakterler.map((c) => {
    const kayit = karakterBul(c.kim);
    let x = deger(c.x, c.kare, p, 540), y = deger(c.y, c.kare, p, 1330), pxm: number, zemin = false;
    const bag = c.bagli as BagliProp | undefined;
    const bagli = bag && demet && (bag.prop === demet.pr.id || bag.prop === "demet") && !(bag.bit !== undefined && p >= bag.bit) ? demet : null;
    if (bagli) pxm = bagli.d.pxm;
    else if (zemindeMi(y)) { pxm = pxmZemin(y); zemin = true; }
    else pxm = REF_PXM * deger(c.olcek, c.kare, p, 1);
    const s = (pxm / RIG_BIRIM_M) * (BOY_OLCEK[c.kim] ?? 1);
    const d = karakterPoz({ ...c, z: 0, u: 0, kare: undefined, jestler: (c.jestler ?? []).filter((j) => j.ad !== "yuru") }, p, { yer: () => ({ x, y, s }), faz: () => 0 });
    d.palet = { ...kayit.palet, ...(c.palet ?? {}) };
    const pz = d.pz;
    const jest = (ad: string) => (c.jestler ?? []).find((j) => j.ad === ad && p >= j.bas - 2 && p <= j.bit + 12);
    const kompars = c.kim.startsWith("yardimci");
    if (kompars) pz.arka = true; // R14: arka 3/4, olaya bakar (yüz yüzeyi kameraya dönük değil)
    if (c.poz === "oturan") Object.assign(pz, OTURAN);
    const ucus = jest("ucus");
    const ucusJ = (c.jestler ?? []).find((j) => j.ad === "ucus");
    if (ucus) karis(pz, UCUS, zarf(p, ucus.bas, ucus.bit, 0.12, 0.08));
    const sicra = jest("sicra");
    if (sicra) {
      karis(pz, SICRA, zarf(p, sicra.bas, sicra.bit, 0.25, 0.3));
      const ky = (sicra.ops?.kol_yuze as number[] | undefined) ?? [sicra.bas + 8, sicra.bit];
      karis(pz, KOL_YUZE, zarf(p, ky[0], ky[1] + 10, 0.3, 0.3));
    }
    // suya iniş: uçuş bitti ve konum su bandında → gövde su çizgisine gömülür, kırpılır
    const suda = !bagli && !zemin && !!ucusJ && p >= ucusJ.bit && suBandi(y);
    const yuz = jest("yuz");
    if (suda && yuz) karis(pz, YUZME(p), zarf(p, yuz.bas, yuz.bit, 0.2, 0.15));
    const islak = deger(c.durum?.islak as number[] | number | undefined, c.kare, p, 0);
    if (islak > 0) d.palet = islakPalet(d.palet, Math.min(1, islak));
    if (bagli && c.poz === "oturan" && !(ucus && p >= ucus.bas)) {
      const [ox, oy] = demetOturak(bagli.d);
      pz.x = ox - 0.06 * pxm - 2 * s; pz.y = oy - (-226 + (pz.bodyY ?? 0) + 22) * s;
      x = pz.x; y = oy;
    } else { pz.x = x; pz.y = y + AYAK_TABAN * s; }
    pz.scale = s;
    let suY: number | undefined;
    if (suda) {
      // su çizgisi = y (iniş noktası). Göğüs (yerel boyun altı) su çizgisinde: baş + omuz üstü görünür.
      // K1-2 Y5: temas karesinde (ucus.bit) gövde su yüzündedir, 10 karede batar (öncesinde baş suda değil)
      suY = y;
      const boyun = govdeDunya(pz, [10, -400]);
      const bat = interpolate(p, [ucusJ!.bit, ucusJ!.bit + 10], [0, 1], { ...cl, easing: (u) => 1 - (1 - u) ** 2 });
      pz.y += (y - boyun[1] + 0.12 * pxm) * bat;
    }
    if (baslikPr && baslikKalkti && c.kim === baslikSahip) d.palet = { ...d.palet, sapka: "yok" };
    const out: KC = { c, d, pxm, zemin, derinlik: zemin ? y : bagli ? bagli.d.y + 0.01 : KIYI.ufuk + pxm * KIYI.goz, ayak: [x, y], suY };
    // ---- eller ----
    const ikEl = (on: boolean, hedef: P, w = 1) => { if (w <= 0) return; const r = kolIK(pz, hedef, on); if (on) { pz.shF += (r.sh - pz.shF) * w; pz.elF += (r.el - pz.elF) * w; } else { pz.shB += (r.sh - pz.shB) * w; pz.elB += (r.el - pz.elB) * w; } };
    // tutun (O11): gövde öne eğilir (lean 16) ki ön el oturağın 0.13 m altındaki üst sicim bağına yetişsin (kol ≈ 0.58 m)
    if (bagli && c.poz === "oturan" && !(ucus && p >= ucus.bas)) { pz.lean = 16; ikEl(true, demetTutamak(bagli.d)); ikEl(false, demetOturakKenar(bagli.d)); }
    if (c.kim === MESALECI) {
      // json `mesale` x/y = meşale BAŞI hedefi. Baş omuzdan ≥ 0.9 m uzaktaysa yol izlenir (el omuz→baş doğrultusunda, baş elden 0.8 m);
      // yakınsa taşıma pozu (el önde-aşağıda, sopa dik + 20° ileri). Meşale her durumda ELİ izler.
      const omuz = govdeDunya(pz, [40, -380]);
      const f = pz.facing ?? 1;
      const tasiHedef: P = [omuz[0] + f * 0.3 * pxm, omuz[1] + 0.3 * pxm];
      const egim = (20 * Math.PI) / 180;
      const tasiYon: P = [f * Math.sin(egim), -Math.cos(egim)];
      let hedef: P = tasiHedef, yon: P = tasiYon;
      if (mesalePr && mesalePr.x !== undefined) {
        const bas: P = [deger(mesalePr.x, mesalePr.kare, p), deger(mesalePr.y, mesalePr.kare, p)];
        const dx = bas[0] - omuz[0], dy = bas[1] - omuz[1], L = Math.hypot(dx, dy) || 1;
        const w = interpolate(L / pxm, [0.75, 0.9], [0, 1], cl);
        if (w > 0) {
          const yy: P = [dx / L, dy / L];
          const hy: P = [bas[0] - yy[0] * 0.8 * pxm, bas[1] - yy[1] * 0.8 * pxm];
          hedef = [tasiHedef[0] + (hy[0] - tasiHedef[0]) * w, tasiHedef[1] + (hy[1] - tasiHedef[1]) * w];
          const ym: P = [tasiYon[0] + (yy[0] - tasiYon[0]) * w, tasiYon[1] + (yy[1] - tasiYon[1]) * w]; const Lm = Math.hypot(ym[0], ym[1]) || 1;
          yon = [ym[0] / Lm, ym[1] / Lm];
        }
      }
      ikEl(true, hedef);
      out.mesale = { tutamak: elDunya(pz, true), yon };
      out.derinlik += 0.02;
    } else if (kompars) {
      // kompars boşta: eller önde kenetli (Y2, arka 3/4)
      ikEl(true, govdeDunya(pz, [52, -262])); ikEl(false, govdeDunya(pz, [46, -256]));
    }
    // ıslak el köşk basamağına tutunur (kapanış): yüzme sonunda ön el en yakın basamak kenarına uzanır
    if (suda && basamak && yuz) {
      const hedefB: P = [Math.min(Math.max(x + 0.35 * pxm, basamak.x[0]), basamak.x[1]), basamak.y - 1];
      ikEl(true, hedefB, interpolate(p, [yuz.bit - 22, yuz.bit - 4], [0, 1], cl));
    }
    // ---- kanat (sırtta): KANATLI karakter; json'da bağlı kanat prop'u varsa acik oradan; suda kanat devraldıysa sırtta yok ----
    const kp = kanatPr.find((q) => q.bagli === c.kim);
    const sudaK = kp ? ((kp as Prop & { suda?: SudaParam }).suda ?? null) : null;
    const takili = deger(c.durum?.kanat as number[] | number | undefined, c.kare, p, 1);
    if ((KANATLI.has(c.kim) || kp) && takili > 0.5 && !(sudaK && p >= sudaK.bas)) {
      const acik = kp ? Math.max(0, Math.min(1, n(propDurum(kp, p).acik, 0))) : 0;
      const oturuyor = c.poz === "oturan" && !(ucus && p >= ucus.bas);
      // katlı (v1.4 Y8): omuz üstünden (−400) diz hizasına: oturanda uyluk yatay → diz ≈ kalça hizası (−214), ayakta −122; sırt hattı −56
      const g = kanatGeo(acik, pz.lean ?? 0, RIG_BIRIM_M, -400, oturuyor ? -214 : -122, -56);
      if (acik > 0.05) { ikEl(true, govdeDunya(pz, kanatEl(g.yakinAcik)), acik); ikEl(false, govdeDunya(pz, kanatEl(g.uzakAcik)), acik); }
      out.kanat = { g, acik };
    }
    return out;
  });

  // ---- tek ışık ----
  const mesaleci = kc.find((q) => q.mesale);
  const mesaleIsik: Isik | null = mesaleci?.mesale ? (() => { const a = mesaleAlev(mesaleci.mesale.tutamak, mesaleci.mesale.yon, mesaleci.pxm); const zy = mesaleci.zemin ? mesaleci.ayak[1] : KIYI.refY; return { tip: "nokta", ad: "meşale", zemin: [a[0], zy] as P, yukseklik: Math.max(20, zy - a[1]), renk: "#f0a848", havuz: { rx: 380, ry: 95, alfa: 0.35 } }; })() : null;
  const pg = demet ? demet.puskurme * (pusk?.sonuk ? interpolate(p, [pusk.bas, pusk.bit], [1, 0.2], cl) : 1) : 0;
  const agiz = demet ? demetAgizlar(demet.d) : [];
  const agizOrta: P = agiz.length ? [agiz.reduce((s0, q) => s0 + q[0], 0) / agiz.length, agiz.reduce((s0, q) => s0 + q[1], 0) / agiz.length] : [540, 1330];
  const puskurmeAnahtar = !!demet && pg > 0 && !!pusk && p >= pusk.bas + 6;
  const demetYerde = !!demet && zemindeMi(demet.d.y);
  // demetin derinliğindeki rıhtım y'si (dik yükselişte zemin aynı derinlikte kalır): koni oraya çarpar, ışığın zemin izdüşümü orada
  const demetZemin = demet ? (demetYerde ? demet.d.y : KIYI.ufuk + KIYI.goz * demet.d.pxm) : KIYI.refY;
  const puskIsik: Isik | null = demet ? { tip: "nokta", ad: "püskürme", zemin: [agizOrta[0], demetZemin], yukseklik: Math.max(60, demetZemin - agizOrta[1]), renk: "#f0a040", havuz: { rx: 520 * (demet.d.pxm / REF_PXM), ry: 130 * (demet.d.pxm / REF_PXM), alfa: 0.3 } } : null;
  const isik: Isik = (puskurmeAnahtar ? puskIsik : mesaleIsik) ?? { tip: "nokta", ad: "varsayılan", zemin: [300, 1330], yukseklik: 300, renk: "#f0a848" };

  // ---- kilit noktaları ----
  kc.forEach(({ c, d, zemin, ayak }) => {
    if (zemin) kilit.push({ ad: `${c.kim} ayak`, p: ekranNokta(k, ayak), tur: "ayak" });
    if (!d.pz.arka) kilit.push({ ad: `${c.kim} yüz`, p: ekranNokta(k, govdeDunya(d.pz, [20, -450])), tur: "yuz" });
  });
  if (demet && demetYerde) kilit.push({ ad: "demet temas", p: ekranNokta(k, [demet.d.x, demet.d.y]), tur: "temas" });
  if (demet?.suda) kilit.push({ ad: "demet su teması", p: ekranNokta(k, [demet.d.x, demet.suda.suY]), tur: "temas" });
  const pencere = koskPencere((kosk.x[0] + kosk.x[1]) / 2, kosk.su_cizgisi, kosk.px_m);
  kilit.push({ ad: "köşk penceresi", p: ekranNokta(k, pencere), tur: "kurulum" });
  if (basamak) kilit.push({ ad: "köşk basamağı", p: ekranNokta(k, [(basamak.x[0] + basamak.x[1]) / 2, basamak.y]), tur: "kurulum" });

  // ---- çizim listesi (derinlik sırası: uzak önce; önde olan arkadakini örter) ----
  const cizim: Cizim[] = [];
  const murekkep = KIYI_GECE.murekkep;
  kc.forEach((q, i) => {
    const pz = q.d.pz;
    const kanat = q.kanat;
    const ekranOlcek = (pz.scale ?? 1) * k.cs;
    // Z3: ışık yakınlığı sürekli ağırlık (eşik atlaması yok → kanat tonu komşu karede sıçramaz)
    const isikW = interpolate(Math.hypot(isik.zemin[0] - q.ayak[0], isik.zemin[1] - isik.yukseklik - (q.ayak[1] - 300)) / q.pxm, [1.8, 2.8], [1, 0], cl);
    const katli = kanat ? 1 - kanat.acik : 0;
    const kat = kanat?.g.katli;
    const alttan = puskurmeAnahtar && q.c.poz === "oturan" ? pg : 0;
    const kanatCiz = (pts: P[], uzak: boolean) => <KanatCiz pts={pts} katli={katli} isik={isikW} olcekEkran={ekranOlcek} uzak={uzak} kat={kat} alttan={alttan} />;
    // katlıyken iki kat gövdenin arkasında (arka kat önce); açıkken uzak kanat arka elin üstünde, yakın kanat ön kolun üstünde
    const arka = kanat && kanat.acik < 0.35 ? <>{kanatCiz(kanat.g.uzak, true)}{kanatCiz(kanat.g.yakin, false)}</> : undefined;
    const arkaUst = kanat && kanat.acik >= 0.35 ? kanatCiz(kanat.g.uzak, true) : undefined;
    const on = kanat && kanat.acik >= 0.35 ? kanatCiz(kanat.g.yakin, false) : undefined;
    const ki = kuklaIsigi(isik, q.ayak, 600 * (pz.scale ?? 1), { murekkep, kamera: k.cs, seed: S + 300 + i * 11 });
    const kukla = <Kukla p={q.d.palet} pz={pz} golgesiz isik={ki} arka={arka} arkaUst={arkaUst} on={on} />;
    cizim.push({
      derinlik: q.derinlik,
      el: (
        <g key={`k${i}`}>
          {q.zemin && <Golge isik={isik} ayak={q.ayak} h={600 * (pz.scale ?? 1) * 0.9} genislik={100 * (pz.scale ?? 1)} alfa={0.5} stil="gravur" seed={S + 40 + i} />}
          {q.suY !== undefined
            ? <g>
              <defs><clipPath id={`su${i}`}><rect x={-3000} y={-6000} width={8000} height={q.suY + 6000} /></clipPath></defs>
              <g clipPath={`url(#su${i})`}>{kukla}</g>
              <SuHalkasi x={q.ayak[0]} y={q.suY} pxm={q.pxm} p={p} bas={0} sabit olcek={0.9} />
            </g>
            : kukla}
          {q.mesale && <Mesale tutamak={q.mesale.tutamak} yon={q.mesale.yon} pxm={q.pxm} p={p} seed={S + 77} ten={q.d.palet.skin} tenKoyu={q.d.palet.skinDark} />}
        </g>
      ),
    });
  });
  // Lagâri suya iniş: ucus bitiş karesinde sıçrama + halka (temas su-sap)
  const inen = kc.find((q) => q.suY !== undefined);
  const okutma = param<{ dalga_izi?: { adet?: number } } | null>(plan, "okutma", null);
  const yuzerken = (q: (typeof kc)[number]) => !!okutma?.dalga_izi && q.suY !== undefined && (q.c.jestler ?? []).some((j) => j.ad === "yuz" && p >= j.bas);
  const inisKare = inen ? ((inen.c.jestler ?? []).find((j) => j.ad === "ucus")?.bit ?? 0) : 0;
  if (demet) {
    const dd = demet.d;
    const derinlik = zemindeMi(dd.y) ? dd.y - 0.005 : KIYI.ufuk + dd.pxm * KIYI.goz - 0.005; // oturan karakterin hemen arkası
    cizim.push({ derinlik, el: <g key="demet">
      {demet.suda
        ? <g><defs><clipPath id="demetSu"><rect x={-3000} y={-6000} width={8000} height={demet.suda.suY + 6000} /></clipPath></defs><g clipPath="url(#demetSu)"><FisekDemet d={dd} isikX={isik.zemin[0]} seed={S + 9} /></g>
          <line x1={dd.x - 0.75 * dd.pxm} y1={demet.suda.suY + 1} x2={dd.x + 0.75 * dd.pxm} y2={demet.suda.suY + 1} stroke="#2c3444" strokeWidth={3} strokeDasharray="16 10" /></g>
        : <FisekDemet d={dd} isikX={isik.zemin[0]} seed={S + 9} />}
    </g> });
  }
  if (baslikPr && baslikKalkti) {
    const sahip = kc.find((q) => q.c.kim === baslikSahip);
    const bx = deger(baslikPr.x, baslikPr.kare, p), by = deger(baslikPr.y, baslikPr.kare, p);
    const pxm = sahip?.pxm ?? REF_PXM;
    const yerde = by >= KIYI.rihtimUst - 20;
    cizim.push({ derinlik: (sahip?.derinlik ?? KIYI.refY) + 0.5, el: (
      <g key="baslik">
        {yerde && <ellipse cx={bx} cy={by + 0.05 * pxm} rx={0.1 * pxm * n(baslikPr.olcek, 1)} ry={0.02 * pxm * n(baslikPr.olcek, 1)} fill="#14110d" opacity={0.5} />}
        <Baslik x={bx} y={by} aci={deger(baslikPr.aci, baslikPr.kare, p, 0)} pxm={pxm} olcek={n(baslikPr.olcek, 1)} palet={karakterBul(baslikSahip).palet} />
      </g>
    ) });
  }
  // suda kanat (KE-P2s): kanat-birak ile sırttan ayrılır, su yüzüne yatar; plan sonuna dek kalır; sabit halka
  for (const kp of kanatPr) {
    const sd = (kp as Prop & { suda?: SudaParam }).suda;
    if (!sd || p < sd.bas) continue;
    const sx = deger(sd.x, sd.kare, p), sy = deger(sd.y, sd.kare, p), spx = REF_PXM * (sd.olcek ?? pxmSu(sy) / REF_PXM);
    cizim.push({ derinlik: KIYI.ufuk + spx * KIYI.goz - 0.01, el: <g key={`ks${kp.id}`}>
      <SudaKanat x={sx} y={sy} pxm={spx} p={p} seed={S + 61} kenar="#f0b060" />
      {sd.halka && <SuHalkasi x={sx} y={sy} pxm={spx} p={p} bas={sd.halka.bas} sabit olcek={1.6} />}
    </g> });
  }
  cizim.sort((a, b) => a.derinlik - b.derinlik);

  // fitil: kıvılcım uçtan (x 330) demete yürür (demetin p0 konumu: yerde, kalkıştan bağımsız). Tükenince ağızda biter;
  // rıhtımda yalnız kısa kömürleşmiş parça kalır — kalkan demete bağlı kalmaz, gerilmez (K1 K1)
  const demet0 = demetPr ? demetCoz(demetPr, 0, null) : null;
  const fitilPts = demet0 && fitil ? fitilNoktalari([330, KIYI.refY - 6], demetFitilUcu(demet0.d)) : null;
  const yanma = fitil ? interpolate(p, [fitil.bas, fitil.bit], [0, 1], cl) : 1;
  if (fitilPts && p < (fitil?.bit ?? 0)) kilit.push({ ad: "fitil ucu", p: ekranNokta(k, fitilPts[0]), tur: "kurulum" });
  const kivilcim = fitilPts && fitil && p >= fitil.bas && p < fitil.bit ? fitilKivilcimNoktasi(fitilPts, yanma) : null;
  // duman: kaynak = ağız ortası (o karedeki demet konumu) — tabana bağlı, kalkıştan sonra iz
  const agizAt = (t: number): P => { if (!demetPr) return [540, 1330]; const dc = demetCoz(demetPr, t, null, suDemet); const a = demetAgizlar(dc.d); const o: P = [a.reduce((s0, q) => s0 + q[0], 0) / a.length, a.reduce((s0, q) => s0 + q[1], 0) / a.length]; return zemindeMi(dc.d.y) ? [o[0], dc.d.y] : o; };
  const pxmAt = (t: number) => (demetPr ? demetCoz(demetPr, t, null).d.pxm : REF_PXM);
  // K1-2 Y1 (eşleşen kesme): püskürme önceki plandan sürüyorsa (bas 0) duman ÖNCEKİ planın kaynağıyla, aynı seed ve mutlak yaşla devralınır.
  // Bulut i, iki planda aynı doğum karesine (önceki planın bas'ı − süresi) hizalanır → kesmenin iki yanında aynı bulutlar, aynı boy.
  const oPusk = onceki && onceki.sablon === plan.sablon ? param<KiyiParam["puskurme"] | null>(onceki, "puskurme", null) : null;
  const oDemetPr = oPusk ? (onceki!.props ?? []).find((q) => q.tur === "fisek-demet") : undefined;
  const devral = !!(pusk && pusk.bas === 0 && oPusk && oDemetPr);
  const oL = onceki?.sure_kare ?? 0, oSu = onceki ? param<KiyiParam["su"] | null>(onceki, "su", null)?.y_demet : undefined;
  const oAgizAt = (t: number): P => { const dc = demetCoz(oDemetPr!, t, null, oSu); const a = demetAgizlar(dc.d); const o: P = [a.reduce((s0, q) => s0 + q[0], 0) / a.length, a.reduce((s0, q) => s0 + q[1], 0) / a.length]; return zemindeMi(dc.d.y) ? [o[0], dc.d.y] : o; };
  const dumanBas = devral ? oPusk!.bas - oL : pusk ? (pusk.bas === 0 ? -90 : pusk.bas) : 0;
  const dumanKaynak = (t: number): P => (t >= 0 ? agizAt(t) : devral ? oAgizAt(oL + t) : (() => { const q = agizAt(0); return [q[0], q[1] - t * 2.4] as P; })());
  const dumanPxm = (t: number) => (t < 0 && devral ? demetCoz(oDemetPr!, oL + t, null).d.pxm : pxmAt(Math.max(0, t)));
  const dumanYogun = (t: number) => (t < 0 && devral ? (oPusk!.sonuk ? 0.7 : 1) : pusk?.sonuk ? 0.7 : 1);
  const halka = su?.halka;

  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <RenkKaydi>
        <g transform={katDonusum(k, 1)}>
          <KiyiUzak kosk={kosk} basamak={basamak ? { x: basamak.x, adim: basamak.adim } : undefined} />
          <KiyiDeniz p={p} cs={k.cs} />
          {/* köşk penceresi: hale yok (§1.2a); yalnız su kolonu */}
          <YansimaKolonu x={pencere[0]} y0={kosk.su_cizgisi + 2} y1={1000} renk={KIYI_GECE.pencere} alfa={0.5} gen={16} seed={S + 3} p={p} />
          <YansimaKolonu x={isik.zemin[0]} y0={KIYI.dudakUst - 2} y1={KIYI.dudakUst - (puskurmeAnahtar ? 260 : 120)} renk="#e0a050" alfa={puskurmeAnahtar ? 0.6 * pg : 0.45} gen={puskurmeAnahtar ? 60 : 30} seed={S + 5} p={p} />
          {/* duman: püskürme önceki plandan sürüyorsa (bas 0) iz kesme öncesine uzanır (eşleşen kesme sürekliliği; aşağıdaki kalkış yolu) */}
          {/* E3: demet suya düşüşü (halka + buhar + sıçrama), Lagâri inişi (sıçrama + halka) */}
          {demet?.suda && <>
            <SuHalkasi x={demet.d.x} y={demet.suda.suY} pxm={demet.d.pxm} p={p} bas={halka?.bas ?? demet.suda.bas} sure={(halka?.bit ?? demet.suda.bas + 30) - (halka?.bas ?? demet.suda.bas) + 10} />
            <Sicrama x={demet.d.x} y={demet.suda.suY} pxm={demet.d.pxm} p={p} bas={demet.suda.bas} seed={S + 71} />
          </>}
          {inen && inisKare > 0 && <>
            <SuHalkasi x={inen.ayak[0]} y={inen.suY ?? inen.ayak[1]} pxm={inen.pxm} p={p} bas={inisKare} sure={40} olcek={1.4} />
            <TacSicrama x={inen.ayak[0]} y={inen.suY ?? inen.ayak[1]} H={0.75 * inen.pxm} W={1.3 * inen.pxm} p={p} bas={inisKare} seed={S + 73} yari="arka" />
          </>}
          <KiyiRihtim />
          <HavuzDuz isik={isik} />
          {puskurmeAnahtar && mesaleIsik && <HavuzDuz isik={mesaleIsik} guc={0.5} />}
          {fitilPts && <Fitil pts={fitilPts} yanma={yanma} tukendi={!!fitil && p >= fitil.bit} />}
          {kivilcim && <FitilKivilcimi x={kivilcim[0]} y={kivilcim[1]} p={p} seed={S + 21} />}
          {demet && pusk && p >= pusk.bas && <Duman kaynakAt={dumanKaynak} pxmAt={dumanPxm} p={p} bas={dumanBas} bit={pusk.bit} seed={S + 31} yogunAt={dumanYogun} />}
          {cizim.map((c) => c.el)}
          {/* K1-2 Y5: iniş taç sıçramasının ön yarısı figürün önünde (su-sap teması bu karede görünür) */}
          {inen && inisKare > 0 && <TacSicrama x={inen.ayak[0]} y={inen.suY ?? inen.ayak[1]} H={0.75 * inen.pxm} W={1.3 * inen.pxm} p={p} bas={inisKare} seed={S + 73} yari="on" />}
          {inen && yuzerken(inen) && <DalgaIzi x={inen.ayak[0]} y={inen.suY!} pxm={inen.pxm} p={p} yon={inen.d.pz.facing ?? 1} bas={inisKare + 6} />}
          {demet?.suda && <Buhar x={demet.d.x} y={demet.suda.suY} pxm={demet.d.pxm} p={p} bas={demet.suda.bas + 2} seed={S + 75} />}
          {demet && pg > 0 && <Puskurme agizlar={agiz} asagi={[-Math.sin((demet.d.aci * Math.PI) / 180), Math.cos((demet.d.aci * Math.PI) / 180)]} pxm={demet.d.pxm} p={p} guc={pg} uzunluk={demetYerde ? 0.8 : 1.3} zeminY={demetZemin} seed={S + 13} />}
        </g>
      </RenkKaydi>
    </svg>
  );
};
