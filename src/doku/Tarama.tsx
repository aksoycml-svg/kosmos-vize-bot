import React, { useId } from "react";
import { Isik } from "./Isik";
import { Derinlik, P, poly, rnd } from "./sabitler";

// ===== Gravür dili: tarama (hatching) — mekanlar.md 11.2 / 11.5 =====
// 4 ton basamağı: I ışık (tarama yok) · II yarı ton (tek yön α .30) · III gölge (tek yön α .55) · IV derin gölge (çapraz, +60°).
// Sahne başına TEK ana yön θ (anahtar ışığa dik); aralık/kalınlık derinliğe göre; seed sabit (kaynamaz); renk ink(dolgu).
// Statik katmanlarla birlikte plakaya pişirilir (still/PNG); canlı katmanda da çalışır.
export type Basamak = "II" | "III" | "IV";
export const TARAMA_ARALIK: Record<Derinlik, number> = { uzak: 11, orta: 8, yakin: 6, insert: 6 };
export const TARAMA_KALINLIK: Record<Derinlik, number> = { uzak: 0.8, orta: 1.1, yakin: 1.4, insert: 1.6 };
const ALFA: Record<Basamak, number> = { II: 0.3, III: 0.55, IV: 0.55 };

// θ: ışık ışınlarının ekrandaki yönüne dik (derece)
export const taramaAcisi = (isik: Isik, sahneMerkez: P = [540, 960]): number => {
  const [dx, dy] = isik.tip === "yonlu" ? isik.yon : [sahneMerkez[0] - isik.zemin[0], sahneMerkez[1] - isik.zemin[1]];
  return (Math.atan2(dy, dx) * 180) / Math.PI + 90;
};
// yüzey normali (ekran, dışa) ile ışık geliş yönünden basamak: ışığa bakan → null (I), yan → II, sırt → III
export const basamakBul = (normal: P, isik: Isik): Basamak | null => {
  const [lx, ly] = isik.tip === "yonlu" ? [-isik.yon[0], -isik.yon[1]] : [0, -1];
  const L = Math.hypot(lx, ly) || 1, N = Math.hypot(normal[0], normal[1]) || 1;
  const c = (normal[0] * lx + normal[1] * ly) / (L * N);
  return c > 0.35 ? null : c > -0.25 ? "II" : "III";
};

// Tek yön çizgi deseni (seed'li ±%8 aralık sapması; uçlar yuvarlak). Dışa açık: atılan gölgeyi `fill=url(#id)` ile taramak için.
export const Desen: React.FC<{ id: string; aci: number; aralik: number; kalin: number; renk: string; alfa: number; seed: number }> = ({ id, aci, aralik, kalin, renk, alfa, seed }) => {
  const T = 240; // karo
  const n = Math.round(T / aralik);
  return (
    <pattern id={id} patternUnits="userSpaceOnUse" width={T} height={T} patternTransform={`rotate(${aci})`}>
      {Array.from({ length: n }).map((_, i) => {
        const y = (i + 0.5) * (T / n) + (rnd(seed, `y${i}`) - 0.5) * aralik * 0.16;
        const x0 = -4 + rnd(seed, `a${i}`) * 6, x1 = T + 4 - rnd(seed, `b${i}`) * 6;
        return <line key={i} x1={x0} y1={y} x2={x1} y2={y + (rnd(seed, `e${i}`) - 0.5) * 1.2} stroke={renk} strokeWidth={kalin} strokeOpacity={alfa} strokeLinecap="round" />;
      })}
    </pattern>
  );
};

// Bir şekli (çokgen ya da path d) basamağa göre tarar
export const Tarama: React.FC<{
  sekil: P[] | string; basamak: Basamak; aci: number; renk: string; derinlik?: Derinlik; seed: number;
  aralik?: number; kalinlik?: number; alfaCarpan?: number;
}> = ({ sekil, basamak, aci, renk, derinlik = "orta", seed, aralik, kalinlik, alfaCarpan = 1 }) => {
  const id = "tr" + useId().replace(/:/g, "");
  const a = aralik ?? TARAMA_ARALIK[derinlik], k = kalinlik ?? TARAMA_KALINLIK[derinlik], al = ALFA[basamak] * alfaCarpan;
  const d = typeof sekil === "string" ? sekil : `M ${poly(sekil).split(" ").join(" L ")} Z`;
  return (
    <g>
      <defs>
        <Desen id={`${id}a`} aci={aci} aralik={a} kalin={k} renk={renk} alfa={al} seed={seed} />
        {basamak === "IV" && <Desen id={`${id}b`} aci={aci + 60} aralik={a} kalin={k} renk={renk} alfa={al} seed={seed + 7} />}
      </defs>
      <path d={d} fill={`url(#${id}a)`} />
      {basamak === "IV" && <path d={d} fill={`url(#${id}b)`} />}
    </g>
  );
};

// Silindir/eğri form takipli tarama (sütun, yuvarlak kule, fıçı, kumaş kıvrımı): dikey çizgiler, gölge tarafına doğru sıklaşır
export const TaramaEgri: React.FC<{ sol: number; sag: number; ust: (x: number) => number; alt: (x: number) => number; golgeYonu: 1 | -1; adim?: number; renk: string; kalinlik?: number; alfa?: number; seed: number }> = ({ sol, sag, ust, alt, golgeYonu, adim = 6, renk, kalinlik = 1.2, alfa = 0.5, seed }) => {
  const W = sag - sol;
  const cizgiler: React.ReactNode[] = [];
  // gölge yarısında başla; yoğunluk kenara doğru artar (aralık adım·(1 − .6t))
  let t = 0.45;
  let i = 0;
  while (t < 1 && i < 200) {
    const xf = golgeYonu === 1 ? sol + W * t : sag - W * t;
    const sap = (rnd(seed, `x${i}`) - 0.5) * adim * 0.15;
    cizgiler.push(<line key={i} x1={xf + sap} y1={ust(xf)} x2={xf + sap} y2={alt(xf)} stroke={renk} strokeWidth={kalinlik} strokeOpacity={alfa * (0.5 + t * 0.5)} strokeLinecap="round" />);
    t += (adim * (1 - 0.6 * t)) / W;
    i++;
  }
  return <g>{cizgiler}</g>;
};

// Litografi renk kaydı kayması: dolgu katmanı konturdan +1.5/+1.0 px kayık + iç kenarda suluboya izi
export const RenkKaydi: React.FC<{ dx?: number; dy?: number; children: React.ReactNode }> = ({ dx = 1.5, dy = 1.0, children }) => (
  <g transform={`translate(${dx},${dy})`}>{children}</g>
);
