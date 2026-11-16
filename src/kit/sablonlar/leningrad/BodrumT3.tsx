// ===== BODRUM `p08` tur-3 — onaylı hedef (hedef/hedef-morg.png) + tur-2 eleştirisi (K1–K3, 1–6) =====
// Tur-2 kaydı BodrumHedef.tsx'te (görünüm "p08-t2"). Bu dosya yalnız EKLEME.
// TEK IŞIK (değişmedi): koridor penceresi S, izdüşüm s = (−260, −260); ışık yalnız kapı açıklığından → yelpaze (eğim 0.84…2.68).
// Işığın yolu (CLAUDE "Işığın yolu"): kaynak → huzme (toz) → aydınlanan yüzey; araya kütle girerse yüzey karanlık:
//   - zemin ışığı yalnız sedyenin ARKASINDAKİ bantta (K1); sedyenin altı ve önü LM.zemin; elin altında yalnız koyu temas lekesi;
//   - huzme ve toz sedyenin arkasında; ele inen dar ışın kanalı örtünün üstünden (kapı yakın kenarla aynı derinlikte) ele düşer;
//   - Eliasberg'in kendi gölgesi: dizdeki el ve gövdenin sağ yarısı gölgede (ışın gövdesinden geçmez).
// Figür (tur-2 madde 1–5, K3): gövde asimetrik, ekseni ~13° sola eğik, uzak (sağ) omuz 30 px yüksek, belde %10 daralma; kollar
//   konik + omuz başlığı BİRLEŞİK silüet (iç dikiş yok, kesik uç yok), kavisli kol dikişi; 9 kıvrım (oluk + sırt); çentikli yaka;
//   gölge sınırı hacmi izler; diz gövdenin önünde, palto eteği dizin üstüne biner; atkı 3 parça (sarma + iki uç + kaburga örgü).
// Sedye (K2, madde 6): tahta + ön kenar + ayaklar görünür; örtü sol yarıda tahtanın üstünde biter (kıvrık kenar), sağ yarıda kısa
//   sarkar (V kırıklı etek); ölü önkol örtünün altından tahtaya çıkar (≈ 85 px), bilek kenarda kırılır, el aşağı sarkar.
import React from "react";
import { Tarama } from "../../../doku/Tarama";
import { rnd } from "../../../doku/sabitler";
import { GravurPalet, konikKol } from "../../props/paris/GravurEl";
import type { SablonProps } from "../../ortak";
import { LM } from "./BodrumHedef";
import { Birlesik, daire, HilalB, INC_POZ, IncEl, IncElPoz, kapsul, Kivrim, KirpB, LgYuz3, serit, YuzPalet3 } from "./lgFigur";
import { cr, Hilal, Kirp, LgBaski, P2, pS } from "./lgOrtak";
import { zarf } from "./salonDunya";

const S: P2 = [-260, -260];
const KAPI = { x0: 224, x1: 336, y0: 238, y1: 1036 };
const egim = (q: P2) => (q[1] - S[1]) / (q[0] - S[0]);
const E_MIN = egim([KAPI.x1, KAPI.y0]), E_MAX = egim([KAPI.x0, KAPI.y1]);
const isinY = (m: number, x: number) => S[1] + m * (x - S[0]);
const isinX = (m: number, y: number) => S[0] + (y - S[1]) / m;
const yelpaze = (a: number, b: number): P2[] => [[isinX(a, KAPI.y0) < KAPI.x1 ? KAPI.x1 : isinX(a, KAPI.y0), isinY(a, Math.max(KAPI.x1, isinX(a, KAPI.y0)))], [3000, isinY(a, 3000)], [isinX(b, 3200), 3200], [KAPI.x0, isinY(b, KAPI.x0)]];
const YELPAZE = yelpaze(E_MIN, E_MAX);
const yolD = (q: P2[]) => `M${pS(q).split(" ").join(" L")}Z`;
const YD = yolD(YELPAZE);

const ISIKTA: YuzPalet3 = {
  ten: "#cfa48c", tenOrta: "#a37a70", tenDerin: "#7a5662", yansima: ["#b88a74", "#c89c80"], kenar: "#f4d2b4", kontur: "#3a2630", tarama: "#6a4450",
  sac: "#463636", sacIsik: "#7e6458", sacKontur: "#1e1618", sacKir: "#7a6a6a", dudak: "#9a6866", agizIc: "#3a222a", gozAk: "#cbb2a6", iris: "#4b3a40", bebek: "#1d1519", kas: "#4a3436", parilti: "#f4e0cc",
};
const EL_ISIK: GravurPalet = { isik: "#e2b896", golge: "#b68872", konturYuk: "#5a3e3a", konturIsik: "#a8836c", kenar: "#f0c4a8", tarama: "#6a4f40", manset: "#4a4276", mansetGolge: "#352c40" };
const EL_E: GravurPalet = { isik: "#b48a7c", golge: "#8a6468", konturYuk: "#3e2c34", konturIsik: "#80666a", kenar: "#d8b4a0", tarama: "#5a4040", manset: "#3e3446", mansetGolge: "#2a2236" };
const EL_OLU: GravurPalet = { isik: "#c8a490", golge: "#9a7a7a", konturYuk: "#3e2c34", konturIsik: "#8a7070", kenar: "#e6c8b4", tarama: "#5a4040", manset: "#3e3446", mansetGolge: "#2a2236" };
const EL_OLU_ISIK: GravurPalet = { isik: "#e8c4a6", golge: "#bc9480", konturYuk: "#4a3438", konturIsik: "#a8836c", kenar: "#f4d2b4", tarama: "#6a4f40", manset: "#3e3446", mansetGolge: "#2a2236" };

