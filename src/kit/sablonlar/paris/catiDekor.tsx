// ===== PARIS-CATI v2 dekor modülleri (mekanlar.md §1v2, tasarim.md §13) — Haussmann SONRASI Paris çatısı, 1870 =====
// Tek dekor, tek doğrusal dolly (dolly.ts). Uzak katmanlar (gök, hale, K1–K4) DEKOR px (cs 1) + katman eşleyicisi L(d);
// yakın katmanlar (teras, kümes, sağ baca, tekne) DÜNYA modeli (X sağ, h teras üstü, Z geniş kameradan ileri; m) → dunyaEkran.
// Kemer yok (düz lento), panjur/fener/yarı ahşap yok, korniş kesintisiz; anıt: yalnız Panthéon (haçsız, yaldızsız).
// Gök: 5 düz basamak + litografi geçişi (ince yatay çizgi + tane), yumuşak gradyan YOK. Güneş diski YOK, yalnız hale (tur-5).
// TEK IŞIK: `ISIK_YON[saat]` dünya vektörü → yüz tonu (isikliYuz), kenar ışığı yanı (isikSagMi), zemin gölgesi (golgeVektor) aynı kaynaktan.
// Kılıf tekliği (tasarım §13.3): sahnede C* ≤ 28; imza kehribarı yalnız kılıfta. Kırmızı yok; sarı metal yok.
import React from "react";
import { Tarama } from "../../../doku/Tarama";
import { ink, karistir, rnd } from "../../../doku/sabitler";
import type { P } from "../../tipler";
import type { KameraDurum } from "../../zaman";
import { Dolly, dunyaEkran, enYakinZ, Katman } from "./dolly";

export type Saat = "alacakaranlik" | "gun";
export type V3 = [number, number, number];
export type CatiPalet = {
  gok: [string, string, string, string, string]; // tepe → ufuk (5 basamak)
  hale: string | null;
  k1: string; kubbe: string; kubbeG: string; k2: string; k3: string; k3Kontur: string;
  tas: string; tasG: string; tarama: string; brisis: string; brisisG: string; terrasson: string;
  cinko: string; cinkoIsik: string; cinkoG: string; kenet: string; kenetIsik: string; golge: string; golgeA: number; sicakBant: string | null;
  baca: string; bacaG: string; bacaBaslik: string; kulah: string; kulahG: string;
  pencere: string; pencereHavuz: string; pencereKaranlik: string; kasa: string;
  ahsapIsik: string; ahsap: string; ahsapG: string; damar: string; kumesCati: string; aciklik: string; celik: string;
  siluet: string; siluetKenar: string; kenar: string; duman: string | null; dumanSayi: number; isikliOran: number;
  isik: V3;
};
// mekanlar §1v2.8: kamera 230°; alacakaranlık güneşi 243°, 2° → 13° sağ, önde (kontrajur). Gün 09:00, 135°, 12° → 95° sol, hafif arkada.
export const ISIK_YON: Record<Saat, V3> = {
  alacakaranlik: [0.225, 0.035, 0.974],
  gun: [-0.974, 0.208, -0.085],
};
// çizimde gölge boyu sınırı (tasarım §13.7: ≤ 6 × yükseklik; gün 4.7 ×, gerçek değer)
const GOLGE_MAKS: Record<Saat, number> = { alacakaranlik: 6, gun: 4.7 };
/** zemin gölgesi: 1 m yüksekliğin zemindeki kayması (X, Z) — ışığın yatay tersi × min(1/tan(yükseklik), sınır) */
export const golgeVektor = (saat: Saat): [number, number] => {
  const [x, y, z] = ISIK_YON[saat], yat = Math.hypot(x, z), boy = Math.min(yat / Math.max(1e-3, y), GOLGE_MAKS[saat]);
  return [(-x / yat) * boy, (-z / yat) * boy];
};
export const isikliYuz = (C: CatiPalet, n: V3) => n[0] * C.isik[0] + n[1] * C.isik[1] + n[2] * C.isik[2] > 0;
export const isikSagMi = (C: CatiPalet) => C.isik[0] > 0;

export const CATI_PALET: Record<Saat, CatiPalet> = {
  // tasarım §13.1 (alacakaranlık v2)
  alacakaranlik: {
    // tepe/üst: tasarım #2b2f5c/#4d4a80 (C* 30/34) kılıf tekliği C* ≤ 28 için aynı L*, aynı ton, C* 25/27 (motion v2 ölçümü)
    gok: ["#2e3157", "#504e79", "#7d6a95", "#b98a9e", "#e6b5a0"], hale: "#f0cdb4",
    k1: "#a98aa0", kubbe: "#8d7899", kubbeG: "#7d6a95", k2: "#8d7899", k3: "#6d6384", k3Kontur: "#4e4a68",
    tas: "#6f6684", tasG: "#4e4a68", tarama: "#2f2d46", brisis: "#6d6384", brisisG: "#3e3b5c", terrasson: "#7a6f92",
    cinko: "#5b5878", cinkoIsik: "#6d6384", cinkoG: "#3e3b5c", kenet: "#3e3b5c", kenetIsik: "#c9a0a6", golge: "#3e3b5c", golgeA: 0.82, sicakBant: "#b98a9e",
    baca: "#6f6684", bacaG: "#4e4a68", bacaBaslik: "#3e3b5c", kulah: "#8a6458", kulahG: "#4f4347",
    pencere: "#f0d2b8", pencereHavuz: "#e6b5a0", pencereKaranlik: "#2f2d46", kasa: "#3a3550",
    ahsapIsik: "#b58a6c", ahsap: "#7e5a48", ahsapG: "#4a3844", damar: "#3a2c36", kumesCati: "#5c5a7a", aciklik: "#221a26", celik: "#3a3d48",
    siluet: "#2f2d46", siluetKenar: "#d9a995", kenar: "#e6b5a0", duman: "#8d7899", dumanSayi: 3, isikliOran: 0.35,
    isik: ISIK_YON.alacakaranlik,
  },
  // gün (P10a): v1 gün gök/çatı + v2 kümes ahşabı (tasarım §13.1; mekanlar §1v2.9 — v2 gün paleti tanımlanmadı, varsayılan)
  gun: {
    gok: ["#8d9aa6", "#9ca7b0", "#aab4bc", "#c0c4c2", "#d4d2c8"], hale: null,
    k1: "#9ea4ac", kubbe: "#b4b6b6", kubbeG: "#9a9ea3", k2: "#9ea4ac", k3: "#8a919b", k3Kontur: "#6a707a",
    tas: "#d8cdb4", tasG: "#a89d86", tarama: "#7c7260", brisis: "#737b8a", brisisG: "#59606e", terrasson: "#8e949c",
    cinko: "#8e949c", cinkoIsik: "#9aa0a7", cinkoG: "#6a707a", kenet: "#565c66", kenetIsik: "#c8ccd0", golge: "#4a4c58", golgeA: 0.45, sicakBant: null,
    baca: "#c8bfa9", bacaG: "#968c78", bacaBaslik: "#5f6168", kulah: "#8e7366", kulahG: "#6b5751",
    pencere: "#6f7f8c", pencereHavuz: "#6f7f8c", pencereKaranlik: "#6f7f8c", kasa: "#3a3a4c",
    ahsapIsik: "#a8805f", ahsap: "#8c6d56", ahsapG: "#5a4638", damar: "#45362c", kumesCati: "#6a707a", aciklik: "#2a2422", celik: "#3a3d42",
    siluet: "#3a3632", siluetKenar: "#efe6cc", kenar: "#efe6cc", duman: "#9ea4ac", dumanSayi: 1, isikliOran: 0,
    isik: ISIK_YON.gun,
  },
};
const pl = (pts: P[]) => pts.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(" ");
const R4 = (T: (q: P) => P, x: number, y: number, w: number, h: number): P[] => [T([x, y]), T([x + w, y]), T([x + w, y + h]), T([x, y + h])];
export const TARAMA = { aci: 72, kalin: 2.5, aralik: 7 }; // tasarım §13.5 (tek açı, 360 px'te görünür)

// ---- Flu (yalnız kanca tarafı, mekanlar §1v2.6): σ(cs) = σ_maks · clamp((cs − 1.6)/0.8) ----
export const fluSigma = (sMaks: number, cs: number) => sMaks * Math.max(0, Math.min(1, (cs - 1.6) / 0.8));
export const Flu: React.FC<{ id: string; sigma: number; children: React.ReactNode }> = ({ id, sigma, children }) => sigma < 0.3 ? <g>{children}</g> : (
  <g>
    <defs><filter id={id} filterUnits="userSpaceOnUse" x={-200} y={-200} width={1480} height={2320}><feGaussianBlur stdDeviation={sigma} /></filter></defs>
    <g filter={`url(#${id})`}>{children}</g>
  </g>
);

