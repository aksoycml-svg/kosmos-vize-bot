import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Kukla, FRANCOIS, LOUIS, Palet, Poz } from "../../../rig/Kukla";
import { AYAK_TABAN, dunyaya, elDunya, kolIK } from "../../../rig/kinematik";
import { ArsivKatmani } from "../../../doku/ArsivKatmani";
import { KonturTitreme } from "../../../doku/KonturTitreme";
import { TasDuvar } from "../../../doku/TasDuvar";
import { AhsapYuzey } from "../../../doku/AhsapYuzey";
import { Siluet } from "../../../doku/Siluet";
import { Golge, Isik } from "../../../doku/Isik";
import { Kemer, kemerCokgen } from "../../../doku/Kemer";
import { Tarama, taramaAcisi } from "../../../doku/Tarama";
import { GuvenliAlan, KilitNokta } from "../../../doku/GuvenliAlan";
import { BL, DOKU_SEED, Esleme, P, ink, lerp, poly, rnd, tonla } from "../../../doku/sabitler";
import { FormulYazisi, IsimEtiketi } from "../../../components/EkranYazisi";
import { serif } from "../../../theme";
import { KATIP, TUCCAR } from "../palet";

// ===== SB2-BORSA · P02 · Palais de la Bourse — AÇIK PORTİKLİ AVLU (mekanlar.md 10.1, R3 orkestra kararı) — p = mutlak − 156 =====
// Arka avlu cephesi: YARIM DAİRE arcade'lar (oran 1:2), sade kilit taşı + imposte; alınlıkta ticaret amblemi + okunmaz şehir çizgileri;
// arcade'larda demir parmaklıklı kapı; portik içi derin gölge (tarama IV). Fiyat tahtası ORTA arcade'ın altında, galeri duvarına dayalı
// [S dramatizasyon]; katip estradda. Öğle güneşi TEPEDEN (sağ-üst arkadan hafif): gölgeler kısa, sol-öne. Kamera ÖN PORTİĞİN İÇİNDEN:
// iki kenarda gölgeli arcade ayağı, altta gölgeli portik zemini, sağ altta tezgâh (defter + hokka), sol altta yarı açık demir kapı kanadı.
// Bayrak YOK. Palet (6 + ışık): taş ışık #e2cfa0 · taş gölge #9a845e · portik derin gölge #4a3e2c · avlu taşı #d4c29a · tahta #1f2a26 · ahşap/demir #3a2c20 + güneş #fff1c8.
export const SB2_BORSA_SURE = 204;
export const P02_TEMAS = { tebesirCizirti: [30, 88], tebesirKirilir: 90, sekme1: 102, sekme2: 114, yarimTebesir: 192 } as const;
export const P02_KONTROL = [0, 90, 102, 168, 203];
const PAL = { tas: "#e2cfa0", tasG: "#9a845e", portik: "#4a3e2c", zemin: "#d4c29a", tahta: BL.tahta, ahsap: "#3a2c20", gunes: "#fff1c8" };

const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const S = DOKU_SEED.borsa;
// ---- avlu perspektifi (göz hizası 1.6 m; ufuk y 800): y = 800 + 900/z, 1 m = 563/z px; rig 620 birim ≈ 1.85 m (şapkalı) ----
const UFUK = 800;
const pxm = (z: number) => 563 / z;
const zem = (z: number, xm: number): P => [540 + xm * pxm(z), UFUK + 900 / z];
const olc = (z: number) => 1.679 / z;
const nok = (z: number, xm: number, hm: number): P => { const [x, y] = zem(z, xm); return [x, y - hm * pxm(z)]; };
const ON_Z = 5.6, ARKA_Z = 6.6; // arcade ön düzlemi / portik arka (galeri) duvarı
const AKS = 4.5, AW = 3.0, AH = 6.0; // aks genişliği, arcade açıklığı 3.0 × 6.0 (1:2)
const GUNES: Isik = { tip: "yonlu", ad: "öğle güneşi (tepeden, sağ-arka)", yon: [-0.16, 0.05], renk: PAL.gunes };
const TH = taramaAcisi(GUNES);
const TAHTA = { xm: -1.5, w: 3.0, h0: 1.75, h1: 3.75 }; // galeri duvarında (m)

const yer = (z: number, xm: number, ekH = 0) => { const [x, y] = zem(z, xm); const s = olc(z); return { x, y: y + AYAK_TABAN * s - ekH * pxm(z), s, zx: x, zy: y - ekH * pxm(z) }; };
const dur = (x: number, y: number, s: number, f: 1 | -1, ek: Partial<Poz> = {}): Poz => ({ x, y, scale: s, facing: f, thighF: -3, kneeF: 3, thighB: 4, kneeB: 2, shF: 4, elF: -10, shB: 6, elB: -12, tails: 1, breathe: 0, blinkF: 0, blinkB: 0, hat: null, cane: null, ...ek });

