// ===== KE-S3 BOGAZ (Evliya Uçuşları; mekanlar.md §3, tasarim.md v1.7 §1.2 / §4.2 / §4.6 / §5 E4 E6; K8) =====
// gorunum "panorama", saat "gun" — P09. Kamera Üsküdar kıyısında, sudan ≈3.9 m, KUZEYE bakar; yatay pan (cx) = kameranın kendi dönüşü,
// parallaks YOK (bütün katmanlar f = 1). Dekor x −540…1620, ufuk y 860.
// Katmanlar (§3.3): gök 3 düz basamak + sağda güneş parlaması · Boğaz içi (kuzey) alçak tepeler + daralan su şeridi · Galata yamacı (uzak,
// tek ton konut kutuları, cami/minare YOK) + Galata Kulesi uzak siluet (gövde + kemer noktaları + korniş + kurşun koni; sağ yüz ışıklı) ·
// Üsküdar uzak siluet (tek ton, 10 çentik; belirli yapı YOK) + yakın kıyı + Doğancılar meydanı (açık çayır, ağaç/çadır/bina YOK) ·
// Boğaz suyu 3 basamak + dalga çizgileri + güneş yolu (yalnız suda) · rota çizgisi (E6, dil-nötr; görüntüde) · Hezarfen · ön plan martı (ekran uzayı).
// TEK IŞIK: güneş ENE, yonlu (−3.4, +0.3): Galata'nın sağ yüzleri ışıklı, Üsküdar kontra düz ton, Hezarfen kontra siluet (#3a3634, kaftan #3a3a2e,
// α .68 karışım — tasarım §1.2 ≤ .75) + sağda kenar ışığı; iniş gölgesi meydanda sola uzun.
// ÖLÇEK (§3.2): havada px/m = olcek × 226 (0.35 → 79 px/m = iniş derinliği; 0.027 → 6 px/m ≈ 10 px figür kalkışta); yerde (y ≥ meydan)
// px/m = (y − 860)/3.9 (ufuk–ölçek). Uçuş kameraya yaklaşan yay → figür büyür.
// Harita etiketleri (Galata/Üsküdar/Boğaz) YAZI KATMANINDADIR (tasarım §6): bu şablon dil metni çizmez.
// Mekân sapması (raporlu): kule galerisi (seki) y = parametreler.kule_sol.tepe_y (760; Hezarfen orada durur), tepe katı + korniş + külah
// bunun üstünde (külah ucu ≈ 660); mekanlar §3.3'teki "korniş 790 / tepe 760" figürün galeride durmasıyla birlikte tutmuyordu.
import React from "react";
import { interpolate } from "remotion";
import { Golge, Isik } from "../../../doku/Isik";
import { RenkKaydi } from "../../../doku/Tarama";
import { DOKU_SEED, ink, karistir, lerp, P, poly, rnd } from "../../../doku/sabitler";
import { Kukla, Palet, Poz } from "../../../rig/Kukla";
import { kuklaIsigi } from "../../../rig/RigIsik";
import { AYAK_TABAN, govdeDunya, kolIK } from "../../../rig/kinematik";
import { GovdeCercevesi, KanatCiz, kanatEl, kanatGeo } from "../../props/evliya";
import { karakterBul } from "../../karakterler";
import { karakterPoz } from "../../jestler";
import { propDurum } from "../../props";
import type { Prop } from "../../tipler";
import { cl, ekranNokta, INOUT, kameraHesapla, katDonusum } from "../../zaman";
import { param, Sablon, SablonProps } from "../../ortak";
import { RIG_BIRIM_M } from "../sarayburnu/geo";
import { bacakIK2, pchip } from "../galata/GalataTepe";