// palto: hedefteki gibi sıcak kahve-gri (tur-2 mor-gri paltoda sıcak alan yalnız örtüdeydi)
const CK = { ceket: "#6a5248", golge: "#40323a", isik: "#a07460" };
// ---------------- Eliasberg geometrisi (kaydırma öncesi kare px) ----------------
const YUZ = { x: 698, y: 606, H: 235 };
const JL: P2 = [588, 850], JR: P2 = [828, 822]; // omuz eklemleri: gövde silüetinin İÇİNDE (K3: sol ≥ 560, sağ ≤ 850); uzak (sağ) omuz 30 px yüksek
const EL_L: P2 = [516, 1030], BL: P2 = [574, 1196]; // sol kol: dirsek dışa, el örtüde
const EL_R: P2 = [950, 930], BR: P2 = [914, 1008]; // sağ kol: dirsek dize yaslı, önkol kameraya kısalır
const DIZ: P2 = [946, 1096], KALCA: P2 = [790, 1236];
const govdeP: P2[] = [[648, 744], [608, 768], [574, 810], [552, 868], [556, 962], [584, 1050], [614, 1098], [612, 1180], [604, 1300], [990, 1300], [968, 1200], [912, 1112], [900, 1060], [882, 962], [872, 876], [864, 808], [826, 772], [764, 742], [706, 752]];
// terzi kesimi: düz kenar + kısa kavis (Catmull-Rom yastık gibi şişiriyordu)
const GOVDE = "M648,744 Q610,756 580,800 L556,870 Q554,980 588,1060 L612,1100 Q606,1180 600,1300 L992,1300 Q976,1200 918,1110 L898,1060 Q884,960 874,882 L862,812 Q832,772 766,742 Q706,756 648,744Z";
const KOL_L = konikKol(JL, EL_L, BL, [120, 104, 82]), KOL_R = konikKol(JR, EL_R, BR, [112, 100, 84]);
const SIL = [GOVDE, KOL_L.d, KOL_R.d, daire(JL, 58), daire(JR, 54)];
const golgeKaynak = (q: P2[]) => { const uz = q.map((p) => [S[0] + (p[0] - S[0]) * 2.4, S[1] + (p[1] - S[1]) * 2.4] as P2); return zarf([...q, ...uz]) as P2[]; };

// ---------------- arka plan ----------------
const kirikCokgen = (cx: number, cy: number, rx: number, ry: number, sd: number): P2[] => Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2, k = 0.62 + rnd(sd, `r${i}`) * 0.48 - (i % 3 === 0 ? 0.18 : 0);
  return [cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k] as P2;
});
const yaySerit = (x0: number, y0: number, cx: number, cy: number, x1: number, y1: number, h: number): P2[] => {
  const q = (t: number): P2 => [(1 - t) ** 2 * x0 + 2 * (1 - t) * t * cx + t * t * x1, (1 - t) ** 2 * y0 + 2 * (1 - t) * t * cy + t * t * y1];
  const ust = Array.from({ length: 13 }, (_, i) => q(i / 12));
  return [...ust, ...ust.slice().reverse().map((p) => [p[0], p[1] + h] as P2)];
};
const Arka: React.FC = () => {
  const tugla = (cx: number, cy: number, rx: number, ry: number, sd: number) => {
    const q = kirikCokgen(cx, cy, rx, ry, sd), d = yolD(q);
    return <g><path d={d} fill={LM.tugla} /><Kirp d={d}>{Array.from({ length: Math.ceil((2 * ry) / 26) + 2 }, (_, i) => { const y = cy - ry - 4 + i * 26; return <g key={i}>
      <line x1={cx - rx - 20} x2={cx + rx + 20} y1={y} y2={y} stroke={LM.tuglaDerz} strokeWidth={2.6} />
      {Array.from({ length: Math.ceil((2 * rx) / 62) + 2 }, (_, k) => { const x = cx - rx - 20 + k * 62 + (i % 2) * 31 + (rnd(sd, `${i}${k}`) - 0.5) * 6; return <line key={k} x1={x} x2={x} y1={y} y2={y + 26} stroke={LM.tuglaDerz} strokeWidth={2.2} />; })}</g>; })}
      {/* sıvanın kırık kenarının gölgesi (üst-sol kenar; ışık soldan-yukarıdan) */}
      <path d={d} fill="none" stroke="#221f3a" strokeWidth={7} transform="translate(3 4)" opacity={0.6} /></Kirp>
      {/* sıva kalınlığı: kırık kenarda açık ince kenar */}
      <path d={d} fill="none" stroke="#5c5c86" strokeWidth={3} /></g>;
  };
  return <g strokeLinejoin="round">
    <rect x={-20} y={-20} width={1120} height={2200} fill={LM.tavan} />
    {[[-60, 470, 330, -150, 1140, 300], [120, 330, 520, -40, 1140, 250], [330, 300, 700, 90, 1140, 330]].map(([x0, y0, cx, cy, x1, y1], i) => <g key={i}>
      {/* tonoz örgüsü: her kaburganın altında yay boyunca gölge bandı + tarama (A9) */}
      <Tarama sekil={yaySerit(x0, y0 + 10, cx, cy + 10, x1, y1 + 10, 56 - i * 8)} basamak="III" aci={72} renk={LM.tarama} aralik={8} kalinlik={2} seed={455 + i} />
      <path d={`M${x0},${y0} Q${cx},${cy} ${x1},${y1}`} stroke={LM.kaburga} strokeWidth={14 - i * 3} fill="none" />
      <path d={`M${x0},${y0 - 9 + i * 2} Q${cx},${cy - 8} ${x1},${y1 - 8}`} stroke="#3e4068" strokeWidth={2.6} fill="none" />
    </g>)}
    <path d="M330,345 Q720,300 1100,330 L1100,1075 L330,1075Z" fill={LM.duvar} />
    {/* duvar sıvası: seed'li lekeler (düz dolgu kalmasın) */}
    {Array.from({ length: 14 }, (_, i) => <path key={i} d={yolD(kirikCokgen(360 + rnd(461, `x${i}`) * 720, 400 + rnd(461, `y${i}`) * 480, 40 + rnd(461, `w${i}`) * 70, 18 + rnd(461, `h${i}`) * 30, 470 + i))} fill={i % 2 ? "#363a62" : "#43466e"} opacity={0.55} />)}
    <rect x={330} y={890} width={790} height={190} fill={LM.duvarAlt} />
    <Tarama sekil={[[330, 890], [1100, 890], [1100, 1078], [330, 1078]]} basamak="II" aci={72} renk={LM.tarama} aralik={9} kalinlik={1.8} seed={462} />
    <line x1={330} y1={890} x2={1100} y2={890} stroke="#4c5078" strokeWidth={2.6} />
    {tugla(925, 770, 120, 135, 11)}{tugla(530, 470, 70, 60, 12)}
    {[[880, 400, 930, 520, 905, 600], [560, 600, 590, 700, 570, 790]].map(([a, b, c, d, e, f], i) => <path key={i} d={`M${a},${b} L${c},${d} L${e},${f}`} stroke="#25254a" strokeWidth={2.4} fill="none" />)}
    <path d="M-20,-20 L330,345 L330,1075 L-20,1190Z" fill="#2e3056" />
    <Tarama sekil={[[-20, 380], [330, 520], [330, 1075], [-20, 1190]]} basamak="II" aci={72} renk="#1c1c3a" aralik={9} kalinlik={1.8} seed={463} />
    <path d="M-20,1190 L330,1075 L1100,1075 L1100,2120 L-20,2120Z" fill={LM.zemin} />
    {/* zemin taş derzleri (perspektif, sedye önünde koyu) */}
    {[1150, 1240, 1360, 1520, 1720, 1960].map((y, i) => <line key={i} x1={-20} x2={1100} y1={y} y2={y - 20} stroke="#22223c" strokeWidth={2 + i * 0.4} opacity={0.7} />)}
  </g>;
};

