import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Kukla, FRANCOIS, LOUIS, Palet, Poz } from "../../../rig/Kukla";
import { AYAK_TABAN, dunyaya, elDunya, kolIK } from "../../../rig/kinematik";
import { Golge, Isik } from "../../../doku/Isik";
import { Siluet } from "../../../doku/Siluet";
import { GuvenliAlan, KilitNokta } from "../../../doku/GuvenliAlan";
import { BL, P, ink, poly } from "../../../doku/sabitler";
import { KATIP, TUCCAR } from "../palet";

// ===== HİBRİT KOMPOZİT TESTİ · P02 BORSA (karar deneyi, üretim değil) =====
// Gemini gravür plakası (hibrit-test/ d2 tam, d3 arka, d4 ön + maske) + Remotion kukla rig'i aynı karede.
// deneme 1: d2 tam plaka + çıplak rig
// deneme 2: d2 tam plaka + "gravür uyumu" (kontur/ton plakanın mürekkep–kâğıt aralığına, desatürasyon, karanlık tonlarda
//           net kenarlı paralel tarama, dış kontur mürekkebi) + ortak kâğıt lifi/gren üst katmanı
// deneme 3: d3 arka + rig (deneme 2 işlemli) + d4 ön çerçeve kuklaların ÖNÜNDE (paralaks k 1.3) + ortak doku; p0–120 push-in testi
//
// Plaka ölçümü (1080×1920; 1536×2752 → genişlik 1080, yükseklik 1935, dikeyde 7.5 px kırpma):
//   ufuk (zemin derzlerinin kaçışı) y ≈ 1000 ±30, kaçış x ≈ 542. hibrit-test.md'deki 1135 arka cephe TABANIDIR (y ≈ 1148), ufuk değil.
//   arka parmaklık 173 px / göz yüksekliği 148 px → göz ≈ 1.7 m varsayımı ile parmaklık ≈ 2.0 m, arcade açıklığı ≈ 4.0 m (tutarlı).
//   ön çerçeve (d4 maskesi) zemin kenarı y ≈ 1650; avlu zemini 1148–1650 güneşte; sağ kanat gölgesi kenarı (650,1150)→(900,1395).
//   plaka mürekkebi ≈ #20160d (en koyu %1 ≈ #0b0200), kâğıt/ışık ≈ #fde5c6.
// Ufuk–ölçek: GOZ = 1.7 m kamera; ayak y'si yf olan figürün boyu (şapkalı 1.85 m) = (yf − UFUK)·1.85/1.7 px.
export const SB2_BORSA_HIBRIT_SURE = 121;
const UFUK = 1000, GOZ = 1.7, VPX = 542;
const pxm = (yf: number) => (yf - UFUK) / GOZ;
const olc = (yf: number) => (pxm(yf) * 1.85) / 620;
const yer = (x: number, yf: number) => { const s = olc(yf); return { x, y: yf + AYAK_TABAN * s, s, zx: x, zy: yf }; };
const PL = { ink: "#20160d", kagit: "#fbe8c8", golge: "#4a3418" };
// Tek ışık: öğle güneşi sağ-arkadan (plaka: sağ kanat gölgesi, ön portik gölgesi kameraya doğru) → gölgeler kısa, sol-öne
const GUNES: Isik = { tip: "yonlu", ad: "öğle güneşi (sağ-arka, plaka ile aynı)", yon: [-0.24, 0.09], renk: "#fff1c8" };
const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const dur = (x: number, y: number, s: number, f: 1 | -1, ek: Partial<Poz> = {}): Poz => ({ x, y, scale: s, facing: f, thighF: -3, kneeF: 3, thighB: 4, kneeB: 2, shF: 4, elF: -10, shB: 6, elB: -12, tails: 1, breathe: 0, blinkF: 0, blinkB: 0, hat: null, cane: null, ...ek });
const TUCCAR_V: Palet = { ...TUCCAR, hair: "#9a958a", sideburn: 1.8, biyik: "yok", sakal: true, sapka: "genis", burun: 1.2, hat: "#4a3a26", hatBand: "#2a2016", coat: "#7a5a2e", coatDark: "#54401f", coatLight: "#9a7844", vest: "#a58a4a", vestDark: "#7a6430" };
const KOMPARS: Palet[] = [{ ...KATIP, biyik: "yok" }, { ...TUCCAR, sapka: "genis", biyik: "duz" }, { ...KATIP, sapka: "genis", sakal: true, biyik: "yok" }, { ...TUCCAR, burun: 1.15 }];
// kompars: [x, ayak y, güneşte mi] — tahta (x 470–612, y 960–1065) önü boş; sağdakiler sağ kanadın gölgesinde (atılan gölge yok)
const KALABALIK: [number, number, boolean][] = [[305, 1196, true], [176, 1232, true], [700, 1172, false], [884, 1262, false]];

