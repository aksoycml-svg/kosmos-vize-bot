// ===== KE-PK-S1 PARIS-CATI v2 (Paris kuşatması 1870; mekanlar.md §1v2 · tasarim.md §13) =====
// Tek dekor + tek doğrusal dolly (dolly.ts DOLLY_CATI v2): geniş kamera (cs 1) göz teras üstü 2.8 m, ufuk 635 → kanca kamerası (cs 2.75)
// kılıfın 0.49 m önünde, göz 0.73 m (ufuk kuşun göğsünde). gorunum "cati" = "kumes" (aynı dekor). saat "alacakaranlik" | "gun".
// Uzak katmanlar dekor px + L(d) (flu kanca tarafında), yakın katmanlar (teras, kümes, sağ baca, tekne, kuş) DÜNYA modeli → dunyaEkran.
// Döngü kilidi: P01 f0 ve P11 son kare AYNI cs/cx/cy (2.75/105/244) + kuş tünekte aynı kılıf noktası → kılıf ekran (≈374, 960).
// TEK IŞIK: catiDekor ISIK_YON[saat] → yüz tonu, kenar ışığı, zemin gölgesi (golgeVektor), terastaki ışık şeridi aynı vektörden.
// Görüntüde DİL METNİ YOK. Kırmızı yok, sarı metal yok; imza kehribarı yalnız kılıfta (sahne C* ≤ 28).
// Parametreler (KATALOG.md "PARIS-CATI"): kus {kalkis, cikis, iner, kanat_topla, parilti} | false, kilif_coz {bas, bit, temas, serit_cikar},
// siluetler (liste | false), pantheon (x | false), ufuk_y, dolly_foe, yem_teknesi. Yönetmenin anlatımsal alanları da okunur:
// animasyonlar[{ad:"kus kalkis"|"kus cikis"}], kus.kuyruk_kilifi.parilti, kus_iner, kanat_toplar, kilif_parilti, kumes.kus_girisi.
import React, { useId } from "react";
import { interpolate } from "remotion";
import { RenkKaydi } from "../../../doku/Tarama";
import { KonturTitreme } from "../../../doku/KonturTitreme";
import { DOKU_SEED } from "../../../doku/sabitler";
import { KolEl, KISTIR_YEREL, EL_BOY_YEREL, elMatris } from "../../../rig/KolEl";
import { cirpis, Guvercin, kusAyakEkran, KusPoz, KUS_POZ, kusYerlesim, pozKaris } from "../../props/paris/Guvercin";
import { Kilif, KILIF_DUGUM } from "../../props/paris/Kilif";
import { SiluetFigur, SiluetKod, siluetBoy } from "../../props/paris/SiluetFigur";
import type { P, Plan } from "../../tipler";
import { cl, GIRIS, INOUT, kameraHesapla } from "../../zaman";
import { param, Sablon, SablonProps } from "../../ortak";
import { pchip } from "../galata/GalataTepe";
import { DOLLY_CATI, Dolly, dunyaEkran, ekranPxm, katman, kameraDunya } from "./dolly";
import {
  BacaDunya, BacaKumesiDunya, CATI_PALET, CatiDenizi, CatiSatir, CinkoTeras, Duman, Flu, fluSigma, GokLitografi, golgeCokgen, golgeVektor, HaleParilti,
  K1Sirt, K4, K4Sira, kirpCiz, KIRIK_Z, KUMES_V2, KumesDunya, kumesCerceve, kutuKose, Saat, tahtaUstEkran, V3, YEM_TEKNESI, YemTeknesi,
} from "./catiDekor";

