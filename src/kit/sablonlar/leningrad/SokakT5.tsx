// ===== SOKAK-LG `p03a` tur-5 — yeni kit araçlarıyla (src/kit/isik + src/kit/figur/Sirt + src/kit/cizim) =====
// Tur-4 (SokakT4.tsx) DEĞİŞMEDİ (yalnız mekân parçaları `export` edildi: Cephe, BINA, IZLER, bugu …). Bu dosya hedef-sokak kompozisyonunu kurar.
// Tek ışık (CLAUDE "Işığın yolu"): alçak kış güneşi önde-sağda (yükseklik 6°, yatay yön (0.6, 0.8) — T4 ile aynı vektör; kadrajın sağ
//   dışında). 20 m'lik binalar sokağı gölgede bırakır; güneş yalnız sağ cephedeki boşluktan (çapraz sokak, z 6–11) girer.
//   Şerit ELLE KONMAZ: üstten görünüş (u, z) düzleminde `gorunurlukCokgeni` (kaynak = güneş yönünde 1500 m uzak nokta, engeller = bina
//   tabanları + figür + kızak) → sokak dikdörtgeniyle kırpılır → zemine (y 0.3) izdüşürülür. Üç basamak (yarı gölge) = aynı hesap,
//   boşluk kenarları 0.9 / 2.0 m daraltılmış engellerle (güneş diski açısal genişliği → kenarda yumuşama).
// Kamera: tur-4'ten 4 m geride (z −4) → kamera ışık levhasının ARKASINDA, şerit kadrajın ortasından sol-alta çaprazlama geçer,
//   önde kar gölgede kalır (hedefteki gibi; tur-4'te kamera şeridin içindeydi → alt yarı tümüyle pembe, sıcak %35).
// Figür: Eliasberg omuz üstünden arkadan ¾ (kit/figur/Sirt — sırt, omuz başlığı, kalkık yaka, kayıp profil Kafa), iki el IncEl;
//   figür levhanın dışında (gölgede) → elleri doğrudan güneş görmez; aydınlık şeritten sekme (sıcak, zayıf) + gök (soğuk) ile.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ArsivKatmani } from "../../../doku/ArsivKatmani";
import { GuvenliAlan, KilitNokta } from "../../../doku/GuvenliAlan";
import { rnd } from "../../../doku/sabitler";
import type { Plan } from "../../tipler";
import { MurekkepCizgi, MurekkepKontur } from "../../cizim/MurekkepCizgi";
import { TonTarama } from "../../cizim/TonTarama";
import { FigurPalet } from "../../figur/Govde";
import { SirtFigur, SirtPoz } from "../../figur/Sirt";
import { gorunurlukCokgeni } from "../../isik/gorunurluk";
import { kamera25, Kamera25, V3 } from "../../kamera25d";
import { param, SablonProps } from "../../ortak";
import { HilalB, IncEl, incElGeo, INC_POZ } from "./lgFigur";
import { cr, dunya, Dunya, Kirp, LgBaski, P2, pS } from "./lgOrtak";
import { LH } from "./SokakHedef";
import { BINA, Bina, BOSLUK, bugu, BUGU, Cephe, CEPHE, IZLER, K_ISIK, SD } from "./SokakT4";

const ss = (a: number, b: number, x: number) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const GUNES: P2 = [0.6, 0.8]; // yatay: güneşe doğru (u, z)
const KAM_Z = -4;

