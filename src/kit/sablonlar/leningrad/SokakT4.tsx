// ===== SOKAK-LG `p03a` tur-4 — kalıcı çizim araçları (src/kit/cizim) + tur-3 kalanları =====
// Tur-3 kaydı SokakT3.tsx'te (görünüm "p03a-t3"). Bu dosya yalnız EKLEME (T3'ün kopyası üstüne).
// Tur-4 değişiklikleri:
//   - Cephe gölgeleri, korniş altı, kar yığını yüzleri: TonTarama "isinsal" (çizgiler kaçış noktasına gider = perspektif gravür);
//     yol karı gölgede seyrek ışınsal tarama.
//   - Patikalar: ray gibi iki sürekli bant yerine seed'li yürüyüş izleri (sapan rota, sol/sağ ayak izi, boşluk, çiğnenmiş lekeler).
//   - Müzisyen: sağ kol üst kolu sırtın ARKASINDA (OTS: uzak kol), yalnız önkol sırt kenarından çıkar → uzun düz kol yok;
//     el ekmeği gerçekten tutar: ekmek önce, sonra el (parmaklar ekmeğin alt yarısını sarar, temas gölgesi ekmekte).
//   - Tüm konturlar MurekkepKontur/BirlesikM, palto ve yüz gölgesi TonTarama (yüzde iç çizgi yok).
// Eski başlık (T3): Kamera, sokak ve tek ışık tur-2 ile aynı:
//   C (6.2, 1.65, 0 → 0.1), pan −16°, tilt −3.5°, 35 mm; alçak kış güneşi önde-sağda (yükseklik 6°, yatay yön (0.6, 0.8)).
// Işık (tek kaynak, CLAUDE "Işığın yolu"):
//   - sol cephenin bir noktası (u −11, z) güneşi sağ cephenin z + 29.3 m'deki binasının üstünden görür: ışıklı ⇔ h > H_sağ(z + 29.3) − 3.9
//     → ışık sınırı sağ çatı siluetini basamak basamak izler (tur-2'deki sabit 16.5 m yerine);
//   - karda çapraz şerit ve müzisyenin elleri/ekmek sağdaki çapraz sokaktan (sağ cephede boşluk z 6–11) gelen ışında;
//   - sağ cephe güneşe arkasını döner: tamamen gölgede.
// Cephe (madde 3): gölge karışımı 0.22 + #5a4a78 (tur-2: 0.4 gri-mor), ışıklı üst katlar tam doygun + korniş üstünde 3 px sıcak kenar,
//   korniş altı tarama, söve + sandrik (1.–2. kat), cam #2a2a4a, kâğıt bant (L* ≈ 77), %10 tahta kaplı pencere, kat adımı %20 binada farklı,
//   yükseklik farkı ≥ 1 kat. Uzak cepheler buğuya karışır.
// Kar (madde 4): iki çiğnenmiş patika (oluk + sırt), tümsekli yığınlar + gölge yüzünde tarama, kızak izi, ön planda kaba kar topakları.
// Gök (madde 5): basamaklar üst üste biner (5 px boşluk yok), kaçış noktasında 3 eş merkezli ışıma + ufukta 3 buğu bandı.
// Müzisyen (K1–K3, 1, 2, 6): sağ omuz başlığı başın sağ-altında, kol omuzdan dirsekle iner (birleşik silüet), önkol öne-yukarı;
//   ekmek eli ekmeğin altında, parmaklar alt kenarı sarar, başparmak yüzde; avuç eşit ölçekli, çanak, kırıntılar düzensiz çokgen;
//   profil baş T3 (kavisli ışık sınırı, favori, boyun tonu); kalkık yuvarlak yaka, kayış omuzda kırılır, çekme kıvrımları.
import React from "react";
import { BirlesikM, MurekkepCizgi, MurekkepKontur } from "../../cizim/MurekkepCizgi";
import { TonTarama } from "../../cizim/TonTarama";
import { karistir, rnd } from "../../../doku/sabitler";
import { kamera25, Kamera25, V3 } from "../../kamera25d";
import { param, SablonProps } from "../../ortak";
import type { YuzKart } from "../benmychree/Figur";
import { crP, daire, HilalB, INC_POZ, IncEl, kapsul, Kivrim, KirpB, LgBasProfil, lgProfilGeo, serit } from "./lgFigur";
import { cr, dunya, Dunya, Hilal, Kirp, LgBaski, P2, pS } from "./lgOrtak";
import { LH } from "./SokakHedef";

export const SD = 1941;
export const BOSLUK: [number, number] = [6, 11];
export const K_ISIK = 0.8 / 0.6;
export const BUGU = "#e8c6bc", GOLGE_K = "#5a4a78";
// Petersburg cephe boyaları (hedef: okra, gül, krem, somon; tur-2'deki yeşilimsi gri yok)
export const CEPHE = ["#d8ae7c", "#d4a094", "#dcc29e", "#c99aa2", "#e0b48a"] as const;

export type Bina = { s: 1 | -1; z0: number; z1: number; H: number; c: number; zk: number; adim: number; n: number };
const binalar = (): Bina[] => {
  const out: Bina[] = [];
  for (const s of [-1, 1] as const) {
    let z = -10, i = 0, nP = 0;
    while (z < 330) {
      const en = 15 + rnd(SD, `e${s}${i}`) * 18;
      const adim = rnd(SD, `k${s}${i}`) < 0.2 ? 3.2 : 3.6; // %20 binada farklı kat adımı
      let n = 4 + Math.floor(rnd(SD, `n${s}${i}`) * 3); if (n === nP) n = n === 6 ? 4 : n + 1; // yan yana bina ≥ 1 kat fark
      const zk = 4.4, H = zk + (n - 1) * adim + 1.6;
      let z0 = z, z1 = z + en;
      if (s > 0 && z1 > BOSLUK[0] && z0 < BOSLUK[1]) { if (z0 < BOSLUK[0]) z1 = BOSLUK[0]; else { z0 = BOSLUK[1]; z1 = z0 + en; } }
      out.push({ s, z0, z1, H, c: Math.floor(rnd(SD, `c${s}${i}`) * 5), zk, adim, n });
      z = z1; nP = n; i++;
    }
  }
  return out;
};
export const BINA = binalar();
const SAG = BINA.filter((b) => b.s > 0);
/** sağ cephenin z'deki yüksekliği (boşlukta 0) */
const hSag = (z: number) => { if (z > BOSLUK[0] && z < BOSLUK[1]) return 0; const b = SAG.find((q) => z >= q.z0 && z < q.z1); return b ? b.H : 20; };
const D_SAG = 22 * K_ISIK; // sol cepheden sağ cepheye ışın boyunca z farkı (29.3 m)
const isikH = (z: number) => hSag(z + D_SAG) - 3.9;
const ss = (a: number, b: number, x: number) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
export const bugu = (renk: string, z: number) => karistir(renk, BUGU, Math.max(0, Math.min(0.72, (z - 30) / 200)));

