// ===== BODRUM `p08` tur-4 — kalıcı çizim araçları (src/kit/cizim: MurekkepCizgi + TonTarama) + tur-3 kalanları =====
// Tur-3 kaydı BodrumT3.tsx'te (görünüm "p08-t3"). Bu dosya yalnız EKLEME (T3'ün kopyası üstüne).
// Tur-4 değişiklikleri:
//   - Tüm konturlar MurekkepKontur/BirlesikM (ışık tarafı ince/kayıp, gölge tarafı kalın); tüm gölgeler TonTarama (yoğunluk tona göre).
//   - Eliasberg sedyenin ARKASINDA diz çöker, sedyeden AYRI: sedye x 840'ta biter (örtü x'te 0.745 sıkıştırıldı), sağında zemine basan
//     kalkık bacağın incik + çizmesi (zemin y 1670, sedye arka kenar derinliği) ve sedye ucu ile incik arasında boş zemin görünür.
//   - Aydarov'un eli: önkol örtü kenarının altından tahta üst yüzüne çıkar, avuç tahtanın ön kenarına dayanır, parmaklar ön yüze sarkar
//     (havada değil; ön yüzde temas gölgesi).
//   - Yüz: LgYuz3 murekkep (ince ton taraması, iç çizgi yok, kontur ışıkta kaybolur).
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
import { BirlesikM, MurekkepCizgi, MurekkepKontur } from "../../cizim/MurekkepCizgi";
import { TonTarama } from "../../cizim/TonTarama";
import { rnd } from "../../../doku/sabitler";
import { GravurPalet, konikKol } from "../../props/paris/GravurEl";
import type { SablonProps } from "../../ortak";
import { LM } from "./BodrumHedef";
import { daire, HilalB, INC_POZ, IncEl, IncElPoz, kapsul, Kivrim, KirpB, LgYuz3, serit, YuzPalet3 } from "./lgFigur";
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
/** ekranda ışığın gittiği yön (kaynak izdüşümü S'den sahne ortasına) */
const ISIK: P2 = [0.64, 0.77];
/** nokta kapıdan geçen ışın yelpazesinde mi (araya giren kütle ayrıca kırpılır) */
const fanda = (p: P2) => { const m = egim(p); return p[0] > KAPI.x0 && m >= E_MIN && m <= E_MAX; };
const ss = (a: number, b: number, x: number) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

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
// tur-4: çömelen adamın palto eteği sedye ucunun sağında yere kadar iner (incik bunun ÖNÜNDE) → gövde kütlesi sedyenin arkasında alçakta
const GOVDE = "M648,744 Q610,756 580,800 L556,870 Q554,980 588,1060 L612,1100 Q606,1200 604,1400 L846,1460 Q856,1560 872,1626 Q912,1644 948,1630 Q1000,1580 1012,1440 Q1006,1330 992,1262 Q976,1200 918,1110 L898,1060 Q884,960 874,882 L862,812 Q832,772 766,742 Q706,756 648,744Z";
// kalkık (sağ) bacak: diz → ayak bileği → çizme; zemin y 1670 (sedyenin arka kenarı derinliği; kaydırma öncesi)
const ZEMIN_E = 1670, BILEK_A: P2 = [992, 1574];
/** gövde gölge sınırı: y → x (hacmi izler: omuzdan koltuk altına girer, belde içeri, eteğe açılır) */
const GS: P2[] = [[738, 764], [790, 792], [852, 818], [908, 846], [982, 836], [1062, 808], [1160, 826], [1310, 858], [1420, 880]];
const golgeX = (y: number) => { for (let i = 0; i < GS.length - 1; i++) if (y <= GS[i + 1][0]) { const t = Math.max(0, (y - GS[i][0]) / (GS[i + 1][0] - GS[i][0])); return GS[i][1] + (GS[i + 1][1] - GS[i][1]) * t; } return GS[GS.length - 1][1]; };
const paltoTon = (q: P2) => { const g = ss(-18, 22, q[0] - golgeX(q[1])); const isikta = fanda(q) ? 1 : 0; return 0.02 + 0.3 * (1 - isikta) + 0.62 * g + 0.12 * ss(1150, 1400, q[1]); };
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
  const tavanD = "M-20,-20 L1100,-20 L1100,345 L330,345 L-20,-20Z";
  return <g strokeLinejoin="round">
    <rect x={-20} y={-20} width={1120} height={2200} fill={LM.tavan} />
    {/* tonoz: kemer yaylarını izleyen eğri tarama (ışık tonoza ulaşmaz: kapının üstünde); köşeye doğru koyulaşır */}
    <TonTarama d={tavanD} isik={ISIK} ton={0.7} renk={LM.tarama} seed={450} mod="egri" eksen={yaySerit(120, 330, 520, -40, 1140, 250, 0).slice(0, 13)} tonFn={(q) => 0.45 + 0.55 * ss(500, 0, q[1]) * ss(200, 1000, q[0] + 300)} aralik={6.5} kalinlik={2.1} />
    {[[-60, 470, 330, -150, 1140, 300], [120, 330, 520, -40, 1140, 250], [330, 300, 700, 90, 1140, 330]].map(([x0, y0, cx, cy, x1, y1], i) => <g key={i}>
      {/* tonoz örgüsü: her kaburganın altında yay boyunca gölge bandı + tarama (A9) */}
      <TonTarama d={yolD(yaySerit(x0, y0 + 10, cx, cy + 10, x1, y1 + 10, 56 - i * 8))} isik={[0, 1]} ton={0.9} renk={LM.tarama} seed={455 + i} mod="egri" eksen={yaySerit(x0, y0 + 10, cx, cy + 10, x1, y1 + 10, 0).slice(0, 13)} gecis={[-1.1, 0.5]} aralik={5.5} kalinlik={2.2} />
      <path d={`M${x0},${y0} Q${cx},${cy} ${x1},${y1}`} stroke={LM.kaburga} strokeWidth={14 - i * 3} fill="none" />
      <path d={`M${x0},${y0 - 9 + i * 2} Q${cx},${cy - 8} ${x1},${y1 - 8}`} stroke="#3e4068" strokeWidth={2.6} fill="none" />
    </g>)}
    <path d="M330,345 Q720,300 1100,330 L1100,1075 L330,1075Z" fill={LM.duvar} />
    {/* duvar sıvası: seed'li lekeler (düz dolgu kalmasın) */}
    {Array.from({ length: 14 }, (_, i) => <path key={i} d={yolD(kirikCokgen(360 + rnd(461, `x${i}`) * 720, 400 + rnd(461, `y${i}`) * 480, 40 + rnd(461, `w${i}`) * 70, 18 + rnd(461, `h${i}`) * 30, 470 + i))} fill={i % 2 ? "#363a62" : "#43466e"} opacity={0.55} />)}
    {/* duvar gölgesi: ışık yelpazesi dışında ton (ışıklı yelpaze IsikliArka'da üstüne gelir); sağa ve köşeye koyulaşır */}
    <TonTarama d="M330,345 Q720,300 1100,330 L1100,1075 L330,1075Z" isik={ISIK} ton={1} renk={LM.tarama} seed={461} aci={98} tonFn={(q) => 0.2 + 0.4 * ss(500, 1100, q[0]) + 0.15 * ss(700, 360, q[1])} aralik={6.5} kalinlik={2} alfa={0.7} />
    <rect x={330} y={890} width={790} height={190} fill={LM.duvarAlt} />
    <TonTarama d="M330,890 L1100,890 L1100,1078 L330,1078Z" isik={ISIK} ton={0.75} renk={LM.tarama} seed={462} aci={4} gecis={[-1.4, 0.4]} aralik={6} kalinlik={2} />
    <line x1={330} y1={890} x2={1100} y2={890} stroke="#4c5078" strokeWidth={2.6} />
    {tugla(925, 770, 120, 135, 11)}{tugla(530, 470, 70, 60, 12)}
    {[[880, 400, 930, 520, 905, 600], [560, 600, 590, 700, 570, 790]].map(([a, b, c, d, e, f], i) => <path key={i} d={`M${a},${b} L${c},${d} L${e},${f}`} stroke="#25254a" strokeWidth={2.4} fill="none" />)}
    <path d="M-20,-20 L330,345 L330,1075 L-20,1190Z" fill="#2e3056" />
    <TonTarama d="M-20,380 L330,520 L330,1075 L-20,1190Z" isik={ISIK} ton={0.8} renk="#1c1c3a" seed={463} aci={66} gecis={[-1.2, 0.6]} aralik={6.5} kalinlik={2} />
    <path d="M-20,1190 L330,1075 L1100,1075 L1100,2120 L-20,2120Z" fill={LM.zemin} />
    {/* zemin: perspektif yatay tarama, kameraya doğru koyulaşır (ışık yalnız sedyenin arkasındaki bantta, IsikliArka) */}
    <TonTarama d="M-20,1190 L330,1075 L1100,1075 L1100,2120 L-20,2120Z" isik={[0, 1]} ton={0.85} renk="#16152c" seed={464} aci={-1.5} tonFn={(q) => 0.35 + 0.65 * ss(1100, 1900, q[1])} aralik={6.5} kalinlik={2.2} />
    {/* zemin taş derzleri (perspektif, sedye önünde koyu) */}
    {[1150, 1240, 1360, 1520, 1720, 1960].map((y, i) => <line key={i} x1={-20} x2={1100} y1={y} y2={y - 20} stroke="#22223c" strokeWidth={2 + i * 0.4} opacity={0.7} />)}
  </g>;
};

