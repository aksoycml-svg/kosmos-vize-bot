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

// E1 duman: yuvarlak bulut kümeleri, düz 2 ton, tırtıklı kenar (gravür); yukarı + rüzgârla sağa, büyür. Fade yok: yükselip kadrajdan çıkar / incelir.
export const Duman: React.FC<{ kaynak: P; pxm: number; p: number; bas: number; seed: number; yogun?: number; ustSinir?: number }> = ({ kaynak, pxm, p, bas, seed, yogun = 1, ustSinir }) => {
  if (p < bas) return null;
  const N = 14, aralik = 5;
  const bulut = (cx: number, cy: number, r: number, i: number) => {
    const k = 9; let d = "";
    for (let j = 0; j <= k; j++) {
      const a = (j / k) * Math.PI * 2, rr = r * (0.88 + 0.16 * rnd(seed, `b${i}${j}`));
      const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr * 0.86;
      d += j === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : ` Q ${(cx + Math.cos(a - Math.PI / k) * rr * 1.12).toFixed(1)} ${(cy + Math.sin(a - Math.PI / k) * rr * 0.96).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    return d + " Z";
  };
  const parcalar = Array.from({ length: N }).map((_, i) => {
    const dogum = bas + i * aralik; const yas = p - dogum;
    if (yas < 0) return null;
    const dongu = (yas % (N * aralik)) / (N * aralik); // yükselir, yeniden alttan doğar (seed sabit)
    const r = (0.12 + dongu * 0.42) * pxm * yogun * (0.8 + 0.4 * rnd(seed, `r${i}`));
    const x = kaynak[0] + (rnd(seed, `x${i}`) - 0.5) * 0.4 * pxm + dongu * 0.9 * pxm;
    const y = kaynak[1] - dongu * 2.4 * pxm - 0.1 * pxm;
    if (ustSinir !== undefined && y < ustSinir) return null;
    return { x, y, r, i };
  }).filter(Boolean) as { x: number; y: number; r: number; i: number }[];
  return (
    <g>
      {parcalar.map((b) => <path key={`g${b.i}`} d={bulut(b.x + b.r * 0.12, b.y + b.r * 0.1, b.r, b.i)} fill="#4e4844" opacity={0.7} />)}
      {parcalar.map((b) => <path key={`i${b.i}`} d={bulut(b.x - b.r * 0.1, b.y - b.r * 0.12, b.r * 0.78, b.i + 50)} fill="#8a7e70" opacity={0.7} />)}
    </g>
  );
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