// ---------------- üstten görünüş: ışık levhası (görünürlük çokgeni) ----------------
const KIZAK = { u: 0.2, z: 14 };
const FIGUR_TABAN: P2 = [5.75, KAM_Z + 0.55];
/** Sutherland–Hodgman: çokgeni eksen hizalı dikdörtgene kırp */
const kirpDik = (q: P2[], [u0, z0, u1, z1]: [number, number, number, number]) => {
  const kenar = (q: P2[], ic: (p: P2) => boolean, kes: (a: P2, b: P2) => P2) => {
    const o: P2[] = [];
    q.forEach((b, i) => { const a = q[(i + q.length - 1) % q.length]; if (ic(b)) { if (!ic(a)) o.push(kes(a, b)); o.push(b); } else if (ic(a)) o.push(kes(a, b)); });
    return o;
  };
  const ku = (u: number) => (a: P2, b: P2): P2 => { const t = (u - a[0]) / (b[0] - a[0]); return [u, a[1] + (b[1] - a[1]) * t]; };
  const kz = (z: number) => (a: P2, b: P2): P2 => { const t = (z - a[1]) / (b[1] - a[1]); return [a[0] + (b[0] - a[0]) * t, z]; };
  let r = kenar(q, (p) => p[0] >= u0, ku(u0)); r = kenar(r, (p) => p[0] <= u1, ku(u1));
  r = kenar(r, (p) => p[1] >= z0, kz(z0)); r = kenar(r, (p) => p[1] <= z1, kz(z1));
  return r;
};
const levha = (pay: number): P2[] => {
  const kaynak: P2 = [11 + GUNES[0] * 1500, (BOSLUK[0] + BOSLUK[1]) / 2 + GUNES[1] * 1500]; // çapraz sokak ekseni üstünde
  const kutu = (u0: number, z0: number, u1: number, z1: number): P2[] => [[u0, z0], [u1, z0], [u1, z1], [u0, z1]];
  // sağ bloklar güneş yönünde kesik paralelkenar: çapraz sokak (kadraj dışı) güneşe doğru uzanır → ışık levhası sokağa girer
  // bitişik sağ binalar TEK blok (boşluğun önü ve arkası). Çapraz sokak kenarları ışın yönünden ±1.5° sapar: ışına tam paralel kenar
  // açısal taramada dejenere olur (tüm sokak "ışıkta" çıkıyordu). Işığı belirleyen yalnız cephe köşeleridir (u 11), sapma sonucu değiştirmez.
  const g0 = Math.atan2(GUNES[1], GUNES[0]), D = 60, R = (a: number): P2 => [Math.cos(a) * D, Math.sin(a) * D];
  const blok = (z0: number, z1: number): P2[] => { const a = R(g0 - 0.026), c = R(g0 + 0.026); return [[11, z0], [11, z1], [11 + c[0], z1 + c[1]], [11 + a[0], z0 + a[1] - 400]]; };
  const z0g = BOSLUK[0] + pay, z1g = BOSLUK[1] - pay;
  const onBlok: P2[] = [[11, -10], [11, z0g], [11 + R(g0 - 0.026)[0], z0g + R(g0 - 0.026)[1]], [11 + R(g0 - 0.026)[0], -10]];
  const arkaBlok: P2[] = [[11, z1g], [11, 340], [80, 340], [80, z1g + (80 - 11) * Math.tan(g0 + 0.026)]];
  const eng: P2[][] = [onBlok, arkaBlok, kutu(-70, -10, -11, 340), kutu(-70, 330, 80, 400)];
  void blok;
  // figür ve kızak tabanı (gölgeleri levhanın dışına düşer; hesap yine de tek kaynaktan)
  eng.push(Array.from({ length: 10 }, (_, i) => [FIGUR_TABAN[0] + Math.cos((i / 10) * Math.PI * 2) * 0.28, FIGUR_TABAN[1] + Math.sin((i / 10) * Math.PI * 2) * 0.2] as P2));
  eng.push(kutu(KIZAK.u - 0.3, KIZAK.z - 0.6, KIZAK.u + 0.36, KIZAK.z + 0.6));
  const c = gorunurlukCokgeni({ kaynak, engeller: eng, sinir: { x: -2000, y: -2000, w: 4200, h: 4200 } });
  return kirpDik(c, [-11, KAM_Z + 0.2, 11, 330]);
};
const LEVHA = [levha(0), levha(0.9), levha(2.0)];
/** dünya noktası levhada mı (üstten görünüş; levha dikey: yükseklikten bağımsız) */
const levhada = (u: number, z: number) => { const zp = z + K_ISIK * (11 - u); return zp > BOSLUK[0] && zp < BOSLUK[1]; };

// ---------------- gök: yumuşak sıcak–soğuk bantlar ----------------
const GOK: [number, string][] = [[0, "#4e5890"], [0.16, "#5e6298"], [0.32, "#7a6c9e"], [0.47, "#9c7ca4"], [0.6, "#c08ea6"], [0.72, "#dca6a8"], [0.84, "#ecc0ae"], [1, "#f4d6bc"]];
const Gok: React.FC<{ ufuk: number }> = ({ ufuk }) => {
  const y0 = -20, y1 = ufuk + 40;
  return <g>
    <defs>
      <linearGradient id="t5gok" x1="0" y1={y0} x2="0" y2={y1} gradientUnits="userSpaceOnUse">{GOK.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}</linearGradient>
      {/* güneş tarafı (sağ ufuk, kadraj dışı) ışıması */}
      <radialGradient id="t5isima" cx={1240} cy={ufuk - 40} r={760} gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fbe6cc" stopOpacity={0.95} /><stop offset="0.35" stopColor="#f6d2b6" stopOpacity={0.55} /><stop offset="1" stopColor="#f0c4b0" stopOpacity={0} /></radialGradient>
      <filter id="t5bl6" x="-10%" y="-50%" width="120%" height="200%"><feGaussianBlur stdDeviation={6} /></filter>
    </defs>
    <rect x={-20} y={y0} width={1120} height={y1 - y0} fill="url(#t5gok)" />
    {/* litografi bant izi: bant sınırlarında yumuşak, düşük kontrastlı yatay iz (düz şerit değil) */}
    {GOK.slice(1, -1).map(([o], i) => { const y = y0 + (y1 - y0) * o; return <rect key={i} x={-20} y={y - 7} width={1120} height={14} fill={i < 3 ? "#3e4680" : "#fff0e0"} opacity={i < 3 ? 0.1 : 0.12} filter="url(#t5bl6)" />; })}
    <rect x={-20} y={y0} width={1120} height={y1 - y0} fill="url(#t5isima)" />
    {/* ince yatay bulut şeritleri (güneşe bakan alt kenar sıcak) */}
    {[[ufuk - 560, 0.5, 300], [ufuk - 470, 0.62, 420], [ufuk - 330, 0.4, 260], [ufuk - 250, 0.7, 360]].map(([y, x, w], i) => <g key={`b${i}`} filter="url(#t5bl6)">
      <ellipse cx={1080 * x} cy={y} rx={w} ry={9} fill="#8a7aa8" opacity={0.35} /><ellipse cx={1080 * x + 30} cy={y + 7} rx={w * 0.8} ry={4} fill="#f6d0b8" opacity={0.45} /></g>)}
  </g>;
};

