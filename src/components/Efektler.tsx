import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, random, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Görsel plaka: Ken Burns (ölçek + kaydırma), isteğe bağlı ifade geçişi (alt görsel)
export type Move = { s: number; x: number; y: number };
export const Plate: React.FC<{ src: string; from: Move; to: Move; origin?: string; alt?: { src: string; at: number; dur?: number } }> = ({ src, from, to, origin = "50% 50%", alt }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const p = interpolate(frame, [0, durationInFrames], [0, 1], { ...clamp, easing: Easing.inOut(Easing.sin) });
  const style: React.CSSProperties = {
    position: "absolute", width: "100%", height: "100%", objectFit: "cover", transformOrigin: origin,
    scale: String(interpolate(p, [0, 1], [from.s, to.s])),
    translate: `${interpolate(p, [0, 1], [from.x, to.x])}px ${interpolate(p, [0, 1], [from.y, to.y])}px`,
  };
  const ao = alt ? interpolate(frame, [alt.at * fps, (alt.at + (alt.dur ?? 0.35)) * fps], [0, 1], clamp) : 0;
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#000" }}>
      <Img src={staticFile(src)} style={style} />
      {alt && <Img src={staticFile(alt.src)} style={{ ...style, opacity: ao }} />}
    </AbsoluteFill>
  );
};

// Sürüklenen bulutlar
export const Clouds: React.FC<{ y: number; h?: number; opacity?: number; speed?: number; color?: string; seed?: string }> = ({ y, h = 500, opacity = 0.5, speed = 1, color = "#9fb0d0", seed = "c" }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: 5 }).map((_, i) => {
        const r = (k: string) => random(`${seed}${i}${k}`);
        const w = 380 + r("w") * 420;
        const x = ((r("x") * 1600 + frame * speed * (0.6 + r("v"))) % 1900) - 500;
        return <div key={i} style={{ position: "absolute", left: x, top: y + r("y") * h, width: w, height: w * 0.32, borderRadius: "50%", background: color, opacity: opacity * (0.4 + r("o") * 0.6), filter: `blur(${28 + r("b") * 30}px)` }} />;
      })}
    </AbsoluteFill>
  );
};

// Kayan yıldız
export const ShootingStar: React.FC<{ at: number; x: number; y: number; len?: number; angle?: number; dur?: number }> = ({ at, x, y, len = 520, angle = 18, dur = 0.7 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = interpolate(frame, [at * fps, (at + dur) * fps], [0, 1], { ...clamp, easing: Easing.out(Easing.quad) });
  if (p <= 0 || p >= 1) return null;
  const o = Math.sin(p * Math.PI);
  return (
    <div style={{ position: "absolute", left: x + p * len, top: y + p * len * Math.tan((angle * Math.PI) / 180), width: 220, height: 3, rotate: `${angle}deg`, transformOrigin: "100% 50%", translate: "-220px 0", opacity: o, background: "linear-gradient(90deg, transparent, rgba(220,235,255,0.95))", boxShadow: "0 0 14px 3px rgba(190,215,255,0.8)", borderRadius: 3 }} />
  );
};

// Kanat çırpan kuş sürüsü
export const Birds: React.FC<{ at: number; dur: number; from: [number, number]; to: [number, number]; count?: number; color?: string; size?: number; seed?: string }> = ({ at, dur, from, to, count = 9, color = "#141018", size = 26, seed = "b" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = interpolate(frame, [at * fps, (at + dur) * fps], [0, 1], clamp);
  if (p <= 0 || p >= 1) return null;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
      {Array.from({ length: count }).map((_, i) => {
        const r = (k: string) => random(`${seed}${i}${k}`);
        const lag = r("l") * 0.25;
        const q = Math.min(1, Math.max(0, (p - lag * 0.3) / (1 - lag * 0.3)));
        const bx = from[0] + (to[0] - from[0]) * q + (r("x") - 0.5) * 260 + i * 14;
        const by = from[1] + (to[1] - from[1]) * q + (r("y") - 0.5) * 160 + Math.sin(q * 6 + i) * 12;
        const flap = Math.sin(frame * 0.9 + i * 1.7) * 0.8;
        const s = size * (0.6 + r("s") * 0.6);
        return <path key={i} d={`M ${bx - s} ${by - s * flap * 0.6} Q ${bx - s * 0.4} ${by - s * 0.15} ${bx} ${by} Q ${bx + s * 0.4} ${by - s * 0.15} ${bx + s} ${by - s * flap * 0.6}`} stroke={color} strokeWidth={3} fill="none" strokeLinecap="round" />;
      })}
    </svg>
  );
};

// Titreyen ışık halesi (fener, mum)
export const Glow: React.FC<{ x: number; y: number; r: number; color?: string; strength?: number; seed?: number }> = ({ x, y, r, color = "255,170,80", strength = 0.55, seed = 0 }) => {
  const frame = useCurrentFrame();
  const f = 0.82 + Math.sin(frame * 0.7 + seed) * 0.08 + Math.sin(frame * 1.9 + seed * 2) * 0.06 + (random(`g${seed}${Math.floor(frame / 3)}`) - 0.5) * 0.08;
  return <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: "50%", background: `radial-gradient(circle, rgba(${color},${strength * f}) 0%, rgba(${color},${strength * f * 0.35}) 35%, transparent 70%)`, mixBlendMode: "screen", pointerEvents: "none" }} />;
};

