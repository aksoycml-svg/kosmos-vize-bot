// ===== Yarasa bombası masa propları (tasarim.md §5; MASA-YB `nesneler`) — hepsi yazısız, dil-nötr =====
// Masa ölçeği: 31.9 px/cm (dekor, cs 1; mekanlar §2.1). Tek ışık: lamba sol-üst 45° → gölge = yükseklik × (0.71, 0.71) sağ-aşağı,
// #3c3650 α .55, kenar net. Kırmızı YALNIZ mühür izinde. Amber YALNIZ kapsülde.
import React from "react";
import { interpolate, random } from "remotion";
import type { P } from "../../tipler";
import { cl, CIKIS, GIRIS } from "../../zaman";
import { Yarasa, YR } from "./Yarasa";
import { EL_CIKIS, ElSiluet } from "./El";

export const PXCM = 31.9;
export const MP = {
  zarf: "#d6c8a8", zarfCizgi: "#8a8576", not: "#e2d4b4", golgeKagit: "#a39ab0", belge: "#dccfb0", satir: "#8a7f6a",
  golge: "#3c3650", kirmizi: "#b3261e", muhurGolge: "#6f2a2e", tutacak: "#4b3a44", celik: "#8b90a0", celikGolge: "#4f5370", hat: "#2b2f45",
  tepsi: "#6e7480", bolme: "#3c3650", pamuk: "#e2d8c8", pamukGolge: "#b9b0b8", cimbiz: "#9aa0aa", murekkep: "#2b2f45", kagit: "#e6d8b9",
};
const golge = (h: number): P => [0.71 * h * PXCM, 0.71 * h * PXCM]; // h cm
type Ar = { bas: number; bit: number };
export type Nesne = { tur: "zarf" | "not" | "kapsul-set" | "kovan" | "tepsi" | "belge" | "muhur"; x: number; y: number; olcek?: number; aci?: number; [k: string]: unknown };

