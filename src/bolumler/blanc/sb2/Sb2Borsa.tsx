import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Kukla, Palet, Poz } from "../../../rig/Kukla";
import { KolEl, KISTIR_YEREL, elMatris } from "../../../rig/KolEl";
import { CepEldiven } from "../props/EldivenKose";
import { AYAK_TABAN, dunyaya, elDunya, kolIK } from "../../../rig/kinematik";
import { ArsivKatmani } from "../../../doku/ArsivKatmani";
import { KonturTitreme } from "../../../doku/KonturTitreme";
import { TasDuvar } from "../../../doku/TasDuvar";
import { AhsapYuzey } from "../../../doku/AhsapYuzey";
import { Siluet } from "../../../doku/Siluet";
import { Golge, Isik } from "../../../doku/Isik";
import { Kemer, kemerCokgen } from "../../../doku/Kemer";
import { RenkKaydi, Tarama, taramaAcisi } from "../../../doku/Tarama";
import { GuvenliAlan, KilitNokta } from "../../../doku/GuvenliAlan";
import { BL, DOKU_SEED, Esleme, P, ink, lerp, murekkep, poly, rnd, tonla } from "../../../doku/sabitler";
import { FormulYazisi, IsimEtiketi } from "../../../components/EkranYazisi";
import { serif } from "../../../theme";
import { KATIP, KATIP_ACIK, TUCCAR, FRANCOIS_TABA, LOUIS_ELSIZ } from "../palet";

// ===== SB2-BORSA · P02 · Palais de la Bourse — AÇIK PORTİKLİ AVLU (mekanlar.md 10.1, R3 orkestra kararı) — p = mutlak − 156 =====
// Arka avlu cephesi: YARIM DAİRE arcade'lar (oran 1:2), sade kilit taşı + imposte; alınlıkta ticaret amblemi + okunmaz şehir çizgileri;
// arcade'larda demir parmaklıklı kapı; portik içi derin gölge (tarama IV). Fiyat tahtası ORTA arcade'ın altında, galeri duvarına dayalı
// [S dramatizasyon]; katip estradda. Öğle güneşi TEPEDEN (sağ-üst arkadan hafif): gölgeler kısa, sol-öne. Kamera ÖN PORTİĞİN İÇİNDEN:
// iki kenarda gölgeli arcade ayağı, altta gölgeli portik zemini, sağ altta tezgâh (defter + hokka), sol altta yarı açık demir kapı kanadı.
// Bayrak YOK. Palet (6 + ışık): taş ışık #e2cfa0 · taş gölge #9a845e · portik derin gölge #4a3e2c · avlu taşı #d4c29a · tahta #1f2a26 · ahşap/demir #3a2c20 + güneş #fff1c8.
export const SB2_BORSA_SURE = 204;
// A4b: sekme-1 tahta altı tebeşir rafı (p102), sekme-2 estrad üst basamağı (p114) — insert kadrajında y ≤ 1500 (önce: estrad kenarı + avlu taşı)
export const P02_TEMAS = { tebesirCizirti: [30, 88], tebesirKirilir: 90, sekme1: 102, sekme2: 114, kalemCizirti: [152, 184], yarimTebesir: 192 } as const;
export const P02_KONTROL = [0, 30, 50, 78, 90, 102, 114, 126, 150, 168, 203];
const PAL = { tas: "#e2cfa0", tasG: "#9a845e", portik: "#4a3e2c", zemin: "#d4c29a", tahta: BL.tahta, ahsap: "#3a2c20", gunes: "#fff1c8" };

const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const S = DOKU_SEED.borsa;
// ---- avlu perspektifi (göz hizası 1.6 m; ufuk y 800): y = 800 + 900/z, 1 m = 563/z px; rig 620 birim ≈ 1.85 m (şapkalı) ----
// A4b: KAMERA DERİNLİĞİ KZ (m). Tahta insert'i (p78–114) ve geri çekilme (p114–150) GERÇEK dolly: kamera avluda ileri gider,
// kameranın arkasında kalanlar (z − KZ < YAKIN_KES) çizilmez; geri çekilmede kalabalık kadraj kenarından fiziksel olarak girer.
// KZ her karede bileşen gövdesinde bir kez atanır (tek render geçişi; alt bileşenler aynı değeri okur).
let KZ = 0;
const YAKIN_KES = 0.6;
const UFUK = 800;
const dz = (z: number) => Math.max(0.05, z - KZ);
const gorunur = (z: number) => z - KZ >= YAKIN_KES;
const pxm = (z: number) => 563 / dz(z);
const zem = (z: number, xm: number): P => [540 + xm * pxm(z), UFUK + 900 / dz(z)];
const olc = (z: number) => 1.679 / dz(z);
const nok = (z: number, xm: number, hm: number): P => { const [x, y] = zem(z, xm); return [x, y - hm * pxm(z)]; };
const ON_Z = 5.6, ARKA_Z = 6.6; // arcade ön düzlemi / portik arka (galeri) duvarı
const AKS = 4.5, AW = 3.0, AH = 6.0; // aks genişliği, arcade açıklığı 3.0 × 6.0 (1:2)
const GUNES: Isik = { tip: "yonlu", ad: "öğle güneşi (tepeden, sağ-arka)", yon: [-0.16, 0.05], renk: PAL.gunes };
const TH = taramaAcisi(GUNES);
const TAHTA = { xm: -1.5, w: 3.0, h0: 1.75, h1: 3.75 }; // galeri duvarında (m)
// A4 gravür: mürekkep (iç kontur 3 px, dış 5 px) ve gölge tonları — tek ışık (öğle güneşi) tanımından
const MK = murekkep(PAL.tas), MK_DEMIR = "#1f1812", IC = 3, DIS = 5;
const DUVAR_KAL = 0.6; // arcade duvar kalınlığı (m): kemer içi / söve iç yüzü bandı
// dövme demir parmaklıklı kapı (1773 dövme demir [D Ek 3]): seyrek DİKEY çubuk (~0.2 m), mızrak uçlu; alt/orta/üst kuşak. Tel örgü YOK.
const Parmaklik: React.FC<{ q: (xm: number, hm: number) => P; x0: number; w: number; h: number; kalin: number }> = ({ q, x0, w, h, kalin }) => {
  const n = Math.round(w / 0.2);
  return (
    <g stroke={MK_DEMIR} strokeLinecap="round" fill="none">
      {Array.from({ length: n + 1 }).map((_, j) => { const xm = x0 + (w * j) / n, a = q(xm, 0), b = q(xm, h + 0.12), t = q(xm, h + 0.32), tl = q(xm - 0.05, h + 0.14), tr = q(xm + 0.05, h + 0.14);
        return <g key={j}><line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} strokeWidth={kalin} /><polygon points={poly([t, tr, b, tl])} fill={MK_DEMIR} stroke="none" /></g>; })}
      {[0.15, 1.0, h].map((hm) => { const a = q(x0, hm), b = q(x0 + w, hm); return <line key={hm} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} strokeWidth={kalin * 1.7} />; })}
      {/* orta kuşakta küçük halka süs (dönem kapı dili; seyrek) */}
      {Array.from({ length: Math.floor(n / 2) }).map((_, j) => { const c = q(x0 + (w * (2 * j + 1)) / n, 0.58), r = Math.abs(q(x0 + 0.1, 0)[0] - q(x0, 0)[0]) * 0.8; return <circle key={`h${j}`} cx={c[0]} cy={c[1]} r={r} strokeWidth={kalin * 0.8} />; })}
    </g>
  );
};

