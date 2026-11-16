// ===== SOKAK-LG (kuşatma sokağı, kış) — mekanlar.md §12 (ortak), §14 (SOKAK-LG), yön karesi §14.9 (P03a p114) =====
// Tek dünya (u yanal, h yükseklik, z derinlik; m), `kamera25d` izdüşümü. Sokak cephe-cephe 16 m (u ±8), eksen +z = KD.
// TEK IŞIK: alçak güneş (kış ~13:00, yükseklik 10°, azimut 185°) → güneşe yön G = (0.633, 0.174, −0.754) (sağ-arka).
//   20 m'lik sağ cepheler sokağı tamamen gölgede bırakır; güneş yalnız sağ cephe sırasındaki BOŞLUKLARDAN girer.
//   Bir yüzey noktası (u, h, z) ışıklı ⇔ güneşe giden ışın sağ cephe düzlemini (u = 8) bir boşluk içinde keser:
//   z' = z − 1.19·(8 − u) ∈ [z_a, z_b]. Boşluğun ardında güneye açık alan var (nehir/rıhtım — [G] varsayım, raporda).
//   Boşluklar: önde çapraz sokak (z 18–34) → karda çapraz gül şerit + sol cephede gül yama; kameranın arkasında çapraz sokak
//   (z −20…−8.3) → yakın sol kar, el ve kol ışıkta (kenar ışığı sağ-arka kenarlarda); avuç (yukarı bakan yüz) sıyırma ışıkta, gölge tonu.
// Görüntüde yazı/tabela yok (dil-nötr). Kırmızı yok. Kızak: boş, üstünde tahta su kovası (orkestra kararı; ölü taşıma yok).
import React from "react";
import { Tarama } from "../../../doku/Tarama";
import { karistir, rnd } from "../../../doku/sabitler";
import { kamera25, Kamera25, V3 } from "../../kamera25d";
import { GravurEl, GRAVUR_POZ, GravurPalet } from "../../props/paris/GravurEl";
import { param, Sablon, SablonProps } from "../../ortak";
import { cr, dunya, Dunya, Hilal, Kirp, LgBaski, P2, pS } from "./lgOrtak";
import { SokakP03a } from "./SokakHedef";
import { SokakP03aT3 } from "./SokakT3";

const SD = 1941;
export const LS = {
  gok: ["#6a82ab", "#8b9dbd", "#a8b6cb", "#d0c8d0", "#f0cdb8"] as const, isima: "#f2c9b2",
  cepheIsik: ["#e2bba6", "#dcbc94", "#b9c4a2", "#dcb4ac"] as const, cepheGolge: ["#8d85a6", "#837da4", "#8f86a2", "#8789ab"] as const, cepheDerin: "#7a7394",
  kaide: "#5a4a66", kaideIsik: "#a07e70", rustika: "#6f6890", cam: "#3d3a66", camCerceve: "#5a5680", boru: "#4e5a78", boruIsik: "#6a7aa0",
  kar: "#dcd4dc", karKenar: "#ead6cc", karGolge: "#8f93b4", karDerin: "#6d7098", karAcik: "#a3a6c4",
  serit: ["#f0d6c4", "#ead6cc", "#e8c0a0"] as const, duman: "#9b9fc4", dumanIsik: "#e8c0a0", bugu: "#d0c8d0",
  ten: "#b89698", tenGolge: "#8c7486", tenKenar: "#e6b5a0", ekmek: "#5a4638", ekmekKenar: "#8a6c58", ekmekIc: "#4a3a32",
  kol: "#3d3a66", kolGolge: "#2a2850", kayis: "#4a3a3c", tahta: "#6b5040", tahtaGolge: "#4a3830", nefes: "#d8d2dc", tane: "#e9d9d6",
};

// ---- ışık (tek kaynak) ----
const G: V3 = [0.633, 0.174, -0.754];
const BOSLUK: [number, number][] = [[-22, -7.8], [18, 34]]; // sağ cephe boşlukları (z)
const isikli = (u: number, z: number) => { const zp = z + (G[2] / G[0]) * (8 - u); return BOSLUK.some(([a, b]) => zp >= a && zp <= b); }; // G[2]/G[0] = −1.19
/** ışıklı u aralığı (z satırında): z − 1.19(8 − u) ∈ [a, b] ⇔ u ∈ [8 − (z − a)/1.19, 8 − (z − b)/1.19] */
const isikAralik = (z: number): [number, number][] => BOSLUK.map(([a, b]) => [8 - (z - a) / 1.19, 8 - (z - b) / 1.19] as [number, number]).map(([x, y]) => [Math.max(-8, Math.min(x, y)), Math.min(8, Math.max(x, y))] as [number, number]).map(([x, y]) => (y > x ? [x, y] : [8, 8]) as [number, number]);

