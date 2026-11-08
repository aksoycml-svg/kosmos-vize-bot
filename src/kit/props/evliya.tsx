// ===== Evliya prop'ları (tasarim.md v1.2 §2, §4) — SARAYBURNU şablonu çizer =====
// KE-P1 fişek demeti (İMZA: tüp yüzü #c4a874; başka hiçbir nesnede ±ΔE76 15 içinde ton yok) · KE-P7 meşale · KE-P2 kanat · KE-P4 başlık (takke).
// Ölçüler METRE; çizim px/m ile. Kanat kukla yerel biriminde (Kukla arka/arkaUst/on yuvaları) çizilir: gövdeyle döner.
import React from "react";
import { ink, karistir, P, poly, rnd } from "../../doku/sabitler";
import { Tarama } from "../../doku/Tarama";
import { KuklaSapka, Palet, yumusakYol } from "../../rig/Kukla";

// ---------------- KE-P1 FİŞEK DEMETİ ----------------
// Orijin = zemin teması (kızak altı ortası). Tüp gövdesi 1.00 m × 0.36 m (5 görünür silindir: önde 3, arkada aralardan 2; 7 sayılabilir öğe YOK),
// 3 sicim bağı (alt/orta/üst, 3'er tur), oturak 0.42 × 0.05 m, ayak dayama (oturak üstünden 0.33 m aşağı, iki yana 0.18 m taşar),
// kızak 0.50 × 0.08 m (iki yan ray; ağızlar aradan aşağı açılır). Metal, perçin, yazı, sargı çizgisi YOK (düz mat silindir).
export const DEMET_M = {
  tupH: 1.0, tupD: 0.11, kizakW: 0.5, kizakH: 0.08, oturakW: 0.42, oturakH: 0.05, dayamaAlti: 0.333, dayamaYari: 0.36, dayamaKalin: 0.035,
  bag: [0.25, 0.58, 0.92], onX: [-0.12, 0, 0.12], arkaX: [-0.06, 0.06],
};
export const DEMET_RENK = { tup: "#c4a874", tupGolge: "#8e7650", tupBos: "#a8905e", sicim: "#3a2e22", agiz: "#2a2420", ahsap: "#6a4a30", ahsapGolge: "#3a2a1e" };
const oturakUstM = DEMET_M.kizakH + DEMET_M.tupH + DEMET_M.oturakH; // 1.13 m

export type DemetDurum = { x: number; y: number; pxm: number; aci: number; titreme: number; bos: number; p: number };
// demet yerel metresinden (x sağ, y yukarı) dünya px: titreme (±3 px, 12 Hz) + dönüş (ağırlık merkezi 0.55 m)
export const demetNokta = (d: DemetDurum, mx: number, my: number): P => {
  const tx = d.titreme * 3 * Math.sin((2 * Math.PI * 12 * d.p) / 60);
  const cy = 0.55, a = (d.aci * Math.PI) / 180;
  const lx = mx * d.pxm, ly = -(my - cy) * d.pxm;
  return [d.x + tx + lx * Math.cos(a) - ly * Math.sin(a), d.y - cy * d.pxm + lx * Math.sin(a) + ly * Math.cos(a)];
};
export const demetOturak = (d: DemetDurum) => demetNokta(d, 0, oturakUstM);
export const demetDayama = (d: DemetDurum) => demetNokta(d, 0.25, oturakUstM - DEMET_M.dayamaAlti);
export const demetAgizlar = (d: DemetDurum): P[] => [...DEMET_M.arkaX, ...DEMET_M.onX].map((x) => demetNokta(d, x, DEMET_M.kizakH));
export const demetFitilUcu = (d: DemetDurum) => demetNokta(d, -0.12, 0.05);
// yan tüpün üst sicim bağı (tutun: ön el burayı kavrar) + oturak arka kenarı
// O11: ön el yan tüpün ÜST sicim bağını kavrar (uyluğun altında, tüpün önünde okunur)
export const demetTutamak = (d: DemetDurum) => demetNokta(d, 0.15, DEMET_M.kizakH + DEMET_M.bag[2] * DEMET_M.tupH);
export const demetOturakKenar = (d: DemetDurum) => demetNokta(d, -0.2, oturakUstM);

