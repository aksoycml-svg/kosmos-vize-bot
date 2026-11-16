// ===== Leningrad figür kiti T3 (tur-3 kalibrasyonu; yalnız EKLEME — lgYuz.tsx / benmychree dosyaları değişmez) =====
// Kaynak: Ben-my-Chree onaylı figür dili (Figur.tsx BasProfil, OmuzBasi, kapsul) + CLAUDE "Omuz", "Yüzde iç çizgi", "Çene–boyun".
// - serit(): sivrilen ton şekli (kıvrım, saç tutamı, yaş tonu) — çizgi değil ŞEKİL (tur-2 eleştirisi: "kıvrım = koyu oluk + açık sırt").
// - Kivrim: koyu oluk + ışık tarafında 2–3 px açık sırt.
// - Birlesik: parçaların (gövde, kol, omuz başlığı) önce TÜM konturları, sonra TÜM dolguları → tek siluet, iç dikiş yok
//   (kol üst ucu gövdenin içinde kalır; omuz başlığı silüetin parçası; düz kesik uç görünmez).
// - LgYuz3: ¾ yüz (Eliasberg). Silüet elmacık/şakak/çökük yanak/çene açılı (yumurta değil); baş öne eğik (özellikler 0.035 H aşağı,
//   alt yüz 0.04 H kısa); göz 0.6–0.7, üst kapak irisin %20'sini örter; uzak kulak konturun arkasında; burun kanatlı + sırt hilali;
//   yaş/açlık tonları (alın bandı, burun–dudak oluğu, şakak çukuru, göz torbası); kirli sakal (seed'li nokta); dağınık tutamlı saç,
//   şakaklarda kır. Yüzde kontur renginde iç çizgi YOK (yalnız kirpik hattı).
// - LgBasProfil: BMC BasProfil'in kopyası + tur-2 K3 düzeltmesi (kavisli 2 basamak ışık sınırı, kulak önünde sivrilen favori,
//   boyun ışık çizgisi yok → 2 basamak ton, tutamlı saç çizgisi).
import React, { useId } from "react";
import { Tarama } from "../../../doku/Tarama";
import { karistir, rnd } from "../../../doku/sabitler";
import { cr, Hilal, Kirp, P2 } from "./lgOrtak";
import type { YuzKart } from "../benmychree/Figur";
import { BirlesikM, MurekkepKontur, murekkepRenk } from "../../cizim/MurekkepCizgi";
import { TonTarama } from "../../cizim/TonTarama";