const yer = (z: number, xm: number, ekH = 0) => { const [x, y] = zem(z, xm); const s = olc(z); return { x, y: y + AYAK_TABAN * s - ekH * pxm(z), s, zx: x, zy: y - ekH * pxm(z) }; };
const dur = (x: number, y: number, s: number, f: 1 | -1, ek: Partial<Poz> = {}): Poz => ({ x, y, scale: s, facing: f, thighF: -3, kneeF: 3, thighB: 4, kneeB: 2, shF: 4, elF: -10, shB: 6, elB: -12, tails: 1, breathe: 0, blinkF: 0, blinkB: 0, hat: null, cane: null, ...ek });

const TUCCAR_V: Palet = { ...TUCCAR, hair: "#9a958a", sideburn: 1.8, biyik: "yok", sakal: true, sapka: "genis", burun: 1.2, hat: "#4a3a26", hatBand: "#2a2016", coat: "#7a5a2e", coatDark: "#54401f", coatLight: "#9a7844", vest: "#a58a4a", vestDark: "#7a6430" };
const KOMPARS: Palet[] = [{ ...KATIP, biyik: "yok" }, { ...TUCCAR, sapka: "genis", biyik: "duz" }, { ...KATIP, sapka: "genis", sakal: true, biyik: "yok" }, { ...TUCCAR, burun: 1.15 }];
// kalabalık (xm, z): avluda; ana üçlünün arkasında açık koridor bırakılır (tahta görünür)
const KALABALIK: [number, number][] = [[-2.5, 2.2], [2.3, 2.4], [-1.9, 3.0], [1.7, 3.2], [-0.9, 3.7], [2.8, 3.9], [-2.9, 4.3], [1.1, 4.5], [-1.6, 5.0], [2.2, 5.1]];
const ton = (z: number): [string, string] => z < 2.8 ? ["#5a4a36", "#8a7556"] : z < 4 ? ["#6e5c44", "#a08a68"] : ["#857258", "#b49e7c"];

// ---- tebeşir parçası yolu (p90 kırılma → p102 estrad kenarı → p114 güneşli avlu zemini) ----
// kırılma: son satır, katibin sağında (katip xm 0.3 sola durur, kolunu sağa uzatır: başı yazıyı örtmez)
const KIR = { z: ARKA_Z - 0.02, xm: TAHTA.xm + 2.35, h: 2.03 };
const kirilma = (): P => nok(KIR.z, KIR.xm, KIR.h);
// tebeşir parçası DÜNYA yolu (z, xm, h): p90 kırılma → p102 tahta altı rafı (sekme-1) → p114 estrad üst basamağı (sekme-2, orada kalır)
const RAF = { z: ARKA_Z - 0.06, h: 1.70 }, BASAMAK = { z: 6.22, h: 0.36 };
const parcaDunya = (p: number): { z: number; xm: number; h: number } | null => {
  if (p < 90) return null;
  if (p <= 102) { const t = (p - 90) / 12; return { z: lerp(KIR.z, RAF.z, t), xm: KIR.xm + 0.04 * t, h: lerp(KIR.h, RAF.h, t * t) }; }
  if (p <= 114) { const t = (p - 102) / 12; return { z: lerp(RAF.z, BASAMAK.z, t), xm: KIR.xm + 0.04 + 0.12 * t, h: lerp(RAF.h, BASAMAK.h, t * t) + Math.sin(t * Math.PI) * 0.18 }; }
  return { z: BASAMAK.z, xm: KIR.xm + 0.16, h: BASAMAK.h };
};
const tebesirParca = (p: number): P | null => { const d = parcaDunya(p); return d ? nok(d.z, d.xm, d.h) : null; };

// ---- kamera programı (sahne-plani v2.6 P02) ----
// p0–78 geniş dolly · p78–114 TAHTA INSERT (KZ 4.645: tahta 2.0 m = 576 px, %30; tahta merkezi ekran y 700) ·
// p114–150 geri çekilme (KZ → 2.7: tahta ≥ 288 px, kalabalık donmuş) · p150–186 Louis göğüs (cs 3.0) · p186–204 boy.
export const P02_KAMERA = { insKZ: 4.645, insTahtaY: 700, ortaKZ: 2.7, ortaTahtaY: 620, gogusCs: 3.0, gogusYuzY: 760 };

// gövde (lean + bodyY) içindeki rig-yerel noktanın dünya konumu (omuz gibi; kinematik.ts kol zinciriyle aynı gövde dönüşümü)
const govdeNokta = (pz: Poz, q: P): P => {
  const r = ((pz.lean ?? 0) * Math.PI) / 180, c = Math.cos(r), sn = Math.sin(r);
  const x = q[0], y = q[1] + 226;
  return dunyaya(pz, [x * c - y * sn, x * sn + y * c - 226 + (pz.bodyY ?? 0)]);
};
// kaz tüyü (tutulan): kıstırma noktasında; uç (nib) aşağı-ileri, bayrak yukarı-geri. Ekran px, el ölçeğine bağlı.
const KAZ_NIB: P = [30, 58];
const KazTuyu: React.FC<{ k: number }> = ({ k }) => (
  <g transform={`scale(${k})`}>
    <path d={`M ${KAZ_NIB[0]} ${KAZ_NIB[1]} L 6 10 L -140 -236 Q -150 -250 -136 -248 Z`} fill="#e8e0cc" stroke={ink("#e8e0cc")} strokeWidth={1.6} />
    <path d="M -20 -26 Q -70 -150 -150 -246 Q -96 -160 -40 -18 Z" fill="#efe8d6" stroke={ink("#e8e0cc")} strokeWidth={1.4} />
    <path d="M -10 -14 Q -70 -110 -142 -240 Q -50 -140 6 -6 Z" fill="#d9d0ba" stroke={ink("#e8e0cc")} strokeWidth={1.2} />
    {[0.25, 0.45, 0.65].map((t) => <path key={t} d={`M ${-20 - t * 120} ${-26 - t * 210} l -22 6`} stroke="#b9ae94" strokeWidth={1.4} />)}
    <path d={`M ${KAZ_NIB[0]} ${KAZ_NIB[1]} L 14 30`} stroke="#1c1915" strokeWidth={3} strokeLinecap="round" />
  </g>
);

