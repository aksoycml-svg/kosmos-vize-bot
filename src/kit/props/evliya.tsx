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

// ---------------- KE-P2 KANAT (tek siluet, ayrıntısız; Lagâri ve Hezarfen'de aynı çizim) — tasarim v1.4 §4.2 ----------------
// Açık: ön kenar kalın tek eğri, profil kökten uca incelir (uç = kök eninin %45'i), arka kenar TEK sığ kavis, uçta 3 kısa sivri-yuvarlak parmak.
// Katlı: ters damla (omuz → diz/oturak hizası), figürün arkasında, gölge tonu #3e3a38 + amber kenar; püskürmede alttan sıcak şerit.
// Açılma: iki biçim aynı sayıda örnek noktaya yeniden örneklenir ve noktadan noktaya karışır (sprite atlaması yok); ton sürekli (Z3).
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
// açık kanat dış çizgisi (yoğun nokta), (u,v): u boy (L), v kök eni (c) biriminde (− ön kenar).
// v1.4 (K1-2 Y7): profil kökten uca SÜREKLİ incelir (uçta kök eninin %45'i); arka kenar tek sığ kavis (sehim = boyun %6'sı);
// uçta 3 kısa sivri-yuvarlak parmak (boy ≤ o noktadaki kanat eninin %25'i), aralarında dar V. Sabit genişlikli bölüm yok.
const KANAT_UC = 0.9;
export const kanatAcikNoktalar = (g: KanatGeo): P[] => {
  const W = kanatEksen(g), uv: [number, number][] = [];
  const sehim = (0.06 * g.L) / Math.max(1, g.c);
  const vOn = (u: number) => -0.32 - 0.05 * Math.sin((Math.PI * u) / KANAT_UC);
  const en = (u: number) => 1 - 0.55 * (u / KANAT_UC);
  // kök: gövde arkasında gizli kalsın diye arka kenar kökte yuvarlanır (kök kirişi 0.45c'den başlar, u 0.26'da tam profile ulaşır) — "pelerin" okunmaz
  const kok = (u: number) => 0.45 + 0.55 * Math.sin((Math.PI / 2) * Math.min(1, u / 0.26));
  const vArka = (u: number) => vOn(u) + en(u) * kok(u) - sehim * Math.sin((Math.PI * u) / KANAT_UC);
  for (let i = 0; i <= 24; i++) { const u = (KANAT_UC * i) / 24; uv.push([u, vOn(u)]); }
  const a = vOn(KANAT_UC), b = vArka(KANAT_UC), uE = (b - a) * g.c; // uç eni (yerel birim)
  const gap = (b - a) * 0.05;
  const parmak = (v0: number, v1: number, oran: number) => {
    const boy = (oran * uE) / g.L; // u biriminde (≤ %25 uç eni)
    for (let i = 0; i <= 10; i++) { const t = (i / 10) * Math.PI; uv.push([KANAT_UC + boy * Math.sin(t) ** 2.2, v0 + (v1 - v0) * (1 - Math.cos(t)) / 2]); }
  };
  const d = (b - a) / 3;
  parmak(a, a + d - gap, 0.16); uv.push([KANAT_UC - 0.006, a + d]);
  parmak(a + d + gap, a + 2 * d - gap, 0.18); uv.push([KANAT_UC - 0.006, a + 2 * d]);
  parmak(a + 2 * d + gap, b, 0.12);
  for (let i = 0; i <= 24; i++) { const u = KANAT_UC * (1 - i / 24); uv.push([u, vArka(u)]); }
  return uv.map(([u, v]) => W(u, v));
};
// v1.4 (K1-2 Y8) katlı kanat: katlanmış kuş kanadı silueti, TERS DAMLA. Üst kenar omuz çizgisini izler (omzun ≤ 15 birim üstü,
// yuvarlak tepe yok, başın üstüne çıkmaz); en geniş yer omuz hizasında (≈130 birim; 40–55'i sırttan taşar, kalanı gövde arkasında),
// aşağı SÜREKLİ sivrilir, alt uç sivri (r≈4) diz hizasında (oturanda oturak/diz hizası). Dış kenar tek dışbükey kavis.
// Yerel gövde çerçevesi (−x = sırt). ust: omuz üstü y, alt: uç y, sirt: sırt hattı x (≈ −56).
export const kanatKatliNoktalar = (sirt: number, ust: number, alt: number, dx = 0, dy = 0): P[] => {
  const dis = sirt - 44, ic = sirt + 80, uc: P = [sirt + 6, alt];
  const pts: P[] = [];
  // üst kenar: içten dışa, omuz dikişi eğrisini izler (ortada yüksek, dışta alçalır)
  for (let i = 0; i <= 10; i++) { const t = i / 10, x = ic + (dis + 10 - ic) * t; pts.push([x, ust + 4 + 16 * t * t]); }
  // omuz köşesi (yuvarlak, r≈10) + dış kenar: tepede dolgun, aşağıda hızla sivrilen tek dışbükey kavis (ters damla), uç sivri
  pts.push([dis + 2, ust + 26]);
  for (let i = 1; i <= 18; i++) { const t = i / 18; const x = dis + (uc[0] - dis) * t ** 1.7 - 6 * Math.sin(Math.PI * t) * (1 - t); const y = ust + 30 + (alt - ust - 30) * t; pts.push([x, y]); }
  // iç kenar (gövde arkasında gizli): uçtan yukarı, hafif içbükey
  for (let i = 1; i < 14; i++) { const t = i / 14; pts.push([uc[0] + (ic - uc[0]) * t ** 0.8, alt + (ust + 4 - alt) * t]); }
  return pts.map(([x, y]) => [x + dx, y + dy] as P);
};
export const kanatEl = (g: KanatGeo): P => kanatEksen(g)(0.42, -0.12);
// acik 0..1 → iki kanat (yakın + uzak): dış çizgi noktaları + açık geometri (eller için). lean: gövde eğimi.
// katliUst/katliAlt: katlı damlanın omuz üstü ve uç y'si (yerel); sirt: sırt hattı x.
export const kanatGeo = (acik: number, lean: number, birimM: number, katliUst = -400, katliAlt = -122, sirt = -56) => {
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
  const onKat = kanatKatliNoktalar(sirt, katliUst, katliAlt), arkaKat = kanatKatliNoktalar(sirt, katliUst, katliAlt, 10, -4);
  const cx = sirt - 10;
  // açılma: kanat kökten döner + uzar (yarı yolda ≈60° yukarı); katlı damladan çıkış yalnız ilk %35'te nokta karışımıyla (atlama yok)
  const ara = (A: KanatGeo): KanatGeo => { const u = Math.min(1, t / 0.85), e = 1 - (1 - u) ** 2; let da = A.aci - -90; while (da > 180) da -= 360; while (da < -180) da += 360; return { kok: [cx + (A.kok[0] - cx) * e, katliUst + 0.55 * (katliAlt - katliUst) + (A.kok[1] - (katliUst + 0.55 * (katliAlt - katliUst))) * e], aci: -90 + da * e, L: (katliAlt - katliUst) * 0.75 + (A.L - (katliAlt - katliUst) * 0.75) * e, c: 130 + (A.c - 130) * e }; };
  const w = Math.min(1, t / 0.35);
  return { yakin: t >= 1 ? kanatAcikNoktalar(yakinAcik) : kar2(onKat, kanatAcikNoktalar(ara(yakinAcik)), w), uzak: t >= 1 ? kanatAcikNoktalar(uzakAcik) : kar2(arkaKat, kanatAcikNoktalar(ara(uzakAcik)), w), yakinAcik, uzakAcik, katli: { sirt, ust: katliUst, alt: katliAlt } };
};
// v1.4 tek ton ailesi (K1-2 Z3: açılmada ton sıçraması yok). isik 0..1 (0 = kontra siluet, 1 = ışık yanı) sürekli; katlı ↔ açık sürekli karışım.
export const KANAT_TON = {
  gece: { katli: "#3e3a38", ust: "#3e3a38", alt: "#302c2a", kontra: "#2a2828", kenar: "#f0b060", uzakKatli: "#34302e", uzakUst: "#302c2a", uzakKontra: "#232222", kat: "#2e2a28" },
  gun: { katli: "#5a5652", ust: "#5a5652", alt: "#46423e", kontra: "#3a3634", kenar: "#f0d79a", uzakKatli: "#4e4a46", uzakUst: "#46423e", uzakKontra: "#33302e", kat: "#46423e" },
} as const;
export const kanatDolgu = (aile: "gece" | "gun", katli: number, isik: number, uzak?: boolean) => {
  const T = KANAT_TON[aile];
  const acikR = uzak ? karistir(T.uzakKontra, T.uzakUst, isik) : karistir(T.kontra, T.ust, isik);
  return karistir(acikR, uzak ? T.uzakKatli : T.katli, Math.max(0, Math.min(1, katli)));
};
// alttan 0..1: püskürme anında alt kenarda ≤ 8 birimlik sıcak şerit (#8a6a4a α .6). kenar: ışık yanı amber 2 px (ekran).
export const KanatCiz: React.FC<{ pts: P[]; katli: number; isik: number; olcekEkran: number; uzak?: boolean; kat?: { sirt: number; ust: number; alt: number }; aile?: "gece" | "gun"; alttan?: number }> = ({ pts, katli, isik, olcekEkran, uzak, kat, aile = "gece", alttan = 0 }) => {
  const id = "kn" + React.useId().replace(/:/g, "");
  const T = KANAT_TON[aile];
  const d = yumusakYol(pts);
  const dolgu = kanatDolgu(aile, katli, isik, uzak);
  const px = 1 / Math.max(0.05, olcekEkran);
  return (
    <g>
      <defs><clipPath id={`${id}c`}><path d={d} /></clipPath></defs>
      <path d={d} fill={dolgu} stroke={ink(dolgu)} strokeWidth={2.5 * px} strokeLinejoin="round" />
      {/* katlı: uzunlamasına TEK ince kat çizgisi (uçları söner), omuzdan sivri uca */}
      {kat && !uzak && katli > 0.4 && <g clipPath={`url(#${id}c)`} opacity={Math.min(1, (katli - 0.4) / 0.4)}>
        <path d={`M ${kat.sirt + 4} ${kat.ust + 40} Q ${kat.sirt - 26} ${(kat.ust + kat.alt) / 2} ${kat.sirt - 13} ${kat.alt - 14}`} stroke={T.kat} strokeWidth={Math.max(2, 2.2 * px)} fill="none" strokeLinecap="round" strokeDasharray={`0 24 ${Math.max(10, kat.alt - kat.ust - 90)} 1000`} />
      </g>}
      {/* ışık yanı amber kenar: katlıda sırt (dış, −x) kenarı, açıkta ön kenar */}
      {!uzak && <path d={d} fill="none" stroke={T.kenar} strokeWidth={2 * px} strokeOpacity={0.75 * Math.max(katli, 1 - katli)} clipPath={`url(#${id}c)`} transform={katli >= 0.5 ? `translate(${2 * px},0)` : `translate(0,${-1.5 * px})`} />}
      {alttan > 0 && <path d={d} fill="none" stroke="#8a6a4a" strokeWidth={8} strokeOpacity={0.6 * alttan} clipPath={`url(#${id}c)`} transform="translate(0,-4)" />}
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
        <path d={yumusakYol(pts)} fill={KANAT_TON.gece.alt} stroke={ink(KANAT_TON.gece.alt)} strokeWidth={2} />
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