const TUCCAR_V: Palet = { ...TUCCAR, hair: "#9a958a", sideburn: 1.8, biyik: "yok", sakal: true, sapka: "genis", burun: 1.2, hat: "#4a3a26", hatBand: "#2a2016", coat: "#7a5a2e", coatDark: "#54401f", coatLight: "#9a7844", vest: "#a58a4a", vestDark: "#7a6430" };
const KOMPARS: Palet[] = [{ ...KATIP, biyik: "yok" }, { ...TUCCAR, sapka: "genis", biyik: "duz" }, { ...KATIP, sapka: "genis", sakal: true, biyik: "yok" }, { ...TUCCAR, burun: 1.15 }];
// kalabalık (xm, z): avluda; ana üçlünün arkasında açık koridor bırakılır (tahta görünür)
const KALABALIK: [number, number][] = [[-2.5, 2.2], [2.3, 2.4], [-1.9, 3.0], [1.7, 3.2], [-0.9, 3.7], [2.8, 3.9], [-2.9, 4.3], [1.1, 4.5], [-1.6, 5.0], [2.2, 5.1]];
const ton = (z: number): [string, string] => z < 2.8 ? ["#5a4a36", "#8a7556"] : z < 4 ? ["#6e5c44", "#a08a68"] : ["#857258", "#b49e7c"];

// ---- tebeşir parçası yolu (p90 kırılma → p102 estrad kenarı → p114 güneşli avlu zemini) ----
const KIRILMA: P = nok(ARKA_Z - 0.02, TAHTA.xm + 2.15, 2.03); // son satır (katibin erişimi: estrad 0.36 + kol ≈ 2.2 m)
const tebesirParca = (p: number): P | null => {
  if (p < 90) return null;
  const a = KIRILMA, b = nok(6.0, 0.45, 0.36), c = nok(4.0, 0.3, 0); // sekme estrad kenarında, iniş François–Louis arasındaki boşlukta (görünür)
  if (p <= 102) { const t = (p - 90) / 12; return [lerp(a[0], b[0], t), lerp(a[1], b[1], t * t)]; }
  if (p <= 114) { const t = (p - 102) / 12; return [lerp(b[0], c[0], t), lerp(b[1], c[1], t) - Math.sin(t * Math.PI) * 28]; }
  return c;
};

