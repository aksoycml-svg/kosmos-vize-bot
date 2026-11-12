import React, { useId } from "react";
import { ink, karistir, P, poly, tonla } from "../doku/sabitler";
import { Desen } from "../doku/Tarama";
import type { KolIsik } from "./RigIsik";

// ===== KolEl — insert/yakın plan kol + el (tasarim.md 2.12) =====
// P01, P10, P11, P15, P16 memur; P09/P23 Paris eli; P21 görevli; P17 yazıcı; P19 EldivenEl (eldiven = el dolgusu).
// Kol: kameraya doğru genişleyen KONİ (kenarda ~200 px → bilekte ~90 px), dirsekte kırılma, iç kıvrımda kırışıklar (ışık+gölge),
// dış noktada yama, ceket manşeti (2 dikiş, iki düğme izi: biri düşmüş), 14–18 px taşan gömlek manşeti.
// El: ince, kemikli; metakarp çizgileri, damar, boğumlar, tırnak; parmak araları negatif boşluk ≥ 6 px.
// Poz "kistir": başparmak ÜSTTE, işaret parmağı ALTTA nesnenin kenarını kıstırır; tutulan nesne ikisinin ARASINDA çizilir.
// Poz "kistirSiki" (Paris eli, ince ip/kılıf): başparmak ucu + işaret parmağı ucu KISTIR_YEREL'de buluşur, orta/yüzük/serçe
// avuca kıvrık (yumruk kütlesi) — açık el ya da serçe yukarıda "rock" okuması yok (A eleştirisi P10a).

export type KolTip = "ceket" | "gomlek" | "parisManset" | "gorevli" | "yazici" | "louis" | "parisGri";
export type KolPalet = { kol: string; kolIsik: string; kolGolge: string; yama?: string; manset: string; mansetKir: string; ten: string; tenGolge: string; dugme?: string };
export const KOL_PALET: Record<KolTip, KolPalet> = {
  ceket: { kol: "#6b6a66", kolIsik: "#8a8983", kolGolge: "#46453f", yama: "#5a5953", manset: "#d8d0bb", mansetKir: "#b9b29d", ten: "#d9b190", tenGolge: "#a9806a", dugme: "#1c1915" },
  gomlek: { kol: "#d8d0bb", kolIsik: "#efe8d6", kolGolge: "#b3ab97", manset: "#d8d0bb", mansetKir: "#b9b29d", ten: "#cdb7a2", tenGolge: "#9a8573" },
  parisManset: { kol: "#2b2a30", kolIsik: "#44434c", kolGolge: "#1a1a1e", manset: "#7c7f87", mansetKir: "#55575e", ten: "#d3a784", tenGolge: "#a77b5f", dugme: "#d4ad52" },
  gorevli: { kol: "#1c1915", kolIsik: "#3a3630", kolGolge: "#0f0d0c", manset: "#efe9d8", mansetKir: "#cfc6b0", ten: "#d8ae8b", tenGolge: "#a97d62" },
  yazici: { kol: "#1c1915", kolIsik: "#3a3630", kolGolge: "#0f0d0c", manset: "#1c1915", mansetKir: "#1c1915", ten: "#d3a784", tenGolge: "#a77b5f" },
  // Louis (P02 göğüs, yazan el): bordo frak kolu, gömlek manşeti eldiven beyazı bandının ALTINDA (#e0d9c6, L* ≈ 87), çıplak el (rig LOUIS.skin)
  // Paris kuşatması (tasarim §3.3): memur/okuyan eli — kömür-gri manşet, düğme/metal YOK (sarı metal yasağı), ten Dagron'dan ayrışır
  parisGri: { kol: "#34363d", kolIsik: "#4b4e57", kolGolge: "#222329", manset: "#5d5f63", mansetKir: "#46484c", ten: "#cdb09a", tenGolge: "#8f7360" },
  louis: { kol: "#74222f", kolIsik: "#9a3646", kolGolge: "#47131c", manset: "#e0d9c6", mansetKir: "#bfb7a2", ten: "#e0ae8a", tenGolge: "#b27b5f", dugme: "#3a1018" },
};
// El boyu (bilekten orta parmak ucuna), el yerel biriminde: ekranda = EL_BOY_YEREL × olcek. Eldiven ölçüsü buna bağlanır (Eldiven elBoyu).
export const EL_BOY_YEREL = 140;

