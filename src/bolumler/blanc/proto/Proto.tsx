import React from "react";
import { AbsoluteFill, Easing, interpolate, random, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { Kukla, FRANCOIS, LOUIS, yuru, visem, Poz, Agiz } from "../../../rig/Kukla";
import { Sokak, FENER } from "./Sokak";
import { FilmLook, Birds } from "../../../components/Efektler";
import { SAFE, sans, mono, serif } from "../../../theme";
import replik from "../replik.json";
import S02 from "../ses/S02.json";

const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.inOut(Easing.cubic);
export const PROTO_SURE = 11 * 30;
const T_REPLIK = 6.1;

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
  const x0 = 1230, x1 = 400, sc = 1.32;
  const x = interpolate(t, [0.4, 3.9], [x0, x1], { ...cl, easing: Easing.bezier(0.3, 0, 0.5, 1) });
  const phi = (x0 - x) / (62 * sc);
  const amt = interpolate(t, [0.4, 0.7, 3.6, 4.1], [0, 1, 1, 0], cl);
  const w = yuru(phi, amt);
  // şapka çıkarma: 5.0–5.7 kol kalkar, 5.45'te şapka başı terk eder
  const kol = interpolate(t, [5.0, 5.6], [0, 1], { ...cl, easing: ease });
  const sapka = interpolate(t, [5.4, 5.8], [0, 1], { ...cl, easing: Easing.out(Easing.back(1.6)) });
  const kirpma = interpolate(t, [9.0, 9.1, 9.45, 9.55], [0, 1, 1, 0], cl);
  const lt = t - T_REPLIK;
  return {
    x, y: 1690, scale: sc, facing: -1, ...w,
    shF: w.shF * (1 - kol) + kol * -158, elF: w.elF * (1 - kol) + kol * -32,
    lean: w.lean * amt,
    breathe: Math.sin(t * 2.2),
    headTilt: interpolate(t, [4.6, 5.3, 9.0, 9.4], [0, -7, -7, 4], { ...cl, easing: ease }),
    lookX: interpolate(t, [4.4, 5.0], [1, -0.4], cl),
    lookY: interpolate(t, [4.4, 5.0], [0, 0.2], cl),
    blinkF: Math.max(kirp(t, "f"), kirpma),
    blinkB: kirp(t, "f"),
    browF: lt > 0.6 && lt < 1.4 ? 0.9 : lt > 1.6 && lt < 2.8 ? -0.5 : kirpma > 0 ? -0.6 : 0.2,
    browB: lt > 0.6 && lt < 1.4 ? 0.9 : kirpma > 0 ? 0.8 : 0.2,
    agiz: t >= 9.0 ? "sirit" : t > T_REPLIK - 0.1 ? dudak(t) : t > 4.4 ? "gulumse" : "dinlen",
    hat: sapka > 0 ? { x: interpolate(sapka, [0, 1], [12, 46]), y: interpolate(sapka, [0, 1], [-500, -572]), r: interpolate(sapka, [0, 1], [-4, -26]) } : null,
    cane: null,
  };
};

