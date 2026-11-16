// ===== BODRUM (Radyo Evi bodrumu, geçici morg) — mekanlar.md §12 (ortak), §13 (BODRUM), yön karesi §13.10 =====
// Tek dünya (u yanal, h yükseklik, z derinlik; m), `kamera25d` izdüşümü; her ışıklı yüzey TEK kaynaktan türetilir:
//   koridor penceresi S (0.9, 4.6, 9.0) → kapı yarığı (u 0.40–0.50, h 1.8–3.9, z 6.4) = ışık levhası u = 0.40 − 0.192·(6.4 − z).
//   Levha içinde (z, h) ışın izleme: sahanlık / basamak yüzü / sedye örtüsü / el / zemin — ilk çarpan yüzey aydınlanır, elle şerit yok.
//   Rıhtlar kameraya (−z) bakar, ışık +z'den gelir → rıhtlar ışık ALMAZ (şartnamedeki "rıhtta dikey parça" fiziksel değil; zikzak =
//   basamak burunlarının önündeki kısa ışıklı yüzler + karanlık rıhtlar).
// Saygı (O7): örtülü biçimler yüzsüz, ayaksız; ölü taşıma yok. Görüntüde yazı yok (dil-nötr). Kırmızı yok. İmza: yalnız çubuklar.
// Görünüm: `p08-3` (dolly zoom f177–252; yön karesi f252). Diğer planlar (P07, P08-1/2, P09a/b) sonraki kurulum turu.
import React from "react";
import { Tarama } from "../../../doku/Tarama";
import { rnd } from "../../../doku/sabitler";
import { kamera25, Kamera25, V3 } from "../../kamera25d";
import { GravurEl, GravurPalet, GravurPoz } from "../../props/paris/GravurEl";
import { param, Sablon, SablonProps } from "../../ortak";
import { cr, dunya, Dunya, Hilal, Kirp, LgBaski, P2, pS } from "./lgOrtak";
import { LgYuz } from "./lgYuz";
import { LG } from "./salonDunya";
import { BodrumP08 } from "./BodrumHedef";
import { BodrumP08T3 } from "./BodrumT3";
import { BodrumP08T4 } from "./BodrumT4";

const SD = 455; // seed (mekanlar §13.5)
// ---- palet (tasarım §2.3 + mekanlar §13.6 O1 düzeltmeleri) ----
export const LB = {
  duvarGolge: "#2c3050", duvar: "#40466a", zemin: "#3a3a58", basamak: "#4a4668", riht: "#3a3a58", burun: "#5a5478", burunIsik: "#8c6f66",
  tavan: "#2b2a4f", kiris: "#36324e", kapi: "#4a4060", kapiPano: "#3c3454", kasa: "#2a2844", yarik: "#f0d6c4",
  ortu: ["#8a7aa6", "#6a5f8c", "#463c62"] as const, ortuKenar: "#c9a0a6", bez: "#4f4a62", sirik: "#4a3a3c", sirikIsik: "#8a6a62",
  serit: ["#efd0b6", "#e4bc98", "#c48e74"] as const, bounce: ["#a07862", "#94705e", "#74574f"] as const, toz: "#f0d2b8",
  tarama: "#2b2a4f", nem: "#5d6494", bugu: "#6a7aa0", hale: "#e0a070", golge: "#1f1d36",
  ceket: "#444867", ceketGolge: "#292e4b", ceketIsik: "#646689", gomlek: "#9e8c80",
};

// ---- dünya (mekanlar §13.1) ----
const KAYNAK: V3 = [0.9, 4.6, 9.0];
const YARIK = { z: 6.4, h0: 1.8, h1: 3.9 };
const levhaU = (z: number) => 0.4 - 0.192 * (6.4 - z);
const levhaW = (z: number) => 0.06 + 0.04 * Math.max(0, Math.min(1, (z - 2.2) / 4.2)); // yarıkta 0.10 → sedyede 0.06 (eğik kanat kenarı)
const MER = { z0: 3.0, d: 0.28, r: 0.18, n: 10, u: 0.7 }; // rıht 0.18, basamak 0.28, en 1.4
const burunZ = (n: number) => MER.z0 + MER.d * (n - 1);
const SEDYE = { u0: -1.32, u1: 0.9, zOn: 1.93, zArka: 2.47, bez: 0.74, ortu: 0.76 };
const govdeKnot: [number, number][] = [[-1.4, 0], [-1.3, 0.02], [-1.21, 0.13], [-1.12, 0.07], [-0.86, 0.1], [-0.56, 0.12], [-0.22, 0.17], [0.08, 0.15], [0.4, 0.2], [0.7, 0.15], [0.86, 0.02], [0.95, 0]];
const govde = (u: number) => { for (let i = 1; i < govdeKnot.length; i++) if (u <= govdeKnot[i][0]) { const [a, ha] = govdeKnot[i - 1], [b, hb] = govdeKnot[i]; const t = (u - a) / (b - a); return ha + (hb - ha) * (t * t * (3 - 2 * t)); } return 0; };
/** örtünün yakın kenarı: elin çıktığı yerde içeri çekilir (bileğin üstünde kıvrık dudak) */
const kenarZ = (u: number) => SEDYE.zOn + 0.11 * Math.exp(-(((u + 0.44) / 0.085) ** 4));
const ortuH = (u: number, z: number) => {
  const k0 = kenarZ(u), t = Math.max(0, Math.min(1, (z - k0) / (SEDYE.zArka - k0))); // örtü kendi kenarında bez kotuna iner (uçurum yok)
  const prof = Math.pow(Math.sin(Math.PI * t), 0.6);
  const kol = u > -0.38 && u < 0.5 ? 0.04 * Math.exp(-(((z - k0 - 0.045) / 0.035) ** 2)) * Math.min(1, (u + 0.38) / 0.06) : 0; // örtü altındaki kol (omuzdan bileğe)
  return SEDYE.ortu + govde(u) * prof + kol;
};

