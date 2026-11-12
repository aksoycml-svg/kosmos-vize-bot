// ===== KE-PK-S2 MONTMARTRE dekor modülleri (mekanlar §2v2.9–2v2.12, §2v2-H.2–H.7; tasarım §14.2) =====
// Gök: 5 düz basamak (ufka ölçekli) + litografi geçişi (3 ince çizgi + tane) — gradyan yok, güneş/disk/ışın yok.
// Paris ufuk bandı (UfukBandi, seed 158), toprak/döşeme (MeydanZemin, seed 157), yan ev (SivaCephe, seed 162), çıplak ağaç (seed 159),
// Gare d'Orléans halesi (Polonceau makası, cam şerit, sağ duvar + kolon, alın camı; kemer yok), havadan şehir (seed 173) + ray demeti (seed 182).
// Hepsi dünya → pr(); düzensizlik seed'li ve baştan tanımlı (V3 ızgara dersi). Doku yüzey başına ≤ 3; seed sabit, kaynamaz.
import React from "react";
import type { P } from "../../tipler";
import { golgeVek, IsikAd, Kam, kirp, lerp, PAL, pr, pts, pxm, rng, V3, yolKapali, zeminCokgen } from "./montmartreDunya";

// ---------------------------------------------------------------- GÖK ----------------------------------------------------------------
export const GOK_ORAN = [0.322, 0.583, 0.767, 0.905];
export const gokSinir = (ufuk: number) => GOK_ORAN.map((r) => Math.round(ufuk * r));
export const GokBasamak: React.FC<{ ufuk: number; seed: number; isima?: boolean; renkler?: string[] }> = ({ ufuk, seed, isima = true, renkler }) => {
  const GR = renkler ?? PAL.gok;
  const s = gokSinir(ufuk), sinir = [-2400, ...s, ufuk + 900];
  const X0 = -300, X1 = 1380;
  const r = rng(seed);
  const parca: React.ReactNode[] = GR.map((c, i) => <rect key={`b${i}`} x={X0} y={sinir[i]} width={X1 - X0} height={sinir[i + 1] - sinir[i]} fill={c} />);
  s.forEach((y, i) => {
    const ust = GR[i];
    for (let j = 0; j < 3; j++) parca.push(<rect key={`c${i}-${j}`} x={X0} y={y + 4 + j * 7} width={X1 - X0} height={2.5} fill={ust} opacity={0.4} />);
    const n = Math.round((((X1 - X0) * 24 * 0.08) / 14) * 0.6);
    for (let j = 0; j < n; j++) parca.push(<circle key={`t${i}-${j}`} cx={X0 + r() * (X1 - X0)} cy={y + 24 + r() ** 1.6 * 24} r={1.25} fill={ust} opacity={0.35} />);
  });
  // sol ışıma: ufuk basamağı + üstündeki 60 px, x < %45 — düz kenarlı basamaklar (litografi şeritleri), güneş kadraj dışında solda
  if (isima) {
    const yI = s[3] - 60;
    parca.push(<rect key="is0" x={X0} y={s[3] + 6} width={486 - X0} height={ufuk + 900 - s[3]} fill={PAL.isima} />);
    [[0, 470], [1, 410], [2, 330], [3, 230]].forEach(([j, xr]) => { const y = s[3] + 6 - (j + 1) * 18; parca.push(<rect key={`is${j + 1}`} x={X0} y={Math.max(yI, y)} width={xr - X0} height={14 - j * 2} fill={PAL.isima} opacity={0.85 - j * 0.12} />); });
  }
  return <g>{parca}</g>;
};

// ---------------------------------------------------------------- DUMAN ŞERİDİ (baca) ----------------------------------------------------------------
/** ince, sağa eğik, çözülerek biten şerit (bulut okutmaz); kaynak + boy px; zamanla hafif dalgalanır (seed sabit) */
export const DumanSerit: React.FC<{ kaynak: P; boy: number; kalin: number; renk: string; seed: number; t: number; egim?: number }> = ({ kaynak, boy, kalin, renk, seed, t, egim = 0.55 }) => {
  const r = rng(seed), n = 9, faz = r() * 6;
  const orta: P[] = Array.from({ length: n }, (_, i) => { const u = i / (n - 1); return [kaynak[0] + egim * boy * u * u + Math.sin(u * 5 + faz + t * 0.05) * kalin * 0.8 * u, kaynak[1] - boy * u]; });
  const w = (u: number) => kalin * (0.6 + 0.9 * u) * (1 - Math.pow(u, 3));
  const sol = orta.map((q, i) => [q[0] - w(i / (n - 1)), q[1]] as P), sag = orta.map((q, i) => [q[0] + w(i / (n - 1)), q[1]] as P);
  const kopuk = orta.slice(-2).map((q, i) => <ellipse key={i} cx={q[0] + kalin * (1.5 + i)} cy={q[1] - kalin * (1 + i * 1.5)} rx={kalin * (0.8 - i * 0.3)} ry={kalin * (0.5 - i * 0.2)} fill={renk} />);
  return <g><polygon points={pts([...sol, ...sag.reverse()])} fill={renk} />{kopuk}</g>;
};

// ---------------------------------------------------------------- PARİS UFUK BANDI (meydan) ----------------------------------------------------------------
export const UfukBandi: React.FC<{ seed: number; y0: number; y1: number; t: number; duman?: boolean }> = ({ seed, y0, y1, t, duman = true }) => {
  // mekanlar §2v2.11: uzak buğu y0..y0+34, orta y0+18..y0+48, yakın y0+28..y1 (meydan: 1282 / 1344)
  const r = rng(seed);
  const uz: P[] = [[-50, y1]]; for (let x = -50; x <= 1130; x += 24) uz.push([x, y0 + 2 + r() * 4 + Math.sin(x * 0.02) * 1.5]); uz.push([1130, y1]);
  const orta: React.ReactNode[] = [];
  { let x = -40; let i = 0; while (x < 1120) { const w = 30 + r() * 80, h = 6 + r() * 16, mans = r() < 0.4, top = y0 + 30 - h; orta.push(<polygon key={`o${i++}`} points={pts(mans ? [[x, y1], [x, top + 4], [x + 5, top], [x + w - 5, top], [x + w, top + 4], [x + w, y1]] : [[x, y1], [x, top], [x + w, top], [x + w, y1]])} fill={PAL.buguOrta} />); x += w + r() * 14; } }
  const yakin: React.ReactNode[] = [];
  const bacalar: React.ReactNode[] = [];
  const isikKenar: React.ReactNode[] = [];
  const kaynak: P[] = [];
  { let x = -30, i = 0, onceW = -1, tekrar = 0;
    while (x < 1110) {
      let w = 18 + Math.round(r() * 72);
      if (Math.abs(w - onceW) < 6) { tekrar++; if (tekrar >= 2) w = w > 50 ? w - 24 : w + 24; } else tekrar = 0;
      onceW = w;
      let top = y0 + 28 + r() * 20; if (x < 720 && x + w > 690) top -= 12; // tek yüksek blok
      const tip = r(), g: P[] = tip < 0.55 ? [[x, y1], [x, top + 6], [x + 4, top], [x + w - 4, top], [x + w, top + 6], [x + w, y1]] : tip < 0.85 ? [[x, y1], [x, top + 7], [x + w / 2, top - 2], [x + w, top + 7], [x + w, y1]] : [[x, y1], [x, top], [x + w, top], [x + w, y1]];
      yakin.push(<polygon key={`y${i}`} points={pts(g)} fill={i % 3 === 1 ? PAL.parisTarak : PAL.parisYakin} />);
      if (r() < 0.25) isikKenar.push(<polyline key={`l${i}`} points={pts(g.slice(1, 3))} fill="none" stroke={PAL.parisIsik} strokeWidth={1 + r()} />);
      const nb = r() < 0.35 ? 0 : 1 + Math.floor(r() * 3);
      for (let j = 0; j < nb; j++) { const bx = x + 4 + r() * Math.max(4, w - 10), bh = 3 + r() * 5; bacalar.push(<rect key={`c${i}-${j}`} x={bx} y={top - bh} width={2 + r() * 2.5} height={bh + 3} fill={PAL.parisTarak} />); if ((kaynak.length === 0 && bx > 300 && bx < 360) || (kaynak.length === 1 && bx > 740 && bx < 800)) kaynak.push([bx + 1.5, top - bh]); }
      x += w + (r() < 0.2 ? r() * 18 : 0); i++;
    }
  }
  const dumanK = kaynak.length === 2 ? kaynak : [[330, y0 + 30], [760, y0 + 28]] as P[];
  return (
    <g>
      <polygon points={pts(uz)} fill={PAL.buguUzak} />
      {orta}
      {duman && dumanK.map((q, i) => <DumanSerit key={`d${i}`} kaynak={q} boy={60 + i * 28} kalin={3.2} renk={PAL.duman} seed={seed + 40 + i} t={t} />)}
      {yakin}{bacalar}{isikKenar}
    </g>
  );
};