// Havada süzülen toz zerreleri
export const Dust: React.FC<{ count?: number; area?: [number, number, number, number]; color?: string; seed?: string }> = ({ count = 40, area = [0, 0, 1080, 1920], color = "255,220,160", seed = "d" }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "screen" }}>
      {Array.from({ length: count }).map((_, i) => {
        const r = (k: string) => random(`${seed}${i}${k}`);
        const x = area[0] + ((r("x") * area[2] + frame * (r("vx") - 0.5) * 0.8) % area[2]);
        const y = area[1] + ((r("y") * area[3] - frame * (0.2 + r("vy") * 0.6) + area[3] * 10) % area[3]);
        const s = 2 + r("s") * 5;
        const tw = 0.4 + 0.6 * Math.abs(Math.sin(frame * 0.05 + i));
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: s, height: s, borderRadius: "50%", background: `rgba(${color},${0.7 * tw})`, filter: "blur(1px)" }} />;
      })}
    </AbsoluteFill>
  );
};

// Zeminde sürüklenen sis
export const Fog: React.FC<{ y: number; opacity?: number; color?: string }> = ({ y, opacity = 0.35, color = "180,195,220" }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {[0, 1].map((i) => (
        <div key={i} style={{ position: "absolute", left: -600 + ((frame * (0.8 + i * 0.5) + i * 700) % 1400) - 400, top: y + i * 60, width: 2200, height: 260, background: `radial-gradient(ellipse at center, rgba(${color},${opacity}) 0%, transparent 70%)`, filter: "blur(20px)" }} />
      ))}
    </AbsoluteFill>
  );
};

// Film grenı + vinyet
export const FilmLook: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)" }} />
      <AbsoluteFill style={{ mixBlendMode: "overlay", opacity: 0.16 }}>
        <svg width="100%" height="100%"><filter id="fg"><feTurbulence type="fractalNoise" baseFrequency="0.85" seed={frame % 10} /></filter><rect width="100%" height="100%" filter="url(#fg)" /></svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Sert flaş + sarsıntı (tokmak, mühür anları)
export const Impact: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame - at * fps;
  const shake = t >= 0 && t < 8 ? Math.sin(t * 2.6) * (8 - t) * 2 : 0;
  const flash = t >= 0 && t < 6 ? (6 - t) / 6 : 0;
  return (
    <AbsoluteFill style={{ translate: `${shake}px ${shake * 0.4}px` }}>
      {children}
      <AbsoluteFill style={{ background: "#fff6e0", opacity: flash * 0.35, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};