// ---------------- zemin: gölgede kar + ışık levhası + patika + yığınlar ----------------
const tumsek = (s: number, z: number) => [2, 7, 13, 20, 30, 46, 70, 110, 170].reduce((m, c, i) => m + (0.3 + 0.3 * rnd(1305, `${s}${i}`)) * Math.exp(-(((z - c - rnd(1305, `z${s}${i}`) * 3) / (1.1 + c * 0.12)) ** 2)), 0);
const zz = (a: number, b: number, k = 1.06) => { const o: number[] = []; for (let z = a; z <= b; z *= k) o.push(z); o.push(b); return o; };
const yiginUst = (s: number): V3[] => zz(0.6, 320, 1.04).map((z) => [s * (8.3 - 0.35 * tumsek(s, z)), 0.75 + 0.55 * tumsek(s, z), z] as V3);
const Zemin: React.FC<{ W: Dunya; vp: P2; ufuk: number }> = ({ W, vp, ufuk }) => {
  const yol = [[-11, 0.3, KAM_Z + 0.4], [11, 0.3, KAM_Z + 0.4], [11, 0.3, 330], [-11, 0.3, 330]] as V3[];
  const lv = (q: P2[], h = 0.31) => W.poli(q.map((p) => [p[0], h, p[1]] as V3));
  const topak = Array.from({ length: 26 }, (_, i) => ({ u: -4 + rnd(1307, `u${i}`) * 13, z: KAM_Z + 1.6 + rnd(1307, `z${i}`) ** 1.5 * 9, r: 0.02 + rnd(1307, `r${i}`) * 0.04 }));
  return <g>
    <defs>
      <linearGradient id="t5kar" x1="0" y1={ufuk} x2="0" y2={1920} gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#d8d2e2" /><stop offset="0.25" stopColor="#bfc0dc" /><stop offset="0.6" stopColor="#b2b5d6" /><stop offset="1" stopColor="#c2c5e0" />
      </linearGradient>
      <filter id="t5yari" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation={7} /></filter>
    </defs>
    <polygon points={W.poli(yol)} fill="url(#t5kar)" />
    <Kirp d={W.poliD(yol)}>
      {/* gölgede kar: seyrek perspektif tarama (kaçış noktasına), yakına doğru biraz koyulaşır */}
      <TonTarama d={W.poliD(yol)} isik={[0, 1]} ton={1} renk="#7072ac" seed={SD + 161} aci={-3} tonFn={(q) => 0.05 + 0.3 * ss(1150, 1800, q[1])} aralik={9} kalinlik={1.5} alfa={0.28} />
      {/* ışık levhası: üç basamak (dış yarı gölge bulanık) — aynı görünürlük hesabı */}
      <polygon points={lv(LEVHA[0])} fill="#e4b8ae" filter="url(#t5yari)" />
      <polygon points={lv(LEVHA[1])} fill="#efcbbd" />
      <polygon points={lv(LEVHA[2])} fill="#f7dfd0" />
      {/* levha içinde karın kırışığı: sıcak yüzeyde kısa mavi gölge oyukları */}
      <Kirp d={`M${lv(LEVHA[0]).split(" ").join(" L")}Z`}>
        {Array.from({ length: 40 }, (_, i) => { const u = -10 + rnd(1311, `u${i}`) * 20, z = KAM_Z + 2 + rnd(1311, `z${i}`) * 22; const c = W.E([u, 0.3, z]), s = W.S([u, 0.3, z]); const w = (0.6 + rnd(1311, `w${i}`)) * s * 0.5; if (!(w > 4)) return null;
          return <path key={i} d={`M${c[0] - w},${c[1]} Q${c[0]},${c[1] - w * 0.08} ${c[0] + w},${c[1] + w * 0.02}`} stroke="#c49aa4" strokeWidth={Math.max(1.2, w * 0.03)} fill="none" opacity={0.6} />; })}
      </Kirp>
      {/* çiğnenmiş patika: yürüyüş izleri (T4 IZLER, aynı seed) */}
      {IZLER.map((t, i) => { const c = W.E([t.u, 0.3, t.z]), sc = W.S([t.u, 0.3, t.z]); const rx = 0.085 * sc, ry = Math.max(0.8, rx * 0.26); if (!(rx > 0.7) || t.z < KAM_Z + 1) return null;
        const lit = levhada(t.u, t.z);
        return <g key={i}>
          <ellipse cx={c[0]} cy={c[1]} rx={rx} ry={ry} fill={lit ? "#c49aa6" : "#9496c4"} opacity={0.6} transform={`rotate(${t.aci * 20} ${c[0]} ${c[1]})`} />
          {rx > 4 && <ellipse cx={c[0] - rx * 0.12} cy={c[1] - ry * 0.6} rx={rx * 0.9} ry={ry * 0.32} fill={lit ? "#fff0e4" : "#e8e6f2"} opacity={0.75} />}
        </g>; })}
      {/* kızak izi: kızaktan geriye iki paralel oluk */}
      {[-0.22, 0.22].map((du, i) => <polyline key={i} points={pS(zz(KIZAK.z + 0.6, 120, 1.03).map((z) => W.E([KIZAK.u + 0.05 + du + 0.6 * Math.sin((z - KIZAK.z) * 0.05), 0.31, z])))} stroke="#8486ba" strokeWidth={2} fill="none" opacity={0.75} />)}
    </Kirp>
    {/* yan yığınlar (cephe dibinde kar): tümsekli sırt, sokağa bakan yüz gölgede + tarama; levhadaki kısım sıcak */}
    {[-1, 1].map((s) => {
      const U = yiginUst(s);
      const arka = W.poli([...U, [s * 11, 0.3, 320], [s * 11, 0.3, 0.6]]);
      const yuzQ: V3[] = [...U, ...U.slice().reverse().map((p) => [s * 7.4, 0.3, p[2]] as V3)];
      return <g key={s}>
        <polygon points={arka} fill="#dcdcec" />
        <polygon points={W.poli(yuzQ)} fill="#9c9ecc" />
        <TonTarama d={W.poliD(yuzQ)} isik={[0, 1]} ton={1} renk="#55579a" seed={1306 + s} mod="isinsal" merkez={vp} tonFn={(q) => 0.25 + 0.35 * ss(900, 1500, q[1])} aralik={6.5} kalinlik={1.7} alfa={0.45} />
        {/* yığının güneşe bakan üstü levhada aydınlanır (sokağa bakan yüzü güneşe sırtını döner → gölgede kalır); yarı gölge kenarı yumuşak */}
        <g filter="url(#t5yari)" opacity={0.85}><Kirp d={`M${lv(LEVHA[1], 1.0).split(" ").join(" L")}Z`}><polygon points={arka} fill="#f2d6ca" /></Kirp></g>
        <polyline points={pS(U.map(W.E))} stroke="#f2ecf4" strokeWidth={2.6} fill="none" />
        <MurekkepCizgi q={U.map(W.E).filter((p) => p[1] < 1990 && p[0] > -40 && p[0] < 1120)} renk="#3a3c78" kalinlik={2.8} ucBas={80} ucSon={20} seed={1310 + s} alfa={0.8} />
      </g>;
    })}
    {/* ön plan kar topakları (ışığa bakan üst yüz açık, alt yarı gölge) */}
    {topak.map((t, i) => { const c = W.E([t.u, 0.3, t.z]), s = W.S([t.u, 0.3, t.z]), r = t.r * s * 0.7; if (!(r > 1.5) || c[1] > 1960) return null;
      const lit = levhada(t.u, t.z);
      const q: P2[] = Array.from({ length: 7 }, (_, k) => { const a = (k / 7) * Math.PI * 2, rr = r * (0.7 + rnd(1308, `${i}${k}`) * 0.5); return [c[0] + Math.cos(a) * rr * 1.3, c[1] + Math.sin(a) * rr * 0.5] as P2; });
      const d = `M${pS(q).split(" ").join(" L")}Z`;
      return <g key={i}><path d={d} fill={lit ? "#c89098" : "#8c8ebe"} transform={`translate(${r * 0.3} ${r * 0.25})`} opacity={0.8} /><path d={d} fill={lit ? "#fbe8dc" : "#e2e0ee"} /></g>; })}
  </g>;
};

