// ===== Leningrad yön kareleri (kullanıcıya yön onayı) — BODRUM P08-3 f252, SOKAK-LG P03a p114 =====
// Bolum zinciriyle aynı sarma: Sahne → ArsivKatmani(litografi). guvenli: true → güvenli alan bindirmesi (kilit noktalarıyla).
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ArsivKatmani } from "../../../doku/ArsivKatmani";
import { GuvenliAlan, KilitNokta } from "../../../doku/GuvenliAlan";
import type { Plan } from "../../tipler";
import type { Sablon } from "../../ortak";
import { BODRUM_SABLON } from "./Bodrum";
import { SOKAK_LG_SABLON } from "./Sokak";

export const LENINGRAD_P08_3: Plan = { id: "P08-3", sablon: "BODRUM", sure_kare: 300, parametreler: { gorunum: "p08" } };
export const LENINGRAD_P03A: Plan = { id: "P03a", sablon: "SOKAK-LG", sure_kare: 180, parametreler: { gorunum: "p03a", mevsim: "kis" } };

const Kare: React.FC<{ S: Sablon; plan: Plan; guvenli?: boolean; baslik: string }> = ({ S, plan, guvenli, baslik }) => {
  const p = useCurrentFrame();
  const kilit: KilitNokta[] = [];
  return (
    <AbsoluteFill style={{ backgroundColor: "#262a4e" }}>
      <ArsivKatmani mod={S.arsiv(plan)}><AbsoluteFill><S.Sahne plan={plan} p={p} kilit={kilit} /></AbsoluteFill></ArsivKatmani>
      {guvenli && <GuvenliAlan noktalar={kilit} baslik={baslik} />}
    </AbsoluteFill>
  );
};
export const LeningradBodrum: React.FC<{ guvenli?: boolean }> = ({ guvenli }) => <Kare S={BODRUM_SABLON} plan={LENINGRAD_P08_3} guvenli={guvenli} baslik="P08-3 BODRUM" />;
export const LeningradSokak: React.FC<{ guvenli?: boolean }> = ({ guvenli }) => <Kare S={SOKAK_LG_SABLON} plan={LENINGRAD_P03A} guvenli={guvenli} baslik="P03a SOKAK-LG kış" />;
