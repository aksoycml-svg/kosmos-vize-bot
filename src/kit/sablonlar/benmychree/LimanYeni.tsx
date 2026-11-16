// ===== LIMAN yeni görünümler (tur-5; yön değişikliği notlar/tur-9–10, sahne-plani §12) =====
// K1 (kiyidan-ada) KİLİTLİ: bu dosya K1 kodunu değiştirmez, yalnız K1 parçalarını (Sirt, Evler, Kale, Bayrak) içe aktarır.
// Görünümler:
//   gemi-orta  (P07a/P07b) — deniz +4 m, 135 mm, gemi Z 389 m (iki baca + iki direk + hangar okunur); arka plan = K1 plakaları gerçek derinlik oranıyla
//   karsi-kiyi (P04)       — geminin baş güvertesinden Kaş yamacına DOLLY ZOOM (konu: baş direği Z 12 → 24), göz deniz +8.35 m
//   saygi      (P10a)      — P01 noktası, 133 mm kilitli; ön plan kalkanlı top (Z 12) + dal; plato üstünde 5 dimdik siluet; arka plan K1 ×0.711 tiyatro
// Tek ışık: güneş az 235°, yükseklik plana göre (P04 22°, P07 18°, P10 6°). Rüzgâr 335° (ekran bileşeni ruzgar(b)).
import React, { useId } from "react";
import { interpolate } from "remotion";
import type { Plan } from "../../tipler";
import { param, SablonProps } from "../../ortak";
import { cl, GIRIS, CIKIS } from "../../zaman";
import { izd, izdPoli, Kam25, kamera25, Kamera25, plaka, V3 } from "../../kamera25d";
import { RenkKaydi } from "../../../doku/Tarama";
import { KonturTitreme } from "../../../doku/KonturTitreme";
import { Alev, BP, BulutSerit, Duman, Flu, gokSutun, Gok5, Katman, kirik, P2, pts, rr, ruzgar, Tara, Isleme } from "./bmcOrtak";
import { GEMI, GemiProfil, GemiYansima } from "./Gemi";
import { karisim as mix } from "./renk";
import { Bayrak, Evler, Kale, Sirt, sirtNokta } from "./Liman";
import { Dal, Ot, SirtK } from "./KiyiBatarya";

type Kilit = SablonProps["kilit"];
const kam = (C: V3, F: number, merkez: [number, number], odak = 2000, N = 16): Kam25 => ({ C, pan: 0, tilt: 0, F, odak, N, a: F / (30000 * N), merkez });

// ---------- deniz: dünya satırları (genelleştirilmiş K1 suSatirlari; göz yüksekliği hg, ışıltı oranı ekran yanına göre) ----------
type Vur = { x0: number; x1: number; z: number; isik: boolean; faz: number; f: number };
const DENIZ = new Map<string, Vur[]>();
const denizSatir = (anahtar: string, F: number, hg: number, zMin: number, zMax: number, oran: (u: number) => number, genis = 760): Vur[] => {
  if (DENIZ.has(anahtar)) return DENIZ.get(anahtar)!;
  const out: Vur[] = []; let z = zMax, i = 0;
  while (z > zMin && i < 600) {
    const s = F / z, L = Math.max(6, Math.min(60, 2.2 * s)) / s;
    let x = -genis / s - 60 + rr(`${anahtar}o${i}`) * L * 2;
    while (x < genis / s + 60) {
      const kx = Math.round(x * 10), u = (x * s) / 540, r0 = rr(`${anahtar}t${i}_${kx}`), o = oran(u), isik = r0 < o;
      const len = L * (isik ? 0.8 + 1.6 * rr(`${anahtar}l${i}_${kx}`) : 0.4 + 1.3 * rr(`${anahtar}l${i}_${kx}`));
      if (isik || r0 < o + 0.22 + 0.3 * Math.max(0, Math.min(1, (900 - z) / 400))) out.push({ x0: x, x1: x + len, z, isik, faz: rr(`${anahtar}f${i}_${kx}`) * 6.28, f: 0.4 + 0.5 * rr(`${anahtar}h${i}_${kx}`) });
      x += len + L * (0.6 + 2.2 * rr(`${anahtar}g${i}_${kx}`));
    }
    const dy = Math.max(5, Math.min(13, s * 1.2));
    z = (hg * F) / ((hg * F) / z + dy); i++;
  }
  DENIZ.set(anahtar, out);
  return out;
};
const DenizCiz: React.FC<{ V: Vur[]; k: Kam25; t: number; isik: string; golge: string; ymin?: number }> = ({ V, k, t, isik, golge, ymin = -1e9 }) => (
  <g strokeLinecap="round">
    {V.map((v, i) => {
      const a = izd(k, [v.x0, 0, v.z]), b = izd(k, [v.x1, 0, v.z]); if (!a || !b || b.x < -20 || a.x > 1100 || a.y < ymin || a.y > 1940) return null;
      const w = Math.max(2, Math.min(3.4, a.s * 0.4));
      if (!v.isik) return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={golge} strokeWidth={w} />;
      const yan = 0.5 + 0.5 * Math.sin(t * v.f * 2 * Math.PI + v.faz) > 0.28;
      return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={yan ? isik : mix(isik, BP.su, 0.55)} strokeWidth={w} />;
    })}
  </g>
);

// ---------- K1 arka planı (Meis: sırtlar, kasaba, kale, rıhtım) — K1 ref px, katman başına dönüşüm tr(zK1) ----------
// Sırtlar K1 seed'leriyle aynı örnek noktalarından genişletildi (x0 6'nın katı kadar sola) → K1'deki tepeler aynı yerde.
const MeisArka: React.FC<{ tr: (zK1: number) => string; t: number; seed: number; bugu?: number }> = ({ tr, t, seed, bugu = 0 }) => (
  <g>
    <Flu s={1.4}><g transform={tr(4000)}><Sirt A={sirtNokta(-760, 2060, 660, [[700, 50, 90], [860, 66, 110], [1040, 44, 80], [-300, 46, 180], [1500, 60, 200], [1900, 44, 160]], "s4", 2)} alt={1000} renk={mix(mix(BP.sirt[0], BP.bugu, 0.3), BP.bugu, bugu)} /></g></Flu>
    <Flu s={1.0}><g transform={tr(3000)}><Sirt A={sirtNokta(-720, 1980, 720, [[120, 40, 140], [420, 78, 170], [690, 92, 150], [960, 70, 130], [-360, 60, 200], [1400, 74, 180], [1800, 50, 160]], "s3", 3)} alt={1000} renk={BP.sirt[1]} golge={BP.sirt[2]} />
      <rect x={-1200} y={698} width={3600} height={30} fill={BP.bugu} opacity={0.42} /><rect x={-1200} y={728} width={3600} height={20} fill={BP.bugu} opacity={0.22} /></g></Flu>
    <Flu s={0.6}><g transform={tr(2600)}><Sirt A={sirtNokta(-720, 1980, 880, [[520, 110, 210], [800, 150, 200], [1060, 128, 160], [-200, 90, 220], [1450, 110, 200]], "s2", 4)} alt={1000} renk={BP.sirt[2]} golge={BP.sirt[3]} bant={2.5} />
      {Array.from({ length: 70 }).map((_, i) => { const x = 330 + rr(`mkd${i}`) * 780, y = 790 + rr(`mky${i}`) * 90; return y > 880 - 150 * Math.exp(-(((x - 800) / 200) ** 2)) - 110 * Math.exp(-(((x - 520) / 210) ** 2)) + 8 ? <ellipse key={i} cx={x} cy={y} rx={5 + rr(`mkr${i}`) * 5} ry={4} fill={BP.sirt[3]} /> : null; })}</g></Flu>
    <Flu s={0.6}><g transform={tr(2450)}>
      <Evler x0={520} x1={1100} taban={(x) => 852 - 40 * Math.exp(-(((x - 820) / 160) ** 2))} hMin={20} hMax={34} seed="ev4" bugu={0.42} bosluk={0.3} />
      <Evler x0={420} x1={1100} taban={(x) => 888 - 28 * Math.exp(-(((x - 800) / 180) ** 2))} hMin={22} hMax={38} seed="ev3" bugu={0.36} bosluk={0.2} />
      <Evler x0={300} x1={1100} taban={(x) => 924 - 14 * Math.exp(-(((x - 760) / 200) ** 2))} hMin={24} hMax={42} seed="ev2" bugu={0.3} />
      <Evler x0={240} x1={1100} taban={() => 958} hMin={26} hMax={46} seed="ev1" bugu={0.24} bosluk={0.06} />
      <Evler x0={1100} x1={1500} taban={() => 958} hMin={26} hMax={44} seed="ev1b" bugu={0.24} bosluk={0.2} /></g></Flu>
    <g transform={tr(2200)}><KonturTitreme derinlik="uzak" seed={seed + 1}><Kale /></KonturTitreme><Bayrak t={t} /></g>
    <g transform={tr(2350)}>
      <Evler x0={-10} x1={60} taban={() => 994} hMin={30} hMax={44} seed="evr" bugu={0.18} bosluk={0} />
      <Evler x0={850} x1={1500} taban={() => 994} hMin={30} hMax={46} seed="evs" bugu={0.18} bosluk={0} />
      <rect x={-20} y={990} width={1520} height={10} fill={BP.tasGolge} /><line x1={-20} x2={1500} y1={990} y2={990} stroke={BP.tasIsik} strokeWidth={2.5} />
      <rect x={-900} y={1000} width={2800} height={60} fill={BP.su} />
      {Array.from({ length: 110 }).map((_, i) => { const x = -400 + rr(`ls${i}`) * 1900, y = 1004 + rr(`lsy${i}`) * 40; return <line key={i} x1={x} x2={x + 10} y1={y} y2={y} stroke={x > 700 ? BP.suYol : BP.suGolge} strokeWidth={2} />; })}
    </g>
  </g>
);

