import React, { useId } from "react";
import { AhsapYuzey } from "./AhsapYuzey";
import { Derinlik, Esleme, P, dortgen, ink, karistir, lerp, lp, parca, poly, rnd, tonla } from "./sabitler";

// ===== Mimari söz dağarcığı (eleştiri A, sistemik 4) =====
// Doku modülleri yüzey üretir; bunlar BİÇİM üretir. Hepsi bir eşleme (u,v)→ekran ile çalışır: düz duvar (dikdortgen)
// ya da perspektifli duvar (dortgen / oda().nokta). u yatay (soldan sağa), v dikey (0 üst … 1 alt).

// ---------- Kemerli pencere: yarım daire kemer + söve + ceviz kayıtlar + alt pervaz; cam dolgusu verilir ----------
export const KemerliPencere: React.FC<{ m: Esleme; cam: string; camIc?: React.ReactNode; tas?: string; kayit?: string; kemerOran?: number; kalin?: number }> = ({ m, cam, camIc, tas = "#efe2bd", kayit = "#5b3d25", kemerOran = 0.28, kalin = 1 }) => {
  const id = "kp" + useId().replace(/:/g, "");
  const kontur = (pad: number): P[] => {
    const pts: P[] = [m(-pad, 1 + pad * 0.3)];
    for (let i = 0; i <= 16; i++) { const t = Math.PI * (i / 16); pts.push(m(0.5 - (0.5 + pad) * Math.cos(t), kemerOran - (kemerOran + pad * 0.5) * Math.sin(t))); }
    pts.push(m(1 + pad, 1 + pad * 0.3));
    return pts;
  };
  const ic = kontur(0), sove = kontur(0.16);
  const bar = (a: P, b: P, w: number, k: string) => <polyline key={k} points={poly([a, b])} stroke={kayit} strokeWidth={w * kalin} fill="none" strokeLinecap="round" />;
  return (
    <g>
      <defs><clipPath id={`${id}c`}><polygon points={poly(ic)} /></clipPath></defs>
      <polygon points={poly(sove)} fill={tas} stroke={ink(tas)} strokeWidth={2} />
      {/* kilit taşı */}
      <polygon points={poly([m(0.42, -0.04), m(0.58, -0.04), m(0.55, 0.05), m(0.45, 0.05)])} fill={tonla(tas, 0.04)} stroke={ink(tas)} strokeWidth={1.5} />
      <polygon points={poly(ic)} fill={cam} />
      <g clipPath={`url(#${id}c)`}>{camIc}</g>
      {bar(m(0.5, 0), m(0.5, 1), 6, "v")}
      {[0.48, 0.74].map((v) => bar(m(0, v), m(1, v), 5, `h${v}`))}
      {bar(m(0, kemerOran), m(1, kemerOran), 5, "k")}
      {[0.22, 0.78].map((u) => bar(m(0.5, kemerOran), m(u, kemerOran - kemerOran * 0.8), 4, `r${u}`))}
      <polygon points={poly(ic)} fill="none" stroke={kayit} strokeWidth={9 * kalin} />
      {/* alt pervaz (denizlik) */}
      <polygon points={poly([m(-0.2, 1.02), m(1.2, 1.02), m(1.24, 1.08), m(-0.24, 1.08)])} fill={tonla(tas, -0.05)} stroke={ink(tas)} strokeWidth={1.5} />
    </g>
  );
};

// ---------- Pilastr: yivli gövde, iyonik başlık (volüt), kaide; ışık tarafı ----------
export const Pilastr: React.FC<{ m: Esleme; renk?: string; isik?: "sol" | "sag"; yiv?: number }> = ({ m, renk = "#efe2bd", isik = "sol", yiv = 3 }) => {
  const gol = tonla(renk, -0.22);
  return (
    <g>
      <polygon points={poly(parca(m, 0.08, 0.92, 0.08, 0.93))} fill={renk} stroke={ink(renk)} strokeWidth={1.5} />
      <polygon points={poly(isik === "sol" ? parca(m, 0.7, 0.92, 0.08, 0.93) : parca(m, 0.08, 0.3, 0.08, 0.93))} fill={gol} opacity={0.6} />
      {Array.from({ length: yiv }).map((_, i) => { const u = 0.25 + (0.5 * (i + 0.5)) / yiv; return <polyline key={i} points={poly([m(u, 0.11), m(u, 0.9)])} stroke={gol} strokeWidth={2.5} opacity={0.7} fill="none" />; })}
      {/* başlık: abak + iki volüt */}
      <polygon points={poly(parca(m, -0.06, 1.06, 0, 0.035))} fill={tonla(renk, 0.03)} stroke={ink(renk)} strokeWidth={1.5} />
      <polygon points={poly(parca(m, 0.02, 0.98, 0.035, 0.08))} fill={renk} stroke={ink(renk)} strokeWidth={1.2} />
      {[0.1, 0.9].map((u) => { const c = m(u, 0.058), r = Math.max(3, Math.abs(m(1, 0)[0] - m(0, 0)[0]) * 0.11); return <g key={u}><circle cx={c[0]} cy={c[1]} r={r} fill={renk} stroke={ink(renk)} strokeWidth={1.5} /><circle cx={c[0]} cy={c[1]} r={r * 0.4} fill={gol} /></g>; })}
      {/* kaide */}
      <polygon points={poly(parca(m, -0.04, 1.04, 0.93, 1))} fill={tonla(renk, -0.06)} stroke={ink(renk)} strokeWidth={1.5} />
    </g>
  );
};

