import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Kukla, FRANCOIS, LOUIS, yuru } from "../../../rig/Kukla";

export const RigTest: React.FC = () => {
  const f = useCurrentFrame();
  const w = yuru(f * 0.2, 1);
  return (
    <AbsoluteFill style={{ background: "#8899aa" }}>
      <svg width={1080} height={1920}>
        <Kukla p={FRANCOIS} pz={{ x: 330, y: 1300, scale: 1.3, facing: -1, ...w, agiz: "gulumse", lookX: 1 }} />
        <Kukla louis p={LOUIS} pz={{ x: 760, y: 1300, scale: 1.3, facing: -1, thighF: 0, kneeF: 4, thighB: 4, kneeB: 4, shF: -20, elF: -40, shB: 4, elB: -6, cane: 40, agiz: "dinlen", browF: -0.6, browB: -0.6 }} />
      </svg>
    </AbsoluteFill>
  );
};
