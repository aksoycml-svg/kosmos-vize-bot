// ===== KE-PK-N1 BALON + hasır sepet + sandık + kum torbası (tasarım §4.1, §4.8, §14.2; mekanlar §2v2.4) =====
// Balon: ekran uzayında (merkez + yarıçap px) — küre üst yarısı daire, alt yarısı doluluk `dolu` ile koni(kıvrımlı) → yuvarlak geçer.
// Işık yüzü sol-üst ≈ %35 (tasarım §14.1 abartı) = küre diski ∩ ışığa kaydırılmış disk; terminatör bandı mor tonlu tarama (78°, 2 px, 7 aralık).
// Ağ: birim küre (bakış eğimi α, alttan) → ekran; alt yarı zarf profiline eşlenir; 9–11 meridyen + 4 paralel, alt halkada toplanır.
// Sepet/sandık/torba: DÜNYA modeli (montmartreDunya.pr) — sepet 1.2 × 1.2 × 0.95 m, yaw 25°; görünen yüzler kameradan hesaplanır.
// Yazı, yama, şerit, arma, bayrak YOK. Kırmızı yok; imza kehribarı yok (C* ≤ 28).
import React, { useId } from "react";
import type { P } from "../../tipler";
import { Kam, kutu, lerp, PAL, pr, pts, pxm as pxmK, rng, sat, V3, yolAcik, yolKapali } from "../../sablonlar/paris/montmartreDunya";

// ---------------------------------------------------------------- BALON (zarf) ----------------------------------------------------------------
export type BalonDurum = {
  c: P; R: number; // küre merkezi, yarıçap (px)
  boyunUst: number; boyunAlt: number; boyunW: number; // boğaz (px): üst y, alt y, yarı en
  dolu: number; // 0 koni+kıvrım … 1 tam küre
  kivrim: number; // etek kıvrım çizgisi sayısı (0–9)
  gevsek: number; // ağ gevşekliği 0–1 (şişmede 3 kademede 0'a iner)
  egim: number; // bakış eğimi (derece, + = kamera alttan bakar)
  halka?: { y: number; w: number }; // ağ alt halkası (ekran)
  yansima?: boolean; // yer yansıması (yerdeyken)
  kontur?: number;
  isik?: P; // ışığa doğru ekran yönü (birim)
  coker?: { t: number; delik: P; seed: number }; // kısmi sönme (P07): delik = merkeze göre ofset (px)
  ag?: boolean;
  isikOfs?: number; // ışık diskinin kayması (R oranı): 1.08 → ışık yüzü ≈ %35 (kontrajur, §14.1); 0.55 → ≈ %65 (önden ışık, havaGeri G2.5)
};
const N_UST = 48, N_ALT = 28;
type Profil = { w: (y: number) => number; yQ: number };
const profil = (b: BalonDurum): Profil => {
  const { c, R, boyunW } = b;
  const cy = c[1];
  const yQ = Math.max(cy + R * 0.5, Math.min(b.boyunAlt - 2, cy + R + 0.45 * Math.max(0, b.boyunAlt - (cy + R))));
  // yuvarlak profil: daire → Q'ya teğet doğru
  const qx = boyunW, qy = yQ - cy, d = Math.hypot(qx, qy);
  const aT = d > R * 1.001 ? Math.atan2(qy, qx) - Math.acos(R / d) : Math.PI / 2;
  const xT = R * Math.cos(aT), yT = R * Math.sin(aT);
  const wYuv = (y: number) => {
    const u = y - cy;
    if (u <= yT) return Math.sqrt(Math.max(0, R * R - u * u));
    return lerp(xT, boyunW, (u - yT) / Math.max(1, qy - yT));
  };
  const wKoni = (y: number) => { const t = sat((y - cy) / Math.max(1, qy)); return boyunW + (R - boyunW) * Math.pow(1 - t, 0.72) * (1 - 0.18 * t * (1 - t)); };
  const f = b.dolu;
  return { yQ, w: (y: number) => Math.max(boyunW, lerp(wKoni(y), wYuv(y), f)) };
};
/** zarf dış çizgisi (kapalı) — üst yarı daire (çökmede ezik), alt yarı profil, boğaz */
const zarfNoktalar = (b: BalonDurum, pr0: Profil): P[] => {
  const { c, R } = b;
  const ezik = (a: number) => { // a: 180..360 (üst yarı, ekran açısı)
    if (!b.coker || b.coker.t <= 0) return 1;
    const t = b.coker.t, r = rng(b.coker.seed);
    const tepe = Math.exp(-(((a - 285) / 38) ** 2)); // sol-üstten çöker (isabet sol-alt; gaz yukarıdan kaçar)
    let v = 1 - 0.34 * t * tepe;
    for (let i = 0; i < 5; i++) v -= 0.05 * t * Math.max(0, Math.sin(((a - 180) / 180) * Math.PI * (2 + i) + r() * 6));
    return v;
  };
  const o: P[] = [];
  for (let i = 0; i <= N_UST; i++) { const a = 180 + (180 * i) / N_UST, r = (a * Math.PI) / 180, k = ezik(a); o.push([c[0] + R * k * Math.cos(r), c[1] + R * k * Math.sin(r)]); }
  const kiv = b.kivrim, alt: P[] = [];
  for (let i = 1; i <= N_ALT; i++) {
    const t = i / N_ALT, y = c[1] + t * (pr0.yQ - c[1]);
    const dalga = kiv > 0 ? 1 + 0.035 * Math.min(1, kiv / 6) * Math.sin(t * Math.PI * (3 + kiv * 0.5)) * (1 - t) : 1;
    alt.push([pr0.w(y) * dalga, y]);
  }
  for (const q of alt) o.push([c[0] + q[0], q[1]]);
  o.push([c[0] + b.boyunW, b.boyunAlt], [c[0] - b.boyunW, b.boyunAlt]);
  for (const q of [...alt].reverse()) o.push([c[0] - q[0] * (kiv > 0 ? 1.0 + 0.02 * Math.sin(q[1] * 0.05) * (1 - b.dolu) : 1), q[1]]);
  return o;
};
/** birim küre (θ kutuptan, φ kameraya göre) → ekran (zarfa eşlenmiş) + görünürlük */
const kureEkran = (b: BalonDurum, pr0: Profil, th: number, ph: number): { p: P; v: number } => {
  const a = (b.egim * Math.PI) / 180, X = Math.sin(th) * Math.sin(ph), Y = Math.cos(th), Zc = Math.sin(th) * Math.cos(ph);
  const v = -Y * Math.sin(a) + Zc * Math.cos(a), ys = -(Y * Math.cos(a) + Zc * Math.sin(a)), xs = X;
  const { c, R } = b;
  if (ys <= 0) return { p: [c[0] + xs * R, c[1] + ys * R], v };
  const Ws = Math.sqrt(Math.max(1e-4, 1 - ys * ys)), ye = c[1] + ys * (pr0.yQ - c[1]);
  return { p: [c[0] + (xs / Ws) * pr0.w(ye), ye], v };
};