// ---- kar yüzeyi (yükseklik alanı) ----
const pc = (z: number) => 0.06 * Math.sin(z * 0.35) + 0.04 * Math.sin(z * 0.11 + 1);
const yigin = (z: number, s: number) => (s > 0 ? 0.95 : 0.78) + 0.18 * Math.sin(z * 0.55 + s) * Math.sin(z * 0.23 + 2 * s) + 0.06 * Math.sin(z * 1.7 + 3 * s);
const karH = (u: number, z: number) => {
  const d = Math.abs(u - pc(z)) - 0.38, s = u > pc(z) ? 1 : -1;
  if (d < 0) return 0.06;
  const H = yigin(z, s), sm = (x: number) => x * x * (3 - 2 * x);
  let h = d < 0.4 ? 0.06 + (H - 0.06) * sm(d / 0.4) : d < 2.2 ? H - (H - 0.6) * sm((d - 0.4) / 1.8) : 0.6;
  const au = Math.abs(u);
  if (au > 6.6) h = Math.max(h, 0.6 + 0.6 * sm(Math.min(1, (au - 6.6) / 0.9))); // cephe dibinde kalın kar
  return h;
};

// ---- binalar (seed 1941): parsel eni 15–35, korniş 19–21 (komşu farkı ≥ 0.4, ≤ 1.5) ----
type Bina = { s: 1 | -1; z0: number; z1: number; H: number; renk: number; aks: number };
const binalar = (): Bina[] => {
  const out: Bina[] = [];
  for (const s of [-1, 1] as const) {
    let z = s > 0 ? -40 : -40, Hp = 20, i = 0;
    while (z < 260) {
      const en = 15 + rnd(SD, `en${s}${i}`) * 20;
      let H = 19 + rnd(SD, `h${s}${i}`) * 2; if (Math.abs(H - Hp) < 0.4) H = Hp + (H > Hp ? 0.4 : -0.4); if (Math.abs(H - Hp) > 1.5) H = Hp + Math.sign(H - Hp) * 1.5;
      let z0 = z, z1 = z + en;
      if (s > 0) for (const [a, b] of BOSLUK) { if (z1 > a && z0 < b) { if (z0 < a) z1 = a; else { z0 = b; z1 = b + en; } } }
      out.push({ s, z0, z1, H, renk: Math.floor(rnd(SD, `r${s}${i}`) * 4), aks: 3.2 + rnd(SD, `a${s}${i}`) * 0.4 });
      z = z1 + (s > 0 && BOSLUK.some(([a]) => Math.abs(z1 - a) < 1e-6) ? BOSLUK.find(([a]) => Math.abs(z1 - a) < 1e-6)![1] - z1 : 0); Hp = H; i++;
    }
  }
  return out;
};
const BINA = binalar();

