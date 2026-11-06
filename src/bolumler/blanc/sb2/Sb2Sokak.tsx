import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Kukla, Poz, yuru } from "../../../rig/Kukla";
import { FRANCOIS_TABA, LOUIS_ELSIZ } from "../palet";
import { CepEldiven } from "../props/EldivenKose";
import { FareInsertSb2 } from "./Sb2SokakFare";
import { AYAK_TABAN, bastonAcisi, bastonUcu, dunyaya, elYerel } from "../../../rig/kinematik";
import { Sokak, FENER, Tanimlar, zemin, sokakGenislik, reverbere, SokakOnPlan } from "../proto/Sokak";
import { ArsivKatmani } from "../../../doku/ArsivKatmani";
import { RenkKaydi } from "../../../doku/Tarama";
import { KonturTitreme } from "../../../doku/KonturTitreme";
import { Golge, Isik } from "../../../doku/Isik";
import { GuvenliAlan, KilitNokta } from "../../../doku/GuvenliAlan";
import { DOKU_SEED, P } from "../../../doku/sabitler";
import { Altyazi } from "../../../components/EkranYazisi";

// ===== SB2-SOKAK · P04 · SOKAK-BORDEAUX (gece) — plan karesi p = mutlak − 564 =====
// A3 (sahne-plani v2.5, mekanlar.md 10.3): Gambetta düzeni ayrı evler (proto/Sokak.tsx bordeaux → doku/Cephe.tsx).
// p0–78 boy (yürüyüş, cs 1.00→1.10) · p78–144 INSERT (FareInsert, bu dosyada değil) · p144–180 bel→göğüs→yakın push-in
// (cs 1.70→3.20 easeInOutCubic, tablo) · p180–216 yavaş sürüklenme (cs →3.30). Göz kırpma p186–200 yakın (yüz ≥ 230 px).
// Baston Louis'nin DIŞ (ekran sağı = arka) elinde; ucu dış ayağın önünde taşa (FK). Replik ÜST bantta. Tek ışık: réverbère.
export const SB2_SOKAK_SURE = 216;
export const P04_KONTROL = [0, 144, 150, 189, 215]; // + insert SB2-SOKAK-FARE 78, 87, 108, 138, 143
export const REV_ASILI = 15; // réverbère ip ortasından sarkma (px): push-in sonunda fener gövdesi y ≤ 200 (SC2)
export const P04_KONUM = { francois: { z0: 3.2, z: 2.4, u: 0.46 }, louis: { z0: 3.3, z: 2.45, u: 0.70 }, izgara: { z: 2.6, u: 0.32 } } as const;

const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const OLCEK_K = 1.32 / sokakGenislik(1.3);
const olcek = (z: number) => OLCEK_K * sokakGenislik(z);
const IZGARA = P04_KONUM.izgara;
const yerlestir = (z: number, u: number) => { const [x, y] = zemin(z, u); const s = olcek(z); return { x, y: y + AYAK_TABAN * s, s, zx: x, zy: y }; };

// kamera (sahne planı P04 tablosu)
const kamera = (p: number) => {
  if (p < 78) return { cs: interpolate(p, [0, 78], [1.0, 1.1], cl), cx: 0, cy: interpolate(p, [0, 78], [0, -20], cl) };
  if (p < 144) return { cs: 1.1, cx: 0, cy: -20 }; // (insert sırasında bu kadraj görünmez)
  // v2.6 (SC3/SC9) + A4b ölçüm düzeltmesi: cx = 81.6 − 88e (plan −8e Louis'nin yüzünü x ≈ 1065'te bırakıyordu), cy = −247 − 225e — Louis yüzü x ≤ 1000, botlar kadraj dışı
  if (p <= 180) { const t = (p - 144) / 36; const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; return { cs: 1.7 + 1.5 * e, cx: 81.6 - 88 * e, cy: -247 - 225 * e }; }
  return { cs: interpolate(p, [180, 198, 216], [3.2, 3.26, 3.3], cl), cx: interpolate(p, [180, 198, 216], [-6.4, -4, -2], cl), cy: interpolate(p, [180, 198, 216], [-472, -477, -482], cl) };
};

const yurume = (p: number, z0: number, z1: number, u: number, faz: number) => {
  const t = interpolate(p, [0, 74], [0, 1], { ...cl, easing: Easing.bezier(0.25, 0.05, 0.45, 1) });
  const z = z0 + (z1 - z0) * t;
  const amt = interpolate(p, [0, 4, 66, 76], [1, 1, 1, 0], cl);
  return { g: yerlestir(z, u), w: yuru((z0 - z) * 9.9 + faz, amt), amt };
};

