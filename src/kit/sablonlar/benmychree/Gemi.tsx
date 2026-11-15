// ===== GemiProfil — Ben-my-Chree tek rig (tasarim.md §3, mekanlar.md §2.2–2.4) =====
// Uzak/orta profil (LIMAN). Orijin = baş su hattı; x kıça doğru (m · pxm), y yukarı (m · pxm · 1.15 dikey abartı).
// Kaynaklı: 118.9 × 14 m, iki baca, iki direk, arka bacanın gerisinde hangar, baş platformu, derrick, 3 can botu.
// [G] (nötr): renk gri-kum, baca koyu nötr, işaret/yazı/roundel yok, kapı iskele yan duvarında.
// Işık: kontrajur (rel 25–45) → kameraya bakan iskele bordası gölgede; üst ve sağ kenarlar kenar ışığı.
import React from "react";
import { BP, pts, P2, rr, Tara } from "./bmcOrtak";

export type GemiDurum = "demirli" | "vurulmus" | "yanan" | "yatik" | "batik";
export const GEMI = { L: 118.9, borda: 6.2, abarti: 1.4 }; // dikey abartı 1.15 → 1.4 (tiyatro; 360 px'te baca/direk/hangar okunsun)
// konumlar (baştan, m) — tasarim §3 L oranları
const K = { platform: [0, 17.8], onDirek: 23.8, kopru: [33.3, 45.2], onBaca: 51.1, arkaBaca: 70.2, hangar: [76.1, 104.6], arkaDirek: 107, botlar: [41, 58.5, 64.5] };

