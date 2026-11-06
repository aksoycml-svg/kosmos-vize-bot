import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { ArsivKatmani } from "../../../doku/ArsivKatmani";
import { KonturTitreme } from "../../../doku/KonturTitreme";
import { TasDuvar } from "../../../doku/TasDuvar";
import { AhsapYuzey } from "../../../doku/AhsapYuzey";
import { PencereEskiCam } from "../../../doku/PencereEskiCam";
import { titresim } from "../../../doku/IsikKatmani";
import { AciklikIsigi, Isik, IsikHavuzu, izdusum } from "../../../doku/Isik";
import { Kiris, MasaKenari } from "../../../doku/Mimari";
import { GuvenliAlan, KilitNokta } from "../../../doku/GuvenliAlan";
import { ChappeKule, KolKonum, KONUMLAR } from "../../../doku/ChappeKule";
import { BL, DOKU_SEED, P, dikdortgen, ink, poly, rnd } from "../../../doku/sabitler";
import { IddiaYazisi } from "../../../components/EkranYazisi";
import { ToursEtiketi } from "../props/ToursEtiketi";
import { MEMUR_EL } from "../palet";

// ===== SB2-TOURS · P01 · TOURS-KULUBE-IC (MASA-PLAKA) · KANCA — plan karesi p (0–156); stil karesi p 60 =====
// A2: alçak tavan (kiriş + tavan kirişi uçları), beyaz tuffeau, MASA (yatay dar tahtalar, ön kenar + koyu ön yüz,
// masa üstü eşyaları) ile oda zemini ayrışır; pencere A (manipülatör kadraj dışı SAĞDA, makara ipi görünür);
// TEK güneş tanımından huzme + pencere yaması + tüm gölgeler; fener nokta ışığı → ışık havuzu (eldivenin
// p134–142'de bırakılacağı yer) + kafes gölgesi; açılmış paket (dört kanat, kat izleri, çözülmüş ip);
// eldiven manşet kenarından kıstırılmış, yumuşak sarkık. Bu plaka P10 ve P23 ile aynı (MASA-PLAKA).
export const SB2_TOURS_SURE = 156;
export const P01_TEMAS = { kagitSurtunme: [0, 54], klak: 54, kagitYatar: 60, eldivenTap: 140 } as const;

const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const S = DOKU_SEED.tours;
const PEN = { x: 560, y: 450, w: 440, h: 320 };
const MASA = { arka: 806, on: 1700 }; // masa üst düzlemi (arka kenar duvardan 6 px ayrık) → ön kenar
const DUVAR_UST = 214; // tavan kirişinin (sablière) alt kenarı
const FENER = { x: 250, taban: 1000 };
const DIREK = { x: 842, y: 945, L: 236 };
// TEK güneş: pencereden giren alçak geç gün ışığı; yüksekliği h olan noktanın gölgesi (−0.55h, +0.85h) kayar (sol-aşağı)
const GUNES: Isik = { tip: "yonlu", ad: "güneş (pencere A)", yon: [-0.55, 0.85], renk: "#ffd08a" };
// fener: nokta ışık, masada; ışık havuzu önünde (eldivenin bırakılacağı yer)
const FENER_ISIK: Isik = { tip: "nokta", ad: "fener", zemin: [FENER.x + 4, FENER.taban + 6], yukseklik: 140, renk: "#ffb357", havuz: { rx: 230, ry: 130, alfa: 0.6 } };
const HAVUZ_MERKEZ: P = [FENER.x - 40, FENER.taban + 120];

const kolKonum = (p: number): KolKonum => {
  const A = KONUMLAR.ILK, B = KONUMLAR.SAK;
  const sol = interpolate(p, [48, 54, 57, 60], [A.sol, B.sol + 4, B.sol - 1.5, B.sol], { ...cl, easing: Easing.bezier(0.16, 1, 0.3, 1) });
  return { reg: 0, sol, sag: B.sag };
};

