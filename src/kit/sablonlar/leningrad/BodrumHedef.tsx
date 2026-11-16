// ===== BODRUM `p08` — onaylı hedef görsele göre (hedef/hedef-morg.png; notlar/tur-3c "ışığı ele indir") =====
// Kompozisyon hedefle aynı: kapı sol üstte yarı açık (kanat kameraya doğru), tonozlu bodrum tavanı (hedefte onaylı; [G] Radyo Evi bodrumu),
// Eliasberg sedyenin ardında yarı diz çökmüş (sağ diz kalkık, el dizde), yüz ¾ kameraya; yan bölmede örtülü biçimler gölgede;
// sedye + örtü alt üçte bir; Aydarov'un eli örtünün yakın kenarından sarkar. Davul çubuğu yok, çerçeve yok.
// TEK IŞIK: koridordaki yüksek pencere S. Ekranda S'nin izdüşümü s = (−260, −260); her ışın s'den geçen bir doğru (nokta kaynak
// izdüşümü). Işık yalnız kapı açıklığından geçer → ışıklı hacim = s'den açıklığın köşelerine giden iki sınır ışını arasındaki yelpaze
// (eğim 0.84 … 2.68). Kapı odanın sol duvarında, sedyenin yakın kenarıyla aynı derinlikte: ışınlar sağa ve hafif içeri gider →
//   - yüze, omza ve sarkan ele (sola bakan yüzler) ışık değer; ele giden ışın Eliasberg'in solundan geçer (engel yok, kilit testi aşağıda);
//   - Eliasberg'in gölgesi sağ-arkaya, yan bölmedeki örtüye ve duvara düşer (örtü yüzeyi onun önünde, gölge almaz);
//   - kameraya bakan yüzler (örtü sarkması, kanadın iç yüzü) ışık almaz.
import React from "react";
import { Tarama } from "../../../doku/Tarama";
import { rnd } from "../../../doku/sabitler";
import { GravurEl, GRAVUR_POZ, GravurPalet, GravurPoz, konikKol } from "../../props/paris/GravurEl";
import type { SablonProps } from "../../ortak";
import { cr, Hilal, Kirp, LgBaski, P2, pS } from "./lgOrtak";
import { LgYuz, YuzPalet } from "./lgYuz";
import { zarf } from "./salonDunya";

const S: P2 = [-260, -260];
const KAPI = { x0: 224, x1: 336, y0: 238, y1: 1036 };
const egim = (q: P2) => (q[1] - S[1]) / (q[0] - S[0]);
const E_MIN = egim([KAPI.x1, KAPI.y0]), E_MAX = egim([KAPI.x0, KAPI.y1]);
/** s'den eğimi m olan ışında x'teki y */
const isinY = (m: number, x: number) => S[1] + m * (x - S[0]);
const isinX = (m: number, y: number) => S[0] + (y - S[1]) / m;
/** yelpaze (eğim aralığı [a, b]) çokgeni, kapı düzleminden ileri */
const yelpaze = (a: number, b: number): P2[] => [[isinX(a, KAPI.y0) < KAPI.x1 ? KAPI.x1 : isinX(a, KAPI.y0), isinY(a, Math.max(KAPI.x1, isinX(a, KAPI.y0)))], [3000, isinY(a, 3000)], [isinX(b, 3200), 3200], [KAPI.x0, isinY(b, KAPI.x0)]];
const YELPAZE = yelpaze(E_MIN, E_MAX);
const yolD = (q: P2[]) => `M${pS(q).split(" ").join(" L")}Z`;

