import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Kukla, FRANCOIS, LOUIS, Poz } from "../../../rig/Kukla";
import { AYAK_TABAN, bastonAcisi, bastonUcu, dunyaya, elYerel } from "../../../rig/kinematik";
import { Sokak, FENER, Tanimlar, zemin, sokakGenislik, reverbere } from "../proto/Sokak";
import { ArsivKatmani } from "../../../doku/ArsivKatmani";
import { KonturTitreme } from "../../../doku/KonturTitreme";
import { Golge, Isik } from "../../../doku/Isik";
import { GuvenliAlan, KilitNokta } from "../../../doku/GuvenliAlan";
import { DOKU_SEED, P } from "../../../doku/sabitler";
import { Altyazi } from "../../../components/EkranYazisi";

// ===== SB2-SOKAK · P04 · SOKAK-BORDEAUX (gece) — plan karesi p = mutlak − 564 (stil karesi p 160 = mutlak 724) =====
// A2 (eleştiri A): kardeşler z 2.4/2.45 (ayaklar alt 420'nin üstünde), ızgara z 2.6 u 0.32 (plan başından görünür,
// yazı bandı dışında), replik altyazısı ÜST bantta (gök bölgesi), ışık TEK kaynaktan (réverbère, nokta ışık):
// gölgelerin yönü/boyu `izdusum` ile türetilir. François p150'den bakışını kameraya çevirir.
export const SB2_SOKAK_SURE = 216;
export const P04_KONUM = { francois: { z: 2.4, u: 0.44 }, louis: { z: 2.45, u: 0.64 }, izgara: { z: 2.6, u: 0.32 } } as const;

const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.inOut(Easing.cubic);
const OLCEK_K = 1.32 / sokakGenislik(1.3);
const olcek = (z: number) => OLCEK_K * sokakGenislik(z);
const IZGARA = P04_KONUM.izgara;

// Karakteri (z,u) zemin noktasına bastır: ayak tabanı tam zeminde
const yerlestir = (z: number, u: number) => { const [x, y] = zemin(z, u); const s = olcek(z); return { x, y: y + AYAK_TABAN * s, s, zx: x, zy: y }; };