const Kapi: React.FC = () => <g strokeLinejoin="round">
  <rect x={KAPI.x0} y={KAPI.y0} width={KAPI.x1 - KAPI.x0} height={KAPI.y1 - KAPI.y0} fill={LM.acik[2]} />
  <rect x={KAPI.x0 + 18} y={KAPI.y0 + 30} width={KAPI.x1 - KAPI.x0 - 30} height={KAPI.y1 - KAPI.y0 - 60} fill={LM.acik[1]} />
  <rect x={KAPI.x0 + 40} y={KAPI.y0 + 80} width={KAPI.x1 - KAPI.x0 - 70} height={KAPI.y1 - KAPI.y0 - 200} fill={LM.acik[0]} />
  <path d={`M${KAPI.x0 - 18},${KAPI.y0 - 26} L${KAPI.x1 + 16},${KAPI.y0 - 16} L${KAPI.x1 + 16},${KAPI.y1 + 6} L${KAPI.x1},${KAPI.y1} L${KAPI.x1},${KAPI.y0} L${KAPI.x0},${KAPI.y0 - 8} L${KAPI.x0},${KAPI.y1 + 20} L${KAPI.x0 - 18},${KAPI.y1 + 24}Z`} fill={LM.kasa} stroke="#1a1630" strokeWidth={2.4} />
  <path d="M40,118 L214,214 L214,1040 L40,1110Z" fill={LM.kapiKanat} stroke="#1a1630" strokeWidth={3} />
  {[[62, 170, 196, 250, 196, 560, 62, 540], [62, 620, 196, 640, 196, 990, 62, 1040]].map((q, i) => <g key={i}>
    <path d={`M${q[0]},${q[1]} L${q[2]},${q[3]} L${q[4]},${q[5]} L${q[6]},${q[7]}Z`} fill={LM.kapiPano} stroke="#1a1630" strokeWidth={2} />
    <Tarama sekil={[[q[0], q[1]], [q[2], q[3]], [q[2], q[3] + 40], [q[0], q[1] + 40]]} basamak="III" aci={72} renk="#161228" aralik={7.5} kalinlik={1.8} seed={460 + i} />
  </g>)}
  <Tarama sekil={[[40, 118], [214, 214], [214, 1040], [40, 1110]]} basamak="II" aci={72} renk="#161228" aralik={9} kalinlik={1.6} seed={464} />
  <rect x={150} y={600} width={14} height={86} rx={6} fill="#5a4a50" stroke="#1a1630" strokeWidth={2} />
  <line x1={214} y1={214} x2={214} y2={1040} stroke={LM.isik[1]} strokeWidth={3} />
</g>;

/** yan bölmedeki örtülü biçimler: altında beden (baş tümseği, göğüs, ayak uçları); gölgede, ayrıntı az (arka katman) */
const Ortulu: React.FC<{ x0: number; y0: number; w: number; h: number; i: number; ters?: boolean }> = ({ x0, y0, w, h, i, ters }) => {
  const X = (t: number) => (ters ? x0 + w * (1 - t) : x0 + w * t);
  const ust: P2[] = [[X(0), y0 + h * 0.8], [X(0.05), y0 + h * 0.42], [X(0.12), y0 + h * 0.18], [X(0.2), y0 + h * 0.2], [X(0.27), y0 + h * 0.4], [X(0.36), y0 + h * 0.3], [X(0.5), y0 + h * 0.26], [X(0.64), y0 + h * 0.36], [X(0.8), y0 + h * 0.38], [X(0.9), y0 + h * 0.26], [X(0.97), y0 + h * 0.34], [X(1), y0 + h * 0.6]];
  const d = cr([...ust, [X(1) + (ters ? -6 : 6), y0 + h], [X(0) + (ters ? 6 : -6), y0 + h]]);
  return <g>
    <rect x={x0 - 12} y={y0 + h - 4} width={w + 24} height={22} fill="#2a2440" stroke="#1a1630" strokeWidth={2} />
    <path d={d} fill="#3a3462" stroke="#1a1832" strokeWidth={2.4} />
    <Kirp d={d}>
      {[[0.13, 0.25], [0.5, 0.3], [0.9, 0.2]].map(([t, k], j) => <path key={j} d={serit([[X(t), y0 + h * k], [X(t + 0.05), y0 + h * 0.65], [X(t + 0.02), y0 + h]], 18 + j * 4)} fill="#26213f" opacity={0.9} />)}
      <Tarama sekil={[[x0, y0 + h * 0.55], [x0 + w, y0 + h * 0.55], [x0 + w, y0 + h], [x0, y0 + h]]} basamak="II" aci={72} renk={LM.tarama} aralik={9} kalinlik={1.6} seed={421 + i} />
    </Kirp>
    <path d={cr(ust, false)} stroke={LM.ortuKenar} strokeWidth={1.8} fill="none" opacity={0.45} />
  </g>;
};