export const Balon: React.FC<{ b: BalonDurum }> = ({ b }) => {
  const uid = "bl" + useId().replace(/:/g, "");
  const { c, R } = b;
  const K = b.kontur ?? 3.5;
  const pr0 = profil(b);
  const zarf = zarfNoktalar(b, pr0);
  const zarfD = yolKapali(zarf);
  const L = b.isik ?? ([-0.62, -0.78] as P);
  const ck = b.coker ? 1 - 0.3 * b.coker.t : 1; // çökmede ışık diski küçülür
  const lo = b.isikOfs ?? 1.08, bo = lo - 0.2;
  const lit: P = [c[0] + L[0] * R * lo, c[1] + L[1] * R * lo], band: P = [c[0] + L[0] * R * bo, c[1] + L[1] * R * bo];
  // ağ
  const ag: { d: string; isik: boolean }[] = [];
  const dugum: P[] = [];
  if (b.ag !== false) {
    const gv = b.gevsek, sal = (th: number, ph: number) => gv * R * 0.03 * Math.sin(th * 9 + ph * 4);
    const merid = Array.from({ length: 11 }, (_, i) => ((-90 + 5 + i * 18) * Math.PI) / 180);
    const paral = [34, 57, 80, 104].map((d) => (d * Math.PI) / 180);
    const thAlt = paral[paral.length - 1];
    for (const ph of merid) {
      const seg: P[] = []; let tum: P[][] = [];
      for (let j = 0; j <= 30; j++) {
        const th = (thAlt * j) / 30, q = kureEkran(b, pr0, th, ph);
        if (q.v > 0.02) seg.push([q.p[0] + sal(th, ph), q.p[1]]); else if (seg.length) { tum.push([...seg]); seg.length = 0; }
      }
      if (seg.length) tum.push(seg);
      tum = tum.filter((s) => s.length > 1);
      tum.forEach((s) => ag.push({ d: yolAcik(s), isik: false }));
      // ağın alt ucundan halkaya (gergin halat; gevşekken hafif kavis)
      const q = kureEkran(b, pr0, thAlt, ph);
      if (b.halka && q.v > 0.02 && Math.cos(ph) > 0.1) {
        const hx = c[0] + Math.sin(ph) * b.halka.w, hy = b.halka.y + Math.cos(ph) * b.halka.w * 0.18;
        const mx = (q.p[0] + hx) / 2 + gv * 14 * Math.sin(ph * 3), my = (q.p[1] + hy) / 2;
        ag.push({ d: `M${q.p[0].toFixed(1)} ${q.p[1].toFixed(1)}Q${mx.toFixed(1)} ${my.toFixed(1)} ${hx.toFixed(1)} ${hy.toFixed(1)}`, isik: false });
      }
    }
    for (const th of paral) {
      const seg: P[] = []; const parca: P[][] = [];
      for (let j = 0; j <= 60; j++) {
        const ph = -Math.PI / 2 + (Math.PI * j) / 60, q = kureEkran(b, pr0, th, ph);
        if (q.v > 0.02) seg.push([q.p[0] + sal(th, ph), q.p[1] + sal(ph, th) * 0.6]); else if (seg.length) { parca.push([...seg]); seg.length = 0; }
      }
      if (seg.length) parca.push(seg);
      parca.filter((s) => s.length > 1).forEach((s) => ag.push({ d: yolAcik(s), isik: false }));
      for (const ph of merid) { const q = kureEkran(b, pr0, th, ph); if (q.v > 0.08) dugum.push([q.p[0] + sal(th, ph), q.p[1] + sal(ph, th) * 0.6]); }
    }
  }
  // kıvrımlar (etek): ekvatordan boğaza inen ağır kıvrım çizgileri (gölge ailesinde)
  const kivrim: string[] = [];
  const nK = Math.round(b.kivrim);
  if (nK > 0) {
    const r = rng(160 + nK);
    for (let i = 0; i < nK; i++) {
      const u = -0.85 + (1.7 * (i + 0.5)) / nK + (r() - 0.5) * 0.08;
      const y0 = c[1] + R * (0.05 + r() * 0.15), y1 = b.boyunUst;
      const a0: P = [c[0] + u * pr0.w(y0) * 0.95, y0], a1: P = [c[0] + u * b.boyunW, y1];
      const m: P = [lerp(a0[0], a1[0], 0.5) + (r() - 0.5) * R * 0.08, lerp(a0[1], a1[1], 0.55)];
      kivrim.push(`M${a0[0].toFixed(1)} ${a0[1].toFixed(1)}Q${m[0].toFixed(1)} ${m[1].toFixed(1)} ${a1[0].toFixed(1)} ${a1[1].toFixed(1)}`);
    }
  }
  // çökme meridyenleri (P07: gölge ailesinde, üstten aşağı)
  const cokCiz: string[] = [];
  const COKME_MERIDYEN = false as boolean; // B3: ağ meridyenleriyle çift dikey çizgi okunuyordu (eleştiri B2 küçük) → kapalı; çökme ezik siluet + kıvrımla okunur
  if (COKME_MERIDYEN && b.coker && b.coker.t > 0.02) {
    const r = rng(b.coker.seed + 3);
    for (let i = 0; i < 5; i++) {
      const u = -0.7 + i * 0.32 + (r() - 0.5) * 0.1, y0 = c[1] - R * (0.85 - 0.25 * Math.abs(u)) * ck, y1 = c[1] + R * 0.7;
      const k = b.coker.t;
      cokCiz.push(`M${(c[0] + u * R * 0.5).toFixed(1)} ${y0.toFixed(1)}Q${(c[0] + u * R * (0.9 + 0.3 * k)).toFixed(1)} ${((y0 + y1) / 2).toFixed(1)} ${(c[0] + u * R * 0.55).toFixed(1)} ${y1.toFixed(1)}`);
    }
  }
  const vernik = (() => { // tek ince hilal, ışık yüzünde
    const a0 = Math.atan2(L[1], L[0]), o: P[] = [], ic: P[] = [];
    for (let i = 0; i <= 16; i++) { const t = i / 16, a = a0 - 0.42 + 0.84 * t, r1 = R * 0.84 * ck, r2 = r1 - R * 0.045 * Math.sin(Math.PI * t); o.push([c[0] + r1 * Math.cos(a), c[1] + r1 * Math.sin(a)]); ic.push([c[0] + r2 * Math.cos(a), c[1] + r2 * Math.sin(a)]); }
    return yolKapali([...o, ...ic.reverse()]);
  })();
  const dairePath = `M${c[0] - R} ${c[1]}a${R} ${R} 0 1 0 ${2 * R} 0a${R} ${R} 0 1 0 ${-2 * R} 0Z`;
  return (
    <g>
      <defs>
        <clipPath id={`${uid}z`}><path d={zarfD} /></clipPath>
        <clipPath id={`${uid}k`}><path d={dairePath} /></clipPath>
        <clipPath id={`${uid}y`}><rect x={c[0] - 2 * R} y={c[1] + R * 0.5} width={4 * R} height={4 * R} /></clipPath>
        <clipPath id={`${uid}l`}><circle cx={lit[0]} cy={lit[1]} r={R * ck} /></clipPath>
        <mask id={`${uid}m`} maskUnits="userSpaceOnUse" x={c[0] - 3 * R} y={c[1] - 3 * R} width={6 * R} height={6 * R}>
          <circle cx={band[0]} cy={band[1]} r={R * ck} fill="#fff" /><circle cx={lit[0]} cy={lit[1]} r={R * ck} fill="#000" />
        </mask>
        <mask id={`${uid}g`} maskUnits="userSpaceOnUse" x={c[0] - 3 * R} y={c[1] - 3 * R} width={6 * R} height={6 * R}>
          <rect x={c[0] - 3 * R} y={c[1] - 3 * R} width={6 * R} height={6 * R} fill="#fff" /><circle cx={lit[0]} cy={lit[1]} r={R * ck} fill="#000" />
        </mask>
        <pattern id={`${uid}t`} patternUnits="userSpaceOnUse" width={7} height={7} patternTransform="rotate(-12)"><rect x={0} y={0} width={2} height={7} fill={PAL.balonTarama} /></pattern>
      </defs>
      <g clipPath={`url(#${uid}z)`}>
        <rect x={c[0] - 2 * R} y={c[1] - 2 * R} width={4 * R} height={5 * R} fill={PAL.balonGolge} />
        <g clipPath={`url(#${uid}k)`}>
          <g mask={`url(#${uid}m)`}><rect x={c[0] - 2 * R} y={c[1] - 2 * R} width={4 * R} height={4 * R} fill={PAL.terminator} /><rect x={c[0] - 2 * R} y={c[1] - 2 * R} width={4 * R} height={4 * R} fill={`url(#${uid}t)`} opacity={0.75} /></g>
          <g clipPath={`url(#${uid}l)`}><rect x={c[0] - 2 * R} y={c[1] - 2 * R} width={4 * R} height={4 * R} fill={PAL.balonIsik} /></g>
          <path d={vernik} fill={PAL.vernik} />
        </g>
        {b.yansima && <g clipPath={`url(#${uid}y)`}><path d={zarfD} fill="none" stroke={PAL.yansima} strokeWidth={Math.max(10, R * 0.07)} /><path d={zarfD} fill="none" stroke={PAL.yansima} strokeWidth={3} transform={`translate(${c[0] * 0.06} ${c[1] * 0.06}) scale(0.94)`} /></g>}
        {kivrim.map((d, i) => <path key={`k${i}`} d={d} fill="none" stroke={PAL.konturGolge} strokeWidth={Math.max(2, K * 0.7)} strokeLinecap="round" />)}
        {cokCiz.map((d, i) => <path key={`c${i}`} d={d} fill="none" stroke={PAL.konturGolge} strokeWidth={Math.max(2, K * 0.8)} strokeLinecap="round" />)}
        {/* kenar ışığı: konturun içine yapışık, sol-üst yay */}
        <g clipPath={`url(#${uid}l)`}><circle cx={c[0]} cy={c[1]} r={R * ck - K / 2 - 1.5} fill="none" stroke={PAL.kenar} strokeWidth={3} /></g>
        {ag.map((a, i) => <path key={`a${i}`} d={a.d} fill="none" stroke={PAL.agGolge} strokeWidth={2.5} mask={`url(#${uid}g)`} strokeLinecap="round" />)}
        <g clipPath={`url(#${uid}l)`}>{ag.map((a, i) => <path key={`b${i}`} d={a.d} fill="none" stroke={PAL.agIsik} strokeWidth={2} strokeLinecap="round" />)}</g>
        {dugum.map((q, i) => <circle key={`d${i}`} cx={q[0]} cy={q[1]} r={2.6} fill={PAL.agGolge} />)}
      </g>
      {/* ağın halkaya inen kısmı zarfın dışında da görünür */}
      <g>{ag.filter((a) => a.d.includes("Q")).map((a, i) => <path key={`h${i}`} d={a.d} fill="none" stroke={PAL.agGolge} strokeWidth={2.2} />)}</g>
      <path d={zarfD} fill="none" stroke={PAL.konturGolge} strokeWidth={K} strokeLinejoin="round" />
      <g clipPath={`url(#${uid}l)`}><path d={zarfD} fill="none" stroke={PAL.konturIsik} strokeWidth={K} strokeLinejoin="round" /></g>
      {b.coker && b.coker.t > 0 && <Delik c={[c[0] + b.coker.delik[0], c[1] + b.coker.delik[1]]} r={26 * 1.6 * Math.min(1, b.coker.t * 6) * (R / 145)} seed={b.coker.seed} />}
    </g>
  );
};
/** isabet deliği (KE-PK-E1 v2): düzensiz yırtık delik — koyu iç + kenarda kısa kıvrık kumaş dilleri (iç yüz açık, dış yüz gölge).
 *  Işınsal çizgi YOK (B turu "örümcek" okuması). Dil boyu ≤ 0.45 r; kontur ince (1.5 px), gravür kenarı. */