// isikX: anahtar ışığın dünya x'i (gölge yanı ondan uzak taraf); alttan (|dx| küçük) → iki kenar dar gölge
export const FisekDemet: React.FC<{ d: DemetDurum; isikX: number; seed: number }> = ({ d, isikX, seed }) => {
  const M = DEMET_M, k = d.pxm;
  const tupRenk = karistir(DEMET_RENK.tup, DEMET_RENK.tupBos, d.bos);
  const tx = d.titreme * 3 * Math.sin((2 * Math.PI * 12 * d.p) / 60);
  const merkez = demetNokta(d, 0, 0.55);
  const yan = isikX < merkez[0] - 0.2 * k ? 1 : isikX > merkez[0] + 0.2 * k ? -1 : 0; // gölge yanı: +1 sağ, −1 sol, 0 iki kenar
  const kontur = Math.max(1.5, Math.min(4, k * 0.007));
  // yerel çizim: orijin zemin teması, y yukarı negatif (px), sonra dönüş
  const Y = (m: number) => -m * k, X = (m: number) => m * k;
  const golge = karistir(DEMET_RENK.tupGolge, DEMET_RENK.tupBos, d.bos * 0.5), isikli = karistir("#d8c290", tupRenk, 0.35);
  const tup = (cx: number, ust: number, alt: number, renk: string, i: number) => {
    const x0 = X(cx - M.tupD / 2), w = M.tupD * k, y0 = Y(ust), h = (ust - alt) * k;
    const gw = yan === 0 ? w * 0.24 : w * 0.34;
    const golgeX = yan === 1 ? x0 + w - gw : x0;
    const isikX = yan === 1 ? x0 + w * 0.16 : yan === -1 ? x0 + w * 0.62 : x0 + w * 0.38;
    const golgePts: P[] = [[golgeX, y0], [golgeX + gw, y0], [golgeX + gw, y0 + h], [golgeX, y0 + h]];
    const ry = Math.max(1.5, w * 0.12); // silindir alt ucu (hafif elips)
    return (
      <g key={`t${i}`}>
        <path d={`M ${x0} ${y0} L ${x0 + w} ${y0} L ${x0 + w} ${y0 + h} Q ${x0 + w / 2} ${y0 + h + 2 * ry} ${x0} ${y0 + h} Z`} fill={renk} />
        <rect x={golgeX} y={y0} width={gw} height={h} fill={golge} />
        {yan === 0 && <rect x={x0 + w - gw} y={y0} width={gw} height={h} fill={golge} />}
        <rect x={isikX} y={y0} width={w * 0.14} height={h} fill={isikli} opacity={0.8} />
        {w > 70 && <Tarama sekil={golgePts} basamak="II" aci={yan === 0 ? 60 : 70} renk={ink(DEMET_RENK.tupGolge)} derinlik="yakin" seed={seed + i} />}
        {/* ağız halkası (is) */}
        <path d={`M ${x0} ${y0 + h - 0.035 * k} L ${x0 + w} ${y0 + h - 0.035 * k} L ${x0 + w} ${y0 + h} Q ${x0 + w / 2} ${y0 + h + 2 * ry} ${x0} ${y0 + h} Z`} fill={DEMET_RENK.agiz} />
        <path d={`M ${x0} ${y0} L ${x0 + w} ${y0} L ${x0 + w} ${y0 + h} Q ${x0 + w / 2} ${y0 + h + 2 * ry} ${x0} ${y0 + h} Z`} fill="none" stroke={ink(DEMET_RENK.tup)} strokeWidth={kontur * 1.3} strokeLinejoin="round" />
      </g>
    );
  };
  const ust = M.kizakH + M.tupH, alt = M.kizakH;
  return (
    <g transform={`translate(${d.x + tx},${d.y}) rotate(${d.aci},0,${-0.55 * k})`}>
      {/* arka 2 tüp (aralardan; 0.015 m yukarıda, bir ton koyu) */}
      {M.arkaX.map((cx, i) => tup(cx, ust + 0.015, alt + 0.015, karistir(tupRenk, "#3a2e22", 0.18), 10 + i))}
      {M.onX.map((cx, i) => tup(cx, ust, alt, tupRenk, i))}
      {/* sicim bağları: 3 bağ × 3 tur (silindir üstünde hafif kavisli) */}
      {M.bag.map((b, i) => {
        const yy = Y(alt + b * M.tupH);
        return <g key={`s${i}`}>
          <path d={`M ${X(-0.185)} ${yy - 0.012 * k} Q ${X(0)} ${yy + 0.012 * k} ${X(0.185)} ${yy - 0.012 * k} L ${X(0.185)} ${yy + 0.012 * k} Q ${X(0)} ${yy + 0.036 * k} ${X(-0.185)} ${yy + 0.012 * k} Z`} fill={DEMET_RENK.sicim} />
          <path d={`M ${X(-0.185)} ${yy} Q ${X(0)} ${yy + 0.024 * k} ${X(0.185)} ${yy}`} stroke={karistir(DEMET_RENK.sicim, tupRenk, 0.35)} strokeWidth={Math.max(1, 0.004 * k)} fill="none" />
        </g>;
      })}
      {/* kızak: iki yan ray + arka çapraz (ağızlar aradan açık) */}
      {[-1, 1].map((s) => <rect key={s} x={X(s * M.kizakW / 2 - (s > 0 ? 0.06 : 0))} y={Y(M.kizakH)} width={0.06 * k} height={M.kizakH * k} fill={DEMET_RENK.ahsap} stroke={ink(DEMET_RENK.ahsap)} strokeWidth={kontur} />)}
      <rect x={X(-M.kizakW / 2)} y={Y(M.kizakH)} width={M.kizakW * k} height={0.02 * k} fill={DEMET_RENK.ahsapGolge} />
      {/* oturak tahtası */}
      <rect x={X(-M.oturakW / 2)} y={Y(ust + M.oturakH)} width={M.oturakW * k} height={M.oturakH * k} fill={DEMET_RENK.ahsap} stroke={ink(DEMET_RENK.ahsap)} strokeWidth={kontur} />
      <rect x={X(-M.oturakW / 2)} y={Y(ust + 0.012)} width={M.oturakW * k} height={0.012 * k} fill={DEMET_RENK.ahsapGolge} />
      <line x1={X(-M.oturakW / 2)} y1={Y(ust + M.oturakH) + 1.5} x2={X(M.oturakW / 2)} y2={Y(ust + M.oturakH) + 1.5} stroke="#9a7650" strokeWidth={Math.max(1.5, 0.008 * k)} />
      {/* ayak dayama çubuğu (önde, orta sicimle bağlı) */}
      <rect x={X(-M.dayamaYari)} y={Y(ust + M.oturakH - M.dayamaAlti)} width={2 * M.dayamaYari * k} height={M.dayamaKalin * k} rx={0.01 * k} fill={DEMET_RENK.ahsap} stroke={ink(DEMET_RENK.ahsap)} strokeWidth={kontur} />
    </g>
  );
};