const Kapi: React.FC = () => <g strokeLinejoin="round">
  <rect x={KAPI.x0} y={KAPI.y0} width={KAPI.x1 - KAPI.x0} height={KAPI.y1 - KAPI.y0} fill={LM.acik[2]} />
  <rect x={KAPI.x0 + 18} y={KAPI.y0 + 30} width={KAPI.x1 - KAPI.x0 - 30} height={KAPI.y1 - KAPI.y0 - 60} fill={LM.acik[1]} />
  <rect x={KAPI.x0 + 40} y={KAPI.y0 + 80} width={KAPI.x1 - KAPI.x0 - 70} height={KAPI.y1 - KAPI.y0 - 200} fill={LM.acik[0]} />
  <path d={`M${KAPI.x0 - 18},${KAPI.y0 - 26} L${KAPI.x1 + 16},${KAPI.y0 - 16} L${KAPI.x1 + 16},${KAPI.y1 + 6} L${KAPI.x1},${KAPI.y1} L${KAPI.x1},${KAPI.y0} L${KAPI.x0},${KAPI.y0 - 8} L${KAPI.x0},${KAPI.y1 + 20} L${KAPI.x0 - 18},${KAPI.y1 + 24}Z`} fill={LM.kasa} stroke="#1a1630" strokeWidth={2.4} />
  <path d="M40,118 L214,214 L214,1040 L40,1110Z" fill={LM.kapiKanat} />
  {[[62, 170, 196, 250, 196, 560, 62, 540], [62, 620, 196, 640, 196, 990, 62, 1040]].map((q, i) => <g key={i}>
    <path d={`M${q[0]},${q[1]} L${q[2]},${q[3]} L${q[4]},${q[5]} L${q[6]},${q[7]}Z`} fill={LM.kapiPano} stroke="#1a1630" strokeWidth={2} />
    <TonTarama d={yolD([[q[0], q[1]], [q[2], q[3]], [q[2], q[3] + 40], [q[0], q[1] + 40]])} isik={[0, 1]} ton={0.9} renk="#161228" seed={460 + i} aci={90} gecis={[-1.2, 0.2]} aralik={5.5} kalinlik={2} />
  </g>)}
  {/* kanat: tahta damarı yönünde (dikey) tarama, menteşe (sol) kenarına koyulaşır */}
  <TonTarama d="M40,118 L214,214 L214,1040 L40,1110Z" isik={[-1, 0]} ton={0.85} renk="#161228" seed={464} aci={90} gecis={[-1.1, 0.9]} aralik={6} kalinlik={2} />
  <MurekkepKontur d="M40,118 L214,214 L214,1040 L40,1110Z" renk="#120e22" kalinlik={[2, 4]} isik={ISIK} seed={465} />
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
    <path d={d} fill="#3a3462" />
    <Kirp d={d}>
      {[[0.13, 0.25], [0.5, 0.3], [0.9, 0.2]].map(([t, k], j) => <path key={j} d={serit([[X(t), y0 + h * k], [X(t + 0.05), y0 + h * 0.65], [X(t + 0.02), y0 + h]], 18 + j * 4)} fill="#26213f" opacity={0.9} />)}
      <TonTarama d={d} isik={ISIK} ton={0.8} renk={LM.tarama} seed={421 + i} aci={4} gecis={[-0.6, 0.7]} aralik={6.5} kalinlik={1.9} />
    </Kirp>
    <path d={cr(ust, false)} stroke={LM.ortuKenar} strokeWidth={1.8} fill="none" opacity={0.45} />
    <MurekkepKontur d={d} renk="#16142c" kalinlik={[1.4, 3.6]} isik={ISIK} kayip={0.3} seed={426 + i} />
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
  const etek = "M842,1150 Q892,1176 914,1240 L922,1312 Q880,1330 852,1316 Q836,1324 826,1306 Q834,1210 842,1150Z";
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
    <BirlesikM d={SIL} dolgu={CK.ceket} kontur="#1a1426" ayar={{ isik: ISIK, kalinlik: [1.6, 5.4], kayip: 0.25, seed: 470 }} />
    <KirpB d={SIL}>
      {/* gölge yarısı: hacmi izleyen sınır + gravür taraması (bıçak çizgisi yok) */}
      <path d={golgeYari} fill={CK.golge} />
      <path d={KOL_R.d} fill={CK.golge} />
      {/* sol kolun iç (gövdeye bakan) yanı: bir basamak koyu */}
      <path d={serit([[600, 880], [580, 960], [560, 1030], [570, 1150]], 34)} fill={CK.golge} opacity={0.8} />
      {/* tur-4 ton taraması: gövde boyunca biçimi izleyen eğri (göğüs yayı); gölge yarısında sık/kalın, ışıkta seyrek ince */}
      <TonTarama d={GOVDE} isik={ISIK} ton={1} renk="#140e1a" seed={471} mod="egri" eksen={[[760, 760], [800, 960], [790, 1150], [820, 1400]]} kayma={[1, 0]} tonFn={paltoTon} aralik={5.2} kalinlik={2.3} alfa={0.85} />
      {/* kollar: kol boyunca (silindir) tarama */}
      <TonTarama d={KOL_R.d} isik={ISIK} ton={1} renk="#100b16" seed={472} mod="egri" eksen={[JR, EL_R]} tonFn={() => 0.8} aralik={5} kalinlik={2.2} alfa={0.7} />
      <TonTarama d={KOL_L.d} isik={ISIK} ton={1} renk="#140e1a" seed={473} mod="egri" eksen={[JL, EL_L]} tonFn={(q) => 0.25 + 0.6 * ss(560, 610, q[0] + (q[1] - 900) * 0.2)} aralik={5} kalinlik={2.1} alfa={0.75} />
      {/* kıvrımlar: koyu oluk + ışık tarafında açık sırt (6–9) */}
      {kivrimlar.map((k, i) => <g key={i}><Kivrim q={k.q} w={k.w} oluk={k.golgede ? "#1e1828" : "#2a2234"} sirt={k.golgede ? "#463a4e" : CK.isik} kay={[-3, -2.5]} />
        <MurekkepCizgi q={k.q} egri renk="#120c18" kalinlik={k.w * 0.32} seed={480 + i} /></g>)}
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
    <path d={uc2} fill={LM.atki} />
    <Kirp d={uc2}>{kaburga([700, 754], [712, 758], 770, 952)}<path d="M736,770 L760,770 L762,960 L740,960Z" fill="#3e3238" opacity={0.6} /></Kirp>
    <TonTarama d={uc2} isik={ISIK} ton={0.85} renk="#24181e" seed={483} aci={4} gecis={[-0.8, 0.6]} aralik={5} kalinlik={1.8} />
    <MurekkepKontur d={uc2} renk="#22161c" isik={ISIK} kalinlik={[1.2, 3.4]} kayip={0.3} seed={484} />
    <path d={uc1} fill={LM.atki} />
    <Kirp d={uc1}>{kaburga([650, 710], [646, 692], 768, 1004)}</Kirp>
    <TonTarama d={uc1} isik={ISIK} ton={0.6} renk="#24181e" seed={485} aci={4} gecis={[-0.4, 0.9]} aralik={5} kalinlik={1.8} />
    <MurekkepKontur d={uc1} renk="#22161c" isik={ISIK} kalinlik={[1.2, 3.4]} kayip={0.4} seed={486} />
    <Kirp d={YD}><Hilal d={uc1} renk={LM.atkiIsik} dx={9} dy={4} /></Kirp>
    {/* çentikli yaka: yaka (üst) + klapa (alt), köşede ~30° çentik; klapa düğme hattına iner */}
    <path d={klapaL} fill="#5a4a5a" />
    <TonTarama d={klapaL} isik={ISIK} ton={0.6} renk="#1a1224" seed={476} mod="egri" eksen={[[640, 818], [660, 900], [700, 1012]]} gecis={[-0.6, 0.8]} aralik={5} kalinlik={1.8} />
    <MurekkepKontur d={klapaL} renk="#1a1426" isik={ISIK} kalinlik={[1.2, 3.6]} kayip={0.3} seed={477} />
    <path d={yakaL} fill="#5e4e5e" />
    <MurekkepKontur d={yakaL} renk="#1a1426" isik={ISIK} kalinlik={[1.2, 3.4]} kayip={0.3} seed={478} />
    <path d={klapaR} fill={CK.golge} />
    <TonTarama d={klapaR} isik={ISIK} ton={0.85} renk="#100b16" seed={479} mod="egri" eksen={[[772, 814], [752, 900], [712, 1014]]} tonFn={() => 0.85} aralik={4.8} kalinlik={1.9} />
    <MurekkepKontur d={klapaR} renk="#0e0a14" isik={ISIK} kalinlik={[1.6, 3.6]} seed={4790} />
    <path d={yakaR} fill={CK.golge} />
    <MurekkepKontur d={yakaR} renk="#0e0a14" isik={ISIK} kalinlik={[1.6, 3.6]} seed={4791} />
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
    <path d={uyluk} fill="#3a354e" />
    <Kirp d={uyluk}><path d={serit([[800, 1260], [880, 1190], [960, 1150]], 40)} fill="#2a2640" />
      <TonTarama d={uyluk} isik={ISIK} ton={1} renk="#16131f" seed={474} mod="egri" eksen={[KALCA, DIZ]} tonFn={(q) => 0.3 + 0.55 * ss(1120, 1230, q[1] + (q[0] - 860) * 0.6)} aralik={5} kalinlik={2.1} /></Kirp>
    <MurekkepKontur d={uyluk} renk="#16131f" isik={ISIK} kalinlik={[1.4, 4.4]} kayip={0.3} seed={4741} />
    <Hilal d={uyluk} renk="#6c5a68" dx={2} dy={8} />
    <path d={etek} fill={CK.golge} />
    <MurekkepKontur d={etek} renk="#120e1a" isik={ISIK} kalinlik={[1.6, 4]} seed={4751} />
    <Kirp d={etek}><TonTarama d={etek} isik={ISIK} ton={0.9} renk="#18121f" seed={475} mod="egri" eksen={[[842, 1150], [900, 1230], [920, 1310]]} tonFn={() => 0.85} aralik={5} kalinlik={2} />
      <Kivrim q={[[856, 1170], [884, 1220], [896, 1280]]} w={12} oluk="#120e1a" sirt="#463a4e" /></Kirp>
    {/* incik (dizden ayak bileğine) + çizme: palto eteğinin ÖNÜNDE, zemine basar (temas gölgesi) */}
    <ellipse cx={BILEK_A[0] + 22} cy={ZEMIN_E + 4} rx={92} ry={13} fill="#0c0b18" opacity={0.9} />
    <path d={kapsul(DIZ, BILEK_A, 56, 42)} fill="#2c283c" />
    <TonTarama d={kapsul(DIZ, BILEK_A, 56, 42)} isik={ISIK} ton={1} renk="#100e1a" seed={487} mod="egri" eksen={[DIZ, BILEK_A]} tonFn={(q) => 0.55 + 0.4 * ss(-20, 30, q[0] - (DIZ[0] + (BILEK_A[0] - DIZ[0]) * (q[1] - DIZ[1]) / (BILEK_A[1] - DIZ[1])))} aralik={5} kalinlik={2.1} />
    <MurekkepKontur d={kapsul(DIZ, BILEK_A, 56, 42)} renk="#100e1a" isik={ISIK} kalinlik={[1.6, 4.6]} kayip={0.2} seed={488} />
    {/* pantolon paçası çizmenin üstüne düşer (kıvrım) */}
    <path d={serit([[952, 1470], [992, 1490], [1032, 1478]], 14)} fill="#16131f" opacity={0.8} />
    {(() => { const cz = `M${BILEK_A[0] - 44},${BILEK_A[1] - 46} L${BILEK_A[0] + 40},${BILEK_A[1] - 50} Q${BILEK_A[0] + 46},${BILEK_A[1] + 20} ${BILEK_A[0] + 62},${ZEMIN_E - 30} Q${BILEK_A[0] + 108},${ZEMIN_E - 22} ${BILEK_A[0] + 112},${ZEMIN_E - 2} L${BILEK_A[0] - 52},${ZEMIN_E} Q${BILEK_A[0] - 56},${BILEK_A[1] + 30} ${BILEK_A[0] - 44},${BILEK_A[1] - 46}Z`;
      return <g>
        <path d={cz} fill="#221e2c" />
        <TonTarama d={cz} isik={ISIK} ton={1} renk="#0c0a12" seed={489} aci={8} tonFn={(q) => 0.45 + 0.5 * ss(BILEK_A[0] - 40, BILEK_A[0] + 60, q[0])} aralik={4.6} kalinlik={2} />
        <path d={`M${BILEK_A[0] - 52},${ZEMIN_E - 9} L${BILEK_A[0] + 112},${ZEMIN_E - 10}`} stroke="#0c0a12" strokeWidth={7} />
        <MurekkepKontur d={cz} renk="#0c0a12" isik={ISIK} kalinlik={[1.8, 4.6]} seed={4891} />
        {/* çizme burnunda soğuk tavan yansıması (ışık yolu yok; yalnız ortam) */}
        <path d={serit([[BILEK_A[0] + 66, ZEMIN_E - 30], [BILEK_A[0] + 96, ZEMIN_E - 24]], 4)} fill="#4a4666" />
      </g>; })()}
    {/* sağ önkol (dizin önünde) + dizdeki el (kendi gövde gölgesinde: EL_E) + 8 px temas gölgesi */}
    <path d={kapsul(EL_R, BR, 48, 42)} fill={CK.golge} />
    <TonTarama d={kapsul(EL_R, BR, 48, 42)} isik={ISIK} ton={0.85} renk="#100b16" seed={490} mod="egri" eksen={[EL_R, BR]} tonFn={() => 0.85} aralik={5} kalinlik={2} />
    <MurekkepKontur d={kapsul(EL_R, BR, 48, 42)} renk="#0e0a14" isik={ISIK} kalinlik={[1.6, 4.2]} seed={4901} />
    <path d={serit([[EL_R[0] - 30, EL_R[1] + 8], [BR[0] - 22, BR[1] - 8]], 10)} fill="#120e1a" />
    <path d={cr([[BR[0] - 34, BR[1] - 14], [BR[0] + 34, BR[1] - 6], [BR[0] + 30, BR[1] + 16], [BR[0] - 36, BR[1] + 8]])} fill="#2a2234" stroke="#120e1a" strokeWidth={2.2} />
    <path d={cr([[924, 1066], [996, 1080], [1000, 1150], [940, 1152]])} fill="#120e1a" opacity={0.55} transform="translate(-4 8)" />
    <IncEl bilek={[BR[0] + 2, BR[1] + 4]} aci={70} E={142} poz={INC_POZ.dayali} ayna ten="#a88478" golge="#7a5a62" kontur="#2e2028" isik={[-0.8, -0.6]} murekkep={{ ton: 0.75, seed: 491 }} />
    {/* boyun (kulak arkasından çene altına), atkı sarması (iki kat; ışık yalnız solda) */}
    <path d={boyun} fill="#94706a" />
    <path d={sarmaArka} fill="#4c3e46" />
    <MurekkepKontur d={sarmaArka} renk="#22161c" isik={ISIK} kalinlik={[1.2, 3.4]} seed={492} />
    <path d={sarmaOn} fill={LM.atki} />
    <TonTarama d={sarmaOn} isik={ISIK} ton={0.8} renk="#24181e" seed={493} mod="egri" eksen={[[612, 756], [700, 770], [800, 756]]} kayma={[0, 1]} gecis={[-0.4, 0.8]} aralik={4.6} kalinlik={1.8} />
    <MurekkepKontur d={sarmaOn} renk="#22161c" isik={ISIK} kalinlik={[1.2, 3.8]} kayip={0.3} seed={494} />
    <Kirp d={sarmaOn}>
      {[[618, 760, 800, 752], [616, 776, 798, 772], [622, 790, 790, 788]].map(([a, b, c, d], i) => <path key={i} d={`M${a},${b} Q${(a + c) / 2},${b + 10} ${c},${d}`} stroke="#46383e" strokeWidth={2.2} fill="none" />)}
      {[[628, 760, 700, 790, 780, 770], [650, 744, 720, 760, 792, 748]].map(([a, b, c, d, e, f], i) => <path key={`t${i}`} d={serit([[a, b], [c, d], [e, f]], 12)} fill="#3a2e34" opacity={0.55} />)}
    </Kirp>
    <Kirp d={YD}><Hilal d={sarmaOn} renk={LM.atkiIsik} dx={12} dy={6} /><Hilal d={sarmaArka} renk={LM.atkiIsik} dx={8} dy={4} alfa={0.7} /></Kirp>
    {/* yüz: ¾; aynalı (ışık soldan → kenar ışığı ekran solunda); bakış sol-aşağı (ele) */}
    <g transform={`translate(${2 * YUZ.x} 0) scale(-1 1)`}>
      <LgYuz3 x={YUZ.x} y={YUZ.y} H={YUZ.H} rol={7} ifade={{ kasIc: 1, goz: 0.72, agiz: 0.5, bakis: [0.75, 1] }} P={ISIKTA} murekkep={{ isik: [-ISIK[0], ISIK[1]], ton: 0.85 }} />
    </g>
  </g>;
};
/** Eliasberg'in sol önkolu + eli: örtünün ÖNÜNDE (örtüye uzanır, el örtüde; temas gölgesi) */
const ElOrtude: React.FC = () => {
  const aci = 80, E = 142;
  return <g>
    <Kirp d="M300,1120 L800,1120 L800,1500 L300,1500Z">
      <path d={kapsul(EL_L, BL, 50, 41)} fill={CK.ceket} />
      <path d={serit([[EL_L[0] + 40, EL_L[1] + 30], [BL[0] + 30, BL[1] - 10]], 20)} fill={CK.golge} />
      <TonTarama d={kapsul(EL_L, BL, 50, 41)} isik={ISIK} ton={1} renk="#140e1a" seed={495} mod="egri" eksen={[EL_L, BL]} tonFn={(q) => 0.2 + 0.65 * ss(-10, 30, q[0] - (EL_L[0] + (BL[0] - EL_L[0]) * (q[1] - EL_L[1]) / (BL[1] - EL_L[1])))} aralik={5} kalinlik={2} />
      <MurekkepKontur d={kapsul(EL_L, BL, 50, 41)} renk="#1a1426" isik={ISIK} kalinlik={[1.4, 4.6]} kayip={0.3} seed={496} />
      <Kirp d={YD}><Hilal d={kapsul(EL_L, BL, 50, 41)} renk={CK.isik} dx={12} dy={4} /></Kirp>
    </Kirp>
    <path d={cr([[BL[0] - 42, BL[1] - 6], [BL[0] + 36, BL[1] - 18], [BL[0] + 42, BL[1] + 6], [BL[0] - 38, BL[1] + 18]])} fill="#2a2234" stroke="#1a1426" strokeWidth={2.2} />
    {/* temas gölgesi örtüde (ışık sol-üstten → sağ-alta) */}
    <IncEl bilek={[BL[0] + 3, BL[1] + 10]} aci={aci} E={E} poz={INC_POZ.dayali} ten="" golge="" kontur="" isik={[-0.85, -0.5]} golgeRenk="#2a2450" golgeKay={[10, 8]} />
    <IncEl bilek={[BL[0] + 3, BL[1] + 10]} aci={aci} E={E} poz={INC_POZ.dayali} ten={EL_E.isik} golge={EL_E.golge} kontur="#2e2028" isik={[-0.85, -0.5]} murekkep={{ ton: 0.75, seed: 497 }} />
    <Kirp d={YD}><IncEl bilek={[BL[0] + 3, BL[1] + 10]} aci={aci} E={E} poz={INC_POZ.dayali} ten={EL_ISIK.isik} golge={EL_ISIK.golge} kontur="#4a3236" kenar={EL_ISIK.kenar} isik={[-0.85, -0.5]} murekkep={{ ton: 0.55, seed: 497 }} /></Kirp>
  </g>;
};

