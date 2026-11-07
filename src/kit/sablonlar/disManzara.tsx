// ===== Pencere dışı manzaraları (IC-ODA ve MASA-INSERT ortak) =====
// Hepsi SABİT çerçevede çizilir: PEN = (600, 420, 360, 370) — SB2-TOURS lucarne'ı. Kullanan şablon bunu kendi pencere
// dikdörtgenine ölçekler (translate + scale) ve açıklığa kırpar.
//  - "tours": geç gün gök, Loire sırtları, arduvaz çatı + tuffeau baca, 10–12 m ötede YUVARLAK tuffeau kule + mavi direk + T (SB2-TOURS'tan birebir)
//  - "bordeaux": sıcak gün gök, tuile canal çatılar, ufukta KÜLAHSIZ Saint-Michel + T (1834)
//  - "gece": koyu lacivert gök, birkaç yıldız, çatı silueti (telgraf gece çalışmaz → kule yok)
import React from "react";
import { ChappeKule, KolKonum } from "../../doku/ChappeKule";
import { SaintMichel } from "../../doku/SaintMichel";
import { TaramaEgri } from "../../doku/Tarama";
import { BL, DOKU_SEED, ink, poly, rnd } from "../../doku/sabitler";

export const PEN0 = { x: 600, y: 420, w: 360, h: 370 };
export type DisTur = "tours" | "bordeaux" | "gece";

const ToursDis: React.FC<{ kol: KolKonum; gergin?: number }> = ({ kol, gergin = 0 }) => {
  const S = DOKU_SEED.tours, PEN = PEN0;
  const DIREK = { x: 780, regY: 560, L: 165 };
  const DIREK_TABAN = DIREK.regY + DIREK.L * 1.52;
  const kx = 780, r = 78, ry = 14, ust = 728, alt = PEN.y + PEN.h + 40;
  const X0 = PEN.x - 30, X1 = PEN.x + PEN.w + 30;
  return (
    <g>
      <defs><linearGradient id="kitT1gok" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e2bf7e" /><stop offset="0.8" stopColor={BL.gecGunGok2} /><stop offset="1" stopColor="#f6e8c4" /></linearGradient></defs>
      <rect x={X0} y={PEN.y - 30} width={X1 - X0} height={PEN.h + 60} fill="url(#kitT1gok)" />
      <path d="M 628 520 Q 648 500 676 508 Q 696 494 720 508 Q 740 506 744 522 Z" fill="#f6ead0" />
      <path d={`M ${X0} 706 Q 660 692 730 700 Q 800 708 860 696 Q 920 688 ${X1} 700 L ${X1} 820 L ${X0} 820 Z`} fill="#bdb6a0" />
      <path d={`M ${X0} 718 Q 690 708 760 716 Q 850 724 ${X1} 712 L ${X1} 820 L ${X0} 820 Z`} fill="#a9a596" />
      <polygon points={poly([[X0, 742], [652, 712], [716, 752], [716, 820], [X0, 820]])} fill="#4a5068" />
      {[0, 1, 2, 3].map((i) => <line key={i} x1={X0} y1={754 + i * 16} x2={716} y2={770 + i * 16} stroke="#38405a" strokeWidth={1.4} />)}
      {[[628, 22, 40], [654, 16, 30]].map(([x, w, h], i) => <g key={i}><rect x={x} y={712 - h} width={w} height={h + 14} fill="#d8cfb4" stroke={ink("#d8cfb4")} strokeWidth={1.4} /><rect x={x - 2} y={712 - h - 5} width={w + 4} height={6} fill="#c9bfa2" stroke={ink("#d8cfb4")} strokeWidth={1.2} /></g>)}
      <polygon points={poly([[872, 820], [900, 744], [946, 736], [X1, 760], [X1, 820]])} fill="#5a6078" />
      <rect x={920} y={716} width={14} height={26} fill="#cfc6aa" />
      {[0, 6].map((o) => <polyline key={o} points={poly([[X1, 640 + o], [kx + 22, 700 + o * 0.4 - gergin], [kx + 6, DIREK.regY + 30 - gergin]])} stroke="#6a4a2a" strokeWidth={2} fill="none" />)}
      <path d={`M ${kx - r} ${ust} L ${kx - r} ${alt} L ${kx + r} ${alt} L ${kx + r} ${ust} A ${r} ${ry} 0 0 1 ${kx - r} ${ust} Z`} fill="#ddd4ba" />
      <TaramaEgri sol={kx - r} sag={kx + r} ust={(x) => ust + ry * Math.sqrt(Math.max(0, 1 - ((x - kx) / r) ** 2))} alt={() => alt} golgeYonu={-1} adim={6} renk={ink("#d8cfb4")} kalinlik={1.4} seed={S + 40} />
      <path d={`M ${kx + 14} ${ust + 34} L ${kx + 14} ${ust + 58} Q ${kx + 24} ${ust + 50} ${kx + 34} ${ust + 58} L ${kx + 34} ${ust + 34} Q ${kx + 24} ${ust + 28} ${kx + 14} ${ust + 34} Z`} fill="#3a3a44" stroke={ink("#d8cfb4")} strokeWidth={1.4} />
      <ellipse cx={kx} cy={ust} rx={r} ry={ry} fill="#cfc6aa" stroke={ink("#d8cfb4")} strokeWidth={1.8} />
      <ellipse cx={kx} cy={ust + 2} rx={r - 9} ry={ry - 5} fill="#8a8068" />
      <defs><clipPath id="kitT1direk"><rect x={X0} y={0} width={X1 - X0} height={ust + 3} /></clipPath></defs>
      <g clipPath="url(#kitT1direk)"><ChappeKule x={DIREK.x} y={DIREK_TABAN} L={DIREK.L} konum={kol} detay="yakin" sicakIsik={0.15} payanda={false} direkKalin={1.6} topuz={0.5} karsiKisa /></g>
      <path d={`M ${kx - r} ${ust} A ${r} ${ry} 0 0 0 ${kx + r} ${ust} L ${kx + r - 9} ${ust + 1} A ${r - 9} ${ry - 5} 0 0 1 ${kx - r + 9} ${ust + 1} Z`} fill="#e6dec6" stroke={ink("#d8cfb4")} strokeWidth={1.4} />
      <path d={`M ${kx - r} ${ust} L ${kx - r} ${alt}`} stroke={ink("#d8cfb4")} strokeWidth={1.8} />
      <path d={`M ${kx + r} ${ust} L ${kx + r} ${alt}`} stroke={ink("#d8cfb4")} strokeWidth={1.8} />
    </g>
  );
};