// ---- 0 Gök: 5 düz basamak + litografi geçişi (sınır altında 3 ince çizgi üst bandın tonunda + tane şeridi) ----
const GOK_SINIR = [200, 380, 500, 585]; // dekor y (cs 1); son basamak ufka kadar (altı çatı denizi)
export const GokLitografi: React.FC<{ C: CatiPalet; k: KameraDurum; seed: number }> = ({ C, k, seed }) => {
  const X0 = -400, X1 = 1500, sinir = [-3000, ...GOK_SINIR, 4000];
  const parca: React.ReactNode[] = [];
  C.gok.forEach((renk, i) => parca.push(<rect key={`b${i}`} x={X0} y={sinir[i]} width={X1 - X0} height={sinir[i + 1] - sinir[i]} fill={renk} />));
  GOK_SINIR.forEach((y, i) => {
    const ust = C.gok[i];
    for (let j = 0; j < 3; j++) parca.push(<rect key={`c${i}-${j}`} x={X0} y={y + 4 + j * 7} width={X1 - X0} height={2.5} fill={ust} opacity={0.35} />);
    // tane (stipple) şeridi: 24 px, ø 2.5, yoğunluk .08 — seed sabit, kaynamaz
    const n = Math.round(((X1 - X0) * 24 * 0.08) / 14);
    for (let j = 0; j < n; j++) {
      const x = X0 + rnd(seed, `gx${i}-${j}`) * (X1 - X0), yy = y + 24 + rnd(seed, `gy${i}-${j}`) ** 1.6 * 24;
      parca.push(<circle key={`t${i}-${j}`} cx={x} cy={yy} r={1.25} fill={ust} opacity={0.35} />);
    }
  });
  return <g transform={`translate(${k.cx} ${k.cy})`}>{parca}</g>;
};

// ---- 0b Hale: iki eş merkezli düz disk, kenar net; disk/güneş YOK. Sonsuzda (yalnız cx/cy) ----
export const HALE = { merkez: [846, 640] as P, r: [130, 200], alfa: [0.55, 0.3] };
export const HaleParilti: React.FC<{ C: CatiPalet; k: KameraDurum }> = ({ C, k }) => !C.hale ? null : (
  <g transform={`translate(${k.cx} ${k.cy})`}>
    <circle cx={HALE.merkez[0]} cy={HALE.merkez[1]} r={HALE.r[1]} fill={C.hale} opacity={HALE.alfa[1]} />
    <circle cx={HALE.merkez[0]} cy={HALE.merkez[1]} r={HALE.r[0]} fill={C.hale} opacity={HALE.alfa[0]} />
  </g>
);

// ---- 1 K1 sırt (Montagne Sainte-Geneviève yükselişi) + Panthéon (×1.6 stilize; fener ucu nötr, haç yok) ----
export const K1Sirt: React.FC<{ C: CatiPalet; L: Katman; seed: number; pantheon: number | false }> = ({ C, L, seed, pantheon }) => {
  const T = L.T, pts: P[] = [[-500, 1000], [-500, 652]];
  for (let x = -500; x <= 1600; x += 22) {
    const yuk = pantheon === false ? 0 : 50 * Math.exp(-(((x - pantheon) / 260) ** 2)); // Panthéon'a doğru yükselir
    const tarak = rnd(seed, `s${x}`) < 0.45 ? 4 + rnd(seed, `h${x}`) * 6 : 0;
    const y = 650 - yuk - tarak;
    pts.push([x, y], [x + 22, y]);
  }
  pts.push([1600, 1000]);
  const P_ = pantheon === false ? null : (() => {
    const x = pantheon, s = (v: number) => x + v;
    // gövde K1 sırtının arkasından çıkar; tambur 600–540, kubbe 540–490, fener 490–470
    const govde = R4(T, s(-70), 578, 140, 60);
    const tambur = R4(T, s(-36), 540, 72, 46);
    const attik = R4(T, s(-31), 532, 62, 9);
    const kubbe = `M ${T([s(-30), 532]).join(" ")} C ${T([s(-29), 500]).join(" ")} ${T([s(-14), 488]).join(" ")} ${T([s(0), 488]).join(" ")} C ${T([s(14), 488]).join(" ")} ${T([s(29), 500]).join(" ")} ${T([s(30), 532]).join(" ")} Z`;
    const fener = R4(T, s(-4.5), 472, 9, 17);
    const kol = [-28, -18, -8, 2, 12, 22].map((v) => R4(T, s(v), 548, 4, 34));
    const g = isikSagMi(C) ? -1 : 1; // gölge yanı ışığın tersi
    const kubbeG = `M ${T([s(30 * g), 532]).join(" ")} C ${T([s(29 * g), 500]).join(" ")} ${T([s(14 * g), 488]).join(" ")} ${T([s(0), 488]).join(" ")} L ${T([s(6 * g), 532]).join(" ")} Z`;
    return (
      <g>
        <polygon points={pl(govde)} fill={C.kubbe} />
        <polygon points={pl(tambur)} fill={C.kubbe} />
        {kol.map((q, i) => <polygon key={i} points={pl(q)} fill={C.kubbeG} />)}
        <polygon points={pl(R4(T, s(g > 0 ? 18 : -36), 540, 18, 46))} fill={C.kubbeG} />
        <polygon points={pl(attik)} fill={C.kubbeG} />
        <path d={kubbe} fill={C.kubbe} />
        <path d={kubbeG} fill={C.kubbeG} />
        <polygon points={pl(fener)} fill={C.kubbe} />
        <polygon points={pl(R4(T, s(-1.5), 462, 3, 10))} fill={C.kubbe} />
      </g>
    );
  })();
  return <g>{P_}<polygon points={pl(pts.map(T))} fill={C.k1} /></g>;
};

// ---- 2–3 Çatı denizi satırı: mansard silueti (kırık çizgi + brisis eğimi) + baca tarağı; K3'te lucarne sırası ----
export type CatiSatir = { kornis: number; kirik: number; teras: number; tarak: [number, number]; bina: [number, number]; renk: string; kontur?: string; lucarne?: { ust: number; alt: number; w: number; aks: number }; seed: number };
export const CatiDenizi: React.FC<{ L: Katman; S: CatiSatir; C: CatiPalet; dumanX?: number }> = ({ L, S, C }) => {
  const T = L.T, sekil: P[] = [[-600, 1300]], ek: React.ReactNode[] = [], on: React.ReactNode[] = [];
  let x = -600, i = 0;
  const kw = S.kontur ? Math.max(1.5, 3 * Math.min(1.3, L.s)) : 0;
  while (x < 1700 && i < 80) {
    const w = S.bina[0] + rnd(S.seed, `w${i}`) * (S.bina[1] - S.bina[0]);
    const dy = Math.round((rnd(S.seed, `y${i}`) - 0.5) * 10); // bitişik bina yükseklik farkı
    const kr = S.kirik + dy, tr = S.teras + dy, kn = S.kornis + dy, egim = (kn - kr) * 0.36; // brisis 70°: kırık çizgi içeri kaçar
    void egim; void kn; void kr;
    sekil.push([x, tr], [x + w, tr]);
    // baca kümesi (ortak duvar) + külah tarağı
    const bx = x + w - 6, bh = S.tarak[0] + rnd(S.seed, `h${i}`) * (S.tarak[1] - S.tarak[0]), bw = Math.max(10, (S.kirik - S.teras) * 0.9);
    ek.push(<polygon key={`b${i}`} points={pl(R4(T, bx - bw / 2, tr - bh, bw, bh + 2))} fill={S.renk} />);
    const n = 3 + Math.floor(rnd(S.seed, `n${i}`) * 4), kw2 = bw / n;
    for (let j = 0; j < n; j++) ek.push(<polygon key={`k${i}-${j}`} points={pl(R4(T, bx - bw / 2 + j * kw2 + kw2 * 0.15, tr - bh - kw2 * 1.1, kw2 * 0.7, kw2 * 1.1))} fill={S.renk} />);
    if (S.kontur) ek.push(<line key={`kk${i}`} x1={T([bx + bw / 2, 0])[0]} y1={T([0, tr - bh])[1]} x2={T([bx + bw / 2, 0])[0]} y2={T([0, tr])[1]} stroke={C.kenar} strokeWidth={2} opacity={0.6} />);
    if (S.lucarne) {
      const Lc = S.lucarne;
      for (let ax = x + Lc.aks * 0.6; ax < x + w - Lc.aks * 0.4; ax += Lc.aks) {
        const isikli = rnd(S.seed, `l${i}-${ax.toFixed(0)}`) < C.isikliOran;
        const y0 = Lc.ust + dy, y1 = Lc.alt + dy;
        on.push(<polygon key={`lc${i}-${ax.toFixed(0)}`} points={pl([T([ax - Lc.w / 2 - 3, y0 + 4]), T([ax, y0 - 8]), T([ax + Lc.w / 2 + 3, y0 + 4]), T([ax + Lc.w / 2 + 2, y1]), T([ax - Lc.w / 2 - 2, y1])])} fill={karistir(S.renk, C.tasG, 0.25)} stroke={S.kontur} strokeWidth={kw * 0.8} strokeLinejoin="round" />);
        on.push(<polygon key={`lp${i}-${ax.toFixed(0)}`} points={pl(R4(T, ax - Lc.w / 2 + 2, y0 + 6, Lc.w - 4, y1 - y0 - 8))} fill={isikli ? C.pencere : C.pencereKaranlik} />);
        if (isikli) on.push(<ellipse key={`lh${i}-${ax.toFixed(0)}`} cx={T([ax, 0])[0]} cy={T([0, y1 + 3])[1]} rx={Lc.w * 0.9 * L.s} ry={5 * L.s} fill={C.pencereHavuz} opacity={0.22} />);
      }
    }
    x += w; i++;
  }
  sekil.push([x, 1300]);
  return (
    <g>
      {ek}
      <polygon points={pl(sekil.map(T))} fill={S.renk} stroke={S.kontur ?? "none"} strokeWidth={kw} strokeLinejoin="round" />
      {on}
    </g>
  );
};