export const LM = {
  tavan: "#25264a", kaburga: "#1c1d3a", duvar: "#3c3f66", duvarAlt: "#30335a", siva: "#4a4a72", tugla: "#4c4060", tuglaDerz: "#2a2644",
  zemin: "#2a2a46", zeminIsik: ["#c48e74", "#a07862"] as const, kapiKanat: "#3a3250", kapiPano: "#2e2844", kasa: "#2a2440", acik: ["#f4dcc6", "#efd0b6", "#e4bc98"] as const,
  isik: ["#efd0b6", "#e4bc98", "#c48e74"] as const, hale: "#e0a070", toz: "#f2d6bc",
  ortuIsik: ["#e6cdb6", "#cfae98", "#b08a80"] as const, ortu: ["#8a7aa6", "#6a5f8c", "#4a4276"] as const, ortuKenar: "#c9a0a6",
  ceket: "#4e4052", ceketGolge: "#352c40", ceketIsik: "#7e6060", atki: "#5a4a52", atkiIsik: "#b08c76", pantolon: "#2f2b3e", tahta: "#3e3040", tahtaIsik: "#8a6a62",
  tarama: "#221f3c",
};
const ELIASBERG_ISIKTA: YuzPalet = {
  ten: "#cfa48c", tenOrta: "#a37a70", tenDerin: "#7a5662", yansima: ["#b88a74", "#c89c80"], kenar: "#f4d2b4", kontur: "#3a2630", tarama: "#6a4450",
  sac: "#4a3a3a", sacIsik: "#806658", sacKontur: "#1e1618", dudak: "#9a6866", agizIc: "#3a222a", gozAk: "#d4bcb0", iris: "#4b3a40", bebek: "#1d1519", kas: "#4a3436", parilti: "#f4e0cc",
};
const EL_ISIK: GravurPalet = { isik: "#e4bc98", golge: "#b88a74", konturYuk: "#5a3e3a", konturIsik: "#a8836c", kenar: "#f0c4a8", tarama: "#6a4f40", manset: "#4a4276", mansetGolge: "#352c40" };
const EL_E: GravurPalet = { isik: "#d6aa8c", golge: "#9c7466", konturYuk: "#4a3438", konturIsik: "#9a7a70", kenar: "#f0c4a8", tarama: "#5a4040", manset: "#3e3446", mansetGolge: "#2a2236" };

// ---- Eliasberg geometrisi (ekran) ----
const YUZ = { x: 700, y: 612, H: 235 };
const govdeYol: P2[] = [[492, 1265], [498, 1020], [510, 840], [536, 776], [596, 742], [655, 726], [745, 726], [806, 742], [866, 776], [892, 840], [908, 1020], [918, 1265]];
const golgeKaynak = (q: P2[]) => { const uz = q.map((p) => [S[0] + (p[0] - S[0]) * 2.4, S[1] + (p[1] - S[1]) * 2.4] as P2); return zarf([...q, ...uz]) as P2[]; };

