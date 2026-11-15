// ===== KIYI-BATARYA şablonu (Ben-my-Chree; mekanlar.md §0.10, §3; sahne-plani P04/P05/P06 V1/P10a, §12) =====
// Kaş kıyısı karst yamacı, Ocak 1917. 2.5D plakalar (kamera25d); KAYA OYUĞU = LIMAN P01 ön planındaki aynı mevzi.
// KURULU: yamac-oyuk (P04 dolly zoom), tegmen (P05). KURULMADI: top-onplan, saygi → açık hata.
// Parametreler: gorunum, gun_yuksekligi, kamera25, parilti {kare, cikis [a,b], donus [a,b]}, bulut_golgesi {bas, bit},
//   tegmen {pat: kare[]}, erler[] (tegmen görünümünde E1/E3 kartları), seed.
import React from "react";
import { interpolate } from "remotion";
import type { Plan } from "../../tipler";
import { param, Sablon, SablonProps } from "../../ortak";
import { cl, GIRIS, CIKIS } from "../../zaman";
import { izd, Kam25, kamera25, Kamera25, plaka, V3 } from "../../kamera25d";
import { RenkKaydi } from "../../../doku/Tarama";
import { BP, BulutSerit, egriYol, gokSutun, Gok5, Katman, kirik, P2, pts, rr, Tara, Isleme } from "./bmcOrtak";
import { karisim as mix } from "./renk";
import { TegmenSahne } from "./Tegmen";

type Gorunum = "yamac-oyuk" | "tegmen" | "top-onplan" | "saygi";
const KURULU: Gorunum[] = ["yamac-oyuk", "tegmen"];

// ---------- P04 dünya: yamaç kamerası (göz deniz +42, b 15°). Kamera ekseni oyuk merkezine 11.3° yukarı bakar. ----------
// Oyuk merkezi O kamera ekseninde 30 m (sahne planı: konu Z 30→60). Dolly yolu eksen boyunca geri (−30 m): dolly zoom konusu O.
const PHI = Math.atan2(6, 30) * 180 / Math.PI; // 11.31°
const O: V3 = [0, 30 * Math.sin((PHI * Math.PI) / 180), 30 * Math.cos((PHI * Math.PI) / 180)];
const geri = (d: number): V3 => [0, -d * Math.sin((PHI * Math.PI) / 180), -d * Math.cos((PHI * Math.PI) / 180)];
export const KB_KAYIT: Record<"yamac-oyuk", { ref: Kamera25; b: number }> = {
  "yamac-oyuk": { b: 15, ref: { kare: [0, 250], konum_yol: [[0, 0, 0], geri(30)], yon_yol: [[0, PHI]], lens_mm: [100], dolly_zoom: { konu: O }, odak_z: [30, 60], diyafram: 22, merkez: [540, 1020], egri: "inout", ekipman: "dolly" } },
};

// yamaç zemini: kameranın altında −3 m'den oyuk sekisine (+4.7 m, z 28) çıkan karst basamakları (eksen çerçevesine göre değil, dünya)
const zeminH = (z: number) => -3 + (7.7 * z) / 30 + Math.sin(z * 0.9) * 0.12;
// plaka y (ref kamerada, z derinliğinde) ← dünya yüksekliği
const refY = (ref: Kam25, h: number, z: number) => izd(ref, [0, h, z])!.y;