export const GemiProfil: React.FC<{ pxm: number; durum?: GemiDurum; seed?: number; hangarKapi?: "kapali" | "acik" }> = ({ pxm, durum = "demirli", seed = 181 }) => {
  const X = (m: number) => m * pxm, Y = (m: number) => -m * pxm * GEMI.abarti;
  const kw = Math.max(2.2, Math.min(3.5, pxm * 0.55)); // siluet kontur
  const sheer = (m: number) => 0.9 * ((m / GEMI.L - 0.5) * 2) ** 2; // baş/kıçta yükselen güverte çizgisi
  const deck = (m: number) => GEMI.borda + sheer(m);
  // gövde: baş eğik (≈ 70°), kıç yuvarlak (cruiser)
  const govde: P2[] = [];
  govde.push([X(2.4), Y(0)]);
  for (let m = 2.4; m <= 114; m += 4) govde.push([X(m), Y(0)]);
  govde.push([X(116.6), Y(0.4)], [X(118.3), Y(2.2)], [X(118.9), Y(deck(118.9))]);
  for (let m = 118.9; m >= 0; m -= 3) govde.push([X(m), Y(deck(m))]);
  govde.push([X(0), Y(deck(0))]);
  const gD = `M${pts(govde)} Z`;
  const kutu = (a: number, b: number, y0: number, y1: number) => `M${X(a)},${Y(y0)} L${X(b)},${Y(y0)} L${X(b)},${Y(y1)} L${X(a)},${Y(y1)} Z`;
  const bacaD = (m: number) => { const w = 4.6, h0 = deck(m) + 2.6, h1 = 17.7, egim = Math.tan((4 * Math.PI) / 180) * (h1 - h0); return `M${X(m - w / 2)},${Y(h0)} L${X(m + w / 2)},${Y(h0)} L${X(m + w / 2 + egim)},${Y(h1)} L${X(m - w / 2 + egim)},${Y(h1)} Z`; };
  const yanik = durum === "vurulmus" || durum === "yanan";
  return (
    <g strokeLinejoin="round">
      {/* direkler (gövdenin arkasında başlar) */}
      {[K.onDirek, K.arkaDirek].map((m, i) => <g key={i}>
        <line x1={X(m)} y1={Y(deck(m))} x2={X(m + 0.6)} y2={Y(i ? 24.6 : 25.4)} stroke={BP.direk} strokeWidth={Math.max(2.4, pxm * 0.6)} />
        <line x1={X(m) + Math.max(1, pxm * 0.25)} y1={Y(deck(m) + 3)} x2={X(m + 0.6) + Math.max(1, pxm * 0.25)} y2={Y(i ? 24.6 : 25.4)} stroke={BP.kenar} strokeWidth={Math.max(1.8, pxm * 0.3)} />
      </g>)}
      {/* iskuner arması: ince ip çizgileri (baş direk → baş, direkler arası anten) */}
      <path d={`M${X(K.onDirek + 0.6)},${Y(25.4)} L${X(1)},${Y(deck(0) + 1)} M${X(K.onDirek + 0.6)},${Y(24.4)} L${X(K.arkaDirek + 0.6)},${Y(23.6)} M${X(K.arkaDirek + 0.6)},${Y(24.6)} L${X(118)},${Y(deck(118) + 1)}`} stroke={BP.direk} strokeWidth={Math.max(0.8, pxm * 0.12)} fill="none" opacity={0.8} />
      {/* derrick bumbası: kıç direk dibinden kıça 40° */}
      <line x1={X(K.arkaDirek)} y1={Y(deck(K.arkaDirek) + 1)} x2={X(K.arkaDirek + 9.5)} y2={Y(deck(K.arkaDirek) + 1 + 8)} stroke={BP.bumba} strokeWidth={Math.max(1.4, pxm * 0.35)} />
      {/* güverte evleri + köprü üstü */}
      <path d={kutu(K.kopru[0], K.kopru[1], deck(39), deck(39) + 4.3)} fill={BP.ustGolge} stroke={BP.kontur} strokeWidth={kw * 0.8} />
      <path d={kutu(K.kopru[0] + 2, K.kopru[1] - 1, deck(39) + 4.3, deck(39) + 6.6)} fill={BP.ustGolge} stroke={BP.kontur} strokeWidth={kw * 0.8} />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={X(K.kopru[0] + 3.5 + i * 2.2)} y={Y(deck(39) + 5.8)} width={Math.max(1.5, pxm * 0.8)} height={Math.max(1.5, pxm * 0.5)} fill={BP.kontur} />)}
      <path d={kutu(46, 74, deck(60), deck(60) + 2.6)} fill={BP.ustGolge} stroke={BP.kontur} strokeWidth={kw * 0.7} />
      {/* bacalar */}
      {[K.onBaca, K.arkaBaca].map((m, i) => <g key={i}>
        <path d={bacaD(m)} fill={BP.baca} stroke={BP.kontur} strokeWidth={kw} />
        <Tara d={bacaD(m)} aci={105} aralik={Math.max(4, pxm * 1.6)} kalin={Math.max(1.2, pxm * 0.35)} renk={BP.dumanCekirdek} alfa={0.55} kutu={[X(m - 3), Y(18), X(m + 3), Y(deck(m))]} />
        <line x1={X(m + 2.3)} y1={Y(deck(m) + 2.6)} x2={X(m + 2.3 + 1.05)} y2={Y(17.7)} stroke={BP.kenar} strokeWidth={Math.max(2.5, pxm * 0.55)} />
        <line x1={X(m - 2.3 + 1.05)} y1={Y(17.7)} x2={X(m + 2.3 + 1.05)} y2={Y(17.7)} stroke={BP.kenar} strokeWidth={Math.max(1.2, pxm * 0.3)} />
      </g>)}
      {/* can botları (davitte) */}
      {K.botlar.map((m, i) => <g key={i}>
        <path d={`M${X(m - 3.7)},${Y(deck(m) + 3.4)} Q${X(m)},${Y(deck(m) + 1.6)} ${X(m + 3.7)},${Y(deck(m) + 3.4)} Z`} fill={BP.bot} stroke={BP.kontur} strokeWidth={kw * 0.7} opacity={0.9} />
        <line x1={X(m - 3.7)} y1={Y(deck(m) + 3.4)} x2={X(m + 3.7)} y2={Y(deck(m) + 3.4)} stroke={BP.kenar} strokeWidth={Math.max(1, pxm * 0.2)} />
      </g>)}
      {/* hangar: düz çatılı yüksek kutu, arka bacanın hemen gerisi; iskele yan duvarında çift kanat kapı */}
      <path d={kutu(K.hangar[0], K.hangar[1], deck(90), 11.6)} fill="#7a7690" stroke={BP.kontur} strokeWidth={kw} />
      <line x1={X(K.hangar[0])} y1={Y(11.6)} x2={X(K.hangar[1])} y2={Y(11.6)} stroke={BP.kenar} strokeWidth={Math.max(3, pxm * 0.6)} />
      <line x1={X(K.hangar[1])} y1={Y(11.6)} x2={X(K.hangar[1])} y2={Y(deck(104) + 0.4)} stroke={BP.kenar} strokeWidth={Math.max(1.3, pxm * 0.3)} />
      <path d={kutu(K.hangar[0], K.hangar[1], 10.9, 11.5)} fill={BP.dumanCekirdek} opacity={0.35} />
      <path d={kutu(91.5, 98.5, deck(95), deck(95) + 5)} fill="none" stroke={BP.kontur} strokeWidth={Math.max(1, kw * 0.6)} opacity={0.8} />
      <line x1={X(95)} y1={Y(deck(95))} x2={X(95)} y2={Y(deck(95) + 5)} stroke={BP.kontur} strokeWidth={Math.max(0.8, kw * 0.45)} opacity={0.7} />
      {yanik && <path d={`M${pts([[X(94), Y(deck(95) + 5.6)], [X(96.5), Y(deck(95) + 6.4)], [X(97.4), Y(deck(95) + 5.2)], [X(95.5), Y(deck(95) + 4.6)]])} Z`} fill={BP.dumanCekirdek} />}
      {/* gövde */}
      <path d={gD} fill="#47435f" stroke={BP.kontur} strokeWidth={kw} />
      {/* borda üst bandı biraz açık (gökten yansıma), alt gölge şeridi taramalı */}
      {/* üst borda kuşağı gökten aydınlanır (orta ton) — gövde siluetinin okunması için */}
      <path d={`M${pts(govde.slice(govde.length - 42).map((q) => [q[0], q[1]] as P2))} L${pts(govde.slice(govde.length - 42).reverse().map((q) => [q[0], q[1] + pxm * 1.5] as P2))} Z`} fill={BP.govdeOrta} />
      <Tara d={`M${X(2.4)},${Y(0)} L${X(116.6)},${Y(0)} L${X(117.5)},${Y(1.9)} L${X(1.6)},${Y(1.9)} Z`} aci={105} aralik={Math.max(5, pxm * 1.6)} kalin={Math.max(1.5, pxm * 0.36)} renk={BP.dumanCekirdek} alfa={0.6} kutu={[X(0), Y(2.2), X(119), Y(0)]} />
      <line x1={X(2.4)} x2={X(116.6)} y1={Y(0.35)} y2={Y(0.35)} stroke={BP.baca} strokeWidth={Math.max(1.5, pxm * 0.45)} />
      {/* lumbuz sırası (seed'li eksik %8) */}
      {Array.from({ length: 40 }).map((_, i) => rr(`lmb${seed}${i}`) < 0.08 ? null : <circle key={i} cx={X(8 + i * 2.6)} cy={Y(deck(8 + i * 2.6) - 2.1)} r={Math.max(0.9, pxm * 0.18)} fill={BP.dumanCekirdek} opacity={0.75} />)}
      {/* güverte kenarı ışık çizgisi + kıç yuvarlağı kenar ışığı (güneş sağ-arka) */}
      <polyline points={pts(govde.slice(govde.length - 42))} fill="none" stroke={BP.kenar} strokeWidth={Math.max(1.4, pxm * 0.32)} opacity={0.9} />
      <path d={`M${X(116.6)},${Y(0.4)} L${X(118.3)},${Y(2.2)} L${X(118.9)},${Y(deck(118.9))}`} stroke={BP.kenar} strokeWidth={Math.max(1.5, pxm * 0.4)} fill="none" />
      {/* baş platformu + ray (düz çıkıntı) */}
      <path d={kutu(K.platform[0] + 0.2, K.platform[1], deck(5) + 0.3, deck(5) + 1.0)} fill={BP.ustGolge} stroke={BP.kontur} strokeWidth={kw * 0.7} />
      <line x1={X(0.3)} x2={X(K.platform[1])} y1={Y(deck(5) + 1.0)} y2={Y(deck(5) + 1.0)} stroke={BP.kenar} strokeWidth={Math.max(1, pxm * 0.22)} />
      {/* korkuluk dikmeleri (kıç yarısı, seyrek) */}
      {Array.from({ length: 30 }).map((_, i) => { const m = 20 + i * 3.2; return m > 118 ? null : <line key={i} x1={X(m)} x2={X(m)} y1={Y(deck(m))} y2={Y(deck(m) + 1.1)} stroke={BP.kontur} strokeWidth={Math.max(0.7, pxm * 0.12)} opacity={0.7} />; })}
      {/* baş çıpa zinciri: baştan suya 35° */}
      {durum !== "batik" && <line x1={X(2.2)} y1={Y(deck(2) - 1.2)} x2={X(2.2) - Y(deck(2) - 1.2) * -0.7} y2={Y(-0.2)} stroke={BP.demir} strokeWidth={Math.max(1, pxm * 0.22)} strokeDasharray={`${Math.max(1.5, pxm * 0.3)} ${Math.max(1, pxm * 0.15)}`} />}
    </g>
  );
};

