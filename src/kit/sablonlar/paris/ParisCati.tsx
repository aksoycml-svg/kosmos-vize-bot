// ===== KE-PK-S1 PARIS-CATI (Paris kuşatması 1870; mekanlar.md §1, §9 · tasarim.md §1.2/§1.3, §2, §3.1, §4.2, §4.4) =====
// Haussmann SONRASI Paris çatı kotu: kendi terasımızda çömelmiş kümesçi gözü (teras üstü 1.0 m), kamera GGB'ye bakar.
// gorunum "cati" ve "kumes" AYNI dekordur (kümes yakın = dolly ile yaklaşılmış hâli); saat "alacakaranlik" | "gun".
// KAMERA DOLLY (dolly.ts): cs = kamera mesafesi, katman ölçeği d/(d − δ); ölçek merkezi = kılıf kilidi (FOE) dekor (540,960).
// Tünekteki kılıf her cs'de ekranda (540 + cx, 960 + cy)'de durur. Döngü kilidi: P01 f0 ve P11 son kare AYNI cs/cx/cy
// (bolum.json A2: 2.75 / −120 / −170 → kılıf ≈ (420,790), kuşun başı sağ üstte kadrajda). cx/cy pan/tilt (bütün katmanlara aynı).
// TEK IŞIK: alacakaranlık = batı ufuk parıltısı sağ-önde (gölge yok; 2 px kenar ışığı sağ/üst; pencereler ikincil krem havuz) ·
// gün = GD güneşi sol-önde, 12° (gölge sağa ve kameraya: dünya vektörü GUNES_GOLGE m/m yükseklik; tarama θ parametre, vars. 72°).
// Görüntüde DİL METNİ YOK. Kırmızı yok (külahlar soluk pişmiş toprak, kahverengiye çekik — tur-3). Sarı metal yok; imza kehribarı yalnız kılıfta.
// Parametreler (KATALOG.md "PARIS-CATI"): kus {kalkis, cikis, iner, kanat_topla, parilti, yok}, kilif_coz {bas, bit, temas, serit_cikar},
// siluetler (liste | false), pantheon (x | false), ufuk_y, kilif_kilit, tarama_aci. Yönetmenin anlatımsal alanları da okunur:
// animasyonlar[{ad:"kus kalkis"|"kus cikis"}], kus.kuyruk_kilifi.parilti, kus_iner, kanat_toplar, kilif_parilti, kumes.kus_girisi.
import React, { useId } from "react";
import { interpolate } from "remotion";
import { RenkKaydi } from "../../../doku/Tarama";
import { KonturTitreme } from "../../../doku/KonturTitreme";
import { DOKU_SEED } from "../../../doku/sabitler";
import { KolEl, KISTIR_YEREL, EL_BOY_YEREL } from "../../../rig/KolEl";
import { cirpis, Guvercin, kusAyakEkran, KusPoz, KUS_POZ, kusYerlesim, pozKaris } from "../../props/paris/Guvercin";
import { KILIF_DUGUM } from "../../props/paris/Kilif";
import { SiluetFigur, SiluetKod, siluetBoy } from "../../props/paris/SiluetFigur";
import type { P, Plan } from "../../tipler";
import { cl, GIRIS, INOUT, kameraHesapla, KameraDurum } from "../../zaman";
import { param, Sablon, SablonProps } from "../../ortak";
import { pchip } from "../galata/GalataTepe";
import { DOLLY_CATI, Dolly, dunyaEkran, ekranPxm, ekranTaban, katman, enYakinZ } from "./dolly";
import { BacaKumesiDunya, BacaDunya, CATI_PALET, CatiDenizi, CinkoTeras, Gok, isikSagMi, KARSI_SATIR, KarsiSira, Kumes, KUMES, Pantheon, Saat, UzakTepe, YEM_TEKNESI, YemTeknesi } from "./catiDekor";