// ---------- pencere dışı ----------
const Dis: React.FC<{ p: number }> = ({ p }) => {
  const k = kolKonum(p);
  const gergin = p >= 54 && p < 60 ? 2 : 0;
  const kav = (x: number, h: number, i: number) => <ellipse key={i} cx={x} cy={712 - h / 2} rx={h * 0.16} ry={h / 2} fill="#8a8a62" opacity={0.75} />;
  return (
    <g>
      <defs>
        <linearGradient id="t1gok" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e2bf7e" /><stop offset="0.75" stopColor={BL.gecGunGok2} /><stop offset="1" stopColor="#f6e8c4" /></linearGradient>
      </defs>
      <rect x={PEN.x - 20} y={PEN.y - 20} width={PEN.w + 40} height={PEN.h + 40} fill="url(#t1gok)" />
      <path d="M 590 520 Q 610 498 640 506 Q 662 488 690 504 Q 716 500 722 520 Z" fill="#f6ead0" />
      <path d="M 596 520 L 720 520 Q 700 528 650 527 Q 610 528 596 520 Z" fill="#d9bf92" />
      <path d={`M ${PEN.x - 20} 700 Q 700 694 860 699 T ${PEN.x + PEN.w + 20} 696 L ${PEN.x + PEN.w + 20} 800 L ${PEN.x - 20} 800 Z`} fill="#c9c29a" />
      <path d={`M ${PEN.x - 20} 716 Q 720 710 900 716 T ${PEN.x + PEN.w + 20} 714 L ${PEN.x + PEN.w + 20} 800 L ${PEN.x - 20} 800 Z`} fill="#b3b07e" />
      {[[600, 34], [622, 40], [646, 30], [905, 36], [926, 44]].map(([x, h], i) => kav(x, h, i))}
      <path d={`M ${PEN.x - 20} 742 L ${PEN.x + PEN.w + 20} 734 L ${PEN.x + PEN.w + 20} 800 L ${PEN.x - 20} 800 Z`} fill="#9aa06a" opacity={0.9} />
      <polygon points={poly([[760, 800], [790, 738], [960, 712], [1030, 760], [1030, 800]])} fill="#4a5068" />
      <polyline points={poly([[790, 738], [960, 712]])} stroke="#e8c88a" strokeWidth={3} opacity={0.7} fill="none" />
      {/* makara hattı: kablolar dış duvardan direğe */}
      {[0, 6].map((o) => <polyline key={o} points={poly([[PEN.x + PEN.w + 20, 646 + o], [DIREK.x + 20, 700 + o * 0.4 - gergin], [DIREK.x + 8, 590 - gergin]])} stroke="#6a4a2a" strokeWidth={2} fill="none" />)}
      <circle cx={DIREK.x + 20} cy={702} r={5} fill="#3b2818" />
      <ChappeKule x={DIREK.x} y={DIREK.y} L={DIREK.L} konum={k} detay="yakin" sicakIsik={0.2} payanda={false} direkKalin={1.5} topuz={0.55} />
    </g>
  );
};

// ---------- eldiven: manşet kenarının bir noktasından kıstırılmış; manşet ağzı eğik, gövde kıstırma noktasının altında sarkar ----------
// yerel orijin = kıstırma noktası (manşetin en yüksek noktası); +y aşağı. golge: tek renk gölge kopyası
const Eldiven: React.FC<{ golge?: boolean }> = ({ golge }) => {
  const g = BL.gloveHero, gk = "#d4c9b0", c = golge ? "#14110d" : g, st = golge ? "none" : ink(g);
  const parmak = (d: string, i: number) => <path key={i} d={d} fill={c} stroke={st} strokeWidth={2} strokeLinejoin="round" />;
  return (
    <g>
      {/* başparmak (yan, hafif dışa) */}
      {parmak("M -10 64 Q -32 78 -36 104 Q -38 116 -28 116 Q -20 114 -18 100 Q -14 86 -2 82 Z", 9)}
      {/* parmaklar: yumuşak, hafif kıvrık ve ayrık sarkar (deri) */}
      {parmak("M -6 118 Q -12 150 -10 182 Q -9 194 0 193 Q 8 191 8 180 Q 8 150 10 120 Z", 0)}
      {parmak("M 10 122 Q 8 160 12 200 Q 14 212 23 210 Q 31 207 30 196 Q 28 160 28 124 Z", 1)}
      {parmak("M 28 124 Q 32 160 38 194 Q 41 205 49 202 Q 56 198 54 187 Q 48 156 45 122 Z", 2)}
      {parmak("M 45 120 Q 52 146 60 168 Q 64 178 71 175 Q 77 171 74 162 Q 66 140 60 116 Z", 3)}
      {/* avuç-sırt: yumuşak, kıvrımlı kenar */}
      <path d="M -10 30 Q -16 70 -8 122 Q 26 132 62 118 Q 70 80 64 38 Z" fill={c} stroke={st} strokeWidth={2} strokeLinejoin="round" />
      {!golge && <>
        <path d="M 40 44 Q 52 80 50 118 Q 58 116 62 116 Q 68 80 62 40 Z" fill={gk} opacity={0.75} />
        {[6, 22, 38].map((x) => <path key={x} d={`M ${x} 58 Q ${x + 2} 82 ${x + 1} 108`} stroke={BL.gloveDikis} strokeWidth={2} fill="none" />)}
        <path d="M -4 96 Q 20 104 52 96" stroke={gk} strokeWidth={2.4} fill="none" />
      </>}
      {/* manşet: kıstırma noktasında katlanmış, ağız eğik (tutulmayan kenar aşağıda) */}
      <path d="M 0 0 Q -14 18 -10 34 Q 26 44 64 40 Q 70 30 66 20 Q 34 18 0 0 Z" fill={c} stroke={st} strokeWidth={2} strokeLinejoin="round" />
      {!golge && <>
        <path d="M 0 0 Q 34 12 66 20 Q 40 30 6 10 Z" fill="#7e7360" />
        <path d="M 2 2 L 8 22 M 4 4 L 16 18" stroke={ink(g)} strokeWidth={1.6} opacity={0.6} />
        <path d="M -8 30 Q 26 40 62 36" stroke={ink(g)} strokeWidth={1.3} opacity={0.5} fill="none" />
      </>}
    </g>
  );
};

