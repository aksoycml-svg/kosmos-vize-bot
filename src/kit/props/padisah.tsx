// ===== KE-K3 PADİŞAH (tasarim.md v1.5 §3.5, §3.0b) — Kukla DEĞİL, ayrı siluet bileşeni =====
// İki kullanım:
//  • PadisahSiluet (P02 gece / P10 gün, köşk cumbası penceresinde büst): baş + sarık + gövde TEK KOYU KÜTLE (v1.5, K3 V1) — parçalar arasında
//    ton farkı / boşluk / iç kontur yok; ayrım YALNIZ kenar ışığıyla: gece arkadan (pencere içi) bütün dış konturda, gün sağdan (güneş).
//    Kenar ışığı birleşik siluetten türetilir (maske): gece S ∖ aşındır(S), gün S ∖ kaydır(S, −k) → iç sınırlarda (sarık/alın) çizgi oluşmaz.
//  • PadisahFigur (P12 köşk içi, ayakta, profil): aynı baş/sarık geometrisi + uzun kaftan + tek görünen kol (geniş yen, çıplak el).
//    Göz/kaş/ağız ÇİZİLMEZ. Gölge tonu (yüz #2a2420, kaftan #36302c) + ışık tonu ayrı katman: ışık şeridi = S ∩ huzme ∩ (ışığa bakan kenardan
//    w kadar) — şablon (Ic.tsx) maskeyi kurar; bileşen yalnız iki tonu çizer.
// Sarık (§3.0b): başı saran basık yastık, alt kenar alına iner (başın üst ≈%35'ini örter), arkada enseye doğru eğik iner; tümsekli üst kontur;
// tepede içteki kavuğun alçak ucu sarığın KENDİ GÖLGE TONUNDA, kontursuz, yükseklik ≈0.025 m (6–8 rig birimi) (v1.5, K3 V6).
// bas_aci (t) 0 → 1: önden (simetrik) → SAĞA profil: alın–burun–dudak–çene çıkıntısı (burun önden ovalin ≥%25 baş eni dışına), sarık
// arkaya ≥%20 kayar ve arkası dolgunlaşır (K3 V2). Ara değerler yarıçap morfu.
// Koordinat (büst): (x, y) = büst tabanı (P02/P10: denizlik ortası), metre ekseni yukarı; baş merkezi 0.76 m, göz ≈0.77 m.
import React from "react";
import { ink, karistir, lerp, P, poly, tonla } from "../../doku/sabitler";
import { OsmanliKol, ElPoz } from "./evliyaEl";

export type PadisahProps = { x: number; y: number; pxm: number; basAci: number; renk: string; kenar: string; gece: boolean; klip?: [number, number, number, number]; kenarPx?: number };