// ---- ışın izleme (levha düzleminde, 2B z–h) ----
type Vurus = { yuzey: string; z: number; h: number; hs: number };
const isinIzle = (): Vurus[] => {
  const out: Vurus[] = [];
  for (let hs = YARIK.h0 + 0.002; hs < YARIK.h1; hs += 0.004) {
    const m = (KAYNAK[1] - hs) / (KAYNAK[2] - YARIK.z); // z azaldıkça h düşüş eğimi
    const zAt = (h: number) => YARIK.z - (hs - h) / m;
    const ad: Vurus[] = [];
    const zs = zAt(1.8); if (zs >= 5.52 && zs <= 6.4) ad.push({ yuzey: "sahanlik", z: zs, h: 1.8, hs });
    for (let n = 1; n <= MER.n; n++) { const z = zAt(MER.r * n); if (z >= burunZ(n) && z <= burunZ(n) + MER.d) ad.push({ yuzey: `b${n}`, z, h: MER.r * n, hs }); }
    const zo = zAt(0.84); if (zo >= SEDYE.zOn && zo <= SEDYE.zArka) ad.push({ yuzey: "ortu", z: zo, h: 0.84, hs });
    const zz = zAt(0); if (zz < MER.z0) ad.push({ yuzey: "zemin", z: zz, h: 0, hs });
    if (!ad.length) continue;
    out.push(ad.reduce((a, b) => (b.z > a.z ? b : a)));
  }
  return out;
};
const VURUS = isinIzle();
/** yüzey başına ışıklı z aralıkları (boşluk > 4 cm → ayrı parça) */
const araliklar = (yuzey: string): [number, number][] => {
  const z = VURUS.filter((v) => v.yuzey === yuzey).map((v) => v.z).sort((a, b) => a - b);
  const r: [number, number][] = [];
  for (const q of z) { if (r.length && q - r[r.length - 1][1] < 0.04) r[r.length - 1][1] = q; else r.push([q, q]); }
  return r.filter(([a, b]) => b - a > 0.005);
};

// ======================================================= KATMANLAR =======================================================
/** levhanın bir yüzeyle kesişimi (yatay yüzey h sabit, z aralığı): 3 basamak (dış/orta/çekirdek) */
const SeritYatay: React.FC<{ W: Dunya; h: number; z0: number; z1: number; dis?: boolean }> = ({ W, h, z0, z1, dis = true }) => {
  const q = (k: number): V3[] => [[levhaU(z0) - (levhaW(z0) * k) / 2, h, z0], [levhaU(z0) + (levhaW(z0) * k) / 2, h, z0], [levhaU(z1) + (levhaW(z1) * k) / 2, h, z1], [levhaU(z1) - (levhaW(z1) * k) / 2, h, z1]];
  const disq = (): V3[] => [[levhaU(z0) - levhaW(z0) / 2 - 0.04, h, z0], [levhaU(z0) + levhaW(z0) / 2 + 0.04, h, z0], [levhaU(z1) + levhaW(z1) / 2 + 0.04, h, z1], [levhaU(z1) - levhaW(z1) / 2 - 0.04, h, z1]];
  return <g>
    {dis && <polygon points={W.poli(disq())} fill={LB.serit[2]} />}
    <polygon points={W.poli(q(1))} fill={LB.serit[1]} />
    <polygon points={W.poli(q(0.4))} fill={LB.serit[0]} />
  </g>;
};

const Bolme: React.FC<{ W: Dunya }> = ({ W }) => {
  // yan bölme (u −3.5…−0.95, z 3…7.5): tavan, yan duvar, arka duvar (alt koyu şerit), zemin, nem lekeleri
  const ust = 3.2;
  const leke = Array.from({ length: 5 }, (_, i) => ({ u: -3.2 + rnd(SD, `lu${i}`) * 2.0, h: 1.4 + rnd(SD, `lh${i}`) * 1.4, r: 0.18 + rnd(SD, `lr${i}`) * 0.25 }));
  return <g>
    <polygon points={W.poli([[-3.5, ust, 3], [-0.95, ust, 3], [-0.95, ust, 7.5], [-3.5, ust, 7.5]])} fill="#24264a" />
    <polygon points={W.poli([[-3.5, 0, 3], [-3.5, 0, 7.5], [-3.5, ust, 7.5], [-3.5, ust, 3]])} fill="#292c4a" />
    <polygon points={W.poli([[-3.5, 0, 3], [-3.5, 0, 7.5], [-3.5, 1.2, 7.5], [-3.5, 1.2, 3]])} fill="#23263f" />
    <polygon points={W.poli([[-3.5, 0, 7.5], [-0.95, 0, 7.5], [-0.95, ust, 7.5], [-3.5, ust, 7.5]])} fill={LB.duvarGolge} />
    <polygon points={W.poli([[-3.5, 0, 7.5], [-0.95, 0, 7.5], [-0.95, 1.2, 7.5], [-3.5, 1.2, 7.5]])} fill="#262a46" />
    <polyline points={pS([W.E([-3.5, 1.2, 7.5]), W.E([-0.95, 1.2, 7.5])])} stroke="#3a3f62" strokeWidth={2} fill="none" />
    <polyline points={pS([W.E([-3.5, 1.2, 3]), W.E([-3.5, 1.2, 7.5])])} stroke="#3a3f62" strokeWidth={2} fill="none" />
    {leke.map((l, i) => { const c = W.E([l.u, l.h, 7.49]), s = W.S([l.u, l.h, 7.49]); return <ellipse key={i} cx={c[0]} cy={c[1]} rx={l.r * s} ry={l.r * s * 0.6} fill="#1f2340" opacity={0.12} />; })}
    <polygon points={W.poli([[-3.5, 0, 3], [-0.95, 0, 3], [-0.95, 0, 7.5], [-3.5, 0, 7.5]])} fill="#34344f" />
    {/* tavan tesisatı: 3 boru + kablo demeti (kelepçe ritmi seed 440), merdivene doğru yakınsar */}
    {[[-1.35, 3.0, 0.07], [-1.7, 2.95, 0.05], [-2.5, 3.02, 0.09], [-2.05, 3.08, 0.025]].map(([bu, bh, r], i) => {
      const a = W.E([bu, bh, 3.0]), b = W.E([bu, bh, 7.5]), wa = 2 * r * W.S([bu, bh, 3.0]), wb = 2 * r * W.S([bu, bh, 7.5]);
      const d = `M${a[0]},${a[1] - wa / 2} L${b[0]},${b[1] - wb / 2} L${b[0]},${b[1] + wb / 2} L${a[0]},${a[1] + wa / 2}Z`;
      return <g key={i}><path d={d} fill={i === 3 ? "#2e2a40" : "#36324e"} stroke="#1f1d33" strokeWidth={1.6} />
        <polyline points={pS([[a[0], a[1] + wa * 0.3], [b[0], b[1] + wb * 0.3]])} stroke="#584e7c" strokeWidth={1.6} fill="none" />
        {Array.from({ length: 4 }, (_, k) => { const z = 3.4 + k * 1.05 + rnd(440, `k${i}${k}`) * 0.3, c = W.E([bu, bh, z]), w = 2 * r * W.S([bu, bh, z]); return <line key={k} x1={c[0]} y1={c[1] - w * 0.75} x2={c[0]} y2={c[1] - 40 * W.S([bu, 3.2, z]) / 100 - w * 0.6} stroke="#2a2640" strokeWidth={2} />; })}
      </g>; })}
  </g>;
};

