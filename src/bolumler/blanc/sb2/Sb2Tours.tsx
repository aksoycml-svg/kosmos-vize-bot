import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { ArsivKatmani } from "../../../doku/ArsivKatmani";
import { KonturTitreme } from "../../../doku/KonturTitreme";
import { TasDuvar } from "../../../doku/TasDuvar";
import { AhsapYuzey } from "../../../doku/AhsapYuzey";
import { PencereEskiCam } from "../../../doku/PencereEskiCam";
import { IsikKatmani, Huzme, titresim } from "../../../doku/IsikKatmani";
import { ChappeKule, KolKonum, KONUMLAR } from "../../../doku/ChappeKule";
import { BL, DOKU_SEED, P, dikdortgen, dortgen, ink, poly, rnd } from "../../../doku/sabitler";
import { IddiaYazisi } from "../../../components/EkranYazisi";
import { MEMUR_EL } from "../palet";

// ===== SB2-TOURS · P01 · TOURS-KULUBE-IC (MASA-PLAKA) · KANCA — plan karesi p = mutlak (0–156); stil karesi p 60 =====
// Tepe-önden ~60°. Işık A: geç gün ışığı (pencereden alçak sıcak güneş = anahtar, gölgeler SOL-AŞAĞI) + fener (sol, amber dolgu).
// Pencere A x 560–1000, y 450–770; dışarıda ~12 m ötede direk + TAM T (Seçenek 1). Kol 48→54 ILK→SAK "klak" (p 54), 6 kare oturma.
// Bu plaka P10 ve P23 ile aynı (MASA-PLAKA): eller hariç her şey burada.
export const SB2_TOURS_SURE = 156;
export const P01_TEMAS = { kagitSurtunme: [0, 54], klak: 54, kagitYatar: 60, eldivenTap: 140 } as const;

const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const S = DOKU_SEED.tours;
const PEN = { x: 560, y: 450, w: 440, h: 320 };
const MASA_Y = 800; // masanın arka kenarı = duvar dibi
const FENER = { x: 235, taban: 1050 };
const DIREK = { x: 842, y: 945, L: 236 }; // direk tabanı pencere altında (görünmez), regülatör ~ y 586

const kolKonum = (p: number): KolKonum => {
  const A = KONUMLAR.ILK, B = KONUMLAR.SAK;
  // 45° adım: 48→54 hareket, 54'te oturur ("şak"), 54–60 küçük taşma-oturma
  const sol = interpolate(p, [48, 54, 57, 60], [A.sol, B.sol + 4, B.sol - 1.5, B.sol], { ...cl, easing: Easing.bezier(0.16, 1, 0.3, 1) });
  return { reg: 0, sol, sag: B.sag };
};

