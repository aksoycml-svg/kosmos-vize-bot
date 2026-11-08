// ===== KE-K3 PADİŞAH SİLUETİ (tasarim.md v1.4 §3.5, R10) — Kukla DEĞİL, ayrı siluet bileşeni =====
// Pencere içinde büst: geniş omuzlu kaftan + baş + büyük yuvarlak sarık (§3.0b: başı saran basık yastık, ×1.70 baş eni, y/g ≈ 0.62–0.7,
// tümsekli üst kontur, tepede içteki kavuğun alçak koyu ucu). GÖZ, KAŞ, AĞIZ YOK; sorguç / mücevher / kürk yaka / yeşil sarık YOK.
// bas_aci 0 → 1: önden (baş simetrik oval, sarık simetrik) → SAĞA profil (alın–burun–dudak–çene çıkıntısı belirir, sarık arkaya kayar,
// asimetrik). Ara değerler yarıçap morfu (atlama yok); omuz sabit. Sargı çizgisi çizilmez (yalnız P12 yakın planında, tasarım §3.5).
// Koordinat: (x, y) = denizlik (pencere alt kenarı) ortası, dekor px; pxm = o derinlikte px/m (köşk cumbası 92). Büst 1.10 m (sarık ucu).
// Renk: gövde/baş siluet (gece #1e1c22 ışıklı pencere önünde · gün #2a2622), sarık #d6d3c6 (gece arkadan ışıkta kısık), kenar ışığı
// gece arkadan (#f2c070, bütün dış kontur) · gün sağdan (#f0d79a). Pencere çerçevesi `klip` ile keser (büst denizlikte biter).
import React from "react";
import { ink, karistir, P, poly } from "../../doku/sabitler";

export type PadisahProps = { x: number; y: number; pxm: number; basAci: number; renk: string; kenar: string; gece: boolean; klip?: [number, number, number, number]; kenarPx?: number };

const N = 56;
// Baş: merkez (0, 0.76 m) çevresinde açıya göre yarıçap; önden oval, profilde burun/dudak/çene tümsekleri (yüz +x yönüne)
const basNoktalar = (t: number): P[] => {
  const out: P[] = [];
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2; // 0 = +x (sağ), y aşağı pozitif (ekran)
    const c = Math.cos(a), s = Math.sin(a);
    const rxF = 0.093, ryF = 0.112, rxP = 0.104, ryP = 0.112;
    const rx = rxF + (rxP - rxF) * t, ry = ryF + (ryP - ryF) * t;
    let r = 1 / Math.sqrt((c / rx) ** 2 + (s / ry) ** 2);
    // profil tümsekleri (yalnız sağ yarıda, t ile büyür): burun (a≈0.02), dudak (0.42), çene (0.78); burun altı ve ağız çukuru
    const g = (m: number, w: number) => Math.exp(-(((a > Math.PI ? a - 2 * Math.PI : a) - m) ** 2) / (2 * w * w));
    r += t * (0.036 * g(0.02, 0.09) - 0.012 * g(0.26, 0.06) + 0.008 * g(0.42, 0.06) - 0.006 * g(0.58, 0.05) + 0.006 * g(0.8, 0.09));
    // ense düzlüğü (sol arka, profilde)
    r -= t * 0.01 * g(2.6, 0.3);
    out.push([-0.006 * t + r * c, 0.76 - r * s]); // s > 0 = aşağı (metre ekseni yukarı)
  }
  return out;
};
// Sarık: başı saran basık yastık; alt kenar alına iner (y 0.835 önde), en geniş yer alt üçte birde, üst hafif yassı + 4 tümsek.
// Profilde (t) arkaya kayar ve arkası dolgunlaşır (asimetri), önü alına dik iner.
const sarikNoktalar = (t: number): P[] => {
  const W = 0.16, H = 0.115, cy = 0.95, out: P[] = [];
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2, c = Math.cos(a), s = Math.sin(a);
    let rx = W, ry = H;
    if (s > 0) { ry = H * 0.95; rx = W * (1 + 0.04 * s); }                       // alt yarı: geniş (alt üçte bir)
    else { ry = H * (0.9 - 0.12 * Math.abs(c) ** 6); }                            // üst: hafif yassı
    let x = rx * c, y = ry * s;
    if (s < 0) y += 0.007 * Math.sin(a * 4 + 0.6) * Math.abs(s);                 // tümsekli kontur (sargı kabarıklığı), pürüzsüz kubbe değil
    // profil: arkaya kayma + arka dolgunluk
    x += t * (-0.03 + (c < 0 ? -0.022 * Math.abs(c) : -0.012 * c));
    out.push([x, cy - y]); // s > 0 = alt yarı
  }
  return out;
};
// kavuk ucu: sargının ortasından alçak koyu kubbe (genişlik sarığın %30'u, yükseklik ≈ 0.035 m)
const kavukNoktalar = (t: number): P[] => Array.from({ length: 14 }).map((_, i) => { const a = Math.PI + (i / 13) * Math.PI; return [-0.03 * t + 0.048 * Math.cos(a), 1.035 + 0.04 * Math.abs(Math.sin(a))] as P; });
// Kaftan büst: omuz geniş (≈ 0.62 m), yuvarlak omuz başı, kollar gövdede; denizlikte (0) biter
const govdeNoktalar = (): P[] => [
  [-0.36, -0.02], [-0.35, 0.3], [-0.335, 0.44], [-0.31, 0.51], [-0.26, 0.55], [-0.17, 0.585], [-0.075, 0.615], [-0.055, 0.66],
  [0.055, 0.66], [0.075, 0.615], [0.17, 0.585], [0.26, 0.55], [0.31, 0.51], [0.335, 0.44], [0.35, 0.3], [0.36, -0.02],
];

