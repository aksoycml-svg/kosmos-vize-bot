// ===== MASA-YB şablonu (yarasa-bombasi; mekanlar.md §2, tasarim.md §1.5, §4, §5) =====
// Adams'ın masası tepeden (aci tepe, ≈8° önden eğik → düzlem çizim), koyu ahşap + lamba havuzu (kadraj dışı sol-üst 45°, gölge sağ-aşağı).
// İki sayfa üst üste (cilt yatay): üst sayfa mağara + mürekkep sürü (P01/P02/P12 son), alt sayfa saçak + asılı yarasa (P02/P03/P12 A).
// Alt sayfa çizimi ÇÖL-ÜS `yanik` görünümünün ölçekli kopyasıdır (cizimHatlari; dekor = (ekran − (540,960))/1.9 + (540,1646)) →
// P12 match-cut: kamera cs 1.9, cy −1303 iken çizim hatları gerçek saçakla aynı ekran konumunda.
// Çizim animasyonu: kalem ucu = aktif çizginin ucu (otomatik); çizgi uzunluğuyla orantılı süre; ıslak mürekkep 24 karede kurur.
// Parametreler (KATALOG.md "MASA-YB"): defter {dx,dy}|false, ust_sayfa {magara, suru, canli, notlar}, alt_sayfa {cati, yarasa,
// gogus_bos, durak, alev, alev_cizgi, kirmizi, geri, notlar}, kalem {el, cikis}|false, nesneler [MasaNesne], vinyet {kare, deger}.
// Görüntüde harf yok. Kırmızı yalnız defter alevi + tarama (P03) ve mühür izi. Amber yalnız kapsül.
import React from "react";
import { interpolate, random } from "remotion";
import type { P, Plan } from "../../tipler";
import { cl, GIRIS, kameraHesapla, katDonusum } from "../../zaman";
import { param, Sablon, SablonProps } from "../../ortak";
import { Yarasa } from "../../props/yarasa/Yarasa";
import { akisYolu, Suru, SuruAyar } from "../../props/yarasa/Suru";
import { MasaNesne, Nesne, PXCM } from "../../props/yarasa/MasaProplari";
import type { KolTip } from "../../../rig/KolEl";
import { EL_CIKIS, ElSiluet } from "../../props/yarasa/El";
import { cizimHatlari } from "../colus/ColUs";

export const MY = {
  masa: "#8a6a54", masaOrta: "#725a4c", masaDis: "#3c3650", damar: "#5e4a40", cila: "#b08a70",
  kagitCek: "#ebcfab", kagit: "#e6d8b9", kagitDis: "#d8c9a8", kagitKose: "#aa9fb0", oluk: "#8d8196", bez: "#57474e", leke: "#b9a07a",
  murekkep: "#2b2f45", islak: "#1b1d33", lavis: "#463f5c", cekirdek: "#2f2c45", kirmizi: "#b3261e", golge: "#3c3650",
  kalem: "#3b3f4a", kalemIsik: "#5a5f6c", uc: "#8a8d96",
};
const UST: P = [110, 610], ALT: P = [110, 1346], SW = 860, SH = 700;
const HAVUZ = { c: [420, 1180] as P, R1: 720, R2: 1100 };
type Ar = { bas: number; bit: number; q0?: number }; // q0: başlangıç ilerlemesi (P02 yarım → P03 tamam)
type Zaman = Ar | true | undefined | null | false;
const ilerle = (z: Zaman, p: number) => (z === true ? 1 : !z ? 0 : interpolate(p, [z.bas, z.bit], [z.q0 ?? 0, 1], cl));
const pts = (a: P[]) => a.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(" ");
const uz = (a: P[]) => a.slice(1).reduce((s, q, i) => s + Math.hypot(q[0] - a[i][0], q[1] - a[i][1]), 0);
const noktaAt = (a: P[], L: number): P => { let d = L; for (let i = 1; i < a.length; i++) { const s = Math.hypot(a[i][0] - a[i - 1][0], a[i][1] - a[i - 1][1]); if (d <= s) { const t = s ? d / s : 0; return [a[i - 1][0] + (a[i][0] - a[i - 1][0]) * t, a[i - 1][1] + (a[i][1] - a[i - 1][1]) * t]; } d -= s; } return a[a.length - 1]; };

