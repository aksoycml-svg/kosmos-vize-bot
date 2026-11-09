// ===== KE-S4 KITAP-INSERT (Evliya Uçuşları; mekanlar.md §4, tasarim.md v1.7 §1.4 / §2.3 / §4.8; K8) =====
// P13 (insert → geri çekilme, defterler açılır) ve P14 (kenar çizimine push-in, kıvılcım; son kare = P01 p0 eşleşmesi).
// Kamera dik tepeden (parallaks yok). Tek ışık üst-sol, gölgeler sağ-aşağı (+0.4, +0.5): tabla (+24, +30), kitap (+8, +10), defter (+6, +8).
// Katmanlar (§4.2): zemin #2e2016 · tablanın zemine gölgesi · RAHLE tablası x 140–940, y 470–1110 (#4a3222, yatay damar 1.4 px α .25,
// 8 px aşınmış açık kenar; ayak/kasnak/minder/oturan kişi YOK) · kalemdan + gömülü hokka + kamış kalem (x 330–750, y 482–538; divit yok) ·
// Seyahatname açık x 220–860, y 545–1045 (cilt oluğu x 540, iki tonlu 40 px) — 15 satır/sayfa DİL-NÖTR hat (harf okunmaz), çift cetvel ·
// sağ sayfa dış kenarında iki kenar çizimi (#4a4237, tek kalınlık 1.4 px dekor, tarama yok) · zeminde 3 defter (×0.67, boş sayfalar).
// Bu şablonda tarama hiç yok. Sayfadaki TEK renkli öğe kıvılcımdır (P14).
// K3 döngü (tasarım §2.3): fişek+binici çizimi P01 p0 ekran kompozisyonunun (cs 1.25) mürekkep hâlidir: çizim noktası D = D0 + (E − E0)/4.6
// (E = P01 p0 ekran px, E0 = demet tabanı (515, 1422), D0 = (790, 885)). P14 son kamerası (cs 4.6, cx −1175, cy 807) D0'ı E0'a geri getirir;
// çizimdeki fitilin orta noktası = P01 p0 kıvılcımı (277, 1415). Bu yüzden çizim 252 px boyundadır (tasarım "140 px" nominaldi; raporlu).
import React from "react";
import { interpolate } from "remotion";
import { RenkKaydi } from "../../../doku/Tarama";
import { DOKU_SEED, karistir, lerp, P, poly, rnd } from "../../../doku/sabitler";
import { FitilKivilcimi } from "../../../components/GravurEfekt";
import { propDurum } from "../../props";
import type { Prop } from "../../tipler";
import { cl, ekranNokta, INOUT, kameraHesapla, katDonusum } from "../../zaman";
import { param, Sablon, SablonProps } from "../../ortak";

const S = DOKU_SEED.kitap;
const R = {
  zemin: "#2e2016", zeminGolge: "#1e140c", tabla: "#4a3222", tablaKenar: "#5e4230", damar: "#2e2016",
  sayfa: "#e9dfc9", sayfaKenar: "#d6c7a6", oluk: "#c4b594", hat: "#2a2420", cizim: "#4a4237",
  kalemdan: "#5a5048", kamis: "#a08a5c", hokka: "#2a2420", kapak: ["#3e2e24", "#4a4038", "#34302c"], kapakIc: "#ded3bb",
};
export const KITAP = { tabla: { x: [140, 940], y: [470, 1110] }, kitap: { x: [220, 860], y: [545, 1045] }, kalemdan: { x: [330, 750], y: [482, 538] }, oluk: 540 } as const;
// K3 eşleşme sabitleri (P01 p0 ekran ↔ çizim dekor). P01 p0 değişirse (demet x/y, kamera) burası yeniden hesaplanır.
export const ESLESME = { cs: 4.6, E0: [515, 1422] as P, D0: [790, 885] as P, kivilcimE: [277.5, 1415] as P, kivilcimOlcek: 1.25 };
const D = (e: P): P => [ESLESME.D0[0] + (e[0] - ESLESME.E0[0]) / ESLESME.cs, ESLESME.D0[1] + (e[1] - ESLESME.E0[1]) / ESLESME.cs];
// çizimdeki fitil (P01 ekran px): 4 eşit parça; orta nokta = P01 p0 kıvılcımı
const FITIL_E: P[] = [[99, 1418], [188, 1424], [277.5, 1415], [366, 1404], [455, 1405]];
const yolNokta = (pts: P[], t: number): P => {
  const L: number[] = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const h = Math.max(0, Math.min(1, t)) * L[L.length - 1]; let i = 1; while (i < pts.length - 1 && L[i] < h) i++;
  const u = (h - L[i - 1]) / Math.max(1e-6, L[i] - L[i - 1]);
  return [lerp(pts[i - 1][0], pts[i][0], u), lerp(pts[i - 1][1], pts[i][1], u)];
};
const DEFTER_VARSAYILAN = [{ id: "d1", kapali_kutu: [90, 1150, 246, 1364] }, { id: "d2", kapali_kutu: [680, 1170, 836, 1384] }, { id: "d3", kapali_kutu: [385, 1262, 541, 1476] }];
type DefterP = { id: string; kapali_kutu: number[]; acik?: { bas: number; bit: number } };

