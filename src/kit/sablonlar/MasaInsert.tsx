// ===== MASA-INSERT şablonu (SB2-TOURS P01 masa plakasından) =====
// Tepe-önden masa yakın planı: meşe tahta masa, (aci=tepe-onden) arkada badanalı tuffeau duvar + basık kemerli lucarne (dış manzara),
// prop seti (paket, eldiven, çorap, dosya, kitap, kese, hokka, mum, fener), 0–2 KolEl eli (anahtarlı yol, kıstırma, bırakma).
// Işık: güneş (lucarne, sağ-üst → gölge sol-aşağı) TEK yönlü kaynak; isik=fener ise fener nokta ışığı ışık havuzu ekler (P01 onaylı ikili).
// Kurallar: tutulan prop kıstırma noktasını izler; bırakma karesi = temas ("tap"); gölgeler masa düzlemine kırpılı, multiply.
import React from "react";
import { Easing, interpolate } from "remotion";
import { KonturTitreme } from "../../doku/KonturTitreme";
import { TasDuvar } from "../../doku/TasDuvar";
import { AhsapYuzey } from "../../doku/AhsapYuzey";
import { titresim } from "../../doku/IsikKatmani";
import { AciklikIsigi, Isik, IsikHavuzu, izdusum } from "../../doku/Isik";
import { Kiris, MasaKenari } from "../../doku/Mimari";
import { Kemer } from "../../doku/Kemer";
import { Desen, RenkKaydi, Tarama, TARAMA_ARALIK, TARAMA_KALINLIK, taramaAcisi } from "../../doku/Tarama";
import { KolKonum, KONUMLAR, KonumAdi } from "../../doku/ChappeKule";
import { BL, DOKU_SEED, P, dikdortgen, ink, poly } from "../../doku/sabitler";
import { KolEl, KISTIR_YEREL, elMatris } from "../../rig/KolEl";
import { kolIsigi } from "../../rig/RigIsik";
import { PaketKagidi } from "../../bolumler/blanc/props/PaketKagidi";
import type { El, Prop } from "../tipler";
import { cl, deger, GIRIS, kameraHesapla, ekranNokta } from "../zaman";
import { param, Sablon, SablonProps } from "../ortak";
import { PROPLAR, propDurum, FENER_ALEV_Y } from "../props";
import { DisManzara, DisTur, PEN0 } from "./disManzara";
import { EldivenGiyme, EldivenGiyParam, eldivenGerilme } from "../props/EldivenGiyme";

const S = DOKU_SEED.tours;
const PEN = PEN0;
const ACI = { "tepe-onden": 820, "tepe-egik": 520, tepe: -260 } as const;
const MASA_ON = 1700, ON_YUZ = 120, DUVAR_UST = 214;
const GUNES: Isik = { tip: "yonlu", ad: "güneş (lucarne)", yon: [-0.55, 0.85], renk: "#ffd08a" };
const TH = taramaAcisi(GUNES);

// T kolu: "BEKLE" ya da { kare: [a, b], konum: ["BEKLE", "SAK"] } — varışta küçük aşma + yerleşme ("klak" = varış karesi)
export type KolParam = KonumAdi | { kare: number[]; konum: KonumAdi[] };
export const kolHesapla = (k: KolParam, p: number): KolKonum => {
  if (typeof k === "string") return KONUMLAR[k];
  const ks = k.konum.map((a) => KONUMLAR[a]);
  let i = 0;
  while (i < k.kare.length - 1 && p >= k.kare[i + 1]) i++;
  if (i >= k.kare.length - 1) return ks[ks.length - 1];
  const A = ks[i], B = ks[i + 1], a = k.kare[i], b = k.kare[i + 1];
  const t = interpolate(p, [a, b, b + 3, b + 6], [0, 1.03, 0.99, 1], { ...cl, easing: GIRIS });
  return { reg: A.reg + (B.reg - A.reg) * t, sol: A.sol + (B.sol - A.sol) * t, sag: A.sag + (B.sag - A.sag) * t };
};

const anahtar2 = (arr: P[], kare: number[], p: number): P => [deger(arr.map((q) => q[0]), kare, p, 0, Easing.inOut(Easing.cubic)), deger(arr.map((q) => q[1]), kare, p, 0, Easing.inOut(Easing.cubic))];