// ---------- alt sayfa çizim geometrisi (yanik → dekor) ----------
const eD = (q: P): P => [(q[0] - 540) / 1.9 + 540, (q[1] - 960) / 1.9 + 1646];
const kirpX = (a: P, b: P, x0: number, x1: number): [P, P] | null => {
  let t0 = 0, t1 = 1; const dx = b[0] - a[0];
  if (Math.abs(dx) < 1e-6) return a[0] >= x0 && a[0] <= x1 ? [a, b] : null;
  const ta = (x0 - a[0]) / dx, tb = (x1 - a[0]) / dx; t0 = Math.max(t0, Math.min(ta, tb)); t1 = Math.min(t1, Math.max(ta, tb));
  if (t0 >= t1) return null; const L = (t: number): P => [a[0] + dx * t, a[1] + (b[1] - a[1]) * t]; return [L(t0), L(t1)];
};
// dışbükey dörtgende 72° tarama (aralık 7, 2.5 px): segmentler (kalem zikzak: yön dönüşümlü)
const tara = (Q: P[], aralik = 7, aci = 72): [P, P][] => {
  const v: P = [Math.cos((aci * Math.PI) / 180), Math.sin((aci * Math.PI) / 180)], nr: P = [-v[1], v[0]];
  const proj = Q.map((q) => q[0] * nr[0] + q[1] * nr[1]), lo = Math.min(...proj), hi = Math.max(...proj), out: [P, P][] = [];
  for (let c = lo + aralik / 2, i = 0; c < hi; c += aralik, i++) {
    const X: P[] = [];
    for (let j = 0; j < Q.length; j++) { const a = Q[j], b = Q[(j + 1) % Q.length], da = proj[j] - c, db = proj[(j + 1) % Q.length] - c; if ((da <= 0 && db > 0) || (da > 0 && db <= 0)) { const t = da / (da - db); X.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]); } }
    if (X.length === 2) out.push(i % 2 ? [X[1], X[0]] : [X[0], X[1]]);
  }
  return out;
};
const X0 = ALT[0] + 14, X1 = ALT[0] + SW - 14;
export const altSayfaCizim = (() => {
  const H = cizimHatlari();
  const seg = (h: [P, P], dy = 0) => { const k = kirpX(eD(h[0]), eD(h[1]), X0, X1); return k ? [[k[0][0], k[0][1] + dy], [k[1][0], k[1][1] + dy]] as P[] : null; };
  const H1 = seg(H.H1)!, H1b = seg(H.H1, -6)!, H2 = seg(H.H2)!, H3 = seg(H.H3)!, H4 = seg(H.H4)!;
  const M = H.M.map((m) => [eD(m[0]), eD(m[1])] as P[]).filter((m) => m[0][0] > X0 && m[0][0] < X1 && m[1][0] > X0 && m[1][0] < X1);
  const T1 = tara([H2[0], H2[1], H3[1], H3[0]]), T2 = tara([H3[0], H3[1], H4[1], H4[0]]);
  const kap = [26, 52].map((d) => { const a = H3[0], b = H3[1], t0 = (ALT[0] + 180 - a[0]) / (b[0] - a[0]), t1 = (ALT[0] + 620 - a[0]) / (b[0] - a[0]); return [[a[0] + (b[0] - a[0]) * t0, a[1] + (b[1] - a[1]) * t0 + d], [a[0] + (b[0] - a[0]) * t1, a[1] + (b[1] - a[1]) * t1 + d]] as P[]; });
  // yarasa: yerel x ≈ 409 (dekor 519) en yakın merteğin alın ucundan asılı
  const m4 = M.reduce((b, m) => (Math.abs(m[1][0] - 519) < Math.abs(b[1][0] - 519) ? m : b), M[0]);
  const ayak: P = [m4[1][0], m4[1][1] + 4], u = 150, gogus: P = [ayak[0], ayak[1] + 0.5 * u];
  const cati: { a: P[]; tur: "hat" | "tarama" }[] = [
    { a: H1, tur: "hat" }, { a: H1b, tur: "hat" }, { a: H2, tur: "hat" }, ...M.map((m) => ({ a: m, tur: "hat" as const })), { a: H3, tur: "hat" },
    ...T1.map((s) => ({ a: s as P[], tur: "tarama" as const })), ...T2.map((s) => ({ a: s as P[], tur: "tarama" as const })), ...kap.map((k) => ({ a: k, tur: "hat" as const })),
  ];
  const k = 1.0, tip: P = [gogus[0] + 6 * k, gogus[1] - 66 * k];
  // alev: üç dilli eğrisel kontur (örneklenmiş Bézier; kalem ucu bu noktaları izler)
  const bz = (a: P, c1: P, c2: P, b: P, n = 8) => Array.from({ length: n }, (_, i) => { const t = (i + 1) / n, m = 1 - t; return [m * m * m * a[0] + 3 * m * m * t * c1[0] + 3 * m * t * t * c2[0] + t * t * t * b[0], m * m * m * a[1] + 3 * m * m * t * c1[1] + 3 * m * t * t * c2[1] + t * t * t * b[1]] as P; });
  const A0: P[] = [[-16, 0], [-26, -18], [-20, -34], [-14, -46], [-10, -30], [-2, -52], [6, -66], [10, -46], [14, -36], [18, -50], [24, -26], [16, 0]];
  const G = A0.map(([x, y]) => [gogus[0] + x * k, gogus[1] + y * k] as P);
  const alev: P[] = [G[0], ...bz(G[0], G[1], G[2], G[3]), ...bz(G[3], [G[3][0] + 4, G[3][1] + 10], G[4], G[5]), ...bz(G[5], [G[5][0] + 2, G[5][1] - 8], G[6], G[6], 5),
    ...bz(G[6], [G[6][0] + 6, G[6][1] + 14], G[7], G[8]), ...bz(G[8], [G[8][0] + 2, G[8][1] - 6], G[9], G[9], 4), ...bz(G[9], G[10], [G[11][0] + 4, G[11][1] - 10], G[11]), G[0]];
  const h2y = (x: number) => H2[0][1] + ((H2[1][1] - H2[0][1]) * (x - H2[0][0])) / (H2[1][0] - H2[0][0]);
  const h1y = (x: number) => H1[0][1] + ((H1[1][1] - H1[0][1]) * (x - H1[0][0])) / (H1[1][0] - H1[0][0]);
  // alev çizgisi: göğüsten kirişe dalgalı tek dil, çatı hattında TEK büyük alev (sıra sıra dişler "çelenk" okunuyordu)
  const alevCizgi: P[] = [tip]; for (let y = tip[1] - 8, i = 0; y > h1y(tip[0]) + 2; y -= 12, i++) alevCizgi.push([tip[0] + (i % 2 ? 9 : -9), y]);
  const r0: P = [tip[0], h1y(tip[0])];
  ([[-26, 0], [-34, -30], [-16, -52], [-10, -38], [2, -78], [12, -44], [22, -60], [30, -24], [26, 0]] as P[]).forEach(([x, y]) => alevCizgi.push([r0[0] + x, r0[1] + y]));
  void h2y;
  return { cati, catiL: cati.reduce((s, c) => s + uz(c.a), 0), ayak, u, gogus, alev, alevCizgi, H2, H3 };
})();
const kesitCiz = (strokes: { a: P[] }[], L: number) => { // uzunluk kadar çizilmiş kısım + uç noktası
  let kalan = L, uc: P | null = null; const out: { a: P[]; tam: boolean; i: number }[] = [];
  strokes.forEach((s, i) => { if (kalan <= 0) return; const l = uz(s.a); if (kalan >= l) { out.push({ a: s.a, tam: true, i }); uc = s.a[s.a.length - 1]; kalan -= l; return; }
    const a: P[] = [s.a[0]]; let d = kalan; for (let j = 1; j < s.a.length; j++) { const sl = Math.hypot(s.a[j][0] - s.a[j - 1][0], s.a[j][1] - s.a[j - 1][1]); if (d >= sl) { a.push(s.a[j]); d -= sl; } else { a.push(noktaAt([s.a[j - 1], s.a[j]], d)); break; } }
    out.push({ a, tam: false, i }); uc = a[a.length - 1]; kalan = 0; });
  return { out, uc: uc as P | null };
};