// ---------------- yüzey ----------------
const Rahle: React.FC = () => {
  const { x: [x0, x1], y: [y0, y1] } = KITAP.tabla;
  return <g>
    <rect x={-800} y={-1600} width={2700} height={5200} fill={R.zemin} />
    <rect x={x0 + 24} y={y0 + 30} width={x1 - x0} height={y1 - y0} fill={R.zeminGolge} opacity={0.5} />
    <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill={R.tabla} />
    {/* yatay damar (ceviz benzeri), seed sabit */}
    {Array.from({ length: 30 }).map((_, i) => { const y = y0 + 12 + i * ((y1 - y0 - 24) / 29) + (rnd(S, `d${i}`) - 0.5) * 8; const a = 2 + rnd(S, `da${i}`) * 3, f = 0.006 + rnd(S, `df${i}`) * 0.01;
      const pts: P[] = Array.from({ length: 33 }).map((_, j) => { const x = x0 + 6 + (j * (x1 - x0 - 12)) / 32; return [x, y + a * Math.sin(x * f + i)] as P; });
      return <polyline key={i} points={poly(pts)} fill="none" stroke={R.damar} strokeWidth={1.4} strokeOpacity={0.25} />; })}
    {/* 8 px aşınmış kenar (açık ton) */}
    <rect x={x0 + 4} y={y0 + 4} width={x1 - x0 - 8} height={y1 - y0 - 8} fill="none" stroke={R.tablaKenar} strokeWidth={8} />
  </g>;
};
const Kalemdan: React.FC = () => {
  const { x: [x0, x1], y: [y0, y1] } = KITAP.kalemdan;
  return <g>
    <rect x={x0 + 5} y={y0 + 6} width={x1 - x0} height={y1 - y0} rx={10} fill={R.zemin} opacity={0.55} />
    <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} rx={10} fill={R.kalemdan} />
    <rect x={x0 + 18} y={y0 + 13} width={300} height={y1 - y0 - 26} rx={8} fill={karistir(R.kalemdan, "#1e1a16", 0.45)} />
    {/* kamış kalem (oluk içinde; ucu eğik kesik) */}
    <path d={`M ${x0 + 34} ${(y0 + y1) / 2 + 4} L ${x0 + 300} ${(y0 + y1) / 2 - 3} L ${x0 + 300} ${(y0 + y1) / 2 + 5} L ${x0 + 46} ${(y0 + y1) / 2 + 10} Z`} fill={R.kamis} />
    {/* gömülü hokka */}
    <circle cx={x1 - 52} cy={(y0 + y1) / 2} r={21} fill={karistir(R.kalemdan, "#1e1a16", 0.3)} />
    <circle cx={x1 - 52} cy={(y0 + y1) / 2} r={14} fill={R.hokka} />
    <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} rx={10} fill="none" stroke={karistir(R.kalemdan, "#1e1a16", 0.6)} strokeWidth={2} />
  </g>;
};
// dil-nötr hat satırı: sağdan sola 4–7 küme (kalın-ince yatay vuruş + 1–2 kısa dikey çıkıntı + ara sıra nokta), bazı satırlarda keşide
const HatSatir: React.FC<{ x0: number; x1: number; y: number; seed: string }> = ({ x0, x1, y, seed }) => {
  const out: React.ReactNode[] = [];
  let x = x1, i = 0;
  const kesideSatir = rnd(S, `${seed}k`) < 0.35;
  while (x > x0 + 10) {
    const w = Math.min(x - x0, (kesideSatir && i === 2 ? 46 : 14) + rnd(S, `${seed}w${i}`) * 26);
    const yy = y + (rnd(S, `${seed}y${i}`) - 0.5) * 2;
    const kal = 1.6 + rnd(S, `${seed}t${i}`) * 1.4;
    out.push(<path key={`h${i}`} d={`M ${x} ${yy - 1} Q ${x - w * 0.5} ${yy + 2.5} ${x - w} ${yy}`} stroke={R.hat} strokeWidth={kal} fill="none" strokeLinecap="round" />);
    const nC = 1 + Math.floor(rnd(S, `${seed}c${i}`) * 2);
    for (let c = 0; c < nC; c++) { const cx = x - w * (0.2 + 0.6 * rnd(S, `${seed}cx${i}${c}`)), h = 6 + rnd(S, `${seed}ch${i}${c}`) * 7; out.push(<line key={`c${i}${c}`} x1={cx} y1={yy} x2={cx + 1.5} y2={yy - h} stroke={R.hat} strokeWidth={1.6} strokeLinecap="round" />); }
    if (rnd(S, `${seed}n${i}`) < 0.15) out.push(<circle key={`n${i}`} cx={x - w * rnd(S, `${seed}nx${i}`)} cy={yy + (rnd(S, `${seed}nu${i}`) < 0.5 ? -9 : 6)} r={1.5} fill={R.hat} />);
    x -= w + 5 + rnd(S, `${seed}g${i}`) * 7; i++;
  }
  return <g>{out}</g>;
};
const MetinBlok: React.FC<{ x0: number; x1: number; y0: number; y1: number; seed: string }> = ({ x0, x1, y0, y1, seed }) => {
  const n = 15, ara = (y1 - y0) / n;
  return <g>
    <rect x={x0 - 10} y={y0 - 10} width={x1 - x0 + 20} height={y1 - y0 + 14} fill="none" stroke={R.cizim} strokeWidth={1} />
    <rect x={x0 - 6} y={y0 - 6} width={x1 - x0 + 12} height={y1 - y0 + 6} fill="none" stroke={R.cizim} strokeWidth={1} />
    {Array.from({ length: n }).map((_, i) => <HatSatir key={i} x0={x0} x1={x1} y={y0 + ara * (i + 0.72)} seed={`${seed}${i}`} />)}
  </g>;
};
// ---------------- kenar çizimleri (§4.8) ----------------
// (1) demet + binici: P01 p0 kompozisyonu, P01 ekran px'te tarif edilir, D() ile sayfaya iner. Dolgu = sayfa (arkadaki çizgiyi örter), kontur 1.4 dekor.
const CizimFisek: React.FC = () => {
  const k = 1 / ESLESME.cs, sw = 1.4 / k;
  const st = { fill: R.sayfa, stroke: R.cizim, strokeWidth: sw, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  const tup = (cx: number, ust: number) => <path d={`M ${cx - 28} ${ust} L ${cx + 28} ${ust} L ${cx + 28} 1380 Q ${cx} 1394 ${cx - 28} 1380 Z`} {...st} />;
  return <g transform={`translate(${ESLESME.D0[0]},${ESLESME.D0[1]}) scale(${k}) translate(${-ESLESME.E0[0]},${-ESLESME.E0[1]})`}>
    {/* fitil (kıvılcım bunun üstünde yürür) */}
    <polyline points={poly(FITIL_E)} fill="none" stroke={R.cizim} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    {/* katlı kanat (sırtta, arkada) */}
    <path d="M 470 552 Q 400 600 392 700 Q 392 800 424 884 Q 450 820 478 760 Z" {...st} />
    <path d="M 452 590 Q 420 700 428 840" fill="none" stroke={R.cizim} strokeWidth={sw * 0.8} strokeLinecap="round" />
    {/* demet: arka 2 tüp, ön 3 tüp, 3 sicim bağı, oturak, dayama, kızak */}
    {tup(486, 862)}{tup(544, 862)}
    {tup(457, 870)}{tup(515, 870)}{tup(573, 870)}
    {[1255, 1088, 914].map((y, i) => <path key={i} d={`M 425 ${y} Q 515 ${y + 12} 605 ${y}`} fill="none" stroke={R.cizim} strokeWidth={sw * 1.25} />)}
    {/* tüp ağızları (koyu halka) + silindir hacmi: her ön tüpte tek ince ışık çizgisi */}
    {[457, 515, 573].map((cx, i) => <g key={i}><ellipse cx={cx} cy={1380} rx={22} ry={6} fill={R.cizim} /><line x1={cx + 12} y1={884} x2={cx + 12} y2={1366} stroke={R.cizim} strokeWidth={sw * 0.45} /></g>)}
    <rect x={388} y={1380} width={257} height={14} {...st} />
    <rect x={388} y={1380} width={32} height={42} {...st} />
    <rect x={613} y={1380} width={32} height={42} {...st} />
    <rect x={335} y={1018} width={362} height={18} rx={6} {...st} />
    <rect x={408} y={845} width={214} height={27} {...st} />
    {/* oturan binici (yüz yok): gövde, uyluk, baldır, çizme dayamada, ön kol sicim bağına, sarık */}
    <path d="M 466 548 Q 560 530 640 562 Q 656 660 646 760 Q 630 820 604 842 L 430 846 Q 428 760 446 680 Q 452 600 466 548 Z" {...st} />
    <path d="M 446 790 Q 580 790 690 836 Q 712 862 694 890 Q 600 880 446 860 Z" {...st} />
    <path d="M 660 880 Q 690 870 702 884 Q 696 940 682 986 L 640 986 Q 648 930 660 880 Z" {...st} />
    <path d="M 604 984 L 690 984 Q 706 1000 700 1018 L 590 1018 Q 588 998 604 984 Z" {...st} />
    <path d="M 602 584 Q 648 640 652 720 Q 646 820 624 900 L 590 902 Q 606 820 610 730 Q 606 660 584 604 Z" {...st} />
    <path d="M 572 520 Q 566 470 578 430 L 650 420 Q 664 450 670 470 Q 660 478 652 484 Q 654 506 642 532 Q 610 546 572 520 Z" {...st} />
    <path d="M 528 392 Q 520 320 570 286 Q 630 252 700 284 Q 748 316 738 380 Q 732 422 690 432 Q 620 446 560 428 Q 530 418 528 392 Z" {...st} />
    <path d="M 540 360 Q 630 330 728 350 M 548 396 Q 640 372 732 396" fill="none" stroke={R.cizim} strokeWidth={sw * 0.8} strokeLinecap="round" />
  </g>;
};
// (2) kanatlı adam: süzülen figür, açık kanat §4.2 biçimi (incelen yaprak, uçta 3 kısa parmak), gövde küçük. Yerel ≈ 116 × 64.
const CizimKanatli: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const st = { fill: R.sayfa, stroke: R.cizim, strokeWidth: 1.4, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  // §4.2 açık kanat: kalın kavisli ön kenar, sığ içbükey arka kenar, uca doğru incelen yaprak; uçta 3 kısa YUVARLAK parmak (yarasa dişi yok)
  const kanat = (kok: P, uc: P, en: number) => {
    const dx = uc[0] - kok[0], dy = uc[1] - kok[1], L = Math.hypot(dx, dy), ax: P = [dx / L, dy / L], nx: P = [-ax[1], ax[0]];
    const at = (u: number, v: number): P => [kok[0] + dx * u + nx[0] * v, kok[1] + dy * u + nx[1] * v];
    const w = (u: number) => en * (1 - 0.55 * u);
    const N = 10, on: P[] = [], arka: P[] = [];
    for (let i = 0; i <= N; i++) { const u = (i / N) * 0.9; on.push(at(u, w(u) * 0.55 * (1 + 0.18 * Math.sin(Math.PI * u)))); arka.push(at(u, -w(u) * 0.45 * (1 - 0.12 * Math.sin(Math.PI * u)))); }
    const w9 = w(0.9), uc0 = at(0.9, w9 * 0.55), uc3 = at(0.9, -w9 * 0.45);
    const parmak = [0.38, 0.05, -0.28].map((o) => at(1.0, w9 * o));
    const ara = [0.22, -0.12].map((o) => at(0.93, w9 * o));
    const d = `M ${on.map((q) => q.join(",")).join(" L ")} Q ${uc0[0] + ax[0] * 4},${uc0[1] + ax[1] * 4} ${parmak[0].join(",")} Q ${ara[0].join(",")} ${parmak[1].join(",")} Q ${ara[1].join(",")} ${parmak[2].join(",")} Q ${uc3[0] + ax[0] * 4},${uc3[1] + ax[1] * 4} ${uc3.join(",")} L ${[...arka].reverse().map((q) => q.join(",")).join(" L ")} Z`;
    return <path d={d} {...st} />;
  };
  return <g transform={`translate(${x},${y})`}>
    {kanat([4, -6], [48, -40], 22)}
    {/* gövde (30° öne), bacaklar arkada bitişik, baş + sarık */}
    <path d="M -30 16 Q -6 4 18 -6 Q 28 -8 30 0 Q 10 14 -26 24 Z" {...st} />
    <path d="M -30 16 L -54 26 L -52 31 L -26 24 Z" {...st} />
    <circle cx={34} cy={-10} r={7} {...st} />
    <path d="M 28 -15 Q 34 -24 42 -15" {...st} />
    {kanat([-2, -4], [-56, -36], 26)}
  </g>;
};
// ---------------- defter (zeminde ×0.67; kapak sırt [sağ kenar] üzerinden sağa döner, iki boş sayfa) ----------------
const Defter: React.FC<{ kutu: number[]; renk: string; t: number }> = ({ kutu, renk, t }) => {
  const [x0, y0, x1, y1] = kutu, W = x1 - x0, H = y1 - y0;
  const th = Math.PI * INOUT(Math.max(0, Math.min(1, t))), c = Math.cos(th);
  const kalk = Math.sin(th); // kapak havadayken gölgesi sağa-aşağı kayar
  const kos = 7;
  const kapakDis = (xa: number, xb: number) => <g>
    <rect x={xa} y={y0} width={xb - xa} height={H} fill={renk} stroke={karistir(renk, "#0e0a08", 0.5)} strokeWidth={2} />
    {xb - xa > 20 && <>{[0.25, 0.5, 0.75].map((u, i) => <line key={i} x1={xb - 7} y1={y0 + H * u} x2={xb - 1} y2={y0 + H * u} stroke={karistir(renk, "#e9dfc9", 0.25)} strokeWidth={2} />)}
      <polygon points={poly([[xa, y0], [xa + kos, y0], [xa, y0 + kos]])} fill={karistir(renk, "#e9dfc9", 0.22)} />
      <polygon points={poly([[xa, y1], [xa + kos, y1], [xa, y1 - kos]])} fill={karistir(renk, "#e9dfc9", 0.22)} /></>}
  </g>;
  return <g>
    {/* gölge (+6, +8) */}
    <rect x={x0 + 6} y={y0 + 8} width={t > 0 ? W + Math.max(0, -c) * W : W} height={H} fill="#140c06" opacity={0.5} />
    {t <= 0 ? kapakDis(x0, x1) : <g>
      {/* ilk sayfa (boş) + sayfa kenarları */}
      <rect x={x0} y={y0} width={W} height={H} fill={R.sayfa} stroke={R.sayfaKenar} strokeWidth={2} />
      <line x1={x1 - 2} y1={y0} x2={x1 - 2} y2={y1} stroke={R.oluk} strokeWidth={4} opacity={0.6} />
      {c > 0
        ? <g><rect x={x1 - W * c + 6 * kalk} y={y0 + 8 * kalk} width={W * c} height={H} fill="#140c06" opacity={0.25 * kalk} />{kapakDis(x1 - W * c, x1)}</g>
        : <g><rect x={x1} y={y0} width={W * -c} height={H} fill={R.kapakIc} stroke={R.sayfaKenar} strokeWidth={2} /><line x1={x1 + 2} y1={y0} x2={x1 + 2} y2={y1} stroke={R.oluk} strokeWidth={4} opacity={0.6} /></g>}
    </g>}
  </g>;
};

const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const kitapAd = param<string>(plan, "kitap", "seyahatname");
  if (kitapAd !== "seyahatname") throw new Error(`[KITAP-INSERT] kitap "${kitapAd}" kurulmadı (kurulu: seyahatname)`);
  const k = kameraHesapla(plan.kamera, p);
  const hepsiAcik = param<boolean>(plan, "defterler_acik", false);
  const defterler = param<DefterP[]>(plan, "defterler", DEFTER_VARSAYILAN as DefterP[]);
  const kenar = param<{ tur: string; x: number; y: number }[]>(plan, "kenar_cizim", []);
  const kanatli = kenar.find((q) => q.tur === "kanatli-adam");
  // kıvılcım (P14): çizimdeki fitil boyunca durum.fitil 0–1
  const kvPr = (plan.props ?? []).find((q) => q.tur === "kivilcim") as Prop | undefined;
  const kv = kvPr && kvPr.kare && p >= kvPr.kare[0] ? D(yolNokta(FITIL_E, Number(propDurum(kvPr, p).fitil ?? 0))) : null;
  const { x: [bx0, bx1], y: [by0, by1] } = KITAP.kitap;
  const metinY: [number, number] = [by0 + 60, by1 - 60];
  // kilit: kenar çizimi (kurulum) + defter açılışları (temas) + kıvılcım
  kilit.push({ ad: "fişek çizimi", p: ekranNokta(k, D([515, 1000])), tur: "kurulum" });
  defterler.forEach((df) => { const kk = df.kapali_kutu; if (df.acik && Math.abs(p - df.acik.bas) <= 1) kilit.push({ ad: `defter ${df.id} açılır`, p: ekranNokta(k, [kk[2], (kk[1] + kk[3]) / 2]), tur: "temas" }); });
  if (kv) kilit.push({ ad: "kıvılcım", p: ekranNokta(k, kv), tur: "dokunus" });
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <RenkKaydi>
        <g transform={katDonusum(k, 1)}>
          <Rahle />
          <Kalemdan />
          {/* kitap gölgesi (+8, +10) + sayfa blokları (kenar kalınlığı: dışta 3 ince çizgi) */}
          <rect x={bx0 + 8} y={by0 + 10} width={bx1 - bx0} height={by1 - by0} fill={R.zemin} opacity={0.55} />
          <rect x={bx0} y={by0} width={bx1 - bx0} height={by1 - by0} fill={R.sayfa} />
          {[0, 3, 6].map((d, i) => <g key={i}><line x1={bx0 + d + 1} y1={by0 + 4} x2={bx0 + d + 1} y2={by1 - 4} stroke={R.sayfaKenar} strokeWidth={1.2} /><line x1={bx1 - d - 1} y1={by0 + 4} x2={bx1 - d - 1} y2={by1 - 4} stroke={R.sayfaKenar} strokeWidth={1.2} /></g>)}
          <rect x={bx0} y={by0} width={bx1 - bx0} height={by1 - by0} fill="none" stroke={R.sayfaKenar} strokeWidth={3} />
          {/* cilt oluğu: iki tonlu 40 px */}
          <rect x={KITAP.oluk - 20} y={by0} width={40} height={by1 - by0} fill={R.sayfaKenar} />
          <rect x={KITAP.oluk - 8} y={by0} width={16} height={by1 - by0} fill={R.oluk} opacity={0.5} />
          {/* metin blokları: sol sayfa geniş; sağ sayfada dış kenar boşluğu kenar çizimlerine (hâşiye) ayrılır */}
          <MetinBlok x0={258} x1={502} y0={metinY[0]} y1={metinY[1]} seed="s" />
          <MetinBlok x0={578} x1={688} y0={metinY[0]} y1={metinY[1]} seed="g" />
          <CizimFisek />
          {kanatli && <CizimKanatli x={kanatli.x} y={kanatli.y} />}
          {kv && kvPr && <FitilKivilcimi x={kv[0]} y={kv[1]} p={p} olcek={ESLESME.kivilcimOlcek / ESLESME.cs} seed={S + 21} />}
          {/* zemindeki defterler (×0.67) */}
          {defterler.map((df, i) => <Defter key={df.id ?? i} kutu={df.kapali_kutu} renk={R.kapak[i % 3]} t={hepsiAcik ? 1 : df.acik ? interpolate(p, [df.acik.bas, df.acik.bit], [0, 1], cl) : 0} />)}
        </g>
      </RenkKaydi>
    </svg>
  );
};
const arsiv = () => "gunduzMineral" as const; // K8: "kagit" sayfayı #dccdac'ye ısıtıp imza bandına (demet #c4a874) sokuyordu
export const KITAP_INSERT: Sablon = { Sahne, arsiv };