export const Cephe: React.FC<{ W: Dunya; b: Bina; vp: P2 }> = ({ W, b, vp }) => {
  const u = b.s * 11, { z0, z1, H } = b, zm = (z0 + z1) / 2;
  const q = (za: number, zb: number, h0: number, h1: number, uu = u): V3[] => [[uu, h0, za], [uu, h0, zb], [uu, h1, zb], [uu, h1, za]];
  const boya = bugu(karistir(CEPHE[b.c], "#fff0d8", 0.2), zm); // güneşte: tam doygun + sıcak
  const golge = bugu(karistir(CEPHE[b.c], GOLGE_K, 0.22), zm);
  const sMid = W.S([u, 3, Math.max(4, zm)]);
  // ışıklı bölge (yalnız sol): sağ çatı silüetini izleyen basamaklı alt sınır
  const isikPoli: V3[] = [];
  if (b.s < 0) {
    const zs: number[] = [z0]; for (const r of SAG) { const zz = r.z0 - D_SAG; if (zz > z0 && zz < z1) zs.push(zz); } zs.push(z1);
    if (BOSLUK[0] - D_SAG > z0 && BOSLUK[0] - D_SAG < z1) zs.push(BOSLUK[0] - D_SAG, BOSLUK[1] - D_SAG);
    zs.sort((a, c) => a - c);
    const alt: V3[] = [];
    for (let i = 0; i < zs.length - 1; i++) { const h = Math.max(0, Math.min(H, isikH((zs[i] + zs[i + 1]) / 2))); alt.push([u, h, zs[i]], [u, h, zs[i + 1]]); }
    isikPoli.push([u, H, z0], [u, H, z1], ...alt.reverse());
  }
  const aks = 3.3 + rnd(SD, `a${b.s}${z0}`) * 0.3, n = Math.max(1, Math.floor((z1 - z0 - 1.2) / aks));
  const katlar = [1.2, ...Array.from({ length: b.n - 1 }, (_, k) => b.zk + k * b.adim)];
  const pen: { p: V3[]; kat: number; zc: number }[] = [];
  for (let k = 0; k < n; k++) { const zc = z0 + (z1 - z0) / 2 + (k - (n - 1) / 2) * aks; katlar.forEach((h, ki) => pen.push({ p: q(zc - 0.55, zc + 0.55, h + (ki === 0 ? 0.6 : 0.9), h + (ki === 0 ? 2.6 : 2.9)), kat: ki, zc })); }
  const isikta = (h: number, z: number) => b.s < 0 && h > isikH(z);
  const kornisAlt = W.poliD([[u, H - 0.7, z0], [u, H - 0.7, z1], [u - b.s * 0.6, H - 0.1, z1], [u - b.s * 0.6, H - 0.1, z0]]);
  return <g strokeLinejoin="round">
    <polygon points={W.poli(q(z0, z1, 0, H))} fill={golge} />
    {/* tur-4: gölge cephesi kaçış noktasına giden perspektif tarama (sıra taşı/kat hattı yönü); yakın binada sık ve kalın, uzakta seyrek */}
    {sMid > 10 && <TonTarama d={W.poliD(q(z0, z1, 0, H))} isik={[0, 1]} ton={1} renk={bugu("#3a2e58", zm)} seed={SD + 40 + Math.round(z0 * 3) + (b.s > 0 ? 500 : 0)} mod="isinsal" merkez={vp}
      tonFn={(p) => 0.08 + (b.s > 0 ? 0.45 : 0.35) * ss(W.E([u, H * 0.75, zm])[1], W.E([u, 0, zm])[1], p[1])} aralik={sMid > 40 ? 6 : 7} kalinlik={sMid > 40 ? 1.9 : 1.5} alfa={0.45} />}
    {isikPoli.length > 3 && <polygon points={W.poli(isikPoli)} fill={boya} />}
    {/* granit kaide + rustika zemin kat + kat silmeleri */}
    <polygon points={W.poli(q(z0, z1, 0, 0.8))} fill={bugu(LH.kaide, zm)} />
    {sMid > 18 && [1.25, 1.7, 2.15, 2.6, 3.05, 3.5, 3.95].map((h) => <polyline key={h} points={pS([W.E([u, h, z0]), W.E([u, h, z1])])} stroke={karistir(golge, LH.derin, 0.5)} strokeWidth={Math.max(1.5, Math.min(3.4, sMid / 26))} fill="none" />)}
    {katlar.slice(1).map((h) => <polygon key={h} points={W.poli(q(z0, z1, h - 0.1, h + 0.14))} fill={karistir(isikta(h, zm) ? boya : golge, "#ffffff", 0.16)} />)}
    {pen.map(({ p, kat, zc }, i) => {
      const E = p.map(W.E), w = Math.abs(E[1][0] - E[0][0]); if (!(w > 3)) return null;
      const lit = isikta(p[2][1], zc), ht = p[2][1], hb = p[0][1];
      const sv: V3[] = [[u, hb - 0.2, p[0][2] - 0.18], [u, hb - 0.2, p[1][2] + 0.18], [u, ht + 0.16, p[1][2] + 0.18], [u, ht + 0.16, p[0][2] - 0.18]];
      const tahta = rnd(SD + 3, `t${b.s}${z0}${i}`) < 0.1;
      return <g key={i}>
        <polygon points={W.poli(sv)} fill={karistir(lit ? boya : golge, "#ffffff", lit ? 0.26 : 0.14)} />
        <polygon points={pS(E)} fill={tahta ? bugu("#6a5850", zm) : bugu("#2a2a4a", zm * 0.6)} />
        {tahta && w > 6 && [0.33, 0.66].map((f) => <polyline key={f} points={pS([W.E([u, hb + (ht - hb) * f, p[0][2]]), W.E([u, hb + (ht - hb) * f, p[1][2]])])} stroke="#4a3c38" strokeWidth={Math.max(1, w * 0.04)} />)}
        {!tahta && w > 7 && <polyline points={pS([W.E([u, hb, (p[0][2] + p[1][2]) / 2]), W.E([u, ht, (p[0][2] + p[1][2]) / 2])])} stroke={LH.camIsik} strokeWidth={Math.max(1, w * 0.05)} fill="none" />}
        {!tahta && lit && w > 6 && <polygon points={W.poli([[u, hb + 0.3, p[0][2] + 0.1], [u, hb + 0.9, p[0][2] + 0.1], [u, ht - 0.2, p[1][2] - 0.1], [u, ht - 0.8, p[1][2] - 0.1]])} fill="#f0c8b0" opacity={0.45} />}
        {!tahta && w > 9 && <g stroke={LH.bant} strokeWidth={Math.max(1.2, w * 0.06)} opacity={0.9}>
          <line x1={E[0][0]} y1={E[0][1]} x2={E[2][0]} y2={E[2][1]} /><line x1={E[1][0]} y1={E[1][1]} x2={E[3][0]} y2={E[3][1]} /></g>}
        {/* sandrik: 1. katta üçgen alınlık, 2. katta düz korniş; altında gölge şeridi */}
        {(kat === 1 || kat === 2) && w > 5 && <g>
          <polygon points={W.poli([[u, ht + 0.16, p[0][2] - 0.32], [u, ht + 0.16, p[1][2] + 0.32], [u, ht + 0.3, p[1][2] + 0.32], [u, ht + 0.3, p[0][2] - 0.32]])} fill={karistir(golge, LH.derin, 0.45)} />
          {kat === 1 ? <polygon points={W.poli([[u, ht + 0.3, p[0][2] - 0.36], [u, ht + 0.3, p[1][2] + 0.36], [u, ht + 0.8, zc]])} fill={karistir(lit ? boya : golge, "#ffffff", lit ? 0.3 : 0.16)} />
            : <polygon points={W.poli([[u, ht + 0.3, p[0][2] - 0.34], [u, ht + 0.3, p[1][2] + 0.34], [u, ht + 0.48, p[1][2] + 0.34], [u, ht + 0.48, p[0][2] - 0.34]])} fill={karistir(lit ? boya : golge, "#ffffff", lit ? 0.3 : 0.16)} />}
        </g>}
        {w > 6 && <polygon points={W.poli([[u - b.s * 0.02, hb - 0.2, p[0][2] - 0.2], [u - b.s * 0.02, hb - 0.2, p[1][2] + 0.2], [u - b.s * 0.02, hb - 0.06, p[1][2] + 0.2], [u - b.s * 0.02, hb - 0.06, p[0][2] - 0.2]])} fill={LH.kar} />}
      </g>;
    })}
    {/* yağmur boruları */}
    {[z0 + 0.35, z1 - 0.35].map((z, i) => { const a = W.E([u - b.s * 0.15, H, z]), c = W.E([u - b.s * 0.15, 0.6, z]), m = W.E([u - b.s * 0.45, 0.35, z]), w = Math.max(1.5, 0.2 * W.S([u, 1, z]));
      return <g key={`b${i}`}><polyline points={pS([a, c, m])} stroke={bugu(LH.boruKoyu, zm)} strokeWidth={w * 1.25} fill="none" strokeLinecap="round" /><polyline points={pS([a, c, m])} stroke={bugu(LH.boru, zm)} strokeWidth={w * 0.6} fill="none" strokeLinecap="round" /></g>; })}
    {/* korniş: alt yüz koyu + tarama (B7), üstte kar; ışıklı binada korniş üstünde 3 px sıcak kenar */}
    <path d={kornisAlt} fill={bugu(LH.derin, zm)} />
    {sMid > 14 && <TonTarama d={kornisAlt} isik={[0, -1]} ton={0.95} renk="#1c1a34" seed={SD + Math.round(z0)} mod="isinsal" merkez={vp} gecis={[-1.2, 0.4]} aralik={sMid > 40 ? 4.5 : 5.5} kalinlik={1.8} />}
    <polygon points={W.poli([[u - b.s * 0.6, H - 0.1, z0], [u - b.s * 0.6, H - 0.1, z1], [u - b.s * 0.6, H + 0.25, z1], [u - b.s * 0.6, H + 0.25, z0]])} fill={LH.kar} />
    {b.s < 0 && <polyline points={pS([W.E([u - 0.6, H + 0.25, z0]), W.E([u - 0.6, H + 0.25, z1])])} stroke="#f6d2b0" strokeWidth={3} fill="none" />}
    <polyline points={pS([W.E([u, 0, z0]), W.E([u, H, z0])])} stroke={bugu(LH.derin, zm)} strokeWidth={Math.max(1.5, sMid / 30)} fill="none" />
  </g>;
};