// ---------- masa + defter zemini ----------
const elips = (R: number) => <ellipse cx={HAVUZ.c[0]} cy={HAVUZ.c[1]} rx={R} ry={R / 1.2} transform={`rotate(135 ${HAVUZ.c[0]} ${HAVUZ.c[1]})`} />;
const Havuz: React.FC<{ renk: [string, string, string] }> = ({ renk }) => (
  <g>
    <rect x={-900} y={-900} width={2900} height={4200} fill={renk[0]} />
    <g fill={renk[1]}>{elips(HAVUZ.R2)}</g>
    <g fill={renk[2]}>{elips(HAVUZ.R1)}</g>
    {[HAVUZ.R2, HAVUZ.R1].map((R, j) => <g key={j} fill="none" stroke={renk[j + 1]} strokeWidth={1.6}>{[0, 1, 2].map((i) => <g key={i} opacity={0.5 - i * 0.13}>{elips(R + 6 + i * 6)}</g>)}</g>)}
  </g>
);
const Masa: React.FC = () => (
  <g>
    <Havuz renk={[MY.masaDis, MY.masaOrta, MY.masa]} />
    {Array.from({ length: 120 }).map((_, i) => { const y = -800 + i * 32 + random(`md${i}`) * 18, a = 4 + random(`ma${i}`) * 8;
      return <path key={i} d={`M-900,${y} C0,${y - a} 600,${y + a} 2000,${y - a * 0.5}`} fill="none" stroke={MY.damar} strokeWidth={1.5 + random(`mw${i}`)} opacity={0.35} />; })}
    <line x1={HAVUZ.c[0] - 500} y1={HAVUZ.c[1] - 500} x2={HAVUZ.c[0] + 400} y2={HAVUZ.c[1] + 400} stroke={MY.cila} strokeWidth={60} opacity={0.15} strokeLinecap="round" />
  </g>
);
const Sayfa: React.FC<{ o: P; id: string; kose: "ust" | "alt" }> = ({ o, id, kose }) => (
  <g>
    <clipPath id={id}><rect x={o[0]} y={o[1]} width={SW} height={SH} /></clipPath>
    <g clipPath={`url(#${id})`}><Havuz renk={[MY.kagitDis, MY.kagit, MY.kagitCek]} />
      {Array.from({ length: 8 }).map((_, i) => <circle key={i} cx={o[0] + random(`lk${id}${i}`) * SW} cy={o[1] + random(`ly${id}${i}`) * SH} r={10 + random(`lr${id}${i}`) * 20} fill={MY.leke} opacity={0.06} />)}
      <rect x={o[0]} y={o[1]} width={SW} height={SH} fill="none" stroke="#c9b48f" strokeWidth={16} opacity={0.45} />
    </g>
    {kose === "alt" ? <path d={`M${o[0] + SW - 46},${o[1] + SH} L${o[0] + SW},${o[1] + SH - 46} L${o[0] + SW},${o[1] + SH} Z`} fill={MY.kagitKose} /> : <path d={`M${o[0] + SW - 40},${o[1]} L${o[0] + SW},${o[1] + 40} L${o[0] + SW},${o[1]} Z`} fill={MY.kagitKose} />}
  </g>
);
const Notlar: React.FC<{ o: P; xs: [number, number][]; seed: string }> = ({ o, xs, seed }) => (
  <g stroke={MY.murekkep} strokeWidth={2.5} strokeLinecap="round" opacity={0.7}>{xs.flatMap(([a, b], k) => Array.from({ length: 4 }).map((_, i) => { const y = o[1] + 90 + i * 34 + k * 300, w = (b - a) * (0.5 + 0.5 * random(`nt${seed}${k}${i}`)); return <line key={`${k}${i}`} x1={o[0] + a} x2={o[0] + a + w} y1={y} y2={y + (random(`nn${seed}${k}${i}`) - 0.5) * 3} />; }))}</g>
);

