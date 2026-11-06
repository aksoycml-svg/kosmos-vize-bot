import React from "react";
import { AbsoluteFill } from "remotion";
import { mono, sans, serif } from "../theme";

// Ekran yazısı tipografisi (tasarim.md 4). Yüklü fontlar: Playfair 900, Inter 500/800, Plex Mono 500 — italik YOK.
// Bantlar (güvenli alan): ÜST y 240–400, ALT y 1290–1490, yan 80. Vurgu kelime kırmızı (asla altın).
export const BANT = { ustY: 240, ustH: 160, altAlt: 1490, yan: 80 };
const KIRMIZI = "#e5483c", KIRMIZI_KAGIT = "#b3261e", KAGIT = "#e9dfc9", MUREKKEP = "#1c1915";
const GOLGE = "0 3px 0 rgba(20,17,13,0.95), 0 0 22px rgba(20,17,13,0.9)";

type Parca = { t: string; vurgu?: boolean };
const parcala = (metin: string, vurgu: string[] = []): Parca[] => metin.split(" ").map((w) => ({ t: w, vurgu: vurgu.some((v) => w.toLocaleLowerCase("tr").startsWith(v.toLocaleLowerCase("tr"))) }));

// T2 İDDİA: Playfair 900, 72/64 px. kagitSerit: açık zeminde kâğıt şerit + mürekkep (vurgu C.red)
export const IddiaYazisi: React.FC<{ metin: string; vurgu?: string[]; kagitSerit?: boolean; bant?: "ust" | "alt"; boyut?: number }> = ({ metin, vurgu, kagitSerit, bant = "ust", boyut = 72 }) => {
  const ps = parcala(metin, vurgu);
  const kutu: React.CSSProperties = kagitSerit
    ? { background: "rgba(233,223,201,0.92)", borderTop: `2px solid ${MUREKKEP}`, borderBottom: `2px solid ${MUREKKEP}`, padding: "10px 26px 14px" }
    : {};
  return (
    <AbsoluteFill style={{ alignItems: "flex-start", justifyContent: bant === "ust" ? "flex-start" : "flex-end", padding: bant === "ust" ? `${BANT.ustY + 10}px ${BANT.yan}px 0` : `0 ${BANT.yan}px ${1920 - BANT.altAlt}px` }}>
      <div lang="tr" style={{ ...kutu, fontFamily: serif, fontWeight: 900, fontSize: boyut, lineHeight: 1.05, color: kagitSerit ? MUREKKEP : KAGIT, textShadow: kagitSerit ? "none" : GOLGE, maxWidth: 920 }}>
        {ps.map((p, i) => <span key={i} style={{ color: p.vurgu ? (kagitSerit ? KIRMIZI_KAGIT : KIRMIZI) : undefined }}>{p.t}{i < ps.length - 1 ? " " : ""}</span>)}
      </div>
    </AbsoluteFill>
  );
};

// T3 FORMÜL / T1 KÜNYE: Plex Mono
export const FormulYazisi: React.FC<{ metin: string; boyut?: number; renk?: string; kagitSerit?: boolean }> = ({ metin, boyut = 42, renk = KAGIT, kagitSerit }) => (
  <AbsoluteFill style={{ alignItems: "flex-start", padding: `${BANT.ustY + 10}px ${BANT.yan}px 0` }}>
    <div lang="tr" style={{ fontFamily: mono, fontWeight: 500, fontSize: boyut, letterSpacing: "0.04em", color: kagitSerit ? MUREKKEP : renk, textShadow: kagitSerit ? "none" : GOLGE, maxWidth: 920, ...(kagitSerit ? { background: "rgba(233,223,201,0.92)", borderTop: `2px solid ${MUREKKEP}`, borderBottom: `2px solid ${MUREKKEP}`, padding: "10px 22px 12px" } : {}) }}>{metin}</div>
  </AbsoluteFill>
);

