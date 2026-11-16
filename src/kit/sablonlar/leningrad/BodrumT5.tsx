// ===== BODRUM `p08` tur-5 — yeni kit araçlarıyla (src/kit/isik + src/kit/figur + src/kit/cizim) =====
// Tur-4 (BodrumT4.tsx, elle koordinatlı figür, 5.5) DEĞİŞMEDİ. Bu dosya hedef-morg kompozisyonunu yeniden kurar:
//   sol üstte aralık kapı = TEK ışık kaynağı (koridor penceresi KAYNAK; ışık yalnız kapı yarığından; koni = yarığın iki ucu) →
//   huzme (toz) çapraz iner; ışık çokgeni `gorunurlukCokgeni` ile Eliasberg + önde sedye engeline kırpılır (elle huzme yok).
//   Arka/ duvar/ zemin ışıklı sürümü IsikKaynagi `aydinlik` katmanında (aynı çokgen + menzil sönümü). Sedye örtüsünün ışığı:
//   yalnız Eliasberg engelli çokgen (örtü kendi üst yüzünü ışıkta görür; figürün gölgesi örtüye düşer). Figür kenar ışığı: engelsiz çokgen.
// Figür: kit/figur — pozdan(poz-morg.json) gövde/omuz/kol/yüz açıları; bacaklar (diz çöküş) FK + kısalma, sol el dize, sağ el örtüye (IK).
// Saygı (O7): ölü yüzsüz, örtülü; yalnız sarkan el (dokunuş nesnesi). Görüntüde yazı yok. Kırmızı yok.
// Kadraj: hedef-morg × 1.4, y −140 (ölü elin parmak uçları IG alt bandının üstünde, y ≤ 1490).
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ArsivKatmani } from "../../../doku/ArsivKatmani";
import { GuvenliAlan, KilitNokta } from "../../../doku/GuvenliAlan";
import type { Plan } from "../../tipler";
import { rnd } from "../../../doku/sabitler";
import { MurekkepCizgi, MurekkepKontur, yolNoktalari } from "../../cizim/MurekkepCizgi";
import { TonTarama } from "../../cizim/TonTarama";
import { Figur, FigurPalet, govdeGeo } from "../../figur/Govde";
import { iskeletKur, Iskelet, Poz } from "../../figur/iskelet";
import { KenarHilal } from "../../figur/Kafa";
import { pozdan, PozJson } from "../../figur/pozdan";
import { IsikClip, isikHesapla, IsikKaynagi, IsikTanim } from "../../isik/IsikKaynagi";
import type { SablonProps } from "../../ortak";
import { IncEl, INC_POZ, serit } from "./lgFigur";
import { cr, Kirp, LgBaski, P2 } from "./lgOrtak";
import pozMorg from "./poz-morg.json";

const yolD = (q: P2[]) => `M${q.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" L")}Z`;
const ss = (a: number, b: number, x: number) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

// ---------------- mekân geometrisi (kare px) ----------------
const KAPI = { x0: 225, x1: 337, y0: 92 };
/** sol duvarın zemin çizgisi (arka köşe 535,1000 → kadraj solu 1190) */
const solZ = (x: number) => 1190 - (190 * (x + 20)) / 555;
const ARKA_ZEMIN = 1000, KOSE_X = 535;
const ZF = 1395; // Eliasberg'in diz çöktüğü zemin derinliği (önde sedyenin arkası)

// ---------------- TEK IŞIK ----------------
// koridor penceresi (kapının arkasında, sol üstte); ışık yalnız yarıktan: koni yarığın sağ üst köşesinden (eğim 0.42) sol alt köşesine (eğim 1.56)
const KAYNAK: P2 = [-700, -342];
const A0 = Math.atan(0.416), A1 = Math.atan(1.56);
const ISIK: IsikTanim = { konum: KAYNAK, menzil: 2250, renk: "#f2c79a", koni: { yon: (A0 + A1) / 2, yari: (A1 - A0) / 2 } };
const SINIR = { x: -800, y: -600, w: 2700, h: 3300 };
/** ekranda ışığın gittiği yön (kontur/tarama sözleşmesi) */
const IY: P2 = [0.8, 0.6];
/** oda: kapı düzleminin (yarık sağ pervazı) sağı — ışık yarıktan önce hiçbir yüzeye düşmez */
const ODA = `M${KAPI.x1},-600 L2000,-600 L2000,2600 L${KAPI.x0},2600 L${KAPI.x0},${solZ(KAPI.x0)} L${KAPI.x1},${solZ(KAPI.x1)}Z`;

// ---------------- palet: gölge (soğuk mor-mavi) / ışık (gül-altın) ----------------
type Pal = { tavan: string; kaburga: string; duvar: string; duvarSol: string; siva: string; tugla: string; derz: string; zemin: string; ortu: [string, string, string]; tahta: string; tarama: string; ton: number };
const KOYU: Pal = { tavan: "#25264a", kaburga: "#191a34", duvar: "#3e4270", duvarSol: "#2f325a", siva: "#4b4d7a", tugla: "#4a3d62", derz: "#25223f", zemin: "#323258", ortu: ["#4c4876", "#38345e", "#262246"], tahta: "#2c2440", tarama: "#16152e", ton: 1 };
const ACIK: Pal = { tavan: "#7a6270", kaburga: "#5a4458", duvar: "#e6bc9c", duvarSol: "#c49a86", siva: "#f0d0b2", tugla: "#c68a72", derz: "#8a5a54", zemin: "#c49278", ortu: ["#e6c4ae", "#b8908a", "#8a6a78"], tahta: "#8a6260", tarama: "#7a4a4c", ton: 0.45 };

