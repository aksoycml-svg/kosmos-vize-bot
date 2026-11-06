import React, { useId } from "react";
import type { Isik } from "./Isik";
import { Derinlik, P, poly, rnd } from "./sabitler";

// ===== Gravür dili: tarama (hatching) — mekanlar.md 11.2 / 11.5 + elestiri-C G1–G5 (A4) =====
// Önce TON BLOĞU, sonra çizgi: III/IV basamağı şeklin altına mürekkep renginde yarı saydam bir ton koyar (gölge önce ton olarak okunur).
// Ölçü TELEFONA göre (360 px'te çizgi ≥ 0.5 px kalmalı): yakın 7.5 px aralık / 2.2 px çizgi; orta 9 / 1.6; uzak 12 / 1.1.
// Kural: tarama kalınlığı ≤ kontur/2 (iç kontur 3 px → tarama ≤ 1.6; yakın iç kontur 4.4 → 2.2).
// IV (çapraz) YALNIZ küçük derin gölgede (şeklin ekran kutusu ≤ 120×120 px); büyük alanda IV → III sık tek yön + koyu ton
// (geniş alanda çapraz = kafes / tel örgü okunur, dönem dışı). İkinci yön +40° (60° elmas kafes verir).
// Sahne başına TEK ana yön θ (anahtar ışığa dik); seed sabit (kaynamaz); renk ink(dolgu), asla #000.
export type Basamak = "II" | "III" | "IV";
export const TARAMA_ARALIK: Record<Derinlik, number> = { uzak: 12, orta: 9, yakin: 7.5, insert: 7 };
export const TARAMA_KALINLIK: Record<Derinlik, number> = { uzak: 1.1, orta: 1.6, yakin: 2.2, insert: 2.4 };
const ALFA: Record<Basamak, number> = { II: 0.4, III: 0.62, IV: 0.7 };
// ton bloğu (şeklin altına, mürekkep renginde) — G1
export const TARAMA_TON: Record<Basamak, number> = { II: 0, III: 0.16, IV: 0.28 };
export const CAPRAZ_ACI = 40;
export const CAPRAZ_MAKS = 120; // px: IV çapraz yalnız bu kutuya sığan şekillerde

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

// Şeklin ekran kutusu (çokgen ya da yalnız mutlak koordinatlı path d)
export const sekilKutu = (sekil: P[] | string): [number, number] => {
  const pts: P[] = typeof sekil === "string"
    ? (sekil.match(/-?\d+(\.\d+)?/g) ?? []).map(Number).reduce<P[]>((a, v, i, arr) => (i % 2 ? a : [...a, [v, arr[i + 1] ?? v] as P]), [])
    : sekil;
  if (!pts.length) return [0, 0];
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  return [Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)];
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

// Bir şekli (çokgen ya da path d) basamağa göre tarar: ton bloğu + çizgi (+ küçükse çapraz)
export const Tarama: React.FC<{
  sekil: P[] | string; basamak: Basamak; aci: number; renk: string; derinlik?: Derinlik; seed: number;
  aralik?: number; kalinlik?: number; alfaCarpan?: number; ton?: number; // ton: ton bloğu alfası (varsayılan basamağa göre)
  kural?: "nonzero" | "evenodd";
}> = ({ sekil, basamak, aci, renk, derinlik = "orta", seed, aralik, kalinlik, alfaCarpan = 1, ton, kural = "nonzero" }) => {
  const id = "tr" + useId().replace(/:/g, "");
  const [bw, bh] = sekilKutu(sekil);
  const capraz = basamak === "IV" && bw <= CAPRAZ_MAKS && bh <= CAPRAZ_MAKS;
  // büyük IV: tek yön ama %25 sık (kafes yok)
  const a0 = aralik ?? TARAMA_ARALIK[derinlik];
  const a = basamak === "IV" && !capraz ? a0 * 0.75 : a0;
  const k = kalinlik ?? TARAMA_KALINLIK[derinlik], al = ALFA[basamak] * alfaCarpan;
  const t = (ton ?? TARAMA_TON[basamak]) * alfaCarpan;
  const d = typeof sekil === "string" ? sekil : `M ${poly(sekil).split(" ").join(" L ")} Z`;
  return (
    <g className="trm">
      <defs>
        <Desen id={`${id}a`} aci={aci} aralik={a} kalin={k} renk={renk} alfa={al} seed={seed} />
        {capraz && <Desen id={`${id}b`} aci={aci + CAPRAZ_ACI} aralik={a} kalin={k * 0.85} renk={renk} alfa={al * 0.85} seed={seed + 7} />}
      </defs>
      {t > 0 && <path d={d} fill={renk} fillOpacity={t} fillRule={kural} />}
      <path d={d} fill={`url(#${id}a)`} fillRule={kural} />
      {capraz && <path d={d} fill={`url(#${id}b)`} fillRule={kural} />}
    </g>
  );
};