// ---------- memurun eli: zayıf, çıplak; işaret parmağı manşetin İÇİNDE, başparmak DIŞINDA kıstırır ----------
// yerel orijin = kıstırma noktası. katman: "arka" (kol, el sırtı, işaret parmağı: eldivenden önce) / "on" (başparmak: eldivenden sonra)
const El: React.FC<{ katman: "arka" | "on"; golge?: boolean }> = ({ katman, golge }) => {
  const E = MEMUR_EL;
  const f = (c: string) => (golge ? "#14110d" : c);
  const st = (c: string) => (golge ? "none" : ink(c));
  if (katman === "on") {
    return (
      <g>
        {/* başparmak: manşetin dış yüzüne basar */}
        <path d="M -96 -56 Q -60 -30 -22 -10 Q 0 0 6 10 Q 4 20 -8 18 Q -36 6 -100 -42 Z" fill={f(E.ten)} stroke={st(E.ten)} strokeWidth={2} strokeLinejoin="round" />
        {!golge && <path d="M -2 6 Q 0 12 -4 14" stroke={E.tenKoyu} strokeWidth={1.6} fill="none" />}
      </g>
    );
  }
  return (
    <g>
      {/* ceket kolu: sol kenardan girer */}
      <path d="M -560 470 L -150 -102 Q -112 -96 -94 -58 L -440 560 Z" fill={f(E.kol)} stroke={st(E.kol)} strokeWidth={2.5} strokeLinejoin="round" />
      {!golge && <>
        <path d="M -560 470 L -150 -102 L -140 -92 L -540 486 Z" fill={E.kolIsik} opacity={0.6} />
        <path d="M -456 548 L -104 -66 L -94 -58 L -440 560 Z" fill={E.kolKoyu} opacity={0.65} />
        <path d="M -380 300 Q -346 268 -318 290 Q -334 330 -372 338 Z" fill={E.yama} opacity={0.85} stroke={ink(E.yama)} strokeWidth={1.2} />
      </>}
      {/* gömlek manşeti */}
      <path d="M -150 -102 Q -128 -112 -108 -96 Q -92 -80 -94 -58 Q -112 -70 -134 -78 Z" fill={f(E.manset)} stroke={st(E.manset)} strokeWidth={2} />
      {/* el sırtı: ince bilek, kemikli; parmak kökleri manşete doğru eğilir */}
      <path d="M -136 -96 Q -104 -110 -74 -98 Q -50 -88 -40 -66 Q -44 -50 -60 -48 Q -90 -50 -112 -62 Q -126 -72 -130 -80 Z" fill={f(E.ten)} stroke={st(E.ten)} strokeWidth={2} strokeLinejoin="round" />
      {/* kapalı orta-yüzük-serçe: tek yumuşak kütle (yumruk), eklem çizgileri */}
      <path d="M -62 -50 Q -40 -58 -32 -42 Q -30 -26 -46 -24 Q -64 -26 -70 -38 Z" fill={f(E.ten)} stroke={st(E.ten)} strokeWidth={1.8} strokeLinejoin="round" />
      {!golge && <path d="M -58 -40 Q -48 -36 -38 -40 M -60 -32 Q -50 -28 -40 -32" stroke={E.tenKoyu} strokeWidth={1.3} fill="none" opacity={0.6} />}
      {/* işaret parmağı: manşet ağzına girer (ucu eldivenin önyüzünün arkasında kalır) */}
      <path d="M -50 -82 Q -24 -76 -8 -50 Q 2 -28 8 6 Q 0 10 -8 4 Q -12 -22 -24 -42 Q -34 -58 -52 -64 Z" fill={f(E.ten)} stroke={st(E.ten)} strokeWidth={2} strokeLinejoin="round" />
      {!golge && <>
        {[[-120, -88, -72, -90], [-122, -78, -70, -76], [-118, -68, -72, -62]].map(([a, b, c2, d], i) => <path key={i} d={`M ${a} ${b} Q ${(a + c2) / 2} ${(b + d) / 2 - 4} ${c2} ${d}`} stroke={E.tenKoyu} strokeWidth={1.3} opacity={0.5} fill="none" />)}
        <path d="M -128 -98 Q -96 -110 -64 -98" stroke="#f0d2b0" strokeWidth={2.6} opacity={0.55} fill="none" strokeLinecap="round" />
      </>}
    </g>
  );
};