const kirikCokgen = (cx: number, cy: number, rx: number, ry: number, sd: number, n = 18): P2[] => Array.from({ length: n }, (_, i) => {
  const a = (i / n) * Math.PI * 2, k = 0.78 + rnd(sd, `r${i}`) * 0.28 - (i % 4 === 0 ? 0.1 : 0);
  return [cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k] as P2;
});

// ---------------- arka plan (koyu ve ışıklı sürüm aynı geometri) ----------------
const ARKA_DUVAR = `M${KOSE_X},178 Q800,160 1100,186 L1100,${ARKA_ZEMIN} L${KOSE_X},${ARKA_ZEMIN}Z`;
const SOL_DUVAR = `M-20,-140 Q260,30 ${KOSE_X},178 L${KOSE_X},${ARKA_ZEMIN} L-20,${solZ(-20)}Z`;
const TAVAN = `M-20,-20 L1100,-20 L1100,186 Q800,160 ${KOSE_X},178 Q260,30 -20,-140Z`;
const ZEMIN = `M-20,${solZ(-20)} L${KOSE_X},${ARKA_ZEMIN} L1100,${ARKA_ZEMIN} L1100,1940 L-20,1940Z`;
const KABURGA: [P2, P2, P2, number][] = [[[60, -20], [300, 40], [KOSE_X, 178], 16], [[470, -20], [600, 40], [700, 172], 13], [[760, -20], [880, 60], [960, 176], 11]];

const Tugla: React.FC<{ P: Pal; cx: number; cy: number; rx: number; ry: number; sd: number; egim?: number }> = ({ P, cx, cy, rx, ry, sd, egim = 0 }) => {
  const q = kirikCokgen(cx, cy, rx, ry, sd), d = yolD(q), h = 24;
  return <g>
    <path d={d} fill={P.tugla} />
    <Kirp d={d}>
      {Array.from({ length: Math.ceil((2 * ry) / h) + 3 }, (_, i) => { const y = cy - ry - 8 + i * h; return <g key={i}>
        <line x1={cx - rx - 30} x2={cx + rx + 30} y1={y} y2={y + egim * 2 * rx} stroke={P.derz} strokeWidth={2.6} />
        {Array.from({ length: Math.ceil((2 * rx) / 56) + 2 }, (_, k) => { const x = cx - rx - 30 + k * 56 + (i % 2) * 28 + (rnd(sd, `${i}${k}`) - 0.5) * 6; return <line key={k} x1={x} x2={x} y1={y + egim * (x - cx + rx)} y2={y + h + egim * (x - cx + rx)} stroke={P.derz} strokeWidth={2.2} />; })}
      </g>; })}
      {/* sıvanın kırık kenarının tuğlaya düşen gölgesi (ışık sol-üstten) */}
      <path d={d} fill="none" stroke={P.derz} strokeWidth={9} transform="translate(4 5)" opacity={0.65} />
    </Kirp>
    <path d={d} fill="none" stroke={P === ACIK ? "#f6dcc0" : "#5e5e8c"} strokeWidth={3} />
  </g>;
};

/** yan sedyelerdeki örtülü biçimler (arka katman; yüzsüz, ayaksız, sade) */
const Ortulu: React.FC<{ P: Pal; x0: number; y0: number; w: number; h: number; i: number; ters?: boolean }> = ({ P, x0, y0, w, h, i, ters }) => {
  const X = (t: number) => (ters ? x0 + w * (1 - t) : x0 + w * t);
  const ust: P2[] = [[X(0), y0 + h * 0.85], [X(0.04), y0 + h * 0.45], [X(0.11), y0 + h * 0.16], [X(0.2), y0 + h * 0.2], [X(0.27), y0 + h * 0.42], [X(0.38), y0 + h * 0.3], [X(0.52), y0 + h * 0.26], [X(0.66), y0 + h * 0.38], [X(0.8), y0 + h * 0.4], [X(0.9), y0 + h * 0.24], [X(0.97), y0 + h * 0.34], [X(1), y0 + h * 0.62]];
  const d = cr([...ust, [X(1) + (ters ? -6 : 6), y0 + h], [X(0) + (ters ? 6 : -6), y0 + h]]);
  const bank = yolD([[x0 - 14, y0 + h - 6], [x0 + w + 14, y0 + h - 6], [x0 + w + 14, y0 + h + 30], [x0 - 14, y0 + h + 30]]);
  return <g>
    <path d={bank} fill={P.tahta} />
    <TonTarama d={bank} isik={IY} ton={0.8 * P.ton} renk={P.tarama} seed={330 + i} aci={2} aralik={5} kalinlik={1.8} />
    <path d={d} fill={P.ortu[1]} />
    <Kirp d={d}>
      {[[0.13, 0.25], [0.48, 0.3], [0.88, 0.22]].map(([t, k], j) => <path key={j} d={serit([[X(t), y0 + h * k], [X(t + 0.05), y0 + h * 0.65], [X(t + 0.02), y0 + h]], 18 + j * 4)} fill={P.ortu[2]} opacity={0.85} />)}
      <path d={serit(ust.slice(1, -1).map((p) => [p[0] + 4, p[1] + 10] as P2), 18)} fill={P.ortu[0]} opacity={0.7} />
      <TonTarama d={d} isik={IY} ton={0.75 * P.ton} renk={P.tarama} seed={321 + i} aci={4} gecis={[-0.6, 0.7]} aralik={6} kalinlik={1.9} />
    </Kirp>
    <MurekkepKontur d={d} renk="#16142c" kalinlik={[1.4, 3.6]} isik={IY} kayip={0.3} seed={326 + i} />
  </g>;
};

