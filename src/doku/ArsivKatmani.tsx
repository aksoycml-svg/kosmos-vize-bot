import React, { useId } from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";

// ===== ArsivKatmani: FilmLook'un yerine (mekanlar.md 1.2) =====
// - Kâğıt lifi: tek sabit PNG (public/doku/kagit-lif.png), multiply. Kanal kimliği.
// - Gren: sabit 512 karo (public/doku/gren-512.png), overlay; 8 sabit ofset, her 4 karede bir sonraki (60 fps → 15 Hz).
//   FilmLook'taki gibi her karede yeni turbulence seed'i YOK: doku kaynamaz, filtre her kare yeniden hesaplanmaz.
// - Vinyet: sıcak kahve (gündüz) / gece mavisi-siyah değil, asla #000.
// - Derecelendirme (son katman): doygunluk .86, siyah nokta #14110d, beyaz nokta #f4ecd8, gölgeye soğuk / ışığa sıcak hafif kayma.
// Kullanım: <ArsivKatmani mod="gece">{sahne}</ArsivKatmani> — sahne + doku katmanları birlikte derecelendirilir.

// geceLapis (Evliya, mekanlar.md §8 / K1 O5): doygunluk 1.0, siyah nokta #12141c, kanal başına max(in, bp) (yumuşak diz ≈ .02),
// gölgeye soğuk karışım yok, ışık ucunda sıcak #ffe2a8 α .04. Gece paleti siyah noktanın üstünde → derecelendirmeden değişmeden çıkar.
// "gece" (Blanc) değişmedi: eski bölümler aynı piksellerle render olur.
// gunduzMineral (Evliya gün, mekanlar §8 "gündüze de doygunluk 1.0 + max(in, bp)"; K2 ölçümü: "gunduz" Boğaz/deniz tonunu yeşil-griye
// kaydırıyordu, Δh −63°): doygunluk 1.0, kanal başına max(in, bp) (bp #14110d), ışık ucunda sıcak α .04, vinyet daha açık. "gunduz" (Blanc) değişmedi.
// litografi (Paris kuşatması v2, tasarım §13.5 / mekanlar §1v2.7): geceLapis eğrisi + kâğıt α .14, kenarda HAFİF koyulaşma (mor, α .22) —
// alacakaranlık gök gülü/ufuk kromasını korur (≥ %85; geceLapis vinyeti .58 köşeleri karartıyordu). Çerçeve yok (tur-5).
export type ArsivMod = "gunduz" | "gece" | "kagit" | "geceLapis" | "gunduzMineral" | "litografi";

const GREN_OFSET: [number, number][] = [[0, 0], [211, 87], [97, 301], [389, 173], [43, 419], [257, 29], [151, 233], [331, 367]];
const AYAR: Record<ArsivMod, { lif: number; gren: number; vinyet: string }> = {
  // A4 G5: kâğıt lifi litografi imzası olarak görünür olsun (gündüz .12→.18, gece .08→.13); boya alanlarında +.04 (11.3)
  gunduz: { lif: 0.18, gren: 0.08, vinyet: "rgba(40,24,8,0.42)" },
  gece: { lif: 0.13, gren: 0.12, vinyet: "rgba(6,6,14,0.58)" },
  kagit: { lif: 0.18, gren: 0.08, vinyet: "rgba(40,24,8,0.42)" },
  geceLapis: { lif: 0.13, gren: 0.12, vinyet: "rgba(6,6,14,0.58)" },
  gunduzMineral: { lif: 0.14, gren: 0.08, vinyet: "rgba(40,24,8,0.26)" },
  litografi: { lif: 0.14, gren: 0.1, vinyet: "rgba(43,38,72,0.22)" },
};
const BP_LAPIS = [0x12, 0x14, 0x1c].map((v) => v / 255);
const BP_GUN = [0x14, 0x11, 0x0d].map((v) => v / 255);
// max(x, bp) yumuşak dizle; x ≥ .75'te sıcak karışım (α .04) — 33 noktalı tablo
const tabloLapis = (c: number, BPx: number[] = BP_LAPIS) => Array.from({ length: 33 }, (_, i) => {
  const x = i / 32, bp = BPx[c], k = 0.02;
  let v = x <= bp - k ? bp : x >= bp + k ? x : bp + ((x - (bp - k)) ** 2) / (4 * k);
  if (x >= 0.75) v = v * (1 - 0.04 * ((x - 0.75) / 0.25)) + SICAK[c] * 0.04 * ((x - 0.75) / 0.25);
  return v.toFixed(4);
}).join(" ");