// ---- Baca külahı (mitron): silindir + ağız elipsi; ışık/gölge yanı TEK ışık vektöründen ----
const Kulah: React.FC<{ x: number; y: number; w: number; h: number; C: CatiPalet }> = ({ x, y, w, h, C }) => {
  const sag = isikSagMi(C), kw = Math.max(1, Math.min(3, w * 0.08));
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={C.kulah} />
      <rect x={sag ? x : x + w * 0.55} y={y} width={w * 0.45} height={h} fill={C.kulahG} />
      <ellipse cx={x + w / 2} cy={y} rx={w / 2} ry={Math.max(1, w * 0.18)} fill={karistir(C.kulahG, "#1d1b26", 0.4)} />
      <path d={`M ${x} ${y} L ${x} ${y + h} L ${x + w} ${y + h} L ${x + w} ${y}`} fill="none" stroke={ink(C.kulah)} strokeWidth={kw} />
      {w > 4 && <line x1={sag ? x + w - kw : x + kw} y1={y + Math.max(1, w * 0.12)} x2={sag ? x + w - kw : x + kw} y2={y + h} stroke={C.kenar} strokeWidth={Math.max(1.5, Math.min(3, w * 0.08))} opacity={0.85} />}
    </g>
  );
};

// ---- 4 K4 karşı sıra (Z 20, dekor px/m 66.3): terrasson şeridi, brisis (arduvaz sırası 16 px), beşik çatılı lucarne, korniş + gölge bandı,
//      baca kümeleri + külah, ışıklı lucarne'larda yüzsüz siluetler. Satır değerleri mekanlar §1v2.5 ----
export const K4 = { pxm: 66.3, kulah: 843, baca: 866, terrasUst: 900, kirik: 996, lucUst: 1060, lucEsik: 1144, kornis: 1192, alt: 1260 };
export type Bina = { x0: number; x1: number; aks: number; ofset: number; dy: number };
export const K4_BINALAR: Bina[] = [
  { x0: -420, x1: 160, aks: 118, ofset: 60, dy: 6 },
  { x0: 160, x1: 520, aks: 112, ofset: 236, dy: -4 },
  { x0: 520, x1: 960, aks: 114, ofset: 600, dy: 0 },
  { x0: 960, x1: 1500, aks: 120, ofset: 1040, dy: 8 },
];
export const lucarneAkslari = (b: Bina) => { const a: number[] = []; let x = b.ofset; while (x - b.aks > b.x0 + 40) x -= b.aks; for (; x < b.x1 - 40; x += b.aks) a.push(x); return a; };
export const K4Sira: React.FC<{ C: CatiPalet; L: Katman; seed: number; saat: Saat; isikliZorunlu: number[]; kontur: boolean; cocuk?: React.ReactNode }> = ({ C, L, seed, saat, isikliZorunlu, kontur, cocuk }) => {
  const T = L.T, s = L.s, S = K4, pxm = S.pxm;
  const lw = 0.9 * pxm, kw = kontur ? Math.max(2, Math.min(5, 4 * s)) : 0;
  const ta = { aci: TARAMA.aci, kalinlik: TARAMA.kalin, aralik: TARAMA.aralik, renk: C.tarama };
  const govde: React.ReactNode[] = [], on: React.ReactNode[] = [];
  const sag = isikSagMi(C);
  K4_BINALAR.forEach((b, bi) => {
    const d = b.dy, w = b.x1 - b.x0;
    // terrasson (üstten görünür, gök ışığı alır) + kırık çizgi (yuvarlak çinko kenar, ışık) + brisis + cephe dibi (korniş altı)
    govde.push(<polygon key={`t${bi}`} points={pl(R4(T, b.x0, S.terrasUst + d, w, S.kirik - S.terrasUst))} fill={C.terrasson} />);
    for (let y = S.terrasUst + d + 18; y < S.kirik + d - 6; y += 22) govde.push(<line key={`tk${bi}-${y}`} x1={T([b.x0, y])[0]} y1={T([0, y])[1]} x2={T([b.x1, y])[0]} y2={T([0, y])[1]} stroke={C.brisisG} strokeWidth={Math.max(1, 1.2 * s)} opacity={0.35} />);
    govde.push(<polygon key={`b${bi}`} points={pl(R4(T, b.x0, S.kirik + d, w, S.kornis - S.kirik))} fill={karistir(C.brisis, C.brisisG, 0.55)} stroke={kontur ? ink(C.brisisG) : "none"} strokeWidth={kw * 0.6} />);
    for (let y = S.kirik + d + 16; y < S.kornis + d - 10; y += 16) govde.push(<line key={`a${bi}-${y}`} x1={T([b.x0, y])[0]} y1={T([0, y])[1]} x2={T([b.x1, y])[0]} y2={T([0, y])[1]} stroke={karistir(C.brisisG, C.brisis, 0.45)} strokeWidth={Math.max(1, 1.4 * s)} opacity={0.8} />);
    govde.push(<polygon key={`kr${bi}`} points={pl(R4(T, b.x0, S.kirik + d - 3, w, 5))} fill={karistir(C.terrasson, C.kenar, 0.45)} />);
    govde.push(<polygon key={`cd${bi}`} points={pl(R4(T, b.x0, S.kornis + d + 6, w, S.alt - S.kornis))} fill={karistir(C.tasG, "#1d1b26", 0.15)} />);
    lucarneAkslari(b).forEach((ax, li) => {
      const isikli = saat === "alacakaranlik" && (isikliZorunlu.some((q) => Math.abs(q - ax) < 2) || rnd(seed, `l${bi}-${li}`) < C.isikliOran);
      const x = ax - lw / 2, ust = S.lucUst + d, esik = S.lucEsik + d, cer = 5;
      // yanaklar (jouée): ışık yanı açık, gölge yanı koyu + II tarama
      const yanakSol: P[] = [T([x - cer - 9, ust]), T([x - cer, ust]), T([x - cer, esik]), T([x - cer - 2, esik])];
      const yanakSag: P[] = [T([x + lw + cer, ust]), T([x + lw + cer + 9, ust]), T([x + lw + cer + 2, esik]), T([x + lw + cer, esik])];
      const [yI, yG] = sag ? [yanakSag, yanakSol] : [yanakSol, yanakSag];
      govde.push(<polygon key={`yi${bi}-${li}`} points={pl(yI)} fill={karistir(C.brisis, C.kenar, 0.3)} stroke={kontur ? ink(C.brisis) : "none"} strokeWidth={kw * 0.6} />);
      govde.push(<polygon key={`yg${bi}-${li}`} points={pl(yG)} fill={C.brisisG} stroke={kontur ? ink(C.brisis) : "none"} strokeWidth={kw * 0.6} />);
      if (kontur) govde.push(<Tarama key={`ygt${bi}-${li}`} sekil={yG} basamak="II" aci={ta.aci} renk={ta.renk} kalinlik={ta.kalinlik} aralik={ta.aralik} seed={seed + li} />);
      govde.push(<polygon key={`ly${bi}-${li}`} points={pl(R4(T, x - cer, ust, lw + 2 * cer, esik - ust))} fill={C.tasG} stroke={kontur ? ink(C.tas) : "none"} strokeWidth={kw} />);
      // beşik çatı (arduvaz): iki yarı, mahya 20 px; ışık yarısında kenar ışığı
      const sacL: P = T([x - cer - 12, ust + 1]), sacR: P = T([x + lw + cer + 12, ust + 1]), mahya: P = T([ax, ust - 20]), orta: P = T([ax, ust + 1]);
      govde.push(<polygon key={`rc${bi}-${li}`} points={pl(sag ? [orta, mahya, sacR] : [sacL, mahya, orta])} fill={karistir(C.brisis, C.kenar, 0.18)} />);
      govde.push(<polygon key={`rg${bi}-${li}`} points={pl(sag ? [sacL, mahya, orta] : [orta, mahya, sacR])} fill={C.brisisG} />);
      if (kontur) govde.push(<polygon key={`ro${bi}-${li}`} points={pl([sacL, mahya, sacR])} fill="none" stroke={ink(C.brisis)} strokeWidth={kw} strokeLinejoin="round" />);
      govde.push(<line key={`rk${bi}-${li}`} x1={mahya[0]} y1={mahya[1]} x2={(sag ? sacR : sacL)[0]} y2={(sag ? sacR : sacL)[1]} stroke={C.kenar} strokeWidth={2} />);
      govde.push(<polygon key={`rs${bi}-${li}`} points={pl(R4(T, x - cer, ust + 1, lw + 2 * cer, 5))} fill={C.tasG} />);
      govde.push(<polygon key={`lp${bi}-${li}`} points={pl(R4(T, x, ust + 6, lw, esik - ust - 8))} fill={isikli ? C.pencere : C.pencereKaranlik} />);
      govde.push(<polygon key={`le${bi}-${li}`} points={pl(R4(T, x - cer - 3, esik - 1, lw + 2 * cer + 6, 5))} fill={C.tasG} stroke={kontur ? ink(C.tas) : "none"} strokeWidth={kw * 0.6} />);
      govde.push(<line key={`lek${bi}-${li}`} x1={T([x - cer - 3, 0])[0]} y1={T([0, esik - 1])[1]} x2={T([x + lw + cer + 3, 0])[0]} y2={T([0, esik - 1])[1]} stroke={C.kenar} strokeWidth={1.8} opacity={0.7} />);
      if (isikli) on.push(<ellipse key={`h${bi}-${li}`} cx={T([ax, 0])[0]} cy={T([0, esik + 6])[1]} rx={0.75 * lw * s} ry={7 * s} fill={C.pencereHavuz} opacity={0.22} />);
      on.push(<g key={`lk${bi}-${li}`}><line x1={T([ax, 0])[0]} y1={T([0, ust + 6])[1]} x2={T([ax, 0])[0]} y2={T([0, esik - 2])[1]} stroke={C.kasa} strokeWidth={Math.max(1.6, 1.8 * s)} /><line x1={T([x, 0])[0]} y1={T([0, ust + 34])[1]} x2={T([x + lw, 0])[0]} y2={T([0, ust + 34])[1]} stroke={C.kasa} strokeWidth={Math.max(1.6, 1.8 * s)} /></g>);
    });
    // korniş: ışık alan üst profil + profil çizgisi + altında 28 px gölge bandı (II tarama)
    const band = R4(T, b.x0, S.kornis + d + 6, w, 28);
    govde.push(<polygon key={`kb${bi}`} points={pl(band)} fill={karistir(C.tasG, "#1d1b26", 0.3)} />);
    if (kontur) govde.push(<Tarama key={`kt${bi}`} sekil={band} basamak="II" aci={ta.aci} renk={ta.renk} kalinlik={ta.kalinlik} aralik={ta.aralik} seed={seed + 50 + bi} />);
    govde.push(<polygon key={`kl${bi}`} points={pl(R4(T, b.x0, S.kornis + d - 6, w, 12))} fill={C.tas} stroke={kontur ? ink(C.tas) : "none"} strokeWidth={kw * 0.8} />);
    govde.push(<line key={`kk${bi}`} x1={T([b.x0, 0])[0]} y1={T([0, S.kornis + d - 5])[1]} x2={T([b.x1, 0])[0]} y2={T([0, S.kornis + d - 5])[1]} stroke={C.kenar} strokeWidth={2} opacity={0.8} />);
  });
  // baca kümeleri (ortak duvarlarda + bina ortasında bir tane): gövde 866–terrasson, külah 843–866
  const bacalar = [...K4_BINALAR.map((b) => b.x0 + 8), K4_BINALAR[K4_BINALAR.length - 1].x1, 700, 1260];
  bacalar.forEach((bx, i) => {
    const w = 46 + rnd(seed, `bw${i}`) * 16, x = bx - w / 2, ust = S.baca + Math.round((rnd(seed, `by${i}`) - 0.5) * 8), alt = S.terrasUst + 30;
    const yanW = w * 0.22;
    govde.push(<polygon key={`bg${i}`} points={pl(R4(T, x, ust, w, alt - ust))} fill={isikliYuz(C, [0, 0, -1]) ? C.baca : C.bacaG} stroke={kontur ? ink(C.baca) : "none"} strokeWidth={kw} />);
    govde.push(<polygon key={`bs${i}`} points={pl(R4(T, sag ? x + w - yanW : x, ust, yanW, alt - ust))} fill={isikliYuz(C, [sag ? 1 : -1, 0, 0]) ? C.baca : karistir(C.bacaG, "#1d1b26", 0.2)} />);
    if (kontur && !isikliYuz(C, [0, 0, -1])) govde.push(<Tarama key={`bt${i}`} sekil={R4(T, sag ? x : x + yanW, ust + 6, w - yanW, alt - ust - 6)} basamak="II" aci={ta.aci} renk={ta.renk} kalinlik={ta.kalinlik} aralik={ta.aralik} seed={seed + 80 + i} alfaCarpan={0.6} />);
    govde.push(<line key={`bk${i}`} x1={T([sag ? x + w : x, 0])[0]} y1={T([0, ust])[1]} x2={T([sag ? x + w : x, 0])[0]} y2={T([0, alt])[1]} stroke={C.kenar} strokeWidth={2.2} />);
    govde.push(<polygon key={`bb${i}`} points={pl(R4(T, x - 2, ust - 4, w + 4, 6))} fill={C.bacaBaslik} />);
    const n = 5 + Math.floor(rnd(seed, `bn${i}`) * 4), kw2 = (w - 4) / n;
    for (let j = 0; j < n; j++) {
      const kh = 18 + rnd(seed, `kh${i}-${j}`) * 7, kx = x + 2 + j * kw2;
      govde.push(<Kulah key={`ku${i}-${j}`} x={T([kx, 0])[0]} y={T([0, ust - 4 - kh])[1]} w={kw2 * 0.8 * s} h={kh * s} C={C} />);
    }
  });
  return <g>{govde}{on}{cocuk}</g>;
};