const Arka: React.FC<{ P: Pal }> = ({ P }) => {
  const isikli = P === ACIK;
  return <g strokeLinejoin="round">
    {/* tonoz: kaburga yaylarını izleyen eğri tarama; köşeye ve kadraj üstüne koyulaşır */}
    <path d={TAVAN} fill={P.tavan} />
    <TonTarama d={TAVAN} isik={IY} ton={0.85 * P.ton} renk={P.tarama} seed={450} mod="egri" eksen={[[-20, -60], [400, 60], [1100, 120]]} tonFn={(q) => 0.4 + 0.6 * ss(200, -20, q[1])} aralik={6} kalinlik={2.1} />
    {KABURGA.map(([a, c, b, w], i) => <g key={i}>
      <path d={`M${a[0]},${a[1]} Q${c[0]},${c[1]} ${b[0]},${b[1]}`} stroke={P.kaburga} strokeWidth={w} fill="none" />
      <path d={`M${a[0] - w * 0.6},${a[1]} Q${c[0] - w * 0.6},${c[1]} ${b[0] - w * 0.5},${b[1]}`} stroke={isikli ? "#a88a8a" : "#46487a"} strokeWidth={2.4} fill="none" />
    </g>)}
    {/* arka duvar: sıva, nem lekeleri, dökük sıvada tuğla, çatlaklar */}
    <path d={ARKA_DUVAR} fill={P.duvar} />
    <Kirp d={ARKA_DUVAR}>
      {Array.from({ length: 12 }, (_, i) => <path key={i} d={yolD(kirikCokgen(560 + rnd(461, `x${i}`) * 520, 260 + rnd(461, `y${i}`) * 640, 40 + rnd(461, `w${i}`) * 80, 18 + rnd(461, `h${i}`) * 34, 470 + i))} fill={i % 2 ? (isikli ? "#d0a48c" : "#373a66") : (isikli ? "#ecc6a8" : "#474a78")} opacity={0.55} />)}
      <TonTarama d={ARKA_DUVAR} isik={IY} ton={P.ton} renk={P.tarama} seed={462} aci={96} tonFn={(q) => 0.25 + 0.35 * ss(600, 1100, q[0]) + 0.25 * ss(500, 180, q[1])} aralik={6.5} kalinlik={2} alfa={0.7} />
      <path d={`M${KOSE_X},900 L1100,904 L1100,${ARKA_ZEMIN} L${KOSE_X},${ARKA_ZEMIN}Z`} fill={isikli ? "#b88c78" : "#30335a"} />
    </Kirp>
    <Tugla P={P} cx={940} cy={650} rx={130} ry={150} sd={11} />
    <Tugla P={P} cx={640} cy={330} rx={70} ry={58} sd={12} />
    {[[880, 260, 905, 380, 880, 470, 902, 540], [600, 560, 628, 640, 606, 720, 622, 800], [1040, 300, 1010, 420, 1030, 470, 1020, 500]].map((c, i) => <path key={i} d={`M${c[0]},${c[1]} L${c[2]},${c[3]} L${c[4]},${c[5]} L${c[6]},${c[7]}`} stroke={P.derz} strokeWidth={2.4} fill="none" />)}
    <line x1={KOSE_X} x2={1100} y1={ARKA_ZEMIN} y2={ARKA_ZEMIN} stroke={P.tarama} strokeWidth={3} />
    {/* sol duvar (kapının duvarı): tuğla görünen sıva + köşeye koyulaşan tarama */}
    <path d={SOL_DUVAR} fill={P.duvarSol} />
    <Kirp d={SOL_DUVAR}>
      <Tugla P={P} cx={440} cy={330} rx={95} ry={130} sd={13} egim={0.12} />
      <TonTarama d={SOL_DUVAR} isik={IY} ton={0.9 * P.ton} renk={P.tarama} seed={463} aci={72} gecis={[-1.2, 0.6]} aralik={6.5} kalinlik={2} />
    </Kirp>
    <line x1={KOSE_X} x2={KOSE_X} y1={178} y2={ARKA_ZEMIN} stroke={P.tarama} strokeWidth={2.4} opacity={0.8} />
    {/* zemin: taş döşeme, perspektif derzler, kameraya doğru koyulaşan tarama */}
    <path d={ZEMIN} fill={P.zemin} />
    <TonTarama d={ZEMIN} isik={[0, 1]} ton={0.85 * P.ton} renk={P.tarama} seed={464} aci={-1.5} tonFn={(q) => 0.25 + 0.5 * ss(1050, 1800, q[1])} aralik={7} kalinlik={2} />
    {[1040, 1100, 1190, 1310, 1470, 1680].map((y, i) => <line key={i} x1={-20} x2={1100} y1={y + 12} y2={y - 8} stroke={P.tarama} strokeWidth={2 + i * 0.4} opacity={0.6} />)}
    {[-300, 0, 300, 650, 1000].map((x, i) => <line key={`v${i}`} x1={600 + (x - 600) * 0.22} y1={ARKA_ZEMIN} x2={x} y2={1940} stroke={P.tarama} strokeWidth={2} opacity={0.4} />)}
    {/* arkadaki örtülü sedyeler (saygı: sade, yüzsüz) */}
    <Ortulu P={P} x0={790} y0={790} w={300} h={170} i={1} ters />
  </g>;
};

