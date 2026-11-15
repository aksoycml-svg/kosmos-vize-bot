// ===== Yarasa bombası eli: TEK PARÇA siluet (Paris dersi: iç dikiş/bant/tırnak/boğum yok; havada tek parmak yok) =====
// Yerel çerçeve (cm): +x tutulan nesnenin ekseni boyunca uçtan geriye (bileğe), +y eksene dik. Tutulan eksen y = 0:
// işaret parmağı eksenin üstünde (x 2.2–8), başparmak −y yanında; eksen x ≈ 9'da başparmak–işaret arasındaki perdeden çıkar
// (çağıran eksenin x > EL_CIKIS kısmını elin ÜSTÜNE çizer). Avuç + kıvrık parmaklar +y yanında. Bilek x ≈ 17, manşet, kol kadraj dışına.
// Tek dış kontur: önce bütün parçalar kalın konturla, sonra hepsi kontursuz dolgu (birleşim) → içte çizgi kalmaz.
// Işık: çağıran `isikYerel` verir (lamba yönü yerel çerçevede); aydınlık kenar ve gölge planı ona göre seçilir.
import React from "react";
import { KOL_PALET, KolTip } from "../../../rig/KolEl";

export const EL_CIKIS = 9.0; // tutulan eksenin elden çıktığı x (cm)
const PARCA = [
  // işaret (eksenin üstünde) + avuç + kıvrık parmaklar (+y) — perdede (8.8, −0.45) eksen dışarı çıkar
  "M2.2,0 C2.2,-0.7 2.9,-0.95 3.6,-0.9 L8.6,-0.55 C9.0,-0.5 9.2,0.1 9.5,0.75 C11.5,0.9 14.5,1.0 17.2,1.5 L17.6,6.4 C15.6,7.0 13.4,7.1 11.6,6.6 C10.6,7.1 9.2,6.9 8.6,6.1 C7.6,6.4 6.4,6.0 6.1,5.1 C5.0,5.2 4.1,4.5 4.1,3.6 C3.3,3.3 3.0,2.5 3.3,1.9 C2.6,1.5 2.2,0.8 2.2,0 Z",
  // başparmak (−y yanı), tabanı perdenin arkasında avuca bağlanır
  "M2.9,-1.0 C2.7,-1.7 3.4,-2.2 4.4,-2.2 C6.0,-2.3 8.0,-2.4 9.6,-2.0 C10.6,-1.7 11.4,-0.6 11.6,0.9 L9.5,0.75 C9.2,0.1 9.0,-0.5 8.6,-0.55 L3.6,-0.9 C3.2,-0.9 2.95,-0.95 2.9,-1.0 Z",
];
const KOL = "M17.0,0.9 L30,0.2 L30,9.0 L17.4,7.0 Z", MANSET = "M16.6,1.0 L18.8,0.85 L19.2,7.2 L17.0,6.6 Z";
// gölge planı: ışıktan uzak kenar şeridi (yerel ışık yönünün tersi). Basit: ışık −x'ten geliyorsa bilek yanı + ışığın ±y karşı kenarı
export const ElSiluet: React.FC<{ tip: KolTip; golge?: string; isikY?: number }> = ({ tip, golge, isikY = 0.1 }) => {
  const K = KOL_PALET[tip] ?? KOL_PALET.adams;
  if (golge) return <g fill={golge}>{PARCA.map((d, i) => <path key={i} d={d} />)}<path d={KOL} /></g>;
  // isikY > 0: ışık +y yanından (kıvrık parmaklar aydınlık, başparmak sırtı gölgede); < 0 tersi
  const golgeYol = isikY >= 0
    ? "M2.9,-1.0 C2.7,-1.7 3.4,-2.2 4.4,-2.2 C6.0,-2.3 8.0,-2.4 9.6,-2.0 C10.6,-1.7 11.4,-0.6 11.6,0.9 C14.5,1.0 16,1.2 17.2,1.5 L17.3,2.6 C15,2.2 12.5,2.0 10.6,1.6 C9.8,0.2 9.2,-1.0 8.0,-1.5 C6.0,-1.7 4.2,-1.6 2.9,-1.0 Z"
    : "M6.1,5.1 C6.4,6.0 7.6,6.4 8.6,6.1 C9.2,6.9 10.6,7.1 11.6,6.6 C13.4,7.1 15.6,7.0 17.6,6.4 L17.5,4.4 C15.0,5.2 12.4,5.2 10.2,4.6 C8.8,4.4 7.2,4.4 6.1,5.1 Z";
  const kenarYol = isikY >= 0 ? "M2.2,0.1 C2.2,0.9 2.7,1.6 3.5,2.0 C3.3,2.6 3.6,3.3 4.3,3.7 C4.6,4.4 5.6,5.0 6.8,4.8" : "M2.9,-1.0 C2.7,-1.7 3.4,-2.2 4.4,-2.2 C6.0,-2.3 8.0,-2.4 9.6,-2.0";
  return (
    <g strokeLinejoin="round">
      <path d={KOL} fill={K.kol} stroke={K.kolGolge} strokeWidth={0.1} />
      <path d={MANSET} fill={K.manset} stroke={K.mansetKir} strokeWidth={0.08} />
      {PARCA.map((d, i) => <path key={`k${i}`} d={d} fill={K.tenGolge} stroke={K.tenGolge} strokeWidth={0.18} />)}
      {PARCA.map((d, i) => <path key={`d${i}`} d={d} fill={K.ten} />)}
      <path d={golgeYol} fill={K.tenGolge} opacity={0.8} />
      <path d={kenarYol} fill="none" stroke="#e8b99a" strokeWidth={0.13} strokeLinecap="round" />
    </g>
  );
};