// ---------------- kızak + tahta kova (sol yığın dibinde, gölgede) ----------------
const Kizak: React.FC<{ W: Dunya }> = ({ W }) => {
  const { u, z } = KIZAK, h = 0.3, P = (du: number, dh: number, dz: number) => W.E([u + du, h + dh, z + dz]), s = W.S([u, h, z]), kw = Math.max(2, 0.035 * s);
  return <g strokeLinejoin="round" strokeLinecap="round">
    <polygon points={pS([P(-0.4, 0, -0.65), P(0.42, 0, -0.65), P(0.42, 0, 0.62), P(-0.4, 0, 0.62)])} fill="#6e70a6" opacity={0.55} />
    {[-0.22, 0.22].map((du, i) => <g key={i}><path d={`M${pS([P(du, 0, 0.5)])} L${pS([P(du, 0, -0.42)])} Q${pS([P(du, 0, -0.62)])} ${pS([P(du, 0.17, -0.56)])}`} stroke={LH.tahtaG} strokeWidth={kw} fill="none" />
      {[-0.28, 0.32].map((dz, j) => <line key={j} x1={P(du, 0, dz)[0]} y1={P(du, 0, dz)[1]} x2={P(du, 0.17, dz)[0]} y2={P(du, 0.17, dz)[1]} stroke={LH.tahtaG} strokeWidth={kw * 0.8} />)}</g>)}
    <polygon points={pS([P(-0.26, 0.17, -0.45), P(0.26, 0.17, -0.45), P(0.26, 0.17, 0.48), P(-0.26, 0.17, 0.48)])} fill={LH.tahta} stroke={LH.tahtaG} strokeWidth={1.8} />
    {[-0.2, 0.05, 0.3].map((dz, i) => <line key={i} x1={P(-0.26, 0.17, dz)[0]} y1={P(-0.26, 0.17, dz)[1]} x2={P(0.26, 0.17, dz)[0]} y2={P(0.26, 0.17, dz)[1]} stroke={LH.tahtaG} strokeWidth={1.2} opacity={0.7} />)}
    {(() => { const c = P(0, 0.17, 0.05), r = 0.15 * s, hh = 0.3 * s; return <g>
      <ellipse cx={c[0] + r * 0.2} cy={c[1] + 2} rx={r * 1.2} ry={r * 0.3} fill="#4a4c7e" opacity={0.6} />
      <path d={`M${c[0] - r},${c[1]} L${c[0] - r * 0.86},${c[1] - hh} L${c[0] + r * 0.86},${c[1] - hh} L${c[0] + r},${c[1]}Z`} fill={LH.tahta} stroke={LH.tahtaG} strokeWidth={1.8} />
      <path d={`M${c[0] + r * 0.2},${c[1]} L${c[0] + r * 0.2},${c[1] - hh} L${c[0] + r * 0.86},${c[1] - hh} L${c[0] + r},${c[1]}Z`} fill={LH.tahtaG} opacity={0.4} />
      {[0.18, 0.8].map((t, i) => <line key={i} x1={c[0] - r * (1 - 0.14 * t)} y1={c[1] - hh * t} x2={c[0] + r * (1 - 0.14 * t)} y2={c[1] - hh * t} stroke="#2a2024" strokeWidth={Math.max(1.5, r * 0.14)} />)}
      <ellipse cx={c[0]} cy={c[1] - hh} rx={r * 0.86} ry={r * 0.28} fill={LH.tahtaG} />
      <path d={`M${c[0] - r * 0.86},${c[1] - hh} Q${c[0]},${c[1] - hh - r * 1.3} ${c[0] + r * 0.86},${c[1] - hh}`} stroke={LH.tahtaG} strokeWidth={1.8} fill="none" />
    </g>; })()}
  </g>;
};

