// ===== KE-PK-S1 PARIS-CATI v3 (Paris kuşatması 1870; mekanlar.md §1v3 (+ §1v2) · tasarim.md §13) =====
// Tek dekor + tek doğrusal dolly (dolly.ts DOLLY_CATI v3): geniş kamera (cs 1) göz teras üstü 5.0 m (komşu çatıda), ufuk 600 → kanca kamerası (cs 2.75)
// kılıfın 0.49 m önünde, göz 0.73 m (ufuk kuşun göğsünde). Çatı denizi K4 · K4b · K3 · K3b dünya modelinde (CatiSirasi), ön-plan çerçeve (OnCerceve). gorunum "cati" = "kumes" (aynı dekor). saat "alacakaranlik" | "gun".
// Uzak katmanlar dekor px + L(d) (flu kanca tarafında), yakın katmanlar (teras, kümes, sağ baca, tekne, kuş) DÜNYA modeli → dunyaEkran.
// Döngü kilidi: P01 f0 ve P11 son kare AYNI cs/cx/cy (2.75/105/279) + kuş tünekte aynı kılıf noktası → kılıf ekran (≈374, 960).
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
import { cirpis, Guvercin, kanatEkran, kilifOfset, kusAyakEkran, KusPoz, KUS_POZ, kusYerlesim, pozKaris } from "../../props/paris/Guvercin";
import { Kilif, KILIF_DUGUM } from "../../props/paris/Kilif";
import { SiluetFigur, SiluetKod, siluetBoy } from "../../props/paris/SiluetFigur";
import type { P, Plan } from "../../tipler";
import { cl, GIRIS, INOUT, kameraHesapla } from "../../zaman";
import { param, Sablon, SablonProps } from "../../ortak";
import { pchip } from "../galata/GalataTepe";
import { DOLLY_CATI, Dolly, dunyaEkran, dunyaTaban, ekranPxm, katman, kameraDunya } from "./dolly";
import {
  BacaDunya, BacaKumesiDunya, CATI_PALET, CatiDenizi, CatiSatir, CatiSirasi, CinkoTeras, sirasiBacalar, Duman, Flu, fluSigma, GokLitografi, golgeCokgen, golgeVektor, HaleParilti,
  K1Sirt, k4Lucarne, k4LucarneBul, kirpCiz, KIRIK_Z, KUMES_V2, kumesCatiEkran, KumesDunya, kumesCerceve, kutuKose, OnCerceve, Saat, SIRALAR, tahtaUstEkran, V3, YEM_TEKNESI, YemTeknesi,
} from "./catiDekor";