const Arka: React.FC = () => {
  const tugla = (x0: number, y0: number, w: number, h: number, sd: number) => {
    const d = cr([[x0, y0 + 10], [x0 + w * 0.4, y0 - 8], [x0 + w, y0 + 6], [x0 + w + 12, y0 + h * 0.6], [x0 + w - 20, y0 + h], [x0 + w * 0.3, y0 + h + 10], [x0 - 10, y0 + h * 0.5]]);
    return <g><path d={d} fill={LM.tugla} /><Kirp d={d}>{Array.from({ length: Math.ceil(h / 26) + 1 }, (_, i) => <g key={i}>
      <line x1={x0 - 20} x2={x0 + w + 20} y1={y0 + i * 26} y2={y0 + i * 26} stroke={LM.tuglaDerz} strokeWidth={2.4} />
      {Array.from({ length: Math.ceil(w / 62) + 2 }, (_, j) => <line key={j} x1={x0 - 20 + j * 62 + (i % 2) * 31 + (rnd(sd, `${i}${j}`) - 0.5) * 6} x2={x0 - 20 + j * 62 + (i % 2) * 31} y1={y0 + i * 26} y2={y0 + (i + 1) * 26} stroke={LM.tuglaDerz} strokeWidth={2} />)}
    </g>)}</Kirp><path d={d} fill="none" stroke="#2a2644" strokeWidth={2.4} /></g>;
  };
  return <g strokeLinejoin="round">
    <rect x={-20} y={-20} width={1120} height={2200} fill={LM.tavan} />
    {/* tonoz tavan: üç kaburga yayı + yay altında gravür taraması (hedefteki kemerli bodrum tavanı) */}
    {[[-60, 470, 330, -150, 1140, 300], [120, 330, 520, -40, 1140, 250], [330, 300, 700, 90, 1140, 330]].map(([x0, y0, cx, cy, x1, y1], i) => <g key={i}>
      <path d={`M${x0},${y0} Q${cx},${cy} ${x1},${y1}`} stroke={LM.kaburga} strokeWidth={14 - i * 3} fill="none" />
      <path d={`M${x0},${y0 + 8} Q${cx},${cy + 10} ${x1},${y1 + 8}`} stroke="#3a3c62" strokeWidth={2.4} fill="none" />
    </g>)}
    <Tarama sekil={[[330, 330], [1100, 260], [1100, 340], [700, 360], [330, 360]]} basamak="III" aci={72} renk={LM.tarama} aralik={9} kalinlik={2} seed={455} />
    {/* arka duvar (sıva), alt koyu şerit, döküntü yamaları, çatlaklar */}
    <path d="M330,345 Q720,300 1100,330 L1100,1075 L330,1075Z" fill={LM.duvar} />
    <rect x={330} y={890} width={790} height={190} fill={LM.duvarAlt} />
    <line x1={330} y1={890} x2={1100} y2={890} stroke="#4c5078" strokeWidth={2.4} />
    {tugla(820, 640, 210, 250, 11)}{tugla(470, 420, 120, 110, 12)}
    {[[880, 400, 930, 520, 905, 600], [560, 600, 590, 700, 570, 790]].map(([a, b, c, d, e, f], i) => <path key={i} d={`M${a},${b} L${c},${d} L${e},${f}`} stroke="#2a2a4c" strokeWidth={2} fill="none" />)}
    {/* sol duvar (kapının bulunduğu, kameraya doğru) */}
    <path d="M-20,-20 L330,345 L330,1075 L-20,1190Z" fill="#2e3056" />
    {/* zemin */}
    <path d="M-20,1190 L330,1075 L1100,1075 L1100,2120 L-20,2120Z" fill={LM.zemin} />
  </g>;
};

const Kapi: React.FC = () => <g strokeLinejoin="round">
  {/* açıklık: koridor ışığı (düz üç basamak, net kenar) */}
  <rect x={KAPI.x0} y={KAPI.y0} width={KAPI.x1 - KAPI.x0} height={KAPI.y1 - KAPI.y0} fill={LM.acik[2]} />
  <rect x={KAPI.x0 + 18} y={KAPI.y0 + 30} width={KAPI.x1 - KAPI.x0 - 30} height={KAPI.y1 - KAPI.y0 - 60} fill={LM.acik[1]} />
  <rect x={KAPI.x0 + 40} y={KAPI.y0 + 80} width={KAPI.x1 - KAPI.x0 - 70} height={KAPI.y1 - KAPI.y0 - 200} fill={LM.acik[0]} />
  {/* kasa */}
  <path d={`M${KAPI.x0 - 18},${KAPI.y0 - 26} L${KAPI.x1 + 16},${KAPI.y0 - 16} L${KAPI.x1 + 16},${KAPI.y1 + 6} L${KAPI.x1},${KAPI.y1} L${KAPI.x1},${KAPI.y0} L${KAPI.x0},${KAPI.y0 - 8} L${KAPI.x0},${KAPI.y1 + 20} L${KAPI.x0 - 18},${KAPI.y1 + 24}Z`} fill={LM.kasa} stroke="#1a1630" strokeWidth={2.4} />
  {/* kanat: içeri (kameraya doğru) açık; iç yüzü kameraya bakar → ışıksız; kilit kenarında açıklıktan gelen ince kenar */}
  <path d="M40,118 L214,214 L214,1040 L40,1110Z" fill={LM.kapiKanat} stroke="#1a1630" strokeWidth={3} />
  {[[62, 170, 196, 250, 196, 560, 62, 540], [62, 620, 196, 640, 196, 990, 62, 1040]].map((q, i) => <g key={i}>
    <path d={`M${q[0]},${q[1]} L${q[2]},${q[3]} L${q[4]},${q[5]} L${q[6]},${q[7]}Z`} fill={LM.kapiPano} stroke="#1a1630" strokeWidth={2} />
    <Tarama sekil={[[q[0], q[1]], [q[2], q[3]], [q[2], q[3] + 40], [q[0], q[1] + 40]]} basamak="III" aci={72} renk="#161228" aralik={7.5} kalinlik={1.8} seed={460 + i} />
  </g>)}
  <rect x={150} y={600} width={14} height={86} rx={6} fill="#5a4a50" stroke="#1a1630" strokeWidth={2} />
  <line x1={214} y1={214} x2={214} y2={1040} stroke={LM.isik[1]} strokeWidth={3} />
