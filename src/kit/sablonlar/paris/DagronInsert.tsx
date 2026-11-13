// ===== KE-PK-S3 DAGRON-INSERT v2 (Paris kuşatması 1870; mekanlar.md §3v2 · tasarım §3.2, §4.3, §4.5–4.7, §13/§14) =====
// Görünümler: `masa` (mekan "paris-atolye" P05 | "tours-buro" P09) · `kafes` (P04b taşra inişi).
// masa: MasaPerspektif (dagronDunya: kamera masanın 0.42 m üstünde, 35° aşağı, F 1176). Her nesne 3B izdüşüm; plan kamerası (cs/cx/cy) 2B zoom.
//   TEK IŞIK ISIK_ATOLYE (kış güneşi 18°, sol-önden): gölge = golgeMasa(), ışık alan yüz = isikta(), kenar ışığı sol/üst, tarama 143° yalnız cisim gölgesinde.
// kafes: pinhole (montmartreDunya Kam; F 1500, göz 1.15 m, kafes ön yüzü 1.25 m), ışık gunMontmartre; gök GokBasamak (B3 taramalı geçiş).
// Eller: KolEl `dagronSepya` (düğmesiz sepya manşet) — Dagron; kafes kapağını açan el `parisGri` (taşrada inen aeronot, yüzsüz).
// Görüntüde dil metni yok (satırlar dil-nötr). Kırmızı yok, sarı metal yok; imza kehribarı yalnız P09 kılıfında (sahne C* ≤ 28).
import React, { useId } from "react";
import { interpolate } from "remotion";
import { RenkKaydi, Desen } from "../../../doku/Tarama";
import { rnd } from "../../../doku/sabitler";
import type { P, Plan } from "../../tipler";
import { cl, CIKIS, ekranNokta, GIRIS, INOUT, kameraHesapla, katDonusum } from "../../zaman";
import { param, Sablon, SablonProps } from "../../ortak";
import { cirpis, Guvercin, KusPoz, KUS_POZ, kusAyakEkran, kusYerlesim, pozKaris } from "../../props/paris/Guvercin";
import { Kilif, KILIF } from "../../props/paris/Kilif";
import { Sayfa } from "../../props/paris/Sayfa";
import { ElDurum, elGeometri, ParisEl } from "../../props/paris/ParisEl";
import { Balon, SepetArka, SepetOn, SepetPoz } from "../../props/paris/Balon";
import { pchip } from "../galata/GalataTepe";
import { DP, golgeMasa, MASA, masaTers, mp, mpx, mz, V3 } from "./dagronDunya";
import { agacGolge, CiplakAgac, GokBasamak } from "./montmartreDekor";
import { golgeCokgen, Kam, PAL, pr, pxm as pxmK, rng, zarf } from "./montmartreDunya";
import type { KolIsik } from "../../../rig/RigIsik";

type Ar = { bas: number; bit: number; temas?: number };
const ar = (v: unknown, d: Ar): Ar => (v && typeof v === "object" && typeof (v as Ar).bas === "number" ? (v as Ar) : d);
const anim = (plan: Plan, ad: string, d: Ar): Ar => ar(((plan.parametreler?.animasyonlar as (Ar & { ad: string })[] | undefined) ?? []).find((a) => a.ad === ad), d);
const t01 = (p: number, a: number, b: number, e: (t: number) => number = INOUT) => interpolate(p, [a, b], [0, 1], { ...cl, easing: e });
const yol = (kare: number[], v: number[][], q: number): number[] => v[0].map((_, i) => pchip(kare, v.map((r) => r[i]), q));
const pt = (a: P[]) => a.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(" ");
const dYol = (a: P[], kapali = true) => (a.length ? `M${a.map((q) => `${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join("L")}${kapali ? "Z" : ""}` : "");
const S = 163; // DOKU_SEED.dagronMasa
// KolEl ışığı (ekranda ışığa doğru yön = gölge yönünün tersi), sıcak kenar, 143° tarama
const EL_ISIK: KolIsik = { yon: [-0.84, 0.55], renk: DP.kenar, aci: 143, sertlik: 0.75, murekkep: DP.murekkep };

// ------------------------------------------------------------------ masa yardımcıları ------------------------------------------------------------------
const kutuKose = (X0: number, X1: number, Y0: number, Y1: number, h0: number, h1: number): V3[] => [[X0, Y0, h0], [X1, Y0, h0], [X1, Y1, h0], [X0, Y1, h0], [X0, Y0, h1], [X1, Y0, h1], [X1, Y1, h1], [X0, Y1, h1]];
/** 3B nokta kümesinin gölgesi (masa + duvar) — ekranda dışbükey zarf; tabanı da içerir */
const golgePoly = (v: V3[]): P[] => {
  const taban = v.filter((q) => q[2] <= 0.001).map((q) => mp(q[0], q[1], 0));
  return zarf([...taban, ...v.map((q) => mp(...golgeMasa(q[0], q[1], q[2])))] as [number, number][]) as P[];
};
const daire = (c: V3, r: number, duzlem: "yatay" | "on", n = 28): P[] => Array.from({ length: n }, (_, i) => {
  const a = (i / n) * Math.PI * 2;
  return duzlem === "yatay" ? mp(c[0] + Math.cos(a) * r, c[1] + Math.sin(a) * r, c[2]) : mp(c[0] + Math.cos(a) * r, c[1], c[2] + Math.sin(a) * r);
});
const daire3 = (c: V3, r: number, duzlem: "yatay" | "on", n = 20): V3[] => Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return duzlem === "yatay" ? [c[0] + Math.cos(a) * r, c[1] + Math.sin(a) * r, c[2]] : [c[0] + Math.cos(a) * r, c[1], c[2] + Math.sin(a) * r]; });
/** masa düzleminde dikdörtgen (merkez, açı φ masa düzleminde, boy × en), h yüksekliğinde → 4 köşe ekran */
const masaDik = (c: V3, phi: number, L: number, W: number): [P, P, P, P] => {
  const u: [number, number] = [Math.cos(phi), Math.sin(phi)], n: [number, number] = [-u[1], u[0]];
  const k = (a: number, b: number): P => mp(c[0] + u[0] * a + n[0] * b, c[1] + u[1] * a + n[1] * b, c[2]);
  // sıra: sol-üst, sağ-üst, sağ-alt, sol-alt (u = sağa, n = ileri → ekranda yukarı)
  return [k(-L / 2, W / 2), k(L / 2, W / 2), k(L / 2, -W / 2), k(-L / 2, -W / 2)];
};
const SAYFA_RENK = { yuz: DP.sayfa, satir: DP.satir, kat: DP.kat, kontur: "#5a4a52" };

// ---- masa yüzeyi: tahtalar soldan sağa (damar yatay), derz 3 px, budak 1 ----
const MasaYuzey: React.FC<{ seed: number }> = ({ seed }) => {
  const derz = [1, 2, 3, 4, 5].map((k) => MASA.arkaY - 0.22 * k);
  const ust = mp(0, MASA.arkaY)[1];
  const damar: React.ReactNode[] = [];
  const r = rng(seed);
  for (let b = 0; b < 6; b++) {
    const Y1 = MASA.arkaY - 0.22 * b, Y0 = Y1 - 0.22;
    const n = 3 + Math.floor(r() * 3);
    for (let i = 0; i < n; i++) {
      const Yc = Y0 + 0.03 + r() * 0.16, X0 = -0.9 + r() * 0.5, X1 = X0 + 0.5 + r() * 1.0, faz = r() * 6;
      const q: P[] = [];
      for (let j = 0; j <= 24; j++) { const X = X0 + ((X1 - X0) * j) / 24; q.push(mp(X, Yc + 0.004 * Math.sin(X * 9 + faz) + 0.002 * Math.sin(X * 23 + faz), 0)); }
      // uçlara doğru incelen damar: iki çizgi (orta kalın)
      damar.push(<path key={`d${b}.${i}`} d={dYol(q, false)} stroke={DP.damarIsik} strokeWidth={2.5} strokeOpacity={0.45} fill="none" strokeLinecap="round" />);
      damar.push(<path key={`e${b}.${i}`} d={dYol(q.slice(6, 19), false)} stroke={DP.damarIsik} strokeWidth={1.6} strokeOpacity={0.35} fill="none" transform="translate(0 2)" strokeLinecap="round" />);
    }
  }
  const budak = mp(0.36, 0.7, 0);
  return (
    <g>
      <rect x={-600} y={ust} width={2400} height={3000} fill={DP.masa} />
      {damar}
      <ellipse cx={budak[0]} cy={budak[1]} rx={22} ry={9} fill="none" stroke={DP.damarGolge} strokeWidth={2.5} strokeOpacity={0.55} />
      <ellipse cx={budak[0]} cy={budak[1]} rx={9} ry={3.5} fill={DP.damarGolge} fillOpacity={0.5} />
      {derz.map((Y, i) => { const y = mp(0, Y)[1]; return <line key={i} x1={-600} y1={y} x2={1800} y2={y} stroke={DP.derz} strokeWidth={3} />; })}
      <line x1={-600} y1={ust} x2={1800} y2={ust} stroke={DP.kontur} strokeWidth={4} />
    </g>
  );
};

// ---- Paris badanası: pencere sövesinin gölge kaması (sol-üst), raf + 7 cam levha + 2 kutu ----
const DuvarParis: React.FC<{ uid: string }> = ({ uid }) => {
  const ust = mp(0, MASA.arkaY)[1];
  const W = (X: number, h: number) => mp(X, MASA.arkaY, h);
  const rafH = 0.35, rafD = 0.14;
  const raf = [W(-0.62, rafH), W(-0.12, rafH), mp(-0.12, MASA.arkaY - rafD, rafH), mp(-0.62, MASA.arkaY - rafD, rafH)];
  const rafAlt = [mp(-0.62, MASA.arkaY - rafD, rafH), mp(-0.12, MASA.arkaY - rafD, rafH), mp(-0.12, MASA.arkaY - rafD, rafH - 0.02), mp(-0.62, MASA.arkaY - rafD, rafH - 0.02)];
  const levha = Array.from({ length: 7 }, (_, i) => {
    const X = -0.58 + i * 0.035 + (i > 3 ? 0.012 : 0), Y = MASA.arkaY - 0.07, h1 = rafH + 0.11 - (i % 3) * 0.004;
    return { yuz: [mp(X, Y - 0.05, rafH), mp(X, Y + 0.05, rafH), mp(X, Y + 0.05, h1), mp(X, Y - 0.05, h1)], kenar: [mp(X, Y - 0.05, h1), mp(X, Y - 0.05, rafH)] as P[] };
  });
  const kutu1 = kutuKose(-0.31, -0.2, MASA.arkaY - 0.12, MASA.arkaY - 0.02, rafH, rafH + 0.08), kutu2 = kutuKose(-0.19, -0.13, MASA.arkaY - 0.11, MASA.arkaY - 0.03, rafH, rafH + 0.05);
  const kutuCiz = (v: V3[], i: number) => {
    const on = [mp(...v[0]), mp(...v[1]), mp(...v[5]), mp(...v[4])], ust_ = [mp(...v[4]), mp(...v[5]), mp(...v[6]), mp(...v[7])];
    return <g key={i}><polygon points={pt(ust_)} fill={DP.raf} stroke={DP.kontur} strokeWidth={2.5} /><polygon points={pt(on)} fill={DP.rafGolge} stroke={DP.kontur} strokeWidth={2.5} /></g>;
  };
  return (
    <g>
      <rect x={-600} y={-1200} width={2400} height={ust + 1200} fill={DP.badana} />
      {/* kabarma lekeleri (α .06) */}
      <ellipse cx={720} cy={420} rx={120} ry={40} fill={DP.badanaGolge} opacity={0.06} />
      <ellipse cx={930} cy={160} rx={80} ry={30} fill={DP.badanaGolge} opacity={0.06} />
      {/* pencere sövesinin gölge kaması — net kenar, kenarında 40 px tarama */}
      <defs>
        <clipPath id={`${uid}kama`}><polygon points={pt([[-600, -1200], [330, -1200], [300, 0], [0, 420], [-600, 900]])} /></clipPath>
        <Desen id={`${uid}kt`} aci={143} aralik={7} kalin={2} renk={DP.badanaTarama} alfa={0.6} seed={S + 3} />
      </defs>
      <polygon points={pt([[-600, -1200], [330, -1200], [300, 0], [0, 420], [-600, 900]])} fill={DP.badanaGolge} />
      <g clipPath={`url(#${uid}kama)`}><polygon points={pt([[300, 0], [0, 420], [-40, 390], [262, -30]])} fill={`url(#${uid}kt)`} /></g>
      {/* raf: konsollu tek tahta, altı taranır */}
      {[-0.56, -0.2].map((X, i) => { const a = W(X, rafH - 0.02), b = W(X, rafH - 0.1), c = mp(X, MASA.arkaY - rafD + 0.02, rafH - 0.02); return <polygon key={i} points={pt([a, b, c])} fill={DP.rafGolge} stroke={DP.kontur} strokeWidth={2.5} />; })}
      <polygon points={pt(raf)} fill={DP.raf} stroke={DP.kontur} strokeWidth={2.5} />
      <polygon points={pt(rafAlt)} fill={DP.rafGolge} stroke={DP.kontur} strokeWidth={2.5} />
      <polygon points={pt([W(-0.62, rafH - 0.02), W(-0.12, rafH - 0.02), mp(-0.12, MASA.arkaY - rafD, rafH - 0.02), mp(-0.62, MASA.arkaY - rafD, rafH - 0.02)])} fill={`url(#${uid}kt)`} />
      {levha.map((l, i) => <g key={i}><polygon points={pt(l.yuz)} fill={DP.camYuz} stroke={DP.kontur} strokeWidth={2} /><polyline points={pt(l.kenar)} stroke={DP.camKenar} strokeWidth={2.5} fill="none" /></g>)}
      {kutuCiz(kutu1, 1)}{kutuCiz(kutu2, 2)}
    </g>
  );
};

