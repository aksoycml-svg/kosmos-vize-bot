// ===== D2 — duvara düşen el gölgesinin T kola dönüşmesi (IC-ODA, mum TEK nokta ışık) =====
// Gölge elle konmaz: karakterin omuz/dirsek/el/baş/kalça noktaları rig'den alınır, dünyaya (u, h, z) çevrilir, mum alevinden
// arka duvara (z = ARKA) izdüşürülür (point light → net kenar, büyütülmüş). Dönüşüm t 0→1: kol (omuz–dirsek–el) düzleşip regülatör
// çubuğu olur (kolun eğimini korur: it-çek pompası T'yi oynatır), parmak ucu/baş gösterge kollarına uzar, gövde gölgesi direğe incelir.
// Karakter mumun ÖNÜNDEyse (z ≤ mum z) gölge arka duvara düşmez → çizilmez.
import React from "react";
import type { Poz } from "../../rig/Kukla";
import { dunyaya, elYerel } from "../../rig/kinematik";
import { KONUMLAR, KonumAdi } from "../../doku/ChappeKule";
import { P, poly } from "../../doku/sabitler";

export type GolgeTParam = { kim: string; bas: number; bit: number; donusum?: number; konum?: KonumAdi };
type Dunya = { u: number; h: number; z: number };

const lp = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

export const GolgeT: React.FC<{
  pz: Poz; z: number; isik: Dunya; arka: number; t: number; konum?: KonumAdi;
  ekranDunya: (q: P, z: number) => { u: number; h: number }; dunyaEkran: (u: number, h: number, z: number) => P;
  klip: string; renk?: string;
}> = ({ pz, z, isik, arka, t, konum = "MESAJ", ekranDunya, dunyaEkran, klip, renk = "#2a1a10" }) => {
  if (z <= isik.z + 0.05) return null;
  const k = (arka - isik.z) / (z - isik.z); // büyütme
  const duvar = (q: P): P => { const w = ekranDunya(q, z); return dunyaEkran(isik.u + k * (w.u - isik.u), isik.h + k * (w.h - isik.h), arka); };
  const omuz = duvar(dunyaya(pz, elYerel({ ...pz, shF: 0, elF: 0 }, true, [0, -178])));
  const dirsek = duvar(dunyaya(pz, elYerel(pz, true, [0, -90])));
  const el = duvar(dunyaya(pz, elYerel(pz, true, [0, 0])));
  const parmak = duvar(dunyaya(pz, elYerel(pz, true, [0, 26])));
  const bas = duvar(dunyaya(pz, [20, -450]));
  const omuzA = duvar(dunyaya(pz, [-40, -372])), kalcaO = duvar(dunyaya(pz, [42, -226])), kalcaA = duvar(dunyaya(pz, [-36, -226]));
  const b0 = duvar(dunyaya(pz, [0, -300])), b1 = duvar(dunyaya(pz, [100, -300]));
  const birim = Math.hypot(b1[0] - b0[0], b1[1] - b0[1]) / 100; // 1 rig yerel birimi duvarda kaç px
  // hedef T: boyu gövde ölçeğinden (≈ 0.8 m karşılığı, duvarda büyür), eğimi kolun dikey sapmasından (±28° sınırlı: it-çek pompası
  // T'yi sallar), merkez omuzun üstünde-önünde. Kol kısa/bükük olsa da T okunur boyda kalır.
  const kolV: P = [el[0] - omuz[0], el[1] - omuz[1]];
  const ileri = Math.sign(dirsek[0] - omuz[0] + kolV[0] + 1e-6) || 1;
  const egim = Math.max(-28, Math.min(28, (Math.atan2(kolV[1], Math.abs(kolV[0]) + 30 * birim) * 180) / Math.PI));
  const yonu: P = [ileri * Math.cos((egim * Math.PI) / 180), Math.sin((egim * Math.PI) / 180)];
  const Lr = 270 * birim;
  const C: P = [omuz[0] + ileri * Lr * 0.25, omuz[1] - Lr * 0.42];
  const TL: P = [C[0] - yonu[0] * Lr / 2, C[1] - yonu[1] * Lr / 2], TR: P = [C[0] + yonu[0] * Lr / 2, C[1] + yonu[1] * Lr / 2];
  const kol = [lp(omuz, TL, t), lp(dirsek, C, t), lp(el, TR, t)];
  const kalin = 26 * birim * (1 - t) + Lr * 0.075 * t;
  // gösterge kolları: parmak (el→parmak) ve baş yönünden hedef açılara (ChappeKule açı sözleşmesi, regülatöre göre)
  const K = KONUMLAR[konum], ra = Math.atan2(yonu[1], yonu[0]);
  const Li = Lr / 2.3;
  const hedefUc = (uc: P, a: number): P => [uc[0] + Math.cos(ra + a) * Li, uc[1] + Math.sin(ra + a) * Li];
  const sagUc = lp(parmak, hedefUc(TR, (-K.sag * Math.PI) / 180), t);
  const solUc = lp(bas, hedefUc(TL, Math.PI + (K.sol * Math.PI) / 180), t);
  // gövde → direk (dikey, merkezden kalça hizasına)
  const alt = (kalcaO[1] + kalcaA[1]) / 2, dw = Lr * 0.04;
  const govde = [lp(omuz, [C[0] + dw, C[1]], t), lp(omuzA, [C[0] - dw, C[1]], t), lp(kalcaA, [C[0] - dw, alt], t), lp(kalcaO, [C[0] + dw, alt], t)];
  const basR = 0.12 * 1150 / z * k * (1 - t) + Lr * 0.03 * t;
  const basM = lp(bas, C, t);
  return (
    <g clipPath={klip} style={{ mixBlendMode: "multiply" }} opacity={0.62}>
      <polygon points={poly(govde)} fill={renk} />
      <circle cx={basM[0]} cy={basM[1]} r={basR} fill={renk} />
      <polyline points={poly(kol)} stroke={renk} strokeWidth={kalin} fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <line x1={kol[2][0]} y1={kol[2][1]} x2={sagUc[0]} y2={sagUc[1]} stroke={renk} strokeWidth={kalin * (0.6 + 0.3 * t)} strokeLinecap="round" />
      {t > 0.02 && <line x1={lp(bas, kol[0], t)[0]} y1={lp(bas, kol[0], t)[1]} x2={solUc[0]} y2={solUc[1]} stroke={renk} strokeWidth={kalin * 0.85 * t} strokeLinecap="round" />}
    </g>
  );
};
