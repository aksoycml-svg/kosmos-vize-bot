import React from "react";
import { AbsoluteFill } from "remotion";
import { C } from "../theme";

// Eskitilmiş kâğıt zemin: renk + gren + vinyet
export const Paper: React.FC<{ dark?: boolean; children?: React.ReactNode }> = ({ dark, children }) => (
  <AbsoluteFill style={{ backgroundColor: dark ? C.night : C.paper }}>
    <svg width="100%" height="100%" style={{ position: "absolute", opacity: dark ? 0.18 : 0.35, mixBlendMode: "multiply" }}>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
    {children}
    <AbsoluteFill
      style={{
        background: dark
          ? "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)"
          : "radial-gradient(ellipse at center, transparent 45%, rgba(60,40,15,0.45) 100%)",
        pointerEvents: "none",
      }}
    />
  </AbsoluteFill>
);