// ---------------- Eliasberg ----------------
const kivrimlar: { q: P2[]; w: number; golgede: boolean }[] = [
  { q: [[550, 1006], [566, 958], [572, 912]], w: 15, golgede: false }, // sol dirsek iç → koltuk altı
  { q: [[540, 1042], [562, 1004], [584, 988]], w: 11, golgede: false },
  { q: [[924, 918], [898, 884], [884, 850]], w: 14, golgede: true }, // sağ dirsek iç
  { q: [[938, 948], [910, 930], [890, 926]], w: 10, golgede: true },
  { q: [[704, 1074], [662, 1060], [620, 1066]], w: 16, golgede: false }, // belde çekme
  { q: [[708, 1128], [668, 1118], [630, 1130]], w: 13, golgede: false },
  { q: [[638, 878], [628, 936], [640, 992]], w: 12, golgede: false }, // göğüs sarkması
  { q: [[796, 900], [812, 960], [806, 1030]], w: 12, golgede: true },
];
const Eliasberg: React.FC = () => {
  const uyluk = kapsul(KALCA, DIZ, 74, 60);
  const etek = "M842,1150 Q892,1176 914,1240 L920,1300 L828,1300 Q834,1210 842,1150Z";
  const golgeYari = cr([[764, 738], [792, 790], [818, 852], [846, 908], [836, 982], [808, 1062], [826, 1160], [858, 1310], [1120, 1310], [1120, 700]]);
  const yakaL = "M652,746 L614,764 Q600,790 604,810 L628,817 L644,806Z", klapaL = "M640,818 L602,834 Q612,922 700,1012 Q674,930 656,846Z";
  const yakaR = "M760,742 L796,756 Q812,782 810,804 L786,811 L770,800Z", klapaR = "M772,814 L812,828 Q804,918 712,1014 Q742,930 758,842Z";
  const boyun = cr([[660, 640], [742, 640], [752, 726], [702, 744], [654, 726]]);
  // atkı: (a) boynu saran iki kat, (b) önde iki uç (biri ötekinin üstünde), (c) kaburga örgü
  const sarmaArka = cr([[622, 724], [652, 706], [684, 712], [705, 700], [736, 708], [768, 702], [792, 716], [802, 744], [760, 752], [705, 744], [650, 750], [616, 744]]);
  const sarmaOn = cr([[612, 744], [662, 736], [722, 746], [786, 734], [806, 760], [790, 794], [738, 802], [688, 796], [638, 790], [610, 770]]);
  // uç şekilleri (60 → 45 px daralır, 7 püskül çentiği)
  const ucYol = (ust: [number, number], alt: [number, number], y0: number, y1: number, sd: number) => {
    const sol: P2[] = [[ust[0], y0], [(ust[0] + alt[0]) / 2 - 2, (y0 + y1) / 2], [alt[0], y1]], sag: P2[] = [[alt[1], y1], [(ust[1] + alt[1]) / 2 + 2, (y0 + y1) / 2], [ust[1], y0]];
    const pus: P2[] = []; for (let i = 0; i <= 14; i++) pus.push([alt[0] + ((alt[1] - alt[0]) * i) / 14, y1 + (i % 2 ? 12 + rnd(sd, `p${i}`) * 7 : 0)]);
    return `M${pS(sol).split(" ").join(" L")} L${pS(pus).split(" ").join(" L")} L${pS(sag).split(" ").join(" L")}Z`;
  };
  const uc2 = ucYol([700, 754], [712, 758], 770, 952, 482), uc1 = ucYol([650, 710], [646, 692], 768, 1004, 481);
  const kaburga = (ust: [number, number], alt: [number, number], y0: number, y1: number) => [0.18, 0.38, 0.6, 0.8].map((f, i) => <line key={i} x1={ust[0] + (ust[1] - ust[0]) * f} y1={y0 + 6} x2={alt[0] + (alt[1] - alt[0]) * f} y2={y1 - 2} stroke="#46383e" strokeWidth={2} opacity={0.55} />);
  return <g strokeLinejoin="round">
    {/* (1) gövde + iki kol + omuz başlıkları: tek siluet (önce kontur, sonra dolgu) */}
    <Birlesik d={SIL} dolgu={CK.ceket} kontur="#1a1426" k={1.6} />
    <KirpB d={SIL}>
      {/* gölge yarısı: hacmi izleyen sınır + gravür taraması (bıçak çizgisi yok) */}
      <path d={golgeYari} fill={CK.golge} />
      <path d={KOL_R.d} fill={CK.golge} />
      <Kirp d={golgeYari}><Tarama sekil={[[740, 700], [1120, 700], [1120, 1310], [740, 1310]]} basamak="III" aci={72} renk="#18121f" aralik={6.5} kalinlik={1.9} seed={471} /></Kirp>
      <Tarama sekil={KOL_R.d} basamak="III" aci={72} renk="#18121f" aralik={6.5} kalinlik={1.9} seed={472} />
      {/* sol kolun iç (gövdeye bakan) yanı: bir basamak koyu */}
      <path d={serit([[600, 880], [580, 960], [560, 1030], [570, 1150]], 34)} fill={CK.golge} opacity={0.8} />
      {/* kıvrımlar: koyu oluk + ışık tarafında açık sırt (6–9) */}
      {kivrimlar.map((k, i) => <Kivrim key={i} q={k.q} w={k.w} oluk={k.golgede ? "#1e1828" : "#2a2234"} sirt={k.golgede ? "#463a4e" : CK.isik} kay={[-3, -2.5]} />)}
      {/* kavisli kol dikişleri (omuz başlığı sınırı) */}
      <path d={`M${JL[0] + 24},${JL[1] - 56} Q${JL[0] + 52},${JL[1] - 4} ${JL[0] + 34},${JL[1] + 52}`} stroke="#1a1426" strokeWidth={2.4} fill="none" opacity={0.85} />
      <path d={`M${JR[0] - 22},${JR[1] - 52} Q${JR[0] - 48},${JR[1] - 2} ${JR[0] - 30},${JR[1] + 50}`} stroke="#120e1a" strokeWidth={2.4} fill="none" opacity={0.85} />
      {/* koltuk altı kırışıkları */}
      <path d={serit([[566, 884], [592, 896], [612, 894]], 9)} fill="#1e1828" />
      <path d={serit([[868, 870], [846, 884], [828, 884]], 9)} fill="#120e1a" />
    </KirpB>
    {/* sağ kolun gövde üstündeki iç sınırı (kol gövdenin yanında, biraz önde) */}
    <path d={`M${JR[0] + 6},${JR[1] + 58} Q${JR[0] + 30},${JR[1] + 110} ${EL_R[0] - 44},${EL_R[1] + 20}`} stroke="#0e0a14" strokeWidth={2.6} fill="none" />
    {/* V: kazak, atkı uçları (yakanın içinde), sonra klapalar */}
    <path d="M650,752 L762,748 L708,1016Z" fill="#3a3040" />
    <path d={uc2} fill={LM.atki} stroke="#2a1e24" strokeWidth={2.4} />
    <Kirp d={uc2}>{kaburga([700, 754], [712, 758], 770, 952)}<path d="M736,770 L760,770 L762,960 L740,960Z" fill="#3e3238" opacity={0.6} /></Kirp>
    <path d={uc1} fill={LM.atki} stroke="#2a1e24" strokeWidth={2.4} />
    <Kirp d={uc1}>{kaburga([650, 710], [646, 692], 768, 1004)}</Kirp>
    <Kirp d={YD}><Hilal d={uc1} renk={LM.atkiIsik} dx={9} dy={4} /></Kirp>
    {/* çentikli yaka: yaka (üst) + klapa (alt), köşede ~30° çentik; klapa düğme hattına iner */}
    <path d={klapaL} fill="#5a4a5a" stroke="#1a1426" strokeWidth={2.4} />
    <path d={yakaL} fill="#5e4e5e" stroke="#1a1426" strokeWidth={2.4} />
    <path d={klapaR} fill={CK.golge} stroke="#120e1a" strokeWidth={2.4} />
    <path d={yakaR} fill={CK.golge} stroke="#120e1a" strokeWidth={2.4} />
    <path d={serit([[608, 856], [640, 930], [692, 1004]], 6)} fill="#2a2234" />
    {/* düğme hattı + 4 düğme */}
    <path d="M706,1016 Q712,1140 724,1300" stroke="#1a1426" strokeWidth={2.4} fill="none" />
    {[1046, 1104, 1162, 1222].map((y, i) => <g key={y}><circle cx={706 + i * 4} cy={y} r={7.5} fill="#2a2030" stroke="#1a1426" strokeWidth={2} /><circle cx={704 + i * 4} cy={y - 2} r={2.2} fill="#6a5a62" /></g>)}
    {/* ışığa bakan kenarlar: sıcak hilal (yalnız yelpaze içinde, yalnız dış silüette) */}
    <Kirp d={YD}>
      <HilalB d={SIL} renk={CK.isik} dx={13} dy={8} />
      <HilalB d={SIL} renk={LM.isik[2]} dx={4} dy={3} />
      <Hilal d={klapaL} renk={CK.isik} dx={7} dy={5} />
      <Hilal d={yakaL} renk={LM.isik[2]} dx={5} dy={4} />
    </Kirp>
    {/* (2) kalkık diz: gövdenin ÖNÜNDE; üstü ışık kenarı; palto eteği dizin üstüne biner */}
    <path d={kapsul(DIZ, [968, 1300], 56, 48)} fill="#2c283c" stroke="#16131f" strokeWidth={3} />
    <path d={uyluk} fill="#3a354e" stroke="#16131f" strokeWidth={3} />
    <Kirp d={uyluk}><path d={serit([[800, 1260], [880, 1190], [960, 1150]], 40)} fill="#2a2640" /><Tarama sekil={[[780, 1160], [1010, 1120], [1010, 1300], [780, 1300]]} basamak="II" aci={72} renk="#16131f" aralik={7} kalinlik={1.8} seed={474} /></Kirp>
    <Hilal d={uyluk} renk="#6c5a68" dx={2} dy={8} />
    <path d={etek} fill={CK.golge} />
    <Kirp d={etek}><Tarama sekil={[[800, 1050], [1000, 1050], [1000, 1310], [800, 1310]]} basamak="III" aci={72} renk="#18121f" aralik={6.5} kalinlik={1.9} seed={475} />
      <Kivrim q={[[856, 1170], [884, 1220], [896, 1280]]} w={12} oluk="#120e1a" sirt="#463a4e" /></Kirp>
    {/* sağ önkol (dizin önünde) + dizdeki el (kendi gövde gölgesinde: EL_E) + 8 px temas gölgesi */}
    <path d={kapsul(EL_R, BR, 48, 42)} fill={CK.golge} stroke="#120e1a" strokeWidth={2.6} />
    <path d={serit([[EL_R[0] - 30, EL_R[1] + 8], [BR[0] - 22, BR[1] - 8]], 10)} fill="#120e1a" />
    <path d={cr([[BR[0] - 34, BR[1] - 14], [BR[0] + 34, BR[1] - 6], [BR[0] + 30, BR[1] + 16], [BR[0] - 36, BR[1] + 8]])} fill="#2a2234" stroke="#120e1a" strokeWidth={2.2} />
    <path d={cr([[924, 1066], [996, 1080], [1000, 1150], [940, 1152]])} fill="#120e1a" opacity={0.55} transform="translate(-4 8)" />
    <IncEl bilek={[BR[0] + 2, BR[1] + 4]} aci={70} E={142} poz={INC_POZ.dayali} ayna ten="#a88478" golge="#7a5a62" kontur="#2e2028" isik={[-0.8, -0.6]} />
    {/* boyun (kulak arkasından çene altına), atkı sarması (iki kat; ışık yalnız solda) */}
    <path d={boyun} fill="#94706a" />
    <path d={sarmaArka} fill="#4c3e46" stroke="#2a1e24" strokeWidth={2.4} />
    <path d={sarmaOn} fill={LM.atki} stroke="#2a1e24" strokeWidth={2.4} />
    <Kirp d={sarmaOn}>
      {[[618, 760, 800, 752], [616, 776, 798, 772], [622, 790, 790, 788]].map(([a, b, c, d], i) => <path key={i} d={`M${a},${b} Q${(a + c) / 2},${b + 10} ${c},${d}`} stroke="#46383e" strokeWidth={2.2} fill="none" />)}
      {[[628, 760, 700, 790, 780, 770], [650, 744, 720, 760, 792, 748]].map(([a, b, c, d, e, f], i) => <path key={`t${i}`} d={serit([[a, b], [c, d], [e, f]], 12)} fill="#3a2e34" opacity={0.55} />)}
    </Kirp>
    <Kirp d={YD}><Hilal d={sarmaOn} renk={LM.atkiIsik} dx={12} dy={6} /><Hilal d={sarmaArka} renk={LM.atkiIsik} dx={8} dy={4} alfa={0.7} /></Kirp>
    {/* yüz: ¾; aynalı (ışık soldan → kenar ışığı ekran solunda); bakış sol-aşağı (ele) */}
    <g transform={`translate(${2 * YUZ.x} 0) scale(-1 1)`}>
      <LgYuz3 x={YUZ.x} y={YUZ.y} H={YUZ.H} rol={7} ifade={{ kasIc: 1, goz: 0.72, agiz: 0.5, bakis: [0.75, 1] }} P={ISIKTA} />
    </g>
  </g>;
};
/** Eliasberg'in sol önkolu + eli: örtünün ÖNÜNDE (örtüye uzanır, el örtüde; temas gölgesi) */
const ElOrtude: React.FC = () => {
  const aci = 80, E = 142;
  return <g>
    <Kirp d="M300,1120 L800,1120 L800,1500 L300,1500Z">
      <path d={kapsul(EL_L, BL, 50, 41)} fill={CK.ceket} stroke="#1a1426" strokeWidth={3.2} />
      <path d={serit([[EL_L[0] + 40, EL_L[1] + 30], [BL[0] + 30, BL[1] - 10]], 20)} fill={CK.golge} />
      <Kirp d={YD}><Hilal d={kapsul(EL_L, BL, 50, 41)} renk={CK.isik} dx={12} dy={4} /></Kirp>
    </Kirp>
    <path d={cr([[BL[0] - 42, BL[1] - 6], [BL[0] + 36, BL[1] - 18], [BL[0] + 42, BL[1] + 6], [BL[0] - 38, BL[1] + 18]])} fill="#2a2234" stroke="#1a1426" strokeWidth={2.2} />
    {/* temas gölgesi örtüde (ışık sol-üstten → sağ-alta) */}
    <IncEl bilek={[BL[0] + 3, BL[1] + 10]} aci={aci} E={E} poz={INC_POZ.dayali} ten="" golge="" kontur="" isik={[-0.85, -0.5]} golgeRenk="#2a2450" golgeKay={[10, 8]} />
    <IncEl bilek={[BL[0] + 3, BL[1] + 10]} aci={aci} E={E} poz={INC_POZ.dayali} ten={EL_E.isik} golge={EL_E.golge} kontur="#2e2028" isik={[-0.85, -0.5]} />
    <Kirp d={YD}><IncEl bilek={[BL[0] + 3, BL[1] + 10]} aci={aci} E={E} poz={INC_POZ.dayali} ten={EL_ISIK.isik} golge={EL_ISIK.golge} kontur="#4a3236" kenar={EL_ISIK.kenar} isik={[-0.85, -0.5]} /></Kirp>
  </g>;
};