/** zemin karı: ışık şeridi (tek kaynak) üç basamak; iki çiğnenmiş patika; tümsekli yığınlar (gölge yüzünde tarama); kızak izi; ön plan topakları */
// tur-4 yürüyüş izleri: 5 yürüyen, seed'li sapan rota (rastgele yürüyüş), sol/sağ ayak, %15 boşluk, ara ara çiğnenmiş leke
type Iz = { u: number; z: number; aci: number; leke?: number };
export const IZLER: Iz[] = (() => {
  const out: Iz[] = [];
  [[-3.4, 1.4], [-1.6, 2.2], [0.6, 1.6], [2.4, 3.0], [-4.8, 6.0]].forEach(([u0, z0], k) => {
    let u = u0, du = (rnd(SD + 70, `d${k}`) - 0.5) * 0.06, z = z0;
    for (let i = 0; z < 140; i++) {
      du += (rnd(SD + 70, `v${k}${i}`) - 0.5) * 0.05; du = Math.max(-0.12, Math.min(0.12, du)); u += du * 0.8;
      if (u < -6.5 || u > 6.5) du = -du;
      const adim = 0.62 + rnd(SD + 70, `a${k}${i}`) * 0.22; z += adim;
      if (rnd(SD + 70, `b${k}${i}`) < 0.15) continue; // dolmuş iz
      out.push({ u: u + (i % 2 ? 0.16 : -0.16), z, aci: du * 3, leke: rnd(SD + 70, `l${k}${i}`) < 0.07 ? 0.4 + rnd(SD + 70, `s${k}${i}`) * 0.7 : undefined });
    }
  });
  return out;
})();
const Zemin: React.FC<{ W: Dunya; vp: P2 }> = ({ W, vp }) => {
  const zz = (a: number, b: number, k = 1.08) => { const o: number[] = []; for (let z = a; z <= b; z *= k) o.push(z); o.push(b); return o; };
  const serit = (pay: number): V3[] => [[11, 0.32, BOSLUK[0] + pay], [11, 0.32, BOSLUK[1] - pay], [-11, 0.32, BOSLUK[1] - pay - K_ISIK * 22], [-11, 0.32, BOSLUK[0] + pay - K_ISIK * 22]];
  const yol = [[-11, 0.3, 1], [11, 0.3, 1], [11, 0.3, 330], [-11, 0.3, 330]] as V3[];
  const tumsek = (s: number, z: number) => [3, 8, 14, 22, 33, 50, 80, 130].reduce((m, c, i) => m + (0.3 + 0.25 * rnd(1205, `${s}${i}`)) * Math.exp(-(((z - c - rnd(1205, `z${s}${i}`) * 3) / (1.2 + c * 0.12)) ** 2)), 0);
  const yiginUst = (s: number): V3[] => zz(1.5, 320, 1.05).map((z) => [s * (8.6 - 0.25 * tumsek(s, z)), 0.85 + 0.5 * tumsek(s, z), z] as V3);
  const yiginYuz = (s: number): V3[] => { const U = yiginUst(s); return [...U, ...U.slice().reverse().map((p) => [s * 7.7, 0.3, p[2]] as V3)]; };
  const yiginArka = (s: number): V3[] => { const U = yiginUst(s); return [...U, [s * 11, 0.3, 320], [s * 11, 0.3, 1.5]]; };
  const topak = Array.from({ length: 46 }, (_, i) => ({ u: -6 + rnd(1207, `u${i}`) * 9, z: 1.25 + rnd(1207, `z${i}`) ** 1.6 * 4.5, r: 0.03 + rnd(1207, `r${i}`) * 0.07 }));
  return <g>
    <polygon points={W.poli(yol)} fill="#8a8cbc" />
    <Kirp d={W.poliD(yol)}>
      {/* yol karı: gölgede seyrek perspektif tarama (ışık şeridinde yok) */}
      <TonTarama d={W.poliD(yol)} isik={[0, 1]} ton={1} renk="#55579a" seed={SD + 61} mod="isinsal" merkez={vp}
        tonFn={(q) => 0.12 + 0.3 * ss(1200, 1900, q[1])} aralik={7.5} kalinlik={1.7} alfa={0.3} />
      <polygon points={W.poli(serit(0))} fill={LH.serit[2]} />
      <polygon points={W.poli(serit(1.2))} fill={LH.serit[1]} />
      <polygon points={W.poli(serit(3.2))} fill={LH.serit[0]} />
      {/* çiğnenmiş lekeler (düzensiz çokgen) + yürüyüş izleri (sol/sağ, sapan rota, boşluklu) — ray gibi sürekli bant yok */}
      {IZLER.filter((t) => t.leke).map((t, i) => { const c = W.E([t.u, 0.3, t.z]), sc = W.S([t.u, 0.3, t.z]), R = (t.leke ?? 0.5) * sc; if (!(R > 2)) return null;
        const q: P2[] = Array.from({ length: 8 }, (_, k) => { const a = (k / 8) * Math.PI * 2, rr = R * (0.6 + rnd(SD + 72, `${i}${k}`) * 0.6); return [c[0] + Math.cos(a) * rr, c[1] + Math.sin(a) * rr * 0.22] as P2; });
        return <path key={`l${i}`} d={cr(q)} fill="#8e90c4" style={{ mixBlendMode: "multiply" }} opacity={0.55} />; })}
      {IZLER.map((t, i) => { const c = W.E([t.u, 0.3, t.z]), sc = W.S([t.u, 0.3, t.z]); const rx = 0.085 * sc, ry = Math.max(0.8, rx * 0.26); if (!(rx > 0.7)) return null;
        return <g key={i}>
          <ellipse cx={c[0]} cy={c[1]} rx={rx} ry={ry} fill="#5a5c98" style={{ mixBlendMode: "multiply" }} opacity={0.75} transform={`rotate(${t.aci * 20} ${c[0]} ${c[1]})`} />
          {rx > 4 && <ellipse cx={c[0] - rx * 0.15} cy={c[1] - ry * 0.55} rx={rx * 0.9} ry={ry * 0.35} fill="#f4eef8" opacity={0.6} />}
        </g>; })}
      {/* kızak izi: kızaktan geriye iki paralel çizgi */}
      {[-0.22, 0.22].map((du, i) => <polyline key={i} points={pS(zz(9.9, 90, 1.04).map((z) => W.E([1.2 + du + 0.5 * Math.sin((z - 9.9) * 0.04), 0.31, z])))} stroke="#7a7cb0" strokeWidth={1.8} fill="none" opacity={0.7} style={{ mixBlendMode: "multiply" }} />)}
    </Kirp>
    {/* yan yığınlar: tümsekli sırt, sokağa bakan yüz gölgede + tarama (yakına doğru sıklaşır) */}
    {[-1, 1].map((s) => <g key={s}>
      <polygon points={W.poli(yiginArka(s))} fill={LH.kar} />
      <polygon points={W.poli(yiginYuz(s))} fill="#7c7eb0" />
      <polygon points={W.poli(yiginUst(s).map((p) => [s * 7.7, 0.31, p[2]] as V3).concat(yiginUst(s).slice().reverse().map((p) => [s * 7.1, 0.31, p[2]] as V3)))} fill="#5a5c96" opacity={0.85} />
      <TonTarama d={W.poliD(yiginYuz(s))} isik={[0, 1]} ton={1} renk="#44468a" seed={1206 + s} mod="isinsal" merkez={vp} tonFn={(q) => 0.3 + 0.4 * ss(900, 1600, q[1])} aralik={6} kalinlik={1.8} alfa={0.45} />
      <polyline points={pS(yiginUst(s).map(W.E))} stroke={LH.karKenar} strokeWidth={2.6} fill="none" />
      <MurekkepCizgi q={yiginUst(s).map(W.E).filter((p) => p[1] < 1990 && p[0] > -40 && p[0] < 1120)} renk="#3a3c78" kalinlik={3} ucBas={80} ucSon={20} seed={1210 + s} alfa={0.8} />
    </g>)}
    {/* ön plan: kaba kar topakları (ışığa bakan üst yüz açık, alt yarı gölge) */}
    {topak.map((t, i) => { const c = W.E([t.u, 0.3, t.z]), s = W.S([t.u, 0.3, t.z]), r = t.r * s * 0.7; if (!(r > 1.5) || c[1] > 1960) return null;
      const zp = t.z + K_ISIK * (11 - t.u), lit = zp >= BOSLUK[0] && zp <= BOSLUK[1];
      const q: P2[] = Array.from({ length: 7 }, (_, k) => { const a = (k / 7) * Math.PI * 2, rr = r * (0.7 + rnd(1208, `${i}${k}`) * 0.5); return [c[0] + Math.cos(a) * rr * 1.3, c[1] + Math.sin(a) * rr * 0.5] as P2; });
      return <g key={i}><path d={`M${pS(q).split(" ").join(" L")}Z`} fill={lit ? "#d8a49a" : "#7c7eb4"} transform={`translate(${r * 0.3} ${r * 0.25})`} opacity={0.8} /><path d={`M${pS(q).split(" ").join(" L")}Z`} fill={lit ? "#f8e2d4" : "#dcdaea"} /></g>; })}
  </g>;
};