</g>;

/** örtülü biçim (yan bölme): yüzsüz, ayaksız; gölgede; seed 421 */
const Ortulu: React.FC<{ x0: number; y0: number; w: number; h: number; i: number; tahta?: boolean }> = ({ x0, y0, w, h, i, tahta = true }) => {
  const r = (k: string) => rnd(421, `${k}${i}`);
  const ust: P2[] = [[x0, y0 + h * 0.75], [x0 + w * 0.06, y0 + h * 0.3], [x0 + w * 0.18, y0 + h * (0.12 + r("a") * 0.1)], [x0 + w * 0.42, y0 + h * 0.28], [x0 + w * 0.62, y0 + h * (0.18 + r("b") * 0.1)], [x0 + w * 0.85, y0 + h * 0.36], [x0 + w, y0 + h * 0.62]];
  const d = cr([...ust, [x0 + w + 6, y0 + h], [x0 - 6, y0 + h]]);
  return <g>
    {tahta && <rect x={x0 - 12} y={y0 + h - 4} width={w + 24} height={22} fill="#2a2440" stroke="#1a1630" strokeWidth={2} />}
    <path d={d} fill="#3a3462" stroke="#1a1832" strokeWidth={2.4} />
    <Kirp d={d}>
      {[0.25, 0.5, 0.72].map((t, j) => <g key={j}><path d={`M${x0 + w * t},${y0 + h * 0.3} Q${x0 + w * (t + 0.09)},${y0 + h * 0.65} ${x0 + w * (t - 0.04)},${y0 + h}`} stroke="#24203f" strokeWidth={5 + j * 3} fill="none" />
        <Tarama sekil={[[x0 + w * t - 6, y0 + h * 0.35], [x0 + w * t + 10, y0 + h * 0.35], [x0 + w * t + 8, y0 + h], [x0 + w * t - 10, y0 + h]]} basamak="III" aci={72} renk={LM.tarama} aralik={7.5} kalinlik={1.6} seed={421 + i * 9 + j} /></g>)}
    </Kirp>
    <path d={cr(ust, false)} stroke={LM.ortuKenar} strokeWidth={1.8} fill="none" opacity={0.55} />
  </g>;
};