const S = DOKU_SEED.parisCati;
// Sağ baca kümesi kendi terasımızda (mekanlar §1v3.2: güvenli alanda, kilit/temas noktası değil, çerçeve öğesi)
const SAG_BACA: BacaDunya = { X0: 2.2, X1: 2.7, Z: 8.0, derin: 0.45, hGovde: 1.4, baslik: 0.07, kulahSayi: 4, kulahCap: 0.1, kulahBoy: 0.28 };
type Siluet = { x: number; kod: SiluetKod; dx?: number };
// K4 ışıklı lucarne'larda en çok 3 yüzsüz siluet (mekanlar §1v3.7); x = cs 1 ekran x → en yakın K4 lucarne. Kuşun gittiği yöne (sağ) bakar
const SILUET_VARS: Siluet[] = [{ x: 610, kod: "yetiskin-b" }, { x: 760, kod: "cocuk" }, { x: 905, kod: "yetiskin-a" }];
// K2 siluet (dekor px, cs 1; §1v3.3: 585–655, kontursuz, tarak)
const K2_SATIR: CatiSatir = { kornis: 655, kirik: 627, teras: 617, tarak: [18, 32], bina: [70, 150], renk: "#9a80a0", seed: S + 2 };
// Kuş tünek kılıfı (dünya): mekanlar §1v3.2 K (V2'ye göre ΔX −0.35, ΔZ +2.80); ayaklar rig'den tahta üstüne (h 0.655) düşer
const K0: V3 = [-0.859, 0.7, 7.856];

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
// v4 (tur-7): kalkışta kuyruk yarı yelpaze (0.75) ve gövde ekseninde (0°) — tünek (0.12, −35°) → kalkış 24 karede kademeli
const KALK_YUKARI: KusPoz = { ...KUS_POZ["kalkis-a"], govde: 26, kanatYon: -132, kanatBoy: 0.82, kuyruk: 0.75, kuyrukAci: 0 };
const KALK_ASAGI: KusPoz = { ...KUS_POZ["kalkis-b"], govde: 26, kanatYon: 100, kanatBoy: 0.8, kuyruk: 0.75, kuyrukAci: 0 };
const UCUS_YUKARI: KusPoz = { ...KUS_POZ["ucus-yukari"], kanatYon: -118, kanatBoy: 0.9 };
const kusDurumu = (plan: Plan, p: number): KusDurum | null => {
  const K = kusPlani(plan);
  if (K.yok) return null;
  const T = KUS_POZ;
  if (K.kalkis) {
    // P01: kılıf dünya yolu (motion v3; P01 v3 kamerasıyla ters izdüşümden — kılıf ekranı: f40 (430,905), f60 (525,850), f90 (590,780),
    // f140 (650,705), f190 (720,645), f240 (810,605), f275 (900,575) halenin önü, f330 (1180,240) sağ-üstten kadraj dışı).
    // Kalkışta önce kameradan UZAKLAŞIR (Z 7.86 → 8.9 f90'da): kanca yakınlığında kuş küçülür, sağ kenardan taşmaz (V2 f40–50 kusuru).
    // Kümesin sağ duvarının (X ≤ −1.0) sağından çıkar, saçağa değmez; sağ bacanın (Z 8.0–8.45) arkasından ve çok üstünden geçer.
    const t0 = K.kalkis.bas, t1 = K.kalkis.bit, t5 = K.cikis?.bit ?? t0 + 330, t4 = K.cikis?.bas ?? t5 - 55;
    if (p > t5) return null;
    const o = (t5 - t0) / 330, kare = [0, 24, 40, 60, 90, 140, 190, 240, 275, 330].map((f) => t0 + f * o);
    // v4: f24'te kameraya derinlik itmesi YOK (Z sabit 7.856; v3: 7.84) — kuş yerinde yükselir (2.5 cm, bacak itişi), sonra uzaklaşır
    const pts: V3[] = [K0, [-0.853, 0.725, 7.856], [-0.86, 0.76, 8.0], [-0.825, 0.995, 8.35], [-0.727, 1.27, 8.9], [-0.402, 1.927, 9.8], [0.335, 2.842, 10.8], [1.348, 3.511, 12.0], [3.183, 4.653, 13.5], [7.067, 8.696, 15.5]];
    const q = Math.max(p, t0), t2 = t0 + 70 * o;
    const poz = (r: number): KusPoz => {
      if (r < t0) return T["tunek"];
      // faz: f24 (kontrol_kare) kanat YUKARIDA (vuruş tepesi) — ileri bakan ara faz kısalıp blok gibi okunuyordu (V2/v3 ilk deneme)
      const kalk = cirpis({ ...KALK_YUKARI, bacak: interpolate(r, [t0 + 3, t1], [1, 0.3], cl) }, r, t0 - 4, KALK_YUKARI, KALK_ASAGI, 14);
      const ucus = cirpis(UCUS_YUKARI, r, t0, UCUS_YUKARI, T["ucus-asagi"], 16);
      // f0: gövde/kuyruk tünek pozunda (P11 son kare kılıf açısı), kanat açılmaya başlamış (ilk kare hareketli)
      const ilk = { ...T["tunek"], kanat: 0.55, kanatYon: -120, kanatBoy: 0.75 };
      let z = pozKaris(ilk, kalk, t01(r, t0, t0 + 10));
      // v4: gövde eğimi + kuyruk açılımı/açısı kanattan yavaş (24 kare) — kuyruk "bir anda yelpaze" olmaz, kılıf kademeli döner
      const g = t01(r, t0, t0 + 24);
      z = { ...z, govde: ilk.govde + (kalk.govde - ilk.govde) * g, kuyruk: ilk.kuyruk + (kalk.kuyruk - ilk.kuyruk) * g, kuyrukAci: ilk.kuyrukAci + (kalk.kuyrukAci - ilk.kuyrukAci) * g };
      z = pozKaris(z, ucus, t01(r, t1, t2));
      z = pozKaris(z, T["suzulme"], t01(r, t2, t2 + 26));
      if (r > t4 - 12) z = pozKaris(z, cirpis(T["ucus-yukari"], r, t0, T["ucus-yukari"], T["ucus-asagi"], 14), t01(r, t4 - 12, t4));
      return z;
    };
    return { kilif: yol3(kare, pts, q), poz: poz(p), konmus: p < t0 + 3 };
  }
  if (K.iner) {
    // P11 son / P10a: sol üstten, kümes saçağının ÜSTÜNDEN ve ön yüzün ÖNÜNDEN (Z 7.78–7.80; v2 + ΔX −0.35, ΔZ +2.80) iner; duvar/saçak içinden geçmez
    const tb = K.iner.bas, tL = K.iner.temas ?? K.iner.bit;
    const kare = [tb, tL - 14, tL];
    const pts: V3[] = [[-1.3, 1.75, 7.78], [-0.87, 1.05, 7.8], K0];
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
    // v4 (tur-7): KALKIŞTA GÖVDE ÇAPALI — kılıf yolu tünek pozundaki gövde orijinini taşır; kuyruk açısı değişince gövde değil kılıf döner
    // (v3'te kılıf sabit, gövde kılıfın etrafında dönüyordu → f0–f24 kuş ~70 px "zıplıyordu"). f0'da ofset 0 → döngü kilidi aynı.
    if (kp.kalkis) { const a = kilifOfset(kus.poz), b = kilifOfset(KUS_POZ["tunek"]); c[0] += (a[0] - b[0]) * olcek; c[1] += (a[1] - b[1]) * olcek; }
    // kalkışta kanat sınırları (kamera değil kanat kısalır = kameraya dönük kısalma): tavan y ≥ 240 (mekanlar §1v2.4), sağ x ≤ 1050,
    // aşağı vuruş iniş tahtasının üstünde, v4: kümes saçağının alt kenarından ≥ 25 px aşağıda (V3 f24 "kanat çatıya çarptı" okuması)
    if (kp.kalkis && kus.poz.kanat > 0.3) {
      const cati = kumesCatiEkran(D, k, KUMES_V2);
      const catiX = cati.map((q) => q[0]), cx0 = Math.min(...catiX), cx1 = Math.max(...catiX);
      // çatı levhası dışbükey zarfının x'teki alt sınırı
      const altY = (x: number) => { let m = -1e9; for (let i = 0; i < cati.length; i++) for (let j = 0; j < cati.length; j++) { const A = cati[i], B = cati[j]; if ((A[0] - x) * (B[0] - x) <= 0 && A[0] !== B[0]) m = Math.max(m, A[1] + ((B[1] - A[1]) * (x - A[0])) / (B[0] - A[0])); } return m; };
      const omuzY = kusYerlesim(kus.poz, c, olcek).ekran([14, -28])[1];
      const sacakAltinda = cati.length >= 3 && omuzY > altY(Math.max(cx0, Math.min(cx1, kusYerlesim(kus.poz, c, olcek).ekran([14, -28])[0])));
      const tp = tahtaUstEkran(D, k, KUMES_V2);
      const tx0 = tp ? Math.min(...tp.map((q) => q[0])) - 50 : 0, tx1 = tp ? Math.max(...tp.map((q) => q[0])) + 50 : 0, tUst = tp ? Math.min(...tp.map((q) => q[1])) : 1e9;
      const ihlal = (z: KusPoz) => kanatEkran(z, c, olcek).some(([x, y]) => y < 240 || x > 1050 || (sacakAltinda && x >= cx0 && x <= cx1 && y < altY(x) + 25) || (!!tp && x > tx0 && x < tx1 && y > tUst - 8 && omuzY < tUst));
      let z = kus.poz;
      for (let i = 0; i < 40 && z.kanatBoy > 0.3 && ihlal(z); i++) z = { ...z, kanatBoy: z.kanatBoy - 0.02 };
      kus.poz = z;
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
    const xl = (Z: number) => KM.R[0] + 0.02 + oran * (Z - KM.R[1]), xr = (Z: number) => SAG_BACA.X0 + oran * (Z - SAG_BACA.Z);
    const Zf = KIRIK_Z - 0.5, Zn = 1.75;
    const Zp = 6.0; // v4: parlak lob (güneşe yakın yarı) — V3 eleştirisi 2: teras ışık şeridi görünür, L* ≥ 75
    return { serit: kirpCiz(D, k, [[xl(Zf), 0, Zf], [xr(Zf), 0, Zf], [xr(Zn), 0, Zn], [xl(Zn), 0, Zn]]), parlak: kirpCiz(D, k, [[xl(Zf), 0, Zf], [xr(Zf), 0, Zf], [xr(Zp), 0, Zp], [xl(Zp), 0, Zp]]) };
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
  // siluetler: K4 lucarne penceresinin içinde, pencereye 0.3 m geride, belden yukarısı (klip = pencere)
  const siluetYer = siluetler.slice(0, 3).map((q) => ({ q, bl: k4LucarneBul(D, q.x + (q.dx ?? 0)) }));
  const siluetCiz = siluetYer.map(({ q, bl }, i) => {
    const Lc = k4Lucarne(bl[0], bl[1]), H = siluetBoy(q.kod), gorunen = q.kod === "cocuk" ? 0.55 : 0.8;
    const ayak = dunyaEkran(D, k, Lc.X, Lc.esik - (H - gorunen), Lc.Z + 0.3), a = dunyaEkran(D, k, Lc.X - Lc.w / 2, Lc.ust, Lc.Z), b = dunyaEkran(D, k, Lc.X + Lc.w / 2, Lc.esik, Lc.Z);
    if (!ayak || !a || !b) return null;
    return <SiluetFigur key={i} kod={q.kod} ayak={ayak} pxm={ekranPxm(D, k, (Lc.Z + 0.3) / D.Zk)} renk={C.siluet} kenar={{ renk: C.siluetKenar, dx: saat === "gun" ? -2 : 2, dy: -1 }} klip={[a[0], a[1], b[0] - a[0], b[1] - a[1]]} golge={false} />;
  });
  const L2 = L(dZ(120));
  const siralar = SIRALAR(C);
  const sigmaSira: Record<string, number> = { K3b: fluSigma(6, k.cs), K3: sK3, K4b: fluSigma(7, k.cs), K4: sK4 };
  // duman kaynakları (dünya: baca tepesi yaklaşık) → katman eşleyicisi (Duman dekor px + L(d) kullanır)
  // §1v3.4: 3 şerit K2 (x ≈ 150), K3 (x ≈ 330), K4 (x ≈ 700) — sıranın cs 1 ekran x'ine en yakın bacanın başından
  const dumanYer = (ad: string, x: number) => {
    const R_ = siralar.find((r) => r.ad === ad)!, b = sirasiBacalar(R_).reduce((a, c) => Math.abs(540 + (D.F * c.X) / R_.Z - x) < Math.abs(540 + (D.F * a.X) / R_.Z - x) ? c : a);
    const t = dunyaTaban(D, b.X, b.tepe + 0.35, (b.z0 + b.z1) / 2); return { L: L(t.d), q: t.p };
  };

  const uzak = (
    <g>
      <Flu id={`${uid}f1`} sigma={sK1}><K1Sirt C={C} L={L(dZ(900))} seed={S + 1} pantheon={pantheonX} /></Flu>
      <Flu id={`${uid}f2`} sigma={sK2}>
        <CatiDenizi L={L2} S={{ ...K2_SATIR, renk: C.k2 }} C={C} />
        {C.duman && C.dumanSayi >= 3 && <Duman L={L2} kaynak={[150, 598]} boy={80} kalin={4} renk={C.duman} seed={S + 11} t={p} />}
      </Flu>
      {siralar.map((R_) => (
        <Flu key={R_.ad} id={`${uid}s${R_.ad}`} sigma={sigmaSira[R_.ad]}>
          <CatiSirasi D={D} k={k} S={R_} C={C} kamX={kamDunya[0]} saat={saat} kontur={R_.ad === "K4" ? kontur4 : kontur3}
            isikliZorunlu={R_.ad === "K4" ? siluetYer.map((q) => q.bl) : []} cocuk={R_.ad === "K4" ? siluetCiz : undefined} />
          {C.duman && R_.ad === "K3" && C.dumanSayi >= 2 && (() => { const d = dumanYer("K3", 330); return <Duman L={d.L} kaynak={d.q} boy={120} kalin={6} renk={C.duman} seed={S + 12} t={p} />; })()}
          {C.duman && R_.ad === "K4" && (() => { const d = dumanYer("K4", 700); return <Duman L={d.L} kaynak={d.q} boy={170} kalin={9} renk={C.duman} seed={S + 13} t={p} />; })()}
        </Flu>
      ))}
    </g>
  );
  const yem = param(plan, "yem_teknesi", true);
  const yakin = (
    <g>
      <Flu id={`${uid}ft`} sigma={sTeras}><CinkoTeras D={D} k={k} C={C} isikSerit={isikSerit?.serit ?? null} isikParlak={isikSerit?.parlak ?? null} golgeler={golgeler} seed={S} /></Flu>
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
            kenar={(() => { const r = Math.max(2.5, Math.min(7, 2.2 * kusEkran.olcek)); return { renk: C.kenar, dx: saat === "gun" ? -r : r, dy: -r }; })()}
            kilif={{ parilti, coz: cozT, kapak, serit, ipUcEkran: ipUc }} />
        )}
        <OnCerceve D={D} k={k} C={C} />
        {elVar && kusEkran && coz && <ElKatmani coz={coz} p={p} dugum={kusEkran.dugum} pxm={kusEkran.pxm} kilif={kilifCiz} gun={saat === "gun"} />}
      </RenkKaydi>
    </svg>
  );
};
const arsiv = (plan: Plan) => (param<Saat>(plan, "saat", "alacakaranlik") === "gun" ? "gunduzMineral" as const : "litografi" as const);
export const PARIS_CATI: Sablon = { Sahne, arsiv };
