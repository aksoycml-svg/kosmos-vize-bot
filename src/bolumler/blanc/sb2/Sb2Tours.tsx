import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { ArsivKatmani } from "../../../doku/ArsivKatmani";
import { KonturTitreme } from "../../../doku/KonturTitreme";
import { TasDuvar } from "../../../doku/TasDuvar";
import { AhsapYuzey } from "../../../doku/AhsapYuzey";
import { titresim } from "../../../doku/IsikKatmani";
import { AciklikIsigi, Isik, IsikHavuzu, izdusum } from "../../../doku/Isik";
import { Kiris, MasaKenari } from "../../../doku/Mimari";
import { Kemer } from "../../../doku/Kemer";
import { Desen, RenkKaydi, Tarama, TARAMA_ARALIK, TARAMA_KALINLIK, TaramaEgri, taramaAcisi } from "../../../doku/Tarama";
import { GuvenliAlan, KilitNokta } from "../../../doku/GuvenliAlan";
import { ChappeKule, KolKonum, KONUMLAR } from "../../../doku/ChappeKule";
import { BL, DOKU_SEED, P, dikdortgen, ink, poly } from "../../../doku/sabitler";
import { IddiaYazisi } from "../../../components/EkranYazisi";
import { KolEl, KISTIR_YEREL, elMatris, EL_BOY_YEREL } from "../../../rig/KolEl";
import { PaketKagidi } from "../props/PaketKagidi";
import { Eldiven } from "../props/Eldiven";

// ===== SB2-TOURS · P01 · TOURS-KULUBE-IC (MASA-PLAKA) · KANCA — plan karesi p (0–156) =====
// A3 (mekanlar.md 10.4, sahne-plani v2.5): kent içindeki istasyonun ÇATI KATI BÜROSU; pencere A = basık kemerli LUCARNE
// (iki kanat, küçük camlar); dışarıda Tours çatıları (arduvaz) + 10–12 m ötede YUVARLAK tuffeau kule, mavi direk + T.
// Kol: f0 BEKLE (düz T) → p48–54 → B (sol 90 / sağ dışa-yukarı 45) "şak" p54. Paket: YUMUŞAK kâğıt (PaketKagidi), ip çözük.
// Kol+el: KolEl (koni kol, dirsek, manşetler, kemikli el, "kistir"). Eldiven p134–142 fener ışık havuzuna bırakılır, "tap" p140.
// Işık: TEK güneş (pencere) → masa yaması + huzme + el/eldiven gölgesi (taramalı); fener nokta ışığı → havuz.
// Palet (mekân, 6 + ışık): badana/tuffeau #e2dccb · masa meşe #9a7046 · koyu ahşap #4a3220 · paket kâğıdı #b08a5a · arduvaz #4a5068 · teneke #5a5a60 + güneş #ffd08a.
export const SB2_TOURS_SURE = 156;
export const P01_TEMAS = { kagitSurtunme: [0, 54], klak: 54, kagitYatar: 60, eldivenTap: 140 } as const;
export const P01_KONTROL = [0, 54, 60, 100, 140, 155];

const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const S = DOKU_SEED.tours;
// A4b (sahne-plani v2.6 P01, TC2): cam 360×370 (x 600–960, y 420–790); direk x 780; regülatör L 165 (y 560), gösterge ≈ 72 (2.3:1).
// B'nin uçları: sol gösterge ucu y 488, sağ ucu (913, 509) — cam kenarından ≥ 25 px içeride. Kanatlar AÇIK (içe açılır, niş yanaklarına
// yaslı): kayıt/kuşak T'yi bölmez (onay bekliyor: mekân sorumlusu "iki kanat, küçük camlar" — kanatlar korunuyor, yalnız açık).
const PEN = { x: 600, y: 420, w: 360, h: 370 };
const MASA = { arka: 820, on: 1700, onYuz: 120 };
const DUVAR_UST = 214;
// fener x 430 (TC3); ışık havuzu fener TABANINDAN türer (nokta ışık zemini = taban), eldiven p140'ta havuzun içine bırakılır
const FENER = { x: 430, taban: 1092 };
const HAVUZ: P = [FENER.x, FENER.taban + 8];
const DIREK = { x: 780, regY: 560, L: 165 };
const DIREK_TABAN = DIREK.regY + DIREK.L * 1.52; // direk dibi (kule terasında, parapetin arkasında)
const KULE = { x: 780, r: 78, ust: 728 }; // yuvarlak tuffeau kule: parapet ağzı (elips) y 728
const PAKET: P = [690, 1340];
const PAKET_OLCEK = 1.15; // eldiven yatağı yeni eldiven ölçüsüne göre büyür
const EO = 1.9; // KolEl el ölçeği: el boyu = EL_BOY_YEREL × EO ≈ 266 px
const EL_BOYU = EL_BOY_YEREL * EO;
const GUNES: Isik = { tip: "yonlu", ad: "güneş (lucarne)", yon: [-0.55, 0.85], renk: "#ffd08a" };
const FENER_ISIK: Isik = { tip: "nokta", ad: "fener", zemin: HAVUZ, yukseklik: 133, renk: "#ffb357", havuz: { rx: 300, ry: 160, alfa: 0.8 } };
const TH = taramaAcisi(GUNES); // sahnenin tek tarama yönü