const Eliasberg: React.FC = () => {
  const govde = cr(govdeYol);
  const kolL = konikKol([548, 790], [492, 1010], [548, 1230], [128, 110, 86]);
  const kolR = konikKol([862, 790], [968, 985], [905, 1095], [130, 112, 88]);
  // dizi kalkık bacak (sağ): kalçadan dize uyluk; diz üstünde el (dayalı)
  const uyluk = cr([[760, 1215], [810, 1120], [930, 1068], [1010, 1092], [1000, 1160], [880, 1220], [800, 1270]]);
  const atki = cr([[630, 712], [700, 704], [770, 714], [784, 760], [700, 778], [618, 764]]);
  const atkiUc = cr([[648, 766], [694, 770], [690, 880], [662, 888], [650, 830]]);
  const yakaL = cr([[600, 760], [660, 780], [668, 960], [640, 1000], [596, 880]]), yakaR = cr([[800, 760], [742, 784], [738, 960], [770, 990], [812, 870]]);
  const boyun = cr([[664, 640], [746, 640], [752, 738], [702, 756], [658, 738]]); // çenenin içinden geçer, kulak arkasına çıkar (delik yok)
  const sil = <><path d={govde} /><path d={kolL.d} /><path d={kolR.d} /><path d={uyluk} /></>;
  return <g strokeLinejoin="round">
    {/* bacak + kollar gövdenin ARKASINDA (omuz başlığı gövde silüetinin parçası) */}
    <path d={uyluk} fill={LM.pantolon} stroke="#16131f" strokeWidth={3} />
    <path d={kolR.d} fill={LM.ceket} stroke="#1a1426" strokeWidth={3} />
    <path d={kolL.d} fill={LM.ceket} stroke="#1a1426" strokeWidth={3} />
    <path d={govde} fill={LM.ceket} stroke="#1a1426" strokeWidth={3} />
    {/* ışıktan uzak (sağ) yarı koyu + gravür taraması; ışığa bakan kenarlar sıcak (geniş hilal, levhanın yönünde) */}
    <Kirp d={govde}><path d="M705,720 Q760,900 720,1270 L960,1270 L960,700Z" fill={LM.ceketGolge} />
      <Tarama sekil={[[720, 760], [940, 760], [940, 1270], [720, 1270]]} basamak="III" aci={72} renk="#18121f" aralik={6.5} kalinlik={1.8} seed={471} /></Kirp>
    <Kirp d={kolR.d}><rect x={850} y={760} width={200} height={400} fill={LM.ceketGolge} /><Tarama sekil={[[860, 780], [1050, 780], [1050, 1150], [860, 1150]]} basamak="III" aci={72} renk="#18121f" aralik={6.5} kalinlik={1.8} seed={472} /></Kirp>
    {/* iç kıvrımlar: dirsek, yaka altı, düğme hattı */}
    <path d="M478,1000 q22,10 30,34" stroke="#1a1426" strokeWidth={2.4} fill="none" />
    <path d="M955,975 q-20,16 -22,40" stroke="#1a1426" strokeWidth={2.4} fill="none" />
    <path d="M565,770 Q548,840 540,920" stroke="#1a1426" strokeWidth={2.2} fill="none" />
    <path d="M845,770 Q860,840 868,920" stroke="#1a1426" strokeWidth={2.2} fill="none" />
    {[1040, 1150].map((y) => <circle key={y} cx={690} cy={y} r={7} fill="#2a2030" stroke="#1a1426" strokeWidth={2} />)}
    <path d={yakaL} fill="#5a4a5a" stroke="#1a1426" strokeWidth={2.4} />
    <path d={yakaR} fill={LM.ceketGolge} stroke="#1a1426" strokeWidth={2.4} />
    <Kirp d={yolD(YELPAZE)}>
      <Hilal d={govde} renk={LM.ceketIsik} dx={14} dy={9} />
      <Hilal d={kolL.d} renk={LM.ceketIsik} dx={13} dy={9} />
      <Hilal d={yakaL} renk={LM.ceketIsik} dx={8} dy={6} />
      <Hilal d={govde} renk={LM.isik[1]} dx={4} dy={3} />
    </Kirp>
    {/* boyun (kulak arkasından çene altına; yüz + boyun deliksiz) + atkı */}
    <path d={boyun} fill="#a07a70" />
    <path d={atki} fill={LM.atki} stroke="#2a1e24" strokeWidth={2.4} />
    <path d={atkiUc} fill={LM.atki} stroke="#2a1e24" strokeWidth={2.4} />
    <Kirp d={atki}>{Array.from({ length: 8 }, (_, i) => <path key={i} d={`M${626 + i * 22},${700} q6,40 0,90`} stroke="#4a3a3c" strokeWidth={2} fill="none" />)}</Kirp>
    <Kirp d={atkiUc}>{Array.from({ length: 6 }, (_, i) => <line key={i} x1={640} x2={700} y1={784 + i * 20} y2={788 + i * 20} stroke="#4a3a3c" strokeWidth={2} />)}</Kirp>
    <Hilal d={atki} renk={LM.atkiIsik} dx={14} dy={10} />
    <Hilal d={atkiUc} renk={LM.atkiIsik} dx={10} dy={6} />
    {/* dizdeki el */}
    <GravurEl bilek={[930, 1080]} aci={18} E={150} poz={GRAVUR_POZ.dayali} palet={EL_E} isik={[-0.8, -0.6]} taramaAci={72} />
    {/* yüz: ¾, kameraya; ışık soldan (aynalı: koyu düzlem ekran sağında, kenar ışığı solda), bakış aşağı-sola (ele) */}
    <g transform={`translate(${2 * YUZ.x} 0) scale(-1 1)`}>
      <LgYuz x={YUZ.x} y={YUZ.y} H={YUZ.H} rol={-4} ifade={{ kasIc: 1, goz: 0.95, agiz: 0.75, bakis: [0.5, 0.85] }} P={ELIASBERG_ISIKTA} />
    </g>
    {void sil}
  </g>;
};