const S = DOKU_SEED.parisCati;
// Sağ baca kümesi kendi terasımızda (mekanlar §1v2.2; A2 değeri korunur)
const SAG_BACA: BacaDunya = { X0: 1.3, X1: 1.8, Z: 4.4, derin: 0.45, hGovde: 1.4, baslik: 0.07, kulahSayi: 4, kulahCap: 0.1, kulahBoy: 0.28 };
type Siluet = { x: number; kod: SiluetKod; dx?: number };
// K4 ışıklı lucarne'larda 4 yüzsüz siluet (x 560–900; K4_BINALAR[2] aksları), kuşun gittiği yöne (sağ) bakar
const SILUET_VARS: Siluet[] = [{ x: 580, kod: "yetiskin-b" }, { x: 684, kod: "yetiskin-a" }, { x: 788, kod: "cocuk" }, { x: 892, kod: "yetiskin-a" }];
// Çatı denizi satırları (dekor px, cs 1; mekanlar §1v2.5)
const K2_SATIR: CatiSatir = { kornis: 690, kirik: 662, teras: 652, tarak: [6, 12], bina: [70, 150], renk: "#8d7899", seed: S + 2 };
const K3_SATIR: CatiSatir = { kornis: 872, kirik: 773, teras: 742, tarak: [26, 40], bina: [150, 260], renk: "#6d6384", kontur: "#4e4a68", lucarne: { ust: 805, alt: 850, w: 30, aks: 62 }, seed: S + 3 };
// Kuş tünek kılıfı (dünya): mekanlar §1v2.2 K; ayaklar rig'den tahta üstüne (h 0.655) düşer
const K0: V3 = [-0.509, 0.7, 5.056];

type Aralik = { bas: number; bit: number; temas?: number };
type KusPlan = { kalkis?: Aralik; cikis?: Aralik; iner?: Aralik; kanatTopla?: Aralik; parilti?: Aralik; yok: boolean };
type CozPlan = { bas: number; bit: number; temas: number; serit: Aralik } | null;
const aralikMi = (v: unknown): v is Aralik => !!v && typeof v === "object" && typeof (v as Aralik).bas === "number" && typeof (v as Aralik).bit === "number";
export const kusPlani = (plan: Plan): KusPlan => {
  const prm = plan.parametreler ?? {};
  const kp = (prm.kus && typeof prm.kus === "object" ? prm.kus : {}) as Record<string, unknown>;
  const anim = (ad: string) => ((prm.animasyonlar as (Aralik & { ad: string })[] | undefined) ?? []).find((a) => a.ad === ad);
  const sec = (...v: unknown[]) => v.find(aralikMi) as Aralik | undefined;
  return {
    yok: prm.kus === false,
    kalkis: sec(kp.kalkis, anim("kus kalkis")),
    cikis: sec(kp.cikis, anim("kus cikis")),
    iner: sec(kp.iner, prm.kus_iner, (prm.kumes as Record<string, unknown> | undefined)?.kus_girisi),
    kanatTopla: sec(kp.kanat_topla, prm.kanat_toplar),
    parilti: sec(kp.parilti, (kp.kuyruk_kilifi as Record<string, unknown> | undefined)?.parilti, prm.kilif_parilti),
  };
};
const cozPlani = (plan: Plan): CozPlan => {
  const c = plan.parametreler?.kilif_coz as (Aralik & { serit_cikar?: Aralik }) | undefined;
  if (!aralikMi(c)) return null;
  const temas = c.temas ?? Math.round((c.bas + c.bit) / 2);
  return { bas: c.bas, bit: c.bit, temas, serit: aralikMi(c.serit_cikar) ? c.serit_cikar : { bas: temas, bit: c.bit } };
};