// ---------------------------------------------------------------- ZEMİN (toprak / hale döşemesi) ----------------------------------------------------------------
export const MeydanZemin: React.FC<{ k: Kam; seed: number; Zuzak: number; X: [number, number]; malzeme?: "toprak" | "hale"; izler?: [number, number, number, number][]; renk?: string }> = ({ k, seed, Zuzak, X, malzeme = "toprak", izler = [], renk = PAL.toprak }) => {
  const r = rng(seed);
  const zemin = zeminCokgen(k, [[X[0], k.Z + 0.3], [X[1], k.Z + 0.3], [X[1], Zuzak], [X[0], Zuzak]]);
  const tane: React.ReactNode[] = [];
  // stipple: dünyada eş yoğunluk (perspektifle sıklaşır), 2–3 px, α .25
  for (let i = 0; i < 1400; i++) {
    const Z = k.Z + 0.6 + Math.pow(r(), 1.8) * (Zuzak - k.Z - 0.6), Xx = X[0] + r() * (X[1] - X[0]);
    const q = pr(k, Xx, 0, Z); if (q[0] < -20 || q[0] > 1100 || q[1] > 1940) continue;
    const s = Math.max(1, Math.min(3, pxm(k, Z) * 0.012));
    tane.push(<circle key={`s${i}`} cx={q[0]} cy={q[1]} r={s} fill={i % 3 ? PAL.stipple : PAL.izIc} opacity={0.3} />);
  }
  const cakil: React.ReactNode[] = [];
  if (malzeme === "toprak") for (let i = 0; i < 40; i++) {
    const Z = k.Z + 3.9 + r() * 5.5, Xx = (r() - 0.5) * 6;
    const q = pr(k, Xx, 0, Z), s = pxm(k, Z) * (0.025 + r() * 0.02);
    cakil.push(<g key={`c${i}`}><ellipse cx={q[0]} cy={q[1]} rx={s} ry={s * 0.55} fill={PAL.cakil} /><ellipse cx={q[0] + s * 0.4} cy={q[1] + s * 0.15} rx={s * 0.6} ry={s * 0.35} fill={PAL.golge} /></g>);
  }
  const iz = izler.map(([x0, z0, x1, z1], i) => {
    const w = 0.05, a = pr(k, x0 - w, 0, z0), b = pr(k, x0 + w, 0, z0), c = pr(k, x1 + w, 0, z1), d = pr(k, x1 - w, 0, z1);
    return <g key={`i${i}`}><polygon points={pts([a, b, c, d])} fill={PAL.izIc} /><line x1={b[0]} y1={b[1]} x2={c[0]} y2={c[1]} stroke={PAL.cakil} strokeWidth={1.5} /></g>;
  });
  return <g><polygon points={pts(zemin)} fill={renk} />{iz}{tane}{cakil}</g>;
};