const N = 64;
const gs = (a: number, m: number, w: number) => { const aa = a > Math.PI ? a - 2 * Math.PI : a; return Math.exp(-((aa - m) ** 2) / (2 * w * w)); };
// Baş: merkez (0, 0.76 m); a = 0 sağ (+x), a = π/2 yukarı (metre ekseni). Profil tümsekleri yüz +x yönünde.
// v2 (K4 U1/U7, yalnız P12 PadisahFigur): yüz oranı düzeltildi — göz 0.77 m, burun ucu ≈0.73 (gözün 4 cm altı; v1'de burun göz
// hizasındaydı), burun kökü çukuru göz hizasında, dudak ≈0.70, çene ≈0.665. P02/P10 siluet (v1) değişmez.
export const basNoktalar = (t: number, v2 = false): P[] => {
  const out: P[] = [];
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2, c = Math.cos(a), s = Math.sin(a);
    const rx = lerp(0.093, 0.1, t), ry = 0.112;
    let r = 1 / Math.sqrt((c / rx) ** 2 + (s / ry) ** 2);
    // a < 0 = aşağı (çene tarafı). Alın (a≈+0.35) hafif, burun (−0.05) belirgin, burun altı çukur (−0.3), dudak (−0.45), çene (−0.85)
    if (v2) r += t * (0.01 * gs(a, 0.42, 0.14) - 0.005 * gs(a, 0.1, 0.06) + 0.048 * gs(a, -0.24, 0.1) - 0.012 * gs(a, -0.45, 0.06) + 0.008 * gs(a, -0.58, 0.06) - 0.006 * gs(a, -0.72, 0.05) + 0.012 * gs(a, -0.95, 0.1));
    else r += t * (0.012 * gs(a, 0.38, 0.14) + 0.052 * gs(a, -0.05, 0.085) - 0.014 * gs(a, -0.3, 0.06) + 0.01 * gs(a, -0.45, 0.06) - 0.008 * gs(a, -0.62, 0.05) + 0.012 * gs(a, -0.85, 0.1));
    r -= t * 0.012 * gs(a, -2.75, 0.3); // ense düzlüğü (arka-alt)
    out.push([-0.004 * t + r * c, 0.76 + r * s]);
  }
  return out;
};
// Sarık: alt kenar önde 0.80 m (alın), arkada 0.03 m daha aşağı (~8° eğik oturuş, profilde); en geniş alt üçte birde; üst hafif yassı + 4 tümsek.
const SARIK = { W: 0.16, H: 0.125, alt: 0.8 };
// v1.6 (K4 U1): P12 profilinde sarığın ön alt kenarı kaşın (0.79 m) ≥ 0.06 H_y (H_y ≈ 0.19 m → ≥ 0.011 m) üstünde: alt 0.815;
// arkada enseye doğru 0.045 m iner (kulağın üst yarısını örter). P02/P10 (alt 0.80, arka 0.03) değişmez.
export const SARIK_P12 = { alt: 0.815, arka: 0.045 };
export const sarikNoktalar = (t: number, alt = SARIK.alt, arka = 0.03): P[] => {
  const { W, H } = SARIK, cy = alt + 0.95 * H, out: P[] = [];
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2, c = Math.cos(a), s = Math.sin(a); // s > 0 üst
    let x: number, y: number;
    if (s < 0) { x = W * (1 + 0.04 * -s) * c; y = H * 0.95 * s; }
    else { x = W * c; y = H * (0.9 - 0.12 * Math.abs(c) ** 6) * s + 0.014 * Math.max(0, Math.sin(a * 5 + 0.3)) * s; }
    // profil: arkaya kayma (≥ %20 sarık eni = 0.064 m) + arka dolgunluk + arkada enseye doğru iniş
    x += t * (-0.068 + (c < 0 ? -0.024 * -c : -0.008 * c));
    if (s < 0 && c < 0) y -= t * arka * -c * -s;
    out.push([x, cy + y]);
  }
  return out;
};
const sarikTepe = (t: number) => SARIK.alt + 0.95 * SARIK.H + SARIK.H * 0.9 - 0.004;
// kavuk ucu: genişlik sarığın %30'u, yükseklik 0.025 m; tabanı sargının içinde (yarısı gömülü)
export const kavukNoktalar = (t: number): P[] => { const b = sarikTepe(t) - 0.012, x0 = -0.068 * t - 0.01 * t; return Array.from({ length: 16 }).map((_, i) => { const a = (i / 15) * Math.PI; return [x0 + 0.048 * Math.cos(a), b + 0.037 * Math.sin(a)] as P; }); };
// sarığın kendi gölge tonu (kavuk ucu + iç gölge)
export const SARIK_RENK = { yuz: "#d6d3c6", golge: "#a8a69a" };
// Kaftan büst (P02/P10): omuz geniş, yuvarlak omuz başı; taban −0.12 (pencere kırpar)
const govdeNoktalar = (): P[] => [
  [-0.36, -0.12], [-0.35, 0.3], [-0.335, 0.44], [-0.31, 0.51], [-0.26, 0.55], [-0.17, 0.585], [-0.075, 0.615], [-0.055, 0.66],
  [0.055, 0.66], [0.075, 0.615], [0.17, 0.585], [0.26, 0.55], [0.31, 0.51], [0.335, 0.44], [0.35, 0.3], [0.36, -0.12],
];
export const PADISAH_BUST_M = sarikTepe(1) + 0.025; // ≈ 1.05 m (sarık + kavuk ucu)