// ---- Duman: kontursuz şerit, yukarı incelir, kümeler hâlinde ÇÖZÜLEREK biter (fade yok); rüzgâr hafif sağa, faz 0.15 Hz ----
export const Duman: React.FC<{ L: Katman; kaynak: P; boy: number; kalin: number; renk: string; seed: number; t: number }> = ({ L, kaynak, boy, kalin, renk, seed, t }) => {
  const n = 22, parca: React.ReactNode[] = [];
  const faz = 2 * Math.PI * 0.15 * (t / 60);
  const nokta = (u: number): P => [kaynak[0] + u * u * boy * 0.45 + Math.sin(u * 7.5 + faz + seed) * 9 * u * (kalin / 6), kaynak[1] - u * boy];
  const yol: P[] = [];
  for (let i = 0; i <= Math.round(n * 0.62); i++) yol.push(L.T(nokta(i / n)));
  // gövde: incelen şerit (iki segment grubu)
  for (let i = 1; i < yol.length; i++) {
    const w = kalin * (1 - (i / n) * 0.9) * L.s;
    parca.push(<line key={`s${i}`} x1={yol[i - 1][0]} y1={yol[i - 1][1]} x2={yol[i][0]} y2={yol[i][1]} stroke={renk} strokeWidth={Math.max(1.2, w)} strokeLinecap="round" />);
  }
  // çözülme: üst uçta küçülen kümeler (seed sabit, yerleri yukarı kayar → hareket, fade değil)
  for (let j = 0; j < 7; j++) {
    const u = 0.64 + j * 0.05 + ((t / 60) * 0.02) % 0.05;
    const q = L.T(nokta(u)), r = Math.max(0.8, kalin * 0.5 * (1 - (u - 0.62) / 0.4)) * L.s;
    parca.push(<circle key={`c${j}`} cx={q[0] + (rnd(seed, `dx${j}`) - 0.5) * 8 * L.s} cy={q[1]} r={r} fill={renk} />);
  }
  return <g opacity={0.6}>{parca}</g>;
};

// ===== Dünya modeli yardımcıları =====
// 3B çokgen yakın düzlemde (Z ≥ Zn) kırpılır (Sutherland–Hodgman), sonra izdüşülür. Tamamı arkadaysa null.
export const kirpCiz = (D: Dolly, k: KameraDurum, pts: V3[], Zn?: number): P[] | null => {
  const zn = Zn ?? enYakinZ(D, k) + 0.01;
  const out: V3[] = [];
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length], ai = a[2] >= zn, bi = b[2] >= zn;
    if (ai) out.push(a);
    if (ai !== bi) { const t = (zn - a[2]) / (b[2] - a[2]); out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, zn]); }
  }
  if (out.length < 3) return null;
  const e = out.map(([X, h, Z]) => dunyaEkran(D, k, X, h, Z));
  return e.some((q) => !q) ? null : (e as P[]);
};
/** zemin gölgesi: nesne köşeleri (X,h,Z) → zemine izdüşüm (gölge vektörü × h) → dışbükey zarf → kırpılmış ekran çokgeni */
export const golgeCokgen = (D: Dolly, k: KameraDurum, saat: Saat, kose: V3[]): P[] | null => {
  const g = golgeVektor(saat);
  const pts = kose.map(([X, h, Z]) => [X + g[0] * h, Z + g[1] * h] as P);
  const s = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cr = (o: P, a: P, b: P) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo: P[] = [], up: P[] = [];
  for (const q of s) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
  for (const q of [...s].reverse()) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); }
  const zarf = [...lo.slice(0, -1), ...up.slice(0, -1)];
  return kirpCiz(D, k, zarf.map(([X, Z]) => [X, 0, Z] as V3));
};
export const kutuKose = (X0: number, X1: number, Z0: number, Z1: number, h: number): V3[] => [
  [X0, 0, Z0], [X1, 0, Z0], [X1, 0, Z1], [X0, 0, Z1], [X0, h, Z0], [X1, h, Z0], [X1, h, Z1], [X0, h, Z1],
];

