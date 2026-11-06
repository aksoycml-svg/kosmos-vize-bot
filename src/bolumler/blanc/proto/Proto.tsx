import React from "react";
import { AbsoluteFill, Easing, interpolate, random, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { Kukla, FRANCOIS, LOUIS, yuru, visem, Poz, Agiz } from "../../../rig/Kukla";
import { Sokak, FENER, Tanimlar, zemin, sokakGenislik } from "./Sokak";
import { FareInsert, INSERT_SURE, INSERT_TAP } from "./FareInsert";
import { FilmLook } from "../../../components/Efektler";
import { SAFE, sans, mono, serif } from "../../../theme";
import replik from "../replik.json";
import S02 from "../ses/S02.json";

const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.inOut(Easing.cubic);
export const PROTO_FPS = 60;
export const PROTO_SURE = 12 * PROTO_FPS;
const T_REPLIK = 7.4;
const T_INS = 4.45; // fare yakın planı başlangıcı
const T_DON = T_INS + INSERT_SURE; // ana plana dönüş
const T_TAP = T_INS + INSERT_TAP;

// perspektifli yürüyüş: derinlik z (büyük = uzak), yanal u (0 sol duvar, 1 sağ duvar)
const yol = (t: number, t0: number, t1: number, z0: number, z1: number, u0: number, u1: number, sc1: number) => {
  const p = interpolate(t, [t0, t1], [0, 1], { ...cl, easing: Easing.bezier(0.25, 0.05, 0.45, 1) });
  const z = z0 + (z1 - z0) * p, u = u0 + (u1 - u0) * p;
  const [x, y] = zemin(z, u);
  return { x, y, scale: sc1 * sokakGenislik(z) / sokakGenislik(z1), phi: (z0 - z) * 9.9, sis: interpolate(t, [t0, t0 + 0.7], [0, 1], cl) };
};

// göz kırpma (rastgele aralıklı)
const kirp = (t: number, seed: string) => {
  for (let k = 0; k < 6; k++) {
    const at = 1.2 + k * 2.6 + random(seed + k) * 1.2;
    const d = t - at;
    if (d >= 0 && d < 0.16) return Math.sin((d / 0.16) * Math.PI);
  }
  return 0;
};

// dudak senkronu (replik zamanlamasından)
const dudak = (t: number): Agiz => {
  const lt = t - T_REPLIK;
  if (lt < 0 || lt > replik.e[replik.e.length - 1]) return "dinlen";
  for (let i = 0; i < replik.chars.length; i++) {
    if (lt >= replik.s[i] && lt < replik.e[i]) {
      const ch = replik.chars[i];
      return /[\s.,…]/.test(ch) ? "M" : visem(ch);
    }
  }
  return "M";
};

const francoisPoz = (t: number): Poz => {
  const g = yol(t, 0.3, 4.0, 3.5, 1.3, 0.62, 0.36, 1.32);
  const phi = g.phi;
  const amt = interpolate(t, [0.3, 0.6, 3.7, 4.15], [0, 1, 1, 0], cl);
  const w = yuru(phi, amt);
  // şapka çıkarma: 5.0–5.7 kol kalkar, 5.45'te şapka başı terk eder
  const kol = interpolate(t, [6.4, 6.55, 7.1, 7.3], [0, -0.08, 1.06, 1], { ...cl, easing: Easing.inOut(Easing.sin) });
  const sapka = interpolate(t, [6.95, 7.35], [0, 1], { ...cl, easing: Easing.out(Easing.back(1.6)) });
  const kirpma = interpolate(t, [10.3, 10.4, 10.75, 10.85], [0, 1, 1, 0], cl);
  const lt = t - T_REPLIK;
  const otur = interpolate(t, [4.0, 4.25, 4.6], [0, 1, 0], { ...cl, easing: ease });
  return {
    x: g.x, y: g.y, scale: g.scale, facing: -1, ...w,
    bodyY: (w.bodyY ?? 0) + otur * 8, kneeF: w.kneeF + otur * 8, kneeB: w.kneeB + otur * 8,
    shF: w.shF * (1 - kol) + kol * -158, elF: w.elF * (1 - kol) + kol * -32,
    lean: w.lean * amt,
    breathe: Math.sin(t * 2.2),
    headTilt: interpolate(t, [6.2, 6.85, 7.05, 10.3, 10.6, 10.8], [0, -9, -6.5, -6.5, 6, 4], { ...cl, easing: ease }) + (t > T_REPLIK && t < T_REPLIK + 2.8 ? Math.sin((t - T_REPLIK) * 9) * 1.5 : 0),
    lookX: interpolate(t, [6.1, 6.6], [1, -0.4], cl),
    lookY: interpolate(t, [6.1, 6.6], [0, 0.2], cl),
    blinkF: Math.max(kirp(t, "f"), kirpma),
    blinkB: kirp(t, "f"),
    browF: lt > 0.6 && lt < 1.4 ? 0.9 : lt > 1.6 && lt < 2.8 ? -0.5 : kirpma > 0 ? -0.6 : 0.2,
    browB: lt > 0.6 && lt < 1.4 ? 0.9 : kirpma > 0 ? 0.8 : 0.2,
    agiz: t >= 10.3 ? "sirit" : t > T_REPLIK - 0.1 ? dudak(t) : t > 6.1 ? "gulumse" : "dinlen",
    hat: sapka > 0 ? { x: interpolate(sapka, [0, 1], [12, 46]), y: interpolate(sapka, [0, 1], [-500, -572]), r: interpolate(sapka, [0, 1], [-4, -26]) } : null,
    cane: null,
  };
};

const louisPoz = (t: number): Poz => {
  const g = yol(t, 0.55, 4.3, 3.9, 1.55, 0.78, 0.64, 1.2);
  const phi = g.phi + 1.3;
  const amt = interpolate(t, [0.55, 0.85, 4.0, 4.45], [0, 1, 1, 0], cl);
  const w = yuru(phi, amt);
  // ana plana dönüşte: baston yere vurulmuş halden kalkar, zafer çevirmesi
  const tw = interpolate(t, [T_DON + 0.15, T_DON + 0.9], [0, 1], { ...cl, easing: Easing.inOut(Easing.quad) });
  const kalk = interpolate(t, [T_DON, T_DON + 0.2, T_DON + 0.8, T_DON + 1.0], [0, 1, 1, 0], { ...cl, easing: ease });
  return {
    x: g.x, y: g.y, scale: g.scale, facing: -1, ...w,
    shF: w.shF * (1 - kalk) + kalk * -55 - 18 * (1 - amt) * (1 - kalk), elF: w.elF * (1 - kalk) + kalk * -70,
    breathe: Math.sin(t * 2 + 1),
    headTilt: interpolate(t, [T_DON + 1.0, T_DON + 1.5], [0, 5], { ...cl, easing: ease }),
    lookX: t > T_DON + 1 ? 1 : 0.6,
    lookY: t > 4.2 && t < T_DON + 0.6 ? 0.9 : 0,
    blinkF: kirp(t, "l"), blinkB: kirp(t, "l"),
    browF: -0.5, browB: -0.5,
    agiz: t > 10.5 ? "gulumse" : "dinlen",
    cane: 22 + 720 * tw + Math.sin(phi) * 12 * amt,
    hat: null,
  };
};

const Altyazi: React.FC<{ t: number }> = ({ t }) => {
  // anlatıcı (S02) + replik
  let words: { t: string; s: number; e: number }[] = [];
  let kim = "";
  if (t >= 0.5 && t < 0.5 + S02.dur + 0.3) { words = S02.words.map((w) => ({ ...w, s: w.s + 0.5, e: w.e + 0.5 })); }
  else if (t >= T_REPLIK - 0.1 && t < T_REPLIK + 3.2) {
    kim = "FRANÇOIS";
    words = "Herkesten önce bilen... kazanır.".split(" ").map((w) => {
      const idx = replik.text.indexOf(w);
      return { t: w, s: T_REPLIK + replik.s[idx], e: T_REPLIK + replik.e[idx + w.length - 1] };
    });
  }
  if (!words.length) return null;
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", padding: `0 ${SAFE.side}px ${SAFE.bottom + 10}px` }}>
      {kim && <div style={{ fontFamily: mono, fontSize: 30, letterSpacing: 6, color: "#ffcf70", marginBottom: 8, textShadow: "0 2px 8px #000" }}>{kim}</div>}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 14px", fontFamily: kim ? serif : sans, fontStyle: kim ? "italic" : "normal", fontWeight: 800, fontSize: 56, textAlign: "center", textShadow: "0 3px 0 #000, 0 0 22px rgba(0,0,0,0.9)", maxWidth: 940 }}>
        {words.map((w, i) => <span key={i} style={{ color: t >= w.s && t < w.e + 0.08 ? "#ffcf70" : t >= w.s ? "#fff" : "rgba(255,255,255,0.4)" }}>{w.t}</span>)}
      </div>
    </AbsoluteFill>
  );
};