/** örtülü biçim (mekanlar §13.4 katman 3): yüzsüz, ayaksız; boy/aralık/kıvrım seed 421; tek gül kenar (bounce'a bakan sırt) */
const OrtuluBicim: React.FC<{ W: Dunya; z: number; boy: number; i: number }> = ({ W, z, boy, i }) => {
  const u0 = -3.42, taban = 0.12, n = 22;
  const prof = (t: number) => { const k: [number, number][] = [[0, 0], [0.05, 0.18], [0.12, 0.2], [0.2, 0.17], [0.33, 0.29], [0.55, 0.25], [0.75, 0.21], [0.93, 0.26], [1, 0]]; for (let j = 1; j < k.length; j++) if (t <= k[j][0]) { const a = k[j - 1], b = k[j], s = (t - a[0]) / (b[0] - a[0]); return a[1] + (b[1] - a[1]) * (s * s * (3 - 2 * s)); } return 0; };
  const sirt: V3[] = Array.from({ length: n + 1 }, (_, j) => [u0 + (boy * j) / n, taban + prof(j / n) * (0.92 + rnd(421, `p${i}`) * 0.16), z]);
  const on: V3[] = Array.from({ length: n + 1 }, (_, j) => [u0 + (boy * (n - j)) / n, taban - 0.01, z - 0.3]);
  const sirtE = sirt.map(W.E), onE = on.map(W.E);
  const d = cr([...sirtE, ...onE].map((q) => q as P2));
  const kivrim = [0.22, 0.48, 0.7].map((t, j) => { const tt = t + (rnd(421, `k${i}${j}`) - 0.5) * 0.08; const a = W.E([u0 + boy * tt, taban + prof(tt) * 0.9, z]), b = W.E([u0 + boy * (tt + 0.03), taban, z - 0.29]), c = W.E([u0 + boy * (tt + 0.07), taban, z - 0.29]); return [a, b, c] as P2[]; });
  return <g>
    <polygon points={pS([W.E([u0 - 0.05, 0, z - 0.32]), W.E([u0 + boy + 0.05, 0, z - 0.32]), W.E([u0 + boy + 0.05, taban, z - 0.32]), W.E([u0 - 0.05, taban, z - 0.32])])} fill="#2a2640" />
    <path d={d} fill="#4f467a" stroke="#2b2a4f" strokeWidth={2} />
    <Kirp d={d}>
      {kivrim.map((k, j) => <g key={j}><polygon points={pS(k)} fill={LB.ortu[2]} /><Tarama sekil={k} basamak="III" aci={72} renk={LB.tarama} aralik={9} kalinlik={1.6} seed={421 + i * 7 + j} /></g>)}
      <polygon points={pS([...sirtE.slice(2, n - 1), ...sirtE.slice(2, n - 1).reverse().map((q) => [q[0], q[1] + 6] as P2)])} fill={LB.ortu[1]} opacity={0.7} />
    </Kirp>
    <polyline points={pS(sirtE.slice(1, n))} stroke={LB.ortuKenar} strokeWidth={1.6} fill="none" opacity={0.85} />
  </g>;
};