const S = DOKU_SEED.bogaz;
export const BG = { ufuk: 860, goz: 3.9, havaPxm: 226, dekorX: [-540, 1620] as [number, number] };
const R = {
  gok: ["#a9b6bf", "#cfcfc4", "#e6dcc0"], parlama: "#f6e8c0", uzak: "#9aa2a4", su: ["#7c9090", "#6c8284", "#5e7378"], suIsik: "#e4dcc4", dalga: "#54686a",
  tas: "#9a8f7e", tasGolge: "#6b6357", kursun: "#7c8288", kursunIsik: "#a3a8aa", aciklik: "#2a2620",
  evDuvar: "#8a7660", evGolge: "#5e5040", cati: "#6e5240", catiGolge: "#4e3a2e", ot: "#989c76", toprak: "#8a7a5c",
  kontra: "#3a3634", kontraKaftan: "#3a3a2e", kenar: "#f0d79a", toz: "#b8a888",
  rota: "#e9dfc9", rotaKontur: "#1c1915",
  marti: { govde: "#dcdcd6", kanat: "#a9adb0", uc: "#3a3a3e", gaga: "#c8a04a", golge: "#b4b6b6" },
};
const ISIK: Isik = { tip: "yonlu", yon: [-3.4, 0.3], renk: "#f0d79a", ad: "güneş ENE (Üsküdar kontra)" };
const yerPxm = (y: number) => Math.max(1, (y - BG.ufuk) / BG.goz);
const karis = (pz: Poz, h: Partial<Poz>, w: number) => { if (w <= 0) return; for (const [k, v] of Object.entries(h)) { if (typeof v !== "number") continue; const a = ((pz as unknown as Record<string, number | undefined>)[k]) ?? 0; (pz as Record<string, unknown>)[k] = a + (v - a) * w; } };
const UCUS: Partial<Poz> = { lean: 30, thighF: 18, kneeF: 16, thighB: 26, kneeB: 10, footF: 28, footB: 28, bodyY: 0 };
const YAKLAS: Partial<Poz> = { lean: 10, thighF: -26, kneeF: 18, thighB: 14, kneeB: 24, footF: 0, footB: 10, bodyY: 0 };
// kontra siluet (tasarım §1.2 v1.7): karakter kendi renkleriyle, üstüne kontra dolgu α .68 (kaftan bölgesi zeytin kontra) — palet düzeyinde karışım
const kontraPalet = (pl: Palet, a: number): Palet => {
  const o: Record<string, unknown> = { ...pl };
  for (const [k, v] of Object.entries(pl)) if (typeof v === "string" && /^#[0-9a-f]{6}$/i.test(v)) o[k] = karistir(v, k.startsWith("coat") ? R.kontraKaftan : R.kontra, /^(hat|hatBand|sarikIc|skin)/.test(k) ? a * 0.65 : a);
  return o as Palet;
};
const pchipAt = (v: number | number[] | undefined, kare: number[] | undefined, p: number, d: number) => (Array.isArray(v) && kare && kare.length === v.length ? pchip(kare, v, p) : typeof v === "number" ? v : d);

// ---------------- dekor ----------------
const YAMAC_UST = (x: number) => 900 + ((x + 540) * 100) / 940;              // Galata sırt profili (x −540 → 400)
const GALATA_KIYI = 1004;                                                   // Galata kıyı çizgisi (uzak, düz)
const USK_KIYI = (x: number) => 1150 + ((x - 900) * 110) / 720;             // Üsküdar yakın kıyı (x 900 → 1620)
const Gok: React.FC = () => (
  <g>
    <rect x={-1200} y={-600} width={3600} height={900} fill={R.gok[0]} />
    <rect x={-1200} y={300} width={3600} height={400} fill={R.gok[1]} />
    <rect x={-1200} y={700} width={3600} height={170} fill={R.gok[2]} />
    {/* güneş parlaması (disk yok; iki düz basamak, sağ ufuk) */}
    <path d="M 1300 860 Q 1340 700 1500 680 Q 1600 672 1700 700 L 1700 860 Z" fill={R.parlama} opacity={0.22} />
    <path d="M 1390 860 Q 1420 760 1530 748 Q 1620 742 1700 770 L 1700 860 Z" fill={R.parlama} opacity={0.4} />
  </g>
);
const BogazIci: React.FC = () => (
  <g>
    {/* kuzeye uzanan Boğaz: iki yanda alçak tepeler, ortada ufka daralan su şeridi (y 830–860) */}
    <path d="M -1200 860 L -1200 846 Q 0 840 300 842 Q 420 826 520 838 Q 560 846 590 852 L 590 860 Z" fill={R.uzak} />
    <path d="M 640 860 L 640 852 Q 700 836 820 830 Q 900 826 960 840 Q 1100 846 1700 848 L 1700 860 Z" fill={karistir(R.uzak, R.gok[2], 0.18)} />
    <rect x={-1200} y={858} width={3600} height={6} fill={R.su[0]} />
  </g>
);
// uzak konut kutusu (tek ton; ışık sağdan → sol yan gölgede). Uzak sınıf: tarama yok (mekanlar §0.2; §3.3'teki yamaç taraması 360 px'te 0.5 px altı)
const Ev: React.FC<{ x: number; y: number; w: number; h: number; seed: number; pus: number }> = ({ x, y, w, h, seed, pus }) => {
  const r = 0.16 * w * (0.8 + 0.4 * rnd(seed, "r"));
  const c = (hex: string) => karistir(hex, R.uzak, pus);
  return <g>
    <rect x={x} y={y - h} width={w} height={h} fill={c(R.evDuvar)} />
    <rect x={x} y={y - h} width={w * 0.3} height={h} fill={c(R.evGolge)} />
    {/* saçak altı gölge bandı + alçak çatı (tek ton, desensiz) */}
    <rect x={x} y={y - h} width={w} height={2.5} fill={c(R.catiGolge)} />
    <polygon points={poly([[x - 2, y - h], [x + w * 0.22, y - h - r], [x + w * 0.78, y - h - r], [x + w + 2, y - h]])} fill={c(R.cati)} />
    <polygon points={poly([[x - 2, y - h], [x + w * 0.22, y - h - r], [x + w * 0.3, y - h]])} fill={c(R.catiGolge)} />
    {/* tek koyu pencere çentiği (yalnız geniş evlerde) */}
    {w > 30 && <rect x={x + w * 0.58} y={y - h * 0.62} width={3} height={4} fill={c("#3e3428")} />}
  </g>;
};
const GalataYamac: React.FC = () => {
  const evler: React.ReactNode[] = [];
  // yamaç: sırt profili → kıyı; 4 ev sırası aşağı doğru (aşağısı yakın, sonra çizilir); aralarda yamaç zemini görünür
  let i = 0;
  for (let sira = 0; sira < 4; sira++) {
    let x = -560 + rnd(S, `sx${sira}`) * 40;
    while (x < 390) {
      const w = 22 + rnd(S, `w${i}`) * 20, h = 13 + rnd(S, `h${i}`) * 10;
      const ust = YAMAC_UST(x + w / 2);
      const y = ust + 16 + sira * ((GALATA_KIYI - 6 - ust - 16) / 3.2) + (rnd(S, `y${i}`) - 0.5) * 5;
      const kuleArkasi = x + w > 66 && x < 134 && y < KULE.taban - 4;
      if (y < GALATA_KIYI - 3 && y - h > ust - 4 && !kuleArkasi) evler.push(<Ev key={i} x={x} y={y} w={w} h={h} seed={S + i} pus={x < -200 ? 0.3 : 0.12} />);
      x += w + 6 + rnd(S, `g${i}`) * 12; i++;
    }
  }
  return <g>
    <polygon points={poly([[-1200, 900], ...Array.from({ length: 21 }).map((_, j) => { const x = -540 + j * 47; return [x, YAMAC_UST(x) + (rnd(S, `yp${j}`) - 0.5) * 6] as P; }), [420, GALATA_KIYI], [-1200, GALATA_KIYI]])} fill={karistir("#7e7466", R.uzak, 0.3)} />
    {evler}
    <rect x={-1200} y={GALATA_KIYI - 2} width={1622} height={4} fill={karistir(R.evGolge, R.su[0], 0.4)} />
  </g>;
};
// Galata Kulesi uzak siluet (mekanlar §3.1/§3.4): gövde 60 px (16 m, gerçek ölçü), koyu kemer noktaları (4 px kare), korniş, koni (yükseklik = çap).
// Sağ yüz ışıklı (güneş sağda), sol yarı gölge; kurşun koni sağ şerit açık. Bayrak/ahşap kat/alem yok.
export const KULE = { x: 100, w: 60, taban: 985, korniş: 728, kulahTaban: 720 };
const GalataKule: React.FC<{ seki: number }> = ({ seki }) => {
  const { x, w } = KULE, x0 = x - w / 2, x1 = x + w / 2, kt = seki - 32, kul = kt - 8;
  return <g>
    <rect x={x0} y={kt} width={w} height={KULE.taban - kt} fill={R.tas} />
    <rect x={x0} y={kt} width={w * 0.5} height={KULE.taban - kt} fill={R.tasGolge} />
    <rect x={x1 - 6} y={kt} width={6} height={KULE.taban - kt} fill={karistir(R.tas, "#ffffff", 0.18)} />
    {/* gövde pencere yarıkları (uzak: 2 koyu çentik) */}
    {[860, 920].map((yy, i) => <rect key={i} x={x + 6} y={yy} width={3} height={8} fill={R.aciklik} />)}
    {/* galeri (seki): gövdeden 2 px taşar; figür bunun ön kenarında durur */}
    <rect x={x0 - 3} y={seki - 2} width={w + 6} height={6} fill={karistir(R.tas, R.tasGolge, 0.3)} />
    <rect x={x0 - 3} y={seki + 4} width={w + 6} height={3} fill={R.tasGolge} />
    {/* tepe katı kemer noktaları: 4 px koyu kareler */}
    {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={x0 + 5 + i * 9.4} y={kt + 12} width={4} height={8} rx={2} fill={R.aciklik} />)}
    {/* korniş + saçak */}
    <rect x={x0 - 4} y={kul} width={w + 8} height={8} fill={karistir(R.tas, R.tasGolge, 0.5)} />
    {/* kurşun koni (yükseklik = çap) */}
    <polygon points={poly([[x0 - 6, kul], [x, kul - w], [x1 + 6, kul]])} fill={R.kursun} />
    <polygon points={poly([[x + 12, kul], [x, kul - w], [x1 + 6, kul]])} fill={R.kursunIsik} />
    <polygon points={poly([[x0 - 6, kul], [x, kul - w], [x1 + 6, kul]])} fill="none" stroke={ink(R.kursun)} strokeWidth={3} strokeLinejoin="round" />
    <rect x={x0} y={kt} width={w} height={KULE.taban - kt} fill="none" stroke={ink(R.tasGolge)} strokeWidth={3} />
  </g>;
};
const yakinUst: P[] = Array.from({ length: 16 }).map((_, j) => { const x = 900 + j * 55; return [x, 1088 + 10 * Math.sin(j * 0.9) + (rnd(S, `yk${j}`) - 0.5) * 6 - (x > 1450 ? (x - 1450) * 0.12 : 0)] as P; });
const kiyiSag: P[] = Array.from({ length: 9 }).map((_, j) => { const x = 1720 - j * 102.5; return [x, USK_KIYI(x)] as P; });
const USK_YAKIN: P[] = [[858, 1100], ...yakinUst, [1720, 1080], ...kiyiSag];
const Uskudar: React.FC = () => {
  // uzak siluet (tek ton): alçak tepe hattı + 10 düzensiz konut çentiği; belirli yapı yok. Asya kıyısı kuzeye (ufka) çekilir:
  // kıyı yakında (900, 1150) → solda ufka doğru (720, 872) kıvrılır; kara bu kıyı eğrisi ile kapanır (suya taşan kutu yok).
  const tepe: P[] = Array.from({ length: 34 }).map((_, j) => { const x = 740 + j * 30; return [x, 900 - 24 * Math.sin(((x - 740) / 980) * Math.PI * 1.25) + (rnd(S, `ut${j}`) - 0.5) * 6] as P; });
  const centik = Array.from({ length: 10 }).map((_, j) => { const x = 960 + j * 64 + rnd(S, `uc${j}`) * 30, w = 14 + rnd(S, `ucw${j}`) * 12; const y = pchip(tepe.map((q) => q[0]), tepe.map((q) => q[1]), x + w / 2); return <rect key={j} x={x} y={y - 8 - rnd(S, `uch${j}`) * 6} width={w} height={14} fill={R.uzak} />; });
  // hava perspektifi 3 basamak (minyatür düz alan, gradyan yok): uzak tepe siluet → ara kara (pus karışık toprak) → yakın kıyı (toprak)
  return <g>
    <polygon points={poly([[712, 864], [770, 940], [795, 985], [1720, 985], [1720, 900], ...[...tepe].reverse()])} fill={R.uzak} />
    {centik}
    <polygon points={poly([[795, 985], [812, 1010], [858, 1100], ...yakinUst, [1720, 1080], [1720, 985]])} fill={karistir(R.toprak, R.uzak, 0.55)} />
    {/* yakın kıyı arazisi (kontra, düz): sırt çizgisi + kıyıya iner */}
    <polygon points={poly(USK_YAKIN)} fill={R.toprak} />
    <polyline points={poly([[858, 1100], ...yakinUst, [1720, 1080]])} fill="none" stroke={karistir(R.toprak, R.uzak, 0.45)} strokeWidth={6} />
  </g>;
};
// Doğancılar meydanı (§3.3 #4): açık eğimli çayır x 1050–1450, y 1110 → kıyı; toprak lekeleri; yakında 3 px dikey ot vuruşları α .4
const Meydan: React.FC = () => {
  const ust: P[] = Array.from({ length: 9 }).map((_, j) => [1050 + j * 50, 1108 + (rnd(S, `m${j}`) - 0.5) * 8] as P);
  const alt: P[] = [[1450, USK_KIYI(1450) - 6], [1050, USK_KIYI(1050) - 6]];
  return <g>
    <polygon points={poly([[1030, 1120], ...ust, [1470, 1118], ...alt])} fill={R.ot} />
    {[[1120, 1150, 26, 7], [1330, 1135, 34, 8], [1400, 1190, 22, 6], [1180, 1196, 18, 5]].map(([x, y, rx, ry], i) => <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill={R.toprak} />)}
    {Array.from({ length: 34 }).map((_, j) => { const x = 1060 + rnd(S, `ox${j}`) * 380, y = 1150 + rnd(S, `oy${j}`) * (USK_KIYI(x) - 1160); return <line key={j} x1={x} y1={y} x2={x + 1} y2={y - 6} stroke={karistir(R.ot, "#4e5236", 0.6)} strokeWidth={3} strokeOpacity={0.4} strokeLinecap="round" />; })}
    {/* kıyı taşı/kumu bandı (koyu, sade) */}
    <polygon points={poly([[880, USK_KIYI(880)], [1720, USK_KIYI(1720)], [1720, USK_KIYI(1720) + 5], [880, USK_KIYI(880) + 5]])} fill={karistir(R.toprak, "#3e3428", 0.5)} />
  </g>;
};
const Su: React.FC<{ p: number }> = ({ p }) => {
  // 3 düz basamak; dalga çizgileri 3 px (ufukta 10 px aralık, altta 50 px); güneş yolu x 1150–1620 kesik açık vuruşlar (yalnız suda)
  const satir: number[] = []; for (let y = 870; y < 1960; y += 10 + ((y - 870) / 1090) * 40) satir.push(y);
  return <g>
    <rect x={-1200} y={860} width={3600} height={240} fill={R.su[0]} />
    <rect x={-1200} y={1100} width={3600} height={400} fill={R.su[1]} />
    <rect x={-1200} y={1500} width={3600} height={500} fill={R.su[2]} />
    {satir.map((y, i) => { const out: React.ReactNode[] = []; let x = -560 + rnd(S, `dx${i}`) * 60; const L = 14 + ((y - 870) / 1090) * 70, sw = 1.5 + ((y - 870) / 1090) * 1.5; let j = 0;
      while (x < 1640) { const kay = Math.sin(p * 0.03 + i) * 4; out.push(<line key={j} x1={x + kay} y1={y} x2={x + kay + L} y2={y} stroke={R.dalga} strokeWidth={sw} strokeLinecap="round" />); x += L * (2.2 + rnd(S, `dg${i}${j}`) * 2.5); j++; }
      return <g key={i}>{out}</g>; })}
    {/* güneş yolu: sağa ve aşağı yelpaze, kesik açık vuruşlar (titreşir: konum seed + yavaş kayma) */}
    {Array.from({ length: 70 }).map((_, i) => { const t = rnd(S, `gy${i}`), y = 1160 + t * 740, x = 1100 + (0.3 + 0.7 * t) * 520 * rnd(S, `gx${i}`) + t * 40, L = 10 + t * 60; const yan = Math.sin(p * 0.08 + i * 1.7) * 3;
      return <rect key={i} x={x + yan} y={y} width={L} height={2 + t * 2} fill={R.suIsik} opacity={0.85} />; })}
  </g>;
};
// E6 rota çizgisi: Galata tepesi → Doğancılar; hafif yukarı kavisli yay, kesik 22/16, 6 px + 1.5 px kontur; uçar gibi baştan uca çizilir; uçlarda 10 px nokta.
const rotaNoktalari = (a: P, b: P, n = 80): P[] => { const c: P = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 - 90]; return Array.from({ length: n + 1 }).map((_, i) => { const t = i / n; return [(1 - t) ** 2 * a[0] + 2 * (1 - t) * t * c[0] + t * t * b[0], (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * c[1] + t * t * b[1]] as P; }); };
const Rota: React.FC<{ a: P; b: P; t: number }> = ({ a, b, t }) => {
  if (t <= 0) return null;
  const pts = rotaNoktalari(a, b);
  const L: number[] = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const h = t * L[L.length - 1]; const ic: P[] = [pts[0]];
  for (let i = 1; i < pts.length; i++) { if (L[i] <= h) ic.push(pts[i]); else { const u = (h - L[i - 1]) / (L[i] - L[i - 1]); ic.push([lerp(pts[i - 1][0], pts[i][0], u), lerp(pts[i - 1][1], pts[i][1], u)]); break; } }
  return <g>
    <polyline points={poly(ic)} fill="none" stroke={R.rotaKontur} strokeWidth={9} strokeDasharray="23.5 14.5" strokeDashoffset={-0.75} strokeLinecap="butt" />
    <polyline points={poly(ic)} fill="none" stroke={R.rota} strokeWidth={6} strokeDasharray="22 16" strokeLinecap="butt" />
    <circle cx={pts[0][0]} cy={pts[0][1]} r={5} fill={R.rota} stroke={R.rotaKontur} strokeWidth={1.5} />
    {t >= 1 && <circle cx={b[0]} cy={b[1]} r={5} fill={R.rota} stroke={R.rotaKontur} strokeWidth={1.5} />}
  </g>;
};
// E4 toz (iniş): yere yayılan basık yarım halka + 4 küçük toprak parçası; büyür, sonra basıklaşıp küçülür ve yere oturur (fade yok)
const Toz: React.FC<{ x: number; y: number; pxm: number; q: number }> = ({ x, y, pxm, q }) => {
  if (q < 0 || q > 32) return null;
  const a = interpolate(q, [0, 10, 32], [0, 1, 1], { ...cl, easing: INOUT }), son = interpolate(q, [14, 32], [1, 0], { ...cl, easing: INOUT });
  const rx = (0.25 + 0.45 * a) * pxm, ry = (0.05 + 0.16 * a) * pxm * son;
  return <g>
    {[-1, 1].map((s) => <ellipse key={s} cx={x + s * rx * 0.55} cy={y - ry * 0.5} rx={rx * 0.6 * (0.6 + 0.4 * son)} ry={Math.max(0.5, ry)} fill={R.toz} opacity={0.6} />)}
    {[[-0.5, 0.35], [-0.2, 0.55], [0.3, 0.5], [0.55, 0.3]].map(([dx, hh], i) => { const u = interpolate(q, [0, 18], [0, 1], cl); return <circle key={i} cx={x + dx * pxm * (0.3 + 0.7 * u)} cy={y - hh * pxm * 0.5 * Math.sin(Math.PI * u)} r={Math.max(1, 0.025 * pxm)} fill="#6a5a44" />; })}
  </g>;
};
// KE-P6 martı (§4.6): ekran uzayında, bulanık (6 px), konturSUZ. Önden-alttan 3/4 görünüş: iki kanat yanlara "M" kırığıyla açılır
// (kol + el bölümü; uç koyu), çırpmada kol açısı +55° ↔ −25° (16 kare/vuruş, iniş vuruşunun dibi temas karesine hizalı), süzülmede +12°.
// Baş sola (uçuş yönü), gaga #c8a04a; çığlık karesinde 10 kare açık. Açıklık 420 px (olcek 1).
const Marti: React.FC<{ x: number; y: number; olcek: number; fv: number; suzul: number; ciglik: boolean; bulanik: number }> = ({ x, y, olcek, fv, suzul, ciglik, bulanik }) => {
  const id = "mt" + React.useId().replace(/:/g, "");
  const kanat = (yon: 1 | -1, k: number, renk: string) => {
    const a1 = (lerp(lerp(-25, 55, (fv + 1) / 2), 12, suzul) * Math.PI) / 180, a2 = a1 - (lerp(42, 30, suzul) * Math.PI) / 180;
    const kok: P = [yon * 12, -2];
    const bilek: P = [kok[0] + yon * Math.cos(a1) * 95 * k, kok[1] - Math.sin(a1) * 95 * k];
    const uc: P = [bilek[0] + yon * Math.cos(a2) * 115 * k, bilek[1] - Math.sin(a2) * 115 * k];
    // ön kenar yukarıda (kalın, kavisli), arka kenar aşağıda; kökte 40, bilekte 28, uçta 5
    const n1: P = [yon * Math.sin(a1), Math.cos(a1)], n2: P = [yon * Math.sin(a2), Math.cos(a2)];
    const on: P[] = [[kok[0], kok[1] - 14], [bilek[0] - n1[0] * 6, bilek[1] - n1[1] * 6 - 4], uc];
    const arka: P[] = [[uc[0] + n2[0] * 5, uc[1] + n2[1] * 5], [bilek[0] + n1[0] * 24, bilek[1] + n1[1] * 24], [kok[0], kok[1] + 22]];
    const ucB: P = [lerp(bilek[0], uc[0], 0.6), lerp(bilek[1], uc[1], 0.6)];
    return <g>
      <polygon points={poly([...on, ...arka])} fill={renk} />
      <polygon points={poly([[ucB[0] - n2[0] * 8, ucB[1] - n2[1] * 8], uc, [uc[0] + n2[0] * 5, uc[1] + n2[1] * 5], [ucB[0] + n2[0] * 14, ucB[1] + n2[1] * 14]])} fill={R.marti.uc} />
    </g>;
  };
  return <g transform={`translate(${x},${y}) scale(${olcek})`} filter={bulanik > 0 ? `url(#${id})` : undefined}>
    <defs><filter id={id} x="-80%" y="-150%" width="260%" height="400%"><feGaussianBlur stdDeviation={bulanik / 2 / Math.max(0.2, olcek)} /></filter></defs>
    {kanat(-1, 0.86, karistir(R.marti.kanat, "#7c8084", 0.25))}
    {/* gövde (alttan, beyaz) + kuyruk + baş (sola) + gaga */}
    <path d="M -34 -6 Q -10 -18 22 -10 Q 44 -4 52 6 Q 30 16 0 16 Q -26 14 -34 4 Z" fill={R.marti.govde} />
    <path d="M 40 2 L 62 -2 L 64 10 L 44 10 Z" fill={R.marti.golge} />
    <circle cx={-38} cy={-10} r={14} fill={R.marti.govde} />
    <circle cx={-43} cy={-13} r={2.4} fill={R.marti.uc} />
    <polygon points={ciglik ? "-50,-10 -74,-14 -52,-6 -71,0 -50,-2" : "-50,-10 -74,-6 -50,-3"} fill={R.marti.gaga} />
    {kanat(1, 1, R.marti.kanat)}
  </g>;
};