// ---------------- sedye ----------------
const F = (x: number) => 1398 + 0.04 * (x - 60); // tahta ön üst kenarı
const ZEMIN_ON = 1800; // sedye önünde zemin teması (kaydırma öncesi)
// tur-4: sedye x 930'da biter; örtünün sarkan ucu Eliasberg'in inciğinin ÖNÜNDEN geçer (örtme = derinlik: adam sedyenin arkasında),
// çizme sedye ucunun sağında, sedye arka kenarı derinliğindeki zemine basar (y 1670 < sedye ön ayakları 1800). Örtü x'te 0.84 sıkışır.
const X_SON = 930;
const SX = (x: number) => 36 + (x - 36) * 0.84;
const sxp = (a: P2[]): P2[] => a.map((q) => [SX(q[0]), q[1]] as P2);
const ORTU_ARKA: P2[] = sxp([[52, 1372], [80, 1300], [120, 1262], [165, 1238], [215, 1230], [262, 1246], [300, 1270], [340, 1268], [400, 1246], [470, 1232], [540, 1228], [610, 1236], [680, 1250], [740, 1246], [800, 1252], [860, 1262], [910, 1250], [940, 1226], [966, 1220], [1022, 1214], [1046, 1232], [1080, 1250], [1112, 1258]]);
const ORTU_ON: P2[] = sxp([[1112, 1436], [1000, 1430], [900, 1424], [800, 1420], [700, 1416], [660, 1405], [630, 1380], [600, 1356], [540, 1348], [480, 1342], [420, 1338], [340, 1334], [260, 1332], [180, 1336], [110, 1347], [60, 1372]]);
const ETEK: P2[] = sxp([[640, 1392], [668, 1428], [700, 1456], [730, 1466], [752, 1486], [780, 1474], [830, 1480], [870, 1490], [886, 1508], [904, 1490], [960, 1500], [1000, 1496], [1020, 1512], [1044, 1498], [1112, 1506]]);
// ölü el: bilek örtü kenarının ALTINDAN çıkar (önkol örtünün altında), avuç tahtanın üst yüzünde yatar, parmaklar ön kenardan
// (F ≈ 1408) aşağı kıvrılır ve ön yüze değer — havada değil (hedef-morg)
const BILEK_O: P2 = [394, 1334], ACI_O = 84, E_O = 158;
const OLU_POZ: IncElPoz = INC_POZ.sarkik;
const ust = cr([...ORTU_ARKA, ...ORTU_ON]);
const OR = { taban: "#7f7898", koyu: "#5e5878", derin: "#45405e", yamac: "#c0a492", sirt: "#ecd2bc", sirtG: "#9890ae" };