// ---------- pencere dışı: geç gün gökyüzü, Touraine ovası, kavaklar, ana gövde çatısı, direk + T, makara hattı ----------
const Dis: React.FC<{ p: number }> = ({ p }) => {
  const k = kolKonum(p);
  const gergin = p >= 54 && p < 60 ? 2 : 0; // "şak" anında kablo 2 px gerilir
  const kav = (x: number, h: number, i: number) => <ellipse key={i} cx={x} cy={712 - h / 2} rx={h * 0.16} ry={h / 2} fill="#8a8a62" opacity={0.75} />;
  return (
    <g>
      <defs>
        <linearGradient id="t1gok" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={BL.gecGunGok} /><stop offset="0.75" stopColor={BL.gecGunGok2} /><stop offset="1" stopColor="#f6e8c4" /></linearGradient>
        <radialGradient id="t1gunes" cx="0.95" cy="0.05" r="0.8"><stop offset="0" stopColor="#fff2cc" stopOpacity={0.9} /><stop offset="1" stopColor="#fff2cc" stopOpacity={0} /></radialGradient>
      </defs>
      <rect x={PEN.x - 20} y={PEN.y - 20} width={PEN.w + 40} height={PEN.h + 40} fill="url(#t1gok)" />
      <rect x={PEN.x - 20} y={PEN.y - 20} width={PEN.w + 40} height={PEN.h + 40} fill="url(#t1gunes)" />
      {/* kâğıt kesme bulut (2 ton, alt kenarda gölge) */}
      <path d="M 590 520 Q 610 498 640 506 Q 662 488 690 504 Q 716 500 722 520 Z" fill="#f6ead0" />
      <path d="M 596 520 L 720 520 Q 700 528 650 527 Q 610 528 596 520 Z" fill="#d9bf92" />
      {/* ova: uzak bantlar göğe karışır (hava perspektifi) */}
      <path d={`M ${PEN.x - 20} 700 Q 700 694 860 699 T ${PEN.x + PEN.w + 20} 696 L ${PEN.x + PEN.w + 20} 800 L ${PEN.x - 20} 800 Z`} fill="#c9c29a" />
      <path d={`M ${PEN.x - 20} 716 Q 720 710 900 716 T ${PEN.x + PEN.w + 20} 714 L ${PEN.x + PEN.w + 20} 800 L ${PEN.x - 20} 800 Z`} fill="#b3b07e" />
      {[[600, 34], [622, 40], [646, 30], [905, 36], [926, 44]].map(([x, h], i) => kav(x, h, i))}
      <path d={`M ${PEN.x - 20} 742 L ${PEN.x + PEN.w + 20} 734 L ${PEN.x + PEN.w + 20} 800 L ${PEN.x - 20} 800 Z`} fill="#9aa06a" opacity={0.9} />
      {/* istasyonun ana gövdesi: arduvaz çatı (Tours [G ◐]: düz koyu mavi-gri, ayrıntısız), sağ altta */}
      <polygon points={poly([[760, 800], [790, 738], [960, 712], [1030, 760], [1030, 800]])} fill="#4a5068" />
      <polyline points={poly([[790, 738], [960, 712]])} stroke="#e8c88a" strokeWidth={3} opacity={0.7} fill="none" />
      {/* makara hattı: kablolar dış duvardan direğe tırmanır */}
      {[0, 7].map((o) => <polyline key={o} points={poly([[PEN.x + PEN.w + 20, 640 + o], [DIREK.x + 26, 690 + o * 0.4 - gergin], [DIREK.x + 10, 580 - gergin]])} stroke="#6a4a2a" strokeWidth={2.2} fill="none" />)}
      <circle cx={DIREK.x + 26} cy={692} r={7} fill="#3b2818" stroke="#1c1915" strokeWidth={1.5} />
      <ChappeKule x={DIREK.x} y={DIREK.y} L={DIREK.L} konum={k} detay="yakin" sicakIsik={0.25} payanda={false} />
    </g>
  );
};

// ---------- memurun eli (sol el, gri ceket kolu, çıplak, zayıf) + beyaz kahraman eldiveni ----------
const Eldiven: React.FC<{ golge?: boolean }> = ({ golge }) => {
  const g = BL.gloveHero, gk = "#d6ccb4", c = golge ? "#14110d" : g, st = golge ? "none" : ink(g);
  const parmak = (x: number, y: number, w: number, h: number, r: number, i: number) => (
    <g key={i} transform={`rotate(${r} ${x} ${y})`}><rect x={x - w / 2} y={y} width={w} height={h} rx={w / 2} fill={c} stroke={st} strokeWidth={2} />{!golge && <rect x={x + w * 0.1} y={y + 4} width={w * 0.32} height={h - 10} rx={w * 0.16} fill={gk} opacity={0.6} />}</g>
  );
  return (
    <g>
      {/* parmaklar (yerçekimiyle sarkık, hafif açık) */}
      {parmak(-27, 108, 19, 78, 6, 0)}{parmak(-8, 112, 20, 92, 2, 1)}{parmak(12, 110, 20, 88, -2, 2)}{parmak(30, 104, 17, 70, -7, 3)}
      {/* başparmak */}
      <g transform="rotate(28 -38 70)"><rect x={-48} y={64} width={19} height={62} rx={9.5} fill={c} stroke={st} strokeWidth={2} /></g>
      {/* avuç/sırt */}
      <path d="M -40 34 Q -44 80 -38 118 Q 0 130 40 116 Q 44 80 40 34 Z" fill={c} stroke={st} strokeWidth={2} />
      {!golge && <path d="M 16 40 Q 26 80 22 116 Q 34 112 39 112 Q 43 80 39 36 Z" fill={gk} opacity={0.7} />}
      {/* bilek manşeti, hafif genişleyen; üstten görülen açık ağız (sarktığını söyler) */}
      <path d="M -36 0 L 36 0 L 41 36 Q 0 42 -41 36 Z" fill={c} stroke={st} strokeWidth={2} />
      <ellipse cx={0} cy={0} rx={36} ry={9} fill={golge ? c : "#e6dcc4"} stroke={st} strokeWidth={2} />
      {!golge && <ellipse cx={0} cy={2} rx={28} ry={5.5} fill="#8a7f68" />}
      {!golge && <>
        <path d="M -38 33 Q 0 39 38 33" stroke={ink(g)} strokeWidth={1.4} fill="none" opacity={0.6} />
        {/* sırtta üç çizgili dikiş */}
        {[-13, 0, 13].map((x) => <path key={x} d={`M ${x} 52 Q ${x + 1} 74 ${x * 1.2} 100`} stroke={BL.gloveDikis} strokeWidth={2} fill="none" />)}
        <path d="M -30 6 Q -32 20 -30 30" stroke="#fffaf0" strokeWidth={3} opacity={0.6} fill="none" strokeLinecap="round" />
      </>}
    </g>
  );
};