// ---------------- sedye ----------------
const F = (x: number) => 1398 + 0.04 * (x - 60); // tahta ön üst kenarı
const ZEMIN_ON = 1800; // sedye önünde zemin teması (kaydırma öncesi)
const ORTU_ARKA: P2[] = [[52, 1372], [80, 1300], [120, 1262], [165, 1238], [215, 1230], [262, 1246], [300, 1270], [340, 1268], [400, 1246], [470, 1232], [540, 1228], [610, 1236], [680, 1250], [740, 1246], [800, 1252], [860, 1262], [910, 1250], [940, 1226], [962, 1218], [982, 1238], [1002, 1220], [1022, 1212], [1046, 1232], [1080, 1250], [1112, 1258]];
const ORTU_ON: P2[] = [[1112, 1436], [1000, 1430], [900, 1424], [800, 1420], [700, 1416], [660, 1405], [630, 1380], [600, 1356], [540, 1348], [480, 1342], [420, 1338], [340, 1334], [260, 1332], [180, 1336], [110, 1347], [60, 1372]];
const ETEK: P2[] = [[640, 1392], [668, 1428], [700, 1456], [730, 1466], [752, 1486], [780, 1474], [830, 1480], [870, 1490], [886, 1508], [904, 1490], [960, 1500], [1000, 1496], [1020, 1512], [1044, 1498], [1112, 1506]];
const BILEK_O: P2 = [520, 1418], ACI_O = 96, E_O = 205;
const OLU_POZ: IncElPoz = INC_POZ.sarkik;
const ust = cr([...ORTU_ARKA, ...ORTU_ON]);
const OR = { taban: "#7f7898", koyu: "#5e5878", derin: "#45405e", yamac: "#c0a492", sirt: "#ecd2bc", sirtG: "#9890ae" };