// ---------- fener ----------
const Fener: React.FC<{ fl: number }> = ({ fl }) => {
  const { x, taban } = FENER;
  const tin = "#6a6a70";
  return (
    <g>
      <rect x={x - 66} y={taban - 44} width={132} height={44} fill="#4e4e54" stroke={ink(tin)} strokeWidth={2.5} />
      <rect x={x - 58} y={taban - 240} width={116} height={196} fill="#ffd98f" opacity={0.82 + (fl - 1) * 3} />
      <rect x={x - 58} y={taban - 240} width={116} height={196} fill="url(#t1fenerIc)" />
      <rect x={x - 10} y={taban - 116} width={20} height={72} fill="#efe6cf" />
      <ellipse cx={x} cy={taban - 133} rx={8 * fl} ry={17 * fl} fill="#fff4d0" />
      {[-58, -19, 19, 58].map((dx) => <rect key={dx} x={x + dx - 4} y={taban - 242} width={8} height={200} fill={tin} stroke={ink(tin)} strokeWidth={1.5} />)}
      <rect x={x - 66} y={taban - 252} width={132} height={14} fill={tin} stroke={ink(tin)} strokeWidth={2} />
      <polygon points={poly([[x - 62, taban - 252], [x + 62, taban - 252], [x + 20, taban - 304], [x - 20, taban - 304]])} fill="#56565c" stroke={ink(tin)} strokeWidth={2} />
      <rect x={x - 22} y={taban - 316} width={44} height={14} fill="#46464c" />
      <ellipse cx={x} cy={taban - 288} rx={24} ry={9} fill="#2a2420" opacity={0.45} />
      <path d={`M ${x - 18} ${taban - 316} Q ${x} ${taban - 356} ${x + 18} ${taban - 316}`} stroke="#3a3a40" strokeWidth={6} fill="none" />
    </g>
  );
};