const El: React.FC<{ golge?: boolean }> = ({ golge }) => {
  const E = MEMUR_EL;
  const f = (c: string) => (golge ? "#14110d" : c);
  const st = (c: string) => (golge ? "none" : ink(c));
  return (
    <g>
      {/* ceket kolu (sol-alt kenardan girer) */}
      <path d="M -470 330 L -40 18 Q -10 40 8 74 L -380 470 Z" fill={f(E.kol)} stroke={st(E.kol)} strokeWidth={2.5} strokeLinejoin="round" />
      {!golge && <>
        <path d="M -470 330 L -40 18 L -30 30 L -450 352 Z" fill={E.kolIsik} opacity={0.6} />
        <path d="M -400 440 L -10 62 Q 0 70 8 74 L -380 470 Z" fill={E.kolKoyu} opacity={0.65} />
        {/* dirsek yaması */}
        <path d="M -330 340 Q -290 300 -250 320 Q -270 370 -320 380 Z" fill={E.yama} opacity={0.8} stroke={ink(E.yama)} strokeWidth={1.2} />
        {[0, 1, 2].map((i) => <path key={i} d={`M ${-200 + i * 40} ${180 - i * 30} Q ${-180 + i * 40} ${200 - i * 30} ${-170 + i * 40} ${222 - i * 30}`} stroke={ink(E.kol)} strokeWidth={1.4} opacity={0.4} fill="none" />)}
      </>}
      {/* gömlek manşeti */}
      <path d="M -40 18 Q -22 6 -6 22 Q 10 44 8 74 Q -12 60 -30 50 Z" fill={f(E.manset)} stroke={st(E.manset)} strokeWidth={2} />
      {/* el kol ekseninde (−36°): zayıf, kemikli sırt; orta-yüzük-serçe kıvrık; işaret + başparmak manşeti kıstırır (EL_KISTIR) */}
      <g transform="translate(-14,44) rotate(-36)">
        {/* başparmak (altta, kıstırma noktasına uzanır) */}
        <path d="M 24 20 Q 60 40 100 38 Q 110 37 108 28 Q 76 24 40 10 Z" fill={f(E.ten)} stroke={st(E.ten)} strokeWidth={2} strokeLinejoin="round" />
        {/* kıvrık parmaklar (kısalmış görünür) */}
        {[-24, -11, 2].map((y, i) => <rect key={i} x={74} y={y} width={24 - i * 2} height={12} rx={6} fill={f(E.ten)} stroke={st(E.ten)} strokeWidth={1.8} />)}
        {/* sırt */}
        <path d="M 0 -22 Q 30 -30 66 -28 Q 82 -26 84 -14 L 84 16 Q 78 26 60 26 Q 30 26 0 22 Z" fill={f(E.ten)} stroke={st(E.ten)} strokeWidth={2} strokeLinejoin="round" />
        {/* işaret parmağı: öne-aşağı uzanır, ucu başparmakla buluşur */}
        <path d="M 72 12 Q 92 14 106 24 Q 112 32 104 36 Q 90 30 72 26 Z" fill={f(E.ten)} stroke={st(E.ten)} strokeWidth={2} strokeLinejoin="round" />
        {!golge && <>
          {[[-14, -20], [-4, -8], [6, 4], [14, 14]].map(([a1, b1], i) => <path key={i} d={`M 12 ${a1 * 0.6} Q 40 ${a1 * 0.8} 68 ${b1}`} stroke={E.tenKoyu} strokeWidth={1.3} opacity={0.45} fill="none" />)}
          {[-22, -10, 2, 14].map((y, i) => <path key={`k${i}`} d={`M 76 ${y} q 5 4 0 9`} stroke={E.tenKoyu} strokeWidth={1.6} fill="none" opacity={0.7} />)}
          <path d="M 6 -18 Q 36 -26 70 -24" stroke="#f0d2b0" strokeWidth={2.6} opacity={0.55} fill="none" strokeLinecap="round" />
          <path d="M 4 20 Q 30 24 58 24" stroke={E.tenKoyu} strokeWidth={2} opacity={0.5} fill="none" />
        </>}
      </g>
    </g>
  );
};