const Delik: React.FC<{ c: P; r: number; seed: number }> = ({ c, r, seed }) => {
  if (r < 0.5) return null;
  const g = rng(seed);
  const n = 17;
  const kenar: P[] = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2 + (g() - 0.5) * 0.25, q = r * (0.62 + 0.5 * g()) * (i % 3 === 0 ? 1.18 : 1); return [c[0] + q * Math.cos(a) * 1.15, c[1] + q * Math.sin(a) * 0.85]; });
  // B3: yırtık diller 6 kısa, AÇIK (kumaşın iç yüzü), kenara yapışık (≤ 0.22 r) — B2'de uzun koyu diller "kulak/kanat" (kuş/yarasa) okutuyordu
  const diller = [0.2, 1.25, 2.3, 3.3, 4.3, 5.4].map((a0) => {
    const a = a0 + (g() - 0.5) * 0.35, w = 0.2 + 0.1 * g(), L = r * (0.12 + 0.1 * g());
    const k0: P = [c[0] + r * 0.82 * Math.cos(a - w) * 1.15, c[1] + r * 0.82 * Math.sin(a - w) * 0.85], k1: P = [c[0] + r * 0.82 * Math.cos(a + w) * 1.15, c[1] + r * 0.82 * Math.sin(a + w) * 0.85];
    const uc: P = [c[0] + (r * 0.9 + L) * Math.cos(a + 0.15) * 1.15, c[1] + (r * 0.9 + L) * Math.sin(a + 0.15) * 0.85];
    return { d: `M${k0[0].toFixed(1)} ${k0[1].toFixed(1)}Q${((k0[0] + uc[0]) / 2).toFixed(1)} ${((k0[1] + uc[1]) / 2 - 1).toFixed(1)} ${uc[0].toFixed(1)} ${uc[1].toFixed(1)}Q${((k1[0] + uc[0]) / 2 + 1).toFixed(1)} ${((k1[1] + uc[1]) / 2).toFixed(1)} ${k1[0].toFixed(1)} ${k1[1].toFixed(1)}Z`, ic: true };
  });
  return (
    <g strokeLinejoin="round">
      <polygon points={pts(kenar.map((q) => [c[0] + (q[0] - c[0]) * 1.12, c[1] + (q[1] - c[1]) * 1.12] as P))} fill={PAL.terminator} />
      <polygon points={pts(kenar)} fill={PAL.delik} stroke={PAL.konturGolge} strokeWidth={1.5} />
      {diller.map((d, i) => <path key={i} d={d.d} fill={d.ic ? PAL.yirtikIc : PAL.balonGolge} stroke={PAL.konturGolge} strokeWidth={1.5} />)}
    </g>
  );
};
/** balon boğazı + halka (ekran): halka elips (alttan bakış) */
export const BogazHalka: React.FC<{ x: number; boyunUst: number; boyunAlt: number; boyunW: number; halkaY: number; halkaW: number; egim?: number; kontur?: number }> = ({ x, boyunUst, boyunAlt, boyunW, halkaY, halkaW, egim = 12, kontur = 3 }) => {
  const ry = Math.max(2, halkaW * Math.sin((egim * Math.PI) / 180));
  return (
    <g>
      <path d={`M${x - boyunW} ${boyunUst}L${x + boyunW} ${boyunUst}L${x + boyunW * 0.85} ${boyunAlt}L${x - boyunW * 0.85} ${boyunAlt}Z`} fill={PAL.balonGolge} stroke={PAL.konturGolge} strokeWidth={kontur} strokeLinejoin="round" />
      <path d={`M${x - boyunW * 0.85} ${boyunAlt - 2}L${x + boyunW * 0.85} ${boyunAlt - 2}`} stroke={PAL.konturGolge} strokeWidth={Math.max(2, kontur * 1.6)} />
      <ellipse cx={x} cy={halkaY} rx={halkaW} ry={ry} fill="none" stroke={PAL.halka} strokeWidth={Math.max(2.5, kontur * 1.5)} />
      <path d={`M${x - halkaW} ${halkaY}A${halkaW} ${ry} 0 0 0 ${x - halkaW * 0.2} ${halkaY + ry * 0.98}`} fill="none" stroke={PAL.kenar} strokeWidth={1.2} />
    </g>
  );
};