/** sedye (tahta sıra) + örtü: alt üçte bir. Örtünün üst yüzü yelpazede sıcak; kameraya bakan sarkma ışıksız (mor). */
const Sedye: React.FC<{ kilit?: SablonProps["kilit"] }> = ({ kilit }) => {
  const ust: P2[] = [[96, 1330], [190, 1292], [330, 1268], [470, 1252], [600, 1232], [760, 1226], [900, 1236], [1100, 1248]];
  const kenar: P2[] = [[1100, 1560], [900, 1540], [720, 1520], [600, 1500], [470, 1488], [330, 1470], [190, 1448], [100, 1430]];
  const sark: P2[] = [[1100, 1820], [930, 1800], [760, 1790], [620, 1760], [470, 1720], [320, 1690], [190, 1640], [110, 1580]];
  const ustD = cr([...ust, ...kenar], true), sarkD = cr([...kenar, ...sark.slice().reverse()], true);
  // el: örtünün yakın kenarından sarkar (bilek kenarın altında), parmaklar aşağı; ele giden ışın Eliasberg'in solundan geçer
  const bilek: P2 = [520, 1500], aci = 98;
  if (kilit) { kilit.push({ ad: "el", p: [534, 1640 - KAY], tur: "dokunus" }); kilit.push({ ad: "yuz", p: [YUZ.x, YUZ.y - KAY], tur: "yuz" }); }
  const segirme: GravurPoz = { parmak: [{ a: -6, b: 48, k: 0.9 }, { a: -1, b: 22, k: 0.95 }, { a: 3, b: 26, k: 0.93 }, { a: 8, b: 30, k: 0.9 }], bas: { a: -26, b: 8 } };
  return <g strokeLinejoin="round">
    {/* tahta sıra: üst tahta ön yüzü + ayaklar (sol uç görünür) */}
    <path d="M40,1430 L130,1380 L130,1418 L40,1470Z" fill={LM.tahta} stroke="#1a1426" strokeWidth={2.4} />
    {[[70, 1460], [118, 1420]].map(([x, y], i) => <rect key={i} x={x} y={y} width={26} height={220 - i * 30} fill={LM.tahta} stroke="#1a1426" strokeWidth={2.4} />)}
    <line x1={40} y1={1430} x2={130} y2={1380} stroke={LM.tahtaIsik} strokeWidth={3} />
    <ellipse cx={540} cy={1880} rx={620} ry={60} fill="#1c1b34" opacity={0.7} />
    {/* sarkma (kameraya bakar: ışıksız) + kıvrımlar */}
    <path d={sarkD} fill={LM.ortu[1]} stroke="#1f1c38" strokeWidth={2.6} />
    <Kirp d={sarkD}>{[210, 395, 700, 860, 1020].map((x, i) => <g key={i}><path d={`M${x},1460 Q${x + 18 + (i % 2) * 20},1620 ${x - 6 - i * 4},1800`} stroke={LM.ortu[2]} strokeWidth={6 + (i % 3) * 5} fill="none" opacity={0.7} />
      <Tarama sekil={[[x - 10, 1480], [x + 16, 1480], [x + 12, 1800], [x - 16, 1800]]} basamak="III" aci={72} renk={LM.tarama} aralik={7.5} kalinlik={1.8} seed={480 + i} />
      <path d={`M${x + 14},1480 Q${x + 32},1620 ${x + 10},1800`} stroke={LM.ortu[0]} strokeWidth={3} fill="none" /></g>)}</Kirp>
    {/* üst yüz: gölgede mor, yelpazede sıcak (üç basamak) */}
    <path d={ustD} fill={LM.ortu[0]} stroke="#1f1c38" strokeWidth={2.6} />
    <Kirp d={ustD}>
      <Kirp d={yolD(YELPAZE)}>
        <path d={ustD} fill={LM.ortuIsik[1]} />
        <polygon points={pS(yelpaze(E_MIN + 0.12, E_MAX - 0.25))} fill={LM.ortuIsik[0]} />
      </Kirp>
      {/* kıvrımlar (gövdenin altında): koyu oluk + tarama + açık sırt */}
      {/* kıvrımlar: gövde kabartısının arasında düzensiz, sivrilen gölge oluşları (eşit şerit değil) + tek açık sırt */}
      {[[300, 1272, 250, 1460, 26], [470, 1255, 520, 1488, 18], [640, 1236, 600, 1340, 14], [610, 1360, 700, 1510, 22], [820, 1232, 790, 1330, 12], [860, 1360, 960, 1540, 26], [1010, 1250, 1060, 1380, 16]].map(([a, b, c, d, w], i) => {
        const mx = (a + c) / 2 + (i % 2 ? 28 : -22), my = (b + d) / 2;
        const sek = cr([[a, b], [mx + w * 0.6, my], [c, d], [mx - w * 0.6, my + 6]]);
        return <g key={i}><path d={sek} fill={i < 1 ? LM.ortu[2] : LM.ortuIsik[2]} opacity={0.9} />
          <path d={`M${a + 6},${b} Q${mx + w},${my - 4} ${c + 8},${d}`} stroke={i < 1 ? LM.ortu[0] : LM.ortuIsik[0]} strokeWidth={2.6} fill="none" /></g>;
      })}
      <Tarama sekil={[[96, 1300], [330, 1260], [330, 1480], [96, 1440]]} basamak="III" aci={72} renk={LM.tarama} aralik={7.5} kalinlik={1.8} seed={490} />
    </Kirp>
    {/* örtünün yakın kenarı (kalın kıvrık kenar) */}
    <path d={cr(kenar.slice().reverse(), false)} stroke={LM.ortu[2]} strokeWidth={7} fill="none" />
    {/* sarkan el: gölgeli taban + yelpaze içindeki ışık (sola bakan yüzler, sert tek kenar) */}
    <GravurEl bilek={bilek} aci={aci} E={250} poz={segirme} palet={EL_E} isik={[-0.85, -0.5]} taramaAci={72} />
    <Kirp d={yolD(yelpaze(E_MIN, E_MAX))}><GravurEl bilek={bilek} aci={aci} E={250} poz={segirme} palet={EL_ISIK} isik={[-0.85, -0.5]} taramaAci={72} /></Kirp>
    {/* bileği örten örtü kenarı (el örtünün altından çıkar) */}
    <path d={cr([[440, 1470], [520, 1486], [610, 1496], [596, 1528], [522, 1530], [462, 1514]])} fill={LM.ortu[1]} />
    <path d={cr([[440, 1470], [520, 1486], [610, 1496]], false)} stroke={LM.ortu[2]} strokeWidth={6} fill="none" />
  </g>;
};