const francoisPoz = (p: number): Poz => {
  const g = yerlestir(P04_KONUM.francois.z, P04_KONUM.francois.u);
  // 144–162 şapkayı kamera tarafındaki (ön) kolla kaldırır, sonra elde yukarıda kalır
  const kol = interpolate(p, [144, 158, 162], [0, 1.04, 1], { ...cl, easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const bak = interpolate(p, [150, 162], [0, 1], { ...cl, easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const pz: Poz = {
    x: g.x, y: g.y, scale: g.s, facing: -1,
    thighF: -4, kneeF: 5, footF: 0, thighB: 6, kneeB: 2, footB: 0,
    shF: -158 * kol + 6 * (1 - kol), elF: -32 * kol - 8 * (1 - kol), shB: 8, elB: -12,
    tails: 2, lean: 1.5, breathe: Math.sin(p * 0.07),
    // p150+: baş kameraya döner (3/4 rig: baş eğimi + göz bebekleri izleyiciye)
    headTilt: interpolate(p, [144, 162], [0, -6], { ...cl, easing: ease }) + bak * 3, lookX: 1 - bak * 1.6, lookY: 0.1,
    browF: 0.8, browB: 0.6, agiz: p >= 146 && p < 176 ? "A" : p >= 198 ? "sirit" : "gulumse",
    blinkF: 0, blinkB: 0, cane: null, hat: null,
  };
  if (kol > 0.35) { const [hx, hy] = elYerel(pz, true, [2, 6]); pz.hat = { x: hx + 8, y: hy + 14, r: -14 }; }
  return pz;
};

const louisPoz = (p: number): Poz => {
  const g = yerlestir(P04_KONUM.louis.z, P04_KONUM.louis.u);
  const pz: Poz = {
    x: g.x, y: g.y, scale: g.s, facing: -1,
    thighF: -3, kneeF: 3, footF: 0, thighB: 4, kneeB: 2, footB: 0,
    shF: -6, elF: -48, shB: 6, elB: -14, tails: 1, lean: 0, breathe: Math.sin(p * 0.06 + 1),
    headTilt: 3, lookX: 0.9, lookY: 0, browF: -0.5, browB: -0.5, agiz: "dinlen", blinkF: 0, blinkB: 0, hat: null, cane: 0,
  };
  pz.cane = bastonAcisi(pz, 62); // baston ucu taşa basar (gömülmez)
  return pz;
};

const CepEldiven: React.FC<{ pz: Poz }> = ({ pz }) => (
  <g transform={`translate(${pz.x},${pz.y}) scale(${(pz.scale ?? 1) * (pz.facing ?? 1)},${pz.scale ?? 1}) translate(0,${pz.bodyY ?? 0}) rotate(${pz.lean ?? 0},0,-226)`}>
    <path d="M 26 -322 L 50 -330 L 52 -318 L 30 -312 Z" fill="#f4efe2" stroke="#8a7f68" strokeWidth={1.4} transform="rotate(-12 40 -322)" />
  </g>
);

const Izgara: React.FC = () => {
  const [gx, gy] = zemin(IZGARA.z, IZGARA.u);
  const k = sokakGenislik(IZGARA.z) / 1240 * 1.25;
  return (
    <g transform={`translate(${gx},${gy}) scale(${k})`}>
      <ellipse cx={0} cy={0} rx={72} ry={17} fill="#3a4258" />
      <ellipse cx={0} cy={0} rx={64} ry={14} fill="#07080e" />
      {Array.from({ length: 7 }).map((_, i) => <line key={i} x1={-48 + i * 16} y1={-10} x2={-52 + i * 17} y2={12} stroke="#4a4e5a" strokeWidth={5} />)}
      <ellipse cx={0} cy={0} rx={68} ry={15.5} fill="none" stroke="#c4d6ff" strokeWidth={2.4} opacity={0.5} />
    </g>
  );
};

export const Sb2Sokak: React.FC<{ guvenli?: boolean }> = ({ guvenli }) => {
  const p = useCurrentFrame();
  const frame30 = p * 0.5;
  const ins = p >= 144;
  const cs = ins ? interpolate(p, [144, 216], [1.06, 1.18], { ...cl, easing: ease }) : interpolate(p, [0, 78], [1.0, 1.04], cl);
  const cx = ins ? interpolate(p, [144, 216], [0, 60], { ...cl, easing: ease }) : 0;
  const cy = ins ? interpolate(p, [144, 216], [-20, -120], { ...cl, easing: ease }) : 0;
  const kat = (k: number) => `translate(${540 + cx * k},${960 + cy * k}) scale(${1 + (cs - 1) * k}) translate(-540,-960)`;
  const ekran = (q: P): P => [540 + cx + (q[0] - 540) * cs, 960 + cy + (q[1] - 960) * cs];
  const fl = Math.sin(frame30 * 0.7) * 0.5 + Math.sin(frame30 * 1.9) * 0.3;
  const sis = (k: number, y: number, o: number, n = 2) => (
    <g transform={kat(k)}>{Array.from({ length: n }).map((_, i) => <ellipse key={i} cx={((frame30 * (0.9 + i * 0.6) + i * 600) % 1700) - 300} cy={y + i * 50} rx={700} ry={110} fill="#6e7aa6" opacity={o} style={{ filter: "blur(30px)" }} />)}</g>
  );
  const fp = francoisPoz(p), lpz = louisPoz(p);
  const fz = yerlestir(P04_KONUM.francois.z, P04_KONUM.francois.u), lz = yerlestir(P04_KONUM.louis.z, P04_KONUM.louis.u);
  // TEK ışık: réverbère (nokta). Zemin izdüşümü = lambanın altındaki sokak noktası; yükseklik = lamba ile o nokta arası ekran px
  const { lamp } = reverbere(frame30);
  const lambaZ = 2.3, lambaZemin = zemin(lambaZ, 0.5);
  const REV: Isik = { tip: "nokta", ad: "réverbère", zemin: [lamp[0], lambaZemin[1]], yukseklik: lambaZemin[1] - lamp[1], renk: "#ffb357" };
  const uc = dunyaya(lpz, bastonUcu(lpz, lpz.cane ?? 0));
  const kilit: KilitNokta[] = [
    { ad: "François ayak", p: ekran([fz.zx, fz.zy]), tur: "ayak" },
    { ad: "Louis ayak", p: ekran([lz.zx, lz.zy]), tur: "ayak" },
    { ad: "baston ucu", p: ekran(uc), tur: "temas" },
    { ad: "ızgara", p: ekran(zemin(IZGARA.z, IZGARA.u)), tur: "kurulum" },
    { ad: "François yüz", p: ekran(dunyaya(fp, [20, -450])), tur: "yuz" },
    { ad: "Louis yüz", p: ekran(dunyaya(lpz, [20, -450])), tur: "yuz" },
  ];
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0e1a" }}>
      <ArsivKatmani mod="gece">
        <AbsoluteFill>
          <svg width={1080} height={1920} viewBox="0 0 1080 1920">
            <Tanimlar />
            <g transform={kat(0.25)}><Sokak katman="gok" sehir="bordeaux" /></g>
            <g transform={kat(0.55)}><KonturTitreme derinlik="uzak" seed={DOKU_SEED.sokakBdx}><Sokak katman="uzak" sehir="bordeaux" /></KonturTitreme></g>
            {sis(0.55, 960, 0.26)}
            {sis(0.6, 1090, 0.2)}
            <g transform={kat(1)}>
              <KonturTitreme derinlik="orta" seed={DOKU_SEED.sokakBdx}><Sokak katman="orta" t={0} sehir="bordeaux" izgaraFaresiz /></KonturTitreme>
              <Izgara />
              {/* gölgeler tek kaynaktan (réverbère): yön ve boy izdusum() ile */}
              <Golge isik={REV} ayak={[lz.zx, lz.zy]} h={635 * lz.s * 0.9} genislik={100 * lz.s} alfa={0.5} />
              <Golge isik={REV} ayak={[fz.zx, fz.zy]} h={620 * fz.s * 0.9} genislik={100 * fz.s} alfa={0.5} />
              <Golge isik={REV} ayak={uc} h={8} genislik={14 * lz.s} alfa={0.6} />
              <Kukla louis p={LOUIS} pz={lpz} golgesiz />
              <CepEldiven pz={lpz} />
              <Kukla p={FRANCOIS} pz={fp} golgesiz />
              <circle cx={FENER[0] + 30} cy={FENER[1] + 200} r={720 + fl * 20} fill="url(#sb2fener)" style={{ mixBlendMode: "screen" }} />
              <circle cx={lamp[0]} cy={lamp[1] + 260} r={420} fill="url(#sb2rev)" style={{ mixBlendMode: "screen" }} />
            </g>
            {sis(1.25, 1800, 0.1)}
            <defs>
              <radialGradient id="sb2fener"><stop offset="0" stopColor="#ffb456" stopOpacity="0.28" /><stop offset="1" stopColor="#ffb456" stopOpacity="0" /></radialGradient>
              <radialGradient id="sb2rev"><stop offset="0" stopColor="#ffb357" stopOpacity="0.22" /><stop offset="1" stopColor="#ffb357" stopOpacity="0" /></radialGradient>
            </defs>
          </svg>
        </AbsoluteFill>
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(20,30,70,0.12), rgba(10,10,30,0.02) 50%, rgba(20,17,13,0.22))", mixBlendMode: "multiply" }} />
      </ArsivKatmani>
      {/* replik 568–760 (p 4–196): ayakları/ızgarayı örtmemek için ÜST bantta (gök bölgesi) */}
      {p >= 4 && p < 196 && <Altyazi bant="ust" kim="FRANÇOIS" metin="Herkesten önce bilen… kazanır." vurgu={["kazanır"]} okunan={p >= 146 && p < 176 ? 4 : -1} />}
      {guvenli && <GuvenliAlan noktalar={kilit} aktifBant={p >= 4 && p < 196 ? "ust" : null} baslik={`SB2-SOKAK p${p}`} />}
    </AbsoluteFill>
  );
};