// ---------------- uzakta yürüyen (ekranın < %5'i: siluet; atkılı, öne eğik, yük taşır) ----------------
const Yuruyen: React.FC<{ W: Dunya; p: number }> = ({ W, p }) => {
  const z = 46 - (p / 60) * 0.9, u = -1.6, a = W.E([u, 0.3, z]), s = W.S([u, 0.3, z]), f = Math.sin((p / 60) * Math.PI * 2 * 0.9);
  const g = (x: number, y: number): string => `${(a[0] + x * s).toFixed(1)},${(a[1] - y * s).toFixed(1)}`;
  return <g>
    <ellipse cx={a[0]} cy={a[1]} rx={0.45 * s} ry={0.07 * s} fill="#6a6ca2" opacity={0.8} />
    <path d={`M${g(-0.12 + 0.1 * f, 0)} L${g(-0.05, 0.75)} L${g(0.08, 0.75)} L${g(0.14 - 0.1 * f, 0)}Z`} fill="#2e2a46" />
    <path d={`M${g(-0.26, 0.55)} Q${g(-0.3, 1.2)} ${g(-0.12, 1.42)} L${g(0.14, 1.44)} Q${g(0.28, 1.1)} ${g(0.24, 0.55)}Z`} fill="#3a3456" />
    <circle cx={a[0] + 0.04 * s} cy={a[1] - 1.53 * s} r={0.12 * s} fill="#3a3456" />
    <path d={`M${g(-0.16, 1.6)} Q${g(0.05, 1.72)} ${g(0.2, 1.58)} L${g(0.16, 1.5)} L${g(-0.12, 1.5)}Z`} fill="#4a4060" />
    <path d={`M${g(0.24, 0.9)} L${g(0.42, 0.62)}`} stroke="#3a3456" strokeWidth={Math.max(1.2, 0.08 * s)} />
    <rect x={a[0] + 0.32 * s} y={a[1] - 0.66 * s} width={0.22 * s} height={0.28 * s} fill="#4e3e3a" />
    <path d={`M${g(0.24, 1.36)} Q${g(0.3, 1.1)} ${g(0.25, 0.6)}`} stroke="#e8c4b0" strokeWidth={Math.max(0.8, 0.03 * s)} fill="none" opacity={0.7} />
  </g>;
};

// ---------------- figür: Eliasberg (kit/figur/Sirt) + iki el + ekmek + kırıntı ----------------
const PAL: FigurPalet = {
  giysi: "#262438", giysiGolge: "#121020", kol: "#2a283e", pantolon: "#2a2636", pantolonGolge: "#18141f", ayakkabi: "#1a1418",
  ten: "#cfa48e", tenGolge: "#8c6670", kenar: "#56588a", kontur: "#0e0c18",
  kafa: { ten: "#c89e8a", tenGolge: "#7c5a68", tenDerin: "#4a3040", kenar: "#f2c6aa", yansima: "#d6a088", sac: "#2a2228", sacIsik: "#5e4e5a", kas: "#3a2a30", gozAk: "#c8b8b0", iris: "#3e3238", bebek: "#18121a", dudak: "#8e6264" },
};
const B = 360;
const POZ: SirtPoz = {
  boyunDip: [-58, 1238], B, yon: 1, omuzAci: 9, donus: 35, alt: 1960, boyunAci: -66, yakinAlt: 0.78,
  bas: { yaw: 93, pitch: 24, roll: 4 },
  yakinKol: { dirsek: [566, 2085], bilek: [700, 1436], r: [0.27, 0.21, 0.15] },
  uzakKol: { omuz: [-300, 1330], dirsek: [170, 1720], bilek: [452, 1506], r: [0.25, 0.2, 0.14] },
};
// sekme ışığı: aydınlık şerit önde-sağ-aşağıda → ışık yukarı-sola gider (kenar hilali sağ-alt kenarlarda)
const SEKME: P2 = [-0.75, -0.55];
const TEN = { ten: "#d2a690", golge: "#8e6874", kontur: "#3e2a34", kenar: "#f4c8ae" };
// ekmek eli
const EL_SAG = { bilek: [700, 1430] as P2, aci: -50, E: 206 };
const EL_SOL = { bilek: [456, 1500] as P2, aci: -10, E: 200 };
/** çanak avuç: parmaklar hafif kıvrık (serçe en kıvrık), başparmak açık */
const AVUC = { a: [-8, -3, 2, 7] as [number, number, number, number], b: [28, 32, 38, 46] as [number, number, number, number], bas: { a: -30, b: 12 } };
// ekmek: kuşatma kalıp ekmeği dilimi (≈ 11 × 9 cm, el boyunun ~%58'i): düz alt, hafif kubbeli üst kabuk, 1.5 cm kalınlık
const EKMEK_A = -14;
const ekmekGeo = () => {
  const d = (EL_SAG.aci * Math.PI) / 180, ax: P2 = [Math.cos(d), Math.sin(d)], bas: P2 = [Math.sin(d), -Math.cos(d)];
  const M0: P2 = [EL_SAG.bilek[0] + ax[0] * 0.64 * EL_SAG.E + bas[0] * 0.3 * EL_SAG.E, EL_SAG.bilek[1] + ax[1] * 0.64 * EL_SAG.E + bas[1] * 0.3 * EL_SAG.E];
  const r = (EKMEK_A * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r);
  const M = (x: number, y: number, o: P2 = M0): P2 => [o[0] + x * c - y * s, o[1] + x * s + y * c];
  const w = 0.29 * EL_SAG.E, h = 0.24 * EL_SAG.E; // yarı en / yarı boy
  const yuz: P2[] = [M(-w, h), M(-w * 1.02, -h * 0.35), M(-w * 0.9, -h * 0.8), M(-w * 0.5, -h * 1.02), M(0, -h * 1.08), M(w * 0.5, -h * 1.02), M(w * 0.9, -h * 0.8), M(w * 1.02, -h * 0.35), M(w, h)];
  const kal: P2 = [11, -7]; // kalınlık (arka yüz kayması)
  const arka = yuz.map((p) => [p[0] + kal[0], p[1] + kal[1]] as P2);
  return { M0, M, w, h, yuz, arka, kal };
};