const kolKonum = (p: number): KolKonum => {
  const A = KONUMLAR.BEKLE, B = KONUMLAR.SAK;
  const e = Easing.bezier(0.16, 1, 0.3, 1);
  const sol = interpolate(p, [48, 54, 57, 60], [A.sol, B.sol + 4, B.sol - 1.5, B.sol], { ...cl, easing: e });
  const sag = interpolate(p, [48, 54, 57, 60], [A.sag, B.sag + 4, B.sag - 1.5, B.sag], { ...cl, easing: e });
  return { reg: 0, sol, sag };
};

// ---------- lucarne dışı: geç gün gök, Loire ovası (alçak yuvarlak sırtlar, dağ YOK), Tours arduvaz çatıları + baca kümesi,
// 10–12 m ötede YUVARLAK tuffeau kulenin üst bölümü (elips parapet + eğri gövdede 1 pencere), mavi direk + T (TC4) ----------
const Dis: React.FC<{ p: number }> = ({ p }) => {
  const k = kolKonum(p);
  const gergin = p >= 54 && p < 60 ? 2 : 0;
  const kx = KULE.x, r = KULE.r, ry = 14, ust = KULE.ust, alt = PEN.y + PEN.h + 40;
  const X0 = PEN.x - 30, X1 = PEN.x + PEN.w + 30;
  return (
    <g>
      <defs><linearGradient id="t1gok" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e2bf7e" /><stop offset="0.8" stopColor={BL.gecGunGok2} /><stop offset="1" stopColor="#f6e8c4" /></linearGradient></defs>
      <rect x={X0} y={PEN.y - 30} width={X1 - X0} height={PEN.h + 60} fill="url(#t1gok)" />
      <path d="M 628 520 Q 648 500 676 508 Q 696 494 720 508 Q 740 506 744 522 Z" fill="#f6ead0" />
      {/* Loire ovası: çok alçak yuvarlak sırtlar (coteaux), hava perspektifi #a9a596, düşük kontrast — sivri tepe YOK */}
      <path d={`M ${X0} 706 Q 660 692 730 700 Q 800 708 860 696 Q 920 688 ${X1} 700 L ${X1} 820 L ${X0} 820 Z`} fill="#bdb6a0" />
      <path d={`M ${X0} 718 Q 690 708 760 716 Q 850 724 ${X1} 712 L ${X1} 820 L ${X0} 820 Z`} fill="#a9a596" />
      {/* yakın arduvaz çatı yamacı (sol, dik) + tuffeau baca kümesi */}
      <polygon points={poly([[X0, 742], [652, 712], [716, 752], [716, 820], [X0, 820]])} fill="#4a5068" />
      {[0, 1, 2, 3].map((i) => <line key={i} x1={X0} y1={754 + i * 16} x2={716} y2={770 + i * 16} stroke="#38405a" strokeWidth={1.4} />)}
      {[[628, 22, 40], [654, 16, 30]].map(([x, w, h], i) => <g key={i}><rect x={x} y={712 - h} width={w} height={h + 14} fill="#d8cfb4" stroke={ink("#d8cfb4")} strokeWidth={1.4} /><rect x={x - 2} y={712 - h - 5} width={w + 4} height={6} fill="#c9bfa2" stroke={ink("#d8cfb4")} strokeWidth={1.2} /></g>)}
      {/* sağda uzak çatı + tek baca (orta mesafe: oran, ayrıntı yok) */}
      <polygon points={poly([[872, 820], [900, 744], [946, 736], [X1, 760], [X1, 820]])} fill="#5a6078" />
      <rect x={920} y={716} width={14} height={26} fill="#cfc6aa" />
      {/* makara hattı: kablolar lucarne kenarından direk tepesine */}
      {[0, 6].map((o) => <polyline key={o} points={poly([[X1, 640 + o], [kx + 22, 700 + o * 0.4 - gergin], [kx + 6, DIREK.regY + 30 - gergin]])} stroke="#6a4a2a" strokeWidth={2} fill="none" />)}
      {/* yuvarlak kule: eğri gövde (tuffeau, form takipli tarama: gölge solda), 1 pencere, parapet ağzı elipsi (iç yüz gölgede) */}
      <path d={`M ${kx - r} ${ust} L ${kx - r} ${alt} L ${kx + r} ${alt} L ${kx + r} ${ust} A ${r} ${ry} 0 0 1 ${kx - r} ${ust} Z`} fill="#ddd4ba" />
      <TaramaEgri sol={kx - r} sag={kx + r} ust={(x) => ust + ry * Math.sqrt(Math.max(0, 1 - ((x - kx) / r) ** 2))} alt={() => alt} golgeYonu={-1} adim={6} renk={ink("#d8cfb4")} kalinlik={1.4} seed={S + 40} />
      {[0.25, 0.55].map((t) => <path key={t} d={`M ${kx - r} ${ust + 22 + t * 60} A ${r} ${ry} 0 0 0 ${kx + r} ${ust + 22 + t * 60}`} stroke={ink("#d8cfb4")} strokeWidth={1.2} opacity={0.5} fill="none" />)}
      <path d={`M ${kx + 14} ${ust + 34} L ${kx + 14} ${ust + 58} Q ${kx + 24} ${ust + 50} ${kx + 34} ${ust + 58} L ${kx + 34} ${ust + 34} Q ${kx + 24} ${ust + 28} ${kx + 14} ${ust + 34} Z`} fill="#3a3a44" stroke={ink("#d8cfb4")} strokeWidth={1.4} />
      <ellipse cx={kx} cy={ust} rx={r} ry={ry} fill="#cfc6aa" stroke={ink("#d8cfb4")} strokeWidth={1.8} />
      <ellipse cx={kx} cy={ust + 2} rx={r - 9} ry={ry - 5} fill="#8a8068" />
      {/* direk + T: dibi kule terasının ortasında (parapet ağzının içinde kırpılır; payanda yok) */}
      <defs><clipPath id="t1direk"><rect x={X0} y={0} width={X1 - X0} height={ust + 3} /></clipPath></defs>
      <g clipPath="url(#t1direk)"><ChappeKule x={DIREK.x} y={DIREK_TABAN} L={DIREK.L} konum={k} detay="yakin" sicakIsik={0.15} payanda={false} direkKalin={1.6} topuz={0.5} karsiKisa /></g>
      {/* direk dibi parapetin içinde: ön dudak direğin önünden geçer */}
      <path d={`M ${kx - r} ${ust} A ${r} ${ry} 0 0 0 ${kx + r} ${ust} L ${kx + r - 9} ${ust + 1} A ${r - 9} ${ry - 5} 0 0 1 ${kx - r + 9} ${ust + 1} Z`} fill="#e6dec6" stroke={ink("#d8cfb4")} strokeWidth={1.4} />
      <path d={`M ${kx - r} ${ust} L ${kx - r} ${alt}`} stroke={ink("#d8cfb4")} strokeWidth={1.8} />
      <path d={`M ${kx + r} ${ust} L ${kx + r} ${alt}`} stroke={ink("#d8cfb4")} strokeWidth={1.8} />
    </g>
  );
};

