// ===== KE-PK-N2 GÜVERCİN — poz seti + kılıf taşıyıcı (tasarim.md §4.2) =====
// Nötr gri tek kuş: boyun parıltısı ve kanat çubuğu yok; kuyruk tüylerinde uçta KOYU BANT + tüy sapı (güvercin kuyruğu okusun —
// A eleştirisi: "üst üste tahta"). Göz tek koyu nokta, ayak koyu mor-gri (kırmızı yok). Kontur yumuşak: kanat ve tüy uçları eğri (köşesiz).
// Güvercin okuması: kısa kalın boyun, yuvarlak göğüs, küçük yuvarlak baş, kısa gaga, geniş yelpaze kuyruk (9 tüy; ortadaki 1 tüy uzun = kılıf yeri).
// Yerel birim mm (gövde gaga–kuyruk ucu ≈ 320 mm), +x baş yönü (sağa bakar), y aşağı, orijin gövde merkezi.
// Pozlar (tasarim §4.2): tunek · tunek-yon-ara · kalkis-a · kalkis-b · ucus-yukari · ucus-asagi · suzulme · konma · kanat-topla.
// Kanat çırpışı 4-poz döngü (16 kare/vuruş): kanatYon ucus-yukari ↔ ucus-asagi arasında kosinüsle (cirpis()).
// Yerleşim ÇAPA ile: kuş, kılıf merkezi verilen ekran noktasına düşecek biçimde konur (P01 f0 ↔ P11 son kare kilidi ±0 px).
import React, { useId } from "react";
import type { P } from "../../tipler";
import { Kilif } from "./Kilif";

export type KusPoz = {
  govde: number;     // gövde eğimi (°; + = baş yukarı)
  kanat: number;     // 0 toplu … 1 açık
  kanatYon: number;  // açık kanadın ekran yönü (°; −90 yukarı, 90 aşağı, 180 geri)
  kanatBoy: number;  // görünür kanat boyu (kısalma; 0.4–1)
  kuyruk: number;    // yelpaze açıklığı 0…1
  kuyrukAci: number; // kuyruğun gövde ekseninden aşağı sapması (°)
  bacak: number;     // 0 toplu … 1 ayakta
  bacakOne: number;  // 0 dik … 1 öne uzanmış (konma)
  bas: number;       // baş dönüşü (°; yön arama salınımı)
};
export const KUS_POZ: Record<string, KusPoz> = {
  "tunek":        { govde: 22, kanat: 0, kanatYon: -150, kanatBoy: 1, kuyruk: 0.12, kuyrukAci: -35, bacak: 1, bacakOne: 0, bas: 0 },
  "tunek-yon-ara":{ govde: 22, kanat: 0, kanatYon: -150, kanatBoy: 1, kuyruk: 0.12, kuyrukAci: -35, bacak: 1, bacakOne: 0, bas: 0 },
  "kalkis-a":     { govde: 42, kanat: 1, kanatYon: -96, kanatBoy: 1, kuyruk: 1, kuyrukAci: 8, bacak: 0.8, bacakOne: 0, bas: 0 },
  "kalkis-b":     { govde: 42, kanat: 1, kanatYon: 104, kanatBoy: 0.82, kuyruk: 1, kuyrukAci: 8, bacak: 0.5, bacakOne: 0, bas: 0 },
  "ucus-yukari":  { govde: 14, kanat: 1, kanatYon: -84, kanatBoy: 1, kuyruk: 0.45, kuyrukAci: 0, bacak: 0, bacakOne: 0, bas: 0 },
  "ucus-asagi":   { govde: 14, kanat: 1, kanatYon: 112, kanatBoy: 0.82, kuyruk: 0.45, kuyrukAci: 0, bacak: 0, bacakOne: 0, bas: 0 },
  "suzulme":      { govde: 6, kanat: 0.92, kanatYon: -158, kanatBoy: 0.6, kuyruk: 0.35, kuyrukAci: -4, bacak: 0, bacakOne: 0, bas: 0 },
  "konma":        { govde: 38, kanat: 1, kanatYon: -132, kanatBoy: 0.95, kuyruk: 1, kuyrukAci: 22, bacak: 1, bacakOne: 1, bas: 0 },
  "kanat-topla":  { govde: 28, kanat: 0.35, kanatYon: -160, kanatBoy: 0.8, kuyruk: 0.4, kuyrukAci: -18, bacak: 1, bacakOne: 0.2, bas: 0 },
};
export const pozKaris = (a: KusPoz, b: KusPoz, t: number): KusPoz => {
  const o = {} as KusPoz;
  for (const k of Object.keys(a) as (keyof KusPoz)[]) o[k] = a[k] + (b[k] - a[k]) * t;
  return o;
};
// 4-poz çırpış döngüsü: faz 0 = kanat yukarıda; periyot 16 kare
export const cirpis = (temel: KusPoz, p: number, p0: number, yukari: KusPoz, asagi: KusPoz, periyot = 16): KusPoz => {
  const c = (1 - Math.cos((2 * Math.PI * (p - p0)) / periyot)) / 2; // 0 yukarı → 1 aşağı → 0
  return { ...temel, kanat: 1, kanatYon: yukari.kanatYon + (asagi.kanatYon - yukari.kanatYon) * c, kanatBoy: yukari.kanatBoy + (asagi.kanatBoy - yukari.kanatBoy) * c };
};

