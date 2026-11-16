// ===== FigurTest — figür kiti sınama kompozisyonu (1080×1920, 60 fps; kare = sayfa) =====
// 0 ayakta (¾ sağa, palto katmanı) · 1 diz çökmüş + öne eğik, yakın kol IK ile yerdeki hedefe, baş ¾ aşağı · 2 ayakta ¾ sola, kol öne-yukarı
// (omuz kalkması), baş ¾ aşağı · 3 genel bakış (üç poz + iskelet + çapalar) · 4 yakın plan baş (yaw −35°, 0°, +35°) · 5 pozdan (ornek-poz.json)
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { MurekkepKontur, murekkepRenk } from "../cizim/MurekkepCizgi";
import { yolD } from "./geo";
import { Figur, FIGUR_PALET_ORNEK, FigurKatman, IskeletCiz } from "./Govde";
import { iskeletKur, P2, Poz, TARAFLAR } from "./iskelet";
import { pozdan, PozJson } from "./pozdan";
import ornek from "./ornek-poz.json";

export const FIGUR_TEST_SURE = 6;
const ISIK: P2 = [0.75, 0.66];
const KAGIT = "#e4d6c0", ZEMIN = "#cbb89c";

const pozA = (kok: P2, B: number, zemin: number): Poz => ({
  kok, B, zemin, yon: 1, yaw: 35, egim: 3, boyunEgim: 10, bas: { pitch: 6 },
  kol: { sag: { ust: 10, dirsek: 22, el: "sarkik" }, sol: { ust: -6, dirsek: 12, el: "sarkik" } },
  bacak: { sag: { kalca: 6, diz: 3 }, sol: { kalca: -8, diz: 6, ayak: 4 } },
});
/** diz çökmüş: yakın kol IK ile sandık üstündeki hedefe; uzak el IK ile öndeki dizin üstüne dayanır */
const pozB = (kok: P2, B: number, zemin: number, hedef: P2): Poz => {
  const p: Poz = {
    kok, B, zemin, yon: 1, yaw: 40, egim: 36, gogusEgim: 10, boyunEgim: 14, bas: { pitch: 24 },
    kol: { sag: { hedef, el: "dayali" }, sol: { ust: 40, dirsek: 70, el: "sarkik" } },
    bacak: { sag: { kalca: 92, diz: 92, ayak: 0 }, sol: { kalca: 0, diz: 110, ayak: 30 } },
  };
  const on = iskeletKur(p).bacak.sag; // öndeki (yakın) diz
  p.kol!.sol = { hedef: [on.diz[0] + 0.05 * B, on.diz[1] - 0.3 * B], el: "dayali" };
  return p;
};
/** sandık: hedef üst yüzünde */
const Sandik: React.FC<{ x: number; ust: number; zemin: number; B: number }> = ({ x, ust, zemin, B }) => {
  const d = `M${x - 0.7 * B},${ust} L${x + 0.9 * B},${ust} L${x + 0.9 * B},${zemin} L${x - 0.7 * B},${zemin}Z`;
  return <g><path d={d} fill="#8a6a4e" /><path d={`M${x - 0.7 * B},${ust + 0.35 * B} L${x + 0.9 * B},${ust + 0.35 * B}`} stroke="#5a412e" strokeWidth={4} /><MurekkepKontur d={d} renk={murekkepRenk("#8a6a4e")} isik={ISIK} kalinlik={[1.5, 5]} seed={4} /></g>;
};
const pozC = (kok: P2, B: number, zemin: number): Poz => ({
  kok, B, zemin, yon: -1, yaw: 30, egim: 2, boyunEgim: 12, bas: { pitch: 26, yaw: -8 },
  kol: { sol: { ust: 172, dirsek: 28, bilek: 10, el: "tutus" }, sag: { ust: 4, dirsek: 16 } },
  bacak: { sol: { kalca: 5, diz: 2 }, sag: { kalca: -7, diz: 8 } },
});

/** giyim katmanı örneği: palto eteği çapalardan (kemer → diz altı); kumaş kıvrımı sonraki adım */
const palto: FigurKatman = {
  ust: (c, g) => {
    const B = g.kafa.H, alt = Math.max(c.diz.sol[1], c.diz.sag[1]) + 0.35 * B;
    const m = (c.kemer.sol[0] + c.kemer.sag[0]) / 2;
    const d = yolD([c.kemer.sol, c.kemer.sag, [c.kemer.sag[0] + 0.08 * B, c.kemer.sag[1] + 0.5 * B], [c.kemer.sag[0] + 0.3 * B, alt], [m + 0.1 * B, alt + 0.04 * B], [m - 0.1 * B, alt + 0.02 * B], [c.kemer.sol[0] - 0.3 * B, alt], [c.kemer.sol[0] - 0.08 * B, c.kemer.sol[1] + 0.5 * B]]);
    return <g><path d={d} fill={FIGUR_PALET_ORNEK.giysi} /><MurekkepKontur d={d} renk={murekkepRenk(FIGUR_PALET_ORNEK.giysi, 0.74)} isik={ISIK} kalinlik={[1.5, 5]} kayip={0.5} seed={9} /></g>;
  },
};