const Merdiven: React.FC<{ W: Dunya }> = ({ W }) => {
  const u = MER.u, ceil0 = 3.2, ceil1 = 4.1, zs = 5.52, zk = YARIK.z;
  const tavan = (z: number) => ceil0 + ((z - MER.z0) / (zk - MER.z0)) * (ceil1 - ceil0);
  const profil: V3[] = []; // sağ duvar alt kenarı (basamak profili, u +0.7)
  for (let n = 1; n <= MER.n; n++) { profil.push([u, MER.r * (n - 1), burunZ(n)], [u, MER.r * n, burunZ(n)]); }
  profil.push([u, 1.8, zk]);
  const sagDuvar: V3[] = [[u, 0, MER.z0], ...profil, [u, tavan(zk), zk], [u, tavan(MER.z0), MER.z0]];
  const sagSerit: V3[] = [[u, 0, MER.z0], ...profil, [u, 3.0, zk], [u, 3.0, zs], [u, 1.2 + 0.18, MER.z0]]; // yağlı boya şeridi: üst kenar merdiven eğimine paralel düz
  const solDuvar: V3[] = [[-u, 0, MER.z0], [-u, 1.8, zs], [-u, 1.8, zk], [-u, tavan(zk), zk], [-u, tavan(MER.z0), MER.z0]];
  // kapı: dışa açık kanat (menteşe u −0.45), 10 cm aralık kilit tarafında; kasa
  const kh0 = YARIK.h0, kh1 = YARIK.h1;
  const kanat: V3[] = [[-0.45, kh0, zk + 0.002], [0.395, kh0, zk + 0.09], [0.395, kh1, zk + 0.09], [-0.45, kh1, zk + 0.002]];
  const pano = (a: number, b: number, c: number, d: number): V3[] => { const L = (t: number): [number, number] => [-0.45 + 0.845 * t, zk + 0.002 + 0.088 * t]; const [ua, za] = L(a), [ub, zb] = L(b); return [[ua, c, za], [ub, c, zb], [ub, d, zb], [ua, d, za]]; };
  const yarikC = W.E([0.42, 2.85, zk]), yS = W.S([0.42, 2.85, zk]);
  const yarik = (gen: number): string => { const a = W.E([0.42 - gen / 2, kh1, zk]), b = W.E([0.42 + gen / 2, kh0, zk]); const w = b[0] - a[0], r = Math.min(w / 2, 40); return `M${a[0] + r},${a[1]} L${b[0] - r},${a[1]} Q${b[0]},${a[1]} ${b[0]},${a[1] + r} L${b[0]},${b[1] - r} Q${b[0]},${b[1]} ${b[0] - r},${b[1]} L${a[0] + r},${b[1]} Q${a[0]},${b[1]} ${a[0]},${b[1] - r} L${a[0]},${a[1] + r} Q${a[0]},${a[1]} ${a[0] + r},${a[1]}Z`; };
  void yarikC; void yS;
  return <g strokeLinejoin="round">
    {/* boşluk tavanı (eğik, düz koyu) + sahanlık arka duvarı */}
    <polygon points={W.poli([[-u, tavan(MER.z0), MER.z0], [u, tavan(MER.z0), MER.z0], [u, tavan(zk), zk], [-u, tavan(zk), zk]])} fill={LB.tavan} />
    <polygon points={W.poli([[-u, 1.8, zk], [u, 1.8, zk], [u, tavan(zk), zk], [-u, tavan(zk), zk]])} fill="#353a5e" />
    {/* koridor (yalnız aralıktan): düz krem; hale iki net kapsül (screen, C* ≥ 18) */}
    <path d={yarik(0.44)} fill={LB.hale} opacity={0.2} style={{ mixBlendMode: "screen" }} />
    <path d={yarik(0.24)} fill={LB.hale} opacity={0.36} style={{ mixBlendMode: "screen" }} />
    <polygon points={W.poli([[0.39, kh0, zk + 0.01], [0.47, kh0, zk + 0.01], [0.47, kh1, zk + 0.01], [0.39, kh1, zk + 0.01]])} fill={LB.yarik} />
    {/* kanat (oda yüzü), 4 dolgu pano, kilit kenarında kenar ışığı */}
    <polygon points={W.poli(kanat)} fill={LB.kapi} stroke={LB.kasa} strokeWidth={2} />
    {[[0.08, 0.46, 2.0, 2.75], [0.54, 0.92, 2.0, 2.75], [0.08, 0.46, 2.95, 3.75], [0.54, 0.92, 2.95, 3.75]].map((p, i) => { const q = pano(p[0], p[1], p[2], p[3]); return <g key={i}><polygon points={W.poli(q)} fill={LB.kapiPano} /><polyline points={pS([W.E(q[3]), W.E(q[2])])} stroke="#2a2440" strokeWidth={2} fill="none" /></g>; })}
    <polyline points={pS([W.E([0.395, kh0, zk + 0.09]), W.E([0.395, kh1, zk + 0.09])])} stroke={LB.serit[1]} strokeWidth={2.4} fill="none" />
    {/* kasa (pervaz) + kasa yanağı taraması */}
    {[[-0.53, -0.45], [0.47, 0.55]].map(([a, b], i) => <polygon key={i} points={W.poli([[a, kh0, zk - 0.02], [b, kh0, zk - 0.02], [b, kh1 + 0.08, zk - 0.02], [a, kh1 + 0.08, zk - 0.02]])} fill={LB.kasa} />)}
    <polygon points={W.poli([[-0.53, kh1, zk - 0.02], [0.55, kh1, zk - 0.02], [0.55, kh1 + 0.08, zk - 0.02], [-0.53, kh1 + 0.08, zk - 0.02]])} fill={LB.kasa} />
    {/* sağ duvar (iç yüz): üst sıva + alt yağlı boya şeridi; yarığa yakın sıcak yansıma (bounce) iki düz alan */}
    <polygon points={W.poli(sagDuvar)} fill={LB.duvar} />
    <polygon points={W.poli(sagSerit)} fill={LB.duvarGolge} />
    <polyline points={pS([W.E([u, 1.38, MER.z0]), W.E([u, 3.0, zs]), W.E([u, 3.0, zk])])} stroke="#555b84" strokeWidth={2} fill="none" />
    {/* nem lekeleri (net kenar, bir basamak koyu) */}
    {[0, 1, 2].map((i) => { const z = 3.4 + rnd(SD, `nz${i}`) * 2.2, h = 1.6 + rnd(SD, `nh${i}`) * 1.2, r = 0.2 + rnd(SD, `nr${i}`) * 0.2; const pts: V3[] = Array.from({ length: 10 }, (_, k) => { const a = (k / 10) * Math.PI * 2, rr = r * (0.75 + rnd(SD, `nn${i}${k}`) * 0.4); return [u, h + Math.sin(a) * rr * 0.6, z + Math.cos(a) * rr]; }); return <polygon key={i} points={W.poli(pts)} fill="#363b5e" opacity={0.7} />; })}
    {/* sol duvar (merdiven yanı, ince şerit) + boru tırabzan (kelepçeli) */}
    <polygon points={W.poli(solDuvar)} fill="#353a5e" />
    <polyline points={pS([W.E([-u + 0.04, 0.18 + 0.9, MER.z0]), W.E([-u + 0.04, 1.8 + 0.9, zs]), W.E([-u + 0.04, 1.8 + 0.9, zk - 0.1])])} stroke={LG.cerceve} strokeWidth={5} fill="none" strokeLinecap="round" />
    {/* basamaklar (uzak → yakın): rıht (karanlık), basamak yüzü (göz hizası altındakiler görünür), burun çizgisi, burun altı tarama */}
    {Array.from({ length: MER.n }, (_, k) => MER.n - k).map((n) => {
      const z = burunZ(n), h0 = MER.r * (n - 1), h1 = MER.r * n;
      const riht: V3[] = [[-u, h0, z], [u, h0, z], [u, h1, z], [-u, h1, z]];
      const yuz: V3[] = [[-u, h1, z], [u, h1, z], [u, h1, z + MER.d], [-u, h1, z + MER.d]];
      const rE = riht.map(W.E);
      const cukur = W.E([0.05, h1, z + 0.12]), cs = W.S([0.05, h1, z + 0.12]);
      return <g key={n}>
        <polygon points={W.poli(yuz)} fill={LB.basamak} />
        {h1 < 1.1 && <ellipse cx={cukur[0]} cy={cukur[1]} rx={0.32 * cs} ry={0.32 * cs * Math.max(0.04, (1.12 - h1) / (z + 0.12 - 1.46)) * 0.5} fill="#56527a" opacity={0.7} />}
        <polygon points={pS(rE)} fill={LB.riht} />
        <Tarama sekil={[rE[3], rE[2], [rE[2][0], rE[2][1] + (rE[1][1] - rE[2][1]) * 0.45], [rE[3][0], rE[3][1] + (rE[0][1] - rE[3][1]) * 0.45]]} basamak="III" aci={72} renk={LB.tarama} aralik={7.5} kalinlik={1.8} seed={433 + n} />
        <polyline points={pS([W.E([-u, h1, z]), W.E([u, h1, z])])} stroke={LB.burun} strokeWidth={2} fill="none" />
        {/* ışık: basamak yüzünde (burunun önü) — ışın izlemeden */}
        {araliklar(`b${n}`).map(([z0, z1], i) => <g key={i}><SeritYatay W={W} h={h1 + 0.002} z0={z0} z1={z1} />
          <polyline points={pS([W.E([levhaU(z0) - levhaW(z0) / 2 - 0.03, h1, z]), W.E([levhaU(z0) + levhaW(z0) / 2 + 0.03, h1, z])])} stroke={LB.burunIsik} strokeWidth={2.4} fill="none" /></g>)}
      </g>;
    })}
    {/* sahanlık zemini göz hizasının üstünde: görünmez; kapı dibindeki ışık yalnız yarığın alt ucunda bir parıltı */}
  </g>;
};