// v2 (tasarım §13.1, tur-4/5): güvercin grisi hafif mor-gri; karın gökten yansıma; boyun yanardönerliği iki düz leke (C* ≤ 22);
// ayak mor-gül (kırmızı değil); göz tek koyu nokta (iris/turuncu halka yok). Kanat çubuğu / beyaz kuyruk bandı ÇİZİLMEZ (tür işareti).
// v3 (tur-6, hedef-kus): kanat TÜYLÜ — örtü tüyü sıraları (pul kenarları), iki koyu kanat bandı, ayrı ikincil/birincil uçuş tüyleri;
// dolgun baş + göğüs, göz halkası (soluk gri-pembe çıplak deri, turuncu iris YOK), gaga dibinde açık cere. Hepsi C* ≤ 22 (kılıf tekliği).
export const KUS_RENK = {
  ust: "#8a8796", golge: "#5b5870", karin: "#b3aab0", kanat: "#8b889a", kanatG: "#6f6c82", bant: "#504d66", ortu: "#5f5c74", birincil: "#66637a",
  uc: "#43415a", gaga: "#4f4b4f", cere: "#d6ccd0", gozHalka: "#c7bac2", goz: "#14120f", gozIsik: "#e9e4da", ayak: "#7a5a66", kontur: "#363349",
  boyunYesil: "#5f7f72", boyunMor: "#8a6c96",
};