type KusDurum = { kilif: V3; poz: KusPoz; konmus: boolean };
const t01 = (p: number, a: number, b: number, e = INOUT) => interpolate(p, [a, b], [0, 1], { ...cl, easing: e });
const yol3 = (kare: number[], pts: V3[], q: number): V3 => [0, 1, 2].map((i) => pchip(kare, pts.map((v) => v[i]), q)) as V3;
// Kalkış kanadı sınırlı (mekanlar §1v2.4: kanca kadrajında kanat ucu y ≥ 230): yukarı vuruş dikey değil, geriye yatık + kısalmış
// gövde 42° → 26°: kanca kadrajında baş üst yazı bandının (y 240–400) altında kalır (V2 f24 ölçümü: 42°'de baş y ≈ 330)
const KALK_YUKARI: KusPoz = { ...KUS_POZ["kalkis-a"], govde: 26, kanatYon: -132, kanatBoy: 0.82 };
const KALK_ASAGI: KusPoz = { ...KUS_POZ["kalkis-b"], govde: 26, kanatYon: 100, kanatBoy: 0.8 };
const UCUS_YUKARI: KusPoz = { ...KUS_POZ["ucus-yukari"], kanatYon: -118, kanatBoy: 0.9 };
const kusDurumu = (plan: Plan, p: number): KusDurum | null => {
  const K = kusPlani(plan);
  if (K.yok) return null;
  const T = KUS_POZ;
  if (K.kalkis) {
    // P01: kılıf dünya yolu (motion v2; P01 kamerasıyla ters izdüşümden: f24 kanca, f90 (620,650), f190 (760,470), f275 (1000,290), f330 kadraj dışı sağ-üst).
    // Kümesin sağından çıkar (çatı ve saçağa değmez), sağ bacanın arkasından ve üstünden geçer (Z ≥ 5, ekranda örtüşme yok).
    const t0 = K.kalkis.bas, t1 = K.kalkis.bit, t5 = K.cikis?.bit ?? t0 + 330, t4 = K.cikis?.bas ?? t5 - 55;
    if (p > t5) return null;
    const o = (t5 - t0) / 330, kare = [0, 24, 60, 90, 140, 190, 240, 275, 330].map((f) => t0 + f * o);
    const pts: V3[] = [K0, [-0.502, 0.712, 5.04], [-0.404, 0.898, 5.08], [-0.295, 1.142, 5.35], [0.033, 1.788, 6.2], [0.411, 2.637, 7.0], [1.328, 3.518, 8.0], [2.674, 4.693, 9.0], [4.966, 6.908, 10.0]];
    const q = Math.max(p, t0), t2 = t0 + 70 * o;
    const poz = (r: number): KusPoz => {
      if (r < t0) return T["tunek"];
      const kalk = cirpis({ ...KALK_YUKARI, bacak: interpolate(r, [t0 + 3, t1], [1, 0.3], cl) }, r, t0, KALK_YUKARI, KALK_ASAGI, 14);
      const ucus = cirpis(UCUS_YUKARI, r, t0, UCUS_YUKARI, T["ucus-asagi"], 16);
      // f0: gövde/kuyruk tünek pozunda (P11 son kare kılıf açısı), kanat açılmaya başlamış (ilk kare hareketli)
      const ilk = { ...T["tunek"], kanat: 0.55, kanatYon: -120, kanatBoy: 0.75 };
      let z = pozKaris(ilk, kalk, t01(r, t0, t0 + 10));
      z = pozKaris(z, ucus, t01(r, t1, t2));
      z = pozKaris(z, T["suzulme"], t01(r, t2, t2 + 26));
      if (r > t4 - 12) z = pozKaris(z, cirpis(T["ucus-yukari"], r, t0, T["ucus-yukari"], T["ucus-asagi"], 14), t01(r, t4 - 12, t4));
      return z;
    };
    return { kilif: yol3(kare, pts, q), poz: poz(p), konmus: p < t0 + 3 };
  }
  if (K.iner) {
    // P11 son / P10a: sol üstten, kümes saçağının ÜSTÜNDEN ve ön yüzün ÖNÜNDEN (Z 4.98–5.0) iner; duvar/saçak içinden geçmez
    const tb = K.iner.bas, tL = K.iner.temas ?? K.iner.bit;
    const kare = [tb, tL - 14, tL];
    const pts: V3[] = [[-0.95, 1.75, 4.98], [-0.52, 1.05, 5.0], K0];
    const q = Math.min(Math.max(p, tb), tL);
    let kilif = yol3(kare, pts, q);
    // oturma: konunca gövde 6 mm çöker, sönerek döner — kapanış anı
    if (p > tL && p < tL + 22) kilif = [K0[0], K0[1] - 0.006 * Math.sin(((p - tL) / 22) * Math.PI) * Math.exp(-(p - tL) / 14), K0[2]];
    const kt = K.kanatTopla ?? { bas: tL, bit: tL + 30 };
    let z: KusPoz = cirpis(UCUS_YUKARI, p, tb, UCUS_YUKARI, T["ucus-asagi"], 16);
    z = pozKaris(z, T["konma"], t01(p, tL - 16, tL - 3));
    if (p >= tL) z = pozKaris(pozKaris(T["konma"], T["kanat-topla"], t01(p, tL, (kt.bas + kt.bit) / 2)), T["tunek"], t01(p, (kt.bas + kt.bit) / 2, kt.bit));
    return { kilif, poz: z, konmus: p >= tL };
  }
  return { kilif: K0, poz: T["tunek"], konmus: true };
};