// Fitil: demet ağzından rıhtım üstünde sola gevşek S (x 330–520, zemin y 1330), 3 px, zemine temas gölgeli. yanma 0→1: kıvılcım uçtan demete yürür.
export const fitilNoktalari = (bas: P, son: P): P[] => {
  const n = 6; const pts: P[] = [];
  for (let i = 0; i <= n; i++) { const t = i / n; pts.push([bas[0] + (son[0] - bas[0]) * t, bas[1] + (son[1] - bas[1]) * t + (i > 0 && i < n ? Math.sin(t * Math.PI * 2) * 9 : 0)]); }
  return pts;
};
const yolNokta = (pts: P[], t: number): P => {
  const L: number[] = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const h = t * L[L.length - 1]; let i = 1; while (i < pts.length - 1 && L[i] < h) i++;
  const u = (h - L[i - 1]) / Math.max(1e-6, L[i] - L[i - 1]);
  return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * u, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * u];
};
// tukendi: fitil ağızda biter; rıhtımda yalnız ilk %28'lik kömürleşmiş kısa parça kalır (gerilip demetle uçmaz)
export const Fitil: React.FC<{ pts: P[]; yanma: number; kalin?: number; tukendi?: boolean }> = ({ pts, yanma, kalin = 3, tukendi }) => {
  const kes = Math.max(0, Math.min(1, yanma));
  const n = 40, tum: P[] = Array.from({ length: n + 1 }).map((_, i) => yolNokta(pts, (tukendi ? 0.28 : 1) * (i / n)));
  if (tukendi) return <g><polyline points={poly(tum.map(([x, y]) => [x + 1, y + 2.5] as P))} stroke="#14110d" strokeWidth={kalin + 1} fill="none" opacity={0.4} strokeLinecap="round" /><polyline points={poly(tum)} stroke="#2a2420" strokeWidth={kalin} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="22 5 14 7" /></g>;
  const yanmis = tum.slice(0, Math.round(kes * n) + 1), kalan = tum.slice(Math.round(kes * n));
  return (
    <g>
      <polyline points={poly(tum.map(([x, y]) => [x + 1, y + 2.5] as P))} stroke="#14110d" strokeWidth={kalin + 1} fill="none" opacity={0.45} strokeLinecap="round" />
      {kalan.length > 1 && <polyline points={poly(kalan)} stroke="#6a5a40" strokeWidth={kalin} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
      {yanmis.length > 1 && <polyline points={poly(yanmis)} stroke="#2a2420" strokeWidth={kalin} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
    </g>
  );
};
export const fitilKivilcimNoktasi = (pts: P[], yanma: number) => yolNokta(pts, Math.max(0, Math.min(1, yanma)));

// ---------------- KE-P7 MEŞALE ----------------
// Sopa #4a3424 1.1 m (tutamaktan başa 0.75 m, arkaya 0.35 m), baş katran-is sargı #2e2620, alev 3 dilli, 8 karede bir biçim (seed sabit),
// yukarı + hafif sağa. Işık havuzu / kenar ışığı alevin dünya noktasından (şablon). Duman ince #4a4440 α .4.
export const MESALE_M = { on: 0.8, arka: 0.48, kalin: 0.035, bas: 0.18, alev: 0.26 }; // v1.3 (K1 O9): sap ucundan baş tepesine 1.28 m ≈ 520 px @406 px/m
export const mesaleBas = (tutamak: P, yon: P, pxm: number): P => [tutamak[0] + yon[0] * MESALE_M.on * pxm, tutamak[1] + yon[1] * MESALE_M.on * pxm];
export const mesaleAlev = (tutamak: P, yon: P, pxm: number): P => { const b = mesaleBas(tutamak, yon, pxm); return [b[0] + 0.02 * pxm, b[1] - 0.16 * pxm]; };
export const Mesale: React.FC<{ tutamak: P; yon: P; pxm: number; p: number; seed: number; ten: string; tenKoyu: string }> = ({ tutamak, yon, pxm, p, seed, ten, tenKoyu }) => {
  const k = pxm, b = mesaleBas(tutamak, yon, pxm);
  const a0: P = [tutamak[0] - yon[0] * MESALE_M.arka * k, tutamak[1] - yon[1] * MESALE_M.arka * k];
  const n: P = [-yon[1], yon[0]];
  const sw = Math.max(2, MESALE_M.kalin * k);
  const basBas: P = [b[0] - yon[0] * MESALE_M.bas * k, b[1] - yon[1] * MESALE_M.bas * k];
  // alev: 3 dil, 8 karede bir yeni biçim (sabit seed döngüsü; kaynamaz)
  const faz = Math.floor(p / 8) % 6;
  const H = MESALE_M.alev * k, W = 0.16 * k;
  const dil = (i: number, olc: number) => {
    const h = H * olc * (0.75 + 0.35 * rnd(seed, `h${faz}${i}`)), ox = (i - 1) * W * 0.28, egim = 0.18 * H + rnd(seed, `e${faz}${i}`) * 0.1 * H;
    return `M ${b[0] + ox - W * 0.22} ${b[1]} Q ${b[0] + ox - W * 0.3} ${b[1] - h * 0.5} ${b[0] + ox + egim} ${b[1] - h} Q ${b[0] + ox + W * 0.3} ${b[1] - h * 0.45} ${b[0] + ox + W * 0.22} ${b[1]} Z`;
  };
  const alevYol = [0, 1, 2].map((i) => dil(i, i === 1 ? 1 : 0.72)).join(" ");
  const cekirdek = [1].map((i) => dil(i, 0.45)).join(" ");
  return (
    <g>
      <line x1={a0[0]} y1={a0[1]} x2={basBas[0]} y2={basBas[1]} stroke="#4a3424" strokeWidth={sw} strokeLinecap="round" />
      {/* katran sargısı */}
      <polygon points={poly([[basBas[0] + n[0] * 0.045 * k, basBas[1] + n[1] * 0.045 * k], [b[0] + n[0] * 0.05 * k, b[1] + n[1] * 0.05 * k], [b[0] - n[0] * 0.05 * k, b[1] - n[1] * 0.05 * k], [basBas[0] - n[0] * 0.045 * k, basBas[1] - n[1] * 0.045 * k]])} fill="#2e2620" stroke={ink("#2e2620")} strokeWidth={1.5} />
      {/* ince duman */}
      {[0, 1, 2].map((i) => { const t = ((p * 0.6 + i * 22) % 66) / 66; const cx = b[0] + 0.04 * k + t * 0.18 * k, cy = b[1] - H * (1 + t * 1.2), r = 0.025 * k * (1 + t); return <path key={i} d={`M ${cx - r} ${cy} q ${r * 0.5} ${-r} ${r} 0 q ${r * 0.5} ${r} ${r} 0`} stroke="#4a4440" strokeWidth={Math.max(1.5, r * 0.5)} fill="none" opacity={0.4} />; })}
      <path d={alevYol} fill="#b8622c" />
      <path d={[0, 1, 2].map((i) => dil(i, i === 1 ? 0.8 : 0.55)).join(" ")} fill="#f0a040" />
      <path d={cekirdek} fill="#ffd890" />
      {/* kavrayan parmaklar sopanın önünde (tutulan nesne eli takip eder) */}
      <g transform={`translate(${tutamak[0]},${tutamak[1]}) rotate(${(Math.atan2(yon[1], yon[0]) * 180) / Math.PI})`}>
        <path d={`M ${-0.03 * k} ${-0.035 * k} Q ${0.0} ${-0.05 * k} ${0.03 * k} ${-0.035 * k} L ${0.03 * k} ${0.035 * k} Q 0 ${0.05 * k} ${-0.03 * k} ${0.035 * k} Z`} fill={ten} stroke={tenKoyu} strokeWidth={1.4} />
        {[-0.012, 0.004, 0.02].map((q) => <line key={q} x1={q * k} y1={-0.035 * k} x2={q * k} y2={0.035 * k} stroke={tenKoyu} strokeWidth={1} opacity={0.7} />)}
      </g>
    </g>
  );
};

// ---------------- KE-P2 KANAT (tek siluet, ayrıntısız; Lagâri ve Hezarfen'de aynı çizim) — tasarim v1.3 §4.2 ----------------
// Açık: ön kenar kalın tek eğri; arka kenar TEK sığ sürekli kavis (sehim = boyun %6'sı; oyuk/tırnak/sivri köşe yok); uç yuvarlak,
// "kartal" işareti yalnız uçta 3 kısa ayrık yuvarlak parmak (boyun %10–12'si, aralar dar V, dip yuvarlak). Kök eni 0.24 × açıklık.
// Katlı: başın 0.15H üstünden dize (oturanda oturak hizası); en 150 birim, sırtın 30–40 birim gerisinde; iki kat (ön #6e6a64, arka 1 ton koyu,
// 6–10 birim taşar), 4 birimlik kalınlık şeridi, 2 yumuşak kıvrım, köşeler yuvarlak (r ≥ 12), altta TEK yumuşak çentik.
// Açılma: iki biçim aynı sayıda örnek noktaya yeniden örneklenir ve noktadan noktaya karışır (sprite atlaması yok).
// Tüy, kaburga, kayış, tutamak ÇİZİLMEZ; kök omuz arkasında gizli, eller ön kenarın altında kaybolur. Kukla YEREL birimi (≈306/m).
export const KANAT_M = { aciklik: 3.1, kok: 0.24 };
export type KanatGeo = { kok: P; aci: number; L: number; c: number };
const N_KANAT = 96;
const yenidenOrnekle = (pts: P[], n: number): P[] => {
  const L: number[] = [0]; for (let i = 1; i <= pts.length; i++) { const a = pts[i - 1], b = pts[i % pts.length]; L.push(L[i - 1] + Math.hypot(b[0] - a[0], b[1] - a[1])); }
  const T = L[L.length - 1], out: P[] = []; let k = 1;
  for (let i = 0; i < n; i++) { const h = (i / n) * T; while (k < L.length - 1 && L[k] < h) k++; const a = pts[k - 1], b = pts[k % pts.length], u = (h - L[k - 1]) / Math.max(1e-6, L[k] - L[k - 1]); out.push([a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u]); }
  return out;
};
const kanatEksen = (g: KanatGeo) => {
  const r = (g.aci * Math.PI) / 180, dir: P = [Math.cos(r), Math.sin(r)];
  let nrm: P = [-Math.sin(r), Math.cos(r)]; if (nrm[1] < 0 || (Math.abs(nrm[1]) < 1e-3 && nrm[0] > 0)) nrm = [-nrm[0], -nrm[1]];
  return (u: number, v: number): P => [g.kok[0] + dir[0] * u * g.L + nrm[0] * v * g.c, g.kok[1] + dir[1] * u * g.L + nrm[1] * v * g.c];
};
// açık kanat dış çizgisi (yoğun nokta), (u,v): u boy, v kök eni biriminde (− ön kenar)
export const kanatAcikNoktalar = (g: KanatGeo): P[] => {
  const W = kanatEksen(g), uv: [number, number][] = [];
  for (let i = 0; i <= 20; i++) { const u = (0.86 * i) / 20; uv.push([u, -0.32 - 0.06 * Math.sin((Math.PI * u) / 0.86) + 0.06 * (u / 0.86) ** 2]); }
  // 3 uç parmağı (yuvarlak uçlu), aralarda yuvarlak dipli dar V
  const parmak = (v0: number, v1: number, boy: number) => { for (let i = 0; i <= 8; i++) { const t = (i / 8) * Math.PI; uv.push([0.86 + 0.02 + boy * Math.sin(t) * 0.9 + 0.01, v0 + (v1 - v0) * (1 - Math.cos(t)) / 2]); } };
  parmak(-0.26, -0.11, 0.11); uv.push([0.885, -0.085]);
  parmak(-0.07, 0.07, 0.12); uv.push([0.885, 0.095]);
  parmak(0.11, 0.27, 0.105);
  const sehim = (0.06 * g.L) / Math.max(1, g.c);
  for (let i = 0; i <= 20; i++) { const u = 0.86 * (1 - i / 20); uv.push([u, 0.29 + 0.39 * (1 - u / 0.86) - sehim * Math.sin((Math.PI * u) / 0.86)]); }
  return uv.map(([u, v]) => W(u, v));
};
// katlı kat (yerel mutlak): yuvarlak köşeli, uzun kenarları hafif dışbükey, altta tek yumuşak çentik
export const kanatKatliNoktalar = (cx: number, ust: number, alt: number, en: number): P[] => {
  // katlı kanat: üstte geniş (en 150; kanat bileği yuvarlak çıkıntı, ön kenar tarafı), aşağı doğru düzgün daralır (alt en ≈ %55),
  // uzun kenarlar hafif dışbükey, köşeler yuvarlak, altta TEK yumuşak çentik (uç parmaklarının izi). Tahta/levha değil: konik + asimetrik tepe.
  const pts: P[] = [], w0 = en / 2;
  const yari = (t: number) => w0 * (1 - 0.45 * t) + 5 * Math.sin(Math.PI * t);
  for (let i = 0; i <= 14; i++) { const a = Math.PI + (Math.PI * i) / 14; const sk = i > 9 ? 1.18 : 1; pts.push([cx + Math.cos(a) * w0 * sk, ust + w0 * 0.7 + Math.sin(a) * w0 * 0.7 * (i > 9 ? 1.12 : 1)]); }
  const y0 = ust + w0 * 0.7;
  for (let i = 1; i <= 16; i++) { const t = i / 16; pts.push([cx + yari(t * 0.95), y0 + (alt - 16 - y0) * t]); }
  const wa = yari(1);
  for (let i = 0; i <= 16; i++) { const t = i / 16, x = cx + wa - 2 * wa * t; const centik = 12 * Math.exp(-(((x - (cx + 6)) / 9) ** 2)); pts.push([x, alt - 16 + 16 * Math.sin(Math.PI * t) - centik]); }
  for (let i = 1; i < 16; i++) { const t = 1 - i / 16; pts.push([cx - yari(t * 0.95), y0 + (alt - 16 - y0) * t]); }
  return pts;
};
export const kanatEl = (g: KanatGeo): P => kanatEksen(g)(0.42, -0.12);
// acik 0..1 → iki kanat (yakın + uzak): dış çizgi noktaları + açık geometri (eller için). lean: gövde eğimi
export const kanatGeo = (acik: number, lean: number, birimM: number, katliUst = -606, katliAlt = -110, katliCx = -88) => {
  const L = (KANAT_M.aciklik / 2) * birimM, c = KANAT_M.kok * KANAT_M.aciklik * birimM;
  const t = Math.max(0, Math.min(1, acik));
  const yakinAcik: KanatGeo = { kok: [-10, -330], aci: -5 - lean, L, c };
  const uzakAcik: KanatGeo = { kok: [-20, -370], aci: 192 - lean, L: L * 0.7, c: c * 0.7 };
  const kar2 = (A: P[], B: P[], tt: number) => {
    const a = yenidenOrnekle(A, N_KANAT), b0 = yenidenOrnekle(B, N_KANAT);
    let k = 0, en = Infinity; b0.forEach((q, i) => { const d = Math.hypot(q[0] - a[0][0], q[1] - a[0][1]); if (d < en) { en = d; k = i; } });
    const b = [...b0.slice(k), ...b0.slice(0, k)];
    return a.map((q, i) => [q[0] + (b[i][0] - q[0]) * tt, q[1] + (b[i][1] - q[1]) * tt] as P);
  };
  const onKat = kanatKatliNoktalar(katliCx, katliUst, katliAlt, 150), arkaKat = kanatKatliNoktalar(katliCx - 9, katliUst + 8, katliAlt + 2, 150);
  // açılma: kanat kökten döner + uzar (yarı yolda ≈60° yukarı); katlı panelden çıkış yalnız ilk %35'te nokta karışımıyla (atlama yok)
  const ara = (A: KanatGeo): KanatGeo => { const u = Math.min(1, t / 0.85), e = 1 - (1 - u) ** 2; let da = A.aci - -90; while (da > 180) da -= 360; while (da < -180) da += 360; return { kok: [katliCx + (A.kok[0] - katliCx) * e, katliUst + 0.55 * (katliAlt - katliUst) + (A.kok[1] - (katliUst + 0.55 * (katliAlt - katliUst))) * e], aci: -90 + da * e, L: (katliAlt - katliUst) * 0.75 + (A.L - (katliAlt - katliUst) * 0.75) * e, c: 150 + (A.c - 150) * e }; };
  const w = Math.min(1, t / 0.35);
  return { yakin: t >= 1 ? kanatAcikNoktalar(yakinAcik) : kar2(onKat, kanatAcikNoktalar(ara(yakinAcik)), w), uzak: t >= 1 ? kanatAcikNoktalar(uzakAcik) : kar2(arkaKat, kanatAcikNoktalar(ara(uzakAcik)), w), yakinAcik, uzakAcik, katli: { cx: katliCx, ust: katliUst, alt: katliAlt } };
};
// ton: "isikli" (yakın sıcak ışık: ön kat #6e6a64) · "kontra" (uzak ışık: gece siluet #2a2828). kenar: ışık yanı amber 2 px (ekran)
export const KanatCiz: React.FC<{ pts: P[]; katli: number; ton: "isikli" | "kontra"; kenar: string; olcekEkran: number; uzak?: boolean; kat?: { cx: number; ust: number; alt: number } }> = ({ pts, katli, ton, kenar, olcekEkran, uzak, kat }) => {
  const id = "kn" + React.useId().replace(/:/g, "");
  const d = yumusakYol(pts);
  const isikli = ton === "isikli" || katli > 0.5;
  const dolgu = uzak ? (isikli ? "#4a4642" : "#232222") : isikli ? "#6e6a64" : "#2a2828";
  const px = 1 / Math.max(0.05, olcekEkran);
  return (
    <g>
      <defs><clipPath id={`${id}c`}><path d={d} /></clipPath></defs>
      <path d={d} fill={dolgu} stroke={ink(isikli ? "#6e6a64" : "#4a4642")} strokeWidth={2.5 * px} strokeLinejoin="round" />
      {/* katlıyken: kalınlık şeridi (4 birim, ışık yanında açık) + uzunlamasına 2 yumuşak kıvrım (uçları söner) */}
      {kat && katli > 0.4 && <g clipPath={`url(#${id}c)`} opacity={Math.min(1, (katli - 0.4) / 0.4)}>
        <path d={d} fill="none" stroke={karistir(dolgu, "#c8c0b0", 0.35)} strokeWidth={8} transform={`translate(-4,0)`} />
        {[-26, 22].map((dx) => <line key={dx} x1={kat.cx + dx} y1={kat.ust + 90} x2={kat.cx + dx + 4} y2={kat.alt - 60} stroke={ink(dolgu)} strokeWidth={2.2} strokeLinecap="round" opacity={0.55} strokeDasharray={`0 30 ${Math.max(10, kat.alt - kat.ust - 210)} 1000`} />)}
      </g>}
      {!uzak && katli < 0.5 && <path d={d} fill="none" stroke={kenar} strokeWidth={2 * px} strokeOpacity={0.7} clipPath={`url(#${id}c)`} transform={`translate(0,${-1.5 * px})`} />}
    </g>
  );
};
// Suda kanat (KE-P2s): açık biçim su yüzüne yatık (dikey basık), %40'ı su çizgisinin üstünde, ±4 px dalga, kesik dalga çizgisi üstünden geçer,
// altında amber kenar 2 px. Fade ile kaybolmaz; plan sonuna dek yerinde.
export const SudaKanat: React.FC<{ x: number; y: number; pxm: number; p: number; seed: number; kenar: string }> = ({ x, y, pxm, p, seed, kenar }) => {
  const id = "sk" + React.useId().replace(/:/g, "");
  const L = (KANAT_M.aciklik / 2) * pxm, c = KANAT_M.kok * KANAT_M.aciklik * pxm;
  const sal = 4 * Math.sin(p * 0.11 + seed);
  const pts = kanatAcikNoktalar({ kok: [0, 0], aci: 180, L, c }).map(([px_, py]) => [x + px_ + L * 0.5, y + sal + py * 0.5 - c * 0.08] as P);
  const ys = pts.map((q) => q[1]), ust = Math.min(...ys), alt = Math.max(...ys), suY = ust + (alt - ust) * 0.4;
  return (
    <g>
      <defs><clipPath id={`${id}c`}><rect x={x - 3 * L} y={suY - 4 * L} width={6 * L} height={4 * L} /></clipPath></defs>
      <g clipPath={`url(#${id}c)`}>
        <path d={yumusakYol(pts)} fill="#2a2828" stroke="#6e6a64" strokeWidth={2} />
        <path d={yumusakYol(pts)} fill="none" stroke={kenar} strokeWidth={2} strokeOpacity={0.7} transform="translate(0,1.5)" />
      </g>
      <line x1={x - L * 0.75} y1={suY + 1} x2={x + L * 0.75} y2={suY + 1} stroke="#2c3444" strokeWidth={2.5} strokeDasharray="14 9" />
    </g>
  );
};

// ---------------- KE-P4 BAŞLIK (yardımcı 1'in takkesi) ----------------
// Kukla'daki takke çiziminin aynısı (kopukluk 0 px): yarım kubbe keçe, üstte tek dikiş; ters dönünce iç #2e241c. olcek 1.6 stilize (tasarim §4).
export const Baslik: React.FC<{ x: number; y: number; aci: number; pxm: number; olcek: number; palet: Palet }> = ({ x, y, aci, pxm, olcek, palet }) => {
  const s = (0.18 * pxm * olcek) / 98; // TAKKE_YOL eni ≈ 98 birim = 0.18 m
  const ters = Math.cos((aci * Math.PI) / 180) < 0;
  return (
    <g transform={`translate(${x},${y}) rotate(${aci}) scale(${s})`}>
      <KuklaSapka p={palet} a={aci} />
      {ters && <path d="M -44 8 Q 2 16 48 6 Q 2 2 -44 8 Z" fill="#2e241c" />}
    </g>
  );
};
export { yumusakYol };