// ---------------------------------------------------------------- SEPET (dünya) ----------------------------------------------------------------
export const SEPET = { en: 1.2, derin: 1.2, boy: 0.95, yaw: 25 };
export type SepetPoz = { X: number; h: number; Z: number; yaw?: number };
export const sepetKose = (s: SepetPoz): { alt: V3[]; ust: V3[] } => {
  const k = kutu(s.X, s.Z, SEPET.en, SEPET.derin, s.h, s.h + SEPET.boy, s.yaw ?? SEPET.yaw);
  return { alt: k.slice(0, 4), ust: k.slice(4) }; // sıra: FL, FR, BR, BL (yerel −x−z, +x−z, +x+z, −x+z)
};
const kamPos = (k: Kam): V3 => [k.X, k.e, k.Z];
const yuzGorunur = (k: Kam, a: V3, b: V3, merkez: V3) => {
  const m: V3 = [(a[0] + b[0]) / 2, 0, (a[2] + b[2]) / 2], n: [number, number] = [m[0] - merkez[0], m[2] - merkez[2]], c = kamPos(k);
  return (c[0] - m[0]) * n[0] + (c[2] - m[2]) * n[1] > 0;
};
/** rim halatı (B2): sarılı halat, açık ton + çapraz büküm çentikleri (≈ 5 cm), alt kenarda koyu gölge. idx: üst köşe sırası (ön: [3,0,1], arka: [1,2,3]) */
const RimHalat: React.FC<{ k: Kam; s: SepetPoz; idx: number[] }> = ({ k, s, idx }) => {
  const { ust } = sepetKose(s), p = (v: V3) => pr(k, ...v), U = ust.map(p);
  const rw = Math.max(3, 0.055 * pxmK(k, s.Z - 0.4));
  const cent: string[] = [];
  for (let n = 1; n < idx.length; n++) { const a = ust[idx[n - 1]], b = ust[idx[n]], L = Math.hypot(b[0] - a[0], b[2] - a[2]), nn = Math.max(4, Math.round(L / 0.05)); for (let q = 0; q < nn; q++) { const t = (q + 0.5) / nn, c0 = p([lerp(a[0], b[0], t), a[1], lerp(a[2], b[2], t)]); cent.push(`M${(c0[0] - rw * 0.32).toFixed(1)} ${(c0[1] + rw * 0.42).toFixed(1)}L${(c0[0] + rw * 0.32).toFixed(1)} ${(c0[1] - rw * 0.42).toFixed(1)}`); } }
  const d = yolAcik(idx.map((n) => U[n]));
  return <g strokeLinejoin="round" strokeLinecap="round"><path d={d} fill="none" stroke={PAL.sepetKenar} strokeWidth={rw + 3} transform={`translate(0 ${rw * 0.25})`} /><path d={d} fill="none" stroke={PAL.halat} strokeWidth={rw} />{rw >= 4 && <path d={cent.join("")} fill="none" stroke={PAL.halatGolge} strokeWidth={Math.max(1, rw * 0.16)} />}<path d={d} fill="none" stroke={PAL.kamisIsik} strokeWidth={Math.max(1, rw * 0.18)} transform={`translate(${-rw * 0.15} ${-rw * 0.28})`} /></g>;
};
export type SepetCiz = { k: Kam; s: SepetPoz; isikYuz: string; cokme?: number; kamis?: number; kontur?: number; dx?: number; dy?: number; ic?: React.ReactNode; isikSol?: boolean };
/** arka: ağız içi (iç duvarlar) — içerik (çuval, sandık, figür) bundan SONRA, SepetOn'dan ÖNCE çizilir */
export const SepetArka: React.FC<SepetCiz> = ({ k, s, dx = 0, dy = 0 }) => {
  const { ust } = sepetKose(s);
  if (k.e <= s.h + SEPET.boy) return null; // kamera rim altında: iç görünmez
  const U = ust.map((q) => pr(k, ...q));
  const derin = ust.map((q) => pr(k, q[0], s.h + 0.12, q[2]));
  const m: V3 = [s.X, 0, s.Z];
  const ic: React.ReactNode[] = [];
  for (let i = 0; i < 4; i++) {
    const j = (i + 1) % 4;
    if (!yuzGorunur(k, ust[i], ust[j], m)) ic.push(<polygon key={i} points={pts([U[i], U[j], derin[j], derin[i]])} fill={PAL.hasirGolge} stroke={PAL.sepetIc} strokeWidth={1.5} />);
  }
  return <g transform={`translate(${dx} ${dy})`}><polygon points={pts(U)} fill={PAL.sepetIc} />{ic}<RimHalat k={k} s={s} idx={[1, 2, 3]} /></g>;
};
export const SepetOn: React.FC<SepetCiz & { torbalar?: React.ReactNode }> = ({ k, s, isikYuz, cokme = 0, kamis = 0.05, kontur = 4, dx = 0, dy = 0, torbalar }) => {
  const { alt, ust } = sepetKose(s);
  const m: V3 = [s.X, 0, s.Z];
  const yuzler: React.ReactNode[] = [];
  const p = (v: V3) => pr(k, ...v);
  for (let i = 0; i < 4; i++) {
    const j = (i + 1) % 4;
    if (!yuzGorunur(k, alt[i], alt[j], m)) continue;
    // yüz normali ışığa: sol (−x) ve ön (−z) yüzlerden sol olan ışıkta (sıyırma)
    const nx = (alt[i][0] + alt[j][0]) / 2 - m[0], nz = (alt[i][2] + alt[j][2]) / 2 - m[2];
    const sol = nx < -0.2 && nx < nz; // sola bakan yüz
    const renk = sol ? isikYuz : PAL.hasirGolge;
    const c = cokme * 0.02; // çökme: alt kenar içe/yukarı (m)
    const A = p(alt[i]), B = p(alt[j]), C = p(ust[j]), D = p(ust[i]);
    const Ac = p([alt[i][0], alt[i][1] + c, alt[i][2]]), Bc = p([alt[j][0], alt[j][1] + c, alt[j][2]]);
    const ppm = pxmK(k, (alt[i][2] + alt[j][2]) / 2);
    const genis = Math.hypot(alt[j][0] - alt[i][0], alt[j][2] - alt[i][2]);
    // HASIR ÖRGÜ (B2, eleştiri #5): yatay sıralar (≈ 0.07 m), her sırada kabarık örgü hücreleri (≈ 0.1 m), sıra başına yarım hücre kaydırma.
    // Hücrenin üst kenarı ışık çizgisi, alt kenarı + hücre arası koyu çizgi. Düz dikey çıta / kuşak YOK (sandık okuması kalkar).
    const nS = Math.max(6, Math.round(SEPET.boy / 0.05)), nH = Math.max(5, Math.round(genis / 0.075)), rowPx = (SEPET.boy / nS) * ppm;
    const Pt = (t: number, h: number): P => { const tt = Math.max(0, Math.min(1, t)), cc = c * (1 - (h - s.h) / SEPET.boy); const q = p([lerp(alt[i][0], alt[j][0], tt), h + cc, lerp(alt[i][2], alt[j][2], tt)]); const bow = cokme * ppm * 0.012 * Math.sin(Math.PI * tt) * (1 - (h - s.h) / SEPET.boy); return [q[0] + bow, q[1]]; };
    const isikC: string[] = [], koyuC: string[] = [], sirC: string[] = [];
    const f = (q: P) => `${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
    if (rowPx >= 2.5) for (let r = 0; r < nS; r++) {
      const h0 = s.h + (r * SEPET.boy) / nS, h1 = s.h + ((r + 1) * SEPET.boy) / nS, hm = (h0 + h1) / 2;
      sirC.push(`M${f(Pt(0, h0))}L${f(Pt(0.5, h0))}L${f(Pt(1, h0))}`);
      for (let q = -1; q < nH; q++) {
        const t0 = (q + (r % 2 ? 0.5 : 0)) / nH, t1 = t0 + 1 / nH; if (t1 <= 0 || t0 >= 1) continue;
        const a0 = Pt(t0 + 0.08 / nH, h1 - (h1 - h0) * 0.18), a1 = Pt(t1 - 0.08 / nH, h1 - (h1 - h0) * 0.18), am = Pt((t0 + t1) / 2, h1 - (h1 - h0) * 0.02);
        isikC.push(`M${f(a0)}Q${f(am)} ${f(a1)}`);
        const b0 = Pt(t0 + 0.06 / nH, h0 + (h1 - h0) * 0.12), b1 = Pt(t1 - 0.06 / nH, h0 + (h1 - h0) * 0.12), bm = Pt((t0 + t1) / 2, h0 - (h1 - h0) * 0.05);
        koyuC.push(`M${f(b0)}Q${f(bm)} ${f(b1)}`);
        void hm;
      }
    }
    const wI = Math.max(1, Math.min(3.2, rowPx * 0.09)), wK = Math.max(1, Math.min(3.6, rowPx * 0.11));
    yuzler.push(
      <g key={i}>
        <polygon points={pts([Ac, Bc, C, D])} fill={renk} />
        {rowPx >= 2.5 && <path d={sirC.join("")} fill="none" stroke={sol ? "#6e5650" : "#3f3036"} strokeWidth={wK * 1.3} />}
        {rowPx >= 2.5 && <path d={koyuC.join("")} fill="none" stroke={sol ? "#6e5650" : "#3f3036"} strokeWidth={wK} strokeLinecap="round" />}
        {rowPx >= 2.5 && <path d={isikC.join("")} fill="none" stroke={sol ? PAL.kamisIsik : "#8a7266"} strokeWidth={wI} strokeLinecap="round" />}
        <polygon points={pts([Ac, Bc, C, D])} fill="none" stroke={PAL.sepetKenar} strokeWidth={kontur} strokeLinejoin="round" />
      </g>,
    );
    void A; void B;
  }
  // rim: HALAT KENAR (B2): sarılı halat — açık halat tonu + çapraz büküm çentikleri (her ≈ 5 cm), alt kenarında koyu gölge
  const U = ust.map(p), Ui = ust.map((q) => p([m[0] + (q[0] - m[0]) * 0.93, q[1] + 0.02, m[2] + (q[2] - m[2]) * 0.93]));
  const ustGorunur = k.e > s.h + SEPET.boy;
  return (
    <g transform={`translate(${dx} ${dy})`}>
      {yuzler}
      {ustGorunur && <path d={`${yolKapali(U)}${yolKapali([...Ui].reverse())}`} fill={PAL.sepetKenar} fillRule="evenodd" />}
      <RimHalat k={k} s={s} idx={[3, 0, 1]} />
      {torbalar}
    </g>
  );
};
/** sepet ön yüzünde (FL→FR) u konumunda, rimin `alt` m altındaki halat noktası (yüzden 0.1 m dışarıda) */
export const onYuzNokta = (s: SepetPoz, u: number, altRim = 0.1, disari = 0.1): V3 => {
  const { alt } = sepetKose(s), A = alt[0], B = alt[1];
  const r = (((s.yaw ?? SEPET.yaw) * Math.PI) / 180), n: [number, number] = [Math.sin(r), -Math.cos(r)];
  return [lerp(A[0], B[0], u) + n[0] * disari, s.h + SEPET.boy - altRim, lerp(A[2], B[2], u) + n[1] * disari];
};

// ---------------------------------------------------------------- TORBA (kum / posta çuvalı) ----------------------------------------------------------------
/** ekranda: bağ noktası `p` (ip düğümü), ölçek pxm; yerel metre (y aşağı). tip kum: 0.42 m; cuval: 0.6 m (ayakta, ağız yukarı) */
/** B2 (eleştiri #5): torba çeşitliliği — varyant 0–3 gövde dolgunluğu / büzgü / bağ farkı; olcek boy (±12 %); askı ipi boyu (bagBoy m) */
const TORBA_V = [
  { kL: 1.0, kR: 1.0, kB: 1.0, bz: 1.0, bzE: 0, bag: 0.0, ipB: 0.05 },
  { kL: 0.92, kR: 1.08, kB: 0.94, bz: 0.75, bzE: 0.012, bag: -0.006, ipB: 0.08 },
  { kL: 1.08, kR: 0.95, kB: 1.06, bz: 1.25, bzE: -0.01, bag: 0.008, ipB: 0.035 },
  { kL: 1.02, kR: 1.04, kB: 0.9, bz: 0.9, bzE: 0.006, bag: 0.004, ipB: 0.065 },
];
export const Torba: React.FC<{ p: P; pxm: number; tip?: "kum" | "cuval"; aci?: number; kontur?: number; isikSol?: boolean; ip?: boolean; acik?: number; varyant?: number; olcek?: number }> = ({ p, pxm, tip = "kum", aci = 0, kontur, isikSol = true, ip = true, acik = 0, varyant = 0, olcek = 1 }) => {
  const uid = "tb" + useId().replace(/:/g, "");
  const s = (tip === "cuval" ? 1.45 : 1) * olcek;
  const V = TORBA_V[((varyant % 4) + 4) % 4];
  const K = kontur ?? Math.max(1.5, Math.min(6, pxm * 0.011));
  const y0 = V.ipB; // bağ: halat noktasının altında (varyanta göre 3.5–8 cm)
  const n3 = (v: number) => v.toFixed(3);
  const govde = `M-0.03 0 C${n3(-0.075 * V.kL)} 0.04 ${n3(-0.142 * V.kL)} 0.12 ${n3(-0.136 * V.kL)} 0.25 C${n3(-0.13 * V.kL)} ${n3(0.35 * V.kB)} -0.072 ${n3(0.405 * V.kB)} ${n3(0.01 * (V.kR - V.kL))} ${n3(0.405 * V.kB)} C0.072 ${n3(0.405 * V.kB)} ${n3(0.13 * V.kR)} ${n3(0.35 * V.kB)} ${n3(0.136 * V.kR)} 0.25 C${n3(0.142 * V.kR)} 0.12 ${n3(0.075 * V.kR)} 0.04 0.03 0 Z`;
  const ak = acik * 0.02, b = V.bz, e = V.bzE;
  const buzgu = `M-0.027 0.006 C-0.05 -0.01 ${n3(-0.062 * b + e)} ${n3((-0.04 - ak) * b)} ${n3(-0.045 * b + e)} ${n3((-0.052 - ak) * b)} C-0.03 ${n3(-0.04 * b)} -0.02 ${n3(-0.05 * b)} ${n3(-0.008 + e)} ${n3((-0.058 - ak) * b)} C0.004 ${n3(-0.046 * b)} 0.016 ${n3(-0.05 * b)} ${n3(0.028 * b + e)} ${n3((-0.056 - ak) * b)} C0.04 ${n3(-0.04 * b)} ${n3(0.06 * b + e)} ${n3((-0.044 - ak) * b)} 0.05 -0.03 C0.044 -0.012 0.034 -0.004 0.027 0.006 Z`;
  const yon = isikSol ? -1 : 1, sw = K / (pxm * s);
  return (
    <g transform={`translate(${p[0]} ${p[1]}) scale(${pxm * s}) rotate(${aci} 0 ${0.25}) translate(0 ${y0 / s})`}>
      <defs><clipPath id={uid}><path d={govde} /></clipPath></defs>
      {ip && <line x1={0} y1={0} x2={0} y2={-y0 / s - 0.01} stroke={PAL.torbaIp} strokeWidth={Math.max(0.01, 2.2 / (pxm * s))} />}
      <path d={govde} fill={PAL.torbaOrta} />
      <g clipPath={`url(#${uid})`}>
        <ellipse cx={yon * 0.055} cy={0.2} rx={0.085} ry={0.2} fill={PAL.torbaIsik} />
        <path d={`M${-yon * 0.06} 0 C${-yon * 0.16} 0.15 ${-yon * 0.14} 0.33 ${-yon * 0.04} 0.42 L${-yon * 0.3} 0.42 L${-yon * 0.3} 0 Z`} fill={PAL.torbaGolge} />
        {[0, 1, 2].map((i) => <path key={i} d={`M${-yon * (0.07 + i * 0.02)} 0.12 Q${-yon * (0.1 + i * 0.022)} 0.25 ${-yon * (0.06 + i * 0.02)} 0.38`} fill="none" stroke="#5d5470" strokeWidth={Math.max(0.005, 2 / (pxm * s))} />)}
        <path d={`M${yon * 0.01} 0.03 Q${yon * 0.03} 0.12 ${yon * 0.012} 0.2`} fill="none" stroke="#8a7f88" strokeWidth={Math.max(0.004, 1.5 / (pxm * s))} />
      </g>
      <path d={govde} fill="none" stroke="#5a4e5a" strokeWidth={sw} strokeLinejoin="round" />
      <path d={buzgu} fill={PAL.torbaIsik} stroke="#5a4e5a" strokeWidth={sw * 0.8} strokeLinejoin="round" /><path d="M-0.012 -0.004 L-0.02 -0.04 M0.012 -0.004 L0.016 -0.042" stroke="#8a7f88" strokeWidth={sw * 0.5} />
      <rect x={-0.034 + V.bag} y={-0.008 + V.bag} width={0.068 - V.bag} height={0.02} rx={0.008} fill={PAL.torbaIp} stroke="#5a4e5a" strokeWidth={sw * 0.5} />
    </g>
  );
};

// ---------------------------------------------------------------- SANDIK ----------------------------------------------------------------
export const SANDIK = { en: 0.7, derin: 0.45, boy: 0.45 };
export const Sandik: React.FC<{ k: Kam; X: number; h: number; Z: number; yaw: number; kontur?: number }> = ({ k, X, h, Z, yaw, kontur = 4 }) => {
  const v = kutu(X, Z, SANDIK.en, SANDIK.derin, h, h + SANDIK.boy, yaw).map((q) => pr(k, ...q));
  const [a0, b0, c0, d0, a1, b1, c1, d1] = v; // alt FL FR BR BL, üst FL FR BR BL
  const ust = k.e > h + SANDIK.boy;
  const ppm = pxmK(k, Z);
  const sv = (A: P, B: P, t: number): P => [lerp(A[0], B[0], t), lerp(A[1], B[1], t)];
  return (
    <g strokeLinejoin="round">
      <polygon points={pts([d0, a0, a1, d1])} fill={PAL.sandikIsik} stroke={PAL.sandikDerin} strokeWidth={kontur} />
      <polygon points={pts([a0, b0, b1, a1])} fill={PAL.sandikOn} stroke={PAL.sandikDerin} strokeWidth={kontur} />
      {[0.33, 0.66].map((t) => { const p0 = sv(a0, b0, t), p1 = sv(a1, b1, t); return <line key={t} x1={p0[0]} y1={p0[1]} x2={p1[0]} y2={p1[1]} stroke={PAL.sandikDerin} strokeWidth={Math.max(1.5, ppm * 0.006)} />; })}
      {/* köşe demir bantları */}
      {[[a0, a1, b0, b1, 0.06], [b0, b1, a0, a1, 0.06]].map(([p0, p1, q0, q1, w], i) => { const A = sv(p0 as P, q0 as P, 0), B = sv(p0 as P, q0 as P, w as number), C = sv(p1 as P, q1 as P, w as number), D = sv(p1 as P, q1 as P, 0); return <polygon key={i} points={pts([A, B, C, D])} fill={PAL.demir} />; })}
      {ust && <polygon points={pts([a1, b1, c1, d1])} fill={PAL.sandikIsik} stroke={PAL.sandikDerin} strokeWidth={kontur} />}
      {ust && <path d={`M${d1[0]} ${d1[1]}L${a1[0]} ${a1[1]}`} stroke={PAL.kenar} strokeWidth={2} />}
      {/* yan kulp (sol yüz, ip halka) */}
      {(() => { const m = sv(sv(d0, a0, 0.5), sv(d1, a1, 0.5), 0.72), r = ppm * 0.05; return <path d={`M${m[0] - r} ${m[1]}q${r} ${-r * 1.1} ${2 * r} 0`} fill="none" stroke={PAL.kulp} strokeWidth={Math.max(2, ppm * 0.012)} />; })()}
      {(() => { const m = sv(sv(b0, c0, 0.5), sv(b1, c1, 0.5), 0.72), r = ppm * 0.04; return <path d={`M${m[0] - r} ${m[1]}q${r} ${-r * 1.1} ${2 * r} 0`} fill="none" stroke={PAL.kulp} strokeWidth={Math.max(2, ppm * 0.01)} />; })()}
    </g>
  );
};
/** sandığın yan kulp noktaları (dünya) — yükleyicinin eli buraya */
export const sandikKulp = (X: number, h: number, Z: number, yaw: number): [V3, V3] => {
  const r = (yaw * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r), hh = h + SANDIK.boy * 0.72;
  const L = (x: number, z: number): V3 => [X + x * c - z * s, hh, Z + x * s + z * c];
  return [L(-SANDIK.en / 2 - 0.02, 0), L(SANDIK.en / 2 + 0.02, 0)];
};
export { sat };

// ---------------------------------------------------------------- ZARF, ALTTAN GÖRÜNÜŞ (P06b f168; mekanlar H2.5) ----------------------------------------------------------------
type V3b = [number, number, number];
const v3 = { s: (a: V3b, b: V3b): V3b => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], d: (a: V3b, b: V3b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], k: (a: V3b, b: V3b): V3b => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]], n: (a: V3b): V3b => { const l = Math.hypot(...a) || 1; return [a[0] / l, a[1] / l, a[2] / l]; } };
/** Kameranın hemen üstündeki dolu zarf (aynı Balon dili): siluet = tanjant konisinin izdüşümü (sabit elips değil).
 *  Ağzın güneşi alt-arka yayı aydınlatır → ışık hilali (+ vernik çizgisi) · terminatör bandı (78° tarama) · gölge gövde.
 *  Ağ: meridyenler alt kutuptan dışa (ışınsal) + h 4.5 paraleli; görünür (kameraya dönük) kısımlar. Boğaz kumaş tüpü zarfın önünde. */