const Zarf: React.FC<{ n: Nesne }> = ({ n }) => {
  const w = 11 * 1.4 * PXCM, h = 14 * 1.4 * PXCM * 0.72, g = golge(0.4);
  return <g>
    <rect x={-w / 2 + g[0]} y={-h / 2 + g[1]} width={w} height={h} fill={MP.golge} opacity={0.55} />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} fill={MP.zarf} stroke={MP.zarfCizgi} strokeWidth={2.5} />
    <path d={`M${-w / 2},${-h / 2} L0,${h * 0.08} L${w / 2},${-h / 2}`} fill="none" stroke={MP.zarfCizgi} strokeWidth={2.5} strokeLinejoin="round" />
    {[0, 1, 2].map((i) => <line key={i} x1={-w * 0.12} x2={w * (0.28 - i * 0.06)} y1={h * (0.18 + i * 0.09)} y2={h * (0.18 + i * 0.09)} stroke={MP.satir} strokeWidth={5} strokeLinecap="round" />)}
  </g>;
};
const Not: React.FC<{ n: Nesne; p: number }> = ({ n, p }) => {
  const w = 9 * PXCM, h = 6 * PXCM, dus = n.dus as { kare: number } | undefined;
  const t = dus ? p - dus.kare : 99, H = t < 0 ? 4 * Math.pow(Math.min(1, -t / 14), 2) : 0; // cm yükseklik, düşüş in quad
  if (dus && t < -14) return null;
  const g = golge(0.15 + H), sal = t < 0 ? Math.sin(-t / 3) * 6 : 0;
  return <g transform={`rotate(${sal})`}>
    <path d={`M${-w / 2 + g[0]},${-h / 2 + g[1]} h${w} v${h} h${-w} Z`} fill={MP.golge} opacity={0.55 * (1 - H / 6)} />
    <g transform={`translate(${-H * 6},${-H * 10}) scale(${1 + H * 0.03})`}>
      <path d={`M${-w / 2},${-h / 2} h${w} v${h * 0.78} q${-w * 0.08},${h * 0.04} ${-w * 0.16},${h * 0.22} H${-w / 2} Z`} fill={MP.not} stroke={MP.golgeKagit} strokeWidth={2.5} />
      <path d={`M${w / 2},${h * 0.28} q${-w * 0.08},${h * 0.04} ${-w * 0.16},${h * 0.22} l${w * 0.06},${-h * 0.2} Z`} fill={MP.golgeKagit} />
      <line x1={-w * 0.38} x2={w * 0.3} y1={-h * 0.12} y2={-h * 0.12} stroke={MP.satir} strokeWidth={6} strokeLinecap="round" />
    </g>
  </g>;
};
// kapsül seti (P05): pamuk yatak + uyuyan yarasa (kanat 1) + Fieser eli cımbızla kapsülü göğse koyar (temas = kapsül yarasada)
// pamuk: lifli tırtıklı topak (düz disk değil)
const lif = (x: number, y: number, r: number, k: number) => Array.from({ length: 18 }, (_, i) => { const a = (i / 18) * 6.283, q = r * (0.78 + 0.3 * random(`lf${k}${i}`)); return `${(x + Math.cos(a) * q).toFixed(1)},${(y + Math.sin(a) * q * 0.8).toFixed(1)}`; }).join(" ");
const KapsulSet: React.FC<{ n: Nesne; p: number; pxcm: number }> = ({ n, p, pxcm }) => {
  const u = 9 * pxcm * 0.55, c = (n.cimbiz ?? null) as (Ar & { temas: number }) | null;
  const temas = c?.temas ?? -1, takili = c ? p >= temas : !!n.kapsul;
  const gogus: P = [0, 0.02 * u];
  const yaklas = c ? interpolate(p, [c.bas, temas], [1, 0], { ...cl, easing: GIRIS }) : 1, cek = c ? interpolate(p, [temas + 8, c.bit], [0, 1], { ...cl, easing: CIKIS }) : 1;
  const d = yaklas + cek, uc: P = [gogus[0] + d * 3.2 * u, gogus[1] - 0.22 * u + d * 2.4 * u], h = 1.5 + 2 * d;
  const pamuk = Array.from({ length: 9 }).map((_, i) => [(-1 + 2 * random(`pm${i}`)) * u * 0.9, (-1 + 2 * random(`pn${i}`)) * u * 0.6, u * (0.35 + 0.25 * random(`pr${i}`))]);
  return <g>
    {pamuk.map(([x, y, r], i) => <polygon key={`g${i}`} points={lif(x + 10, y + 10, r, i)} fill={MP.golge} opacity={0.3} />)}
    {pamuk.map(([x, y, r], i) => <polygon key={i} points={lif(x, y, r, i)} fill={i % 3 ? MP.pamuk : MP.pamukGolge} />)}
    {pamuk.map(([x, y, r], i) => <path key={`l${i}`} d={`M${x - r * 0.6},${y - r * 0.2} q${r * 0.5},${-r * 0.3} ${r},${r * 0.1} M${x - r * 0.3},${y + r * 0.3} q${r * 0.4},${-r * 0.2} ${r * 0.8},0`} fill="none" stroke={MP.pamukGolge} strokeWidth={2} opacity={0.7} />)}
    <Yarasa z={{ x: 0, y: 0, u, aci: n.aci ?? 0, kanat: 0.78, nefes: 0.5 + 0.5 * Math.sin(p / 9), kapsul: takili ? "kapsul" : "yok", kenar: true }} />
    {c && p >= c.bas && p <= c.bit && <g>
      <g transform={`translate(${golge(h)[0]},${golge(h)[1]})`} opacity={0.55}><path d={`M${uc[0]},${uc[1]} l${2.6 * u},${-1.6 * u}`} stroke={MP.golge} strokeWidth={0.1 * u} /></g>
      {!takili && <g transform={`translate(${uc[0]},${uc[1] + 0.22 * u}) scale(${u})`}><rect x={-0.1} y={-0.22} width={0.2} height={0.55} rx={0.1} fill={YR.amber} stroke={YR.amberKontur} strokeWidth={1.6 / u} /><rect x={-0.102} y={-0.24} width={0.204} height={0.07} fill={YR.kapak} /></g>}
      <g transform={`translate(${uc[0]},${uc[1]}) rotate(-31.6) scale(${pxcm})`}>
        <path d="M0,-0.12 L3.2,-0.3 M0,0.12 L3.2,0.3" stroke={MP.cimbiz} strokeWidth={0.22} strokeLinecap="round" />
        <g transform="translate(0.6,0)"><ElSiluet tip="lab" isikY={0.4} /></g>
        <path d={`M${EL_CIKIS + 0.6},-0.3 L15.5,-0.5 M${EL_CIKIS + 0.6},0.3 L15.5,0.5`} stroke={MP.cimbiz} strokeWidth={0.22} strokeLinecap="round" />
      </g>
    </g>}
  </g>;
};