export const Sb2Borsa: React.FC<{ guvenli?: boolean }> = ({ guvenli }) => {
  const p = useCurrentFrame();
  const ease = Easing.inOut(Easing.cubic);
  const K = P02_KAMERA;
  const sahne: "genis" | "insert" | "orta" | "gogus" | "boy" = p < 78 ? "genis" : p < 114 ? "insert" : p < 150 ? "orta" : p < 186 ? "gogus" : "boy";
  // ---- kamera derinliği (dolly) ----
  KZ = sahne === "insert" ? K.insKZ : sahne === "orta" ? interpolate(p, [114, 150], [K.insKZ, K.ortaKZ], { ...cl, easing: Easing.out(Easing.cubic) }) : 0;
  const tahtaY = nok(ARKA_Z, 0, (TAHTA.h0 + TAHTA.h1) / 2)[1];
  const louisZ = 1.52, lYer = yer(louisZ, 0.6);
  const lo0 = dur(lYer.x, lYer.y, lYer.s, -1, { lean: 7, headTilt: 16, lookX: 0.5, lookY: 1, browF: -0.5, browB: -0.5, agiz: "dinlen", blinkF: 0.45, blinkB: 0.45, yakin: sahne === "gogus", onKolYok: sahne === "gogus" });
  const lYuz = dunyaya(lo0, [20, -430]);
  const kam = sahne === "genis" ? { cs: interpolate(p, [0, 78], [1.0, 1.13], { ...cl, easing: ease }), cx: 0, cy: interpolate(p, [0, 78], [30, -8], { ...cl, easing: ease }) }
    : sahne === "insert" ? { cs: 1, cx: 0, cy: K.insTahtaY - tahtaY }
    : sahne === "orta" ? { cs: 1, cx: 0, cy: interpolate(p, [114, 150], [K.insTahtaY, K.ortaTahtaY], { ...cl, easing: Easing.out(Easing.cubic) }) - tahtaY }
    : sahne === "gogus" ? { cs: K.gogusCs, cx: -K.gogusCs * (lYuz[0] - 540), cy: K.gogusYuzY - 960 - K.gogusCs * (lYuz[1] - 960) }
    : { cs: 1.3, cx: 70, cy: -110 };
  const { cs, cx, cy } = kam;
  const kat = (k: number) => `translate(${540 + cx * k},${960 + cy * k}) scale(${1 + (cs - 1) * k}) translate(-540,-960)`;
  const ekran = (q: P): P => [540 + cx + (q[0] - 540) * cs, 960 + cy + (q[1] - 960) * cs];
  const don = interpolate(p, [96, 126], [0, 1], { ...cl, easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const yakinlar = KZ < 0.5; // ana üçlü + pupitr + ön portik yalnız kamera avlunun başındayken (z 1.45 kameranın önünde)

  // ---- ana karakterler (dünya xm, z) ----
  const tY = yer(1.45, -0.95), fY = yer(1.45, -0.25);
  const tuccar = dur(tY.x, tY.y, tY.s * 0.95, 1, { lookX: 0.6, lookY: -0.6 * don, headTilt: -6 * don, agiz: don > 0.5 ? "O" : "gulumse", browF: 0.8 * don, browB: 0.8 * don, shF: 10, elF: -20 });
  const tOmuz = dunyaya(tuccar, [50, -352]);
  const fr0 = dur(fY.x, fY.y, fY.s, -1, { lean: 2, lookX: 0.8, lookY: 0.1, headTilt: 4, agiz: "gulumse", browF: 0.5, browB: 0.4, shB: 10, elB: -24 });
  const fIK = kolIK(fr0, [tOmuz[0], tOmuz[1] + 4], true, [0, -8]);
  const francois: Poz = { ...fr0, shF: fIK.sh, elF: fIK.el };
  const pY = yer(1.47, 0.25), PUP = 300;
  const k = (dx: number, dy: number): P => [pY.zx + dx * pY.s, pY.zy - dy * pY.s]; // pupitr yerel → dünya
  const defterUc: P = [pY.zx + 4 * pY.s, pY.zy - (PUP + 6) * pY.s];
  const lIK = kolIK(lo0, defterUc, true, [6, 10]);
  const lIKb = kolIK(lo0, [defterUc[0] + 40 * lYer.s, defterUc[1] + 4 * lYer.s], false);
  const louis: Poz = { ...lo0, shF: lIK.sh, elF: lIK.el, shB: lIKb.sh, elB: lIKb.el };
  const kalemEl = elDunya(louis, true, [6, 10]);
  const parca = tebesirParca(p);
  const fSapka = ekran(dunyaya(francois, [12, -592])), lSapka = ekran(dunyaya(louis, [12, -604]));
  const etiketCikis = interpolate(p, [42, 50], [0, 1], { ...cl, easing: Easing.in(Easing.quad) });

  // ---- göğüs planı: YAZAN EL (KolEl, çıplak; kaz tüyü başparmak + işaret + orta parmak arasında, ucu kâğıtta) ----
  // Satır: sağ sayfada, p152–188 boyunca ≈ 12 birim (≈ 40 px ekran) ilerler; harf dalgası ± 1.2 birim.
  const yazi = interpolate(p, [152, 188], [0, 1], cl);
  const SATIR = { x0: 10, y: PUP + 1 };
  const nibDunya: P = k(SATIR.x0 + 12 * yazi, SATIR.y + Math.sin(p * 1.7) * 1.2 * (yazi > 0 && yazi < 1 ? 1 : 0));
  const NIB = ekran(nibDunya);
  const EL_OLC = 1.75; // el boyu EL_BOY_YEREL × 1.75 ≈ 245 px (≥ 230)
  const M = 540, mir = (q: P): P => [2 * M - q[0], q[1]];
  const omuz = ekran(govdeNokta(louis, [40, -374]));
  const yazanKol = (() => {
    // aynalı uzayda (Louis sola bakar): el +x yönünde, 28° aşağı; dirsek bilekten aşağı-geri
    const elAci = 28;
    let bilek: P = [mir(NIB)[0] - 214, NIB[1] - 150], dirsek: P = [bilek[0] - 40, bilek[1] + 176];
    for (let i = 0; i < 3; i++) {
      const L = Math.hypot(bilek[0] - dirsek[0], bilek[1] - dirsek[1]);
      const elBilek: P = [bilek[0] + ((bilek[0] - dirsek[0]) / L) * 12, bilek[1] + ((bilek[1] - dirsek[1]) / L) * 12];
      const pin = elMatris(elBilek, elAci, EL_OLC)(KISTIR_YEREL);
      const hedef: P = [mir(NIB)[0] - KAZ_NIB[0] * 1.0, NIB[1] - KAZ_NIB[1] * 1.0];
      const d: P = [hedef[0] - pin[0], hedef[1] - pin[1]];
      bilek = [bilek[0] + d[0], bilek[1] + d[1]]; dirsek = [dirsek[0] + d[0], dirsek[1] + d[1]];
    }
    return { giris: mir(omuz), dirsek, bilek, elAci };
  })();

  const onCephe = (xm: number, hm: number) => nok(ON_Z, xm, hm);
  const arcadeM = (i: number): Esleme => { const x0 = i * AKS - AW / 2; return (u, v) => onCephe(x0 + u * AW, (1 - v) * AH); };
  const kilit: KilitNokta[] = sahne === "gogus"
    ? [{ ad: "Louis yüz (göğüs)", p: ekran(lYuz), tur: "yuz" }, { ad: "kalem ucu (yazan el)", p: NIB, tur: "dokunus" }, { ad: "cep eldiven", p: ekran(govdeNokta(louis, [-40, -318])), tur: "kurulum" }]
    : sahne === "insert" || sahne === "orta"
      ? [{ ad: "tebeşir kırılma", p: ekran(kirilma()), tur: "dokunus" }, ...(parca ? [{ ad: "tebeşir parçası", p: ekran(parca), tur: "temas" as const }] : []), { ad: "PARIS başlığı", p: ekran(nok(ARKA_Z, 0, TAHTA.h1 - 0.34)), tur: "kurulum" }]
      : [
        { ad: "François ayak", p: ekran([fY.zx, fY.zy]), tur: "ayak" }, { ad: "Louis ayak", p: ekran([lYer.zx, lYer.zy]), tur: "ayak" }, { ad: "tüccar ayak", p: ekran([tY.zx, tY.zy]), tur: "ayak" },
        { ad: "tebeşir kırılma", p: ekran(kirilma()), tur: "dokunus" }, { ad: "PARIS başlığı", p: ekran(nok(ARKA_Z, 0, TAHTA.h1 - 0.34)), tur: "kurulum" }, { ad: "Louis defter", p: ekran(defterUc), tur: "kurulum" },
        ...(parca ? [{ ad: "tebeşir parçası", p: ekran(parca), tur: "temas" as const }] : []),
      ];
  const pz0 = parcaDunya(p);
  const parcaPx = pz0 ? pxm(pz0.z) : 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#3a2c1c" }}>
      <ArsivKatmani mod="gunduz">
        <AbsoluteFill>
          <svg width={1080} height={1920} viewBox="0 0 1080 1920">
            <defs><filter id="b2toz" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={sahne === "insert" ? 22 : 14} /></filter>
              <filter id="b2rakam"><feTurbulence type="fractalNoise" baseFrequency="0.18" numOctaves={2} seed={S + 3} /><feDisplacementMap in="SourceGraphic" scale={11} xChannelSelector="R" yChannelSelector="G" /></filter>
              <filter id="b2tebesir"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={1} seed={S} /><feDisplacementMap in="SourceGraphic" scale={2.2} xChannelSelector="R" yChannelSelector="G" /></filter></defs>
            <RenkKaydi>
            <g transform={kat(1)}>
              <KonturTitreme derinlik="orta" seed={S}>
                {/* ===== arka avlu cephesi: üst kat (dikdörtgen pencereler) + korniş + arcade sırası ===== */}
                <polygon points={poly([onCephe(-12, 12), onCephe(12, 12), onCephe(12, 0), onCephe(-12, 0)])} fill={PAL.tas} />
                <TasDuvar m={(u, v) => onCephe(-12 + 24 * u, 12 - 12 * v)} boyut={[2400, 1200]} tip="bdx" taban={PAL.tas} derz={tonla(PAL.tas, -0.34)} seed={S} derinlik="orta" yogunluk={0.5} gozenek={false} blok={[60, 30]} />
                {[-3, -2, -1, 0, 1, 2, 3].map((i) => { const x0 = i * AKS - 0.65; const q = [onCephe(x0, 9.9), onCephe(x0 + 1.3, 9.9), onCephe(x0 + 1.3, 7.7), onCephe(x0, 7.7)]; const s = [onCephe(x0 - 0.15, 10.05), onCephe(x0 + 1.45, 10.05), onCephe(x0 + 1.45, 7.6), onCephe(x0 - 0.15, 7.6)]; return <g key={i}><polygon points={poly(s)} fill={tonla(PAL.tas, 0.05)} stroke={MK} strokeWidth={IC} /><polygon points={poly(q)} fill="#3a3a44" />
                  <Tarama sekil={[onCephe(x0, 9.9), onCephe(x0 + 0.2, 9.75), onCephe(x0 + 0.2, 7.7), onCephe(x0, 7.7)]} basamak="III" aci={TH} renk={MK} seed={S + 70 + i} ton={0.3} />
                  <Tarama sekil={[onCephe(x0, 9.9), onCephe(x0 + 1.3, 9.9), onCephe(x0 + 1.3, 9.72), onCephe(x0 + 0.2, 9.72)]} basamak="IV" aci={TH} renk={MK} seed={S + 80 + i} /><line x1={(q[0][0] + q[1][0]) / 2} y1={q[0][1]} x2={(q[0][0] + q[1][0]) / 2} y2={q[2][1]} stroke={PAL.ahsap} strokeWidth={3} />{[0.33, 0.66].map((t) => <line key={t} x1={q[0][0]} y1={lerp(q[0][1], q[3][1], t)} x2={q[1][0]} y2={lerp(q[0][1], q[3][1], t)} stroke={PAL.ahsap} strokeWidth={2} />)}<polygon points={poly(q)} fill="none" stroke={MK} strokeWidth={IC * 0.8} /></g>; })}
                <polygon points={poly([onCephe(-12, 7.1), onCephe(12, 7.1), onCephe(12, 6.55), onCephe(-12, 6.55)])} fill={tonla(PAL.tas, 0.06)} stroke={MK} strokeWidth={IC} />
                <Tarama sekil={[onCephe(-12, 6.55), onCephe(12, 6.55), onCephe(12, 6.3), onCephe(-12, 6.3)]} basamak="IV" aci={TH} renk={MK} derinlik="orta" seed={S + 1} />
                <polyline points={poly([onCephe(-12, 7.1), onCephe(12, 7.1)])} stroke={MK} strokeWidth={DIS} fill="none" />
                {(() => { const c = onCephe(AKS / 2, 5.4), r = 0.42 * pxm(ON_Z); return <g><circle cx={c[0]} cy={c[1]} r={r} fill="#e9dfc9" stroke={MK} strokeWidth={IC} />{[0, 90, 180, 270].map((a) => <line key={a} x1={c[0]} y1={c[1] - r * 0.8} x2={c[0]} y2={c[1] - r * 0.62} transform={`rotate(${a} ${c[0]} ${c[1]})`} stroke={PAL.tasG} strokeWidth={2} />)}<path d={`M ${c[0]} ${c[1] - r * 0.7} L ${c[0] + 3} ${c[1]} L ${c[0] - 3} ${c[1]} Z`} fill={BL.brass} transform={`rotate(-38 ${c[0]} ${c[1]})`} /></g>; })()}
              </KonturTitreme>
              {[-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((kk) => {
                const xc = kk * AKS, w = 0.35, cik = 0.15, h1 = 6.55, zf = ON_Z - cik;
                if (!gorunur(zf)) return null;
                const on: P[] = [nok(zf, xc - w, h1), nok(zf, xc + w, h1), nok(zf, xc + w, 0), nok(zf, xc - w, 0)];
                const yx = xc > 0 ? xc - w : xc + w;
                const yan: P[] = [onCephe(yx, h1), nok(zf, yx, h1), nok(zf, yx, 0), onCephe(yx, 0)];
                const atilan: P[] = [onCephe(xc - w, h1 - 0.1), onCephe(xc - w - 0.22, h1 - 0.35), onCephe(xc - w - 0.22, 0), onCephe(xc - w, 0)];
                return (
                  <g key={kk}>
                    <Tarama sekil={atilan} basamak="III" aci={TH} renk={MK} seed={S + 90 + kk * 2} ton={0.3} />
                    <polygon points={poly(yan)} fill={xc > 0 ? PAL.tasG : tonla(PAL.tas, 0.06)} stroke={MK} strokeWidth={IC * 0.7} />
                    {xc > 0 && <Tarama sekil={yan} basamak="III" aci={TH} renk={MK} seed={S + 95 + kk * 2} />}
                    <polygon points={poly(on)} fill={tonla(PAL.tas, 0.03)} stroke={MK} strokeWidth={IC} />
                    <polygon points={poly([nok(zf - 0.05, xc - w - 0.08, 6.55), nok(zf - 0.05, xc + w + 0.08, 6.55), nok(zf - 0.05, xc + w + 0.08, 6.3), nok(zf - 0.05, xc - w - 0.08, 6.3)])} fill={tonla(PAL.tas, 0.07)} stroke={MK} strokeWidth={IC * 0.8} />
                  </g>
                );
              })}
              {[-2, -1, 0, 1, 2].map((i) => {
                const m = arcadeM(i);
                const ic = (
                  <g>
                    <polygon points={poly([nok(ARKA_Z, i * AKS - 3, 7), nok(ARKA_Z, i * AKS + 3, 7), nok(ARKA_Z, i * AKS + 3, 0), nok(ARKA_Z, i * AKS - 3, 0)])} fill={tonla(PAL.portik, 0.45)} />
                    <Tarama sekil={[nok(ARKA_Z, i * AKS - 3, 7), nok(ARKA_Z, i * AKS + 3, 7), nok(ARKA_Z, i * AKS + 3, 0), nok(ARKA_Z, i * AKS - 3, 0)]} basamak="II" aci={TH} renk="#1e1810" derinlik="orta" seed={S + 10 + i} />
                    <Tarama sekil={[nok(ARKA_Z, i * AKS - 3, 7), nok(ARKA_Z, i * AKS + 3, 7), nok(ARKA_Z, i * AKS + 3, 4.6), nok(ARKA_Z, i * AKS - 3, 4.6)]} basamak="III" aci={TH} renk="#1e1810" derinlik="orta" seed={S + 15 + i} ton={0.3} />
                    <polygon points={poly([nok(ARKA_Z, i * AKS - 3, 0), nok(ARKA_Z, i * AKS + 3, 0), onCephe(i * AKS + 3, 0), onCephe(i * AKS - 3, 0)])} fill={tonla(PAL.portik, 0.2)} />
                    <Tarama sekil={[nok(ARKA_Z, i * AKS - 3, 0), nok(ARKA_Z, i * AKS + 3, 0), onCephe(i * AKS + 3, 0), onCephe(i * AKS - 3, 0)]} basamak="III" aci={TH} renk="#1e1810" derinlik="orta" seed={S + 25 + i} />
                    <polyline points={poly([nok(ARKA_Z, i * AKS - 3, 0), nok(ARKA_Z, i * AKS + 3, 0)])} stroke={MK_DEMIR} strokeWidth={IC} fill="none" />
                    {i === 0 && <Tahta p={p} />}
                    {i === 0 && <Estrad />}
                    {i === 0 && <Katip p={p} />}
                    {i !== 0 && <Parmaklik q={(xm, hm) => nok(ON_Z + DUVAR_KAL * 0.5, xm, hm)} x0={i * AKS - AW / 2} w={AW} h={4.0} kalin={3} />}
                    <polygon points={poly(kemerCokgen(m, "yarimDaire", AW, AH).filter((q) => q[1] <= onCephe(0, AH - AW / 2)[1] + 1).concat([onCephe(i * AKS + AW / 2, AH - AW / 2), onCephe(i * AKS - AW / 2, AH - AW / 2)]))} fill={tonla(PAL.tas, -0.04)} />
                    <line x1={onCephe(i * AKS - AW / 2, AH - AW / 2)[0]} y1={onCephe(0, AH - AW / 2)[1]} x2={onCephe(i * AKS + AW / 2, AH - AW / 2)[0]} y2={onCephe(0, AH - AW / 2)[1]} stroke={MK_DEMIR} strokeWidth={5} />
                    <Tarama sekil={[onCephe(i * AKS - AW / 2, AH - AW / 2), onCephe(i * AKS + AW / 2, AH - AW / 2), onCephe(i * AKS + AW / 2, AH - AW / 2 - 0.22), onCephe(i * AKS - AW / 2, AH - AW / 2 - 0.22)]} basamak="III" aci={TH} renk="#1e1810" seed={S + 30 + i} ton={0.35} />
                    <Amblem c={onCephe(i * AKS, AH - AW / 2 + 0.85)} s={pxm(ON_Z) / 100} tip={(i + 2) % 4} />
                    {[0.3, 0.42].map((h, j) => <line key={j} x1={onCephe(i * AKS - 0.7 + j * 0.2, AH - AW / 2 + h)[0]} y1={onCephe(0, AH - AW / 2 + h)[1]} x2={onCephe(i * AKS + 0.7 - j * 0.2, AH - AW / 2 + h)[0]} y2={onCephe(0, AH - AW / 2 + h)[1]} stroke={PAL.tasG} strokeWidth={2} />)}
                  </g>
                );
                const on = onCephe(i * AKS, 5), ark = nok(ON_Z + DUVAR_KAL, i * AKS, 5);
                return <Kemer key={i} m={m} W={AW} H={AH} tip="yarimDaire" dolgu={PAL.portik} ic={ic} sove={{ gen: 0.28, renk: tonla(PAL.tas, 0.04) }} kilit={{ renk: PAL.tas }} imposte kontur={IC}
                  icYuz={{ kaydir: [ark[0] - on[0], ark[1] - on[1]], renk: PAL.tasG, basamak: "III", aci: TH, seed: S + 40 + i }} />;
              })}
              <AvluZemin />
              {gorunur(ON_Z) && <>
                <polygon points={poly([zem(ON_Z, -12), zem(ON_Z, 12), [zem(ON_Z, 12)[0] - 160, zem(ON_Z, 12)[1] + 54], [zem(ON_Z, -12)[0] - 160, zem(ON_Z, -12)[1] + 54]])} fill="#6a5030" fillOpacity={0.3} />
                <Tarama sekil={[zem(ON_Z, -12), zem(ON_Z, 12), [zem(ON_Z, 12)[0] - 160, zem(ON_Z, 12)[1] + 54], [zem(ON_Z, -12)[0] - 160, zem(ON_Z, -12)[1] + 54]]} basamak="III" aci={TH} renk={murekkep(PAL.zemin)} derinlik="orta" seed={S + 20} ton={0} />
                <polyline points={poly([[zem(ON_Z, -12)[0] - 160, zem(ON_Z, -12)[1] + 54], [zem(ON_Z, 12)[0] - 160, zem(ON_Z, 12)[1] + 54]])} stroke={murekkep(PAL.zemin)} strokeWidth={2} strokeOpacity={0.6} fill="none" />
              </>}
              {/* tebeşir parçası (DÜNYA ölçüsü 15 × 6.5 cm: insertte ≈ 44 × 19 px, açık renk, koyu kontur) + kırılma tozu (Ø ≈ 0.9 m, güneşte asılı) */}
              {parca && pz0 && <g>
                <ellipse cx={parca[0]} cy={parca[1] + 0.03 * parcaPx} rx={0.08 * parcaPx} ry={0.025 * parcaPx} fill="#3a2c1c" opacity={p >= 114 ? 0.5 : 0.15} />
                <rect x={parca[0] - 0.075 * parcaPx} y={parca[1] - 0.0325 * parcaPx} width={0.15 * parcaPx} height={0.065 * parcaPx} rx={0.02 * parcaPx} fill={BL.tebesir} stroke="#3a2c1c" strokeWidth={Math.max(1.6, 0.012 * parcaPx)} transform={`rotate(${p < 114 ? p * 23 : 14} ${parca[0]} ${parca[1]})`} />
              </g>}
              {p >= 90 && p < 170 && (() => { const t = interpolate(p, [90, 100, 168], [0, 1, 0.4], cl); const K0 = kirilma(), r = pxm(KIR.z); return <g opacity={t}><ellipse cx={K0[0]} cy={K0[1] + 0.05 * r + (p - 90) * 0.002 * r} rx={(0.45 + (p - 90) * 0.003) * r} ry={(0.3 + (p - 90) * 0.0015) * r} fill={BL.tebesir} opacity={0.5} filter="url(#b2toz)" />{Array.from({ length: 26 }).map((_, i) => <circle key={i} cx={K0[0] + (rnd(S, `tx${i}`) - 0.5) * 0.9 * r} cy={K0[1] + (rnd(S, `ty${i}`) - 0.3) * 0.5 * r + (p - 90) * 0.0015 * r} r={(0.004 + rnd(S, `tr${i}`) * 0.008) * r} fill={BL.tebesir} opacity={0.85} />)}</g>; })()}

              {/* ===== kalabalık (avluda; iki tonlu yüzsüz siluet + sıcak kenar); kameranın arkasındakiler çizilmez ===== */}
              {KALABALIK.map(([xm, z], i) => ({ xm, z, i })).filter(({ z }) => gorunur(z)).sort((a, b) => b.z - a.z).map(({ xm, z, i }) => {
                const g = yer(z, xm), f: 1 | -1 = xm < 0 ? 1 : -1, sc = g.s * (0.93 + rnd(S, `k${i}`) * 0.12);
                const pz = dur(g.x, g.y, sc, f, { lookY: -0.8 * don, headTilt: -10 * don, shF: 6 + rnd(S, `a${i}`) * 14, elF: -14 - rnd(S, `b${i}`) * 30 });
                const [kt, a] = ton(z);
                return <g key={i}><Golge isik={GUNES} ayak={[g.zx, g.zy]} h={620 * sc} genislik={100 * sc} alfa={0.35} renk="#4a3418" stil="gravur" seed={S + 200 + i} /><Siluet renk={kt} acik={a} kenar={{ renk: "#fff1c8", dx: 2.5 * sc, dy: -2 * sc }} kutu={[g.x - 120 * sc, g.y - 640 * sc, 240 * sc, 650 * sc]}><Kukla p={KOMPARS[i % 4]} pz={pz} golgesiz /></Siluet></g>;
              })}
              {/* ===== ana karakterler (gölgeler aynı güneşten: kısa, sol-öne). Eldiven (v2.3): François taba, Louis çıplak + cep köşesi ===== */}
              {yakinlar && <>
                <Golge isik={GUNES} ayak={[tY.zx, tY.zy]} h={600 * tY.s} genislik={100 * tY.s} alfa={0.45} renk="#4a3418" stil="gravur" seed={S + 210} />
                <g transform={`translate(${tY.x},${tY.y}) scale(1.12,1) translate(${-tY.x},${-tY.y})`}><Kukla p={TUCCAR_V} pz={tuccar} golgesiz /></g>
                <Golge isik={GUNES} ayak={[fY.zx, fY.zy]} h={620 * fY.s} genislik={100 * fY.s} alfa={0.45} renk="#4a3418" stil="gravur" seed={S + 210} />
                <Kukla p={FRANCOIS_TABA} pz={francois} golgesiz />
                <Golge isik={GUNES} ayak={[lYer.zx, lYer.zy]} h={635 * lYer.s} genislik={100 * lYer.s} alfa={0.45} renk="#4a3418" stil="gravur" seed={S + 210} />
                <Kukla louis p={LOUIS_ELSIZ} pz={louis} golgesiz />
                <Pupitr x={pY.zx} y={pY.zy} s={pY.s} yuz={PUP} yazi={sahne === "gogus" ? yazi : 1} />
                {/* geniş/boy planda tüy rig elinde (kendi başına durmaz) */}
                {sahne !== "gogus" && <g transform={`translate(${kalemEl[0]},${kalemEl[1]}) rotate(-28)`}><path d="M 0 0 L 2 -70 Q 14 -60 10 -20 Z" fill="#e8e0cc" stroke={ink("#e8e0cc")} strokeWidth={1.4} /></g>}
                {sahne !== "gogus" && <CepEldiven pz={louis} kamera={cs} />}
              </>}
            </g>
            {/* ===== göğüs planı: yazan el (ekran px, aynalı: Louis sola bakar) + cep köşesi kolun ÜSTÜNDE değil, kolun açıkta bıraktığı yakın göğüste ===== */}
            {sahne === "gogus" && <g>
              <g transform={`translate(${2 * M},0) scale(-1,1)`}>
                <KolEl giris={yazanKol.giris} dirsek={yazanKol.dirsek} bilek={yazanKol.bilek} gen={[150, 132, 80]} tip="louis" elAci={yazanKol.elAci} olcek={EL_OLC} tutulan={<KazTuyu k={1} />} />
              </g>
              <g transform={kat(1)}><CepEldiven pz={louis} kamera={cs} /></g>
            </g>}
            {/* ===== ön portik çerçevesi (proscenium, paralaks 1.3): yalnız kamera avlunun başındayken ===== */}
            {yakinlar && <g transform={kat(1.3)}>
              <OnPortik />
            </g>}
            </RenkKaydi>
          </svg>
        </AbsoluteFill>
      </ArsivKatmani>
      <FormulYazisi metin="Oyun: Paris'teki tahvil fiyatı" kagitSerit />
      {/* isim etiketleri p0–42 görünür, p42–50 yukarı kayarak maskelenir; tahtanın İKİ YANINDA (François sağ kenar ≤ 380, Louis sol kenar ≥ 720), bağlantı kendi şapkasına */}
      {p < 50 && <AbsoluteFill style={{ clipPath: `inset(0 0 ${1920 - Math.max(fSapka[1], lSapka[1]) + 28}px 0)` }}>
        <AbsoluteFill style={{ transform: `translateY(${-etiketCikis * 220}px)` }}>
          <IsimEtiketi ad="François" sekme="#3c5ea3" x={86} y={fSapka[1] - 150} hedef={[fSapka[0], fSapka[1] - 4]} W={290} altBoyut={25} />
          <IsimEtiketi ad="Louis" sekme="#9a3646" x={1000} y={lSapka[1] - 150} hedef={[lSapka[0], lSapka[1] - 4]} hiza="sag" W={280} altBoyut={25} />
        </AbsoluteFill>
      </AbsoluteFill>}
      {guvenli && <GuvenliAlan noktalar={kilit} aktifBant="ust" baslik={`SB2-BORSA p${p} · ${sahne}`} />}
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
    if (zs[r] - KZ < 0.3) continue; // kameranın arkası / dibi (dolly)
    const o = (r % 2) * 0.6 + (rnd(S, `zo${r}`) - 0.5) * 0.3, x0 = c * 1.2 + o, x1 = x0 + 1.2;
    const q = [zem(zs[r], x0), zem(zs[r], x1), zem(zs[r + 1], x1), zem(zs[r + 1], x0)];
    els.push(<polygon key={`${r}-${c}`} points={poly(q)} fill={tonla(PAL.zemin, (rnd(S, `z${r}-${c}`) - 0.5) * 0.08)} stroke={murekkep(PAL.zemin)} strokeOpacity={0.45} strokeWidth={1.8} />);
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
      {/* tebeşir rafı (tahta altı, 1.70 m; sekme-1 burada): üst yüz + ön kenar */}
      {(() => { const r0 = nok(ARKA_Z - 0.12, TAHTA.xm - 0.05, 1.70), r1 = nok(ARKA_Z - 0.12, TAHTA.xm + TAHTA.w + 0.05, 1.70), b0 = nok(ARKA_Z, TAHTA.xm - 0.05, 1.70), b1 = nok(ARKA_Z, TAHTA.xm + TAHTA.w + 0.05, 1.70), t = 0.05 * pxm(ARKA_Z);
        return <g><polygon points={poly([b0, b1, r1, r0])} fill="#7a5230" stroke={ink("#7a5230")} strokeWidth={1.4} /><rect x={r0[0]} y={r0[1]} width={r1[0] - r0[0]} height={t} fill="#5b3d25" stroke={ink("#5b3d25")} strokeWidth={1.4} /><rect x={lerp(r0[0], r1[0], 0.2)} y={r0[1] - t * 0.5} width={t * 2.4} height={t * 0.5} rx={t * 0.2} fill={BL.tebesir} opacity={0.9} /></g>; })()}
    </g>
  );
};
// estrad: portik eşiğinde iki basamak
const Estrad: React.FC = () => {
  const e = (z: number, h: number, xa: number, xb: number) => [nok(z, xa, h), nok(z, xb, h)];
  const [a1, b1] = e(6.0, 0.18, -1.6, 1.6), [a2, b2] = e(6.0, 0, -1.6, 1.6), [a3, b3] = e(6.2, 0.36, -1.5, 1.5), [a4, b4] = e(6.2, 0.18, -1.5, 1.5);
  return <g><polygon points={poly([a1, b1, b2, a2])} fill="#6e4a2a" stroke={ink("#6e4a2a")} strokeWidth={1.4} /><polygon points={poly([a3, b3, b4, a4])} fill="#7a5230" stroke={ink("#7a5230")} strokeWidth={1.4} /><AhsapYuzey m={(u, v): P => [lerp(a3[0], b3[0], u), lerp(a3[1], nok(6.6, 0, 0.36)[1], v)]} boyut={[300, 30]} tur="mese" seed={S + 4} derinlik="orta" /></g>;
};
// Katip (BC2): koyu siluet DEĞİL — KATIP_ACIK (açık gömlek kolu/manşet, açık kum yelek); kol/el tahtadan ≥ 35 L* açık.
// Tahtanın önündeki ışık sınırı katibi 3 px sıcak kenar ışığıyla ayırır (aynı güneş: üstten-sağdan). Kırılma noktasının SOLUNDA durur.
const KATIP_YER = { z: 6.35, xm: 0.3, h: 0.36 };
const Katip: React.FC<{ p: number }> = ({ p }) => {
  if (!gorunur(KATIP_YER.z)) return null;
  const g = yer(KATIP_YER.z, KATIP_YER.xm, KATIP_YER.h);
  const p0 = dur(g.x, g.y, g.s, 1, { shB: 10, elB: -30, lookY: -0.6, headTilt: -10, lookX: 1, browF: 0.2, agiz: "M" });
  const K0 = kirilma();
  // yazarken el satır boyunca küçük adımlar; p90 kırılmada el kırılma noktasında, p120 sonrası yarım tebeşirle iner
  const in_ = Math.min(1, Math.max(0, (p - 120) / 20));
  const sat = 0.42 * pxm(KIR.z);
  const hedef: P = p < 90 ? [K0[0] - sat + interpolate(p, [30, 88], [0, sat], cl) + Math.sin(p * 0.9) * 0.01 * sat, K0[1] + Math.cos(p * 1.3) * 0.006 * sat] : [K0[0] - 0.05 * sat * in_, K0[1] + 0.3 * sat * in_];
  const ik = kolIK(p0, hedef, true, [6, 10]);
  const pz = { ...p0, shF: ik.sh, elF: ik.el };
  const el = elDunya(pz, true, [6, 10]);
  const L = (p < 90 ? 0.14 : 0.07) * pxm(KATIP_YER.z), tk = 0.03 * pxm(KATIP_YER.z);
  return (
    <g>
      <Siluet renk="#fff1c8" kutu={[g.x - 140 * g.s, g.y - 660 * g.s, 280 * g.s, 680 * g.s]}><g transform="translate(-3,-3)"><Kukla p={KATIP_ACIK} pz={pz} golgesiz /></g></Siluet>
      <Kukla p={KATIP_ACIK} pz={pz} golgesiz />
      {/* tebeşir parmaklar arasında; ucu tahtaya değer (kırılmadan önce tam, sonra yarım) */}
      <g transform={`translate(${el[0]},${el[1]}) rotate(-35)`}><rect x={-tk * 0.3} y={-tk / 2} width={L} height={tk} rx={tk * 0.3} fill={BL.tebesir} stroke="#3a2c1c" strokeWidth={Math.max(1.2, tk * 0.12)} /></g>
    </g>
  );
};
const Pupitr: React.FC<{ x: number; y: number; s: number; yuz: number; yazi?: number }> = ({ x, y, s, yuz, yazi = 1 }) => {
  const k = (dx: number, dy: number): P => [x + dx * s, y - dy * s];
  return (
    <g>
      {[-48, 48].map((dx) => <rect key={dx} x={k(dx, 0)[0] - 4 * s} y={k(0, yuz - 20)[1]} width={8 * s} height={(yuz - 20) * s} fill={PAL.ahsap} />)}
      <polygon points={poly([k(-66, yuz - 22), k(66, yuz - 22), k(60, yuz + 14), k(-60, yuz + 14)])} fill="#5b3d25" stroke={ink("#5b3d25")} strokeWidth={1.6} />
      <polygon points={poly([k(-54, yuz - 16), k(0, yuz - 12), k(0, yuz + 12), k(-50, yuz + 9)])} fill="#efe6d0" stroke="#5a3a22" strokeWidth={1.4} />
      <polygon points={poly([k(0, yuz - 12), k(54, yuz - 16), k(50, yuz + 9), k(0, yuz + 12)])} fill="#e9dfc9" stroke="#5a3a22" strokeWidth={1.4} />
      {[-9, -4, 6].map((d) => <line key={d} x1={k(8, yuz + d)[0]} y1={k(8, yuz + d)[1]} x2={k(44, yuz + d - 2)[0]} y2={k(44, yuz + d - 2)[1]} stroke="#2b1d10" strokeWidth={1} opacity={0.6} />)}
      {/* yazılmakta olan satır (göğüs planında kalem ucuyla birlikte ilerler; ıslak mürekkep koyu) */}
      <polyline points={poly(Array.from({ length: 13 }).map((_, i) => { const t = (i / 12) * yazi; return k(10 + 12 * t, yuz + 1 + Math.sin(t * 40) * 0.6); }))} stroke="#14110d" strokeWidth={Math.max(1.2, 0.9 * s)} fill="none" strokeLinecap="round" />
    </g>
  );
};
// ön portik (kamera onun içinde): arcade ayakları + imposte + kemer başlangıcı, gölgeli zemin, tezgâh, demir kapı kanadı.
// A4: siyah "letterbox" değil MİMARİ: ayak gövdesi gölgede (III, tek yön; büyük alanda çapraz YOK), iç kenarda ışık pahı,
// imposte silmesi + altı gölge, kemer başlangıcı (intrados bandı), zeminde güneş/gölge sınırı + derzler.
const OnPortik: React.FC = () => {
  const ayakR = tonla(PAL.portik, 0.3), zR = tonla(PAL.portik, 0.12), mk = murekkep(PAL.portik);
  const ayak = (a: number, b: number, ic: number, yon: 1 | -1, k: number) => {
    // imposte (y 170–205) + kemer başlangıcı: iç kenardan kadraj tepesine kıvrılan alın + intrados
    const imp = [[ic - yon * 6, 168], [ic + yon * 34, 168], [ic + yon * 34, 206], [ic - yon * 6, 206]] as P[];
    const kemerAlin = `M ${ic} 168 Q ${ic + yon * 30} 40 ${ic + yon * 190} -40 L ${a === -200 ? -200 : 1280} -40 L ${a === -200 ? -200 : 1280} 168 Z`;
    const intrados = `M ${ic} 168 Q ${ic + yon * 30} 40 ${ic + yon * 190} -40 L ${ic + yon * 230} -40 Q ${ic + yon * 62} 50 ${ic + yon * 34} 168 Z`;
    return (
      <g key={k}>
        <rect x={a} y={-300} width={b - a} height={2500} fill={ayakR} />
        <path d={kemerAlin} fill={ayakR} />
        <Tarama sekil={[[a, -300], [b, -300], [b, 2200], [a, 2200]]} basamak="III" aci={TH} renk="#1e1810" derinlik="yakin" seed={S + 51 + k} />
        <path d={intrados} fill={tonla(PAL.portik, 0.05)} stroke={mk} strokeWidth={4} />
        <Tarama sekil={intrados} basamak="IV" aci={TH} renk="#1e1810" derinlik="yakin" seed={S + 55 + k} />
        <polygon points={poly(imp)} fill={tonla(PAL.tasG, -0.1)} stroke={mk} strokeWidth={4} />
        <Tarama sekil={[[ic - yon * 6, 206], [ic + yon * 34, 206], [ic + yon * 34, 222], [ic - yon * 6, 222]]} basamak="IV" aci={TH} renk="#1e1810" derinlik="yakin" seed={S + 57 + k} />
        {/* iç kenar ışık pahı (avlu güneşinin yansıması) + koyu dış siluet */}
        <rect x={yon === 1 ? ic - 12 : ic} y={206} width={12} height={1994} fill={PAL.tasG} />
        <line x1={ic} y1={206} x2={ic} y2={2200} stroke={mk} strokeWidth={6} />
        <line x1={ic - yon * 12} y1={206} x2={ic - yon * 12} y2={2200} stroke={mk} strokeWidth={2} strokeOpacity={0.7} />
      </g>
    );
  };
  return (
    <g>
      {/* portik zemini: gölgede taş (III), güneş sınırı net, derzler kaçış noktasına (540, 800) */}
      <polygon points={poly([[-200, 1560], [1280, 1560], [1280, 2200], [-200, 2200]])} fill={zR} />
      <Tarama sekil={[[-200, 1560], [1280, 1560], [1280, 2200], [-200, 2200]]} basamak="III" aci={TH} renk="#1e1810" derinlik="yakin" seed={S + 50} />
      {[-1000, -480, 30, 540, 1050, 1560, 2080].map((xb) => <line key={xb} x1={540 + (xb - 540) * (760 / 1400)} y1={1560} x2={xb} y2={2200} stroke={mk} strokeWidth={2.4} strokeOpacity={0.55} />)}
      {[1700, 1880].map((y) => <line key={y} x1={-200} y1={y} x2={1280} y2={y} stroke={mk} strokeWidth={2.4} strokeOpacity={0.55} />)}
      <polyline points={poly([[-200, 1556], [1280, 1556]])} stroke="#fff1c8" strokeWidth={5} opacity={0.75} />
      <polyline points={poly([[-200, 1562], [1280, 1562]])} stroke={mk} strokeWidth={3} />
      {ayak(-200, 110, 110, 1, 0)}
      {ayak(970, 1280, 970, -1, 1)}
      {/* BC5: kırpık tüccar tezgâhı KALDIRILDI (amacı okunmuyordu) */}
      {/* sol altta yarı açık dövme demir kapı kanadı (dikey çubuk + mızrak uç + kuşaklar; arcade kapılarıyla aynı dil) */}
      <g stroke={MK_DEMIR} strokeLinecap="round">
        {Array.from({ length: 8 }).map((_, j) => { const x = 80 + j * 26, y0 = 1600 + j * 3.6; return <g key={j}><line x1={x} y1={y0} x2={x} y2={2200} strokeWidth={6} /><polygon points={poly([[x, y0 - 26], [x + 7, y0 - 6], [x, y0 + 2], [x - 7, y0 - 6]])} fill={MK_DEMIR} stroke="none" /></g>; })}
        <line x1={68} y1={1606} x2={276} y2={1631} strokeWidth={9} />
        <line x1={68} y1={1760} x2={276} y2={1785} strokeWidth={8} />
      </g>
    </g>
  );
};
