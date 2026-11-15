// ===== Ben-my-Chree ortak çizim dili (tasarim.md §1–2, mekanlar.md §0) =====
// Tek ışık: güneş az 235°, yükseklik plana göre (22→6°). Kamera yönü b → ekranda rel = (235 − b) mod 360.
// Rüzgâr tek vektör: 335°'ye doğru → ekran bileşeni sin(335 − b) (+ sağa). Seed'ler plaka/dünya koordinatına bağlı (kare değil).
// Sahne C* ≤ 28, L* ≤ 88; tek doygun sıcak = KOR (alev, parıltı, çakım).
import React, { useId } from "react";
import { random } from "remotion";
import { fluSigma, Kam25, plaka } from "../../kamera25d";

export type P2 = [number, number];
export const BP = {
  gokA: ["#7389b2", "#8fa3c8", // tepe #6c86b8 → #7389b2 (C* 30 → 26; sahne C* ≤ 28)
    "#b3bcd2", "#e4c4b8", "#ecc9b4"], // alt basamak #dbc6cc → #e4c4b8 (h≈45°, sıcak ölçüt; C* ≈ 13)
  gokB: ["#6679ae", "#8c93bd", "#b5aec6", "#e0c0c2", "#efc0a6"],
  gokC: ["#4a4e7a", "#6f6a9c", "#a88aa6", "#cf9ea4", "#eeb89c"],
  bulut: "#ecd4c8", bulutGolge: "#9a94b4", kenar: "#eec5a2", kenarC: "#e4b496",
  suYol: "#e6c498",  su: "#5f7fa6", suGolge: "#4c5780", suDerin: "#46628a", kopuk: "#e6dac6", kopukGolge: "#9aa6c0", siçrama: "#f3d9b6",
  tasIsik: "#d9b99a", tasOrta: "#b89a86", tasGolge: "#6f6488", tasDerin: "#4a4468", oyuk: "#2e2a44", toprak: "#a07e6a",
  maki: "#8c9272", makiGolge: "#5f6c90", ot: "#a39a78",
  ev: ["#d9c3a0", "#d4a99a", "#c9b38a", "#a9b4bc", "#e0d2b8"], cati: "#a8826e", kepenk: "#7a8a90", evGolge: "#5f5a78",
  bayrak: ["#5d6b96", "#e3d8c6", "#b9766e"], sirt: ["#9aa4c0", "#8f9bb8", "#7886a8", "#5f6c90"], sirtBant: "#e0b898", bugu: "#e2cfc6",
  govde: "#b3aeb0", govdeOrta: "#8c8894", govdeGolge: "#5a5670", ust: "#b9b4b4", ustGolge: "#6a6683", baca: "#4b4a5a", direk: "#3e3b52",
  bumba: "#4b4a5a", halat: "#7a6a58", guverte: "#a8896c", guverteGolge: "#6a5a68", duvar: "#9a96a2", duvarGolge: "#6a6683",
  kapi: "#7a768a", kapiCerceve: "#4b4a5a", bot: "#b79877", botIc: "#8a7260", demir: "#4c4a60", demirIsik: "#a8a2b4",
  duman: "#b5a9ae", dumanGolge: "#5e566e", dumanCekirdek: "#3a3450", dumanAlt: "#e0b090",
  alevDis: "#d9501f", alevOrta: "#f58a2e", alevCekirdek: "#ffd48a", alevKontur: "#3a2c36", havuz: "#e4b296", parilti: "#ffcf7a", cakim: "#ffe0a0",
  murekkep: "#1c1915", kontur: "#2f2d46",
};
export const BMC_SEED = { liman: 181, gemiInsert: 191, kiyiBatarya: 193 };
export const rr = (k: string | number) => random(`bmc:${k}`);
export const pts = (a: P2[]) => a.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(" ");
/** yumuşak kapalı/açık yol (Catmull-Rom → Bezier) */
export const egriYol = (a: P2[], kapali = true) => {
  const n = a.length; if (n < 3) return `M${pts(a)}`;
  const g = (i: number) => a[kapali ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
  let d = `M${a[0][0].toFixed(1)},${a[0][1].toFixed(1)}`;
  for (let i = 0; i < (kapali ? n : n - 1); i++) {
    const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)},${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)},${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return kapali ? d + " Z" : d;
};
/** kırık kenar: a→b arasında seed'li sapmalı nokta dizisi */
export const kirik = (a: P2, b: P2, n: number, genlik: number, seed: string): P2[] => {
  const o: P2[] = []; const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
  for (let i = 0; i <= n; i++) { const t = i / n, j = i === 0 || i === n ? 0 : (rr(`${seed}${i}`) - 0.5) * 2 * genlik; o.push([a[0] + dx * t + nx * j, a[1] + dy * t + ny * j]); }
  return o;
};

