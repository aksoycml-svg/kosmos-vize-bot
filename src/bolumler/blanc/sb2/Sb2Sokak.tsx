import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Kukla, FRANCOIS, LOUIS, Poz } from "../../../rig/Kukla";
import { AYAK_TABAN, bastonAcisi, bastonUcu, dunyaya, elYerel } from "../../../rig/kinematik";
import { Sokak, FENER, Tanimlar, zemin, sokakGenislik, REVERBERE_Z } from "../proto/Sokak";
import { ArsivKatmani } from "../../../doku/ArsivKatmani";
import { KonturTitreme } from "../../../doku/KonturTitreme";
import { TemasGolgesi } from "../../../doku/IsikKatmani";
import { DOKU_SEED } from "../../../doku/sabitler";
import { Altyazi } from "../../../components/EkranYazisi";

// ===== SB2-SOKAK · P04 · SOKAK-BORDEAUX (gece) — plan karesi p = mutlak − 564 (stil karesi p 160 = mutlak 724) =====
// Orta plan push-in p 144–216 (cs 1.06→1.18, cx 0→+60, cy −20→−120). Insert (p 78–144) FareInsert'te, burada yok.
// Karakter konumu (z,u) → zemin(); ölçek sokakGenislik(z) ile orantılı (prototiple aynı referans: z 1.3 → 1.32).
export const SB2_SOKAK_SURE = 216;

const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.inOut(Easing.cubic);
const OLCEK_K = 1.32 / sokakGenislik(1.3);
const olcek = (z: number) => OLCEK_K * sokakGenislik(z);
const IZGARA = { z: 2.2, u: 0.58 };

// Karakteri (z,u) zemin noktasına bastır: ayak tabanı tam zeminde
const yerlestir = (z: number, u: number) => { const [x, y] = zemin(z, u); const s = olcek(z); return { x, y: y + AYAK_TABAN * s, s, zx: x, zy: y }; };

