// ===== HaritaIkon (KE-PK-H3/H4/H5; mekanlar.md §5H.5) =====
// Kâğıt kesik parçalar: balon · yatık sepet · kümes · Tours binası · yazı yığını · kuş · film şeridi.
// Her ikon kendi yerel biriminde (px, s = 1) çizilir; çağıran translate/scale verir. Kâğıttan kalkan parçanın gölgesi
// tek "masa ışığından" (KB, §5H.4): ofset (+5,+6) `#4a4237` α .22, havadakinde büyür. Gölge aynı biçimin düz kopyasıdır.
import React from "react";
import { interpolate } from "remotion";
import { cl } from "../../zaman";
import { PK } from "./parisCevreVeri";

export const GOLGE = { dx: 5, dy: 6, renk: PK.kontur, alfa: 0.22 };
// gölge + parça: children biçimi iki kez çizilir (gölge: düz renk, α)
export const Golgeli: React.FC<{ dx?: number; dy?: number; children: (golge: boolean) => React.ReactNode }> = ({ dx = GOLGE.dx, dy = GOLGE.dy, children }) => (
  <g>
    <g transform={`translate(${dx},${dy})`} opacity={GOLGE.alfa}>{children(true)}</g>
    {children(false)}
  </g>
);
const r = (g: boolean, renk: string) => (g ? GOLGE.renk : renk);