// ---------- Korniş / silme: çok bantlı profil (üstte ışık filetosu, altta gölge) ----------
export const Kornis: React.FC<{ m: Esleme; renk?: string; golgeAlt?: boolean }> = ({ m, renk = "#e8d8ae", golgeAlt = true }) => (
  <g>
    <polygon points={poly(parca(m, 0, 1, 0, 0.2))} fill={tonla(renk, 0.06)} />
    <polygon points={poly(parca(m, 0, 1, 0.2, 0.55))} fill={renk} />
    <polygon points={poly(parca(m, 0, 1, 0.55, 0.7))} fill={tonla(renk, -0.18)} />
    <polygon points={poly(parca(m, 0, 1, 0.7, 1))} fill={tonla(renk, -0.06)} />
    {/* diş sırası (dentil) */}
    {Array.from({ length: 24 }).map((_, i) => <polygon key={i} points={poly(parca(m, i / 24 + 0.008, (i + 0.55) / 24, 0.72, 0.95))} fill={tonla(renk, 0.02)} />)}
    <polyline points={poly([m(0, 0), m(1, 0)])} stroke={ink(renk)} strokeWidth={1.5} fill="none" />
    {golgeAlt && <polygon points={poly(parca(m, 0, 1, 1, 1.35))} fill="#3a2a16" opacity={0.18} />}
  </g>
);

// ---------- Kiriş: meşe kiriş, alt yüzü gölgede (tavan) ----------
export const Kiris: React.FC<{ on: [P, P, P, P]; alt?: [P, P, P, P]; seed: number; derinlik?: Derinlik }> = ({ on, alt, seed, derinlik = "orta" }) => (
  <g>
    {alt && <polygon points={poly(alt)} fill="#2a1c10" stroke={ink("#2a1c10")} strokeWidth={1.5} />}
    <AhsapYuzey m={dortgen(...on)} boyut={[Math.hypot(on[1][0] - on[0][0], on[1][1] - on[0][1]), Math.hypot(on[3][0] - on[0][0], on[3][1] - on[0][1])]} tur="mese" taban="#4a3220" seed={seed} derinlik={derinlik} />
    {/* balta izleri */}
    {Array.from({ length: 5 }).map((_, i) => { const c = dortgen(...on)(0.15 + rnd(seed, `b${i}`) * 0.7, 0.3 + rnd(seed, `bv${i}`) * 0.4); return <line key={i} x1={c[0] - 8} y1={c[1]} x2={c[0] + 8} y2={c[1] + 1} stroke="#1e140c" strokeWidth={1.4} opacity={0.4} />; })}
  </g>
);

// ---------- Saçak alt yüzü: alçak kameradan görülen kiremit uçları sırası + saçak gölgesi (Bordeaux: çatı YÜZEYİ görünmez) ----------
export const Sacak: React.FC<{ a: P; b: P; kalin: number; tip?: "tuile" | "arduvaz"; gece?: number; seed: number }> = ({ a, b, kalin, tip = "tuile", gece = 0, seed }) => {
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const n = Math.max(4, Math.round(L / Math.max(6, kalin * 1.1)));
  const kir = karistir(tip === "tuile" ? "#a8603e" : "#3c4660", "#1b2236", gece);
  const alt = karistir("#5e2e1e", "#0e1222", gece);
  const nx = 0, ny = -1;
  const els: React.ReactNode[] = [];
  // saçak tahtası / alt yüz (koyu)
  els.push(<polygon key="z" points={poly([a, b, [b[0] + nx * kalin, b[1] + ny * kalin], [a[0] + nx * kalin, a[1] + ny * kalin]])} fill={alt} />);
  for (let i = 0; i < n; i++) {
    const p = lp(a, b, (i + 0.5) / n), r = (L / n) * 0.42;
    const yy = p[1] - kalin * 0.55;
    // kiremit ucu: tuile canal yarım daire ağız (koyu iç), arduvaz düz kenar
    if (tip === "tuile") els.push(<g key={i}><ellipse cx={p[0]} cy={yy} rx={r} ry={kalin * 0.45} fill={tonla(kir, (rnd(seed, `t${i}`) - 0.5) * 0.18)} /><ellipse cx={p[0]} cy={yy + kalin * 0.12} rx={r * 0.55} ry={kalin * 0.22} fill={alt} /></g>);
    else els.push(<rect key={i} x={p[0] - r} y={yy - kalin * 0.3} width={r * 2} height={kalin * 0.5} fill={tonla(kir, (rnd(seed, `t${i}`) - 0.5) * 0.12)} />);
  }
  els.push(<polyline key="k" points={poly([[a[0], a[1] - kalin], [b[0], b[1] - kalin]])} stroke="#c4d6ff" strokeWidth={1.2} opacity={0.35 * (gece > 0 ? 1 : 0)} fill="none" />);
  return <g>{els}</g>;
};