const louisPoz = (t: number): Poz => {
  const x0 = 1420, x1 = 730, sc = 1.2;
  const x = interpolate(t, [0.8, 4.2], [x0, x1], { ...cl, easing: Easing.bezier(0.3, 0, 0.5, 1) });
  const phi = (x0 - x) / (62 * sc) + 1.3;
  const amt = interpolate(t, [0.8, 1.1, 3.9, 4.4], [0, 1, 1, 0], cl);
  const w = yuru(phi, amt);
  // baston çevirme 4.5–5.4, yere vuruş 5.45
  const tw = interpolate(t, [4.5, 5.4], [0, 1], { ...cl, easing: Easing.inOut(Easing.quad) });
  const kalk = interpolate(t, [4.4, 4.6, 5.3, 5.5], [0, 1, 1, 0], { ...cl, easing: ease });
  return {
    x, y: 1610, scale: sc, facing: -1, ...w,
    shF: w.shF * (1 - kalk) + kalk * -55 - 18 * (1 - amt) * (1 - kalk), elF: w.elF * (1 - kalk) + kalk * -70,
    breathe: Math.sin(t * 2 + 1),
    headTilt: interpolate(t, [5.6, 6.2], [0, 5], { ...cl, easing: ease }),
    lookX: t > 5.6 ? 1 : 0.6,
    blinkF: kirp(t, "l"), blinkB: kirp(t, "l"),
    browF: -0.5, browB: -0.5,
    agiz: t > 9.2 ? "gulumse" : "dinlen",
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
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = frame / fps;
  // kamera: yavaş içeri itme + replikte François'ya yaklaşma
  const cs = interpolate(t, [0, 4.5, 6, 11], [1.0, 1.06, 1.16, 1.22], { ...cl, easing: ease });
  const cx = interpolate(t, [0, 4.5, 6, 11], [0, -10, 70, 90], { ...cl, easing: ease });
  const cy = interpolate(t, [0, 4.5, 6, 11], [0, -30, -150, -170], { ...cl, easing: ease });
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
        <g transform={kat(0.25)}><Sokak katman="gok" /></g>
        <g transform={kat(0.55)}><Sokak katman="uzak" /></g>
        {sis(0.6, 1130, 0.18)}
        <g transform={kat(1)}>
          <Sokak katman="orta" />
          {/* karakterler: arkadaki önce */}
          <Kukla louis p={LOUIS} pz={louisPoz(t)} />
          <Kukla p={FRANCOIS} pz={francoisPoz(t)} />
          {/* fener ışığı karakterlere düşer */}
          <circle cx={FENER[0] + 30} cy={FENER[1] + 200} r={720 + fl * 20} fill="url(#fenerIsik)" style={{ mixBlendMode: "screen" }} />
        </g>
        {sis(1.25, 1800, 0.1)}
        <defs>
          <radialGradient id="fenerIsik"><stop offset="0" stopColor="#ffb456" stopOpacity="0.32" /><stop offset="1" stopColor="#ffb456" stopOpacity="0" /></radialGradient>
        </defs>
      </svg>
      {/* ayın önünden kuşlar */}
      <AbsoluteFill style={{ translate: `${cx * 0.25}px ${cy * 0.25}px` }}>
        <Birds at={0.3} dur={3.2} from={[1200, 330]} to={[-200, 220]} count={9} color="#0a0c18" size={20} seed="pk" />
      </AbsoluteFill>
      {/* renk derecelendirme: soğuk gece + sıcak vurgular */}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(20,30,70,0.18), rgba(10,10,30,0.05) 50%, rgba(0,0,0,0.35))", mixBlendMode: "multiply" }} />
      <FilmLook />
      <Altyazi t={t} />
      {/* ses */}
      <Audio src={staticFile("blanc/sfx/gece-ruzgar.mp3")} volume={0.45} />
      <Sequence from={Math.round(0.3 * fps)} layout="none"><Audio src={staticFile("blanc/sfx/kus-kanat.mp3")} volume={0.35} /></Sequence>
      <Sequence from={Math.round(0.5 * fps)} layout="none"><Audio src={staticFile("blanc/ses/S02.mp3")} volume={1} /></Sequence>
      <Sequence from={Math.round(0.45 * fps)} layout="none"><Audio src={staticFile("proto/ayak-sesi.mp3")} volume={0.55} /></Sequence>
      <Sequence from={Math.round(4.45 * fps)} layout="none"><Audio src={staticFile("proto/baston.mp3")} volume={0.8} /></Sequence>
      <Sequence from={Math.round(5.3 * fps)} layout="none"><Audio src={staticFile("proto/sapka.mp3")} volume={0.7} /></Sequence>
      <Sequence from={Math.round(T_REPLIK * fps)} layout="none"><Audio src={staticFile("proto/replik.mp3")} volume={1} /></Sequence>
      <Audio src={staticFile("blanc/sfx/altyapi.mp3")} volume={0.2} />
    </AbsoluteFill>
  );
};