// ---- 5a Çinko teras (dünya): kenetler VP'ye yakınsar (gölge + ışık tepe çifti), ışık şeridi + gölgeler (GolgeSeridi), kırık çizgi Z 6.2 ----
export const KIRIK_Z = 6.2;
export const CinkoTeras: React.FC<{ D: Dolly; k: KameraDurum; C: CatiPalet; isikSerit: P[] | null; golgeler: React.ReactNode; seed: number }> = ({ D, k, C, isikSerit, golgeler, seed }) => {
  const Zn = enYakinZ(D, k) + 0.01;
  if (Zn >= KIRIK_Z) return null;
  const Q = (pts: V3[]) => kirpCiz(D, k, pts, Zn);
  const zemin = Q([[-30, 0, KIRIK_Z], [30, 0, KIRIK_Z], [30, 0, Zn], [-30, 0, Zn]]);
  const kenetler: React.ReactNode[] = [];
  const sag = isikSagMi(C);
  for (let i = -30; i <= 30; i++) {
    const X = 0.13 + i * 0.6;
    const g = Q([[X - 0.02, 0, KIRIK_Z], [X + 0.02, 0, KIRIK_Z], [X + 0.02, 0, Zn], [X - 0.02, 0, Zn]]);
    const ix = sag ? X + 0.012 : X - 0.024;
    const s = Q([[ix, 0, KIRIK_Z], [ix + 0.012, 0, KIRIK_Z], [ix + 0.012, 0, Zn], [ix, 0, Zn]]);
    kenetler.push(<g key={i}>{g && <polygon points={pl(g)} fill={C.kenet} />}{s && <polygon points={pl(s)} fill={C.kenetIsik} opacity={0.75} />}</g>);
  }
  for (let Z = KIRIK_Z - 0.5; Z > Zn; Z -= 2.1) { const e = Q([[-30, 0, Z], [30, 0, Z], [30, 0, Z - 0.035], [-30, 0, Z - 0.035]]); if (e) kenetler.push(<polygon key={`e${Z.toFixed(2)}`} points={pl(e)} fill={C.kenet} opacity={0.7} />); }
  const paneller: React.ReactNode[] = [];
  for (let i = -30; i < 30; i++) {
    if (rnd(seed, `p${i}`) < 0.5) continue;
    const X = 0.13 + i * 0.6, e = Q([[X, 0, KIRIK_Z], [X + 0.6, 0, KIRIK_Z], [X + 0.6, 0, Zn], [X, 0, Zn]]);
    if (e) paneller.push(<polygon key={`p${i}`} points={pl(e)} fill={rnd(seed, `q${i}`) > 0.5 ? "#e9e4da" : "#1d1b26"} opacity={0.035} />);
  }
  const ky = (dunyaEkran(D, k, 0, 0, KIRIK_Z) as P)[1];
  // sıcak bant: kırık çizgi boyunca (güneşe en yakın kenar) 60 px — çinkonun geniş parlama lobu
  const bant = C.sicakBant ? Q([[-30, 0, KIRIK_Z], [30, 0, KIRIK_Z], [30, 0, KIRIK_Z - 0.45], [-30, 0, KIRIK_Z - 0.45]]) : null;
  return (
    <g>
      {zemin && <polygon points={pl(zemin)} fill={C.cinko} />}
      {isikSerit && <polygon points={pl(isikSerit)} fill={C.cinkoIsik} />}
      {bant && <polygon points={pl(bant)} fill={C.sicakBant!} opacity={0.3} />}
      {paneller}
      {kenetler}
      {golgeler}
      <rect x={-3000} y={ky - 6} width={7000} height={6} fill={karistir(C.cinko, C.kenar, 0.5)} />
      <rect x={-3000} y={ky} width={7000} height={4} fill={C.cinkoG} />
    </g>
  );
};

// ---- 5b Dünya modelli baca kümesi (kendi terasımız): ön yüz + görünen yan yüz + başlık bandı + külahlar + II tarama + kabarma lekesi ----
export type BacaDunya = { X0: number; X1: number; Z: number; derin: number; hGovde: number; baslik: number; kulahSayi: number; kulahCap: number; kulahBoy: number };
export const BacaKumesiDunya: React.FC<{ D: Dolly; k: KameraDurum; b: BacaDunya; C: CatiPalet; seed: number }> = ({ D, k, b, C, seed }) => {
  const E = (X: number, h: number, Z: number) => dunyaEkran(D, k, X, h, Z);
  const on = [E(b.X0, b.hGovde, b.Z), E(b.X1, b.hGovde, b.Z), E(b.X1, 0, b.Z), E(b.X0, 0, b.Z)];
  // kamera bacanın ön yüzüne (başlık taşması dahil, Z − 0.04) yaklaştıysa baca kadrajın çok dışında: çizilmez
  if (on.some((q) => !q) || !E(b.X0 - 0.04, b.hGovde, b.Z - 0.04) || !E(b.X1 + 0.04, 0, b.Z - 0.04)) return null;
  const O = on as P[];
  const cam = 0; // görünen yan yüz geniş kameraya göre (dolly yolu X ≤ 0)
  const yanX = cam > b.X1 ? b.X1 : cam < b.X0 ? b.X0 : null;
  const yan = yanX !== null ? [E(yanX, b.hGovde, b.Z), E(yanX, b.hGovde, b.Z + b.derin), E(yanX, 0, b.Z + b.derin), E(yanX, 0, b.Z)] as P[] : null;
  const pxm = Math.abs(O[1][0] - O[0][0]) / (b.X1 - b.X0);
  const bas = [E(b.X0 - 0.04, b.hGovde + b.baslik, b.Z - 0.04), E(b.X1 + 0.04, b.hGovde + b.baslik, b.Z - 0.04), E(b.X1 + 0.04, b.hGovde, b.Z - 0.04), E(b.X0 - 0.04, b.hGovde, b.Z - 0.04)] as P[];
  const basYan = yanX !== null ? [E(yanX - 0.04, b.hGovde + b.baslik, b.Z - 0.04), E(yanX - 0.04, b.hGovde + b.baslik, b.Z + b.derin + 0.04), E(yanX - 0.04, b.hGovde, b.Z + b.derin + 0.04), E(yanX - 0.04, b.hGovde, b.Z - 0.04)] as P[] : null;
  const kw = Math.max(2, Math.min(6, pxm * 0.014));
  const kulahlar: React.ReactNode[] = [];
  for (let j = 0; j < b.kulahSayi; j++) {
    const X = b.X0 + ((j + 0.5) * (b.X1 - b.X0)) / b.kulahSayi - b.kulahCap / 2;
    const ust = E(X, b.hGovde + b.baslik + b.kulahBoy * (0.92 + 0.16 * rnd(seed, `k${j}`)), b.Z + 0.1), alt = E(X, b.hGovde + b.baslik, b.Z + 0.1);
    if (ust && alt) kulahlar.push(<Kulah key={j} x={ust[0]} y={ust[1]} w={b.kulahCap * pxm} h={alt[1] - ust[1]} C={C} />);
  }
  const onIsikli = isikliYuz(C, [0, 0, -1]), yanIsikli = yan ? isikliYuz(C, [yanX === b.X1 ? 1 : -1, 0, 0]) : false;
  const sag = isikSagMi(C);
  const kenarCizgi: [P, P] = sag ? [O[1], O[2]] : yan ? [yan[0], yan[3]] : [O[0], O[3]];
  const temas = [E(b.X0 - 0.03, 0, b.Z - 0.02), E(b.X1 + 0.03, 0, b.Z - 0.02), E(b.X1 + 0.03, 0, b.Z + b.derin), E(b.X0 - 0.03, 0, b.Z + b.derin)];
  // kabarma lekesi (sıva): ön yüzde tek düzensiz leke α .10
  const lk = (u: number, v: number) => [O[3][0] + (O[2][0] - O[3][0]) * u + (O[0][0] - O[3][0]) * v, O[3][1] + (O[2][1] - O[3][1]) * u + (O[0][1] - O[3][1]) * v] as P;
  const leke = [lk(0.18, 0.55), lk(0.42, 0.6), lk(0.5, 0.45), lk(0.36, 0.32), lk(0.16, 0.38)];
  const ta = { aci: TARAMA.aci, kalinlik: TARAMA.kalin, kalin: TARAMA.kalin, aralik: TARAMA.aralik, renk: C.tarama };
  return (
    <g>
      {temas.every((q) => q) && <polygon points={pl(temas as P[])} fill="#1d1a26" opacity={0.55} />}
      {yan && <polygon points={pl(yan)} fill={yanIsikli ? C.baca : karistir(C.bacaG, "#1d1b26", 0.15)} stroke={ink(C.bacaG)} strokeWidth={kw} strokeLinejoin="round" />}
      {yan && !yanIsikli && <Tarama sekil={yan} basamak="II" aci={ta.aci} renk={ta.renk} kalinlik={ta.kalinlik} aralik={ta.aralik} seed={seed + 1} />}
      <polygon points={pl(O)} fill={onIsikli ? C.baca : C.bacaG} stroke={ink(C.baca)} strokeWidth={kw} strokeLinejoin="round" />
      {!onIsikli && <Tarama sekil={O} basamak="II" aci={ta.aci} renk={ta.renk} kalinlik={ta.kalin} aralik={ta.aralik * 1.3} seed={seed + 2} alfaCarpan={0.45} />}
      <polygon points={pl(leke)} fill="#e9e4da" opacity={0.1} />
      {/* is izleri: külahların altından aşağı akan koyu şeritler (yağmur + kurum) */}
      {[0.2, 0.5, 0.8].map((u, i) => { const L_ = 0.18 + 0.2 * rnd(seed, `is${i}`); const a = lk(u, 1), b = lk(u + 0.04, 1 - L_), c2 = lk(u + 0.09, 1); return <polygon key={`is${i}`} points={pl([a, b, c2])} fill="#1d1b26" opacity={0.16} />; })}
      {Array.from({ length: Math.floor(b.hGovde / 0.25) }, (_, i) => (i + 1) * 0.25 / b.hGovde).map((v, i) => { const a = lk(0, v), c = lk(1, v); return <line key={v} x1={a[0]} y1={a[1]} x2={c[0]} y2={c[1]} stroke={ink(C.bacaG)} strokeWidth={kw * 0.45} opacity={i % 2 ? 0.35 : 0.55} />; })}
      <polygon points={pl([lk(0, 1), lk(1, 1), lk(1, 0.94), lk(0, 0.94)])} fill="#1d1b26" opacity={0.35} />
      <line x1={kenarCizgi[0][0]} y1={kenarCizgi[0][1]} x2={kenarCizgi[1][0]} y2={kenarCizgi[1][1]} stroke={C.kenar} strokeWidth={2.5} />
      {basYan && basYan.every((q) => q) && <polygon points={pl(basYan)} fill={karistir(C.bacaBaslik, "#1d1b26", 0.2)} stroke={ink(C.bacaBaslik)} strokeWidth={kw * 0.7} />}
      <polygon points={pl(bas)} fill={C.bacaBaslik} stroke={ink(C.bacaBaslik)} strokeWidth={kw * 0.7} />
      <line x1={bas[0][0]} y1={bas[0][1]} x2={bas[1][0]} y2={bas[1][1]} stroke={C.kenar} strokeWidth={2} opacity={0.8} />
      {kulahlar}
    </g>
  );
};

