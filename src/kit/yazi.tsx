// ===== Kit yazı standardı (K2) — şablondan BAĞIMSIZ, parametre değil =====
// EKRAN YAZISI: her zaman kâğıt şerit (01-masa stili) + Playfair 900 (formül: Plex Mono). Vurgu kırmızısı YALNIZ TEK kelime
// (vurgu listesinden ilk eşleşen). İki satıra bölünürse şerit iki satırı birlikte kapsar; kutu üst bant y 240–400 içinde kalır
// (boyut satır uzunluğundan hesaplanır — taşma yok). Dış hat/gölgeli serbest yazı YOK (kalabalık arka planda okunmuyordu, K1 03/05).
// REPLİK ALTYAZISI: Inter 800 + konuşan plakası (02-sokak-gece stili) + arkasında yarı saydam koyu bant (α .62).
import React from "react";
import { AbsoluteFill } from "remotion";
import { mono, sans, serif } from "../theme";

export const YAZI = { ustY: 240, ustAlt: 400, altY: 1290, altAlt: 1490, yan: 80, kutuW: 920 } as const;
const KAGIT = "rgba(233,223,201,0.94)", MUREKKEP = "#1c1915", KIRMIZI_KAGIT = "#b3261e", KIRMIZI = "#e5483c";

const kucuk = (s: string) => s.toLocaleLowerCase("tr");
// tek vurgu: metindeki ilk kelime ki vurgu listesindeki bir öğeyle başlar
export const vurguIndeks = (kelimeler: string[], vurgu: string[] = []) => kelimeler.findIndex((w) => vurgu.some((v) => v && kucuk(w).startsWith(kucuk(v))));

// iki satıra dengeli bölme (karakter sayısına göre en dengeli kesme noktası)
const bol = (k: string[]): string[][] => {
  const top = k.join(" ").length;
  let en = 1, fark = Infinity, say = 0;
  for (let i = 1; i < k.length; i++) { say += k[i - 1].length + 1; const f = Math.abs(top - 2 * say); if (f < fark) { fark = f; en = i; } }
  return [k.slice(0, en), k.slice(en)];
};

// Satır yerleşimi: tek satır sığarsa büyük, sığmazsa iki satır (kutu bant içinde) ve boyut satır uzunluğundan
const yerlesim = (metin: string, maks: number, enOran: number, ikiliMaks: number) => {
  const k = metin.split(" ").filter(Boolean);
  const ic = YAZI.kutuW - 52;
  const gen = (s: string, px: number) => s.length * enOran * px;
  if (gen(k.join(" "), maks) <= ic || k.length < 2) return { satirlar: [k], px: Math.min(maks, ic / Math.max(1, k.join(" ").length * enOran)) };
  const satirlar = bol(k);
  const uzun = Math.max(...satirlar.map((s) => s.join(" ").length));
  return { satirlar, px: Math.min(ikiliMaks, ic / (uzun * enOran)) };
};

const Serit: React.FC<{ children: React.ReactNode; padY?: number }> = ({ children, padY = 8 }) => (
  <div style={{ background: KAGIT, borderTop: `2px solid ${MUREKKEP}`, borderBottom: `2px solid ${MUREKKEP}`, padding: `${padY}px 26px ${padY + 4}px`, boxShadow: "0 3px 0 rgba(20,17,13,0.35)", maxWidth: YAZI.kutuW }}>{children}</div>
);

// EKRAN YAZISI (iddia / formül). bant "alt" yalnız istisna (alt bant replik içindir): kutu alt kenarı y 1490.
export const KitEkranYazisi: React.FC<{ metin: string; vurgu?: string[]; tur?: "iddia" | "formul"; bant?: "ust" | "alt" }> = ({ metin, vurgu, tur = "iddia", bant = "ust" }) => {
  const formul = tur === "formul";
  // en/oran: Playfair 900 ≈ 0.56 em/harf, Plex Mono = 0.6. İki satırda boyut ≤ 60 (Playfair) → kutu ≤ 150 px (bant 160)
  const { satirlar, px } = formul ? yerlesim(metin, 44, 0.6, 40) : yerlesim(metin, 72, 0.56, 60);
  const tum = satirlar.flat();
  const vi = formul ? -1 : vurguIndeks(tum, vurgu);
  let j = 0;
  return (
    <AbsoluteFill style={{ alignItems: "flex-start", justifyContent: bant === "ust" ? "flex-start" : "flex-end", padding: bant === "ust" ? `${YAZI.ustY + 6}px ${YAZI.yan}px 0` : `0 ${YAZI.yan}px ${1920 - YAZI.altAlt}px` }}>
      <Serit padY={satirlar.length > 1 ? 6 : 8}>
        <div lang="tr" style={{ fontFamily: formul ? mono : serif, fontWeight: formul ? 500 : 900, fontSize: px, lineHeight: 1.04, letterSpacing: formul ? "0.04em" : undefined, color: MUREKKEP, whiteSpace: "nowrap" }}>
          {satirlar.map((s, si) => (
            <div key={si}>{s.map((w, wi) => { const i = j++; return <span key={wi} style={{ color: i === vi ? KIRMIZI_KAGIT : undefined }}>{w}{wi < s.length - 1 ? " " : ""}</span>; })}</div>
          ))}
        </div>
      </Serit>
    </AbsoluteFill>
  );
};

// REPLİK ALTYAZISI: konuşan plakası + koyu yarı saydam bant (satırları kapsar). okunan kelime ölçek 1.06; vurgu tek kelime kırmızı.
export const KitReplik: React.FC<{ metin: string; kim?: string; vurgu?: string[]; okunan?: number; bant?: "ust" | "alt" }> = ({ metin, kim, vurgu, okunan = -1, bant = "alt" }) => {
  const k = metin.split(" ").filter(Boolean);
  const vi = vurguIndeks(k, vurgu);
  const px = metin.length > 52 ? 48 : 54;
  return (
    <AbsoluteFill style={{ justifyContent: bant === "alt" ? "flex-end" : "flex-start", alignItems: "center", padding: bant === "alt" ? `0 ${YAZI.yan}px ${1920 - YAZI.altAlt}px` : `${YAZI.ustY + 4}px ${YAZI.yan}px 0` }}>
      {kim && <div style={{ fontFamily: mono, fontWeight: 500, fontSize: 30, letterSpacing: "0.2em", color: "#e7c37a", marginBottom: 6, padding: "2px 14px 4px 18px", background: "rgba(20,17,13,0.82)" }}>{kim}</div>}
      <div lang="tr" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 13px", fontFamily: sans, fontWeight: 800, fontSize: px, lineHeight: 1.14, textAlign: "center", maxWidth: YAZI.kutuW, padding: "8px 26px 10px", background: "rgba(20,17,13,0.62)", borderRadius: 4 }}>
        {k.map((w, i) => (
          <span key={i} style={{ color: i === vi ? KIRMIZI : "#f6f1e4", display: "inline-block", transform: i === okunan ? "scale(1.06)" : undefined, filter: i === okunan ? "brightness(1.12)" : undefined }}>{w}</span>
        ))}
      </div>
    </AbsoluteFill>
  );
};