/** levha: ışık hacmi (yarıktan ilk çarpmaya; çok saydam, screen) + toz (seed 707) */
const Levha: React.FC<{ W: Dunya; zMin: number; zMax: number; p: number; dislanan?: (q: P2, z: number) => boolean }> = ({ W, zMin, zMax, p, dislanan }) => {
  const isinlar = VURUS.filter((v, i) => i % 6 === 0);
  const yay = (k: number) => {
    const ust: P2[] = [], alt: P2[] = [];
    for (const v of isinlar) {
      const m = (KAYNAK[1] - v.hs) / (KAYNAK[2] - YARIK.z), za = Math.min(YARIK.z, zMax), zb = Math.max(v.z, zMin);
      if (za <= zb) continue;
      const P0: V3 = [levhaU(za) + k * levhaW(za) / 2, v.hs - m * (YARIK.z - za), za], P1: V3 = [levhaU(zb) + k * levhaW(zb) / 2, v.hs - m * (YARIK.z - zb), zb];
      ust.push(W.E(P0)); alt.push(W.E(P1));
    }
    return [...ust, ...alt.reverse()];
  };
  const toz = Array.from({ length: 46 }, (_, i) => {
    const hs = YARIK.h0 + 0.15 + rnd(707, `h${i}`) * 1.75, m = (KAYNAK[1] - hs) / (KAYNAK[2] - YARIK.z);
    const v = VURUS.reduce((a, b) => (Math.abs(b.hs - hs) < Math.abs(a.hs - hs) ? b : a));
    const z = v.z + (YARIK.z - v.z) * rnd(707, `z${i}`), dh = ((p / 60) * 0.004 + rnd(707, `d${i}`) * 0.02) % 0.02; // düşey sürüklenme 4 px/sn düzeyinde
    const X: V3 = [levhaU(z) + (rnd(707, `u${i}`) - 0.5) * levhaW(z), hs - m * (YARIK.z - z) - dh, z];
    return { X, r: 1.6 + rnd(707, `r${i}`) * 1.6, a: 0.55 + rnd(707, `a${i}`) * 0.35 };
  }).filter((t) => t.X[2] >= zMin && t.X[2] <= zMax);
  return <g>
    {/* ışık hacmi dolgusu yok: levha kameraya kenarından bakıyor (kamera levhadan 3 cm) → tek ince çizgi; yalnız toz okutur */}
    {void yay}
    {toz.map((t, i) => { const q = W.E(t.X); if (dislanan?.(q, t.X[2])) return null; return <circle key={i} cx={q[0]} cy={q[1]} r={t.r * Math.min(2, Math.max(1, W.S(t.X) / 400))} fill={LB.toz} opacity={t.a} />; })}
  </g>;
};

/** Eliasberg: sedyenin uzak yanında, sedyenin üstüne eğik; gövde levhanın solunda (el ışıkta kalır). Omuz: kol kökü gövde
 *  silüetinin parçası (bol palto omzu), kol dikişi kavisli; ışık yönündeki omuz başlığında kenar ışığı (levha değiyor). */
const Eliasberg: React.FC<{ W: Dunya; yuz: P2; H: number }> = ({ W, yuz, H }) => {
  const E = W.E;
  // omuzlar (dünya) + yaka (yüze göre ekranda: çenenin iki yanında kalkık palto yakası, baş bunun önünde)
  const sl = E([-0.9, 0.93, 2.5]), slt = E([-0.78, 1.0, 2.46]), al = E([-0.95, 0.6, 2.52]);
  const sr = E([-0.36, 0.94, 2.45]), srt = E([-0.45, 1.0, 2.43]), ar = E([-0.31, 0.6, 2.49]);
  const yk = (x: number, y: number): P2 => [yuz[0] + x * H, yuz[1] + y * H];
  const govdeD = cr([al, [al[0] - 5, (al[1] + sl[1]) / 2], sl, slt, yk(-0.36, 0.2), yk(-0.3, 0.12), yk(0.27, 0.1), yk(0.34, 0.18), srt, sr, [ar[0] + 4, (ar[1] + sr[1]) / 2], ar, [ar[0] - 60, ar[1] + 80], [al[0] + 60, al[1] + 80]]);
  // kol dikişleri: omuz başlığı gövde silüetinin parçası; dikiş kavisli
  const dikisL = `M${slt[0] + 34},${slt[1] + 2} Q${sl[0] + 22},${sl[1] + 34} ${al[0] + 30},${al[1] - 10}`;
  const dikisR = `M${srt[0] - 26},${srt[1] + 2} Q${sr[0] - 18},${sr[1] + 34} ${ar[0] - 26},${ar[1] - 10}`;
  const yakaL = cr([yk(-0.36, 0.2), yk(-0.3, 0.1), yk(-0.12, 0.42), yk(-0.06, 0.62), yk(-0.2, 0.62)]);
  const yakaR = cr([yk(0.34, 0.18), yk(0.27, 0.08), yk(0.17, 0.42), yk(0.12, 0.62), yk(0.26, 0.62)]);
  return <g strokeLinejoin="round">
    <path d={govdeD} fill={LB.ceket} stroke="#1f2238" strokeWidth={3} />
    <Kirp d={govdeD}>
      {/* ışıktan uzak yarı bir basamak koyu + yön taraması (gölge yarısında gravür) */}
      <path d={cr([[al[0] - 40, al[1] + 90], [al[0] - 30, sl[1] - 40], [slt[0] + 40, slt[1] - 30], [yk(-0.2, 0.3)[0], yk(-0.2, 0.3)[1]], [yk(-0.2, 0.3)[0] + 10, al[1] + 90]])} fill={LB.ceketGolge} />
      <Tarama sekil={[[al[0] - 40, sl[1] - 40], [yk(-0.2, 0)[0], sl[1] - 40], [yk(-0.2, 0)[0], al[1] + 90], [al[0] - 40, al[1] + 90]]} basamak="III" aci={72} renk="#191b30" aralik={6} kalinlik={1.8} seed={SD + 30} />
      {/* gömlek (gölgede ecru) + kalkık palto yakası iki yanda */}
      <path d={cr([yk(-0.14, 0.4), yk(0.2, 0.4), yk(0.1, 0.75), yk(0.0, 0.75)])} fill={LB.gomlek} />
      <path d={yakaL} fill="#33375a" stroke="#1f2238" strokeWidth={2.2} />
      <path d={yakaR} fill="#3b3f63" stroke="#1f2238" strokeWidth={2.2} />
      {/* omuz başlıkları: kubbe ışığı (soğuk, kendi ailesinde) */}
      <path d={cr([[slt[0] - 14, slt[1] + 8], [slt[0] + 20, slt[1] - 2], [slt[0] + 50, slt[1] + 10], [slt[0] + 14, slt[1] + 20]])} fill={LB.ceketIsik} opacity={0.5} />
      <path d={cr([[srt[0] + 10, srt[1] + 8], [srt[0] - 20, srt[1] - 2], [srt[0] - 46, srt[1] + 10], [srt[0] - 12, srt[1] + 20]])} fill={LB.ceketIsik} opacity={0.7} />
    </Kirp>
    <path d={dikisL} stroke="#1f2238" strokeWidth={2.2} fill="none" />
    <path d={dikisR} stroke="#1f2238" strokeWidth={2.2} fill="none" />
    {/* ışık yönündeki (sağ) omuz ve kol dış kenarı: levhadan sıcak kenar (2–3 px) */}
    <Kirp d={`M${yuz[0] + 0.22 * H},0 L1080,0 L1080,1920 L${yuz[0] + 0.22 * H},1920Z`}><Hilal d={govdeD} renk={LB.serit[1]} dx={-3} dy={1} alfa={0.95} /></Kirp>
  </g>;
};