export const PadisahSiluet: React.FC<PadisahProps> = ({ x, y, pxm, basAci, renk, kenar, gece, klip, kenarPx = 2.2 }) => {
  const id = "pd" + React.useId().replace(/:/g, "");
  const t = Math.max(0, Math.min(1, basAci));
  const D = (q: P): P => [x + q[0] * pxm, y - q[1] * pxm];
  const gov = govdeNoktalar().map(D), bas = basNoktalar(t).map(D), sar = sarikNoktalar(t).map(D), kav = kavukNoktalar(t).map(D);
  const boyun = ([[-0.06, 0.6], [0.06, 0.6], [0.055 - 0.01 * t, 0.7], [-0.06 - 0.01 * t, 0.7]] as P[]).map(D);
  const k = kenarPx;
  const parcalar = [gov, boyun, bas, sar, kav];
  const S = (fill: string, key: string, tr?: string, filtre?: string) => <g key={key} fill={fill} transform={tr} filter={filtre}>{parcalar.map((q, i) => <polygon key={i} points={poly(q)} />)}</g>;
  const bb = { x: x - 0.6 * pxm, y: y - 1.3 * pxm, w: 1.2 * pxm, h: 1.6 * pxm };
  return (
    <g clipPath={klip ? `url(#${id}k)` : undefined}>
      <defs>
        {klip && <clipPath id={`${id}k`}><rect x={klip[0]} y={klip[1]} width={klip[2]} height={klip[3]} /></clipPath>}
        <filter id={`${id}e`} filterUnits="userSpaceOnUse" x={bb.x} y={bb.y} width={bb.w} height={bb.h}><feMorphology operator="erode" radius={k} /></filter>
        {/* kenar ışığı maskesi: birleşik siluet eksi (gece) aşındırılmış / (gün) sola kaydırılmış kopyası */}
        <mask id={`${id}m`} maskUnits="userSpaceOnUse" x={bb.x} y={bb.y} width={bb.w} height={bb.h}>
          {S("#ffffff", "b")}
          {gece ? S("#000000", "s", undefined, `url(#${id}e)`) : S("#000000", "s", `translate(${-k},0)`)}
        </mask>
      </defs>
      {/* tek koyu kütle: baş + sarık + kavuk + gövde aynı ton, iç kontur yok */}
      {S(renk, "kutle")}
      <rect x={bb.x} y={bb.y} width={bb.w} height={bb.h} fill={kenar} opacity={gece ? 0.92 : 0.9} mask={`url(#${id}m)`} />
    </g>
  );
};

// ---------------- P12: ayakta profil figür ----------------
// Metre, ayak tabanı orijin (eksen x = 0), y yukarı. Büst sistemi 0.78 m yukarıda (göz 1.55 m = 0.77 + 0.78).
export const FIGUR_BUST_Y = 0.78;
const PROFIL: P[] = [[-0.23, 0], [-0.19, 0.45], [-0.16, 0.9], [-0.15, 1.18], [-0.13, 1.33], [-0.07, 1.4], [0.06, 1.4], [0.11, 1.32], [0.13, 1.16], [0.145, 0.95], [0.16, 0.6], [0.22, 0]];
const ONDEN: P[] = [[-0.3, 0], [-0.26, 0.45], [-0.23, 0.9], [-0.24, 1.18], [-0.26, 1.31], [-0.14, 1.39], [0.14, 1.39], [0.26, 1.31], [0.24, 1.18], [0.23, 0.9], [0.26, 0.45], [0.3, 0]];
const KALCA: P = [0, 0.95];
export type FigurDurum = { f: number; egim: number }; // f: +1 sağa profil … 0 önden … −1 sola profil; egim (°): baktığı yöne öne eğilme
export type FigurTon = { kaftan: string; yaka: string; ten: string; sarik: string; sarikGolge: string; ayakkabi: string; kontur: boolean; sac?: string };
export const FIGUR_GOLGE: FigurTon = { kaftan: "#36302c", yaka: "#2c2724", ten: "#2a2420", sarik: "#44403c", sarikGolge: "#3a3632", ayakkabi: "#221c18", kontur: true, sac: "#221c18" };
// ışık tonları: yüz/el #dca08a (tasarim §3.5), sarık kendi rengi (yalnız şeritte), kaftan = #36302c + #f6e4b0 α .45
export const FIGUR_ISIK: FigurTon = { kaftan: karistir("#36302c", "#f6e4b0", 0.45), yaka: karistir("#2c2724", "#f6e4b0", 0.4), ten: "#dca08a", sarik: SARIK_RENK.yuz, sarikGolge: SARIK_RENK.golge, ayakkabi: "#5a4a3e", kontur: false, sac: "#3a2c22" };