// ---------------- yardımcılar ----------------
/** Catmull-Rom (hassasiyetli: birim uzayda çizilen baş için 4 basamak; lgOrtak.cr 1 basamak yuvarlar → blok blok olurdu) */
export const crP = (a: P2[], kapali = true, h = 4) => {
  const n = a.length, g = (i: number) => a[kapali ? (i + n) % n : Math.max(0, Math.min(n - 1, i))], f = (v: number) => v.toFixed(h);
  let d = `M${f(a[0][0])},${f(a[0][1])}`;
  for (let i = 0; i < (kapali ? n : n - 1); i++) { const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
    d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)},${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)},${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])},${f(p2[1])}`; }
  return kapali ? d + " Z" : d;
};
/** sivrilen şerit: q boyunca genişlik profili. uc "iki" = iki ucu sivri (mercek), "tek" = başı geniş → ucu sivri */
export const serit = (q: P2[], w: number, uc: "iki" | "tek" = "iki", kapali = true): string => {
  const n = q.length, L: P2[] = [], R: P2[] = [];
  // örnekle (cr açık eğrisi yerine doğrusal ara noktalar yeter: kısa şekiller)
  const S: P2[] = [];
  for (let i = 0; i < n - 1; i++) for (let k = 0; k < 6; k++) { const t = k / 6; S.push([q[i][0] + (q[i + 1][0] - q[i][0]) * t, q[i][1] + (q[i + 1][1] - q[i][1]) * t]); }
  S.push(q[n - 1]);
  const m = S.length;
  for (let i = 0; i < m; i++) {
    const a = S[Math.max(0, i - 1)], b = S[Math.min(m - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1;
    const t = i / (m - 1), prof = uc === "iki" ? Math.sin(Math.PI * t) ** 0.75 : (1 - t) ** 0.8 * Math.min(1, t * 6 + 0.35);
    const h = (w * prof) / 2;
    L.push([S[i][0] - (dy / l) * h, S[i][1] + (dx / l) * h]); R.push([S[i][0] + (dy / l) * h, S[i][1] - (dx / l) * h]);
  }
  return crP([...L, ...R.reverse()], kapali);
};
/** kıvrım: koyu oluk (sivrilen) + ışık yönünde kaydırılmış ince açık sırt */
export const Kivrim: React.FC<{ q: P2[]; w: number; oluk: string; sirt?: string; kay?: P2; alfa?: number; uc?: "iki" | "tek" }> = ({ q, w, oluk, sirt, kay = [-3, -2], alfa = 0.9, uc = "iki" }) => (
  <g>
    {sirt && <path d={serit(q.map((p) => [p[0] + kay[0], p[1] + kay[1]] as P2), Math.max(3, w * 0.28), uc)} fill={sirt} opacity={0.9} />}
    <path d={serit(q, w, uc)} fill={oluk} opacity={alfa} />
  </g>
);
/** birleşik siluet: önce bütün konturlar, sonra bütün dolgular (iç dikiş yok) */
export const Birlesik: React.FC<{ d: string[]; dolgu: string; kontur: string; k?: number }> = ({ d, dolgu, kontur, k = 3 }) => (
  <g strokeLinejoin="round">
    {d.map((x, i) => <path key={`k${i}`} d={x} fill={kontur} stroke={kontur} strokeWidth={k * 2} />)}
    {d.map((x, i) => <path key={`d${i}`} d={x} fill={dolgu} />)}
  </g>
);
/** daire yolu */
export const daire = (c: P2, r: number) => `M${c[0] - r},${c[1]} a${r},${r} 0 1 0 ${2 * r},0 a${r},${r} 0 1 0 ${-2 * r},0Z`;
/** kapsül kol parçası (BMC Figur.kapsul ile aynı geometri; uçlar yarım yuvarlak) */
export const kapsul = (a: P2, b: P2, wa: number, wb: number): string => {
  const t = Math.atan2(b[1] - a[1], b[0] - a[0]), n: P2 = [-Math.sin(t), Math.cos(t)], u: P2 = [Math.cos(t), Math.sin(t)];
  const A1: P2 = [a[0] + n[0] * wa, a[1] + n[1] * wa], A2: P2 = [a[0] - n[0] * wa, a[1] - n[1] * wa], B1: P2 = [b[0] + n[0] * wb, b[1] + n[1] * wb], B2: P2 = [b[0] - n[0] * wb, b[1] - n[1] * wb];
  void u;
  return `M${A1[0]},${A1[1]} L${B1[0]},${B1[1]} A${wb},${wb} 0 0 0 ${B2[0]},${B2[1]} L${A2[0]},${A2[1]} A${wa},${wa} 0 0 0 ${A1[0]},${A1[1]}Z`;
};

// ---------------- ¾ YÜZ (T3) ----------------
export type YuzIfade3 = { kasIc: number; goz: number; agiz: number; bakis: P2 };
export type YuzPalet3 = {
  ten: string; tenOrta: string; tenDerin: string; yansima: [string, string]; kenar: string; kontur: string; tarama: string;
  sac: string; sacIsik: string; sacKontur: string; sacKir: string; dudak: string; agizIc: string; gozAk: string; iris: string; bebek: string; kas: string; parilti: string;
};
/** murekkep (tur-4, isteğe bağlı; verilmezse T3 piksel-aynı): yüz/saç/kulak konturu MurekkepKontur (ışık tarafı ince, gölge tarafı kalın),
 *  gölge yanı TonTarama (ince ton taraması; yüzde İÇ ÇİZGİ YOK). isik: bileşenin kendi koordinatında ışığın gittiği yön. */
export const LgYuz3: React.FC<{ x: number; y: number; H: number; rol?: number; ifade: YuzIfade3; P: YuzPalet3; seed?: number; isikX?: 1 | -1; murekkep?: { isik: P2; ton?: number } }> = ({ x, y, H, rol = 0, ifade, P, seed = 1942, isikX = 1, murekkep: MK }) => {
  const c = Math.cos((rol * Math.PI) / 180), s = Math.sin((rol * Math.PI) / 180);
  const M = (q: P2): P2 => [x + H * (q[0] * c - q[1] * s), y + H * (q[0] * s + q[1] * c)];
  const Y = (a: P2[], k = true) => cr(a.map(M), k);
  const SR = (a: P2[], w: number, uc: "iki" | "tek" = "iki") => serit(a.map(M), w * H, uc);
  const px = H / 290;
  const r = (k: string) => rnd(seed, k);
  const D = 0.035; // baş eğimi: özellikler aşağı

  // silüet: şakak çukuru, elmacık çıkıntısı, çökük yanak, çene açısı; alt yüz 0.04 H kısa (çene 0.465)
  const yuz: P2[] = [[0.02, -0.53], [0.16, -0.505], [0.255, -0.44], [0.288, -0.34], [0.29, -0.24], [0.316, -0.12], [0.322, -0.035], [0.302, 0.05], [0.266, 0.13], [0.248, 0.22], [0.205, 0.3], [0.14, 0.38], [0.08, 0.44], [0.025, 0.465], [-0.045, 0.452],
    [-0.12, 0.405], [-0.185, 0.335], [-0.24, 0.245], [-0.285, 0.15], [-0.298, 0.075], [-0.33, -0.02], [-0.345, -0.13], [-0.33, -0.27], [-0.3, -0.4], [-0.2, -0.49], [-0.08, -0.53]];
  const yuzD = Y(yuz);
  const kulakYakin: P2[] = [[-0.322, -0.085], [-0.382, -0.108], [-0.408, -0.045], [-0.398, 0.045], [-0.37, 0.115], [-0.33, 0.128], [-0.312, 0.06]];
  const kulakUzak: P2[] = [[0.292, -0.1], [0.322, -0.118], [0.338, -0.06], [0.333, 0.02], [0.312, 0.068], [0.29, 0.058]];

  // ifade
  const kI = ifade.kasIc, g = ifade.goz;
  const kas = (ic: P2, orta: P2, dis: P2, k: number): P2[] => {
    const icY = ic[1] - 0.026 * kI, ortaY = orta[1] - 0.01 * kI;
    return [[ic[0], icY - 0.015 * k], [orta[0], ortaY - 0.016 * k], [dis[0], dis[1] - 0.006 * k], [dis[0] + (dis[0] > ic[0] ? 0.014 : -0.014), dis[1] + 0.008], [orta[0], ortaY + 0.011 * k], [ic[0], icY + 0.013 * k]];
  };
  const kasYakin = kas([-0.035, -0.185 + D], [-0.135, -0.198 + D], [-0.245, -0.152 + D], 1);
  const kasUzak = kas([0.105, -0.185 + D], [0.19, -0.196 + D], [0.272, -0.152 + D], 0.85);
  const goz = (gx: number, gy: number, w: number, ic: 1 | -1) => {
    const hu = 0.036 * g, hl = 0.017;
    const A: P2 = [gx - w / 2, gy + (ic < 0 ? 0.006 : 0)], B: P2 = [gx + w / 2, gy + (ic > 0 ? 0.006 : 0)];
    const ust: P2 = [gx + ic * w * 0.06, gy - 2 * hu], alt: P2 = [gx - ic * w * 0.05, gy + 2 * hl];
    const a = M(A), b = M(B), u = M(ust), l = M(alt);
    const d = `M${a[0]},${a[1]} Q${u[0]},${u[1]} ${b[0]},${b[1]} Q${l[0]},${l[1]} ${a[0]},${a[1]}Z`;
    const ustD = `M${a[0]},${a[1]} Q${u[0]},${u[1]} ${b[0]},${b[1]}`;
    // üst kapak (ağır kapak): kirpik hattı ile kapak kıvrımı arası ton alanı (çizgi değil)
    const k1 = M([gx - w * 0.52, gy - 0.004]), k2 = M([gx + ic * w * 0.06, gy - 2 * hu - 0.05]), k3 = M([gx + w * 0.54, gy - 0.002]);
    const kapak = `M${a[0]},${a[1]} Q${u[0]},${u[1]} ${b[0]},${b[1]} L${k3[0]},${k3[1]} Q${k2[0]},${k2[1]} ${k1[0]},${k1[1]}Z`;
    // iris: üst kapak %20 örter, alt kapağa değer; bakış yönünde kayar
    const iris: P2 = [gx + ifade.bakis[0] * w * 0.22, gy + 0.004 + ifade.bakis[1] * 0.006];
    return { d, ustD, kapak, iris, A, B, w, gx, gy };
  };
  const gY = goz(-0.125, -0.088 + D, 0.12, 1), gU = goz(0.178, -0.088 + D, 0.1, -1);
  const ag = ifade.agiz, mY = 0.3, mx0 = -0.03, mx1 = 0.13;
  const ISIK = isikX;
  // kirli sakal: çene + çene yanı + dudak üstü (seed'li 56 nokta), silüet içinde
  const sakal: P2[] = [];
  for (let i = 0; sakal.length < 44 && i < 400; i++) {
    const ust = i % 4 === 0;
    const q: P2 = ust ? [-0.03 + r(`sx${i}`) * 0.17, 0.258 + r(`sy${i}`) * 0.026] : [-0.2 + r(`sx${i}`) * 0.42, 0.33 + r(`sy${i}`) * 0.125];
    if (!ust && ((q[0] - 0.02) / 0.22) ** 2 + ((q[1] - 0.47) / 0.14) ** 2 > 1) continue;
    if (!ust && q[1] > 0.455 - Math.abs(q[0] - 0.0) * 0.35) continue;
    sakal.push(q);
  }

  // saç: dağınık tutamlı silüet (alından geri çekilmiş, şakaklarda açık), seed'li ±0.012
  const j = (q: P2, k: string, a = 0.012): P2 => [q[0] + (r(`hx${k}`) - 0.5) * 2 * a, q[1] + (r(`hy${k}`) - 0.5) * 2 * a];
  const sacDis: P2[] = [[-0.36, -0.1], [-0.385, -0.2], [-0.408, -0.3], [-0.37, -0.37], [-0.395, -0.45], [-0.31, -0.5], [-0.285, -0.565], [-0.18, -0.575], [-0.11, -0.618], [-0.005, -0.596], [0.075, -0.628], [0.155, -0.588], [0.235, -0.584], [0.272, -0.525], [0.326, -0.498], [0.31, -0.425], [0.322, -0.34], [0.298, -0.28]];
  const sacIc: P2[] = [[0.268, -0.3], [0.222, -0.36], [0.16, -0.388], [0.1, -0.38], [0.05, -0.405], [0.0, -0.418], [-0.05, -0.4], [-0.1, -0.378], [-0.17, -0.386], [-0.24, -0.372], [-0.29, -0.3], [-0.312, -0.2], [-0.33, -0.115]];
  const sac = [...sacDis.map((q, i) => (i % 2 ? q : j(q, `o${i}`))), ...sacIc.map((q, i) => j(q, `i${i}`, 0.008))];
  const sacD = Y(sac);

  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {/* uzak kulak: yalnız ~%30'u konturun dışında */}
      <path d={Y(kulakUzak)} fill={P.tenOrta} stroke={MK ? undefined : P.kontur} strokeWidth={2 * px} />
      {MK && <MurekkepKontur d={Y(kulakUzak)} renk={P.kontur} isik={MK.isik} kalinlik={[1.2 * px, 3.2 * px]} kayip={0.4} seed={seed + 21} />}
      {/* yakın kulak: iç kıvrım düz koyu alan */}
      <path d={Y(kulakYakin)} fill={P.tenOrta} stroke={MK ? undefined : P.kontur} strokeWidth={2.2 * px} />
      {MK && <MurekkepKontur d={Y(kulakYakin)} renk={P.kontur} isik={MK.isik} kalinlik={[1.2 * px, 3.6 * px]} kayip={0.4} seed={seed + 22} />}
      <path d={Y([[-0.348, -0.06], [-0.388, -0.075], [-0.395, -0.01], [-0.378, 0.07], [-0.352, 0.072], [-0.366, 0.0]])} fill={P.tenDerin} />
      <path d={yuzD} fill={P.ten} />
      <Kirp d={yuzD}>
        {/* ışıktan uzak yan: hacmi izleyen sınır (şakak → elmacık altı → ağız köşesi → çene) */}
        <path d={Y([[-0.42, -0.52], [-0.27, -0.5], [-0.285, -0.36], [-0.262, -0.2], [-0.235, -0.06], [-0.2, 0.06], [-0.14, 0.16], [-0.1, 0.27], [-0.07, 0.38], [-0.03, 0.5], [-0.42, 0.5]])} fill={P.tenOrta} />
        {/* şakak çukurları */}
        <path d={Y([[0.2, -0.31], [0.29, -0.33], [0.3, -0.19], [0.235, -0.17], [0.21, -0.24]])} fill={P.tenOrta} opacity={0.75} />
        {/* elmacık altı çöküntüsü (açlık) */}
        <path d={Y([[0.305, 0.05], [0.24, 0.085], [0.212, 0.17], [0.228, 0.26], [0.262, 0.235], [0.28, 0.14]])} fill={P.tenOrta} />
        <path d={Y([[-0.33, 0.05], [-0.25, 0.08], [-0.2, 0.16], [-0.215, 0.27], [-0.275, 0.25], [-0.31, 0.15]])} fill={P.tenDerin} opacity={0.5} />
        {/* alında iki kısa yatay ton bandı (yaş) */}
        <path d={SR([[-0.14, -0.31], [0.0, -0.325], [0.16, -0.308]], 0.02)} fill={P.tenOrta} opacity={0.42} />
        <path d={SR([[-0.08, -0.255], [0.03, -0.267], [0.14, -0.252]], 0.016)} fill={P.tenOrta} opacity={0.38} />
        {/* kaş arası dikey ton (endişe) */}
        <path d={SR([[0.03, -0.2 + D], [0.035, -0.15 + D]], 0.016)} fill={P.tenOrta} opacity={0.4} />
        {/* göz yuvaları + göz torbaları */}
        {[gY, gU].map((e, i) => <g key={i}>
          <path d={Y([[e.gx - e.w * 0.66, -0.11 + D], [e.gx - e.w * 0.2, -0.158 + D], [e.gx + e.w * 0.45, -0.15 + D], [e.gx + e.w * 0.72, -0.09 + D], [e.gx + e.w * 0.45, -0.03 + D], [e.gx - e.w * 0.1, -0.022 + D], [e.gx - e.w * 0.58, -0.05 + D]])} fill={P.tenOrta} opacity={0.45} />
          <path d={SR([[e.gx - e.w * 0.48, -0.052 + D], [e.gx, -0.028 + D], [e.gx + e.w * 0.5, -0.05 + D]], 0.026)} fill={P.tenDerin} opacity={0.32} />
          <path d={SR([[e.gx - e.w * 0.4, -0.012 + D], [e.gx + e.w * 0.05, 0.004 + D], [e.gx + e.w * 0.45, -0.014 + D]], 0.016)} fill={P.tenOrta} opacity={0.55} />
        </g>)}
        {/* burun (¾): gölge yan düzlemi kaşların altından başlar, uç topu, yakın kanat (ala) yuvarlak; tek görünen burun deliği */}
        <path d={Y([[0.02, -0.04], [0.04, -0.02], [0.046, 0.08], [0.05, 0.15], [0.02, 0.19], [-0.02, 0.188], [-0.006, 0.12], [0.004, 0.02]])} fill={P.tenOrta} opacity={0.9} />
        <path d={Y([[-0.052, 0.158], [-0.02, 0.146], [0.006, 0.17], [-0.004, 0.198], [-0.04, 0.204], [-0.062, 0.184]])} fill={P.tenOrta} />
        <path d={SR([[-0.06, 0.162], [-0.066, 0.186], [-0.044, 0.206]], 0.014)} fill={P.tenDerin} opacity={0.8} />
        <path d={Y([[0.02, 0.15], [0.08, 0.14], [0.112, 0.168], [0.098, 0.196], [0.05, 0.204], [0.018, 0.19]])} fill={P.yansima[1]} opacity={0.35} />
        {/* burun–dudak oluğu (iki yanda, ton) */}
        <path d={SR([[-0.064, 0.19], [-0.088, 0.25], [-0.066, 0.312]], 0.03)} fill={P.tenOrta} opacity={0.85} />
        <path d={SR([[0.126, 0.192], [0.155, 0.25], [0.146, 0.31]], 0.022)} fill={P.tenOrta} opacity={0.6} />
        {/* üst dudak gölgesi, alt dudak altı */}
        <path d={Y([[mx0 - 0.01, mY - 0.02], [0.04, mY - 0.03], [mx1 + 0.012, mY - 0.022], [mx1 + 0.02, mY - 0.002], [mx0 - 0.02, mY + 0.002]])} fill={P.tenOrta} />
        <path d={Y([[mx0 + 0.005, mY + 0.05], [0.05, mY + 0.044], [mx1 - 0.01, mY + 0.05], [mx1 - 0.03, mY + 0.074], [0.05, mY + 0.082], [mx0 + 0.02, mY + 0.072]])} fill={P.tenDerin} opacity={0.7} />
        {/* gölge yanında ince gravür taraması */}
        {!MK && <Tarama sekil={([[-0.42, -0.3], [-0.29, -0.3], [-0.262, -0.2], [-0.235, -0.06], [-0.2, 0.06], [-0.14, 0.16], [-0.1, 0.27], [-0.06, 0.45], [-0.42, 0.45]] as P2[]).map(M)} basamak="III" aci={70} renk={P.tarama} aralik={6.5 * px} kalinlik={1.5 * px} seed={seed + 3} alfaCarpan={0.7} ton={0} />}
        {/* tur-4: ince ton taraması — gölge yanı + çene altı + göz yuvası (yüzü saran eğri: elmacık yayı) */}
        {/* gölge yanı: yanağı saran kısa eğri çizgiler (elmacıktan çeneye), yalnız ışıktan uzak üçte birde; ince ve yarı saydam */}
        {MK && <TonTarama d={yuzD} isik={MK.isik} ton={MK.ton ?? 0.8} renk={P.tarama} seed={seed + 3} aralik={3.6 * px} kalinlik={1.5 * px} gecis={[0.05, 0.9]} mod="egri"
          eksen={([[-0.36, -0.12], [-0.2, 0.0], [0.0, 0.08]] as P2[]).map(M)} alfa={0.5} yumusak={0.35} />}
        {MK && <TonTarama d={Y([[-0.3, 0.36], [0.0, 0.42], [0.26, 0.3], [0.3, 0.5], [-0.3, 0.5]])} isik={MK.isik} ton={0.6} renk={P.tarama} seed={seed + 4} aralik={3.4 * px} kalinlik={1.3 * px} gecis={[-0.6, 0.6]} alfa={0.4} yumusak={0.35} />}
        {/* kirli sakal */}
        <path d={Y([[-0.2, 0.34], [0.0, 0.358], [0.2, 0.33], [0.17, 0.42], [0.05, 0.47], [-0.08, 0.46], [-0.18, 0.4]])} fill={P.tenOrta} opacity={0.28} />
        <path d={Y([[-0.035, 0.256], [0.06, 0.25], [0.145, 0.258], [0.135, 0.282], [-0.025, 0.282]])} fill={P.tenOrta} opacity={0.3} />
        {sakal.map((q, i) => { const m = M(q); return <circle key={i} cx={m[0]} cy={m[1]} r={(0.9 + r(`sr${i}`) * 0.7) * px} fill={karistir(P.sac, P.tenDerin, 0.45)} opacity={0.42} />; })}
        {/* alttan sıcak yansıma */}
        <Kirp d={Y([[-0.6, 0.18], [0.6, 0.12], [0.6, 0.7], [-0.6, 0.7]])}>
          <Hilal d={yuzD} renk={P.yansima[0]} dx={-ISIK * 0.01 * H} dy={-0.045 * H} />
          <Hilal d={yuzD} renk={P.yansima[1]} dx={-ISIK * 0.005 * H} dy={-0.018 * H} />
        </Kirp>
        <path d={Y([[mx0 + 0.02, mY + 0.022], [0.05, mY + 0.03], [mx1 - 0.02, mY + 0.02], [mx1 - 0.03, mY + 0.034], [0.05, mY + 0.042], [mx0 + 0.03, mY + 0.034]])} fill={P.yansima[0]} opacity={0.75} />
      </Kirp>
      {/* kaşlar */}
      <path d={Y(kasYakin)} fill={P.kas} />
      <path d={Y(kasUzak)} fill={P.kas} />
      {/* gözler */}
      {[gY, gU].map((e, i) => <g key={i}>
        <path d={e.kapak} fill={P.tenOrta} opacity={0.85} />
        <path d={e.d} fill={P.gozAk} />
        <Kirp d={e.d}>
          <circle cx={M(e.iris)[0]} cy={M(e.iris)[1]} r={0.036 * H * (i ? 0.92 : 1)} fill={P.iris} />
          <circle cx={M(e.iris)[0]} cy={M(e.iris)[1]} r={0.015 * H * (i ? 0.92 : 1)} fill={P.bebek} />
          <circle cx={M(e.iris)[0] - 0.012 * H} cy={M(e.iris)[1] + 0.006 * H} r={0.006 * H} fill={P.parilti} />
          {/* üst kapağın göz akına düşen gölgesi */}
          <path d={`${e.ustD} L${M([e.B[0], e.B[1] + 0.03])[0]},${M([e.B[0], e.B[1] + 0.03])[1]} Q${M([e.gx, -0.02 + D - 0.03])[0]},${M([e.gx, -0.02 + D - 0.03])[1]} ${M([e.A[0], e.A[1] + 0.03])[0]},${M([e.A[0], e.A[1] + 0.03])[1]}Z`} fill={P.tenDerin} opacity={0.35} />
        </Kirp>
        <path d={e.ustD} stroke={P.kontur} strokeWidth={3.6 * px} fill="none" />
      </g>)}
      {/* burun sırtı hilali (ışık tarafı) + burun delikleri */}
      <path d={SR([[0.048, -0.06], [0.062, 0.05], [0.082, 0.15]], 0.016)} fill={P.kenar} opacity={0.55} />
      <path d={Y([[0.0, 0.194], [0.03, 0.188], [0.042, 0.198], [0.012, 0.206]])} fill={P.agizIc} opacity={0.8} />
      {/* ağız: hafif aralık */}
      <path d={Y([[mx0, mY - 0.004], [0.0, mY - 0.012 - 0.004 * ag], [0.05, mY - 0.008 - 0.004 * ag], [0.095, mY - 0.012 - 0.004 * ag], [mx1, mY], [0.095, mY + 0.01 + 0.01 * ag], [0.05, mY + 0.013 + 0.012 * ag], [0.0, mY + 0.01 + 0.01 * ag]])} fill={P.agizIc} />
      <path d={Y([[mx0 + 0.01, mY - 0.006], [0.0, mY - 0.026], [0.04, mY - 0.023], [0.055, mY - 0.027], [0.1, mY - 0.023], [mx1 - 0.006, mY - 0.003], [0.095, mY - 0.012], [0.05, mY - 0.01], [0.0, mY - 0.012]])} fill={P.dudak} />
      {/* kontur + ışık yönünde sıcak kenar */}
      {MK ? <MurekkepKontur d={yuzD} renk={P.kontur} isik={MK.isik} kalinlik={[1.1 * px, 4.6 * px]} kayip={0.55} seed={seed + 23} />
        : <path d={yuzD} fill="none" stroke={P.kontur} strokeWidth={2.6 * px} />}
      <Hilal d={yuzD} renk={P.kenar} dx={-ISIK * 3.2 * px} dy={-1 * px} />
      {/* saç: tutamlı kütle + kır şakaklar + 3 sivrilen açık tutam (eşit aralıksız) */}
      <path d={sacD} fill={P.sac} />
      <Kirp d={sacD}>
        {/* şakaklarda kır: saç yönünde sivrilen tutamlar (blok değil) */}
        <path d={SR([[-0.33, -0.11], [-0.362, -0.2], [-0.372, -0.3]], 0.034, "tek")} fill={P.sacKir} opacity={0.7} />
        <path d={SR([[-0.312, -0.15], [-0.335, -0.24], [-0.33, -0.31]], 0.022, "tek")} fill={P.sacKir} opacity={0.8} />
        <path d={SR([[0.288, -0.29], [0.31, -0.36], [0.292, -0.43]], 0.028, "tek")} fill={P.sacKir} opacity={0.9} />
        <path d={SR([[0.14, -0.44], [0.0, -0.52], [-0.17, -0.535], [-0.27, -0.49]], 0.03, "tek")} fill={P.sacIsik} />
        <path d={SR([[0.25, -0.51], [0.13, -0.575], [-0.02, -0.585]], 0.022, "tek")} fill={P.sacIsik} opacity={0.85} />
        <path d={SR([[-0.2, -0.42], [-0.3, -0.41], [-0.37, -0.32]], 0.02, "tek")} fill={P.sacIsik} opacity={0.8} />
        <path d={SR([[0.04, -0.41], [-0.08, -0.47], [-0.22, -0.47]], 0.016)} fill={P.sacKontur} opacity={0.7} />
      </Kirp>
      {MK && <TonTarama d={sacD} isik={MK.isik} ton={0.9} renk={P.sacKontur} seed={seed + 5} aralik={4.2 * px} kalinlik={1.8 * px} mod="egri" eksen={([[0.3, -0.3], [0.1, -0.55], [-0.2, -0.56], [-0.38, -0.3]] as P2[]).map(M)} gecis={[-0.5, 0.6]} />}
      {MK ? <MurekkepKontur d={sacD} renk={P.sacKontur} isik={MK.isik} kalinlik={[1.2 * px, 4 * px]} kayip={0.3} seed={seed + 24} />
        : <path d={sacD} fill="none" stroke={P.sacKontur} strokeWidth={2.2 * px} />}
      <Hilal d={sacD} renk={P.kenar} dx={-ISIK * 3 * px} dy={2 * px} />
    </g>
  );
};

// ---------------- PROFİL BAŞ (T3) — BMC BasProfil kopyası + K3 düzeltmeleri ----------------
const yolB = (a: P2[], kapali = true) => crP(a, kapali);
export const lgProfilGeo = (c: YuzKart) => {
  const u = c.uzun, b = c.burun, ce = c.cene;
  const on: P2[] = [
    [0.27, -0.36 * u], [0.335, -0.24 * u], [0.37, -0.125 * u], [0.345, -0.065 * u],
    [0.355 + 0.045 * b, 0.02 * u], [0.37 + 0.07 * b, 0.1 * u], [0.405 + 0.02 * b, 0.135 * u], [0.365, 0.16 * u],
    [0.38 + 0.01 * c.dudak, 0.215 * u], [0.356, 0.25 * u], [0.372 + 0.01 * c.dudak, 0.285 * u], [0.342, 0.322 * u],
    [0.37 + 0.02 * ce, 0.4 * u], [0.33 + 0.02 * ce, 0.462 * u], [0.25, 0.49 * u],
  ];
  const cene: P2[] = [[0.12, 0.47 * u], [0.0, 0.42 * u], [-0.1 - 0.02 * ce, 0.34 * u], [-0.14 - 0.01 * ce, 0.26 * u], [-0.13, 0.12 * u]];
  const arka: P2[] = [[-0.26, 0.24 * u], [-0.41, 0.0], [-0.38, -0.3 * u], [-0.12, -0.5 * u], [0.12, -0.49 * u]];
  return { on, cene, arka, goz: [0.272, -0.045 * u] as P2, kulak: [-0.06, -0.01] as P2 };
};
/** profil baş (sağa bakar). x,y = kulak merkezi; H = tepe→çene px. Işık önden (yüzün baktığı yandan). */
/** konturAlfa (tur-4, varsayılan 1 = T3 piksel-aynı): 0 verilirse kafa dış konturu çizilmez (dışarıdan MurekkepKontur bindirilir; lgProfilEkran) */
export const LgBasProfil: React.FC<{ kart: YuzKart; x: number; y: number; H: number; egim?: number; sicak: string; kenar: string; bakisY?: number; seed?: number; konturAlfa?: number }> = ({ kart: c, x, y, H, egim = 0, sicak, kenar, bakisY = 0, seed = 1950, konturAlfa = 1 }) => {
  const id = useId().replace(/:/g, "");
  const g = lgProfilGeo(c), u = c.uzun;
  const kd = yolB([...g.on, ...g.cene, ...g.arka]), sw = (px: number) => px / H;
  const tenG = karistir(c.ten, c.tenGolge, 0.62), tenM = karistir(c.ten, sicak, 0.12), tenI = karistir(c.ten, sicak, 0.38);
  const kontur = karistir(c.tenGolge, "#3e302b", 0.55);
  const r = (k: string) => rnd(seed, k);
  const yas = Math.max(0, c.kirisik);
  // saç (başlıksız): alın ve ense çizgisi düzensiz tutamlı
  const sacP: P2[] = [[0.285, -0.36 * u], [0.25, -0.43 * u], [0.27, -0.47 * u], [0.18, -0.5 * u], [0.12, -0.56 * u], [0.04, -0.54 * u], [-0.05, -0.58 * u], [-0.16, -0.54 * u], [-0.26, -0.53 * u], [-0.33, -0.45 * u], [-0.4, -0.4 * u], [-0.41, -0.26 * u],
    [-0.44, -0.16 * u], [-0.405, -0.05], [-0.42, 0.04], [-0.37, 0.1 * u], [-0.33, 0.06], [-0.3, -0.04], [-0.27, -0.14 * u], [-0.2, -0.24 * u], [-0.08, -0.31 * u], [0.04, -0.33 * u], [0.12, -0.345 * u], [0.2, -0.33 * u], [0.25, -0.38 * u]]
    .map((q, i) => [q[0] + (r(`p${i}`) - 0.5) * 0.02, q[1] + (r(`q${i}`) - 0.5) * 0.02] as P2);
  return (
    <g transform={`translate(${x} ${y}) rotate(${egim}) scale(${H} ${H})`} strokeLinecap="round" strokeLinejoin="round">
      <defs><clipPath id={`k${id}`}><path d={kd} /></clipPath><clipPath id={`b${id}`}><path d={`M${0.17 * c.boyun},${0.38 * u} L${0.17 * c.boyun},${0.7} L${-0.2 * c.boyun},${0.7} L${-0.22 * c.boyun},${0.24 * u} L-0.22,0.02 L0.05,0.1 Z`} /></clipPath></defs>
      {/* boyun: mastoidden çene altının içinden; ışık çizgisi YOK → yan yüzde 2 basamak ton */}
      <path d={`M${0.17 * c.boyun},${0.38 * u} L${0.17 * c.boyun},${0.7} L${-0.2 * c.boyun},${0.7} L${-0.22 * c.boyun},${0.24 * u} L-0.22,0.02 L0.05,0.1 Z`} fill={tenG} />
      <g clipPath={`url(#b${id})`}>
        <path d={`M0.04,${0.42 * u} Q0.12,${0.5 * u} 0.11,0.72 L0.3,0.72 L0.3,${0.4 * u}Z`} fill={tenM} />
        <path d={`M0.1,${0.47 * u} Q0.15,${0.55 * u} 0.15,0.72 L0.3,0.72 L0.3,${0.46 * u}Z`} fill={tenI} opacity={0.8} />
        <path d={`M-0.12,${0.3 * u} Q-0.02,${0.46 * u} -0.02,0.72 L-0.3,0.72 L-0.3,${0.3 * u}Z`} fill={karistir(tenG, c.tenGolge, 0.4)} opacity={0.7} />
      </g>
      <path d={`M${0.15},${0.47 * u} Q0.0,${0.44 * u} -0.1,${0.36 * u} L-0.12,${0.46 * u} Q0.02,${0.56 * u} ${0.16},${0.52 * u} Z`} fill={karistir(tenG, c.tenGolge, 0.5)} opacity={0.6} />
      {/* kafa: gölge tabanı */}
      <path d={kd} fill={tenG} stroke={kontur} strokeWidth={sw(3.5)} strokeOpacity={konturAlfa} />
      <g clipPath={`url(#k${id})`}>
        {/* ön düzlem ışığı: iki basamak; sınır alından elmacığa, elmacıktan ağız köşesine kavisli (yüz hacmini izler, bıçak yok) */}
        <path d={yolB([[0.2, -0.62], [0.18, -0.36 * u], [0.15, -0.2 * u], [0.13, -0.05 * u], [0.15, 0.06 * u], [0.2, 0.16 * u], [0.25, 0.25 * u], [0.22, 0.36 * u], [0.16, 0.48 * u], [0.12, 0.66], [0.7, 0.66], [0.7, -0.62]])} fill={tenM} />
        <path d={yolB([[0.27, -0.62], [0.25, -0.36 * u], [0.23, -0.22 * u], [0.22, -0.08 * u], [0.25, 0.04 * u], [0.29, 0.15 * u], [0.31, 0.26 * u], [0.28, 0.38 * u], [0.25, 0.5 * u], [0.22, 0.66], [0.7, 0.66], [0.7, -0.62]])} fill={tenI} />
        {/* elmacık altı / şakak: yumuşak ton alanı (çizgi yok) */}
        <path d={yolB([[0.05, 0.08 * u], [0.16, 0.1 * u], [0.22, 0.2 * u], [0.14, 0.24 * u], [0.06, 0.18 * u]])} fill={karistir(tenG, c.tenGolge, 0.35)} opacity={0.35 + 0.25 * c.elmacik} />
        <path d={yolB([[0.15, -0.3 * u], [0.24, -0.29 * u], [0.25, -0.18 * u], [0.17, -0.17 * u]])} fill={karistir(tenM, c.tenGolge, 0.3)} opacity={0.2 + 0.3 * yas} />
        {/* kirli sakal: çene ve yanak altı nokta */}
        {c.sakal > 0 && <path d={yolB([[0.0, 0.22 * u], [0.3, 0.3 * u], [0.36, 0.42 * u], [0.25, 0.49 * u], [0.06, 0.44 * u], [-0.1, 0.33 * u]])} fill={karistir(tenG, c.sac, 0.25)} opacity={0.3} />}
        {c.sakal > 0 && Array.from({ length: Math.round(80 * c.sakal) }).map((_, i) => { const a = r(`sk${i}`), b2 = r(`sk2${i}`); const qx = -0.08 + a * 0.44, qy = (0.2 + b2 * 0.3) * u;
          return qy > 0.17 + qx * 0.4 ? <circle key={i} cx={qx} cy={qy} r={sw(1.0)} fill={karistir(c.sac, tenG, 0.35)} opacity={0.45} /> : null; })}
      </g>
      {/* kulak */}
      <path d={`M${g.kulak[0] + 0.05 * c.kulak},${g.kulak[1] - 0.08 * c.kulak} C${g.kulak[0] - 0.06 * c.kulak},${g.kulak[1] - 0.12 * c.kulak} ${g.kulak[0] - 0.09 * c.kulak},${g.kulak[1] + 0.08 * c.kulak} ${g.kulak[0] - 0.01 * c.kulak},${g.kulak[1] + 0.1 * c.kulak}`} fill={karistir(tenG, c.ten, 0.3)} stroke={kontur} strokeWidth={sw(3)} />
      <path d={yolB([[g.kulak[0] - 0.005, g.kulak[1] - 0.05], [g.kulak[0] - 0.045, g.kulak[1] - 0.04], [g.kulak[0] - 0.05, g.kulak[1] + 0.04], [g.kulak[0] - 0.015, g.kulak[1] + 0.06], [g.kulak[0] - 0.03, g.kulak[1] + 0.0]])} fill={karistir(tenG, c.tenGolge, 0.5)} />
      {/* favori: kulağın ÖNÜNDE, kulak boyunun ~%60'ı, aşağı sivrilen saç yönlü şekil */}
      <path d={serit([[0.02, -0.17 * u], [0.035, -0.12 * u], [0.04, -0.07 * u], [0.035, -0.035 * u]], 0.045, "tek")} fill={c.sac} opacity={0.95} />
      {/* saç: tutamlı kütle + 2 açık tutam (sivrilen) */}
      <path d={yolB(sacP)} fill={c.sac} stroke={karistir(c.sac, "#1a1416", 0.5)} strokeWidth={sw(2.5)} />
      <path d={serit([[0.2, -0.42 * u], [0.04, -0.49 * u], [-0.14, -0.48 * u], [-0.3, -0.4 * u]], 0.035, "tek")} fill={karistir(c.sac, sicak, 0.3)} />
      <path d={serit([[0.1, -0.36 * u], [-0.06, -0.4 * u], [-0.2, -0.37 * u]], 0.022, "tek")} fill={karistir(c.sac, sicak, 0.22)} opacity={0.85} />
      <path d={serit([[0.27, -0.44 * u], [0.24, -0.38 * u], [0.27, -0.37 * u]], 0.02)} fill={karistir(c.sac, sicak, 0.45)} />
      {/* kaş */}
      <path d={serit([[0.17, (-0.11 + c.kasAci * 0.003) * u], [0.27, -0.138 * u], [0.355, (-0.122 - c.kasAci * 0.002) * u]], 0.034 * c.kas, "tek")} fill={karistir(c.sac, "#3a2c2c", 0.4)} />
      {/* göz: profil kanat + ağır üst kapak (ton) + bakış aşağı */}
      {(() => { const [gx, gy] = g.goz, a = 0.02 * c.goz; return <g>
        <path d={`M${gx - 0.05},${gy} Q${gx},${gy - a * 1.3} ${gx + 0.045},${gy + 0.004} Q${gx},${gy + a * 0.9} ${gx - 0.05},${gy} Z`} fill="#d8c8b8" stroke={kontur} strokeWidth={sw(2)} />
        <circle cx={gx + 0.026} cy={gy + 0.003 + bakisY * 0.006} r={Math.min(0.016, a * 0.75 + 0.004)} fill="#1c1418" />
        <path d={`M${gx - 0.055},${gy - 0.002} Q${gx},${gy - a * 2.6 - 0.012} ${gx + 0.05},${gy - 0.002} Q${gx},${gy - a * 1.3} ${gx - 0.055},${gy - 0.002}Z`} fill={karistir(tenG, c.tenGolge, 0.3)} />
        <path d={`M${gx - 0.055},${gy + 0.001} Q${gx},${gy - a * 1.5} ${gx + 0.05},${gy + 0.003}`} stroke={karistir(c.sac, "#2a2026", 0.5)} strokeWidth={sw(4.2)} fill="none" />
        <ellipse cx={gx - 0.005} cy={gy + a * 1.9 + 0.012} rx={0.045} ry={0.016 + 0.01 * yas} fill={c.tenGolge} opacity={0.15 + 0.3 * yas} />
      </g>; })()}
      {/* ağız (nötr, köşe hafif aşağı) + burun kanadı tonu */}
      <path d={`M0.356,${0.25 * u} Q0.32,${0.248 * u} 0.287,${0.26 * u}`} stroke={kontur} strokeWidth={sw(2.8)} fill="none" />
      <path d={yolB([[0.33, 0.12 * u], [0.365, 0.122 * u], [0.37, 0.16 * u], [0.34, 0.165 * u]])} fill={karistir(tenM, c.tenGolge, 0.4)} opacity={0.7} />
      <path d={serit([[0.33, 0.165 * u], [0.3, 0.21 * u], [0.29, 0.255 * u]], 0.022)} fill={karistir(tenM, c.tenGolge, 0.35)} opacity={0.5 * (0.4 + yas)} />
      <path d={yolB([...g.on.slice(0, 13)], false)} fill="none" stroke={kenar} strokeWidth={sw(3)} opacity={0.75} />
    </g>
  );
};