/** sedye: örtü yüzeyi (silüet + gövde kabartısı), kıvrımlar, ışık bandı, açıkta kalan bez, sırık */
const Sedye: React.FC<{ W: Dunya }> = ({ W }) => {
  const us = Array.from({ length: 112 }, (_, i) => SEDYE.u0 - 0.12 + i * 0.022);
  const zs = Array.from({ length: 19 }, (_, i) => SEDYE.zOn + (i / 18) * (SEDYE.zArka - SEDYE.zOn));
  // üst silüet: her u için ekranda en üstteki örtü noktası
  const sil: P2[] = us.map((u) => { let best: P2 = [NaN, 1e9]; for (const z of zs) { if (z < kenarZ(u) - 1e-6) continue; const q = W.E([u, ortuH(u, z), z]); if (q[1] < best[1]) best = q; } return best; });
  const kenar = us.map((u) => W.E([u, ortuH(u, kenarZ(u)) - 0.004, kenarZ(u)]));
  const ortuD = `M${pS([...sil, ...kenar.reverse()]).split(" ").join(" L")}Z`;
  const yuzeyBant = (u0: number, u1: number, z0: number, z1: number, dh = 0): P2[] => {
    const a: P2[] = [], b: P2[] = [];
    for (let u = u0; u <= u1 + 1e-6; u += 0.02) { a.push(W.E([u, ortuH(u, Math.max(z1, kenarZ(u))) + dh, Math.max(z1, kenarZ(u))])); b.push(W.E([u, ortuH(u, Math.max(z0, kenarZ(u))) + dh, Math.max(z0, kenarZ(u))])); }
    return [...a, ...b.reverse()];
  };
  // ışık bandı (levha ∩ örtü): z boyunca örnekle
  const bant = (k: number, ek = 0): P2[] => {
    const sol: P2[] = [], sag: P2[] = [];
    for (let i = 0; i <= 16; i++) {
      const z = SEDYE.zOn + (i / 16) * (2.24 - SEDYE.zOn), w = (levhaW(z) * k) / 2 + ek; // tepe çizgisinin ardı görünmez
      const ua = levhaU(z) - w, ub = levhaU(z) + w;
      if (z < kenarZ(ua) && z < kenarZ(ub)) continue;
      sol.push(W.E([ua, ortuH(ua, z) + 0.003, z])); sag.push(W.E([ub, ortuH(ub, z) + 0.003, z]));
    }
    return [...sol, ...sag.reverse()];
  };
  const kivrimlar = [-1.02, -0.74, -0.6, -0.3, 0.02, 0.26, 0.55].map((u, i) => {
    const du = (rnd(421, `ku${i}`) - 0.5) * 0.06, w = 0.012 + rnd(421, `kw${i}`) * 0.014;
    const pts = (s: number) => zs.filter((_, j) => j % 2 === 0).map((z) => { const uu = u + du * ((z - SEDYE.zOn) / 0.54) + s * w * Math.sin(((z - SEDYE.zOn) / 0.54) * Math.PI); return W.E([uu, ortuH(uu, Math.max(z, kenarZ(uu))) + 0.002, Math.max(z, kenarZ(uu))]); });
    return { koyu: [...pts(-1), ...pts(1).reverse()] as P2[], sirt: pts(1.6) };
  });
  const sirikY = (u: number, h: number) => W.E([u, h, SEDYE.zOn - 0.01]);
  return <g strokeLinejoin="round">
    <path d={ortuD} fill={LB.ortu[1]} stroke="#2b2a4f" strokeWidth={2.4} />
    <Kirp d={ortuD}>
      {/* gövde sırtı (kalça, uyluk, ayak ucu) bir basamak açık — soğuk ailede */}
      {[[-1.26, -1.16], [-0.98, -0.42], [-0.3, 0.3], [0.32, 0.9]].map(([a, b], i) => <polygon key={i} points={pS(yuzeyBant(a, b, 2.1, 2.3, 0.002))} fill={LB.ortu[0]} />)}
      {/* yakın yamaç (kameraya bakan, kol kabartısının altı) bir basamak koyu */}
      <polygon points={pS(yuzeyBant(SEDYE.u0 - 0.12, SEDYE.u1, SEDYE.zOn, 1.985, 0.001))} fill="#5e5482" />
      {kivrimlar.map((k, i) => <g key={i}>
        <polygon points={pS(k.koyu)} fill={LB.ortu[2]} />
        <Tarama sekil={k.koyu} basamak="III" aci={72} renk={LB.tarama} aralik={9} kalinlik={1.6} seed={421 + i} />
        <polyline points={pS(k.sirt)} stroke={LB.ortu[0]} strokeWidth={2.2} fill="none" opacity={0.9} />
      </g>)}
      {/* ışık bandı: dış / orta / çekirdek (tek kaynak; levhanın örtüdeki izi) */}
      <polygon points={pS(bant(1, 0.015))} fill={LB.serit[2]} />
      <polygon points={pS(bant(1))} fill={LB.serit[1]} />
      <polygon points={pS(bant(0.4))} fill={LB.serit[0]} />
    </Kirp>
    {/* örtü kenarı geri çekildiği yerde açıkta kalan sedye bezi (elin altı) */}
    {(() => { const pts: P2[] = [], alt: P2[] = []; for (let u = -0.66; u <= -0.28; u += 0.02) { pts.push(W.E([u, ortuH(u, kenarZ(u)) - 0.004, kenarZ(u)])); alt.push(W.E([u, SEDYE.bez, SEDYE.zOn])); } const d = `M${pS([...pts, ...alt.reverse()]).split(" ").join(" L")}Z`; return <g>
      <path d={d} fill={LB.bez} />
      <Kirp d={d}><polygon points={W.poli([[levhaU(1.93) - levhaW(1.93) / 2 - 0.015, SEDYE.bez, 1.93], [levhaU(1.93) + levhaW(1.93) / 2 + 0.015, SEDYE.bez, 1.93], [levhaU(2.08) + levhaW(2.08) / 2 + 0.015, SEDYE.bez, 2.08], [levhaU(2.08) - levhaW(2.08) / 2 - 0.015, SEDYE.bez, 2.08]])} fill={LB.serit[2]} /></Kirp>
      <Kirp d={d}><polygon points={W.poli([[levhaU(1.93) - levhaW(1.93) * 0.3, SEDYE.bez, 1.93], [levhaU(1.93) + levhaW(1.93) * 0.3, SEDYE.bez, 1.93], [levhaU(2.08) + levhaW(2.08) * 0.3, SEDYE.bez, 2.08], [levhaU(2.08) - levhaW(2.08) * 0.3, SEDYE.bez, 2.08]])} fill={LB.serit[1]} /></Kirp>
      {/* örtünün geri çekilmiş kenarı: kalın kıvrık kenar (dikiş yok), ışıkta kısa sıcak kenar */}
      <path d={cr(pts, false)} stroke={LB.ortu[2]} strokeWidth={7} fill="none" />
      <path d={cr(pts.map((q) => [q[0], q[1] - 3] as P2), false)} stroke={LB.ortu[0]} strokeWidth={2} fill="none" />
    </g>; })()}
    {/* yakın sırık (koyu, kalın) + örtünün sırık üstüne düşen kısa sarkması */}
    <polygon points={pS([sirikY(SEDYE.u0 - 0.2, 0.75), sirikY(SEDYE.u1 + 0.3, 0.75), sirikY(SEDYE.u1 + 0.3, 0.70), sirikY(SEDYE.u0 - 0.2, 0.70)])} fill="#3a2f40" stroke="#1e1826" strokeWidth={2.4} />
    <polygon points={pS([sirikY(SEDYE.u0 - 0.2, 0.75), sirikY(SEDYE.u1 + 0.3, 0.75), sirikY(SEDYE.u1 + 0.3, 0.737), sirikY(SEDYE.u0 - 0.2, 0.737)])} fill="#4e4058" />
    <polygon points={pS([sirikY(SEDYE.u0 - 0.2, 0.712), sirikY(SEDYE.u1 + 0.3, 0.712), sirikY(SEDYE.u1 + 0.3, 0.70), sirikY(SEDYE.u0 - 0.2, 0.70)])} fill="#2a2030" />
    <polyline points={pS([sirikY(-0.62, 0.749), sirikY(-0.22, 0.749)])} stroke={LB.sirikIsik} strokeWidth={3} fill="none" />
  </g>;
};

