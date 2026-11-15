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
  // tur-4 (orkestra): push-in kısaltıldı — f96 ≈ 41 mm (F 1845), dolly 1 m; en yakın (z10) avizeler yalnız alt kenarıyla üst köşede,
  // sütun dizisi + galeri + uzaklaşan avize sırası kadrajda; davul ø ≈ 45 px (kasnak ışığı parlaklıkla okunur, lint).
  // Hareket ışık dalgasıyla f40–96 (crash zoom yok), kesme yok.
  parametreler: { durum: "konser", dalga_bas: 30, kollar: { bas: 90, bit: 132 }, kamera_yol: {
    f: [0, 40, 60, 80, 96, 208], h: [1.35, 1.58, 1.7, 1.82, 1.9, 2.05], egim: [-1, 0.67, 1.6, 2.3, 2.5, 3.0],
    F: [1575, 1575, 1650, 1780, 1845, 1845], z: [0, 0, 0.32, 0.81, 1.0, 1.0], u: [-1, -1, -0.87, -0.68, -0.6, -0.6], yaw: [3, 3, 3.5, 4.2, 4.5, 4.5],
  } },
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