// ---------- Korkuluk: tırabzan + babalar (ahşap ya da taş balüstrad) ----------
export const Korkuluk: React.FC<{ ust: [P, P]; alt: [P, P]; n?: number; renk?: string; tur?: "ahsap" | "tas" }> = ({ ust, alt, n = 10, renk = "#5b3d25", tur = "ahsap" }) => {
  const els: React.ReactNode[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, a = lp(ust[0], ust[1], t), b = lp(alt[0], alt[1], t);
    const w = Math.max(3, Math.abs(ust[1][0] - ust[0][0]) / n * (tur === "tas" ? 0.45 : 0.22));
    if (tur === "tas") els.push(<path key={i} d={`M ${a[0] - w * 0.4} ${a[1]} Q ${a[0] - w} ${lerp(a[1], b[1], 0.55)} ${b[0] - w * 0.5} ${b[1]} L ${b[0] + w * 0.5} ${b[1]} Q ${a[0] + w} ${lerp(a[1], b[1], 0.55)} ${a[0] + w * 0.4} ${a[1]} Z`} fill={renk} stroke={ink(renk)} strokeWidth={1.2} />);
    else els.push(<rect key={i} x={a[0] - w / 2} y={a[1]} width={w} height={b[1] - a[1]} fill={i % 5 === 0 ? tonla(renk, -0.1) : renk} stroke={ink(renk)} strokeWidth={1.2} />);
  }
  const k = Math.max(6, Math.abs(alt[0][1] - ust[0][1]) * 0.12);
  return (
    <g>
      {els}
      <polygon points={poly([[ust[0][0], ust[0][1] - k], [ust[1][0], ust[1][1] - k], ust[1], ust[0]])} fill={tonla(renk, 0.08)} stroke={ink(renk)} strokeWidth={1.5} />
      <polyline points={poly([[ust[0][0], ust[0][1] - k], [ust[1][0], ust[1][1] - k]])} stroke="#f0d8a8" strokeWidth={1.5} opacity={0.5} fill="none" />
      <polygon points={poly([alt[0], alt[1], [alt[1][0], alt[1][1] + k * 0.6], [alt[0][0], alt[0][1] + k * 0.6]])} fill={tonla(renk, -0.12)} />
    </g>
  );
};

// ---------- Masa kenarı: üst yüzün ön kenarı (pah ışığı + el aşınması) + koyu ön yüz (alt güvenli alanı ayrıntısız doldurur) ----------
export const MasaKenari: React.FC<{ sol: P; sag: P; kalin: number; onYuzAlt?: number; renk?: string }> = ({ sol, sag, kalin, onYuzAlt, renk = "#7a5230" }) => (
  <g>
    {/* pah: üst kenarın ışık şeridi */}
    <polyline points={poly([sol, sag])} stroke="#d6a870" strokeWidth={4} opacity={0.75} fill="none" />
    {/* kalınlık (ön kenar) */}
    <polygon points={poly([sol, sag, [sag[0], sag[1] + kalin], [sol[0], sol[1] + kalin]])} fill={tonla(renk, -0.15)} stroke={ink(renk)} strokeWidth={2} />
    <polyline points={poly([[sol[0], sol[1] + kalin * 0.35], [sag[0], sag[1] + kalin * 0.35]])} stroke={ink(renk)} strokeWidth={1.2} opacity={0.5} fill="none" />
    {/* ön yüz / etek tahtası: koyu, ayrıntısız */}
    {onYuzAlt && <polygon points={poly([[sol[0], sol[1] + kalin], [sag[0], sag[1] + kalin], [sag[0], onYuzAlt], [sol[0], onYuzAlt]])} fill="#2a1c12" />}
    {onYuzAlt && <polygon points={poly([[sol[0], sol[1] + kalin], [sag[0], sag[1] + kalin], [sag[0], sag[1] + kalin + 18], [sol[0], sol[1] + kalin + 18]])} fill="#140e08" opacity={0.6} />}
  </g>
);