// T5 ALTYAZI (+ T5b replik etiketi): Inter 800 56 px, en çok 2 satır, alt kenar y ≈ 1490
// okunan kelime: ölçek 1.06 + parlaklık; anahtar kelime kırmızı
// bant="ust": replik ayakları/temas anını/kurulum nesnesini örtecekse üst banda (y 240–400) alınır (CLAUDE.md yazı bantları)
// kimKontrast (A4b, elestiri-C SC2): konuşan etiketi sis/gece zemininde okunur — #e7c37a, 34 px, koyu mürekkep plaka (α .78) + 0 2px 0 gölge (kontrast ≥ 4.5:1)
export const Altyazi: React.FC<{ metin: string; kim?: string; vurgu?: string[]; okunan?: number; soluk?: number; bant?: "ust" | "alt"; kimKontrast?: boolean }> = ({ metin, kim, vurgu, okunan = -1, soluk = -1, bant = "alt", kimKontrast }) => {
  const ps = parcala(metin, vurgu);
  return (
    <AbsoluteFill style={{ justifyContent: bant === "alt" ? "flex-end" : "flex-start", alignItems: "center", padding: bant === "alt" ? `0 ${BANT.yan}px ${1920 - BANT.altAlt}px` : `${BANT.ustY + 6}px ${BANT.yan}px 0` }}>
      {kim && !kimKontrast && <div style={{ fontFamily: mono, fontWeight: 500, fontSize: 30, letterSpacing: "0.2em", color: "#b8862b", marginBottom: 10, textShadow: GOLGE }}>{kim}</div>}
      {kim && kimKontrast && <div style={{ fontFamily: mono, fontWeight: 600, fontSize: 34, letterSpacing: "0.2em", color: "#e7c37a", marginBottom: 10, padding: "2px 14px 4px 18px", background: "rgba(20,17,13,0.78)", textShadow: "0 2px 0 #000" }}>{kim}</div>}
      <div lang="tr" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 14px", fontFamily: sans, fontWeight: 800, fontSize: 56, lineHeight: 1.15, textAlign: "center", textShadow: GOLGE, maxWidth: 920 }}>
        {ps.map((p, i) => (
          <span key={i} style={{ color: p.vurgu ? KIRMIZI : "#f6f1e4", opacity: soluk >= 0 && i > soluk ? 0.45 : 1, display: "inline-block", transform: i === okunan ? "scale(1.06)" : undefined, filter: i === okunan ? "brightness(1.12)" : undefined }}>{p.t}</span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// 4.3 İsim etiketi ("dosya etiketi"): kâğıt, sağ üst köşe kesik, sol sekme ceket rengi, şapkaya çizgi + daire
export const IsimEtiketi: React.FC<{ ad: string; alt?: string; sekme: string; x: number; y: number; hedef: [number, number]; hiza?: "sol" | "sag"; W?: number; altBoyut?: number }> = ({ ad, alt = "BLANC · BORDEAUX", sekme, x, y, hedef, hiza = "sol", W = 350, altBoyut = 30 }) => {
  const H = 104;
  const left = hiza === "sol" ? x : x - W;
  const ax = hiza === "sol" ? left + 40 : left + W - 40;
  return (
    <AbsoluteFill>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <line x1={ax} y1={y + H} x2={hedef[0]} y2={hedef[1]} stroke={MUREKKEP} strokeWidth={3} />
        <circle cx={hedef[0]} cy={hedef[1]} r={6} fill={KAGIT} stroke={MUREKKEP} strokeWidth={3} />
      </svg>
      <div style={{ position: "absolute", left, top: y, width: W, height: H, background: KAGIT, border: `2px solid ${MUREKKEP}`, clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)", boxSizing: "border-box", padding: "8px 10px 0 18px" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: sekme }} />
        <div style={{ fontFamily: serif, fontWeight: 900, fontSize: 44, lineHeight: 1, color: MUREKKEP }}>{ad}</div>
        <div style={{ fontFamily: mono, fontWeight: 500, fontSize: altBoyut, letterSpacing: "0.01em", whiteSpace: "nowrap", color: "#4a4237", marginTop: 6 }}>{alt}</div>
      </div>
    </AbsoluteFill>
  );
};