type Deneme = 1 | 2 | 3;

// Gravür uyumu filtreleri (deneme 2, 3): ton eşlemesi + dış kontur; karanlık ton maskeleri (tarama için)
const lin = (a: string, b: string, i: number) => { const A = parseInt(a.slice(1 + 2 * i, 3 + 2 * i), 16) / 255, B = parseInt(b.slice(1 + 2 * i, 3 + 2 * i), 16) / 255; return { slope: (B - A).toFixed(4), intercept: A.toFixed(4) }; };
const esik = (n: number, kac: number) => Array.from({ length: n }).map((_, i) => (i < kac ? 1 : 0)).join(" ");
const Filtreler: React.FC = () => (
  <defs>
    <filter id="hbUyum" filterUnits="userSpaceOnUse" x={0} y={0} width={1080} height={1920} colorInterpolationFilters="sRGB">
      <feColorMatrix in="SourceGraphic" type="saturate" values="0.76" result="d" />
      {/* siyah → plaka mürekkebi, beyaz → plaka kâğıdı (rig'in saf siyah/mavi kenar ışığı plakanın aralığına iner) */}
      <feComponentTransfer in="d" result="t">
        <feFuncR type="linear" {...lin(PL.ink, PL.kagit, 0)} />
        <feFuncG type="linear" {...lin(PL.ink, PL.kagit, 1)} />
        <feFuncB type="linear" {...lin(PL.ink, PL.kagit, 2)} />
      </feComponentTransfer>
      {/* dış siluet konturu: plakanın ince mürekkep çizgisi gibi (≈1.5 px) */}
      <feMorphology in="SourceAlpha" operator="dilate" radius={1.3} result="g" />
      <feFlood floodColor={PL.ink} />
      <feComposite in2="g" operator="in" result="k" />
      <feMerge><feMergeNode in="k" /><feMergeNode in="t" /></feMerge>
    </filter>
    {/* luminans eşiği → beyaz maske: C (L < .45, orta ton, seyrek) · A (L < .25) · B (L < .15) */}
    {([["hbEsikC", 9], ["hbEsikA", 5], ["hbEsikB", 3]] as const).map(([id, kac]) => (
      <filter key={id} id={id} filterUnits="userSpaceOnUse" x={0} y={0} width={1080} height={1920} colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0 0 0 1 0" />
        <feComponentTransfer><feFuncR type="discrete" tableValues={esik(20, kac)} /><feFuncG type="discrete" tableValues={esik(20, kac)} /><feFuncB type="discrete" tableValues={esik(20, kac)} /></feComponentTransfer>
      </filter>
    ))}
    {/* plakanın tarama yönü: "\" (sol-üstten sağ-alta), tek yön, kafes YOK; B katmanı yarım aralık kaydırılmış = koyu ton */}
    <pattern id="hbTarC" patternUnits="userSpaceOnUse" width={6.4} height={40} patternTransform="rotate(-42) translate(1.1,0)"><rect x={0} y={0} width={1} height={40} fill={PL.ink} opacity={0.32} /></pattern>
    <pattern id="hbTarA" patternUnits="userSpaceOnUse" width={4.6} height={40} patternTransform="rotate(-42)"><rect x={0} y={0} width={1.25} height={40} fill={PL.ink} opacity={0.62} /></pattern>
    <pattern id="hbTarB" patternUnits="userSpaceOnUse" width={4.6} height={40} patternTransform="rotate(-42) translate(2.3,0)"><rect x={0} y={0} width={1.1} height={40} fill={PL.ink} opacity={0.55} /></pattern>
  </defs>
);