/** ışık durumu: güneş yüksekliği → gök sütunu */
export const gokSutun = (h: number) => (h >= 18 ? BP.gokA : h >= 12 ? BP.gokB : BP.gokC);
/** kamera yönü b için güneşin ekran yönü (rel; 0 = karşıda, 90 sağda) ve rüzgâr ekran bileşeni */
export const relIsik = (b: number) => (((235 - b) % 360) + 360) % 360;
export const ruzgar = (b: number) => Math.sin(((335 - b) * Math.PI) / 180);

// ---------- bulanıklık + plaka sarmalayıcı ----------
/** Gauss bulanıklığı EKRAN koordinatında (dönüşüm iç grupta → σ ölçeklenmez) */
export const Flu: React.FC<{ s: number; children: React.ReactNode }> = ({ s, children }) => {
  const id = useId().replace(/:/g, "");
  if (s < 0.35) return <g>{children}</g>;
  return (
    <g>
      <defs><filter id={`f${id}`} filterUnits="userSpaceOnUse" x={-400} y={-400} width={1880} height={2720} colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation={s.toFixed(2)} /></filter></defs>
      <g filter={`url(#f${id})`}>{children}</g>
    </g>
  );
};
/** Plaka katmanı: ref kamerada px ile çizilir, z derinliğinde; bulanıklık = optik (z, odak, N) + atmosfer (ek σ) */
export const Katman: React.FC<{ r: Kam25; k: Kam25; z: number; ek?: number; maks?: number; children: React.ReactNode }> = ({ r, k, z, ek = 0, maks = 16, children }) => {
  const P = plaka(r, k, z);
  if (!P.gorunur) return null;
  return <Flu s={Math.hypot(fluSigma(k, P.z, maks), ek)}><g transform={P.m}>{children}</g></Flu>;
};

// ---------- litografi gök: 5 düz basamak + sınır altı ince çizgiler + stipple ----------
export const Gok5: React.FC<{ sinir: number[]; renk: string[]; x0?: number; x1?: number; y0?: number; seed: number }> = ({ sinir, renk, x0 = -300, x1 = 1380, y0 = -600, seed }) => {
  // sinir: 4 sınır y (yukarıdan aşağı); renk 5 ton (tepe → ufuk)
  const ys = [y0, ...sinir, 2600];
  return (
    <g>
      {renk.map((c, i) => <rect key={i} x={x0} y={ys[i]} width={x1 - x0} height={ys[i + 1] - ys[i] + 1} fill={c} />)}
      {sinir.map((y, i) => [0, 1, 2].map((j) => <line key={`${i}${j}`} x1={x0} x2={x1} y1={y + 5 + j * 7} y2={y + 5 + j * 7} stroke={renk[i]} strokeWidth={2.5} opacity={0.38 - j * 0.09} />))}
      {Array.from({ length: 140 }).map((_, i) => { const x = x0 + rr(`gs${seed}x${i}`) * (x1 - x0), b = Math.floor(rr(`gs${seed}b${i}`) * 4), y = sinir[b] + 3 + rr(`gs${seed}y${i}`) * 22;
        return <circle key={`s${i}`} cx={x} cy={y} r={1.4} fill={renk[b]} opacity={0.5} />; })}
    </g>
  );
};