const TUMSEK: [number, number, number][] = [[205, 1240, 2], [470, 1236, 3], [745, 1250, 2], [958, 1222, 2], [1020, 1216, 2]];
const KIVRIM_ORTU = TUMSEK.flatMap(([cx, cy, n], t) => Array.from({ length: n }, (_, j) => {
  const ang = (96 + (j - (n - 1) / 2) * 40 + (rnd(493, `a${t}${j}`) - 0.5) * 16) * (Math.PI / 180), L = 90 + rnd(493, `l${t}${j}`) * 90;
  const a: P2 = [cx + Math.cos(ang) * 14, cy + 8 + Math.sin(ang) * 10], c: P2 = [cx + Math.cos(ang) * L, Math.min(cx > 640 ? 1415 : 1338, cy + Math.sin(ang) * L)];
  const m: P2 = [(a[0] + c[0]) / 2 + (j % 2 ? 9 : -9), (a[1] + c[1]) / 2];
  return { q: [a, m, c] as P2[], w: 14 + rnd(493, `w${t}${j}`) * 10 };
}));
const sark = cr([...ORTU_ON.slice(0, 7).reverse(), ...ETEK.slice().reverse()].reverse());

const Sedye: React.FC<{ kilit?: SablonProps["kilit"] }> = ({ kilit }) => {
  if (kilit) { kilit.push({ ad: "el", p: [BILEK_O[0] + 6, BILEK_O[1] + 120 - KAY], tur: "dokunus" }); kilit.push({ ad: "yuz", p: [YUZ.x, YUZ.y - KAY], tur: "yuz" }); }
  const tahtaUst = yolD([[36, 1326], [1112, 1326], [1112, F(1112)], [36, F(36)]]);
  const tahtaOn = yolD([[36, F(36)], [1112, F(1112)], [1112, F(1112) + 38], [36, F(36) + 38]]);
  const kolO = kapsul([476, 1318], [BILEK_O[0] - 2, BILEK_O[1] - 6], 32, 28);
  return <g strokeLinejoin="round">
    {/* sedye altı ve önü: ışık yok; altta derin gölge, ayak temas gölgeleri */}
    <path d={yolD([[30, F(30) + 30], [1112, F(1112) + 30], [1112, ZEMIN_ON + 40], [30, ZEMIN_ON + 10]])} fill="#1f1e36" opacity={0.85} />
    <ellipse cx={540} cy={ZEMIN_ON + 26} rx={600} ry={42} fill="#171628" opacity={0.8} />
    {[[78, 0], [872, 1]].map(([x, i]) => <g key={i}>
      <ellipse cx={x + 17} cy={ZEMIN_ON + 2} rx={40} ry={9} fill="#121122" />
      <rect x={x} y={F(x) + 36} width={34} height={ZEMIN_ON - F(x) - 36} fill={LM.tahta} stroke="#1a1426" strokeWidth={2.4} />
      <rect x={x + 22} y={F(x) + 40} width={10} height={ZEMIN_ON - F(x) - 44} fill="#2a2034" />
    </g>)}
    {/* tahta: üst yüz şeridi (örtünün önünde), ön yüz (kameraya bakar: koyu), sol uç */}
    <path d={tahtaUst} fill="#5a4652" stroke="#1a1426" strokeWidth={2.4} />
    <Kirp d={YD}><path d={tahtaUst} fill={LM.tahtaIsik} /></Kirp>
    {[0, 1, 2].map((i) => <line key={i} x1={40} x2={1110} y1={1350 + i * 18} y2={1352 + i * 18 + 6} stroke="#3e3040" strokeWidth={1.8} opacity={0.6} />)}
    <path d={tahtaOn} fill={LM.tahta} stroke="#1a1426" strokeWidth={2.4} />
    <Tarama sekil={tahtaOn} basamak="II" aci={72} renk="#1a1426" aralik={7.5} kalinlik={1.8} seed={486} />
    <Kirp d={YD}><line x1={36} y1={F(36)} x2={1112} y2={F(1112)} stroke="#c4927a" strokeWidth={3} /></Kirp>
    <path d={yolD([[26, F(26) - 70], [36, F(36) - 72], [36, F(36) + 38], [26, F(26) + 40]])} fill="#2e2436" stroke="#1a1426" strokeWidth={2} />
    {/* elin tahta ön yüzüne düşen gölgesi (ışık soldan → sağa) */}
    <Kirp d={tahtaOn}><IncEl bilek={BILEK_O} aci={ACI_O} E={E_O} poz={OLU_POZ} ten="" golge="" kontur="" isik={[-0.85, -0.5]} golgeRenk="#1a1426" golgeKay={[26, 4]} /></Kirp>
    {/* ölü önkol: örtünün altından tahtaya çıkar (görünen ≈ 85 px), kenarda bilek kırılır */}
    <path d={kolO} fill={EL_OLU.golge} stroke="#3e2c34" strokeWidth={2.5} />
    <path d={serit([[466, 1326], [490, 1370], [508, 1404]], 22)} fill={EL_OLU.isik} />
    <Kirp d={YD}><path d={serit([[464, 1326], [488, 1372], [506, 1406]], 26)} fill={EL_OLU_ISIK.isik} /></Kirp>
    <path d={serit([[480, 1400], [520, 1410]], 9)} fill="#2a1e26" opacity={0.7} />
    {/* örtü üst yüzü: çoğu gölgede (ortu[0]); yelpazede yalnız ışığa dönük yamaçlar ve sırtlar */}
    <path d={ust} fill={OR.taban} stroke="#1f1c38" strokeWidth={2.6} />
    <Kirp d={ust}>
      {/* öne (tahtaya) inen yüz: bir basamak koyu */}
      <path d={serit(ORTU_ON.map((p) => [p[0], p[1] - 20] as P2), 42)} fill={OR.koyu} opacity={0.7} />
      <Kirp d={YD}>
        {/* yalnız tümseklerin ışığa dönük yamaçları + uzak kenar sırtı (≤ 20 px); üst yüzün çoğu gölgede */}
        {TUMSEK.map(([cx, cy], i) => <path key={i} d={cr([[cx - 110, cy + 40], [cx - 50, cy + 8], [cx + 8, cy - 2], [cx + 30, cy + 40], [cx - 10, cy + 84], [cx - 100, cy + 90]])} fill={OR.yamac} opacity={0.85} />)}
        <path d={serit(ORTU_ARKA.slice(1, -1).map((p) => [p[0] + 2, p[1] + 10] as P2), 22)} fill={OR.sirt} />
      </Kirp>
      {/* gerilim kıvrımları: tümseklerden ışınsal, iki ucu sivri yumuşak oluk + ışık yanında açık sırt */}
      {KIVRIM_ORTU.map((q, i) => <g key={i}>
        <path d={serit(q.q.map((p) => [p[0] - 6, p[1] - 3] as P2), q.w * 0.4)} fill={OR.sirtG} opacity={0.5} />
        <Kirp d={YD}><path d={serit(q.q.map((p) => [p[0] - 6, p[1] - 3] as P2), q.w * 0.4)} fill={OR.sirt} opacity={0.55} /></Kirp>
        <path d={serit(q.q, q.w)} fill={OR.derin} opacity={0.42} />
      </g>)}
      <Tarama sekil={[[52, 1300], [340, 1290], [300, 1340], [52, 1372]]} basamak="II" aci={72} renk={LM.tarama} aralik={7.5} kalinlik={1.8} seed={490} />
      <Tarama sekil={[[560, 1300], [1112, 1300], [1112, 1440], [600, 1350]]} basamak="II" aci={72} renk={LM.tarama} aralik={7.5} kalinlik={1.8} seed={491} />
    </Kirp>
    {/* sol yarıda örtünün tahtadaki kıvrık kenarı (önkolun üstünü örter) + tahtaya temas gölgesi */}
    <path d={serit(ORTU_ON.slice(6).map((p) => [p[0], p[1] + 7] as P2), 12)} fill="#1c1a30" opacity={0.6} />
    <path d={cr(ORTU_ON.slice(6), false)} stroke={LM.ortu[2]} strokeWidth={7} fill="none" />
    <Kirp d={YD}><path d={cr(ORTU_ON.slice(6).map((p) => [p[0] - 2, p[1] - 5] as P2), false)} stroke={LM.ortuIsik[1]} strokeWidth={2.4} fill="none" /></Kirp>
    {/* sağ yarıda kısa sarkma (kameraya bakar: ışıksız) + asılı kıvrımlar (V kırıklı etek) */}
    <path d={sark} fill={OR.koyu} stroke="#1f1c38" strokeWidth={2.6} />
    <Kirp d={sark}>
      {[[752, 1486, 18], [818, 1480, 14], [886, 1508, 24], [960, 1500, 16], [1020, 1512, 22]].map(([x, y, w], i) => <g key={i}>
        <path d={serit([[x + 4, F(x) - 2], [x + 8 + (i % 2) * 6, (F(x) + y) / 2], [x, y]], w)} fill={LM.ortu[2]} opacity={0.85} />
        <path d={serit([[x - w * 0.7, F(x)], [x - w * 0.6, (F(x) + y) / 2], [x - w * 0.8, y - 10]], 5)} fill="#7a6c9a" opacity={0.4} />
      </g>)}
      <Tarama sekil={[[640, 1380], [1112, 1420], [1112, 1540], [640, 1540]]} basamak="II" aci={72} renk={LM.tarama} aralik={7.5} kalinlik={1.8} seed={492} />
    </Kirp>
    <path d={cr(ORTU_ON.slice(0, 7), false)} stroke={LM.ortu[2]} strokeWidth={5} fill="none" />
    {/* sarkan ölü el: önce gölgeli taban, yelpazede ışık (sola bakan yüzler); tırnak/iç çizgi yok (taramasız), boğumda tek ton */}
    <IncEl bilek={BILEK_O} aci={ACI_O} E={E_O} poz={OLU_POZ} ten={EL_OLU.isik} golge={EL_OLU.golge} kontur="#3a2a32" isik={[-0.85, -0.5]} />
    <Kirp d={YD}><IncEl bilek={BILEK_O} aci={ACI_O} E={E_O} poz={OLU_POZ} ten={EL_OLU_ISIK.isik} golge={EL_OLU_ISIK.golge} kontur="#4a3438" kenar={EL_OLU_ISIK.kenar} isik={[-0.85, -0.5]} /></Kirp>
    {/* elin altında, sedye gölgesinin içinde koyu temas lekesi (zemin ışık almaz) */}
    <ellipse cx={BILEK_O[0] + 14} cy={ZEMIN_ON - 4} rx={60} ry={10} fill="#0f0e1e" opacity={0.85} />
  </g>;
};

