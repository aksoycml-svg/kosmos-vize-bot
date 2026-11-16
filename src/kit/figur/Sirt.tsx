// ===== Figür kiti 4: SIRT / omuz üstü (OTS) görünüm (Leningrad SOKAK P03a tur-5; yalnız EKLEME — Govde/Kafa/iskelet değişmedi) =====
// Neden: iskelet.ts "sırt görünümü desteklenmez"; OTS planında figür arkadan ¾ görünür (sırt + yakın omuz + kayıp profil baş).
// Kurgu (ekran px, y aşağı; B = baş birimi px, ORAN ile aynı):
//   - boyunDip (C7) → omuz hattı (omuzAci) → yakın omuz eklemi boyundan 0.82 B dışarıda, 0.1 B aşağıda (CLAUDE "Omuz" 1);
//     uzak omuz dönüşle (donus) kısalır. Omuz başlığı (deltoid) gövde silüetinin PARÇASI (Siluet birleşimi), kol ona kavisli dikişle bağlanır.
//   - Kol: omuz → dirsek → bilek; uzuv profili (üst kol kalın, dirsek, önkol incelir, manşet hafif açılır); dirsek iç yanında kıvrımlar.
//   - Baş: Kafa (yaw > 90 → kayıp profil: yanak, kulak, burun ucu silueti); atlas boyundan boyunEgim yönünde 0.7 B.
//   - Yaka: kalkık palto yakası boynu sarar (arka yüzü kameraya), üstte katlanma rulosu; baş–boyun birleşimini örter.
// Işık: `isik` = ekranda ışığın gittiği yön (kit sözleşmesi). `yansima` = ikinci, ZAYIF dolgu (ör. karda güneş şeridinden sekme):
//   ayrı ışık kaynağı DEĞİL, aynı güneşin yüzeyden sekmesi; yalnız kenar hilali olarak çizilir.
// Katman sırası: uzak kol + uzakEl → gövde (sırt) → `govde` yuvası → baş → yaka → yakın kol → `ust` yuvası (askı) → yakinEl.
import React, { useId } from "react";
import { karistir } from "../../doku/sabitler";
import { MurekkepCizgi, murekkepRenk } from "../cizim/MurekkepCizgi";
import { TonTarama } from "../cizim/TonTarama";
import { daireD, egriD, profil, Siluet, uzuv } from "./geo";
import type { FigurPalet } from "./Govde";
import { ekle, lerp2, P2, uzak as mesafe, yonV, aciV } from "./iskelet";
import { Kafa, KafaDonus, KafaIfade, kafaMerkezi, KenarHilal } from "./Kafa";

export type SirtKol = {
  /** omuz eklemi (verilmezse boyundan türetilir) */ omuz?: P2;
  dirsek: P2; bilek: P2;
  /** yarıçap (B): [omuz, dirsek, bilek] */ r?: [number, number, number];
};
export type SirtPoz = {
  boyunDip: P2; B: number;
  /** yakın omzun ekran yanı (+1 sağ) */ yon: 1 | -1;
  /** omuz hattının ekran açısı (derece, + saat yönü) */ omuzAci?: number;
  /** sırtın kameradan dönüşü: 0 tam sırt … 80 neredeyse profil (uzak omuz kısalır) */ donus?: number;
  /** gövde silüetinin indiği ekran y (kadraj altı) */ alt: number;
  /** yakın yan alt ucu: omuz ekleminden yatay (B; palto bolluğu, varsayılan 0.2) */ yakinAlt?: number;
  /** boynun öne eğilmesi: atlasın C7'ye göre ekran açısı (derece; −90 = dik yukarı) */ boyunAci?: number;
  bas: KafaDonus;
  yakinKol: SirtKol; uzakKol?: SirtKol;
};

const nok = (q: P2[]) => egriD(q);