/** sedyenin altından görünen zemin: yansıma iki düz alan, nem bandı, levha şeridi, çubuklar (imza) */
const AltZemin: React.FC<{ W: Dunya; kilit?: SablonProps["kilit"] }> = ({ W, kilit }) => {
  const elips = (cu: number, cz: number, ru: number, rz: number): V3[] => Array.from({ length: 40 }, (_, i) => { const a = (i / 40) * Math.PI * 2; return [cu + Math.cos(a) * ru, 0, cz + Math.sin(a) * rz]; });
  const zemin = araliklar("zemin");
  // çubuklar: levha şeridini ~20° açıyla keser (mekanlar §13.7); şeritteki kısım tam parlak, kalanı gölgede (yine en doygun)
  const cub: [V3, V3][] = [[[-0.62, 0.0105, 2.6], [-0.22, 0.0105, 2.68]], [[-0.5, 0.0105, 2.665], [-0.12, 0.0105, 2.585]]];
  const CU = { govde: LG.cubuk, golge: LG.cubukGolge, kenar: LG.cubukKenar, spek: LG.cubukSpek, kontur: LG.cubukKontur, karanlik: "#9a6a2c" };
  return <g>
    <polygon points={W.poli([[-4, 0, 1.8], [4, 0, 1.8], [4, 0, 3.0], [-4, 0, 3.0]])} fill="#30304e" />
    <polygon points={W.poli(elips(levhaU(2.45), 2.45, 0.24, 0.4))} fill="#4c3c52" />
    <polygon points={W.poli(elips(levhaU(2.5), 2.5, 0.13, 0.25))} fill={LB.bounce[2]} />
    {/* sedye altı: üstü kapalı → ortam ışığından gölge (düz, net kenar) */}
    <polygon points={W.poli([[-4, 0, 1.6], [4, 0, 1.6], [4, 0, 2.32], [-4, 0, 2.32]])} fill={LB.golge} opacity={0.55} />
    {/* nem buğusu: zemin üstü düz bant h 0–0.35 (net kenar) */}
    <polygon points={W.poli([[-4, 0.0, 2.78], [4, 0.0, 2.78], [4, 0.35, 2.78], [-4, 0.35, 2.78]])} fill={LB.nem} opacity={0.25} />
    {zemin.map(([z0, z1], i) => <SeritYatay key={i} W={W} h={0.001} z0={z0} z1={Math.min(z1, 2.95)} />)}
    {cub.map(([a, b], i) => {
      const A = W.E(a), B = W.E(b), s = W.S([(a[0] + b[0]) / 2, 0, (a[2] + b[2]) / 2]), w = Math.max(9, 0.021 * s);
      const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
      const govdeD = `M${A[0] + nx * w * 0.42},${A[1] + ny * w * 0.42} L${B[0] + nx * w * 0.5},${B[1] + ny * w * 0.5} L${B[0] - nx * w * 0.5},${B[1] - ny * w * 0.5} L${A[0] - nx * w * 0.42},${A[1] - ny * w * 0.42}Z`;
      const bas = { x: B[0] + (dx / L) * w * 0.3, y: B[1] + (dy / L) * w * 0.3 };
      const isikD = (() => { const k = 0.07; const zm = (a[2] + b[2]) / 2; const u0 = levhaU(zm) - levhaW(zm) / 2 - 0.04 - k, u1 = levhaU(zm) + levhaW(zm) / 2 + 0.04 + k; return W.poliD([[u0, 0, zm - 0.3], [u1, 0, zm - 0.3], [u1, 0.05, zm + 0.3], [u0, 0.05, zm + 0.3]]); })();
      if (kilit) kilit.push({ ad: `cubuk${i}`, p: [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], tur: "kurulum" });
      return <g key={i}>
        {/* temas gölgesi: ışığın tersine (kameraya doğru) kısa koyu şerit */}
        <path d={`M${A[0]},${A[1] + w * 0.55} L${B[0]},${B[1] + w * 0.55}`} stroke={LB.golge} strokeWidth={w * 0.9} opacity={0.75} strokeLinecap="round" />
        <path d={govdeD} fill={CU.karanlik} stroke={CU.kontur} strokeWidth={2} />
        <circle cx={bas.x} cy={bas.y} r={w * 0.7} fill={CU.karanlik} stroke={CU.kontur} strokeWidth={2} />
        <Kirp d={isikD}>
          <path d={govdeD} fill={CU.govde} />
          <circle cx={bas.x} cy={bas.y} r={w * 0.7} fill={CU.govde} />
          <path d={`M${A[0] - nx * w * 0.2},${A[1] - ny * w * 0.2} L${B[0] - nx * w * 0.24},${B[1] - ny * w * 0.24}`} stroke={CU.kenar} strokeWidth={2.2} />
          <circle cx={bas.x - nx * w * 0.2} cy={bas.y - ny * w * 0.25} r={w * 0.22} fill={CU.spek} />
        </Kirp>
      </g>;
    })}
  </g>;
};

/** Aydarov'un eli: örtü kenarından çıkar, sedye kenarında; işaret parmağı seğirmeden sonra hafif kıvrık. Levha içinde (sıcak),
 *  bilek tarafı gölgede; aynı el iki palette çizilir, ışıklı olan levha kesitiyle kırpılır (tek kaynak). */