const ofset = (a: P, b: P, w: number): [P, P] => { const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1; const nx = -dy / L, ny = dx / L; return [[a[0] + nx * w, a[1] + ny * w], [a[0] - nx * w, a[1] - ny * w]]; };
const lp = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const aciDer = (a: P, b: P) => (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;

// El yerel çerçevesi: bilek (0,0), el +x yönüne; ölçek 1 ≈ 130 birim boy. Kıstırma noktası:
export const KISTIR_YEREL: P = [132, -4];
export const elMatris = (bilek: P, aci: number, olcek: number) => (p: P): P => {
  const r = (aci * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r);
  return [bilek[0] + (p[0] * c - p[1] * s) * olcek, bilek[1] + (p[0] * s + p[1] * c) * olcek];
};

export const KolEl: React.FC<{
  giris: P; dirsek: P; bilek: P; gen: [number, number, number]; // kenar / dirsek / bilek yarı-genişlik değil TAM genişlik (px)
  tip?: KolTip; elAci: number; olcek: number; poz?: "kistir" | "kistirSiki" | "gevsek";
  tutulan?: React.ReactNode; eldiven?: string; golge?: boolean; golgeRenk?: string; isikUst?: boolean;
  // A5r rig ışığı: sahnenin Isik'ından (RigIsik.kolIsigi). Işık yanı geometriden (isikUst yerine), gölge yanında net kenarlı
  // ton + tek yön tarama (sahne θ), ışık yanında sıcak kenar. El taranmaz. Verilmezse eski davranış.
  isik?: KolIsik;
}> = ({ giris, dirsek, bilek, gen, tip = "ceket", elAci, olcek, poz = "kistir", tutulan, eldiven, golge, golgeRenk = "#14110d", isikUst: isikUst0 = true, isik }) => {
  const K0 = KOL_PALET[tip];
  const uid = "ke" + useId().replace(/:/g, "");
  // ışık yanı: kol eksenine dik (giriş→dirsek normali, ofset() ile aynı işaret) · ışığa doğru yön
  const n1: P = (() => { const dx = dirsek[0] - giris[0], dy = dirsek[1] - giris[1], L = Math.hypot(dx, dy) || 1; return [-dy / L, dx / L]; })();
  const isikUst = isik && !golge ? n1[0] * isik.yon[0] + n1[1] * isik.yon[1] > 0 : isikUst0;
  const K = isik && !golge ? { ...K0, kolIsik: karistir(K0.kolIsik, isik.renk, 0.45) } : K0;
  const g = golgeRenk;
  const f = (c: string) => (golge ? g : c);
  const st = (c: string, w = 2) => (golge ? {} : { stroke: ink(c), strokeWidth: w, strokeLinejoin: "round" as const });
  // ---- kol konisi: giriş → dirsek → bilek, dirsekte yuvarlatılmış ----
  const [g1, g2] = ofset(giris, dirsek, gen[0] / 2);
  const [d1a, d2a] = ofset(giris, dirsek, gen[1] / 2), [d1b, d2b] = ofset(dirsek, bilek, gen[1] / 2);
  const [b1, b2] = ofset(bilek, [2 * bilek[0] - dirsek[0], 2 * bilek[1] - dirsek[1]], gen[2] / 2); // bilekteki kesit
  const ust = [g1, d1a, d1b, b1], alt = [g2, d2a, d2b, b2];
  const yol = `M ${g1[0]} ${g1[1]} L ${d1a[0]} ${d1a[1]} Q ${(d1a[0] + d1b[0]) / 2 + (d1a[0] + d1b[0] - 2 * dirsek[0]) * 0.3} ${(d1a[1] + d1b[1]) / 2 + (d1a[1] + d1b[1] - 2 * dirsek[1]) * 0.3} ${d1b[0]} ${d1b[1]} L ${b1[0]} ${b1[1]} L ${b2[0]} ${b2[1]} L ${d2b[0]} ${d2b[1]} Q ${dirsek[0]} ${dirsek[1]} ${d2a[0]} ${d2a[1]} L ${g2[0]} ${g2[1]} Z`;
  void ust; void alt;
  // manşet konumu: bilekten geri 0..46 px
  const geri = (t: number) => lp(bilek, dirsek, t / Math.hypot(bilek[0] - dirsek[0], bilek[1] - dirsek[1]));
  const mansetA = geri(46), mansetB = geri(0);
  const [ma1, ma2] = ofset(mansetA, mansetB, gen[2] / 2 + 3), [mb1, mb2] = ofset(mansetA, mansetB, gen[2] / 2 + 1);
  const ileri = (t: number): P => { const d = Math.hypot(bilek[0] - dirsek[0], bilek[1] - dirsek[1]); return lp(dirsek, bilek, 1 + t / d); };
  const gom0 = mansetB, gom1 = ileri(16);
  const [ga1, ga2] = ofset(gom0, gom1, gen[2] / 2 - 4), [gb1, gb2] = ofset(gom0, gom1, gen[2] / 2 - 8);
  const kolAci = aciDer(dirsek, bilek);
  const elBilek = ileri(12);
  const E = elMatris(elBilek, elAci, olcek);
  const pp = (pts: P[]) => poly(pts.map(E));
  const ten = eldiven ?? K.ten, tenG = eldiven ? tonla(eldiven, -0.12) : K.tenGolge;
  const parmak = (pts: P[], w: number, k: string, tirnak?: boolean) => {
    // segmentli parmak: kalın polyline + boğum çizgileri
    const e = pts.map(E);
    return (
      <g key={k}>
        <polyline points={poly(e)} stroke={golge ? g : ink(ten)} strokeWidth={(w + 3.2) * olcek} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={poly(e)} stroke={f(ten)} strokeWidth={w * olcek} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {!golge && pts.slice(1, -1).map((q, i) => { const a = E([q[0] - 2, q[1] - w * 0.32]), b = E([q[0] + 1, q[1] + w * 0.32]); return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={tenG} strokeWidth={1.2 * olcek} opacity={0.75} />; })}
        {!golge && pts.slice(1, -1).map((q, i) => { const c = E([q[0], q[1] - w * 0.25]); return <circle key={`k${i}`} cx={c[0]} cy={c[1]} r={1.3 * olcek} fill="#f2d6b8" opacity={eldiven ? 0 : 0.8} />; })}
        {!golge && tirnak && !eldiven && (() => { const a = pts[pts.length - 1], b = pts[pts.length - 2]; const c = E([a[0] - (a[0] - b[0]) * 0.18, a[1] - (a[1] - b[1]) * 0.18 - w * 0.12]); return <ellipse cx={c[0]} cy={c[1]} rx={w * 0.3 * olcek} ry={w * 0.22 * olcek} transform={`rotate(${elAci + aciDer(b, a)} ${c[0]} ${c[1]})`} fill="#e8cdb4" stroke="#c9a38a" strokeWidth={0.8 * olcek} />; })()}
      </g>
    );
  };
  // ---- el parçaları (yerel) ----
  const siki = poz === "kistirSiki";
  const sirt: P[] = [[0, -24], [40, -30], [86, -30], [96, -18], [96, 18], [86, 28], [40, 27], [0, 22]];
  const isaret: P[] = siki ? [[90, -12], [112, -15], [127, -8], [131, 2]] : [[90, -10], [114, -4], [128, 4]];
  const basparmak: P[] = siki ? [[30, -24], [72, -38], [108, -26], [126, -12]] : [[30, -24], [76, -36], [116, -22], [128, -12]];
  const orta: P[] = siki ? [[92, 0], [108, 6], [106, 18], [96, 20]] : [[94, 4], [110, 14], [102, 26]];
  const yuzuk: P[] = siki ? [[90, 12], [104, 18], [100, 28], [91, 29]] : [[92, 16], [106, 26], [98, 36]];
  const serce: P[] = siki ? [[84, 22], [96, 28], [92, 36], [84, 36]] : poz === "kistir" ? [[86, 26], [108, 40], [124, 46]] : [[86, 26], [110, 34], [132, 34]];
  // sıkı kıstırmada kıvrık parmakların altında yumruk kütlesi (boğum sırası arası boşluk kalmaz)
  const yumruk: P[] = [[84, -6], [104, -2], [112, 10], [106, 26], [94, 38], [80, 34]];
  const pinch = E(KISTIR_YEREL);
  return (
    <g>
      {/* kol */}
      <path d={yol} fill={f(K.kol)} {...st(K.kol, 3)} />
      {isik && !golge && (() => {
        // gölge yanı bandı: gölge kenarı → kol genişliğinin %42'si içeri (net terminatör, kol eksenine paralel)
        const gk = isikUst ? [g2, d2a, d2b, b2] : [g1, d1a, d1b, b1], ik = isikUst ? [g1, d1a, d1b, b1] : [g2, d2a, d2b, b2];
        const ic = gk.map((q, i) => lp(q, ik[i], 0.42));
        const bant = [...gk, ...[...ic].reverse()];
        const mk = isik.murekkep ? karistir(K.kol, isik.murekkep, 0.7) : ink(K.kol);
        return (
          <g>
            <defs>
              <clipPath id={`${uid}c`}><path d={yol} /></clipPath>
              <Desen id={`${uid}p`} aci={isik.aci} aralik={7.5} kalin={2.2} renk={mk} alfa={0.6 * isik.sertlik} seed={11} />
            </defs>
            <g clipPath={`url(#${uid}c)`}>
              <polygon points={poly(bant)} fill={mk} fillOpacity={0.2 * isik.sertlik} />
              <polygon points={poly(bant)} fill={`url(#${uid}p)`} />
            </g>
          </g>
        );
      })()}
      {!golge && <>
        {/* ışık kenarı (anahtar sağ-üst) ve gölge kenarı */}
        <polyline points={poly(isikUst ? [lp(g1, d1a, 0.05), d1a, d1b, lp(d1b, b1, 0.9)] : [g2, d2a, d2b, b2])} stroke={K.kolIsik} strokeWidth={Math.max(6, gen[2] * 0.12)} fill="none" strokeLinecap="round" opacity={0.75} />
        <polyline points={poly(isikUst ? [g2, d2a, d2b, b2] : [g1, d1a, d1b, b1])} stroke={K.kolGolge} strokeWidth={Math.max(10, gen[2] * 0.22)} fill="none" strokeLinecap="round" opacity={0.6} />
        {/* dirsek iç kıvrımı: 4 kumaş kırışığı (ışık + gölge çifti), kol eksenine 20–40° */}
        {[0, 1, 2, 3].map((i) => {
          const c = lp(dirsek, isikUst ? d2b : d1b, 0.15 + i * 0.12), a = (kolAci + 90 + 28 - i * 6) * Math.PI / 180, L = gen[1] * (0.32 - i * 0.04);
          const p0: P = [c[0] - Math.cos(a) * L * 0.2 + (i - 1.5) * 10, c[1] - Math.sin(a) * L * 0.2], p1: P = [c[0] + Math.cos(a) * L + (i - 1.5) * 10, c[1] + Math.sin(a) * L];
          return <g key={i}><path d={`M ${p0[0]} ${p0[1]} Q ${(p0[0] + p1[0]) / 2 + 6} ${(p0[1] + p1[1]) / 2 - 6} ${p1[0]} ${p1[1]}`} stroke={K.kolGolge} strokeWidth={3} fill="none" strokeLinecap="round" /><path d={`M ${p0[0] + 4} ${p0[1] - 4} Q ${(p0[0] + p1[0]) / 2 + 10} ${(p0[1] + p1[1]) / 2 - 10} ${p1[0] + 4} ${p1[1] - 4}`} stroke={K.kolIsik} strokeWidth={2} fill="none" strokeLinecap="round" opacity={0.8} /></g>;
        })}
        {/* yama: dirsek dış noktasında, kola paralel, köşesi kalkık, kesik dikiş, iplik ucu */}
        {K.yama && (() => { const c = lp(dirsek, isikUst ? d1a : d2a, 0.45); return (
          <g transform={`translate(${c[0]},${c[1]}) rotate(${aciDer(giris, dirsek)})`}>
            <rect x={-36} y={-30} width={72} height={58} rx={12} fill={K.yama} stroke={ink(K.yama)} strokeWidth={2} />
            <rect x={-30} y={-24} width={60} height={46} rx={9} fill="none" stroke="#3d3c38" strokeWidth={1.5} strokeDasharray="5 4" />
            <path d="M 26 -30 Q 38 -38 36 -22 Z" fill={tonla(K.yama, 0.12)} stroke={ink(K.yama)} strokeWidth={1.2} />
            <path d="M -30 22 q -6 8 -2 14" stroke="#3d3c38" strokeWidth={1.4} fill="none" />
          </g>); })()}
        {/* bilek üstünde kumaş yığılması */}
        {[0, 1, 2].map((i) => { const c = geri(60 + i * 18); const [a1] = ofset(geri(66 + i * 18), c, gen[2] * 0.42); return <path key={`y${i}`} d={`M ${a1[0]} ${a1[1]} q 10 8 ${(c[0] - a1[0]) * 0.8} ${(c[1] - a1[1]) * 0.8}`} stroke={K.kolGolge} strokeWidth={2.4} fill="none" opacity={0.8} />; })}
      </>}
      {/* ceket manşeti: aydınlık şerit, 2 dikiş, yıpranmış kenar, iki düğme izi (biri düşmüş + ip ucu) */}
      <polygon points={poly([ma1, mb1, mb2, ma2])} fill={f(tonla(K.kol, 0.12))} {...st(K.kol, 2)} />
      {!golge && <>
        {[0.3, 0.7].map((t) => { const [a, b] = ofset(lp(mansetA, mansetB, t), lp(mansetA, mansetB, t + 0.01), gen[2] / 2); return <line key={t} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={ink(K.kol)} strokeWidth={1.2} strokeDasharray="4 3" opacity={0.7} />; })}
        {K.dugme && (() => { const [a] = ofset(lp(mansetA, mansetB, 0.25), mansetB, gen[2] * 0.3), [b] = ofset(lp(mansetA, mansetB, 0.65), mansetB, gen[2] * 0.3); return <g><circle cx={a[0]} cy={a[1]} r={5} fill={K.dugme} /><circle cx={b[0]} cy={b[1]} r={2} fill="none" stroke={ink(K.kol)} strokeWidth={1} /><path d={`M ${b[0]} ${b[1]} q 5 6 2 12`} stroke={K.mansetKir} strokeWidth={1.2} fill="none" /></g>; })()}
      </>}
      {/* gömlek manşeti: ceketten 16 px taşan beyaz bant (kolu "kol" okutur) */}
      <polygon points={poly([ga1, gb1, gb2, ga2].map((q, i) => i < 2 ? q : q))} fill={f(K.manset)} {...st(K.manset, 1.6)} />
      <polygon points={poly([ofset(gom0, gom1, gen[2] / 2 - 4)[0], ofset(gom1, ileri(17), gen[2] / 2 - 8)[0], ofset(gom1, ileri(17), gen[2] / 2 - 8)[1], ofset(gom0, gom1, gen[2] / 2 - 4)[1]])} fill={f(K.manset)} />
      {!golge && <polyline points={poly([gb1, gb2])} stroke={K.mansetKir} strokeWidth={2} fill="none" />}
      {/* ---- EL (arka katman): sırt, kıvrık parmaklar, işaret parmağı ---- */}
      <polygon points={pp(sirt)} fill={f(ten)} {...st(ten, 2)} />
      {!golge && <>
        {[-14, 0, 13].map((y, i) => <path key={i} d={`M ${E([20, y * 0.6])[0]} ${E([20, y * 0.6])[1]} Q ${E([55, y])[0]} ${E([55, y])[1]} ${E([88, y * 1.15])[0]} ${E([88, y * 1.15])[1]}`} stroke={tenG} strokeWidth={1.3 * olcek} fill="none" opacity={0.55} />)}
        {!eldiven && [[-6, 6], [8, 18]].map(([a, b], i) => <path key={`d${i}`} d={`M ${E([14, a])[0]} ${E([14, a])[1]} Q ${E([40, a + 4])[0]} ${E([40, a + 4])[1]} ${E([66, b])[0]} ${E([66, b])[1]}`} stroke="#8c8a9a" strokeWidth={1.4 * olcek} fill="none" opacity={0.35} />)}
        {/* bilek kemik çıkıntısı */}
        {(() => { const c = E([6, -20]); return <circle cx={c[0]} cy={c[1]} r={3 * olcek} fill="#f0d2b0" opacity={0.6} />; })()}
        {eldiven && [-10, 0, 10].map((y) => <path key={`es${y}`} d={`M ${E([34, y])[0]} ${E([34, y])[1]} L ${E([78, y * 1.1])[0]} ${E([78, y * 1.1])[1]}`} stroke="#b9ad92" strokeWidth={1.4 * olcek} />)}
      </>}
      {siki && <polygon points={pp(yumruk)} fill={f(tenG)} {...st(ten, 2)} />}
      {parmak(yuzuk, 13, "yz")}
      {parmak(orta, 14, "or")}
      {parmak(serce, 11, "sr", !siki)}
      {parmak(isaret, 15, "is", true)}
      {/* tutulan nesne: başparmak (üst) ile işaret parmağı (alt) ARASINDA */}
      {tutulan && <g transform={`translate(${pinch[0]},${pinch[1]})`}>{tutulan}</g>}
      {/* ---- başparmak (ön katman): nesnenin üstünden kıstırır ---- */}
      {parmak(basparmak, 15, "bp", true)}
    </g>
  );
};