const Fener: React.FC<{ fl: number }> = ({ fl }) => {
  const { x, taban } = FENER;
  const tin = "#5a5a60";
  return (
    <g>
      <rect x={x - 66} y={taban - 44} width={132} height={44} fill="#4e4e54" stroke={ink(tin)} strokeWidth={2.5} />
      <rect x={x - 58} y={taban - 240} width={116} height={196} fill="#ffd98f" opacity={0.85} />
      <rect x={x - 10} y={taban - 116} width={20} height={72} fill="#efe6cf" />
      <ellipse cx={x} cy={taban - 133} rx={8 * fl} ry={17 * fl} fill="#fff4d0" />
      {[-58, -19, 19, 58].map((dx) => <rect key={dx} x={x + dx - 4} y={taban - 242} width={8} height={200} fill={tin} stroke={ink(tin)} strokeWidth={1.5} />)}
      <rect x={x - 66} y={taban - 252} width={132} height={14} fill={tin} stroke={ink(tin)} strokeWidth={2} />
      <polygon points={poly([[x - 62, taban - 252], [x + 62, taban - 252], [x + 20, taban - 304], [x - 20, taban - 304]])} fill="#4e4e54" stroke={ink(tin)} strokeWidth={2} />
      <rect x={x - 22} y={taban - 316} width={44} height={14} fill="#46464c" />
      <path d={`M ${x - 18} ${taban - 316} Q ${x} ${taban - 356} ${x + 18} ${taban - 316}`} stroke="#3a3a40" strokeWidth={6} fill="none" />
    </g>
  );
};

