// ===== HaritaIkon (KE-PK-H3/H4/H5; mekanlar.md §5H.5) =====
// Kâğıt kesik parçalar: balon · yatık sepet · kümes · Tours binası · yazı yığını · kuş · film şeridi.
// Her ikon kendi yerel biriminde (px, s = 1) çizilir; çağıran translate/scale verir. Kâğıttan kalkan parçanın gölgesi
// tek "masa ışığından" (KB, §5H.4): ofset (+5,+6) `#4a4237` α .22, havadakinde büyür. Gölge aynı biçimin düz kopyasıdır.
import React from "react";
import { interpolate } from "remotion";
import { cl } from "../../zaman";
import { PK } from "./parisCevre";

export const GOLGE = { dx: 5, dy: 6, renk: PK.kontur, alfa: 0.22 };
// gölge + parça: children biçimi iki kez çizilir (gölge: düz renk, α)
export const Golgeli: React.FC<{ dx?: number; dy?: number; children: (golge: boolean) => React.ReactNode }> = ({ dx = GOLGE.dx, dy = GOLGE.dy, children }) => (
  <g>
    <g transform={`translate(${dx},${dy})`} opacity={GOLGE.alfa}>{children(true)}</g>
    {children(false)}
  </g>
);
const r = (g: boolean, renk: string) => (g ? GOLGE.renk : renk);

// ---- balon (56 px): küre ø 40, kontur 3, 3 meridyen 2.5; sepet 12×9, 2 halat. (0,0) = sepet tabanı ortası (temas noktası) ----
// sonme 0..1: küre söner (scaleY 1 → .3, en 1.3×), sepetin yanına (sağ) katlanmış yığın olarak yatar; meridyenler 4 kıvrıma döner.
// devril (derece): sepet sağ alt köşesi üstünde devrilir (pivot o köşe).
export const BalonIkon: React.FC<{ golge?: boolean; sonme?: number; devril?: number; ezil?: number; kontur?: string }> = ({ golge = false, sonme = 0, devril = 0, ezil = 1, kontur = PK.murekkep }) => {
  const k = r(golge, kontur), dol = r(golge, PK.ikon);
  const sy = 1 - 0.7 * sonme, sx = 1 + 0.3 * sonme;
  // küre merkezi: havada sepetin 36 px üstü → sönünce sepetin sağında yerde (+30, −6)
  const kx = interpolate(sonme, [0, 1], [0, 30], cl), ky = interpolate(sonme, [0, 1], [-37, -6], cl);
  const R = 20;
  const sepet = (
    <g transform={`translate(6,0) rotate(${devril}) translate(-6,0) scale(${1 / Math.sqrt(ezil)},${ezil})`}>
      <rect x={-6} y={-9} width={12} height={9} fill={dol} stroke={k} strokeWidth={2.5} strokeLinejoin="round" />
      {!golge && <line x1={-6} y1={-4.5} x2={6} y2={-4.5} stroke={k} strokeWidth={1.5} />}
    </g>
  );
  // halatlar: sepet üst köşeleri (devrik sepette döndürülmüş) → küre alt kenarı
  const rot = (x: number, y: number): [number, number] => { const a = (devril * Math.PI) / 180, dx = x - 6; return [6 + dx * Math.cos(a) - y * Math.sin(a), dx * Math.sin(a) + y * Math.cos(a)]; };
  const [h1x, h1y] = rot(-6, -9), [h2x, h2y] = rot(6, -9);
  const altY = ky + R * sy * 0.82;
  return (
    <g>
      {sonme < 0.98 && <g stroke={k} strokeWidth={2} fill="none" strokeLinecap="round">
        <path d={`M${h1x},${h1y} Q${(h1x + kx - 9 * sx) / 2},${(h1y + altY) / 2 + 2 * sonme} ${kx - 9 * sx},${altY}`} />
        <path d={`M${h2x},${h2y} Q${(h2x + kx + 9 * sx) / 2},${(h2y + altY) / 2 + 2 * sonme} ${kx + 9 * sx},${altY}`} />
      </g>}
      {sepet}
      <g transform={`translate(${kx},${ky}) scale(${sx},${sy})`}>
        {/* küre: sönerken alt kenar yere yaslanır, üst kenar yumuşak sarkar (katı kalıp değil) */}
        <path d={`M ${-R} 0 C ${-R} ${-R * 1.1} ${R} ${-R * 1.1} ${R} 0 C ${R} ${R * (0.8 - 0.25 * sonme)} ${R * 0.35} ${R * 1.05} 0 ${R * 1.05} C ${-R * 0.35} ${R * 1.05} ${-R} ${R * (0.8 - 0.25 * sonme)} ${-R} 0 Z`}
          fill={dol} stroke={k} strokeWidth={3 / Math.sqrt(sy)} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        {!golge && sonme < 0.6 && <g stroke={k} strokeWidth={2.5} fill="none" vectorEffect="non-scaling-stroke" opacity={1}>
          <line x1={0} y1={-R * 0.82} x2={0} y2={R * 1.02} vectorEffect="non-scaling-stroke" />
          <path d={`M 0 ${-R * 0.82} C ${-R * 0.62} ${-R * 0.5} ${-R * 0.62} ${R * 0.6} 0 ${R * 1.02}`} vectorEffect="non-scaling-stroke" />
          <path d={`M 0 ${-R * 0.82} C ${R * 0.62} ${-R * 0.5} ${R * 0.62} ${R * 0.6} 0 ${R * 1.02}`} vectorEffect="non-scaling-stroke" />
        </g>}
      </g>
      {/* kıvrım çizgileri (4): sönme ilerledikçe kendini çizer (meridyenlerin yerini alır) */}
      {!golge && sonme > 0.35 && [-0.6, -0.2, 0.2, 0.6].map((u, i) => {
        const q = interpolate(sonme, [0.35, 1], [0, 1], cl);
        const x = kx + u * R * sx, y0 = ky - R * sy * 0.5, L = R * sy * 1.2 * q;
        return <path key={i} d={`M${x},${y0} q ${3 * (i % 2 ? 1 : -1)},${L / 2} 0,${L}`} stroke={k} strokeWidth={2} fill="none" strokeLinecap="round" />;
      })}
    </g>
  );
};

