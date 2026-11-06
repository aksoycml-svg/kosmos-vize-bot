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
import { Desen, Tarama, TaramaEgri, taramaAcisi } from "../../../doku/Tarama";
import { GuvenliAlan, KilitNokta } from "../../../doku/GuvenliAlan";
import { ChappeKule, KolKonum, KONUMLAR } from "../../../doku/ChappeKule";
import { BL, DOKU_SEED, P, dikdortgen, ink, poly } from "../../../doku/sabitler";
import { IddiaYazisi } from "../../../components/EkranYazisi";
import { KolEl, KISTIR_YEREL, elMatris } from "../../../rig/KolEl";
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
export const P01_KONTROL = [0, 54, 60, 140, 155];

const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const S = DOKU_SEED.tours;
const PEN = { x: 640, y: 420, w: 300, h: 370 }; // lucarne açıklığı (0.9 × 1.4 m'ye yakın oran, basık kemer dahil)
const MASA = { arka: 820, on: 1700, onYuz: 120 };
const DUVAR_UST = 214;
const FENER = { x: 290, taban: 990 };
const HAVUZ: P = [430, 1170]; // fener önünde; eldiven p140'ta buraya bırakılır // eldivenin bırakılacağı ışık dairesi (sahne planı ≈ (180,1120))
const DIREK = { x: 840, y: 905, L: 174 };
const PAKET: P = [670, 1270];
const GUNES: Isik = { tip: "yonlu", ad: "güneş (lucarne)", yon: [-0.55, 0.85], renk: "#ffd08a" };
const FENER_ISIK: Isik = { tip: "nokta", ad: "fener", zemin: HAVUZ, yukseklik: 140, renk: "#ffb357", havuz: { rx: 230, ry: 130, alfa: 0.62 } };
const TH = taramaAcisi(GUNES); // sahnenin tek tarama yönü

const kolKonum = (p: number): KolKonum => {
  const A = KONUMLAR.BEKLE, B = KONUMLAR.SAK;
  const e = Easing.bezier(0.16, 1, 0.3, 1);
  const sol = interpolate(p, [48, 54, 57, 60], [A.sol, B.sol + 4, B.sol - 1.5, B.sol], { ...cl, easing: e });
  const sag = interpolate(p, [48, 54, 57, 60], [A.sag, B.sag + 4, B.sag - 1.5, B.sag], { ...cl, easing: e });
  return { reg: 0, sol, sag };
};

