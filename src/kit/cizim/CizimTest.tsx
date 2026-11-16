// ===== CizimTest — iki kalıcı çizim aracının sınama kompozisyonu (küre, silindir, kumaş kıvrımı, el) =====
// Işık sol-üstten (ekranda giden yön [0.75, 0.66]). Üst sıra: eski dil (düz dolgu + tek kalınlık stroke + doku/Tarama),
// alt sıra: yeni araçlar (MurekkepKontur / BirlesikM + TonTarama). Kare 1080×1920; 360 px'te okunurluk için ayrıca küçültülür.
import React from "react";
import { AbsoluteFill } from "remotion";
import { Tarama } from "../../doku/Tarama";
import { incElGeo, INC_POZ, kapsul } from "../sablonlar/leningrad/lgFigur";
import { BirlesikM, MurekkepCizgi, MurekkepKontur, murekkepRenk, P2 } from "./MurekkepCizgi";
import { TonTarama } from "./TonTarama";

const ISIK: P2 = [0.75, 0.66];
const KAGIT = "#e9dcc6";
const daireD = (c: P2, r: number) => `M${c[0] - r},${c[1]} a${r},${r} 0 1 0 ${2 * r},0 a${r},${r} 0 1 0 ${-2 * r},0Z`;

const Kure: React.FC<{ c: P2; r: number; yeni: boolean }> = ({ c, r, yeni }) => {
  const d = daireD(c, r), dolgu = "#b89a86";
  if (!yeni) return <g><path d={d} fill={dolgu} stroke="#2a1e22" strokeWidth={4} /><Tarama sekil={d} basamak="III" aci={132} renk="#3a2a2e" seed={3} derinlik="yakin" /></g>;
  // küre: ton = ışık yönündeki izdüşüm (lambert yaklaşığı); çizgiler küre yüzeyini saran yaylar (eksen = eğik büyük daire yayı)
  const eksen: P2[] = Array.from({ length: 13 }, (_, i) => { const t = -1.2 + (i / 12) * 2.4; return [c[0] + Math.sin(t) * r * 1.05, c[1] - r * 0.25 + (1 - Math.cos(t)) * r * 0.45] as P2; });
  const tonFn = (p: P2) => { const x = (p[0] - c[0]) / r, y = (p[1] - c[1]) / r, z = Math.sqrt(Math.max(0, 1 - x * x - y * y)); const l = 0.75 * -x + 0.66 * -y + 0.2 * z; return Math.max(0, Math.min(1, 0.4 - l * 1.1)); };
  return <g>
    <path d={d} fill={dolgu} />
    <TonTarama d={d} isik={ISIK} ton={1} renk={murekkepRenk(dolgu)} seed={11} mod="egri" eksen={eksen} tonFn={tonFn} aralik={6} kalinlik={2.4} />
    <MurekkepKontur d={d} renk={murekkepRenk(dolgu)} isik={ISIK} kalinlik={[1.2, 6]} kayip={0.7} seed={12} />
  </g>;
};