const francoisPoz = (p: number): Poz => {
  const g = yerlestir(1.9, 0.46);
  // 144–162 şapkayı kaldırır, sonra elde yukarıda kalır
  const kol = interpolate(p, [144, 158, 162], [0, 1.04, 1], { ...cl, easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const pz: Poz = {
    // prototiple aynı yön (ikisi de ekran soluna, kameraya 3/4) — François'nın kalkan kolu Louis'den uzağa açılır
    x: g.x, y: g.y, scale: g.s, facing: -1,
    thighF: -4, kneeF: 5, footF: 0, thighB: 6, kneeB: 2, footB: 0,
    shF: -158 * kol + 6 * (1 - kol), elF: -32 * kol - 8 * (1 - kol), shB: 8, elB: -12,
    tails: 2, lean: 1.5, breathe: Math.sin(p * 0.07),
    headTilt: interpolate(p, [144, 162], [0, -6], { ...cl, easing: ease }), lookX: 1, lookY: 0.1,
    browF: 0.8, browB: 0.6, agiz: p >= 146 && p < 176 ? "A" : p >= 198 ? "sirit" : "gulumse",
    blinkF: 0, blinkB: 0, cane: null, hat: null,
  };
  if (kol > 0.35) {
    // tutulan nesne eli takip eder: şapka kenarı el içinde (FK)
    const [hx, hy] = elYerel(pz, true, [2, 6]);
    pz.hat = { x: hx + 8, y: hy + 14, r: -14 };
  }
  return pz;
};

const louisPoz = (p: number): Poz => {
  const g = yerlestir(1.95, 0.66);
  const pz: Poz = {
    x: g.x, y: g.y, scale: g.s, facing: -1,
    thighF: -3, kneeF: 3, footF: 0, thighB: 4, kneeB: 2, footB: 0,
    // önkol öne bükük, el kalça hizasında: baston dikeye yakın, ucu ayağın hemen önünde taşa basar
    shF: -6, elF: -48, shB: 6, elB: -14,
    tails: 1, lean: 0, breathe: Math.sin(p * 0.06 + 1),
    headTilt: 3, lookX: 0.9, lookY: 0, browF: -0.5, browB: -0.5, agiz: "dinlen",
    blinkF: 0, blinkB: 0, hat: null, cane: 0,
  };
  // fizik: baston ucu taşa basar (gömülmez) — açı FK ile çözülür
  pz.cane = bastonAcisi(pz, 62);
  return pz;
};

// Louis'nin sağ göğüs cebinden beyaz eldiven köşesi (süreklilik → P19)
const CepEldiven: React.FC<{ pz: Poz }> = ({ pz }) => (
  <g transform={`translate(${pz.x},${pz.y}) scale(${(pz.scale ?? 1) * (pz.facing ?? 1)},${pz.scale ?? 1}) translate(0,${pz.bodyY ?? 0}) rotate(${pz.lean ?? 0},0,-226)`}>
    <path d="M 26 -322 L 50 -330 L 52 -318 L 30 -312 Z" fill="#f4efe2" stroke="#8a7f68" strokeWidth={1.4} transform="rotate(-12 40 -322)" />
  </g>
);

const Izgara: React.FC = () => {
  const [gx, gy] = zemin(IZGARA.z, IZGARA.u);
  const k = sokakGenislik(IZGARA.z) / 1240;
  return (
    <g transform={`translate(${gx},${gy}) scale(${k})`}>
      <ellipse cx={0} cy={0} rx={70} ry={16} fill="#2e3448" />
      <ellipse cx={0} cy={0} rx={64} ry={14} fill="#07080e" />
      {Array.from({ length: 7 }).map((_, i) => <line key={i} x1={-48 + i * 16} y1={-10} x2={-52 + i * 17} y2={12} stroke="#3a3c46" strokeWidth={5} />)}
      <ellipse cx={0} cy={0} rx={66} ry={15} fill="none" stroke="#9fb3ea" strokeWidth={2} opacity={0.35} />
    </g>
  );
};

export const Sb2Sokak: React.FC = () => {
  const p = useCurrentFrame();
  const frame30 = p * 0.5; // ortam animasyonları 30 fps eşdeğeri
  // kamera
  const ins = p >= 144;
  const cs = ins ? interpolate(p, [144, 216], [1.06, 1.18], { ...cl, easing: ease }) : interpolate(p, [0, 78], [1.0, 1.04], cl);
  const cx = ins ? interpolate(p, [144, 216], [0, 60], { ...cl, easing: ease }) : 0;
  const cy = ins ? interpolate(p, [144, 216], [-20, -120], { ...cl, easing: ease }) : 0;
  const kat = (k: number) => `translate(${540 + cx * k},${960 + cy * k}) scale(${1 + (cs - 1) * k}) translate(-540,-960)`;
  const fl = Math.sin(frame30 * 0.7) * 0.5 + Math.sin(frame30 * 1.9) * 0.3;
  const sis = (k: number, y: number, o: number, n = 2) => (
    <g transform={kat(k)}>{Array.from({ length: n }).map((_, i) => <ellipse key={i} cx={((frame30 * (0.9 + i * 0.6) + i * 600) % 1700) - 300} cy={y + i * 50} rx={700} ry={110} fill="#6e7aa6" opacity={o} style={{ filter: "blur(30px)" }} />)}</g>
  );
  const fp = francoisPoz(p), lpz = louisPoz(p);
  // réverbère sokak ortasında z 2.3: gölgeler lambanın zemin izdüşümünden uzağa (kameraya doğru) düşer
  const lambaZemin = zemin(REVERBERE_Z, 0.5);
  const fz = yerlestir(1.9, 0.46), lz = yerlestir(1.95, 0.66);
  const ucYerel = bastonUcu(lpz, lpz.cane ?? 0);
  const uc = dunyaya(lpz, ucYerel);
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0e1a" }}>
      <ArsivKatmani mod="gece">
        <AbsoluteFill>
          <svg width={1080} height={1920} viewBox="0 0 1080 1920">
            <Tanimlar />
            <g transform={kat(0.25)}><Sokak katman="gok" sehir="bordeaux" /></g>
            <g transform={kat(0.55)}><KonturTitreme derinlik="uzak" seed={DOKU_SEED.sokakBdx}><Sokak katman="uzak" sehir="bordeaux" /></KonturTitreme></g>
            {sis(0.55, 900, 0.3)}
            {sis(0.6, 1080, 0.22)}
            <g transform={kat(1)}>
              <KonturTitreme derinlik="orta" seed={DOKU_SEED.sokakBdx}><Sokak katman="orta" t={0} sehir="bordeaux" izgaraFaresiz /></KonturTitreme>
              <Izgara />
              {/* temas gölgeleri (ışığın tersine) */}
              <TemasGolgesi x={lz.zx} y={lz.zy} genislik={110 * lz.s} boy={620 * lz.s} isik={lambaZemin} alfa={0.55} />
              <TemasGolgesi x={uc[0]} y={uc[1]} genislik={18 * lz.s} alfa={0.6} />
              <Kukla louis p={LOUIS} pz={lpz} golgesiz />
              <CepEldiven pz={lpz} />
              <TemasGolgesi x={fz.zx} y={fz.zy} genislik={110 * fz.s} boy={620 * fz.s} isik={lambaZemin} alfa={0.55} />
              <Kukla p={FRANCOIS} pz={fp} golgesiz />
              <circle cx={FENER[0] + 30} cy={FENER[1] + 200} r={720 + fl * 20} fill="url(#sb2fener)" style={{ mixBlendMode: "screen" }} />
            </g>
            {sis(1.25, 1800, 0.1)}
            <defs><radialGradient id="sb2fener"><stop offset="0" stopColor="#ffb456" stopOpacity="0.3" /><stop offset="1" stopColor="#ffb456" stopOpacity="0" /></radialGradient></defs>
          </svg>
        </AbsoluteFill>
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(20,30,70,0.16), rgba(10,10,30,0.04) 50%, rgba(20,17,13,0.3))", mixBlendMode: "multiply" }} />
      </ArsivKatmani>
      {/* replik 568–760 (p 4–196): FRANÇOIS · "Herkesten önce bilen… kazanır." */}
      {p >= 4 && p < 196 && <Altyazi kim="FRANÇOIS" metin="Herkesten önce bilen… kazanır." vurgu={["kazanır"]} okunan={p >= 146 && p < 176 ? 4 : -1} />}
    </AbsoluteFill>
  );
};