const rad = (a: number) => (a * Math.PI) / 180;
const rot = (q: P, a: number): P => { const c = Math.cos(rad(a)), s = Math.sin(rad(a)); return [q[0] * c - q[1] * s, q[0] * s + q[1] * c]; };
const add = (a: P, b: P): P => [a[0] + b[0], a[1] + b[1]];
const mul = (a: P, k: number): P => [a[0] * k, a[1] * k];
const d = (pts: P[], kapali = true) => "M " + pts.map((q) => `${q[0].toFixed(2)} ${q[1].toFixed(2)}`).join(" L ") + (kapali ? " Z" : "");
// kapalı Catmull-Rom → kübik Bézier (organik kontur; köşe yok). gerg 0…1 (1 = en yumuşak)
const yumusak = (q: P[], gerg = 1): string => {
  const n = q.length, f = (v: number) => v.toFixed(2), k = gerg / 6;
  let s = `M ${f(q[0][0])} ${f(q[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = q[(i - 1 + n) % n], p1 = q[i], p2 = q[(i + 1) % n], p3 = q[(i + 2) % n];
    s += ` C ${f(p1[0] + (p2[0] - p0[0]) * k)} ${f(p1[1] + (p2[1] - p0[1]) * k)} ${f(p2[0] - (p3[0] - p1[0]) * k)} ${f(p2[1] - (p3[1] - p1[1]) * k)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return s + " Z";
};

const KUYRUK_KOK: P = [-92, -2];
const KILIF_TUY = 64; // kılıf merkezi, orta tüy boyunca kökten mm
// Kılıf merkezi ve yönü (gövde çerçevesinde, eğim uygulanmadan)
export const kilifYerel = (z: KusPoz): { p: P; aci: number } => {
  const a = 180 - z.kuyrukAci; // gövde ekseninden aşağı sapma
  return { p: add(KUYRUK_KOK, mul([Math.cos(rad(a)), Math.sin(rad(a))], KILIF_TUY)), aci: a };
};
// Çapa → gövde orijini (ekran): kılıf merkezi `capa`ya düşer. olcek = ekran px / mm
export const kusYerlesim = (z: KusPoz, capa: P, olcek: number) => {
  const k = kilifYerel(z);
  const govdeAci = -z.govde;
  const o = add(capa, mul(rot(k.p, govdeAci), -olcek));
  const ekran = (q: P): P => add(o, mul(rot(q, govdeAci), olcek)); // gövde yerel → ekran
  return { o, govdeAci, ekran, kilifAci: k.aci + govdeAci };
};
// ayak tabanı (yerel) — zemin teması için
const KALCA: P = [6, 30];
const ayakYerel = (z: KusPoz, i: 0 | 1): { kalca: P; diz: P; ayak: P; parmak: P } => {
  const kalca = add(KALCA, [i ? -7 : 5, 0]);
  // ayakta: dikey (ekranda; gövde eğimini geri al) · toplu: geriye karına yatık · öne: konma
  const dikey = 90 + z.govde, toplu = 160, one = 40 + z.govde;
  const a = z.bacak < 1 ? toplu + (dikey - toplu) * z.bacak : dikey + (one - dikey) * z.bacakOne;
  const L = 18 + 22 * z.bacak;
  const diz = add(kalca, mul([Math.cos(rad(a + 18)), Math.sin(rad(a + 18))], L * 0.45));
  const ayak = add(diz, mul([Math.cos(rad(a - 10)), Math.sin(rad(a - 10))], L * 0.6));
  const parmak = add(ayak, mul([Math.cos(rad(z.govde - 4)), Math.sin(rad(z.govde - 4))], 16 * z.bacak + 4));
  return { kalca, diz, ayak, parmak };
};
// ekranda en alt ayak noktası (tünek teması için)
export const kusAyakEkran = (z: KusPoz, capa: P, olcek: number): P[] => {
  const y = kusYerlesim(z, capa, olcek);
  return [0, 1].map((i) => y.ekran(ayakYerel(z, i as 0 | 1).ayak));
};

// --- gövde (sabit şekil, gövde çerçevesi) ---
// v3: göğüs öne dolgun (x 80'e kadar), boyun kalın, baş büyük (r 25) — hedef-kus oranı (baş ≈ gövde yüksekliğinin %55'i)
const GOVDE = "M 54 -48 C 88 -20 80 30 34 44 C 0 52 -44 40 -72 20 L -92 6 L -96 -8 C -70 -28 -30 -46 4 -48 C 24 -52 34 -62 42 -72 Z";
const KARIN = "M 74 -4 C 68 26 36 44 2 48 C -30 48 -56 36 -72 20 L -62 32 C -30 52 14 54 46 40 C 64 30 76 14 74 -4 Z";
// toplu kanat (14 nokta, açık kanatla aynı sıra: kök ön → uç → arka kenar → kök)
const TOPLU: P[] = [[14, -36], [4, -40], [-30, -34], [-64, -22], [-96, -10], [-118, -2], [-112, 6], [-96, 10], [-70, 14], [-44, 16], [-14, 12], [8, 4], [22, -6], [24, -24]];
// açık kanat, kanat çerçevesi (u eksen boyunca, v arka kenara)
const ACIK_UV: P[] = [[0, -12], [40, -22], [110, -22], [190, -14], [262, -4], [300, 4], [292, 16], [268, 28], [236, 40], [196, 52], [144, 60], [90, 62], [40, 54], [6, 34]];
const OMUZ: P = [14, -28];

const kanatNoktalari = (z: KusPoz, uzak: boolean): P[] => {
  // yön ekran açısı → gövde çerçevesine (eğim geri alınır)
  const yon = z.kanatYon + z.govde + (uzak ? -9 : 0);
  const u: P = [Math.cos(rad(yon)), Math.sin(rad(yon))];
  let v: P = [u[1], -u[0]];
  if (v[0] > 0.05 || (Math.abs(v[0]) <= 0.05 && v[1] < 0)) v = [-u[1], u[0]]; // arka kenar geriye (−x) ya da aşağı bakar
  const boy = z.kanatBoy;
  const acik = ACIK_UV.map(([a, b]) => add(add(OMUZ, mul(u, a * boy)), mul(v, b * (0.75 + 0.25 * boy))));
  const t = Math.max(0, Math.min(1, z.kanat));
  const e = t * t * (3 - 2 * t);
  return TOPLU.map((q, i) => add(mul(q, 1 - e), mul(acik[i], e)));
};

// kanat parametrik yüzeyi: s 0 omuz → 1 uç, t 0 ön kenar → 1 arka kenar (14 noktanın ön/arka zincirlerinden; toplu ve açıkta aynı anlam)
const kanatF = (q: P[]) => {
  const on = [q[0], q[1], q[2], q[3], q[4], q[5]], arka = [q[13], q[12], q[11], q[10], q[9], q[8], q[7], q[6]];
  const zincir = (L: P[], s: number): P => { const x = Math.max(0, Math.min(1, s)) * (L.length - 1), i = Math.min(L.length - 2, Math.floor(x)), f = x - i; return add(mul(L[i], 1 - f), mul(L[i + 1], f)); };
  return (s: number, t: number): P => add(mul(zincir(on, s), 1 - t), mul(zincir(arka, s), t));
};
const ks = (F: (s: number, t: number) => P, s0: number, s1: number, t0: number, t1: number, n = 6): P[] => {
  const ust: P[] = [], alt: P[] = [];
  for (let i = 0; i <= n; i++) { const s = s0 + ((s1 - s0) * i) / n; ust.push(F(s, t0)); alt.push(F(s, t1)); }
  return [...ust, ...alt.reverse()];
};
/** tüy ayrıntısı (kanat dolgusunun üstüne, kanat konturunun altına): örtü pulları, iki koyu bant, ikincil ve birincil uçuş tüyleri */
const KanatTuy: React.FC<{ q: P[]; kw: number; acik: number; uzak: boolean; nss: object }> = ({ q, kw, acik, uzak, nss }) => {
  const R = KUS_RENK, F = kanatF(q), f = (p: P) => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`;
  const n: React.ReactNode[] = [];
  // birincil uçuş tüyleri bölgesi (el; s ≥ 0.6) koyu-orta gri, ucu daha koyu
  // toplu kanatta el kısmı kuyruğun üstüne katlanır: koyu bölge küçülür (aksi hâlde ikinci bir kuyruk gibi okunuyor)
  const sB = 0.58 + 0.16 * (1 - acik), sU = 0.8 + 0.1 * (1 - acik);
  n.push(<path key="bir" d={d(ks(F, sB, 1, 0, 1))} fill={uzak ? R.uc : R.birincil} />);
  n.push(<path key="biru" d={d(ks(F, sU, 1, 0, 1, 4))} fill={acik > 0.3 ? R.uc : R.birincil} />);
  // ikincil uçuş tüyleri şeridi (kol; arka kenar boyunca)
  n.push(<path key="iki" d={d(ks(F, 0.02, 0.6, 0.66, 1))} fill={uzak ? R.golge : R.kanatG} />);
  // iki koyu kanat bandı (güvercinin tür işareti; hedef-kus)
  if (!uzak) {
    n.push(<path key="b1" d={d(ks(F, 0.16, 0.6, 0.44, 0.54))} fill={R.bant} />);
    n.push(<path key="b2" d={d(ks(F, 0.12, 0.6, 0.68, 0.78))} fill={R.bant} />);
    // örtü tüyü pulları: 3 sıra, uçları arka kenara bakan küçük yaylar
    [0.14, 0.26, 0.37].forEach((t, r) => {
      const ds = 0.07 + r * 0.01;
      for (let s0 = 0.04 + (r % 2) * ds * 0.5; s0 + ds < 0.6; s0 += ds) {
        const a = F(s0, t), b = F(s0 + ds, t), c = F(s0 + ds / 2, t + 0.085);
        n.push(<path key={`p${r}-${s0.toFixed(3)}`} d={`M ${f(a)} Q ${f(c)} ${f(b)}`} fill="none" stroke={R.ortu} strokeWidth={Math.max(1, kw * 0.5)} opacity={0.8} style={nss} />);
      }
    });
  }
  // ikincil tüy ayrımları + arka kenarda yuvarlak uçlar (kanat açıldıkça belirgin)
  for (let s = 0.06; s < 0.6; s += 0.075) {
    n.push(<path key={`is${s.toFixed(3)}`} d={`M ${f(F(s, 0.68))} L ${f(F(s + 0.012, 1))}`} stroke={R.kontur} strokeWidth={Math.max(1, kw * 0.45)} opacity={0.6} fill="none" style={nss} />);
    if (acik > 0.4) { const a = F(s, 1), b = F(s + 0.075, 1), c = F(s + 0.0375, 1.07); n.push(<path key={`iu${s.toFixed(3)}`} d={`M ${f(a)} Q ${f(c)} ${f(b)} Z`} fill={uzak ? R.golge : R.kanatG} stroke={R.kontur} strokeWidth={Math.max(1, kw * 0.6)} style={nss} />); }
  }
  // birincil tüyler: elden uca yelpaze; açıkken uçlar ayrık (parmak) okunur
  for (let i = 0; i < 7; i++) {
    const sb = sB + i * 0.05 * (1 - sB) / 0.42, se = Math.min(1, sB + 0.08 + i * 0.055 * (1 - sB) / 0.42);
    n.push(<path key={`bp${i}`} d={`M ${f(F(sb, 0.12))} L ${f(F(se, 1))}`} stroke={R.kontur} strokeWidth={Math.max(1, kw * 0.5)} opacity={0.7} fill="none" style={nss} />);
    if (acik > 0.6 && i >= 2) { const a = F(se - 0.03, 1), b = F(Math.min(1, se + 0.03), 1), c = F(se, 1.09); n.push(<path key={`bu${i}`} d={`M ${f(a)} Q ${f(c)} ${f(b)} Z`} fill={R.uc} stroke={R.kontur} strokeWidth={Math.max(1, kw * 0.6)} style={nss} />); }
  }
  // ön kenar küçük örtüler: açık şerit
  if (!uzak) n.push(<path key="on" d={d(ks(F, 0.04, 0.62, 0, 0.09))} fill={R.ust} opacity={0.75} />);
  return <g>{n}</g>;
};

export const Guvercin: React.FC<{
  poz: KusPoz; capa: P; olcek: number;          // olcek = ekran px / mm
  kenar?: { renk: string; dx: number; dy: number }; // kenar ışığı (alacakaranlık: sağ/üst)
  kilif?: { parilti?: number | null; coz?: number; kapak?: number; serit?: number; ipUcEkran?: P } | null;
  kontur?: number;
}> = ({ poz: z, capa, olcek, kenar, kilif, kontur }) => {
  const uid = "gv" + useId().replace(/:/g, "");
  const Y = kusYerlesim(z, capa, olcek);
  const kw = kontur ?? Math.max(1.6, Math.min(4, 1.4 + olcek * 0.6));
  const nss = { vectorEffect: "non-scaling-stroke" as const, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  const R = KUS_RENK;
  const tr = `translate(${Y.o[0]} ${Y.o[1]}) rotate(${Y.govdeAci}) scale(${olcek})`;
  // kuyruk tüyleri (9): dıştan içe, orta tüy en son ve 1 tüy uzun
  const kAci = 180 - z.kuyrukAci, yay = 5 + 40 * z.kuyruk;
  const tuyler = [0, 8, 1, 7, 2, 6, 3, 5, 4].map((i) => {
    const a = kAci + (yay * (i - 4)) / 4; // yelpaze: komşu tüyler örtüşür (tek kapalı biçim okunur)
    const L = i === 4 ? 122 : 108 - Math.abs(i - 4) * 2;
    const u: P = [Math.cos(rad(a)), Math.sin(rad(a))], n: P = [-u[1], u[0]];
    const k0 = add(KUYRUK_KOK, mul(n, (i - 4) * 1.5));
    const P_ = (a: number, b: number) => add(add(k0, mul(u, a)), mul(n, b));
    // tüy: kökte dar, uçta yuvarlak (Q eğrisi), köşesiz
    const yol = `M ${P_(0, 7).join(" ")} L ${P_(L - 16, 13).join(" ")} Q ${P_(L + 6, 11).join(" ")} ${P_(L + 2, 0).join(" ")} Q ${P_(L + 6, -11).join(" ")} ${P_(L - 16, -13).join(" ")} L ${P_(0, -7).join(" ")} Z`;
    // uçta koyu bant (gerçek güvercin kuyruk işareti): L−30 … L−12, tüy genişliğinde, uç gri kalır
    const gen = (a: number) => 7 + (6 * Math.min(a, L - 16)) / (L - 16);
    const bant = [P_(L - 30, gen(L - 30)), P_(L - 12, 12.6), P_(L - 12, -12.6), P_(L - 30, -gen(L - 30))];
    const sap = [P_(6, 0), P_(L - 4, 0)];
    return { i, yol, bant, sap };
  });
  const kanatYol = (q: P[]) => yumusak(q, 0.85);
  // arka kenarı 10 % dışa taşıyan kopya (kırpma için): tüy uçları kenardan çıkıp görünsün, ön kenar aynı
  const kanatGenis = (q: P[]) => { const F = kanatF(q); return q.map((p, i) => (i >= 6 && i <= 13 ? F((13 - i) / 7, 1.12) : p)); };
  const yakin = kanatNoktalari(z, false), uzak = kanatNoktalari(z, true);
  const acikMi = z.kanat > 0.3;
  const bacaklar = [1, 0].map((i) => ayakYerel(z, i as 0 | 1));
  const bacak = (b: ReturnType<typeof ayakYerel>, renk: string) => z.bacak > 0.08 ? (
    <g>
      <path d={d([b.kalca, b.diz, b.ayak], false)} fill="none" stroke={renk} strokeWidth={Math.max(2, 5 * olcek)} style={nss} />
      <path d={d([b.ayak, b.parmak], false)} fill="none" stroke={renk} strokeWidth={Math.max(1.6, 3.4 * olcek)} style={nss} />
      <path d={d([b.ayak, add(b.ayak, [-9, 1])], false)} fill="none" stroke={renk} strokeWidth={Math.max(1.4, 3 * olcek)} style={nss} />
    </g>
  ) : null;
  const kus = (tek?: string) => {
    const f = (c: string) => tek ?? c;
    const st = tek ? { stroke: "none" } : { stroke: R.kontur, strokeWidth: kw, ...nss };
    return (
      <g>
        {acikMi && <path d={kanatYol(uzak)} fill={f(R.golge)} {...st} />}
        {acikMi && !tek && <g clipPath={`url(#${uid}ku)`}><KanatTuy q={uzak} kw={kw} acik={z.kanat} uzak nss={nss} /></g>}
        {acikMi && !tek && <path d={kanatYol(uzak)} fill="none" stroke={R.kontur} strokeWidth={kw} style={nss} />}
        {!tek && bacak(bacaklar[0], "#4e4247")}
        {tuyler.map((t) => (
          <g key={t.i}>
            <path d={t.yol} fill={f(t.i === 4 ? R.ust : R.kanat)} {...st} />
            {!tek && <path d={d(t.bant)} fill={R.uc} />}
            {!tek && <path d={d(t.sap, false)} stroke={R.kontur} strokeWidth={Math.max(1, kw * 0.45)} opacity={0.55} fill="none" style={nss} />}
            {!tek && <path d={t.yol} fill="none" stroke={R.kontur} strokeWidth={kw} style={nss} />}
          </g>
        ))}
        <path d={GOVDE} fill={f(R.ust)} {...st} />
        {!tek && <path d={KARIN} fill={R.karin} />}
        {/* göğüs ön yüzü gölgede (kontrajur): gövdenin ön-alt hilali */}
        {!tek && <path d="M 66 -24 C 78 2 66 32 34 44 C 52 26 62 4 58 -20 Z" fill={R.golge} opacity={0.7} />}
        <g transform={`rotate(${z.bas} 50 -56)`}>
          <circle cx={66} cy={-70} r={25} fill={f(R.ust)} {...st} />
          {/* boyun köprüsü: baş ile gövde arasındaki iki kontur çizgisini örter (kesintisiz boyun; hedef-kus) */}
          {!tek && <ellipse cx={52} cy={-57} rx={13} ry={12} fill={R.ust} />}
        </g>
        {/* boyun yanardönerliği: iki düz leke (yeşil üstte, mor altta), gradyan yok */}
        {!tek && <path d="M 36 -58 C 48 -54 60 -44 64 -32 C 52 -34 42 -42 34 -50 Z" fill={R.boyunYesil} />}
        {!tek && <path d="M 38 -44 C 50 -40 62 -30 66 -16 C 54 -20 44 -28 36 -36 Z" fill={R.boyunMor} />}
        <g transform={`rotate(${z.bas} 50 -56)`}>
          {!tek && <path d="M 88 -75 C 96 -74 104 -71 109 -68 C 104 -66 96 -64 88 -63 Z" fill={R.gaga} stroke={R.kontur} strokeWidth={Math.max(1, kw * 0.6)} style={nss} />}
          {!tek && <ellipse cx={90} cy={-74} rx={5.5} ry={3.4} fill={R.cere} />}
          {!tek && <circle cx={76} cy={-75} r={6.6} fill={R.gozHalka} />}
          {!tek && <circle cx={76} cy={-75} r={4.1} fill={R.goz} />}
          {!tek && <circle cx={77.3} cy={-76.4} r={1.2} fill={R.gozIsik} />}
        </g>
        {!tek && bacak(bacaklar[1], R.ayak)}
        <path d={kanatYol(yakin)} fill={f(R.kanat)} {...(tek ? st : { stroke: "none" })} />
        {!tek && <g clipPath={`url(#${uid}ky)`}><KanatTuy q={yakin} kw={kw} acik={z.kanat} uzak={false} nss={nss} /></g>}
        {!tek && <path d={kanatYol(yakin)} fill="none" stroke={R.kontur} strokeWidth={kw} style={nss} />}
      </g>
    );
  };
  // kılıf (kuyruk orta tüyünde)
  const kl = kilifYerel(z);
  const kilifTr = `translate(${capa[0]} ${capa[1]}) rotate(${Y.kilifAci}) scale(${olcek})`;
  const ipUc: P | undefined = kilif?.ipUcEkran ? (() => { const dx = kilif.ipUcEkran[0] - capa[0], dy = kilif.ipUcEkran[1] - capa[1]; return mul(rot([dx, dy], -Y.kilifAci), 1 / olcek); })() : undefined;
  void kl;
  return (
    <g>
      {kenar && <g transform={`translate(${kenar.dx} ${kenar.dy})`}><g transform={tr}>{kus(kenar.renk)}</g></g>}
      <g transform={tr}>
        <defs>
          {/* tüy ayrıntısı kanat biçiminin içinde kalır; arka kenar tüy uçları için hafif genişletilmiş (1.07–1.09 t) */}
          <clipPath id={`${uid}ky`}><path d={kanatYol(kanatGenis(yakin))} /></clipPath>
          <clipPath id={`${uid}ku`}><path d={kanatYol(kanatGenis(uzak))} /></clipPath>
        </defs>
        {kus()}
      </g>
      {kilif && <g transform={kilifTr}><Kilif olcek={olcek} parilti={kilif.parilti} coz={kilif.coz} kapak={kilif.kapak} serit={kilif.serit} ipUc={ipUc} /></g>}
    </g>
  );
};