const Cephe: React.FC<{ W: Dunya; b: Bina }> = ({ W, b }) => {
  const u = b.s * 8, { z0, z1, H } = b;
  const zv0 = Math.max(z0, 6), zv1 = z1; if (zv1 <= zv0) return null;
  const q = (za: number, zb: number, h0: number, h1: number, uu = u): V3[] => [[uu, h0, za], [uu, h0, zb], [uu, h1, zb], [uu, h1, za]];
  const golge = LS.cepheGolge[b.renk], isik = LS.cepheIsik[b.renk];
  const sMid = W.S([u, 2, (zv0 + zv1) / 2]);
  // ışıklı parçalar (yalnız sol cephe güneşe bakar): boşluk yaması (h < 15.6) + çatı üstünden sıyıran üst kat şeridi (h > H_sağ − 4.4)
  const yama: V3[][] = [];
  if (b.s < 0) {
    for (const [a, c] of BOSLUK) { const ya = Math.max(zv0, a + 19), yb = Math.min(zv1, c + 19); if (yb > ya) yama.push(q(ya, yb, 0.7, Math.min(H, 15.6))); }
    yama.push(q(zv0, zv1, 15.8, H));
  }
  const pencereler: V3[][] = [];
  const kat = [4.6, 8.2, 11.8, 15.4];
  const n = Math.floor((zv1 - zv0 - 1.2) / b.aks);
  for (let k = 0; k < n; k++) { const zc = zv0 + 0.6 + b.aks * (k + 0.5) + ((zv1 - zv0 - 1.2) - n * b.aks) / 2; for (const h of kat) pencereler.push(q(zc - 0.5, zc + 0.5, h + 0.9, h + 0.9 + 1.9)); }
  const lod = sMid > 14;
  const borular = [z0 + 0.4, z1 - 0.4].filter((z) => z > 6);
  return <g strokeLinejoin="round">
    <polygon points={W.poli(q(zv0, zv1, 0, H))} fill={golge} />
    {yama.map((p, i) => <polygon key={`y${i}`} points={W.poli(p)} fill={isik} />)}
    {/* granit kaide + rustika zemin kat (yatay derz; < 6 px aralıkta yok) + kat silmesi */}
    <polygon points={W.poli(q(zv0, zv1, 0, 0.7))} fill={LS.kaide} />
    {lod && Array.from({ length: 8 }, (_, j) => 0.7 + 0.45 * (j + 1)).filter((h) => h < 4.5).map((h, j) => <polyline key={`r${j}`} points={pS([W.E([u, h, zv0]), W.E([u, h, zv1])])} stroke={LS.rustika} strokeWidth={Math.max(1.2, Math.min(2.4, 0.02 * sMid))} fill="none" />)}
    <polygon points={W.poli(q(zv0, zv1, 4.5, 4.75))} fill={karistir(golge, LS.cepheDerin, 0.5)} />
    {/* pencereler: koyu cam, iç çerçeve (çift pencere), T kayıt; 2. kat sandrik */}
    {pencereler.map((p, i) => { const E = p.map(W.E); const w = Math.abs(E[1][0] - E[0][0]); if (w < 2.5) return null;
      return <g key={`p${i}`}>
        <polygon points={W.poli([[u, p[0][1] - 0.15, p[0][2] - 0.15], [u, p[1][1] - 0.15, p[1][2] + 0.15], [u, p[2][1] + 0.15, p[2][2] + 0.15], [u, p[3][1] + 0.15, p[3][2] - 0.15]])} fill={karistir(golge, "#ffffff", 0.12)} />
        <polygon points={pS(E)} fill={LS.cam} />
        {w > 6 && <polyline points={pS([W.E([u, p[0][1], (p[0][2] + p[1][2]) / 2]), W.E([u, p[2][1], (p[0][2] + p[1][2]) / 2])])} stroke={LS.camCerceve} strokeWidth={Math.max(1, w * 0.06)} fill="none" />}
        {w > 6 && <polyline points={pS([W.E([u, p[2][1] - 0.5, p[0][2]]), W.E([u, p[2][1] - 0.5, p[1][2]])])} stroke={LS.camCerceve} strokeWidth={Math.max(1, w * 0.06)} fill="none" />}
        {p[0][1] < 6 && w > 5 && <polygon points={W.poli([[u, p[2][1] + 0.2, p[0][2] - 0.3], [u, p[2][1] + 0.2, p[1][2] + 0.3], [u, p[2][1] + 0.45, p[1][2] + 0.3], [u, p[2][1] + 0.45, p[0][2] - 0.3]])} fill={karistir(golge, LS.cepheDerin, 0.6)} />}
      </g>; })}
    {/* yağmur boruları (2/bina), dirsekli ağız, buz */}
    {borular.map((z, i) => { const a = W.E([u - b.s * 0.15, H, z]), c = W.E([u - b.s * 0.15, 0.55, z]), m = W.E([u - b.s * 0.45, 0.32, z]), w = Math.max(1.5, 0.2 * W.S([u, 1, z]));
      return <g key={`b${i}`}><polyline points={pS([a, c, m])} stroke={LS.boru} strokeWidth={w} fill="none" strokeLinecap="round" />
        <polyline points={pS([W.E([u - b.s * 0.15, H, z + 0.06 * b.s]), W.E([u - b.s * 0.15, 0.6, z + 0.06 * b.s])])} stroke={LS.boruIsik} strokeWidth={Math.max(0.8, w * 0.25)} fill="none" />
        <polygon points={pS([m, W.E([u - b.s * 0.5, 0.0, z]), W.E([u - b.s * 0.4, 0.32, z])])} fill={LS.kar} opacity={0.9} />
      </g>; })}
    <polyline points={W.poli(q(zv0, zv1, 0, H)).split(" ").slice(0, 2).join(" ")} stroke={LS.cepheDerin} strokeWidth={2} />
    {/* bina sınırı (komşu cephe ayrımı) */}
    <polyline points={pS([W.E([u, 0, zv0]), W.E([u, H, zv0])])} stroke={karistir(golge, LS.cepheDerin, 0.7)} strokeWidth={Math.max(1.5, 0.08 * W.S([u, 2, zv0]))} fill="none" />
    {/* korniş (yalnız uzak cephelerde kadraja girer): alt yüz taraması + üstte kar şeridi */}
    <polygon points={W.poli([[u - b.s * 0.6, H - 0.3, zv0], [u - b.s * 0.6, H - 0.3, zv1], [u, H - 0.9, zv1], [u, H - 0.9, zv0]])} fill={LS.cepheDerin} />
    <polygon points={W.poli([[u - b.s * 0.6, H - 0.3, zv0], [u - b.s * 0.6, H - 0.3, zv1], [u - b.s * 0.6, H, zv1], [u - b.s * 0.6, H, zv0]])} fill={karistir(golge, LS.cepheDerin, 0.3)} />
    <polygon points={W.poli([[u - b.s * 0.6, H, zv0], [u - b.s * 0.6, H, zv1], [u - b.s * 0.6, H + 0.15, zv1], [u - b.s * 0.6, H + 0.15, zv0]])} fill={LS.kar} />
  </g>;
};