// ---------- fener (kare camlı, tenekeli) ----------
const Fener: React.FC<{ fl: number }> = ({ fl }) => {
  const { x, taban } = FENER;
  const tin = "#6a6a70";
  return (
    <g>
      <rect x={x - 70} y={taban - 46} width={140} height={46} fill="#4e4e54" stroke={ink(tin)} strokeWidth={2.5} />
      <rect x={x - 62} y={taban - 250} width={124} height={204} fill="#ffd98f" opacity={0.78 + 0.08 * (fl - 1) * 10} />
      <rect x={x - 62} y={taban - 250} width={124} height={204} fill="url(#t1fenerIc)" />
      {/* mum + alev */}
      <rect x={x - 11} y={taban - 120} width={22} height={74} fill="#efe6cf" />
      <ellipse cx={x} cy={taban - 138} rx={8 * fl} ry={17 * fl} fill="#fff4d0" />
      {[-62, -20, 20, 62].map((dx) => <rect key={dx} x={x + dx - 4} y={taban - 252} width={8} height={208} fill={tin} stroke={ink(tin)} strokeWidth={1.5} />)}
      <rect x={x - 70} y={taban - 262} width={140} height={14} fill={tin} stroke={ink(tin)} strokeWidth={2} />
      <polygon points={poly([[x - 66, taban - 262], [x + 66, taban - 262], [x + 20, taban - 318], [x - 20, taban - 318]])} fill="#56565c" stroke={ink(tin)} strokeWidth={2} />
      <rect x={x - 22} y={taban - 330} width={44} height={14} fill="#46464c" />
      {/* is lekesi üst kapakta */}
      <ellipse cx={x} cy={taban - 300} rx={26} ry={10} fill="#2a2420" opacity={0.45} />
      <path d={`M ${x - 18} ${taban - 330} Q ${x} ${taban - 372} ${x + 18} ${taban - 330}`} stroke="#3a3a40" strokeWidth={6} fill="none" />
      <line x1={x + 62} y1={taban - 240} x2={x + 62} y2={taban - 60} stroke="#fff6dc" strokeWidth={2} opacity={0.5} />
    </g>
  );
};