/** kapı: aralık kanat (odaya açılır, ışıksız) + kasa + yarık (ışık kaynağının göründüğü tek yer) */
const Kapi: React.FC = () => {
  const yarik = `M${KAPI.x0},${KAPI.y0} L${KAPI.x1},${KAPI.y0 + 6} L${KAPI.x1},${solZ(KAPI.x1)} L${KAPI.x0},${solZ(KAPI.x0)}Z`;
  const kanat = `M38,-40 L214,40 L218,${solZ(218) + 4} L38,${solZ(38) + 30}Z`;
  return <g strokeLinejoin="round">
    <defs><linearGradient id="b5yarik" x1="0" y1="0" x2="1" y2="0.4"><stop offset="0" stopColor="#fff6ea" /><stop offset="0.55" stopColor="#f8e2c8" /><stop offset="1" stopColor="#ecc4a2" /></linearGradient></defs>
    <path d={yarik} fill="url(#b5yarik)" />
    {/* koridor zemini ve karşı duvar: yarıktan görünen sıcak, puslu */}
    <path d={`M${KAPI.x0},${solZ(KAPI.x0) - 110} L${KAPI.x1},${solZ(KAPI.x1) - 90} L${KAPI.x1},${solZ(KAPI.x1)} L${KAPI.x0},${solZ(KAPI.x0)}Z`} fill="#d8a888" opacity={0.7} />
    {/* kasa (pervaz): sağ pervaz yarığın derinliği */}
    <path d={`M${KAPI.x0 - 16},${KAPI.y0 - 30} L${KAPI.x1 + 18},${KAPI.y0 - 20} L${KAPI.x1 + 18},${solZ(KAPI.x1 + 18) + 4} L${KAPI.x1},${solZ(KAPI.x1)} L${KAPI.x1},${KAPI.y0 + 6} L${KAPI.x0},${KAPI.y0} L${KAPI.x0},${solZ(KAPI.x0)} L${KAPI.x0 - 16},${solZ(KAPI.x0 - 16) + 4}Z`} fill="#2a2440" />
    <MurekkepKontur d={yarik} renk="#1a1430" kalinlik={[1.2, 3]} isik={IY} kayip={0.6} seed={441} />
    {/* kanat: dikey tahta, iki pano, menteşe kenarına koyulaşır; ışık almaz (kapının oda tarafı) */}
    <path d={kanat} fill="#3a3252" />
    {[[60, 30, 196, 92, 196, 470, 60, 450], [60, 540, 196, 560, 196, 1010, 60, 1060]].map((q, i) => <g key={i}>
      <path d={`M${q[0]},${q[1]} L${q[2]},${q[3]} L${q[4]},${q[5]} L${q[6]},${q[7]}Z`} fill="#2e2846" />
      <TonTarama d={yolD([[q[0], q[1]], [q[2], q[3]], [q[2], q[3] + 34], [q[0], q[1] + 34]])} isik={[0, 1]} ton={0.9} renk="#141026" seed={460 + i} aci={90} gecis={[-1.2, 0.2]} aralik={5.5} kalinlik={2} />
      <MurekkepKontur d={`M${q[0]},${q[1]} L${q[2]},${q[3]} L${q[4]},${q[5]} L${q[6]},${q[7]}Z`} renk="#141026" kalinlik={[1.2, 3]} isik={IY} seed={466 + i} />
    </g>)}
    <TonTarama d={kanat} isik={[-1, 0]} ton={0.85} renk="#141026" seed={464} aci={90} gecis={[-1.1, 0.9]} aralik={6} kalinlik={2} />
    <MurekkepKontur d={kanat} renk="#100c20" kalinlik={[2, 4.4]} isik={IY} seed={465} />
    {/* tutamak (U kulp) + kanat kenarında yarığın sıcak yansıması */}
    <path d="M150,600 Q138,640 150,700" stroke="#120e20" strokeWidth={9} fill="none" strokeLinecap="round" />
    <path d="M150,600 Q138,640 150,700" stroke="#6a5a66" strokeWidth={3} fill="none" strokeLinecap="round" />
    <line x1={214} y1={40} x2={218} y2={solZ(218)} stroke="#e4bc98" strokeWidth={3.5} />
  </g>;
};

