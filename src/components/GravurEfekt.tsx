// ===== Gravür efektleri (tasarim.md §5: E1 püskürme / duman / fitil kıvılcımı) — seed sabit, fade ile kaybolma yok =====
// Sönme = küçülme + koyulaşma. Renkler kırmızıya kaymaz (saman/altın-turuncu aralığı [T]).
import React from "react";
import { P, poly, rnd } from "../doku/sabitler";

// E1 püskürme: demet ağızlarından aşağı koni, 3 katman (kenar → alev → çekirdek). Koni titreşimde 0.6–1.0 m, kalkışta 1.6 m.
// zeminY verilir ve koni zemine değerse: zemine çarpıp iki yana yayılır (basık yelpaze) + kıvılcım yağmuru.
export const Puskurme: React.FC<{ agizlar: P[]; asagi: P; pxm: number; p: number; guc: number; uzunluk?: number; zeminY?: number; seed: number }> = ({ agizlar, asagi, pxm, p, guc, uzunluk = 0.8, zeminY, seed }) => {
  if (guc <= 0) return null;
  const titre = 0.8 + 0.2 * Math.sin(p * 1.7) + 0.1 * Math.sin(p * 4.3 + 1);
  const L = uzunluk * pxm * titre * guc;
  const n: P = [-asagi[1], asagi[0]];
  const ort: P = agizlar.reduce<P>((s, q) => [s[0] + q[0] / agizlar.length, s[1] + q[1] / agizlar.length], [0, 0]);
  const koni = (gen0: number, gen1: number, boy: number): P[] => [
    [ort[0] + n[0] * gen0, ort[1] + n[1] * gen0], [ort[0] + asagi[0] * boy + n[0] * gen1, ort[1] + asagi[1] * boy + n[1] * gen1],
    [ort[0] + asagi[0] * boy * 1.06, ort[1] + asagi[1] * boy * 1.06],
    [ort[0] + asagi[0] * boy - n[0] * gen1, ort[1] + asagi[1] * boy - n[1] * gen1], [ort[0] - n[0] * gen0, ort[1] - n[1] * gen0]];
  const id = `pk${seed}`;
  const carpma = zeminY !== undefined && ort[1] + asagi[1] * L > zeminY;

  const kivilcim = Array.from({ length: 18 }).map((_, i) => {
    const omur = 16, bas = Math.floor((p - i * 1.3) / omur) * omur + i * 1.3, t = (p - bas) / omur;
    const sol = rnd(seed, `s${i}${Math.floor(bas)}`) < 0.5 ? -1 : 1;
    const vx = sol * (0.4 + rnd(seed, `v${i}${Math.floor(bas)}`) * 1.0) * pxm, vy = -(0.2 + rnd(seed, `u${i}${Math.floor(bas)}`) * 0.6) * pxm;
    const ox = carpma ? ort[0] : ort[0] + asagi[0] * L * 0.6, oy = carpma ? (zeminY as number) - 0.02 * pxm : ort[1] + asagi[1] * L * 0.6;
    return { x: ox + vx * t, y: oy + vy * t + 0.9 * pxm * t * t, r: Math.max(1.5, (1 - t) * 0.012 * pxm), t };
  });
  return (
    <g>
      <defs><clipPath id={`${id}c`}><rect x={-4000} y={-4000} width={8000} height={(zeminY ?? 6000) + 4000} /></clipPath></defs>
      <g clipPath={`url(#${id}c)`}>
        <polygon points={poly(koni(0.11 * pxm, 0.24 * pxm * guc, L))} fill="#a8642e" opacity={0.85} />
        <polygon points={poly(koni(0.08 * pxm, 0.14 * pxm * guc, L * 0.8))} fill="#f0a040" />
        <polygon points={poly(koni(0.04 * pxm, 0.05 * pxm * guc, L * 0.55))} fill="#ffe6a8" />
      </g>
      {carpma && (() => {
        // zemine çarpan alev: iki yana yayılan, uçları yukarı kıvrılan dil demeti (3 katman); 6 karede bir biçim (seed sabit)
        const zy = zeminY as number, faz = Math.floor(p / 6);
        // 9 dil: çoğu yana (zemin boyunca), birkaçı yukarı kıvrılır; boy 0.25–0.6 m, kök eni 0.14 m
        const ACILAR = [182, 172, 160, 140, 270, 40, 20, 8, -2];
        const dil = (j: number, olc: number) => {
          const a = ((ACILAR[j] + (rnd(seed, `a${faz}${j}`) - 0.5) * 14) * Math.PI) / 180;
          const yan = Math.abs(Math.cos(a));
          const boy = (0.25 + 0.35 * rnd(seed, `d${faz}${j}`)) * (0.6 + 0.6 * yan) * pxm * guc * olc * (0.9 + 0.2 * titre);
          const uc: P = [ort[0] + Math.cos(a) * boy, zy - Math.abs(Math.sin(a)) * boy - yan * 0.08 * pxm * olc];
          const w = 0.08 * pxm * guc * olc, nx = -Math.sin(a), ny = Math.cos(a);
          const kok1: P = [ort[0] + nx * w, zy - 0.02 * pxm + Math.abs(ny) * 0], kok2: P = [ort[0] - nx * w, zy - 0.02 * pxm - w * 0.6];
          const orta: P = [(ort[0] + uc[0]) / 2, (zy + uc[1]) / 2 - 0.05 * pxm * olc];
          return `M ${kok1[0]} ${kok1[1]} Q ${orta[0] + nx * w} ${orta[1] + ny * w * 0.5} ${uc[0]} ${uc[1]} Q ${orta[0] - nx * w} ${orta[1] - w} ${kok2[0]} ${kok2[1]} Z`;
        };
        const katman = (olc: number) => ACILAR.map((_, j) => dil(j, olc)).join(" ");
        return <g>
          <path d={katman(1)} fill="#a8642e" opacity={0.9} />
          <path d={katman(0.72)} fill="#f0a040" />
          <path d={katman(0.4)} fill="#ffe6a8" />
          <ellipse cx={ort[0]} cy={zy - 0.05 * pxm} rx={0.2 * pxm * guc} ry={0.09 * pxm * guc} fill="#ffe6a8" />
        </g>;
      })()}
      {kivilcim.map((k, i) => <circle key={i} cx={k.x} cy={k.y} r={k.r} fill={k.t < 0.5 ? "#ffd27a" : "#f0a040"} />)}
    </g>
  );
};