const POZ_SEGIRME: GravurPoz = { parmak: [{ a: -3, b: 52, k: 0.86 }, { a: 0, b: 34, k: 0.9 }, { a: 3, b: 38, k: 0.88 }, { a: 6, b: 42, k: 0.85 }], bas: { a: -18, b: 10 } };
const EL_ISIK: GravurPalet = { isik: "#e4bc98", golge: "#c0937a", konturYuk: "#5a4438", konturIsik: "#a8836c", kenar: "#f0c4a8", tarama: "#6a4f40", manset: "#4f4a62", mansetGolge: "#3a3550" };
const EL_GOLGE: GravurPalet = { isik: "#8f7360", golge: "#735a56", konturYuk: "#3e2c30", konturIsik: "#6e5450", kenar: "#8f7360", tarama: "#4a3438", manset: "#4f4a62", mansetGolge: "#3a3550" };
const El: React.FC<{ W: Dunya; kilit?: SablonProps["kilit"] }> = ({ W, kilit }) => {
  const bilekW: V3 = [-0.36, 0.8, 2.06], ucW: V3 = [-0.5, 0.762, 1.935];
  const b = W.E(bilekW), u = W.E(ucW);
  const aci = (Math.atan2(u[1] - b[1], u[0] - b[0]) * 180) / Math.PI, L = Math.hypot(u[0] - b[0], u[1] - b[1]);
  const Ee = L / 0.93;
  const levhaKesit = W.kutu([0.66, 0.92].flatMap((h) => [1.86, 2.1].flatMap((z) => [-1, 1].map((k) => [levhaU(z) + (k * levhaW(z)) / 2, h, z] as V3))));
  if (kilit) kilit.push({ ad: "isaret-parmak", p: u, tur: "dokunus" });
  const el = (pal: GravurPalet) => <GravurEl bilek={b} aci={aci} E={Ee} poz={POZ_SEGIRME} ayna palet={pal} isik={[0.25, -1]} taramaAci={72} />;
  return <g>
    {/* parmak uçlarının sırık/bez üstüne temas gölgesi */}
    <ellipse cx={u[0] + 8} cy={u[1] + 10} rx={70} ry={16} fill={LB.golge} opacity={0.55} transform={`rotate(${aci - 70} ${u[0]} ${u[1]})`} />
    {el(EL_GOLGE)}
    <Kirp d={`M${pS(levhaKesit).split(" ").join(" L")}Z`}>{el(EL_ISIK)}</Kirp>
  </g>;
};

// ======================================================= SAHNE =======================================================
export const BODRUM_P08_3_KAMERA: Kamera25 = {
  kare: [177, 252], konum_yol: [[-0.52, 1.12, 0.91], [-0.52, 1.12, 1.46]], yon_yol: [[0, 0]], lens_mm: [50],
  dolly_zoom: { konu: [-0.52, 1.12, 2.15] }, merkez: [540, 640], egri: "inout", ekipman: "dolly",
};
const P08_3: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const K = kamera25(param<Partial<Kamera25> | undefined>(plan, "kamera", undefined), p, BODRUM_P08_3_KAMERA);
  const W = dunya(K);
  const yuzC = W.E([-0.52, 1.12, 2.15]), yuzH = 0.24 * W.S([-0.52, 1.12, 2.15]);
  if (kilit) kilit.push({ ad: "yuz", p: yuzC, tur: "yuz" });
  const yuzDis = (q: P2, z: number) => z > 2.15 && Math.hypot((q[0] - yuzC[0]) / (yuzH * 0.4), (q[1] - yuzC[1]) / (yuzH * 0.55)) < 1;
  return (
    <LgBaski>
      <rect x={-50} y={-50} width={1180} height={2020} fill={LB.tavan} />
      <Bolme W={W} />
      {[[7.0, 1.62], [6.15, 1.78], [5.3, 1.7], [4.45, 1.84], [3.62, 1.58]].map(([z, boy], i) => <OrtuluBicim key={i} W={W} z={z + (rnd(421, `oz${i}`) - 0.5) * 0.12} boy={boy} i={i} />)}
      <polygon points={W.poli([[-3.5, 0, 5.4], [-0.95, 0, 5.4], [-0.95, 0.35, 5.4], [-3.5, 0.35, 5.4]])} fill={LB.nem} opacity={0.25} />
      <Merdiven W={W} />
      {/* bölme ile merdiven arası duvar ayağı (ön yüz z 3) */}
      <polygon points={W.poli([[-0.95, 0, 3], [-0.7, 0, 3], [-0.7, 3.4, 3], [-0.95, 3.4, 3]])} fill="#33375a" stroke="#22253f" strokeWidth={2} />
      <polygon points={W.poli([[-0.95, 0, 3], [-0.7, 0, 3], [-0.7, 1.2, 3], [-0.95, 1.2, 3]])} fill="#262a46" />
      {/* merdiven boşluğu buğusu: iki düz bant (derinlik) */}
      <polygon points={W.poli([[-0.7, 3.1, 5.0], [0.7, 3.1, 5.0], [0.7, 3.6, 5.0], [-0.7, 3.6, 5.0]])} fill={LB.bugu} opacity={0.18} />
      <polygon points={W.poli([[-0.7, 3.6, 4.2], [0.7, 3.6, 4.2], [0.7, 4.2, 4.2], [-0.7, 4.2, 4.2]])} fill={LB.bugu} opacity={0.28} />
      <Levha W={W} zMin={2.3} zMax={6.4} p={p} dislanan={yuzDis} />
      <Eliasberg W={W} yuz={yuzC} H={yuzH} />
      <LgYuz x={yuzC[0]} y={yuzC[1]} H={yuzH} rol={6} ifade={{ kasIc: 1, goz: 0.88, agiz: 0.8, bakis: [0.45, 0.8] }} isikX={1} />
      <AltZemin W={W} kilit={kilit} />
      <Sedye W={W} />
      <El W={W} kilit={kilit} />
      <Levha W={W} zMin={1.86} zMax={2.3} p={p} />
    </LgBaski>
  );
};

const Sahne: React.FC<SablonProps> = (pr) => {
  const g = param<string>(pr.plan, "gorunum", "p08-3");
  return g === "p08" ? <BodrumP08T4 {...pr} /> : g === "p08-t3" ? <BodrumP08T3 {...pr} /> : g === "p08-t2" ? <BodrumP08 {...pr} /> : <P08_3 {...pr} />; // p08: onaylı hedef (tur-4, çizim araçları); p08-t3 / p08-t2: tur kayıtları; p08-3: tur-1 (reddedildi)
};
/** BODRUM — Radyo Evi bodrumu (morg). Arşiv: litografi (SALON ile aynı zincir). Görünüm: `p08-3` (yön karesi). */
export const BODRUM_SABLON: Sablon = { Sahne, arsiv: () => "litografi" };
