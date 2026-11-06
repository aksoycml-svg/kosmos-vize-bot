import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { Paper } from "../components/Paper";
import { ChappeTower } from "../components/ChappeTower";
import { KineticText } from "../components/KineticText";
import { FranceMap, City } from "../components/FranceMap";
import { C, SAFE, mono, sans, serif } from "../theme";

const ROUTE: City[] = [
  { name: "Paris", lon: 2.35, lat: 48.86, label: true },
  { name: "a", lon: 1.6, lat: 48.3 },
  { name: "b", lon: 1.1, lat: 47.8 },
  { name: "Tours", lon: 0.69, lat: 47.39, label: true },
  { name: "c", lon: 0.34, lat: 46.58 },
  { name: "d", lon: 0.16, lat: 45.65 },
  { name: "Bordeaux", lon: -0.58, lat: 44.84, label: true },
];

// Sahne 1: Kanca — kule + metin
const Kanca: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <Paper>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: SAFE.bottom - 120 }}>
        <div style={{ scale: interpolate(frame, [0, 4 * fps], [1, 1.08]), translate: `0px ${interpolate(frame, [0, 4 * fps], [0, -30])}px` }}>
          <ChappeTower
            size={460}
            regulator={interpolate(t, [0.4, 1.0, 2.2, 2.8], [0, 45, 45, 90], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.6, 0, 0.2, 1) })}
            left={interpolate(t, [0.6, 1.2, 2.4, 3.0], [0, -90, -90, 45], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.6, 0, 0.2, 1) })}
            right={interpolate(t, [0.8, 1.4, 2.6, 3.2], [0, 135, 135, -45], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.6, 0, 0.2, 1) })}
          />
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ padding: `${SAFE.top}px ${SAFE.side}px 0` }}>
        <div style={{ fontFamily: mono, fontSize: 34, color: C.red, letterSpacing: 6, marginBottom: 28, opacity: interpolate(frame, [0, 10], [0, 1]) }}>DOSYA NO. 1834</div>
        <KineticText text="Tarihin ilk *siber* *saldırısında* ne bilgisayar vardı, ne de elektrik." fontFamily={serif} fontSize={92} align="left" perWord={0.14} />
      </AbsoluteFill>
    </Paper>
  );
};

// Sahne 2: Harita — sinyal hattı
const Harita: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Paper>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ scale: interpolate(frame, [0, 5 * fps], [1.0, 1.12]), translate: `${interpolate(frame, [0, 5 * fps], [0, 40])}px -60px` }}>
          <FranceMap route={ROUTE} start={0.6} duration={3} size={960} />
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ padding: `${SAFE.top}px ${SAFE.side}px 0` }}>
        <div style={{ display: "flex", gap: 30 }}>
          <Stat label="POSTA" value="3 GÜN" start={0.2} />
          <Stat label="TELGRAF" value="SAATLER" start={1.2} accent />
        </div>
      </AbsoluteFill>
      <Caption text="Telgraf aynı haberi birkaç saatte taşıyor." />
    </Paper>
  );
};

const Stat: React.FC<{ label: string; value: string; start: number; accent?: boolean }> = ({ label, value, start, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = interpolate(frame, [start * fps, (start + 0.4) * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) });
  return (
    <div style={{ opacity: p, translate: `0px ${(1 - p) * 30}px`, border: `4px solid ${accent ? C.red : C.ink}`, padding: "18px 26px", background: "rgba(233,223,201,0.85)" }}>
      <div style={{ fontFamily: mono, fontSize: 28, color: C.inkSoft, letterSpacing: 4 }}>{label}</div>
      <div style={{ fontFamily: serif, fontWeight: 900, fontSize: 76, color: accent ? C.red : C.ink }}>{value}</div>
    </div>
  );
};

// Alt yazı (ses kapalı izleyenler için)
const Caption: React.FC<{ text: string }> = ({ text }) => (
  <AbsoluteFill style={{ justifyContent: "flex-end", padding: `0 ${SAFE.side}px ${SAFE.bottom}px` }}>
    <div style={{ background: C.ink, color: C.paper, fontFamily: sans, fontWeight: 800, fontSize: 50, lineHeight: 1.2, padding: "18px 26px", alignSelf: "center", textAlign: "center" }}>{text}</div>
  </AbsoluteFill>
);

// Sahne 3: Beraat damgası
const Beraat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = interpolate(frame, [0.8 * fps, 1.05 * fps], [2.6, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const o = interpolate(frame, [0.8 * fps, 0.9 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shake = frame > 1.05 * fps && frame < 1.3 * fps ? Math.sin(frame * 3) * 8 : 0;
  return (
    <Paper dark>
      <AbsoluteFill style={{ padding: `${SAFE.top}px ${SAFE.side}px`, translate: `${shake}px 0px` }}>
        <div style={{ fontFamily: mono, fontSize: 34, color: C.gold, letterSpacing: 6 }}>TOURS · 14 MART 1837</div>
        <div style={{ marginTop: 40 }}>
          <KineticText text="Yasa yoktu. Suç da *yoktu.*" fontFamily={serif} fontSize={110} color={C.paper} align="left" perWord={0.16} />
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 300 }}>
        <div style={{ scale: s, opacity: o, rotate: "-12deg", border: `12px solid ${C.red}`, color: C.red, fontFamily: mono, fontWeight: 500, fontSize: 150, letterSpacing: 18, padding: "10px 50px", mixBlendMode: "screen" }}>BERAAT</div>
      </AbsoluteFill>
    </Paper>
  );
};

export const StilTesti: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Sequence name="Kanca" durationInFrames={4 * fps}><Kanca /></Sequence>
      <Sequence name="Harita" from={4 * fps} durationInFrames={5 * fps}><Harita /></Sequence>
      <Sequence name="Beraat" from={9 * fps} durationInFrames={3 * fps}><Beraat /></Sequence>
    </AbsoluteFill>
  );
};
