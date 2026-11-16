// ===== HARITA `harita_gorunum: "meis"` (Ben-my-Chree P03/P10b) =====
// Meis (Kastellorizo) ve karşısındaki Anadolu kıyısı (Kaş / Çukurbağ yarımadası güney kıyısı). Kıyı çizgisi STİLİZE: dış veri kullanılmadı
// (Overpass erişilemedi); oranlar yaklaşık (ada ≈ 3.6 × 2 km, liman kuzeydoğu kıyısında, karşı kıyı limandan ≈ 2 km). "Kesin harita" iddiası yok.
// Kâğıt: parşömen (Abd ile aynı), kara #e0d3b4 + yönlü tarama, kıyı mürekkep 4 px, deniz kıyıya paralel dalga çizgileri (litografi haritası dili).
// Parametreler: meis_rota {yon: "kiyiya" | "limana", bas, bit} (mürekkep çizgi kendini çizer) · igne {kare, dusme} (Harita IgneCiz, pirinç) ·
//   plan.kamera (kameraHesapla; etiketler harita_etiketleri ile yazı katmanında, dekor px → `meisNokta`).
import React from "react";
import { Img, staticFile } from "remotion";
import type { Plan } from "../../tipler";
import { param, SablonProps } from "../../ortak";
import { cl, GIRIS } from "../../zaman";
import { interpolate } from "remotion";
import { kameraHesapla } from "../../zaman";

type XY = [number, number];
const KM = 230;
export const meisNokta = (x: number, y: number): XY => [540 + (x - 0.2) * KM, 900 - (y - 1.0) * KM];
const yumusat = (A: XY[]) => { // Catmull-Rom kapalı
  const n = A.length; let d = `M${A[0][0].toFixed(1)},${A[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) { const p0 = A[(i - 1 + n) % n], p1 = A[i], p2 = A[(i + 1) % n], p3 = A[(i + 2) % n];
    d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)},${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)},${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`; }
  return d + " Z";
};
const km = (q: XY[]) => q.map(([x, y]) => meisNokta(x, y));
// ada (km; liman 0,0 kuzeydoğu kıyısındaki koy)
const ADA: XY[] = [[-2.85, -0.55], [-2.55, 0.12], [-2.05, 0.42], [-1.45, 0.52], [-0.95, 0.45], [-0.55, 0.22], [-0.32, 0.02], [-0.22, -0.2], [0.05, -0.28], [0.22, -0.12], [0.3, 0.12],
  [0.52, 0.08], [0.78, -0.18], [0.82, -0.62], [0.55, -1.12], [0.05, -1.5], [-0.6, -1.68], [-1.35, -1.6], [-2.0, -1.38], [-2.55, -1.0]];
const ADACIK: XY[] = [[0.95, 0.42], [1.18, 0.5], [1.26, 0.36], [1.08, 0.28]];
// anakara (kuzey): Çukurbağ yarımadası güney kıyısı → doğuda Kaş koyu; kuzey kenar kadraj dışı
const KARA: XY[] = [[-5, 1.7], [-3.9, 1.95], [-3.0, 2.05], [-2.1, 1.92], [-1.3, 2.02], [-0.6, 2.1], [0.05, 2.0], [0.6, 2.06], [1.3, 2.2], [1.95, 2.42], [2.45, 2.85], [2.6, 3.35], [2.95, 3.6], [3.5, 3.55], [4.2, 3.3], [5, 3.2], [5, 8], [-5, 8]];
const INK = "#2b1d10";
export const meisMi = (plan: Plan) => param<string>(plan, "harita_gorunum", "") === "meis";
const LIMAN: XY = [0.1, 0.0], MEVZI: XY = [0.32, 2.03];
export const meisIgneNokta = (plan: Plan): XY | null => { const r = param<{ yon: string } | null>(plan, "meis_rota", null); return meisNokta(...(r?.yon === "kiyiya" ? LIMAN : LIMAN)); };