/** sokak sonu: karşı bina (z 230) düz korniş hattı ufkun hemen üstünde + baca kümeleri ve sola yatık dumanlar */
const SokakSonu: React.FC<{ W: Dunya; p: number }> = ({ W, p }) => {
  const z = 230, H = 20.5;
  const bacalar = [-5.5, 0.5, 4.8];
  return <g>
    <polygon points={W.poli([[-9, 0, z], [9, 0, z], [9, H, z], [-9, H, z]])} fill="#9a90b0" />
    {Array.from({ length: 5 }, (_, j) => <polyline key={j} points={pS([W.E([-8, 5.5 + 3.6 * j, z]), W.E([8, 5.5 + 3.6 * j, z])])} stroke="#8a80a4" strokeWidth={1.5} strokeDasharray="5 6" fill="none" />)}
    <polygon points={W.poli([[-9, H, z], [9, H, z], [9, H + 0.35, z], [-9, H + 0.35, z]])} fill={LS.karKenar} />
    {bacalar.map((u, i) => { const a = W.E([u, H, z]), b = W.E([u + 0.8, H + 2, z]); return <g key={i}>
      <rect x={a[0]} y={b[1]} width={b[0] - a[0]} height={a[1] - b[1]} fill="#8a80a4" />
      {/* duman: sola yatık ince sütun, güneşli yanı gül (net kenarlı şerit, bulanıklık yok) */}
      {(() => { const pts: P2[] = [], pts2: P2[] = []; const ust = 9 + rnd(1942, `d${i}`) * 5; for (let k = 0; k <= 10; k++) { const t = k / 10, h = H + 2 + t * ust, sap = -t * (3 + 2 * rnd(1942, `s${i}`)) + Math.sin(t * 5 + p / 90 + i) * 0.25; const w = 0.4 + t * t * 2.2; pts.push(W.E([u + 0.4 + sap - w / 2, h, z])); pts2.push(W.E([u + 0.4 + sap + w / 2, h, z])); }
        const d = cr([...pts, ...pts2.reverse()]); return <g><path d={d} fill={LS.duman} opacity={0.75} /><Hilal d={d} renk={LS.dumanIsik} dx={-2} dy={0} alfa={0.8} /></g>; })()}
    </g>; })}
  </g>;
};

/** kar zemini: satırlar uzaktan yakına (ressam algoritması), satır içinde eğim sınıfı + ışıklı aralık; patika, iz oyukları */
const KarZemin: React.FC<{ W: Dunya; zMin: number; zMax: number }> = ({ W, zMin, zMax }) => {
  const zs: number[] = []; for (let z = zMax; z > zMin; z /= z < 14 ? 1.012 : 1.03) zs.push(z); zs.push(zMin);
  const us = Array.from({ length: 161 }, (_, i) => { const t = -1 + (2 * i) / 160; return Math.sign(t) * Math.pow(Math.abs(t), 1.7) * 8; });
  const satirlar: React.ReactNode[] = [], isikSatir: React.ReactNode[] = [];
  for (let k = 0; k < zs.length - 1; k++) {
    const za = zs[k], zb = zs[k + 1], zm = (za + zb) / 2;
    const seg = (u0: number, u1: number, renk: string, key: string, v0?: number, v1?: number) => {
      // üst kenar (za) [u0,u1], alt kenar (zb) [v0,v1] — ışık sınırı satırlar boyunca düz kalır (basamak yok)
      const A0 = u0, A1 = u1, B0 = v0 ?? u0, B1 = v1 ?? u1;
      const kenar = (a: number, b: number, z: number) => { const uu = us.filter((u) => u > a && u < b); return [a, ...uu, b].map((u) => W.E([u, karH(u, z), z])); };
      const ust = kenar(A0, A1, za), alt = kenar(B0, B1, zb);
      return <polygon key={key} points={pS([...ust, ...alt.reverse()])} fill={renk} stroke={renk} strokeWidth={1.2} />;
    };
    // eğim sınıfı: patikaya bakan yamaçlar (güneşten uzak) koyu, yığın üstü orta, patika tabanı orta-koyu
    const p = pc(zm);
    satirlar.push(seg(-8, 8, LS.karGolge, `g${k}`));
    void p;
    const IA = isikAralik(za), IB = isikAralik(zb);
    IA.forEach(([a, b], j) => {
      const q = IB[j]; if (!q) return; const [c, d] = q;
      // 3 basamak: dış kenar (ışık sınırı yanında) → orta → çekirdek; sınır payı dünyada sabit (0.35 m)
      const pay = 0.35;
      isikSatir.push(seg(a, b, LS.serit[2], `i${k}${j}`, c, d));
      if (b - a > 2 * pay && d - c > 2 * pay) isikSatir.push(seg(a + pay, b - pay, LS.serit[1], `j${k}${j}`, c + pay, d - pay));
      if (b - a > 5 * pay && d - c > 5 * pay) isikSatir.push(seg(a + 2.5 * pay, b - 2.5 * pay, LS.serit[0], `m${k}${j}`, c + 2.5 * pay, d - 2.5 * pay));
    });
  }
  // iz oyukları (iki yön; seed 303): patikada, gölge yanağı (koyu) + uzak kenarda açık
  const izler = Array.from({ length: 40 }, (_, i) => { const z = 1.2 + i * 0.45 + rnd(303, `iz${i}`) * 0.2; const u = pc(z) + (i % 2 ? 0.12 : -0.12) + (rnd(303, `iu${i}`) - 0.5) * 0.08; return { u, z }; }).filter((t) => t.z > zMin && t.z < zMax);
  return <g>
    <g shapeRendering="crispEdges">{satirlar}</g>
    {/* eğim sınıfları: patika tabanı, patikaya bakan yamaçlar (güneşten uzak, koyu), yığın sırtları (açık) — z boyunca TEK sürekli şerit
        (satır başına çizim yamaçta testere dişi bırakıyordu) */}
    {([[-0.38, 0.38, "#7f83aa"], [0.38, 0.62, LS.karDerin], [-0.62, -0.38, "#7a7ea6"], [0.7, 1.05, LS.karAcik], [-0.95, -0.66, LS.karAcik]] as [number, number, string][]).map(([a, b, renk], i) => {
      const zz = zs.slice().reverse();
      const L = zz.map((z) => W.E([pc(z) + a, karH(pc(z) + a, z), z])), R = zz.map((z) => W.E([pc(z) + b, karH(pc(z) + b, z), z]));
      return <polygon key={`s${i}`} points={pS([...L, ...R.reverse()])} fill={renk} />;
    })}
    {isikSatir}
    {izler.map((t, i) => { const c = W.E([t.u, 0.06, t.z]), s = W.S([t.u, 0.06, t.z]); if (s < 8) return null; const rx = 0.07 * s, ry = Math.max(1.2, 0.15 * s * 0.42 * (1.49 / Math.max(1.5, t.z)));
      return <g key={i}><ellipse cx={c[0]} cy={c[1]} rx={rx} ry={ry} fill={LS.karDerin} /><ellipse cx={c[0]} cy={c[1] - ry * 0.35} rx={rx * 0.9} ry={ry * 0.55} fill="#5d6090" />
        {s > 120 && <Tarama sekil={[[c[0] - rx, c[1] - ry], [c[0] + rx, c[1] - ry], [c[0] + rx, c[1]], [c[0] - rx, c[1]]]} basamak="III" aci={72} renk="#4d5080" aralik={9} kalinlik={1.6} seed={303 + i} />}</g>; })}
  </g>;
};