const Kizak: React.FC<{ W: Dunya }> = ({ W }) => {
  const u = 1.2, z = 9.5, h = 0.3, P = (du: number, dh: number, dz: number) => W.E([u + du, h + dh, z + dz]), s = W.S([u, h, z]), kw = Math.max(2, 0.035 * s);
  return <g strokeLinejoin="round" strokeLinecap="round">
    <polygon points={pS([P(-0.36, 0, -0.6), P(0.4, 0, -0.6), P(0.4, 0, 0.6), P(-0.36, 0, 0.6)])} fill={LH.karDerin} opacity={0.5} />
    {[-0.22, 0.22].map((du, i) => <g key={i}><path d={`M${pS([P(du, 0, 0.5)])} L${pS([P(du, 0, -0.42)])} Q${pS([P(du, 0, -0.62)])} ${pS([P(du, 0.17, -0.56)])}`} stroke={LH.tahtaG} strokeWidth={kw} fill="none" />
      {[-0.28, 0.32].map((dz, j) => <line key={j} x1={P(du, 0, dz)[0]} y1={P(du, 0, dz)[1]} x2={P(du, 0.17, dz)[0]} y2={P(du, 0.17, dz)[1]} stroke={LH.tahtaG} strokeWidth={kw * 0.8} />)}</g>)}
    <polygon points={pS([P(-0.26, 0.17, -0.45), P(0.26, 0.17, -0.45), P(0.26, 0.17, 0.48), P(-0.26, 0.17, 0.48)])} fill={LH.tahta} stroke={LH.tahtaG} strokeWidth={1.8} />
    {(() => { const c = P(0, 0.17, 0.05), r = 0.15 * s, hh = 0.3 * s; return <g>
      <path d={`M${c[0] - r},${c[1]} L${c[0] - r * 0.86},${c[1] - hh} L${c[0] + r * 0.86},${c[1] - hh} L${c[0] + r},${c[1]}Z`} fill={LH.tahta} stroke={LH.tahtaG} strokeWidth={1.8} />
      {[0.18, 0.8].map((t, i) => <line key={i} x1={c[0] - r * (1 - 0.14 * t)} y1={c[1] - hh * t} x2={c[0] + r * (1 - 0.14 * t)} y2={c[1] - hh * t} stroke={LH.tahtaG} strokeWidth={Math.max(1.5, r * 0.14)} />)}
      <ellipse cx={c[0]} cy={c[1] - hh} rx={r * 0.86} ry={r * 0.28} fill={LH.tahtaG} />
      <path d={`M${c[0] - r * 0.86},${c[1] - hh} Q${c[0]},${c[1] - hh - r * 1.3} ${c[0] + r * 0.86},${c[1] - hh}`} stroke={LH.tahtaG} strokeWidth={1.8} fill="none" />
    </g>; })()}
  </g>;
};

