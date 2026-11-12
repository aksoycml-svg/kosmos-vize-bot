// ===== KE-PK-N2 GÜVERCİN — poz seti + kılıf taşıyıcı (tasarim.md §4.2) =====
// Nötr gri tek kuş: tür işareti yok (boyun parıltısı, kanat çubuğu, kuyruk bandı yok), göz tek koyu nokta, ayak koyu mor-gri (kırmızı yok).
// Güvercin okuması: kısa kalın boyun, yuvarlak göğüs, küçük yuvarlak baş, kısa gaga, geniş yelpaze kuyruk (9 tüy; ortadaki 1 tüy uzun = kılıf yeri).
// Yerel birim mm (gövde gaga–kuyruk ucu ≈ 320 mm), +x baş yönü (sağa bakar), y aşağı, orijin gövde merkezi.
// Pozlar (tasarim §4.2): tunek · tunek-yon-ara · kalkis-a · kalkis-b · ucus-yukari · ucus-asagi · suzulme · konma · kanat-topla.
// Kanat çırpışı 4-poz döngü (16 kare/vuruş): kanatYon ucus-yukari ↔ ucus-asagi arasında kosinüsle (cirpis()).
// Yerleşim ÇAPA ile: kuş, kılıf merkezi verilen ekran noktasına düşecek biçimde konur (P01 f0 ↔ P11 son kare kilidi ±0 px).
import React from "react";
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

export const KUS_RENK = { ust: "#8f949a", golge: "#6b7076", karin: "#a9acaf", kanat: "#878c92", uc: "#4a4d52", gaga: "#4f4b4f", ayak: "#6a5a60", goz: "#14120f", kontur: "#3c3f45", boyun: "#7f848a" };

const rad = (a: number) => (a * Math.PI) / 180;
const rot = (q: P, a: number): P => { const c = Math.cos(rad(a)), s = Math.sin(rad(a)); return [q[0] * c - q[1] * s, q[0] * s + q[1] * c]; };
const add = (a: P, b: P): P => [a[0] + b[0], a[1] + b[1]];
const mul = (a: P, k: number): P => [a[0] * k, a[1] * k];
const d = (pts: P[], kapali = true) => "M " + pts.map((q) => `${q[0].toFixed(2)} ${q[1].toFixed(2)}`).join(" L ") + (kapali ? " Z" : "");

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
const GOVDE = "M 50 -44 C 76 -14 66 26 30 38 C 0 46 -42 36 -70 18 L -92 6 L -96 -8 C -70 -26 -30 -42 6 -43 C 26 -45 38 -54 46 -60 Z";
const KARIN = "M 62 0 C 56 24 30 38 2 42 C -30 42 -54 32 -70 18 L -60 30 C -30 46 10 48 40 34 C 56 26 64 12 62 0 Z";
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

export const Guvercin: React.FC<{
  poz: KusPoz; capa: P; olcek: number;          // olcek = ekran px / mm
  kenar?: { renk: string; dx: number; dy: number }; // kenar ışığı (alacakaranlık: sağ/üst)
  kilif?: { parilti?: number | null; coz?: number; kapak?: number; serit?: number; ipUcEkran?: P } | null;
  hayalet?: KusPoz | null;                       // hareket bulanığı: önceki kanat konumu (α .3)
  kontur?: number;
}> = ({ poz: z, capa, olcek, kenar, kilif, hayalet, kontur }) => {
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
    const pts: P[] = [add(k0, mul(n, 7)), add(add(k0, mul(u, L - 14)), mul(n, 13)), add(add(k0, mul(u, L)), mul(n, 5)), add(add(k0, mul(u, L)), mul(n, -5)), add(add(k0, mul(u, L - 14)), mul(n, -13)), add(k0, mul(n, -7))];
    return { i, pts };
  });
  const kanatYol = (q: P[]) => `M ${q[0][0]} ${q[0][1]} ` + q.slice(1).map((r) => `L ${r[0].toFixed(2)} ${r[1].toFixed(2)}`).join(" ") + " Z";
  const yakin = kanatNoktalari(z, false), uzak = kanatNoktalari(z, true);
  const ucPoly = (q: P[]) => [q[3], q[4], q[5], q[6], q[7], q[8], add(mul(q[3], 0.5), mul(q[8], 0.5))];
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
        {!tek && bacak(bacaklar[0], "#4e4247")}
        {tuyler.map((t) => <path key={t.i} d={d(t.pts)} fill={f(t.i === 4 ? R.ust : R.kanat)} {...st} />)}
        <path d={GOVDE} fill={f(R.ust)} {...st} />
        {!tek && <path d={KARIN} fill={R.golge} />}
        {/* boyun gölgesi (parıltı yok) */}
        {!tek && <path d="M 30 -50 C 44 -40 56 -26 60 -8 C 46 -18 36 -30 22 -40 Z" fill={R.boyun} />}
        <g transform={`rotate(${z.bas} 48 -50)`}>
          <circle cx={64} cy={-62} r={21} fill={f(R.ust)} {...st} />
          {!tek && <path d="M 82 -67 L 101 -61 L 82 -55 Z" fill={R.gaga} stroke={R.kontur} strokeWidth={Math.max(1, kw * 0.6)} style={nss} />}
          {!tek && <circle cx={72} cy={-66} r={2.9} fill={R.goz} />}
        </g>
        {!tek && bacak(bacaklar[1], R.ayak)}
        <path d={kanatYol(yakin)} fill={f(R.kanat)} {...st} />
        {!tek && <path d={kanatYol(ucPoly(yakin))} fill={R.uc} />}
        {!tek && [4, 6, 8].map((i) => <path key={i} d={d([yakin[i], add(mul(yakin[i], 0.55), mul(yakin[1], 0.45))], false)} stroke={R.kontur} strokeWidth={Math.max(1, kw * 0.55)} fill="none" style={nss} />)}
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
      {hayalet && <g opacity={0.3} transform={tr}><path d={kanatYol(kanatNoktalari(hayalet, false))} fill={R.kanat} /></g>}
      <g transform={tr}>{kus()}</g>
      {kilif && <g transform={kilifTr}><Kilif olcek={olcek} parilti={kilif.parilti} coz={kilif.coz} kapak={kilif.kapak} serit={kilif.serit} ipUc={ipUc} /></g>}
    </g>
  );
};
