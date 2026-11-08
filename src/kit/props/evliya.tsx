// ===== Evliya prop'ları (tasarim.md v1.2 §2, §4) — SARAYBURNU şablonu çizer =====
// KE-P1 fişek demeti (İMZA: tüp yüzü #c4a874; başka hiçbir nesnede ±ΔE76 15 içinde ton yok) · KE-P7 meşale · KE-P2 kanat · KE-P4 başlık (takke).
// Ölçüler METRE; çizim px/m ile. Kanat kukla yerel biriminde (Kukla arka/arkaUst/on yuvaları) çizilir: gövdeyle döner.
import React from "react";
import { interpolate } from "remotion";
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
export const demetTutamak = (d: DemetDurum) => demetNokta(d, 0.17, DEMET_M.kizakH + DEMET_M.bag[2] * DEMET_M.tupH);
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
export const Fitil: React.FC<{ pts: P[]; yanma: number; kalin?: number }> = ({ pts, yanma, kalin = 3 }) => {
  const kes = Math.max(0, Math.min(1, yanma));
  const n = 40, tum: P[] = Array.from({ length: n + 1 }).map((_, i) => yolNokta(pts, i / n));
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
export const MESALE_M = { on: 0.75, arka: 0.35, kalin: 0.035, bas: 0.18, alev: 0.34 };
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
      <line x1={a0[0]} y1={a0[1]} x2={basBas[0]} y2={basBas[1]} stroke={ink("#4a3424")} strokeWidth={sw + 2} strokeLinecap="round" opacity={0.0} />
      {/* katran sargısı */}
      <polygon points={poly([[basBas[0] + n[0] * 0.045 * k, basBas[1] + n[1] * 0.045 * k], [b[0] + n[0] * 0.05 * k, b[1] + n[1] * 0.05 * k], [b[0] - n[0] * 0.05 * k, b[1] - n[1] * 0.05 * k], [basBas[0] - n[0] * 0.045 * k, basBas[1] - n[1] * 0.045 * k]])} fill="#2e2620" stroke={ink("#2e2620")} strokeWidth={1.5} />
      {/* ince duman */}
      {[0, 1, 2].map((i) => { const t = ((p * 0.6 + i * 22) % 66) / 66; return <circle key={i} cx={b[0] + 0.05 * k + t * 0.25 * k} cy={b[1] - H * (0.9 + t * 1.6)} r={0.03 * k * (1 + t * 2)} fill="#4a4440" opacity={0.4 * (1 - t)} />; })}
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

// ---------------- KE-P2 KANAT (tek siluet, ayrıntısız; Lagâri ve Hezarfen'de aynı çizim) ----------------
// Açık: uzun sivrilen yaprak; ön kenar düz-hafif kavisli, arka kenarda 3 büyük yumuşak oyuk. Kök eni 0.22 × açıklık (3.1 m [T]).
// Tüy, kaburga, iskelet, kayış, tutamak ÇİZİLMEZ; kök omuz arkasında gizli, eller ön kenarın altında kaybolur.
// Katlı (acik 0): sırtta dikey (başın 0.15H üstünden dize/oturağa), en 0.35H, ortada tek kıvrım çizgisi.
// Kukla YEREL birimde (RIG_BIRIM_M ≈ 306 birim/m) — gövde çerçevesinde (lean dahil).
export const KANAT_M = { aciklik: 3.1, kok: 0.22 };
export type KanatGeo = { kok: P; aci: number; L: number; c: number };
export const kanatYaprak = (g: KanatGeo, katli: number): string => {
  const { kok, aci, L, c } = g;
  const r = (aci * Math.PI) / 180, dir: P = [Math.cos(r), Math.sin(r)];
  let nrm: P = [-Math.sin(r), Math.cos(r)]; if (nrm[1] < 0 || (Math.abs(nrm[1]) < 1e-3 && nrm[0] > 0)) nrm = [-nrm[0], -nrm[1]];
  const W = (u: number, v: number): P => [kok[0] + dir[0] * u * L + nrm[0] * v * c, kok[1] + dir[1] * u * L + nrm[1] * v * c];
  const oy = 1 - katli; // oyuklar açılırken belirir
  const m = (a: number, b: number) => a + (b - a) * katli; // açık → katlı (yuvarlak uçlu dar yaprak, ortada kıvrım)
  const on: P[] = [W(0, m(-0.3, -0.5)), W(0.25, m(-0.34, -0.52)), W(0.55, m(-0.29, -0.52)), W(0.85, m(-0.14, -0.44)), W(1, m(0, -0.08))];
  const arka: [number, number][] = [[0.88, m(0.1, 0.4)], [0.7, m(0.3, 0.5)], [0.45, m(0.5, 0.5)], [0.18, m(0.66, 0.5)], [0, m(0.7, 0.5)]];
  let d = `M ${on[0][0].toFixed(1)} ${on[0][1].toFixed(1)}`;
  for (let i = 1; i < on.length; i++) { const m: P = [(on[i - 1][0] + on[i][0]) / 2, (on[i - 1][1] + on[i][1]) / 2]; d += ` Q ${on[i - 1][0].toFixed(1)} ${on[i - 1][1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`; }
  // uç: açıkken sivri-yuvarlak, katlıyken yuvarlak (ön kenardan arka kenara kavisle döner)
  { const uc = W(1 + 0.08 * katli, m(0, 0.15)); d += ` Q ${uc[0].toFixed(1)} ${uc[1].toFixed(1)} ${W(1, m(0, 0.36))[0].toFixed(1)} ${W(1, m(0, 0.36))[1].toFixed(1)}`; }
  let onceki: [number, number] = [1, 0];
  for (const q of arka) {
    const a = W(q[0], q[1]); const mu = (onceki[0] + q[0]) / 2, mv = (onceki[1] + q[1]) / 2 - 0.14 * oy;
    const cp = W(mu, mv);
    d += ` Q ${cp[0].toFixed(1)} ${cp[1].toFixed(1)} ${a[0].toFixed(1)} ${a[1].toFixed(1)}`;
    onceki = q;
  }
  return d + " Z";
};
// ön kenar altındaki el hedefi (yaprak içinde: el ön kenarın altında kaybolur)
export const kanatEl = (g: KanatGeo): P => {
  const r = (g.aci * Math.PI) / 180; let nrm: P = [-Math.sin(r), Math.cos(r)]; if (nrm[1] < 0) nrm = [-nrm[0], -nrm[1]];
  return [g.kok[0] + Math.cos(r) * 0.42 * g.L + nrm[0] * -0.08 * g.c, g.kok[1] + Math.sin(r) * 0.42 * g.L + nrm[1] * -0.08 * g.c];
};
const lerpP = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
// acik 0..1 → iki kanadın geometrisi (yakın + uzak). lean: gövde eğimi (dünya açısını yerel açıya çevirir)
export const kanatGeo = (acik: number, lean: number, birimM: number, katliUst = -606, katliAlt = -110): { yakin: KanatGeo; uzak: KanatGeo } => {
  const L = (KANAT_M.aciklik / 2) * birimM, c = KANAT_M.kok * KANAT_M.aciklik * birimM;
  // katlı: sırtta dikey, kök oturak/diz hizasında, uç başın üstünde; en 120 birim (gövdenin arkasından ≈ 65 birim taşar)
  const katli: KanatGeo = { kok: [-58, katliAlt], aci: -90, L: katliAlt - katliUst, c: 100 };
  const t = interpolate(acik, [0, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // yakın kanat kökü sırtın ortasında ve yatağa yakın: ön kenar başın altından geçer (yüzü örtmez)
  const yakinAcik: KanatGeo = { kok: [-10, -330], aci: -5 - lean, L, c };
  const uzakAcik: KanatGeo = { kok: [-20, -370], aci: 192 - lean, L: L * 0.7, c: c * 0.7 };
  const mix = (A: KanatGeo, B: KanatGeo): KanatGeo => {
    let da = B.aci - A.aci; while (da > 180) da -= 360; while (da < -180) da += 360;
    return { kok: lerpP(A.kok, B.kok, t), aci: A.aci + da * t, L: A.L + (B.L - A.L) * t, c: A.c + (B.c - A.c) * t };
  };
  // katlıyken iki kanat üst üste: uzak kanat biraz geride/aşağıda → iki kenar görünür ("dikey üst üste")
  const katliUzak: KanatGeo = { ...katli, kok: [katli.kok[0] - 16, katli.kok[1] + 10], L: katli.L - 22 };
  return { yakin: mix(katli, yakinAcik), uzak: mix(katliUzak, uzakAcik) };
};
// ton: "isikli" (yakın sıcak ışıkta düz mat #4a4642 gölge tonu) · "kontra" (uzak ışık: gece siluet #2a2828). kenar: ışık yanı amber 2 px (ekran)
export const KanatCiz: React.FC<{ g: KanatGeo; katli: number; ton: "isikli" | "kontra"; kenar: string; olcekEkran: number; uzak?: boolean }> = ({ g, katli, ton, kenar, olcekEkran, uzak }) => {
  const d = kanatYaprak(g, katli);
  const dolgu = ton === "kontra" ? "#2a2828" : "#4a4642";
  const renk = uzak ? karistir(dolgu, "#14110d", 0.25) : dolgu;
  const px = 1 / Math.max(0.05, olcekEkran);
  // kıvrım çizgisi (katlıyken ortada tek çizgi)
  const r = (g.aci * Math.PI) / 180;
  const kv: P[] = [[g.kok[0] + Math.cos(r) * 0.08 * g.L, g.kok[1] + Math.sin(r) * 0.08 * g.L], [g.kok[0] + Math.cos(r) * 0.92 * g.L, g.kok[1] + Math.sin(r) * 0.92 * g.L]];
  return (
    <g>
      <path d={d} fill={renk} stroke={ink(dolgu)} strokeWidth={2.5 * px} strokeLinejoin="round" />
      {katli > 0.5 && <polyline points={poly(kv)} stroke={ink(dolgu)} strokeWidth={2 * px} opacity={0.8} fill="none" />}
      {!uzak && <path d={d} fill="none" stroke={kenar} strokeWidth={2 * px} strokeOpacity={0.7} strokeDasharray={`0 ${g.L * 0.55} ${g.L * 2}`} />}
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