/** boş çocuk kızağı + tahta su kovası (insansız; patika kenarında, sol cephe dibine yakın) */
const Kizak: React.FC<{ W: Dunya }> = ({ W }) => {
  const u = -2.6, z = 11.5, h = karH(u, z) - 0.03;
  const P = (du: number, dh: number, dz: number) => W.E([u + du, h + dh, z + dz]);
  const s = W.S([u, h, z]), kw = Math.max(2, 0.035 * s);
  const kizak = [[-0.2, 0.2], [0.2, 0.2]];
  return <g strokeLinejoin="round" strokeLinecap="round">
    <polygon points={pS([P(-0.32, 0, -0.55), P(0.36, 0, -0.55), P(0.36, 0, 0.6), P(-0.32, 0, 0.6)])} fill={LS.karDerin} opacity={0.6} />
    {/* kızak: iki kızak demiri (önde kıvrık) + ayaklar + çıtalı oturak */}
    {kizak.map(([du], i) => <g key={i}>
      <path d={`M${pS([P(du, 0, 0.45)])} L${pS([P(du, 0, -0.4)])} Q${pS([P(du, 0, -0.6)])} ${pS([P(du, 0.16, -0.55)])}`} stroke="#3a2c28" strokeWidth={kw} fill="none" />
      {[-0.25, 0.3].map((dz, j) => <line key={j} x1={P(du, 0, dz)[0]} y1={P(du, 0, dz)[1]} x2={P(du, 0.16, dz)[0]} y2={P(du, 0.16, dz)[1]} stroke={LS.tahtaGolge} strokeWidth={kw * 0.8} />)}
    </g>)}
    <polygon points={pS([P(-0.24, 0.16, -0.42), P(0.24, 0.16, -0.42), P(0.24, 0.16, 0.45), P(-0.24, 0.16, 0.45)])} fill={LS.tahta} stroke="#3a2c28" strokeWidth={1.6} />
    {[-0.2, 0.0, 0.2].map((dz, i) => <polyline key={i} points={pS([P(-0.24, 0.161, dz), P(0.24, 0.161, dz)])} stroke={LS.tahtaGolge} strokeWidth={1.4} fill="none" />)}
    {/* tahta kova (çember bantlı, kulplu), ağzında buz */}
    {(() => { const c = P(0, 0.16, 0.05), r = 0.15 * s, hh = 0.3 * s, x = c[0], y = c[1]; return <g>
      <path d={`M${x - r},${y} L${x - r * 0.86},${y - hh} L${x + r * 0.86},${y - hh} L${x + r},${y}Z`} fill={LS.tahta} stroke="#3a2c28" strokeWidth={1.6} />
      {[0.2, 0.42, 0.64].map((t, i) => <line key={i} x1={x - r * (1 - 0.14 * t) + (i + 1) * 0.0} y1={y - hh * t} x2={x - r * (1 - 0.14 * t) + r * 0.1} y2={y - hh * t} stroke={LS.tahtaGolge} strokeWidth={1} />)}
      {[0.15, 0.8].map((t, i) => <line key={`b${i}`} x1={x - r * (1 - 0.14 * t)} y1={y - hh * t} x2={x + r * (1 - 0.14 * t)} y2={y - hh * t} stroke="#2e2420" strokeWidth={Math.max(1.5, r * 0.14)} />)}
      <ellipse cx={x} cy={y - hh} rx={r * 0.86} ry={r * 0.28} fill="#3a2c28" /><ellipse cx={x} cy={y - hh + 1} rx={r * 0.7} ry={r * 0.2} fill={LS.karAcik} />
      <path d={`M${x - r * 0.86},${y - hh} Q${x},${y - hh - r * 1.3} ${x + r * 0.86},${y - hh}`} stroke="#3a2c28" strokeWidth={1.6} fill="none" />
    </g>; })()}
  </g>;
};

/** açık avuç + ekmek dilimi + kırıntılar (el kenarı karın sırtından kırıntı toplar; biri karda).
 *  Avuç yukarı, parmaklar ileri (+z): kameradan ~22° sıyırma açısıyla görülür → GravurEl el ekseni boyunca .5 kısaltılır (izdüşüm). */