// açık (içe açılmış) kanat: niş yanağına yaslı, perspektifte daralan; küçük camlar (2 × 4) — T'yi bölmez
const AcikKanat: React.FC<{ yan: -1 | 1 }> = ({ yan }) => {
  const x0 = yan < 0 ? PEN.x : PEN.x + PEN.w, d = yan < 0 ? -40 : 32;
  const q: P[] = [[x0, PEN.y + 6], [x0 + d, PEN.y - 20], [x0 + d, PEN.y + PEN.h + 30], [x0, PEN.y + PEN.h]];
  const L = (u: number, v: number): P => { const a = lp(q[0], q[3], v), b = lp(q[1], q[2], v); return lp(a, b, u); };
  const ah = "#4a3220";
  return (
    <g>
      <polygon points={poly(q)} fill={ah} stroke={ink(ah)} strokeWidth={2.5} />
      {[0.25, 0.5, 0.75].map((v) => <polyline key={v} points={poly([L(0.15, v), L(0.85, v)])} stroke={ink(ah)} strokeWidth={2} />)}
      {[0, 1, 2, 3].map((i) => <polygon key={i} points={poly([L(0.18, i * 0.25 + 0.03), L(0.82, i * 0.25 + 0.03), L(0.82, i * 0.25 + 0.22), L(0.18, i * 0.25 + 0.22)])} fill="#cdbf9a" opacity={0.55} />)}
    </g>
  );
};
const lp = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

