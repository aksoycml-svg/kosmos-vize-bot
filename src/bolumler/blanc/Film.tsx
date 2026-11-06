import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { Plate, Clouds, ShootingStar, Birds, Glow, Dust, Fog, FilmLook, Impact } from "../../components/Efektler";
import { Harita } from "./Harita";
import { SAFE, mono, sans, serif } from "../../theme";
import S01 from "./ses/S01.json";
import S02 from "./ses/S02.json";
import S03 from "./ses/S03.json";
import S04 from "./ses/S04.json";
import S05 from "./ses/S05.json";
import S06 from "./ses/S06.json";
import S07 from "./ses/S07.json";
import S08 from "./ses/S08.json";
import S09 from "./ses/S09.json";
import S10 from "./ses/S10.json";
import S11 from "./ses/S11.json";
import S12 from "./ses/S12.json";

type W = { t: string; s: number; e: number };
type Ses = { id: string; text: string; dur: number; words: W[] };
const SES: Ses[] = [S01, S02, S03, S04, S05, S06, S07, S08, S09, S10, S11, S12];

export const FPS = 30;
const LEAD = 0.2; // her sahnede sesten önce nefes
const TAIL = 0.08;
const durs = SES.map((s, i) => Math.ceil((s.dur + LEAD + TAIL + (i === SES.length - 1 ? 1.6 : 0)) * FPS));
const starts = durs.map((_, i) => durs.slice(0, i).reduce((a, b) => a + b, 0));
export const TOPLAM = durs.reduce((a, b) => a + b, 0);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// ---- Yazı katmanları ----
const Baslik: React.FC<{ text: string; at?: number; color?: string; size?: number }> = ({ text, at = 0.15, color = "#f1e4c4", size = 64 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = interpolate(frame, [at * fps, (at + 0.45) * fps], [0, 1], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) });
  return (
    <AbsoluteFill style={{ padding: `${SAFE.top}px ${SAFE.side}px 0`, pointerEvents: "none" }}>
      <div style={{ opacity: p, translate: `0px ${(1 - p) * 30}px`, fontFamily: serif, fontWeight: 900, fontSize: size, lineHeight: 1.05, color, textShadow: "0 4px 30px rgba(0,0,0,0.9), 0 0 2px #000", letterSpacing: 1 }}>{text}</div>
    </AbsoluteFill>
  );
};

const IsimKarti: React.FC<{ name: string; x: number; y: number; at: number; color: string }> = ({ name, x, y, at, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = interpolate(frame, [at * fps, (at + 0.4) * fps], [0, 1], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) });
  return (
    <div style={{ position: "absolute", left: x, top: y, translate: `-50% ${(1 - p) * 20}px`, opacity: p, textAlign: "center" }}>
      <div style={{ fontFamily: mono, fontSize: 30, letterSpacing: 6, color: "#e7c98a", textShadow: "0 2px 10px #000" }}>{name.split(" ")[0]}</div>
      <div style={{ fontFamily: serif, fontWeight: 900, fontSize: 54, color: "#fff", textShadow: "0 3px 18px #000" }}>{name.split(" ").slice(1).join(" ")}</div>
      <div style={{ height: 4, width: 120 * p, background: color, margin: "6px auto 0" }} />
    </div>
  );
};

// Kelime kelime altyazı (sesle senkron)
const Altyazi: React.FC<{ ses: Ses }> = ({ ses }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps - LEAD;
  const groups: W[][] = [];
  ses.words.forEach((w, i) => { if (i % 4 === 0) groups.push([]); groups[groups.length - 1].push(w); });
  const g = groups.find((gr, i) => t < (groups[i + 1]?.[0].s ?? 1e9)) ?? groups[groups.length - 1];
  if (t < -0.1 || !g) return null;
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", padding: `0 ${SAFE.side}px ${SAFE.bottom + 10}px`, pointerEvents: "none" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 16px", fontFamily: sans, fontWeight: 800, fontSize: 58, lineHeight: 1.15, textAlign: "center", textShadow: "0 3px 0 #000, 0 0 24px rgba(0,0,0,0.9)", maxWidth: 920 }}>
        {g.map((w, i) => {
          const on = t >= w.s - 0.05;
          const cur = t >= w.s - 0.05 && t < w.e + 0.1;
          return <span key={i} style={{ color: cur ? "#ffcf70" : on ? "#ffffff" : "rgba(255,255,255,0.45)", scale: cur ? "1.06" : "1" }}>{w.t}</span>;
        })}
      </div>
    </AbsoluteFill>
  );
};