/** su yansıması: gemi siluetinin dilimli aynası (dolgu kaynak %40 + su %60, kontur yok) */
export const GemiYansima: React.FC<{ pxm: number; seed: number; boy?: number }> = ({ pxm, seed, boy = 0.6 }) => {
  const X = (m: number) => m * pxm, H = GEMI.borda * pxm * GEMI.abarti;
  const dilim = Math.max(4, pxm * 0.9), bosluk = 3, n = Math.floor((H * 1.9 * boy) / (dilim + bosluk));
  const tepeler: [number, number, number][] = [[51.1, 4.6, 17.7], [70.2, 4.6, 17.7], [90.3, 28.5, 11.6], [39.2, 12, 10.9]]; // baca, baca, hangar, köprü
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const y = 2 + i * (dilim + bosluk), dx = (rr(`yns${seed}${i}`) - 0.5) * 12, yuk = y / (pxm * GEMI.abarti);
        const parca: React.ReactNode[] = [];
        if (yuk < GEMI.borda) parca.push(<rect key="g" x={X(3) + dx} y={y} width={X(113)} height={dilim} fill="#57617e" />);
        tepeler.forEach(([m, w, h], j) => { if (yuk >= GEMI.borda && yuk < h) parca.push(<rect key={j} x={X(m - w / 2) + dx} y={y} width={X(w)} height={dilim} fill={j < 2 ? "#4f5677" : "#5a6283"} />); });
        return <g key={i}>{parca}</g>;
      })}
    </g>
  );
};