// ---- Tours: çıplak tuffeau iç duvar, blok 0.55 × 0.30, her sıra derzli; sol-üstte söve yanağı (ébrasement), kemer yok ----
const DuvarTours: React.FC<{ uid: string }> = ({ uid }) => {
  const ust = mp(0, MASA.arkaY)[1];
  const W = (X: number, h: number) => mp(X, MASA.arkaY, h);
  const sira: React.ReactNode[] = [];
  for (let k = 0; k < 6; k++) {
    const h = 0.3 * k + 0.02, y = W(0, h)[1];
    sira.push(<line key={`s${k}`} x1={-600} y1={y} x2={1800} y2={y} stroke={DP.derzIsik} strokeWidth={3} />);
    for (let j = -4; j <= 4; j++) {
      const X = j * 0.55 + (k % 2 ? 0.275 : 0) + (rnd(S + 5, `${k}.${j}`) - 0.5) * 0.05;
      const a = W(X, h), b = W(X, h + 0.3);
      sira.push(<line key={`d${k}.${j}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={DP.derzIsik} strokeWidth={3} />);
    }
  }
  // söve yanağı: duvar düzlemine dik, pencere açıklığının sol yüzü — ışıkta (kaynak pencerenin kendisi)
  const yanak = [W(-0.42, 0.5), W(-0.42, 1.6), mp(-0.42, MASA.arkaY - 0.22, 1.6), mp(-0.42, MASA.arkaY - 0.22, 0.5)];
  return (
    <g>
      <rect x={-600} y={-1200} width={2400} height={ust + 1200} fill={DP.tuffeau} />
      {sira}
      <defs><Desen id={`${uid}yt`} aci={143} aralik={7} kalin={2} renk={DP.derzGolge} alfa={0.5} seed={S + 7} /></defs>
      <polygon points={pt([[-600, -1200], W(-0.42, 1.6), W(-0.42, 0.5), [-600, ust]])} fill={DP.tuffeauGolge} />
      <polygon points={pt(yanak)} fill={DP.tuffeau} stroke={DP.kontur} strokeWidth={3} />
      <polygon points={pt([W(-0.42, 0.5), W(-0.42, 1.6), [W(-0.42, 1.6)[0] + 40, W(-0.42, 1.6)[1]], [W(-0.42, 0.5)[0] + 40, W(-0.42, 0.5)[1]]])} fill={`url(#${uid}yt)`} />
    </g>
  );
};

// ---- terazi: kaide + direk + kol (θ) + 2 zincir çifti + 2 kefe (çelik gri, pirinç yok) ----
type Terazi = { X: number; Y: number; teta: number };
const TERAZI = { kol: 0.35, direk: 0.3, pivot: 0.285, zincir: 0.17, kefeR: 0.09 };
const teraziUc = (t: Terazi, i: -1 | 1): V3 => { const r = (t.teta * Math.PI) / 180; return [t.X + i * (TERAZI.kol / 2) * Math.cos(r), t.Y, TERAZI.pivot + i * (TERAZI.kol / 2) * Math.sin(r)]; };
const kefeMerkez = (t: Terazi, i: -1 | 1): V3 => { const u = teraziUc(t, i); return [u[0], u[1], u[2] - TERAZI.zincir]; };
const teraziGolge = (t: Terazi): P[][] => {
  const cubuk = (a: V3, b: V3) => { const n = 10, q: P[] = []; for (let i = 0; i <= n; i++) { const v: V3 = [a[0] + ((b[0] - a[0]) * i) / n, a[1] + ((b[1] - a[1]) * i) / n, a[2] + ((b[2] - a[2]) * i) / n]; q.push(mp(...golgeMasa(...v))); } return q; };
  const kalin = (q: P[], w: number): P[] => [...q.map((p) => [p[0] - w, p[1]] as P), ...[...q].reverse().map((p) => [p[0] + w, p[1]] as P)];
  const kefe = ([-1, 1] as const).map((i) => { const c = kefeMerkez(t, i); return daire3(c, TERAZI.kefeR, "yatay").map((v) => mp(...golgeMasa(...v))); });
  return [
    golgePoly(kutuKose(t.X - 0.07, t.X + 0.07, t.Y - 0.045, t.Y + 0.045, 0, 0.03)),
    kalin(cubuk([t.X, t.Y, 0.03], [t.X, t.Y, TERAZI.direk]), 7),
    kalin(cubuk(teraziUc(t, -1), teraziUc(t, 1)), 5),
    ...kefe.map((k) => zarf(k as [number, number][]) as P[]),
  ];
};
const TeraziCiz: React.FC<{ t: Terazi; deste: React.ReactNode; kus: React.ReactNode }> = ({ t, deste, kus }) => {
  const kaide = kutuKose(t.X - 0.07, t.X + 0.07, t.Y - 0.045, t.Y + 0.045, 0, 0.03).map((v) => mp(...v));
  const dA = mp(t.X, t.Y - 0.008, 0.03), dB = mp(t.X, t.Y - 0.008, TERAZI.direk);
  const L = teraziUc(t, -1), R = teraziUc(t, 1);
  const kefe = (i: -1 | 1) => {
    const c = kefeMerkez(t, i), u = teraziUc(t, i);
    const ust = daire(c, TERAZI.kefeR, "yatay"), alt = daire([c[0], c[1], c[2] - 0.012], TERAZI.kefeR * 0.92, "yatay");
    const z1 = mp(c[0] - TERAZI.kefeR * 0.95, c[1], c[2]), z2 = mp(c[0] + TERAZI.kefeR * 0.95, c[1], c[2]), z3 = mp(c[0], c[1] - TERAZI.kefeR * 0.95, c[2]);
    const uu = mp(...u);
    return { ust, alt, zincir: [z1, z2, z3].map((z) => [uu, z] as [P, P]), halka: uu };
  };
  const K = [kefe(-1), kefe(1)];
  const zincir = (a: P, b: P, k: string) => <g key={k}><line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={DP.celikGolge} strokeWidth={4} /><line x1={a[0] - 1} y1={a[1]} x2={b[0] - 1} y2={b[1]} stroke={DP.celik} strokeWidth={2} /></g>;
  return (
    <g>
      {/* kaide: ön yüz ışıkta, üst ışıkta, sağ yüz görünmez */}
      <polygon points={pt([kaide[4], kaide[5], kaide[6], kaide[7]])} fill={DP.kutu} stroke={DP.kontur} strokeWidth={3} />
      <polygon points={pt([kaide[0], kaide[1], kaide[5], kaide[4]])} fill={DP.kutuSol} stroke={DP.kontur} strokeWidth={3} />
      {/* direk: çelik, sağ yarı gölge */}
      <line x1={dA[0]} y1={dA[1]} x2={dB[0]} y2={dB[1]} stroke={DP.kontur} strokeWidth={20} strokeLinecap="round" />
      <line x1={dA[0]} y1={dA[1]} x2={dB[0]} y2={dB[1]} stroke={DP.celikGolge} strokeWidth={15} strokeLinecap="round" />
      <line x1={dA[0] - 4} y1={dA[1]} x2={dB[0] - 4} y2={dB[1]} stroke={DP.celik} strokeWidth={6} strokeLinecap="round" />
      <line x1={dA[0] - 6} y1={dA[1]} x2={dB[0] - 6} y2={dB[1]} stroke={DP.kenar} strokeWidth={2} strokeLinecap="round" opacity={0.8} />
      {/* zincirler + kefeler (arka kefe önce) */}
      {K.map((k, i) => <g key={i}>
        {k.zincir.map(([a, b], j) => zincir(a, b, `${i}.${j}`))}
        <polygon points={pt(k.alt)} fill={DP.celikGolge} stroke={DP.kontur} strokeWidth={3} />
        <polygon points={pt(k.ust)} fill={DP.celik} stroke={DP.kontur} strokeWidth={3} />
        <circle cx={k.halka[0]} cy={k.halka[1]} r={9} fill="none" stroke={DP.kontur} strokeWidth={5} /><circle cx={k.halka[0]} cy={k.halka[1]} r={9} fill="none" stroke={DP.celik} strokeWidth={2.5} />
        {i === 0 ? deste : kus}
      </g>)}
      {/* kol: tek parça, ışık kenarı üstte */}
      {(() => { const a = mp(...L), b = mp(...R); return <g strokeLinecap="round"><line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={DP.kontur} strokeWidth={14} /><line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={DP.celikGolge} strokeWidth={9} /><line x1={a[0]} y1={a[1] - 2.5} x2={b[0]} y2={b[1] - 2.5} stroke={DP.kenar} strokeWidth={2.5} opacity={0.85} /></g>; })()}
      {(() => { const c = mp(t.X, t.Y - 0.01, TERAZI.pivot); return <circle cx={c[0]} cy={c[1]} r={11} fill={DP.celikGolge} stroke={DP.kontur} strokeWidth={3} />; })()}
    </g>
  );
};

// ---- mercekli küçültme kutusu (0.24 × 0.20 × 0.18 m, taban merkezi (0.15, 0.55)), kapak, mercek tüpü, yarık, çekmece ----
const KUTU = { X0: 0.03, X1: 0.27, Y0: 0.45, Y1: 0.65, h: 0.18, mercek: [0.15, 0.115] as [number, number], mR: 0.04, cek: { X0: 0.045, X1: 0.135, h0: 0.022, h1: 0.062, derin: 0.15 } };
const kutuGolge = (): P[] => golgePoly(kutuKose(KUTU.X0, KUTU.X1, KUTU.Y0, KUTU.Y1, 0, KUTU.h));
const KutuCiz: React.FC<{ uid: string; kapak: number; cek: number; hat: number; seritIc: React.ReactNode }> = ({ uid, kapak, cek, hat, seritIc }) => {
  const { X0, X1, Y0, Y1, h } = KUTU;
  const sol = [mp(X0, Y0, 0), mp(X0, Y1, 0), mp(X0, Y1, h), mp(X0, Y0, h)];
  const on = [mp(X0, Y0, 0), mp(X1, Y0, 0), mp(X1, Y0, h), mp(X0, Y0, h)];
  const ust = [mp(X0, Y0, h), mp(X1, Y0, h), mp(X1, Y1, h), mp(X0, Y1, h)];
  // kapak: arka kenar menteşesi (Y1, h); α = 100° · kapak
  const a = (100 * kapak * Math.PI) / 180, kY = Y1 - 0.2 * Math.cos(a), kh = h + 0.2 * Math.sin(a);
  const kap = [mp(X0, kY, kh), mp(X1, kY, kh), mp(X1, Y1, h), mp(X0, Y1, h)];
  const kapAlt = a > 0.25;
  const damar = (A: V3, B: V3, n: number, kx: string) => Array.from({ length: n }, (_, i) => { const t = (i + 0.5 + (rnd(S + 9, `${kx}${i}`) - 0.5) * 0.4) / n; const p0 = mp(A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, 0.012), p1 = mp(A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, h - 0.012); return <line key={kx + i} x1={p0[0]} y1={p0[1]} x2={p1[0]} y2={p1[1]} stroke={DP.kutuGolge} strokeWidth={2.2} strokeOpacity={0.55} />; });
  // çekmece: ön yüz Y0 − s; görünen gövde Y0−s … Y0
  const c = KUTU.cek, s = 0.08 * cek;
  const cIc = [mp(c.X0 + 0.006, Y0 - s + 0.006, c.h1), mp(c.X1 - 0.006, Y0 - s + 0.006, c.h1), mp(c.X1 - 0.006, Y0, c.h1), mp(c.X0 + 0.006, Y0, c.h1)];
  const cOn = [mp(c.X0, Y0 - s, c.h0), mp(c.X1, Y0 - s, c.h0), mp(c.X1, Y0 - s, c.h1), mp(c.X0, Y0 - s, c.h1)];
  const cSol = [mp(c.X0, Y0 - s, c.h0), mp(c.X0, Y0, c.h0), mp(c.X0, Y0, c.h1), mp(c.X0, Y0 - s, c.h1)];
  const cUstKenar = [mp(c.X0, Y0 - s, c.h1), mp(c.X1, Y0 - s, c.h1), mp(c.X1, Y0, c.h1), mp(c.X0, Y0, c.h1)];
  const topuz = mp((c.X0 + c.X1) / 2, Y0 - s - 0.006, (c.h0 + c.h1) / 2);
  // mercek tüpü
  const mc: V3 = [KUTU.mercek[0], Y0, KUTU.mercek[1]], mo: V3 = [mc[0], Y0 - 0.045, mc[2]];
  const tup = zarf([...daire(mc, KUTU.mR, "on"), ...daire(mo, KUTU.mR, "on")] as [number, number][]) as P[];
  const halka = daire(mo, KUTU.mR, "on"), cam = daire(mo, KUTU.mR * 0.72, "on");
  const hil = [mp(mo[0] - 0.022, mo[1], mo[2] + 0.012), mp(mo[0] - 0.008, mo[1], mo[2] + 0.025), mp(mo[0] - 0.014, mo[1], mo[2] + 0.015)];
  const yarikA = mp(X0 + 0.012, Y0, 0.006), yarikB = mp(X1 - 0.012, Y0, 0.006);
  const bant = (A: V3, B: V3, k: string) => { const a_ = mp(...A), b_ = mp(...B); return <g key={k}><line x1={a_[0]} y1={a_[1]} x2={b_[0]} y2={b_[1]} stroke={DP.demir} strokeWidth={11} /><line x1={a_[0] - 3} y1={a_[1] - 2} x2={b_[0] - 3} y2={b_[1] - 2} stroke={DP.demirIsik} strokeWidth={1.8} /></g>; };
  return (
    <g>
      <defs><clipPath id={`${uid}cek`}><polygon points={pt(cIc)} /></clipPath></defs>
      <polygon points={pt(sol)} fill={DP.kutu} stroke={DP.kontur} strokeWidth={3.5} />
      {damar([X0, Y0, 0], [X0, Y1, 0], 3, "s")}
      <polygon points={pt(on)} fill={DP.kutuSol} stroke={DP.kontur} strokeWidth={3.5} />
      {damar([X0, Y0, 0], [X1, Y0, 0], 6, "o")}
      {/* üst: kapalıyken kapak; açıkken iç (koyu) + kalkan kapağın altı */}
      {kapak > 0.02 ? <polygon points={pt(ust)} fill={DP.kutuDerin} stroke={DP.kontur} strokeWidth={3} /> : null}
      <polygon points={pt(kapak > 0.02 ? kap : ust)} fill={kapAlt ? DP.kutuGolge : "#a68670"} stroke={DP.kontur} strokeWidth={3.5} />
      {kapak > 0.02 && <polyline points={pt([mp(X0, Y0, h), mp(X1, Y0, h)])} stroke={DP.kenar} strokeWidth={2.5} />}
      {kapak <= 0.02 && <polyline points={pt([mp(X0, Y0, h), mp(X1, Y0, h)])} stroke={DP.kenar} strokeWidth={2.5} />}
      {/* demir köşe bantları: ön-sol dikey kenar + üst ön kenar uçları */}
      {bant([X0, Y0, 0.004], [X0, Y0, h - 0.004], "b1")}{bant([X0, Y0, h], [X0 + 0.05, Y0, h], "b2")}{bant([X1 - 0.05, Y0, h], [X1, Y0, h], "b3")}
      {/* yarık (sayfa girer) + ışık hattı (küçültme anı; L* ≤ 88 → #e4dccb) */}
      <line x1={yarikA[0]} y1={yarikA[1]} x2={yarikB[0]} y2={yarikB[1]} stroke={DP.murekkep} strokeWidth={5} />
      {hat > 0 && <line x1={yarikA[0]} y1={yarikA[1] - 1} x2={yarikB[0]} y2={yarikB[1] - 1} stroke={DP.isikHatti} strokeWidth={4 * hat} />}
      {/* mercek tüpü (koyu çelik), cam soğuk, tek hilal */}
      <polygon points={pt(tup)} fill={DP.demir} stroke={DP.kontur} strokeWidth={3} />
      <polygon points={pt(halka)} fill={DP.demir} stroke={DP.demirIsik} strokeWidth={2} />
      <polygon points={pt(cam)} fill={DP.cam} stroke={DP.kontur} strokeWidth={2} />
      <polygon points={pt(hil)} fill={DP.hilal} stroke={DP.hilal} strokeWidth={2} strokeLinejoin="round" />
      {/* çekmece: kapalıyken yüz çizgisi; açıkken iç + şerit + yan + ön */}
      {s > 0.002 && <polygon points={pt(cIc)} fill={DP.kutuDerin} />}
      {s > 0.002 && <g clipPath={`url(#${uid}cek)`}>{seritIc}</g>}
      {s > 0.002 && <polygon points={pt(cSol)} fill={DP.kutu} stroke={DP.kontur} strokeWidth={2.5} />}
      {s > 0.002 && <polyline points={pt([cUstKenar[0], cUstKenar[3]])} stroke={DP.kenar} strokeWidth={2} />}
      <polygon points={pt(cOn)} fill="#a68670" stroke={DP.kontur} strokeWidth={3} />
      <circle cx={topuz[0]} cy={topuz[1]} r={7} fill={DP.kutuDerin} stroke={DP.kontur} strokeWidth={2} />
    </g>
  );
};

// ---- film şeridi (masada / elde): koyu sepya-gri, ışık kenarı, içinde sayfanın küçük kopyası (8 mikro çizgi) ----
const SERIT = { L: 0.064, W: 0.032 };
const SeritCiz: React.FC<{ c: V3; phi: number; L?: number }> = ({ c, phi, L = SERIT.L }) => {
  const k = masaDik(c, phi, L, SERIT.W);
  const m = (u: number, v: number): P => { const a: P = [k[0][0] + (k[1][0] - k[0][0]) * u, k[0][1] + (k[1][1] - k[0][1]) * u], b: P = [k[3][0] + (k[2][0] - k[3][0]) * u, k[3][1] + (k[2][1] - k[3][1]) * u]; return [a[0] + (b[0] - a[0]) * v, a[1] + (b[1] - a[1]) * v]; };
  // mikro sayfa: şeridin iç %70'i, 8 satır (P05 sayfasının küçüğü)
  const satir = Array.from({ length: 8 }, (_, i) => { const v = 0.22 + (i * 0.56) / 7, u1 = 0.18 + (i === 7 ? 0.35 : 0.6 - rnd(S, `m${i}`) * 0.08); return [m(0.16, v), m(u1, v)] as [P, P]; });
  return (
    <g>
      <polygon points={pt(k)} fill={DP.serit} stroke="#2a2430" strokeWidth={3} strokeLinejoin="round" />
      <polyline points={pt([k[3], k[0], k[1]])} stroke={DP.seritKenar} strokeWidth={2.5} fill="none" />
      {satir.map(([a, b], i) => <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={DP.seritKenar} strokeWidth={1.8} strokeLinecap="round" />)}
    </g>
  );
};
/** ekranda verilen açı + boyla duran şeridin masa merkezi/açısı (P06 eşleşmesi: 52°, dekor 140 px) */
const seritMasa = (merkezDekor: P, aciDer: number, boyDekor: number) => {
  const r = (aciDer * Math.PI) / 180, d: P = [Math.cos(r), -Math.sin(r)];
  const A = masaTers(merkezDekor[0] - (d[0] * boyDekor) / 2, merkezDekor[1] - (d[1] * boyDekor) / 2), B = masaTers(merkezDekor[0] + (d[0] * boyDekor) / 2, merkezDekor[1] + (d[1] * boyDekor) / 2);
  const C = masaTers(...merkezDekor);
  return { C, phi: Math.atan2(B[1] - A[1], B[0] - A[0]), L: Math.hypot(B[0] - A[0], B[1] - A[1]) };
};

// ---- deste: üst üste sayfalar (kalınlık görünür), üstteki sayfa ayrı çizilir ----
const Deste: React.FC<{ c: V3; phi: number; kalin: number; seed: number; soluk?: boolean; ust?: boolean }> = ({ c, phi, kalin, seed, soluk, ust = true }) => {
  const renk = soluk ? { ...SAYFA_RENK, yuz: "#d9d4c4", satir: "#8a7a70" } : SAYFA_RENK;
  const n = 5;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => { const h = c[2] + (kalin * i) / n, dp = (rnd(seed, `p${i}`) - 0.5) * 0.04, dx = (rnd(seed, `x${i}`) - 0.5) * 0.006; const k = masaDik([c[0] + dx, c[1], h], phi + dp, 0.21, 0.27); return <polygon key={i} points={pt(k)} fill={i % 2 ? renk.yuz : DP.kat} stroke={renk.kontur} strokeWidth={2} />; })}
      {ust && <Sayfa kose={masaDik([c[0], c[1], c[2] + kalin], phi, 0.21, 0.27)} renk={renk} seed={seed} cizgi={2.4} />}
    </g>
  );
};

// ------------------------------------------------------------------ MASA görünümü ------------------------------------------------------------------
const golgeKatmani = (uid: string, polys: P[][], ekGolge: React.ReactNode, duvar: string) => {
  const ust = mp(0, MASA.arkaY)[1];
  return (
    <g>
      <defs>
        <clipPath id={`${uid}m`}><rect x={-600} y={ust} width={2400} height={3000} /></clipPath>
        <clipPath id={`${uid}d`}><rect x={-600} y={-1200} width={2400} height={ust + 1200} /></clipPath>
        <Desen id={`${uid}gt`} aci={143} aralik={7} kalin={2} renk={DP.damarGolge} alfa={0.55} seed={S + 1} />
      </defs>
      <g clipPath={`url(#${uid}m)`}>
        <g fill={DP.masaGolge} opacity={0.82}>{polys.map((q, i) => q.length > 2 && <polygon key={i} points={pt(q)} />)}</g>
        <g fill={`url(#${uid}gt)`}>{polys.map((q, i) => q.length > 2 && <polygon key={i} points={pt(q)} />)}</g>
        {ekGolge}
      </g>
      <g clipPath={`url(#${uid}d)`}><g fill={duvar}>{polys.map((q, i) => q.length > 2 && <polygon key={i} points={pt(q)} />)}</g></g>
    </g>
  );
};

/** el durumu: masa noktası (uç) → dekor ekran + yerel px/m; gölge kayması aynı ışık vektöründen */
const elMasa = (uc: V3, aci: number, kolAci: number, poz: ElDurum["poz"], hEl = 0.03): { d: ElDurum; golgeD: P } => {
  const e = mp(...uc), g = golgeMasa(uc[0], uc[1], uc[2] + hEl), ge = mp(...g), e2 = mp(uc[0], uc[1], uc[2] + hEl);
  return { d: { uc: e, aci, kolAci, pxm: mpx(uc[1], uc[2]), poz }, golgeD: [ge[0] - e2[0], ge[1] - e2[1]] };
};
const ElGolgeli: React.FC<{ e: { d: ElDurum; golgeD: P }; uid: string; tutulan?: React.ReactNode }> = ({ e, uid, tutulan }) => {
  const ust = mp(0, MASA.arkaY)[1];
  return (
    <g>
      <defs><clipPath id={`${uid}eg`}><rect x={-600} y={ust} width={2400} height={3000} /></clipPath></defs>
      <g clipPath={`url(#${uid}eg)`} transform={`translate(${e.golgeD[0]} ${e.golgeD[1]})`} opacity={0.6}><ParisEl d={e.d} tip="dagronSepya" golge={DP.masaGolge} /></g>
      <ParisEl d={e.d} tip="dagronSepya" isik={EL_ISIK} tutulan={tutulan} />
    </g>
  );
};

const MasaParis: React.FC<{ plan: Plan; p: number; uid: string; kilit: SablonProps["kilit"] }> = ({ plan, p, uid, kilit }) => {
  const k = kameraHesapla(plan.kamera, p);
  const nes = (plan.parametreler?.nesneler ?? {}) as Record<string, Record<string, unknown>>;
  // terazi: json konum (dekor taban) → masa düzlemi (mekanlar §3v2.5: (330, 780))
  const tK = (nes.terazi?.konum as P | undefined) ?? [330, 780];
  const tM0 = masaTers(tK[0], tK[1]);
  // kefe sol kenarı yan güvenli alanda kalsın: terazi 0.10 m geri, 0.03 m sağa (rapor tablosu)
  const tM: [number, number] = [tM0[0] + 0.03, tM0[1] + 0.1];
  const kefeA = anim(plan, "deste kefesi iner", { bas: 10, bit: 36 }), cirp = anim(plan, "kus kanat cirpar", { bas: 50, bit: 100 });
  let teta = 12 * t01(p, kefeA.bas, kefeA.bit, GIRIS);
  if (p > kefeA.bit) teta += -1.6 * Math.sin(((p - kefeA.bit) / 12) * Math.PI) * Math.exp(-(p - kefeA.bit) / 10); // dayanağa oturur, sekme
  if (p > cirp.bas + 8 && p < cirp.bit) teta -= 1.2 * Math.sin(((p - cirp.bas - 8) / 18) * Math.PI) * Math.exp(-(p - cirp.bas - 8) / 22); // kol bir kez titrer; kefe kalkmaz
  const T: Terazi = { X: tM[0], Y: tM[1], teta };
  // kuş sağ kefede: ayaklar kefe yüzeyinde
  const kc = kefeMerkez(T, 1), kusPx = mpx(kc[1], kc[2] + 0.1) / 1000;
  const cirpT = p >= cirp.bas && p < cirp.bit;
  let kp: KusPoz = KUS_POZ["tunek"];
  if (cirpT) kp = pozKaris(KUS_POZ["tunek"], cirpis({ ...KUS_POZ["kalkis-a"], bacak: 1, govde: 30 }, p, cirp.bas, { ...KUS_POZ["kalkis-a"], kanatBoy: 0.8 }, { ...KUS_POZ["kalkis-b"], kanatBoy: 0.75 }, 14), Math.min(t01(p, cirp.bas, cirp.bas + 6), 1 - t01(p, cirp.bit - 8, cirp.bit)));
  const ayakHedef = mp(kc[0] + 0.01, kc[1], kc[2] + 0.004);
  const ay0 = kusAyakEkran(kp, [0, 0], kusPx), ayOrt: P = [(ay0[0][0] + ay0[1][0]) / 2, Math.max(ay0[0][1], ay0[1][1])];
  const kusCapa: P = [ayakHedef[0] - ayOrt[0], ayakHedef[1] - ayOrt[1]];
  const kus = <Guvercin poz={kp} capa={kusCapa} olcek={kusPx} kenar={{ renk: DP.kenar, dx: -3, dy: -3 }} kilif={null} />;
  const kd = kefeMerkez(T, -1);
  const kefeDeste = <Deste c={[kd[0], kd[1], kd[2] + 0.002]} phi={0.12} kalin={0.014} seed={S + 21} />;

  // ---- sayfa, şerit, çekmece, kapak zamanlaması ----
  const eller = ((plan.parametreler?.eller as Record<string, unknown> | undefined)?.zaman ?? {}) as Record<string, number>;
  const fAl = eller.sayfa_al ?? 140, fKoy = eller.sayfa_koy ?? 160, fKap = eller.kapak ?? 166;
  const cekA = ar(nes.cekmece, { bas: 198, bit: 222 }), cek = anim(plan, "sayfa cekilir (kucul)", { bas: 172, bit: 196 });
  const sCik = anim(plan, "serit cikar", { bas: 212, bit: 236 }), sKoy = anim(plan, "serit parmak yanina", { bas: 244, bit: 268 }), elCek = anim(plan, "el cekilir", { bas: 340, bit: 358 });
  const hat = ar(nes.isik_hatti, { bas: 176, bit: 190 });
  // deste (masa): ölçü bölgesini taşıyacak biçimde (şerit kâğıt üstünde okunur) — mekanlar (330,1400) → (443,1375), rapor tablosu
  const desteC: V3 = [-0.04, 0.3, 0];
  const sayfaBas: V3 = [desteC[0], desteC[1], 0.014], sayfaKoy: V3 = [0.15, 0.315, 0.002];
  const sayfaY = 0.315 + 0.275 * t01(p, cek.bas, cek.bit, INOUT);
  const sayfaC: V3 = p < fAl ? sayfaBas : p < fKoy ? (yol([fAl, fKoy], [sayfaBas, sayfaKoy], p) as V3) : [0.15, sayfaY, 0.002];
  const sayfaPhi = p < fAl ? 0 : p < fKoy ? 0.12 * (1 - t01(p, fAl, fKoy)) * 0 : 0;
  const sayfaVar = sayfaY < KUTU.Y0 + 0.135 + 0.001 || p < cek.bas; // kutunun içine girdikten sonra ön yüz örter (yine çizilir, kırpılmaz)
  void sayfaVar;
  const cekT = t01(p, cekA.bas + 2, cekA.bas + 16, INOUT);
  const kapakT = (() => { const a = t01(p, fKap - 16, fKap - 10, INOUT) * 0.4, b = t01(p, fKap - 10, fKap, GIRIS); let v = a + (1 - 0.4) * b * (p > fKap - 10 ? 1 : 0); if (p > fKap) v = 1 - 0.035 * Math.sin(((p - fKap) / 8) * Math.PI) * Math.exp(-(p - fKap) / 6); return Math.min(1, v); })();
  const hatT = p >= hat.bas && p <= hat.bit ? Math.min(t01(p, hat.bas, hat.bas + 4), 1 - t01(p, hat.bit - 3, hat.bit)) : 0;
  // şerit: çekmecede (X ekseni boyunca) → kıstırılıp kaldırılır → ölçü bölgesine 52°
  const olcuD = (nes.olcu_bolgesi?.konum as P | undefined) ?? [560, 1250];
  const sm = seritMasa(olcuD, (nes.serit?.aci_derece as number | undefined) ?? 52, (nes.serit?.boy_dekor_px as number | undefined) ?? 140);
  const seritL = Math.max(0.05, Math.min(0.1, sm.L)); // ekranda 140 dekor px (cs 2.0 → 280) veren gerçek boy
  const s0: V3 = [0.09, KUTU.Y0 + 0.04 - 0.08 * cekT, KUTU.cek.h0 + 0.004], uS = 0.5 * seritL;
  const pinchOf = (c: V3, phi: number): V3 => [c[0] + Math.cos(phi) * uS, c[1] + Math.sin(phi) * uS, c[2] + 0.006];
  const sTut = 218, sBirak = sKoy.bit;
  const seritPinch = (q: number): V3 => {
    const a = pinchOf(s0, 0), f: V3 = pinchOf([sm.C[0], sm.C[1], 0.016], sm.phi);
    return yol([sTut, sCik.bit, sKoy.bas, sBirak], [a, [0.105, 0.37, 0.085], [0.07, 0.35, 0.07], f], q) as V3;
  };
  const seritPhi = (q: number) => sm.phi * t01(q, sCik.bit - 6, sBirak - 4);
  const seritDurum: { c: V3; phi: number; elde: boolean } = p < sTut ? { c: s0, phi: 0, elde: false } : p < sBirak ? (() => { const pp = seritPinch(p), ph = seritPhi(p); return { c: [pp[0] - Math.cos(ph) * uS, pp[1] - Math.sin(ph) * uS, pp[2] - 0.006] as V3, phi: ph, elde: true }; })() : { c: [sm.C[0], sm.C[1], 0.016], phi: sm.phi, elde: false };

  // ---- sağ el (sayfa, kapak değil: yarık, çekmece, şerit) ----
  const sagEl = (() => {
    if (p < 100 || p > sBirak + 14) return null;
    const ucSayfa = (c: V3): V3 => [c[0] + 0.06, c[1] - 0.05, c[2] + 0.012];
    const kare: number[] = [], v: number[][] = [];
    const ek = (f: number, q: V3) => { kare.push(f); v.push(q); };
    ek(100, [0.42, 0.06, 0.1]); ek(118, [0.3, 0.16, 0.06]); ek(fAl, ucSayfa(sayfaBas)); ek(fKoy, ucSayfa(sayfaKoy)); ek(fKoy + 6, [0.24, 0.2, 0.05]);
    ek(cek.bas, [0.17, 0.315 - 0.135 - 0.006, 0.012]); ek(cek.bit, [0.17, 0.59 - 0.135 - 0.006, 0.012]);
    ek(cekA.bas + 2, [0.09, KUTU.Y0 - 0.008, 0.042]); ek(cekA.bas + 16, [0.09, KUTU.Y0 - 0.088, 0.042]);
    let uc = yol(kare, v, Math.min(p, cekA.bas + 16)) as V3;
    let poz: ElDurum["poz"] = "isaret", aci = -128, kolAci = -112;
    if (p >= cek.bas && p <= cek.bit) uc = [0.17, sayfaY - 0.135 - 0.006, 0.012];
    if (p > cekA.bas + 16) {
      // kıstırma pozuna geçiş çekmecenin içinde (el durur), şeridi kaldırır, taşır, bırakır, sağa çekilir
      poz = "kistir";
      const st = seritPinch(Math.min(p, sBirak));
      const k2 = [cekA.bas + 16, sTut], v2 = [[0.09, KUTU.Y0 - 0.088, 0.042], pinchOf(s0, 0)];
      uc = p < sTut ? (yol(k2, v2, p) as V3) : st;
      if (p > sBirak) uc = yol([sBirak, sBirak + 3, sBirak + 14], [st, [st[0] + 0.01, st[1] - 0.01, st[2] + 0.025], [0.52, 0.12, 0.14]], p) as V3;
      aci = -150 + 25 * t01(p, sTut, sBirak); kolAci = -118;
    }
    return elMasa(uc, aci, kolAci, poz);
  })();
  // ---- sol el: kapak (f146–166), ölçü parmağı (f236–358) ----
  const solEl = (() => {
    const kapUc = (aDer: number): V3 => { const a = (aDer * Math.PI) / 180; return [KUTU.X0 + 0.09, KUTU.Y1 - 0.2 * Math.cos(a) - 0.004, KUTU.h + 0.2 * Math.sin(a) - 0.006]; };
    if (p >= 120 && p <= 190) {
      const u = yol([120, fKap - 18, fKap - 10, 190], [[-0.36, 0.1, 0.12], kapUc(0), kapUc(40), [-0.4, 0.14, 0.14]], p) as V3;
      return elMasa(u, -62, -66, "isaret", 0.04);
    }
    // ölçü: işaret parmağı şeride paralel (ekranda 52°), şeridin sağ-altında, ucu Paris ucuyla hizalı
    const gel = sKoy.bit - 6, otur = sKoy.bit + 10; // şerit konduktan sonra (sağ el çıkarken) parmak yanına uzanır
    if (p >= gel && p <= elCek.bit) {
      const d: [number, number] = [Math.cos(sm.phi), Math.sin(sm.phi)], n: [number, number] = [-d[1], d[0]];
      const tip: V3 = [sm.C[0] + d[0] * (seritL / 2 + 0.002) - n[0] * 0.062, sm.C[1] + d[1] * (seritL / 2 + 0.002) - n[1] * 0.062, 0.026];
      const nefes = 0.0008 * Math.sin((p - otur) / 9);
      const u = yol([gel, otur, elCek.bas, elCek.bit], [[-0.3, 0.02, 0.1], tip, [tip[0], tip[1] + nefes, tip[2]], [-0.36, 0.05, 0.12]], p) as V3;
      const tipE = mp(...tip), arkaE = mp(tip[0] - d[0] * 0.07, tip[1] - d[1] * 0.07, tip[2]);
      const aci = (Math.atan2(tipE[1] - arkaE[1], tipE[0] - arkaE[0]) * 180) / Math.PI;
      return elMasa(u, aci, aci - 12, "isaret", 0.015);
    }
    return null;
  })();

  // ---- gölgeler (tek ışık) ----
  const kusGolge = (() => { const c = kefeMerkez(T, 1); const v: V3[] = Array.from({ length: 18 }, (_, i) => { const a = (i / 18) * Math.PI * 2; return [c[0] - 0.02 + 0.13 * Math.cos(a), c[1], c[2] + 0.11 + 0.075 * Math.sin(a)]; }); return golgePoly(v); })();
  const golgeler: P[][] = [kutuGolge(), ...teraziGolge(T), kusGolge];

  // ---- kilit noktaları (güvenli alan) ----
  const E = (q: P) => ekranNokta(k, q);
  if (p >= sKoy.bit - 2) kilit.push({ ad: "şerit", p: E(mp(sm.C[0], sm.C[1], 0)), tur: "dokunus" });
  if (solEl && p > sKoy.bas) kilit.push({ ad: "parmak ucu", p: E(solEl.d.uc), tur: "dokunus" });
  if (p < 140) kilit.push({ ad: "kefe", p: E(mp(...kefeMerkez(T, -1))), tur: "temas" });

  const seritIc = <SeritCiz c={s0} phi={0} L={seritL} />;
  const seritCiz = <SeritCiz c={seritDurum.c} phi={seritDurum.phi} L={seritL} />;
  // şerit gölgesi (elde iken masada)
  const seritGolge = seritDurum.elde ? (() => { const q = masaDik([seritDurum.c[0], seritDurum.c[1], 0], seritDurum.phi, seritL, SERIT.W).map((e) => { const m = masaTers(...e); const g = golgeMasa(m[0], m[1], seritDurum.c[2]); return mp(...g); }); return <polygon points={pt(q)} fill={DP.masaGolge} opacity={0.75} />; })() : null;
  return (
    <g transform={katDonusum(k)}>
      <MasaYuzey seed={S} />
      <DuvarParis uid={uid} />
      {golgeKatmani(uid, golgeler, seritGolge, DP.badanaGolge)}
      <TeraziCiz t={T} deste={kefeDeste} kus={kus} />
      <Deste c={desteC} phi={0} kalin={0.012} seed={S + 31} ust={p >= fAl} />
      {p < fAl && <Sayfa kose={masaDik([desteC[0], desteC[1], 0.014], 0, 0.21, 0.27)} renk={SAYFA_RENK} seed={S + 40} />}
      {p >= fAl && <Sayfa kose={masaDik(sayfaC, sayfaPhi, 0.21, 0.27)} renk={SAYFA_RENK} seed={S + 40} />}
      <KutuCiz uid={uid} kapak={kapakT} cek={cekT} hat={hatT} seritIc={p < sTut ? seritIc : null} />
      {p >= sTut && !seritDurum.elde && seritCiz}
      {solEl && <ElGolgeli e={solEl} uid={`${uid}l`} />}
      {sagEl && <ElGolgeli e={sagEl} uid={`${uid}r`} tutulan={seritDurum.elde ? seritCiz : undefined} />}
    </g>
  );
};

// ---- Tours (P09): keçe altlık, mektup + şerit yığını, kuş avuçta, kılıf bağlanır, kuş salınır ----
const MasaTours: React.FC<{ plan: Plan; p: number; uid: string; kilit: SablonProps["kilit"] }> = ({ plan, p, uid, kilit }) => {
  const k = kameraHesapla(plan.kamera, p);
  const prm = plan.parametreler ?? {};
  const kece = (prm.kece_altlik ?? {}) as { x?: [number, number]; y?: [number, number]; renk?: string };
  const kx = kece.x ?? [330, 750], ky = kece.y ?? [900, 1250];
  const kC = masaTers((kx[0] + kx[1]) / 2, (ky[0] + ky[1]) / 2);
  const myK = (prm.mektup_yigini_konum as P | undefined) ?? [290, 1180], syK = (prm.serit_yigini_konum as P | undefined) ?? [820, 1200];
  const my = masaTers(...myK), sy = masaTers(...syK);
  const kl = (prm.kilif ?? {}) as { merkez_dekor?: P; parilti?: Ar };
  const K0 = kl.merkez_dekor ?? [540, 1000];
  const A = (ad: string, d: Ar) => anim(plan, ad, d);
  const gir = A("el kusla girer", { bas: 0, bit: 24 }), yer = A("kilif yerlesir", { bas: 24, bit: 46 }), ip = A("ip sarilir", { bas: 46, bit: 92 }), dug = A("dugum", { bas: 92, bit: 100 });
  const den = A("deneme cekisi", { bas: 104, bit: 122 }), par = ar(kl.parilti, A("parilti (net)", { bas: 122, bit: 190 })), sal = A("salma", { bas: 190, bit: 198 }), cik = A("kus cikis", { bas: 196, bit: 206 });
  const temas = (plan.temaslar ?? []).map((t) => t.kare);
  const tOtur = temas.find((q) => q >= yer.bas && q <= yer.bit) ?? 34, tCek = temas.find((q) => q >= den.bas && q <= den.bit) ?? 118;
  // kuş: avuçta, gövde yatay, kuyruk sola; kılıf merkezi K0 (dekor) — giriş sağdan, çıkış sağ-üste
  const olc = 139 / KILIF.L; // dekor px/mm: cs 2.0'da kılıf 278 px (mekanlar §3v2.8)
  const tutus: KusPoz = { ...KUS_POZ["tunek"], govde: 6, kuyruk: 0.18, kuyrukAci: -4, bacak: 0.05 };
  const cekis = p > tCek - 4 && p < tCek + 12 ? Math.sin(((p - tCek + 4) / 16) * Math.PI) : 0;
  let capa: P = [K0[0] + 760 * (1 - t01(p, gir.bas, gir.bit, GIRIS)) - 5 * cekis, K0[1] + 40 * (1 - t01(p, gir.bas, gir.bit, GIRIS)) + 3 * cekis];
  let poz = tutus;
  if (p >= sal.bas) {
    const u = t01(p, cik.bas - 2, cik.bit + 14, CIKIS);
    capa = [capa[0] + 1300 * u, capa[1] - 520 * u];
    poz = pozKaris(tutus, cirpis(KUS_POZ["ucus-yukari"], p, sal.bas, KUS_POZ["ucus-yukari"], KUS_POZ["ucus-asagi"], 12), t01(p, sal.bas, sal.bit + 2));
  }
  const Y = kusYerlesim(poz, capa, olc);
  const kilifAci = Y.kilifAci;
  const yerel = (q: P): P => { const r = (kilifAci * Math.PI) / 180; return [capa[0] + (q[0] * Math.cos(r) - q[1] * Math.sin(r)) * olc, capa[1] + (q[0] * Math.sin(r) + q[1] * Math.cos(r)) * olc]; };
  const takili = p >= tOtur;
  // sol el: kılıfı getirir (kistir), ipi sarar (daireler), düğüm, deneme çekişi, çekilir
  const dugumE = yerel([-20, 8]), dinlen = yerel([-24, 14]);
  const ipYolu = (q: number): P => {
    if (q < ip.bas) return dugumE;
    if (q < ip.bit) { const t = (q - ip.bas) / (ip.bit - ip.bas), a = t * Math.PI * 4; const c = yerel([-6 + 26 * t * 0, 0]); return [c[0] - 30 * Math.sin(a) * (1 - 0.3 * t) - 40 * t, c[1] + 46 * Math.cos(a) * (1 - 0.3 * t) + 6]; }
    if (q < dug.bit) { const t = t01(q, dug.bas, dug.bas + 6, GIRIS); const a = yerel([-6, 0]); const b: P = [dugumE[0] - 70, dugumE[1] + 55]; return [a[0] - 30 + (b[0] - a[0] + 30) * t, a[1] + 46 + (b[1] - a[1] - 46) * t]; }
    return [dugumE[0] - 70 + (dinlen[0] - dugumE[0] + 70) * t01(q, dug.bit, dug.bit + 4), dugumE[1] + 55 + (dinlen[1] - dugumE[1] - 55) * t01(q, dug.bit, dug.bit + 4)];
  };
  const solPinch: P | null = (() => {
    if (p > den.bit + 30) return null;
    if (p < tOtur) { const t = t01(p, 4, tOtur, INOUT); const hed = yerel([0, 6]); return [hed[0] - 520 * (1 - t), hed[1] + 640 * (1 - t)]; }
    if (p < ip.bas) return yerel([0, 6]);
    if (p < den.bas) return ipYolu(p);
    if (p <= den.bit) { const hed = yerel([10, 6]); return p < den.bas + 4 ? [dinlen[0] + (hed[0] - dinlen[0]) * t01(p, den.bas, den.bas + 4), dinlen[1] + (hed[1] - dinlen[1]) * t01(p, den.bas, den.bas + 4)] : [hed[0] - 8 * cekis, hed[1] + 6 * cekis]; }
    const t = t01(p, den.bit, den.bit + 30, CIKIS), hed = yerel([10, 6]); return [hed[0] - 560 * t, hed[1] + 700 * t];
  })();
  const pxmEl = 2150; // kılıf derinliği (z ≈ 0.55 m) yerel px/m
  const kOfs: P = [yerel([0, 6])[0] - yerel([0, 0])[0], yerel([0, 6])[1] - yerel([0, 0])[1]];
  const kMerkez: P = solPinch ? [solPinch[0] - kOfs[0], solPinch[1] - kOfs[1]] : yerel([0, 0]);
  const kilifCiz = <g transform={`translate(${kMerkez[0]} ${kMerkez[1]}) rotate(${kilifAci}) scale(${olc})`}><Kilif olcek={olc} coz={1} ipUc={[24, 30]} /></g>;
  const coz = p < ip.bas ? 1 : p < ip.bit ? 1 - t01(p, ip.bas, ip.bit, INOUT) : 0;
  const ipUcEkran: P | undefined = solPinch && p >= tOtur && p < den.bas ? solPinch : undefined;
  const parilti = p >= par.bas && p <= par.bit ? -1 + 2 * t01(p, par.bas, par.bit) : null;
  const kusVar = capa[0] < 1900;
  // sağ el: kuşun gövdesini alttan kavrar (avuç), salmada açılır ve aşağı çekilir
  const karin = Y.ekran([-46, 40]);
  const sagUc: P = p < sal.bas ? karin : (() => { const t = t01(p, sal.bas, sal.bit + 10, CIKIS), k0 = kusYerlesim(tutus, [K0[0], K0[1]], olc).ekran([-46, 40]); return [k0[0] + 120 * t, k0[1] + 260 * t]; })();
  const sagEl: ElDurum = { uc: sagUc, aci: 202, kolAci: 160, pxm: pxmEl, poz: "gevsek", bukum: -14 };
  const solEl: ElDurum | null = solPinch ? { uc: solPinch, aci: -38, kolAci: -52, pxm: pxmEl, poz: p < tOtur ? "kistir" : "kistirSiki" } : null;
  const golgeD: P = [46, -30]; // el/kuş yüksekliği ≈ 5 cm → gölge sağ-yukarı (ekranda (+0.84, −0.55))
  // gölgeler: kuş (gövde lekesi) + eller
  const ust = mp(0, MASA.arkaY)[1];
  if (takili && kusVar) kilit.push({ ad: "kılıf", p: ekranNokta(k, yerel([0, 0])), tur: "dokunus" });
  const keceK = masaDik([kC[0], kC[1], 0], 0, 0.45, 0.32);
  const serit = Array.from({ length: 9 }, (_, i) => ({ c: [sy[0] + (rnd(S + 50, `x${i}`) - 0.5) * 0.06, sy[1] + (rnd(S + 50, `y${i}`) - 0.5) * 0.05, 0.002 + i * 0.0012] as V3, phi: (rnd(S + 50, `a${i}`) - 0.5) * 1.2 }));
  return (
    <g transform={katDonusum(k)}>
      <MasaYuzey seed={S + 2} />
      <DuvarTours uid={uid} />
      <polygon points={pt(keceK)} fill={DP.kece} stroke={DP.keceKenar} strokeWidth={4} />
      <Deste c={[my[0], my[1], 0]} phi={-0.08} kalin={0.03} seed={S + 60} soluk />
      {serit.map((s, i) => <SeritCiz key={i} c={s.c} phi={s.phi} />)}
      <defs><clipPath id={`${uid}tm`}><rect x={-600} y={ust} width={2400} height={3000} /></clipPath></defs>
      <g clipPath={`url(#${uid}tm)`} opacity={0.75}>
        {kusVar && <ellipse cx={capa[0] + 300 + golgeD[0]} cy={capa[1] + 30 + golgeD[1]} rx={330} ry={95} transform={`rotate(-8 ${capa[0] + 300} ${capa[1]})`} fill={DP.keceKenar} />}
        {p < sal.bit + 12 && <g transform={`translate(${golgeD[0]} ${golgeD[1]})`}><ParisEl d={sagEl} tip="dagronSepya" golge="#2e2a40" /></g>}
        {solEl && <g transform={`translate(${golgeD[0] * 0.7} ${golgeD[1] * 0.7})`}><ParisEl d={solEl} tip="dagronSepya" golge="#2e2a40" /></g>}
      </g>
      {kusVar && <Guvercin poz={poz} capa={capa} olcek={olc} kenar={{ renk: DP.kenar, dx: -5, dy: -4 }} kilif={takili ? { parilti, coz, ipUcEkran } : null} />}
      {p < sal.bit + 12 && <ParisEl d={sagEl} tip="dagronSepya" isik={EL_ISIK} />}
      {solEl && <ParisEl d={solEl} tip="dagronSepya" isik={EL_ISIK} tutulan={!takili ? kilifCiz : undefined} />}
    </g>
  );
};

// ------------------------------------------------------------------ KAFES görünümü (P04b) ------------------------------------------------------------------
const KAM_KAFES: Kam = { F: 1500, X: 0, e: 1.15, Z: 0, U: 1000 };
const KF = { X0: -0.2, X1: 0.2, Z0: 1.25, Z1: 1.55, h0: 1.0, h1: 1.3, kapi: [0.05, 0.17] as [number, number], tunek: 1.06 };
const KafesSahne: React.FC<{ plan: Plan; p: number; uid: string; kilit: SablonProps["kilit"] }> = ({ plan, p, uid, kilit }) => {
  const k = kameraHesapla(plan.kamera, p);
  const prm = plan.parametreler ?? {};
  const si = ar(prm.sepet_inis, { bas: 122, bit: 140, temas: 136 }), kk = ar(prm.kafes_kapak, { bas: 146, bit: 162, temas: 150 });
  const kus = (prm.kus ?? {}) as { yon_arama?: Ar; cikis?: Ar };
  const ya = ar(kus.yon_arama, { bas: 166, bit: 226 }), kc = ar(kus.cikis, { bas: 226, bit: 244 });
  const tI = si.temas ?? 136, tK = kk.temas ?? 150;
  // iniş: sepet + kafes yukarıdan iner, f136 oturur; kafes 6 px sıçrar
  const dhInis = p < tI ? 0.9 * Math.pow(1 - t01(p, si.bas, tI, (t) => t), 1.7) : 0;
  const sicra = p > tI && p < tI + 14 ? 0.005 * Math.sin(((p - tI) / 14) * Math.PI) : 0;
  const H = dhInis, Hk = H + sicra;
  const W = (X: number, h: number, Z: number) => pr(KAM_KAFES, X, h + Hk, Z);
  // gök + tarla + çit/ağaç bandı + çöken küre
  const r = rng(S + 70);
  const citUst: P[] = Array.from({ length: 28 }, (_, i) => [-300 + i * 62, 868 - 20 * r() - (i % 5 === 2 ? 30 : 0)] as P);
  const kureT = t01(p, si.bas, plan.sure_kare - 12, INOUT);
  const kureC: P = [760, -40 + 640 * kureT], kureR = 470 - 120 * kureT;
  const balon = { c: kureC, R: kureR, boyunUst: kureC[1] + kureR * 1.05, boyunAlt: kureC[1] + kureR * 1.35, boyunW: 60, dolu: 0.4 - 0.38 * kureT, kivrim: 5 + 4 * kureT, gevsek: 0.5 + 0.5 * kureT, egim: 6, halka: { y: kureC[1] + kureR * 1.32, w: 70 }, kontur: 4, isik: [-0.7, -0.7] as P, ag: true, isikOfs: 0.9 };
  // sepet (Montmartre modülü): ön yüz Z 1.25, rim h 1.0
  const sp: SepetPoz = { X: 0.12, h: 0.05 + H, Z: 1.85, yaw: 6 };
  // kapak: sol menteşe (X 0.05), kameraya doğru açılır 100°
  const kapA = (() => { const a = t01(p, kk.bas, tK + 6, INOUT) * 0.7 + t01(p, tK + 6, kk.bit, GIRIS) * 0.3; let v = a; if (p > kk.bit) v = 1 - 0.04 * Math.sin(((p - kk.bit) / 8) * Math.PI) * Math.exp(-(p - kk.bit) / 6); return (100 * v * Math.PI) / 180; })();
  const kapiUc = (h: number): P => W(KF.kapi[0] + 0.12 * Math.cos(kapA), h, KF.Z0 - 0.12 * Math.sin(kapA));
  // kuş: tünekte; yön arama (gövde sola/sağa döner + baş), çıkış kapıdan → sağ-üst
  const ppKus = pxmK(KAM_KAFES, 1.4) / 1000;
  const don = (() => {
    const a = ya.bas, b = ya.bit, L = b - a;
    const x1 = t01(p, a + L * 0.12, a + L * 0.25, INOUT), x2 = t01(p, a + L * 0.5, a + L * 0.63, INOUT);
    return 1 - 2 * x1 + 2 * x2; // 1 sağ → −1 sol → 1 sağ (kilit: Paris yönü sağ-üst)
  })();
  const basAci = p > ya.bas + (ya.bit - ya.bas) * 0.7 ? -14 * t01(p, ya.bas + (ya.bit - ya.bas) * 0.7, ya.bit) : 6 * Math.sin((p - ya.bas) / 7) * (p > ya.bas && p < ya.bit ? 1 : 0);
  let kp: KusPoz = { ...KUS_POZ["tunek"], bas: basAci };
  let ayak: V3 = [-0.03, KF.tunek, 1.42];
  let olc = ppKus, yon = don;
  if (p >= kc.bas) {
    const q = Math.min(p, kc.bit + 20);
    ayak = yol([kc.bas, kc.bas + 7, kc.bit, kc.bit + 20], [[-0.03, KF.tunek, 1.42], [0.11, KF.h0 + 0.02, 1.22], [0.6, 1.6, 1.0], [1.4, 2.4, 0.9]], q) as V3;
    olc = pxmK(KAM_KAFES, ayak[2]) / 1000; yon = 1;
    kp = p < kc.bas + 6 ? pozKaris(kp, KUS_POZ["kanat-topla"], t01(p, kc.bas, kc.bas + 6)) : cirpis(KUS_POZ["ucus-yukari"], p, kc.bas + 6, KUS_POZ["ucus-yukari"], KUS_POZ["ucus-asagi"], 12);
  }
  const ay0 = kusAyakEkran(kp, [0, 0], olc), ayO: P = [(ay0[0][0] + ay0[1][0]) / 2, Math.max(ay0[0][1], ay0[1][1])];
  const ayE = pr(KAM_KAFES, ayak[0], ayak[1] + Hk, ayak[2]);
  const capa: P = [ayE[0] - ayO[0], ayE[1] - ayO[1]];
  const kusGorunur = capa[0] < 1500 && capa[1] > -800;
  // açan el (parisGri): sağdan girer, kapağın serbest kenarını çeker, bırakır, sağa çekilir
  const elE = (() => {
    if (p < kk.bas - 14 || p > kk.bit + 16) return null;
    const tut = kapiUc(KF.h0 + 0.16);
    const bas: P = [1300, 1250], son: P = [1320, 1300];
    const uc: P = p < kk.bas ? [bas[0] + (tut[0] - bas[0]) * t01(p, kk.bas - 14, kk.bas, GIRIS), bas[1] + (tut[1] - bas[1]) * t01(p, kk.bas - 14, kk.bas, GIRIS)] : p < tK + 6 ? tut : (() => { const t0 = kapiUc(KF.h0 + 0.16), t = t01(p, tK + 6, kk.bit + 16, CIKIS); return [t0[0] + (son[0] - t0[0]) * t, t0[1] + (son[1] - t0[1]) * t] as P; })();
    return { uc, aci: 200, kolAci: 165, pxm: pxmK(KAM_KAFES, 1.15), poz: "kistirSiki" as const, bukum: -10 };
  })();
  // çubuklar (ön yüz 7, eşit aralık 0.05 m ≥ 40 px), kapı içinde 2
  const sabitCubuk = [-0.15, -0.1, -0.05, 0.0, 0.2 - 0.008].filter((x) => x < KF.kapi[0] - 0.01 || x > KF.kapi[1] + 0.01);
  const cubuk = (a: P, b: P, w: number, key: string, renk = "#4a3f46") => <g key={key}><line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={DP.kontur} strokeWidth={w + 3} strokeLinecap="round" /><line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={renk} strokeWidth={w} strokeLinecap="round" /><line x1={a[0] - w * 0.3} y1={a[1]} x2={b[0] - w * 0.3} y2={b[1]} stroke={PAL.kenar} strokeWidth={1.6} opacity={0.7} /></g>;
  const cerceve = (pts_: P[], w: number, key: string, isik = true) => <g key={key}><polyline points={pt(pts_)} stroke={DP.kontur} strokeWidth={w + 4} fill="none" strokeLinejoin="round" /><polyline points={pt(pts_)} stroke={isik ? "#b4937a" : "#7a6460"} strokeWidth={w} fill="none" strokeLinejoin="round" /></g>;
  const pp1 = pxmK(KAM_KAFES, KF.Z0);
  const gol = golgeCokgen(KAM_KAFES, "gunMontmartre", [[-0.4, 0, 6], [0.4, 0, 6]]); void gol;
  if (kusGorunur && p < kc.bas) kilit.push({ ad: "güvercin", p: ekranNokta(k, ayE), tur: "dokunus" });
  kilit.push({ ad: "kapak", p: ekranNokta(k, kapiUc(KF.h0 + 0.15)), tur: "temas" });
  const kenarKus = { renk: PAL.kenar, dx: -4, dy: -3 };
  const kusCiz = kusGorunur ? <g transform={`translate(${ayE[0]} 0) scale(${yon} 1) translate(${-ayE[0]} 0)`}><Guvercin poz={kp} capa={capa} olcek={olc} kenar={{ ...kenarKus, dx: kenarKus.dx * Math.sign(yon || 1) }} kilif={null} /></g> : null;
  return (
    <g transform={katDonusum(k)}>
      <GokBasamak ufuk={1000} seed={S + 71} />
      <rect x={-400} y={1000} width={1900} height={140} fill={PAL.toprak} />
      {[[-9, 22, 11, 0.5], [7, 30, 14, 0.7], [16, 19, 8, 0.4]].map(([X, Z, Hh, as], i) => <CiplakAgac key={i} k={KAM_KAFES} X={X} Z={Z} seed={S + 80 + i} H={Hh} asim={as} />)}
      <g fill={PAL.golge} opacity={0.8}>{[[-9, 22, 11, 0.5], [7, 30, 14, 0.7]].flatMap(([X, Z, Hh, as], i) => agacGolge(KAM_KAFES, "gunMontmartre", X, Z, S + 80 + i, Hh, as).map((g, j) => <polygon key={`${i}.${j}`} points={pt(g)} />))}</g>
      <path d={`M-300 1118 L${citUst.map((q) => `${q[0]} ${q[1]}`).join(" L")} L1500 1118 Z`} fill="#5f5470" stroke={DP.kontur} strokeWidth={3} />
      <path d={`M${citUst.slice(0, 14).map((q) => `${q[0] + 3} ${q[1] + 3}`).join(" L")}`} fill="none" stroke={PAL.kenar} strokeWidth={2.5} opacity={0.7} />
      <Balon b={balon} />
      {/* sepeti küreye bağlayan iki askı halatı */}
      {[[-0.45, 2.45], [0.66, 2.45]].map(([X, Z], i) => { const a = pr(KAM_KAFES, X, 1.0 + H, Z), b: P = [kureC[0] + (i ? 50 : -50), balon.halka.y]; return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={PAL.halat} strokeWidth={4} />; })}
      <SepetArka k={KAM_KAFES} s={sp} isikYuz={PAL.hasirIsik} />
      <SepetOn k={KAM_KAFES} s={sp} isikYuz={PAL.hasirIsik} kontur={5} />
      {/* kafes: arka çubuklar + taban + tünek */}
      <polygon points={pt([W(KF.X0, KF.h0, KF.Z0), W(KF.X1, KF.h0, KF.Z0), W(KF.X1, KF.h0, KF.Z1), W(KF.X0, KF.h0, KF.Z1)])} fill="#7a6460" stroke={DP.kontur} strokeWidth={4} />
      {[-0.15, -0.075, 0, 0.075, 0.15].map((x, i) => cubuk(W(x, KF.h0, KF.Z1), W(x, KF.h1, KF.Z1), 4, `a${i}`, "#5a4e58"))}
      {cerceve([W(KF.X0, KF.h1, KF.Z1), W(KF.X1, KF.h1, KF.Z1), W(KF.X1, KF.h0, KF.Z1)], 6, "ac", false)}
      {(() => { const a = W(KF.X0, KF.tunek, 1.4), b = W(KF.X1, KF.tunek, 1.4); return <g><line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={DP.kontur} strokeWidth={0.025 * pxmK(KAM_KAFES, 1.4) + 3} strokeLinecap="round" /><line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#b4937a" strokeWidth={0.025 * pxmK(KAM_KAFES, 1.4)} strokeLinecap="round" /></g>; })()}
      {p < kc.bas + 4 && kusCiz}
      {/* ön yüz: köşe dikmeleri, alt/üst kirişler, sabit çubuklar, üst halka; kapı (menteşe solda) */}
      {cerceve([W(KF.X0, KF.h0, KF.Z0), W(KF.X0, KF.h1, KF.Z0), W(KF.X1, KF.h1, KF.Z0), W(KF.X1, KF.h0, KF.Z0), W(KF.X0, KF.h0, KF.Z0)], 0.022 * pp1, "on")}
      {cerceve([W(KF.X0, KF.h1, KF.Z0), W(KF.X0, KF.h1, KF.Z1), W(KF.X1, KF.h1, KF.Z1), W(KF.X1, KF.h1, KF.Z0)], 0.018 * pp1, "ust")}
      {cerceve([W(KF.X0, KF.h0, KF.Z0), W(KF.X0, KF.h0, KF.Z1)], 0.018 * pp1, "sl")}
      {sabitCubuk.map((x, i) => cubuk(W(x, KF.h0, KF.Z0), W(x, KF.h1, KF.Z0), 0.005 * pp1 + 1, `c${i}`))}
      {(() => { const c = W(0, KF.h1 + 0.03, (KF.Z0 + KF.Z1) / 2); return <ellipse cx={c[0]} cy={c[1]} rx={26} ry={30} fill="none" stroke="#3a3d42" strokeWidth={7} />; })()}
      {/* kapı: çerçeve + 2 çubuk, açı kapA */}
      {(() => {
        const a0 = W(KF.kapi[0], KF.h0 + 0.01, KF.Z0), a1 = W(KF.kapi[0], KF.h1 - 0.01, KF.Z0), b0 = kapiUc(KF.h0 + 0.01), b1 = kapiUc(KF.h1 - 0.01);
        const ic = [0.35, 0.7].map((t) => [W(KF.kapi[0] + 0.12 * t * Math.cos(kapA), KF.h0 + 0.01, KF.Z0 - 0.12 * t * Math.sin(kapA)), W(KF.kapi[0] + 0.12 * t * Math.cos(kapA), KF.h1 - 0.01, KF.Z0 - 0.12 * t * Math.sin(kapA))] as [P, P]);
        return <g>{ic.map(([a, b], i) => cubuk(a, b, 0.005 * pp1 + 1, `k${i}`))}{cerceve([a0, a1, b1, b0, a0], 0.016 * pp1, "kp", kapA < 1.2)}<polyline points={pt([b0, b1])} stroke="#efe6cc" strokeWidth={2.5} /><rect x={a0[0] - 6} y={a0[1] - 40} width={12} height={18} fill="#3a3d42" /><rect x={a1[0] - 6} y={a1[1] + 22} width={12} height={18} fill="#3a3d42" /></g>;
      })()}
      {/* kafesi rime bağlayan kısa halat */}
      {(() => { const a = W(KF.X0, KF.h0 + 0.05, KF.Z0), b = pr(KAM_KAFES, KF.X0 - 0.06, 1.0 + H, KF.Z0 + 0.02); return <path d={`M${a[0]} ${a[1]} Q${a[0] - 30} ${(a[1] + b[1]) / 2 + 14} ${b[0]} ${b[1]}`} stroke={PAL.halat} strokeWidth={6} fill="none" />; })()}
      {p >= kc.bas + 4 && kusCiz}
      {elE && <ParisEl d={elE} tip="parisGri" isik={{ yon: [-0.7, -0.5], renk: PAL.kenar, aci: 72, sertlik: 0.7, murekkep: "#2f2d46" }} />}
    </g>
  );
};

const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const uid = "di" + useId().replace(/:/g, "");
  const gor = param<string>(plan, "gorunum", "masa");
  const mekan = param<string>(plan, "mekan", "paris-atolye");
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <RenkKaydi>
        {gor === "kafes" ? <KafesSahne plan={plan} p={p} uid={uid} kilit={kilit} /> : mekan === "tours-buro" ? <MasaTours plan={plan} p={p} uid={uid} kilit={kilit} /> : <MasaParis plan={plan} p={p} uid={uid} kilit={kilit} />}
      </RenkKaydi>
    </svg>
  );
};
void mz; void elGeometri;
export const DAGRON_INSERT: Sablon = { Sahne, arsiv: () => "gunduzMineral" };