const S = DOKU_SEED.parisCati;
const GUNES_GOLGE: [number, number] = [4.6, -0.9]; // gün: 1 m yüksekliğin zemindeki gölge kayması (X sağa, Z kameraya)
const ON_BACA: BacaDunya = { X0: -0.893, X1: -0.293, Z: 1.6, derin: 0.5, hAlt: 0, hGovde: 1.2, baslik: 0.1, kulahSayi: 2, kulahCap: 0.25, kulahBoy: 0.3 };
// Sağ baca kümesi KENDİ terasımızda (Z 4.4 < kırık çizgi Z 5; A'da Z 8 = sokağın havasındaydı). Ekran yeri korunarak X ölçeklendi.
const SAG_BACA: BacaDunya = { X0: 1.3, X1: 1.8, Z: 4.4, derin: 0.45, hAlt: 0, hGovde: 1.4, baslik: 0.07, kulahSayi: 4, kulahCap: 0.1, kulahBoy: 0.28 };
type Siluet = { x: number; kod: SiluetKod; dx?: number };
const SILUET_VARS: Siluet[] = [{ x: 220, kod: "yetiskin-b" }, { x: 760, kod: "yetiskin-a" }, { x: 923, kod: "yetiskin-b" }, { x: 1124, kod: "yetiskin-a", dx: -9 }, { x: 1124, kod: "cocuk", dx: 11 }];