/** birleşik silüetin (çok parça) kenar hilali: yalnız dış sınırda (parçalar arası iç kenarda hilal çıkmaz) */
export const HilalB: React.FC<{ d: string[]; renk: string; dx: number; dy: number; alfa?: number }> = ({ d, renk, dx, dy, alfa = 1 }) => {
  const id = "hb" + useId().replace(/:/g, "");
  return <g>
    <defs><mask id={id} maskUnits="userSpaceOnUse" x={-500} y={-500} width={2100} height={2900}>
      {d.map((x, i) => <path key={`w${i}`} d={x} fill="#fff" />)}
      <g transform={`translate(${dx} ${dy})`}>{d.map((x, i) => <path key={`b${i}`} d={x} fill="#000" />)}</g>
    </mask></defs>
    <g mask={`url(#${id})`} opacity={alfa}>{d.map((x, i) => <path key={i} d={x} fill={renk} />)}</g>
  </g>;
};
/** çok parçalı kırpma (birleşim) */
export const KirpB: React.FC<{ d: string[]; children: React.ReactNode }> = ({ d, children }) => {
  const id = "kb" + useId().replace(/:/g, "");
  return <g><defs><clipPath id={id}>{d.map((x, i) => <path key={i} d={x} />)}</clipPath></defs><g clipPath={`url(#${id})`}>{children}</g></g>;
};

