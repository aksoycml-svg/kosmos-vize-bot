// ===== Şablon sözleşmesi + ortak çizimler =====
import React from "react";
import type { ArsivMod } from "../doku/ArsivKatmani";
import { Golge, Isik } from "../doku/Isik";
import type { KilitNokta } from "../doku/GuvenliAlan";
import { Kukla, yuzYerel } from "../rig/Kukla";
import { kuklaIsigi } from "../rig/RigIsik";
import { dunyaya } from "../rig/kinematik";
import { CepEldiven } from "../bolumler/blanc/props/EldivenKose";
import type { Plan, P } from "./tipler";
import type { KarakterDurum } from "./jestler";
import { KameraDurum, ekranNokta } from "./zaman";

// Şablon: Sahne (yalnız görüntü; yazı ve arşiv katmanı Bolum'de) + arşiv modu.
// kilit: güvenli alan denetimi için ekran noktaları (ayak, temas, yüz, kurulum) — Sahne render sırasında doldurur.
export type SablonProps = { plan: Plan; p: number; kilit: KilitNokta[] };
export type Sablon = { Sahne: React.FC<SablonProps>; arsiv: (plan: Plan) => ArsivMod; arsivAtla?: (plan: Plan, p: number) => boolean };

export const param = <T,>(plan: Plan, ad: string, v: T): T => (plan.parametreler?.[ad] as T | undefined) ?? v;

// Karakter: ışık tanımından gölge (gravür) + rig ışığı + (varsa) cep eldiveni. Önde olan arkadakini örter: çağıran z'ye göre sıralar.
export const KarakterCiz: React.FC<{ d: KarakterDurum; isik: Isik; kamera: KameraDurum; murekkep: string; seed: number; cepEldiven?: boolean; golgeAlfa?: number; golgeKlip?: string }> = ({ d, isik, kamera, murekkep, seed, cepEldiven, golgeAlfa = 0.45, golgeKlip }) => {
  const s = d.pz.scale ?? 1;
  return (
    <g>
      {/* golgeKlip: zemin gölgesi zemin düzleminde kalır (alçak mumda duvara taşmaz; duvardaki kısmı ayrı izdüşüm, ör. GolgeT) */}
      {!d.pz.yatik && <g clipPath={golgeKlip}><Golge isik={isik} ayak={d.ayak} h={600 * s * 0.9} genislik={100 * s} alfa={golgeAlfa} stil="gravur" seed={seed} /></g>}
      <Kukla louis={d.louis} p={d.palet} pz={d.pz} golgesiz isik={kuklaIsigi(isik, d.ayak, d.boyPx, { murekkep, kamera: kamera.cs, seed: seed + 7 })} />
      {cepEldiven && <CepEldiven pz={d.pz} kamera={kamera.cs} />}
    </g>
  );
};

// karakter kilit noktaları (ayak + yüz)
export const karakterKilit = (ad: string, d: KarakterDurum, k: KameraDurum): KilitNokta[] => [
  ...(d.pz.yatik ? [] : [{ ad: `${ad} ayak`, p: ekranNokta(k, d.ayak), tur: "ayak" } as KilitNokta]),
  { ad: `${ad} yüz`, p: ekranNokta(k, dunyaya(d.pz, yuzYerel(d.pz)) as P), tur: "yuz" },
];