// Bordeaux çatı katından: tuile canal çatı denizi + baca kümeleri, ufukta külahsız Saint-Michel + Chappe T (mekanlar.md P14 kartı)
// Saint-Michel T'si bu sürümde sabit BEKLE (uzak siluet; kol animasyonu KULE-DIS'te)
const BordeauxDis: React.FC = () => {
  const X0 = PEN0.x - 30, X1 = PEN0.x + PEN0.w + 30, Y0 = PEN0.y - 30, Y1 = PEN0.y + PEN0.h + 40;
  return (
    <g>
      <defs><linearGradient id="kitBdxGok" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b9c4d8" /><stop offset="0.7" stopColor="#ecdcb8" /><stop offset="1" stopColor="#f2e2b8" /></linearGradient></defs>
      <rect x={X0} y={Y0} width={X1 - X0} height={Y1 - Y0} fill="url(#kitBdxGok)" />
      {/* Saint-Michel (külahsız, kesik tepe + T) sağ ufukta; hava perspektifi */}
      <SaintMichel x={850} y={720} h={250} renk="#b3a283" kenar="#fff1c8" kenarA={0.3} acikRenk="#8f8068" detay="orta" chappe={{ konum: "BEKLE", renk: "#2a2622" }} />
      {/* uzak çatı bandı (tuile, düşük kontrast) */}
      <path d={`M ${X0} 712 L 640 700 L 700 708 L 760 694 L 820 712 L 880 702 L ${X1} 714 L ${X1} ${Y1} L ${X0} ${Y1} Z`} fill="#c08a64" />
      {/* yakın tuile canal çatı: kiremit sıraları + baca kümesi */}
      <polygon points={poly([[X0, 760], [700, 736], [800, 752], [X1, 744], [X1, Y1], [X0, Y1]])} fill="#a4553a" />
      {Array.from({ length: 14 }).map((_, i) => { const x = X0 + 14 + i * 30; return <line key={i} x1={x} y1={758 - (x > 700 ? 6 : 0)} x2={x - 8} y2={Y1} stroke="#7a3a26" strokeWidth={3} opacity={0.6} />; })}
      {[[660, 26, 44], [690, 18, 34], [900, 22, 40]].map(([x, w, h], i) => <g key={i}><rect x={x} y={744 - h} width={w} height={h + 12} fill="#d6bf8e" stroke={ink("#d6bf8e")} strokeWidth={1.4} /><rect x={x - 3} y={744 - h - 6} width={w + 6} height={7} fill="#bfa676" /></g>)}
      {Array.from({ length: 3 }).map((_, i) => <ellipse key={i} cx={672 + i * 6} cy={680 - i * 26} rx={10 + i * 6} ry={8 + i * 4} fill="#efe6d2" opacity={0.35 - i * 0.08} />)}
    </g>
  );
};

const GeceDis: React.FC = () => {
  const X0 = PEN0.x - 30, X1 = PEN0.x + PEN0.w + 30, Y0 = PEN0.y - 30, Y1 = PEN0.y + PEN0.h + 40;
  return (
    <g>
      <defs><linearGradient id="kitGeceGok" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0f1530" /><stop offset="1" stopColor="#2a3352" /></linearGradient></defs>
      <rect x={X0} y={Y0} width={X1 - X0} height={Y1 - Y0} fill="url(#kitGeceGok)" />
      {Array.from({ length: 22 }).map((_, i) => <circle key={i} cx={X0 + rnd(5, `gx${i}`) * (X1 - X0)} cy={Y0 + rnd(5, `gy${i}`) * 260} r={1 + rnd(5, `gr${i}`) * 1.4} fill="#e8eeff" opacity={0.5} />)}
      <polygon points={poly([[X0, 730], [680, 700], [760, 740], [840, 716], [X1, 736], [X1, Y1], [X0, Y1]])} fill="#141a33" />
      <rect x={700} y={672} width={20} height={40} fill="#141a33" />
    </g>
  );
};

export const DisManzara: React.FC<{ tur: DisTur; kol: KolKonum; gergin?: number }> = ({ tur, kol, gergin }) =>
  tur === "tours" ? <ToursDis kol={kol} gergin={gergin} /> : tur === "bordeaux" ? <BordeauxDis /> : <GeceDis />;