// el (Paris eli, kömür-gri manşet; tasarım §13.8): kıstırma noktası düğümde; alttan girer, düğümü çeker (temas), ip ucuyla geri çekilir.
const kistirNokta = (coz: NonNullable<CozPlan>, p: number, dugum: P, pxm: number): P => {
  const cek = interpolate(p, [coz.temas - 2, coz.temas + 8], [0, 1], { ...cl, easing: INOUT });
  return [dugum[0] - 0.002 * pxm - 0.03 * pxm * cek, dugum[1] + 0.008 * pxm + 0.04 * pxm * cek];
};
const EL_BOY_M = 0.18; // bilekten parmak ucuna (kuş gövdesi 0.32 m → %56)
const ElKatmani: React.FC<{ coz: NonNullable<CozPlan>; p: number; dugum: P; pxm: number; kilif: React.ReactNode; gun: boolean }> = ({ coz, p, dugum, pxm, kilif, gun }) => {
  const giris = interpolate(p, [coz.bas, coz.bas + 12], [0, 1], { ...cl, easing: GIRIS });
  if (giris <= 0) return null;
  const hedef = kistirNokta(coz, p, dugum, pxm);
  const bas: P = [hedef[0] - 160, hedef[1] + 1100];
  const kistir: P = [bas[0] + (hedef[0] - bas[0]) * giris, bas[1] + (hedef[1] - bas[1]) * giris];
  const elAci = -70, olcek = (EL_BOY_M * pxm) / EL_BOY_YEREL;
  // önkol yönü (dirsek → bilek) bu açıyla aynı; KolEl eli bilekten 12 px ileride başlatır (elBilek) → onu geri al (A2: kıstırma 12 px kopuktu)
  const r = (elAci * Math.PI) / 180, yon: P = [Math.cos(r), Math.sin(r)];
  const yerel = elMatris([0, 0], elAci, olcek)(KISTIR_YEREL);
  const elBilek: P = [kistir[0] - yerel[0], kistir[1] - yerel[1]];
  const bilek: P = [elBilek[0] - 12 * yon[0], elBilek[1] - 12 * yon[1]];
  const dirsek: P = [bilek[0] - 0.24 * pxm * yon[0] - 0.03 * pxm, bilek[1] - 0.24 * pxm * yon[1]];
  const omuz: P = [dirsek[0] - 0.1 * pxm, dirsek[1] + 0.5 * pxm];
  // tutulan: kılıf (mutlak çizim) işaret parmağının ÖNÜNDE, başparmağın ARKASINDA — KolEl onu kıstırma noktasına taşır, biz geri alırız
  const tutulan = <g transform={`translate(${-kistir[0]} ${-kistir[1]})`}>{kilif}</g>;
  return <KolEl giris={omuz} dirsek={dirsek} bilek={bilek} gen={[0.16 * pxm, 0.105 * pxm, 0.068 * pxm]} tip="parisGri" elAci={elAci} olcek={olcek} poz="kistirSiki" tutulan={tutulan}
    isik={{ yon: gun ? [-1, -0.2] : [0.4, -1], renk: gun ? "#efe6cc" : "#e6b5a0", aci: 72, sertlik: 0.8, murekkep: "#2f2d46" }} />;
};