const Eller: React.FC<{ p: number; kilit?: SablonProps["kilit"] }> = ({ p }) => {
  const ek = ekmekGeo();
  const yuzD = cr(ek.yuz.slice(1, -1).concat([ek.yuz[8], ek.yuz[0]]), true);
  const govdeD = cr([...ek.arka.slice(1, 8), ek.yuz[7], ek.yuz[8], ek.yuz[0], ek.yuz[1]], true);
  // avuç: kırıntılar (avuçta düzensiz çokgen; 3 tanesi avuç kenarından düşer — düşüş p 96/104/112'de başlar, yerçekimi)
  const gL = incElGeo(EL_SOL.bilek, EL_SOL.aci, EL_SOL.E, AVUC);
  const avuc = gL.M([0.27, 0.0]);
  const kenarP = gL.M([0.36, 0.17]);
  const kirinti = Array.from({ length: 13 }, (_, i) => {
    const dus = i >= 10, k = i - 10, t0 = 96 + k * 8, dt = Math.max(0, p - t0);
    const a = rnd(1409, `a${i}`) * Math.PI * 2, rr = Math.sqrt(rnd(1409, `d${i}`)) * 0.13 * EL_SOL.E;
    const c: P2 = dus ? [kenarP[0] - 6 + k * 7 + dt * 0.4, kenarP[1] + 4 + 0.5 * 3.2 * dt * dt + dt * 1.5] : [avuc[0] + Math.cos(a) * rr * 1.25, avuc[1] + Math.sin(a) * rr * 0.6];
    const r = (dus ? 2.6 : 2.2) + rnd(1409, `r${i}`) * 3.6;
    return { c, dus, q: Array.from({ length: 6 }, (_, j) => { const t = (j / 6) * Math.PI * 2 + rnd(1409, `t${i}${j}`) * 0.6; const q = r * (0.6 + rnd(1409, `q${i}${j}`) * 0.5); return [c[0] + Math.cos(t) * q, c[1] + Math.sin(t) * q * 0.8] as P2; }) };
  }).filter((k) => k.c[1] < 1990);
  const IY: P2 = SEKME;
  return <g strokeLinejoin="round" strokeLinecap="round">
    {/* sol el (uzak kol): avuç yukarı, hafif çanak; kırıntılar avuçta */}
    <IncEl bilek={EL_SOL.bilek} aci={EL_SOL.aci} E={EL_SOL.E} poz={AVUC} ten={TEN.ten} golge={TEN.golge} kontur={TEN.kontur} isik={[-IY[0], -IY[1]]} sira="sercOnde" ayrim="#b48a82" />
    {/* avuç içi çukuru: ton alanı (çizgi değil) */}
    <ellipse cx={avuc[0]} cy={avuc[1] + 4} rx={0.17 * EL_SOL.E} ry={0.08 * EL_SOL.E} transform={`rotate(${EL_SOL.aci} ${avuc[0]} ${avuc[1]})`} fill={TEN.golge} opacity={0.35} />
    {kirinti.map((k, i) => <g key={i}>
      {!k.dus && <ellipse cx={k.c[0] + 2} cy={k.c[1] + 2} rx={4} ry={1.6} fill="#6a4a50" opacity={0.45} />}
      <path d={`M${pS(k.q).split(" ").join(" L")}Z`} fill={LH.ekmek} stroke="#2a1e1a" strokeWidth={0.9} />
      <path d={`M${pS(k.q.slice(0, 3)).split(" ").join(" L")}`} stroke="#b88e6c" strokeWidth={1} fill="none" />
    </g>)}
    {/* ekmek: kalınlık (kabuk yanı) → kesik yüz (gözenekli iç, ince koyu kabuk) */}
    <path d={govdeD} fill="#3a2a20" />
    <path d={yuzD} fill="#6a503c" />
    <Kirp d={yuzD}>
      {/* kabuk: ince koyu kenar (6–8 px) */}
      <path d={yuzD} fill="none" stroke="#2e2018" strokeWidth={15} />
      {/* ışık tarafında (sağ-alt, sekme) bir basamak açık */}
      <path d={cr([ek.M(ek.w * 0.1, -ek.h * 1.2), ek.M(ek.w * 1.3, -ek.h * 1.2), ek.M(ek.w * 1.3, ek.h * 1.2), ek.M(-ek.w * 0.4, ek.h * 1.2)])} fill="#80644c" opacity={0.7} />
      {Array.from({ length: 30 }, (_, i) => { const q = ek.M((rnd(1426, `x${i}`) * 2 - 1) * ek.w * 0.85, (rnd(1426, `y${i}`) * 2 - 1) * ek.h * 0.85); return <ellipse key={i} cx={q[0]} cy={q[1]} rx={1.3 + rnd(1426, `r${i}`) * 2.2} ry={1 + rnd(1426, `s${i}`) * 1.5} fill="#2e2018" opacity={0.75} />; })}
      <TonTarama d={yuzD} isik={IY} ton={0.8} renk="#1e140e" seed={SD + 215} aci={EKMEK_A + 90} gecis={[-0.2, 0.9]} aralik={4.4} kalinlik={1.6} alfa={0.6} />
    </Kirp>
    <MurekkepKontur d={govdeD} renk="#140c08" isik={IY} kalinlik={[1.4, 3.6]} seed={SD + 216} />
    <MurekkepKontur d={yuzD} renk="#1a100c" isik={IY} kalinlik={[1.2, 3]} kayip={0.4} seed={SD + 217} />
    <HilalB d={[yuzD]} renk="#c08c6c" dx={IY[0] * 3} dy={IY[1] * 3} alfa={0.85} />
    {/* sağ el ekmeğin önünde: başparmak ekmeğin yüzüne yatar, dört parmak alt-sağ kenarı sarar; elin ekmeğe düşen temas gölgesi */}
    <Kirp d={govdeD}><IncEl bilek={EL_SAG.bilek} aci={EL_SAG.aci} E={EL_SAG.E} poz={INC_POZ.tutus} ten="" golge="" kontur="" isik={[0, 1]} golgeRenk="#140c08" golgeKay={[7, 6]} /></Kirp>
    <IncEl bilek={EL_SAG.bilek} aci={EL_SAG.aci} E={EL_SAG.E} poz={INC_POZ.tutus} ten={TEN.ten} golge={TEN.golge} kontur={TEN.kontur} ayrim="#b48a82" isik={[-IY[0], -IY[1]]} />
  </g>;
};