// ---------- tarama: bir çokgenin içine θ açılı paralel çizgiler (clip) ----------
export const Tara: React.FC<{ d: string; aci: number; aralik: number; kalin: number; renk: string; alfa?: number; kutu: [number, number, number, number] }> = ({ d, aci, aralik, kalin, renk, alfa = 0.55, kutu }) => {
  const id = useId().replace(/:/g, "");
  const [x0, y0, x1, y1] = kutu, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, R = Math.hypot(x1 - x0, y1 - y0) / 2 + aralik;
  const n = Math.ceil((2 * R) / aralik);
  return (
    <g>
      <defs><clipPath id={`t${id}`}><path d={d} /></clipPath></defs>
      <g clipPath={`url(#t${id})`}><g transform={`rotate(${-aci} ${cx} ${cy})`}>
        {Array.from({ length: n }).map((_, i) => <line key={i} x1={cx - R} x2={cx + R} y1={cy - R + i * aralik} y2={cy - R + i * aralik} stroke={renk} strokeWidth={kalin} opacity={alfa} />)}
      </g></g>
    </g>
  );
};

// ---------- duman sütunu (gravür lob kümesi; yükselir, rüzgârla yatar, kadraj üstünden çıkar — fade yok) ----------
export type DumanAyar = { taban: P2; t: number; hiz: number; genis0: number; genis1: number; ruz: number; seed: string; boy: number; isikSag?: boolean; altIsik?: boolean; yogun?: number };
export const Duman: React.FC<DumanAyar> = ({ taban, t, hiz, genis0, genis1, ruz, seed, boy, isikSag = true, altIsik, yogun = 1 }) => {
  // loblar sabit aralıkla taban'dan doğar (dünyaya bağlı dizi: lob i'nin doğum zamanı i·dt), yaşlandıkça yükselir ve büyür
  const dt = 0.22 / yogun, n = Math.ceil((t + boy / hiz) / dt) + 1, L: { c: P2; r: number; i: number }[] = [];
  for (let i = 0; i < n; i++) {
    const yas = t - i * dt + boy / hiz; // önceden yükselmiş sütun (plan başında duman zaten var) için ofset
    if (yas < 0) continue;
    const yuk = yas * hiz; if (yuk > boy + 400) continue;
    const f = Math.min(1, yuk / boy), r = (genis0 + (genis1 - genis0) * f) * (0.55 + 0.45 * rr(`${seed}r${i}`));
    const dx = 0.6 * ruz * (yuk / hiz) ** 2 * 18 + (rr(`${seed}x${i}`) - 0.5) * r * 0.9;
    L.push({ c: [taban[0] + dx, taban[1] - yuk], r, i });
  }
  const sx = isikSag ? 1 : -1;
  return (
    <g>
      {L.map((l) => <circle key={`o${l.i}`} cx={l.c[0]} cy={l.c[1]} r={l.r + 3} fill={BP.dumanCekirdek} />)}
      {L.map((l) => <circle key={`g${l.i}`} cx={l.c[0]} cy={l.c[1]} r={l.r} fill={BP.dumanGolge} />)}
      {L.map((l) => <circle key={`i${l.i}`} cx={l.c[0] + sx * l.r * 0.28} cy={l.c[1] - l.r * 0.3} r={l.r * 0.66} fill={BP.duman} />)}
      {L.map((l) => <path key={`k${l.i}`} d={`M${l.c[0] + sx * l.r * 0.2},${l.c[1] - l.r * 0.94} A${l.r * 0.95},${l.r * 0.95} 0 0 ${isikSag ? 1 : 0} ${l.c[0] + sx * l.r * 0.93},${l.c[1] - l.r * 0.12}`} stroke={BP.kenar} strokeWidth={Math.max(2, l.r * 0.05)} fill="none" />)}
      {L.map((l) => [0, 1, 2].map((j) => <line key={`t${l.i}${j}`} x1={l.c[0] - sx * l.r * (0.75 - j * 0.12)} y1={l.c[1] + l.r * (0.05 + j * 0.2)} x2={l.c[0] - sx * l.r * (0.2 - j * 0.1)} y2={l.c[1] + l.r * (0.35 + j * 0.2)} stroke={BP.dumanCekirdek} strokeWidth={Math.max(1.6, l.r * 0.04)} opacity={0.6} />))}
      {altIsik && L.filter((l) => l.c[1] > taban[1] - boy * 0.5).map((l) => <path key={`a${l.i}`} d={`M${l.c[0] - l.r * 0.85},${l.c[1] + l.r * 0.25} A${l.r},${l.r} 0 0 0 ${l.c[0] + l.r * 0.85},${l.c[1] + l.r * 0.25}`} stroke={BP.dumanAlt} strokeWidth={Math.max(3, l.r * 0.16)} fill="none" opacity={0.85} />)}
    </g>
  );
};