type Aralik = { bas: number; bit: number; temas?: number };
type KusPlan = { kalkis?: Aralik; cikis?: Aralik; iner?: Aralik; kanatTopla?: Aralik; parilti?: Aralik; yok: boolean };
type CozPlan = { bas: number; bit: number; temas: number; serit: Aralik } | null;
const aralikMi = (v: unknown): v is Aralik => !!v && typeof v === "object" && typeof (v as Aralik).bas === "number" && typeof (v as Aralik).bit === "number";
// Normalleştirici: kanonik (kus.*) ya da yönetmenin anlatımsal alanları
export const kusPlani = (plan: Plan): KusPlan => {
  const prm = plan.parametreler ?? {};
  const kp = (prm.kus && typeof prm.kus === "object" ? prm.kus : {}) as Record<string, unknown>;
  const anim = (ad: string) => ((prm.animasyonlar as Aralik[] & { ad: string }[] | undefined) ?? []).find((a) => (a as unknown as { ad: string }).ad === ad);
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

type KusDurum = { capa: P; d: number; poz: KusPoz; konmus: boolean };
const t01 = (p: number, a: number, b: number, e = INOUT) => interpolate(p, [a, b], [0, 1], { ...cl, easing: e });
const kusDurumu = (plan: Plan, p: number, D: Dolly, kam: (q: number) => KameraDurum): KusDurum | null => {
  const K = kusPlani(plan), A0 = D.foe;
  if (K.yok) return null;
  const T = KUS_POZ;
  if (K.kalkis) {
    const t0 = K.kalkis.bas, t1 = K.kalkis.bit, t2 = t0 + 70;
    const t5 = K.cikis?.bit ?? t0 + 330, t4 = K.cikis?.bas ?? t5 - 55, tm = Math.round((t2 + t4) / 2);
    if (p > t5) return null;
    const cik = ekranTaban(D, kam(t5), [1320, -280], 1.5);
    const kare = [t0, t1, t2, tm, t4, t5];
    const xs = [A0[0], A0[0] + 4, A0[0] + 20, A0[0] + 100, A0[0] + 280, cik[0]];
    const ys = [A0[1], A0[1] - 22, A0[1] - 62, A0[1] - 200, A0[1] - 400, cik[1]];
    // derinlik: iniş tahtasından öne-yukarı itilir (tahta ön kenarı Z 2.75 = d 0.917; t1–t2 d 0.965–0.96 → kanca f24'te kılıf ≥ %10
    // ekran boyu), cephe saçağını geçince (tm) derinleşir. f0 d 1 (P11 son kare kilidi).
    const ds = [1, 0.965, 0.96, 1.12, 1.35, 1.5];
    const q = Math.max(p, t0);
    const capa: P = [pchip(kare, xs, q), pchip(kare, ys, q)];
    const d = pchip(kare, ds, q);
    const poz = (r: number): KusPoz => {
      if (r < t0) return T["tunek"];
      const kalk = cirpis({ ...T["kalkis-a"], bacak: interpolate(r, [t0 + 3, t1], [1, 0], cl) }, r, t0, T["kalkis-a"], T["kalkis-b"], 14);
      const ucus = cirpis(T["ucus-yukari"], r, t0, T["ucus-yukari"], T["ucus-asagi"], 16);
      // döngü: f0'da gövde/kuyruk hâlâ tünek pozunda (P11 son karesiyle aynı kılıf açısı), kanat açılmaya başlamış (ilk kare hareketli)
      const ilk = { ...T["tunek"], kanat: 0.55, kanatYon: -110, kanatBoy: 0.8 };
      let z = pozKaris(ilk, kalk, t01(r, t0, t0 + 10));
      z = pozKaris(z, ucus, t01(r, t1, t2));
      z = pozKaris(z, T["suzulme"], t01(r, t2, t2 + 26));
      if (r > t4 - 12) z = pozKaris(z, cirpis(T["ucus-yukari"], r, t0, T["ucus-yukari"], T["ucus-asagi"], 14), t01(r, t4 - 12, t4));
      return z;
    };
    return { capa, d, poz: poz(p), konmus: p < t0 + 3 };
  }
  if (K.iner) {
    const tb = K.iner.bas, tL = K.iner.temas ?? K.iner.bit;
    const k0 = kam(tb), pxm = ekranPxm(D, k0, 1);
    const bas = ekranTaban(D, k0, [-0.3 * pxm - 40, 960 + k0.cy - 0.18 * pxm], 1);
    const kare = [tb, tL - 14, tL];
    const q = Math.min(Math.max(p, tb), tL);
    let capa: P = [pchip(kare, [bas[0], A0[0] - 70, A0[0]], q), pchip(kare, [bas[1], A0[1] - 34, A0[1]], q)];
    // oturma: konunca gövde 3 px (dekor) çöker, sönerek döner — kapanış anı
    if (p > tL) capa = [A0[0], A0[1] + 3 * Math.sin(((p - tL) / 22) * Math.PI) * Math.exp(-(p - tL) / 14) * (p < tL + 22 ? 1 : 0)];
    const kt = K.kanatTopla ?? { bas: tL, bit: tL + 30 };
    let z: KusPoz = cirpis(T["ucus-yukari"], p, tb, T["ucus-yukari"], T["ucus-asagi"], 16);
    z = pozKaris(z, T["konma"], t01(p, tL - 16, tL - 3));
    if (p >= tL) z = pozKaris(pozKaris(T["konma"], T["kanat-topla"], t01(p, tL, (kt.bas + kt.bit) / 2)), T["tunek"], t01(p, (kt.bas + kt.bit) / 2, kt.bit));
    return { capa, d: 1, poz: z, konmus: p >= tL };
  }
  return { capa: A0, d: 1, poz: T["tunek"], konmus: true };
};

// el (Paris eli, kömür-gri manşet): kıstırma noktası düğümde; sol-alttan girer, düğümü çeker (temas), ip ucuyla geri çekilir
// kıstırma noktası (ekran): ip ucu düğümün 1.6 cm altında; temas çevresinde 3/4.5 cm sol-aşağı çekilir. El ve ip AYNI noktayı kullanır.
const kistirNokta = (coz: NonNullable<CozPlan>, p: number, dugum: P, pxm: number): P => {
  const cek = interpolate(p, [coz.temas - 2, coz.temas + 8], [0, 1], { ...cl, easing: INOUT });
  return [dugum[0] - 0.004 * pxm - 0.03 * pxm * cek, dugum[1] + 0.016 * pxm + 0.045 * pxm * cek];
};
const ElKatmani: React.FC<{ coz: NonNullable<CozPlan>; p: number; dugum: P; pxm: number }> = ({ coz, p, dugum, pxm }) => {
  const giris = interpolate(p, [coz.bas, coz.bas + 12], [0, 1], { ...cl, easing: GIRIS });
  if (giris <= 0) return null;
  const hedef = kistirNokta(coz, p, dugum, pxm);
  const bas: P = [hedef[0] - 140, hedef[1] + 1000];
  const kistir: P = [bas[0] + (hedef[0] - bas[0]) * giris, bas[1] + (hedef[1] - bas[1]) * giris];
  const elAci = -72, olcek = (0.19 * pxm) / EL_BOY_YEREL;
  const r = (elAci * Math.PI) / 180;
  const kx = KISTIR_YEREL[0] * olcek, ky = KISTIR_YEREL[1] * olcek;
  const bilek: P = [kistir[0] - (kx * Math.cos(r) - ky * Math.sin(r)), kistir[1] - (kx * Math.sin(r) + ky * Math.cos(r))];
  const omuz: P = [bilek[0] - 0.25 * pxm, bilek[1] + 0.9 * pxm];
  const dirsek: P = [(omuz[0] + bilek[0]) / 2 - 0.06 * pxm, (omuz[1] + bilek[1]) / 2 + 0.05 * pxm];
  return <KolEl giris={omuz} dirsek={dirsek} bilek={bilek} gen={[0.17 * pxm, 0.12 * pxm, 0.075 * pxm]} tip="parisGri" elAci={elAci} olcek={olcek} poz="kistirSiki" />;
};

// gün: dünya XZ'de gölge çokgeni (taban + gölgelenen tepe köşeleri, dışbükey zarf) → zemine izdüşüm
const golgeCokgen = (D: Dolly, k: KameraDurum, kose: [number, number, number][]): P[] | null => {
  const Zn = enYakinZ(D, k) + 0.02;
  const pts = kose.map(([X, h, Z]) => [X + GUNES_GOLGE[0] * h, Math.max(Zn, Z + GUNES_GOLGE[1] * h)] as P);
  const s = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cr = (o: P, a: P, b: P) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo: P[] = [], up: P[] = [];
  for (const q of s) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
  for (const q of [...s].reverse()) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); }
  const zarf = [...lo.slice(0, -1), ...up.slice(0, -1)];
  const e = zarf.map(([X, Z]) => dunyaEkran(D, k, X, 0, Z));
  return e.some((q) => !q) ? null : (e as P[]);
};
const kutuKose = (X0: number, X1: number, Z0: number, Z1: number, hOn: number, hArka: number): [number, number, number][] => [
  [X0, 0, Z0], [X1, 0, Z0], [X1, 0, Z1], [X0, 0, Z1], [X0, hOn, Z0], [X1, hOn, Z0], [X1, hArka, Z1], [X0, hArka, Z1],
];