const EL_SOKAK: GravurPalet = { isik: LS.ten, golge: LS.tenGolge, konturYuk: "#4a3440", konturIsik: "#9a7a80", kenar: LS.tenKenar, tarama: "#5a4050", manset: "#4a4664", mansetGolge: "#2f2c4c" };
const ElCiz: React.FC<{ b: P2; aci: number; E: number; palet: GravurPalet; taramasiz?: boolean; kisa: number }> = ({ b, aci, E, palet, taramasiz, kisa }) =>
  <g transform={`translate(${b[0]} ${b[1]}) rotate(${aci}) scale(${kisa} 1) rotate(${-aci}) translate(${-b[0]} ${-b[1]})`}>
    <GravurEl bilek={b} aci={aci} E={E} poz={GRAVUR_POZ.avuc} ayna palet={palet} isik={[0.7, 0.5]} taramaAci={72} taramasiz={taramasiz} />
  </g>;
const beyaz = (c: string): GravurPalet => ({ ...EL_SOKAK, isik: c, golge: c, konturYuk: c, konturIsik: c, tarama: c, kenar: c });
const Avuc: React.FC<{ W: Dunya; kilit?: SablonProps["kilit"] }> = ({ W, kilit }) => {
  const bilekW: V3 = [0.02, 1.27, 0.38], ortaW: V3 = [0.07, 1.31, 0.6];
  const b = W.E(bilekW), o = W.E(ortaW);
  const aci = (Math.atan2(o[1] - b[1], o[0] - b[0]) * 180) / Math.PI;
  const dir: V3 = [ortaW[0] - bilekW[0], ortaW[1] - bilekW[1], ortaW[2] - bilekW[2]], dl = Math.hypot(...dir);
  const at = (t: number, up = 0): V3 => [bilekW[0] + (dir[0] / dl) * t, bilekW[1] + (dir[1] / dl) * t + up, bilekW[2] + (dir[2] / dl) * t];
  const uc = W.E(at(0.19)), E = 0.19 * W.S(at(0.09)); // gerçek el boyu (avuç ortası ölçeği)
  const kisa = Math.min(1, Math.hypot(uc[0] - b[0], uc[1] - b[1]) / E); // izdüşüm kısalması (el ekseni boyunca)
  // ekmek: avucun ortasında yassı dilim (10×7 cm, kameraya eğik → düşeyde .42), üst yüz gözenek, sağ-arka kenarda güneş kenarı
  const ekC = W.E(at(0.085, 0.022)), es = W.S(at(0.085, 0.022));
  const ek: P2[] = [[-0.05, -0.03], [0.0, -0.037], [0.05, -0.032], [0.054, 0.0], [0.048, 0.03], [0.0, 0.036], [-0.048, 0.031], [-0.055, 0.0]].map(([x, y]) => [ekC[0] + x * es + y * es * 0.2, ekC[1] + y * es * 0.42 - x * es * 0.1] as P2);
  const ekD = cr(ek);
  const kabuk: P2[] = ek.map((q) => [q[0] + 1.5, q[1] + 0.007 * es] as P2);
  if (kilit) { kilit.push({ ad: "avuc", p: W.E([0.05, 1.3, 0.53]), tur: "dokunus" }); kilit.push({ ad: "ekmek", p: ekC, tur: "kurulum" }); }
  return <g strokeLinejoin="round">
    <ElCiz b={b} aci={aci} E={E} palet={EL_SOKAK} kisa={kisa} />
    {/* sağ-arka kenarda güneş kenarı (2–3 px): siluet − kaydırılmış siluet */}
    <defs><mask id="elkenar" maskUnits="userSpaceOnUse" x={-500} y={-500} width={2100} height={2900}>
      <ElCiz b={b} aci={aci} E={E} palet={beyaz("#fff")} taramasiz kisa={kisa} />
      <g transform="translate(-3.5 2)"><ElCiz b={b} aci={aci} E={E} palet={beyaz("#000")} taramasiz kisa={kisa} /></g>
    </mask></defs>
    <rect x={0} y={0} width={1080} height={1920} fill={LS.tenKenar} mask="url(#elkenar)" />
    {/* ekmek: kabuk (koyu alt kenar) + üst yüz + gözenek + sağda ışık kenarı */}
    <path d={cr(kabuk)} fill={LS.ekmekIc} stroke="#2e231e" strokeWidth={2.2} />
    <path d={ekD} fill={LS.ekmek} stroke="#2e231e" strokeWidth={2.2} />
    <Kirp d={ekD}>
      {Array.from({ length: 16 }, (_, i) => { const x = ekC[0] + (rnd(125, `x${i}`) - 0.5) * 0.09 * es, y = ekC[1] + (rnd(125, `y${i}`) - 0.5) * 0.026 * es, r = 1.5 + rnd(125, `r${i}`) * 2.6; return <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.5} fill={LS.ekmekIc} />; })}
    </Kirp>
    <Hilal d={ekD} renk={LS.ekmekKenar} dx={-5} dy={3} />
    <Hilal d={ekD} renk={LS.tenKenar} dx={-2.5} dy={1.5} />
    {/* kırıntılar: ikisi avuçta ekmeğin yanında */}
    {[at(0.05, 0.02), at(0.13, 0.025)].map((q, i) => { const c0 = W.E(q), c: P2 = [c0[0] + (i ? 0.055 : 0.06) * es, c0[1]]; return <g key={i}><circle cx={c[0]} cy={c[1]} r={5 - i} fill={LS.ekmek} stroke="#2e231e" strokeWidth={1.2} /><circle cx={c[0] + 1.4} cy={c[1] - 1.2} r={1.4} fill={LS.ekmekKenar} /></g>; })}
  </g>;
};