// ---------------- önde sedye ----------------
const yF = (x: number) => 1262 + 0.19 * (x - 70); // tahtanın ön üst kenarı
const TAHTA_K = 42;
/** örtünün arka silueti (beden: baş solda, göğüs, karın, dizler, ayak uçları sağda kadraj dışına) */
const ORTU_UST: P2[] = [[150, 1218], [170, 1168], [205, 1136], [250, 1122], [290, 1128], [318, 1112], [372, 1088], [440, 1078], [512, 1084], [580, 1090], [650, 1080], [720, 1076], [790, 1088], [860, 1096], [930, 1086], [965, 1068], [1000, 1080], [1040, 1062], [1070, 1078], [1110, 1096]];
/** üst yüzün öne döndüğü kırık (tahta kenarının ~40 px üstü) */
const ORTU_KIRIK: P2[] = [[150, 1218], [220, 1250], [330, 1268], [440, 1290], [560, 1310], [680, 1336], [800, 1356], [920, 1380], [1010, 1398], [1110, 1416]];
/** etek: solda tahta kenarında biter (ölü el altından çıkar), sağda aşağı sarkar (V kırıklı) */
const ETEK: P2[] = [[1110, 1790], [1070, 1764], [1036, 1778], [990, 1730], [944, 1716], [905, 1668], [866, 1640], [820, 1584], [770, 1510], [730, 1446], [690, 1416], [650, 1386], [610, 1350], [596, 1328], [560, 1324], [520, 1318], [470, 1316], [430, 1322], [380, 1314], [300, 1300], [230, 1290], [182, 1306], [160, 1272], [150, 1218]];
const ORTU = cr([...ORTU_UST, ...ETEK], true);
const UST_YUZ = cr([...ORTU_UST, ...ORTU_KIRIK.slice().reverse()], true);
/** tümsekler (gerilim kıvrımlarının çıktığı tepeler): baş, göğüs, el, dizler, ayak uçları */
const TUMSEK: [number, number, number][] = [[250, 1124, 2], [440, 1080, 3], [720, 1078, 2], [965, 1070, 2], [1040, 1064, 2]];
const KIVRIM = TUMSEK.flatMap(([cx, cy, n], t) => Array.from({ length: n }, (_, j) => {
  const ang = (100 + (j - (n - 1) / 2) * 38 + (rnd(593, `a${t}${j}`) - 0.5) * 16) * (Math.PI / 180), L = 80 + rnd(593, `l${t}${j}`) * 90;
  const a: P2 = [cx + Math.cos(ang) * 16, cy + 10 + Math.sin(ang) * 10], c: P2 = [cx + Math.cos(ang) * L, cy + Math.sin(ang) * L];
  return { q: [a, [(a[0] + c[0]) / 2 + (j % 2 ? 10 : -10), (a[1] + c[1]) / 2], c] as P2[], w: 14 + rnd(593, `w${t}${j}`) * 10 };
}));
const ASILI: [number, number][] = [[660, 0], [742, 1], [850, 0], [930, 1], [1030, 0]];
const OLU = { bilek: [512, 1338] as P2, aci: 96, E: 142 };
const ENGEL_SEDYE: P2[] = [...ORTU_UST, [1110, 1800], [60, 1500], [60, 1250]];