/** ışık hacmi: yelpaze içinde çok saydam üç ışın demeti (screen) + toz (seed 707); Eliasberg'in gölgesi sağ-arkaya */
const Huzme: React.FC<{ p: number }> = ({ p }) => {
  const toz = Array.from({ length: 70 }, (_, i) => {
    const m = E_MIN + rnd(707, `m${i}`) * (1.6 - E_MIN), x = KAPI.x1 + 20 + rnd(707, `x${i}`) * 640, y = isinY(m, x) + (((p / 60) * 4 + rnd(707, `d${i}`) * 30) % 30);
    return { x, y, r: 1.6 + rnd(707, `r${i}`) * 2.2, a: 0.45 + rnd(707, `a${i}`) * 0.45 };
  });
  return <g>
    <polygon points={pS(YELPAZE)} fill={LM.hale} opacity={0.035} style={{ mixBlendMode: "screen" }} />
    {[[E_MIN + 0.02, 1.0, 0.13], [1.25, 1.38, 0.07], [1.95, 2.3, 0.1]].map(([a, b, al], i) => <polygon key={i} points={pS(yelpaze(a, b))} fill={LM.hale} opacity={al} style={{ mixBlendMode: "screen" }} />)}
    {toz.map((t, i) => <circle key={i} cx={t.x} cy={t.y} r={t.r} fill={LM.toz} opacity={t.a} />)}
  </g>;
};

