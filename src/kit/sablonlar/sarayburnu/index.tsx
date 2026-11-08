// ===== SARAYBURNU şablonu (Evliya Uçuşları, KE-S1; mekanlar.md §1) =====
// gorunum: kiyi (P01 A, P03–P06; KURULDU: gece) · kosk (P02 gece, P10 gün; KURULDU K3) · insert (P07 gece, P11 gün; KURULDU K2) · ic (P12 gün).
// Kurulmamış görünüm/saat AÇIK HATA verir (yer tutucu çizilmez; "en yakınla doldurma" yok). Sıradaki kalibrasyonlar: K2 insert, köşk, iç.
import React from "react";
import type { Plan } from "../../tipler";
import { param, Sablon, SablonProps } from "../../ortak";
import { KiyiSahne } from "./Kiyi";
import { InsertSahne } from "./Insert";
import { KoskSahne } from "./Kosk";

export type SarayburnuGorunum = "kiyi" | "kosk" | "insert" | "ic";
const Sahne: React.FC<SablonProps> = ({ plan, p, kilit, onceki }) => {
  const g = param<SarayburnuGorunum>(plan, "gorunum", "kiyi");
  const saat = param<string>(plan, "saat", "gece");
  if (g === "kiyi" && saat === "gece") return <KiyiSahne plan={plan} p={p} kilit={kilit} onceki={onceki} />;
  if (g === "insert" && (saat === "gece" || saat === "gun")) return <InsertSahne plan={plan} p={p} kilit={kilit} />; // K2 (P07/P11)
  if (g === "kosk" && (saat === "gece" || saat === "gun")) return <KoskSahne plan={plan} p={p} kilit={kilit} />; // K3 (P02/P10)
  // TODO: ic gün (P12)
  throw new Error(`[SARAYBURNU] gorunum "${g}" / saat "${saat}" henüz kurulmadı (${plan.id}); kurulu: kiyi+gece, insert+gece/gun, kosk+gece/gun`);
};
// gece: mekanlar §8 derecelendirmesi (geceLapis: gece mavisi korunur, K1 O5)
// gün: gunduzMineral (K2 ölçümü: "gunduz" derecelendirmesi deniz tonunu kaydırıyordu)
const arsiv = (plan: Plan) => (param<string>(plan, "saat", "gece") === "gece" ? "geceLapis" : "gunduzMineral") as "geceLapis" | "gunduzMineral";
export const SARAYBURNU: Sablon = { Sahne, arsiv };