// ---------- üst sayfa: mağara + sürü ----------
export const DEFTER_SURU: SuruAyar = { n: 90, seed: 223, kaynak: [540, 1080], a: 10, b: 0.06, yon: -1, omega: 0.05, yukselis: 0.75, egim: 0.3, kayma: 0.2, u: [3.5, 11], mod: "surekli", donem: 760, stil: "dolu" };
const UstSayfa: React.FC<{ prm: Record<string, unknown>; p: number }> = ({ prm, p }) => {
  const o = UST, L = (x: number, y: number): P => [o[0] + x, o[1] + y];
  const suru = { ...DEFTER_SURU, ...((prm.suru as Partial<SuruAyar>) ?? {}) }, canli = prm.canli !== false, pe = canli ? p : 0;
  const kaya = [430, 470, 505, 575, 620].map((y0, i) => { const A: P[] = []; for (let x = 120; x <= 760; x += 20) A.push(L(x, y0 + (random(`ky${i}${x}`) - 0.5) * 8 + (x - 120) * 0.05 + Math.sin(x / 60 + i) * 5)); return A; });
  const agiz = `M${L(280, 525)} C${L(300, 470)} ${L(380, 455)} ${L(440, 460)} C${L(520, 462)} ${L(575, 490)} ${L(580, 540)} C${L(520, 575)} ${L(360, 580)} ${L(280, 525)} Z`.replace(/(\d+\.?\d*),(\d+\.?\d*)/g, "$1,$2");
  const kesik = (A: P[], i: number) => (i === 0 || i === 4 ? [A] : [A.filter((q) => q[0] < o[0] + 270), A.filter((q) => q[0] > o[0] + 590)]);
  return (
    <g>
      <clipPath id="myUstKlip"><rect x={o[0]} y={o[1]} width={SW} height={SH} /></clipPath>
      <g clipPath="url(#myUstKlip)">
        {kaya.map((A, i) => kesik(A, i).map((B, j) => B.length > 1 ? <polyline key={`${i}${j}`} points={pts(B)} fill="none" stroke={MY.murekkep} strokeWidth={i === 0 ? 3.5 : 2.5} strokeLinecap="round" /> : null))}
        {[[150, 440], [640, 515], [700, 585], [200, 585]].map(([x, y], g) => <g key={g} stroke={MY.murekkep} strokeWidth={2.5} strokeLinecap="round">{Array.from({ length: 8 }).map((_, i) => { const q = L(x + i * 7, y); return <line key={i} x1={q[0]} y1={q[1]} x2={q[0] + 7} y2={q[1] + 22} />; })}</g>)}
        {[[230, 425], [470, 418], [690, 432]].map(([x, y], i) => <g key={i} stroke={MY.murekkep} strokeWidth={2.5} strokeLinecap="round">{[-50, -25, 0, 25, 50].map((a) => { const q = L(x, y), r = (a * Math.PI) / 180; return <line key={a} x1={q[0]} y1={q[1]} x2={q[0] + Math.sin(r) * 20} y2={q[1] - Math.cos(r) * 22} />; })}</g>)}
        {prm.magara !== false && <g><path d={agiz} fill={MY.lavis} opacity={0.6} stroke="none" />
          <polygon points={pts([L(320, 528), L(350, 505), L(420, 498), L(470, 512), L(540, 515), L(555, 536), L(480, 552), L(400, 556), L(340, 548)])} fill={MY.cekirdek} />
          <g stroke={MY.murekkep} strokeWidth={2.5} strokeLinecap="round">{Array.from({ length: 9 }).map((_, i) => { const q = L(300 + i * 28, 470 + (i % 3) * 4); return <line key={i} x1={q[0]} y1={q[1]} x2={q[0] + 8} y2={q[1] + 26} />; })}</g>
          <polyline points={pts([L(270, 470), L(330, 452), L(410, 448), L(470, 455), L(560, 470), L(600, 500)])} fill="none" stroke={MY.murekkep} strokeWidth={3.5} strokeLinecap="round" />
          <g stroke={MY.murekkep} strokeWidth={2.5} opacity={0.8}>{Array.from({ length: 6 }).map((_, i) => <g key={i}><line x1={L(395 + i * 12, 512)[0]} y1={L(0, 512)[1]} x2={L(405 + i * 12, 540)[0]} y2={L(0, 540)[1]} /><line x1={L(405 + i * 12, 512)[0]} y1={L(0, 512)[1]} x2={L(395 + i * 12, 540)[0]} y2={L(0, 540)[1]} /></g>)}</g></g>}
        {Array.from({ length: 4 }).map((_, i) => <path key={i} d={akisYolu(suru, (i / 4) * 2 * Math.PI + 0.4, 760)} fill="none" stroke={MY.murekkep} strokeWidth={2.5} strokeDasharray="18 14" strokeDashoffset={-pe * 0.667} opacity={0.4} />)}
        <Suru A={suru} p={pe} />
      </g>
      {prm.notlar !== false && <Notlar o={o} xs={[[20, 100], [770, 840]]} seed="u" />}
    </g>
  );
};