// siyah/beyaz nokta: out = bp + in·(wp−bp)
const BP = [0x14, 0x11, 0x0d].map((v) => v / 255);
const WP = [0xf4, 0xec, 0xd8].map((v) => v / 255);
// 5 noktalı eğri: 0, gölge(.25), orta, ışık(.75), 1 — gölgeye #1b2236 α.06, ışığa #ffe2a8 α.04 karışımı
const SOGUK = [0x1b, 0x22, 0x36].map((v) => v / 255);
const SICAK = [0xff, 0xe2, 0xa8].map((v) => v / 255);
const tablo = (c: number) => [0, 0.25, 0.5, 0.75, 1].map((x, i) => {
  let v = BP[c] + x * (WP[c] - BP[c]);
  if (i === 1) v = v * 0.94 + SOGUK[c] * 0.06;
  if (i === 3) v = v * 0.96 + SICAK[c] * 0.04;
  return v.toFixed(4);
}).join(" ");

export const ArsivKatmani: React.FC<{ mod: ArsivMod; children: React.ReactNode; vinyet?: number; dereceSiz?: boolean }> = ({ mod, children, vinyet = 1, dereceSiz }) => {
  const frame = useCurrentFrame();
  const id = useId().replace(/:/g, "");
  const a = AYAR[mod];
  const [ox, oy] = GREN_OFSET[Math.floor(frame / 4) % GREN_OFSET.length];
  return (
    <AbsoluteFill>
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <filter id={`derece-${id}`} colorInterpolationFilters="sRGB">
          {mod !== "geceLapis" && mod !== "gunduzMineral" && mod !== "litografi" && <feColorMatrix type="saturate" values="0.86" />}
          {/* gölgeler soğuk (#1b2236 α.06), ışıklar sıcak (#ffe2a8 α.04): kanal başına hafif eğri */}
          <feComponentTransfer>
            <feFuncR type="table" tableValues={mod === "geceLapis" || mod === "litografi" ? tabloLapis(0) : mod === "gunduzMineral" ? tabloLapis(0, BP_GUN) : tablo(0)} />
            <feFuncG type="table" tableValues={mod === "geceLapis" || mod === "litografi" ? tabloLapis(1) : mod === "gunduzMineral" ? tabloLapis(1, BP_GUN) : tablo(1)} />
            <feFuncB type="table" tableValues={mod === "geceLapis" || mod === "litografi" ? tabloLapis(2) : mod === "gunduzMineral" ? tabloLapis(2, BP_GUN) : tablo(2)} />
          </feComponentTransfer>
        </filter>
      </svg>
      <AbsoluteFill style={{ filter: dereceSiz ? undefined : `url(#derece-${id})` }}>
        {children}
        {/* kâğıt lifi (sabit) */}
        <Img src={staticFile("doku/kagit-lif.png")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", mixBlendMode: "multiply", opacity: a.lif }} />
        {/* gren karosu: 8 sabit ofset, 4 karede bir */}
        <AbsoluteFill style={{ backgroundImage: `url(${staticFile("doku/gren-512.png")})`, backgroundRepeat: "repeat", backgroundPosition: `${ox}px ${oy}px`, mixBlendMode: "overlay", opacity: a.gren }} />
        {mod === "kagit" && <AbsoluteFill style={{ boxShadow: "inset 0 0 120px 40px rgba(138,106,58,0.14)" }} />}
        <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 50%, transparent 55%, ${a.vinyet} 100%)`, opacity: vinyet }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ===== Pişirme kompozisyonları: bir kez `npx remotion still` ile public/doku/'ya yazılır =====
export const KagitLifPisir: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#ffffff" }}>
    <svg width={1080} height={1920}>
      <filter id="lif" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.004 0.045" numOctaves={3} seed={7} result="a" />
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={8} result="b" />
        <feComposite in="b" in2="a" operator="arithmetic" k1={0} k2={0.5} k3={1} k4={-0.25} />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer><feFuncR type="linear" slope={0.6} intercept={0.75} /><feFuncG type="linear" slope={0.6} intercept={0.75} /><feFuncB type="linear" slope={0.6} intercept={0.75} /><feFuncA type="linear" slope={0} intercept={1} /></feComponentTransfer>
      </filter>
      <rect width={1080} height={1920} filter="url(#lif)" />
    </svg>
  </AbsoluteFill>
);

export const GrenPisir: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#808080" }}>
    <svg width={512} height={512}>
      <filter id="gren" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={3} seed={11} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer><feFuncA type="linear" slope={0} intercept={1} /></feComponentTransfer>
      </filter>
      <rect width={512} height={512} filter="url(#gren)" />
    </svg>
  </AbsoluteFill>
);