// ---------- Likya sırtları + yamaç üstü (uzak plakalar, ref px) ----------
const SirtK: React.FC<{ x0: number; x1: number; taban: number; tepeler: [number, number, number][]; renk: string; bant?: string; seed: string }> = ({ x0, x1, taban, tepeler, renk, bant, seed }) => {
  const A: P2[] = [];
  for (let x = x0; x <= x1; x += 8) { let y = taban; for (const [c, h, w] of tepeler) y -= h * Math.exp(-(((x - c) / w) ** 2)); y += Math.sin(x * 0.05 + rr(`${seed}`) * 6) * 2.5; A.push([x, y]); }
  // ön ışık (güneş kamera arkasında, sol): sola bakan (yükselen) yamaçlar sıcak bant — sürekli parçalar (min 5 nokta)
  const parca: P2[][] = []; let cur: P2[] = [];
  A.forEach((q, i) => { const lit = i > 0 && q[1] < A[i - 1][1] - 0.2; if (lit) cur.push(q); else { if (cur.length >= 5) parca.push(cur); cur = []; } });
  if (cur.length >= 5) parca.push(cur);
  return (
    <g>
      <path d={`M${x0},2400 L${pts(A)} L${x1},2400 Z`} fill={renk} />
      <polyline points={pts(A)} fill="none" stroke={mix(renk, "#ffffff", 0.12)} strokeWidth={2} />
      {bant && <polyline points={pts(A.map((v) => [v[0], v[1] + 1.5] as P2))} fill="none" stroke={bant} strokeWidth={3} opacity={0.8} />}
      {bant && parca.map((q, i) => <polyline key={i} points={pts(q.map((v) => [v[0], v[1] + 2.5] as P2))} fill="none" stroke={bant} strokeWidth={5} strokeLinecap="round" />)}
    </g>
  );
};
// karst kaya bloğu (ön ışık: üst + sol yüz ışıkta, sağ yüz gölgede) — yamaç plakalarında tekrar kullanılır
const Blok: React.FC<{ x: number; y: number; w: number; h: number; seed: string; ton?: number }> = ({ x, y, w, h, seed, ton = 0 }) => {
  const u = (k: string) => rr(`${seed}${k}`);
  const dis: P2[] = [[x, y], [x + w * 0.04, y - h * (0.55 + 0.2 * u("a"))], [x + w * (0.22 + 0.1 * u("b")), y - h * (0.92 + 0.08 * u("c"))], [x + w * (0.6 + 0.1 * u("d")), y - h], [x + w * 0.92, y - h * (0.6 + 0.2 * u("e"))], [x + w, y]];
  const kir: P2 = [x + w * (0.55 + 0.12 * u("f")), y - h * (0.62 + 0.1 * u("g"))];
  return (
    <g strokeLinejoin="round">
      <path d={`M${pts(dis)} Z`} fill={mix(BP.tasOrta, BP.tasIsik, 0.35 + ton)} stroke="#5e4c50" strokeWidth={2} />
      <path d={`M${pts([dis[3], dis[4], dis[5], [kir[0] + w * 0.05, y], kir])} Z`} fill="#4a4468" />
      <path d={`M${pts([dis[1], dis[2], dis[3]])}`} stroke={BP.kenar} strokeWidth={2.5} fill="none" />
    </g>
  );
};
const Maki: React.FC<{ x: number; y: number; r: number; seed: string }> = ({ x, y, r, seed }) => {
  const lob: P2[] = []; const n = 9;
  for (let i = 0; i <= n; i++) { const a = Math.PI + (i / n) * Math.PI, rr2 = r * (0.75 + 0.35 * rr(`${seed}${i}`)); lob.push([x + Math.cos(a) * r * 1.15, y + Math.sin(a) * rr2 * 0.85]); }
  const d = `M${x - r * 1.15},${y} ` + lob.slice(1).map((q, i) => `A${r * 0.32},${r * 0.32} 0 0 1 ${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(" ") + " Z";
  return <g>
    <path d={d} fill={mix(BP.maki, BP.makiGolge, 0.3)} stroke="#4c5470" strokeWidth={2} />
    <path d={`M${x - r * 0.2},${y} Q${x + r * 0.7},${y - r * 0.2} ${x + r * 1.15},${y} Z`} fill={BP.makiGolge} opacity={0.7} />
    {[0, 1, 2].map((i) => <path key={i} d={`M${x - r * (0.9 - i * 0.35)},${y - r * (0.35 + 0.25 * rr(`${seed}k${i}`))} q${r * 0.12},${-r * 0.3} ${r * 0.34},${-r * 0.3}`} stroke={mix(BP.maki, BP.kenar, 0.55)} strokeWidth={2.5} fill="none" />)}
    {Array.from({ length: 6 }).map((_, i) => <circle key={`n${i}`} cx={x + (rr(`${seed}nx${i}`) - 0.5) * r * 1.6} cy={y - rr(`${seed}ny${i}`) * r * 0.7} r={Math.max(1.5, r * 0.05)} fill="#4c5470" opacity={0.6} />)}
  </g>;
};
// kesilmiş çam/maki dalı (mevzi örtüsü; tasarim §4.4, LoC 20341r): gövde + iğne kümeleri, uç ışıkta
export const Dal: React.FC<{ a: P2; b: P2; k: number; seed: string }> = ({ a, b, k, seed }) => {
  const n = 9, L = Math.hypot(b[0] - a[0], b[1] - a[1]), t = Math.atan2(b[1] - a[1], b[0] - a[0]);
  return <g>
    <path d={`M${a[0]},${a[1]} Q${(a[0] + b[0]) / 2 + 20},${(a[1] + b[1]) / 2 - 15} ${b[0]},${b[1]}`} stroke="#5a4a40" strokeWidth={6 * k} fill="none" />
    {Array.from({ length: n }).map((_, i) => { const q = (i + 1) / (n + 1), c: P2 = [a[0] + (b[0] - a[0]) * q, a[1] + (b[1] - a[1]) * q], r = (0.12 + 0.1 * rr(`${seed}${i}`)) * L * 0.5;
      return <g key={i}>{Array.from({ length: 9 }).map((__, j) => { const an = t + Math.PI / 2 + (j - 4) * 0.32 + (rr(`${seed}${i}a${j}`) - 0.5) * 0.3, s2 = j % 2 ? 1 : -1;
        return <line key={j} x1={c[0]} y1={c[1]} x2={c[0] + Math.cos(an) * r * s2} y2={c[1] + Math.sin(an) * r * s2} stroke={j % 3 === 0 ? "#7d8460" : "#5c6448"} strokeWidth={3.5 * k} strokeLinecap="round" />; })}
        <circle cx={c[0] - r * 0.3} cy={c[1] - r * 0.4} r={r * 0.25} fill={mix("#7d8460", BP.kenar, 0.4)} opacity={0.6} /></g>; })}
  </g>;
};
// mevzi örtüsü kütlesi: kesilmiş çam + maki dallarından yoğun yapraklı yığın (iğne kümeleri), uçlar ışıkta; ortası açık bırakılabilir
export const Ortu: React.FC<{ alan: P2[]; n: number; r: number; seed: string }> = ({ alan, n, r, seed }) => {
  const [x0, y0] = [Math.min(...alan.map((q) => q[0])), Math.min(...alan.map((q) => q[1]))], [x1, y1] = [Math.max(...alan.map((q) => q[0])), Math.max(...alan.map((q) => q[1]))];
  const ic = (q: P2) => { let c = false; for (let i = 0, j = alan.length - 1; i < alan.length; j = i++) { const a = alan[i], b = alan[j]; if ((a[1] > q[1]) !== (b[1] > q[1]) && q[0] < ((b[0] - a[0]) * (q[1] - a[1])) / (b[1] - a[1]) + a[0]) c = !c; } return c; };
  const K: { c: P2; r: number; i: number }[] = [];
  for (let i = 0; i < n * 4 && K.length < n; i++) { const c: P2 = [x0 + rr(`${seed}x${i}`) * (x1 - x0), y0 + rr(`${seed}y${i}`) * (y1 - y0)]; if (ic(c)) K.push({ c, r: r * (0.6 + 0.6 * rr(`${seed}r${i}`)), i }); }
  K.sort((a, b) => a.c[1] - b.c[1]);
  return <g>{K.map(({ c, r: rk, i }) => <g key={i}>
    <circle cx={c[0]} cy={c[1]} r={rk * 0.85} fill={i % 3 ? "#4e5640" : "#5c6448"} />
    {Array.from({ length: 14 }).map((_, j) => { const an = (j / 14) * Math.PI * 2 + rr(`${seed}a${i}`) * 3, L = rk * (0.9 + 0.4 * rr(`${seed}l${i}${j}`)); return <line key={j} x1={c[0]} y1={c[1]} x2={c[0] + Math.cos(an) * L} y2={c[1] + Math.sin(an) * L} stroke={an > 3.4 && an < 6 ? "#7d8460" : "#4a5238"} strokeWidth={3.2} strokeLinecap="round" />; })}
    <path d={`M${c[0] - rk * 0.7},${c[1] - rk * 0.4} A${rk},${rk} 0 0 1 ${c[0] + rk * 0.1},${c[1] - rk * 0.9}`} stroke={mix("#7d8460", BP.kenar, 0.5)} strokeWidth={3} fill="none" />
  </g>)}</g>;
};
const Ot: React.FC<{ x: number; y: number; L: number; ruz: number; t: number; seed: string; n?: number; w?: number }> = ({ x, y, L, ruz, t, seed, n = 6, w = 3 }) => (
  <g>{Array.from({ length: n }).map((_, j) => { const l = L * (0.6 + 0.5 * rr(`${seed}${j}`)), a = (j - n / 2) * 0.12 + ruz * 0.35 + Math.sin(t * 1.4 + j + rr(`${seed}f`) * 5) * 0.05;
    return <path key={j} d={`M${x + j * w * 1.2},${y} Q${x + j * w * 1.2 + a * l * 0.3},${y - l * 0.6} ${x + j * w * 1.2 + a * l},${y - l}`} stroke={j % 3 ? BP.ot : mix(BP.ot, BP.kenar, 0.4)} strokeWidth={w} fill="none" strokeLinecap="round" />; })}</g>
);

// oyuk yamacı plakası (z 30, 200 px/m): ağız 4.5 × 2.6 m → 900 × 520, merkez (540, 1020); dudak doğuya (sola) alçalır, kırık kenar
const AGIZ: P2[] = [[92, 1150], [120, 1010], [170, 880], [250, 800], [380, 770], [520, 762], [660, 766], [800, 786], [910, 830], [980, 920], [992, 1060], [972, 1190], [930, 1266], [700, 1282], [460, 1286], [230, 1276], [120, 1240]];
const YAMAC_UST: P2[] = [[-260, 860], ...kirik([-200, 850], [120, 760], 6, 12, "yu1"), ...kirik([120, 760], [380, 640], 6, 14, "yu2"), ...kirik([380, 640], [760, 650], 7, 14, "yu4"), ...kirik([760, 650], [1000, 760], 6, 12, "yu3"), [1340, 850]];
const OyukYamaci: React.FC<{ t: number; bulut: number }> = ({ t, bulut }) => (
  <g strokeLinejoin="round">
    {/* kaya yüzü (ön ışık, sıcak) */}
    {/* büyük fasetler: sol yüzler ışık, sağ yüzler gölge */}
    {[[[-260, 860], [-60, 820], [40, 930], [-10, 1200], [-260, 1250]], [[1020, 780], [1340, 850], [1340, 1300], [1080, 1250], [1000, 1000]]].map((q, i) =>
      <path key={i} d={`M${pts(q as P2[])} Z`} fill={i === 1 ? mix(BP.tasGolge, BP.tasOrta, 0.35) : BP.tasIsik} />)}
    <path d={`M${pts([[120, 760], [250, 700], [380, 640], [470, 650], [420, 700], [300, 760], [200, 830]])} Z`} fill={BP.tasIsik} />
    <path d={`M${pts([[760, 650], [1000, 760], [960, 800], [820, 720]])} Z`} fill={mix(BP.tasGolge, BP.tasOrta, 0.45)} />
    {/* karren: dikey erime olukları (6), seed'li boy ±%40 */}
    {[-180, -80, 30, 1040, 1150, 1260].map((x, i) => { const y0 = 760 + rr(`kr${i}`) * 40, L = 260 * (0.6 + 0.8 * rr(`krL${i}`)); return <g key={i}>
      <path d={`M${x - 9},${y0} L${x + (rr(`kre${i}`) - 0.5) * 30},${y0 + L} L${x + 9},${y0} Z`} fill={BP.tasGolge} />
      <path d={`M${x - 9},${y0} L${x - 4 + (rr(`kre${i}`) - 0.5) * 30},${y0 + L}`} stroke={BP.kenar} strokeWidth={3} /></g>; })}
    {/* kızıl toprak cepleri */}
    {[[-120, 1080, 60], [1120, 1120, 50]].map(([x, y, r], i) => <path key={i} d={egriYol([[x - r, y], [x - r * 0.2, y - r * 0.45], [x + r, y - r * 0.1], [x + r * 0.3, y + r * 0.35]])} fill={BP.toprak} />)}
    {/* ağız: dış dudak gölgesi, iç karanlık, üst dudak altı tarama III, iç köşe çapraz ≤120 px */}
    <path d={`M${pts(AGIZ)} Z`} fill={BP.tasDerin} />
    <path d={`M${pts(AGIZ.map((q) => [540 + (q[0] - 540) * 0.94, 1040 + (q[1] - 1040) * 0.92] as P2))} Z`} fill={BP.oyuk} />
    <path d={`M${pts([[260, 1010], [420, 960], [660, 958], [820, 990], [860, 1150], [720, 1236], [380, 1240], [250, 1170]])} Z`} fill="#3a3456" />
    <path d={`M${pts([[300, 1200], [420, 1170], [660, 1166], [800, 1196], [720, 1236], [380, 1240]])} Z`} fill="#463f63" />
    <path d={`M${pts([[170, 900], [250, 828], [380, 800], [520, 792], [660, 796], [800, 816], [900, 856], [940, 930], [860, 900], [700, 860], [520, 850], [360, 860], [230, 900]])} Z`} fill="#26223a" />
    <Tara d={`M${pts([[150, 900], [250, 806], [380, 776], [520, 768], [660, 772], [800, 792], [910, 836], [950, 920], [860, 900], [520, 850], [230, 900]])} Z`} aci={60} aralik={8} kalin={2.6} renk="#15131f" alfa={0.55} kutu={[150, 768, 950, 930]} />
    <Tara d="M150,900 L230,900 L240,1000 L160,1010 Z" aci={-30} aralik={8} kalin={2.6} renk="#15131f" alfa={0.5} kutu={[150, 900, 240, 1010]} />
    {/* sağa bakan iç yan duvar: arka duvarda gökten zayıf yansıma */}
    <path d={`M${pts([[880, 960], [946, 950], [960, 1180], [900, 1220], [860, 1120]])} Z`} fill="#3a3454" />
    {/* iç yan duvarlar: sol iç duvar (sağa bakar) gölgede, sağ iç duvar (sola bakar, güneş sol-arkada) sıcak */}
    <path d={`M${pts([[120, 1010], [250, 900], [300, 1040], [270, 1200], [130, 1236]])} Z`} fill="#3c3658" />
    <path d={`M${pts([[980, 920], [860, 880], [820, 1040], [850, 1200], [972, 1190]])} Z`} fill={mix(BP.tasGolge, BP.tasOrta, 0.35)} />
    <path d="M860,880 L820,1040 L850,1200" stroke={BP.kenar} strokeWidth={3} fill="none" opacity={0.7} />
    {/* sarkan dudak: yalnız alt yüzü (alçak kameradan görünen), kırık kenarlı, taramalı */}
    <path d={`M${pts([[120, 880], [250, 800], [400, 770], [560, 760], [720, 772], [880, 805], [980, 870], [900, 900], [700, 846], [520, 836], [300, 852], [170, 905]])} Z`} fill="#3e3858" stroke="#3e302b" strokeWidth={5} />
    <Tara d={`M${pts([[120, 880], [250, 800], [400, 770], [560, 760], [720, 772], [880, 805], [980, 870], [900, 900], [700, 846], [520, 836], [300, 852], [170, 905]])} Z`} aci={60} aralik={9} kalin={3.2} renk="#1c1828" alfa={0.6} kutu={[120, 760, 980, 905]} />
    <path d={`M${pts([[120, 880], [250, 800], [400, 770], [560, 760], [720, 772], [880, 805], [980, 870]])}`} stroke={BP.kenar} strokeWidth={6} fill="none" />
    {/* mevzi örtüsü: saçaktan sarkan ve yanlara dayanmış kesik dallar; ortada namlu görüş aralığı açık */}
    {[[[110, 900], [200, 1200]], [[970, 900], [880, 1210]], [[60, 1240], [230, 1080]]].map(([a2, b2], i) => <Dal key={`dal${i}`} a={a2 as P2} b={b2 as P2} k={1.6} seed={`dal${i}`} />)}
    {/* üst dudak kenarı: ışıkta kırık çizgi */}
    <path d={`M${pts(AGIZ.slice(1, 11))}`} stroke={BP.kenar} strokeWidth={4} fill="none" />
    {/* alt dudak: seki kenarı ışıkta */}
    <path d={`M${pts([[120, 1240], [230, 1276], [460, 1286], [700, 1282], [930, 1266], [972, 1190]])}`} stroke={mix(BP.tasIsik, BP.kenar, 0.4)} strokeWidth={5} fill="none" />
    {/* yamaç üst kenarı: maki + ot (yamaçta %30 maki) */}
    {[-180, -40, 120, 300, 470, 640, 820, 980, 1160, 1290].map((x, i) => rr(`ym${i}`) < 0.55 ? <Maki key={i} x={x} y={YAMAC_UST.reduce((m, q) => (Math.abs(q[0] - x) < Math.abs(m[0] - x) ? q : m), YAMAC_UST[0])[1] + 12} r={40 + rr(`ymr${i}`) * 30} seed={`ym${i}`} />
      : <Ot key={i} x={x} y={YAMAC_UST.reduce((m, q) => (Math.abs(q[0] - x) < Math.abs(m[0] - x) ? q : m), YAMAC_UST[0])[1] + 8} L={60} ruz={-0.64} t={t} seed={`yo${i}`} />)}
    {/* bulut gölgesi (P03c ile aynı bulut): sağdan sola geçer, kırık kenarlı düz koyu bant */}
    <defs><clipPath id="kbYamac"><path d={`M${pts([...YAMAC_UST, [1340, 1400], [-260, 1400]])} Z`} /></clipPath></defs>
    {bulut > 0 && bulut < 1 && <path clipPath="url(#kbYamac)" d={`M${pts(kirik([1500 - bulut * 2600, 600], [1500 - bulut * 2600 + 160, 1400], 8, 30, "bg1"))} L${2500 - bulut * 2600},1400 L${2400 - bulut * 2600},600 Z`} fill="#4c4870" opacity={0.28} />}
  </g>
);
// namlu ucu (z 30.5…31.1): ağız içinden yarım metre ışığa çıkar; parıltı = güneşin silindir üst yüzünden yansıması (yıldız yok)
const Namlu: React.FC<{ cik: number; parilti: number }> = ({ cik, parilti }) => {
  // 200 px/m; namlu ø 0.12 m → 24 px... sahne planı: uç x 520–720, ağız halkası ≈ 29 px (KB §3.3)
  const L = 200, x0 = 720 - cik * 0, y = 1000;
  return (
    <g>
      {/* gölgedeyken (cik 0) namlu oyuk karanlığına karışır: "ilk 1.5 sn oyuk boş" */}
      <path d={`M${x0},${y - 15} L${x0 - L},${y - 18} L${x0 - L},${y + 18} L${x0},${y + 15} Z`} fill={mix("#5a5670", BP.oyuk, 0.9 * (1 - cik))} stroke={mix("#3d2f2c", BP.oyuk, 0.6 * (1 - cik))} strokeWidth={3} />
      <line x1={x0 - L} x2={x0} y1={y - 12} y2={y - 10} stroke={BP.demirIsik} strokeWidth={4} opacity={0.4 + 0.6 * cik} />
      <ellipse cx={x0 - L} cy={y} rx={9} ry={19} fill={mix("#4c4a60", BP.oyuk, 0.9 * (1 - cik))} stroke={mix("#3d2f2c", BP.oyuk, 0.6 * (1 - cik))} strokeWidth={3} />
      <ellipse cx={x0 - L} cy={y} rx={4.5} ry={10} fill="#1d1a2c" />
      <path d={`M${x0 - L - 2},${y - 19} A9,19 0 0 1 ${x0 - L + 8},${y - 4}`} stroke={BP.demirIsik} strokeWidth={3} fill="none" opacity={cik} />
      {parilti > 0 && <g>
        <ellipse cx={x0 - L * 0.62} cy={y - 12} rx={46 * parilti + 6} ry={16 * parilti + 3} fill="#ffae2e" />
        <ellipse cx={x0 - L * 0.62} cy={y - 12} rx={32 * parilti + 3} ry={10 * parilti + 2} fill="#ffc44a" /><ellipse cx={x0 - L * 0.62} cy={y - 12} rx={12 * parilti + 2} ry={4 * parilti + 1} fill={BP.cakim} />
        <line x1={x0 - L * 0.62 - 80 * parilti} x2={x0 - L * 0.62 + 80 * parilti} y1={y - 12} y2={y - 12} stroke={BP.parilti} strokeWidth={3} strokeLinecap="round" />
      </g>}
    </g>
  );
};

// tur-4 (mekanlar §3.1/§3.3): sol-alttan sağ-üste yükselen karst yamaç diyagonali; oyuk (≤ 450 × 260 px) yamacın içinde, üstünde karren kayası
const YAMAC_D: P2[] = [[-400, 1260], ...kirik([-300, 1240], [300, 1010], 10, 16, "yd1"), ...kirik([300, 1010], [760, 760], 9, 18, "yd2"), ...kirik([760, 760], [1400, 470], 10, 18, "yd3"), [1500, 2400], [-400, 2400]];
const YamacDiyagonal: React.FC<{ t: number }> = ({ t }) => (
  <g strokeLinejoin="round">
    <path d={`M${pts(YAMAC_D)} Z`} fill={BP.tasOrta} stroke="#3e302b" strokeWidth={3} />
    {/* basamaklı tabakalar: her basamağın üst (sol) yüzü ışıkta, sağ yüzü gölgede */}
    {Array.from({ length: 9 }).map((_, i) => { const x0 = -300 + i * 190, y0 = 1250 - i * 92 + (rr(`yb${i}`) - 0.5) * 30, w = 150 + rr(`ybw${i}`) * 90, h = 46 + rr(`ybh${i}`) * 40; return <g key={`ys${i}`}>
      <path d={`M${pts([[x0, y0 + 60], [x0 + 20, y0], [x0 + w, y0 - 30], [x0 + w + 16, y0 + h]])} Z`} fill={BP.tasIsik} stroke="#3e302b" strokeWidth={2.5} />
      <path d={`M${pts([[x0 + w, y0 - 30], [x0 + w + 16, y0 + h], [x0 + w - 20, y0 + h + 20]])} Z`} fill="#3e3858" />
      <path d={`M${x0 + 20},${y0} L${x0 + w},${y0 - 30}`} stroke={BP.kenar} strokeWidth={3} /></g>; })}
    {/* karren kayası: oyuğun üstünde yükselen kütle */}
    <path d={`M${pts([[300, 930], [350, 780], [420, 700], [520, 670], [610, 640], [700, 690], [770, 800], [790, 930]])} Z`} fill={mix(BP.tasOrta, BP.tasIsik, 0.35)} stroke="#3e302b" strokeWidth={3} />
    <path d={`M${pts([[600, 610], [700, 660], [760, 780], [740, 900], [660, 900], [680, 760]])} Z`} fill={BP.tasGolge} />
    <path d="M380,720 L470,640 L600,610" stroke={BP.kenar} strokeWidth={4} fill="none" />
    <path d="M430,700 L445,760 L432,810 M520,650 L510,720 L528,770 M640,640 L655,700" stroke="#3e302b" strokeWidth={4} fill="none" />
    {/* maki (%30) seed'li loblar halinde ağızdan uzakta */}
    {Array.from({ length: 10 }).map((_, i) => { const x = -250 + i * 170 + rr(`ym${i}`) * 80, y = 1240 - (x + 250) * 0.42 + 40 + rr(`ymy${i}`) * 200; return Math.abs(x - 540) < 260 && y > 820 && y < 1300 ? null : rr(`ymt${i}`) < 0.6 ? <Maki key={`m${i}`} x={x} y={y} r={30 + rr(`ymr${i}`) * 26} seed={`ym${i}`} /> : <Ot key={`o${i}`} x={x} y={y} L={60} ruz={-0.64} t={t} seed={`yo${i}`} />; })}
  </g>
);
const YamacOyuk: React.FC<{ plan: Plan; p: number; kilit: SablonProps["kilit"] }> = ({ plan, p, kilit }) => {
  const kayit = KB_KAYIT["yamac-oyuk"], ref = kamera25(undefined, 0, kayit.ref);
  const k = kamera25(param<Partial<Kamera25>>(plan, "kamera25", {}), p, kayit.ref);
  const t = p / 60, h = param<number>(plan, "gun_yuksekligi", 22), gok = gokSutun(h);
  const pa = param<{ kare: number; cikis: [number, number]; donus: [number, number] }>(plan, "parilti", { kare: 190, cikis: [168, 186], donus: [232, 250] });
  const cik = interpolate(p, pa.cikis, [0, 1], { ...cl, easing: GIRIS }) * (1 - interpolate(p, pa.donus, [0, 1], { ...cl, easing: CIKIS }));
  const par = p < pa.cikis[1] - 2 || p > pa.donus[0] ? 0 : interpolate(p, [pa.cikis[1] - 2, pa.kare, pa.kare + 10, pa.donus[0]], [0, 1, 0.85, 0.55], { ...cl });
  const bg = param<{ bas: number; bit: number } | null>(plan, "bulut_golgesi", { bas: 0, bit: 90 });
  const bulut = bg ? interpolate(p, [bg.bas, bg.bit], [0, 1], { ...cl }) : 0;
  // zemin şeritleri: z 5…29 (ref kamera ekseninde, dünya z ≈ eksen z), her biri üst kenarı = zemin yüksekliği
  const seritler = [29, 27, 25, 23, 21, 19.5, 18, 16.5, 15, 13.5, 12, 10.5, 9, 7.5, 6, 5];
  const namluZ = 30.5 + (1 - cik) * 0.6;
  const np = plaka(ref, k, namluZ);
  kilit.push({ ad: "oyuk merkezi", p: plaka(ref, k, 30).T([540, 1030]), tur: "kurulum" }, { ad: "namlu ucu", p: np.T([530, 1020]), tur: "dokunus" });
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <RenkKaydi><Isleme aci={60}>
        <Katman r={ref} k={k} z={1e7}><Gok5 sinir={[150, 300, 420, 510]} renk={gok} y0={-2400} x0={-1200} x1={2300} seed={193} />
          <BulutSerit x0={-200} x1={420} y={240} h={30} seed="kb1" /><BulutSerit x0={560} x1={1300} y={380} h={26} seed="kb2" /><BulutSerit x0={-300} x1={200} y={470} h={14} seed="kb3" /></Katman>
        <Katman r={ref} k={k} z={6000} ek={1.4}><SirtK x0={-1400} x1={2500} taban={700} tepeler={[[-300, 40, 260], [180, 70, 240], [640, 60, 200], [1050, 80, 260], [1600, 50, 300]]} renk={mix(BP.sirt[0], BP.bugu, 0.2)} bant={BP.sirtBant} seed="lk1" />
          <rect x={-1400} y={676} width={3900} height={30} fill={BP.bugu} opacity={0.45} /></Katman>
        <Katman r={ref} k={k} z={3500} ek={1}><SirtK x0={-1400} x1={2500} taban={736} tepeler={[[-400, 40, 300], [80, 46, 200], [520, 36, 260], [980, 56, 240], [1500, 40, 260]]} renk={BP.sirt[1]} bant={BP.sirtBant} seed="lk2" />
          <rect x={-1400} y={716} width={3900} height={22} fill={BP.bugu} opacity={0.3} /></Katman>
        {/* yamaç üstü (z 60–200): kırık kaya basamakları + maki */}
        {[200, 120, 70].map((z, j) => <Katman key={z} r={ref} k={k} z={z} ek={j === 0 ? 0.8 : 0}>
          <path d={`M-1400,2400 L${pts(kirik([-1400, 752 + j * 8], [2500, 746 + j * 6], 40, 6 + j * 3, `ys${z}`))} L2500,2400 Z`} fill={mix(mix(BP.tasOrta, BP.tasIsik, 0.2), BP.sirt[1], 0.45 - j * 0.15)} />
          <path d={`M${pts(kirik([-1400, 752 + j * 8], [2500, 746 + j * 6], 40, 6 + j * 3, `ys${z}`))}`} stroke={BP.kenar} strokeWidth={2} fill="none" opacity={0.7} />
          {Array.from({ length: 16 }).map((_, i) => { const x = -1300 + i * 240 + rr(`yb${z}${i}`) * 160, yy = 760 + j * 8; return rr(`ybt${z}${i}`) < 0.55 ? <Maki key={i} x={x} y={yy} r={(14 + rr(`ybr${z}${i}`) * 12) * (1 + j * 0.5)} seed={`yb${z}${i}`} /> : <Blok key={i} x={x} y={yy + 2} w={(36 + rr(`ybw${z}${i}`) * 30) * (1 + j * 0.5)} h={(14 + rr(`ybh${z}${i}`) * 12) * (1 + j * 0.5)} seed={`yk${z}${i}`} />; })}
        </Katman>)}
        {/* oyuk yamacı (konu, z 30) + namlu ucu (30.5–31.1) */}
        <Katman r={ref} k={k} z={30}><YamacDiyagonal t={t} /><g transform="translate(540 1040) scale(0.5) translate(-540 -1040)"><OyukYamaci t={t} bulut={bulut} /></g></Katman>
        <defs><clipPath id="kbAgiz"><path d={`M${pts(AGIZ.map((q) => plaka(ref, k, 30).T([540 + (q[0] - 540) * 0.47, 1040 + (q[1] - 1040) * 0.46])))} Z`} /></clipPath></defs>
        <g clipPath="url(#kbAgiz)"><Katman r={ref} k={k} z={namluZ}><g transform="translate(540 1040) scale(0.5) translate(-540 -1040)"><Namlu cik={cik} parilti={par} /></g></Katman></g>
        {/* sekinin önü + yamaç zemin şeritleri (uzaktan yakına; her şerit kendinden sonrakini örter) */}
        {seritler.map((z, j) => {
          const y = refY(ref, zeminH(z), z), s = ref.F / z;
          const kenar: P2[] = []; const lam = (5 + 4 * rr(`zl${z}`)) * s, fz = rr(`zf${z}`) * 6.28;
          for (let x = -3000; x <= 4000; x += Math.max(6, s * 0.25)) kenar.push([x, y - 0.32 * (x - 540) + 0.07 * s * Math.sin((x / lam) * 6.28 + fz) + 0.05 * s * Math.sin((x / lam) * 17 + fz * 2) + (rr(`zk${z}${Math.round(x / Math.max(6, s * 0.25))}`) - 0.5) * 0.03 * s]);
          const ton = [mix(BP.tasOrta, BP.toprak, 0.3), BP.tasOrta, mix(BP.tasOrta, BP.tasIsik, 0.4), mix(BP.tasOrta, BP.tasGolge, 0.15)][Math.floor(rr(`zton${z}`) * 4)];
          return <Katman key={z} r={ref} k={k} z={z}>
            <path d={`M-3000,4000 L${pts(kenar)} L4000,4000 Z`} fill={ton} />
            <path d={`M-3000,4000 L${pts(kenar.map((q) => [q[0], q[1] + 0.06 * s] as P2))} L4000,4000 Z`} fill="#3e3858" />
            <path d={`M-3000,4000 L${pts(kenar.map((q) => [q[0], q[1] + 0.13 * s] as P2))} L4000,4000 Z`} fill={ton} />
            {Array.from({ length: 14 }).map((_, i) => { const x = -1200 + i * 0.9 * s + rr(`zt2${z}${i}`) * 0.5 * s, yy = y + 0.07 * s; return <line key={`tz${i}`} x1={x} y1={yy} x2={x + 0.05 * s} y2={yy + 0.05 * s} stroke={BP.tasDerin} strokeWidth={Math.max(2, 0.008 * s)} opacity={0.45} />; })}
            <polyline points={pts(kenar)} stroke={BP.kenar} strokeWidth={Math.max(2, s * 0.012)} fill="none" opacity={0.85} />
            {Array.from({ length: 15 }).map((_, i) => { const x = 540 + (i - 7) * 0.95 * s + (rr(`zb${z}${i}`) - 0.5) * 1.6 * s, tur = rr(`zt${z}${i}`);
              if (Math.abs(x - 540) < 1.2 * s && z > 18) return null; // ağzın önü açık (namlu görüş hattı)
              return tur < 0.25 ? <Maki key={i} x={x} y={y + 0.1 * s} r={(0.22 + 0.2 * rr(`zr${z}${i}`)) * s} seed={`zm${z}${i}`} />
                : tur < 0.55 ? <Blok key={i} x={x} y={y + 0.08 * s} w={(0.3 + 0.35 * rr(`zw${z}${i}`)) * s} h={(0.12 + 0.12 * rr(`zh${z}${i}`)) * s} seed={`zk${z}${i}`} />
                : <Ot key={i} x={x} y={y + 0.05 * s} L={0.22 * s} ruz={-0.64} t={t} seed={`zo${z}${i}`} w={Math.max(2, s * 0.01)} />; })}
            {Array.from({ length: 26 }).map((_, i) => <ellipse key={`c${i}`} cx={540 + (rr(`zc${z}${i}`) - 0.5) * 9 * s} cy={y + (0.12 + rr(`zcy${z}${i}`) * 0.3) * s} rx={0.05 * s} ry={0.018 * s} fill={BP.tasGolge} opacity={0.45} />)}
            {/* taze katır izi (z 21–23): toz çizgisi + U toynak izleri — tekerlek yok */}
            {false && (z === 21 || z === 23) && <g>
              <path d={`M${540 - 2.2 * s},${y + 0.18 * s} Q${540},${y + 0.12 * s} ${540 + 2.4 * s},${y + 0.2 * s}`} stroke="#c9b09a" strokeWidth={0.09 * s} fill="none" opacity={0.85} />
              {[-1.2, 0.2, 1.4].map((u, i) => <path key={i} d={`M${540 + u * s - 0.06 * s},${y + 0.2 * s} a${0.06 * s},${0.04 * s} 0 1 0 ${0.12 * s},0`} stroke="#8a7f98" strokeWidth={Math.max(2, 0.014 * s)} fill="none" />)}
            </g>}
          </Katman>;
        })}
        {/* yamaç tozu (z ≈ 15, sola sürüklenir; rüzgâr −0.64) */}
        <Katman r={ref} k={k} z={15}>{Array.from({ length: 25 }).map((_, i) => { const x = ((rr(`tz${i}`) * 1600 - t * (10 + rr(`tzv${i}`) * 10)) % 1600 + 1600) % 1600 - 260, y = 600 + rr(`tzy${i}`) * 900; return <circle key={i} cx={x} cy={y} r={3 + rr(`tzr${i}`) * 3} fill="#e8d4b0" opacity={0.55} />; })}</Katman>
      </Isleme></RenkKaydi>
    </svg>
  );
};

const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const g = param<Gorunum>(plan, "gorunum", "yamac-oyuk");
  if (!KURULU.includes(g)) throw new Error(`[KIYI-BATARYA] görünüm "${g}" kurulmadı (kurulu: ${KURULU.join(", ")}) — kalibrasyon turu 1`);
  if (g === "tegmen") return <TegmenSahne plan={plan} p={p} kilit={kilit} />;
  return <YamacOyuk plan={plan} p={p} kilit={kilit} />;
};
export const KIYI_BATARYA: Sablon = { Sahne, arsiv: () => "litografi" };