// ---------------------------------------------------------------- YAN EV (meydan sağı) ----------------------------------------------------------------
export const YAN_EV = { X0: 6, X1: 17, Z0: 7.6, Z1: 15.6, sacak: 6.4, mahya: 9.2, tasma: 0.3 };
export const YanEv: React.FC<{ k: Kam; seed: number }> = ({ k, seed }) => {
  const E = YAN_EV, p = (X: number, h: number, Z: number) => pr(k, X, h, Z), r = rng(seed);
  const dogu = [p(E.X0, 0, E.Z1), p(E.X0, 0, E.Z0), p(E.X0, E.sacak, E.Z0), p(E.X0, E.sacak, E.Z1)];
  const cephe = [p(E.X0, 0, E.Z0), p(E.X1, 0, E.Z0), p(E.X1, E.sacak, E.Z0), p(E.X0, E.sacak, E.Z0)];
  const t = E.tasma, rx = [E.X0 + 4, E.X1 - 4], zm = (E.Z0 + E.Z1) / 2;
  const cKuzey = [p(E.X0 - t, E.sacak - 0.2, E.Z0 - t), p(E.X1 + t, E.sacak - 0.2, E.Z0 - t), p(rx[1], E.mahya, zm), p(rx[0], E.mahya, zm)];
  const cDogu = [p(E.X0 - t, E.sacak - 0.2, E.Z1 + t), p(E.X0 - t, E.sacak - 0.2, E.Z0 - t), p(rx[0], E.mahya, zm)];
  const sacakAlt = [p(E.X0 - t, E.sacak - 0.2, E.Z0 - t), p(E.X1 + t, E.sacak - 0.2, E.Z0 - t), p(E.X1, E.sacak, E.Z0), p(E.X0, E.sacak, E.Z0)];
  const sacakAltD = [p(E.X0 - t, E.sacak - 0.2, E.Z1 + t), p(E.X0 - t, E.sacak - 0.2, E.Z0 - t), p(E.X0, E.sacak, E.Z0), p(E.X0, E.sacak, E.Z1)];
  const pencere = (X0: number, X1: number, h0: number, h1: number, Z: number, parilti: boolean, key: string) => {
    const a = p(X0, h0, Z), b = p(X1, h1, Z);
    const w = b[0] - a[0], h = a[1] - b[1], sv = Math.max(3, w * 0.12);
    return <g key={key}><rect x={a[0]} y={b[1]} width={w} height={h} fill={PAL.derin} /><rect x={a[0] + sv} y={b[1] + sv} width={w - sv} height={h - sv} fill={PAL.cam} />
      <line x1={a[0] + w / 2 + sv / 2} y1={b[1] + sv} x2={a[0] + w / 2 + sv / 2} y2={a[1]} stroke={PAL.derin} strokeWidth={Math.max(2, w * 0.05)} />
      {parilti && <polygon points={pts([[a[0] + sv + 3, b[1] + sv + 4], [a[0] + sv + w * 0.22, b[1] + sv + 4], [a[0] + sv + 3, b[1] + sv + h * 0.3]])} fill={PAL.camParilti} />}
      <rect x={a[0] - 2} y={a[1]} width={w + 4} height={Math.max(3, h * 0.05)} fill={PAL.evCephe} stroke={PAL.derin} strokeWidth={1.5} /></g>;
  };
  const dogPen = (() => { const a = p(E.X0, 3.9, 11.1), b = p(E.X0, 5.5, 12.1), c = p(E.X0, 5.5, 11.1), d = p(E.X0, 3.9, 12.1); return <g><polygon points={pts([a, d, b, c])} fill={PAL.derin} /><polygon points={pts([[a[0] + 3, a[1]], [d[0], d[1]], [b[0], b[1] + 4], [c[0] + 3, c[1] + 4]])} fill={PAL.cam} /></g>; })();
  // baca: doğu eğiminde (X 7.2–7.7, Z 11.4–11.9), çatı yüzeyinden 1.3 m
  const bH = (X: number) => E.sacak + (X - E.X0) * Math.tan((35 * Math.PI) / 180);
  const b0 = 7.2, b1 = 7.7, bz0 = 11.0, bz1 = 11.5, bt = bH(b1) + 1.0;
  const bacaKuzey = [p(b0, bH(b0), bz0), p(b1, bH(b1), bz0), p(b1, bt, bz0), p(b0, bt, bz0)], bacaDogu = [p(b0, bH(b0), bz1), p(b0, bH(b0), bz0), p(b0, bt, bz0), p(b0, bt, bz1)];
  const kulah = [7.35, 7.55].map((X, i) => { const a = p(X - 0.07, bt, bz0 + 0.2), b = p(X + 0.07, bt + 0.3, bz0 + 0.2); return <rect key={i} x={a[0]} y={b[1]} width={b[0] - a[0]} height={a[1] - b[1]} fill={i ? PAL.sandikOn : PAL.sandikIsik} stroke={PAL.derin} strokeWidth={1.5} />; });
  // sıva: tek kabarma lekesi α .10 + 2 ince çatlak (seed 162)
  const leke = (() => { const c = p(E.X0, 1.6 + r() * 2, E.Z0 + 1.5 + r() * 4); return <ellipse cx={c[0]} cy={c[1]} rx={18} ry={30} fill={PAL.derin} opacity={0.1} />; })();
  const catlak = [0, 1].map((i) => { const a = p(E.X0, 2.5 + i * 2.2 + r(), E.Z0 + 2 + r() * 4); return <polyline key={i} points={pts([a, [a[0] + 3, a[1] + 14], [a[0] + 1, a[1] + 26], [a[0] + 4, a[1] + 38]])} fill="none" stroke={PAL.derin} strokeWidth={1.2} opacity={0.7} />; });
  const tarama = (poly: P[], id: string) => <g key={id}><defs><clipPath id={id}><polygon points={pts(poly)} /></clipPath></defs><g clipPath={`url(#${id})`}>{Array.from({ length: 50 }, (_, i) => <line key={i} x1={poly[0][0] - 200 + i * 8} y1={poly[0][1] + 120} x2={poly[0][0] - 200 + i * 8 + 25} y2={poly[0][1] - 120} stroke={PAL.balonTarama} strokeWidth={2} opacity={0.55} />)}</g></g>;
  return (
    <g strokeLinejoin="round">
      <polygon points={pts(dogu)} fill={PAL.evIsik} stroke="#9c8a86" strokeWidth={3} />
      {leke}{catlak}{dogPen}
      <polygon points={pts([p(E.X0, 0, E.Z1), p(E.X0, 0, E.Z0), p(E.X0, 0.4, E.Z0), p(E.X0, 0.4, E.Z1)])} fill="#d6bca8" />
      <polygon points={pts(cephe)} fill={PAL.evCephe} stroke={PAL.derin} strokeWidth={3} />
      <polygon points={pts([p(E.X0, 0, E.Z0), p(E.X1, 0, E.Z0), p(E.X1, 0.4, E.Z0), p(E.X0, 0.4, E.Z0)])} fill="#958eab" />
      {pencere(6.7, 7.7, 3.9, 5.5, E.Z0, true, "p1")}{pencere(6.7, 7.7, 1.0, 2.6, E.Z0, false, "p2")}
      <polygon points={pts(sacakAlt)} fill={PAL.derin} />{tarama(sacakAlt, "evst1")}
      <polygon points={pts(sacakAltD)} fill="#b79f9c" />
      <polygon points={pts(cKuzey)} fill={PAL.catiKuzey} stroke="#4d4560" strokeWidth={3} />
      {[0.25, 0.45, 0.65, 0.82].map((u, i) => { const a = [lerp(cKuzey[0][0], cKuzey[3][0], u), lerp(cKuzey[0][1], cKuzey[3][1], u)], b = [lerp(cKuzey[1][0], cKuzey[2][0], u), lerp(cKuzey[1][1], cKuzey[2][1], u)]; return <line key={`s${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#5d5474" strokeWidth={1.5} />; })}
      <polygon points={pts(cDogu)} fill={PAL.catiDogu} stroke="#7a6774" strokeWidth={3} />
      <polyline points={pts([cDogu[1], cDogu[2], cKuzey[2]])} fill="none" stroke={PAL.kenar} strokeWidth={2.5} />
      <polygon points={pts(bacaDogu)} fill={PAL.evIsik} stroke={PAL.derin} strokeWidth={2} />
      <polygon points={pts(bacaKuzey)} fill={PAL.derin} stroke="#4d4560" strokeWidth={2} />{tarama(bacaKuzey, "evbc")}
      {kulah}
    </g>
  );
};

// ---------------------------------------------------------------- ÇIPLAK AĞAÇ ----------------------------------------------------------------
type Dal = { seviye: number; h0: number; h1: number; x0: number; x1: number; w0: number; w1: number; bx: number };
/** dünya: gövde (X, Z), boy H m; tek derinlik düzleminde dallanır (5 kademe + uç sürgün), sağa asimetri. Dal: yanal x, yükseklik h (m) */
export const agacDallar = (seed: number, H: number, _tac: number, asim: number): Dal[] => {
  const r = rng(seed), out: Dal[] = [];
  const kol = (x0: number, h0: number, aci: number, boy: number, w: number, sev: number) => {
    const egri = (r() - 0.5) * 0.35, x1 = x0 + Math.sin(aci) * boy, h1 = Math.min(H, h0 + Math.cos(aci) * boy);
    const w1 = Math.max(0.025, w * 0.68);
    out.push({ seviye: sev, h0, h1, x0, x1, w0: w, w1, bx: egri * boy });
    if (sev >= 5 || w1 <= 0.03) return;
    const n = sev === 1 ? 3 : r() < 0.4 ? 3 : 2;
    for (let i = 0; i < n; i++) {
      const yay = (i / Math.max(1, n - 1) - 0.5) * (0.75 + 0.05 * sev) + (r() - 0.5) * 0.3;
      const yeniAci = aci * 0.92 + yay + (asim - 0.5) * 0.15;
      kol(x1, h1, yeniAci, boy * (0.7 + r() * 0.14), w1 * (i === 0 ? 1 : 0.85), sev + 1);
    }
  };
  out.push({ seviye: 0, h0: 0, h1: 4.4, x0: 0, x1: 0.12, w0: 0.5, w1: 0.4, bx: 0.1 });
  const n = 4;
  for (let i = 0; i < n; i++) { const aci = -0.7 + (1.55 * i) / (n - 1) + (asim - 0.5) * 0.45 + (r() - 0.5) * 0.15; kol(0.12, 4.4, aci, (H - 4.4) * 0.3 * (aci > 0 ? 1.15 : 1), 0.3, 1); }
  return out;
};
export const CiplakAgac: React.FC<{ k: Kam; X: number; Z: number; seed: number; H?: number; asim?: number }> = ({ k, X, Z, seed, H = 13, asim = 0.6 }) => {
  const dallar = agacDallar(seed, H, 6, asim);
  const ppm = pxm(k, Z);
  const sekil = (c: string) => dallar.map((d, i) => {
    const a = pr(k, X + d.x0, d.h0, Z), b = pr(k, X + d.x1, d.h1, Z), m = pr(k, X + (d.x0 + d.x1) / 2 + d.bx, (d.h0 + d.h1) / 2, Z);
    const w = Math.max(2, ((d.w0 + d.w1) / 2) * ppm);
    return <path key={i} d={`M${a[0].toFixed(1)} ${a[1].toFixed(1)}Q${m[0].toFixed(1)} ${m[1].toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" />;
  });
  return <g><g opacity={0.8} transform="translate(-2 -1)">{sekil(PAL.kenar)}</g><g>{sekil(PAL.agac)}</g></g>;
};
/** ağacın zemin gölgesi: gövde + 3 ana dal (ince dallar gölge vermez) */
export const agacGolge = (k: Kam, isik: IsikAd, X: number, Z: number, seed: number, H = 13, asim = 0.6): P[][] => {
  const g = golgeVek(isik);
  return agacDallar(seed, H, 6, asim).filter((d) => d.seviye <= 1).slice(0, 4).map((d) => {
    const w0 = d.w0 / 2, w1 = d.w1 / 2;
    const A: [number, number] = [X + d.x0 + g[0] * d.h0, Z + g[1] * d.h0], B: [number, number] = [X + d.x1 + g[0] * d.h1, Z + g[1] * d.h1];
    const dx = B[0] - A[0], dz = B[1] - A[1], L = Math.hypot(dx, dz) || 1, nx = -dz / L, nz = dx / L;
    return zeminCokgen(k, [[A[0] + nx * w0, A[1] + nz * w0], [B[0] + nx * w1, B[1] + nz * w1], [B[0] - nx * w1, B[1] - nz * w1], [A[0] - nx * w0, A[1] - nz * w0]]);
  });
};

// ---------------------------------------------------------------- GARE D'ORLÉANS HALESİ ----------------------------------------------------------------
export const HALE = { duvarSol: -39.0, duvarSag: 12.2, eksen: -13.4, sacak: 23, mahya: 35, agizZ: 80, makasZ: [40, 50, 60, 70, 80], orta: 24.4 };
const makasDugum = () => {
  const H = HALE;
  return { solS: [H.duvarSol, H.sacak], solD: [-24.0, H.orta], mahya: [H.eksen, H.mahya], sagK: [-0.6, 29], solK: [-26.2, 29], sagD: [-2.8, H.orta], sagS: [H.duvarSag, H.sacak] } as Record<string, [number, number]>;
};
/** hale arka planı (yukleme): H0 gök maskesi + H1 dış buğu + H2 alın + H3/H4 çatı + H5 makas + H6 sağ duvar/kolon; H7 döşeme ayrı (MeydanZemin hale) */
export const HaleArka: React.FC<{ k: Kam; seed: number; t: number; gok: React.ReactNode; uid: string; zemin?: React.ReactNode; duvarGolge?: React.ReactNode }> = ({ k, seed, gok, uid, zemin, duvarGolge }) => {
  const H = HALE, D = makasDugum(), p = (X: number, h: number, Z: number) => pr(k, X, h, Z);
  const Zm = H.agizZ, Z0 = 37;
  // ağız beşgeni ∪ alın üçgeni (gök + dış buğu yalnız bunun içinde)
  const agiz = [p(H.duvarSol, 0, Zm), p(H.duvarSag, 0, Zm), p(H.duvarSag, H.sacak, Zm), p(H.duvarSol, H.sacak, Zm)];
  const alin = [p(H.duvarSol, H.sacak, Zm), p(H.duvarSag, H.sacak, Zm), p(H.eksen, H.mahya, Zm)];
  const r = rng(seed + 24);
  // dış buğu: alçak adsız bina bandı (UfukBandi alt kümesi, yukarı taşmaz)
  const bandY0 = 830, bandY1 = agiz[0][1];
  const binalar: React.ReactNode[] = [];
  { let x = -220, i = 0; while (x < 800) { const w = 30 + r() * 80, h = 18 + r() * 52; binalar.push(<polygon key={i++} points={pts([[x, bandY1], [x, bandY1 - h], [x + w, bandY1 - h + (r() < 0.4 ? 6 : 0)], [x + w, bandY1]])} fill={i % 3 ? PAL.buguOrta : PAL.buguUzak} />); x += w + r() * 10; } }
  // çatı yüzleri (alttan): her eğim için saçak→mahya; cam şerit %30–%70, Z 37→80
  const egim = (s: [number, number], m: [number, number], u: number): [number, number] => [lerp(s[0], m[0], u), lerp(s[1], m[1], u)];
  const yuz = (s: [number, number], u0: number, u1: number, Za: number, Zb: number) => { const a = egim(s, D.mahya, u0), b = egim(s, D.mahya, u1); return [p(a[0], a[1], Za), p(b[0], b[1], Za), p(b[0], b[1], Zb), p(a[0], a[1], Zb)]; };
  const camPanel: React.ReactNode[] = [];
  for (const s of [D.sagS, D.solS]) for (let Z = Z0; Z < Zm; Z += 10) {
    const Za = Math.max(Z0, Z), Zb = Math.min(Zm, Z + 10), ton = (r() - 0.5) * 0.06;
    const renk = Zb >= Zm - 0.1 ? PAL.buguUzak : ton > 0.01 ? "#d3ccd6" : ton < -0.01 ? "#c6bfca" : PAL.camSerit;
    camPanel.push(<polygon key={`c${s[0]}-${Z}`} points={pts(yuz(s, 0.3, 0.7, Za, Zb))} fill={renk} stroke="#7a7394" strokeWidth={2.5} />);
  }
  // opak çatı alt yüzü + BOYUNA tarama (H2.4): aşıklar = VP'ye yakınsayan tek yönlü çizgiler (makaslara dik değil → kafes oluşmaz)
  const asik = (s0: [number, number], u0: number, u1: number) => { const L = Math.hypot(D.mahya[0] - s0[0], D.mahya[1] - s0[1]), n = Math.round(((u1 - u0) * L) / 0.3); return Array.from({ length: n }, (_, j) => { const u = u0 + ((j + 0.5) / n) * (u1 - u0), a = egim(s0, D.mahya, u), A = p(a[0], a[1], 0.2), B = p(a[0], a[1], Zm); return `M${A[0].toFixed(1)} ${A[1].toFixed(1)}L${B[0].toFixed(1)} ${B[1].toFixed(1)}`; }).join(""); };
  const opak = [D.sagS, D.solS].map((s, i) => <g key={`o${i}`}><polygon points={pts(yuz(s, 0, 0.3, Z0 - 40, Zm))} fill={PAL.catiAlt} /><polygon points={pts(yuz(s, 0.7, 1.0, Z0 - 40, Zm))} fill={PAL.catiAlt} /><path d={asik(s, 0, 0.3) + asik(s, 0.7, 1.0)} fill="none" stroke="#5a5278" strokeWidth={2.5} /></g>);
  // sağ duvar: ışık sınırı h = 23 − 0.2346·(80 − Z) (altı ışık, üstü gölge)
  const Zd0 = Z0 - 6;
  const duvar = [p(H.duvarSag, 0, Zd0), p(H.duvarSag, 0, Zm), p(H.duvarSag, H.sacak, Zm), p(H.duvarSag, H.sacak, Zd0)];
  const sinirH = (Z: number) => Math.max(0, H.sacak - 0.2346 * (Zm - Z));
  const isikBant = [p(H.duvarSag, 0, Zd0), p(H.duvarSag, 0, Zm), p(H.duvarSag, sinirH(Zm), Zm), p(H.duvarSag, sinirH(Zd0), Zd0)];
  const sinirUst = [p(H.duvarSag, sinirH(Zm), Zm), p(H.duvarSag, sinirH(Zd0), Zd0), p(H.duvarSag, sinirH(Zd0) + 1.6, Zd0), p(H.duvarSag, sinirH(Zm) + 1.6, Zm)];
  // dökme demir kolon (H2.2/H2.3): yuvarlak gövde ø 0.6 + dor tipi başlık (boyun halkası · basık yastık · kare abaküs) + eğri konsol + kare plint
  const kolonlar = H.makasZ.map((Z) => {
    const w = 0.6, X0 = H.duvarSag - w, ppm = pxm(k, Z), Xm = H.duvarSag - w / 2;
    const g = [p(H.duvarSag, 0, Z), p(H.duvarSag, 0, Z - 1.07), p(H.duvarSag, sinirH(Z - 1.07), Z - 1.07), p(H.duvarSag, sinirH(Z), Z)];
    const kut = (x0: number, x1: number, h0: number, h1: number) => { const a = p(x0, h0, Z), b = p(x1, h1, Z); return { x: a[0], y: b[1], w: b[0] - a[0], h: a[1] - b[1] }; };
    const gov = kut(X0, H.duvarSag, 0.4, H.sacak - 1.2), gw = Math.max(10, gov.w), gx = gov.x + gov.w / 2 - gw / 2;
    const ab = kut(Xm - 0.45, Xm + 0.45, H.sacak - 0.15, H.sacak), yas = p(Xm, H.sacak - 0.15, Z), yasA = p(Xm, H.sacak - 0.42, Z), boy = kut(Xm - 0.34, Xm + 0.34, H.sacak - 1.2, H.sacak - 1.1);
    const yw = Math.max(gw * 1.15, 0.75 * ppm) / 2, abw = Math.max(gw * 1.5, ab.w);
    const pl = kut(Xm - 0.4, Xm + 0.4, 0, 0.4), plw = Math.max(gw * 1.35, pl.w);
    const ks = p(X0, H.sacak - 1.15, Z), ke = p(X0 - 1.0, H.sacak - 0.15, Z), kc = p(X0, H.sacak - 0.15, Z);
    const tarN = Math.max(2, Math.floor((gw / 2 - 2) / 5));
    return <g key={`k${Z}`}>
      <polygon points={pts(g)} fill={PAL.kolonGolge} />
      <rect x={gx} y={gov.y} width={gw} height={gov.h} fill={PAL.demirMakas} />
      {Array.from({ length: tarN }, (_, j) => <line key={j} x1={gx + gw - 3 - j * 5} y1={gov.y} x2={gx + gw - 3 - j * 5} y2={gov.y + gov.h} stroke="#2f2d46" strokeWidth={2} />)}
      <rect x={gx} y={Math.max(gov.y, p(0, sinirH(Z), Z)[1])} width={2} height={Math.max(0, gov.y + gov.h - Math.max(gov.y, p(0, sinirH(Z), Z)[1]))} fill={PAL.kenar} />
      <path d={`M${ks[0].toFixed(1)} ${ks[1].toFixed(1)}Q${ks[0].toFixed(1)} ${ke[1].toFixed(1)} ${ke[0].toFixed(1)} ${ke[1].toFixed(1)}L${kc[0].toFixed(1)} ${kc[1].toFixed(1)}Z`} fill={PAL.demirMakas} stroke="#2f2d46" strokeWidth={2} />
      <path d={`M${(ks[0] - 1).toFixed(1)} ${(ks[1] + 4).toFixed(1)}Q${(ks[0] - 1).toFixed(1)} ${(ke[1] + 3).toFixed(1)} ${(ke[0] + 4).toFixed(1)} ${(ke[1] + 3).toFixed(1)}`} fill="none" stroke="#9a92ae" strokeWidth={1.5} />
      <rect x={gx + gw / 2 - (gw * 1.1) / 2} y={boy.y} width={gw * 1.1} height={Math.max(3, boy.h)} fill="#2f2d46" />
      <path d={`M${(yas[0] - yw).toFixed(1)} ${yas[1].toFixed(1)}Q${(yas[0] - yw * 0.95).toFixed(1)} ${yasA[1].toFixed(1)} ${(yas[0] - gw / 2).toFixed(1)} ${yasA[1].toFixed(1)}L${(yas[0] + gw / 2).toFixed(1)} ${yasA[1].toFixed(1)}Q${(yas[0] + yw * 0.95).toFixed(1)} ${yasA[1].toFixed(1)} ${(yas[0] + yw).toFixed(1)} ${yas[1].toFixed(1)}Z`} fill={PAL.demirMakas} />
      <line x1={yas[0] - yw * 0.9} y1={yas[1] - 1} x2={yas[0] + yw * 0.9} y2={yas[1] - 1} stroke="#9a92ae" strokeWidth={1.5} />
      <rect x={ab.x + ab.w / 2 - abw / 2} y={ab.y} width={abw} height={Math.max(4, ab.h)} fill="#5a5278" stroke="#2f2d46" strokeWidth={1.5} />
      <rect x={pl.x + pl.w / 2 - plw / 2} y={pl.y} width={plw} height={Math.max(4, pl.h)} fill={PAL.demirMakas} stroke="#2f2d46" strokeWidth={1.5} />
    </g>;
  });
  // Polonceau makası (tek dikmeli sade biçim): iki kol, kola dik dikme, dikme ayağından saçağa + mahyaya çekme, yatay orta çekme
  // Polonceau makası (H2.3): kol 0.6 m "demir lama" (alt kenar koyu kontur, üst kenar ışık çizgisi Z ≥ 60), dikme 0.35, çekme 0.12 m;
  // ekran alt sınırları kol ≥ 8, dikme ≥ 6, çekme ≥ 3 px (dekor = cs 1; P06b cs ≥ 1); düğüm noktalarında döküm plaka (ø 1.6 × kol)
  const makaslar = [...H.makasZ].reverse().map((Z) => {
    const ppm = pxm(k, Z), q = (n: [number, number]) => p(n[0], n[1], Z);
    const kol = Math.max(8, 0.6 * ppm), dik = Math.max(6, 0.35 * ppm), cek = Math.max(3, 0.12 * ppm);
    const ln = (a: [number, number], b: [number, number], w: number, key: string, dis = true) => { const A = q(a), B = q(b); return <g key={key}>{dis && <line x1={A[0]} y1={A[1] + 1.5} x2={B[0]} y2={B[1] + 1.5} stroke="#2f2d46" strokeWidth={w + 2} strokeLinecap="round" />}<line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={dis ? PAL.demirMakas : "#2f2d46"} strokeWidth={w} strokeLinecap="round" /></g>; };
    const isik = (a: [number, number], b: [number, number], key: string) => { const A = q(a), B = q(b), L = Math.hypot(B[0] - A[0], B[1] - A[1]) || 1, nx = (B[1] - A[1]) / L, ny = -(B[0] - A[0]) / L, s0 = ny < 0 ? 1 : -1; return <line key={key} x1={A[0] + nx * s0 * (kol / 2 - 1)} y1={A[1] + ny * s0 * (kol / 2 - 1)} x2={B[0] + nx * s0 * (kol / 2 - 1)} y2={B[1] + ny * s0 * (kol / 2 - 1)} stroke="#9a92ae" strokeWidth={1.5} />; };
    const isikKenar = Z >= 70 ? [D.sagK, D.solK].map((n, i) => { const A = q(n), B = q(i ? D.solD : D.sagD); return <line key={`kk${i}`} x1={A[0] - dik / 2} y1={A[1]} x2={B[0] - dik / 2} y2={B[1]} stroke={PAL.kenar} strokeWidth={2} />; }) : null;
    const plaka = [D.solD, D.sagD, D.mahya, D.solS, D.sagS].map((n, i) => { const c = q(n); return <circle key={`pl${i}`} cx={c[0]} cy={c[1]} r={kol * 0.8} fill={PAL.demirMakas} stroke="#2f2d46" strokeWidth={2} />; });
    return <g key={`m${Z}`}>
      {ln(D.sagD, D.sagS, cek, "c1", false)}{ln(D.sagD, D.mahya, cek, "c2", false)}{ln(D.solD, D.solS, cek, "c3", false)}{ln(D.solD, D.mahya, cek, "c4", false)}{ln(D.solD, D.sagD, cek, "c5", false)}
      {ln(D.sagK, D.sagD, dik, "d1")}{ln(D.solK, D.solD, dik, "d2")}
      {ln(D.solS, D.mahya, kol, "k1")}{ln(D.sagS, D.mahya, kol, "k2")}
      {Z >= 60 && <>{isik(D.solS, D.mahya, "i1")}{isik(D.sagS, D.mahya, "i2")}</>}
      {isikKenar}{plaka}
    </g>;
  });
  // alın camı (üçgen) + 4 düşey kayıt (aralıklar eşit değil)
  const kayitX = [-35.6, -27.7, -14.4, -3.4]; // ekran ≈ 70 / 200 / 420 / 600 (mekanlar §2v2-H.4)
  const alinCiz = <g><polygon points={pts(alin)} fill={PAL.buguUzak} />{kayitX.map((X, i) => { const top = H.sacak + ((H.mahya - H.sacak) * (X < H.eksen ? X - H.duvarSol : H.duvarSag - X)) / (H.eksen - H.duvarSol); const a = p(X, H.sacak, Zm), b = p(X, Math.min(H.mahya, top), Zm); return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#7a7394" strokeWidth={2} />; })}</g>;
  // köşe tarama (II) sağ saçak dibinde 40 px şerit
  const kose = [p(H.duvarSag, H.sacak, Zd0), p(H.duvarSag, H.sacak, Zm), p(H.duvarSag - 2.2, H.sacak + 1.05, Zm), p(H.duvarSag - 2.2, H.sacak + 1.05, Zd0)];
  const sinirTarama = (() => { const id = `${uid}st`; return <g><defs><clipPath id={id}><polygon points={pts(sinirUst)} /></clipPath><clipPath id={`${id}k`}><polygon points={pts(kose)} /></clipPath></defs>
    <g clipPath={`url(#${id})`}>{Array.from({ length: 70 }, (_, i) => <line key={i} x1={700 + i * 7} y1={300} x2={700 + i * 7 + 32} y2={700} stroke={PAL.balonTarama} strokeWidth={2} opacity={0.6} />)}</g>
    <g clipPath={`url(#${id}k)`}>{Array.from({ length: 70 }, (_, i) => <line key={i} x1={700 + i * 7} y1={-200} x2={700 + i * 7 + 70} y2={600} stroke={PAL.balonTarama} strokeWidth={2} opacity={0.6} />)}</g></g>; })();
  return (
    <g>
      <defs><clipPath id={`${uid}ag`}><polygon points={pts(agiz)} /><polygon points={pts(alin)} /></clipPath></defs>
      <rect x={-300} y={-1200} width={1700} height={2400} fill={PAL.catiAlt} />
      <g clipPath={`url(#${uid}ag)`}>{gok}<rect x={-300} y={bandY0 + 40} width={1700} height={10} fill={PAL.buguUzak} opacity={0} />{binalar}</g>
      {alinCiz}
      {opak}{camPanel}
      {zemin}
      <polygon points={pts(duvar)} fill={PAL.derin} />
      <polygon points={pts(isikBant)} fill={PAL.duvarIsik} />
      {duvarGolge && <g><defs><clipPath id={`${uid}db`}><polygon points={pts(isikBant)} /></clipPath></defs><g clipPath={`url(#${uid}db)`}>{duvarGolge}</g></g>}
      {sinirTarama}
      {kolonlar}
      {makaslar}
      <line x1={agiz[1][0]} y1={agiz[1][1]} x2={agiz[2][0]} y2={agiz[2][1]} stroke={PAL.demirMakas} strokeWidth={4} />
    </g>
  );
};

// ---------------------------------------------------------------- HAVADAN ŞEHİR + RAY DEMETİ ----------------------------------------------------------------
type Parsel = { poly: [number, number][]; h: number; tip: number; dMin: number; avlu?: [number, number][] };
const sehirCache = new Map<number, { parseller: Parsel[]; agaclar: [number, number][] }>();
const RAY_ESIK = 26; // ray koridoru yarı genişliği (m): içinde bina yok
const bulvarHat = (X: number, D: number) => (X - 40) * 0.866 + (D - 260) * 0.5; // diyagonal bulvar ekseni (sağdan sol-üste), işaretli uzaklık ≈ (|.|)
export const sehirModel = (seed: number) => {
  const c = sehirCache.get(seed); if (c) return c;
  const r = rng(seed), parseller: Parsel[] = [], agaclar: [number, number][] = [];
  const lognorm = (a: number, b: number) => Math.exp(Math.log(a) + r() * (Math.log(b) - Math.log(a)));
  const sokak = () => { const u = r(); return u < 0.55 ? 8 : u < 0.88 ? 14 : 30; };
  let D = 30;
  while (D < 1600) {
    const bant = lognorm(150, 300), D1 = D + bant, Xlim = D1 * 0.55 + 80;
    let X = -Xlim;
    while (X < Xlim) {
      const w = lognorm(40, 140), s = sokak();
      const aL = (r() - 0.5) * 0.16, aR = (r() - 0.5) * 0.16;
      let Dd = D;
      while (Dd < D1 - 20) {
        const dl = Math.min(D1 - Dd, lognorm(40, 140)), s2 = sokak(), b1 = (r() - 0.5) * 0.12;
        const x0 = X + s / 2, x1 = X + w - s / 2, d0 = Dd + s2 / 2, d1 = Dd + dl - s2 / 2;
        let ada: [number, number][] = [[x0 + aL * (d0 - D), d0], [x1 + aR * (d0 - D), d0 + b1 * (x1 - x0)], [x1 + aR * (d1 - D), d1 + b1 * (x1 - x0)], [x0 + aL * (d1 - D), d1]];
        // ray koridoru ve diyagonal bulvar kırpması
        const sol = kirp(ada, (q) => -RAY_ESIK - (q[0] + 13.4)), sag = kirp(ada, (q) => q[0] + 13.4 - RAY_ESIK);
        const parcalar = [sol, sag].filter((a) => a.length >= 3).flatMap((a) => [kirp(a, (q) => bulvarHat(q[0], q[1]) - 17), kirp(a, (q) => -bulvarHat(q[0], q[1]) - 17)]).filter((a) => a.length >= 3);
        for (ada of parcalar) {
          // parsellere böl (uzun eksen boyunca 3–9)
          const n = 3 + Math.floor(r() * 7);
          const xs = ada.map((q) => q[0]), ds = ada.map((q) => q[1]);
          const enX = Math.max(...xs) - Math.min(...xs), enD = Math.max(...ds) - Math.min(...ds);
          const boyunca = enX > enD ? 0 : 1, lo = boyunca ? Math.min(...ds) : Math.min(...xs), hi = boyunca ? Math.max(...ds) : Math.max(...xs);
          let kat = 4 + Math.floor(r() * 4);
          const kes: number[] = [lo]; for (let i = 1; i < n; i++) kes.push(lo + ((hi - lo) * (i + (r() - 0.5) * 0.5)) / n); kes.push(hi);
          for (let i = 0; i < n; i++) {
            const pp = kirp(kirp(ada, (q) => q[boyunca] - kes[i]), (q) => kes[i + 1] - q[boyunca]);
            if (pp.length < 3) continue;
            let yeni = 4 + Math.floor(r() * 4); if (Math.abs(yeni - kat) < 1) yeni = yeni >= 7 ? yeni - 1 : yeni + 1; kat = yeni;
            parseller.push({ poly: pp, h: kat * 3.2 + 1.5, tip: r(), dMin: Math.min(...pp.map((q) => q[1])) });
          }
          if (enX > 70 && enD > 70 && r() < 0.6) { const cx = xs.reduce((a, b) => a + b) / xs.length, cd = ds.reduce((a, b) => a + b) / ds.length, aw = enX * 0.18, ad = enD * 0.18; parseller.push({ poly: [[cx - aw, cd - ad], [cx + aw, cd - ad], [cx + aw, cd + ad], [cx - aw, cd + ad]], h: -1, tip: 0, dMin: cd - ad }); }
        }
        Dd += dl;
      }
      X += w;
    }
    D = D1;
  }
  // bulvar ağaçları (9–12 m aralık, %10 boşluk): bulvarın iki kenarı
  for (let s = -1600; s < 1600; s += 9 + r() * 3) { if (r() < 0.1) continue; for (const o of [-12, 12]) { const X = 40 + s * 0.5 + o * 0.866, Dg = 260 - s * 0.866 + o * 0.5; if (Dg > 80) agaclar.push([X, Dg]); } }
  const m = { parseller: parseller.sort((a, b) => b.dMin - a.dMin), agaclar };
  sehirCache.set(seed, m);
  return m;
};
/** havadan şehir: kamera yüksekliği H (zemin üstü), ufuk U, F 1500; ışık haleSabah (tek vektör) */
export const HavadanSehir: React.FC<{ H: number; U: number; seed: number; isik: IsikAd; raylar?: boolean; Xk?: number; uid: string }> = ({ H, U, seed, isik, raylar = true, Xk = 0 }) => {
  const F = 1500;
  const prj = (X: number, h: number, D: number): P => [540 + ((X - Xk) * F) / Math.max(1, D), U + ((H - h) * F) / Math.max(1, D)];
  const g = golgeVek(isik);
  const L: [number, number] = [-g[0], -g[1]]; // ışığa doğru yatay (yüz aydınlanma)
  const bugu = (renk: string, D: number) => { const a = Math.min(0.8, D / 1900); return a <= 0.01 ? renk : karis(renk, PAL.buguUzak, a); };
  const Dalt = (H * F) / (1980 - U); // alt kenardaki zemin uzaklığı
  const { parseller, agaclar } = sehirModel(seed);
  const zemin: React.ReactNode[] = [], golgeler: React.ReactNode[] = [], binalar: React.ReactNode[] = [];
  // zemin (ışıkta: avlu / bulvar / ray alanı) — sokaklar binaların gölgesiyle zaten gölgede
  const zemPoly = (a: [number, number][]) => kirp(a, (q) => q[1] - Math.max(5, Dalt * 0.7)).map((q) => prj(q[0], 0, q[1]));
  zemin.push(<polygon key="z" points={pts(zemPoly([[-3000, 5], [3000, 5], [3000, 1500], [-3000, 1500]]))} fill={PAL.bulvar} />);
  let i = 0;
  for (const pc of parseller) {
    if (pc.dMin > 2200 || pc.h < 0) continue;
    if (pc.dMin + 200 < Dalt * 0.7) continue;
    const xs = pc.poly.map((q) => prj(q[0], 0, q[1])[0]); if (Math.max(...xs) < -150 || Math.min(...xs) > 1230) continue;
    const gp = pc.poly.flatMap((q) => [q, [q[0] + g[0] * pc.h, q[1] + g[1] * pc.h] as [number, number]]);
    const gz = kirp(zarfXZ(gp), (q) => q[1] - Math.max(5, Dalt * 0.6)).map((q) => prj(q[0], 0, q[1]));
    if (gz.length > 2) golgeler.push(<polygon key={`g${i}`} points={pts(gz)} fill={bugu(PAL.sokak, pc.dMin)} />);
    i++;
  }
  for (const pc of parseller) {
    if (pc.dMin > 2200) continue;
    if (pc.dMin + 200 < Dalt * 0.7) continue;
    const xs = pc.poly.map((q) => prj(q[0], 0, q[1])[0]); if (Math.max(...xs) < -150 || Math.min(...xs) > 1230) continue;
    const D = pc.dMin, kont = D < 300 ? 2.5 : 0;
    if (pc.h < 0) { binalar.push(<polygon key={`a${i++}`} points={pts(pc.poly.map((q) => prj(q[0], 16, q[1])))} fill={bugu("#6a6280", D)} />); continue; }
    const n = pc.poly.length, yuzler: React.ReactNode[] = [];
    for (let j = 0; j < n; j++) {
      const A = pc.poly[j], B = pc.poly[(j + 1) % n];
      const nx = B[1] - A[1], nz = -(B[0] - A[0]); // dışa normal (saat yönü varsayımı; işaret aşağıda düzeltilir)
      const cx = pc.poly.reduce((s, q) => s + q[0], 0) / n, cz = pc.poly.reduce((s, q) => s + q[1], 0) / n;
      const sgn = ((A[0] + B[0]) / 2 - cx) * nx + ((A[1] + B[1]) / 2 - cz) * nz > 0 ? 1 : -1;
      const n2: [number, number] = [nx * sgn, nz * sgn], m: [number, number] = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
      if ((Xk - m[0]) * n2[0] + (0 - m[1]) * n2[1] <= 0) continue; // kameraya dönük değil
      const isikli = n2[0] * L[0] + n2[1] * L[1] > 0;
      const q = [prj(A[0], 0, A[1]), prj(B[0], 0, B[1]), prj(B[0], pc.h, B[1]), prj(A[0], pc.h, A[1])];
      const mans = pc.tip < 0.6;
      yuzler.push(<polygon key={j} points={pts(q)} fill={bugu(isikli ? PAL.blokIsik : PAL.blokGolge, D)} />);
      if (mans) { const q2 = [prj(A[0], pc.h - 2.8, A[1]), prj(B[0], pc.h - 2.8, B[1]), q[2], q[3]]; yuzler.push(<polygon key={`b${j}`} points={pts(q2)} fill={bugu(isikli ? PAL.mansardIsik : PAL.parisTarak, D)} />); }
    }
    const cati = pc.poly.map((q) => prj(q[0], pc.h, q[1]));
    const catiRenk = pc.tip < 0.6 ? (pc.tip < 0.3 ? PAL.mansardIsik : "#b4abc8") : PAL.blokIsik;
    binalar.push(<g key={`p${i++}`}>{yuzler}<polygon points={pts(cati)} fill={bugu(catiRenk, D)} stroke={kont ? bugu("#7a7394", D) : "none"} strokeWidth={kont} strokeLinejoin="round" />
      {pc.tip >= 0.6 && D < 700 && (() => { const a = cati[0], b = cati[1], c2 = cati[2], d = cati[3] ?? cati[2]; return <polygon points={pts([[(a[0] + d[0]) / 2, (a[1] + d[1]) / 2], [(b[0] + c2[0]) / 2, (b[1] + c2[1]) / 2], c2, d])} fill={bugu(PAL.blokGolge, D)} />; })()}
      {D < 420 && pc.tip * 10 % 1 < 0.75 && (() => { const nb = 1 + Math.floor((pc.tip * 37) % 4), cx = pc.poly.reduce((s, q) => s + q[0], 0) / n, cz = pc.poly.reduce((s, q) => s + q[1], 0) / n; return Array.from({ length: nb }, (_, j) => { const b = prj(cx - 4 + j * 3, pc.h, cz + ((j * 7) % 5) - 2), t2 = prj(cx - 4 + j * 3, pc.h + 2.2, cz + ((j * 7) % 5) - 2); return <line key={j} x1={b[0]} y1={b[1]} x2={t2[0]} y2={t2[1]} stroke={bugu("#5d5474", D)} strokeWidth={Math.max(1.5, (1.6 * F) / D)} />; }); })()}
    </g>);
  }
  // diyagonal bulvar ağaçları (nokta + kısa gölge)
  const ag = agaclar.filter(([X, D]) => D > Dalt * 0.7 && D < 900).map(([X, D], j) => { const q = prj(X, 6, D), s = Math.max(1.5, (1.8 * F) / D); const gq = prj(X + g[0] * 6, 0, D + g[1] * 6); return <g key={`t${j}`}><line x1={q[0]} y1={q[1] + s} x2={gq[0]} y2={gq[1]} stroke={bugu(PAL.sokak, D)} strokeWidth={s * 0.8} /><circle cx={q[0]} cy={q[1]} r={s} fill={bugu(PAL.agacNokta, D)} /></g>; });
  // ray demeti: eksen −13.4, yarı genişlik 20 (D ≤ 120) → 7 (D 400), hat 9 → 4
  const ray: React.ReactNode[] = [];
  if (raylar) {
    const yg = (D: number) => (D <= 120 ? 20 : D >= 400 ? 7 : 20 - ((D - 120) * 13) / 280);
    const Ds = [Math.max(5, Dalt * 0.7)]; while (Ds[Ds.length - 1] < 4000) Ds.push(Ds[Ds.length - 1] * 1.12);
    const kenar = (s: number) => Ds.map((D) => prj(-13.4 + s * yg(D), 0, D));
    ray.push(<polygon key="yt" points={pts([...kenar(-1), ...kenar(1).reverse()])} fill={PAL.bulvar} />);
    for (let h = 0; h < 9; h++) {
      const f9 = -1 + (2 * h + 1) / 9, hedef = -1 + (2 * Math.min(3, Math.floor((h * 4) / 9)) + 1) / 4;
      const hat = Ds.filter((D) => D < 600).map((D) => { const t = D <= 120 ? 0 : D >= 400 ? 1 : (D - 120) / 280; return prj(-13.4 + yg(D) * lerp(f9, hedef, t) * 0.85, 0, D); });
      if (hat.length > 1) ray.push(<polyline key={`r${h}`} points={pts(hat)} fill="none" stroke={PAL.agacNokta} strokeWidth={2} />);
    }
  }
  // uzak buğu (D > 1500): ufuktan y = U + H·F/1500'e; üst kenarı hafif dalgalı; içinde seyrek açık çatı lekeleri (orta bant dili)
  const r = rng(seed + 9), bY = U + (H * F) / 1500;
  const ust: P[] = []; for (let x = -100; x <= 1180; x += 30) ust.push([x, U - 3 - r() * 4]);
  const leke: React.ReactNode[] = [];
  for (let j = 0; j < 70; j++) { const D = 1500 + r() * 2500, X = (r() - 0.5) * D * 0.9, q = prj(X, 18, D), w = (25 + r() * 60) * 1500 / D; if (q[1] > bY) continue; leke.push(<rect key={`l${j}`} x={q[0]} y={q[1]} width={w} height={Math.max(1.5, 2.5 * 1500 / D)} fill={j % 3 ? PAL.buguOrta : PAL.parisIsik} opacity={0.7} />); }
  const uzak = <g><polygon points={pts([...ust, [1180, bY + 4], [-100, bY + 4]])} fill={PAL.buguUzak} />{leke}</g>;
  return <g>{uzak}{zemin}{ray}{golgeler}{ag}{binalar}</g>;
};
const zarfXZ = (a: [number, number][]) => {
  const s = [...a].sort((p, q) => p[0] - q[0] || p[1] - q[1]);
  const cr = (o: number[], p: number[], q: number[]) => (p[0] - o[0]) * (q[1] - o[1]) - (p[1] - o[1]) * (q[0] - o[0]);
  const lo: [number, number][] = [], hi: [number, number][] = [];
  for (const p of s) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
  for (const p of [...s].reverse()) { while (hi.length >= 2 && cr(hi[hi.length - 2], hi[hi.length - 1], p) <= 0) hi.pop(); hi.push(p); }
  return [...lo.slice(0, -1), ...hi.slice(0, -1)];
};
const h2 = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const karis = (a: string, b: string, t: number) => { const A = h2(a), B = h2(b); return `#${A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("")}`; };
export { karis, yolKapali };
export type { V3 };

// ---------------------------------------------------------------- SARKIK ZARF (atölye; mekanlar H2.6) ----------------------------------------------------------------
/** Makas orta çekmesinden tek halatla asılı, yarı inik kumaş (ağ/halka/sepet yok). Z düzleminde; ışık sınırı h 19.5 (altı ağız güneşi). */
export const SarkikZarf: React.FC<{ k: Kam; X: number; Z: number; seed: number; ust?: number; alt?: number; asma?: number }> = ({ k, X, Z, seed, ust = 23.4, alt = 15, asma = 24.4 }) => {
  const r = rng(seed), p = (x: number, h: number) => pr(k, X + x, h, Z);
  // profil: üstte 0.5 m toplanmış boğum → h 19.5–20.5'te 4 m en → alta toplanmış, düzensiz etek
  const prof: [number, number][] = [[ust, 0.28], [ust - 0.8, 0.9], [ust - 2.2, 1.7], [20.2, 2.0], [19, 1.95], [17.6, 1.6], [16.4, 1.05]];
  const sag = prof.map(([h, w]) => p(w * (1 + (r() - 0.5) * 0.08), h)), sol = prof.map(([h, w]) => p(-w * (1 + (r() - 0.5) * 0.08), h)).reverse();
  const etek: P[] = Array.from({ length: 7 }, (_, i) => { const t = i / 6, x = 1.05 - 2.1 * t; return p(x, alt + 0.6 * Math.abs(Math.sin(t * 9 + r())) + (i % 2 ? 0.5 : 0)); });
  const govde: P[] = [...sag, ...etek, ...sol];
  const sinir = pr(k, 0, 19.5, Z)[1];
  const id = `sz${seed}`;
  const kivrim = [-1.3, -0.6, 0.1, 0.75, 1.35].map((x, i) => { const a = p(x * 0.25, ust - 0.6), m = p(x * 1.05 + (r() - 0.5) * 0.3, 19.2), b = p(x * 0.7 + (r() - 0.5) * 0.2, alt + 0.7); return <path key={i} d={`M${a[0].toFixed(1)} ${a[1].toFixed(1)}Q${m[0].toFixed(1)} ${m[1].toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`} fill="none" stroke={PAL.balonTarama} strokeWidth={2} strokeLinecap="round" />; });
  const cx = pr(k, X, 0, Z)[0];
  const asmaA = pr(k, X, asma, Z), asmaB = p(0, ust);
  return (
    <g>
      <line x1={asmaA[0]} y1={asmaA[1]} x2={asmaB[0]} y2={asmaB[1]} stroke={PAL.halat} strokeWidth={2} />
      <circle cx={asmaA[0]} cy={asmaA[1]} r={3} fill={PAL.halatGolge} />
      <defs><clipPath id={id}><polygon points={pts(govde)} /></clipPath></defs>
      <polygon points={pts(govde)} fill={PAL.balonGolge} />
      <g clipPath={`url(#${id})`}>
        <rect x={cx - 200} y={sinir} width={200} height={400} fill={PAL.balonIsik} />
        <rect x={cx} y={sinir} width={200} height={400} fill={PAL.terminator} />
        {kivrim}
      </g>
      <polygon points={pts(govde)} fill="none" stroke={PAL.konturGolge} strokeWidth={2.5} strokeLinejoin="round" />
      {(() => { const a = p(-0.3, ust), b = p(0.3, ust); return <rect x={a[0]} y={a[1] - 3} width={b[0] - a[0]} height={6} fill={PAL.halka} />; })()}
    </g>
  );
};