// ---------- alev (imza KOR): 3 katman yaprak, uç rüzgârla kıvrık; yıldız/kıvılcım yok ----------
export const Alev: React.FC<{ taban: P2; gen: number; boy: number; t: number; ruz: number; seed: string; n?: number; kontur?: number; konturRenk?: string }> = ({ taban, gen, boy, t, ruz, seed, n = 6, kontur = 2.5, konturRenk = BP.alevKontur }) => {
  const yaprak = (i: number, k: number) => {
    const u = n === 1 ? 0 : i / (n - 1) - 0.5, h = boy * (0.55 + 0.45 * rr(`${seed}h${i}`)) * (1 + 0.12 * Math.sin(t * (4 + rr(`${seed}f${i}`) * 2) * 2 * Math.PI + rr(`${seed}p${i}`) * 6)) * k;
    const w = (gen / n) * 1.5 * k, x0 = taban[0] + u * gen * 0.9, uc: P2 = [x0 + ruz * h * 0.35 + (rr(`${seed}u${i}`) - 0.5) * w * 0.6, taban[1] - h];
    return `M${x0 - w / 2},${taban[1]} C${x0 - w * 0.6},${taban[1] - h * 0.45} ${uc[0] - w * 0.35},${uc[1] + h * 0.35} ${uc[0]},${uc[1]} C${uc[0] + w * 0.1},${uc[1] + h * 0.42} ${x0 + w * 0.7},${taban[1] - h * 0.35} ${x0 + w / 2},${taban[1]} Z`;
  };
  return (
    <g strokeLinejoin="round">
      {Array.from({ length: n }).map((_, i) => <path key={`d${i}`} d={yaprak(i, 1)} fill={BP.alevDis} stroke={konturRenk} strokeWidth={kontur} />)}
      {Array.from({ length: n }).map((_, i) => <path key={`o${i}`} d={yaprak(i, 0.7)} fill={BP.alevOrta} />)}
      {Array.from({ length: n }).map((_, i) => <path key={`c${i}`} d={yaprak(i, 0.42)} fill={BP.alevCekirdek} />)}
    </g>
  );
};

/** litografi bulut şeridi: düz alt kenar, alçak tümsekli üst, sivrilen uçlar; alt gölge şeridi + üst kenar ışığı */
export const BulutSerit: React.FC<{ x0: number; x1: number; y: number; h: number; kayma?: number; seed?: string; renk?: string; golge?: string }> = ({ x0, x1, y, h, kayma = 0, seed = "b", renk = BP.bulut, golge = BP.bulutGolge }) => {
  const n = Math.max(3, Math.round((x1 - x0) / 120)), ust: P2[] = [];
  for (let i = 0; i <= n * 4; i++) { const t = i / (n * 4), x = x0 + (x1 - x0) * t, uc = Math.sin(Math.PI * t) ** 0.6;
    const tums = Math.abs(Math.sin(t * n * Math.PI + rr(`${seed}f`) * 3)) * (0.5 + 0.5 * rr(`${seed}${Math.floor(t * n)}`)); ust.push([x, y + h - h * uc * (0.45 + 0.55 * tums)]); }
  const alt: P2[] = [[x1, y + h], [x0, y + h]];
  return (
    <g transform={`translate(${kayma} 0)`}>
      <path d={`M${pts([...ust, ...alt])} Z`} fill={renk} />
      <path d={`M${pts([[x0 + (x1 - x0) * 0.04, y + h - 5], [x1 - (x1 - x0) * 0.06, y + h - 5], [x1 - (x1 - x0) * 0.03, y + h], [x0 + (x1 - x0) * 0.02, y + h]])} Z`} fill={golge} />
      <polyline points={pts(ust.slice(2, -2))} fill="none" stroke={BP.kenar} strokeWidth={2} />
    </g>
  );
};
