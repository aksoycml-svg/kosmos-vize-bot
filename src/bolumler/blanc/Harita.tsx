import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import geo from "./fransa.json";
import { mono, serif } from "../../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const K = 70, X0 = -5.4, Y0 = 51.3, YS = 1.45, OX = 70, OY = 400;
export const pj = (lon: number, lat: number): [number, number] => [OX + (lon - X0) * K, OY + (Y0 - lat) * K * YS];

// Fransa: gerçek sınır (Natural Earth tabanlı sadeleştirilmiş GeoJSON)
const polys: string[] = [];
const feats: any[] = (geo as any).type === "Feature" ? [geo] : (geo as any).features;
for (const f of feats) {
  const g = f.geometry;
  const rings = g.type === "Polygon" ? [g.coordinates[0]] : g.coordinates.map((p: any) => p[0]);
  for (const r of rings) polys.push("M" + r.map(([lo, la]: number[]) => pj(lo, la).map((v) => v.toFixed(1)).join(",")).join("L") + "Z");
}
const FR = polys.join(" ");

// Tarihî Paris–Bordeaux yolu (Chartres, Tours, Poitiers, Angoulême üzerinden)
const ROTA: [string, number, number, boolean][] = [
  ["PARIS", 2.35, 48.86, true], ["Chartres", 1.49, 48.44, false], ["Châteaudun", 1.33, 48.07, false], ["Vendôme", 1.07, 47.79, false],
  ["TOURS", 0.69, 47.39, true], ["Châtellerault", 0.55, 46.82, false], ["Poitiers", 0.34, 46.58, false], ["Angoulême", 0.16, 45.65, false],
  ["Barbezieux", -0.15, 45.47, false], ["BORDEAUX", -0.58, 44.84, true],
];
const PTS = ROTA.map(([, lo, la]) => pj(lo, la));
const SEG = PTS.slice(1).map((p, i) => Math.hypot(p[0] - PTS[i][0], p[1] - PTS[i][1]));
const TOT = SEG.reduce((a, b) => a + b, 0);
const at = (q: number): [number, number] => {
  let d = q * TOT;
  for (let i = 0; i < SEG.length; i++) {
    if (d <= SEG[i]) { const t = d / SEG[i]; return [PTS[i][0] + (PTS[i + 1][0] - PTS[i][0]) * t, PTS[i][1] + (PTS[i + 1][1] - PTS[i][1]) * t]; }
    d -= SEG[i];
  }
  return PTS[PTS.length - 1];
};
const ROAD = "M" + PTS.map((p) => p.join(",")).join(" L");

// Küçük Chappe kulesi ikonu (T biçimli kol)
const Kule: React.FC<{ x: number; y: number; on: number }> = ({ x, y, on }) => (
  <g transform={`translate(${x},${y})`}>
    <circle r={36} fill={`rgba(255,170,60,${0.6 * on})`} style={{ filter: "blur(8px)" }} />
    <rect x={-8} y={-6} width={16} height={14} fill="#3a2a1a" />
    <rect x={-1.5} y={-34} width={3} height={30} fill="#2a1d12" />
    <rect x={-15} y={-37} width={30} height={4} fill={on > 0.5 ? "#b3261e" : "#2a1d12"} />
    <rect x={-16} y={-37} width={3} height={12} fill="#2a1d12" />
    <rect x={13} y={-45} width={3} height={12} fill="#2a1d12" />
  </g>
);