export const Sb2Tours: React.FC = () => {
  const p = useCurrentFrame();
  const cs = interpolate(p, [0, 156], [1.14, 1.0], { ...cl, easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const cy = interpolate(p, [0, 156], [40, 0], { ...cl, easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const kam = `translate(540,${960 + cy}) scale(${cs}) translate(-540,-960)`;
  const fl = titresim("fener", p, 3);
  // el: 0–54 yükselir, sonra havada; titreme sönümlenir (62–134)
  const yuk = interpolate(p, [0, 54], [70, 0], { ...cl, easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const tit = Math.sin(p * 0.9) * 2.2 * interpolate(p, [54, 134], [1, 0.25], cl);
  const EL: P = [350, 1060 + yuk];
  const EO = 1.32; // el + eldiven ölçeği (yakın plan)
  const salinim = Math.sin(p * 0.12) * 3 * interpolate(p, [54, 134], [1, 0.3], cl);
  const yukseklik = interpolate(yuk, [0, 70], [1, 0.35]); // masadan yükseklik → gölge kayması
  const GOLGE: P = [-96 * yukseklik - 24, 150 * yukseklik + 24]; // ~25 cm yükseklik → güneş gölgesi sol-aşağı belirgin ayrı
  // pencere ışık lekesi (masa üstünde, sol-aşağı uzanır) + kayıt gölgeleri
  const leke: [P, P, P, P] = [[548, 846], [968, 846], [760, 1268], [300, 1268]];
  const m = dortgen(...leke);
  return (
    <AbsoluteFill style={{ backgroundColor: "#2a2016" }}>
      <ArsivKatmani mod="gunduz">
        <AbsoluteFill>
          <svg width={1080} height={1920} viewBox="0 0 1080 1920">
            <defs>
              <linearGradient id="t1duvarKarar" gradientUnits="userSpaceOnUse" x1="0" y1="-200" x2="0" y2="800"><stop offset="0" stopColor="#4a3e34" stopOpacity={0.6} /><stop offset="0.5" stopColor="#5a4c3e" stopOpacity={0.32} /><stop offset="1" stopColor="#3a2c1e" stopOpacity={0.45} /></linearGradient>
              <radialGradient id="t1penIsik" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#ffe6b0" stopOpacity={0.55} /><stop offset="1" stopColor="#ffe6b0" stopOpacity={0} /></radialGradient>
              <radialGradient id="t1fenerIc"><stop offset="0" stopColor="#fff4d0" stopOpacity={0.7} /><stop offset="1" stopColor="#ffb357" stopOpacity={0.1} /></radialGradient>
              <linearGradient id="t1masaKarar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1e140c" stopOpacity={0.25} /><stop offset="0.5" stopColor="#1e140c" stopOpacity={0.15} /><stop offset="1" stopColor="#1e140c" stopOpacity={0.6} /></linearGradient>
              <linearGradient id="t1dip" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1e140c" stopOpacity={0} /><stop offset="1" stopColor="#1e140c" stopOpacity={0.7} /></linearGradient>
              <filter id="t1golgeBlur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation={9} /></filter>
              <filter id="t1yumusak" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation={18} /></filter>
              <clipPath id="t1leke"><polygon points={poly(leke)} /></clipPath>
            </defs>
            <g transform={kam}>
              {/* ===== DUVAR (yarı badanalı tuffeau) ===== */}
              <KonturTitreme derinlik="orta" seed={S}>
                <rect x={-120} y={-200} width={1320} height={MASA_Y + 200} fill="#e2dccb" />
                <TasDuvar m={dikdortgen(-120, 300, 1320, MASA_Y - 300)} boyut={[1320, 500]} tip="tuffeau" seed={S} derinlik="yakin" nemBandi={0.0} petek={0.25} />
                {/* badana sınırı: düzensiz dökülme kenarı + 1 yama (kapı yanı yerine pencere altı) */}
                <path d="M -120 300 L 120 300 Q 160 318 210 302 L 420 300 Q 470 330 520 304 L 1200 300 L 1200 286 L -120 288 Z" fill="#e2dccb" />
                <path d="M 120 300 Q 160 318 210 302 M 420 300 Q 470 330 520 304" stroke="#b9b29a" strokeWidth={2} fill="none" />
                <TasDuvar m={dikdortgen(-120, -200, 1320, 500)} boyut={[1320, 500]} tip="tuffeau" seed={S + 2} derinlik="uzak" yogunluk={0.15} taban="#e2dccb" blok={[1320, 500]} />
                {/* pencere nişi: kalın duvar; sol iç yan (yan ışık) + eşik üstü (tepeden görülür) */}
                <polygon points={poly([[PEN.x - 34, PEN.y - 30], [PEN.x, PEN.y], [PEN.x, PEN.y + PEN.h], [PEN.x - 34, PEN.y + PEN.h + 34]])} fill="#cdbf9e" />
                <polygon points={poly([[PEN.x - 34, PEN.y + PEN.h + 34], [PEN.x, PEN.y + PEN.h], [PEN.x + PEN.w, PEN.y + PEN.h], [PEN.x + PEN.w + 34, PEN.y + PEN.h + 34]])} fill="#e9dcbc" />
                {/* lento: meşe kiriş */}
                <AhsapYuzey m={dikdortgen(PEN.x - 60, PEN.y - 66, PEN.w + 120, 36)} boyut={[PEN.w + 120, 36]} tur="mese" seed={S + 3} derinlik="yakin" />
                {/* manipülatöre giden iki kenevir kablo: tavandaki makaradan duvardaki deliğe */}
                <rect x={970} y={-200} width={14} height={540} fill="#3b2818" opacity={0.0} />
                <circle cx={968} cy={330} r={22} fill="#5b3d25" stroke={ink("#5b3d25")} strokeWidth={2} />
                <circle cx={968} cy={330} r={6} fill={BL.brass} />
                <rect x={958} y={300} width={20} height={14} fill="#1c1915" />
                {[0, 9].map((o) => <polyline key={o} points={poly([[928 + o, -200], [944 + o, 316], [990 + o * 0.6, 392]])} stroke={BL.kenevir} strokeWidth={3.2} fill="none" />)}
                <ellipse cx={1000} cy={398} rx={18} ry={10} fill="#3a2c1e" />
              </KonturTitreme>
              {/* pencere: dış görünüm eski camın ardında */}
              <PencereEskiCam x={PEN.x} y={PEN.y} w={PEN.w} h={PEN.h} kayit={[2, 3]} dalga={4} yansima={0.12} cerceve="#5b3d25" kayitKalinlik={8} seed={31}>
                <Dis p={p} />
              </PencereEskiCam>
              {/* odanın gölgesi (duvar ışığı tutar ama oda loş): pencere çevresi parlak */}
              <path fillRule="evenodd" d={`M -120 -200 H 1200 V ${MASA_Y} H -120 Z M ${PEN.x - 4} ${PEN.y - 4} H ${PEN.x + PEN.w + 4} V ${PEN.y + PEN.h + 4} H ${PEN.x - 4} Z`} fill="url(#t1duvarKarar)" style={{ mixBlendMode: "multiply" }} />
              <path fillRule="evenodd" d={`M ${PEN.x - 440} ${PEN.y - 360} H ${PEN.x + PEN.w + 440} V ${PEN.y + PEN.h + 360} H ${PEN.x - 440} Z M ${PEN.x - 4} ${PEN.y - 4} H ${PEN.x + PEN.w + 4} V ${PEN.y + PEN.h + 4} H ${PEN.x - 4} Z`} fill="url(#t1penIsik)" style={{ mixBlendMode: "screen" }} />
              {/* fener duvarda sıcak hale */}
              <IsikKatmani kaynaklar={[{ tip: "fener", x: FENER.x, y: FENER.taban - 160, r: 420, renk: BL.amber, guc: 0.42, seed: 3 }]} />

              {/* ===== MASA (meşe, tahtalar duvara doğru akar) ===== */}
              <KonturTitreme derinlik="yakin" seed={S + 5}>
                <AhsapYuzey m={(u, v) => [(1 - u) * (-40 + v * 1160) + u * (-260 + v * 1600), MASA_Y + u * 1180]} boyut={[1180, 1300]} tur="mese" taban="#a07848" tahta={6} budak={2} seed={S + 6} derinlik="yakin" asinma={["alt"]} kenarKontur={false} cizgiKalinlik={1.6} />
                {/* mum/kâğıt lekeleri: iki halka iz + mum damlası */}
                <ellipse cx={812} cy={1490} rx={58} ry={34} fill="none" stroke="#5a3c22" strokeWidth={4} opacity={0.28} />
                <ellipse cx={180} cy={1180} rx={46} ry={26} fill="none" stroke="#5a3c22" strokeWidth={3} opacity={0.25} />
                <path d="M 330 1062 Q 340 1052 352 1060 Q 350 1072 336 1072 Z" fill="#efe6cf" opacity={0.85} />
              </KonturTitreme>
              {/* duvar dibi temas gölgesi */}
              <rect x={-120} y={MASA_Y} width={1320} height={26} fill="#1e140c" opacity={0.35} />
              {/* fener kafes gölgesi (masaya ışınsal) */}
              <g opacity={0.16 * fl} filter="url(#t1golgeBlur)">
                {[[-1.2, 0.5], [1.1, 0.6], [-0.4, 1.0], [0.5, 1.0]].map(([dx, dy], i) => <polygon key={i} points={poly([[FENER.x + dx * 50, FENER.taban - 4], [FENER.x + dx * 50 + 8, FENER.taban - 4], [FENER.x + dx * 330 + dy * 40, FENER.taban + 230 * dy], [FENER.x + dx * 330 + dy * 40 - 26, FENER.taban + 230 * dy]])} fill="#14110d" />)}
              </g>
              {/* ===== güneş lekesi (pencere izdüşümü, kayıt gölgeleriyle) ===== */}
              <g style={{ mixBlendMode: "screen" }} filter="url(#t1golgeBlur)">
                <polygon points={poly(leke)} fill="#ffcf86" opacity={0.42} />
              </g>
              <g clipPath="url(#t1leke)" opacity={0.16} style={{ mixBlendMode: "multiply" }} filter="url(#t1golgeBlur)">
                <polyline points={poly([m(0.5, 0), m(0.5, 1)])} stroke="#4a2e18" strokeWidth={9} fill="none" />
                {[1 / 3, 2 / 3].map((v) => <polyline key={v} points={poly([m(0, v), m(1, v)])} stroke="#4a2e18" strokeWidth={8} fill="none" />)}
              </g>
              <Huzme kose={[[PEN.x + 10, PEN.y + PEN.h], [PEN.x + PEN.w, PEN.y + PEN.h], [760, 1268], [300, 1268]]} renk="#fff1c8" alfa={0.14} toz={{ sayi: 40, seed: S }} />

              {/* ===== PAKET KÂĞIDI (açık, masaya yatmış) + kenevir ip + TOURS etiketi ===== */}
              <KonturTitreme derinlik="yakin" seed={S + 7}>
                <Paket />
              </KonturTitreme>

              {/* ===== EL + ELDİVEN: önce gölgeler (güneş: sol-aşağı keskin; fener: sağa yumuşak) ===== */}
              <g transform={`translate(${EL[0] + GOLGE[0]},${EL[1] + GOLGE[1]}) scale(${EO})`} opacity={0.4} filter="url(#t1golgeBlur)">
                <El golge /><g transform={`translate(89,9) rotate(${salinim * 0.6})`}><Eldiven golge /></g>
              </g>
              <g transform={`translate(${EL[0] + 70},${EL[1] + 34}) scale(${EO})`} opacity={0.12} filter="url(#t1yumusak)">
                <El golge /><g transform="translate(89,9)"><Eldiven golge /></g>
              </g>
              <g transform={`translate(${EL[0] + tit * 0.4},${EL[1] + tit}) scale(${EO})`}>
                <g transform={`translate(89,9) rotate(${salinim})`}><Eldiven /></g>
                <El />
              </g>

              {/* ===== FENER (sol) ===== */}
              <ellipse cx={FENER.x + 18} cy={FENER.taban + 4} rx={92} ry={18} fill="#14110d" opacity={0.45} filter="url(#t1golgeBlur)" />
              <Fener fl={fl} />
              <IsikKatmani kaynaklar={[{ tip: "fener", x: FENER.x + 40, y: FENER.taban + 60, r: 360, renk: "#ffb357", guc: 0.6, seed: 3 }, { tip: "fener", x: FENER.x, y: FENER.taban - 150, r: 200, renk: "#ffd98f", guc: 0.5, seed: 4 }]} />
              {/* masa önü kararır (alt güvenli alan ayrıntısız) */}
              <rect x={-200} y={MASA_Y} width={1480} height={1300} fill="url(#t1masaKarar)" style={{ mixBlendMode: "multiply" }} />
              <rect x={-200} y={1560} width={1480} height={500} fill="url(#t1dip)" />
            </g>
          </svg>
        </AbsoluteFill>
      </ArsivKatmani>
      {/* ekran yazısı: f0'dan tam görünür (kapak karesi), ÜST-BANT, açık zeminde kâğıt şerit */}
      <IddiaYazisi metin="1834. Bilgisayar yok." vurgu={["yok"]} kagitSerit />
    </AbsoluteFill>
  );
};

// Kahverengi paket kâğıdı: uzun lifler, katlama kırışıkları (ışık-gölge çifti), kenarda hafif yırtık; kenevir ip; TOURS etiketi (→P09, P10)
const Paket: React.FC = () => {
  const yirtik: P[] = [];
  for (let i = 0; i <= 14; i++) yirtik.push([242 + ((790 - 242) * i) / 14 + (rnd(S, `yx${i}`) - 0.5) * 6, 1540 + ((1500 - 1540) * i) / 14 + (rnd(S, `yy${i}`) - 0.5) * 10]);
  const kenar: P[] = [[200, 1086], [700, 1040], [748, 1110], [790, 1500], ...yirtik.slice().reverse(), [214, 1300]];
  return (
    <g>
      <defs>
        <filter id="t1lif" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.01 0.25" numOctaves={2} seed={S} /><feColorMatrix type="matrix" values="0 0 0 0 0.35  0 0 0 0 0.25  0 0 0 0 0.14  -1.5 0 0 0 0.9" /></filter>
        <clipPath id="t1paket"><polygon points={poly(kenar)} /></clipPath>
      </defs>
      <polygon points={poly(kenar.map(([x, y]) => [x - 14, y + 16] as P))} fill="#14110d" opacity={0.25} filter="url(#t1golgeBlur)" />
      <polygon points={poly(kenar)} fill={BL.paket} stroke={ink(BL.paket)} strokeWidth={2.5} strokeLinejoin="round" />
      <g clipPath="url(#t1paket)">
        <rect x={180} y={1020} width={640} height={540} filter="url(#t1lif)" opacity={0.45} />
        {/* paketin eski katları: kutu izinin kırışıkları (açık + koyu yan yana) */}
        {[[[330, 1150], [640, 1124]], [[352, 1420], [680, 1394]], [[330, 1150], [352, 1420]], [[640, 1124], [680, 1394]], [[214, 1300], [330, 1290]], [[700, 1040], [640, 1124]]].map(([a, b], i) => (
          <g key={i}><polyline points={poly([a as P, b as P])} stroke={BL.paketIsik} strokeWidth={3} fill="none" /><polyline points={poly([[a[0] + 3, a[1] + 3], [b[0] + 3, b[1] + 3]])} stroke={BL.paketGolge} strokeWidth={2.5} fill="none" /></g>
        ))}
        {/* sol üst köşe katlı kapak (yukarı kıvrık) */}
        <polygon points={poly([[200, 1086], [300, 1078], [226, 1170]])} fill={BL.paketIsik} stroke={ink(BL.paket)} strokeWidth={1.5} />
      </g>
      {/* kenevir ip: gevşek, masada kıvrımlı; bükülme işaretleri */}
      <path id="t1ip" d="M 120 1250 Q 240 1230 300 1290 Q 360 1350 470 1330 Q 600 1300 640 1360 Q 690 1440 850 1430 Q 930 1420 960 1470" stroke={BL.ip} strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M 120 1250 Q 240 1230 300 1290 Q 360 1350 470 1330 Q 600 1300 640 1360 Q 690 1440 850 1430 Q 930 1420 960 1470" stroke="#8a7a52" strokeWidth={2} strokeDasharray="3 9" fill="none" opacity={0.6} />
      <path d="M 122 1248 Q 240 1228 300 1288" stroke="#f0e6c8" strokeWidth={1.4} fill="none" opacity={0.7} />
      {/* TOURS etiketi (krem kart, ipe bağlı) */}
      <g transform="translate(860,1440) rotate(-8)">
        <rect x={-6} y={-30} width={150} height={56} rx={4} fill="#ece2c8" stroke={ink("#ece2c8")} strokeWidth={2} />
        <circle cx={6} cy={-2} r={5} fill="none" stroke={ink("#ece2c8")} strokeWidth={2} />
        <text x={78} y={12} textAnchor="middle" fontFamily="'Playfair Display', serif" fontWeight={900} fontSize={30} fill="#2b1d10">TOURS</text>
      </g>
    </g>
  );
};