export const BalonAltan: React.FC<{ k: Kam; c: V3b; r: number; hilal?: number; paralelH?: number }> = ({ k, c, r, hilal = 40, paralelH = 4.5 }) => {
  const uid = "ba" + useId().replace(/:/g, "");
  const C: V3b = [k.X, k.e, k.Z], v = v3.s(c, C), d = Math.hypot(...v), u = v3.n(v);
  const e1 = v3.n(v3.k(u, [0, 1, 0])), e2 = v3.n(v3.k(e1, u));
  const tc: V3b = [c[0] - u[0] * (r * r) / d, c[1] - u[1] * (r * r) / d, c[2] - u[2] * (r * r) / d], rho = r * Math.sqrt(Math.max(0, 1 - (r * r) / (d * d)));
  const ham: V3b[] = Array.from({ length: 220 }, (_, i) => { const a = (i / 220) * Math.PI * 2; return [0, 1, 2].map((j) => tc[j] + rho * (e1[j] * Math.cos(a) + e2[j] * Math.sin(a))) as V3b; });
  const kirpZ = k.Z + 0.35;
  const kirpik: V3b[] = [];
  for (let i = 0; i < ham.length; i++) { const A = ham[i], B = ham[(i + 1) % ham.length], fa = A[2] - kirpZ, fb = B[2] - kirpZ; if (fa >= 0) kirpik.push(A); if ((fa >= 0) !== (fb >= 0)) { const t = fa / (fa - fb); kirpik.push([A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, kirpZ]); } }
  const sil = kirpik.map((q) => { const p = pr(k, ...q); return [Math.max(-3000, Math.min(4000, p[0])), Math.max(-6000, p[1])] as P; });
  const silD = yolKapali(sil);
  const kayik = (dy: number) => `translate(0 ${-dy})`;
  // küre noktası (alt kutuptan θ, boylam φ) ve görünürlük (kameraya dönük yüz)
  const nokta = (th: number, ph: number): { p: P; v: boolean } => { const q: V3b = [c[0] + r * Math.sin(th) * Math.cos(ph), c[1] - r * Math.cos(th), c[2] + r * Math.sin(th) * Math.sin(ph)]; const nrm = v3.s(q, c); return { p: pr(k, ...q), v: q[2] > kirpZ && v3.d(v3.s(q, C), nrm) < 0 }; };
  const ag: string[] = [];
  const thP = Math.acos(Math.max(-1, Math.min(1, (c[1] - paralelH) / r)));
  for (let i = 0; i < 16; i++) {
    const ph = (i / 16) * Math.PI * 2 + 0.16, seg: P[] = [];
    for (let j = 0; j <= 40; j++) { const q = nokta(0.16 + (j / 40) * (Math.PI * 0.62), ph); if (q.v) seg.push(q.p); else if (seg.length) break; }
    if (seg.length > 1) ag.push(yolAcik(seg));
  }
  { const seg: P[] = []; for (let j = 0; j <= 120; j++) { const q = nokta(thP, (j / 120) * Math.PI * 2); if (q.v) seg.push(q.p); else if (seg.length > 1) { ag.push(yolAcik(seg)); seg.length = 0; } else seg.length = 0; } if (seg.length > 1) ag.push(yolAcik(seg)); }
  const yay = sil.filter((q) => q[1] > -200).sort((a, b) => a[0] - b[0]);
  const tarama = <pattern id={`${uid}t`} patternUnits="userSpaceOnUse" width={7} height={7} patternTransform="rotate(-12)"><rect x={0} y={0} width={2.5} height={7} fill={PAL.balonTarama} /></pattern>;
  return (
    <g>
      <defs>
        <clipPath id={`${uid}c`}><path d={silD} /></clipPath>
        {tarama}
        <mask id={`${uid}h`} maskUnits="userSpaceOnUse" x={-3000} y={-6000} width={8000} height={9000}><path d={silD} fill="#fff" /><path d={silD} fill="#000" transform={kayik(hilal)} /></mask>
      </defs>
      <g clipPath={`url(#${uid}c)`}>
        <path d={silD} fill={PAL.balonIsik} />
        <path d={silD} fill={PAL.terminator} transform={kayik(hilal)} />
        <path d={silD} fill={`url(#${uid}t)`} transform={kayik(hilal)} opacity={0.8} />
        <path d={silD} fill={PAL.balonGolge} transform={kayik(hilal + 24)} />
        {/* vernik çizgisi: hilalin içinde, yaya koşut */}
        <path d={yolAcik(yay)} fill="none" stroke={PAL.vernik} strokeWidth={2} transform={`translate(0 ${-hilal * 0.45})`} />
        <path d={ag.join("")} fill="none" stroke={PAL.agGolge} strokeWidth={2.5} strokeLinecap="round" />
        <path d={ag.join("")} fill="none" stroke={PAL.agIsik} strokeWidth={2.5} strokeLinecap="round" mask={`url(#${uid}h)`} />
      </g>
      <path d={silD} fill="none" stroke={PAL.konturGolge} strokeWidth={3.5} strokeLinejoin="round" />
    </g>
  );
};
/** ağın alt paralel düğümleri (görünür) — halka askı halatları bunlara bağlanır */
export const balonAltDugum = (k: Kam, c: V3b, r: number, h: number, n = 10): V3b[] => {
  const C: V3b = [k.X, k.e, k.Z], th = Math.acos(Math.max(-1, Math.min(1, (c[1] - h) / r)));
  return Array.from({ length: n }, (_, i) => { const ph = (i / n) * Math.PI * 2 + 0.16; return [c[0] + r * Math.sin(th) * Math.cos(ph), h, c[2] + r * Math.sin(th) * Math.sin(ph)] as V3b; }).filter((q) => q[2] > k.Z + 0.35 && v3.d(v3.s(q, C), v3.s(q, c)) < 0);
};