// ---- 5d KÜMES (dünya modeli, mekanlar §1v2.2): tek eğimli ahşap kulübe, ön yüz normali kameranın 30° sağına; yakın düzlemde kırpılır ----
export type KumesDunyaT = { R: [number, number]; yaw: number; en: number; derin: number; ayak: number; sacak: [number, number]; tasma: [number, number];
  aciklik: { ic: number; w: number; h: number; esik: number }[]; tahta: { h: number; derin: number; sagTasma: number; solBit: number; kalin: number }; payanda: number; kapak: [number, number, number, number] };
// tahta üstü 0.655 / eşik 0.67: kuş rig'inin ayak–kılıf aralığı (motion v2 raporu, tablo); açıklık-1 iç 0.08 (kılıf arkası koyu)
export const KUMES_V2: KumesDunyaT = {
  R: [-0.5, 5.2], yaw: 30, en: 1.0, derin: 0.8, ayak: 0.15, sacak: [1.0, 1.2], tasma: [0.1, 0.05],
  aciklik: [{ ic: 0.08, w: 0.2, h: 0.28, esik: 0.67 }, { ic: 0.55, w: 0.2, h: 0.28, esik: 0.67 }],
  tahta: { h: 0.655, derin: 0.25, sagTasma: 0.1, solBit: 0.92, kalin: 0.028 }, payanda: 0.03, kapak: [0.18, 0.62, 0.3, 0.42],
};
export const kumesCerceve = (K: KumesDunyaT) => {
  const a = (K.yaw * Math.PI) / 180;
  const u: [number, number] = [-Math.cos(a), -Math.sin(a)]; // R → L (ön yüz boyunca, sola)
  const n: [number, number] = [Math.sin(a), -Math.cos(a)];  // ön yüz normali (kameraya, 30° sağa)
  const W = (au: number, bn: number, h: number): V3 => [K.R[0] + au * u[0] + bn * n[0], h, K.R[1] + au * u[1] + bn * n[1]];
  const egim = (K.sacak[1] - K.sacak[0]) / K.derin; // m/m (öne iner)
  const catiH = (bn: number) => K.sacak[0] - egim * bn; // bn < 0 içeri (arka)
  return { u, n, W, catiH, egim };
};
export const KumesDunya: React.FC<{ D: Dolly; k: KameraDurum; K: KumesDunyaT; C: CatiPalet; seed: number; saat: Saat; kamera: V3; uid: string }> = ({ D, k, K, C, seed, saat, kamera, uid }) => {
  const { u, n, W, catiH } = kumesCerceve(K);
  const Q = (pts: V3[]) => kirpCiz(D, k, pts);
  const dB = -K.derin, h0 = K.ayak, top = (bn: number) => catiH(bn);
  const pxm = (() => { const a = dunyaEkran(D, k, ...W(0, 0, 0.6)), b = dunyaEkran(D, k, ...W(0, 0, 0.7)); return a && b ? Math.abs(b[1] - a[1]) / 0.1 : 300; })();
  const kw = Math.max(2.5, Math.min(8, pxm * 0.004 + 2));
  const ta = { aci: TARAMA.aci, kalinlik: Math.max(TARAMA.kalin, Math.min(4, pxm * 0.0012)), aralik: Math.max(TARAMA.aralik, Math.min(12, pxm * 0.003)), renk: karistir(C.damar, "#1d1b26", 0.2) };
  const gorunur = (nv: V3, p: V3) => nv[0] * (kamera[0] - p[0]) + nv[1] * (kamera[1] - p[1]) + nv[2] * (kamera[2] - p[2]) > 0;
  const nOn: V3 = [n[0], 0, n[1]], nSol: V3 = [u[0], 0, u[1]], nSag: V3 = [-u[0], 0, -u[1]];
  const isik = (nv: V3) => isikliYuz(C, nv);
  const yuzRenk = (nv: V3) => (isik(nv) ? C.ahsapIsik : nv === nOn ? C.ahsap : karistir(C.ahsap, C.ahsapG, 0.45));
  const parca: React.ReactNode[] = [];
  const P_ = (key: string, pts: V3[], fill: string, stroke: string | null, sw = kw, extra?: React.ReactNode) => {
    const e = Q(pts);
    if (!e) return null;
    parca.push(<g key={key}><polygon points={pl(e)} fill={fill} stroke={stroke ?? "none"} strokeWidth={sw} strokeLinejoin="round" />{extra}</g>);
    return e;
  };
  // zemin teması: gövde altı gölgesi (0.15 m yükseltilmiş taban altında koyu) + ayak temasları
  P_("alt", [W(-0.03, 0.03, 0.002), W(K.en + 0.03, 0.03, 0.002), W(K.en + 0.03, dB - 0.03, 0.002), W(-0.03, dB - 0.03, 0.002)], "#1d1a26", null, 0);
  const ayaklar: [number, number][] = [[0, 0], [K.en - 0.05, 0], [K.en - 0.05, dB + 0.05], [0, dB + 0.05]];
  ayaklar.forEach(([a, b], i) => {
    P_(`ay${i}`, [W(a, b, 0), W(a + 0.05, b, 0), W(a + 0.05, b, h0 + 0.01), W(a, b, h0 + 0.01)], C.ahsapG, ink(C.ahsap), kw * 0.7);
  });
  // gövde yüzleri (görünürlük normal · kameraya yön)
  const yuzler: { ad: string; nv: V3; pts: V3[]; tahtaU: [number, number] | null }[] = [
    { ad: "sol", nv: nSol, pts: [W(K.en, 0, h0), W(K.en, dB, h0), W(K.en, dB, top(dB)), W(K.en, 0, top(0))], tahtaU: null },
    { ad: "sag", nv: nSag, pts: [W(0, dB, h0), W(0, 0, h0), W(0, 0, top(0)), W(0, dB, top(dB))], tahtaU: null },
    { ad: "on", nv: nOn, pts: [W(0, 0, h0), W(K.en, 0, h0), W(K.en, 0, top(0)), W(0, 0, top(0))], tahtaU: [0, K.en] },
  ];
  yuzler.forEach((y) => {
    if (!gorunur(y.nv, y.pts[0])) return;
    const e = P_(`y-${y.ad}`, y.pts, yuzRenk(y.nv), null, 0);
    if (!e) return;
    // dikey tahtalar 0.12 m, tahta başına ±4 % ton + derz; damar yalnız yakında
    const yan = y.ad !== "on";
    const L0 = yan ? 0 : 0, L1 = yan ? K.derin : K.en, N = Math.ceil((L1 - L0) / 0.12);
    for (let i = 0; i < N; i++) {
      const s0 = L0 + i * 0.12, s1 = Math.min(L1, s0 + 0.12);
      const pt = (s: number, h: number): V3 => (y.ad === "on" ? W(s, 0, h) : y.ad === "sol" ? W(K.en, -s, h) : W(0, -s, h));
      const hT = (s: number) => (y.ad === "on" ? top(0) : top(-s));
      const ton = karistir(yuzRenk(y.nv), rnd(seed, `${y.ad}t${i}`) > 0.5 ? "#e9e4da" : "#1d1b26", 0.03 + rnd(seed, `${y.ad}u${i}`) * 0.05);
      const pe = Q([pt(s0, h0), pt(s1, h0), pt(s1, hT(s1)), pt(s0, hT(s0))]);
      if (pe) parca.push(<polygon key={`${y.ad}tp${i}`} points={pl(pe)} fill={ton} />);
      if (i > 0) { const de = Q([pt(s0 - 0.004, h0), pt(s0 + 0.004, h0), pt(s0 + 0.004, hT(s0)), pt(s0 - 0.004, hT(s0))]); if (de) parca.push(<polygon key={`${y.ad}dz${i}`} points={pl(de)} fill={C.damar} opacity={0.85} />); }
      if (pxm > 900) for (let j = 0; j < 3; j++) {
        const s = s0 + 0.12 * (0.3 + 0.4 * rnd(seed, `${y.ad}dx${i}-${j}`)), hA = h0 + 0.05 + rnd(seed, `${y.ad}dy${i}-${j}`) * 0.5;
        const a = dunyaEkran(D, k, ...pt(s, hA)), b = dunyaEkran(D, k, ...pt(s + 0.006, hA + 0.22)), c = dunyaEkran(D, k, ...pt(s - 0.004, hA + 0.11));
        if (a && b && c) parca.push(<path key={`${y.ad}dm${i}-${j}`} d={`M ${a.join(" ")} Q ${c.join(" ")} ${b.join(" ")}`} stroke={C.damar} strokeWidth={2.5} opacity={0.42} fill="none" />);
      }
    }
    parca.push(<polygon key={`${y.ad}kt`} points={pl(e)} fill="none" stroke={ink(C.ahsap)} strokeWidth={kw} strokeLinejoin="round" />);
    if (y.ad === "on") {
      // açıklıklar (dikdörtgen, düz lento): koyu iç + IV tarama + kalın çerçeve
      K.aciklik.forEach((a, i) => {
        const r = Q([W(a.ic, 0.001, a.esik), W(a.ic + a.w, 0.001, a.esik), W(a.ic + a.w, 0.001, a.esik + a.h), W(a.ic, 0.001, a.esik + a.h)]);
        if (!r) return;
        parca.push(<g key={`ac${i}`}><polygon points={pl(r)} fill={C.aciklik} stroke={ink(C.ahsap)} strokeWidth={kw} strokeLinejoin="round" /><Tarama sekil={r} basamak="III" aci={ta.aci} renk="#140f18" kalinlik={ta.kalinlik} aralik={ta.aralik} seed={seed + 20 + i} /></g>);
        // iç yan duvar (ışık yanı; derinlik okunur): sağ iç kenarda ince açık şerit
        const ic = Q([W(a.ic, 0.001, a.esik), W(a.ic + 0.018, 0.001, a.esik), W(a.ic + 0.018, 0.001, a.esik + a.h), W(a.ic, 0.001, a.esik + a.h)]);
        if (ic) parca.push(<polygon key={`aci${i}`} points={pl(ic)} fill={C.ahsapG} />);
      });
    }
    if (y.ad === "sol") {
      // el kapağı (sol yan yüz): tahta kapak + iki menteşe + mandal (koyu çelik, sarı metal yok)
      const [s0, h1, w, hh] = K.kapak, pt = (s: number, h: number) => W(K.en + 0.001, -s, h);
      const kp = Q([pt(s0, h1 - hh), pt(s0 + w, h1 - hh), pt(s0 + w, h1), pt(s0, h1)]);
      if (kp) parca.push(<polygon key="kapak" points={pl(kp)} fill={karistir(yuzRenk(y.nv), "#1d1b26", 0.08)} stroke={ink(C.ahsap)} strokeWidth={kw} />);
      [h1 - 0.06, h1 - hh + 0.04].forEach((h, i) => { const m = Q([pt(s0 - 0.01, h), pt(s0 + 0.07, h), pt(s0 + 0.07, h + 0.025), pt(s0 - 0.01, h + 0.025)]); if (m) parca.push(<polygon key={`mt${i}`} points={pl(m)} fill={C.celik} />); });
    }
  });
  // ışık yanındaki düşey köşe kenar ışığı (alacakaranlık: sağ ön köşe R)
  if (isikSagMi(C)) { const a = dunyaEkran(D, k, ...W(0, 0, h0)), b = dunyaEkran(D, k, ...W(0, 0, top(0))); if (a && b) parca.push(<line key="rk" x1={a[0] + 1.5} y1={a[1]} x2={b[0] + 1.5} y2={b[1]} stroke={C.kenar} strokeWidth={2.5} />); }
  // iniş tahtası (üst yüz + ön kenar + sağ uç) ve payanda — ön yüzün önünde
  const T_ = K.tahta, tU = T_.h, tA = T_.h - T_.kalin;
  const payA = K.payanda; // payanda tahta ucunun altında, köşenin hemen içinde
  const pay = (b: number, h: number, da: number): V3 => W(payA + da, b, h);
  // çubuk: duvardan (b 0) tahta altına (b ≈ 0.21) 45°; yan yüz (a düzlemi) + üst yüz (kameradan görünen, 0.035 m)
  const payYan = Q([pay(0.005, tA - 0.24, 0), pay(0.005, tA - 0.195, 0), pay(0.2, tA, 0), pay(0.245, tA, 0)]);
  const payOn = Q([pay(0.005, tA - 0.195, 0), pay(0.005, tA - 0.195, 0.035), pay(0.2, tA, 0.035), pay(0.2, tA, 0)]);
  const tahtaUst = Q([W(-T_.sagTasma, T_.derin, tU), W(T_.solBit, T_.derin, tU), W(T_.solBit, 0.002, tU), W(-T_.sagTasma, 0.002, tU)]);
  const tahtaOn = Q([W(-T_.sagTasma, T_.derin, tU), W(T_.solBit, T_.derin, tU), W(T_.solBit, T_.derin, tA), W(-T_.sagTasma, T_.derin, tA)]);
  const tahtaUc = gorunur(nSag, W(-T_.sagTasma, 0, tU)) ? Q([W(-T_.sagTasma, 0.002, tU), W(-T_.sagTasma, T_.derin, tU), W(-T_.sagTasma, T_.derin, tA), W(-T_.sagTasma, 0.002, tA)]) : null;
  // tahtanın ön yüze düşen gölge şeridi (tahta altı, II): tahta ile duvar birleşimi
  const tahtaAltGolge = Q([W(-0.0, 0.001, tA), W(T_.solBit, 0.001, tA), W(T_.solBit, 0.001, tA - 0.035), W(0, 0.001, tA - 0.035)]);
  const tahta = (
    <g key="tahta">
      {tahtaAltGolge && <polygon points={pl(tahtaAltGolge)} fill={C.ahsapG} opacity={0.8} />}
      {payYan && <polygon points={pl(payYan)} fill={C.ahsapG} stroke={ink(C.ahsap)} strokeWidth={kw} strokeLinejoin="round" />}
      {payYan && <Tarama sekil={payYan} basamak="II" aci={ta.aci} renk={ta.renk} kalinlik={ta.kalinlik} aralik={ta.aralik} seed={seed + 31} />}
      {payOn && <polygon points={pl(payOn)} fill={C.ahsap} stroke={ink(C.ahsap)} strokeWidth={kw} strokeLinejoin="round" />}
      {tahtaOn && <polygon points={pl(tahtaOn)} fill={C.ahsapG} stroke={ink(C.ahsap)} strokeWidth={kw} strokeLinejoin="round" />}
      {tahtaOn && <Tarama sekil={tahtaOn} basamak="II" aci={ta.aci} renk={ta.renk} kalinlik={ta.kalinlik} aralik={ta.aralik} seed={seed + 32} />}
      {tahtaUc && <polygon points={pl(tahtaUc)} fill={isik(nSag) ? C.ahsapIsik : C.ahsapG} stroke={ink(C.ahsap)} strokeWidth={kw} strokeLinejoin="round" />}
      {tahtaUst && <polygon points={pl(tahtaUst)} fill={karistir(C.ahsap, C.ahsapIsik, 0.45)} stroke={ink(C.ahsap)} strokeWidth={kw} strokeLinejoin="round" />}
      {tahtaUst && isikSagMi(C) && (() => { const a = dunyaEkran(D, k, ...W(-T_.sagTasma, T_.derin, tU)), b = dunyaEkran(D, k, ...W(-T_.sagTasma, 0.002, tU)); return a && b ? <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={C.kenar} strokeWidth={2.5} /> : null; })()}
    </g>
  );
  // çatı: üst yüz (göz üstündeyse) ya da saçak altı (soffit, III); ön alın bandı; sağ kenar ışığı
  const tO = K.tasma[0], tY = K.tasma[1], kal = 0.04;
  const ch = (b: number) => catiH(b);
  const cUst = (b: number) => ch(b) + 0.012; // çatı üst düzlemi (sacak = duvar üst ucu, çatı kalınlığı yukarı)
  const k1 = W(-tY, tO, cUst(tO)), k2 = W(K.en + tY, tO, cUst(tO)), k3 = W(K.en + tY, dB - tY, cUst(dB - tY)), k4 = W(-tY, dB - tY, cUst(dB - tY));
  const alt = (q: V3): V3 => [q[0], q[1] - kal, q[2]];
  // kamera çatı düzleminin üstünde mi: kameranın n eksenindeki konumunda çatı yüksekliği ile karşılaştır
  const bnKam = (kamera[0] - K.R[0]) * n[0] + (kamera[2] - K.R[1]) * n[1];
  const ustGorunur = kamera[1] > cUst(bnKam);
  const cati: React.ReactNode[] = [];
  if (ustGorunur) {
    const e = Q([k1, k2, k3, k4]);
    if (e) {
      cati.push(<polygon key="cu" points={pl(e)} fill={C.kumesCati} stroke={ink(C.kumesCati)} strokeWidth={kw} strokeLinejoin="round" />);
      // çinko kenet (eğim yönünde) 0.2 m
      for (let a = 0.15; a < K.en; a += 0.2) { const l = Q([W(a, tO, cUst(tO) + 0.002), W(a + 0.012, tO, cUst(tO) + 0.002), W(a + 0.012, dB - tY, cUst(dB - tY) + 0.002), W(a, dB - tY, cUst(dB - tY) + 0.002)]); if (l) cati.push(<polygon key={`ck${a.toFixed(2)}`} points={pl(l)} fill={ink(C.kumesCati)} opacity={0.6} />); }
    }
  } else {
    const e = Q([alt(k1), alt(k2), alt(k3), alt(k4)]);
    if (e) cati.push(<g key="soffit"><polygon points={pl(e)} fill={C.ahsapG} stroke={ink(C.ahsap)} strokeWidth={kw} strokeLinejoin="round" /><Tarama sekil={e} basamak="III" aci={ta.aci} renk={ta.renk} kalinlik={ta.kalinlik} aralik={ta.aralik} seed={seed + 40} /></g>);
    // saçak kirişleri (soffit altında 3 lata, derinlik okunur)
    [0.2, 0.5, 0.8].forEach((a) => { const l = Q([alt(W(a, tO, cUst(tO))), alt(W(a + 0.03, tO, cUst(tO))), alt(W(a + 0.03, 0, ch(0))), alt(W(a, 0, ch(0)))]); if (l) cati.push(<polygon key={`kr${a}`} points={pl(l)} fill={C.ahsap} stroke={ink(C.ahsap)} strokeWidth={kw * 0.6} />); });
  }
  // ön alın (fascia) + sol/sağ alın
  const alin = Q([k1, k2, alt(k2), alt(k1)]);
  if (alin) cati.push(<polygon key="alin" points={pl(alin)} fill={C.kumesCati} stroke={ink(C.kumesCati)} strokeWidth={kw} strokeLinejoin="round" />);
  const yanAlin = gorunur(nSol, k2) ? Q([k2, k3, alt(k3), alt(k2)]) : gorunur(nSag, k1) ? Q([k4, k1, alt(k1), alt(k4)]) : null;
  if (yanAlin) cati.push(<polygon key="yalin" points={pl(yanAlin)} fill={karistir(C.kumesCati, "#1d1b26", 0.15)} stroke={ink(C.kumesCati)} strokeWidth={kw} strokeLinejoin="round" />);
  // kenar ışığı: çatının sağ (ışık) kenarı + ön üst kenar
  { const a = dunyaEkran(D, k, ...k1), b = dunyaEkran(D, k, ...k4), c = dunyaEkran(D, k, ...k2);
    const a2 = ustGorunur ? a : dunyaEkran(D, k, ...alt(k1)), b2 = ustGorunur ? b : dunyaEkran(D, k, ...alt(k4));
    if (isikSagMi(C) && a2 && b2) cati.push(<line key="ck1" x1={a2[0]} y1={a2[1]} x2={b2[0]} y2={b2[1]} stroke={C.kenar} strokeWidth={2.5} />);
    if (a && c) cati.push(<line key="ck2" x1={a[0]} y1={a[1] - 1} x2={c[0]} y2={c[1] - 1} stroke={C.kenar} strokeWidth={2.2} opacity={0.75} />); }
  void uid; void saat;
  return <g>{parca}{tahta}{cati}</g>;
};
/** tahta üst yüzeyinde (ekran) kırpma çokgeni: kuşun temas gölgesi tahtaya düşer */
export const tahtaUstEkran = (D: Dolly, k: KameraDurum, K: KumesDunyaT): P[] | null => {
  const { W } = kumesCerceve(K), T_ = K.tahta;
  return kirpCiz(D, k, [W(-T_.sagTasma, T_.derin, T_.h), W(T_.solBit, T_.derin, T_.h), W(T_.solBit, 0, T_.h), W(-T_.sagTasma, 0, T_.h)]);
};