// E1 duman (v2, K1 S3): her bulut doğduğu karede kaynağın (ağzın) o anki konumunda doğar → duman tabana bağlı; kaynak yükselince arkada İZ kalır.
// Bulut yükselir + rüzgârla sağa, büyür; fade yok (eski bulutlar kadrajdan çıkar / iz olarak durur). Kenar tırtıklı (gravür), düz 2 ton.
// kaynakAt(t): t karesindeki ağız noktası; bit: üretimin bittiği kare (püskürme sönünce yeni bulut doğmaz, mevcutlar kalır).
// yogunAt(t): doğduğu karedeki yoğunluk (eşleşen kesmede önceki plandan devralınan bulut eski yoğunluğunu korur; K1-2 Y1)
export const Duman: React.FC<{ kaynakAt: (t: number) => P; pxmAt: (t: number) => number; p: number; bas: number; bit?: number; seed: number; yogun?: number; yogunAt?: (t: number) => number }> = ({ kaynakAt, pxmAt, p, bas, bit = Infinity, seed, yogun = 1, yogunAt }) => {
  if (p < bas) return null;
  const aralik = 4;
  const bulut = (cx: number, cy: number, r: number, i: number) => {
    const k = 16; let d = "";
    for (let j = 0; j <= k; j++) {
      const a = (j / k) * Math.PI * 2, rr = r * (j % 2 ? 0.82 : 1.0) * (0.92 + 0.12 * rnd(seed, `b${i}${j}`));
      const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr * 0.84;
      d += j === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : ` Q ${(cx + Math.cos(a - Math.PI / k) * rr * 1.16).toFixed(1)} ${(cy + Math.sin(a - Math.PI / k) * rr * 0.98).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    return d + " Z";
  };
  const son = Math.min(p, bit);
  const parcalar: { x: number; y: number; r: number; i: number }[] = [];
  for (let dg = bas, i = 0; dg <= son; dg += aralik, i++) {
    const yas = p - dg, k0 = kaynakAt(dg), m = pxmAt(dg);
    const r = (0.1 + Math.min(yas, 140) * 0.0045) * m * (yogunAt ? yogunAt(dg) : yogun) * (0.8 + 0.4 * rnd(seed, `r${i}`));
    parcalar.push({ x: k0[0] + (rnd(seed, `x${i}`) - 0.5) * 0.35 * m + yas * 0.006 * m, y: k0[1] - 0.06 * m - yas * 0.011 * m, r, i });
  }
  const son40 = parcalar.slice(-60);
  return (
    <g>
      {son40.map((b) => <path key={`g${b.i}`} d={bulut(b.x + b.r * 0.12, b.y + b.r * 0.1, b.r, b.i)} fill="#4e4844" opacity={0.7} />)}
      {son40.map((b) => <path key={`i${b.i}`} d={bulut(b.x - b.r * 0.1, b.y - b.r * 0.12, b.r * 0.76, b.i + 500)} fill="#8a7e70" opacity={0.7} />)}
    </g>
  );
};

// E3 su halkası: 2–3 eş merkezli basık elips (1:4), dışa açılır, kalınlaşmaz incelir. sabit: plan sonuna dek duran tek halka (kanat).
export const SuHalkasi: React.FC<{ x: number; y: number; pxm: number; p: number; bas: number; sure?: number; renk?: string; sabit?: boolean; olcek?: number }> = ({ x, y, pxm, p, bas, sure = 40, renk = "#9fb0bf", sabit, olcek = 1 }) => {
  if (p < bas) return null;
  if (sabit) { const t = Math.min(1, (p - bas) / 20); return <ellipse cx={x} cy={y} rx={(0.5 + 0.3 * t) * pxm * olcek} ry={(0.5 + 0.3 * t) * pxm * olcek * 0.25} fill="none" stroke={renk} strokeWidth={Math.max(1.2, 2.4 - t)} strokeOpacity={0.4} />; }
  if (p > bas + sure) return null;
  return <g>{[0, 1, 2].map((i) => { const t = (p - bas - i * 7) / sure; if (t < 0 || t > 1) return null; const r = (0.2 + t * 1.2) * pxm * olcek; return <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.25} fill="none" stroke={renk} strokeWidth={Math.max(0.8, 3 * (1 - t))} strokeOpacity={0.7} />; })}</g>;
};
// E3 buhar: sıcak boş demet suya değince 4–6 yuvarlak puf, dik yükselir (30 kare), α .5; fade yok → küçülerek söner
export const Buhar: React.FC<{ x: number; y: number; pxm: number; p: number; bas: number; seed: number }> = ({ x, y, pxm, p, bas, seed }) => {
  if (p < bas || p > bas + 34) return null;
  return <g>{[0, 1, 2, 3, 4].map((i) => { const t = (p - bas - i * 2) / 30; if (t < 0 || t > 1) return null; const r = 0.09 * pxm * Math.sin(Math.PI * Math.min(1, t * 1.2)) + 1; return <circle key={i} cx={x + (rnd(seed, `b${i}`) - 0.5) * 0.5 * pxm} cy={y - t * 0.9 * pxm - i * 0.05 * pxm} r={r} fill="#b8b4aa" opacity={0.5} />; })}</g>;
};
// E3 sıçrama: taç biçimli 5–7 damla yayı (20 kare), damlalar parabolle iner ve suya döner
export const Sicrama: React.FC<{ x: number; y: number; pxm: number; p: number; bas: number; seed: number; olcek?: number }> = ({ x, y, pxm, p, bas, seed, olcek = 1 }) => {
  const t = (p - bas) / 20; if (t < 0 || t > 1) return null;
  const m = pxm * olcek;
  return <g>
    <path d={`M ${x - 0.35 * m} ${y} Q ${x - 0.25 * m} ${y - 0.45 * m * Math.sin(Math.PI * t)} ${x} ${y - 0.15 * m * Math.sin(Math.PI * t)} Q ${x + 0.25 * m} ${y - 0.45 * m * Math.sin(Math.PI * t)} ${x + 0.35 * m} ${y} Z`} fill="#a9bccb" opacity={0.55} />
    {Array.from({ length: 6 }).map((_, i) => { const a = Math.PI * (0.15 + 0.7 * (i / 5)), v = (0.9 + 0.4 * rnd(seed, `v${i}`)) * m; const dx = Math.cos(a) * v * t, dy = -Math.sin(a) * v * t * 1.4 + 2.2 * m * t * t; return <path key={i} d={`M ${x + dx} ${y + dy - 0.04 * m} q ${0.02 * m} ${0.03 * m} 0 ${0.05 * m} q ${-0.02 * m} ${-0.02 * m} 0 ${-0.05 * m} Z`} fill="#a9bccb" stroke="#e6eef0" strokeWidth={0.6} />; })}
  </g>;
};

// E1 fitil kıvılcımı (İMZA MOTİFİ — 4 köşeli yıldız yalnız burada): çekirdek yıldız 48 px, hale 140 px, 6–10 parçacık (8–20 karede söner)
export const FitilKivilcimi: React.FC<{ x: number; y: number; p: number; olcek?: number; seed: number }> = ({ x, y, p, olcek = 1, seed }) => {
  const R = 24 * olcek, r = 5 * olcek, puls = 1 + 0.08 * Math.sin(p * 1.9);
  const yildiz = Array.from({ length: 8 }).map((_, i) => { const a = (i * Math.PI) / 4 - Math.PI / 2; const rr = i % 2 === 0 ? R * puls : r * 1.6; return [x + Math.cos(a) * rr, y + Math.sin(a) * rr] as P; });
  return (
    <g>
      <circle cx={x} cy={y} r={70 * olcek} fill="#ffc860" opacity={0.22} style={{ mixBlendMode: "screen" }} />
      <circle cx={x} cy={y} r={36 * olcek} fill="#ffc860" opacity={0.3} style={{ mixBlendMode: "screen" }} />
      <polygon points={poly(yildiz)} fill="#ffd27a" />
      <circle cx={x} cy={y} r={r * 1.4} fill="#fff0c4" />
      {Array.from({ length: 8 }).map((_, i) => { const omur = 8 + Math.round(rnd(seed, `o${i}`) * 12); const t = ((p + i * 3) % omur) / omur; const a = rnd(seed, `a${i}${Math.floor((p + i * 3) / omur)}`) * Math.PI * 2; return <circle key={i} cx={x + Math.cos(a) * t * 40 * olcek} cy={y + Math.sin(a) * t * 30 * olcek + t * t * 20 * olcek} r={Math.max(1, (1 - t) * 3 * olcek)} fill="#f0a040" />; })}
    </g>
  );
};

// E3 taç sıçrama (K1-2 Y5: iniş "şap" teması karede görünür): su yüzündeki basık halkadan 7 sivri dil yükselir (taç), uçlarından damla
// kopar ve parabolle suya döner; 20 kare. H = taç yüksekliği (px; tasarım: baş boyunun ≈1.5×'i), W = taç eni (px). Fade yok: diller
// küçülerek suya iner, damlalar suya değince biter. Ön yarı figürün önünde çizilir (çağıran sıralar), arka yarı `arka` ile.
export const TacSicrama: React.FC<{ x: number; y: number; H: number; W: number; p: number; bas: number; seed: number; yari?: "on" | "arka" | "hepsi" }> = ({ x, y, H, W, p, bas, seed, yari = "hepsi" }) => {
  const t = (p - bas) / 20; if (t < 0 || t > 1) return null;
  // temas karesinde (t=0) taç zaten açılıyor (şap anı görünür); tepe ≈ 7. kare, sonra diller suya iner
  const yuk = Math.sin(Math.PI * Math.min(1, 0.14 + t * 1.0)) ** 0.6;
  const rx = W * (0.32 + 0.22 * t), ry = rx * 0.26, N = 7;
  const diller: React.ReactNode[] = [], damlalar: React.ReactNode[] = [];
  for (let i = 0; i < N; i++) {
    const a = Math.PI * 2 * (i / N) + 0.35 + (rnd(seed, `a${i}`) - 0.5) * 0.3;
    const on = Math.sin(a) > 0; // ekran altı yarı = kameraya yakın (ön)
    if ((yari === "on" && !on) || (yari === "arka" && on)) continue;
    const bx = x + Math.cos(a) * rx, by = y + Math.sin(a) * ry;
    const h = H * yuk * (0.75 + 0.45 * rnd(seed, `h${i}`)) * (on ? 1 : 0.85);
    const egim = Math.cos(a) * W * 0.12 * (0.5 + t);
    const w = Math.max(2.5, W * 0.085 * (1 - 0.4 * t));
    const uc: P = [bx + egim, by - h];
    diller.push(<path key={`d${i}`} d={`M ${bx - w} ${by} Q ${bx - w * 0.3 + egim * 0.4} ${by - h * 0.55} ${uc[0]} ${uc[1]} Q ${bx + w * 0.3 + egim * 0.4} ${by - h * 0.55} ${bx + w} ${by} Z`} fill="#a9bccb" stroke="#e6eef0" strokeWidth={Math.max(1, w * 0.25)} strokeLinejoin="round" />);
    if (t > 0.35) {
      // uçtan kopan damla: kopma anındaki uçtan parabol (suya dönünce biter)
      const td = (t - 0.35) / 0.65, vx = Math.cos(a) * W * 0.5, vy = -H * 0.9;
      const dx = uc[0] + vx * td, dy = by - H * 0.95 * (0.75 + 0.45 * rnd(seed, `h${i}`)) + vy * td + H * 3.2 * td * td;
      if (dy < y + ry) damlalar.push(<path key={`k${i}`} d={`M ${dx} ${dy - w * 0.9} q ${w * 0.7} ${w * 1.1} 0 ${w * 1.6} q ${-w * 0.7} ${-w * 0.5} 0 ${-w * 1.6} Z`} fill="#a9bccb" stroke="#e6eef0" strokeWidth={Math.max(0.8, w * 0.2)} />);
    }
  }
  return <g>
    {yari !== "on" && <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="none" stroke="#e6eef0" strokeWidth={Math.max(1.2, W * 0.03 * (1 - t))} strokeOpacity={0.8} />}
    {diller}{damlalar}
  </g>;
};