const Sfx: React.FC<{ f: string; at: number; vol?: number }> = ({ f, at, vol = 0.8 }) => {
  const { fps } = useVideoConfig();
  return <Sequence from={Math.round(at * fps)} layout="none"><Audio src={staticFile(`blanc/sfx/${f}.mp3`)} volume={vol} /></Sequence>;
};

// ---- Sahneler ----
const s01: React.FC = () => (
  <AbsoluteFill>
    <Plate src="blanc/img/S01.jpg" from={{ s: 1.35, x: -40, y: 120 }} to={{ s: 1.08, x: 0, y: 30 }} />
    <Clouds y={520} h={500} opacity={0.45} speed={1.6} seed="s1" />
    <ShootingStar at={1.6} x={120} y={330} len={560} angle={14} />
    <Glow x={1000} y={1640} r={260} strength={0.6} seed={1} />
    <Fog y={1500} opacity={0.18} />
    <Sfx f="gece-ruzgar" at={0} vol={0.5} />
    <Sfx f="telgraf-kol" at={0.5} vol={0.8} />
    <Sfx f="kayan-yildiz" at={1.55} vol={0.5} />
    <Baslik text="TARİHİN İLK HACK'İ" at={0.2} size={72} color="#f3e6c8" />
  </AbsoluteFill>
);

const s02: React.FC = () => (
  <AbsoluteFill>
    <Plate src="blanc/img/S02.jpg" from={{ s: 1.18, x: 0, y: 80 }} to={{ s: 1.04, x: 0, y: 20 }} alt={{ src: "blanc/img/S02b.jpg", at: 1.5, dur: 0.25 }} />
    <Birds at={0.3} dur={2.8} from={[1150, 260]} to={[-200, 120]} count={8} color="#0c0a12" />
    <Clouds y={60} h={260} opacity={0.35} speed={1.2} seed="s2" />
    <Glow x={250} y={735} r={200} strength={0.55} seed={2} />
    <Fog y={1450} opacity={0.3} />
    <IsimKarti name="FRANÇOIS BLANC" x={380} y={650} at={0.9} color="#3b5b9a" />
    <IsimKarti name="LOUIS BLANC" x={710} y={650} at={1.3} color="#8c2a3c" />
    <Sfx f="whoosh" at={0} vol={0.5} />
    <Sfx f="kus-kanat" at={0.35} vol={0.45} />
  </AbsoluteFill>
);

const s03: React.FC = () => (
  <AbsoluteFill>
    <Plate src="blanc/img/S03.jpg" from={{ s: 1.25, x: 120, y: -40 }} to={{ s: 1.1, x: -40, y: 10 }} />
    <Birds at={0.2} dur={2.4} from={[200, 1500]} to={[700, 300]} count={10} color="#3a3530" size={30} seed="p" />
    <Dust count={25} color="255,235,190" seed="s3" />
    <Sfx f="kalabalik" at={0} vol={0.45} />
    <Sfx f="kus-kanat" at={0.2} vol={0.5} />
    <Baslik text="BORDEAUX" at={0.2} />
  </AbsoluteFill>
);

const s04: React.FC = () => (
  <AbsoluteFill>
    <Harita mod="posta" />
    <Sfx f="at-arabasi" at={0} vol={0.6} />
    <Baslik text="POSTA: 3 GÜN" at={0.3} color="#2b1d10" />
  </AbsoluteFill>
);

const s05: React.FC = () => (
  <AbsoluteFill>
    <Harita mod="telgraf" />
    <Sfx f="whoosh" at={0.15} vol={0.7} />
    <Sfx f="muhur" at={1.75} vol={0.9} />
    <Baslik text="TELGRAF: SAATLER" at={0.2} color="#7a1d14" />
  </AbsoluteFill>
);