// ---------------- sahne ----------------
const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const g0 = param<string>(plan, "gorunum", "panorama"), saat = param<string>(plan, "saat", "gun");
  if (g0 !== "panorama" || saat !== "gun") throw new Error(`[BOGAZ] gorunum "${g0}" / saat "${saat}" kurulmadı (kurulu: panorama+gun)`);
  const k = kameraHesapla(plan.kamera, p);
  const uid = "bg" + React.useId().replace(/:/g, "");
  const kule = param<{ x?: number; tepe_y?: number }>(plan, "kule_sol", {});
  const seki = kule.tepe_y ?? 760;
  const rotaPts = param<P[] | null>(plan, "rota_noktalari", null);
  const rotaZ = param<{ bas: number; bit: number } | null>(plan, "rota_cizgi", null);
  const rotaT = rotaZ ? interpolate(p, [rotaZ.bas, rotaZ.bit], [0, 1], { ...cl, easing: INOUT }) : 0;
  const temas = (ses: string) => (plan.temaslar ?? []).find((t) => t.ses === ses)?.kare;

  // ---- Hezarfen ----
  const hz = (plan.karakterler ?? []).find((c) => c.kim === "hezarfen");
  const kanatPr = (plan.props ?? []).find((q) => q.tur === "kanat" && q.bagli === "hezarfen");
  type HD = { pz: Poz; palet: Palet; ayak: P; pxm: number; yerde: boolean; acik: number; ayaklar: P[] };
  const hd: HD | null = hz ? (() => {
    const uc = (hz.jestler ?? []).find((j) => j.ad === "ucus");
    const yj = (hz.jestler ?? []).find((j) => j.ad === "yuru");
    const tK = uc?.bas ?? 0, tL = uc?.bit ?? 1e9;
    const x = pchipAt(hz.x as number | number[], hz.kare, p, 100), y = pchipAt(hz.y as number | number[], hz.kare, p, seki);
    const yerde = p >= tL;
    const pxm = yerde ? yerPxm(y) : pchipAt(hz.olcek as number | number[], hz.kare, p, 0.35) * BG.havaPxm;
    const s = (pxm / RIG_BIRIM_M) * 1.04;
    const d = karakterPoz({ ...hz, z: 0, u: 0, kare: undefined, jestler: (hz.jestler ?? []).filter((j) => !["ucus", "yuru"].includes(j.ad)) }, p, { yer: () => ({ x, y, s }), faz: () => 0 });
    const pz = d.pz; pz.x = x; pz.y = y + AYAK_TABAN * s; pz.scale = s;
    const acik = kanatPr ? Math.max(0, Math.min(1, Number(propDurum(kanatPr, p).acik ?? 0))) : 0;
    // duruş (galeride): eller kuşakta; uçuş: UCUS (gövde 30° öne), inişe yaklaşırken bacaklar öne iner (YAKLAS)
    if (p < tK) { const a = kolIK(pz, govdeDunya(pz, [50, -256]), true), b = kolIK(pz, govdeDunya(pz, [34, -262]), false); pz.shF = a.sh; pz.elF = a.el; pz.shB = b.sh; pz.elB = b.el; }
    if (uc && !yerde) {
      karis(pz, UCUS, interpolate(p, [tK, tK + 14], [0, 1], { ...cl, easing: INOUT }));
      karis(pz, YAKLAS, interpolate(p, [tL - 24, tL], [0, 1], { ...cl, easing: INOUT }));
    }
    let ayaklar: P[] = [];
    if (yerde) {
      // iniş (tL): ön ayak meydana basar; kalça ileri akar (json x), arka ayak bir adım atıp öne basar (adim-toprak teması), toz oturur.
      const t2 = temas("adim-toprak") ?? Math.round((tL + (yj?.bit ?? tL + 24)) / 2);
      const bitY = yj?.bit ?? tL + 24;
      const xL = pchipAt(hz.x as number[], hz.kare, tL, x), xS = pchipAt(hz.x as number[], hz.kare, bitY, x);
      const gy = (q: number) => pchipAt(hz.y as number[], hz.kare, q, y);
      const ANK = 15 * s;
      const fA: P = [xL + 0.32 * pxm, gy(tL) - ANK];
      const bA0: P = [xL - 0.18 * pxm, gy(tL) - ANK], bA1: P = [xS + 0.22 * pxm, gy(bitY) - ANK];
      const u = interpolate(p, [tL + 3, t2], [0, 1], { ...cl, easing: INOUT });
      const bA: P = [lerp(bA0[0], bA1[0], u), lerp(bA0[1], bA1[1], u) - 0.1 * pxm * Math.sin(Math.PI * u)];
      pz.lean = interpolate(p, [tL, tL + 8, bitY], [10, 14, 2], { ...cl, easing: INOUT });
      // çarpma: kalça 0.1 m çöker, sonra doğrulur
      const cok = interpolate(p, [tL, tL + 6, tL + 18], [0, 1, 0], { ...cl, easing: INOUT });
      let hipY = y + AYAK_TABAN * s - 222 * s + 0.1 * pxm * cok;
      const R2 = 202 * s;
      for (const [ank, lx] of [[fA, 14], [bA, -10]] as [P, number][]) { const dx = ank[0] - (x + lx * s); const dy = Math.sqrt(Math.max(0, R2 * R2 - dx * dx)); if (hipY < ank[1] - dy) hipY = ank[1] - dy; }
      pz.bodyY = 0; pz.y = hipY + 226 * s;
      const a = bacakIK2(pz, 14, fA), b = bacakIK2(pz, -10, bA);
      pz.thighF = a.th; pz.kneeF = a.kn; pz.footF = -(pz.lean ?? 0); pz.thighB = b.th; pz.kneeB = b.kn; pz.footB = -(pz.lean ?? 0) + 18 * Math.sin(Math.PI * u);
      ayaklar = [[fA[0] + 13 * s, fA[1] + ANK], [bA[0] + 13 * s, bA[1] + ANK]];
    }
    // kollar kanadın altında (açıkken eller ön kenar altında); kapanırken kuşağa döner
    if (acik > 0.05) {
      const g = kanatGeo(acik, pz.lean ?? 0, RIG_BIRIM_M, -400, -122, -56);
      const ik = (on: boolean, h: P, w: number) => { const r = kolIK(pz, h, on); if (on) { pz.shF += (r.sh - pz.shF) * w; pz.elF += (r.el - pz.elF) * w; } else { pz.shB += (r.sh - pz.shB) * w; pz.elB += (r.el - pz.elB) * w; } };
      ik(true, govdeDunya(pz, kanatEl(g.yakinAcik)), acik); ik(false, govdeDunya(pz, kanatEl(g.uzakAcik)), acik);
    }
    return { pz, palet: kontraPalet(karakterBul("hezarfen").palet, 0.68), ayak: [x, y], pxm, yerde, acik, ayaklar };
  })() : null;

  // ---- martı (ekran uzayı) ----
  const mPr = (plan.props ?? []).find((q) => q.tur === "marti") as (Prop & { bulanik?: number; uzay?: string }) | undefined;
  const marti = mPr && mPr.kare && p >= mPr.kare[0] && p <= mPr.kare[mPr.kare.length - 1] ? (() => {
    const mx = pchipAt(mPr.x as number[], mPr.kare, p, 540), my = pchipAt(mPr.y as number[], mPr.kare, p, 1200);
    const kd = (mPr.durum?.kanat as string[] | undefined) ?? [];
    const iSuz = kd.findIndex((v) => v === "suzul");
    const suzulK = iSuz >= 0 ? mPr.kare![iSuz] : 1e9;
    const suzul = interpolate(p, [suzulK - 8, suzulK], [0, 1], { ...cl, easing: INOUT });
    const cirpT = temas("kanat-hisirti") ?? mPr.kare![0];
    const fv = -Math.cos((2 * Math.PI * (p - cirpT)) / 16);
    const cg = temas("marti-cigligi");
    return { x: mx, y: my, olcek: Number(mPr.olcek ?? 1), fv, suzul, ciglik: cg !== undefined && p >= cg && p < cg + 10, bulanik: Number(mPr.bulanik ?? 6) };
  })() : null;

  // ---- kilit ----
  if (hd) {
    if (hd.yerde || p < ((hz?.jestler ?? []).find((j) => j.ad === "ucus")?.bas ?? 0)) kilit.push({ ad: "hezarfen ayak", p: ekranNokta(k, hd.ayak), tur: "ayak" });
    kilit.push({ ad: "hezarfen", p: ekranNokta(k, [hd.ayak[0], hd.ayak[1] - 1.5 * hd.pxm]), tur: "dokunus" });
    const tL = (hz?.jestler ?? []).find((j) => j.ad === "ucus")?.bit;
    if (tL !== undefined && Math.abs(p - tL) <= 1) kilit.push({ ad: "iniş teması", p: ekranNokta(k, hd.ayak), tur: "temas" });
  }
  const inis = param<{ x: number; y: number } | null>(plan, "iniş_meydani", null);
  if (inis) kilit.push({ ad: "iniş meydanı", p: ekranNokta(k, [inis.x, inis.y]), tur: "kurulum" });
  if (marti) kilit.push({ ad: "martı", p: [marti.x, marti.y], tur: "dokunus" });

  // ---- figür çizimi ----
  const figur = hd ? (() => {
    const pz = hd.pz;
    const ki = kuklaIsigi(ISIK, hd.ayak, 600 * (pz.scale ?? 1), { murekkep: "#2a2620", kamera: k.cs, seed: S + 41 });
    const g = kanatGeo(hd.acik, pz.lean ?? 0, RIG_BIRIM_M, -400, -122, -56);
    const ekranOlcek = (pz.scale ?? 1) * k.cs;
    const kc = (pts: P[], uzak: boolean) => <KanatCiz pts={pts} katli={1 - hd.acik} isik={0.15} olcekEkran={ekranOlcek} uzak={uzak} kat={g.katli} aile="gun" />;
    const arka = hd.acik < 0.35 ? <GovdeCercevesi pz={pz}>{kc(g.uzak, true)}{kc(g.yakin, false)}</GovdeCercevesi> : null;
    return <g>
      {arka}
      <Kukla p={hd.palet} pz={pz} golgesiz isik={ki} arkaUst={hd.acik >= 0.35 ? kc(g.uzak, true) : undefined} on={hd.acik >= 0.35 ? kc(g.yakin, false) : undefined} />
    </g>;
  })() : null;
  const tL = (hz?.jestler ?? []).find((j) => j.ad === "ucus")?.bit ?? 1e9;
  // iniş gölgesi: meydanda sola uzun (−3.4, +0.3); figür yere ≈ 1 m kala belirir (yere yaklaştıkça gölge ayağa yaklaşır)
  const golge = hd && inis && p >= tL - 14 ? (() => {
    const yer = hd.yerde ? hd.ayak : [hd.ayak[0], inis.y + (hd.ayak[0] - inis.x) * 0.05] as P;
    const yuk = hd.yerde ? 0 : Math.max(0, yer[1] - hd.ayak[1]);
    return <g clipPath={`url(#${uid}kara)`}><g transform={`translate(${ISIK.tip === "yonlu" ? ISIK.yon[0] * yuk : 0},${ISIK.tip === "yonlu" ? ISIK.yon[1] * yuk : 0})`}><Golge isik={ISIK} ayak={yer} h={600 * (hd.pz.scale ?? 1) * 0.9} genislik={100 * (hd.pz.scale ?? 1)} alfa={0.42 * interpolate(p, [tL - 14, tL], [0.4, 1], cl)} stil="gravur" cekirdek={false} seed={S + 7} /></g></g>;
  })() : null;

  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <RenkKaydi>
        <g transform={katDonusum(k, 1)}>
          <defs><clipPath id={`${uid}kara`}><polygon points={poly(USK_YAKIN)} /></clipPath></defs>
          <Gok />
          <BogazIci />
          <Su p={p} />
          <GalataYamac />
          <GalataKule seki={seki} />
          <Uskudar />
          <Meydan />
          {rotaPts && rotaPts.length >= 2 && <Rota a={rotaPts[0]} b={rotaPts[rotaPts.length - 1]} t={rotaT} />}
          {golge}
          {hd && hd.yerde && hd.ayaklar.map((a, i) => <ellipse key={i} cx={a[0]} cy={a[1] - 0.5} rx={0.12 * hd.pxm} ry={0.025 * hd.pxm} fill="#2a2620" opacity={0.3} />)}
          {figur}
          {hd && inis && <Toz x={hd.ayaklar[0]?.[0] ?? hd.ayak[0]} y={inis.y} pxm={yerPxm(inis.y)} q={p - tL} />}
        </g>
        {marti && <Marti {...marti} />}
      </RenkKaydi>
    </svg>
  );
};
const arsiv = () => "gunduzMineral" as const;
export const BOGAZ: Sablon = { Sahne, arsiv };