/** keman kutusu askısı: kalkık yakanın yanından (omuz eğimi) sırtta sola-aşağı; omuzda kumaşı bastırır, tokalı */
const Aski: React.FC = () => {
  const q: P2[] = [[150, 1262], [118, 1340], [40, 1560], [-40, 1780]];
  const d = (() => { const L: P2[] = [], R: P2[] = []; q.forEach((p, i) => { const a = q[Math.max(0, i - 1)], b = q[Math.min(q.length - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1, h = 23; L.push([p[0] - (dy / l) * h, p[1] + (dx / l) * h]); R.push([p[0] + (dy / l) * h, p[1] - (dx / l) * h]); }); return cr([...L, ...R.reverse()]); })();
  return <g>
    <path d={d} fill="#0a0812" opacity={0.55} transform="translate(7 5)" />
    <path d={d} fill={LH.kayis} />
    <TonTarama d={d} isik={[0.2, 1]} ton={0.7} renk="#140c0c" seed={SD + 221} mod="egri" eksen={q} gecis={[-1, 0.8]} aralik={4.4} kalinlik={1.5} />
    <MurekkepKontur d={d} renk="#120a0a" isik={[0.2, 1]} kalinlik={[1.2, 3.2]} seed={SD + 222} />
    <path d={cr([[118, 1252], [160, 1266], [140, 1300], [104, 1288]])} fill="#1a1626" opacity={0.6} />
    <g transform="rotate(20 30 1600)"><rect x={2} y={1570} width={56} height={62} rx={7} fill="none" stroke="#6e5e50" strokeWidth={6} /><path d={`M6,1576 L54,1576`} stroke="#c8b098" strokeWidth={2} /><line x1={30} y1={1570} x2={30} y2={1632} stroke="#5a4a3e" strokeWidth={4} /></g>
  </g>;
};

export const SOKAK_T5_KAMERA: Kamera25 = { kare: [0, 180], konum_yol: [[6.2, 1.7, KAM_Z], [6.2, 1.7, KAM_Z + 0.08]], yon_yol: [[-16, -3.5], [-16, -3.5]], lens_mm: [35], egri: "inout", ekipman: "steadicam" };
export const SokakP03aT5: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const K = kamera25(param<Partial<Kamera25> | undefined>(plan, "kamera", undefined), p, SOKAK_T5_KAMERA);
  const W = dunya(K);
  const vp = W.E([0, 1.7, 3000]);
  const ufuk = vp[1];
  const uzak = BINA.filter((b) => b.z0 > 80), yakin = BINA.filter((b) => b.z0 <= 80);
  const sira = (a: Bina, b: Bina) => b.z1 - a.z1;
  if (kilit) { kilit.push({ ad: "yuz", p: [150, 930], tur: "yuz" }); kilit.push({ ad: "ekmek", p: ekmekGeo().M0, tur: "kurulum" }); kilit.push({ ad: "avuc", p: [520, 1478], tur: "dokunus" }); }
  // sokak sonundaki karşı bina (z 330): pencere sıraları, buğuda
  const son = (h0: number, h1: number, u0: number, u1: number): V3[] => [[u0, h0, 330], [u1, h0, 330], [u1, h1, 330], [u0, h1, 330]];
  return (
    <LgBaski>
      <Gok ufuk={ufuk} />
      {/* baca / soba borusu dumanı: sola yatık, güneş tarafı sıcak */}
      {[[-8, 150, 21], [-9, 95, 20], [9, 170, 19], [-9, 60, 21], [9, 240, 19]].map(([u, z, h], i) => { const a = W.E([u, h, z]); const pts: P2[] = Array.from({ length: 6 }, (_, k) => [a[0] - k * 11 - k * k * 1.6 + Math.sin(k * 1.3 + i) * 8, a[1] - k * 26] as P2);
        return <g key={i} filter="url(#t5bl6)"><path d={cr(pts, false)} stroke="#b0a6c2" strokeWidth={14 + i * 3} fill="none" opacity={0.42} /><path d={cr(pts.map((q) => [q[0] + 5, q[1] - 3] as P2), false)} stroke="#f2d4c0" strokeWidth={5 + i * 1.2} fill="none" opacity={0.4} /></g>; })}
      <polygon points={W.poli(son(0, 19, -11, 11))} fill={bugu("#b4a0b0", 330)} />
      {[2, 5.6, 9.2, 12.8].map((h) => Array.from({ length: 7 }, (_, k) => <polygon key={`${h}${k}`} points={W.poli(son(h, h + 1.9, -9.6 + k * 3.1, -8.6 + k * 3.1))} fill={bugu("#5a5070", 330)} />))}
      <polygon points={W.poli(son(18.6, 19.4, -11.5, 11.5))} fill={bugu("#8a7890", 330)} />
      {uzak.sort(sira).map((b, i) => <Cephe key={`u${i}`} W={W} b={b} vp={vp} />)}
      {/* ufukta buğu bantları (A5) */}
      {[[-90, 110, 0.26], [-40, 60, 0.22], [-12, 26, 0.3]].map(([dy, h, a], i) => <rect key={i} x={-20} y={ufuk + dy} width={1120} height={h} fill={BUGU} opacity={a} />)}
      <polygon points={W.poli([[11, 0, BOSLUK[1]], [40, 0, BOSLUK[1]], [40, 19, BOSLUK[1]], [11, 19, BOSLUK[1]]])} fill={CEPHE[1]} />
      {yakin.sort(sira).map((b, i) => <Cephe key={`y${i}`} W={W} b={b} vp={vp} />)}
      <Zemin W={W} vp={vp} ufuk={ufuk} />
      <Yuruyen W={W} p={p} />
      <Kizak W={W} />
      {/* düşen ince kar (dünyaya bağlı, kaynamaz) */}
      {Array.from({ length: 60 }, (_, i) => { const z = KAM_Z + 2 + rnd(1203, `z${i}`) * 30, u = -8 + rnd(1203, `u${i}`) * 18, h = ((rnd(1203, `h${i}`) * 9 - (p / 60) * 0.35) % 9 + 9) % 9; const q = W.E([u, h, z]);
        return q[0] > -5 && q[0] < 1085 ? <circle key={i} cx={q[0]} cy={q[1]} r={Math.max(1.5, Math.min(4, 0.03 * W.S([u, h, z])))} fill={levhada(u, z) ? "#f8e4d8" : "#ece6f0"} opacity={0.85} /> : null; })}
      {/* figür */}
      <SirtFigur poz={POZ} P={PAL} isik={[0.15, 1]} kafaIsik={[-0.85, -0.15]} kafaIsikOn={0.35} seed={SD + 400}
        yansima={{ yon: SEKME, renk: "#c89a9a", alfa: 0.6 }}
        ifade={{ kas: 0.5, goz: 0.45, agiz: 0.05, gulus: -0.2, bakis: [0.6, 0.9], yas: 0.6, sakal: 0.5, zayif: 0.45, sacDagin: 0.8 }}
        katman={{ ust: () => <Aski />, yakinEl: () => <Eller p={p} kilit={kilit} /> }} />
      {/* nefes buğusu: yüzün önünde ince bulut */}
      <g filter="url(#t5bl6)"><ellipse cx={330} cy={1010} rx={46} ry={22} fill="#e0dcea" opacity={0.28} /><ellipse cx={372} cy={996} rx={30} ry={14} fill="#e8e2ee" opacity={0.2} /></g>
    </LgBaski>
  );
};

/** kalibrasyon kompozisyonu (BodrumT5 ile aynı sarma: Sahne → ArsivKatmani litografi; guvenli: güvenli alan + kilit noktaları) */
const PLAN_T5: Plan = { id: "P03a", sablon: "SOKAK-LG", sure_kare: 180, parametreler: { gorunum: "p03a-t5", mevsim: "kis" } };
export const LeningradSokakT5: React.FC<{ guvenli?: boolean }> = ({ guvenli }) => {
  const p = useCurrentFrame();
  const kilit: KilitNokta[] = [];
  return (
    <AbsoluteFill style={{ backgroundColor: "#262a4e" }}>
      <ArsivKatmani mod="litografi"><AbsoluteFill><SokakP03aT5 plan={PLAN_T5} p={p} kilit={kilit} /></AbsoluteFill></ArsivKatmani>
      {guvenli && <GuvenliAlan noktalar={kilit} baslik="P03a SOKAK-LG tur-5" />}
    </AbsoluteFill>
  );
};