export const Sb2BorsaHibrit: React.FC<{ deneme?: Deneme; guvenli?: boolean }> = ({ deneme = 3, guvenli }) => {
  const p = useCurrentFrame();
  const uyum = deneme >= 2;
  // kamera (yalnız deneme 3): p0–120 yavaş push-in cs 1.00→1.10 (P02 dolly ölçeği); paralaks: arka 1.0, karakter 1.0, ön çerçeve 1.3
  const cs = deneme === 3 ? interpolate(p, [0, 120], [1.0, 1.1], { ...cl, easing: Easing.inOut(Easing.cubic) }) : 1;
  const cy = deneme === 3 ? interpolate(p, [0, 120], [0, -20], { ...cl, easing: Easing.inOut(Easing.cubic) }) : 0;
  const kat = (k: number) => `translate(0px, ${cy * k}px) scale(${1 + (cs - 1) * k})`;
  const plaka: React.CSSProperties = { position: "absolute", left: 0, top: -7.5, width: 1080, height: 1935 };

  // ---- ana karakterler (Sb2Borsa P02 p0 pozlarının aynısı; konumlar plakanın ufkuna göre) ----
  const tY = yer(222, 1488), fY = yer(428, 1492), pY = yer(662, 1478), lYer = yer(800, 1472);
  const tuccar = dur(tY.x, tY.y, tY.s * 0.95, 1, { lookX: 0.6, agiz: "gulumse", shF: 10, elF: -20 });
  const tOmuz = dunyaya(tuccar, [50, -352]);
  const fr0 = dur(fY.x, fY.y, fY.s, -1, { lean: 2, lookX: 0.8, lookY: 0.1, headTilt: 4, agiz: "gulumse", browF: 0.5, browB: 0.4, shB: 10, elB: -24 });
  const fIK = kolIK(fr0, [tOmuz[0], tOmuz[1] + 4], true, [0, -8]);
  const francois: Poz = { ...fr0, shF: fIK.sh, elF: fIK.el };
  const PUP = 300;
  const defterUc: P = [pY.zx + 4 * pY.s, pY.zy - (PUP + 6) * pY.s];
  const lo0 = dur(lYer.x, lYer.y, lYer.s, -1, { lean: 7, headTilt: 16, lookX: 0.5, lookY: 1, browF: -0.5, browB: -0.5, agiz: "dinlen", blinkF: 0.45, blinkB: 0.45 });
  const lIK = kolIK(lo0, defterUc, true, [6, 10]);
  const lIKb = kolIK(lo0, [defterUc[0] + 40 * lYer.s, defterUc[1] + 4 * lYer.s], false);
  const louis: Poz = { ...lo0, shF: lIK.sh, elF: lIK.el, shB: lIKb.sh, elB: lIKb.el };
  const kalemEl = elDunya(louis, true, [6, 10]);

  const kompars = KALABALIK.map(([x, yf, gunes], i) => ({ g: yer(x, yf), gunes, i, f: (x < VPX ? 1 : -1) as 1 | -1 }));

  // rig grubu (iki kez çizilir: görünür + tarama maskesi). Gölgeler AYRI (zemine aittir, rig filtresine girmez).
  const rig = (
    <g>
      {kompars.map(({ g, gunes, i, f }) => {
        const pz = dur(g.x, g.y, g.s, f, { shF: 8, elF: -18 - i * 6 });
        const [k, a] = gunes ? ["#6e5c44", "#a08a68"] : ["#4e4032", "#625240"];
        return <Siluet key={i} renk={k} acik={a} kenar={gunes ? { renk: "#fff1c8", dx: 2 * g.s, dy: -1.5 * g.s } : undefined} kutu={[g.x - 120 * g.s, g.y - 640 * g.s, 240 * g.s, 650 * g.s]}><Kukla p={KOMPARS[i % 4]} pz={pz} golgesiz /></Siluet>;
      })}
      <g transform={`translate(${tY.x},${tY.y}) scale(1.12,1) translate(${-tY.x},${-tY.y})`}><Kukla p={TUCCAR_V} pz={tuccar} golgesiz /></g>
      <Kukla p={FRANCOIS} pz={francois} golgesiz />
      <Kukla louis p={LOUIS} pz={louis} golgesiz />
      <CepEldiven pz={louis} />
      <Pupitr x={pY.zx} y={pY.zy} s={pY.s} yuz={PUP} />
      <g transform={`translate(${kalemEl[0]},${kalemEl[1]}) rotate(-28)`}><path d="M 0 0 L 2 -70 Q 14 -60 10 -20 Z" transform={`scale(${lYer.s / 1.1})`} fill="#e8e0cc" stroke={ink("#e8e0cc")} strokeWidth={1.4} /></g>
    </g>
  );
  const golgeler = (
    <g>
      {kompars.map(({ g, gunes, i }) => gunes
        ? <Golge key={i} isik={GUNES} ayak={[g.zx, g.zy]} h={620 * g.s} genislik={100 * g.s} alfa={0.42} renk={PL.golge} stil="gravur" seed={301 + i} />
        : <ellipse key={i} cx={g.zx} cy={g.zy} rx={46 * g.s} ry={8 * g.s} fill={PL.golge} opacity={0.5} />)}
      <Golge isik={GUNES} ayak={[tY.zx, tY.zy]} h={600 * tY.s} genislik={110 * tY.s} alfa={0.48} renk={PL.golge} stil="gravur" seed={311} />
      <Golge isik={GUNES} ayak={[fY.zx, fY.zy]} h={620 * fY.s} genislik={100 * fY.s} alfa={0.48} renk={PL.golge} stil="gravur" seed={312} />
      <Golge isik={GUNES} ayak={[pY.zx, pY.zy]} h={PUP * pY.s} genislik={120 * pY.s} alfa={0.4} renk={PL.golge} stil="gravur" seed={313} />
      <Golge isik={GUNES} ayak={[lYer.zx, lYer.zy]} h={635 * lYer.s} genislik={100 * lYer.s} alfa={0.48} renk={PL.golge} stil="gravur" seed={314} />
    </g>
  );

  const kilit: KilitNokta[] = [
    { ad: "tüccar ayak", p: [tY.zx, tY.zy], tur: "ayak" }, { ad: "François ayak", p: [fY.zx, fY.zy], tur: "ayak" }, { ad: "Louis ayak", p: [lYer.zx, lYer.zy], tur: "ayak" },
    { ad: "Louis defter", p: defterUc, tur: "kurulum" }, { ad: "tahta", p: [541, 1012], tur: "kurulum" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#3a2c1c", overflow: "hidden" }}>
      {/* ARKA PLAKA */}
      <AbsoluteFill style={{ transform: kat(1), transformOrigin: "540px 960px" }}>
        <Img src={staticFile(deneme === 3 ? "blanc/hibrit/arka-d3.png" : "blanc/hibrit/plaka-d2.png")} style={plaka} />
      </AbsoluteFill>
      {/* RIG KATMANI (k = 1) */}
      <AbsoluteFill style={{ transform: kat(1), transformOrigin: "540px 960px" }}>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <Filtreler />
          {uyum && <defs>
            <mask id="hbMaskC" maskUnits="userSpaceOnUse" x={0} y={0} width={1080} height={1920}><g filter="url(#hbEsikC)">{rig}</g></mask>
            <mask id="hbMaskA" maskUnits="userSpaceOnUse" x={0} y={0} width={1080} height={1920}><g filter="url(#hbEsikA)">{rig}</g></mask>
            <mask id="hbMaskB" maskUnits="userSpaceOnUse" x={0} y={0} width={1080} height={1920}><g filter="url(#hbEsikB)">{rig}</g></mask>
          </defs>}
          {golgeler}
          {uyum ? <g filter="url(#hbUyum)">{rig}</g> : rig}
          {uyum && <rect x={0} y={0} width={1080} height={1920} fill="url(#hbTarC)" mask="url(#hbMaskC)" />}
          {uyum && <rect x={0} y={0} width={1080} height={1920} fill="url(#hbTarA)" mask="url(#hbMaskA)" />}
          {uyum && <rect x={0} y={0} width={1080} height={1920} fill="url(#hbTarB)" mask="url(#hbMaskB)" />}
        </svg>
      </AbsoluteFill>
      {/* ÖN ÇERÇEVE (deneme 3): d4 + maske alfası, kuklaların önünde, paralaks 1.3 */}
      {deneme === 3 && <AbsoluteFill style={{ transform: kat(1.3), transformOrigin: "540px 960px" }}>
        <Img src={staticFile("blanc/hibrit/on-d4.png")} style={plaka} />
      </AbsoluteFill>}
      {/* ORTAK DOKU (deneme 2, 3): plaka + rig aynı kâğıt lifi ve greni paylaşır (sabit, kaynamaz) */}
      {uyum && <>
        <Img src={staticFile("doku/kagit-lif.png")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", mixBlendMode: "multiply", opacity: 0.16 }} />
        <AbsoluteFill style={{ backgroundImage: `url(${staticFile("doku/gren-512.png")})`, backgroundRepeat: "repeat", mixBlendMode: "overlay", opacity: 0.07 }} />
      </>}
      {guvenli && <GuvenliAlan noktalar={kilit} aktifBant={null} baslik={`HİBRİT deneme ${deneme} p${p}`} />}
    </AbsoluteFill>
  );
};

// Louis'nin cebinde beyaz eldiven köşesi (Sb2Borsa ile aynı geometri; orada export edilmediği için kopya)
const CepEldiven: React.FC<{ pz: Poz }> = ({ pz }) => (
  <g transform={`translate(${pz.x},${pz.y}) scale(${(pz.scale ?? 1) * (pz.facing ?? 1)},${pz.scale ?? 1}) translate(0,${pz.bodyY ?? 0}) rotate(${pz.lean ?? 0},0,-226)`}>
    <path d="M 26 -322 L 50 -330 L 52 -318 L 30 -312 Z" fill={BL.gloveHero} stroke="#8a7f68" strokeWidth={1.4} transform="rotate(-12 40 -322)" />
  </g>
);
// ayaklı yazı pupitri (Sb2Borsa ile aynı geometri)
const Pupitr: React.FC<{ x: number; y: number; s: number; yuz: number }> = ({ x, y, s, yuz }) => {
  const k = (dx: number, dy: number): P => [x + dx * s, y - dy * s];
  return (
    <g>
      {[-48, 48].map((dx) => <rect key={dx} x={k(dx, 0)[0] - 4 * s} y={k(0, yuz - 20)[1]} width={8 * s} height={(yuz - 20) * s} fill="#3a2c20" />)}
      <polygon points={poly([k(-66, yuz - 22), k(66, yuz - 22), k(60, yuz + 14), k(-60, yuz + 14)])} fill="#5b3d25" stroke={ink("#5b3d25")} strokeWidth={1.6} />
      <polygon points={poly([k(-54, yuz - 16), k(0, yuz - 12), k(0, yuz + 12), k(-50, yuz + 9)])} fill="#efe6d0" stroke="#5a3a22" strokeWidth={1.4} />
      <polygon points={poly([k(0, yuz - 12), k(54, yuz - 16), k(50, yuz + 9), k(0, yuz + 12)])} fill="#e9dfc9" stroke="#5a3a22" strokeWidth={1.4} />
      {[-6, 0, 6].map((d) => <line key={d} x1={k(8, yuz + d)[0]} y1={k(8, yuz + d)[1]} x2={k(44, yuz + d - 2)[0]} y2={k(44, yuz + d - 2)[1]} stroke="#2b1d10" strokeWidth={1} opacity={0.6} />)}
    </g>
  );
};
