import React from "react";
import { C } from "../theme";

// Chappe optik telgraf kulesi: regülatör (yatay kol) + iki gösterge kolu
export const ChappeTower: React.FC<{
  regulator: number; // derece
  left: number;
  right: number;
  color?: string;
  size?: number;
}> = ({ regulator, left, right, color = C.ink, size = 600 }) => (
  <svg viewBox="0 0 400 600" width={size} height={size * 1.5}>
    {/* bina */}
    <polygon points="110,600 290,600 280,470 120,470" fill={color} />
    <polygon points="100,470 300,470 200,420" fill={color} />
    <rect x="175" y="520" width="50" height="80" fill={C.paper} opacity={0.25} />
    {/* direk */}
    <rect x="193" y="140" width="14" height="300" fill={color} />
    {/* regülatör + göstergeler */}
    <g transform={`rotate(${regulator} 200 150)`}>
      <rect x="60" y="142" width="280" height="16" rx="3" fill={color} />
      <g transform={`rotate(${left} 64 150)`}>
        <rect x="58" y="150" width="12" height="90" rx="3" fill={C.red} />
      </g>
      <g transform={`rotate(${right} 336 150)`}>
        <rect x="330" y="150" width="12" height="90" rx="3" fill={C.red} />
      </g>
      <circle cx="200" cy="150" r="10" fill={C.gold} />
    </g>
  </svg>
);