const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const uid = "pc" + useId().replace(/:/g, "");
  const saat = param<Saat>(plan, "saat", "alacakaranlik");
  const C = CATI_PALET[saat] ?? CATI_PALET.alacakaranlik;
  const D: Dolly = { ...DOLLY_CATI, ufuk: param(plan, "ufuk_y", DOLLY_CATI.ufuk), foe: param<P>(plan, "kilif_kilit", DOLLY_CATI.foe) };
  const kam = (q: number) => kameraHesapla(plan.kamera, q);
  const k = kam(p);
  const taramaAci = param(plan, "tarama_aci", 72);
  const L = (d: number) => katman(D, k, d);
  const kus = kusDurumu(plan, p, D, kam);
  const coz = cozPlani(plan);
  const kp = kusPlani(plan);
  const siluetler = param<Siluet[] | false>(plan, "siluetler", saat === "alacakaranlik" ? SILUET_VARS : false) || [];
  const pantheonX = param<number | false>(plan, "pantheon", 880);

  // ---- kuş + kılıf ekran durumu ----
  const kusEkran = kus ? (() => {
    const Lk = L(kus.d);
    if (!Lk.gorunur) return null;
    const capa = Lk.T(kus.capa);
    const pxm = ekranPxm(D, k, kus.d), olcek = pxm / 1000;
    const Y = kusYerlesim(kus.poz, capa, olcek);
    const r = (Y.kilifAci * Math.PI) / 180;
    const dugum: P = [capa[0] + (KILIF_DUGUM[0] * Math.cos(r) - KILIF_DUGUM[1] * Math.sin(r)) * olcek, capa[1] + (KILIF_DUGUM[0] * Math.sin(r) + KILIF_DUGUM[1] * Math.cos(r)) * olcek];
    return { capa, pxm, olcek, dugum };
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
  const Lk1 = L(1);
  const kumesTemas = Lk1.T([(KUMES.x0 + KUMES.x1) / 2, KUMES.taban]);
  if (Lk1.gorunur && kumesTemas[1] < 1920 && kumesTemas[1] > 0) kilit.push({ ad: "kümes teması", p: kumesTemas, tur: "temas" });

  // ---- gün gölgeleri (tek kaynak: GUNES_GOLGE) ----
  const golgeler = saat === "gun" ? (
    <g fill="#14120f" opacity={0.32}>
      {[golgeCokgen(D, k, kutuKose(-0.9, 0.3, 3.0, 3.8, 0.9, 1.05)), golgeCokgen(D, k, kutuKose(ON_BACA.X0, ON_BACA.X1, ON_BACA.Z, ON_BACA.Z + ON_BACA.derin, ON_BACA.hGovde + 0.4, ON_BACA.hGovde + 0.4)),
        golgeCokgen(D, k, kutuKose(SAG_BACA.X0, SAG_BACA.X1, SAG_BACA.Z, SAG_BACA.Z + SAG_BACA.derin, SAG_BACA.hGovde + 0.35, SAG_BACA.hGovde + 0.35)),
        golgeCokgen(D, k, kutuKose(YEM_TEKNESI.X0, YEM_TEKNESI.X1, YEM_TEKNESI.Z0, YEM_TEKNESI.Z0 + YEM_TEKNESI.derin, YEM_TEKNESI.h, YEM_TEKNESI.h))].map((g, i) => g && <polygon key={i} points={g.map((q) => q.join(",")).join(" ")} />)}
    </g>
  ) : null;

  // ---- kuşun tünek gölgesi / temas koyuluğu (kümes kartında) ----
  const kusGolge = kus && kus.konmus && kusEkran ? (() => {
    const ay = kusAyakEkran(kus.poz, kusEkran.capa, kusEkran.olcek);
    const cx = (ay[0][0] + ay[1][0]) / 2, cy = Math.max(ay[0][1], ay[1][1]);
    const s = Lk1.s;
    const ust = [Lk1.T([KUMES.inisX[0], KUMES.inisUst]), Lk1.T([KUMES.inisX[1], KUMES.inisUst]), Lk1.T([KUMES.inisX[1] + 6, KUMES.inisOn]), Lk1.T([KUMES.inisX[0] - 6, KUMES.inisOn])];
    return (
      <g>
        <defs><clipPath id={`${uid}inis`}><polygon points={ust.map((q) => q.join(",")).join(" ")} /></clipPath></defs>
        <g clipPath={`url(#${uid}inis)`}>
          {saat === "gun" && <ellipse cx={cx + 30 * s} cy={cy + 1 * s} rx={42 * s} ry={4 * s} fill="#14120f" opacity={0.3} />}
          <ellipse cx={cx} cy={cy + 0.5 * s} rx={9 * s} ry={2.2 * s} fill="#14120f" opacity={0.5} />
        </g>
      </g>
    );
  })() : null;

  const dekor = (
    <g>
      <UzakTepe P={C} L={L(3300)} ufuk={D.ufuk} />
      {pantheonX !== false && <Pantheon P={C} L={L(500)} x={pantheonX} taban={D.ufuk + 9} />}
      <CatiDenizi L={L(100)} teras={D.ufuk + 3} tarak={[4, 10]} aralik={[60, 120]} renk={C.uzakCati} seed={S + 1} />
      <CatiDenizi L={L(40)} teras={D.ufuk + 5} tarak={[14, 24]} aralik={[120, 220]} renk={C.ortaCati} seed={S + 2} />
      <CatiDenizi L={L(20)} teras={D.ufuk + 9} tarak={[30, 42]} aralik={[150, 260]} renk={C.yakinCati} seed={S + 3} kulahli kenar={C.kenar} />
      <KarsiSira C={C} L={L(8.7)} seed={S + 4} saat={saat} taramaAci={taramaAci} isikliZorunlu={siluetler.map((q) => q.x)} ekBaca={[650, 1450]}
        cocuk={(() => {
          const L5 = L(8.7), Sr = KARSI_SATIR, pxm = 51 * L5.s, w = 0.9 * 51;
          return siluetler.map((q, i) => {
            const H = siluetBoy(q.kod), gorunen = q.kod === "cocuk" ? 0.55 : 0.8;
            const ayak = L5.T([q.x + (q.dx ?? 0), Sr.lucarneEsik - 2 + (H - gorunen) * 51]);
            const a = L5.T([q.x - w / 2, Sr.lucarneUst + 5]), b = L5.T([q.x + w / 2, Sr.lucarneEsik - 2]);
            return <SiluetFigur key={i} kod={q.kod} ayak={ayak} pxm={pxm} renk={C.siluet} kenar={C.kenar ? { renk: C.siluetKenar, dx: 2, dy: -1 } : undefined} klip={[a[0], a[1], b[0] - a[0], b[1] - a[1]]} />;
          });
        })()} />
      <CinkoTeras D={D} k={k} C={C} Zuzak={5} isikSag={isikSagMi(C)} golgeler={golgeler} />
      {/* sağ baca terasımızda (Z 4.4): teras zemininden SONRA çizilir, tabanı çinkoya basar */}
      <BacaKumesiDunya D={D} k={k} b={SAG_BACA} C={C} seed={S + 5} />
      {Lk1.gorunur && <Kumes C={C} L={Lk1} seed={S + 6} taramaAci={taramaAci} saat={saat} damar={Lk1.s >= 4.2} />}
      {param(plan, "yem_teknesi", true) && <YemTeknesi D={D} k={k} t={YEM_TEKNESI} C={C} seed={S + 8} uid={uid} />}
    </g>
  );
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <RenkKaydi>
        <Gok P={C} k={k} />
        <KonturTitreme derinlik="orta" seed={S}>{dekor}</KonturTitreme>
        {kusGolge}
        {kus && kusEkran && (
          <Guvercin poz={kus.poz} capa={kusEkran.capa} olcek={kusEkran.olcek}
            kenar={C.kenar ? { renk: C.kenar, dx: 2.5, dy: -2.5 } : undefined}
            kilif={{ parilti, coz: cozT, kapak, serit, ipUcEkran: ipUc }} />
        )}
        {elVar && kusEkran && coz && <ElKatmani coz={coz} p={p} dugum={kusEkran.dugum} pxm={kusEkran.pxm} />}
        <BacaKumesiDunya D={D} k={k} b={ON_BACA} C={C} seed={S + 7} />
      </RenkKaydi>
    </svg>
  );
};
const arsiv = (plan: Plan) => (param<Saat>(plan, "saat", "alacakaranlik") === "gun" ? "gunduzMineral" as const : "geceLapis" as const);
export const PARIS_CATI: Sablon = { Sahne, arsiv };