// ---------- gök + güneş halesi (ekran) ----------
const Gok: React.FC<{ sinir: number[]; renk: string[]; seed: number; hale: P2; haleR?: number; sicak?: number; t: number; bulut: [number, number, number, number, string][] }> = ({ sinir, renk, seed, hale, haleR = 1, sicak = 0, t, bulut }) => (
  <g>
    <Gok5 sinir={sinir} renk={renk} seed={seed} />
    {[[330, "#ecc9b4", 0.35], [220, "#efd2b8", 0.5], [130, "#f3d9b6", 0.75]].map(([r, c, a], i) => <circle key={`hl${i}`} cx={hale[0]} cy={hale[1]} r={(r as number) * haleR} fill={mix(c as string, "#f0b890", sicak)} opacity={a as number} />)}
    {bulut.map(([x0, x1, y, h, s], i) => <BulutSerit key={i} x0={x0} x1={x1} y={y} h={h} seed={s} kayma={i === 1 ? (t / 3) * 20 : 0} />)}
  </g>
);

// ===================================================================================================
// P07a/P07b · gemi-orta (hangar yangını)
// ===================================================================================================
const ZS = 389.4, BAS_X = -66.1; // gemi Z (m), baş dünya x (m)
export const GEMI_ORTA_KAYIT: Kamera25 = { kare: [150, 245], konum_yol: [[0, 4, 0], [0, 4, 4]], yon_yol: [[0, 0]], lens_mm: [135], odak_z: [ZS], diyafram: 4, merkez: [540, 1290], egri: "giris", ekipman: "dolly" };
const GemiOrta: React.FC<{ plan: Plan; p: number; kilit: Kilit }> = ({ plan, p, kilit }) => {
  const k = kamera25(param<Partial<Kamera25>>(plan, "kamera25", {}), p, GEMI_ORTA_KAYIT);
  const t = p / 60, h = param<number>(plan, "gun_yuksekligi", 18), seed = param<number>(plan, "seed", 181);
  const al = param<{ isik: [number, number]; kare: number; siddet?: number }>(plan, "alev", { isik: [160, 204], kare: 212, siddet: 0.5 });
  const ruz = ruzgar(190), yh = k.merkez[1];
  // darbe: ≤ 2 px sarsıntı, 14 karede söner (kamera sarsılmaz; gövde/su değil yalnız kare)
  const ds = p >= al.kare && p < al.kare + 14 ? (1 - (p - al.kare) / 14) * 4 * (al.siddet ?? 0.5) : 0;
  const sx = Math.sin(p * 2.3) * Math.min(2, ds), sy = Math.cos(p * 3.1) * Math.min(2, ds) * 0.6;
  const Zd = ZS - k.C[2], pxm = k.F / Zd, wl = yh + (4 * k.F) / Zd, X0 = 540 + (BAS_X - k.C[0]) * pxm;
  const sm = (m: number) => X0 + m * pxm, sh = (hm: number) => wl - hm * pxm * GEMI.abarti;
  // K1 arka planı tiyatro dekoru olarak (tek ölçek 0.8; lint katman_odak_farki): K1 rıhtımı (y 990) → ufkun 12 px altı; kale sol kenarda (baş tarafı)
  const fA = param<number>(plan, "arka_olcek", 0.8), dxA = param<number>(plan, "arka_kayma", -330);
  const tr = () => `translate(${540 + dxA} ${yh + 12}) scale(${fA}) translate(-540 -990)`;
  // yangın evreleri
  const kizil = interpolate(p, al.isik, [0, 1], { ...cl });
  const pat = interpolate(p, [al.kare - 4, al.kare + 6], [0, 1], { ...cl, easing: GIRIS });
  const flas = p >= al.kare ? interpolate(p, [al.kare, al.kare + 12], [1, 0], { ...cl, easing: CIKIS }) : 0;
  const hx0 = sm(76.1), hx1 = sm(104.6), hy = sh(11.6), hc = (hx0 + hx1) / 2;
  const V = denizSatir("go", GEMI_ORTA_KAYIT.lens_mm![0] * 30, 4, 22, 2000, (u) => (u < -0.33 ? 0.06 : u < 0.33 ? 0.2 : 0.5));
  kilit.push({ ad: "hangar alevi", p: [hc, hy], tur: "dokunus" }, { ad: "baca arka", p: [sm(70.2), sh(17.7)], tur: "kurulum" });
  const tb = al.kare / 60, kalin = t > tb ? t - tb : -1;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <RenkKaydi><Isleme aci={105}>
        <g transform={`translate(${sx} ${sy})`}>
          <Gok sinir={[380, 640, 800, 960]} renk={gokSutun(h)} seed={seed} hale={[1190, 1060]} haleR={1.3} t={t}
            bulut={[[-60, 520, 520, 34, "g1"], [380, 1140, 760, 30, "g2"], [640, 1040, 640, 18, "g3"], [-80, 300, 960, 16, "g4"]]} />
          <MeisArka tr={tr} t={t} seed={seed} />
          {/* gemi (Z 389) + yansıma; ön sudan önce */}
          <g transform={`translate(${X0} ${wl + 2})`}><GemiYansima pxm={pxm} seed={seed} boy={0.75} /></g>
          {/* uzak su (gemi önü, ufuk–gemi arası) */}
          <rect x={-20} y={yh + 18} width={1120} height={wl - yh - 16} fill={BP.su} />
          <g transform={`translate(${X0} ${wl})`}><KonturTitreme derinlik="orta" seed={seed + 2} olcek={1.2}><GemiProfil pxm={pxm} durum="yanan" seed={seed} /></KonturTitreme></g>
          {/* hangar kenarında kızıl ışık (f160–204): çatı kenarı ve panel aralığı içten kızarır */}
          {kizil > 0 && <g opacity={kizil * (1 - pat * 0.4)}>
            <line x1={hx0 + 6} x2={hx1 - 6} y1={hy + 3} y2={hy + 3} stroke={BP.alevDis} strokeWidth={5} />
            <rect x={sm(91.5)} y={sh(GEMI.borda + 5)} width={7 * pxm} height={5 * pxm * GEMI.abarti} fill="none" stroke={BP.alevDis} strokeWidth={3} />
            <line x1={sm(95)} x2={sm(95)} y1={sh(GEMI.borda + 5)} y2={sh(GEMI.borda)} stroke={BP.alevOrta} strokeWidth={3} />
          </g>}
          {/* duman: P06 isabetinden beri (≈ 5 sn) yükselen sütun (rüzgâr 335° → sağa yatar, kadraj üstünden çıkar) + patlamadan sonra kalın koyu sütun (yeni loblar; fade yok) */}
          {/* rüzgâr 335° kameraya göre sağ-geri-yakın (145°): sütun sağa yatar ve kameraya yaklaştıkça genişler → üstte kadrajı örten tavan */}
          <Duman taban={[hc + 30, hy]} t={t} hiz={110} genis0={46} genis1={560} ruz={ruz * 0.6} seed="goi" boy={1600} yogun={0.9} tara={false} isikRenk="#c9aea6" />
          {kalin >= 0 && <Duman taban={[hc - 20, hy - 30]} t={kalin - 1500 / 150} hiz={150} genis0={80} genis1={420} ruz={ruz * 0.6} seed="gok" boy={1500} yogun={1} tara={false} isikRenk="#c9aea6" />}
          {/* alev (imza KOR): çatı kenarından ana alev + panel aralığından dil */}
          {(pat > 0 || kizil > 0) && <defs><radialGradient id="goIsik"><stop offset="0" stopColor="#ffe0a0" stopOpacity={1} /><stop offset="0.35" stopColor="#f58a2e" stopOpacity={0.55} /><stop offset="1" stopColor="#d9501f" stopOpacity={0} /></radialGradient></defs>}
          {pat > 0 && <g>
            <ellipse cx={hc} cy={hy - 40} rx={(hx1 - hx0) * 0.75} ry={190 * pat} fill="url(#goIsik)" opacity={0.45 * pat} />
            {/* düzensiz alev kümesi: arka (koyu, uzun) → ön (kısa, parlak); uçlar rüzgârla sağa */}
            <Alev taban={[hc - 70, hy + 6]} gen={110} boy={230 * pat} t={t} ruz={ruz} seed="goa1" n={3} kontur={1.4} konturRenk="#7a3424" />
            <Alev taban={[hc + 30, hy + 6]} gen={150} boy={340 * pat} t={t} ruz={ruz} seed="goa2" n={4} kontur={1.6} konturRenk="#7a3424" />
            <Alev taban={[hc + 115, hy + 6]} gen={80} boy={170 * pat} t={t} ruz={ruz} seed="goa3" n={3} kontur={1.4} konturRenk="#7a3424" />
            <Alev taban={[hc - 120, hy + 6]} gen={50} boy={110 * pat} t={t} ruz={ruz} seed="goa4" n={2} kontur={1.4} konturRenk="#7a3424" />
            <Alev taban={[sm(95), sh(GEMI.borda + 3.4)]} gen={34} boy={110 * pat} t={t} ruz={ruz} seed="gop" n={2} kontur={1.4} konturRenk="#7a3424" />
          </g>}
          {flas > 0 && <ellipse cx={hc} cy={hy - 30} rx={260 * (0.7 + 0.3 * (1 - flas))} ry={200 * (0.7 + 0.3 * (1 - flas))} fill="url(#goIsik)" opacity={0.85 * flas} />}
          {/* yakın su: dünya satırları (Z 22–2000) */}
          {(() => { return <rect x={-10} y={wl + 1} width={1100} height={1940 - wl} fill={mix(BP.su, BP.bugu, 0.08)} />; })()}
          <DenizCiz V={V} k={k} t={t} isik={BP.suYol} golge={BP.suGolge} ymin={wl + 4} />
          <g transform={`translate(${X0} ${wl + 2})`} opacity={0.55}><GemiYansima pxm={pxm} seed={seed + 1} boy={0.5} /></g>
          {/* alev yansıması: hangarın altında dikey kırık şeritler (satır başına sabit seed, dalga ile kayar) */}
          {(kizil > 0 || pat > 0) && Array.from({ length: 34 }).map((_, i) => {
            const y = wl + 6 + i * 9 + i * i * 0.18, gen = (hx1 - hx0) * (0.9 - i * 0.012) * (0.5 + 0.5 * pat), x = hc + (rr(`gy${i}`) - 0.5) * 60 + Math.sin(t * 2.4 + i * 0.9) * 6 + ruz * 4;
            const parca = 2 + Math.floor(rr(`gyn${i}`) * 3), g = pat > 0 ? 1 - i / 40 : kizil * 0.5 * (1 - i / 34);
            return <g key={i} opacity={g}>{Array.from({ length: parca }).map((__, j) => { const u = (j + 0.5) / parca - 0.5, w = (gen / parca) * (0.4 + 0.5 * rr(`gyw${i}${j}`));
              return <line key={j} x1={x + u * gen - w / 2} x2={x + u * gen + w / 2} y1={y} y2={y} stroke={j % 2 ? BP.alevOrta : i < 6 ? BP.alevCekirdek : BP.alevDis} strokeWidth={4} strokeLinecap="round" />; })}</g>;
          })}
          {/* ön plan: bağlama şamandırası (Z 26, sol alt; yumuşak) — liman donanımı, işlevli */}
          {(() => { const z = 34 - k.C[2], s = k.F / z, x = 540 + (-3.2 - k.C[0]) * s, y = yh + (4 * k.F) / z; const sg = Math.min(4, (k.a * k.F * Math.abs(1 / z - 1 / k.odak)) / 2.5);
            return <Flu s={sg}><g>
              <ellipse cx={x} cy={y + 6} rx={0.9 * s} ry={0.12 * s} fill={BP.suGolge} />
              <path d={`M${x - 0.8 * s},${y} C${x - 0.8 * s},${y - 0.55 * s} ${x + 0.8 * s},${y - 0.55 * s} ${x + 0.8 * s},${y} Z`} fill="#4c4660" stroke={BP.kontur} strokeWidth={3} />
              <path d={`M${x + 0.2 * s},${y - 0.42 * s} C${x + 0.6 * s},${y - 0.36 * s} ${x + 0.8 * s},${y - 0.15 * s} ${x + 0.8 * s},${y}`} stroke={BP.kenar} strokeWidth={4} fill="none" />
              <ellipse cx={x} cy={y - 0.55 * s} rx={0.18 * s} ry={0.12 * s} fill="none" stroke={BP.demir} strokeWidth={0.05 * s} />
              <path d={`M${x + 0.1 * s},${y - 0.66 * s} A${0.18 * s},${0.12 * s} 0 0 1 ${x + 0.18 * s},${y - 0.55 * s}`} stroke={BP.demirIsik} strokeWidth={3} fill="none" />
              {[0, 1, 2].map((i) => <line key={i} x1={x - 0.7 * s} x2={x + 0.7 * s} y1={y + 10 + i * 9} y2={y + 10 + i * 9} stroke={i % 2 ? BP.suYol : BP.suGolge} strokeWidth={3} opacity={0.6} />)}
            </g></Flu>; })()}
          {/* atmosfer: tuz zerresi + yangın kıvılcımı yok (KOR tek: alev) */}
          {Array.from({ length: 36 }).map((_, i) => { const x = 380 + ((rr(`gz${i}`) * 700 + t * (6 + rr(`gzv${i}`) * 8)) % 700), y = 700 + rr(`gzy${i}`) * 1000 + Math.sin(t + i) * 4; return <circle key={i} cx={x} cy={y} r={1.2 + rr(`gzr${i}`) * 1.2} fill="#efe0cc" opacity={0.32} />; })}
        </g>
      </Isleme></RenkKaydi>
    </svg>
  );
};