export const Sb2Borsa: React.FC<{ guvenli?: boolean }> = ({ guvenli }) => {
  const p = useCurrentFrame();
  const ease = Easing.inOut(Easing.cubic);
  // ---- kamera: geniş dolly → (p150–186 kesme) Louis göğüs → (p186–204) boy; p204'te "PARIS" başlığı ekran (540,430) ----
  const louisZ = 1.52, lYer = yer(louisZ, 0.6);
  const lYuz = dunyaya(dur(lYer.x, lYer.y, lYer.s, -1, { lean: 7 }), [20, -430]);
  const kam = p < 90 ? { cs: interpolate(p, [0, 90], [1.0, 1.15], { ...cl, easing: ease }), cx: 0, cy: interpolate(p, [0, 90], [30, -10], { ...cl, easing: ease }) } // plan +100→+40; ayaklar alt banda girdiği için −70 (onay bekliyor)
    : p < 150 ? { cs: interpolate(p, [90, 150], [1.15, 1.22], { ...cl, easing: ease }), cx: interpolate(p, [90, 150], [0, 20], cl), cy: interpolate(p, [90, 150], [-10, -40], cl) }
    : p < 186 ? { cs: 2.8, cx: -2.8 * (lYuz[0] - 540), cy: -160 - 2.8 * (lYuz[1] - 960) }
    : { cs: 1.3, cx: 70, cy: -110 };
  const { cs, cx, cy } = kam;
  const kat = (k: number) => `translate(${540 + cx * k},${960 + cy * k}) scale(${1 + (cs - 1) * k}) translate(-540,-960)`;
  const ekran = (q: P): P => [540 + cx + (q[0] - 540) * cs, 960 + cy + (q[1] - 960) * cs];
  const don = interpolate(p, [96, 126], [0, 1], { ...cl, easing: Easing.bezier(0.16, 1, 0.3, 1) });

  // ---- ana karakterler (dünya xm, z) ----
  const tY = yer(1.45, -0.95), fY = yer(1.45, -0.25);
  const tuccar = dur(tY.x, tY.y, tY.s * 0.95, 1, { lookX: 0.6, lookY: -0.6 * don, headTilt: -6 * don, agiz: don > 0.5 ? "O" : "gulumse", browF: 0.8 * don, browB: 0.8 * don, shF: 10, elF: -20 });
  const tOmuz = dunyaya(tuccar, [50, -352]);
  const fr0 = dur(fY.x, fY.y, fY.s, -1, { lean: 2, lookX: 0.8, lookY: 0.1, headTilt: 4, agiz: "gulumse", browF: 0.5, browB: 0.4, shB: 10, elB: -24 });
  const fIK = kolIK(fr0, [tOmuz[0], tOmuz[1] + 4], true, [0, -8]);
  const francois: Poz = { ...fr0, shF: fIK.sh, elF: fIK.el };
  const pY = yer(1.47, 0.25), PUP = 300;
  const defterUc: P = [pY.zx + 4 * pY.s, pY.zy - (PUP + 6) * pY.s];
  const lo0 = dur(lYer.x, lYer.y, lYer.s, -1, { lean: 7, headTilt: 16, lookX: 0.5, lookY: 1, browF: -0.5, browB: -0.5, agiz: "dinlen", blinkF: 0.45, blinkB: 0.45, yakin: p >= 150 && p < 186 });
  const lIK = kolIK(lo0, defterUc, true, [6, 10]);
  const lIKb = kolIK(lo0, [defterUc[0] + 40 * lYer.s, defterUc[1] + 4 * lYer.s], false);
  const louis: Poz = { ...lo0, shF: lIK.sh, elF: lIK.el, shB: lIKb.sh, elB: lIKb.el };
  const kalemEl = elDunya(louis, true, [6, 10]);
  const parca = tebesirParca(p);
  const fSapka = ekran(dunyaya(francois, [12, -592])), lSapka = ekran(dunyaya(louis, [12, -604]));
  const etiketCikis = interpolate(p, [78, 86], [0, 1], { ...cl, easing: Easing.in(Easing.quad) });

  const onCephe = (xm: number, hm: number) => nok(ON_Z, xm, hm);
  const arcadeM = (i: number): Esleme => { const x0 = i * AKS - AW / 2; return (u, v) => onCephe(x0 + u * AW, (1 - v) * AH); };
  const kilit: KilitNokta[] = p >= 150 && p < 186
    ? [{ ad: "Louis yüz (göğüs)", p: ekran(lYuz), tur: "yuz" }, { ad: "kalem/defter", p: ekran(defterUc), tur: "dokunus" }]
    : [
      { ad: "François ayak", p: ekran([fY.zx, fY.zy]), tur: "ayak" }, { ad: "Louis ayak", p: ekran([lYer.zx, lYer.zy]), tur: "ayak" }, { ad: "tüccar ayak", p: ekran([tY.zx, tY.zy]), tur: "ayak" },
      { ad: "tebeşir kırılma", p: ekran(KIRILMA), tur: "dokunus" }, { ad: "PARIS başlığı", p: ekran(nok(ARKA_Z, 0, TAHTA.h1 - 0.34)), tur: "kurulum" }, { ad: "Louis defter", p: ekran(defterUc), tur: "kurulum" },
      ...(parca ? [{ ad: "tebeşir parçası", p: ekran(parca), tur: "temas" as const }] : []),
    ];
  return (
    <AbsoluteFill style={{ backgroundColor: "#3a2c1c" }}>
      <ArsivKatmani mod="gunduz">
        <AbsoluteFill>
          <svg width={1080} height={1920} viewBox="0 0 1080 1920">
            <defs><filter id="b2toz" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={14} /></filter>
              <filter id="b2rakam"><feTurbulence type="fractalNoise" baseFrequency="0.18" numOctaves={2} seed={S + 3} /><feDisplacementMap in="SourceGraphic" scale={11} xChannelSelector="R" yChannelSelector="G" /></filter>
              <filter id="b2tebesir"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={1} seed={S} /><feDisplacementMap in="SourceGraphic" scale={2.2} xChannelSelector="R" yChannelSelector="G" /></filter></defs>
            <g transform={kat(1)}>
              <KonturTitreme derinlik="orta" seed={S}>
                {/* ===== arka avlu cephesi: üst kat (dikdörtgen pencereler) + korniş + arcade sırası ===== */}
                <polygon points={poly([onCephe(-12, 12), onCephe(12, 12), onCephe(12, 0), onCephe(-12, 0)])} fill={PAL.tas} />
                <TasDuvar m={(u, v) => onCephe(-12 + 24 * u, 12 - 12 * v)} boyut={[2400, 1200]} tip="bdx" taban={PAL.tas} seed={S} derinlik="orta" yogunluk={0.5} gozenek={false} blok={[60, 30]} />
                {/* üst kat: dikdörtgen pencereler (düz söve, kemer YOK) */}
                {[-3, -2, -1, 0, 1, 2, 3].map((i) => { const x0 = i * AKS - 0.65; const q = [onCephe(x0, 9.9), onCephe(x0 + 1.3, 9.9), onCephe(x0 + 1.3, 7.7), onCephe(x0, 7.7)]; const s = [onCephe(x0 - 0.15, 10.05), onCephe(x0 + 1.45, 10.05), onCephe(x0 + 1.45, 7.6), onCephe(x0 - 0.15, 7.6)]; return <g key={i}><polygon points={poly(s)} fill={tonla(PAL.tas, 0.05)} stroke={ink(PAL.tas)} strokeWidth={1.4} /><polygon points={poly(q)} fill="#3a3a44" /><line x1={(q[0][0] + q[1][0]) / 2} y1={q[0][1]} x2={(q[0][0] + q[1][0]) / 2} y2={q[2][1]} stroke={PAL.ahsap} strokeWidth={3} />{[0.33, 0.66].map((t) => <line key={t} x1={q[0][0]} y1={lerp(q[0][1], q[3][1], t)} x2={q[1][0]} y2={lerp(q[0][1], q[3][1], t)} stroke={PAL.ahsap} strokeWidth={2} />)}</g>; })}
                {/* arcade üstü korniş (imposte kuşağı) + alt yüz gölge */}
                <polygon points={poly([onCephe(-12, 7.1), onCephe(12, 7.1), onCephe(12, 6.55), onCephe(-12, 6.55)])} fill={tonla(PAL.tas, 0.06)} stroke={ink(PAL.tas)} strokeWidth={1.6} />
                <Tarama sekil={[onCephe(-12, 6.55), onCephe(12, 6.55), onCephe(12, 6.4), onCephe(-12, 6.4)]} basamak="III" aci={TH} renk={ink(PAL.tas)} derinlik="orta" seed={S + 1} />
                {/* kadran (1750, rüzgâr/saat) — ayak üstünde, küçük; harf yok */}
                {(() => { const c = onCephe(AKS / 2, 5.4), r = 0.42 * pxm(ON_Z); return <g><circle cx={c[0]} cy={c[1]} r={r} fill="#e9dfc9" stroke={PAL.tasG} strokeWidth={3} />{[0, 90, 180, 270].map((a) => <line key={a} x1={c[0]} y1={c[1] - r * 0.8} x2={c[0]} y2={c[1] - r * 0.62} transform={`rotate(${a} ${c[0]} ${c[1]})`} stroke={PAL.tasG} strokeWidth={2} />)}<path d={`M ${c[0]} ${c[1] - r * 0.7} L ${c[0] + 3} ${c[1]} L ${c[0] - 3} ${c[1]} Z`} fill={BL.brass} transform={`rotate(-38 ${c[0]} ${c[1]})`} /></g>; })()}
              </KonturTitreme>
              {/* ===== arcade'lar: yarım daire; açıklık içinde portik (derin gölge), galeri duvarı, ortada tahta + estrad + katip ===== */}
              {[-2, -1, 0, 1, 2].map((i) => {
                const m = arcadeM(i);
                const ic = (
                  <g>
                    {/* portik içi: galeri duvarı (yansıyan ışıkla biraz aydınlık) + tavan gölgesi */}
                    <polygon points={poly([nok(ARKA_Z, i * AKS - 3, 7), nok(ARKA_Z, i * AKS + 3, 7), nok(ARKA_Z, i * AKS + 3, 0), nok(ARKA_Z, i * AKS - 3, 0)])} fill={tonla(PAL.portik, 0.35)} />
                    <polygon points={poly([nok(ARKA_Z, i * AKS - 3, 0), nok(ARKA_Z, i * AKS + 3, 0), onCephe(i * AKS + 3, 0), onCephe(i * AKS - 3, 0)])} fill={tonla(PAL.portik, 0.15)} />
                    <Tarama sekil={kemerCokgen(m, "yarimDaire", AW, AH)} basamak={i === 0 ? "III" : "IV"} aci={TH} renk="#1e1810" derinlik="orta" seed={S + 10 + i} />
                    {i === 0 && <Tahta p={p} />}
                    {i === 0 && <Estrad />}
                    {i === 0 && <Katip p={p} />}
                    {/* yan arcade'larda demir parmaklıklı kapı (biri açık kanat) */}
                    {i !== 0 && Array.from({ length: 9 }).map((_, j) => { const xm = i * AKS - AW / 2 + (AW * (j + 0.5)) / 9; return <line key={j} x1={onCephe(xm, 0)[0]} y1={onCephe(xm, 0)[1]} x2={onCephe(xm, 4.3)[0]} y2={onCephe(xm, 4.3)[1]} stroke={PAL.ahsap} strokeWidth={2.4} />; })}
                    {i !== 0 && <line x1={onCephe(i * AKS - AW / 2, 4.3)[0]} y1={onCephe(i * AKS - AW / 2, 4.3)[1]} x2={onCephe(i * AKS + AW / 2, 4.3)[0]} y2={onCephe(i * AKS + AW / 2, 4.3)[1]} stroke={PAL.ahsap} strokeWidth={4} />}
                    {/* alınlık (tympanum): üzengiden yukarısı taş dolgu + ticaret amblemi + okunmaz şehir adı çizgileri */}
                    <polygon points={poly(kemerCokgen(m, "yarimDaire", AW, AH).filter((q) => q[1] <= onCephe(0, AH - AW / 2)[1] + 1).concat([onCephe(i * AKS + AW / 2, AH - AW / 2), onCephe(i * AKS - AW / 2, AH - AW / 2)]))} fill={tonla(PAL.tas, -0.04)} />
                    <line x1={onCephe(i * AKS - AW / 2, AH - AW / 2)[0]} y1={onCephe(0, AH - AW / 2)[1]} x2={onCephe(i * AKS + AW / 2, AH - AW / 2)[0]} y2={onCephe(0, AH - AW / 2)[1]} stroke={PAL.ahsap} strokeWidth={5} />
                    <Amblem c={onCephe(i * AKS, AH - AW / 2 + 0.85)} s={pxm(ON_Z) / 100} tip={(i + 2) % 4} />
                    {[0.3, 0.42].map((h, j) => <line key={j} x1={onCephe(i * AKS - 0.7 + j * 0.2, AH - AW / 2 + h)[0]} y1={onCephe(0, AH - AW / 2 + h)[1]} x2={onCephe(i * AKS + 0.7 - j * 0.2, AH - AW / 2 + h)[0]} y2={onCephe(0, AH - AW / 2 + h)[1]} stroke={PAL.tasG} strokeWidth={2} />)}
                  </g>
                );
                return <Kemer key={i} m={m} W={AW} H={AH} tip="yarimDaire" dolgu={PAL.portik} ic={ic} sove={{ gen: 0.28, renk: tonla(PAL.tas, 0.04) }} kilit={{ renk: PAL.tas }} imposte />;
              })}
              {/* ===== avlu zemini: büyük kare taş plaka, düzensiz derz; arka cephenin kısa gölgesi (güneşten) ===== */}
              <AvluZemin />
              <polygon points={poly([zem(ON_Z, -12), zem(ON_Z, 12), [zem(ON_Z, 12)[0] - 160, zem(ON_Z, 12)[1] + 54], [zem(ON_Z, -12)[0] - 160, zem(ON_Z, -12)[1] + 54]])} fill="url(#b2ct)" />
              <Tarama sekil={[zem(ON_Z, -12), zem(ON_Z, 12), [zem(ON_Z, 12)[0] - 160, zem(ON_Z, 12)[1] + 54], [zem(ON_Z, -12)[0] - 160, zem(ON_Z, -12)[1] + 54]]} basamak="III" aci={TH} renk={ink(PAL.zemin)} derinlik="orta" seed={S + 20} />
              {/* tebeşir parçası (≥ 14 px, açık, koyu kontur) + kırılma tozu (tahtanın önünde, ışıkta asılı) */}
              {parca && <g>
                <ellipse cx={parca[0]} cy={parca[1] + 6} rx={9} ry={3} fill="#3a2c1c" opacity={p >= 114 ? 0.45 : 0.15} />
                <rect x={parca[0] - 8} y={parca[1] - 4} width={16} height={7} rx={2.5} fill={BL.tebesir} stroke="#3a2c1c" strokeWidth={1.6} transform={`rotate(${p < 114 ? p * 23 : 14} ${parca[0]} ${parca[1]})`} />
              </g>}
              {p >= 90 && p < 170 && (() => { const t = interpolate(p, [90, 100, 168], [0, 1, 0.4], cl); return <g opacity={t}><ellipse cx={KIRILMA[0]} cy={KIRILMA[1] + 10 + (p - 90) * 0.2} rx={70 + (p - 90) * 0.6} ry={45 + (p - 90) * 0.3} fill={BL.tebesir} opacity={0.45} filter="url(#b2toz)" />{Array.from({ length: 22 }).map((_, i) => <circle key={i} cx={KIRILMA[0] + (rnd(S, `tx${i}`) - 0.5) * 140} cy={KIRILMA[1] + (rnd(S, `ty${i}`) - 0.3) * 80 + (p - 90) * 0.25} r={1 + rnd(S, `tr${i}`) * 2.2} fill={BL.tebesir} opacity={0.8} />)}</g>; })()}

              {/* ===== kalabalık (avluda; iki tonlu yüzsüz siluet + sıcak kenar) ===== */}
              {KALABALIK.map(([xm, z], i) => ({ xm, z, i })).sort((a, b) => b.z - a.z).map(({ xm, z, i }) => {
                const g = yer(z, xm), f: 1 | -1 = xm < 0 ? 1 : -1, sc = g.s * (0.93 + rnd(S, `k${i}`) * 0.12);
                const pz = dur(g.x, g.y, sc, f, { lookY: -0.8 * don, headTilt: -10 * don, shF: 6 + rnd(S, `a${i}`) * 14, elF: -14 - rnd(S, `b${i}`) * 30 });
                const [k, a] = ton(z);
                return <g key={i}><Golge isik={GUNES} ayak={[g.zx, g.zy]} h={620 * sc} genislik={100 * sc} alfa={0.35} renk="#6a5030" /><Siluet renk={k} acik={a} kenar={{ renk: "#fff1c8", dx: 2.5 * sc, dy: -2 * sc }} kutu={[g.x - 120 * sc, g.y - 640 * sc, 240 * sc, 650 * sc]}><Kukla p={KOMPARS[i % 4]} pz={pz} golgesiz /></Siluet></g>;
              })}
              {/* ===== ana karakterler (gölgeler aynı güneşten: kısa, sol-öne) ===== */}
              <Golge isik={GUNES} ayak={[tY.zx, tY.zy]} h={600 * tY.s} genislik={100 * tY.s} alfa={0.4} renk="#6a5030" />
              <g transform={`translate(${tY.x},${tY.y}) scale(1.12,1) translate(${-tY.x},${-tY.y})`}><Kukla p={TUCCAR_V} pz={tuccar} golgesiz /></g>
              <Golge isik={GUNES} ayak={[fY.zx, fY.zy]} h={620 * fY.s} genislik={100 * fY.s} alfa={0.4} renk="#6a5030" />
              <Kukla p={FRANCOIS} pz={francois} golgesiz />
              <Golge isik={GUNES} ayak={[lYer.zx, lYer.zy]} h={635 * lYer.s} genislik={100 * lYer.s} alfa={0.4} renk="#6a5030" />
              <Kukla louis p={LOUIS} pz={louis} golgesiz />
              <CepEldiven pz={louis} />
              <Pupitr x={pY.zx} y={pY.zy} s={pY.s} yuz={PUP} />
              <g transform={`translate(${kalemEl[0]},${kalemEl[1]}) rotate(-28)`}><path d="M 0 0 L 2 -70 Q 14 -60 10 -20 Z" fill="#e8e0cc" stroke={ink("#e8e0cc")} strokeWidth={1.4} /></g>
              <defs><linearGradient id="b2ct" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6a5030" stopOpacity={0.35} /><stop offset="1" stopColor="#6a5030" stopOpacity={0.2} /></linearGradient></defs>
            </g>
            {/* ===== ön portik çerçevesi (proscenium, paralaks 1.3): gölgeli ayaklar, gölgeli portik zemini, tezgâh, demir kapı kanadı ===== */}
            <g transform={kat(1.3)}>
              <OnPortik />
            </g>
          </svg>
        </AbsoluteFill>
      </ArsivKatmani>
      <FormulYazisi metin="Oyun: Paris'teki tahvil fiyatı" kagitSerit />
      {/* isim etiketleri p0–78, p78–86 yukarı kayarak maskelenir (tebeşir kırılmasından önce kadrajdan çıkar); Louis x ≥ 720 */}
      {p < 86 && <AbsoluteFill style={{ clipPath: `inset(0 0 ${1920 - Math.max(fSapka[1], lSapka[1]) + 28}px 0)` }}>
        <AbsoluteFill style={{ transform: `translateY(${-etiketCikis * 220}px)` }}>
          <IsimEtiketi ad="François" sekme="#3c5ea3" x={Math.max(80, Math.min(650 - 360, fSapka[0] - 175))} y={fSapka[1] - 134} hedef={[fSapka[0], fSapka[1] - 4]} />
          <IsimEtiketi ad="Louis" sekme="#9a3646" x={1000} y={lSapka[1] - 134} hedef={[lSapka[0], lSapka[1] - 4]} hiza="sag" />
        </AbsoluteFill>
      </AbsoluteFill>}
      {guvenli && <GuvenliAlan noktalar={kilit} aktifBant="ust" baslik={`SB2-BORSA p${p}`} />}
    </AbsoluteFill>
  );
};