const Sedye: React.FC<{ isikD: string; kilit?: SablonProps["kilit"] }> = ({ isikD, kilit }) => {
  if (kilit) kilit.push({ ad: "el", p: [OLU.bilek[0] + 6, OLU.bilek[1] + 120], tur: "dokunus" });
  const ZON = 1500, ZSAG = 1652;
  const tahtaUst = yolD([[60, yF(60) - 34], [1110, yF(1110) - 34], [1110, yF(1110)], [60, yF(60)]]);
  const tahtaOn = yolD([[60, yF(60)], [1110, yF(1110)], [1110, yF(1110) + TAHTA_K], [60, yF(60) + TAHTA_K]]);
  const ayak = (x: number, z: number, w = 34) => yolD([[x, yF(x) + TAHTA_K - 4], [x + w, yF(x + w) + TAHTA_K - 4], [x + w, z], [x, z]]);
  const kol = serit([[402, 1300], [460, 1318], [OLU.bilek[0] - 4, OLU.bilek[1] - 2]], 46, "tek");
  return <g strokeLinejoin="round">
    {/* sedye altı: ışıksız; zeminde geniş yumuşak gölge + ayak temasları */}
    <path d={yolD([[60, yF(60) + 20], [1110, yF(1110) + 20], [1110, ZSAG + 20], [60, ZON + 14]])} fill="#1b1a32" opacity={0.85} />
    <ellipse cx={560} cy={1560} rx={560} ry={60} fill="#151428" opacity={0.75} />
    {[[176, 1466, 26], [104, ZON, 36]].map(([x, z, w], i) => <g key={i}>
      <ellipse cx={x + w / 2 + 6} cy={z + 2} rx={w * 1.3} ry={8} fill="#0e0d1c" opacity={0.95} />
      <path d={ayak(x, z, w)} fill={KOYU.tahta} />
      <TonTarama d={ayak(x, z, w)} isik={IY} ton={0.85} renk="#120e1c" seed={506 + i} aci={90} gecis={[-1, 0.6]} aralik={4.6} kalinlik={1.8} />
      <MurekkepKontur d={ayak(x, z, w)} renk="#100c18" isik={IY} kalinlik={[1.4, 3.4]} seed={508 + i} />
    </g>)}
    {/* tahta: üst yüz şeridi + ön yüz (kameraya bakar; ışık arkadan → koyu) + sol uç */}
    <path d={tahtaUst} fill="#4a3c4c" />
    <TonTarama d={tahtaUst} isik={IY} ton={0.7} renk="#1a1426" seed={509} aci={10.7} aralik={5} kalinlik={1.8} />
    <path d={tahtaOn} fill={KOYU.tahta} />
    <TonTarama d={tahtaOn} isik={IY} ton={1} renk="#120e1c" seed={510} aci={10.7} tonFn={(q) => 0.55 + 0.3 * ss(yF(q[0]) + 6, yF(q[0]) + TAHTA_K, q[1])} aralik={4.4} kalinlik={1.9} />
    <MurekkepKontur d={tahtaOn} renk="#100c18" isik={IY} kalinlik={[1.4, 3.8]} seed={511} />
    <MurekkepCizgi q={[[60, yF(60) - 34], [600, yF(600) - 34]]} renk="#120e1c" kalinlik={2.6} seed={512} />
    {/* ölü önkol: örtünün altından tahtanın üst yüzüne çıkar; elin tahta ön yüzüne düşen gölgesi */}
    <Kirp d={tahtaOn}><g transform="translate(10 4)" opacity={0.75}><IncEl bilek={OLU.bilek} aci={OLU.aci} E={OLU.E} poz={INC_POZ.sarkik} ten="" golge="" kontur="" isik={[-0.8, -0.6]} golgeRenk="#0c0a14" /></g></Kirp>
    <path d={kol} fill="#9a8288" />
    <MurekkepKontur d={kol} renk="#3a2a34" isik={IY} kalinlik={[1, 3.2]} kayip={0.4} seed={513} />
    {/* sarkan ölü el: avuç içe, parmaklar bitişik ve hafif kıvrık (tırnak/iç çizgi yok); soğuk ortam ışığında (ışık sedyenin önüne düşmez) */}
    <IncEl bilek={OLU.bilek} aci={OLU.aci} E={OLU.E} poz={INC_POZ.sarkik} ten="#c4aaa6" golge="#8e7680" kontur="#2e2230" kenar="#ddc8c2" isik={[-0.8, -0.6]} murekkep={{ ton: 0.55, seed: 517 }} />
    <path d={serit([[OLU.bilek[0] - 30, yF(OLU.bilek[0]) - 1], [OLU.bilek[0] + 4, yF(OLU.bilek[0]) + 2], [OLU.bilek[0] + 34, yF(OLU.bilek[0] + 34) - 1]], 5)} fill="#120a14" opacity={0.6} />
    {/* örtü */}
    <path d={ORTU} fill="#9a94b4" />
    <Kirp d={ORTU}>
      {/* ön sarkan yüz: kameraya bakar, ışığa sırt döner → bir basamak koyu; asılı kıvrımlar (V kırıklı etek) */}
      <path d={cr([...ORTU_KIRIK, [1110, 1900], [100, 1900]])} fill="#7a7498" />
      {ASILI.map(([x, k], i) => { const y0 = ORTU_KIRIK[0][1] + ((x - 150) / 960) * 198, y1 = 1470 + ((x - 640) / 470) * 290; return <g key={i}>
        <path d={serit([[x + 4, y0], [x + 10 + k * 6, (y0 + y1) / 2], [x + 2, y1]], 20 + k * 4)} fill="#4c4670" opacity={0.85} />
        <path d={serit([[x - 16, y0 + 6], [x - 14, (y0 + y1) / 2], [x - 18, y1 - 14]], 6)} fill="#a8a2c0" opacity={0.5} />
        <MurekkepCizgi q={[[x + 4, y0 + 4], [x + 10 + k * 6, (y0 + y1) / 2], [x + 3, y1 - 6]]} egri renk="#1c1a34" kalinlik={2.6} seed={530 + i} />
      </g>; })}
      <TonTarama d={cr([...ORTU_KIRIK, [1110, 1900], [100, 1900]])} isik={IY} ton={1} renk="#1c1a36" seed={492} aci={80} tonFn={(q) => 0.2 + 0.55 * ss(1300, 1760, q[1])} aralik={7} kalinlik={1.8} alfa={0.6} />
      {/* üst yüz: gölgede taban; ışık YALNIZ çokgen içinde (figür engelli) — tümsek yamaçları ve sırtlar sıcak */}
      <path d={UST_YUZ} fill="#aca6c2" />
      <defs><filter id="b5yum" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation={9} /></filter></defs>
      <g clipPath={`url(#${isikD})`}><g filter="url(#b5yum)">
        <path d={UST_YUZ} fill="#e2c8b4" />
        {TUMSEK.map(([cx, cy], i) => <path key={i} d={cr([[cx - 110, cy + 60], [cx - 50, cy + 10], [cx + 6, cy - 2], [cx + 30, cy + 50], [cx - 10, cy + 110], [cx - 90, cy + 120]])} fill="#f0dcc6" opacity={0.85} />)}
        <path d={serit(ORTU_UST.slice(1, -1).map((p) => [p[0] + 3, p[1] + 12] as P2), 22)} fill="#f6e4d0" />
      </g></g>
      {KIVRIM.map((k, i) => <g key={i}>
        <path d={serit(k.q, k.w)} fill="#4e4874" opacity={0.5} />
        <path d={serit(k.q.map((p) => [p[0] - 7, p[1] - 4] as P2), k.w * 0.35)} fill="#e8d6c6" opacity={0.35} />
      </g>)}
      {/* ton taraması: beden boyunca yatay eğri; ışık çokgeninde seyrek, gölgede yoğun, oluklarda koyu */}
      <TonTarama d={UST_YUZ} isik={IY} ton={1} renk="#2a2648" seed={490} aci={-6}
        tonFn={(q) => { const ol = Math.max(0, ...KIVRIM.map((k) => { const m = k.q[1]; return 1 - Math.min(1, Math.hypot((q[0] - m[0]) * 0.7, q[1] - m[1]) / (k.w * 2.4)); })); return Math.min(1, 0.08 + 0.6 * ol + 0.3 * ss(1200, 1340, q[1])); }} aralik={6.5} kalinlik={1.8} alfa={0.6} />
      {KIVRIM.map((k, i) => <MurekkepCizgi key={i} q={k.q.map((p) => [p[0] + 3, p[1] + 2] as P2)} egri renk="#22203e" kalinlik={2.4} seed={520 + i} alfa={0.8} />)}
      <MurekkepCizgi q={ORTU_KIRIK} egri renk="#2a2648" kalinlik={3} seed={519} alfa={0.6} />
    </Kirp>
    <MurekkepKontur d={ORTU} renk="#1a1834" isik={IY} kalinlik={[1.2, 4.2]} kayip={0.45} seed={514} />
    {/* etek kenarı bileğin üstünden geçer: kenarın bileğe/tahtaya düşen gölgesi */}
    <path d={serit(ETEK.slice(12, 20).map((p) => [p[0], p[1] + 8] as P2), 12)} fill="#14122a" opacity={0.55} />
  </g>;
};