// ---------------- müzisyen (tur-4) ----------------
const MUZISYEN: YuzKart = { ad: "müzisyen", yas: 42, uzun: 1.06, cene: 0.55, burun: 1.08, dudak: 0.85, elmacik: 0.85, boyun: 1.0, kas: 1.1, kasAci: 3, goz: 0.8, biyik: "yok", sakal: 0.35, yara: false, toz: 0, ter: false, kirisik: 0.45, ten: "#c49c86", tenGolge: "#7a5c6a", sac: "#2a2228", baslik: "yok", kulak: 1 };
const PALTO = LH.palto, PALTO_G = "#1c1a2c", PALTO_I = "#5e4a58", SICAK = "#f2c6a8";
/** güneş: önde-sağda, alçak → ekranda ışığın gittiği yön (kameraya, sola-aşağı) */
const ISIK: P2 = [-0.62, 0.42];
const J: P2 = [276, 1290]; // sağ omuz başlığı (sırt silüetinin üst-sağ ucu, başın sağ-altında)
// OTS: sağ kol UZAK koldur → üst kol sırtın arkasında; görünen yalnız önkol (dirsek sırt kenarının içinde)
const DIRSEK: P2 = [438, 1878], BILEK: P2 = [648, 1478];
const SIRT = "M-80,1176 Q40,1166 140,1192 L214,1218 Q262,1214 300,1262 Q336,1330 352,1420 Q388,1580 420,1720 Q448,1840 474,1960 L-80,1960Z";
const SIL = [SIRT, daire(J, 54)];
const ISIK_BOLGE = "M430,1040 L1080,1040 L1080,1720 L430,1720Z"; // ışık şeridinin müzisyene düştüğü ekran bölgesi (eller, önkol, ekmek)
const bant = (a: P2, b: P2, c: P2, w: number) => {
  const n = (p: P2, q: P2): P2 => { const dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy) || 1; return [-dy / l, dx / l]; };
  const n1 = n(a, b), n2 = n(b, c), nb: P2 = [(n1[0] + n2[0]) / 2, (n1[1] + n2[1]) / 2], h = w / 2;
  const o = (p: P2, v: P2, k: number): P2 => [p[0] + v[0] * k, p[1] + v[1] * k];
  return `M${pS([o(a, n1, h), o(b, nb, h), o(c, n2, h), o(c, n2, -h), o(b, nb, -h), o(a, n1, -h)]).split(" ").join(" L")}Z`;
};
// ekmek: elin parmaklarının ÜSTÜNDE durur; alt yarısı parmaklarla sarılı (el ekmekten SONRA çizilir)
const EL_ACI = -58, EL_E = 196;
const EKMEK_M: P2 = [742, 1300], EKMEK_A = -12;
const ekmekYol = () => {
  const r = (EKMEK_A * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r), M = (x: number, y: number): P2 => [EKMEK_M[0] + x * c - y * s, EKMEK_M[1] + x * s + y * c];
  return { d: `M${pS([M(-84, 78), M(-84, -54)]).split(" ").join(" L")} Q${pS([M(-84, -80)])} ${pS([M(-56, -80)])} L${pS([M(56, -80)])} Q${pS([M(84, -80)])} ${pS([M(84, -54)])} L${pS([M(84, 64)])} Q${pS([M(84, 78)])} ${pS([M(70, 78)])} L${pS([M(-70, 78)])} Q${pS([M(-84, 78)])} ${pS([M(-84, 64)])}Z`, M };
};
/** profil başın ekran koordinatında dış konturu (LgBasProfil dönüşümüyle aynı: translate · rotate · scale) */
const profilEkranD = (x: number, y: number, H: number, egim: number) => {
  const g = lgProfilGeo(MUZISYEN), r = (egim * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r);
  return crP([...g.on, ...g.cene, ...g.arka].map((q) => [x + H * (q[0] * c - q[1] * s), y + H * (q[0] * s + q[1] * c)] as P2), true, 1);
};