export const Proto: React.FC = () => {
  const { fps, width, height } = useVideoConfig();
  const t = useCurrentFrame() / fps;
  const frame = t * 30; // 30 fps eşdeğeri (ortam animasyonları için)
  // kamera: yavaş içeri itme + replikte François'ya yaklaşma
  const cs = interpolate(t, [0, 4.4, T_DON, 7.4, 12], [1.0, 1.06, 1.08, 1.18, 1.24], { ...cl, easing: ease });
  const cx = interpolate(t, [0, 4.4, T_DON, 7.4, 12], [0, -10, -10, 70, 90], { ...cl, easing: ease });
  const cy = interpolate(t, [0, 4.4, T_DON, 7.4, 12], [0, -30, -40, -150, -170], { ...cl, easing: ease });
  const kat = (k: number) => `translate(${540 + cx * k},${960 + cy * k}) scale(${1 + (cs - 1) * k}) translate(-540,-960)`;
  const fl = Math.sin(frame * 0.7) * 0.5 + Math.sin(frame * 1.9) * 0.3;
  const sis = (k: number, y: number, o: number) => (
    <g transform={kat(k)}>
      {[0, 1].map((i) => <ellipse key={i} cx={((frame * (0.9 + i * 0.6) + i * 600) % 1700) - 300} cy={y + i * 50} rx={700} ry={110} fill="#9fb0d8" opacity={o} style={{ filter: "blur(30px)" }} />)}
    </g>
  );
  return (
    <AbsoluteFill style={{ backgroundColor: "#05060c" }}>
      <svg width={width} height={height} viewBox="0 0 1080 1920">
        <Tanimlar />
        <g transform={kat(0.25)}><Sokak katman="gok" /></g>
        <g transform={kat(0.55)}><Sokak katman="uzak" /></g>
        {sis(0.6, 1130, 0.18)}
        <g transform={kat(1)}>
          <Sokak katman="orta" t={t} />
          {/* karakterler: arkadaki önce */}
          <g opacity={interpolate(t, [0.55, 1.2], [0, 1], cl)}><Kukla louis p={LOUIS} pz={louisPoz(t)} /></g>
          <g opacity={interpolate(t, [0.3, 0.95], [0, 1], cl)}><Kukla p={FRANCOIS} pz={francoisPoz(t)} /></g>
          {/* fener ışığı karakterlere düşer */}
          <circle cx={FENER[0] + 30} cy={FENER[1] + 200} r={720 + fl * 20} fill="url(#fenerIsik)" style={{ mixBlendMode: "screen" }} />
        </g>
        {sis(1.25, 1800, 0.1)}
        <defs>
          <radialGradient id="fenerIsik"><stop offset="0" stopColor="#ffb456" stopOpacity="0.32" /><stop offset="1" stopColor="#ffb456" stopOpacity="0" /></radialGradient>
        </defs>
      </svg>
      {/* fare yakın planı (kesme) */}
      {t >= T_INS && t < T_DON && <AbsoluteFill><FareInsert t={t - T_INS} /></AbsoluteFill>}
      {/* renk derecelendirme: soğuk gece + sıcak vurgular */}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(20,30,70,0.18), rgba(10,10,30,0.05) 50%, rgba(0,0,0,0.35))", mixBlendMode: "multiply" }} />
      <FilmLook />
      <Altyazi t={t} />
      {/* ses */}
      <Audio src={staticFile("blanc/sfx/gece-ruzgar.mp3")} volume={0.36} />
      <Sequence from={Math.round(0.5 * fps)} layout="none"><Audio src={staticFile("blanc/ses/S02.mp3")} volume={1} /></Sequence>
      <Sequence from={Math.round(0.45 * fps)} durationInFrames={Math.round(3.8 * fps)} layout="none"><Audio src={staticFile("proto/ayak-sesi.mp3")} volume={0.43} /></Sequence>
      {/* fare yakın planı foley'i: sadece insert boyunca */}
      <Sequence from={Math.round((T_INS + 0.05) * fps)} durationInFrames={Math.round((INSERT_TAP - 0.05) * fps)} layout="none"><Audio src={staticFile("proto/fare-koklama.mp3")} volume={0.45} /></Sequence>
      <Sequence from={Math.round(T_TAP * fps)} layout="none"><Audio src={staticFile("proto/baston-vurus.mp3")} volume={0.62} /></Sequence>
      <Sequence from={Math.round((T_TAP + 0.08 - 0.575) * fps)} layout="none"><Audio src={staticFile("proto/fare-kacis.mp3")} volume={0.45} /></Sequence>
      <Sequence from={Math.round(6.85 * fps)} layout="none"><Audio src={staticFile("proto/sapka.mp3")} volume={0.55} /></Sequence>
      <Sequence from={Math.round(T_REPLIK * fps)} layout="none"><Audio src={staticFile("proto/replik.mp3")} volume={1} /></Sequence>
      <Audio src={staticFile("proto/laterna.mp3")} volume={0.32} />
      <Sequence from={Math.round(0.2 * fps)} layout="none"><Audio src={staticFile("proto/can.mp3")} volume={0.22} /></Sequence>
      <Audio src={staticFile("proto/bayrak.mp3")} volume={0.16} />
      <Sequence from={Math.round((T_DON + 0.3) * fps)} layout="none"><Audio src={staticFile("proto/zincir.mp3")} volume={0.12} /></Sequence>
    </AbsoluteFill>
  );
};