// ---- 5c YEM/SU TEKNESİ (mekanlar §1v2.2): kümesin sağ-önünde, iki göz (yem + su), tahtadan dökülen birkaç tane ----
export type TekneDunya = { X0: number; X1: number; Z0: number; derin: number; h: number; kalin: number };
export const YEM_TEKNESI: TekneDunya = { X0: -0.25, X1: 0.35, Z0: 4.65, derin: 0.25, h: 0.15, kalin: 0.025 };
export const YemTeknesi: React.FC<{ D: Dolly; k: KameraDurum; t: TekneDunya; C: CatiPalet; seed: number; uid: string }> = ({ D, k, t, C, seed, uid }) => {
  const E = (X: number, h: number, Z: number) => dunyaEkran(D, k, X, h, Z);
  const Z1 = t.Z0 + t.derin, c = t.kalin;
  const kose = [E(t.X0, 0, t.Z0), E(t.X1, 0, t.Z0), E(t.X1, t.h, Z1), E(t.X0, t.h, Z1)];
  if (kose.some((q) => !q)) return null;
  const e = (X: number, h: number, Z: number) => E(X, h, Z) as P;
  const pxm = Math.abs(e(t.X1, 0, t.Z0)[0] - e(t.X0, 0, t.Z0)[0]) / (t.X1 - t.X0);
  if (pxm > 4000) return null;
  const kw = Math.max(2, Math.min(5, pxm * 0.012));
  const gR = ink(C.ahsap);
  const on = [e(t.X0, t.h, t.Z0), e(t.X1, t.h, t.Z0), e(t.X1, 0, t.Z0), e(t.X0, 0, t.Z0)];
  const yan = [e(t.X0, t.h, t.Z0), e(t.X0, t.h, Z1), e(t.X0, 0, Z1), e(t.X0, 0, t.Z0)]; // kamera X 0 > X0 değil → sol yan yalnız X0 > 0 ise; burada X0 < 0 < X1: yan görünmez
  void yan;
  const ust = [e(t.X0, t.h, t.Z0), e(t.X1, t.h, t.Z0), e(t.X1, t.h, Z1), e(t.X0, t.h, Z1)];
  const ic = (X0: number, X1: number, h: number) => [e(X0, h, t.Z0 + c), e(X1, h, t.Z0 + c), e(X1, h, Z1 - c), e(X0, h, Z1 - c)];
  const Xm = (t.X0 + t.X1) / 2;
  const delikSol = ic(t.X0 + c, Xm - c / 2, t.h), delikSag = ic(Xm + c / 2, t.X1 - c, t.h);
  const yemY = ic(t.X0 + c, Xm - c / 2, t.h * 0.62), suY = ic(Xm + c / 2, t.X1 - c, t.h * 0.55);
  const bil = (q: P[], u: number, v: number): P => { const a = [q[0][0] + (q[1][0] - q[0][0]) * u, q[0][1] + (q[1][1] - q[0][1]) * u], b = [q[3][0] + (q[2][0] - q[3][0]) * u, q[3][1] + (q[2][1] - q[3][1]) * u]; return [a[0] + (b[0] - a[0]) * v, a[1] + (b[1] - a[1]) * v]; };
  const r = Math.max(1.2, pxm * 0.006);
  const taneler = Array.from({ length: 30 }, (_, i) => ({ p: bil(yemY, 0.05 + 0.9 * rnd(seed, `tx${i}`), 0.1 + 0.85 * rnd(seed, `ty${i}`)), a: rnd(seed, `ta${i}`) > 0.5 }));
  // dökülen taneler: teknenin önünde, terasta (dünya noktaları)
  const dokulen = Array.from({ length: 7 }, (_, i) => E(t.X0 + 0.05 + rnd(seed, `dx${i}`) * 0.3, 0, t.Z0 - 0.03 - rnd(seed, `dz${i}`) * 0.12)).filter(Boolean) as P[];
  const sag = isikSagMi(C);
  return (
    <g>
      <polygon points={pl([e(t.X0 - 0.02, 0, t.Z0 - 0.015), e(t.X1 + 0.02, 0, t.Z0 - 0.015), e(t.X1 + 0.02, 0, Z1), e(t.X0 - 0.02, 0, Z1)])} fill="#1d1a26" opacity={0.5} />
      {dokulen.map((q, i) => <ellipse key={`d${i}`} cx={q[0]} cy={q[1]} rx={r * 1.4} ry={r} fill="#8a7a6c" />)}
      <polygon points={pl(ust)} fill={karistir(C.ahsap, C.ahsapIsik, 0.4)} stroke={gR} strokeWidth={kw} strokeLinejoin="round" />
      <defs>
        <clipPath id={`${uid}yem`}><polygon points={pl(delikSol)} /></clipPath>
        <clipPath id={`${uid}su`}><polygon points={pl(delikSag)} /></clipPath>
      </defs>
      <polygon points={pl(delikSol)} fill={C.ahsapG} />
      <polygon points={pl(delikSag)} fill={C.ahsapG} />
      <g clipPath={`url(#${uid}yem)`}>
        <polygon points={pl(yemY)} fill="#6f6460" />
        {taneler.map((q, i) => <ellipse key={i} cx={q.p[0]} cy={q.p[1]} rx={r * 1.4} ry={r} fill={q.a ? "#8a7a6c" : "#a0938a"} />)}
      </g>
      <g clipPath={`url(#${uid}su)`}>
        <polygon points={pl(suY)} fill={karistir(C.gok[1], C.ahsapG, 0.3)} />
        {(() => { const a = bil(suY, sag ? 0.55 : 0.1, 0.35), b2 = bil(suY, sag ? 0.9 : 0.45, 0.35); return <line x1={a[0]} y1={a[1]} x2={b2[0]} y2={b2[1]} stroke={karistir(C.gok[3], "#e9e4da", 0.2)} strokeWidth={Math.max(2, pxm * 0.008)} strokeLinecap="round" opacity={0.7} />; })()}
      </g>
      <polygon points={pl(delikSol)} fill="none" stroke={gR} strokeWidth={kw * 0.8} />
      <polygon points={pl(delikSag)} fill="none" stroke={gR} strokeWidth={kw * 0.8} />
      <polygon points={pl(on)} fill={C.ahsap} stroke={gR} strokeWidth={kw} strokeLinejoin="round" />
      {(() => { const a = e(t.X0, t.h * 0.5, t.Z0), b2 = e(t.X1, t.h * 0.5, t.Z0); return <line x1={a[0]} y1={a[1]} x2={b2[0]} y2={b2[1]} stroke={gR} strokeWidth={kw * 0.7} />; })()}
      {(() => { const a = sag ? e(t.X1, t.h, t.Z0) : e(t.X0, t.h, t.Z0), b2 = sag ? e(t.X1, t.h, Z1) : e(t.X0, t.h, Z1); return <line x1={a[0]} y1={a[1]} x2={b2[0]} y2={b2[1]} stroke={C.kenar} strokeWidth={2.5} />; })()}
    </g>
  );
};