// ---------- alt sayfa: saçak + yarasa (+ P03 alev) ----------
type AltP = { cati?: Zaman; yarasa?: Zaman; gogus_bos?: boolean; durak?: Ar; alev?: Zaman; alev_cizgi?: Zaman; kirmizi?: Zaman; geri?: Ar; notlar?: boolean };
type Uc = { uc: P; h: number } | null; // kalem ucu (dekor) + yükseklik (cm)
const altAktif = (a: AltP, p: number): Uc => {
  const C = altSayfaCizim;
  const ar = (z: Zaman): z is Ar => !!z && z !== true;
  if (ar(a.cati) && p >= a.cati.bas && p <= a.cati.bit) { const r = kesitCiz(C.cati, ilerle(a.cati, p) * C.catiL); if (r.uc) return { uc: r.uc, h: 0 }; }
  if (ar(a.yarasa) && p >= a.yarasa.bas && p <= a.yarasa.bit) { const t = ilerle(a.yarasa, p); return { uc: [C.ayak[0] + Math.sin(t * 9) * 40, C.ayak[1] + t * 120], h: 0 }; }
  if (a.durak && p >= a.durak.bas && p <= a.durak.bit) return { uc: C.gogus, h: 0 };
  if (ar(a.alev) && p >= a.alev.bas && p <= a.alev.bit) return { uc: noktaAt(C.alev, ilerle(a.alev, p) * uz(C.alev)), h: 0 };
  if (ar(a.alev_cizgi) && p >= a.alev_cizgi.bas && p <= a.alev_cizgi.bit) return { uc: noktaAt(C.alevCizgi, ilerle(a.alev_cizgi, p) * uz(C.alevCizgi)), h: 0 };
  return null;
};
const AltSayfa: React.FC<{ a: AltP; p: number }> = ({ a, p }) => {
  const C = altSayfaCizim;
  const geri = a.geri ? 1 - interpolate(p, [a.geri.bas, a.geri.bit], [0, 1], cl) : 1;
  const cati = kesitCiz(C.cati, ilerle(a.cati, p) * C.catiL);
  const ar = (z: Zaman): z is Ar => !!z && z !== true;
  const t0 = ar(a.cati) ? a.cati.bas : -99, tL = ar(a.cati) ? a.cati.bit - a.cati.bas : 1;
  const kx = interpolate(ilerle(a.kirmizi, p), [0, 1], [X0 - 10, X1 + 10]);
  const yar = ilerle(a.yarasa ?? true, p) * geri, alv = ilerle(a.alev, p) * geri, alc = ilerle(a.alev_cizgi, p) * geri;
  const dmla = a.durak ? interpolate(p, [a.durak.bas, a.durak.bit], [3, 4.5], cl) : 0;
  let birikim = 0;
  return (
    <g>
      {cati.out.map((s) => {
        const l0 = birikim; birikim += uz(C.cati[s.i].a);
        const bitis = t0 + (birikim / C.catiL) * tL, islak = p - bitis < 24 && ar(a.cati);
        const tarama = C.cati[s.i].tur === "tarama", mx = (s.a[0][0] + s.a[s.a.length - 1][0]) / 2;
        const renk = tarama && mx < kx ? MY.kirmizi : islak ? MY.islak : MY.murekkep;
        void l0;
        return <polyline key={s.i} points={pts(s.a)} fill="none" stroke={renk} strokeWidth={tarama ? 2.5 : 3.5} strokeLinecap="round" strokeLinejoin="round" />;
      })}
      {yar > 0 && <Yarasa z={{ x: C.ayak[0], y: C.ayak[1], capa: "ayak", u: C.u, aci: 180, kanat: 0.7, stil: "murekkep", ciz: yar, gogusBos: a.gogus_bos && alv <= 0 }} />}
      {dmla > 0 && p <= (a.durak?.bit ?? 0) + 2 && <circle cx={C.gogus[0]} cy={C.gogus[1]} r={dmla} fill={MY.islak} />}
      {alv > 0 && <polygon points={pts(C.alev)} fill="none" stroke={MY.kirmizi} strokeWidth={3.5} strokeLinejoin="round" pathLength={1} strokeDasharray={`${alv} 1.02`} />}
      {alv >= 1 && <path d={`M${C.gogus[0] - 10},${C.gogus[1] - 6} Q${C.gogus[0]},${C.gogus[1] - 48} ${C.gogus[0] + 7},${C.gogus[1] - 9}`} fill="none" stroke={MY.kirmizi} strokeWidth={3} />}
      {alc > 0 && <polyline points={pts(C.alevCizgi)} fill="none" stroke={MY.kirmizi} strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round" pathLength={1} strokeDasharray={`${alc} 1.02`} />}
      {a.notlar !== false && <Notlar o={ALT} xs={[[740, 840]]} seed="a" />}
    </g>
  );
};

// ---------- kalem + el ----------
// Kalem tutan el: TEK PARÇA siluet (Paris dersi: iç dikiş/bant/tırnak yok; havada tek parmak yok). Yerel çerçeve: x kalem ekseni boyunca
// uçtan geriye (cm), y eksene dik (+ = kâğıda doğru/sağ-alt). İşaret parmağı kalemin üstünde, başparmak karşı yanda, diğerleri avuca kıvrık;
// bilek → manşet → kol kadraj dışına. Ölçek: bilekten parmak ucuna ≈ 16 cm (gerçek 18–19; insert'te çizimi örtmesin diye ×0.85, raporda).
const KALEM_ACI = 15, KALEM_L = 14 * PXCM, EL_OLCEK = 0.85;
const Kalem: React.FC<{ uc: P; h: number; tip: KolTip }> = ({ uc, h, tip }) => {
  const v: P = [Math.cos((KALEM_ACI * Math.PI) / 180), Math.sin((KALEM_ACI * Math.PI) / 180)], n: P = [-v[1], v[0]];
  const at = (L: number, w: number, hh: number): P => { const g = 0.71 * hh * PXCM; return [uc[0] + v[0] * L + n[0] * w + g, uc[1] + v[1] * L + n[1] * w + g]; };
  const govde = (gh: (L: number) => number, L0 = 1.2 * PXCM) => [at(L0, -12, gh(L0)), at(KALEM_L, -17, gh(KALEM_L)), at(KALEM_L, 17, gh(KALEM_L)), at(L0, 12, gh(L0))];
  const uc3 = (gh: (L: number) => number) => [at(0, 0, gh(0)), at(1.3 * PXCM, -12, gh(1.3 * PXCM)), at(1.3 * PXCM, 12, gh(1.3 * PXCM))];
  const yuk = (L: number) => h + (L / KALEM_L) * 4.5; // cm: uç h, arka uç +4.5
  const sifir = () => 0;
  const Telx = (hh: number) => { const g = 0.71 * hh * PXCM; return `translate(${uc[0] + g},${uc[1] + g}) rotate(${KALEM_ACI}) scale(${PXCM * EL_OLCEK})`; };
  return (
    <g>
      <g opacity={0.55}><polygon points={pts(govde(yuk))} fill={MY.golge} /><polygon points={pts(uc3(yuk))} fill={MY.golge} /></g>
      <g transform={Telx(h + 2.6)} opacity={0.55}><ElSiluet tip={tip} golge={MY.golge} /></g>
      <polygon points={pts(uc3(sifir))} fill={MY.uc} stroke={MY.murekkep} strokeWidth={2.5} strokeLinejoin="round" />
      <polygon points={pts(govde(sifir))} fill={MY.kalem} stroke="#1f2129" strokeWidth={3} strokeLinejoin="round" />
      <g transform={Telx(0)}><ElSiluet tip={tip} isikY={-0.5} /></g>
      {/* işaret parmağının üstünden çıkan arka gövde (kalem elin üstünde yatar) */}
      <polygon points={pts(govde(sifir, EL_CIKIS * PXCM * EL_OLCEK))} fill={MY.kalem} stroke="#1f2129" strokeWidth={3} strokeLinejoin="round" />
      <line x1={at((EL_CIKIS + 0.3) * PXCM * EL_OLCEK, -9, 0)[0]} y1={at((EL_CIKIS + 0.3) * PXCM * EL_OLCEK, -9, 0)[1]} x2={at(KALEM_L - 10, -11, 0)[0]} y2={at(KALEM_L - 10, -11, 0)[1]} stroke={MY.kalemIsik} strokeWidth={4} strokeLinecap="round" />
    </g>
  );
};
// kalem ucu: aktif çizim varsa onun ucu; yoksa önceki uç → sonraki başlangıç arası geçiş (havada 0.8 cm)
const kalemDurum = (a: AltP, p: number, kal: Record<string, unknown>): Uc => {
  const ak = altAktif(a, p); if (ak) return ak;
  const adim: number[] = []; for (let q = 0; q <= 1200; q += 3) adim.push(q);
  let once: { p: number; u: P } | null = null, sonra: { p: number; u: P } | null = null;
  for (let q = Math.floor(p); q >= Math.max(0, p - 600); q -= 2) { const r = altAktif(a, q); if (r) { once = { p: q, u: r.uc }; break; } }
  for (let q = Math.ceil(p); q <= p + 600; q += 2) { const r = altAktif(a, q); if (r) { sonra = { p: q, u: r.uc }; break; } }
  const cik = kal.cikis as Ar | undefined;
  if (once && cik && p >= cik.bas) { const t = interpolate(p, [cik.bas, cik.bit], [0, 1], cl); return { uc: [once.u[0] + t * 900, once.u[1] + t * 900], h: 0.8 + t * 6 }; }
  if (once && sonra) { const t = GIRIS((p - once.p) / Math.max(1, sonra.p - once.p)); const yay = Math.sin(Math.PI * t); return { uc: [once.u[0] + (sonra.u[0] - once.u[0]) * t, once.u[1] + (sonra.u[1] - once.u[1]) * t], h: 0.8 * yay + 0.2 }; }
  if (once) return { uc: once.u, h: Math.min(0.8, (p - once.p) / 10) };
  if (sonra) return { uc: sonra.u, h: Math.min(0.8, (sonra.p - p) / 10) };
  return null;
};

// ---------- sahne ----------
const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const k = kameraHesapla(plan.kamera, p);
  const df = param<{ dx?: number; dy?: number } | false>(plan, "defter", {});
  const ust = param<Record<string, unknown> | false>(plan, "ust_sayfa", {}), alt = param<AltP | false>(plan, "alt_sayfa", {});
  const kal = param<Record<string, unknown> | false>(plan, "kalem", false), nes = param<Nesne[]>(plan, "nesneler", []);
  const vin = param<{ kare: number[]; deger: number[] } | null>(plan, "vinyet", null), vinD = vin ? interpolate(p, vin.kare, vin.deger, cl) : 0;
  const dx = df ? df.dx ?? 0 : 0, dy = df ? df.dy ?? 0 : 0;
  const kd = kal && alt ? kalemDurum(alt, p, kal) : null;
  const E = (q: P): P => [540 + k.cx + (q[0] + dx - 540) * k.cs, 960 + k.cy + (q[1] + dy - 960) * k.cs];
  if (kd) kilit.push({ ad: "kalem ucu", p: E(kd.uc), tur: "temas" });
  if (alt && (alt.alev || alt.durak)) kilit.push({ ad: "göğüs/alev", p: E(altSayfaCizim.gogus), tur: "dokunus" });
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <g transform={katDonusum(k)}>
        <Masa />
        {df && <g transform={`translate(${dx},${dy})`}>
          <rect x={UST[0] - 13 + 23} y={UST[1] - 13 + 23} width={SW + 26} height={SH * 2 + 36 + 26} fill={MY.golge} opacity={0.55} />
          <rect x={UST[0] - 13} y={UST[1] - 13} width={SW + 26} height={SH * 2 + 36 + 26} rx={6} fill={MY.bez} />
          <Sayfa o={UST} id="myS1" kose="ust" /><Sayfa o={ALT} id="myS2" kose="alt" />
          <rect x={UST[0]} y={UST[1] + SH} width={SW} height={36} fill={MY.oluk} />
          <rect x={UST[0]} y={UST[1] + SH - 24} width={SW} height={24} fill={MY.kagitDis} opacity={0.8} /><rect x={ALT[0]} y={ALT[1]} width={SW} height={24} fill={MY.kagitDis} opacity={0.8} />
          {[0, 1, 2].map((i) => <line key={i} x1={UST[0] + 300 + i * 9} y1={UST[1] + SH + 6} x2={UST[0] + 306 + i * 9} y2={UST[1] + SH + 30} stroke={MY.murekkep} strokeWidth={2.5} opacity={0.5} />)}
          {ust && <UstSayfa prm={ust} p={p} />}
          {alt && <AltSayfa a={alt} p={p} />}
        </g>}
        {nes.map((n, i) => <MasaNesne key={i} n={n} p={p} />)}
        {kd && kal && <g transform={`translate(${dx},${dy})`}><Kalem uc={kd.uc} h={kd.h} tip={(kal.el as KolTip) ?? "adams"} /></g>}
      </g>
      {vinD > 0 && <><defs><radialGradient id="myVin" cx="50%" cy="50%" r="75%"><stop offset="55%" stopColor="#2f2c45" stopOpacity={0} /><stop offset="100%" stopColor="#2f2c45" stopOpacity={1} /></radialGradient></defs><rect width={1080} height={1920} fill="url(#myVin)" opacity={vinD} /></>}
    </svg>
  );
};
export const MASA_YB: Sablon = { Sahne, arsiv: () => "kagit" };
void (null as unknown as Plan);