export function sirtGeo(p: SirtPoz) {
  const B = p.B, y = p.yon, d = ((p.donus ?? 30) * Math.PI) / 180;
  const om = yonV(p.omuzAci ?? 0), dik: P2 = [-om[1], om[0]]; // omuz hattı (ekran sağı) ve ona dik (aşağı)
  const N = p.boyunDip;
  const at = (a: number, b: number): P2 => [N[0] + om[0] * a * B + dik[0] * b * B, N[1] + om[1] * a * B + dik[1] * b * B];
  const S1 = p.yakinKol.omuz ?? at(y * 0.82, 0.1);
  const S2 = p.uzakKol?.omuz ?? at(-y * 0.82 * Math.cos(d), 0.12);
  // gövde (sırt): uzak alt köşe → uzak omuz → trapez → boyun → trapez → yakın omuz → yakın yan (koltuk altından aşağı, palto bolluğu)
  const uzakX = S2[0] - y * 0.22 * B;
  const govde: P2[] = [
    [uzakX - y * 0.1 * B, p.alt + 40], [uzakX, S2[1] + 0.6 * B], at(-y * (0.82 * Math.cos(d) + 0.12), 0.0), at(-y * 0.55 * Math.cos(d), -0.2),
    at(-y * 0.24, -0.3), at(y * 0.26, -0.3), at(y * 0.55, -0.2), [S1[0] - y * 0.05 * B, S1[1] - 0.26 * B],
    [S1[0] + y * 0.2 * B, S1[1] + 0.1 * B], [S1[0] + y * (0.14 + 0.2 * ((p.yakinAlt ?? 0.2) - 0.2)) * B, S1[1] + 0.9 * B], [S1[0] + y * (p.yakinAlt ?? 0.2) * B, p.alt + 40],
  ];
  const omuzBas = daireD(ekle(S1, [y * 0.03 * B, -0.02 * B]), 0.27 * B);
  const kolGeo = (k: SirtKol, S: P2) => {
    const [r0, r1, r2] = (k.r ?? [0.27, 0.2, 0.15]).map((v) => v * B);
    const ust = uzuv(S, k.dirsek, profil([[0, r0], [0.55, (r0 + r1) / 2 + 0.01 * B], [1, r1]]));
    const on = uzuv(k.dirsek, k.bilek, profil([[0, r1], [0.3, r1 * 1.02], [0.82, r2], [1, r2 * 1.12]]));
    const parca = [nok(ust), daireD(k.dirsek, r1), nok(on)];
    const a = yonV(aciV(S, k.dirsek)), b = yonV(aciV(k.dirsek, k.bilek));
    const cz = a[0] * b[1] - a[1] * b[0], sg = Math.sign(cz || 1);
    const nA: P2 = [-a[1] * sg, a[0] * sg], nB: P2 = [-b[1] * sg, b[0] * sg];
    // dirsek iç yanı kıvrımları (bükülmenin iç tarafı = nA yönü) + önkolda bükülmeden çıkan uzun çekme kıvrımı
    const kivrim: P2[][] = [
      ...[0.12, 0.28].map((f, i) => { const c = ekle(k.dirsek, a, -f * B); return [ekle(c, nA, (0.17 - 0.02 * i) * B), ekle(ekle(c, nA, 0.05 * B), a, 0.06 * B), ekle(ekle(c, nA, -0.05 * B), a, 0.03 * B)] as P2[]; }),
      ...[0.1, 0.26].map((f, i) => { const c = ekle(k.dirsek, b, f * B); return [ekle(c, nB, (0.16 - 0.02 * i) * B), ekle(ekle(c, nB, 0.04 * B), b, -0.06 * B), ekle(ekle(c, nB, -0.06 * B), b, -0.02 * B)] as P2[]; }),
      [ekle(lerp2(k.dirsek, k.bilek, 0.18), nB, -0.06 * B), ekle(lerp2(k.dirsek, k.bilek, 0.45), nB, -0.02 * B), ekle(lerp2(k.dirsek, k.bilek, 0.7), nB, 0.04 * B)],
    ];
    const bn: P2 = [-b[1], b[0]], m = ekle(k.bilek, b, -0.02 * B);
    const manset: [P2, P2] = [ekle(m, bn, r2 * 1.12), ekle(m, bn, -r2 * 1.12)];
    // kavisli kol dikişi: koltuk altından omuz tepesine, gövdeye doğru bombeli
    const dikis: P2[] = [ekle(S, a, 0.3 * B), ekle(ekle(S, a, 0.08 * B), [y, 0], -0.17 * B), ekle(S, [0, -1], 0.26 * B)];
    return { parca, kivrim, manset, dikis, eksen: [S, k.dirsek, k.bilek] as P2[], ustD: nok(ust), onD: nok(on), uzunluk: mesafe(S, k.dirsek) + mesafe(k.dirsek, k.bilek) };
  };
  const yakin = kolGeo(p.yakinKol, S1);
  const uzakK = p.uzakKol ? kolGeo(p.uzakKol, S2) : undefined;
  // baş: atlas boyundan boyunAci yönünde 0.7 B
  const atlas = ekle(N, yonV(p.boyunAci ?? -80), 0.7 * B);
  const kafaM = kafaMerkezi(atlas, B, p.bas);
  // kalkık yaka: boynu saran bant (arka yüzü), üstte katlanma rulosu
  const yaka: P2[] = [at(-y * 0.78, 0.08), at(-y * 0.62, -0.32), at(-y * 0.3, -0.58), at(y * 0.05, -0.62), at(y * 0.38, -0.5), at(y * 0.6, -0.24), at(y * 0.7, 0.02), at(y * 0.4, 0.14), at(-y * 0.1, 0.16), at(-y * 0.5, 0.18)];
  const rulo: P2[] = [at(-y * 0.66, -0.26), at(-y * 0.32, -0.52), at(y * 0.04, -0.56), at(y * 0.36, -0.44), at(y * 0.56, -0.2)];
  return { B, S1, S2, govde: nok(govde), govdeQ: govde, omuzBas, yakin, uzak: uzakK, atlas, kafaM, yaka: nok(yaka), rulo, at };
}
export type SirtGeo = ReturnType<typeof sirtGeo>;