const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const uid = "pc" + useId().replace(/:/g, "");
  const saat = param<Saat>(plan, "saat", "alacakaranlik");
  const C = CATI_PALET[saat] ?? CATI_PALET.alacakaranlik;
  const D: Dolly = { ...DOLLY_CATI, ufuk: param(plan, "ufuk_y", DOLLY_CATI.ufuk), foe: param<P>(plan, "dolly_foe", DOLLY_CATI.foe) };
  const kam = (q: number) => kameraHesapla(plan.kamera, q);
  const k = kam(p);
  const kamDunya = kameraDunya(D, k.cs);
  const L = (d: number) => katman(D, k, d);
  const dZ = (Z: number) => Z / D.Zk;
  const kus = kusDurumu(plan, p);
  const coz = cozPlani(plan);
  const kp = kusPlani(plan);
  const siluetler = param<Siluet[] | false>(plan, "siluetler", saat === "alacakaranlik" ? SILUET_VARS : false) || [];
  const pantheonX = param<number | false>(plan, "pantheon", 830);
  const KM = KUMES_V2;

  // ---- flu (kanca tarafı) ----
  const sK1 = fluSigma(5, k.cs), sK2 = fluSigma(5, k.cs), sK3 = fluSigma(7, k.cs), sK4 = fluSigma(7, k.cs), sTeras = fluSigma(5, k.cs);

  // ---- kuş + kılıf ekran durumu ----
  const kusEkran = kus ? (() => {
    const c = dunyaEkran(D, k, ...kus.kilif);
    if (!c) return null;
    const pxm = ekranPxm(D, k, dZ(kus.kilif[2])), olcek = pxm / 1000;
    // kalkışta kanat tavanı (mekanlar §1v2.4: kanat ucu y ≥ 230, kamera değil kanat sınırlanır): yukarı bakan kanat kısalır (kısalma = kameraya dönük)
    if (kp.kalkis && kus.poz.kanat > 0.3) {
      const omuz = kusYerlesim(kus.poz, c, olcek).ekran([14, -28]), yukari = -Math.sin((kus.poz.kanatYon * Math.PI) / 180);
      if (yukari > 0.05) kus.poz = { ...kus.poz, kanatBoy: Math.max(0.35, Math.min(kus.poz.kanatBoy, (omuz[1] - 240) / (300 * olcek * yukari))) };
    }
    const Y = kusYerlesim(kus.poz, c, olcek);
    const r = (Y.kilifAci * Math.PI) / 180;
    const dugum: P = [c[0] + (KILIF_DUGUM[0] * Math.cos(r) - KILIF_DUGUM[1] * Math.sin(r)) * olcek, c[1] + (KILIF_DUGUM[0] * Math.sin(r) + KILIF_DUGUM[1] * Math.cos(r)) * olcek];
    return { capa: c, pxm, olcek, dugum, aci: Y.kilifAci };
  })() : null;
  const parilti = kp.parilti && p >= kp.parilti.bas && p <= kp.parilti.bit ? -1 + 2 * t01(p, kp.parilti.bas, kp.parilti.bit) : null;
  const cozT = coz ? interpolate(p, [coz.temas - 2, coz.temas + 6], [0, 1], { ...cl, easing: INOUT }) : 0;
  const kapak = coz ? interpolate(p, [coz.serit.bas, coz.serit.bas + 6], [0, 1], { ...cl, easing: GIRIS }) : 0;
  const serit = coz ? interpolate(p, [coz.serit.bas + 3, coz.serit.bit], [0, 1], { ...cl, easing: GIRIS }) : 0;
  const ipUc: P | undefined = coz && kusEkran && p >= coz.bas + 10 ? kistirNokta(coz, p, kusEkran.dugum, kusEkran.pxm) : undefined;
  const elVar = !!coz && p >= coz.bas;

  // ---- kilit noktaları (güvenli alan bindirmesi) ----
  if (kusEkran) {
    kilit.push({ ad: "kılıf", p: kusEkran.capa, tur: "dokunus" });
    if (kus!.konmus) kusAyakEkran(kus!.poz, kusEkran.capa, kusEkran.olcek).forEach((q, i) => kilit.push({ ad: `güvercin ayak ${i + 1}`, p: q, tur: "ayak" }));
  }
  { const { W } = kumesCerceve(KM); [W(0.02, -0.02, 0), W(KM.en - 0.03, -0.02, 0)].forEach((q, i) => { const e = dunyaEkran(D, k, ...q); if (e && e[1] < 1920 && e[0] > 0 && e[0] < 1080) kilit.push({ ad: `kümes ayak ${i + 1}`, p: e, tur: "temas" }); }); }
  // sağ baca: kadraj kenarı çerçevesi (mekanlar §1v2.5 x 932–1082), temas/olay noktası değil → kilit listesine girmez (IG sağ sütunu altında kalması kasıtlı)

  // ---- zemin gölgeleri + ışık şeridi (tek kaynak: golgeVektor(saat)) ----
  const { W } = kumesCerceve(KM);
  const kumesKose: V3[] = [W(0, 0, 0), W(KM.en, 0, 0), W(KM.en, -KM.derin, 0), W(0, -KM.derin, 0), W(-0.05, 0.1, 0.99), W(KM.en + 0.05, 0.1, 0.99), W(KM.en + 0.05, -KM.derin - 0.05, 1.21), W(-0.05, -KM.derin - 0.05, 1.21)];
  const golgeListe = [
    golgeCokgen(D, k, saat, kumesKose),
    golgeCokgen(D, k, saat, kutuKose(SAG_BACA.X0, SAG_BACA.X1, SAG_BACA.Z, SAG_BACA.Z + SAG_BACA.derin, SAG_BACA.hGovde + SAG_BACA.baslik + SAG_BACA.kulahBoy)),
    param(plan, "yem_teknesi", true) ? golgeCokgen(D, k, saat, kutuKose(YEM_TEKNESI.X0, YEM_TEKNESI.X1, YEM_TEKNESI.Z0, YEM_TEKNESI.Z0 + YEM_TEKNESI.derin, YEM_TEKNESI.h)) : null,
  ];
  const golgeler = <g fill={C.golge} opacity={C.golgeA}>{golgeListe.map((g, i) => g && <polygon key={i} points={g.map((q) => q.join(",")).join(" ")} />)}</g>;
  // ışık şeridi: kümes gölgesinin sağ kenarı ile sağ baca gölgesinin sol kenarı arası (aynı vektör doğrultusunda), Z ≤ 5.9
  const gv = golgeVektor(saat), oran = gv[0] / gv[1];
  const isikSerit = saat === "alacakaranlik" ? (() => {
    const xl = (Z: number) => -0.48 + oran * (Z - 5.2), xr = (Z: number) => SAG_BACA.X0 + oran * (Z - SAG_BACA.Z);
    const Zn = 0.3;
    return kirpCiz(D, k, [[xl(5.9), 0, 5.9], [xr(5.9), 0, 5.9], [xr(Zn), 0, Zn], [xl(Zn), 0, Zn]]);
  })() : null;

  // ---- kuşun temas gölgesi (tahta üstüne kırpılır; yön tek ışıktan) ----
  const tahtaPoly = tahtaUstEkran(D, k, KM);
  const kusGolge = kus && kus.konmus && kusEkran && tahtaPoly ? (() => {
    const ay = kusAyakEkran(kus.poz, kusEkran.capa, kusEkran.olcek);
    const cx = (ay[0][0] + ay[1][0]) / 2, cy = Math.max(ay[0][1], ay[1][1]), s = kusEkran.pxm / 1000;
    const sola = gv[0] < 0;
    return (
      <g>
        <defs><clipPath id={`${uid}inis`}><polygon points={tahtaPoly.map((q) => q.join(",")).join(" ")} /></clipPath></defs>
        <g clipPath={`url(#${uid}inis)`}>
          <ellipse cx={cx + (sola ? -60 : 60) * s} cy={cy + 6 * s} rx={95 * s} ry={9 * s} fill={C.golge} opacity={0.55} />
          <ellipse cx={cx} cy={cy + 1 * s} rx={22 * s} ry={4.5 * s} fill="#1d1a26" opacity={0.6} />
        </g>
      </g>
    );
  })() : null;

  const kontur3 = sK3 <= 3, kontur4 = sK4 <= 3;
  const L4 = L(dZ(20));
  const siluetCiz = siluetler.map((q, i) => {
    const H = siluetBoy(q.kod), gorunen = q.kod === "cocuk" ? 0.55 : 0.8, pxm = K4.pxm * L4.s, w = 0.9 * K4.pxm;
    const ayak = L4.T([q.x + (q.dx ?? 0), K4.lucEsik - 2 + (H - gorunen) * K4.pxm]);
    const a = L4.T([q.x - w / 2, K4.lucUst + 6]), b = L4.T([q.x + w / 2, K4.lucEsik - 2]);
    return <SiluetFigur key={i} kod={q.kod} ayak={ayak} pxm={pxm} renk={C.siluet} kenar={{ renk: C.siluetKenar, dx: saat === "gun" ? -2 : 2, dy: -1 }} klip={[a[0], a[1], b[0] - a[0], b[1] - a[1]]} />;
  });
  const L2 = L(dZ(120)), L3 = L(dZ(38));

  const uzak = (
    <g>
      <Flu id={`${uid}f1`} sigma={sK1}><K1Sirt C={C} L={L(dZ(900))} seed={S + 1} pantheon={pantheonX} /></Flu>
      <Flu id={`${uid}f2`} sigma={sK2}>
        <CatiDenizi L={L2} S={{ ...K2_SATIR, renk: C.k2 }} C={C} />
        {C.duman && C.dumanSayi >= 3 && <Duman L={L2} kaynak={[150, 636]} boy={80} kalin={4} renk={C.duman} seed={S + 11} t={p} />}
      </Flu>
      <Flu id={`${uid}f3`} sigma={sK3}>
        <CatiDenizi L={L3} S={{ ...K3_SATIR, renk: C.k3, kontur: kontur3 ? C.k3Kontur : undefined }} C={C} />
        {C.duman && C.dumanSayi >= 2 && <Duman L={L3} kaynak={[300, 700]} boy={120} kalin={6} renk={C.duman} seed={S + 12} t={p} />}
      </Flu>
      <Flu id={`${uid}f4`} sigma={sK4}>
        <K4Sira C={C} L={L4} seed={S + 4} saat={saat} isikliZorunlu={siluetler.map((q) => q.x)} kontur={kontur4} cocuk={siluetCiz} />
        {C.duman && <Duman L={L4} kaynak={[700, 838]} boy={170} kalin={9} renk={C.duman} seed={S + 13} t={p} />}
      </Flu>
    </g>
  );
  const yem = param(plan, "yem_teknesi", true);
  const yakin = (
    <g>
      <Flu id={`${uid}ft`} sigma={sTeras}><CinkoTeras D={D} k={k} C={C} isikSerit={isikSerit} golgeler={golgeler} seed={S} /></Flu>
      <KonturTitreme derinlik="orta" seed={S} olcek={1.6}>
        <KumesDunya D={D} k={k} K={KM} C={C} seed={S + 6} saat={saat} kamera={kamDunya} uid={uid} />
        {yem && <YemTeknesi D={D} k={k} t={YEM_TEKNESI} C={C} seed={S + 8} uid={uid} />}
        <BacaKumesiDunya D={D} k={k} b={SAG_BACA} C={C} seed={S + 5} />
      </KonturTitreme>
    </g>
  );
  const kilifCiz = kusEkran ? (
    <g transform={`translate(${kusEkran.capa[0]} ${kusEkran.capa[1]}) rotate(${kusEkran.aci}) scale(${kusEkran.olcek})`}>
      <Kilif olcek={kusEkran.olcek} parilti={parilti} coz={cozT} kapak={kapak} serit={serit} ipUc={ipUc ? (() => { const dx = ipUc[0] - kusEkran.capa[0], dy = ipUc[1] - kusEkran.capa[1], r = (-kusEkran.aci * Math.PI) / 180; return [(dx * Math.cos(r) - dy * Math.sin(r)) / kusEkran.olcek, (dx * Math.sin(r) + dy * Math.cos(r)) / kusEkran.olcek] as P; })() : undefined} />
    </g>
  ) : null;
  void KIRIK_Z;
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <RenkKaydi>
        <GokLitografi C={C} k={k} seed={S} />
        <HaleParilti C={C} k={k} />
        {uzak}
        {yakin}
        {kusGolge}
        {kus && kusEkran && (
          <Guvercin poz={kus.poz} capa={kusEkran.capa} olcek={kusEkran.olcek}
            kenar={{ renk: C.kenar, dx: saat === "gun" ? -2.5 : 2.5, dy: -2.5 }}
            kilif={{ parilti, coz: cozT, kapak, serit, ipUcEkran: ipUc }} />
        )}
        {elVar && kusEkran && coz && <ElKatmani coz={coz} p={p} dugum={kusEkran.dugum} pxm={kusEkran.pxm} kilif={kilifCiz} gun={saat === "gun"} />}
      </RenkKaydi>
    </svg>
  );
};
const arsiv = (plan: Plan) => (param<Saat>(plan, "saat", "alacakaranlik") === "gun" ? "gunduzMineral" as const : "litografi" as const);
export const PARIS_CATI: Sablon = { Sahne, arsiv };