// ---------- lucarne dışı: geç gün gök, Tours çatıları (arduvaz, dik), bacalar, yuvarlak tuffeau kule + direk + T ----------
const Dis: React.FC<{ p: number }> = ({ p }) => {
  const k = kolKonum(p);
  const gergin = p >= 54 && p < 60 ? 2 : 0;
  const kx = DIREK.x, kule = { sol: kx - 70, sag: kx + 70, ust: 777 };
  return (
    <g>
      <defs><linearGradient id="t1gok" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e2bf7e" /><stop offset="0.8" stopColor={BL.gecGunGok2} /><stop offset="1" stopColor="#f6e8c4" /></linearGradient></defs>
      <rect x={PEN.x - 30} y={PEN.y - 30} width={PEN.w + 60} height={PEN.h + 60} fill="url(#t1gok)" />
      <path d="M 660 520 Q 680 500 708 508 Q 728 494 752 508 Q 772 506 776 522 Z" fill="#f6ead0" />
      {/* uzak kent çatıları (hava perspektifi, düz) */}
      <path d={`M ${PEN.x - 30} 700 L 680 684 L 700 694 L 740 676 L 770 690 L 800 686 L ${PEN.x + PEN.w + 30} 696 L ${PEN.x + PEN.w + 30} 820 L ${PEN.x - 30} 820 Z`} fill="#a8a49a" />
      {/* yakın arduvaz çatı yamacı (dik, Tours) + tuffeau bacalar */}
      <polygon points={poly([[PEN.x - 30, 740], [700, 712], [770, 760], [770, 820], [PEN.x - 30, 820]])} fill="#4a5068" />
      {[0, 1, 2, 3].map((i) => <line key={i} x1={PEN.x - 30} y1={752 + i * 16} x2={770} y2={772 + i * 16 - (i * 2)} stroke="#38405a" strokeWidth={1.4} />)}
      <rect x={680} y={690} width={20} height={36} fill="#d8cfb4" stroke={ink("#d8cfb4")} strokeWidth={1.4} />
      {/* yuvarlak tuffeau kule (tourelle): düz teras, form takipli tarama (gölge solda, ışık sağ-üstten) */}
      <rect x={kule.sol} y={kule.ust} width={kule.sag - kule.sol} height={120} fill="#d8cfb4" />
      <path d={`M ${kule.sol - 6} ${kule.ust} L ${kule.sag + 6} ${kule.ust} L ${kule.sag + 6} ${kule.ust - 12} L ${kule.sol - 6} ${kule.ust - 12} Z`} fill="#e6e0cc" stroke={ink("#d8cfb4")} strokeWidth={1.5} />
      <TaramaEgri sol={kule.sol} sag={kule.sag} ust={() => kule.ust} alt={() => kule.ust + 120} golgeYonu={-1} adim={5} renk={ink("#d8cfb4")} kalinlik={1.1} seed={S + 40} />
      <rect x={kule.sol} y={kule.ust} width={kule.sag - kule.sol} height={120} fill="none" stroke={ink("#d8cfb4")} strokeWidth={1.6} />
      {/* makara hattı: kablolar lucarne kenarından kuleye */}
      {[0, 6].map((o) => <polyline key={o} points={poly([[PEN.x + PEN.w + 30, 620 + o], [kx + 18, 690 + o * 0.4 - gergin], [kx + 6, 600 - gergin]])} stroke="#6a4a2a" strokeWidth={2} fill="none" />)}
      <ChappeKule x={kx} y={kule.ust - 12} L={DIREK.L} konum={k} detay="yakin" sicakIsik={0.15} payanda={false} direkKalin={1.6} topuz={0.5} />
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

export const Sb2Tours: React.FC<{ guvenli?: boolean }> = ({ guvenli }) => {
  const p = useCurrentFrame();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const cs = interpolate(p, [0, 156], [1.14, 1.06], { ...cl, easing: ease });
  const cy = interpolate(p, [0, 156], [40, 0], { ...cl, easing: ease });
  const kam = `translate(540,${960 + cy}) scale(${cs}) translate(-540,-960)`;
  const ekran = (q: P): P => [540 + (q[0] - 540) * cs, 960 + cy + (q[1] - 960) * cs];
  const fl = titresim("fener", p, 3);
  // ----- el / eldiven hareketi -----
  const yuk = interpolate(p, [0, 54], [60, 0], { ...cl, easing: ease });         // 0–54 eldiven kâğıttan çekilir
  const tasi = interpolate(p, [126, 140], [0, 1], { ...cl, easing: Easing.inOut(Easing.cubic) }); // havuza taşır, 140'ta bırakır
  const birak = p >= 140;
  const tit = (Math.sin(p * 0.95) * 2) * interpolate(p, [54, 134], [1, 0.2], cl);  // ~9 Hz titreme sönümlenir
  const sal = Math.sin(p * 0.12) * 4 * interpolate(p, [54, 134], [1, 0.4], cl);
  const bilek: P = [440 - 250 * tasi, 1150 + yuk + tit - 80 * tasi + (birak ? 14 : 0)];
  const elAci = -10 + 20 * tasi;
  const EO = 1.9;
  const kist = elMatris([bilek[0] + 12, bilek[1]], elAci, EO)(KISTIR_YEREL); // KolEl ile aynı matris (bilek + 12 px gömlek)
  const hEl = interpolate(yuk, [0, 60], [150, 70]) * (1 - 0.7 * tasi);
  const golgeKay = (h: number): P => { const q = izdusum(GUNES, [0, 0], h); return [q[0], q[1] + h]; };
  const acik = interpolate(p, [0, 54, 60], [0.5, 0.85, 1], cl);
  // pencere açıklığı → masa yaması (TEK güneş)
  const kose = [[PEN.x, PEN.y], [PEN.x + PEN.w, PEN.y], [PEN.x + PEN.w, PEN.y + PEN.h], [PEN.x, PEN.y + PEN.h]].map(([x, y]) => ({ p: [x, y] as P, ayak: [x, MASA.arka] as P, h: MASA.arka - y }));
  const eldivenYere: P = [kist[0] - 70, kist[1] + 130]; // bıraktığı yerde, kıstırma noktasının altında: havuzun içinde
  const kilit: KilitNokta[] = [
    { ad: "kıstırma", p: ekran(kist), tur: "dokunus" },
    { ad: "T regülatör", p: ekran([DIREK.x, 777 - 12 - DIREK.L * 1.52]), tur: "kurulum" },
    { ad: "fener havuzu", p: ekran(HAVUZ), tur: "kurulum" },
    { ad: "fener tabanı", p: ekran([FENER.x, FENER.taban]), tur: "temas" },
    { ad: "TOURS etiketi", p: ekran([PAKET[0] + 70 + 150, PAKET[1] + 236]), tur: "kurulum" },
    ...(birak ? [{ ad: "eldiven tap", p: ekran(eldivenYere), tur: "temas" as const }] : []),
  ];
  const tarama = <Desen id="t1gTar" aci={TH} aralik={6} kalin={1.6} renk="#2a1c10" alfa={0.75} seed={S + 9} />;
  return (
    <AbsoluteFill style={{ backgroundColor: "#2a2016" }}>
      <ArsivKatmani mod="gunduz">
        <AbsoluteFill>
          <svg width={1080} height={1920} viewBox="0 0 1080 1920">
            <defs>
              {tarama}
              <radialGradient id="t1duvarFener"><stop offset="0" stopColor="#ffcf86" stopOpacity={0.35} /><stop offset="1" stopColor="#ffcf86" stopOpacity={0} /></radialGradient>
              <filter id="t1golgeBlur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation={3} /></filter>
            </defs>
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
                {[0, 9].map((o) => <polyline key={o} points={poly([[1000 + o * 0.5, DUVAR_UST], [968 + o * 0.6, 300], [PEN.x + PEN.w + 22 + o * 0.5, PEN.y + 30]])} stroke={BL.kenevir} strokeWidth={3.4} fill="none" />)}
                <ellipse cx={PEN.x + PEN.w + 24} cy={PEN.y + 34} rx={12} ry={8} fill="#3a2c1e" />
                <polyline points={poly([[1040, DUVAR_UST], [1060, 380], [1100, 520]])} stroke={BL.kenevir} strokeWidth={3.4} fill="none" />
              </KonturTitreme>
              {/* ===== lucarne: basık kemer (0.13 W), iki kanat, küçük camlar; dışarısı açıklık içinde ===== */}
              <Kemer m={dikdortgen(PEN.x, PEN.y, PEN.w, PEN.h)} W={0.9} H={1.4 * (PEN.h / PEN.h)} tip="basik" dolgu="#e8d4a4" ic={<Dis p={p} />}
                kayit={{ dikey: 1, yatay: 3, renk: "#4a3220", kalin: 7 }} sove={{ gen: 0.06, renk: "#4a3220" }} esik={{ renk: "#d8cfb4" }} kontur={2.5} />
              {/* ===== alçak tavan: sablière + kameraya dik kirişlerin uçları (kamera yaklaştıkça kadrajdan çıkar) ===== */}
              <rect x={-120} y={-200} width={1320} height={DUVAR_UST + 200} fill="#2e2016" />
              {[-60, 300, 660, 1020].map((x, i) => <Kiris key={i} on={[[x - 40, -200], [x + 100, -200], [x + 60, DUVAR_UST - 40], [x, DUVAR_UST - 40]]} seed={S + 20 + i} derinlik="uzak" />)}
              <Kiris on={[[-120, DUVAR_UST - 46], [1200, DUVAR_UST - 46], [1200, DUVAR_UST], [-120, DUVAR_UST]]} alt={[[-120, DUVAR_UST], [1200, DUVAR_UST], [1200, DUVAR_UST + 10], [-120, DUVAR_UST + 10]]} seed={S + 30} derinlik="orta" />
              <g><circle cx={968} cy={300} r={18} fill="#4a3220" stroke={ink("#4a3220")} strokeWidth={2} /><circle cx={968} cy={300} r={5} fill={BL.brass} /><rect x={960} y={DUVAR_UST} width={16} height={70} fill="#1c1915" /></g>
              {/* oda köşe gölgesi: tarama II (sol ve sağ kenar) — karartma katmanı DEĞİL */}
              <Tarama sekil={[[-120, DUVAR_UST], [60, DUVAR_UST], [20, MASA.arka], [-120, MASA.arka]]} basamak="II" aci={TH} renk="#6a5a40" derinlik="orta" seed={S + 2} />
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
                  <polygon points={poly([[768, 1036], [938, 1018], [938, 1028], [770, 1046]])} fill="#e9dfc9" />
                </g>
              </KonturTitreme>
              {/* ===== TEK güneş: lucarne biçimli masa yaması (kayıt gölgeli) + huzme + toz ===== */}
              <AciklikIsigi isik={GUNES} kose={kose} kayit={[2, 4]} alfa={0.12} yamaAlfa={0.5} toz={{ sayi: 36, seed: S }} />
              {/* ===== fener: ışık havuzu (eldivenin bırakılacağı yer) + temas gölgesi ===== */}
              <ellipse cx={FENER.x + 2} cy={FENER.taban + 2} rx={70} ry={10} fill="#14110d" opacity={0.6} />
              {/* fener kafes gölgeleri (masada, ışınsal, tarama dolgulu) */}
              {[-58, 58].map((dx, i) => { const a: P = [FENER.x + dx, FENER.taban + 4]; const b: P = [a[0] + dx * 2.6, a[1] + 120]; return <polygon key={i} points={poly([[a[0] - 4, a[1]], [a[0] + 4, a[1]], [b[0] + 12, b[1]], [b[0] - 12, b[1]]])} fill="url(#t1gTar)" opacity={0.6} />; })}

              {/* ===== YUMUŞAK PAKET KÂĞIDI (alt katman) ===== */}
              <PaketKagidi x={PAKET[0]} y={PAKET[1]} olcek={1} acik={acik} ipCozuk etiketYeri={[70, 236]} seed={S} />
              {/* fener ışık havuzu: kâğıdın ve masanın üstüne düşer (eldivenin bırakılacağı yer) */}
              <IsikHavuzu isik={FENER_ISIK} guc={fl} />
              {/* ===== gölgeler (TEK güneş, taramalı): kol+el ve eldiven ===== */}
              <g opacity={0.55} transform={`translate(${golgeKay(hEl)[0]},${golgeKay(hEl)[1]})`}>
                <KolEl giris={[-80, 1330]} dirsek={[150, 1290]} bilek={bilek} gen={[210, 172, 92]} elAci={elAci} olcek={EO} golge golgeRenk="url(#t1gTar)"
                  tutulan={birak ? undefined : <g transform={`rotate(${sal * 0.6}) scale(1.15)`}><Eldiven golge golgeRenk="url(#t1gTar)" /></g>} />
              </g>
              {birak && <g transform={`translate(${eldivenYere[0] - 8},${eldivenYere[1] + 10}) rotate(-78) scale(1.15,1)`} opacity={0.5}><Eldiven golge /></g>}
              {/* ===== eldiven masada (p140 sonrası, havuzda yatar) ===== */}
              {birak && <g transform={`translate(${eldivenYere[0]},${eldivenYere[1]}) rotate(-78) scale(1.15,1)`}><Eldiven /></g>}
              {/* ===== KOL + EL + tutulan ELDİVEN (başparmak üstte, işaret parmağı altta) ===== */}
              <KolEl giris={[-80, 1330]} dirsek={[150, 1290]} bilek={bilek} gen={[210, 172, 92]} elAci={elAci} olcek={EO}
                tutulan={birak ? undefined : <g transform={`rotate(${sal}) scale(1.15)`}><Eldiven /></g>} />
              {/* yarı açıkta yan kanatlar eldivenin üstüne kapanık (eldiven kâğıttan çıkıyor) */}
              <PaketKagidi x={PAKET[0]} y={PAKET[1]} olcek={1} acik={acik} ipCozuk etiket={false} katman="ust" seed={S} />

              <Fener fl={fl} />
              {/* masa ön kenarı + ≈120 px AHŞAP ön yüz (pah), altında oda döşemesi (çam, derinlik yönünde) */}
              <AhsapYuzey m={dikdortgen(-140, MASA.on, 1360, MASA.onYuz)} boyut={[1360, MASA.onYuz]} tur="mese" taban="#6a4a2c" tahta={1} seed={S + 8} derinlik="yakin" kenarKontur={false} />
              <MasaKenari sol={[-140, MASA.on]} sag={[1220, MASA.on]} kalin={30} renk="#8a5e36" />
              <Tarama sekil={[[-140, MASA.on + 30], [1220, MASA.on + 30], [1220, MASA.on + MASA.onYuz], [-140, MASA.on + MASA.onYuz]]} basamak="III" aci={TH} renk="#2a1c10" derinlik="yakin" seed={S + 11} />
              <polygon points={poly([[-140, MASA.on + MASA.onYuz], [1220, MASA.on + MASA.onYuz], [1220, 2200], [-140, 2200]])} fill="#3b2c1c" />
              {[-40, 140, 320, 500, 680, 860, 1040].map((x, i) => <line key={i} x1={x} y1={MASA.on + MASA.onYuz} x2={x * 1.25 - 135} y2={2200} stroke="#2a1e12" strokeWidth={3} />)}
              <Tarama sekil={[[-140, MASA.on + MASA.onYuz], [1220, MASA.on + MASA.onYuz], [1220, MASA.on + MASA.onYuz + 60], [-140, MASA.on + MASA.onYuz + 60]]} basamak="IV" aci={TH} renk="#14110d" derinlik="yakin" seed={S + 12} />
            </g>
          </svg>
        </AbsoluteFill>
      </ArsivKatmani>
      <IddiaYazisi metin="1834. Bilgisayar yok." vurgu={["yok"]} kagitSerit />
      {guvenli && <GuvenliAlan noktalar={kilit} aktifBant="ust" baslik={`SB2-TOURS p${p}`} />}
    </AbsoluteFill>
  );
};
