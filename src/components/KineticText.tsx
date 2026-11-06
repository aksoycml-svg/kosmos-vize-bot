import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C } from "../theme";

// Kelime kelime beliren metin. *kelime* -> vurgu rengi
export const KineticText: React.FC<{
  text: string;
  start?: number; // saniye
  perWord?: number; // saniye
  fontFamily: string;
  fontSize: number;
  color?: string;
  accent?: string;
  weight?: number;
  align?: "left" | "center";
}> = ({ text, start = 0, perWord = 0.12, fontFamily, fontSize, color = C.ink, accent = C.red, weight = 900, align = "center" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");
  return (
    <div style={{ fontFamily, fontSize, fontWeight: weight, lineHeight: 1.08, textAlign: align, color, display: "flex", flexWrap: "wrap", justifyContent: align === "center" ? "center" : "flex-start", gap: `0 ${fontSize * 0.25}px` }}>
      {words.map((w, i) => {
        const t0 = (start + i * perWord) * fps;
        const p = interpolate(frame, [t0, t0 + 0.35 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) });
        const isAccent = w.startsWith("*") && w.endsWith("*");
        return (
          <span key={i} style={{ opacity: p, translate: `0px ${(1 - p) * 40}px`, filter: `blur(${(1 - p) * 8}px)`, color: isAccent ? accent : undefined, display: "inline-block" }}>
            {isAccent ? w.slice(1, -1) : w}
          </span>
        );
      })}
    </div>
  );
};