export type SirtFigurProps = {
  poz: SirtPoz; P: FigurPalet;
  /** ana (soğuk gök) ışığın ekranda gittiği yön */ isik?: P2;
  /** sekme ışığı (aynı güneş, yüzeyden): kenar hilali; clipId verilirse yalnız o bölgede */ yansima?: { yon: P2; renk: string; alfa?: number; clipId?: string };
  ifade?: KafaIfade; seed?: number;
  /** başın ışık yönü (verilmezse isik): yüz başka yüzeye (ör. aydınlık kar) dönükse sekme yönü */ kafaIsik?: P2; kafaIsikOn?: number;
  katman?: Partial<Record<"uzakEl" | "govde" | "ust" | "yakinEl", (g: SirtGeo) => React.ReactNode>>;
  /** kumaş taraması koyuluğu 0..1 */ ton?: number;
};

export const SirtFigur: React.FC<SirtFigurProps> = ({ poz, P, isik = [0.2, 1], yansima, ifade, seed = 401, katman, ton = 0.85, kafaIsik, kafaIsikOn = 0.2 }) => {
  const uid = "sr" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const g = sirtGeo(poz), B = poz.B;
  const il = Math.hypot(isik[0], isik[1]) || 1, lx = isik[0] / il, ly = isik[1] / il;
  const kontur = P.kontur ?? murekkepRenk(P.giysi, 0.8);
  const KA = { isik: [lx, ly] as P2, kalinlik: [Math.max(1.2, 0.006 * B), Math.min(6, Math.max(2.6, 0.016 * B))] as [number, number], kayip: 0.35 };
  const kolRenk = P.kol ?? P.giysi;
  const Yans = ({ d }: { d: string[] }) => yansima ? (
    <g clipPath={yansima.clipId ? `url(#${yansima.clipId})` : undefined}>
      <KenarHilal d={d} renk={yansima.renk} dx={yansima.yon[0] * 0.022 * B} dy={yansima.yon[1] * 0.022 * B} alfa={yansima.alfa ?? 0.8} />
    </g>) : null;
  /** üst kenarda soğuk gök ışığı + gölge yanında koyu hilal + kumaş taraması (eksen boyunca) */
  const Hacim = ({ d, eksen, s, t = ton }: { d: string[]; eksen: P2[]; s: number; t?: number }) => (
    <g>
      <KenarHilal d={d} renk={P.giysiGolge} dx={-lx * 0.09 * B} dy={-ly * 0.09 * B} alfa={0.7} />
      <TonTarama d={d} isik={[lx, ly]} ton={t} renk={murekkepRenk(P.giysiGolge, 0.6)} seed={seed + s} mod="egri" eksen={eksen} aralik={Math.min(6, Math.max(4.2, 0.013 * B))} kalinlik={Math.min(2.2, Math.max(1.4, 0.0055 * B))} gecis={[-0.6, 0.9]} alfa={0.6} />
      <KenarHilal d={d} renk={P.kenar} dx={lx * 0.014 * B} dy={ly * 0.014 * B} alfa={0.75} />
    </g>
  );
  const Kol = ({ k, s }: { k: NonNullable<SirtGeo["uzak"]>; s: number }) => (
    <g>
      <Siluet d={k.parca} dolgu={kolRenk} kontur={kontur} ayar={{ ...KA, seed: seed + s }} konturMaske={`${uid}om`} />
      <Hacim d={k.parca} eksen={k.eksen} s={s + 1} />
      <Yans d={k.parca} />
      {k.kivrim.map((q, i) => <g key={i}>
        <path d={egriD([...q, ...q.slice().reverse().map((p) => [p[0] + 0.02 * B, p[1] + 0.012 * B] as P2)])} fill={P.giysiGolge} opacity={0.75} />
        <MurekkepCizgi q={q} egri renk={kontur} alfa={0.85} kalinlik={Math.max(1.8, 0.008 * B)} ucBas={0.03 * B} ucSon={0.06 * B} seed={seed + s + 10 + i} />
      </g>)}
      <MurekkepCizgi q={[k.manset[0], lerp2(k.manset[0], k.manset[1], 0.5), k.manset[1]]} renk={kontur} kalinlik={KA.kalinlik[1]} ucBas={2} ucSon={2} seed={seed + s + 20} />
    </g>
  );
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        {/* omuz başlığı bölgesinde kolun dış konturu yok (başlık gövdenin parçası; kol ona dikişle bağlanır) */}
        <mask id={`${uid}om`} maskUnits="userSpaceOnUse" x={-2000} y={-2000} width={6000} height={6000}>
          <rect x={-2000} y={-2000} width={6000} height={6000} fill="#fff" /><path d={g.omuzBas} fill="#000" />
        </mask>
      </defs>
      {g.uzak && <Kol k={g.uzak} s={60} />}
      {katman?.uzakEl?.(g)}
      {/* sırt + yakın omuz başlığı: tek siluet */}
      <Siluet d={[g.govde, g.omuzBas]} dolgu={P.giysi} kontur={kontur} ayar={{ ...KA, seed: seed + 1 }} />
      <Hacim d={[g.govde, g.omuzBas]} eksen={[g.at(-0.4, 0.2), g.at(0.2, 1.2), g.at(0.5, 2.6)]} s={2} />
      {/* kürek kemiği çekme kıvrımları (omuzdan sırta çapraz) */}
      {[[g.at(poz.yon * 0.5, 0.25), g.at(poz.yon * 0.3, 0.6), g.at(poz.yon * 0.05, 0.95)], [g.at(poz.yon * 0.62, 0.55), g.at(poz.yon * 0.44, 0.95), g.at(poz.yon * 0.32, 1.35)], [g.at(-poz.yon * 0.1, 0.6), g.at(-poz.yon * 0.05, 1.0), g.at(poz.yon * 0.05, 1.5)]].map((q, i) => <g key={i}>
        <path d={egriD([...q, ...q.slice().reverse().map((p) => [p[0] + 0.03 * B, p[1] + 0.01 * B] as P2)])} fill={P.giysiGolge} opacity={0.7} />
        <MurekkepCizgi q={q} egri renk={kontur} alfa={0.75} kalinlik={Math.max(1.8, 0.008 * B)} ucBas={0.05 * B} ucSon={0.1 * B} seed={seed + 30 + i} />
      </g>)}
      {katman?.govde?.(g)}
      {/* baş (kayıp profil) */}
      <Kafa merkez={g.kafaM} H={B} donus={poz.bas} P={P.kafa} isik={kafaIsik ?? [lx, ly]} isikOn={kafaIsikOn} ifade={ifade} seed={seed + 50} />
      {/* kalkık yaka */}
      <Siluet d={[g.yaka]} dolgu={karistir(P.giysi, P.giysiGolge, 0.25)} kontur={kontur} ayar={{ ...KA, seed: seed + 5 }} />
      <TonTarama d={g.yaka} isik={[lx, ly]} ton={ton} renk={murekkepRenk(P.giysiGolge, 0.6)} seed={seed + 6} mod="egri" eksen={g.rulo} aralik={Math.max(4.2, 0.012 * B)} kalinlik={1.6} gecis={[-0.8, 0.8]} alfa={0.55} />
      <path d={egriD([...g.rulo, ...g.rulo.slice().reverse().map((p) => [p[0], p[1] + 0.07 * B] as P2)])} fill={P.kenar} opacity={0.35} />
      <MurekkepCizgi q={g.rulo.map((p) => [p[0], p[1] + 0.08 * B] as P2)} egri renk={kontur} alfa={0.8} kalinlik={Math.max(2, 0.009 * B)} seed={seed + 7} />
      <KenarHilal d={[g.yaka]} renk={P.kenar} dx={lx * 0.014 * B} dy={ly * 0.014 * B} alfa={0.8} />
      {/* yakın kol (omuz başlığından kavisli dikişle) */}
      <Kol k={g.yakin} s={80} />
      <MurekkepCizgi q={g.yakin.dikis} egri renk={karistir(kontur, kolRenk, 0.3)} kalinlik={Math.max(1.6, 0.007 * B)} ucBas={0.1 * B} ucSon={0.04 * B} seed={seed + 9} />
      {katman?.ust?.(g)}
      {katman?.yakinEl?.(g)}
    </g>
  );
};