type ElDurum = { el: El; bilek: P; dirsek: P; aci: number; poz: "kistir" | "gevsek"; kist: P; olcek: number };
const elDurum = (el: El, p: number): ElDurum => {
  const bilek = anahtar2(el.bilek, el.kare, p), dirsek = anahtar2(el.dirsek, el.kare, p);
  const aci = deger(el.aci, el.kare, p, 0, Easing.inOut(Easing.cubic));
  const olcek = el.olcek ?? 1.9;
  let poz: "kistir" | "gevsek" = el.tut ? "kistir" : "gevsek";
  for (const q of el.poz ?? []) if (p >= q.kare) poz = q.poz;
  return { el, bilek, dirsek, aci, poz, olcek, kist: elMatris([bilek[0] + 12, bilek[1]], aci, olcek)(KISTIR_YEREL) };
};

// Prop çizimi (masa düzleminde: tepe-önden y ekseni kısalmış — ölçek 1, 0.86)
const PropCiz: React.FC<{ pr: Prop; p: number; konum?: P; aci?: number; golge?: boolean; golgeRenk?: string; fl?: number; katman?: "alt" | "ust" }> = ({ pr, p, konum, aci, golge, golgeRenk, fl, katman = "alt" }) => {
  const d = propDurum(pr, p);
  const x = konum ? konum[0] : deger(pr.x, pr.kare, p), y = konum ? konum[1] : deger(pr.y, pr.kare, p);
  const a = aci ?? deger(pr.aci ?? 0, pr.kare, p);
  const o = pr.olcek ?? 1;
  if (pr.tur === "paket" && !golge) return <PaketKagidi x={x} y={y} olcek={o} aci={a} acik={(d.acik as number) ?? 1} ipCozuk={d.ipCozuk !== false} kabarti={(d.kabarti as number) ?? 0} etiket={katman === "alt" && d.etiket !== false} etiketYeri={[(d.etiketX as number) ?? 250, (d.etiketY as number) ?? 300]} katman={katman} seed={S} />;
  if (katman === "ust") return null;
  const C = PROPLAR[pr.tur];
  return <g transform={`translate(${x},${y}) rotate(${a}) scale(${o})`}><C durum={d} seed={S} golge={golge} golgeRenk={golgeRenk} fl={fl} /></g>;
};

const AcikKanat: React.FC<{ yan: -1 | 1 }> = ({ yan }) => {
  const x0 = yan < 0 ? PEN.x : PEN.x + PEN.w, d = yan < 0 ? -40 : 32;
  const q: P[] = [[x0, PEN.y + 6], [x0 + d, PEN.y - 20], [x0 + d, PEN.y + PEN.h + 30], [x0, PEN.y + PEN.h]];
  const lp = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const L = (u: number, v: number): P => lp(lp(q[0], q[3], v), lp(q[1], q[2], v), u);
  const ah = "#4a3220";
  return (
    <g>
      <polygon points={poly(q)} fill={ah} stroke={ink(ah)} strokeWidth={2.5} />
      {[0.25, 0.5, 0.75].map((v) => <polyline key={v} points={poly([L(0.15, v), L(0.85, v)])} stroke={ink(ah)} strokeWidth={2} />)}
      {[0, 1, 2, 3].map((i) => <polygon key={i} points={poly([L(0.18, i * 0.25 + 0.03), L(0.82, i * 0.25 + 0.03), L(0.82, i * 0.25 + 0.22), L(0.18, i * 0.25 + 0.22)])} fill="#cdbf9a" opacity={0.55} />)}
    </g>
  );
};