// kovan kesiti (P06): sac tüp boy:çap 2:1, burun aşağı, 26 tepsi (yan kesit ince dilim; üst 3 elips), yan paneller açılır ve düşer
const Kovan: React.FC<{ n: Nesne; p: number }> = ({ n, p }) => {
  const H = 1150 * (n.olcek ?? 1), W = H / 2, nT = (n.tepsi_n as number) ?? 26, diz = n.diz as Ar | undefined, ac = n.ac as Ar | undefined, titre = n.titre as { tepsi: number; kare: number } | undefined;
  const top = -H / 2, alt = H / 2, ara = (H * 0.86) / nT;
  const acik = ac ? interpolate(p, [ac.bas, ac.bas + (ac.bit - ac.bas) * 0.4], [0, 1], { ...cl, easing: GIRIS }) : 0;
  const dus = ac ? interpolate(p, [ac.bas + (ac.bit - ac.bas) * 0.4, ac.bit], [0, 1], { ...cl, easing: CIKIS }) : 0;
  // yan panel üst kenarından dışa döner (menteşe), sonra yerçekimiyle düşer ve kadrajın altından çıkar
  const panel = (s: number) => <g transform={`translate(${s * dus * 260},${dus * 1600}) rotate(${-s * (acik * 28 + dus * 50)} ${s * W / 2} ${top})`}>
    <rect x={s > 0 ? W / 2 : -W / 2 - 14} y={top} width={14} height={H * 0.92} fill={MP.celik} stroke={MP.hat} strokeWidth={3.5} /></g>;
  return <g>
    <path d={`M${-W / 2},${top} H${W / 2} V${alt - W * 0.45} Q${W / 2},${alt} 0,${alt + W * 0.08} Q${-W / 2},${alt} ${-W / 2},${alt - W * 0.45} Z`} fill="none" stroke={MP.hat} strokeWidth={3.5} strokeDasharray={acik > 0 ? "14 10" : undefined} />
    {Array.from({ length: nT }).map((_, i) => {
      const y = top + 30 + i * ara, gir = diz ? interpolate(p, [diz.bas + i * 3, diz.bas + i * 3 + 10], [0, 1], { ...cl, easing: GIRIS }) : 1;
      if (gir <= 0) return null;
      const tit = titre && titre.tepsi === i && p >= titre.kare && p < titre.kare + 8 ? Math.sin((p - titre.kare) * 2.4) * 3 : 0;
      const el = i < 3;
      return <g key={i} transform={`translate(${(1 - gir) * -60},${tit}) `}>
        {el ? <ellipse cx={0} cy={y} rx={W / 2 - 10} ry={ara * 0.9} fill={MP.kagit} stroke={MP.hat} strokeWidth={2.5} /> : <line x1={-W / 2 + 10} x2={W / 2 - 10} y1={y} y2={y} stroke={MP.hat} strokeWidth={3.5} />}
        {/* bölmelerde uyuyan yarasalar: tepsi başına seed'li sayı/konum/boy (ızgara/radyatör okunmasın) */}
        {Array.from({ length: 3 + Math.floor(random(`kn${i}`) * 4) }).map((_, j, A) => { const t = (j + 0.5 + (random(`kj${i}${j}`) - 0.5) * 0.7) / A.length, s = 0.7 + 0.5 * random(`ks${i}${j}`);
          return <ellipse key={j} cx={-W / 2 + 26 + t * (W - 52)} cy={y - (el ? 0 : ara * 0.32)} rx={ara * 0.46 * s} ry={ara * 0.2 * s} transform={`rotate(${(random(`ka${i}${j}`) - 0.5) * 30} ${-W / 2 + 26 + t * (W - 52)} ${y})`} fill={MP.murekkep} />; })}
      </g>;
    })}
    {panel(-1)}{panel(1)}
  </g>;
};
// tepsi yakın (P07): yuvarlak tepsi dilimi üstten, halka sıralı yuvarlak-köşeli bölmeler, odak bölmede uyuyan yarasa (kanat seğirmesi + baş dönüşü)
const Tepsi: React.FC<{ n: Nesne; p: number }> = ({ n, p }) => {
  const R = ((n.cap as number) ?? 1000) / 2, m = (n.bolme_n as number) ?? 14, odak = (n.odak as number) ?? 3;
  const titre = (n.titre as number[]) ?? [], bd = n.bas_don as (Ar & { aci: number }) | undefined;
  return <g>
    <circle cx={14} cy={14} r={R} fill={MP.golge} opacity={0.5} />
    <circle r={R} fill={MP.tepsi} stroke={MP.hat} strokeWidth={4} />
    {Array.from({ length: m }).map((_, i) => {
      const a = (i / m) * 2 * Math.PI + 0.12 + (random(`ta${i}`) - 0.5) * 0.06, rr = R * (0.64 + 0.04 * random(`tr${i}`)), x = Math.cos(a) * rr, y = Math.sin(a) * rr, w = R * 0.34, h = R * 0.22;
      const sg = titre.some((k) => p >= k && p < k + 6) && i === odak ? 9 : 0;
      return <g key={i} transform={`translate(${x},${y}) rotate(${(a * 180) / Math.PI + 90})`}>
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h * 0.35} fill={MP.bolme} stroke={MP.hat} strokeWidth={3} />
        <Yarasa z={{ x: (random(`tx${i}`) - 0.5) * w * 0.15, y: 0, u: h * 0.62, aci: 90 + (random(`tb${i}`) - 0.5) * 40, kanat: 1 - sg / 60, nefes: 0.5 + 0.5 * Math.sin(p / 10 + i), kapsul: "kapsul", basDon: i === odak && bd ? interpolate(p, [bd.bas, bd.bit], [0, bd.aci], { ...cl, easing: GIRIS }) : 0 }} />
      </g>;
    })}
    <circle r={R * 0.3} fill={MP.tepsi} stroke={MP.hat} strokeWidth={3} />
  </g>;
};
const Belge: React.FC<{ n: Nesne; p: number }> = ({ n, p }) => {
  const w = 21 * PXCM, h = 29.7 * PXCM * 0.75, ortu = n.ortu as { kare: number; kayma?: number } | undefined, g = golge(0.2);
  const k = ortu ? interpolate(p, [ortu.kare, ortu.kare + 14], [0, ortu.kayma ?? 220], { ...cl, easing: GIRIS }) : 0;
  return <g>
    <rect x={-w / 2 + g[0]} y={-h / 2 + g[1]} width={w} height={h} fill={MP.golge} opacity={0.55} />
    <path d={`M${-w / 2},${-h / 2} H${w / 2} V${h / 2 - 30} Q${w / 2 - 20},${h / 2 - 8} ${w / 2 - 44},${h / 2} H${-w / 2} Z`} fill={MP.belge} stroke={MP.golgeKagit} strokeWidth={2.5} />
    <rect x={-w * 0.36} y={-h * 0.4} width={w * 0.72} height={26} fill={MP.satir} />
    {[0, 1, 2, 3].map((i) => <line key={i} x1={-w * 0.38} x2={w * (0.36 - (i % 2) * 0.12)} y1={-h * 0.18 + i * 64} y2={-h * 0.18 + i * 64} stroke={MP.satir} strokeWidth={6} strokeLinecap="round" opacity={0.8} />)}
    {ortu && <g transform={`translate(${k},0)`}><rect x={-w * 0.42 + 6} y={-h * 0.46 + 6} width={w * 0.84} height={84} fill={MP.golge} opacity={0.45} /><rect x={-w * 0.42} y={-h * 0.46} width={w * 0.84} height={84} fill={MP.not} stroke={MP.golgeKagit} strokeWidth={2.5} /></g>}
  </g>;
};
// mühür (P11 B): görevli eli mührü üstten getirir, havada bekler, iner (temas = iz), çekilir. İz: daire + büyük çarpı (dil-nötr)
const Muhur: React.FC<{ n: Nesne; p: number }> = ({ n, p }) => {
  const R = ((n.cap as number) ?? 340) / 2, temas = n.temas as number, gir = n.giris as Ar, cik = n.cikis as Ar;
  const iz = p >= temas;
  const yuk = p < temas ? interpolate(p, [gir.bas, gir.bit, temas - 12, temas], [1400, 260, 260, 0], { ...cl, easing: (t) => t }) : interpolate(p, [temas + 4, cik.bas, cik.bit], [0, 160, 1600], { ...cl, easing: CIKIS });
  const g = golge(Math.min(40, yuk / PXCM) * 0.5 + 1.2);
  const ezil = p >= temas && p < temas + 4 ? 0.94 : 1;
  // tepe kamerası ≈8° önden eğik: sap yukarı-sola eğik izdüşer (tabanı, sapı, topuzu ayrı okunur — "yo-yo" değil)
  const sx = -R * 0.35, sy = -R * 1.25;
  const tutacak = <g>
    <ellipse cx={0} cy={0} rx={R * 0.95} ry={R * 0.86} fill="#3e3036" stroke={MP.hat} strokeWidth={4} />
    <ellipse cx={0} cy={-R * 0.06} rx={R * 0.88} ry={R * 0.78} fill={MP.tutacak} />
    <path d={`M${-R * 0.16},0 L${sx - R * 0.12},${sy} L${sx + R * 0.12},${sy} L${R * 0.16},0 Z`} fill="#6a5550" stroke={MP.hat} strokeWidth={3.5} strokeLinejoin="round" />
    <ellipse cx={sx} cy={sy} rx={R * 0.28} ry={R * 0.24} fill="#7a6258" stroke={MP.hat} strokeWidth={3.5} />
    <ellipse cx={sx - R * 0.08} cy={sy - R * 0.07} rx={R * 0.08} ry={R * 0.06} fill="#9a8270" />
  </g>;
  return <g>
    {iz && <g opacity={0.92}><circle r={R * 0.92} fill="none" stroke={MP.kirmizi} strokeWidth={18} /><path d={`M${-R * 0.55},${-R * 0.55} L${R * 0.55},${R * 0.55} M${R * 0.55},${-R * 0.55} L${-R * 0.55},${R * 0.55}`} stroke={MP.kirmizi} strokeWidth={30} strokeLinecap="round" /></g>}
    {yuk < 1500 && <g>
      <g transform={`translate(${g[0]},${g[1]})`} opacity={0.5}><circle r={R * 0.95} fill={MP.golge} /></g>
      <g transform={`translate(${-yuk * 0.15},${-yuk}) scale(${(1 + yuk / 2600) * ezil})`}>{tutacak}
        <g transform={`translate(${sx},${sy + R * 0.5}) rotate(-62) scale(${PXCM * 0.95}) translate(-6,0)`}><ElSiluet tip="gorevliYB" isikY={-0.3} /></g></g>
    </g>}
  </g>;
};

export const MasaNesne: React.FC<{ n: Nesne; p: number }> = ({ n, p }) => {
  const T = `translate(${n.x},${n.y}) rotate(${n.aci && n.tur !== "kapsul-set" ? n.aci : 0}) scale(${n.tur === "kapsul-set" ? 1 : n.olcek ?? 1})`;
  const ic = n.tur === "zarf" ? <Zarf n={n} /> : n.tur === "not" ? <Not n={n} p={p} /> : n.tur === "kapsul-set" ? <KapsulSet n={n} p={p} pxcm={PXCM * (n.olcek ?? 1)} />
    : n.tur === "kovan" ? <Kovan n={n} p={p} /> : n.tur === "tepsi" ? <Tepsi n={n} p={p} /> : n.tur === "belge" ? <Belge n={n} p={p} /> : <Muhur n={n} p={p} />;
  return <g transform={T}>{ic}</g>;
};