// ---------------- Eliasberg (kit/figur) ----------------
const PAL: FigurPalet = {
  giysi: "#6a5248", giysiGolge: "#3a2c36", pantolon: "#4a4258", pantolonGolge: "#28222f", ayakkabi: "#221c26",
  ten: "#cfa48c", tenGolge: "#94687a", kenar: "#f4d2b4", kontur: "#1e1420",
  kafa: { ten: "#cfa48c", tenGolge: "#8c665e", tenDerin: "#563a3e", kenar: "#f6d6b8", yansima: "#c89c80", sac: "#4a3a3a", sacIsik: "#8a7062", kas: "#3e2c30", gozAk: "#cdb8ac", iris: "#4b3a40", bebek: "#1d1519", dudak: "#9a6866" },
};
const B = 185;
const poz0 = pozdan(pozMorg as unknown as PozJson, { kok: [600, 1080], B, zemin: ZF }).poz;
const POZ: Poz = {
  ...poz0, hedefGoreli: false,
  // diz çöküş: sol (uzak) diz kalkık ve kameraya doğru (uyluk 0.62 kısalır; diz ve incik kameraya yakın → perspektifle 1.15 büyür),
  // ayak tabanı ZF'de; sağ (yakın) diz yerde ama gövdenin arkasında (derinde → uyluk 0.8, incik geriye 0.5; zemini y ≈ 1350, sedye arkasında)
  bacak: { sol: { kalca: 125, diz: 125, ayak: 0, kisalt: [0.62, 1.15] }, sag: { kalca: 4, diz: 100, ayak: 55, kisalt: [0.8, 0.5] } },
  // sol el (uzak) dizde: kol gövdenin önünde çizilir (el palto eteğinin üstünde); sağ el örtü kenarında (IK)
  // sağ önkol örtüye uzanır (kameraya doğru: 0.8 kısalır); el örtünün üst yüzünde → sedyeden SONRA ayrıca çizilir (sadeceKol)
  kol: { sag: { ust: -10, dirsek: 55, bilek: 25, kisalt: [1, 0.8], el: "dayali" }, sol: { ust: 0, dirsek: 45, bilek: 45, kisalt: [0.6, 0.5], el: "dayali", onde: true } },
};
export const ISK: Iskelet = iskeletKur(POZ);

const Eliasberg: React.FC<{ clipId: string; kol?: "sag" }> = ({ clipId, kol }) => (
  <Figur isk={ISK} sadeceKol={kol} P={PAL} isik={IY} isikClipId={clipId} seed={701} giysi={{ tur: "palto", boy: 2.3, basOlcek: 1.12 }} atkiRenk="#5e4c50"
    ifade={{ kas: 0.75, goz: 0.64, agiz: 0.3, gulus: -0.3, bakis: [-0.15, 0.1], yas: 1, sakal: 0.7, zayif: 0.9, sacDagin: 0.9, sacKir: "#8a7a78" }}
    katman={{
      // kalkık diz: ışığa bakan üst yüzde sıcak kenar + diz kapağı sırtı (yalnız palto eteğinin dışında; ışık çokgeniyle kırpılı)
      ust: (_c, g) => <g clipPath={`url(#${clipId})`}><g mask="url(#b5etekDis)">
        <defs><mask id="b5etekDis" maskUnits="userSpaceOnUse" x={-500} y={-500} width={2100} height={2900}><rect x={-500} y={-500} width={2100} height={2900} fill="#fff" />{g.palto && <path d={g.palto.etek} fill="#000" />}</mask></defs>
        <KenarHilal d={g.bacak.sol.parca} renk="#8a6a6a" dx={IY[0] * 0.09 * B} dy={IY[1] * 0.09 * B} alfa={0.9} />
        <ellipse cx={ISK.bacak.sol.diz[0] - 0.06 * B} cy={ISK.bacak.sol.diz[1] - 0.14 * B} rx={0.16 * B} ry={0.07 * B} fill="#7a6068" opacity={0.7} />
      </g></g>,
      on: (_c, g) => <g clipPath={`url(#${clipId})`}><KenarHilal d={[...g.govde, ...g.kol.sol.parca]} renk="#a8705a" dx={IY[0] * 0.08 * B} dy={IY[1] * 0.08 * B} alfa={0.4} /></g>,
    }} />
);