// ---- balon (56 px): küre ø 40, kontur 3, 3 meridyen; sepet 16×12 (hasır: 2 dikey örgü), 2 halat. (0,0) = sepet tabanı ortası (temas) ----
// H2 (eleştiri #2 "göz/mercek"): sonme 0..1 — küre 12 noktalı çevresiyle sepetin SAĞINA, yere yayılmış buruşuk kumaşa dönüşür
// (asimetrik, dalgalı üst kenar, tabanı yerde; beyaz yarık yok). Meridyenler aynı noktalara bağlı kalır → kumaşta kıvrım çizgisine
// dönüşür (pop/fade yok). devril (derece): sepet sağ alt köşesi üstünde devrilir, kumaş yığınına yaslanır.
const KURE_ACI = [120, 100, 80, 60, 25, -10, -45, -80, -115, -150, -185, -215];
// S (eleştiri H2 küçük "ayakkabı"): kumaş ≈ 1.5× yüksek (ekranda ≈ 40 → 55 px) ve sağa açıldı: sol üst ucu devrik sepetin üst köşesine
// yaslanır (destek), altında sepet ağzı ile kumaş arasında üçgen boşluk kalır; 3 ip bu boşluktan kumaşın ağzına girer.
const KUMAS: [number, number][] = [[46, 0], [58, 1.5], [70, 0], [86, 1], [90, -9], [80, -18], [71, -11], [62, -26], [53, -14], [43, -28], [30, -22], [11, -20]];
// sönmüş kumaşta iplerin bittiği noktalar (kumaşın içinde: ip kumaşın altına girer, yalnız boşluktaki kısmı görünür)
const IP_UC: [number, number][] = [[38, -16], [44, -9], [50, -3]];
const MERID: [number, number, number][] = [[7, 1, -0.55], [6, 2, 0], [8, 0, 0.55]]; // [üst idx, alt idx, küre şişkinliği]
const kapaliYol = (P: [number, number][]) => {
  const n = P.length, m = (i: number) => [(P[i % n][0] + P[(i + 1) % n][0]) / 2, (P[i % n][1] + P[(i + 1) % n][1]) / 2];
  let d = `M${m(n - 1).join(",")}`;
  for (let i = 0; i < n; i++) d += ` Q${P[i][0]},${P[i][1]} ${m(i).join(",")}`;
  return d + "Z";
};
export const BalonIkon: React.FC<{ golge?: boolean; sonme?: number; devril?: number; ezil?: number; kontur?: string }> = ({ golge = false, sonme = 0, devril = 0, ezil = 1, kontur = PK.murekkep }) => {
  const k = r(golge, kontur), dol = r(golge, PK.ikon);
  const R = 20, ky = -40, e = Math.max(0, Math.min(1, sonme));
  const eu = e * e * (3 - 2 * e); // üst kenar önce çöker (yumuşak), sonra yana yayılır
  const P: [number, number][] = KURE_ACI.map((a, i) => {
    const q = [Math.cos((a * Math.PI) / 180) * R, ky + Math.sin((a * Math.PI) / 180) * R * 1.02], c = KUMAS[i];
    const w = q[1] < ky ? eu : e; // üst yarı biraz gecikmeli iner
    return [q[0] + (c[0] - q[0]) * w, q[1] + (c[1] - q[1]) * w];
  });
  const SW = 16, SH = 12;
  const sepet = (
    <g transform={`translate(${SW / 2},0) rotate(${devril}) translate(${-SW / 2},0) scale(${1 / Math.sqrt(ezil)},${ezil})`}>
      <rect x={-SW / 2} y={-SH} width={SW} height={SH} fill={dol} stroke={k} strokeWidth={2.5} strokeLinejoin="round" />
      {!golge && <g stroke={k} strokeWidth={1.8}><line x1={-SW / 2} y1={-SH / 2} x2={SW / 2} y2={-SH / 2} /><line x1={-SW / 6} y1={-SH} x2={-SW / 6} y2={0} /><line x1={SW / 6} y1={-SH} x2={SW / 6} y2={0} /></g>}
    </g>
  );
  // halatlar: sepet üst köşeleri (devrik sepette döndürülmüş) → küre alt kenarı; sönerken uçlar kumaşın ağzındaki IP_UC'ye kayar
  // (S: sepet–kumaş arası 3 ip → "balon" okunur, "ayakkabı" değil). Orta ip yalnız sönmede (uzayarak). Kumaş ip uçlarını örter.
  const rot = (x: number, y: number): [number, number] => { const a = (devril * Math.PI) / 180, dx = x - SW / 2; return [SW / 2 + dx * Math.cos(a) - y * Math.sin(a), dx * Math.sin(a) + y * Math.cos(a)]; };
  const [h1x, h1y] = rot(-SW / 2, -SH), [h2x, h2y] = rot(SW / 2, -SH), [hmx, hmy] = rot(0, -SH);
  const sark = 3 - 1.5 * e; // kısa iplerde sarkma az
  const uc = (i: number, j: number): [number, number] => [P[i][0] + (IP_UC[j][0] - P[i][0]) * e, P[i][1] + (IP_UC[j][1] - P[i][1]) * e];
  const ip = (a: [number, number], b: [number, number]) => `M${a[0]},${a[1]} Q${(a[0] + b[0]) / 2},${(a[1] + b[1]) / 2 + sark} ${b[0]},${b[1]}`;
  const ipler = (
    <g stroke={k} strokeWidth={2 + 0.4 * e} fill="none" strokeLinecap="round">
      <path d={ip([h1x, h1y], uc(0, 0))} />
      <path d={ip([h2x, h2y], uc(2, 2))} />
      {e > 0 && <path d={ip([hmx, hmy], [hmx + (uc(1, 1)[0] - hmx) * e, hmy + (uc(1, 1)[1] - hmy) * e])} />}
    </g>
  );
  return (
    <g>
      {ipler}
      <path d={kapaliYol(P)} fill={dol} stroke={k} strokeWidth={3} strokeLinejoin="round" />
      {!golge && <g stroke={k} strokeWidth={2.5} fill="none" strokeLinecap="round">
        {MERID.map(([u, a, b], i) => {
          const U = P[u], A = P[a], mx = (U[0] + A[0]) / 2 + b * R * 0.9 * (1 - e) + (i - 1) * 2 * e, my = (U[1] + A[1]) / 2;
          return <path key={i} d={`M${U[0]},${U[1]} Q${mx},${my} ${A[0]},${A[1]}`} />;
        })}
      </g>}
      {sepet}
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