// ===================================================================================================
// P04 · karsi-kiyi (geminin baş güvertesinden Kaş yamacına DOLLY ZOOM)
// ===================================================================================================
// Dünya: kamera başta (0, 8.35, 0), b 15° (Kaş, kuzey). Gemi: kamera istasyonu baştan 35.8 m → baş (stem) dünya z 35.8.
// Baş direği (-1.213, *, 12) ø 0.24 m → F/z sabit (konu eksende z 12): ekranda x 40–130, 90 px. Pin rayı üst kenarı z 11.7, y 7.53 → ekran y ≈ 1620.
const KK_EYE = 8.35, DEK = 6.52, RAY = 7.5, STEM = 35.8, MAST_X = -1.213;
export const KARSI_KIYI_KAYIT: Kamera25 = { kare: [0, 250], konum_yol: [[0, KK_EYE, 0], [0, KK_EYE, -12]], yon_yol: [[0, 0]], lens_mm: [150], dolly_zoom: { konu: [0, KK_EYE, 12] }, odak_z: [2000], diyafram: 45, merkez: [540, 1300], egri: "inout", ekipman: "dolly" };
const hb = (z: number) => 7 * Math.sqrt(Math.max(0, 1 - (Math.max(0, z - 5.8) / 30) ** 1.6)); // yarım genişlik (m)
// Kaş yamacı (ref px; başlangıç kamerası F 4500, ufuk 1300, kıyı çizgisi 1319). Sırt eğrisi: tepe kümeleri.
const KAS_TABAN = 1319;
const kasSirt = (x: number) => KAS_TABAN - 330 - 120 * Math.exp(-(((x - 160) / 260) ** 2)) - 90 * Math.exp(-(((x - 980) / 300) ** 2)) + 60 * Math.exp(-(((x - 640) / 140) ** 2)) + Math.sin(x * 0.045) * 6 + (rr(`ks${Math.round(x / 14)}`) - 0.5) * 8;
export const PARILTI_REF: P2 = [612, 1166];
// K1 dili (kukla tiyatrosu dekoru): yamaç = üst üste binen düz renkli sırt/mahmuz siluetleri; her siluetin üst kenarında sıcak bant (ön ışık),
// altında koyu gölge ofseti, üstünde K1 s2 gibi koyu maki noktaları. Mahmuz kenarları vadide parıltıya yakınsar (göz yönlendirme).
const spurYol = (A: P2[]) => `M${pts(A)} L${A[A.length - 1][0]},1400 L${A[0][0]},1400 Z`;
const SPUR_SOL: P2[] = [[-220, 980], ...kirik([-200, 980], [180, 1010], 7, 6, "sp1"), ...kirik([180, 1010], [470, 1150], 6, 6, "sp2"), ...kirik([470, 1150], [600, 1250], 4, 4, "sp3"), [640, 1320]];
const SPUR_SAG: P2[] = [[540, 1320], ...kirik([600, 1262], [760, 1176], 4, 4, "sr1"), ...kirik([760, 1176], [1040, 1060], 6, 6, "sr2"), ...kirik([1040, 1060], [1320, 1010], 5, 6, "sr3")];
const KIYI_SIRT: P2[] = [[-220, 1262], ...kirik([-200, 1262], [380, 1276], 9, 5, "ks1"), ...kirik([380, 1276], [520, 1306], 4, 3, "ks2"), [560, 1320]];
const MakiNokta: React.FC<{ alan: P2[]; n: number; seed: string; r: [number, number]; renk: string; bos?: (x: number, y: number) => boolean }> = ({ alan, n, seed, r, renk, bos }) => {
  const xs = alan.map((q) => q[0]), ust = (x: number) => { for (let i = 1; i < alan.length; i++) if ((alan[i - 1][0] - x) * (alan[i][0] - x) <= 0) { const a = alan[i - 1], b = alan[i], u = (x - a[0]) / (b[0] - a[0] || 1); return a[1] + (b[1] - a[1]) * u; } return 1e9; };
  const x0 = Math.min(...xs), x1 = Math.max(...xs);
  return <g>{Array.from({ length: n }).map((_, i) => { const x = x0 + rr(`${seed}x${i}`) * (x1 - x0), u = ust(x), y = u + 10 + rr(`${seed}y${i}`) ** 1.4 * (KAS_TABAN - 14 - u - 10);
    if (y > KAS_TABAN - 12 || (bos && bos(x, y))) return null; const rx = r[0] + rr(`${seed}r${i}`) * (r[1] - r[0]);
    const m = 1 + Math.floor(rr(`${seed}m${i}`) * 3);
    return <g key={i}>{Array.from({ length: m }).map((_, j) => { const cx = x + (j - (m - 1) / 2) * rx * 1.3, cy = y - (j % 2) * rx * 0.35, q = rx * (0.75 + 0.4 * rr(`${seed}q${i}${j}`));
      return <g key={j}><ellipse cx={cx + q * 0.35} cy={cy + 2} rx={q} ry={q * 0.6} fill={BP.sirt[3]} opacity={0.55} /><ellipse cx={cx} cy={cy} rx={q} ry={q * 0.72} fill={renk} /><path d={`M${cx - q * 0.75},${cy - q * 0.2} A${q},${q * 0.72} 0 0 1 ${cx + q * 0.1},${cy - q * 0.72}`} stroke={mix(renk, BP.sirtBant, 0.55)} strokeWidth={1.3} fill="none" /></g>; })}</g>; })}</g>;
};
const KasYamaci: React.FC<{ t: number }> = ({ t }) => {
  const S: P2[] = []; for (let x = -220; x <= 1320; x += 7) S.push([x, kasSirt(x)]);
  const L1 = mix(BP.sirt[1], BP.tasOrta, 0.5), L2 = mix(BP.sirt[2], BP.tasGolge, 0.2), L3 = mix(BP.sirt[2], BP.tasOrta, 0.28), L4 = mix(BP.sirt[3], BP.tasGolge, 0.3);
  const makiR = mix(BP.maki, BP.sirt[3], 0.5), PX = PARILTI_REF[0], PY = PARILTI_REF[1];
  const bosP = (x: number, y: number) => Math.abs(x - PX) < 34 && Math.abs(y - PY) < 14;
  const bant = (A: P2[], w = 3.5) => <><polyline points={pts(A.map((q) => [q[0] + 6, q[1] + 10] as P2))} fill="none" stroke={BP.sirt[3]} strokeWidth={8} opacity={0.35} /><polyline points={pts(A)} fill="none" stroke={BP.sirtBant} strokeWidth={w} strokeLinejoin="round" /></>;
  return (
    <g strokeLinejoin="round">
      {/* L1 ana sırt yüzü (en açık; sırta yakın buğu) */}
      <path d={spurYol(S)} fill={L1} />
      <path d={`M${pts(S)} L${pts(S.slice().reverse().map((q) => [q[0], q[1] + 50] as P2))} Z`} fill={BP.bugu} opacity={0.16} />
      <MakiNokta alan={S} n={150} seed="m1" r={[4, 8]} renk={makiR} bos={bosP} />
      {bant(S)}
      {/* vadi sol duvarı (sağa bakar → gölge): L2 mahmuz kenarından vadi dibine koyu kama; parıltı bu gölgenin içinde */}
      <Flu s={9}><path d={`M${pts([[260, 1010], [470, 1150], [600, 1250], [640, 1320], [740, 1320], [700, 1230], [672, 1150], [610, 1080], [500, 1030], [380, 1000]])} Z`} fill={BP.sirt[3]} opacity={0.6} /></Flu>
      {/* parıltı yuvası: vadinin dibinde, sık maki arasında karanlık gölge (top yalnız KOR ile ele verir) */}
      {[[-30, 6, 12], [30, 7, 13], [-8, -10, 9], [18, -11, 9], [-52, -2, 9], [54, 0, 10], [0, 14, 10]].map(([dx, dy, r], j) => <g key={`pm${j}`}><ellipse cx={PX + dx + r * 0.3} cy={PY + dy + 2} rx={r} ry={r * 0.62} fill={BP.sirt[3]} opacity={0.55} /><ellipse cx={PX + dx} cy={PY + dy} rx={r} ry={r * 0.7} fill={mix(makiR, BP.sirt[3], 0.3)} /></g>)}
      {/* L2 sol mahmuz, L3 sağ mahmuz (kenarları vadide yakınsar), L4 kıyı sırtı */}
      <path d={spurYol(SPUR_SOL)} fill={L2} /><MakiNokta alan={SPUR_SOL} n={110} seed="m2" r={[5, 9]} renk={makiR} />{bant(SPUR_SOL)}
      <path d={spurYol(SPUR_SAG)} fill={L3} /><MakiNokta alan={SPUR_SAG} n={110} seed="m3" r={[5, 9]} renk={makiR} />{bant(SPUR_SAG)}
      {[[150, 1070, 34, 14], [880, 1150, 30, 12], [330, 1180, 26, 11], [1120, 1110, 36, 14]].map(([x, y, w, hh], i) => <g key={`kc${i}`}><path d={`M${pts([[x, y], [x + w * 0.1, y - hh * 0.8], [x + w * 0.45, y - hh], [x + w * 0.8, y - hh * 0.7], [x + w, y]])} Z`} fill={mix(BP.tasIsik, L2, 0.3)} /><path d={`M${pts([[x + w * 0.45, y - hh], [x + w * 0.8, y - hh * 0.7], [x + w, y], [x + w * 0.55, y]])} Z`} fill={BP.sirt[3]} opacity={0.8} /></g>)}
      <path d={spurYol(KIYI_SIRT)} fill={L4} /><MakiNokta alan={KIYI_SIRT} n={26} seed="m4" r={[5, 8]} renk={mix(makiR, BP.sirt[3], 0.4)} />{bant(KIYI_SIRT, 3)}
      {/* kıyı: ıslak kaya bandı + köpük çizgisi */}
      <path d={`M-220,1400 L${pts(kirik([-220, KAS_TABAN - 7], [1320, KAS_TABAN - 6], 40, 2.5, "kk1"))} L1320,1400 Z`} fill="#4e4670" />
      <polyline points={pts(kirik([-220, KAS_TABAN - 1], [1320, KAS_TABAN], 50, 1.5, "kk2"))} stroke={BP.kopuk} strokeWidth={2.5} fill="none" />
      {[0, 1, 2].map((i) => <Ot key={i} x={300 + i * 330} y={kasSirt(300 + i * 330) + 3} L={12} ruz={-0.64} t={t} seed={`kso${i}`} n={5} w={1.6} />)}
    </g>
  );
};
const KarsiKiyi: React.FC<{ plan: Plan; p: number; kilit: Kilit }> = ({ plan, p, kilit }) => {
  const ref = kamera25(undefined, 0, KARSI_KIYI_KAYIT), k = kamera25(param<Partial<Kamera25>>(plan, "kamera25", {}), p, KARSI_KIYI_KAYIT);
  const t = p / 60, h = param<number>(plan, "gun_yuksekligi", 22), seed = param<number>(plan, "seed", 193), ruz = ruzgar(15);
  const pa = param<{ kare: number; giris: [number, number]; cikis: [number, number] }>(plan, "parilti", { kare: 190, giris: [184, 190], cikis: [232, 244] });
  const par = p < pa.giris[0] || p > pa.cikis[1] ? 0 : p < pa.kare ? interpolate(p, [pa.giris[0], pa.kare], [0, 1], { ...cl, easing: GIRIS }) : p < pa.cikis[0] ? 1 - 0.15 * interpolate(p, [pa.kare, pa.kare + 12], [0, 1], { ...cl }) + 0.05 * Math.sin(t * 9) : 0.85 * interpolate(p, pa.cikis, [1, 0], { ...cl, easing: CIKIS });
  const P = plaka(ref, k, 2000).T(PARILTI_REF);
  const V = denizSatir("kk", 4500, KK_EYE, 30, 2000, () => 0.1, 700);
  const W = (x: number, y: number, z: number) => izd(k, [x, y, z]);
  // güverte, küpeşte, zincir, direk, pin rayı — 3B (izdPoli: kamera arkası kırpılır) → dolly zoom ön plan bükülmesi gerçek
  const zs = Array.from({ length: 60 }).map((_, i) => -20 + i * ((STEM + 20) / 59));
  const sol = zs.map((z) => [-hb(z), DEK, z] as V3), sag = zs.map((z) => [hb(z), DEK, z] as V3);
  const guverte = izdPoli(k, [...sol, ...sag.slice().reverse()], 0.5);
  const kupIc = (sx: number) => izdPoli(k, [...zs.map((z) => [sx * hb(z), DEK, z] as V3), ...zs.slice().reverse().map((z) => [sx * hb(z) * 0.995, DEK + 0.18, z] as V3)], 0.5);
  const ray = (sx: number) => zs.map((z) => W(sx * hb(z) * 0.99, RAY, z)).filter((q) => q !== null).map((q) => [q!.x, q!.y] as P2);
  const mast = W(MAST_X, KK_EYE, 12)!, mw = (0.24 * k.F) / (12 - k.C[2]);
  const gid = useId().replace(/:/g, "");
  // direk gölgesi: güneş rel 220 → gölge yönü rel 40 (ileri-sağ), güvertede küpeşteye kadar
  const gL = 10.9, gd: V3 = [Math.sin((40 * Math.PI) / 180), 0, Math.cos((40 * Math.PI) / 180)];
  const golge = izdPoli(k, [[MAST_X - 0.12 * gd[2], DEK + 0.01, 12 + 0.12 * gd[0]], [MAST_X + 0.12 * gd[2], DEK + 0.01, 12 - 0.12 * gd[0]], [MAST_X + 0.12 * gd[2] + gd[0] * gL, DEK + 0.01, 12 - 0.12 * gd[0] + gd[2] * gL], [MAST_X - 0.12 * gd[2] + gd[0] * gL, DEK + 0.01, 12 + 0.12 * gd[0] + gd[2] * gL]], 0.5);
  const pinX = [-1.98, -1.62, -0.86, -0.5], RZ = 11.7, RT = 7.53;
  kilit.push({ ad: "parıltı (KOR)", p: P, tur: "dokunus" }, { ad: "direk", p: [mast.x, 1500], tur: "kurulum" });
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <RenkKaydi><Isleme aci={60}>
        {/* gök (sonsuz plaka: dolly zoom'da o da büyür) — güneş arkada: hale yok, alt basamak sıcak */}
        <Katman r={ref} k={k} z={1e7}><Gok5 sinir={[380, 720, 960, 1130]} renk={gokSutun(h)} seed={seed} x0={-300} x1={1380} y0={-900} />
          <BulutSerit x0={-80} x1={520} y={560} h={30} seed="kk1" /><BulutSerit x0={600} x1={1200} y={760} h={26} seed="kk2" kayma={(t / 3) * -14} /><BulutSerit x0={60} x1={460} y={900} h={14} seed="kk3" />
          <BulutSerit x0={180} x1={700} y={700} h={18} seed="kk4" kayma={(t / 3) * -10} /><BulutSerit x0={520} x1={980} y={830} h={14} seed="kk5" /><BulutSerit x0={-120} x1={240} y={790} h={12} seed="kk6" renk="#ead2c6" /></Katman>
        {/* Likya sırtları (Z 6000 / 3500) + buğu */}
        <Katman r={ref} k={k} z={6000} ek={1.2}><SirtK x0={-600} x1={1700} taban={1300} tepeler={[[-100, 230, 300], [420, 250, 220], [700, 300, 200], [1200, 240, 280]]} renk={mix(BP.sirt[0], BP.bugu, 0.25)} bant={BP.sirtBant} seed="kk6" />
          <rect x={-600} y={1060} width={2300} height={60} fill={BP.bugu} opacity={0.4} /></Katman>
        {/* Kaş yamacı (Z 2000) */}
        <Katman r={ref} k={k} z={2000}><KasYamaci t={t} /><rect x={-200} y={1296} width={1500} height={20} fill={BP.bugu} opacity={0.3} /></Katman>
        {/* deniz (dünya satırları; güneş arkada → ışıltı az, gök yansıması) */}
        {(() => { const y0 = izd(k, [0, 0, 2000])!.y; return <rect x={-10} y={y0} width={1100} height={1940 - y0} fill={mix(BP.su, BP.bugu, 0.12)} />; })()}
        <DenizCiz V={V} k={k} t={t} isik={mix(BP.suYol, "#c9d0de", 0.5)} golge={BP.suGolge} />
        {/* PARILTI (D3): yamaçtaki tek KOR — yatay silindir yansıması + kısa haç; hale ekran px (yakınlaşmada büyümez) */}
        {par > 0 && <g>
          <defs><radialGradient id="kkPar"><stop offset="0" stopColor="#fff1d0" stopOpacity={1} /><stop offset="0.22" stopColor="#ffd27a" stopOpacity={0.95} /><stop offset="0.55" stopColor="#ffae2e" stopOpacity={0.4} /><stop offset="1" stopColor="#ffae2e" stopOpacity={0} /></radialGradient></defs>
          <circle cx={P[0]} cy={P[1]} r={66 * par + 6} fill="url(#kkPar)" />
          <path d={`M${P[0] - 120 * par},${P[1]} L${P[0] - 6},${P[1] - 3} L${P[0]},${P[1] - 40 * par} L${P[0] + 6},${P[1] - 3} L${P[0] + 120 * par},${P[1]} L${P[0] + 6},${P[1] + 3} L${P[0]},${P[1] + 40 * par} L${P[0] - 6},${P[1] + 3} Z`} fill="#ffe7b0" opacity={0.95} />
          <circle cx={P[0]} cy={P[1]} r={7 * par + 2} fill="#fff8e8" />
        </g>}
        {/* --- gemi baş güvertesi (3B) --- */}
        <defs><clipPath id={`gv${gid}`}><path d={`M${pts(guverte)} Z`} /></clipPath></defs>
        <path d={`M${pts(guverte)} Z`} fill={BP.guverte} />
        <g clipPath={`url(#gv${gid})`}>
          {Array.from({ length: 64 }).map((_, i) => { const x = -7 + i * 0.22, a = W(x, DEK, Math.max(k.C[2] + 0.6, -20)), b = W(x, DEK, STEM); return a && b ? <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={BP.guverteGolge} strokeWidth={1.6} opacity={0.55} /> : null; })}
          <path d={`M${pts(golge)} Z`} fill="#4a3e58" opacity={0.6} />
          {/* çıpa zincirleri: ırgattan (kadraj altı) loça deliklerine (±1.0, z 33) — gemi demirli */}
          {[-1, 1].map((sx) => { const x = (z: number) => sx * (0.7 + (z - 9) * 0.0125), zb = Math.max(9, k.C[2] + 1.5);
            const serit = izdPoli(k, [[x(zb) - 0.06, DEK + 0.04, zb], [x(33) - 0.06, DEK + 0.04, 33], [x(33) + 0.06, DEK + 0.04, 33], [x(zb) + 0.06, DEK + 0.04, zb]], 0.5);
            return <g key={`z${sx}`}><path d={`M${pts(serit)} Z`} fill="#3a3648" />
              {Array.from({ length: 80 }).map((_, i) => { const z = 9 + i * 0.3; if (z > 32.8 || z < zb) return null; const a = W(x(z) - 0.03, DEK + 0.05, z), b = W(x(z) - 0.03, DEK + 0.05, z + (i % 2 ? 0.1 : 0.2)); if (!a || !b) return null;
                return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={BP.demirIsik} strokeWidth={Math.max(1.2, (i % 2 ? 0.02 : 0.03) * a.s)} strokeLinecap="round" opacity={0.85} />; })}</g>; })}
          {[-1, 1].map((sx) => { const q = W(sx * 1.0, DEK, 33.2); return q ? <ellipse key={sx} cx={q.x} cy={q.y} rx={Math.max(3, 0.2 * q.s)} ry={Math.max(1.5, 0.07 * q.s)} fill="#3a3648" stroke={BP.demirIsik} strokeWidth={1.5} /> : null; })}
        </g>
        {/* güverte kenarı (su yolu + alçak küpeşte tabanı) + açık parmaklık: dikmeler, orta ray, üst ray (deniz aralarından görünür) */}
        <path d={`M${pts(kupIc(-1))} Z`} fill={BP.guverteGolge} stroke={BP.kontur} strokeWidth={2} />
        <path d={`M${pts(kupIc(1))} Z`} fill={mix(BP.guverte, BP.tasIsik, 0.2)} stroke={BP.kontur} strokeWidth={2} />
        {[-1, 1].map((sx) => Array.from({ length: 40 }).map((_, i) => { const z = STEM - 0.6 - i * 1.25; if (z < k.C[2] + 1) return null; const a = W(sx * hb(z) * 0.99, RAY, z), b = W(sx * hb(z) * 0.99, DEK + 0.18, z); if (!a || !b || a.x < -40 || a.x > 1120) return null;
          return <line key={`d${sx}${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={sx < 0 ? BP.kontur : "#5a4a50"} strokeWidth={Math.max(2.5, 0.05 * a.s)} />; }))}
        {[-1, 1].map((sx) => { const m = zs.map((z) => W(sx * hb(z) * 0.99, DEK + 0.5, z)).filter((q) => q !== null).map((q) => [q!.x, q!.y] as P2); return <polyline key={`o${sx}`} points={pts(m)} fill="none" stroke={BP.kontur} strokeWidth={3} />; })}
        <polyline points={pts(ray(-1))} fill="none" stroke={BP.kontur} strokeWidth={7} /><polyline points={pts(ray(-1))} fill="none" stroke={BP.kenar} strokeWidth={2.5} />
        <polyline points={pts(ray(1))} fill="none" stroke={BP.kontur} strokeWidth={7} /><polyline points={pts(ray(1))} fill="none" stroke={BP.kenar} strokeWidth={2.5} />
        {/* baş direği (konu; ekranda sabit): sol yarı ışıkta, demir bilezikler */}
        <g>
          <rect x={mast.x - mw / 2} y={-20} width={mw} height={1960} fill={BP.direk} />
          <rect x={mast.x - mw / 2} y={-20} width={mw * 0.36} height={1960} fill={mix(BP.direk, BP.kenar, 0.45)} />
          <line x1={mast.x - mw / 2 + mw * 0.12} x2={mast.x - mw / 2 + mw * 0.12} y1={-20} y2={1940} stroke={BP.kenar} strokeWidth={3} opacity={0.85} />
          <line x1={mast.x - mw / 2} x2={mast.x - mw / 2} y1={-20} y2={1940} stroke={BP.kontur} strokeWidth={3} /><line x1={mast.x + mw / 2} x2={mast.x + mw / 2} y1={-20} y2={1940} stroke={BP.kontur} strokeWidth={3} />
          {[8.7, 10.15, 11.4].map((hm, i) => { const y = W(MAST_X, hm, 12)!.y, bh = (0.07 * k.F) / (12 - k.C[2]); return <g key={i}><rect x={mast.x - mw / 2 - 3} y={y} width={mw + 6} height={bh} fill={BP.demir} stroke={BP.kontur} strokeWidth={2} /><line x1={mast.x - mw / 2 - 3} x2={mast.x} y1={y + 2} y2={y + 2} stroke={BP.demirIsik} strokeWidth={2} /></g>; })}
          {/* mandarlar: pin rayından direk boyunca yukarı (gergi halatları) */}
          {pinX.map((x, i) => { const a = W(x, RT + 0.12, RZ), b = W(MAST_X + (i < 2 ? -0.16 : 0.16), 20, 12); return a && b ? <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={BP.halat} strokeWidth={Math.max(2.5, 0.025 * a.s)} /> : null; })}
        </g>
        {/* pin rayı (direk önünde, z 11.7): ön yüz ışıkta (güneş arkada), dikmeler, kazık + sarkan halat kangalları */}
        {(() => { const f = izdPoli(k, [[-2.3, RT, RZ], [-0.12, RT, RZ], [-0.12, RT - 0.1, RZ], [-2.3, RT - 0.1, RZ]]), u = izdPoli(k, [[-2.3, RT, RZ], [-0.12, RT, RZ], [-0.12, RT, RZ + 0.12], [-2.3, RT, RZ + 0.12]]);
          const s = k.F / (RZ - k.C[2]);
          return <g>
            {[-2.2, -0.22].map((x, i) => { const a = W(x, RT, RZ)!, b = W(x, DEK, RZ)!; return <rect key={i} x={a.x - 0.045 * s} y={a.y} width={0.09 * s} height={b.y - a.y} fill="#7a5c4a" stroke={BP.kontur} strokeWidth={2} />; })}
            <path d={`M${pts(f)} Z`} fill="#9a785e" stroke={BP.kontur} strokeWidth={2.5} /><path d={`M${pts(u)} Z`} fill={mix("#9a785e", BP.kenar, 0.5)} />
            <polyline points={pts(f.slice(0, 2))} fill="none" stroke={BP.kenar} strokeWidth={3} />
            {pinX.map((x, i) => { const a = W(x, RT + 0.16, RZ - 0.02)!, b = W(x, RT - 0.02, RZ - 0.02)!; const cx = a.x, ry = 0.3 * s, rx = 0.085 * s;
              return <g key={i}>
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#6a5040" strokeWidth={0.045 * s} strokeLinecap="round" />
                {[0, 1, 2, 3, 4].map((j) => { const L = ry * (1.5 + 0.12 * j + 0.1 * rr(`hk${i}${j}`)), w = rx * (0.55 + 0.1 * j); return <path key={j} d={`M${cx - 2},${b.y + 4} C${cx - w * 1.6},${b.y + L * 0.5} ${cx - w},${b.y + L * 1.05} ${cx + (j - 2) * 2},${b.y + L} C${cx + w},${b.y + L * 1.05} ${cx + w * 1.6},${b.y + L * 0.5} ${cx + 2},${b.y + 4}`} fill="none" stroke={j % 2 ? mix(BP.halat, BP.kenar, 0.3) : BP.halat} strokeWidth={0.022 * s} />; })}
                <path d={`M${cx + 3},${b.y + 6} Q${cx + rx * 0.6},${b.y + ry * 1.4} ${cx + rx * 0.3},${b.y + ry * 2.3}`} fill="none" stroke={BP.halat} strokeWidth={0.024 * s} />
                <path d={`M${cx - 5},${b.y + 2} L${cx + 5},${b.y + 10} M${cx + 5},${b.y + 2} L${cx - 5},${b.y + 10}`} stroke={mix(BP.halat, BP.kontur, 0.4)} strokeWidth={0.03 * s} />
              </g>; })}
          </g>; })()}
        {/* atmosfer: güverte üstü ince tuz/toz (rüzgâr sola) */}
        {Array.from({ length: 30 }).map((_, i) => { const x = ((rr(`kz${i}`) * 1200 + t * ruz * (10 + rr(`kzv${i}`) * 8)) % 1200 + 1200) % 1200 - 60, y = 900 + rr(`kzy${i}`) * 900 + Math.sin(t + i) * 4; return <circle key={i} cx={x} cy={y} r={1.2 + rr(`kzr${i}`) * 1.3} fill="#efe0cc" opacity={0.3} />; })}
      </Isleme></RenkKaydi>
    </svg>
  );
};

// ===================================================================================================
// P10a · saygi (kilitli; ön plan kalkanlı top + dal, plato üstünde 5 dimdik siluet, limanda batık)
// ===================================================================================================
// Ön plan kamerası: P01 noktası, göz deniz +50, 133 mm (F 3990), ufuk y 725 (lens kaydırma). Arka plan: K1 plakaları ×0.711 (F 8000) tiyatro
// (lint katman_odak_farki) → batık su hattı y 925, x ≈ 291–768.
const SY = 725;
type SiluetTip = { ad: string; x: number; boy: number; bas: "kabalak-subay" | "kabalak-er" | "kasket"; ek: "durbun" | "tufek" | "battaniye" | "matara" | "yok"; egik?: number };
const SILUETLER: SiluetTip[] = [
  { ad: "teğmen", x: 846, boy: 88, bas: "kabalak-subay", ek: "durbun" },
  { ad: "E1", x: 884, boy: 84, bas: "kabalak-er", ek: "tufek" },
  { ad: "E2", x: 932, boy: 86, bas: "kabalak-er", ek: "battaniye" },
  { ad: "E3", x: 963, boy: 83, bas: "kabalak-er", ek: "matara", egik: 1.5 },
  { ad: "E4", x: 994, boy: 86, bas: "kasket", ek: "yok" },
];
const platoY = (x: number) => 728 - (x - 812) * 0.085 + Math.sin(x * 0.05) * 2;
// küçük siluet (profil, sola = batığa bakar). B = ayak–tepe px. Işık sağda (h 6°) → sırt kenarında 2–3 px sıcak çizgi.
const Siluet: React.FC<{ s: SiluetTip; y: number }> = ({ s, y }) => {
  const B = s.boy, x = s.x, c = "#2e2a42", cK = "#3a3552", cD = "#46405e", kn = BP.kenar;
  const u = (a: number, b: number): P2 => [x + a * B, y - b * B];
  const govde: P2[] = [u(0.02, 0.855), u(0.07, 0.8), u(0.075, 0.62), u(0.068, 0.53), u(0.085, 0.37), u(-0.075, 0.37), u(-0.062, 0.53), u(-0.072, 0.68), u(-0.05, 0.8), u(-0.02, 0.855)];
  const bacak: P2[] = [u(-0.058, 0.38), u(0.062, 0.38), u(0.05, 0.25), u(0.04, 0.05), u(-0.035, 0.05), u(-0.045, 0.25)];
  const kafa = u(-0.006, 0.905);
  const bas = s.bas === "kasket"
    ? <g><path d={`M${pts([u(-0.05, 0.94), u(-0.046, 0.985), u(0.05, 0.99), u(0.058, 0.935)])} Z`} fill={cD} /><path d={`M${pts([u(-0.05, 0.94), u(-0.095, 0.932), u(-0.05, 0.952)])} Z`} fill={cD} /></g>
    : <g><path d={`M${u(-0.058, 0.93)[0]},${u(-0.058, 0.93)[1]} C${u(-0.07, 1.0)[0]},${u(-0.07, 1.0)[1]} ${u(0.07, s.bas === "kabalak-subay" ? 1.035 : 1.02)[0]},${u(0.07, s.bas === "kabalak-subay" ? 1.035 : 1.02)[1]} ${u(0.062, 0.925)[0]},${u(0.062, 0.925)[1]} Z`} fill={cD} />
      {[0.95, 0.975].map((b, i) => <line key={i} x1={u(-0.055, b - 0.012)[0]} y1={u(-0.055, b - 0.012)[1]} x2={u(0.055, b + (s.bas === "kabalak-er" ? 0.008 : 0))[0]} y2={u(0.055, b + (s.bas === "kabalak-er" ? 0.008 : 0))[1]} stroke={mix(cD, kn, 0.35)} strokeWidth={1.1} />)}</g>;
  const ek = s.ek === "tufek" ? <g><line x1={u(0.06, 0.42)[0]} y1={u(0.06, 0.42)[1]} x2={u(0.11, 1.02)[0]} y2={u(0.11, 1.02)[1]} stroke={c} strokeWidth={2.6} /><line x1={u(0.07, 0.79)[0]} y1={u(0.07, 0.79)[1]} x2={u(-0.04, 0.55)[0]} y2={u(-0.04, 0.55)[1]} stroke={cD} strokeWidth={1.4} /></g>
    : s.ek === "battaniye" ? <path d={`M${pts([u(-0.04, 0.82), u(0.02, 0.84), u(0.075, 0.55), u(0.04, 0.53)])} Z`} fill={mix(cK, kn, 0.18)} />
    : s.ek === "matara" ? <ellipse cx={u(0.06, 0.47)[0]} cy={u(0.06, 0.47)[1]} rx={0.03 * B} ry={0.045 * B} fill={cD} />
    : s.ek === "durbun" ? <g><rect x={u(-0.07, 0.6)[0]} y={u(-0.07, 0.6)[1]} width={0.045 * B} height={0.06 * B} fill={cD} /><line x1={u(0.04, 0.8)[0]} y1={u(0.04, 0.8)[1]} x2={u(-0.05, 0.58)[0]} y2={u(-0.05, 0.58)[1]} stroke={cD} strokeWidth={1.2} /></g> : null;
  return (
    <g transform={s.egik ? `rotate(${-s.egik} ${x} ${y})` : undefined}>
      {/* uzun gölge (güneş sağda, alçak) → sola, plato boyunca; ayak temas gölgesi */}
      <path d={`M${x + 0.04 * B},${y + 1} L${x - 0.85 * B},${y + 1 + 0.07 * B} L${x - 0.85 * B},${y + 1 + 0.1 * B} L${x - 0.04 * B},${y + 3} Z`} fill="#2a2638" opacity={0.5} />
      <ellipse cx={x} cy={y + 1} rx={0.09 * B} ry={2} fill="#221e30" />
      <path d={`M${pts(bacak)} Z`} fill={c} />
      {[0.2, 0.14, 0.08].map((b, i) => <line key={i} x1={u(-0.042, b)[0]} y1={u(-0.042, b)[1]} x2={u(0.045, b + 0.02)[0]} y2={u(0.045, b + 0.02)[1]} stroke={mix(c, kn, 0.18)} strokeWidth={1} />)}
      <path d={`M${pts([u(0.042, 0), u(-0.085, 0), u(-0.088, 0.03), u(-0.03, 0.055), u(0.042, 0.05)])} Z`} fill="#26223a" />
      <path d={`M${pts(govde)} Z`} fill={cK} />
      <line x1={u(-0.065, 0.53)[0]} y1={u(-0.065, 0.53)[1]} x2={u(0.07, 0.535)[0]} y2={u(0.07, 0.535)[1]} stroke={c} strokeWidth={Math.max(1.6, 0.025 * B)} />
      {ek}
      {/* kol: omuz başlığı gövde siluetinin içinde, dirsekte hafif kırık, el kalçada yanda */}
      <path d={`M${pts([u(-0.035, 0.8), u(0.035, 0.8), u(0.03, 0.62), u(0.012, 0.47), u(-0.02, 0.45), u(-0.03, 0.62)])} Z`} fill={c} />
      <ellipse cx={u(-0.004, 0.445)[0]} cy={u(-0.004, 0.445)[1]} rx={0.022 * B} ry={0.026 * B} fill={c} />
      {/* baş: profil (burun–çene), boyun */}
      <path d={`M${pts([u(-0.02, 0.86), u(0.02, 0.86), u(0.025, 0.885), u(-0.015, 0.89)])} Z`} fill={c} />
      <ellipse cx={kafa[0]} cy={kafa[1]} rx={0.05 * B} ry={0.058 * B} fill={c} />
      <path d={`M${pts([u(-0.05, 0.915), u(-0.068, 0.9), u(-0.05, 0.89), u(-0.044, 0.87), u(-0.02, 0.858)])}`} fill={c} stroke={c} strokeWidth={1} />
      {bas}
      {/* kenar ışığı: sırt hattı (baş arkası, omuz, sırt, etek, arka bacak) */}
      <polyline points={pts([u(0.045, 0.94), u(0.05, 0.9), u(0.03, 0.86), u(0.07, 0.8), u(0.075, 0.62), u(0.068, 0.53), u(0.085, 0.37)])} fill="none" stroke={kn} strokeWidth={2.4} strokeLinejoin="round" />
      <polyline points={pts([u(0.062, 0.36), u(0.05, 0.25), u(0.04, 0.06)])} fill="none" stroke={kn} strokeWidth={1.8} />
      {s.bas !== "kasket" && <path d={`M${u(0.0, 1.0)[0]},${u(0.0, 1.0)[1]} Q${u(0.06, 0.99)[0]},${u(0.06, 0.99)[1]} ${u(0.062, 0.93)[0]},${u(0.062, 0.93)[1]}`} stroke={kn} strokeWidth={2.2} fill="none" />}
    </g>
  );
};
// kalkanlı sahra topu, arkadan 3/4 (namlu ileri-sağa, limana); Z ≈ 12 m, ~333 px/m. Işık sağ-önden alçak → sağ/üst kenarlar sıcak, arka yüzler gölge.
const AnaTop: React.FC<{ t: number }> = () => {
  const demir = "#4a4762", demirK = "#363350", ahsap = "#5a4638", kn = BP.kenar;
  // teker: jant (kalınlık için sola kaydırılmış koyu ikiz) + 12 ispit + göbek; yakın teker sağ kenarı ışıkta
  const teker = (cx: number, cy: number, rx: number, ry: number, yakin: boolean) => <g>
    <ellipse cx={cx - (yakin ? 12 : 9)} cy={cy} rx={rx} ry={ry} fill="none" stroke="#2a2232" strokeWidth={yakin ? 18 : 14} />
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={BP.kontur} strokeWidth={yakin ? 20 : 16} />
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={yakin ? "#57463c" : "#463832"} strokeWidth={yakin ? 13 : 10} />
    {Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * Math.PI * 2; return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * rx * 0.93} y2={cy + Math.sin(a) * ry * 0.93} stroke={ahsap} strokeWidth={yakin ? 8 : 6} />; })}
    <ellipse cx={cx - 4} cy={cy} rx={rx * 0.22} ry={ry * 0.17} fill={demirK} stroke={BP.kontur} strokeWidth={3} />
    {yakin && <path d={`M${cx + rx * 0.2},${cy - ry * 0.98} A${rx},${ry} 0 0 1 ${cx + rx},${cy + ry * 0.1}`} stroke={kn} strokeWidth={5} fill="none" />}
  </g>;
  const kalkan: P2[] = [[150, 1036], [196, 1004], [272, 998], [272, 1030], [330, 1026], [330, 992], [404, 986], [444, 1012], [450, 1238], [146, 1226]];
  return (
    <g strokeLinejoin="round">
      {/* uzun gölge: güneş sağ-ön alçak → gölge sol-arkaya (kameraya, sola) uzar */}
      <path d={`M${pts([[140, 1300], [470, 1330], [330, 1600], [-60, 1760], [-60, 1520]])} Z`} fill="#2a2440" opacity={0.45} />
      {/* namlu (kalkanın ötesi): çentikten ileri-sağa, limana doğru; üst kenar ışıkta */}
      <path d={`M${pts([[300, 1028], [556, 994], [558, 1016], [300, 1058]])} Z`} fill={demir} stroke={BP.kontur} strokeWidth={3} />
      <line x1={302} y1={1029} x2={554} y2={995} stroke={kn} strokeWidth={4} />
      <path d="M552,991 L568,989 L570,1018 L554,1020 Z" fill={demirK} stroke={BP.kontur} strokeWidth={3} />
      {teker(165, 1170, 70, 128, false)}
      {/* kalkan: eğik omuzlu çelik levha, ortada namlu çentiği, nişan penceresi; arka yüz gölgede, kalınlık kenarı ve üst kenar ışıkta */}
      <path d={`M${pts(kalkan)} Z`} fill="#3e3b56" stroke={BP.kontur} strokeWidth={4} />
      <path d={`M${pts([[444, 1012], [456, 1016], [462, 1240], [450, 1238]])} Z`} fill={mix("#3e3b56", kn, 0.55)} stroke={BP.kontur} strokeWidth={2} />
      <polyline points={pts(kalkan.slice(0, 8))} stroke={kn} strokeWidth={4.5} fill="none" />
      <rect x={198} y={1062} width={34} height={13} fill="#1e1a2e" />
      {[[176, 1060], [418, 1040], [172, 1206], [432, 1214], [300, 1218]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={4} fill={demirK} />)}
      <Tara d={`M${pts(kalkan)} Z`} aci={105} aralik={9} kalin={2} renk="#2a2640" alfa={0.3} kutu={[146, 986, 450, 1238]} />
      {/* kama + beşik (kalkanın berisi, kameraya) + yükseliş volanı */}
      <path d={`M${pts([[262, 1062], [334, 1054], [326, 1114], [258, 1120]])} Z`} fill={demir} stroke={BP.kontur} strokeWidth={3} />
      <line x1={262} y1={1062} x2={334} y2={1054} stroke={kn} strokeWidth={3} />
      <ellipse cx={244} cy={1134} rx={11} ry={16} fill="none" stroke={demirK} strokeWidth={5} />
      <line x1={165} y1={1170} x2={430} y2={1196} stroke={demirK} strokeWidth={14} />
      {/* kundak (kutu kesit) kameraya, sola-aşağı; uç küreği toprağa gömülü */}
      <path d={`M${pts([[262, 1150], [332, 1158], [156, 1432], [92, 1420]])} Z`} fill={demir} stroke={BP.kontur} strokeWidth={4} />
      <path d={`M${pts([[332, 1158], [344, 1166], [170, 1440], [156, 1432]])} Z`} fill={mix(demir, kn, 0.45)} stroke={BP.kontur} strokeWidth={2} />
      <path d={`M${pts([[84, 1414], [162, 1428], [152, 1462], [80, 1452]])} Z`} fill={demirK} stroke={BP.kontur} strokeWidth={3} />
      <ellipse cx={120} cy={1460} rx={60} ry={9} fill="#221e30" opacity={0.75} />
      <line x1={196} y1={1350} x2={146} y2={1342} stroke={demirK} strokeWidth={8} strokeLinecap="round" />
      <ellipse cx={168} cy={1296} rx={50} ry={8} fill="#221e30" opacity={0.75} />
      <ellipse cx={432} cy={1331} rx={58} ry={9} fill="#221e30" opacity={0.8} />
      {teker(432, 1196, 78, 136, true)}
    </g>
  );
};
// ikinci top (plato, Z ≈ 75): küçük; namlu sola-ileri
const KucukTop: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    <path d={`M${x + 30},${y + 1} L${x - 40},${y + 6} L${x - 40},${y + 8} L${x + 26},${y + 3} Z`} fill="#2a2638" opacity={0.5} />
    <line x1={x - 2} y1={y - 22} x2={x - 40} y2={y - 27} stroke="#2c283e" strokeWidth={4} />
    <path d={`M${pts([[x - 12, y - 36], [x + 14, y - 38], [x + 16, y - 10], [x - 12, y - 8]])} Z`} fill="#34304a" />
    <ellipse cx={x + 6} cy={y - 10} rx={6} ry={10} fill="none" stroke="#2c283e" strokeWidth={3} />
    <line x1={x + 10} y1={y - 12} x2={x + 34} y2={y} stroke="#2c283e" strokeWidth={4} />
    <polyline points={pts([[x + 14, y - 38], [x + 16, y - 10]])} stroke={BP.kenar} strokeWidth={2} fill="none" />
    <path d={`M${x + 9},${y - 20} A6,10 0 0 1 ${x + 12},${y - 4}`} stroke={BP.kenar} strokeWidth={1.6} fill="none" />
  </g>
);
const MakiKume: React.FC<{ x: number; y: number; r: number; n: number; seed: string }> = ({ x, y, r, n, seed }) => (
  <g>{Array.from({ length: n }).map((_, j) => { const cx = x + (j - n / 2) * r * 1.1 + rr(`${seed}j${j}`) * r * 0.5, cy = y - rr(`${seed}h${j}`) * r * 0.6, q = r * (0.7 + 0.5 * rr(`${seed}q${j}`));
    return <g key={j}><ellipse cx={cx - q * 0.3} cy={cy + q * 0.2} rx={q * 1.05} ry={q * 0.75} fill="#2e2a44" opacity={0.55} /><ellipse cx={cx} cy={cy} rx={q} ry={q * 0.78} fill="#4c5240" stroke={BP.kontur} strokeWidth={1.6} />
      <path d={`M${cx - q * 0.2},${cy - q * 0.76} A${q},${q * 0.78} 0 0 1 ${cx + q * 0.85},${cy - q * 0.15}`} stroke={BP.kenar} strokeWidth={2.2} fill="none" /></g>; })}</g>
);
// mahmuz yüz fasetleri (karşı ışık: hepsi gölgede, değer farkıyla hacim) ve yakın zemin fasetleri (alçak güneş: üst kenarlar sıcak)
const MAHMUZ_FAS: [P2[], string][] = [
  [[[786, 1040], [812, 730], [900, 722], [872, 880], [826, 1060]], "#6e6684"],
  [[[900, 722], [1100, 700], [1100, 860], [1000, 930], [872, 880]], "#6e5a72"],
  [[[826, 1060], [872, 880], [1000, 930], [960, 1120], [860, 1180]], "#5a526e"],
  [[[1000, 930], [1100, 860], [1100, 1300], [940, 1300], [960, 1120]], "#524b68"],
  [[[770, 1300], [786, 1040], [826, 1060], [860, 1180], [960, 1120], [940, 1300]], "#4a445e"],
];
// yakın zemin: uçurum kenarına yakın fasetler alçak güneşle açık, kameraya doğru koyulaşır (K1 ön kaya değerleri)
const ZEMIN_FAS: [P2[], string][] = [
  [[[-20, 1330], [300, 1312], [420, 1400], [180, 1470], [-20, 1450]], "#b0927e"],
  [[[420, 1322], [760, 1300], [800, 1420], [560, 1470], [420, 1400]], "#b89a86"],
  [[[760, 1310], [1100, 1306], [1100, 1440], [900, 1470], [800, 1420]], "#a68c80"],
  [[[-20, 1450], [180, 1470], [420, 1400], [560, 1470], [480, 1620], [200, 1640], [-20, 1620]], "#7a6680"],
  [[[560, 1470], [800, 1420], [900, 1470], [1100, 1440], [1100, 1640], [820, 1660], [480, 1620]], "#5e5578"],
  [[[-20, 1620], [200, 1640], [480, 1620], [820, 1660], [1100, 1640], [1100, 1960], [-20, 1960]], "#463f64"],
];
const Saygi: React.FC<{ plan: Plan; p: number; kilit: Kilit }> = ({ plan, p, kilit }) => {
  const t = p / 60, h = param<number>(plan, "gun_yuksekligi", 6), seed = param<number>(plan, "seed", 181), ruz = ruzgar(190);
  const kArka = kam([0, 50, 0], 8000, [540, SY]);
  const tr = () => `translate(540 ${SY}) scale(${8000 / 11250}) translate(-540 -758)`;
  const V = denizSatir("sy", 8000, 50, 560, 2000, (u) => (u < -0.4 ? 0.05 : u < 0.2 ? 0.2 : 0.6));
  const pxm = 11250 / 2000, wlK1 = 1040; // K1 ref gemi (Z 2000)
  const plato: P2[] = []; for (let x = 812; x <= 1100; x += 10) plato.push([x, platoY(x)]);
  const kenarCizgi: P2[] = [...kirik([-20, 1296], [300, 1304], 8, 5, "sk1"), ...kirik([300, 1304], [700, 1290], 9, 6, "sk2"), ...kirik([700, 1290], [1100, 1300], 8, 5, "sk3")];
  const mahmuz: P2[] = [[770, 1300], ...kirik([770, 1300], [786, 1040], 7, 6, "sm1"), ...kirik([786, 1040], [812, platoY(812)], 6, 5, "sm2"), ...plato, [1100, 1300]];
  kilit.push({ ad: "kalkanlı top", p: [300, 1120], tur: "kurulum" }, { ad: "teğmen", p: [SILUETLER[0].x, platoY(SILUETLER[0].x)], tur: "ayak" }, { ad: "batık", p: [530, 900], tur: "kurulum" });
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <RenkKaydi><Isleme aci={105}>
        <Gok sinir={[140, 280, 390, 530]} renk={gokSutun(h)} seed={seed} hale={[1150, 640]} haleR={1.35} sicak={0.15} t={t}
          bulut={[[-60, 520, 300, 30, "y1"], [420, 1140, 440, 26, "y2"], [640, 1080, 560, 14, "y3"], [-80, 280, 650, 12, "y4"]]} />
        <MeisArka tr={tr} t={t} seed={seed} bugu={0.1} />
        {/* batık (K1 gemi konumu; Z 2000): kıçtan oturmuş, sancağa yatık (bacalar eğik), hangar yanıp çökmüş; duman/ateş yok */}
        <g transform={tr()}>
          <g transform={`translate(190 ${wlK1 + 2})`} opacity={0.7}><GemiYansima pxm={pxm} seed={seed} boy={0.45} /></g>
          <defs><clipPath id="syBatik"><rect x={-400} y={-1200} width={2200} height={wlK1 + 1200} /></clipPath></defs>
          <g clipPath="url(#syBatik)"><g transform={`translate(190 ${wlK1}) rotate(2.4) skewX(-13) translate(0 ${3.2 * pxm * GEMI.abarti})`}>
            <KonturTitreme derinlik="uzak" seed={seed + 2} olcek={0.8}><GemiProfil pxm={pxm} durum="batik" seed={seed} /></KonturTitreme></g></g>
          {/* su hattı: gövdeyi kesen ince köpük + halka dalgacıklar */}
          {[0, 1, 2].map((i) => <path key={i} d={`M${190 + 20 - i * 14},${wlK1 + 2 + i * 5} L${190 + 118.9 * pxm + 6 + i * 16},${wlK1 + 2 + i * 5}`} stroke={i ? BP.suYol : BP.kopuk} strokeWidth={i ? 2 : 3} opacity={i ? 0.6 : 0.9} />)}
        </g>
        {/* deniz: tiyatro kamerasıyla (F 8000) Z 560–2000 satırları */}
        <rect x={-10} y={SY + (50 * 8000) / 2000 + 14} width={1100} height={1400} fill={mix(BP.su, BP.bugu, 0.1)} />
        <DenizCiz V={V} k={kArka} t={t} isik={"#eac3a2"} golge={BP.suGolge} ymin={SY + 216} />
        {/* plato mahmuzu (Z 60–80, sağ): güneşe karşı → yüzler gölgede (fasetli), sırt kenar ışığında; siluetler gökyüzüne karşı */}
        <path d={`M${pts(mahmuz)} Z`} fill="#4e4864" stroke={BP.kontur} strokeWidth={2.5} />
        {MAHMUZ_FAS.map(([q, c], i) => <path key={`mf${i}`} d={`M${pts(q)} Z`} fill={c} stroke={BP.kontur} strokeWidth={1.6} />)}
        <Tara d={`M${pts(MAHMUZ_FAS[2][0])} Z`} aci={105} aralik={9} kalin={2} renk="#2e2a44" alfa={0.35} kutu={[760, 900, 1100, 1310]} />
        {[[44, 1110, 150], [150, 1150, 120], [210, 1190, 130]].map(([dx, y, L], i) => <g key={`mk${i}`}><path d={`M${790 + dx - 8},${y} Q${790 + dx - 12},${y + L * 0.5} ${790 + dx + 2},${y + L} Q${790 + dx + 3},${y + L * 0.5} ${790 + dx + 9},${y} Z`} fill="#2e2a44" /><path d={`M${790 + dx + 9},${y} Q${790 + dx + 4},${y + L * 0.5} ${790 + dx + 3},${y + L}`} stroke={BP.kenar} strokeWidth={2} fill="none" opacity={0.7} /></g>)}
        {[[870, 760, 20, 4], [1040, 742, 18, 3], [930, 990, 22, 4], [1060, 1150, 24, 3]].map(([x, y, r, n], i) => <MakiKume key={i} x={x} y={y} r={r} n={n} seed={`pm${i}`} />)}
        <polyline points={pts(mahmuz.slice(1, mahmuz.length - 2))} fill="none" stroke={BP.kenar} strokeWidth={3.5} />
        <polyline points={pts(plato)} fill="none" stroke="#f0cfa6" strokeWidth={4} />
        {SILUETLER.map((s) => <Siluet key={s.ad} s={s} y={platoY(s.x)} />)}
        <KucukTop x={1046} y={platoY(1046)} />
        {/* yakın kayalık (Z 10–16): uçurum kenarı y ≈ 1296 (tüm genişlik); K1 ön kayası dili — fasetler, üstler sıcak, karren olukları yumuşak */}
        <path d={`M${pts(kenarCizgi)} L1100,1960 L-20,1960 Z`} fill="#5a5276" stroke={BP.kontur} strokeWidth={2.5} />
        {ZEMIN_FAS.map(([q, c], i) => <path key={`zf${i}`} d={`M${pts(q)} Z`} fill={c} stroke={BP.kontur} strokeWidth={2} />)}
        {ZEMIN_FAS.map(([q], i) => <polyline key={`zk${i}`} points={pts(q.slice(0, 2))} fill="none" stroke={i % 2 ? BP.tasIsik : mix(BP.tasIsik, BP.kenar, 0.5)} strokeWidth={5} />)}
        <polyline points={pts(kenarCizgi)} fill="none" stroke={BP.kenar} strokeWidth={4} />
        {[[60, 1480, 70], [560, 1490, 60], [300, 1660, 90], [860, 1500, 70], [980, 1680, 110], [700, 1700, 90], [140, 1720, 120]].map(([x, y, L], i) => <g key={`kr${i}`}><path d={`M${x - 7},${y} Q${x - 10},${y + L * 0.5} ${x + 2},${y + L} Q${x + 3},${y + L * 0.5} ${x + 8},${y} Z`} fill="#2e2a44" opacity={0.8} /><path d={`M${x + 8},${y} Q${x + 4},${y + L * 0.5} ${x + 3},${y + L}`} stroke={BP.kenar} strokeWidth={2} fill="none" opacity={0.75} /></g>)}
        {[[600, 1560], [900, 1380], [380, 1780]].map(([x, y], i) => <path key={`ct${i}`} d={`M${pts([[x - 40, y], [x + 46, y - 6], [x + 60, y + 14], [x - 30, y + 18]])} Z`} fill={BP.toprak} opacity={0.8} />)}
        {/* kalkanlı top (Z 12) */}
        <AnaTop t={t} />
        {/* ot sapları (rüzgâr sağa, çok hafif) */}
        {[[40, 1300], [520, 1296], [610, 1294], [700, 1292], [960, 1298], [60, 1600], [700, 1560], [330, 1880], [900, 1880], [520, 1700], [180, 1480], [880, 1470]].map(([x, y], i) => <Ot key={i} x={x} y={y} L={40 + rr(`syo${i}`) * 30} ruz={ruz} t={t} seed={`syo${i}`} n={6} w={3} />)}
        {/* dal (Z 3, flu): sol-üst köşeden sarkan kesik çam dalı + alt kenarda yaprak */}
        <Flu s={6}><Dal a={[-40, 120]} b={[300, 330]} k={1.8} seed="syd1" /><Dal a={[-40, 260]} b={[180, 520]} k={1.5} seed="syd2" /><Dal a={[1120, 1960]} b={[820, 1780]} k={1.8} seed="syd3" /></Flu>
        {/* atmosfer: tuz zerresi (ışık tarafında, yavaş sağa) */}
        {Array.from({ length: 34 }).map((_, i) => { const x = 420 + ((rr(`yz${i}`) * 680 + t * (5 + rr(`yzv${i}`) * 6)) % 680), y = 520 + rr(`yzy${i}`) * 700 + Math.sin(t + i) * 3; return <circle key={i} cx={x} cy={y} r={1.1 + rr(`yzr${i}`) * 1.2} fill="#f2dcc4" opacity={0.32} />; })}
      </Isleme></RenkKaydi>
    </svg>
  );
};

export const LimanYeniSahne: React.FC<{ g: string; plan: Plan; p: number; kilit: Kilit }> = ({ g, plan, p, kilit }) =>
  g === "gemi-orta" ? <GemiOrta plan={plan} p={p} kilit={kilit} /> : g === "karsi-kiyi" ? <KarsiKiyi plan={plan} p={p} kilit={kilit} /> : <Saygi plan={plan} p={p} kilit={kilit} />;