const francoisPoz = (p: number): Poz => {
  const F = P04_KONUM.francois;
  const { g, w, amt } = yurume(p, F.z0, F.z, F.u, Math.PI / 2); // SC11: p0 topuk teması pozu (sallanan bacak tekme gibi durmaz)
  const kol = interpolate(p, [144, 158, 162], [0, 1.04, 1], { ...cl, easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const bak = interpolate(p, [176, 186], [0, 1], { ...cl, easing: Easing.bezier(0.16, 1, 0.3, 1) }); // 180–186 kameraya bakar
  const kirp = interpolate(p, [186, 190, 196, 200], [0, 1, 1, 0], cl); // göz kırpma (tek göz: ön göz)
  const pz: Poz = {
    x: g.x, y: g.y, scale: g.s, facing: -1, ...w,
    shF: p < 78 ? w.shF : -168 * kol + 6 * (1 - kol), elF: p < 78 ? w.elF : -14 * kol - 8 * (1 - kol), // SC6: kol yüzün dışından yükselir
    lean: (w.lean ?? 0) * amt + 1.5, breathe: Math.sin(p * 0.07),
    headTilt: interpolate(p, [144, 162], [0, -6], cl) + bak * 4 - kirp * 3, lookX: 1 - bak * 1.6, lookY: 0.1,
    browF: 0.8 - kirp * 1.2, browB: 0.6 + kirp * 0.6,
    agiz: p >= 4 && p < 74 ? (Math.floor(p / 6) % 2 ? "E" : "M") : p >= 146 && p < 176 ? (Math.floor(p / 7) % 2 ? "A" : "S") : p >= 200 ? "sirit" : "gulumse",
    blinkF: kirp, blinkB: kirp * 0.25, cane: null, hat: null, yakin: p >= 144,
  };
  if (kol > 0.35) { const [hx, hy] = elYerel(pz, true, [2, 6]); pz.hat = { x: hx + 8, y: hy + 14, r: -14 }; }
  return pz;
};

const louisPoz = (p: number): Poz => {
  const L = P04_KONUM.louis;
  const { g, w } = yurume(p, L.z0, L.z, L.u, 1.3);
  const pz: Poz = {
    x: g.x, y: g.y, scale: g.s, facing: -1, ...w,
    // baston DIŞ (arka) elde: arka kol hafif öne, önkol bükük; ön kol (kardeş tarafı) boş, gevşek
    shF: p < 78 ? w.shF : 6, elF: p < 78 ? w.elF : -12, shB: -14, elB: -40,
    breathe: Math.sin(p * 0.06 + 1), headTilt: 3, lookX: 0.9, lookY: 0, browF: -0.5, browB: -0.5, agiz: "dinlen",
    blinkF: 0, blinkB: 0, hat: null, cane: null, caneArka: 0,
  };
  pz.caneArka = bastonAcisi(pz, -48, false); // ucu dış ayağın önünde taşa
  return pz;
};


const Izgara: React.FC = () => {
  const [gx, gy] = zemin(IZGARA.z, IZGARA.u);
  const k = (sokakGenislik(IZGARA.z) / 1240) * 1.25;
  return (
    <g transform={`translate(${gx},${gy}) scale(${k})`}>
      <ellipse cx={0} cy={0} rx={72} ry={17} fill="#3a4258" />
      <ellipse cx={0} cy={0} rx={64} ry={14} fill="#07080e" />
      {Array.from({ length: 7 }).map((_, i) => <line key={i} x1={-48 + i * 16} y1={-10} x2={-52 + i * 17} y2={12} stroke="#4a4e5a" strokeWidth={5} />)}
      <ellipse cx={0} cy={0} rx={68} ry={15.5} fill="none" stroke="#c4d6ff" strokeWidth={3} opacity={0.65} />
    </g>
  );
};

export const Sb2Sokak: React.FC<{ guvenli?: boolean }> = ({ guvenli }) => {
  const p = useCurrentFrame();
  if (p >= 78 && p < 144) return <FareInsertSb2 p={p} guvenli={guvenli} />; // INSERT (kesme p78 → p144)
  return <Sb2SokakPlan p={p} guvenli={guvenli} />;
};

const Sb2SokakPlan: React.FC<{ p: number; guvenli?: boolean }> = ({ p, guvenli }) => {
  const frame30 = p * 0.5;
  const { cs, cx, cy } = kamera(p);
  const kat = (k: number) => `translate(${540 + cx * k},${960 + cy * k}) scale(${1 + (cs - 1) * k}) translate(-540,-960)`;
  const ekran = (q: P): P => [540 + cx + (q[0] - 540) * cs, 960 + cy + (q[1] - 960) * cs];
  const sis = (k: number, y: number, o: number, n = 2) => (
    <g transform={kat(k)}>{Array.from({ length: n }).map((_, i) => <ellipse key={i} cx={((frame30 * (0.9 + i * 0.6) + i * 600) % 1700) - 300} cy={y + i * 50} rx={700} ry={110} fill="#6e7aa6" opacity={o} style={{ filter: "blur(30px)" }} />)}</g>
  );
  const fp = francoisPoz(p), lpz = louisPoz(p);
  const fz = { zx: fp.x, zy: fp.y - AYAK_TABAN * (fp.scale ?? 1), s: fp.scale ?? 1 }, lz = { zx: lpz.x, zy: lpz.y - AYAK_TABAN * (lpz.scale ?? 1), s: lpz.scale ?? 1 };
  const { lamp } = reverbere(frame30, REV_ASILI);
  const lambaZemin = zemin(2.3, 0.5);
  const REV: Isik = { tip: "nokta", ad: "réverbère", zemin: [lamp[0], lambaZemin[1]], yukseklik: lambaZemin[1] - lamp[1], renk: "#ffb357" };
  const uc = dunyaya(lpz, bastonUcu(lpz, lpz.caneArka ?? 0, false));
  const yuz = ekran(dunyaya(fp, [20, -450]));
  const kilit: KilitNokta[] = p < 144
    ? [{ ad: "François ayak", p: ekran([fz.zx, fz.zy]), tur: "ayak" }, { ad: "Louis ayak", p: ekran([lz.zx, lz.zy]), tur: "ayak" }, { ad: "baston ucu", p: ekran(uc), tur: "temas" }, { ad: "ızgara", p: ekran(zemin(IZGARA.z, IZGARA.u)), tur: "kurulum" }, { ad: "François yüz", p: yuz, tur: "yuz" }]
    : p < 170 ? [{ ad: "François yüz", p: yuz, tur: "yuz" }, { ad: "baston ucu", p: ekran(uc), tur: "temas" }, { ad: "şapka eli", p: ekran(dunyaya(fp, elYerel(fp, true))), tur: "dokunus" }]
    : [{ ad: "François yüz (yakın)", p: yuz, tur: "yuz" }, { ad: "Louis yüz", p: ekran(dunyaya(lpz, [20, -450])), tur: "yuz" }];
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0e1a" }}>
      <ArsivKatmani mod="gece">
        <AbsoluteFill>
          <svg width={1080} height={1920} viewBox="0 0 1080 1920">
            <Tanimlar />
            <RenkKaydi>
            <g transform={kat(0.25)}><Sokak katman="gok" sehir="bordeaux" /></g>
            <g transform={kat(0.55)}><KonturTitreme derinlik="uzak" seed={DOKU_SEED.sokakBdx}><Sokak katman="uzak" sehir="bordeaux" /></KonturTitreme></g>
            {sis(0.55, 960, 0.26)}
            {sis(0.6, 1090, 0.2)}
            <g transform={kat(1)}>
              <KonturTitreme derinlik="orta" seed={DOKU_SEED.sokakBdx}><Sokak katman="orta" t={0} sehir="bordeaux" izgaraFaresiz revAsili={REV_ASILI} /></KonturTitreme>
              <Izgara />
              <Golge isik={REV} ayak={[lz.zx, lz.zy]} h={635 * lz.s * 0.9} genislik={100 * lz.s} alfa={0.5} stil="gravur" seed={DOKU_SEED.sokakBdx + 300} />
              <Golge isik={REV} ayak={[fz.zx, fz.zy]} h={620 * fz.s * 0.9} genislik={100 * fz.s} alfa={0.5} stil="gravur" seed={DOKU_SEED.sokakBdx + 301} />
              <Golge isik={REV} ayak={uc} h={8} genislik={14 * lz.s} alfa={0.6} />
              <Kukla louis p={LOUIS_ELSIZ} pz={lpz} golgesiz />
              <CepEldiven pz={lpz} kamera={cs} />
              <Kukla p={FRANCOIS_TABA} pz={fp} golgesiz />
              {/* réverbère François'nın yüzünü önden amberle aydınlatır (tek kaynak; lamba karakterlerden önde, z 2.3) */}
              <circle cx={lamp[0]} cy={lamp[1] + 200} r={420} fill="url(#sb2rev)" style={{ mixBlendMode: "screen" }} />
              <circle cx={FENER[0] + 30} cy={FENER[1] + 200} r={600} fill="url(#sb2fener)" style={{ mixBlendMode: "screen" }} opacity={0.3} />
              <SokakOnPlan />
            </g>
            {sis(1.3, 1800, 0.1)}
            </RenkKaydi>
            <defs>
              <radialGradient id="sb2fener"><stop offset="0" stopColor="#ffb456" stopOpacity="0.2" /><stop offset="1" stopColor="#ffb456" stopOpacity="0" /></radialGradient>
              <radialGradient id="sb2rev"><stop offset="0" stopColor="#ffb357" stopOpacity="0.24" /><stop offset="1" stopColor="#ffb357" stopOpacity="0" /></radialGradient>
            </defs>
          </svg>
        </AbsoluteFill>
      </ArsivKatmani>
      {p >= 4 && p < 196 && <Altyazi bant="ust" kimKontrast kim="FRANÇOIS" metin="Herkesten önce bilen… kazanır." vurgu={["kazanır"]} okunan={p >= 146 && p < 176 ? 4 : -1} />}
      {guvenli && <GuvenliAlan noktalar={kilit} aktifBant={p >= 4 && p < 196 ? "ust" : null} baslik={`SB2-SOKAK p${p}`} />}
    </AbsoluteFill>
  );
};
