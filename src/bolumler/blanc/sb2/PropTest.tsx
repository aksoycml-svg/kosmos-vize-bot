import React from "react";
import { AbsoluteFill } from "remotion";
import { PaketKagidi } from "../props/PaketKagidi";
import { Eldiven } from "../props/Eldiven";
import { KolEl } from "../../../rig/KolEl";
import { ArsivKatmani } from "../../../doku/ArsivKatmani";

// Hikâye nesneleri 360×640 testi (tasarim.md 3.1, 2.12): paket 4 durum + KolEl kıstırma (eldivenle) + EldivenEl
export const PropTest: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#7a5230" }}>
    <ArsivKatmani mod="gunduz">
      <AbsoluteFill>
        <svg width={1080} height={1920}>
          <rect width={1080} height={1920} fill="#8a6038" />
          <PaketKagidi x={270} y={330} olcek={0.8} acik={0} ipCozuk={false} />
          <PaketKagidi x={800} y={330} olcek={0.8} acik={0} ipCozuk={false} kabarti={0.6} />
          <PaketKagidi x={270} y={900} olcek={0.75} acik={0.5} etiketYeri={[200, 330]} />
          <PaketKagidi x={780} y={900} olcek={0.75} acik={1} etiketYeri={[200, 330]} />
          <KolEl giris={[-40, 1560]} dirsek={[180, 1500]} bilek={[420, 1380]} gen={[210, 170, 92]} elAci={-8} olcek={1.9} tutulan={<Eldiven elBoyu={140 * 1.9} />} />
          <KolEl giris={[1120, 1820]} dirsek={[960, 1720]} bilek={[760, 1640]} gen={[200, 160, 90]} tip="parisManset" elAci={170} olcek={1.5} eldiven="#f4efe2" poz="gevsek" />
        </svg>
      </AbsoluteFill>
    </ArsivKatmani>
  </AbsoluteFill>
);