export const MeisSahne: React.FC<SablonProps & { Igne: React.FC<{ x: number; y: number; ig: { kare: number; dusme?: number }; p: number }> }> = ({ plan, p, kilit, Igne }) => {
  const k = kameraHesapla(plan.kamera, p);
  const r = param<{ yon: "kiyiya" | "limana"; bas: number; bit: number } | null>(plan, "meis_rota", null);
  const ig = param<{ kare: number; dusme?: number } | null>(plan, "igne", null);
  const [a, b] = r?.yon === "limana" ? [MEVZI, LIMAN] : [LIMAN, MEVZI];
  const A = meisNokta(...a), Bq = meisNokta(...b), C: XY = [(A[0] + Bq[0]) / 2 + 30, (A[1] + Bq[1]) / 2];
  const yol = `M${A[0]},${A[1]} Q${C[0]},${C[1]} ${Bq[0]},${Bq[1]}`;
  const q = r ? GIRIS(interpolate(p, [r.bas, r.bit], [0, 1], cl)) : 0;
  const uc: XY = [(1 - q) ** 2 * A[0] + 2 * (1 - q) * q * C[0] + q * q * Bq[0], (1 - q) ** 2 * A[1] + 2 * (1 - q) * q * C[1] + q * q * Bq[1]];
  const IG = meisNokta(...LIMAN);
  if (r) kilit.push({ ad: "rota ucu", p: [540 + k.cx + (uc[0] - 540) * k.cs, 960 + k.cy + (uc[1] - 960) * k.cs], tur: "dokunus" });
  const adaD = yumusat(km(ADA)), karaD = yumusat(km(KARA)), adacikD = yumusat(km(ADACIK));
  const dalga = (d: string, n: number, id: string) => Array.from({ length: n }).map((_, i) => <path key={`${id}${i}`} d={d} fill="none" stroke="#5d6b86" strokeWidth={2.2} opacity={0.38 - i * 0.07} transform={`translate(540 ${960}) scale(${1 + (i + 1) * 0.035}) translate(-540 -960)`} />);
  return (
    <div style={{ position: "absolute", inset: 0, backgroundColor: "#1a120b", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${k.cx}px,${k.cy}px) scale(${k.cs})` }}>
        <Img src={staticFile("blanc/img/parsomen.jpg")} style={{ position: "absolute", left: -1400, top: -1500, width: 3880, height: 4920, objectFit: "cover", filter: "saturate(0.62)" }} />
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          <defs>
            <pattern id="mTar" patternUnits="userSpaceOnUse" width={9} height={9} patternTransform="rotate(-35)"><rect width={2.5} height={9} fill="#8a7a5c" opacity={0.22 / 0.22} /></pattern>
            <pattern id="mTep" patternUnits="userSpaceOnUse" width={7} height={7} patternTransform="rotate(55)"><rect width={2.2} height={7} fill="#6a5a40" /></pattern>
          </defs>
          {/* deniz: soluk mavi-gri yıkama + kıyıya paralel dalga çizgileri (litografi) */}
          <rect x={-1400} y={-1500} width={3880} height={4920} fill="#7d90a4" opacity={0.55} />
          {Array.from({ length: 34 }).map((_, i) => <line key={`dl${i}`} x1={-200 + (i % 3) * 60} x2={1280} y1={300 + i * 48} y2={300 + i * 48} stroke="#6a7a90" strokeWidth={2} strokeDasharray={`${40 + (i % 4) * 20} ${30 + (i % 3) * 18}`} opacity={0.35} />)}
          {dalga(adaD, 4, "da")}
          {/* anakara: kara + tarama + iç tepe gölgeleri (yamaç), kıyı mürekkep */}
          <path d={karaD} fill="#e0d3b4" />
          <path d={karaD} fill="url(#mTar)" opacity={0.3} />
          {/* kabartma: kıyıya paralel iç eşyükselti çizgileri (gravür) */}
          {[1, 2, 3].map((i) => <path key={`ek${i}`} d={karaD} fill="none" stroke="#8a7a5c" strokeWidth={2} opacity={0.5 - i * 0.1} transform={`translate(0 ${-i * 34})`} />)}
          <path d={karaD} fill="none" stroke="#2b2f45" strokeWidth={4} />
          {[1, 2].map((i) => <path key={`kd${i}`} d={karaD} fill="none" stroke="#5d6b86" strokeWidth={2} opacity={0.3 - i * 0.08} transform={`translate(0 ${i * 16})`} />)}
          {/* ada + adacık */}
          <path d={adaD} fill="#e0d3b4" /><path d={adaD} fill="url(#mTar)" opacity={0.3} />
          {[0.82, 0.64].map((k2, i) => <path key={`ae${i}`} d={adaD} fill="none" stroke="#8a7a5c" strokeWidth={2} opacity={0.45 - i * 0.1} transform={`translate(${meisNokta(-1.0, -0.6)[0]} ${meisNokta(-1.0, -0.6)[1]}) scale(${k2}) translate(${-meisNokta(-1.0, -0.6)[0]} ${-meisNokta(-1.0, -0.6)[1]})`} />)}
          <path d={adaD} fill="none" stroke="#2b2f45" strokeWidth={4} />
          <path d={adacikD} fill="#e0d3b4" stroke="#2b2f45" strokeWidth={3} />
          {/* Meis kasabası: liman koyu çevresinde ev blokları + kale (küçük ikon); bayrak yok (renk yalnız mühür/vurgu) */}
          {Array.from({ length: 16 }).map((_, i) => { const u = i / 15, c = meisNokta(-0.28 + u * 0.62 + (i % 3) * 0.02, -0.22 - (i % 4) * 0.07 + Math.sin(u * 3) * 0.05); return <rect key={i} x={c[0] - 6} y={c[1] - 5} width={11 + (i % 3) * 2} height={9} fill="#6b5a44" />; })}
          {(() => { const c = meisNokta(0.42, -0.05); return <g><rect x={c[0] - 16} y={c[1] - 18} width={30} height={20} fill="#4c3e2c" /><rect x={c[0] - 8} y={c[1] - 32} width={12} height={14} fill="#4c3e2c" /></g>; })()}
          {/* karşı kıyı: işaretsiz (P03'te boş; P10b'de mevzi noktası) */}
          {r?.yon === "limana" && (() => { const c = meisNokta(...MEVZI); return <circle cx={c[0]} cy={c[1]} r={12 / k.cs} fill={INK} />; })()}
          {/* rota: mürekkep çizgi (P01 çizgisinin karşılığı) */}
          {r && q > 0 && <><path d={yol} fill="none" stroke={INK} strokeWidth={14 / k.cs} pathLength={1} strokeDasharray={`${q} 2`} strokeLinecap="round" opacity={0.18} />
            <path d={yol} fill="none" stroke="#1c1915" strokeWidth={7 / k.cs} pathLength={1} strokeDasharray={`${q} 2`} strokeLinecap="round" />
            {q < 1 && <circle cx={uc[0]} cy={uc[1]} r={9 / k.cs} fill="#1c1915" />}
            {q >= 1 && <circle cx={Bq[0]} cy={Bq[1]} r={10 / k.cs} fill="#1c1915" />}</>}
          {ig && <g transform={`translate(${IG[0]},${IG[1]}) scale(${1 / k.cs}) translate(${-IG[0]},${-IG[1]})`}><Igne x={IG[0]} y={IG[1]} ig={ig} p={p} /></g>}
        </svg>
      </div>
    </div>
  );
};