// ---------------- İNCE EL (T3): kemikli, ayrı ve kıvrık parmaklı el; eşit olmayan ölçek yok, tırnak/yüzük çizgisi yok ----------------
// Yerel: bilek (0,0), +x parmaklara, başparmak −y yanında (ayna → +y), birim E (bilek → orta parmak ucu, düz parmakta).
// Avuç dar (bilekte 0.28 E, boğumda 0.38 E). Parmak: üç boğum kapsülü; b = toplam kıvrım (°) → kıvrık parmak ekranda kısalır.
// Çizim: (1) birleşik kontur + dolgu, (2) ışığın tersindeki gölge hilali + ışık yönünde ince sıcak kenar, (3) parmak ayrımı: arkadan öne
// her parmağın kendi ince konturu (ten koyusu, siyah değil), (4) boğumda tek ton işareti.
export type IncElPoz = { a: [number, number, number, number]; b: [number, number, number, number]; k?: [number, number, number, number]; bas: { a: number; b: number; k?: number } };
export const INC_POZ: Record<"sarkik" | "dayali" | "tutus" | "avuc", IncElPoz> = {
  sarkik: { a: [-3, -1, 1, 3], b: [26, 34, 40, 46], bas: { a: -24, b: 14, k: 0.92 } },
  dayali: { a: [-4, -1, 2, 5], b: [44, 50, 54, 58], k: [0.98, 1, 0.98, 0.94], bas: { a: -30, b: 10 } },
  tutus: { a: [-6, -1, 4, 9], b: [62, 70, 76, 82], k: [0.95, 1, 0.96, 0.9], bas: { a: -8, b: 6, k: 1.05 } },
  avuc: { a: [-6, -2, 2, 6], b: [15, 18, 21, 26], bas: { a: -34, b: 8 } },
};
const IK: P2[] = [[0.44, -0.14], [0.47, -0.046], [0.46, 0.048], [0.425, 0.135]];
const IL = [0.44, 0.5, 0.47, 0.37], IW = [0.098, 0.104, 0.096, 0.084];
export const incElGeo = (bilek: P2, aci: number, E: number, poz: IncElPoz, ayna = false) => {
  const r = (aci * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r), sy = ayna ? -1 : 1;
  const M = (q: P2): P2 => [bilek[0] + (q[0] * c - q[1] * sy * s) * E, bilek[1] + (q[0] * s + q[1] * sy * c) * E];
  const parmak = IK.map((k0, i) => {
    const L = IL[i] * (poz.k?.[i] ?? 1), a0 = (poz.a[i] * Math.PI) / 180, b = (poz.b[i] * Math.PI) / 180;
    const pts: P2[] = [k0]; let ang = a0, p = k0;
    [0.46, 0.3, 0.24].forEach((f, j) => { ang = a0 + b * [0.3, 0.65, 1][j] * 0.5; const l = L * f * Math.cos(b * [0.3, 0.6, 0.9][j]); p = [p[0] + Math.cos(ang) * l, p[1] + Math.sin(ang) * l]; pts.push(p); });
    return { q: pts.map(M), w: [IW[i], IW[i] * 0.94, IW[i] * 0.86, IW[i] * 0.78].map((v) => (v * E) / 2) };
  });
  const ba = (poz.bas.a * Math.PI) / 180, bb = (poz.bas.b * Math.PI) / 180, bk = poz.bas.k ?? 1, b0: P2 = [0.1, -0.15];
  const b1: P2 = [b0[0] + Math.cos(ba) * 0.2 * bk, b0[1] + Math.sin(ba) * 0.2 * bk], b2: P2 = [b1[0] + Math.cos(ba + bb) * 0.17 * bk, b1[1] + Math.sin(ba + bb) * 0.17 * bk];
  const bas = { q: [b0, b1, b2].map(M), w: [0.09, 0.075, 0.064].map((v) => (v * E) / 2) };
  const avuc = cr(([[-0.04, -0.14], [0.16, -0.17], [0.4, -0.18], [0.47, -0.1], [0.485, 0.0], [0.47, 0.1], [0.43, 0.17], [0.2, 0.155], [-0.04, 0.14]] as P2[]).map(M));
  return { M, parmak, bas, avuc };
};
const parcaD = (p: { q: P2[]; w: number[] }) => p.q.slice(0, -1).map((a, j) => kapsul(a, p.q[j + 1], p.w[j], p.w[j + 1]));
/** murekkep (tur-4, isteğe bağlı; verilmezse T3 piksel-aynı): dış kontur BirlesikM (ışığa göre ince→kalın) + avuç/parmak boyu ton taraması */
export const IncEl: React.FC<{ bilek: P2; aci: number; E: number; poz: IncElPoz; ayna?: boolean; ten: string; golge: string; kontur: string; ayrim?: string; kenar?: string; isik: P2; sira?: "isaretOnde" | "sercOnde"; golgeRenk?: string; golgeKay?: P2; murekkep?: { ton?: number; seed?: number } }> = ({ bilek, aci, E, poz, ayna, ten, golge, kontur, ayrim, kenar, isik, sira = "isaretOnde", golgeRenk, golgeKay, murekkep: MK }) => {
  const g = incElGeo(bilek, aci, E, poz, ayna);
  const sirali = sira === "isaretOnde" ? [3, 2, 1, 0] : [0, 1, 2, 3];
  const tum = [g.avuc, ...parcaD(g.bas), ...g.parmak.flatMap(parcaD)];
  if (golgeRenk) return <g transform={`translate(${golgeKay?.[0] ?? 0} ${golgeKay?.[1] ?? 0})`} fill={golgeRenk}>{tum.map((d, i) => <path key={i} d={d} />)}</g>;
  const L = Math.hypot(isik[0], isik[1]) || 1, lx = isik[0] / L, ly = isik[1] / L, k = 0.06 * E;
  const isikYon: P2 = [-lx, -ly]; // IncEl.isik ışığın GELDİĞİ yön; araçlar gittiği yönü ister
  return <g strokeLinejoin="round">
    {MK ? <BirlesikM d={tum} dolgu={ten} kontur={kontur} ayar={{ isik: isikYon, kalinlik: [0.9, Math.max(2.6, E * 0.022)], kayip: 0.35, seed: MK.seed ?? 77 }} />
      : <Birlesik d={tum} dolgu={ten} kontur={kontur} k={1.3} />}
    <HilalB d={tum} renk={golge} dx={lx * k} dy={ly * k} />
    {kenar && <HilalB d={tum} renk={kenar} dx={-lx * 3} dy={-ly * 3} alfa={0.8} />}
    {/* parmak ayrımı: arkadaki parmağın üstüne öndekinin ince konturu */}
    {sirali.map((i) => <g key={i}>{MK ? <BirlesikM d={parcaD(g.parmak[i])} dolgu={ten} kontur={ayrim ?? golge} ayar={{ isik: isikYon, kalinlik: [0, 1.8], kayip: 1, seed: (MK.seed ?? 77) + 10 + i }} /> : <Birlesik d={parcaD(g.parmak[i])} dolgu={ten} kontur={ayrim ?? golge} k={0.85} />}
      <Kirp d={parcaD(g.parmak[i]).join(" ")}><HilalB d={parcaD(g.parmak[i])} renk={golge} dx={lx * k * 0.6} dy={ly * k * 0.6} /></Kirp></g>)}
    {/* boğumda tek ton işareti */}
    {!MK && g.parmak.map((p, i) => <ellipse key={`b${i}`} cx={p.q[1][0]} cy={p.q[1][1]} rx={p.w[1] * 0.55} ry={p.w[1] * 0.35} fill={golge} opacity={0.4} />)}
    {MK && <TonTarama d={tum} isik={isikYon} ton={MK.ton ?? 0.7} renk={murekkepRenk(golge, 0.55)} seed={(MK.seed ?? 77) + 1} aralik={Math.max(3.6, E * 0.028)} kalinlik={Math.max(1.4, E * 0.011)} mod="egri" eksen={[g.parmak[1].q[0], g.parmak[1].q[2], g.parmak[1].q[3]]} gecis={[-0.2, 0.8]} alfa={0.7} />}
  </g>;
};