const s06: React.FC = () => (
  <Impact at={99}>
    <Plate src="blanc/img/S06.jpg" from={{ s: 1.05, x: 0, y: 0 }} to={{ s: 1.22, x: -60, y: -80 }} alt={{ src: "blanc/img/S06b.jpg", at: 1.7, dur: 0.3 }} />
    <Glow x={462} y={1400} r={300} strength={0.6} seed={6} />
    <Dust count={18} area={[300, 1150, 600, 400]} color="255,200,120" seed="s6" />
    <Sfx f="mum-kapi" at={0.1} vol={0.7} />
    <Sfx f="altin" at={1.1} vol={0.8} />
    <Baslik text="TOURS · RÜŞVET" at={0.2} />
  </Impact>
);

const s07: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = (a: number) => interpolate(frame, [a * fps, (a + 0.35) * fps], [0, 1], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) });
  return (
    <AbsoluteFill>
      <Plate src="blanc/img/S07.jpg" origin="50% 100%" from={{ s: 1.22, x: 0, y: 0 }} to={{ s: 1.32, x: -30, y: 0 }} />
      <Dust count={50} area={[0, 300, 1080, 1100]} color="255,220,150" seed="s7" />
      <Glow x={220} y={420} r={320} strength={0.45} seed={7} />
      <AbsoluteFill style={{ padding: `${SAFE.top}px ${SAFE.side}px`, flexDirection: "row", gap: 30 }}>
        <div style={{ opacity: p(1.3), scale: String(0.8 + 0.2 * p(1.3)), fontFamily: serif, fontWeight: 900, fontSize: 66, color: "#fff", background: "rgba(30,90,40,0.85)", padding: "10px 24px", height: "fit-content" }}>ELDİVEN <span style={{ fontFamily: sans }}>↑</span></div>
        <div style={{ opacity: p(2.6), scale: String(0.8 + 0.2 * p(2.6)), fontFamily: serif, fontWeight: 900, fontSize: 66, color: "#fff", background: "rgba(150,30,22,0.88)", padding: "10px 24px", height: "fit-content" }}>ÇORAP <span style={{ fontFamily: sans }}>↓</span></div>
      </AbsoluteFill>
      <Sfx f="paket" at={0.15} vol={0.8} />
    </AbsoluteFill>
  );
};

const s08: React.FC = () => (
  <AbsoluteFill>
    {/* Tilt: kulenin dibinden tepesine */}
    <Plate src="blanc/img/S08.jpg" origin="50% 50%" from={{ s: 1.5, x: 40, y: -420 }} to={{ s: 1.25, x: -20, y: 280 }} />
    <Birds at={1.4} dur={3} from={[560, 650]} to={[-150, 200]} count={11} color="#1d1420" size={24} seed="s8" />
    <Glow x={455} y={1395} r={200} strength={0.55} seed={8} />
    <Sfx f="telgraf-kol" at={1.2} vol={0.8} />
    <Sfx f="kus-kanat" at={1.4} vol={0.5} />
  </AbsoluteFill>
);

const s09: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = interpolate(frame, [0, 0.9 * fps, 1.3 * fps], [330, 330, 1500], { ...clamp, easing: Easing.in(Easing.cubic) });
  return (
    <AbsoluteFill>
      <Plate src="blanc/img/S09.jpg" from={{ s: 1.12, x: 0, y: 0 }} to={{ s: 1.2, x: -50, y: -40 }} />
      {/* dürbün maskesi */}
      <AbsoluteFill style={{ background: `radial-gradient(circle at 300px 800px, transparent ${r}px, rgba(0,0,0,0.96) ${r + 18}px)` }} />
      <Glow x={350} y={1450} r={220} strength={0.5} seed={9} />
      <Sfx f="whoosh" at={0.95} vol={0.6} />
    </AbsoluteFill>
  );
};

const s10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const yil = Math.round(interpolate(frame, [0.3 * fps, 2.2 * fps], [1834, 1836], clamp));
  const dark = interpolate(frame, [3.4 * fps, 4.4 * fps], [0, 0.45], clamp);
  return (
    <AbsoluteFill>
      <Plate src="blanc/img/S10.jpg" origin="50% 100%" from={{ s: 1.22, x: 0, y: -60 }} to={{ s: 1.3, x: 0, y: -330 }} />
      <Glow x={240} y={580} r={300} strength={0.5} seed={10} />
      <AbsoluteFill style={{ background: "#05070c", opacity: dark }} />
      <AbsoluteFill style={{ padding: `${SAFE.top}px ${SAFE.side}px` }}>
        <div style={{ fontFamily: mono, fontSize: 96, color: "#ffd27a", textShadow: "0 4px 24px #000" }}>{yil}</div>
      </AbsoluteFill>
      <Sfx f="altin" at={0.3} vol={0.7} />
      <Sfx f="whoosh" at={3.3} vol={0.5} />
    </AbsoluteFill>
  );
};