const Muzisyen: React.FC<{ kilit?: SablonProps["kilit"] }> = ({ kilit }) => {
  const ek = ekmekYol();
  if (kilit) { kilit.push({ ad: "yuz", p: [150, 960], tur: "yuz" }); kilit.push({ ad: "ekmek", p: [EKMEK_M[0], EKMEK_M[1]], tur: "kurulum" }); kilit.push({ ad: "avuc", p: [540, 1420], tur: "dokunus" }); }
  const sol: P2 = [462, 1462], solAci = -30, solE = 196;
  const avucMerk: P2 = [sol[0] + Math.cos((solAci * Math.PI) / 180) * 0.3 * solE, sol[1] + Math.sin((solAci * Math.PI) / 180) * 0.3 * solE];
  const kirinti = Array.from({ length: 11 }, (_, i) => {
    const dus = i >= 9, a = rnd(1209, `a${i}`) * Math.PI * 2, d = rnd(1209, `d${i}`) * 34;
    const c: P2 = dus ? [498 + (i - 9) * 10, 1500 + (i - 9) * 30] : [avucMerk[0] + Math.cos(a) * d * 1.2, avucMerk[1] + Math.sin(a) * d * 0.6];
    const r = 2 + rnd(1209, `r${i}`) * 4;
    return { c, q: Array.from({ length: 5 }, (_, k) => { const t = (k / 5) * Math.PI * 2 + rnd(1209, `t${i}${k}`); const rr = r * (0.6 + rnd(1209, `q${i}${k}`) * 0.5); return [c[0] + Math.cos(t) * rr, c[1] + Math.sin(t) * rr * 0.8] as P2; }) };
  });
  const kayis = bant([104, 1186], [132, 1236], [-70, 1700], 46);
  const onkolR = kapsul(DIRSEK, BILEK, 62, 44);
  const KA = { isik: ISIK, kalinlik: [1.4, 4.8] as [number, number], kayip: 0.25 };
  const elOrt: P2 = [BILEK[0] + Math.cos((EL_ACI * Math.PI) / 180) * 0.32 * EL_E, BILEK[1] + Math.sin((EL_ACI * Math.PI) / 180) * 0.32 * EL_E];
  return <g strokeLinejoin="round" strokeLinecap="round">
    {/* (1) sağ önkol (uzak kol; dirseği sırtın arkasında) + ekmek + ekmeği tutan el */}
    <path d={onkolR} fill={PALTO} />
    <TonTarama d={onkolR} isik={ISIK} ton={1} renk="#0c0b16" seed={SD + 11} mod="egri" eksen={[DIRSEK, BILEK]} tonFn={(q) => 0.5 + 0.35 * ss(-20, 30, q[0] - (DIRSEK[0] + (BILEK[0] - DIRSEK[0]) * (q[1] - DIRSEK[1]) / (BILEK[1] - DIRSEK[1])))} aralik={5} kalinlik={2.1} />
    <Kirp d={ISIK_BOLGE}><Hilal d={onkolR} renk={PALTO_I} dx={-7} dy={4} /><Hilal d={onkolR} renk={SICAK} dx={-3} dy={2} alfa={0.75} /></Kirp>
    <MurekkepKontur d={onkolR} renk={LH.koyu} {...KA} seed={SD + 12} />
    {/* manşet */}
    <path d={cr([[BILEK[0] - 46, BILEK[1] + 22], [BILEK[0] - 8, BILEK[1] - 34], [BILEK[0] + 30, BILEK[1] - 12], [BILEK[0] - 4, BILEK[1] + 44]])} fill="#2e2a40" />
    <MurekkepKontur d={cr([[BILEK[0] - 46, BILEK[1] + 22], [BILEK[0] - 8, BILEK[1] - 34], [BILEK[0] + 30, BILEK[1] - 12], [BILEK[0] - 4, BILEK[1] + 44]])} renk={LH.koyu} {...KA} seed={SD + 13} />
    {/* başparmak tarafı ekmeğin ARKASINDA kalır (önce el, sonra ekmek, sonra parmaklar önden) */}
    <IncEl bilek={[BILEK[0] + 2, BILEK[1] - 4]} aci={EL_ACI} E={EL_E} poz={INC_POZ.tutus} ten="#dcae92" golge="#a87c78" kontur="#4a3438" kenar={SICAK} isik={[0.6, -0.8]} murekkep={{ ton: 0.6, seed: SD + 14 }} />
    {/* ekmek: kare kalıp dilimi, ince koyu kabuk, sıkı nemli iç; ışık tarafında kesik yüz bir basamak açık */}
    <path d={ek.d} fill="#3a2a20" />
    <path d={ek.d} fill="#4e3a2c" transform={`translate(${EKMEK_M[0]} ${EKMEK_M[1]}) scale(0.92) translate(${-EKMEK_M[0]} ${-EKMEK_M[1]})`} />
    <Kirp d={ek.d}><path d={`M${pS([ek.M(10, -100), ek.M(110, -100), ek.M(110, 100), ek.M(30, 100)]).split(" ").join(" L")}Z`} fill="#5e4636" opacity={0.85} transform={`translate(${EKMEK_M[0]} ${EKMEK_M[1]}) scale(0.92) translate(${-EKMEK_M[0]} ${-EKMEK_M[1]})`} />
      {Array.from({ length: 34 }, (_, i) => { const p = ek.M(-76 + rnd(126, `x${i}`) * 152, -72 + rnd(126, `y${i}`) * 144); return <ellipse key={i} cx={p[0]} cy={p[1]} rx={1.4 + rnd(126, `r${i}`) * 2.2} ry={1 + rnd(126, `s${i}`) * 1.6} fill="#2e2018" opacity={0.8} />; })}
      <TonTarama d={ek.d} isik={ISIK} ton={0.9} renk="#1e140e" seed={SD + 15} aci={EKMEK_A + 90} gecis={[-0.3, 0.9]} aralik={4.6} kalinlik={1.8} alfa={0.7} /></Kirp>
    <Hilal d={ek.d} renk="#9a7458" dx={-3} dy={3} />
    <MurekkepKontur d={ek.d} renk="#1a100c" isik={ISIK} kalinlik={[1.6, 4.2]} seed={SD + 16} />
    {/* dört parmak ekmeğin alt yarısını önden sarar: parmaklar (başparmak hariç) yeniden, ekmeğin önünde; altlarında ekmeğe temas gölgesi */}
    <Kirp d={ek.d}><g transform="translate(5 6)" opacity={0.55}><IncEl bilek={[BILEK[0] + 2, BILEK[1] - 4]} aci={EL_ACI} E={EL_E} poz={INC_POZ.tutus} ten="" golge="" kontur="" isik={[0.6, -0.8]} golgeRenk="#140c08" /></g></Kirp>
    <Kirp d={`M${elOrt[0] - 6},${elOrt[1] - 200} L${elOrt[0] + 240},${elOrt[1] - 120} L${elOrt[0] + 240},${elOrt[1] + 200} L${elOrt[0] - 6},${elOrt[1] + 200}Z`}>
      <IncEl bilek={[BILEK[0] + 2, BILEK[1] - 4]} aci={EL_ACI} E={EL_E} poz={INC_POZ.tutus} ten="#dcae92" golge="#a87c78" kontur="#4a3438" kenar={SICAK} isik={[0.6, -0.8]} murekkep={{ ton: 0.6, seed: SD + 14 }} />
    </Kirp>
    {/* (2) sol önkol + avuç: sırtın kenarından çıkar, avuç yukarı, hafif çanak (yakın kol, ekmek elinin önünde) */}
    <path d={kapsul([300, 1566], sol, 46, 38)} fill={PALTO} />
    <TonTarama d={kapsul([300, 1566], sol, 46, 38)} isik={ISIK} ton={0.85} renk="#0c0b16" seed={SD + 17} mod="egri" eksen={[[300, 1566], sol]} tonFn={() => 0.8} aralik={5} kalinlik={2} />
    <MurekkepKontur d={kapsul([300, 1566], sol, 46, 38)} renk={LH.koyu} {...KA} seed={SD + 18} />
    <path d={cr([[sol[0] - 30, sol[1] - 28], [sol[0] + 6, sol[1] - 30], [sol[0] + 22, sol[1] + 22], [sol[0] - 14, sol[1] + 34]])} fill="#2e2a40" />
    <IncEl bilek={[sol[0] + 4, sol[1] - 2]} aci={solAci} E={solE} poz={INC_POZ.avuc} ten="#dcae92" golge="#a87c78" kontur="#4a3438" kenar={SICAK} isik={[0.6, -0.8]} sira="sercOnde" murekkep={{ ton: 0.55, seed: SD + 19 }} />
    {kirinti.map((k, i) => <g key={i}><path d={`M${pS(k.q).split(" ").join(" L")}Z`} fill={LH.ekmek} stroke="#2e231e" strokeWidth={0.8} />
      <path d={`M${pS(k.q.slice(0, 3)).split(" ").join(" L")}`} stroke="#b08a6a" strokeWidth={1} fill="none" /></g>)}
    {/* (3) sırt + omuz başlığı: tek siluet; palto ton taraması sırtın eğrisini izler (ışık önden-sağdan: sırt gölgede) */}
    <BirlesikM d={SIL} dolgu={PALTO} kontur={LH.koyu} ayar={{ ...KA, seed: SD + 20 }} />
    <KirpB d={SIL}>
      <TonTarama d={SIL} isik={ISIK} ton={1} renk="#0a0914" seed={SD + 5} mod="egri" eksen={[[60, 1200], [230, 1400], [330, 1700], [400, 1960]]} kayma={[1, -0.15]} tonFn={(q) => 0.55 + 0.35 * ss(300, -60, q[0])} aralik={4.6} kalinlik={1.9} alfa={0.6} />
      <path d={serit([[300, 1420], [370, 1580], [420, 1740]], 40)} fill={PALTO_G} opacity={0.8} />
      {/* kıvrımlar: kürek kemiği çekmesi (3), kayışın çektiği (2), omuz altı (1) */}
      {[[[150, 1236], [196, 1290], [230, 1338]], [[132, 1290], [176, 1350], [206, 1402]], [[240, 1300], [276, 1380], [300, 1450]], [[60, 1420], [110, 1520], [130, 1620]], [[200, 1500], [250, 1620], [270, 1740]]].map((q, i) => <g key={`c${i}`}>
        <Kivrim q={q as P2[]} w={11 - (i > 2 ? 2 : 0)} oluk={PALTO_G} sirt="#3c3650" kay={[3, -3]} />
        <MurekkepCizgi q={q as P2[]} egri renk="#08070e" kalinlik={3} seed={SD + 30 + i} /></g>)}
      <path d={`M${J[0] - 40},${J[1] - 62} Q${J[0] - 66},${J[1] + 10} ${J[0] - 34},${J[1] + 70}`} stroke={PALTO_G} strokeWidth={2.6} fill="none" />
    </KirpB>
    {/* ışığa bakan kenarlar: sıcak 3–4 px (yalnız ışık bölgesinde) + soğuk gök yansıması üst kenarda */}
    <Kirp d={ISIK_BOLGE}><HilalB d={SIL} renk={PALTO_I} dx={-6} dy={6} /><HilalB d={SIL} renk={SICAK} dx={-3} dy={3} alfa={0.8} /></Kirp>
    <HilalB d={SIL} renk="#3e3a56" dx={4} dy={5} alfa={0.9} />
    {/* kayış */}
    <path d={kayis} fill="#141018" opacity={0.5} transform="translate(5 4)" />
    <path d={kayis} fill={LH.kayis} />
    <TonTarama d={kayis} isik={ISIK} ton={0.7} renk="#140c0c" seed={SD + 21} mod="egri" eksen={[[132, 1236], [-70, 1700]]} gecis={[-1, 0.8]} aralik={4.5} kalinlik={1.6} />
    <MurekkepKontur d={kayis} renk="#140c0c" isik={ISIK} kalinlik={[1.2, 3.4]} seed={SD + 22} />
    <path d={serit([[110, 1200], [128, 1240], [40, 1450]], 6, "tek")} fill="#5a4440" />
    <g transform="rotate(23 36 1540)"><rect x={6} y={1508} width={60} height={66} rx={7} fill="none" stroke="#7a6a5a" strokeWidth={6} /><path d="M10,1514 L62,1514" stroke="#d8c0a0" strokeWidth={2} /><line x1={36} y1={1508} x2={36} y2={1574} stroke="#6a5a4a" strokeWidth={4} /></g>
    {/* (4) yaka (arka), profil baş (dış kontur mürekkeple; ense/arka kafa gölgesinde ince ton taraması), kalkık yuvarlak yaka (ön) */}
    <path d={cr([[-90, 1120], [-20, 1082], [40, 1086], [92, 1120], [120, 1170], [60, 1196], [-90, 1210]])} fill="#2c283e" />
    <MurekkepKontur d={cr([[-90, 1120], [-20, 1082], [40, 1086], [92, 1120], [120, 1170], [60, 1196], [-90, 1210]])} renk={LH.koyu} isik={ISIK} kalinlik={[1.2, 3.4]} seed={SD + 23} />
    <LgBasProfil kart={MUZISYEN} x={40} y={1000} H={330} egim={9} sicak="#eab49a" kenar="#f2cdb4" bakisY={1} konturAlfa={0} />
    {(() => { const d = profilEkranD(40, 1000, 330, 9); return <g>
      <TonTarama d={d} isik={ISIK} ton={0.85} renk="#3e2a34" seed={SD + 24} mod="egri" eksen={[[-40, 900], [10, 1010], [70, 1130]]} gecis={[0.1, 0.95]} aralik={3.8} kalinlik={1.5} alfa={0.6} yumusak={0.3} />
      <MurekkepKontur d={d} renk="#3a2a2e" isik={ISIK} kalinlik={[1.0, 4.4]} kayip={0.5} seed={SD + 25} />
    </g>; })()}
    <path d={cr([[-90, 1196], [-10, 1176], [70, 1170], [140, 1186], [176, 1214], [164, 1248], [90, 1250], [-90, 1262]])} fill="#2e2a42" />
    <TonTarama d={cr([[-90, 1196], [-10, 1176], [70, 1170], [140, 1186], [176, 1214], [164, 1248], [90, 1250], [-90, 1262]])} isik={ISIK} ton={0.7} renk="#0c0b16" seed={SD + 26} aci={4} gecis={[-0.8, 0.6]} aralik={4.6} kalinlik={1.8} />
    <MurekkepKontur d={cr([[-90, 1196], [-10, 1176], [70, 1170], [140, 1186], [176, 1214], [164, 1248], [90, 1250], [-90, 1262]])} renk={LH.koyu} {...KA} seed={SD + 27} />
    <path d={serit([[-60, 1190], [40, 1178], [130, 1192], [168, 1218]], 12)} fill="#46405a" />
  </g>;
};