// Silindir/eğri form takipli tarama (sütun, yuvarlak kule, fıçı, kumaş kıvrımı): dikey çizgiler, gölge tarafına doğru sıklaşır
export const TaramaEgri: React.FC<{ sol: number; sag: number; ust: (x: number) => number; alt: (x: number) => number; golgeYonu: 1 | -1; adim?: number; renk: string; kalinlik?: number; alfa?: number; seed: number }> = ({ sol, sag, ust, alt, golgeYonu, adim = 7.5, renk, kalinlik = 1.8, alfa = 0.6, seed }) => {
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
  return <g className="trm">{cizgiler}</g>;
};

// ===== Litografi renk kaydı (11.3, G5) =====
// Gerçek baskı kayması: MÜREKKEP (koyu çizgi + koyu ton) yerinde kalır, renk (dolgu) katmanı +dx/+dy kayar.
// Filtre: koyu pikseller (Y < ~0.25) parlaklıktan alfa ile ayrılır → kaydırılmış kopyanın üstüne konur. Örtme (derinlik sırası) bozulmaz,
// çünkü tek bir düzleştirilmiş plakaya uygulanır. Suluboya kenarı: kaydırılmış renk katmanının kenarında 2 px koyu iz
// (alfa kenarında değil; renk sınırlarında — kaydırma farkından): renk − kaydırılmış renk farkı ile hafif koyulaştırma.
// Kullanım: kamera dönüşümünün DIŞINDA, tüm plakayı (mimari + karakter) sarar; yazılar dışarıda kalır.
export const RenkKaydi: React.FC<{ dx?: number; dy?: number; esik?: number; children: React.ReactNode }> = ({ dx = 1.5, dy = 1.0, esik = 0.26, children }) => {
  const id = "rk" + useId().replace(/:/g, "");
  const k = 12; // alfa = (esik − Y)·k → Y < esik − 1/k tam mürekkep
  return (
    <g>
      <defs>
        <filter id={id} filterUnits="userSpaceOnUse" x={-20} y={-20} width={1120} height={1960} colorInterpolationFilters="sRGB">
          <feOffset in="SourceGraphic" dx={dx} dy={dy} result="renk" />
          {/* suluboya kenarı: renk sınırlarında kayma farkı → hafif koyu iz (α ≈ .10) */}
          <feBlend in="SourceGraphic" in2="renk" mode="difference" result="fark" />
          <feColorMatrix in="fark" type="matrix" values="0 0 0 0 0.16  0 0 0 0 0.12  0 0 0 0 0.08  1.2 1.2 1.2 0 0" result="kenarHam" />
          <feComponentTransfer in="kenarHam" result="kenar"><feFuncA type="table" tableValues="0 0.14 0.14 0.14" /></feComponentTransfer>
          <feComposite in="kenar" in2="renk" operator="over" result="renkKenar" />
          <feColorMatrix in="SourceGraphic" type="matrix" values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  ${-k * 0.2126} ${-k * 0.7152} ${-k * 0.0722} 0 ${k * esik}`} result="murekkep" />
          <feComposite in="murekkep" in2="renkKenar" operator="over" />
        </filter>
      </defs>
      <g filter={`url(#${id})`}>{children}</g>
    </g>
  );
};
