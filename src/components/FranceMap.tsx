import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C, mono } from "../theme";

// Basitleştirilmiş Fransa silueti (boylam, enlem)
const OUTLINE: [number, number][] = [
  [2.5, 51.1], [4.2, 49.95], [5.8, 49.5], [8.2, 48.97], [7.6, 47.6], [6.1, 46.2], [7.0, 45.9], [6.9, 44.4], [7.5, 43.8], [6.2, 43.1],
  [4.8, 43.4], [3.1, 43.1], [3.15, 42.45], [1.7, 42.5], [-0.3, 42.8], [-1.8, 43.4], [-1.25, 44.6], [-1.1, 46.0], [-2.1, 47.1],
  [-4.4, 47.8], [-4.8, 48.4], [-3.0, 48.8], [-1.4, 48.65], [-1.6, 49.65], [0.2, 49.45], [1.5, 50.1],
];
const K = 66;
export const proj = ([lon, lat]: [number, number]) => [(lon + 5.5) * K, (51.6 - lat) * K * 1.48] as const;

export type City = { name: string; lon: number; lat: number; label?: boolean };

export const FranceMap: React.FC<{ route: City[]; start?: number; duration?: number; size?: number }> = ({ route, start = 0, duration = 3, size = 920 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pts = route.map((c) => proj([c.lon, c.lat]));
  const segs = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
  const total = segs.reduce((a, b) => a + b, 0);
  const progress = interpolate(frame, [start * fps, (start + duration) * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const d = "M" + pts.map((p) => `${p[0]},${p[1]}`).join(" L");
  const outline = "M" + OUTLINE.map((p) => proj(p).join(",")).join(" L") + " Z";
  const reachedAt = (i: number) => segs.slice(0, i).reduce((a, b) => a + b, 0) / total;
  return (
    <svg viewBox="0 0 900 900" width={size} height={size}>
      <path d={outline} fill={C.paperDark} stroke={C.ink} strokeWidth={3} strokeLinejoin="round" opacity={0.9} />
      <path d={d} fill="none" stroke={C.inkSoft} strokeWidth={3} strokeDasharray="6 10" opacity={0.6} />
      <path d={d} fill="none" stroke={C.red} strokeWidth={7} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - progress} />
      {route.map((c, i) => {
        const on = progress >= reachedAt(i) - 0.001;
        const [x, y] = pts[i];
        return (
          <g key={c.name}>
            <circle cx={x} cy={y} r={c.label ? 14 : 8} fill={on ? C.red : C.paper} stroke={C.ink} strokeWidth={3} />
            {c.label && (
              <text x={x + 24} y={y + 10} fontFamily={mono} fontSize={34} fill={C.ink} fontWeight={500}>
                {c.name.toUpperCase()}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};