const Zemin: React.FC<{ y: number }> = ({ y }) => <rect x={0} y={y} width={1080} height={1920 - y} fill={ZEMIN} />;
const Etiket: React.FC<{ x: number; y: number; t: string }> = ({ x, y, t }) => <text x={x} y={y} fontSize={30} fill="#5a4a40" fontFamily="sans-serif">{t}</text>;

const Sayfa: React.FC<{ n: number }> = ({ n }) => {
  if (n === 0) {
    const isk = iskeletKur(pozA([520, 0], 205, 1740));
    return <><Zemin y={1740} /><Figur isk={isk} isik={ISIK} katman={palto} ifade={{ yas: 0.4, sakal: 0.4 }} /><Etiket x={40} y={70} t="0 · ayakta ¾ sağ (palto katmanı)" /></>;
  }
  if (n === 1) {
    const hedef: P2 = [800, 1330];
    const isk = iskeletKur(pozB([450, 0], 215, 1740, hedef));
    return <><Zemin y={1740} /><Sandik x={850} ust={1332} zemin={1740} B={215} /><Figur isk={isk} isik={ISIK} ifade={{ yas: 0.5, sakal: 0.5, kas: 0.4, bakis: [0.5, 0.8] }} />
      <circle cx={hedef[0]} cy={hedef[1]} r={10} fill="none" stroke="#b03a2e" strokeWidth={3} />
      <Etiket x={40} y={70} t={`1 · diz çökmüş, IK hata ${isk.kol.sag.hata.toFixed(1)} px`} /></>;
  }
  if (n === 2) {
    const isk = iskeletKur(pozC([560, 0], 205, 1740));
    return <><Zemin y={1740} /><Figur isk={isk} isik={ISIK} katman={palto} ifade={{ yas: 0.3, bakis: [-0.3, 0.6] }} /><Etiket x={40} y={70} t="2 · ¾ sol, kol yukarı (omuz kalkar)" /></>;
  }
  if (n === 3) {
    const B = 105, z = 1500, hedef: P2 = [565, 1300];
    const a = iskeletKur(pozA([170, 0], B, z)), b = iskeletKur(pozB([400, 0], B, z, hedef)), c = iskeletKur(pozC([880, 0], B, z));
    const cap = (isk: ReturnType<typeof iskeletKur>) => [...TARAFLAR.flatMap((t) => [isk.kol[t].omuz, isk.kol[t].dirsek, isk.bacak[t].diz])];
    return <><Zemin y={z} />
      {[a, b, c].map((isk, i) => <g key={i}><Figur isk={isk} isik={ISIK} katman={i === 1 ? undefined : palto} /><g opacity={0.65}><IskeletCiz isk={isk} /></g>{cap(isk).map((p, j) => <circle key={j} cx={p[0]} cy={p[1]} r={7} fill="none" stroke="#1f6f8b" strokeWidth={3} />)}</g>)}
      <Sandik x={590} ust={1301} zemin={z} B={B} />
      <circle cx={hedef[0]} cy={hedef[1]} r={8} fill="none" stroke="#b03a2e" strokeWidth={3} />
      <Etiket x={40} y={70} t="3 · genel: iskelet (kırmızı) + çapalar (mavi)" /></>;
  }
  if (n === 4) {
    const panel = (i: number, yaw: number) => {
      const top = i * 640, B = 330;
      const yon: 1 | -1 = yaw < 0 ? -1 : 1, govY = yaw === 0 ? 0 : 25;
      const isk = iskeletKur({ kok: [540 - yon * 30, top + 205 + 2.93 * B], B, yon, yaw: govY, boyunEgim: 8, bas: { yaw: yaw - yon * govY, pitch: 4 }, kol: { sol: { ust: 2, dirsek: 8 }, sag: { ust: 2, dirsek: 8 } } });
      return <g key={i}>
        <defs><clipPath id={`fp${i}`}><rect x={0} y={top} width={1080} height={640} /></clipPath></defs>
        <g clipPath={`url(#fp${i})`}><rect x={0} y={top} width={1080} height={640} fill={i % 2 ? "#dccdb5" : KAGIT} /><Figur isk={isk} isik={ISIK} ifade={{ yas: 0.45, sakal: 0.55, goz: 0.62, bakis: [yaw / 60, 0.2] }} /></g>
        <Etiket x={30} y={top + 50} t={`yaw ${yaw}°`} />
      </g>;
    };
    return <>{[-35, 0, 35].map((y, i) => panel(i, y))}</>;
  }
  const { poz, rapor } = pozdan(ornek as unknown as PozJson, { kok: [470, 0], B: 200, zemin: 1740 });
  const isk = iskeletKur(poz);
  return <><Zemin y={1740} /><Figur isk={isk} isik={ISIK} ifade={{ yas: 0.4, sakal: 0.4 }} /><g opacity={0.5}><IskeletCiz isk={isk} /></g>
    <Etiket x={40} y={70} t={`5 · pozdan: B kaynak ${rapor.Bkaynak.toFixed(0)}, yaw ${rapor.yaw.toFixed(0)}°`} />
    {rapor.tamamlanan.map((t, i) => <Etiket key={i} x={40} y={115 + i * 40} t={`tamamlandı: ${t}`} />)}</>;
};

export const FigurTest: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: KAGIT }}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920"><Sayfa n={Math.min(5, f)} /></svg>
    </AbsoluteFill>
  );
};