// ---- kümes (28 × 40, dar ve uzun): beşik çatı, ön yüzde 3 delik ø 5, altında iniş tahtası. (0,0) = taban ortası ----
// ciz 0..1: kontur kendini çizer (pathLength), dolgu aynı ilerlemeyle alttan yukarı mürekkep gibi dolar
export const KumesIkon: React.FC<{ golge?: boolean; ciz?: number; id: string }> = ({ golge = false, ciz = 1, id }) => {
  const k = r(golge, PK.kontur), dol = r(golge, PK.ikon);
  const govde = "M -14 0 L -14 -27 L 0 -40 L 14 -27 L 14 0 Z";
  if (golge) return ciz >= 1 ? <path d={govde} fill={GOLGE.renk} /> : null;
  return (
    <g>
      <defs><clipPath id={id}><rect x={-20} y={-44 + 46 * (1 - ciz)} width={40} height={50} /></clipPath></defs>
      <path d={govde} fill={dol} clipPath={`url(#${id})`} />
      <path d={govde} fill="none" stroke={k} strokeWidth={3} strokeLinejoin="round" pathLength={1} strokeDasharray={`${ciz} 2`} />
      <path d="M -18 -24 L 0 -42 L 18 -24" fill="none" stroke={k} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${ciz} 2`} />
      {ciz > 0.6 && <g fill={PK.kontur} opacity={1}>
        {[-7, 0, 7].map((x, i) => <circle key={i} cx={x} cy={-19} r={2.5 * interpolate(ciz, [0.6 + i * 0.1, 0.8 + i * 0.1], [0, 1], cl)} />)}
      </g>}
      <line x1={-12} y1={-12} x2={-12 + 24 * interpolate(ciz, [0.7, 1], [0, 1], cl)} y2={-12} stroke={k} strokeWidth={2.5} strokeLinecap="round" />
    </g>
  );
};

// ---- Tours binası (56 × 40 ekran): geniş-alçak gövde, alçak alınlık, 3 pencere çizgisi; kule/çan/bayrak yok. (0,0) = taban ortası ----
export const ToursIkon: React.FC<{ golge?: boolean; ciz?: number }> = ({ golge = false, ciz = 1 }) => {
  const k = r(golge, PK.murekkep), dol = r(golge, PK.ikon);
  if (golge) return ciz >= 1 ? <path d="M -28 0 L -28 -28 L 0 -40 L 28 -28 L 28 0 Z" fill={GOLGE.renk} /> : null;
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M -28 0 L -28 -28 L 28 -28 L 28 0 Z" fill={dol} fillOpacity={interpolate(ciz, [0.5, 1], [0, 1], cl)} stroke={k} strokeWidth={3} pathLength={1} strokeDasharray={`${ciz} 2`} />
      <path d="M -30 -28 L 0 -40 L 30 -28" fill={dol} fillOpacity={interpolate(ciz, [0.5, 1], [0, 1], cl)} stroke={k} strokeWidth={3} pathLength={1} strokeDasharray={`${ciz} 2`} />
      {[-14, 0, 14].map((x, i) => <line key={i} x1={x} y1={-21} x2={x} y2={-21 + 13 * interpolate(ciz, [0.55 + i * 0.12, 0.75 + i * 0.12], [0, 1], cl)} stroke={k} strokeWidth={3} />)}
    </g>
  );
};

// ---- yazı yığını (80 px): 5 sayfa, sayfa başına 4 px kayma, en üst sayfanın sağ-üst köşesi kıvrık, kenarda 2 kısa satır çizgisi ----
// (0,0) = yığının ortası. ustKay: en üst sayfanın öne (+x) kayması px
export const YiginIkon: React.FC<{ golge?: boolean; ustKay?: number; olcek?: number }> = ({ golge = false, ustKay = 0, olcek = 1 }) => {
  const k = r(golge, PK.kontur), dol = r(golge, PK.ikon), W = 58, H = 68;
  return (
    <g transform={`scale(${olcek})`} strokeLinejoin="round">
      {[0, 1, 2, 3, 4].map((i) => {
        const x = -W / 2 - 8 + i * 4 + (i === 4 ? ustKay : 0), y = -H / 2 + 8 - i * 4, ust = i === 4;
        const d = ust ? `M${x},${y} L${x + W - 14},${y} L${x + W},${y + 14} L${x + W},${y + H} L${x},${y + H} Z` : `M${x},${y} L${x + W},${y} L${x + W},${y + H} L${x},${y + H} Z`;
        return <g key={i}>
          <path d={d} fill={dol} stroke={k} strokeWidth={3} />
          {ust && !golge && <>
            <path d={`M${x + W - 14},${y} L${x + W - 12},${y + 12} L${x + W},${y + 14}`} fill="none" stroke={k} strokeWidth={2.5} />
            <line x1={x + 10} y1={y + 24} x2={x + 34} y2={y + 24} stroke={k} strokeWidth={2.5} strokeLinecap="round" />
            <line x1={x + 10} y1={y + 36} x2={x + 28} y2={y + 36} stroke={k} strokeWidth={2.5} strokeLinecap="round" />
          </>}
        </g>;
      })}
    </g>
  );
};

// ---- kuş (44 px): yandan güvercin silüeti, 2 kanat pozu (kanat 0 = yukarı, 1 = aşağı); sağa bakar. (0,0) = gövde ortası ----
export const KusIkon: React.FC<{ golge?: boolean; kanat: 0 | 1; renk?: string }> = ({ golge = false, kanat, renk = PK.kontur }) => {
  const k = r(golge, renk);
  return (
    <g fill={k}>
      {/* gövde + baş + kuyruk */}
      <path d="M -22 -1 L -12 -5 C -6 -8 6 -8 11 -5 C 14 -9 20 -9 22 -5 L 26 -3 L 21 -2 C 19 3 12 6 4 6 C -4 7 -10 4 -13 2 L -22 4 Z" />
      {kanat === 0
        ? <path d="M -6 -5 C -4 -14 2 -22 10 -24 C 8 -16 6 -10 5 -5 Z" />
        : <path d="M -6 0 C -4 8 0 16 6 20 C 7 12 7 6 6 1 Z" />}
    </g>
  );
};

// ---- film şeridi (30 × 15): #5a5048, içte 2 açık çizgi (film satırı; perforasyon yok) ----
export const SeritIkon: React.FC<{ golge?: boolean }> = ({ golge = false }) => (
  <g>
    <rect x={-15} y={-7.5} width={30} height={15} rx={1.5} fill={r(golge, PK.serit)} />
    {!golge && <g stroke={PK.tarama} strokeWidth={2} strokeLinecap="round"><line x1={-11} y1={-3} x2={11} y2={-3} /><line x1={-11} y1={3} x2={11} y2={3} /></g>}
  </g>
);
