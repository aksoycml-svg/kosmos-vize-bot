import React, { useId } from "react";
import { Derinlik, Esleme, P, ink, murekkep, poly, tonla } from "./sabitler";
import { Basamak, Tarama } from "./Tarama";

// ===== Kemer (mekanlar.md 10 kemer sözlüğü) =====
// tip: duz (lento) · basik (segmentaire, yükselti 0.10–0.15 W) · yarimDaire (plein cintre, 0.5 W) · sivri (gotik — YALNIZ Saint-Michel).
// Kemer yükseltisi DÜNYA biriminde açıklık GENİŞLİĞİNDEN hesaplanır (W, H metre), sonra eşlemeyle perspektife gider.
// Varsayılan klasik: yarimDaire. Doğrama paralel dikey + yatay kayıtlar (tepeye yakınsayan kayıt YOK).
export type KemerTip = "duz" | "basik" | "yarimDaire" | "sivri";
export const KEMER_YUKSELTI: Record<KemerTip, number> = { duz: 0, basik: 0.13, yarimDaire: 0.5, sivri: 0.87 };

// Açıklığın üst eğrisi: u ∈ [0,1] → yükseklik (açıklık tabanından, metre)
export const kemerEgri = (tip: KemerTip, W: number, H: number, rise = KEMER_YUKSELTI[tip] * W) => (u: number) => {
  const sp = H - rise; // üzengi (springing) yüksekliği
  const x = (u - 0.5) * W;
  if (tip === "duz" || rise <= 0) return H;
  if (tip === "yarimDaire") return sp + Math.sqrt(Math.max(0, (W / 2) ** 2 - x * x)) * (rise / (W / 2));
  if (tip === "basik") { const R = (W * W / 4 + rise * rise) / (2 * rise); return sp + Math.sqrt(Math.max(0, R * R - x * x)) - (R - rise); }
  const d = W / 2 - Math.abs(x); // sivri: iki merkezli (eşkenar)
  return sp + Math.sqrt(Math.max(0, W * W - (W - d) ** 2)) * (rise / (W * 0.866));
};

// Açıklık çokgeni (metre → eşleme). m(u,v): u 0..1 genişlik, v 0 üst (kemer tepesi) .. 1 taban
export const kemerCokgen = (m: Esleme, tip: KemerTip, W: number, H: number, pad = 0, n = 18): P[] => {
  const Wp = W + 2 * pad, Hp = H + pad;
  const e = kemerEgri(tip, Wp, Hp, KEMER_YUKSELTI[tip] * Wp);
  const toM = (xm: number, ym: number): P => m((xm + pad) / W, 1 - ym / H); // xm: −pad..W+pad, ym: yükseklik
  const pts: P[] = [toM(-pad, 0)];
  for (let i = 0; i <= n; i++) { const u = i / n; pts.push(toM(-pad + u * Wp, e(u))); }
  pts.push(toM(W + pad, 0));
  return pts;
};