// ticaret amblemleri (çapa, Merkür asası, terazi, bereket boynuzu) — basit siluet, harf yok
const Amblem: React.FC<{ c: P; s: number; tip: number }> = ({ c, s, tip }) => (
  <g transform={`translate(${c[0]},${c[1]}) scale(${s})`} stroke="#8a744e" strokeWidth={4} fill="none" strokeLinecap="round">
    {tip === 0 && <g><line x1={0} y1={-34} x2={0} y2={30} /><line x1={-14} y1={-22} x2={14} y2={-22} /><path d="M -26 14 Q 0 44 26 14" /><circle cx={0} cy={-40} r={6} /></g>}
    {tip === 1 && <g><line x1={0} y1={-40} x2={0} y2={36} /><path d="M -14 -26 Q 14 -18 -14 -6 Q 14 4 -14 14 M 14 -26 Q -14 -18 14 -6 Q -14 4 14 14" /><path d="M -22 -34 Q -10 -44 0 -36 Q 10 -44 22 -34" /></g>}
    {tip === 2 && <g><line x1={0} y1={-36} x2={0} y2={30} /><line x1={-30} y1={-26} x2={30} y2={-26} /><path d="M -40 0 L -30 -26 L -20 0 Z M 20 0 L 30 -26 L 40 0 Z" /><line x1={-14} y1={30} x2={14} y2={30} /></g>}
    {tip === 3 && <g><path d="M -30 20 Q -30 -20 20 -30 Q 6 -12 8 8 Q -6 4 -30 20 Z" /><circle cx={24} cy={-30} r={6} /><circle cx={14} cy={-40} r={5} /></g>}
  </g>
);