export const figurGeo = (x: number, y: number, pxm: number, d: FigurDurum) => {
  const t = Math.abs(d.f), yon = d.f >= 0 ? 1 : -1;
  const eg = (d.egim * Math.PI) / 180;
  const egik = (q: P): P => { if (q[1] <= KALCA[1]) return q; const dx = q[0] - KALCA[0], dy = q[1] - KALCA[1]; return [KALCA[0] + dx * Math.cos(eg) + dy * Math.sin(eg), KALCA[1] - dx * Math.sin(eg) + dy * Math.cos(eg)]; };
  const D = (q: P): P => { const e = egik(q); return [x + yon * e[0] * pxm, y - e[1] * pxm]; };
  const bust = (q: P): P => D([q[0] + 0.03 * t, q[1] + FIGUR_BUST_Y]);
  const gov = PROFIL.map((q, i) => [lerp(ONDEN[i][0], q[0], t), lerp(ONDEN[i][1], q[1], t)] as P).map(D);
  const boyun = ([[-0.05, 1.38], [0.05, 1.38], [0.05, 1.5], [-0.05, 1.5]] as P[]).map(D);
  const bas = basNoktalar(t, true).map(bust), sar = sarikNoktalar(t, SARIK_P12.alt, SARIK_P12.arka).map(bust);
  const kav = kavukNoktalar(t).map((q) => bust([q[0], q[1] + SARIK_P12.alt - SARIK.alt]));
  const ayakkabi = [lerp(-0.1, 0.05, t), lerp(0.1, 0.19, t)].map((ax) => D([ax, 0]));
  const omuz = D([lerp(0.2, 0.0, t), 1.33]);
  const yuzOn = bas.reduce((a, q) => (yon * q[0] > yon * a[0] ? q : a), bas[0]); // burun ucu (baktığı yöndeki uç)
  const goz = bust([0.05, 0.77]);
  // v1.6 U7: profilde tek kısa üst göz kapağı çizgisi (0.12 H_y ≈ 0.023 m, bakış yönüne hafif eğik) + kirpik ucu + kaş kenarı (0.10 H_y)
  const kapak = ([[0.04, 0.773], [0.052, 0.776], [0.064, 0.772]] as P[]).map(bust);
  const kirpik = ([[0.064, 0.772], [0.069, 0.775]] as P[]).map(bust);
  const kas = ([[0.042, 0.789], [0.061, 0.793]] as P[]).map(bust);
  // burun kökü (göz hizasında ön kontur) ve burun ucu y'si (ışık çizgisi sınırları, U1)
  const burunKoku = bust([0.094, 0.77]), burunUcuY = bust([0, 0.733])[1], kasY = bust([0, 0.792])[1];
  // saç kütlesi yalnız ense + kulak arkası (sarığın arka alt kenarının altında)
  const sac = ([[-0.1, 0.79], [-0.06, 0.778], [-0.045, 0.74], [-0.06, 0.7], [-0.088, 0.69], [-0.104, 0.73]] as P[]).map((q) => bust([q[0] * t + (1 - t) * q[0] * 0.2, q[1]]));
  const yaka = ([[0.04 * t, 1.39], [0.07 * t, 1.18], [0.09 * t, 0.95]] as P[]).map(D);
  // sargı çizgileri (yalnız P12 yakın, ışık katmanında 2 adet, ton farkı): sarık önünde iki kavis
  const sargi = [0.035, 0.075].map((u) => [[-0.13 - 0.06 * t, SARIK_P12.alt + u - 0.01], [-0.02 - 0.05 * t, SARIK_P12.alt + u + 0.03], [0.1 - 0.06 * t, SARIK_P12.alt + u + 0.045]].map((q) => bust(q as P)));
  return { gov, boyun, bas, sar, kav, ayakkabi, omuz, yuzOn, goz, yaka, sargi, yon, t, pxm, kapak, kirpik, kas, burunKoku, burunUcuY, kasY, sac };
};
export type FigurGeo = ReturnType<typeof figurGeo>;
export type FigurKol = { omuz: P; dirsek: P; bilek: P; elAci: number; poz: ElPoz; aynaY?: boolean };
// 2 kemik IK (px): dirsek aşağı/arkaya bükülür (bukum: +1 / −1 ekran yönü seçimi)
export const kolIK2 = (omuz: P, hedef: P, L1: number, L2: number, bukum: number): { dirsek: P; bilek: P } => {
  const dx = hedef[0] - omuz[0], dy = hedef[1] - omuz[1], dd = Math.min(L1 + L2 - 0.5, Math.max(Math.abs(L1 - L2) + 0.5, Math.hypot(dx, dy)));
  const a0 = Math.atan2(dy, dx), cosA = (L1 * L1 + dd * dd - L2 * L2) / (2 * L1 * dd), A = Math.acos(Math.max(-1, Math.min(1, cosA)));
  const a = a0 + bukum * A;
  const dirsek: P = [omuz[0] + L1 * Math.cos(a), omuz[1] + L1 * Math.sin(a)];
  return { dirsek, bilek: [omuz[0] + dd * Math.cos(a0), omuz[1] + dd * Math.sin(a0)] };
};