export const Harita: React.FC<{ mod: "posta" | "telgraf" }> = ({ mod }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / fps;
  const D = durationInFrames / fps;
  const ink = "#2b1d10";
  // posta: araba tüm sahne boyunca yol alır · telgraf: sinyal ~1 sn'de uçar
  const q = mod === "posta"
    ? interpolate(t, [0.2, D - 0.15], [0, 1], { ...clamp, easing: Easing.inOut(Easing.sin) })
    : interpolate(t, [0.2, 1.3], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
  const [cx, cy] = at(q);
  // kamera: posta modunda arabayı takip eder (tilt aşağı), telgrafta tüm hat görünür
  const s = mod === "posta" ? 1.32 : interpolate(t, [0, D], [1.0, 1.08]);
  const tx = mod === "posta" ? (540 - cx) * 0.9 : 0;
  const ty = mod === "posta" ? Math.max(-260, (820 - cy) * 0.9) : 0;
  // 3 günlük gün-gece döngüsü
  const cycle = mod === "posta" ? q * 3 : 0;
  const night = mod === "posta" ? Math.pow(Math.max(0, Math.sin(cycle * Math.PI * 2 - Math.PI / 2)), 1.3) * 0.6 : 0;
  const gun = Math.min(3, Math.floor(cycle) + 1);
  const stamp = interpolate(t, [1.6, 1.85], [2.4, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const stampO = interpolate(t, [1.6, 1.7], [0, 1], clamp);
  const bob = Math.sin(frame * 1.2) * 3;
  return (
    <AbsoluteFill style={{ backgroundColor: "#1a120b", overflow: "hidden" }}>
      <AbsoluteFill style={{ scale: String(s), translate: `${tx}px ${ty}px` }}>
        <Img src={staticFile("blanc/img/parsomen.jpg")} style={{ position: "absolute", left: -200, top: -300, width: 1480, height: 2520, objectFit: "cover" }} />
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          <defs>
            <pattern id="tarama" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
              <line x1="0" y1="0" x2="0" y2="7" stroke={ink} strokeWidth="0.8" opacity="0.2" />
            </pattern>
          </defs>
          <path d={FR} fill={ink} stroke={ink} strokeWidth={7} strokeLinejoin="round" opacity={0.85} />
          <path d={FR} fill="#d9c49a" />
          <path d={FR} fill="url(#tarama)" />
          <path d={ROAD} fill="none" stroke={ink} strokeWidth={4} strokeDasharray="2 10" strokeLinecap="round" opacity={0.7} />
          <path d={ROAD} fill="none" stroke={mod === "telgraf" ? "#b3261e" : "#7a1d14"} strokeWidth={mod === "telgraf" ? 6 : 5} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - q} strokeLinecap="round" />
          {ROTA.map(([n, lo, la, big]) => {
            const [x, y] = pj(lo, la);
            return big ? (
              <g key={n}>
                <circle cx={x} cy={y} r={11} fill="#b3261e" stroke={ink} strokeWidth={3} />
                <text x={x + 20} y={y + 12} fontFamily={serif} fontWeight={900} fontSize={40} fill={ink}>{n}</text>
              </g>
            ) : mod === "posta" ? <circle key={n} cx={x} cy={y} r={4} fill={ink} /> : null;
          })}
          {mod === "telgraf" && Array.from({ length: 13 }).map((_, i) => {
            const qq = i / 12;
            const [x, y] = at(qq);
            return <Kule key={i} x={x - 28} y={y} on={interpolate(q, [qq - 0.02, qq + 0.02], [0, 1], clamp)} />;
          })}
          {mod === "posta" && Array.from({ length: 10 }).map((_, i) => {
            const [dx, dy] = at(Math.max(0, q - 0.004 * (i + 1)));
            return <circle key={i} cx={dx + 40} cy={dy + 10} r={6 + i * 2.4} fill="#c9b48a" opacity={0.4 * (1 - i / 10)} />;
          })}
        </svg>
        {mod === "posta" && <Img src={staticFile("blanc/img/araba.png")} style={{ position: "absolute", left: cx - 100, top: cy - 82 + bob, width: 200 }} />}
        <AbsoluteFill style={{ background: "#0b1530", opacity: night, mixBlendMode: "multiply" }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "flex-end", justifyContent: "flex-end", padding: "0 80px 600px" }}>
        {mod === "posta" ? (
          <div style={{ fontFamily: mono, fontSize: 44, color: "#f1e4c4", background: "rgba(30,18,8,0.85)", padding: "14px 28px", letterSpacing: 4, border: "2px solid #b8862b" }}>
            {night > 0.25 ? "☾" : "☀"} {gun}. GÜN
          </div>
        ) : (
          <div style={{ fontFamily: mono, fontSize: 44, color: "#fff2d6", background: "rgba(150,30,22,0.92)", padding: "14px 28px", letterSpacing: 4 }}>
            ⚡ {Math.max(1, Math.round(interpolate(q, [0, 1], [0, 4])))} SAAT
          </div>
        )}
      </AbsoluteFill>
      {mod === "telgraf" && (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 200 }}>
          <div style={{ scale: String(stamp), opacity: stampO, rotate: "-10deg", border: "10px solid #b3261e", color: "#b3261e", fontFamily: mono, fontSize: 70, letterSpacing: 8, padding: "6px 30px", background: "rgba(233,223,201,0.5)" }}>
            YALNIZCA DEVLET
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