const TUMSEK: [number, number, number][] = ([[205, 1240, 2], [470, 1236, 3], [745, 1250, 2], [958, 1222, 2], [1020, 1216, 2]] as [number, number, number][]).map(([x, y, n]) => [SX(x), y, n]);
const KIVRIM_ORTU = TUMSEK.flatMap(([cx, cy, n], t) => Array.from({ length: n }, (_, j) => {
  const ang = (96 + (j - (n - 1) / 2) * 40 + (rnd(493, `a${t}${j}`) - 0.5) * 16) * (Math.PI / 180), L = 70 + rnd(493, `l${t}${j}`) * 70;
  const a: P2 = [cx + Math.cos(ang) * 14, cy + 8 + Math.sin(ang) * 10], c: P2 = [cx + Math.cos(ang) * L, Math.min(cx > SX(640) ? 1415 : 1338, cy + Math.sin(ang) * L)];
  const m: P2 = [(a[0] + c[0]) / 2 + (j % 2 ? 9 : -9), (a[1] + c[1]) / 2];
  return { q: [a, m, c] as P2[], w: 14 + rnd(493, `w${t}${j}`) * 10 };
}));
const sark = cr([...ORTU_ON.slice(0, 7).reverse(), ...ETEK.slice().reverse()].reverse());