// ---------------- ışık ----------------
/** huzme + toz: yalnız sedyenin ARKASINDA (K1); toz ışın içinde yoğun (seed 707) */
const HUZME_KIRP = `M-20,-20 L1100,-20 L1100,1250 L860,1258 L610,1236 L470,1228 L300,1266 L120,1262 L40,1380 L-20,1380Z`;
const Huzme: React.FC<{ p: number }> = ({ p }) => {
  const toz = Array.from({ length: 120 }, (_, i) => {
    const m = E_MIN + 0.05 + rnd(707, `m${i}`) * (E_MAX - E_MIN - 0.25), x = KAPI.x1 + 10 + rnd(707, `x${i}`) * 520, y = isinY(m, x) + (((p / 60) * 4 + rnd(707, `d${i}`) * 30) % 30);
    return { x, y, r: 1.4 + rnd(707, `r${i}`) * 2.2, a: 0.4 + rnd(707, `a${i}`) * 0.5 };
  });
  return <Kirp d={HUZME_KIRP}>
    <polygon points={pS(YELPAZE)} fill={LM.hale} opacity={0.04} style={{ mixBlendMode: "screen" }} />
    {[[E_MIN + 0.02, 1.0, 0.2], [1.25, 1.38, 0.1], [1.95, 2.3, 0.15]].map(([a, b, al], i) => <polygon key={i} points={pS(yelpaze(a, b))} fill={LM.hale} opacity={al} style={{ mixBlendMode: "screen" }} />)}
    {toz.map((t, i) => <circle key={i} cx={t.x} cy={t.y} r={t.r} fill={LM.toz} opacity={t.a} />)}
  </Kirp>;
};
/** ele inen ışın: örtünün üstünden geçen dar kanal (kapı yakın kenarla aynı derinlikte) — kaynak → hava → el okunur */
const EleIsin: React.FC<{ p: number }> = ({ p }) => {
  const a = 2.02, b = 2.32;
  const kanal = `M0,1150 L640,1150 L640,1420 L0,1420Z`;
  return <Kirp d={kanal}>
    <polygon points={pS(yelpaze(a, b))} fill={LM.hale} opacity={0.05} style={{ mixBlendMode: "screen" }} />
    {Array.from({ length: 16 }, (_, i) => { const m = a + rnd(708, `m${i}`) * (b - a), y = 1160 + rnd(708, `y${i}`) * 240 + ((p / 60) * 3) % 20; return <circle key={i} cx={isinX(m, y)} cy={y} r={1.4 + rnd(708, `r${i}`) * 1.8} fill={LM.toz} opacity={0.55} />; })}
  </Kirp>;
};
/** ışıklı arka yüzeyler: duvar (düz ışınlar) + zemin YALNIZ sedyenin arkasındaki bantta; Eliasberg'in gölgesi hariç */
const IsikliArka: React.FC = () => {
  const gol = golgeKaynak([...govdeP, [YUZ.x - 100, YUZ.y - 130], [YUZ.x + 100, YUZ.y - 130], DIZ]);
  return <g>
    <defs><mask id="bd3Golge" maskUnits="userSpaceOnUse" x={-500} y={-500} width={2100} height={2900}><rect x={-500} y={-500} width={2100} height={2900} fill="#fff" /><polygon points={pS(gol)} fill="#000" /></mask></defs>
    <g mask="url(#bd3Golge)">
      <Kirp d="M330,345 Q720,300 1100,330 L1100,1075 L330,1075Z">
        <polygon points={pS(yelpaze(E_MIN, 1.02))} fill={LM.isik[2]} />
        <polygon points={pS(yelpaze(E_MIN + 0.04, 0.98))} fill={LM.isik[1]} opacity={0.85} />
        <polygon points={pS(yelpaze(E_MIN + 0.1, 0.9))} fill={LM.isik[0]} opacity={0.6} />
      </Kirp>
      <Kirp d="M-20,1190 L330,1075 L1100,1075 L1100,1290 L-20,1290Z">
        <polygon points={pS(yelpaze(1.02, E_MAX))} fill={LM.zeminIsik[1]} opacity={0.9} />
        <polygon points={pS(yelpaze(1.9, 2.45))} fill={LM.zeminIsik[0]} />
      </Kirp>
    </g>
  </g>;
};

/** kadraj kaydırması 170 px (el ve parmak uçları IG alt arayüzünün üstünde kalsın; baş tepesi y ≈ 300) */
const KAY = 170;
export const BodrumP08T3: React.FC<SablonProps> = ({ p, kilit }) => (
  <LgBaski><g transform={`translate(0 ${-KAY})`}>
    <Arka />
    <IsikliArka />
    <Ortulu x0={-30} y0={1010} w={400} h={220} i={0} />
    <Ortulu x0={800} y0={940} w={300} h={190} i={1} ters />
    <Kapi />
    <Huzme p={p} />
    <Eliasberg />
    <Sedye kilit={kilit} />
    <ElOrtude />
    <EleIsin p={p} />
  </g></LgBaski>
);