const Silindir: React.FC<{ x: number; y: number; w: number; h: number; yeni: boolean }> = ({ x, y, w, h, yeni }) => {
  const e = w * 0.16, dolgu = "#9a8ca8";
  const govde = `M${x},${y} L${x},${y + h} A${w / 2},${e} 0 0 0 ${x + w},${y + h} L${x + w},${y} Z`;
  const kapak = `M${x},${y} A${w / 2},${e} 0 1 1 ${x + w},${y} A${w / 2},${e} 0 1 1 ${x},${y}Z`;
  if (!yeni) return <g><path d={govde} fill={dolgu} stroke="#221a2a" strokeWidth={4} /><path d={kapak} fill="#c4b8d0" stroke="#221a2a" strokeWidth={4} />
    <Tarama sekil={`M${x + w * 0.55},${y} L${x + w},${y} L${x + w},${y + h} L${x + w * 0.55},${y + h}Z`} basamak="III" aci={90} renk="#2e2438" seed={4} derinlik="yakin" /></g>;
  // silindir: ton x'e göre (kosinüs), çizgiler gövdeyi saran kesit elipsleri (eksen = alt elips yayı) — biçimi izleyen eğri tarama
  const eksen: P2[] = Array.from({ length: 11 }, (_, i) => { const t = Math.PI * (i / 10); return [x + w / 2 - Math.cos(t) * w * 0.52, y + h * 0.5 + Math.sin(t) * e] as P2; });
  const tonFn = (p: P2) => { const u = (p[0] - x) / w; return Math.max(0, Math.min(1, 0.15 + 1.05 * (u - 0.35) * 1.6 + (u < 0.06 ? 0.4 : 0))); };
  return <g>
    <path d={govde} fill={dolgu} />
    <TonTarama d={govde} isik={ISIK} ton={1} renk={murekkepRenk(dolgu)} seed={21} mod="egri" eksen={eksen} tonFn={tonFn} aralik={6.5} kalinlik={2.4} />
    <path d={kapak} fill="#cfc4da" />
    <TonTarama d={kapak} isik={ISIK} ton={0.35} renk={murekkepRenk(dolgu)} seed={22} aralik={6} kalinlik={1.8} />
    <MurekkepKontur d={govde} renk={murekkepRenk(dolgu)} isik={ISIK} kalinlik={[1.5, 6]} kayip={0.5} seed={23} />
    <MurekkepKontur d={kapak} renk={murekkepRenk(dolgu)} isik={ISIK} kalinlik={[1.4, 3.5]} kayip={0.4} seed={24} />
  </g>;
};

/** kumaş: sarkan örtü parçası; iki kıvrım oluğu; oluklar koyu, sırtlar açık */
const Kumas: React.FC<{ x: number; y: number; yeni: boolean }> = ({ x, y, yeni }) => {
  const dolgu = "#d6c8b4";
  const d = `M${x},${y} C${x + 120},${y - 20} ${x + 260},${y + 20} ${x + 400},${y} L${x + 420},${y + 380} C${x + 360},${y + 410} ${x + 330},${y + 360} ${x + 280},${y + 400} C${x + 220},${y + 440} ${x + 170},${y + 380} ${x + 110},${y + 410} C${x + 60},${y + 430} ${x + 20},${y + 400} ${x - 10},${y + 390}Z`;
  const kivrim: P2[][] = [[[x + 120, y + 10], [x + 125, y + 200], [x + 110, y + 400]], [[x + 270, y + 10], [x + 290, y + 220], [x + 280, y + 395]]];
  if (!yeni) return <g><path d={d} fill={dolgu} stroke="#2a2224" strokeWidth={4} />{kivrim.map((q, i) => <polyline key={i} points={q.map((p) => p.join(",")).join(" ")} stroke="#5a4a4a" strokeWidth={4} fill="none" />)}</g>;
  // ton: oluk eksenine uzaklık (oluğun ışıktan uzak yanında koyu) + genel sağ-alt gölge
  const yakin = (p: P2) => Math.min(...kivrim.map((q) => { const yy = Math.max(q[0][1], Math.min(q[2][1], p[1])), t = (yy - q[0][1]) / (q[2][1] - q[0][1]); const qx = t < 0.5 ? q[0][0] + (q[1][0] - q[0][0]) * t * 2 : q[1][0] + (q[2][0] - q[1][0]) * (t - 0.5) * 2; return (p[0] - qx) + 6; }).map((v) => (v > 0 ? v * 0.8 : -v * 2.2)));
  const tonFn = (p: P2) => Math.max(0, Math.min(1, 1 - yakin(p) / 46)) * 0.95 + Math.max(0, (p[1] - y - 260) / 700) + Math.max(0, (p[0] - x - 360) / 120) * 0.6;
  return <g>
    <path d={d} fill={dolgu} />
    {kivrim.map((q, i) => <TonTarama key={i} d={d} isik={ISIK} ton={1} renk={murekkepRenk(dolgu)} seed={31 + i} mod="egri" eksen={q} tonFn={(p) => (i === 0 ? (p[0] < x + 200 ? tonFn(p) : 0) : p[0] >= x + 200 ? tonFn(p) : 0)} aralik={6} kalinlik={2.2} />)}
    {kivrim.map((q, i) => <MurekkepCizgi key={i} q={q.map((p) => [p[0] + 4, p[1]] as P2)} egri renk={murekkepRenk(dolgu)} kalinlik={4} ucBas={60} ucSon={90} seed={40 + i} />)}
    <MurekkepKontur d={d} renk={murekkepRenk(dolgu)} isik={ISIK} kalinlik={[1.4, 5.5]} kayip={0.5} seed={33} />
  </g>;
};