// ---------- açılmış paket: dört kanat dışa yatık, kat izleri (ışık+gölge), eldiven yatağı, çözülmüş ip, TOURS etiketi ----------
const KUTU = { x0: 476, x1: 746, y0: 1160, y1: 1380 }; // paketin taban yüzü (eldivenin yattığı yer)
const Paket: React.FC = () => {
  const { x0, x1, y0, y1 } = KUTU;
  const kanat = (pts: P[], ton: string, k: string) => <polygon key={k} points={poly(pts)} fill={ton} stroke={ink(BL.paket)} strokeWidth={2.2} strokeLinejoin="round" />;
  const kat = (a: P, b: P, k: string) => <g key={k}><polyline points={poly([a, b])} stroke={BL.paketIsik} strokeWidth={3.5} fill="none" /><polyline points={poly([[a[0] + 2, a[1] + 3], [b[0] + 2, b[1] + 3]])} stroke={BL.paketGolge} strokeWidth={2.5} fill="none" /></g>;
  const tirtik = (a: P, b: P, n: number, s: string): P[] => Array.from({ length: n + 1 }).map((_, i) => [a[0] + (b[0] - a[0]) * (i / n) + (rnd(S, `${s}x${i}`) - 0.5) * 5, a[1] + (b[1] - a[1]) * (i / n) + (rnd(S, `${s}y${i}`) - 0.5) * 7] as P);
  const ust: P[] = [[x0, y0], ...tirtik([x0 - 70, y0 - 120], [x1 + 60, y0 - 128], 10, "u"), [x1, y0]];
  const alt: P[] = [[x1, y1], ...tirtik([x1 + 70, y1 + 110], [x0 - 60, y1 + 118], 10, "a"), [x0, y1]];
  const sol: P[] = [[x0, y1], [x0 - 112, y1 + 30], [x0 - 120, y0 - 18], [x0, y0]];
  const sag: P[] = [[x1, y0], [x1 + 108, y0 - 22], [x1 + 116, y1 + 26], [x1, y1]];
  return (
    <g>
      <defs>
        <filter id="t1lif" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.01 0.25" numOctaves={2} seed={S} /><feColorMatrix type="matrix" values="0 0 0 0 0.35  0 0 0 0 0.25  0 0 0 0 0.14  -1.6 0 0 0 0.95" /></filter>
        <clipPath id="t1paket"><polygon points={poly([...ust.slice(1, -1), ...sag.slice(1, 3), ...alt.slice(1, -1), ...sol.slice(1, 3)])} /></clipPath>
      </defs>
      {/* masaya temas gölgesi (güneş yönünde, ince) */}
      <polygon points={poly([[x0 - 130, y0 - 110], [x1 + 125, y0 - 120], [x1 + 130, y1 + 120], [x0 - 120, y1 + 128]].map(([x, y]) => [x - 6, y + 9] as P))} fill="#14110d" opacity={0.22} filter="url(#t1golgeBlur)" />
      {kanat(ust, "#bc966a", "u")}{kanat(sag, BL.paket, "s")}{kanat(alt, "#a47e50", "a")}{kanat(sol, "#b8925e", "l")}
      <polygon points={poly([[x0, y0], [x1, y0], [x1, y1], [x0, y1]])} fill="#9c784a" stroke={ink(BL.paket)} strokeWidth={2} />
      <g clipPath="url(#t1paket)"><rect x={x0 - 140} y={y0 - 140} width={x1 - x0 + 280} height={y1 - y0 + 280} filter="url(#t1lif)" opacity={0.5} /></g>
      {/* kat izleri: tabanın dört kenarı + kanatlardaki eski katlar */}
      {kat([x0, y0], [x1, y0], "k1")}{kat([x1, y0], [x1, y1], "k2")}{kat([x0, y1], [x1, y1], "k3")}{kat([x0, y0], [x0, y1], "k4")}
      {kat([x0 - 40, y0 - 64], [x1 + 30, y0 - 70], "k5")}{kat([x1 + 50, y0 + 10], [x1 + 58, y1 - 6], "k6")}
      {/* köşe kıvrıkları */}
      <polygon points={poly([[x1 + 60, y0 - 128], [x1 + 108, y0 - 22], [x1 + 30, y0 - 90]])} fill={BL.paketIsik} stroke={ink(BL.paket)} strokeWidth={1.5} />
      <polygon points={poly([[x0 - 60, y1 + 118], [x0 - 112, y1 + 30], [x0 - 40, y1 + 70]])} fill="#c9a274" stroke={ink(BL.paket)} strokeWidth={1.5} />
      {/* eldiven yatağı: tabanda eldiven biçimli sığ kırışık */}
      <path d={`M ${x0 + 70} ${y0 + 30} Q ${x0 + 60} ${y0 + 90} ${x0 + 74} ${y0 + 150} L ${x0 + 90} ${y0 + 200} M ${x0 + 140} ${y0 + 34} Q ${x0 + 150} ${y0 + 100} ${x0 + 146} ${y0 + 150} L ${x0 + 152} ${y0 + 206}`} stroke={BL.paketGolge} strokeWidth={3} fill="none" opacity={0.8} />
      <path d={`M ${x0 + 74} ${y0 + 32} Q ${x0 + 110} ${y0 + 24} ${x0 + 140} ${y0 + 34}`} stroke={BL.paketIsik} strokeWidth={3} fill="none" />
      {/* çözülmüş kenevir ip: kanatlar boyunca, iki ucu masaya sarkık, ortada fiyonk kıvrımı izi */}
      {(["M 300 1270 Q 400 1262 476 1268 L 746 1272 Q 800 1276 860 1300 Q 905 1324 960 1318", "M 610 1012 Q 606 1080 611 1160 L 614 1380 Q 616 1440 600 1500 Q 590 1540 560 1556"] as const).map((d, i) => (
        <g key={i}><path d={d} stroke={BL.ip} strokeWidth={5} fill="none" strokeLinecap="round" /><path d={d} stroke="#8a7a52" strokeWidth={2} strokeDasharray="3 9" fill="none" opacity={0.55} /></g>
      ))}
      <path d="M 612 1270 q 10 -14 22 -4 q -6 14 -20 8 M 612 1270 q -12 12 -22 2 q 8 -12 20 -4" stroke={BL.ip} strokeWidth={4} fill="none" />
      {/* TOURS etiketi: ipin sağ ucunda (x ≤ 880; P09/P23 ile aynı çizim) */}
      <ToursEtiketi x={714} y={1458} olcek={0.4} aci={-6} />
      <path d="M 860 1300 Q 790 1380 714 1458" stroke={BL.ip} strokeWidth={3} fill="none" />
    </g>
  );
};