export const Sb2Tours: React.FC<{ guvenli?: boolean }> = ({ guvenli }) => {
  const p = useCurrentFrame();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const cs = interpolate(p, [0, 156], [1.14, 1.06], { ...cl, easing: ease });
  const cy = interpolate(p, [0, 156], [40, 0], { ...cl, easing: ease });
  const kam = `translate(540,${960 + cy}) scale(${cs}) translate(-540,-960)`;
  const ekran = (q: P): P => [540 + (q[0] - 540) * cs, 960 + cy + (q[1] - 960) * cs];
  const fl = titresim("fener", p, 3);
  // ----- el / eldiven hareketi -----
  const yuk = interpolate(p, [0, 54], [30, 0], { ...cl, easing: ease });         // 0–54 eldiven kâğıttan çekilir
  const tasi = interpolate(p, [122, 140], [0, 1], { ...cl, easing: Easing.inOut(Easing.cubic) }); // havuza indirir, 140'ta bırakır
  const birak = p >= 140;
  const geri = interpolate(p, [141, 152], [0, 1], { ...cl, easing: ease });     // TC7: bırakınca kol hafif geri çekilir
  const tit = (Math.sin(p * 0.95) * 2) * interpolate(p, [54, 134], [1, 0.2], cl);  // ~9 Hz titreme sönümlenir
  const sal = Math.sin(p * 0.12) * 4 * interpolate(p, [54, 122], [1, 0.4], cl);
  const B0: P = [372, 1176];
  const BIR: P = [-178, 52]; // bırakma: el sola-aşağı iner, eldiven fener havuzuna (parmaklar sürüklenip sağa-aşağı yatar)
  const bilek: P = [B0[0] + BIR[0] * tasi - 50 * geri, B0[1] + yuk + tit + BIR[1] * tasi + 24 * geri];
  const dirsek: P = [140 - 96 * tasi - 20 * geri, 1300 + 10 * tasi - 40 * geri];   // geri çekilmede dirsek ≈ 45° kırılır
  const elAci = -10 + 6 * tasi - 24 * geri;                                     // bilek ≈ 25° yukarı kıvrılır
  const kist = elMatris([bilek[0] + 12, bilek[1]], elAci, EO)(KISTIR_YEREL); // KolEl ile aynı matris (bilek + 12 px gömlek)
  // eldiven: asılı (dik) → masaya yatarken 72° döner ve masa düzleminde kısalır (0.8); bırakıldığı yerde kalır
  const yatAci = -64 * tasi, yatY = 1 - 0.2 * tasi;
  const elYerKist: P = elMatris([B0[0] + BIR[0] + 12, B0[1] + BIR[1]], -4, EO)(KISTIR_YEREL); // bırakma anındaki kıstırma noktası (p140)
  const eldivenDonusum = (q: P) => `translate(${q[0]},${q[1]}) scale(1,${yatY}) rotate(${yatAci + sal * (1 - tasi)})`;
  // yükseklik (gölge kayması): el ≈ 150 px masa üstünde; eldiven UCU p0'da kâğıda değer (gölge ucu temasta), p54 sonrası havada
  const hEl = interpolate(yuk, [0, 30], [150, 80]) * (1 - 0.75 * tasi);
  const hUc = interpolate(p, [0, 54, 122, 140], [0, 34, 34, 0], cl);
  const golgeKay = (h: number): P => { const q = izdusum(GUNES, [0, 0], h); return [q[0], q[1] + h * 0.2]; };
  const acik = interpolate(p, [0, 54, 60], [0.5, 0.85, 1], cl);
  // pencere açıklığı → masa yaması (TEK güneş)
  const kose = [[PEN.x, PEN.y], [PEN.x + PEN.w, PEN.y], [PEN.x + PEN.w, PEN.y + PEN.h], [PEN.x, PEN.y + PEN.h]].map(([x, y]) => ({ p: [x, y] as P, ayak: [x, MASA.arka] as P, h: MASA.arka - y }));
  const ETIKET_YEREL: P = [-262, 40]; // TOURS etiketi paketin solunda, ipiyle (sağ ucu ekranda x ≤ 880, y ≤ 1500)
  const etiketSag: P = [PAKET[0] + (ETIKET_YEREL[0] + 352 * 0.4) * PAKET_OLCEK, PAKET[1] + ETIKET_YEREL[1] * PAKET_OLCEK];
  const kilit: KilitNokta[] = [
    { ad: "kıstırma", p: ekran(birak ? elYerKist : kist), tur: "dokunus" },
    { ad: "T regülatör", p: ekran([DIREK.x, DIREK.regY]), tur: "kurulum" },
    { ad: "fener havuzu", p: ekran(HAVUZ), tur: "kurulum" },
    { ad: "fener tabanı", p: ekran([FENER.x, FENER.taban]), tur: "temas" },
    { ad: "TOURS etiketi (sağ uç)", p: ekran(etiketSag), tur: "kurulum" },
    ...(birak ? [{ ad: "eldiven tap", p: ekran(elYerKist), tur: "temas" as const }] : []),
  ];
  const tarama = <Desen id="t1gTar" aci={TH} aralik={TARAMA_ARALIK.yakin} kalin={TARAMA_KALINLIK.yakin} renk="#2a1c10" alfa={0.75} seed={S + 9} />;
  const kolProps = { giris: [-80, 1340] as P, dirsek, bilek, gen: [210, 172, 92] as [number, number, number], elAci, olcek: EO };
  const eldivenNokta = birak ? elYerKist : kist;
  return (
    <AbsoluteFill style={{ backgroundColor: "#2a2016" }}>
      <ArsivKatmani mod="gunduz">
        <AbsoluteFill>
          <svg width={1080} height={1920} viewBox="0 0 1080 1920">
            <defs>
              {tarama}
              <radialGradient id="t1duvarFener"><stop offset="0" stopColor="#ffcf86" stopOpacity={0.35} /><stop offset="1" stopColor="#ffcf86" stopOpacity={0} /></radialGradient>
              {/* gölgeler masa + kâğıt birleşik zeminine kırpılır (maske kenarı / düz kesik yok) */}
              <clipPath id="t1masaKlip"><rect x={-200} y={MASA.arka} width={1500} height={MASA.on - MASA.arka} /></clipPath>
            </defs>
            <RenkKaydi>
            <g transform={kam}>
              {/* ===== DUVAR (badanalı tuffeau; alt kısımda dökülmüş sıvadan tuffeau) ===== */}
              <KonturTitreme derinlik="orta" seed={S}>
                <rect x={-120} y={DUVAR_UST} width={1320} height={MASA.arka - DUVAR_UST} fill="#ebe5d2" />
                <TasDuvar m={dikdortgen(-120, 560, 1320, MASA.arka - 560)} boyut={[1320, 260]} tip="tuffeau" seed={S} derinlik="yakin" nemBandi={0.3} petek={0.3} />
                <path d="M -120 560 L 120 560 Q 170 584 240 562 L 420 560 Q 470 590 540 564 L 1200 560 L 1200 546 L -120 548 Z" fill="#ebe5d2" />
                {/* lucarne nişi (kalın çatı katı duvarı): yan yüzler + eşik — iç yan yüz gölgede (tarama III) */}
                <polygon points={poly([[PEN.x - 46, PEN.y - 34], [PEN.x, PEN.y], [PEN.x, PEN.y + PEN.h], [PEN.x - 46, PEN.y + PEN.h + 40]])} fill="#d8d0b8" />
                <Tarama sekil={[[PEN.x - 46, PEN.y - 34], [PEN.x, PEN.y], [PEN.x, PEN.y + PEN.h], [PEN.x - 46, PEN.y + PEN.h + 40]]} basamak="III" aci={TH} renk="#6a5a40" derinlik="yakin" seed={S + 1} />
                <polygon points={poly([[PEN.x + PEN.w, PEN.y], [PEN.x + PEN.w + 34, PEN.y - 26], [PEN.x + PEN.w + 34, PEN.y + PEN.h + 32], [PEN.x + PEN.w, PEN.y + PEN.h]])} fill="#f2ead4" />
                <polygon points={poly([[PEN.x - 46, PEN.y + PEN.h + 40], [PEN.x, PEN.y + PEN.h], [PEN.x + PEN.w, PEN.y + PEN.h], [PEN.x + PEN.w + 34, PEN.y + PEN.h + 32]])} fill="#f4ecd6" />
                {/* tavandan inen iki kablo: kirişteki makaradan lucarne'nin sağ üstündeki deliğe; manipülatöre giden ip kadraj dışı SAĞA */}
                {[0, 9].map((o) => <polyline key={o} points={poly([[1000 + o * 0.5, DUVAR_UST], [990 + o * 0.6, 300], [PEN.x + PEN.w + 22 + o * 0.5, PEN.y + 30]])} stroke={BL.kenevir} strokeWidth={3.4} fill="none" />)}
                <ellipse cx={PEN.x + PEN.w + 24} cy={PEN.y + 34} rx={12} ry={8} fill="#3a2c1e" />
                <polyline points={poly([[1040, DUVAR_UST], [1060, 380], [1100, 520]])} stroke={BL.kenevir} strokeWidth={3.4} fill="none" />
              </KonturTitreme>
              {/* ===== lucarne: basık kemer, kanatlar AÇIK (nişe yaslı); dışarısı açıklık içinde ===== */}
              <Kemer m={dikdortgen(PEN.x, PEN.y, PEN.w, PEN.h)} W={1.36} H={1.4} tip="basik" dolgu="#e8d4a4" ic={<Dis p={p} />}
                kayit={null} sove={{ gen: 0.05, renk: "#4a3220" }} esik={{ renk: "#d8cfb4" }} kontur={2.5} />
              <AcikKanat yan={-1} />
              <AcikKanat yan={1} />
              {/* ===== alçak tavan: sablière + kameraya dik kirişlerin uçları (kamera yaklaştıkça kadrajdan çıkar) ===== */}
              <rect x={-120} y={-200} width={1320} height={DUVAR_UST + 200} fill="#2e2016" />
              {[-60, 300, 660, 1020].map((x, i) => <Kiris key={i} on={[[x - 40, -200], [x + 100, -200], [x + 60, DUVAR_UST - 40], [x, DUVAR_UST - 40]]} seed={S + 20 + i} derinlik="uzak" />)}
              <Kiris on={[[-120, DUVAR_UST - 46], [1200, DUVAR_UST - 46], [1200, DUVAR_UST], [-120, DUVAR_UST]]} alt={[[-120, DUVAR_UST], [1200, DUVAR_UST], [1200, DUVAR_UST + 10], [-120, DUVAR_UST + 10]]} seed={S + 30} derinlik="orta" />
              <g><circle cx={990} cy={300} r={18} fill="#4a3220" stroke={ink("#4a3220")} strokeWidth={2} /><circle cx={990} cy={300} r={5} fill={BL.brass} /><rect x={982} y={DUVAR_UST} width={16} height={70} fill="#1c1915" /></g>
              {/* oda köşe gölgesi: tarama II (sol kenar) — karartma katmanı DEĞİL */}
              <Tarama sekil={[[-120, DUVAR_UST], [60, DUVAR_UST], [20, MASA.arka], [-120, MASA.arka]]} basamak="II" aci={TH} renk="#6a5a40" derinlik="orta" seed={S + 2} />
              {/* fener duvara sıcak ışık düşürür (aynı kaynak: fener alevi) */}
              <ellipse cx={FENER.x} cy={FENER.taban - 200} rx={360} ry={300} fill="url(#t1duvarFener)" style={{ mixBlendMode: "screen" }} />

              {/* ===== MASA: dar yatay meşe tahtalar, arka kenar duvardan ayrık ince gölge ===== */}
              <rect x={-120} y={MASA.arka - 6} width={1320} height={8} fill="#1e140c" opacity={0.7} />
              <KonturTitreme derinlik="yakin" seed={S + 5}>
                <AhsapYuzey m={(u, v) => { const t = v * v * 0.35 + v * 0.65; return [-140 + u * 1360, MASA.arka + t * (MASA.on - MASA.arka)]; }} boyut={[1360, 900]} tur="mese" taban="#9a7046" tahta={11} budak={2} seed={S + 6} derinlik="yakin" asinma={["alt"]} kenarKontur={false} cizgiKalinlik={1.3} />
                <ellipse cx={930} cy={1590} rx={62} ry={28} fill="none" stroke="#5a3c22" strokeWidth={4} opacity={0.28} />
                {/* hokka + kaz tüyü, ciltli kayıt defteri (masanın arka-sağı, işlevli) */}
                <g>
                  <ellipse cx={900} cy={912} rx={34} ry={12} fill="#14110d" opacity={0.3} />
                  <path d="M 872 908 L 872 878 Q 900 868 928 878 L 928 908 Q 900 918 872 908 Z" fill="#2a2a30" stroke={ink("#2a2a30")} strokeWidth={2} />
                  <ellipse cx={900} cy={878} rx={28} ry={8} fill="#141418" />
                  <path d="M 906 878 L 960 772 Q 972 768 966 784 Z" fill="#e8e0cc" stroke={ink("#e8e0cc")} strokeWidth={1.4} />
                  <polygon points={poly([[760, 950], [930, 934], [938, 1018], [768, 1036]])} fill="#4a3220" stroke={ink("#4a3220")} strokeWidth={2} />
                  <polygon points={poly([[768, 1036], [938, 1018], [938, 1028], [770, 1046]])} fill="#e2dccb" />
                </g>
              </KonturTitreme>
              {/* ===== TEK güneş: lucarne biçimli masa yaması + huzme + toz ===== */}
              <AciklikIsigi isik={GUNES} kose={kose} kayit={[0, 0]} alfa={0.12} yamaAlfa={0.5} toz={{ sayi: 36, seed: S }} />
              {/* ===== fener tabanı temas gölgesi + kafes dikmelerinin masaya düşen gölgeleri (aynı nokta ışıktan, ışınsal) ===== */}
              <ellipse cx={FENER.x + 2} cy={FENER.taban + 2} rx={70} ry={10} fill="#14110d" opacity={0.6} />
              {[-58, -19, 19, 58].map((dx, i) => { const a: P = [FENER.x + dx, FENER.taban + 3]; const yon = [dx / 58, 0.55], L = 150; const b: P = [a[0] + yon[0] * L, a[1] + yon[1] * L]; return <polygon key={i} points={poly([[a[0] - 3, a[1]], [a[0] + 3, a[1]], [b[0] + 9, b[1]], [b[0] - 9, b[1]]])} fill="url(#t1gTar)" opacity={0.55} />; })}

              {/* ===== YUMUŞAK PAKET KÂĞIDI (alt katman: kâğıt, ip, etiket) ===== */}
              <PaketKagidi x={PAKET[0]} y={PAKET[1]} olcek={PAKET_OLCEK} acik={acik} ipCozuk etiketYeri={ETIKET_YEREL} seed={S} />
              {/* fener ışık havuzu: fener TABANINDAN (en parlak tabanda, ışınsal sönüm); kâğıdın ve masanın üstüne düşer */}
              <IsikHavuzu isik={FENER_ISIK} guc={fl} />
              {/* ===== gölgeler (TEK güneş): ton bloğu + tarama, MULTIPLY, ip/kat çizgisi/etiketin ÜSTÜNDE; masa+kâğıda kırpılı ===== */}
              <g clipPath="url(#t1masaKlip)" style={{ mixBlendMode: "multiply" }}>
                <g transform={`translate(${golgeKay(hEl)[0]},${golgeKay(hEl)[1]})`}>
                  <KolEl {...kolProps} golge golgeRenk="#a08a70" />
                  <KolEl {...kolProps} golge golgeRenk="url(#t1gTar)" />
                </g>
                {/* eldiven gölgesi: ucu temas noktasında (p0 kâğıda değer → gölge ucu birleşir) */}
                <g transform={`translate(${golgeKay(hUc)[0]},${golgeKay(hUc)[1]})`}>
                  <g transform={eldivenDonusum(eldivenNokta)}><Eldiven elBoyu={EL_BOYU} golge golgeRenk="#a08a70" /></g>
                  <g transform={eldivenDonusum(eldivenNokta)}><Eldiven elBoyu={EL_BOYU} golge golgeRenk="url(#t1gTar)" /></g>
                </g>
              </g>
              <Fener fl={fl} />
              {/* ===== eldiven (bırakılmadan önce elde, sonra havuzda yatar) ===== */}
              {birak && <g transform={eldivenDonusum(elYerKist)}><Eldiven elBoyu={EL_BOYU} /></g>}
              {/* ===== KOL + EL + tutulan ELDİVEN (başparmak üstte/manşetin önünde, işaret parmağı altta) ===== */}
              <KolEl {...kolProps} poz={birak ? "gevsek" : "kistir"} tutulan={birak ? undefined : <g transform={`scale(1,${yatY}) rotate(${yatAci + sal * (1 - tasi)})`}><Eldiven elBoyu={EL_BOYU} /></g>} />
              {/* yarı açıkta alt kanat eldivenin parmaklarının üstüne kapanık (eldiven kâğıttan çıkıyor) */}
              <PaketKagidi x={PAKET[0]} y={PAKET[1]} olcek={PAKET_OLCEK} acik={acik} ipCozuk etiket={false} katman="ust" seed={S} />

              {/* masa ön kenarı + ≈120 px AHŞAP ön yüz (pah), altında oda döşemesi (çam, derinlik yönünde) */}
              <AhsapYuzey m={dikdortgen(-140, MASA.on, 1360, MASA.onYuz)} boyut={[1360, MASA.onYuz]} tur="mese" taban="#6a4a2c" tahta={1} seed={S + 8} derinlik="yakin" kenarKontur={false} />
              <MasaKenari sol={[-140, MASA.on]} sag={[1220, MASA.on]} kalin={30} renk="#8a5e36" />
              <Tarama sekil={[[-140, MASA.on + 30], [1220, MASA.on + 30], [1220, MASA.on + MASA.onYuz], [-140, MASA.on + MASA.onYuz]]} basamak="III" aci={TH} renk="#2a1c10" derinlik="yakin" seed={S + 11} />
              <polygon points={poly([[-140, MASA.on + MASA.onYuz], [1220, MASA.on + MASA.onYuz], [1220, 2200], [-140, 2200]])} fill="#3b2c1c" />
              {[-40, 140, 320, 500, 680, 860, 1040].map((x, i) => <line key={i} x1={x} y1={MASA.on + MASA.onYuz} x2={x * 1.25 - 135} y2={2200} stroke="#2a1e12" strokeWidth={3} />)}
              <Tarama sekil={[[-140, MASA.on + MASA.onYuz], [1220, MASA.on + MASA.onYuz], [1220, MASA.on + MASA.onYuz + 60], [-140, MASA.on + MASA.onYuz + 60]]} basamak="IV" aci={TH} renk="#14110d" derinlik="yakin" seed={S + 12} />
            </g>
            </RenkKaydi>
          </svg>
        </AbsoluteFill>
      </ArsivKatmani>
      <IddiaYazisi metin="1834. Bilgisayar yok." vurgu={["yok"]} kagitSerit />
      {guvenli && <GuvenliAlan noktalar={kilit} aktifBant="ust" baslik={`SB2-TOURS p${p}`} />}
    </AbsoluteFill>
  );
};
