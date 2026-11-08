// ===== SARAYBURNU şablonu (Evliya Uçuşları, KE-S1; mekanlar.md §1) =====
// gorunum: kiyi (P01 A, P03–P06; KURULDU: gece) · kosk (P02 gece, P10 gün) · insert (P07 gece, P11 gün) · ic (P12 gün).
// Kurulmamış görünüm/saat AÇIK HATA verir (yer tutucu çizilmez; "en yakınla doldurma" yok). Sıradaki kalibrasyonlar: K2 insert, köşk, iç.
import React from "react";
import type { Plan } from "../../tipler";
import { param, Sablon, SablonProps } from "../../ortak";
import { KiyiSahne } from "./Kiyi";

export type SarayburnuGorunum = "kiyi" | "kosk" | "insert" | "ic";
const Sahne: React.FC<SablonProps> = ({ plan, p, kilit }) => {
  const g = param<SarayburnuGorunum>(plan, "gorunum", "kiyi");
  const saat = param<string>(plan, "saat", "gece");
  if (g === "kiyi" && saat === "gece") return <KiyiSahne plan={plan} p={p} kilit={kilit} />;
  // TODO(K2): insert gece/gün (P07/P11) · TODO(K3): kosk gece/gün (P02/P10) · TODO: ic gün (P12)
  throw new Error(`[SARAYBURNU] gorunum "${g}" / saat "${saat}" henüz kurulmadı (${plan.id}); kurulu: kiyi+gece`);
};
const arsiv = (plan: Plan) => (param<string>(plan, "saat", "gece") === "gece" ? "gece" : "gunduz") as "gece" | "gunduz";
export const SARAYBURNU: Sablon = { Sahne, arsiv };