// avlu zemini (z 1 … ön arcade düzlemi): 1.2 m kare taş, düzensiz derz, ışıkta
const AvluZemin: React.FC = () => {
  const els: React.ReactNode[] = [];
  const zs: number[] = []; for (let z = 0.9; z < ON_Z; z += 0.615) zs.push(z); zs.push(ON_Z);
  for (let r = 0; r < zs.length - 1; r++) for (let c = -7; c < 7; c++) {
    const o = (r % 2) * 0.6 + (rnd(S, `zo${r}`) - 0.5) * 0.3, x0 = c * 1.2 + o, x1 = x0 + 1.2;
    const q = [zem(zs[r], x0), zem(zs[r], x1), zem(zs[r + 1], x1), zem(zs[r + 1], x0)];
    els.push(<polygon key={`${r}-${c}`} points={poly(q)} fill={tonla(PAL.zemin, (rnd(S, `z${r}-${c}`) - 0.5) * 0.08)} stroke="#a8946c" strokeWidth={1.4} />);
  }
  return <g>{els}</g>;
};

// fiyat tahtası: galeri duvarında, ahşap çerçeve; başlık "PARIS · RENTE 3%" [S]; satırlar okunmaz rakam grupları (fiyat iddiası yok)
const Tahta: React.FC<{ p: number }> = ({ p }) => {
  const a = nok(ARKA_Z, TAHTA.xm, TAHTA.h1), b = nok(ARKA_Z, TAHTA.xm + TAHTA.w, TAHTA.h0);
  const x = a[0], y = a[1], w = b[0] - a[0], h = b[1] - a[1];
  const grup = (r: number, c: number) => Array.from({ length: 3 + Math.floor(rnd(S, `n${r}${c}`) * 2) }).map((_, i) => "0123456789"[Math.floor(rnd(S, `g${r}${c}${i}`) * 10)]).join("");
  const yazilan = interpolate(p, [30, 88], [0, 1], cl);
  return (
    <g>
      <rect x={x - 8} y={y - 8} width={w + 16} height={h + 16} fill={PAL.ahsap} />
      <rect x={x} y={y} width={w} height={h} fill={PAL.tahta} />
      <g filter="url(#b2tebesir)">
        <text x={x + w / 2} y={y + h * 0.17} textAnchor="middle" fontFamily={serif} fontWeight={900} fontSize={w * 0.088} fill={BL.tebesir}>PARIS · RENTE 3%</text>
        <line x1={x + w * 0.1} y1={y + h * 0.23} x2={x + w * 0.9} y2={y + h * 0.23} stroke={BL.tebesir} strokeWidth={2} />
      </g>
      <g filter="url(#b2rakam)">
        {[0, 1, 2, 3].map((r) => { const yy = y + h * (0.38 + r * 0.16), son = r === 3; return <g key={r} opacity={son ? (yazilan > 0.2 ? 0.85 : 0) : 0.85}><line x1={x + w * 0.07} y1={yy - 6} x2={x + w * 0.17} y2={yy - 6} stroke={BL.tebesir} strokeWidth={2.4} /><text x={x + w * 0.22} y={yy} fontFamily={serif} fontWeight={900} fontSize={h * 0.11} fill={BL.tebesir}>{grup(r, 0)}</text><text x={x + w * 0.45} y={yy} fontFamily={serif} fontWeight={900} fontSize={h * 0.11} fill={BL.tebesir}>{son ? grup(r, 1).slice(0, 2) : `${grup(r, 1)},${grup(r, 2).slice(0, 2)}`}</text></g>; })}
      </g>
      <rect x={x - 8} y={y + h + 8} width={w + 16} height={6} fill="#5b3d25" />
    </g>
  );
};
// estrad: portik eşiğinde iki basamak
const Estrad: React.FC = () => {
  const e = (z: number, h: number, xa: number, xb: number) => [nok(z, xa, h), nok(z, xb, h)];
  const [a1, b1] = e(6.0, 0.18, -1.6, 1.6), [a2, b2] = e(6.0, 0, -1.6, 1.6), [a3, b3] = e(6.2, 0.36, -1.5, 1.5), [a4, b4] = e(6.2, 0.18, -1.5, 1.5);
  return <g><polygon points={poly([a1, b1, b2, a2])} fill="#6e4a2a" stroke={ink("#6e4a2a")} strokeWidth={1.4} /><polygon points={poly([a3, b3, b4, a4])} fill="#7a5230" stroke={ink("#7a5230")} strokeWidth={1.4} /><AhsapYuzey m={(u, v): P => [lerp(a3[0], b3[0], u), lerp(a3[1], nok(6.6, 0, 0.36)[1], v)]} boyut={[300, 30]} tur="mese" seed={S + 4} derinlik="orta" /></g>;
};
const Katip: React.FC<{ p: number }> = ({ p }) => {
  const g = yer(6.35, 0.55, 0.36);
  const p0 = dur(g.x, g.y, g.s, 1, { shB: 10, elB: -30, lookY: -0.4, headTilt: -6, lookX: 0.6 });
  // yazarken el satır boyunca küçük adımlar; p90 kırılmada el kırılma noktasında, sonra yarım tebeşirle iner
  const in_ = Math.min(1, Math.max(0, (p - 120) / 20));
  const hedef: P = p < 90 ? [KIRILMA[0] - 46 + ((p - 30) / 60) * 40 + Math.sin(p * 0.9) * 3, KIRILMA[1] + Math.cos(p * 1.3) * 2] : [KIRILMA[0] - 20 * in_, KIRILMA[1] + 60 * in_];
  const ik = kolIK(p0, hedef, true, [6, 10]);
  const pz = { ...p0, shF: ik.sh, elF: ik.el };
  const el = elDunya(pz, true, [6, 10]);
  return <g><Siluet renk="#2e261c" acik="#4a3e2c" kutu={[g.x - 120 * g.s, g.y - 640 * g.s, 240 * g.s, 650 * g.s]}><Kukla p={KATIP} pz={pz} golgesiz /></Siluet><rect x={el[0] - 3} y={el[1] - 2} width={p < 90 ? 7 : 4} height={3} fill={BL.tebesir} /></g>;
};
const CepEldiven: React.FC<{ pz: Poz }> = ({ pz }) => (
  <g transform={`translate(${pz.x},${pz.y}) scale(${(pz.scale ?? 1) * (pz.facing ?? 1)},${pz.scale ?? 1}) translate(0,${pz.bodyY ?? 0}) rotate(${pz.lean ?? 0},0,-226)`}>
    <path d="M 26 -322 L 50 -330 L 52 -318 L 30 -312 Z" fill={BL.gloveHero} stroke="#8a7f68" strokeWidth={1.4} transform="rotate(-12 40 -322)" />
  </g>
);
const Pupitr: React.FC<{ x: number; y: number; s: number; yuz: number }> = ({ x, y, s, yuz }) => {
  const k = (dx: number, dy: number): P => [x + dx * s, y - dy * s];
  return (
    <g>
      {[-48, 48].map((dx) => <rect key={dx} x={k(dx, 0)[0] - 4 * s} y={k(0, yuz - 20)[1]} width={8 * s} height={(yuz - 20) * s} fill={PAL.ahsap} />)}
      <polygon points={poly([k(-66, yuz - 22), k(66, yuz - 22), k(60, yuz + 14), k(-60, yuz + 14)])} fill="#5b3d25" stroke={ink("#5b3d25")} strokeWidth={1.6} />
      <polygon points={poly([k(-54, yuz - 16), k(0, yuz - 12), k(0, yuz + 12), k(-50, yuz + 9)])} fill="#efe6d0" stroke="#5a3a22" strokeWidth={1.4} />
      <polygon points={poly([k(0, yuz - 12), k(54, yuz - 16), k(50, yuz + 9), k(0, yuz + 12)])} fill="#e9dfc9" stroke="#5a3a22" strokeWidth={1.4} />
      {[-6, 0, 6].map((d) => <line key={d} x1={k(8, yuz + d)[0]} y1={k(8, yuz + d)[1]} x2={k(44, yuz + d - 2)[0]} y2={k(44, yuz + d - 2)[1]} stroke="#2b1d10" strokeWidth={1} opacity={0.6} />)}
    </g>
  );
};
// ön portik (kamera onun içinde): arcade ayakları, gölgeli zemin, tezgâh, demir kapı kanadı — tümü derin gölgede (tarama IV)
const OnPortik: React.FC = () => (
  <g>
    <polygon points={poly([[-200, 1560], [1280, 1560], [1280, 2200], [-200, 2200]])} fill={PAL.portik} />
    <Tarama sekil={[[-200, 1560], [1280, 1560], [1280, 2200], [-200, 2200]]} basamak="IV" aci={TH} renk="#1e1810" derinlik="yakin" seed={S + 50} />
    <polyline points={poly([[-200, 1560], [1280, 1560]])} stroke="#fff1c8" strokeWidth={3} opacity={0.5} />
    {[[-200, 110], [970, 1280]].map(([a, b], i) => <g key={i}><rect x={a} y={-300} width={b - a} height={2500} fill={PAL.portik} /><Tarama sekil={[[a, -300], [b, -300], [b, 2200], [a, 2200]]} basamak="IV" aci={TH} renk="#1e1810" derinlik="yakin" seed={S + 51 + i} /><line x1={i ? a : b} y1={-300} x2={i ? a : b} y2={2200} stroke="#9a845e" strokeWidth={4} opacity={0.6} /></g>)}
    {/* sağ altta tüccar tezgâhı (kırpık): defter + hokka */}
    <polygon points={poly([[760, 1660], [1180, 1640], [1180, 1700], [760, 1720]])} fill="#5b3d25" stroke={ink("#5b3d25")} strokeWidth={2} />
    <polygon points={poly([[760, 1720], [1180, 1700], [1180, 2200], [760, 2200]])} fill="#3a2c20" />
    <polygon points={poly([[820, 1650], [940, 1644], [944, 1676], [822, 1682]])} fill="#e9dfc9" stroke="#5a3a22" strokeWidth={1.4} />
    <ellipse cx={980} cy={1662} rx={14} ry={6} fill="#1c1915" />
    {/* sol altta yarı açık demir parmaklıklı kapı kanadı */}
    {Array.from({ length: 7 }).map((_, j) => <line key={j} x1={80 + j * 26} y1={1560 + j * 4} x2={80 + j * 26} y2={2200} stroke="#1c1915" strokeWidth={5} />)}
    <line x1={70} y1={1560} x2={250} y2={1588} stroke="#1c1915" strokeWidth={8} />
  </g>
);
