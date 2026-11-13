// ===== Paris kuşatması: uç noktasından yerleştirilen kol + el (KolEl sarmalayıcı) =====
// Çağıran yalnız "temas ucu"nu verir (işaret parmağı ucu ya da kıstırma noktası, ekran/dekor px) + el açısı + kol açısı + yerel px/m.
// El boyu 0.19 m (tasarım §3.2) → olcek = 0.19·pxm / EL_BOY_YEREL. Kol: bilek → dirsek → omuz kol açısı yönünde geriye (kadraj dışına).
// Gölge sürümü (golge) aynı geometriyi tek renkle çizer; çağıran ışık vektörüyle kaydırır (tek kaynak).
import React from "react";
import type { P } from "../../tipler";
import { EL_BOY_YEREL, elMatris, ISARET_UC_YEREL, KISTIR_YEREL, KolEl, KolTip } from "../../../rig/KolEl";
import type { KolIsik } from "../../../rig/RigIsik";

export type ElPoz = "kistir" | "kistirSiki" | "gevsek" | "isaret";
export type ElDurum = { uc: P; aci: number; kolAci: number; pxm: number; poz: ElPoz; bukum?: number; dirsekM?: number };
const EL_M = 0.19;
export const elGeometri = (d: ElDurum) => {
  const olcek = (EL_M * d.pxm) / EL_BOY_YEREL;
  const ucYerel = d.poz === "isaret" ? ISARET_UC_YEREL : KISTIR_YEREL;
  const off = elMatris([0, 0], d.aci, olcek)(ucYerel);
  const elBilek: P = [d.uc[0] - off[0], d.uc[1] - off[1]];
  const r = (d.kolAci * Math.PI) / 180, yon: P = [Math.cos(r), Math.sin(r)];
  const bilek: P = [elBilek[0] - 12 * yon[0], elBilek[1] - 12 * yon[1]];
  const L1 = (d.dirsekM ?? 0.26) * d.pxm;
  const dirsek: P = [bilek[0] - L1 * yon[0], bilek[1] - L1 * yon[1]];
  const r2 = r + ((d.bukum ?? 18) * Math.PI) / 180;
  const giris: P = [dirsek[0] - 0.24 * d.pxm * Math.cos(r2), dirsek[1] - 0.24 * d.pxm * Math.sin(r2)];
  const pinch = elMatris(elBilek, d.aci, olcek)(KISTIR_YEREL);
  return { olcek, bilek, dirsek, giris, pinch, gen: [0.15 * d.pxm, 0.11 * d.pxm, 0.068 * d.pxm] as [number, number, number] };
};
export const ParisEl: React.FC<{ d: ElDurum; tip: KolTip; isik?: KolIsik; golge?: string; tutulan?: React.ReactNode }> = ({ d, tip, isik, golge, tutulan }) => {
  const g = elGeometri(d);
  // tutulan nesne mutlak (dekor) koordinatta çizilir; KolEl onu kıstırma noktasına taşır → geri al
  const t = tutulan ? <g transform={`translate(${-g.pinch[0]} ${-g.pinch[1]})`}>{tutulan}</g> : undefined;
  return <KolEl giris={g.giris} dirsek={g.dirsek} bilek={g.bilek} gen={g.gen} tip={tip} elAci={d.aci} olcek={g.olcek} poz={d.poz} tutulan={golge ? undefined : t} golge={!!golge} golgeRenk={golge} isik={golge ? undefined : isik} />;
};
