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
  // tur-3 (orkestra kararı 5): davula yavaş push-in, kesme yok. Orkestra f80–96 dedi; 16 kare (0.27 sn) davulu ≥60 px'e getirmek için
  // crash zoom olurdu (savaş konusu: yasak) → dalga ile birlikte f40–96 (0.93 sn), yumuşak giriş-çıkış anahtarları. f96: F 2150 (~48 mm),
  // dolly 3 m, truck u −1 → −0.3, pan 3° → 6°; davul ø ≈ 60 px.
  parametreler: { durum: "konser", dalga_bas: 30, kollar: { bas: 90, bit: 132 }, kamera_yol: {
    f: [0, 40, 60, 80, 96, 208], h: [1.35, 1.58, 1.7, 1.82, 1.9, 2.05], egim: [-1, 0.67, 1.0, 1.1, 1.0, 1.4],
    F: [1575, 1575, 1759, 2041, 2150, 2150], z: [0, 0, 0.96, 2.43, 3, 3], u: [-1, -1, -0.78, -0.43, -0.3, -0.3], yaw: [3, 3, 3.96, 5.43, 6, 6],
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