/** ön plan: sol-alttan giren palto kolu (sağ kolun üst kolu/dirsek; kenar ışıklı, iç kıvrım) + sağ kenarda keman kutusu kayışı */
const OnPlan: React.FC<{ W: Dunya }> = ({ W }) => {
  // ön kol konisi (dünya): bilek (0.02, 1.27, 0.38) r 0.055 → dirsek (−0.06, 1.17, 0.16) r 0.075; izdüşümde iki kenar
  const A: V3 = [0.02, 1.27, 0.38], B: V3 = [-0.07, 1.16, 0.15];
  const a = W.E(A), c = W.E(B), ra = 0.055 * W.S(A), rc = 0.08 * W.S(B);
  const dx = c[0] - a[0], dy = c[1] - a[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
  const kol = cr([[a[0] + nx * ra, a[1] + ny * ra], [(a[0] + c[0]) / 2 + nx * (ra + rc) * 0.55, (a[1] + c[1]) / 2 + ny * (ra + rc) * 0.55], [c[0] + nx * rc, c[1] + ny * rc], [c[0] - nx * rc, c[1] - ny * rc], [(a[0] + c[0]) / 2 - nx * (ra + rc) * 0.5, (a[1] + c[1]) / 2 - ny * (ra + rc) * 0.5], [a[0] - nx * ra, a[1] - ny * ra], [a[0] - (dx / L) * 18, a[1] - (dy / L) * 18]]);
  const ag = `M${a[0] + nx * ra * 1.04},${a[1] + ny * ra * 1.04} Q${a[0] - (dx / L) * 10},${a[1] - (dy / L) * 10} ${a[0] - nx * ra * 1.04},${a[1] - ny * ra * 1.04} L${a[0] - nx * ra + (dx / L) * 46},${a[1] - ny * ra + (dy / L) * 46} Q${a[0] + (dx / L) * 36},${a[1] + (dy / L) * 36} ${a[0] + nx * ra + (dx / L) * 46},${a[1] + ny * ra + (dy / L) * 46}Z`;
  return <g strokeLinejoin="round">
    <path d={kol} fill={LS.kol} stroke="#1c1a34" strokeWidth={3} />
    <Kirp d={kol}>
      {/* ışıktan uzak (sol) yarı koyu + yön taraması; iç kıvrımlar (kumaş katlanması, çizgi değil kıvrım) */}
      <path d={`M${a[0] - nx * ra * 1.2},${a[1] - ny * ra * 1.2} L${a[0] + nx * ra * 0.1},${a[1] + ny * ra * 0.1} L${c[0] + nx * rc * 0.1},${c[1] + ny * rc * 0.1} L${c[0] - nx * rc * 1.3},${c[1] - ny * rc * 1.3}Z`} fill={LS.kolGolge} />
      <Tarama sekil={[[a[0] - nx * ra, a[1] - ny * ra], [a[0], a[1]], [c[0], c[1]], [c[0] - nx * rc, c[1] - ny * rc]]} basamak="III" aci={72} renk="#16152c" aralik={7.5} kalinlik={2} seed={SD + 77} />
      {[0.3, 0.55, 0.78].map((t, i) => { const m: P2 = [a[0] + dx * t, a[1] + dy * t], r = ra + (rc - ra) * t; return <path key={i} d={`M${m[0] - nx * r * 0.7},${m[1] - ny * r * 0.7} Q${m[0] + (dx / L) * 30},${m[1] + (dy / L) * 30} ${m[0] + nx * r * 0.5},${m[1] + ny * r * 0.5}`} stroke="#1c1a34" strokeWidth={2.6} fill="none" />; })}
    </Kirp>
    <Hilal d={kol} renk={LS.tenKenar} dx={-4} dy={3} />
    {/* palto kol ağzı (manşet) */}
    <path d={ag} fill="#34315c" stroke="#1c1a34" strokeWidth={2.5} />
    {/* keman kutusu kayışı: sağ kenarda çapraz (omuzdan sırta) */}
    <path d="M1160,1230 L1010,1960 L1080,1990 L1210,1240Z" fill={LS.kayis} stroke="#2a2024" strokeWidth={3} />
    <path d="M1150,1260 L1020,1900" stroke="#6a5452" strokeWidth={2} strokeDasharray="10 8" fill="none" />
    <Hilal d="M1160,1230 L1010,1960 L1080,1990 L1210,1240Z" renk={LS.tenKenar} dx={-3} dy={2} alfa={0.9} />
  </g>;
};

/** düşen kar (seed 1203, dünyaya bağlı; 18 px/sn düzeyinde yavaş düşüş) + nefes buğusu (avucun üstünde, net kenarlı tek bulut) */
const Atmosfer: React.FC<{ W: Dunya; p: number }> = ({ W, p }) => <g>
  {Array.from({ length: 70 }, (_, i) => {
    const z = 1.2 + Math.pow(rnd(1203, `z${i}`), 1.6) * 28, u = (rnd(1203, `u${i}`) - 0.5) * (1.2 + z * 0.75), h0 = rnd(1203, `h${i}`) * 7;
    const h = ((h0 - (p / 60) * 0.35) % 7 + 7) % 7;
    const q = W.E([u, h, z]), s = W.S([u, h, z]); if (!(q[1] > -10 && q[1] < 1930)) return null;
    const r = Math.max(1.6, Math.min(4.2, 0.012 * s));
    return <circle key={i} cx={q[0]} cy={q[1]} r={r} fill={isikli(u, z) ? LS.karKenar : LS.tane} opacity={0.85} />;
  })}
  {(() => { const c = W.E([-0.14, 1.43, 0.5]), s = W.S([-0.14, 1.43, 0.5]); const d = cr(Array.from({ length: 9 }, (_, k) => { const a = (k / 9) * Math.PI * 2, r = 0.035 * s * (0.8 + 0.35 * rnd(77, `n${k}`)); return [c[0] + Math.cos(a) * r * 1.6, c[1] + Math.sin(a) * r * 0.7] as P2; }));
    return <path d={d} fill={LS.nefes} opacity={0.3} />; })()}
</g>;

export const SOKAK_P03A_KAMERA: Kamera25 = { kare: [0, 180], konum_yol: [[0.05, 1.49, 0], [0.05, 1.49, 0.08]], yon_yol: [[0, -24.3], [0, -25.5]], lens_mm: [50], egri: "inout", ekipman: "steadicam" };
const P03a: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const K = kamera25(param<Partial<Kamera25> | undefined>(plan, "kamera", undefined), p, SOKAK_P03A_KAMERA);
  const W = dunya(K);
  const ufuk = W.E([0, 1.49, 5000])[1];
  const bant = (i: number) => ufuk - 300 + i * 60; // gök 5 düz basamak, ufka doğru ısınır
  const sol = BINA.filter((b) => b.s < 0).sort((a, b) => b.z0 - a.z0), sag = BINA.filter((b) => b.s > 0).sort((a, b) => b.z0 - a.z0);
  return (
    <LgBaski>
      <rect x={-50} y={-50} width={1180} height={2020} fill={LS.gok[0]} />
      {LS.gok.map((c, i) => <rect key={i} x={-50} y={bant(i)} width={1180} height={i === 4 ? 2000 : 61} fill={c} />)}
      {[1, 2, 3, 4].map((i) => <line key={i} x1={-50} x2={1130} y1={bant(i) + 3} y2={bant(i) + 3} stroke={LS.gok[i - 1]} strokeWidth={2.5} opacity={0.5} />)}
      <ellipse cx={1180} cy={ufuk - 10} rx={420} ry={110} fill={LS.isima} opacity={0.55} />
      <SokakSonu W={W} p={p} />
      {/* ufuk buğusu: üç düz bant */}
      {[[0.3, 4, 9], [0.42, 1.5, 4], [0.55, 0, 1.5]].map(([a, h0, h1], i) => <polygon key={i} points={W.poli([[-8, h0, 228], [8, h0, 228], [8, h1, 228], [-8, h1, 228]])} fill={LS.bugu} opacity={a} />)}
      {/* çapraz sokağın karşı duvarı (boşluktan görünür; güneşe bakar → ışıklı) */}
      <polygon points={W.poli([[8, 0, 34], [40, 0, 34], [40, 20, 34], [8, 20, 34]])} fill={LS.cepheIsik[3]} />
      <polygon points={W.poli([[8, 0, 34], [40, 0, 34], [40, 0.7, 34], [8, 0.7, 34]])} fill={LS.kaideIsik} />
      {[...sol, ...sag].sort((a, b) => b.z1 - a.z1).map((b, i) => <Cephe key={i} W={W} b={b} />)}
      <KarZemin W={W} zMin={0.75} zMax={240} />
      <Kizak W={W} />
      {/* karda düşen kırıntı (yığın sırtında, avucun altında) */}
      {(() => { const c = W.E([0.2, karH(0.2, 0.62) + 0.01, 0.62]); return <circle cx={c[0]} cy={c[1]} r={4} fill={LS.ekmek} stroke="#2e231e" strokeWidth={1.2} />; })()}
      <Avuc W={W} kilit={kilit} />
      <OnPlan W={W} />
      <Atmosfer W={W} p={p} />
    </LgBaski>
  );
};

const Sahne: React.FC<SablonProps> = (pr) => { const g = param<string>(pr.plan, "gorunum", "p03a"); return g === "p03a-t1" ? <P03a {...pr} /> : g === "p03a-t2" ? <SokakP03a {...pr} /> : <SokakP03aT3 {...pr} />; }; // p03a: onaylı hedef (tur-3); p03a-t2: tur-2 kaydı; p03a-t1: tur-1 (reddedildi)
/** SOKAK-LG — kuşatma sokağı (`mevsim: "kis"`; yaz P13 sonraki tur). Arşiv: litografi. Görünüm: `p03a` (yön karesi). */
export const SOKAK_LG_SABLON: Sablon = { Sahne, arsiv: () => "litografi" };