const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const aciAd = param<keyof typeof ACI>(plan, "aci", "tepe-onden");
  const ARKA = ACI[aciAd];
  const duvar = ARKA > 0;
  const pencere = duvar && aciAd === "tepe-onden" ? param<DisTur | "yok">(plan, "pencere", "tours") : "yok";
  const fenerVar = param<string>(plan, "isik", "gun") === "fener";
  const [FX, FT] = param<P>(plan, "fener", [430, 1092]);
  const kol = kolHesapla(param<KolParam>(plan, "kol", "BEKLE"), p);
  const k = kameraHesapla(plan.kamera, p);
  const kam = `translate(${540 + k.cx},${960 + k.cy}) scale(${k.cs}) translate(-540,-960)`;
  const fl = titresim("fener", p, 3);
  const HAVUZ: P = [FX, FT + 8];
  const FENER_ISIK: Isik = { tip: "nokta", ad: "fener", zemin: HAVUZ, yukseklik: -FENER_ALEV_Y, renk: "#ffb357", havuz: { rx: 300, ry: 160, alfa: 0.8 } };
  const props = plan.props ?? [];
  const eller = (plan.el ?? []).map((e) => elDurum(e, p));
  // tutulan prop: id → { el, bırakıldı mı, bırakma noktası }
  const tutma = new Map<string, { e: ElDurum; birak: boolean; yer: P; aci: number }>();
  for (const e of eller) {
    const t = e.el.tut;
    if (!t || p < t.bas) continue;
    const birak = p >= t.bit;
    const eBit = elDurum(e.el, t.bit);
    // tutulan nesne bırakmadan önceki 18 karede masa açısına döner (yatar); bırakınca orada kalır
    const don = interpolate(p, [t.bit - 18, t.bit], [0, 1], { ...cl, easing: Easing.inOut(Easing.cubic) });
    tutma.set(t.prop, { e, birak, yer: birak ? eBit.kist : e.kist, aci: (t.tutulAci ?? 0) + ((t.birakAci ?? -64) - (t.tutulAci ?? 0)) * don });
  }
  const serbest = props.filter((pr) => !pr.id || !tutma.has(pr.id));
  const tutulan = props.filter((pr) => pr.id && tutma.has(pr.id));
  const kose = [[PEN.x, PEN.y], [PEN.x + PEN.w, PEN.y], [PEN.x + PEN.w, PEN.y + PEN.h], [PEN.x, PEN.y + PEN.h]].map(([x, y]) => ({ p: [x, y] as P, ayak: [x, ARKA] as P, h: ARKA - y }));
  const golgeKay = (h: number): P => { const q = izdusum(GUNES, [0, 0], h); return [q[0], q[1] + h * 0.2]; };
  const elH = param<number>(plan, "elYukseklik", 120);
  const egiy = param<EldivenGiyParam | null>(plan, "eldivenGiy", null);
  if (egiy) { const s0 = egiy.olcek ?? 1.3; kilit.push({ ad: "eldiven gerilme", p: ekranNokta(k, [(egiy.x ?? 540) + 92 * s0, (egiy.y ?? 1000) + 218 * s0]), tur: p >= eldivenGerilme(egiy) ? "temas" : "dokunus" }); }
  // kilit noktaları
  for (const e of eller) kilit.push({ ad: "kıstırma", p: ekranNokta(k, e.kist), tur: "dokunus" });
  for (const pr of serbest) kilit.push({ ad: pr.id ?? pr.tur, p: ekranNokta(k, [deger(pr.x, pr.kare, p), deger(pr.y, pr.kare, p)]), tur: "kurulum" });
  for (const [id, t] of tutma) if (t.birak) kilit.push({ ad: `${id} bırakıldı`, p: ekranNokta(k, t.yer), tur: "temas" });
  if (fenerVar) kilit.push({ ad: "fener tabanı", p: ekranNokta(k, [FX, FT]), tur: "temas" });
  const tarama = <Desen id="kmTar" aci={TH} aralik={TARAMA_ARALIK.yakin} kalin={TARAMA_KALINLIK.yakin} renk="#2a1c10" alfa={0.75} seed={S + 9} />;
  const kolProps = (e: ElDurum) => ({ giris: e.el.giris, dirsek: e.dirsek, bilek: e.bilek, gen: [210, 172, 92] as [number, number, number], elAci: e.aci, olcek: e.olcek, tip: e.el.tip });
  const tutulanCiz = (e: ElDurum) => {
    const id = e.el.tut?.prop; const t = id ? tutma.get(id) : undefined; const pr = tutulan.find((q) => q.id === id);
    if (!t || t.birak || !pr) return undefined;
    return <PropCiz pr={pr} p={p} konum={[0, 0]} aci={t.aci} fl={fl} />;
  };
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <defs>
        {tarama}
        <radialGradient id="kmDuvarFener"><stop offset="0" stopColor="#ffcf86" stopOpacity={0.35} /><stop offset="1" stopColor="#ffcf86" stopOpacity={0} /></radialGradient>
        <clipPath id="kmMasaKlip"><rect x={-200} y={Math.max(ARKA, -400)} width={1500} height={MASA_ON - Math.max(ARKA, -400)} /></clipPath>
      </defs>
      <rect x={0} y={0} width={1080} height={1920} fill="#2a2016" />
      <RenkKaydi>
        <g transform={kam}>
          {duvar && <>
            <KonturTitreme derinlik="orta" seed={S}>
              <rect x={-120} y={DUVAR_UST - 300} width={1320} height={ARKA - DUVAR_UST + 300} fill="#ebe5d2" />
              <TasDuvar m={dikdortgen(-120, Math.min(560, ARKA - 200), 1320, ARKA - Math.min(560, ARKA - 200))} boyut={[1320, 260]} tip="tuffeau" seed={S} derinlik="yakin" nemBandi={0.3} petek={0.3} />
              {pencere !== "yok" && <>
                <polygon points={poly([[PEN.x - 46, PEN.y - 34], [PEN.x, PEN.y], [PEN.x, PEN.y + PEN.h], [PEN.x - 46, PEN.y + PEN.h + 40]])} fill="#d8d0b8" />
                <Tarama sekil={[[PEN.x - 46, PEN.y - 34], [PEN.x, PEN.y], [PEN.x, PEN.y + PEN.h], [PEN.x - 46, PEN.y + PEN.h + 40]]} basamak="III" aci={TH} renk="#6a5a40" derinlik="yakin" seed={S + 1} />
                <polygon points={poly([[PEN.x + PEN.w, PEN.y], [PEN.x + PEN.w + 34, PEN.y - 26], [PEN.x + PEN.w + 34, PEN.y + PEN.h + 32], [PEN.x + PEN.w, PEN.y + PEN.h]])} fill="#f2ead4" />
                <polygon points={poly([[PEN.x - 46, PEN.y + PEN.h + 40], [PEN.x, PEN.y + PEN.h], [PEN.x + PEN.w, PEN.y + PEN.h], [PEN.x + PEN.w + 34, PEN.y + PEN.h + 32]])} fill="#f4ecd6" />
                {pencere === "tours" && [0, 9].map((o) => <polyline key={o} points={poly([[1000 + o * 0.5, DUVAR_UST], [990 + o * 0.6, 300], [PEN.x + PEN.w + 22 + o * 0.5, PEN.y + 30]])} stroke={BL.kenevir} strokeWidth={3.4} fill="none" />)}
              </>}
            </KonturTitreme>
            {pencere !== "yok" && <>
              <Kemer m={dikdortgen(PEN.x, PEN.y, PEN.w, PEN.h)} W={1.36} H={1.4} tip="basik" dolgu="#e8d4a4" ic={<DisManzara tur={pencere} kol={kol} />} kayit={null} sove={{ gen: 0.05, renk: "#4a3220" }} esik={{ renk: "#d8cfb4" }} kontur={2.5} />
              <AcikKanat yan={-1} /><AcikKanat yan={1} />
            </>}
            <rect x={-120} y={-200} width={1320} height={DUVAR_UST + 200} fill="#2e2016" />
            {[-60, 300, 660, 1020].map((x, i) => <Kiris key={i} on={[[x - 40, -200], [x + 100, -200], [x + 60, DUVAR_UST - 40], [x, DUVAR_UST - 40]]} seed={S + 20 + i} derinlik="uzak" />)}
            <Kiris on={[[-120, DUVAR_UST - 46], [1200, DUVAR_UST - 46], [1200, DUVAR_UST], [-120, DUVAR_UST]]} alt={[[-120, DUVAR_UST], [1200, DUVAR_UST], [1200, DUVAR_UST + 10], [-120, DUVAR_UST + 10]]} seed={S + 30} derinlik="orta" />
            <Tarama sekil={[[-120, DUVAR_UST], [60, DUVAR_UST], [20, ARKA], [-120, ARKA]]} basamak="II" aci={TH} renk="#6a5a40" derinlik="orta" seed={S + 2} />
            {fenerVar && <ellipse cx={FX} cy={FT - 200} rx={360} ry={300} fill="url(#kmDuvarFener)" style={{ mixBlendMode: "screen" }} />}
            <rect x={-120} y={ARKA - 6} width={1320} height={8} fill="#1e140c" opacity={0.7} />
          </>}
          {/* MASA: meşe tahtalar (perspektif: arka dar → ön geniş) */}
          <KonturTitreme derinlik="yakin" seed={S + 5}>
            <AhsapYuzey m={(u, v) => { const t = v * v * 0.35 + v * 0.65; const y0 = Math.max(ARKA, -400); return [-140 + u * 1360, y0 + t * (MASA_ON - y0)]; }} boyut={[1360, 900]} tur="mese" taban="#9a7046" tahta={11} budak={2} seed={S + 6} derinlik="yakin" asinma={["alt"]} kenarKontur={false} cizgiKalinlik={1.3} />
          </KonturTitreme>
          {pencere !== "yok" && <AciklikIsigi isik={GUNES} kose={kose} kayit={[0, 0]} alfa={0.12} yamaAlfa={0.5} toz={{ sayi: 36, seed: S }} />}
          {/* prop temas gölgeleri + serbest prop'lar */}
          {serbest.map((pr, i) => <g key={`g${i}`} clipPath="url(#kmMasaKlip)" style={{ mixBlendMode: "multiply" }} transform="translate(-10,12)"><PropCiz pr={pr} p={p} golge golgeRenk="#a08a70" fl={fl} /></g>)}
          {serbest.filter((pr) => pr.tur !== "fener").map((pr, i) => <PropCiz key={`s${i}`} pr={pr} p={p} fl={fl} />)}
          {fenerVar && <IsikHavuzu isik={FENER_ISIK} guc={fl} />}
          {/* el + tutulan prop gölgeleri (TEK güneş): ton + tarama, masa düzlemine kırpılı */}
          <g clipPath="url(#kmMasaKlip)" style={{ mixBlendMode: "multiply" }}>
            {eller.map((e, i) => { const g = golgeKay(elH); return <g key={i} transform={`translate(${g[0]},${g[1]})`}><KolEl {...kolProps(e)} golge golgeRenk="#a08a70" /><KolEl {...kolProps(e)} golge golgeRenk="url(#kmTar)" /></g>; })}
            {/* K2: tutulan prop'un gölgesi — aynı güneşten, el gölgesiyle aynı kayma (prop elde, masadan elYukseklik kadar yukarıda) */}
            {eller.map((e, i) => { const t = e.el.tut ? tutma.get(e.el.tut.prop) : undefined; const pr = tutulan.find((q) => q.id === e.el.tut?.prop); if (!t || t.birak || !pr) return null; const g = golgeKay(elH); return <g key={`tg${i}`} transform={`translate(${t.yer[0] + g[0]},${t.yer[1] + g[1]})`}><PropCiz pr={pr} p={p} konum={[0, 0]} aci={t.aci} golge golgeRenk="#a08a70" /></g>; })}
            {egiy && (() => { const g = golgeKay(elH * 1.6); return <g transform={`translate(${g[0]},${g[1]})`}><EldivenGiyme e={egiy} p={p} golge golgeRenk="#a08a70" /></g>; })()}
          </g>
          {fenerVar && <g transform={`translate(${FX},${FT})`}><ellipse cx={2} cy={2} rx={70} ry={10} fill="#14110d" opacity={0.6} />{React.createElement(PROPLAR.fener, { durum: {}, seed: S, fl })}</g>}
          {/* bırakılmış tutulan prop'lar (bıraktığı yerde) */}
          {tutulan.map((pr, i) => { const t = tutma.get(pr.id!)!; return t.birak ? <PropCiz key={`b${i}`} pr={pr} p={p} konum={t.yer} aci={t.aci} fl={fl} /> : null; })}
          {eller.map((e, i) => <KolEl key={`e${i}`} {...kolProps(e)} isik={kolIsigi(GUNES, e.bilek, { murekkep: "#2a1c10" })} poz={e.poz} tutulan={tutulanCiz(e)} />)}
          {serbest.filter((pr) => pr.tur === "paket").map((pr, i) => <PropCiz key={`u${i}`} pr={pr} p={p} katman="ust" />)}
          {/* K2 (D7): parmak parmak eldiven giyme — eller masanın üstünde, insert'te ≥ %20 */}
          {egiy && <EldivenGiyme e={egiy} p={p} />}
          {/* masa ön kenarı + ön yüz + döşeme */}
          <AhsapYuzey m={dikdortgen(-140, MASA_ON, 1360, ON_YUZ)} boyut={[1360, ON_YUZ]} tur="mese" taban="#6a4a2c" tahta={1} seed={S + 8} derinlik="yakin" kenarKontur={false} />
          <MasaKenari sol={[-140, MASA_ON]} sag={[1220, MASA_ON]} kalin={30} renk="#8a5e36" />
          <Tarama sekil={[[-140, MASA_ON + 30], [1220, MASA_ON + 30], [1220, MASA_ON + ON_YUZ], [-140, MASA_ON + ON_YUZ]]} basamak="III" aci={TH} renk="#2a1c10" derinlik="yakin" seed={S + 11} />
          <polygon points={poly([[-140, MASA_ON + ON_YUZ], [1220, MASA_ON + ON_YUZ], [1220, 2300], [-140, 2300]])} fill="#3b2c1c" />
        </g>
      </RenkKaydi>
    </svg>
  );
};

export const MASA_INSERT: Sablon = { Sahne, arsiv: () => "gunduz" };