export const PadisahSiluet: React.FC<PadisahProps> = ({ x, y, pxm, basAci, renk, kenar, gece, klip, kenarPx = 2.2 }) => {
  const id = "pd" + React.useId().replace(/:/g, "");
  const t = Math.max(0, Math.min(1, basAci));
  const D = (q: P): P => [x + q[0] * pxm, y - q[1] * pxm];
  const gov = govdeNoktalar().map(D), bas = basNoktalar(t).map(D), sar = sarikNoktalar(t).map(D), kav = kavukNoktalar(t).map(D);
  const boyun = [[-0.06, 0.6], [0.06, 0.6], [0.055 - 0.01 * t, 0.7], [-0.06 - 0.01 * t, 0.7]].map((q) => D(q as P));
  const sarikRenk = gece ? karistir("#d6d3c6", renk, 0.5) : "#d6d3c6";
  const sarikGolge = gece ? karistir("#a8a69a", renk, 0.6) : "#a8a69a";
  const kp = kenarPx;
  // kenar ışığı yalnız siluet içinde (iç yarı): gece bütün dış kontur (pencere arkadan), gün sağ yan
  const yanKlip = gece ? null : [x, y - 2 * pxm, 2 * pxm, 3 * pxm];
  const tumSiluet = <><polygon points={poly(gov)} /><polygon points={poly(boyun)} /><polygon points={poly(bas)} /></>;
  return (
    <g clipPath={klip ? `url(#${id}k)` : undefined}>
      <defs>
        {klip && <clipPath id={`${id}k`}><rect x={klip[0]} y={klip[1]} width={klip[2]} height={klip[3]} /></clipPath>}
        <clipPath id={`${id}s`}>{tumSiluet}</clipPath>
        <clipPath id={`${id}t`}><polygon points={poly(sar)} /></clipPath>
        {yanKlip && <clipPath id={`${id}y`}><rect x={yanKlip[0]} y={yanKlip[1]} width={yanKlip[2]} height={yanKlip[3]} /></clipPath>}
      </defs>
      {/* gövde + boyun + baş: düz siluet */}
      <g fill={renk}>{tumSiluet}</g>
      <g clipPath={`url(#${id}s)`}>
        <g clipPath={yanKlip ? `url(#${id}y)` : undefined}>
          {[gov, bas].map((pts, i) => <polygon key={i} points={poly(pts)} fill="none" stroke={kenar} strokeWidth={kp * 2} strokeOpacity={0.9} strokeLinejoin="round" />)}
        </g>
        {/* kaftan önü: tek ton farkı (yaka çizgisi), süs yok */}
        <path d={`M ${D([-0.05, 0.6])[0]} ${D([-0.05, 0.6])[1]} L ${D([0.02, 0.0])[0]} ${D([0.02, 0.0])[1]}`} stroke={karistir(renk, "#000000", 0.35)} strokeWidth={Math.max(1, 0.012 * pxm)} />
      </g>
      {/* sarık: kırık beyaz (gece arkadan ışıkta kısık), gölge yanı alt-sol; üstte kenar ışığı */}
      <polygon points={poly(sar)} fill={sarikRenk} stroke={ink(sarikRenk)} strokeWidth={Math.max(0.8, 0.012 * pxm)} strokeLinejoin="round" />
      <g clipPath={`url(#${id}t)`}>
        <ellipse cx={D([-0.07 - 0.03 * t, 0.89])[0]} cy={D([0, 0.89])[1]} rx={0.16 * pxm} ry={0.06 * pxm} fill={sarikGolge} opacity={0.8} />
        <g clipPath={yanKlip ? `url(#${id}y)` : undefined}><polygon points={poly(sar)} fill="none" stroke={kenar} strokeWidth={kp * 2} strokeOpacity={gece ? 0.85 : 0.7} /></g>
      </g>
      <polygon points={poly(kav)} fill="#4a3e34" stroke={ink("#4a3e34")} strokeWidth={Math.max(0.6, 0.008 * pxm)} />
    </g>
  );
};
// Büst ölçüleri (kontrol/okunurluk): sarık ucu denizlikten 1.09 m
export const PADISAH_BUST_M = 1.09;