export const SOKAK_T4_KAMERA: Kamera25 = { kare: [0, 180], konum_yol: [[6.2, 1.65, 0], [6.2, 1.65, 0.1]], yon_yol: [[-16, -3.5], [-16, -3.5]], lens_mm: [35], egri: "inout", ekipman: "steadicam" };
export const SokakP03aT4: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const K = kamera25(param<Partial<Kamera25> | undefined>(plan, "kamera", undefined), p, SOKAK_T4_KAMERA);
  const W = dunya(K);
  const ufuk = W.E([6.2 - 1000 * Math.sin(0.28), 1.65, 1000])[1];
  const vp = W.E([0, 1.65, 3000]);
  const uzak = BINA.filter((b) => b.z0 > 80), yakin = BINA.filter((b) => b.z0 <= 80);
  const sira = (a: Bina, b: Bina) => b.z1 - a.z1;
  const ys = LH.gok.map((_, i) => (i === 0 ? -20 : ufuk - 760 + i * 105));
  return (
    <LgBaski>
      {/* gök: yedi düz basamak, her biri bir sonrakinin altına 4 px biner (tur-2'deki 5 px koyu boşluk yok) */}
      {LH.gok.map((c, i) => <rect key={i} x={-20} y={ys[i]} width={1120} height={(i < 6 ? ys[i + 1] : ufuk + 400) - ys[i] + 4} fill={c} />)}
      {/* kaçış noktasında ışıma: üç eş merkezli disk (A3) */}
      {[[300, 0.22], [190, 0.3], [105, 0.45]].map(([r, a], i) => <circle key={i} cx={vp[0] + 60} cy={ufuk - 30} r={r} fill="#f8e0c6" opacity={a} />)}
      {/* uzak duman (baca), rüzgârla sola yatık */}
      {[[-8, 150, 21], [-9, 95, 20], [9, 170, 19], [-9, 60, 21]].map(([u, z, h], i) => { const a = W.E([u, h, z]); const pts: P2[] = Array.from({ length: 8 }, (_, k) => [a[0] - k * 10 - k * k * 1.2 + Math.sin(k * 1.3 + i) * 7, a[1] - k * 24] as P2); return <path key={i} d={cr(pts, false)} stroke={LH.duman} strokeWidth={5 + i * 1.5} fill="none" opacity={0.72} />; })}
      <polygon points={W.poli([[-11, 0, 330], [11, 0, 330], [11, 18, 330], [-11, 18, 330]])} fill={bugu("#a89cb8", 330)} />
      {uzak.sort(sira).map((b, i) => <Cephe key={`u${i}`} W={W} b={b} vp={vp} />)}
      {/* ufukta üç buğu bandı (A5) — uzak cepheler buğuya karışır, yakınlar öne çıkar */}
      {[[-70, 90, 0.28], [-30, 50, 0.22], [-8, 22, 0.3]].map(([dy, h, a], i) => <rect key={i} x={-20} y={ufuk + dy} width={1120} height={h} fill={BUGU} opacity={a} />)}
      <polygon points={W.poli([[11, 0, BOSLUK[1]], [40, 0, BOSLUK[1]], [40, 19, BOSLUK[1]], [11, 19, BOSLUK[1]]])} fill={CEPHE[1]} />
      {yakin.sort(sira).map((b, i) => <Cephe key={`y${i}`} W={W} b={b} vp={vp} />)}
      <Zemin W={W} vp={vp} />
      {/* uzakta tek küçük figür (ekran yüksekliğinin < %5'i: siluet) */}
      {(() => { const a = W.E([-0.8, 0.3, 70]), s = W.S([-0.8, 0.3, 70]), h = 1.7 * s; return <g><ellipse cx={a[0]} cy={a[1]} rx={0.4 * s} ry={0.06 * s} fill={LH.karDerin} />
        <path d={`M${a[0] - 0.22 * s},${a[1]} L${a[0] - 0.24 * s},${a[1] - h * 0.62} Q${a[0]},${a[1] - h * 0.8} ${a[0] + 0.24 * s},${a[1] - h * 0.62} L${a[0] + 0.2 * s},${a[1]}Z`} fill="#3a3456" />
        <circle cx={a[0]} cy={a[1] - h * 0.88} r={0.12 * s} fill="#3a3456" /></g>; })()}
      <Kizak W={W} />
      {Array.from({ length: 50 }, (_, i) => { const z = 2 + rnd(1203, `z${i}`) * 30, u = -8 + rnd(1203, `u${i}`) * 18, h = ((rnd(1203, `h${i}`) * 9 - (p / 60) * 0.35) % 9 + 9) % 9; const q = W.E([u, h, z]); return q[0] > -5 && q[0] < 1085 ? <circle key={i} cx={q[0]} cy={q[1]} r={Math.max(1.5, Math.min(4, 0.03 * W.S([u, h, z])))} fill="#ece4ea" opacity={0.85} /> : null; })}
      <Muzisyen kilit={kilit} />
    </LgBaski>
  );
};