/** figür siluet çokgenleri (ışık engeli) */
const figurEngel = (isk: Iskelet): P2[][] => {
  const g = govdeGeo(isk, { tur: "palto", boy: 2.3, basOlcek: 1.12, zayif: 0.9 });
  const d = [...g.govde, ...g.kol.sag.parca, ...g.kol.sol.parca, ...g.bacak.sol.parca, ...g.bacak.sag.parca, g.boyun, ...(g.palto ? [g.palto.etek] : [])];
  const kafa = (() => { const c = g.kafa.merkez, H = g.kafa.H; return Array.from({ length: 20 }, (_, i) => [c[0] + Math.cos((i / 20) * Math.PI * 2) * 0.36 * H, c[1] + 0.08 * H + Math.sin((i / 20) * Math.PI * 2) * 0.5 * H] as P2); })();
  return [...d.flatMap((x) => yolNoktalari(x, 14)), kafa] as P2[][];
};

// ---------------- huzme çizgileri: aynı kaynaktan alt-koniler (toz ışığı yoğun bantlar) ----------------
const Bantlar: React.FC<{ clip: string }> = ({ clip }) => {
  const b = (a: number, c: number): string => { const L = 3200, p = (t: number): P2 => [KAYNAK[0] + Math.cos(t) * L, KAYNAK[1] + Math.sin(t) * L]; return yolD([KAYNAK, p(a), p(c)]); };
  return <g clipPath={`url(#${clip})`} style={{ mixBlendMode: "screen" }}>
    <defs><filter id="b5bant" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation={16} /></filter></defs>
    <g filter="url(#b5bant)">
      {[[A0 + 0.02, A0 + 0.09, 0.13], [A0 + 0.13, A0 + 0.18, 0.1], [A0 + 0.24, A0 + 0.34, 0.09]].map(([a, c, al], i) => <path key={i} d={b(a, c)} fill="#e8a878" opacity={al} />)}
    </g>
  </g>;
};

export const BodrumP08T5: React.FC<SablonProps> = ({ kilit }) => {
  const fe = figurEngel(ISK);
  const sinir = SINIR;
  // arka duvar/zemin: figür ışık ile arka duvar arasında DEĞİL (kapı derinde, figür önde) → yalnız sedye engeli (önündeki zemini karartır)
  const hArka = isikHesapla(ISIK, [ENGEL_SEDYE], sinir);
  const hSedye = isikHesapla(ISIK, fe, sinir);
  const hFigur = isikHesapla(ISIK, [], sinir);
  if (kilit) { kilit.push({ ad: "yuz", p: [ISK.atlas[0], ISK.atlas[1] - 60], tur: "yuz" }); }
  return (
    <LgBaski>
      <defs><clipPath id="b5oda"><path d={ODA} /></clipPath></defs>
      <IsikClip id="b5arka" d={hArka.d} /><IsikClip id="b5sedye" d={hSedye.d} /><IsikClip id="b5figur" d={hFigur.d} />
      <Arka P={KOYU} />
      <g clipPath="url(#b5oda)">
        <IsikKaynagi tanim={ISIK} engeller={[ENGEL_SEDYE]} sinir={sinir} hesap={hArka} id="b5isik" aydinlik={<Arka P={ACIK} />} yumusak={4}
          huzme={{ siddet: 0.3, blur: 8 }} toz={{ adet: 160, seed: 707, boy: 2.6, siddet: 0.9 }} />
        <Bantlar clip="b5arka" />
      </g>
      <Kapi />
      {/* soldaki örtülü sedye kapı kanadının ÖNÜNDE (kanat derinde, sedye bize yakın); ışık konisinin dışında */}
      <Ortulu P={KOYU} x0={20} y0={905} w={330} h={170} i={0} />
      <Eliasberg clipId="b5figur" />
      <Sedye isikD="b5sedye" kilit={kilit} />
      {/* sağ el örtünün üstünde: kol sedyenin önüne düşer (örtüye temas gölgesi) */}
      <ellipse cx={ISK.kol.sag.elUc[0] + 14} cy={ISK.kol.sag.elUc[1] + 6} rx={70} ry={14} fill="#2a2648" opacity={0.45} />
      <Eliasberg clipId="b5figur" kol="sag" />
    </LgBaski>
  );
};

/** kalibrasyon kompozisyonu (YonKaresi ile aynı sarma: Sahne → ArsivKatmani litografi; guvenli: güvenli alan + kilit noktaları) */
const PLAN_T5: Plan = { id: "P08-3", sablon: "BODRUM", sure_kare: 300, parametreler: { gorunum: "p08-t5" } };
export const LeningradBodrumT5: React.FC<{ guvenli?: boolean }> = ({ guvenli }) => {
  const p = useCurrentFrame();
  const kilit: KilitNokta[] = [];
  return (
    <AbsoluteFill style={{ backgroundColor: "#262a4e" }}>
      <ArsivKatmani mod="litografi"><AbsoluteFill><BodrumP08T5 plan={PLAN_T5} p={p} kilit={kilit} /></AbsoluteFill></ArsivKatmani>
      {guvenli && <GuvenliAlan noktalar={kilit} baslik="P08 BODRUM tur-5" />}
    </AbsoluteFill>
  );
};