export const Kemer: React.FC<{
  m: Esleme; W: number; H: number; tip?: KemerTip;
  dolgu: string; ic?: React.ReactNode;                  // açıklık dolgusu (cam/karanlık) + açıklık içi çizimi (kırpılır)
  kayit?: { dikey: number; yatay: number; renk?: string; kalin?: number } | null;
  sove?: { gen: number; renk: string } | null;          // söve bandı (metre)
  kilit?: { renk: string; maskaron?: boolean } | null;  // kilit taşı (yalnız kemerlilerde)
  imposte?: boolean;                                     // üzengi silmesi
  esik?: { renk: string } | null;                        // denizlik / eşik
  kontur?: number;
  // açıklığın İÇ YÜZÜ (söve + kemer içi / intrados): arka kenarın ekrandaki kayması (kaçış noktasına doğru) → görünen derinlik bandı,
  // gravürde ışığın mimariyi anlattığı yer (A4 G1). Bant, açıklık içi çizimin ÜSTÜNE gelir (önde olan örter).
  icYuz?: { kaydir: P; renk: string; basamak: Basamak; aci: number; seed: number; derinlik?: Derinlik } | null;
}> = ({ m, W, H, tip = "yarimDaire", dolgu, ic, kayit = null, sove = null, kilit = null, imposte = false, esik = null, kontur = 3, icYuz = null }) => {
  const id = "km" + useId().replace(/:/g, "");
  const ac = kemerCokgen(m, tip, W, H);
  const rise = KEMER_YUKSELTI[tip] * W, sp = H - rise;
  const P_ = (xm: number, ym: number): P => m(xm / W, 1 - ym / H);
  const krenk = kayit?.renk ?? "#5b3d25";
  return (
    <g>
      <defs><clipPath id={`${id}c`}><polygon points={poly(ac)} /></clipPath></defs>
      {sove && <polygon points={poly(kemerCokgen(m, tip, W, H, sove.gen))} fill={sove.renk} stroke={murekkep(sove.renk)} strokeWidth={kontur} strokeLinejoin="round" />}
      <polygon points={poly(ac)} fill={dolgu} />
      {ic && <g clipPath={`url(#${id}c)`}>{ic}</g>}
      {icYuz && (() => {
        const ic2 = ac.map(([x, y]): P => [x + icYuz.kaydir[0], y + icYuz.kaydir[1]]);
        const d = `M ${poly(ac).split(" ").join(" L ")} Z M ${poly(ic2).split(" ").join(" L ")} Z`;
        return (
          <g clipPath={`url(#${id}c)`}>
            <path d={d} fillRule="evenodd" fill={icYuz.renk} />
            <Tarama sekil={d} basamak={icYuz.basamak} aci={icYuz.aci} renk={murekkep(icYuz.renk)} derinlik={icYuz.derinlik ?? "orta"} seed={icYuz.seed} kural="evenodd" />
            <polygon points={poly(ic2)} fill="none" stroke={murekkep(icYuz.renk)} strokeWidth={kontur * 0.6} strokeLinejoin="round" />
          </g>
        );
      })()}
      {kayit && (
        <g clipPath={`url(#${id}c)`}>
          {Array.from({ length: kayit.dikey }).map((_, i) => { const x = (W * (i + 1)) / (kayit.dikey + 1); return <polyline key={`d${i}`} points={poly([P_(x, 0), P_(x, H)])} stroke={krenk} strokeWidth={kayit.kalin ?? 4} fill="none" />; })}
          {Array.from({ length: kayit.yatay }).map((_, i) => { const y = (sp * (i + 1)) / (kayit.yatay + 1); return <polyline key={`y${i}`} points={poly([P_(0, y), P_(W, y)])} stroke={krenk} strokeWidth={(kayit.kalin ?? 4) * 0.85} fill="none" />; })}
          {tip !== "duz" && <polyline points={poly([P_(0, sp), P_(W, sp)])} stroke={krenk} strokeWidth={(kayit.kalin ?? 4) * 0.85} fill="none" />}
          <polygon points={poly(ac)} fill="none" stroke={krenk} strokeWidth={(kayit.kalin ?? 4) * 1.6} />
        </g>
      )}
      <polygon points={poly(ac)} fill="none" stroke={murekkep(sove?.renk ?? dolgu)} strokeWidth={kontur} strokeLinejoin="round" />
      {imposte && tip !== "duz" && [[-0.1 * W, 0.02 * W], [W - 0.02 * W, W + 0.1 * W]].map(([a, b], i) => (
        <polygon key={i} points={poly([P_(a, sp + 0.05 * W), P_(b, sp + 0.05 * W), P_(b, sp - 0.02 * W), P_(a, sp - 0.02 * W)])} fill={tonla(sove?.renk ?? "#cdbb8e", 0.05)} stroke={murekkep(sove?.renk ?? "#cdbb8e")} strokeWidth={kontur * 0.7} />
      ))}
      {kilit && tip !== "duz" && (() => {
        const w0 = 0.07 * W, w1 = 0.1 * W, h0 = H + (sove?.gen ?? 0.12 * W) * 0.9, h1 = H - Math.min(rise * 0.6, 0.18 * W);
        const pts = [P_(W / 2 - w1, h0), P_(W / 2 + w1, h0), P_(W / 2 + w0, h1), P_(W / 2 - w0, h1)];
        const c = P_(W / 2, (h0 + h1) / 2), s = Math.abs(P_(W / 2 + w1, h0)[0] - P_(W / 2 - w1, h0)[0]) / 40;
        return (
          <g>
            <polygon points={poly(pts)} fill={tonla(kilit.renk, 0.06)} stroke={murekkep(kilit.renk)} strokeWidth={kontur * 0.8} />
            {kilit.maskaron && <Maskaron x={c[0]} y={c[1]} s={s} renk={kilit.renk} />}
          </g>
        );
      })()}
      {esik && <polygon points={poly([P_(-0.08 * W, 0.02 * W), P_(W + 0.08 * W, 0.02 * W), P_(W + 0.1 * W, -0.05 * W), P_(-0.1 * W, -0.05 * W)])} fill={esik.renk} stroke={murekkep(esik.renk)} strokeWidth={kontur * 0.7} />}
    </g>
  );
};

// Kilit taşının kendisi olan maskaron (ayrı levha DEĞİL): taş renginde kabartma yüz; s = genişlik/40
export const Maskaron: React.FC<{ x: number; y: number; s: number; renk: string; isik?: string }> = ({ x, y, s, renk, isik = "#c4d6ff" }) => {
  const k = ink(renk), g = tonla(renk, -0.18), a = tonla(renk, 0.12);
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <ellipse cx={0} cy={1} rx={13} ry={16} fill={a} stroke={k} strokeWidth={1.6} />
      <path d="M -13 -6 Q -18 -16 -8 -18 Q 0 -22 8 -18 Q 18 -16 13 -6" fill={g} stroke={k} strokeWidth={1.2} />
      <path d="M -8 -3 Q -4 -6 -1 -3 M 1 -3 Q 4 -6 8 -3" stroke={k} strokeWidth={1.8} fill="none" />
      <path d="M 0 -2 L -2.5 7 L 2.5 7 Z" fill={g} />
      <path d="M -5 11 Q 0 14 5 11" stroke={k} strokeWidth={1.6} fill="none" />
      <path d="M -12 -10 Q 0 -19 12 -10" stroke={isik} strokeWidth={1.4} opacity={0.5} fill="none" />
    </g>
  );
};