const Sedye: React.FC<{ kilit?: SablonProps["kilit"] }> = ({ kilit }) => {
  if (kilit) { kilit.push({ ad: "el", p: [BILEK_O[0] + 10, BILEK_O[1] + 70 - KAY], tur: "dokunus" }); kilit.push({ ad: "yuz", p: [YUZ.x, YUZ.y - KAY], tur: "yuz" }); kilit.push({ ad: "cizme", p: [BILEK_A[0] + 30, ZEMIN_E - KAY], tur: "ayak" }); }
  const tahtaUst = yolD([[36, 1326], [X_SON, 1326], [X_SON, F(X_SON)], [36, F(36)]]);
  const tahtaOn = yolD([[36, F(36)], [X_SON, F(X_SON)], [X_SON, F(X_SON) + 38], [36, F(36) + 38]]);
  const tahtaUc = yolD([[X_SON, F(X_SON) - 2], [X_SON + 9, F(X_SON) - 8], [X_SON + 9, F(X_SON) + 32], [X_SON, F(X_SON) + 38]]);
  const kolO = kapsul([380, 1296], [BILEK_O[0] - 1, BILEK_O[1] - 2], 28, 25);
  const sarkD = sark;
  return <g strokeLinejoin="round">
    {/* sedye altı ve önü: ışık yok; altta derin gölge */}
    <path d={yolD([[30, F(30) + 30], [X_SON, F(X_SON) + 30], [X_SON, ZEMIN_ON + 40], [30, ZEMIN_ON + 10]])} fill="#1f1e36" opacity={0.85} />
    <ellipse cx={480} cy={ZEMIN_ON + 26} rx={500} ry={40} fill="#171628" opacity={0.8} />
    {[[78, 0], [850, 1]].map(([x, i]) => <g key={i}>
      <ellipse cx={x + 17} cy={ZEMIN_ON + 2} rx={40} ry={9} fill="#121122" />
      <rect x={x} y={F(x) + 36} width={34} height={ZEMIN_ON - F(x) - 36} fill={LM.tahta} />
      <rect x={x + 22} y={F(x) + 40} width={10} height={ZEMIN_ON - F(x) - 44} fill="#2a2034" />
      <TonTarama d={yolD([[x, F(x) + 36], [x + 34, F(x) + 36], [x + 34, ZEMIN_ON], [x, ZEMIN_ON]])} isik={ISIK} ton={0.8} renk="#140e1c" seed={506 + i} aci={90} gecis={[-1, 0.6]} aralik={4.6} kalinlik={1.8} />
      <MurekkepKontur d={yolD([[x, F(x) + 36], [x + 34, F(x) + 36], [x + 34, ZEMIN_ON], [x, ZEMIN_ON]])} renk="#120c18" isik={ISIK} kalinlik={[1.6, 3.6]} seed={508 + i} />
    </g>)}
    {/* tahta: üst yüz şeridi (örtünün önünde), ön yüz (kameraya bakar: koyu), sol uç, sağ uç kesiti */}
    <path d={tahtaUst} fill="#5a4652" />
    <Kirp d={YD}><path d={tahtaUst} fill={LM.tahtaIsik} /></Kirp>
    <TonTarama d={tahtaUst} isik={ISIK} ton={1} renk="#1a1426" seed={509} aci={1.5} tonFn={(q) => (fanda(q) ? 0.02 : 0.6)} aralik={5} kalinlik={1.8} alfa={0.7} />
    <path d={tahtaOn} fill={LM.tahta} />
    <TonTarama d={tahtaOn} isik={ISIK} ton={1} renk="#140e1c" seed={486} aci={1.5} tonFn={(q) => 0.5 + 0.3 * ss(F(q[0]) + 6, F(q[0]) + 38, q[1])} aralik={4.4} kalinlik={1.9} />
    <MurekkepKontur d={tahtaOn} renk="#120c18" isik={ISIK} kalinlik={[1.6, 3.8]} seed={510} />
    <path d={tahtaUc} fill="#2e2436" />
    <MurekkepKontur d={tahtaUc} renk="#120c18" isik={ISIK} kalinlik={[1.4, 3]} seed={511} />
    <Kirp d={YD}><line x1={36} y1={F(36)} x2={X_SON} y2={F(X_SON)} stroke="#c4927a" strokeWidth={3} /></Kirp>
    <path d={yolD([[26, F(26) - 70], [36, F(36) - 72], [36, F(36) + 38], [26, F(26) + 40]])} fill="#2e2436" />
    {/* elin tahta ön yüzüne düşen gölgesi (ışık soldan → sağa): parmaklar yüze değer, gölge parmağa yapışık başlar */}
    <Kirp d={tahtaOn}><IncEl bilek={BILEK_O} aci={ACI_O} E={E_O} poz={OLU_POZ} ten="" golge="" kontur="" isik={[-0.85, -0.5]} golgeRenk="#0e0a14" golgeKay={[12, 3]} /></Kirp>
    {/* ölü önkol: örtünün altından tahtanın üst yüzüne çıkar, bilek ön kenarda */}
    <path d={kolO} fill={EL_OLU.golge} />
    <MurekkepKontur d={kolO} renk="#3e2c34" isik={ISIK} kalinlik={[1, 3.4]} kayip={0.4} seed={513} />
    {/* örtü üst yüzü: çoğu gölgede; yelpazede yalnız ışığa dönük yamaçlar ve sırtlar */}
    <path d={ust} fill={OR.taban} />
    <Kirp d={ust}>
      {/* öne (tahtaya) inen yüz: bir basamak koyu */}
      <path d={serit(ORTU_ON.map((p) => [p[0], p[1] - 20] as P2), 42)} fill={OR.koyu} opacity={0.7} />
      <Kirp d={YD}>
        {TUMSEK.map(([cx, cy], i) => <path key={i} d={cr([[cx - 90, cy + 40], [cx - 40, cy + 8], [cx + 8, cy - 2], [cx + 26, cy + 40], [cx - 8, cy + 84], [cx - 80, cy + 90]])} fill={OR.yamac} opacity={0.85} />)}
        <path d={serit(ORTU_ARKA.slice(1, -1).map((p) => [p[0] + 2, p[1] + 10] as P2), 22)} fill={OR.sirt} />
      </Kirp>
      {KIVRIM_ORTU.map((q, i) => <g key={i}>
        <path d={serit(q.q.map((p) => [p[0] - 6, p[1] - 3] as P2), q.w * 0.4)} fill={OR.sirtG} opacity={0.5} />
        <Kirp d={YD}><path d={serit(q.q.map((p) => [p[0] - 6, p[1] - 3] as P2), q.w * 0.4)} fill={OR.sirt} opacity={0.55} /></Kirp>
        <path d={serit(q.q, q.w)} fill={OR.derin} opacity={0.42} />
      </g>)}
      {/* tur-4 ton taraması: beden boyunca (yatay eğri) çizgiler; ışık yelpazesinde yalnız oluklarda, gölgede yoğun; kıvrım oluklarında koyu */}
      <TonTarama d={ust} isik={ISIK} ton={1} renk="#2a2648" seed={490} aci={-3}
        tonFn={(q) => { const ol = Math.max(0, ...KIVRIM_ORTU.map((k) => { const m = k.q[1], dx = q[0] - m[0], dy = q[1] - m[1]; return 1 - Math.min(1, Math.hypot(dx * 0.7, dy) / (k.w * 2.2)); })); return Math.min(1, (fanda(q) ? 0 : 0.48) + 0.5 * ol + 0.3 * ss(1300, 1420, q[1])); }} aralik={4.8} kalinlik={2} alfa={0.8} />
      {/* kıvrım oluklarında incelen mürekkep (gölge kenarı) */}
      {KIVRIM_ORTU.map((q, i) => <MurekkepCizgi key={i} q={q.q.map((p) => [p[0] + 3, p[1] + 2] as P2)} egri renk="#22203e" kalinlik={2.6} seed={520 + i} alfa={0.8} />)}
    </Kirp>
    <MurekkepKontur d={ust} renk="#1a1834" isik={ISIK} kalinlik={[1.2, 4.2]} kayip={0.45} seed={514} />
    {/* sol yarıda örtünün tahtadaki kıvrık kenarı (önkolun üstünü örter) + tahtaya temas gölgesi */}
    <path d={serit(ORTU_ON.slice(6).map((p) => [p[0], p[1] + 7] as P2), 12)} fill="#1c1a30" opacity={0.6} />
    <path d={cr(ORTU_ON.slice(6), false)} stroke={LM.ortu[2]} strokeWidth={7} fill="none" />
    <MurekkepCizgi q={ORTU_ON.slice(6).map((p) => [p[0], p[1] + 4] as P2)} egri renk="#16142a" kalinlik={4} ucBas={30} ucSon={30} seed={515} />
    <Kirp d={YD}><path d={cr(ORTU_ON.slice(6).map((p) => [p[0] - 2, p[1] - 5] as P2), false)} stroke={LM.ortuIsik[1]} strokeWidth={2.4} fill="none" /></Kirp>
    {/* sağ yarıda kısa sarkma (kameraya bakar: ışıksız) + asılı kıvrımlar (V kırıklı etek) */}
    <path d={sarkD} fill={OR.koyu} />
    <Kirp d={sarkD}>
      {([[752, 1486, 18], [818, 1480, 14], [886, 1508, 24], [960, 1500, 16], [1020, 1512, 22]] as [number, number, number][]).map(([x0, y, w], i) => { const x = SX(x0); return <g key={i}>
        <path d={serit([[x + 4, F(x) - 2], [x + 8 + (i % 2) * 6, (F(x) + y) / 2], [x, y]], w)} fill={LM.ortu[2]} opacity={0.85} />
        <path d={serit([[x - w * 0.7, F(x)], [x - w * 0.6, (F(x) + y) / 2], [x - w * 0.8, y - 10]], 5)} fill="#7a6c9a" opacity={0.4} />
        <MurekkepCizgi q={[[x + 4, F(x)], [x + 8 + (i % 2) * 6, (F(x) + y) / 2], [x + 1, y - 4]]} egri renk="#1c1a34" kalinlik={3} seed={530 + i} />
      </g>; })}
      <TonTarama d={sarkD} isik={ISIK} ton={1} renk="#1c1a34" seed={492} mod="egri" eksen={[[SX(700), 1410], [SX(720), 1480]]} tonFn={(q) => 0.5 + 0.35 * ss(1420, 1500, q[1])} aralik={4.6} kalinlik={1.9} />
    </Kirp>
    <MurekkepKontur d={sarkD} renk="#16142c" isik={ISIK} kalinlik={[1.4, 4]} seed={516} />
    {/* avucun tahta kenarına dayandığı yer: kenar çizgisi elin altında koyu temas */}
    <path d={serit([[BILEK_O[0] - 22, F(BILEK_O[0]) + 1], [BILEK_O[0] + 6, F(BILEK_O[0]) + 3], [BILEK_O[0] + 34, F(BILEK_O[0]) + 2]], 5)} fill="#140c14" opacity={0.6} />
    {/* sarkan ölü el: avuç tahtanın ön kenarına dayanır, parmaklar ön yüze sarkar; tırnak/iç çizgi yok */}
    <IncEl bilek={BILEK_O} aci={ACI_O} E={E_O} poz={OLU_POZ} ten={EL_OLU.isik} golge={EL_OLU.golge} kontur="#3a2a32" isik={[-0.85, -0.5]} murekkep={{ ton: 0.6, seed: 517 }} />
    <Kirp d={YD}><IncEl bilek={BILEK_O} aci={ACI_O} E={E_O} poz={OLU_POZ} ten={EL_OLU_ISIK.isik} golge={EL_OLU_ISIK.golge} kontur="#4a3438" kenar={EL_OLU_ISIK.kenar} isik={[-0.85, -0.5]} murekkep={{ ton: 0.45, seed: 517 }} /></Kirp>
    {/* örtünün kıvrık kenarı bileğin ÜSTÜNDEN geçer (el örtünün altından çıkar) + kenarın bileğe düşen gölgesi */}
    <Kirp d={`M${BILEK_O[0] - 50},1326 L${BILEK_O[0] + 50},1326 L${BILEK_O[0] + 50},1356 L${BILEK_O[0] - 50},1356Z`}>
      <path d={serit(ORTU_ON.slice(6).map((p) => [p[0], p[1] + 9] as P2), 14)} fill="#1c1a30" opacity={0.7} />
      <path d={cr(ORTU_ON.slice(6), false)} stroke={LM.ortu[2]} strokeWidth={7} fill="none" />
      <MurekkepCizgi q={ORTU_ON.slice(6).map((p) => [p[0], p[1] + 4] as P2)} egri renk="#16142a" kalinlik={4} ucBas={30} ucSon={30} seed={515} />
      <Kirp d={YD}><path d={cr(ORTU_ON.slice(6).map((p) => [p[0] - 2, p[1] - 5] as P2), false)} stroke={LM.ortuIsik[1]} strokeWidth={2.4} fill="none" /></Kirp>
    </Kirp>
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
    <defs><mask id="bd4Golge" maskUnits="userSpaceOnUse" x={-500} y={-500} width={2100} height={2900}><rect x={-500} y={-500} width={2100} height={2900} fill="#fff" /><polygon points={pS(gol)} fill="#000" /></mask></defs>
    <g mask="url(#bd4Golge)">
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
export const BodrumP08T4: React.FC<SablonProps> = ({ p, kilit }) => (
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