export const Sb2Tours: React.FC<{ guvenli?: boolean }> = ({ guvenli }) => {
  const p = useCurrentFrame();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const cs = interpolate(p, [0, 156], [1.14, 1.0], { ...cl, easing: ease });
  const cy = interpolate(p, [0, 156], [40, 0], { ...cl, easing: ease });
  const kam = `translate(540,${960 + cy}) scale(${cs}) translate(-540,-960)`;
  const ekran = (q: P): P => [540 + (q[0] - 540) * cs, 960 + cy + (q[1] - 960) * cs];
  const fl = titresim("fener", p, 3);
  // el: 0–54 yükselir; titreme sönümlenir
  const yuk = interpolate(p, [0, 54], [70, 0], { ...cl, easing: ease });
  const tit = Math.sin(p * 0.9) * 2 * interpolate(p, [54, 134], [1, 0.25], cl);
  const sal = Math.sin(p * 0.12) * 4 * interpolate(p, [54, 134], [1, 0.4], cl); // eldiven salınımı (4–6°)
  const K: P = [528, 1150 + yuk]; // kıstırma noktası (ekran, kamera öncesi)
  const EO = 1.25;
  // yükseklikler (masa düzlemi üstünde, px): el ~25 cm, eldiven ortası ~12 cm → gölge kayması TEK güneşten
  const hEl = interpolate(yuk, [0, 70], [150, 80]), hEld = hEl * 0.55;
  const ofs = (h: number): P => { const q = izdusum(GUNES, [0, 0], h); return [q[0], q[1] + h]; }; // ekranda nesne h yukarıda çizildiği için ayak = nesne + h
  const golgeEl = ofs(hEl), golgeEld = ofs(hEld);
  // pencere açıklığı köşeleri: ayak = duvar dibi (masa arka kenarı), yükseklik = masa üstünden
  const kose = [[PEN.x, PEN.y], [PEN.x + PEN.w, PEN.y], [PEN.x + PEN.w, PEN.y + PEN.h], [PEN.x, PEN.y + PEN.h]].map(([x, y]) => ({ p: [x, y] as P, ayak: [x, MASA.arka] as P, h: MASA.arka - y }));
  const kilit: KilitNokta[] = [
    { ad: "kıstırma", p: ekran(K), tur: "dokunus" },
    { ad: "eldiven ucu", p: ekran([K[0] + 30 * EO, K[1] + 205 * EO]), tur: "dokunus" },
    { ad: "T regülatör", p: ekran([DIREK.x, DIREK.y - DIREK.L * 1.52]), tur: "kurulum" },
    { ad: "fener havuzu", p: ekran(HAVUZ_MERKEZ), tur: "kurulum" },
    { ad: "fener tabanı", p: ekran([FENER.x, FENER.taban]), tur: "temas" },
    { ad: "TOURS etiketi", p: ekran([714 + 150, 1458]), tur: "kurulum" },
  ];
  return (
    <AbsoluteFill style={{ backgroundColor: "#2a2016" }}>
      <ArsivKatmani mod="gunduz">
        <AbsoluteFill>
          <svg width={1080} height={1920} viewBox="0 0 1080 1920">
            <defs>
              <radialGradient id="t1fenerIc"><stop offset="0" stopColor="#fff4d0" stopOpacity={0.7} /><stop offset="1" stopColor="#ffb357" stopOpacity={0.1} /></radialGradient>
              <radialGradient id="t1duvarFener" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#ffcf86" stopOpacity={0.35} /><stop offset="1" stopColor="#ffcf86" stopOpacity={0} /></radialGradient>
              <linearGradient id="t1kose" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#3a2c1e" stopOpacity={0.35} /><stop offset="0.25" stopColor="#3a2c1e" stopOpacity={0} /><stop offset="0.8" stopColor="#3a2c1e" stopOpacity={0} /><stop offset="1" stopColor="#3a2c1e" stopOpacity={0.25} /></linearGradient>
              <linearGradient id="t1masaKarar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1e140c" stopOpacity={0.05} /><stop offset="0.6" stopColor="#1e140c" stopOpacity={0.12} /><stop offset="1" stopColor="#1e140c" stopOpacity={0.4} /></linearGradient>
              <radialGradient id="t1havuz"><stop offset="0" stopColor="#ffbe6a" stopOpacity={0.3} /><stop offset="1" stopColor="#ffbe6a" stopOpacity={0} /></radialGradient>
              <filter id="t1golgeBlur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation={7} /></filter>
              <filter id="t1yumusak" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation={16} /></filter>
            </defs>
            <g transform={kam}>
              {/* ===== DUVAR: beyaz tuffeau (alt yarı çıplak taş, üst yarı badana) ===== */}
              <KonturTitreme derinlik="orta" seed={S}>
                <rect x={-120} y={DUVAR_UST} width={1320} height={MASA.arka - DUVAR_UST} fill="#ebe5d2" />
                <TasDuvar m={dikdortgen(-120, 470, 1320, MASA.arka - 470)} boyut={[1320, 336]} tip="tuffeau" seed={S} derinlik="yakin" nemBandi={0.25} petek={0.3} />
                <path d="M -120 470 L 140 470 Q 180 490 230 472 L 430 470 Q 470 494 520 474 L 1200 470 L 1200 456 L -120 458 Z" fill="#ebe5d2" />
                <path d="M 140 470 Q 180 490 230 472 M 430 470 Q 470 494 520 474" stroke="#b9b29a" strokeWidth={2} fill="none" />
                {/* badana kabarması */}
                {[[120, 330, 40], [380, 300, 30], [210, 400, 26]].map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.6} fill="#fffaf0" opacity={0.18} />)}
                {/* pencere nişi */}
                <polygon points={poly([[PEN.x - 34, PEN.y - 30], [PEN.x, PEN.y], [PEN.x, PEN.y + PEN.h], [PEN.x - 34, PEN.y + PEN.h + 30]])} fill="#d8d0b8" />
                <polygon points={poly([[PEN.x - 34, PEN.y + PEN.h + 30], [PEN.x, PEN.y + PEN.h], [PEN.x + PEN.w, PEN.y + PEN.h], [PEN.x + PEN.w + 30, PEN.y + PEN.h + 30]])} fill="#f2ead4" />
                <AhsapYuzey m={dikdortgen(PEN.x - 60, PEN.y - 64, PEN.w + 120, 34)} boyut={[PEN.w + 120, 34]} tur="mese" seed={S + 3} derinlik="yakin" />
                {/* manipülatöre giden iki kenevir kablo: duvardaki delikten kiriş makarasına, oradan kadraj dışı SAĞDAKİ manipülatöre iner */}
                <ellipse cx={1012} cy={402} rx={16} ry={9} fill="#3a2c1e" />
                {[0, 8].map((o) => <polyline key={o} points={poly([[1008 + o * 0.5, 400], [968 + o, 262], [1090, 330 + o * 2]])} stroke={BL.kenevir} strokeWidth={3.4} fill="none" />)}
              </KonturTitreme>
              {/* ===== ALÇAK TAVAN: sablière (duvar üstü kiriş) + kameraya uzanan tavan kirişlerinin uçları ===== */}
              <rect x={-120} y={-200} width={1320} height={DUVAR_UST + 200} fill="#2e2016" />
              {[-60, 300, 660, 1020].map((x, i) => <Kiris key={i} on={[[x - 40, -200], [x + 100, -200], [x + 60, DUVAR_UST - 40], [x, DUVAR_UST - 40]]} seed={S + 20 + i} derinlik="uzak" />)}
              <Kiris on={[[-120, DUVAR_UST - 46], [1200, DUVAR_UST - 46], [1200, DUVAR_UST], [-120, DUVAR_UST]]} alt={[[-120, DUVAR_UST], [1200, DUVAR_UST], [1200, DUVAR_UST + 10], [-120, DUVAR_UST + 10]]} seed={S + 30} derinlik="orta" />
              <g><circle cx={968} cy={256} r={18} fill="#5b3d25" stroke={ink("#5b3d25")} strokeWidth={2} /><circle cx={968} cy={256} r={5} fill={BL.brass} /><rect x={960} y={DUVAR_UST - 4} width={16} height={26} fill="#1c1915" /></g>
              {/* pencere */}
              <PencereEskiCam x={PEN.x} y={PEN.y} w={PEN.w} h={PEN.h} kayit={[2, 3]} dalga={3} yansima={0.1} cerceve="#5b3d25" kayitKalinlik={8} seed={31}>
                <Dis p={p} />
              </PencereEskiCam>
              {/* oda köşeleri hafif koyu; fener duvara sıcak hale düşürür */}
              <rect x={-120} y={DUVAR_UST} width={1320} height={MASA.arka - DUVAR_UST} fill="url(#t1kose)" style={{ mixBlendMode: "multiply" }} />
              <ellipse cx={FENER.x} cy={FENER.taban - 200} rx={360} ry={300} fill="url(#t1duvarFener)" style={{ mixBlendMode: "screen" }} />

              {/* ===== MASA: dar yatay meşe tahtalar (perspektifte öne doğru genişler), arka kenar duvardan ayrık ===== */}
              <rect x={-120} y={MASA.arka - 6} width={1320} height={8} fill="#1e140c" opacity={0.7} />
              <KonturTitreme derinlik="yakin" seed={S + 5}>
                <AhsapYuzey m={(u, v) => { const t = v * v * 0.35 + v * 0.65; return [-140 + u * 1360, MASA.arka + t * (MASA.on - MASA.arka)]; }} boyut={[1360, 900]} tur="mese" taban="#9a7046" tahta={11} budak={2} seed={S + 6} derinlik="yakin" asinma={["alt"]} kenarKontur={false} cizgiKalinlik={1.3} />
                {/* mum/kâğıt halka izleri */}
                <ellipse cx={180} cy={1210} rx={50} ry={22} fill="none" stroke="#5a3c22" strokeWidth={3} opacity={0.3} />
                <ellipse cx={930} cy={1580} rx={62} ry={28} fill="none" stroke="#5a3c22" strokeWidth={4} opacity={0.28} />
                {/* masa üstü kullanım nesneleri: hokka + kaz tüyü, ciltli kayıt defteri */}
                <g>
                  <ellipse cx={840} cy={900} rx={34} ry={12} fill="#14110d" opacity={0.3} />
                  <path d="M 812 896 L 812 866 Q 840 856 868 866 L 868 896 Q 840 906 812 896 Z" fill="#2a2a30" stroke={ink("#2a2a30")} strokeWidth={2} />
                  <ellipse cx={840} cy={866} rx={28} ry={8} fill="#141418" />
                  <path d="M 846 866 L 900 760 Q 912 756 906 772 Z" fill="#e8e0cc" stroke={ink("#e8e0cc")} strokeWidth={1.4} />
                </g>
                <g>
                  <polygon points={poly([[850, 930], [1040, 912], [1048, 1018], [858, 1040]])} fill="#5a3a22" stroke={ink("#5a3a22")} strokeWidth={2} />
                  <polygon points={poly([[858, 1040], [1048, 1018], [1048, 1030], [860, 1052]])} fill="#e9dfc9" />
                  <line x1={854} y1={966} x2={1044} y2={948} stroke="#3a2416" strokeWidth={4} />
                </g>
                <path d="M 360 1028 Q 370 1018 382 1026 Q 380 1038 366 1038 Z" fill="#efe6cf" opacity={0.85} />
              </KonturTitreme>
              {/* oda loş: masa ışık dışında kararır (chiaroscuro); ışık yaması ve fener havuzu bunun ÜSTÜNE gelir */}
              <rect x={-200} y={MASA.arka} width={1480} height={MASA.on - MASA.arka} fill="#5a4030" opacity={0.42} style={{ mixBlendMode: "multiply" }} />
              <AciklikIsigi isik={GUNES} kose={kose} kayit={[2, 3]} alfa={0} yamaAlfa={0.55} huzmeYok />
              <IsikHavuzu isik={{ ...FENER_ISIK, zemin: HAVUZ_MERKEZ }} guc={fl * 1.3} />
              <ellipse cx={HAVUZ_MERKEZ[0]} cy={HAVUZ_MERKEZ[1]} rx={200} ry={110} fill="url(#t1havuz)" />
              {/* ===== TEK GÜNEŞ: pencere biçimli masa yaması (kayıt gölgeli) + huzme + toz ===== */}
              <AciklikIsigi isik={GUNES} kose={kose} kayit={[2, 3]} alfa={0.14} yamaAlfa={0.2} toz={{ sayi: 40, seed: S }} />
              {/* ===== FENER: masada temas gölgesi + kafes gölgeleri + ışık havuzu (eldivenin bırakılacağı yer) ===== */}
              <g opacity={0.2} filter="url(#t1golgeBlur)">
                {[[-60, 8], [60, 8], [-24, 16], [24, 16]].map(([dx, dy], i) => { const a: P = [FENER.x + dx, FENER.taban + dy]; const b = izdusum({ ...FENER_ISIK, yukseklik: 260 }, a, 200); return <polygon key={i} points={poly([[a[0] - 4, a[1]], [a[0] + 4, a[1]], [b[0] + 10, b[1]], [b[0] - 10, b[1]]])} fill="#14110d" />; })}
              </g>
              <ellipse cx={FENER.x + 6} cy={FENER.taban + 2} rx={78} ry={14} fill="#14110d" opacity={0.55} filter="url(#t1golgeBlur)" />
              <ellipse cx={FENER.x + 2} cy={FENER.taban} rx={66} ry={7} fill="#14110d" opacity={0.6} />

              {/* masa önü hafif kararır (el/eldivenden ÖNCE: kahraman eldiven derecelendirmede beyaz kalır) */}
              <rect x={-200} y={MASA.arka} width={1480} height={MASA.on - MASA.arka} fill="url(#t1masaKarar)" style={{ mixBlendMode: "multiply" }} />
              {/* ===== AÇILMIŞ PAKET ===== */}
              <KonturTitreme derinlik="yakin" seed={S + 7}><Paket /></KonturTitreme>

              {/* ===== EL + ELDİVEN: gölgeler TEK güneşten (izdusum), fener gölgesi ters yönde soluk ===== */}
              <g opacity={0.38} filter="url(#t1golgeBlur)">
                <g transform={`translate(${K[0] + golgeEl[0]},${K[1] + golgeEl[1]}) scale(${EO})`}><El katman="arka" golge /></g>
                <g transform={`translate(${K[0] + golgeEld[0]},${K[1] + golgeEld[1]}) scale(${EO}) rotate(${sal})`}><Eldiven golge /></g>
              </g>
              <g transform={`translate(${K[0] + tit * 0.4},${K[1] + tit})`}>
                <g transform={`scale(${EO})`}><El katman="arka" /></g>
                <g transform={`scale(${EO}) rotate(${sal})`}><Eldiven /></g>
                <g transform={`scale(${EO})`}><El katman="on" /></g>
              </g>

              <Fener fl={fl} />
              {/* masa ön kenarı + koyu ön yüz (alt güvenli alan ayrıntısız) */}
              <MasaKenari sol={[-140, MASA.on]} sag={[1220, MASA.on]} kalin={38} onYuzAlt={2100} renk="#8a5e36" />
            </g>
          </svg>
        </AbsoluteFill>
      </ArsivKatmani>
      <IddiaYazisi metin="1834. Bilgisayar yok." vurgu={["yok"]} kagitSerit />
      {guvenli && <GuvenliAlan noktalar={kilit} aktifBant="ust" baslik={`SB2-TOURS p${p}`} />}
    </AbsoluteFill>
  );
};