const s11: React.FC<{ beraatAt: number }> = ({ beraatAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const st = interpolate(frame, [beraatAt * fps, (beraatAt + 0.2) * fps], [2.6, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const so = interpolate(frame, [beraatAt * fps, (beraatAt + 0.08) * fps], [0, 1], clamp);
  return (
    <Impact at={beraatAt + 0.18}>
      <Plate src="blanc/img/S11.jpg" from={{ s: 1.35, x: -120, y: 200 }} to={{ s: 1.08, x: 0, y: 40 }} />
      <Dust count={40} color="255,230,180" seed="s11" />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingBottom: 300 }}>
        <div style={{ scale: String(st), opacity: so, rotate: "-12deg", border: "12px solid #c22d22", color: "#c22d22", fontFamily: mono, fontSize: 140, letterSpacing: 16, padding: "4px 40px", background: "rgba(240,228,200,0.55)" }}>BERAAT</div>
      </AbsoluteFill>
      <Sfx f="tokmak" at={beraatAt - 0.05} vol={0.9} />
      <Sfx f="muhur" at={beraatAt + 0.15} vol={0.8} />
      <Baslik text="TOURS · 1837" at={0.2} />
    </Impact>
  );
};

const s12: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const fade = interpolate(frame, [durationInFrames - 1.1 * fps, durationInFrames - 0.2 * fps], [0, 1], clamp);
  const son = interpolate(frame, [durationInFrames - 2.4 * fps, durationInFrames - 1.9 * fps], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <Plate src="blanc/img/S12.jpg" from={{ s: 1.05, x: 0, y: 0 }} to={{ s: 1.3, x: 30, y: 120 }} />
      <Clouds y={500} h={500} opacity={0.4} speed={1.4} seed="s12" />
      <ShootingStar at={1.0} x={350} y={340} len={480} angle={-12} />
      <Glow x={690} y={1320} r={220} strength={0.55} seed={12} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 100, opacity: son }}>
        <div style={{ fontFamily: serif, fontWeight: 900, fontSize: 58, color: "#f3e6c8", textAlign: "center", textShadow: "0 4px 30px #000", background: "rgba(0,0,0,0.45)", padding: "26px 30px" }}>
          François Blanc, yıllar sonra <span style={{ color: "#ffcf70" }}>Monte Carlo Kumarhanesi</span>'ni yönetti.
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "#000", opacity: fade }} />
      <Sfx f="gece-ruzgar" at={0} vol={0.45} />
      <Sfx f="kayan-yildiz" at={0.95} vol={0.5} />
    </AbsoluteFill>
  );
};

// "Beraat" kelimesinin ses içindeki zamanı
const beraatAt = LEAD + (S11.words.find((w: W) => w.t.toLowerCase().startsWith("beraat"))?.s ?? 1.5);
const SAHNELER: React.FC[] = [s01, s02, s03, s04, s05, s06, s07, s08, s09, s10, () => React.createElement(s11, { beraatAt }), s12];

export const BlancFilm: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {SAHNELER.map((Sahne, i) => (
        <Sequence key={i} name={SES[i].id} from={starts[i]} durationInFrames={durs[i]}>
          <Sahne />
          <Sequence from={Math.round(LEAD * fps)} layout="none">
            <Audio src={staticFile(`blanc/ses/${SES[i].id}.mp3`)} volume={1} />
          </Sequence>
          <Altyazi ses={SES[i]} />
        </Sequence>
      ))}
      {/* müzik altyapısı (22 sn döngü) */}
      {[0, 1, 2].map((k) => (
        <Sequence key={k} from={Math.round(k * 21.5 * fps)} durationInFrames={Math.round(22 * fps)} layout="none">
          <Audio src={staticFile("blanc/sfx/altyapi.mp3")} volume={(f) => 0.22 * interpolate(f, [0, 12, 22 * fps - 15, 22 * fps], [0, 1, 1, 0], clamp)} />
        </Sequence>
      ))}
      <FilmLook />
    </AbsoluteFill>
  );
};
