import React from "react";
import { ink } from "../../../doku/sabitler";
import { serif } from "../../../theme";

// "TOURS" paket etiketi — P01, P09 (380×110, posta arabasında), P10, P23'te AYNI çizim (süreklilik).
// Krem kart, ip deliği (pirinç halka), Playfair 900 mürekkep, hafif kenar sararması. Ölçek tek parametre.
// (x,y) = ip deliğinin merkezi; kart sağa uzanır. Genişlik 380·olcek.
export const TOURS_ETIKET = { w: 380, h: 110 };
export const ToursEtiketi: React.FC<{ x: number; y: number; olcek: number; aci?: number }> = ({ x, y, olcek, aci = 0 }) => {
  const { w, h } = TOURS_ETIKET;
  const kart = "#ece2c8";
  return (
    <g transform={`translate(${x},${y}) rotate(${aci}) scale(${olcek})`}>
      <path d={`M -14 ${-h / 2} L ${w - 14} ${-h / 2} L ${w - 14} ${h / 2} L -14 ${h / 2} L -34 ${h / 4} L -34 ${-h / 4} Z`} fill={kart} stroke={ink(kart)} strokeWidth={5} strokeLinejoin="round" />
      <path d={`M ${w - 40} ${-h / 2} L ${w - 14} ${-h / 2} L ${w - 14} ${h / 2} L ${w - 40} ${h / 2} Z`} fill="#c9b48a" opacity={0.35} />
      <circle cx={0} cy={0} r={12} fill="#b8862b" stroke={ink("#b8862b")} strokeWidth={4} />
      <circle cx={0} cy={0} r={6} fill="#3a2c1e" />
      <text x={(w - 14) / 2 + 10} y={30} textAnchor="middle" fontFamily={serif} fontWeight={900} fontSize={84} fill="#2b1d10" letterSpacing={4}>TOURS</text>
    </g>
  );
};