export const PadisahFigur: React.FC<{ g: FigurGeo; kol: FigurKol | null; ton: FigurTon; sargi?: boolean }> = ({ g, kol, ton, sargi }) => {
  const kw = ton.kontur ? Math.max(1.2, 0.006 * g.pxm) : 0;
  const ks = (c: string) => (ton.kontur ? { stroke: ink(c), strokeWidth: kw, strokeLinejoin: "round" as const } : {});
  const sarFill = ton.sarik;
  const elPal = ton.kontur ? "padisah" : "padisah-isik";
  return (
    <g>
      {g.ayakkabi.map((q, i) => <ellipse key={i} cx={q[0] + g.yon * 0.04 * g.pxm} cy={q[1] - 0.02 * g.pxm} rx={0.07 * g.pxm} ry={0.025 * g.pxm} fill={ton.ayakkabi} {...ks(ton.ayakkabi)} />)}
      <polygon points={poly(g.gov)} fill={ton.kaftan} {...ks(ton.kaftan)} />
      <polyline points={poly(g.yaka)} fill="none" stroke={ton.yaka} strokeWidth={0.02 * g.pxm} strokeLinejoin="round" />
      <polygon points={poly(g.boyun)} fill={ton.ten} />
      {/* K5: dönüş (don) ARKADAN geçer (pencereden kapıya sırtını kameraya vererek döner): |f| < 0.5'te baş = ense/saç (yüzsüz ön görünüm "yumurta" okunuyordu) */}
      <polygon points={poly(g.bas)} fill={g.t < 0.5 ? ton.sac ?? ton.ten : ton.ten} {...ks(ton.ten)} />
      {g.t > 0.5 && <polygon points={poly(g.sac)} fill={ton.sac ?? ton.ten} />}
      {/* v1.6 U7: tek göz kapağı çizgisi + kirpik ucu + kaş kenarı (#2a2420; gölgede yüz tonuyla aynı → kaybolur) */}
      {g.t > 0.5 && <g stroke="#2a2420" fill="none" strokeLinecap="round">
        <polyline points={poly(g.kapak)} strokeWidth={0.0055 * g.pxm} strokeLinejoin="round" />
        <polyline points={poly(g.kirpik)} strokeWidth={0.0035 * g.pxm} />
        <polyline points={poly(g.kas)} strokeWidth={0.0045 * g.pxm} />
      </g>}
      <polygon points={poly(g.sar)} fill={sarFill} {...ks(sarFill)} />
      {(sargi || ton.kontur) && g.sargi.map((q, i) => <path key={i} d={`M ${q[0][0]} ${q[0][1]} Q ${q[1][0]} ${q[1][1]} ${q[2][0]} ${q[2][1]}`} stroke={ton.kontur ? tonla(ton.sarik, -0.22) : ton.sarikGolge} strokeWidth={0.012 * g.pxm} fill="none" strokeLinecap="round" />)}
      <polygon points={poly(g.kav)} fill={ton.kontur ? ton.sarik : ton.sarikGolge} />
      {kol && <OsmanliKol omuz={kol.omuz} dirsek={kol.dirsek} bilek={kol.bilek} gen={[0.15 * g.pxm, 0.12 * g.pxm]} tip={elPal} elAci={kol.elAci} olc={(0.19 * g.pxm) / 140} poz={kol.poz} aynaY={kol.aynaY} />}
    </g>
  );
};