/** ışıklı yüzeyler (arka): duvar ve zemin yelpazede, Eliasberg'in gölgesi hariç */
const IsikliArka: React.FC = () => {
  const gol = golgeKaynak([...govdeYol, [YUZ.x - 100, YUZ.y - 120], [YUZ.x + 100, YUZ.y - 120]]);
  return <g>
    <defs><mask id="bdGolge" maskUnits="userSpaceOnUse" x={-500} y={-500} width={2100} height={2900}><rect x={-500} y={-500} width={2100} height={2900} fill="#fff" /><polygon points={pS(gol)} fill="#000" /></mask></defs>
    <g mask="url(#bdGolge)">
      <Kirp d="M330,345 Q720,300 1100,330 L1100,1075 L330,1075Z">
        {/* yalnız düz ışınlar (eğim < 1.02) arka duvara ulaşır; dikler önce zemine çarpar */}
        <polygon points={pS(yelpaze(E_MIN, 1.02))} fill={LM.isik[2]} opacity={0.5} />
        <polygon points={pS(yelpaze(E_MIN + 0.05, 0.97))} fill={LM.isik[1]} opacity={0.35} />
      </Kirp>
      <Kirp d="M-20,1190 L330,1075 L1100,1075 L1100,1940 L-20,1940Z">
        <polygon points={pS(yelpaze(1.02, E_MAX))} fill={LM.zeminIsik[1]} opacity={0.85} />
        <polygon points={pS(yelpaze(1.9, 2.45))} fill={LM.zeminIsik[0]} />
      </Kirp>
    </g>
  </g>;
};

/** kadraj kaydırması: hedefteki el y ≈ 1590 IG alt arayüzüne düşüyordu → bütün dekor 150 px yukarı (tavan kırpılır, el y ≈ 1490) */
const KAY = 150;
export const BodrumP08: React.FC<SablonProps> = ({ p, kilit }) => (
  <LgBaski><g transform={`translate(0 ${-KAY})`}>
    <Arka />
    <IsikliArka />
    <Ortulu x0={-30} y0={1000} w={410} h={230} i={0} />
    <Ortulu x0={800} y0={930} w={300} h={200} i={1} />
    <Kapi />
    <Huzme p={p} />
    <Eliasberg />
    <Sedye kilit={kilit} />
  </g></LgBaski>
);
