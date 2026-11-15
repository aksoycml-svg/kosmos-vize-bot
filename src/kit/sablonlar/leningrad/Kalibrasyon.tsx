// ===== LeningradKalibrasyon — SALON `konser` yön karesi (P12; kare = plan karesi, kontrol f96) =====
// Bolum zinciriyle aynı sarma: Sahne → ArsivKatmani(litografi). guvenli: true → güvenli alan bindirmesi (kilit noktalarıyla).
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ArsivKatmani } from "../../../doku/ArsivKatmani";
import { GuvenliAlan, KilitNokta } from "../../../doku/GuvenliAlan";
import type { Plan } from "../../tipler";
import { SALON_SABLON } from "./Salon";

export const LENINGRAD_P12: Plan = {
  id: "P12", sablon: "SALON", sure_kare: 209,
  parametreler: { durum: "konser", dalga_bas: 30, kollar: { bas: 90, bit: 132 } },
};

export const LeningradKalibrasyon: React.FC<{ guvenli?: boolean }> = ({ guvenli }) => {
  const p = useCurrentFrame();
  const kilit: KilitNokta[] = [];
  const S = SALON_SABLON;
  return (
    <AbsoluteFill style={{ backgroundColor: "#262a4e" }}>
      <ArsivKatmani mod={S.arsiv(LENINGRAD_P12)}><AbsoluteFill><S.Sahne plan={LENINGRAD_P12} p={p} kilit={kilit} /></AbsoluteFill></ArsivKatmani>
      {guvenli && <GuvenliAlan noktalar={kilit} baslik="P12 SALON konser" />}
    </AbsoluteFill>
  );
};