const El: React.FC<{ bilek: P2; yeni: boolean }> = ({ bilek, yeni }) => {
  const g = incElGeo(bilek, 70, 300, INC_POZ.dayali);
  const parca = (p: { q: P2[]; w: number[] }) => p.q.slice(0, -1).map((a, j) => kapsul(a, p.q[j + 1], p.w[j], p.w[j + 1]));
  const tum = [g.avuc, ...parca(g.bas), ...g.parmak.flatMap(parca)];
  const ten = "#d8b098";
  if (!yeni) return <g strokeLinejoin="round">{tum.map((d, i) => <path key={`k${i}`} d={d} fill="#3a2a2e" stroke="#3a2a2e" strokeWidth={6} />)}{tum.map((d, i) => <path key={i} d={d} fill={ten} />)}</g>;
  return <g>
    <BirlesikM d={tum} dolgu={ten} kontur={murekkepRenk(ten)} ayar={{ isik: ISIK, kalinlik: [1.4, 4.2], kayip: 0.4, seed: 51 }} />
    <TonTarama d={tum} isik={ISIK} ton={0.85} renk={murekkepRenk(ten, 0.7)} seed={52} aralik={5.5} kalinlik={1.8} gecis={[-0.05, 0.9]} mod="egri" eksen={[g.parmak[1].q[0], g.parmak[1].q[2], g.parmak[1].q[3]]} />
    {/* parmak ayrımı: öndeki parmağın ışıktan uzak kenarında kısa incelen mürekkep */}
    {g.parmak.slice(0, 3).map((p, i) => <MurekkepCizgi key={i} q={p.q.slice(0, 3).map((v) => [v[0] + p.w[1] * 0.7, v[1] + p.w[1] * 0.5] as P2)} egri renk={murekkepRenk(ten)} kalinlik={2.4} seed={60 + i} />)}
  </g>;
};

export const CizimTest: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: KAGIT }}>
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <text x={40} y={60} fontSize={30} fill="#5a4a40" fontFamily="sans-serif">ESKİ: düz dolgu + tek kalınlık + doku/Tarama</text>
      <Kure c={[200, 300]} r={150} yeni={false} />
      <Silindir x={420} y={170} w={200} h={300} yeni={false} />
      <Kumas x={660} y={160} yeni={false} />
      <El bilek={[60, 650]} yeni={false} />
      <line x1={0} y1={960} x2={1080} y2={960} stroke="#8a7a6a" strokeWidth={3} />
      <text x={40} y={1010} fontSize={30} fill="#5a4a40" fontFamily="sans-serif">YENİ: MurekkepKontur / BirlesikM + TonTarama</text>
      <Kure c={[200, 1260]} r={150} yeni />
      <Silindir x={420} y={1130} w={200} h={300} yeni />
      <Kumas x={660} y={1120} yeni />
      <El bilek={[60, 1610]} yeni />
    </svg>
  </AbsoluteFill>
);
