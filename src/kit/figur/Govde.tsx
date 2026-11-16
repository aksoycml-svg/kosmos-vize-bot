// ===== Figür kiti 3: GÖVDE + tam FİGÜR (iskeletten SVG; Leningrad figür kararı 2026-11-16; yalnız EKLEME) =====
// CLAUDE "Omuz": omuz eklemi gövdenin içinde, boyundan omuz genişliği kadar dışarıda (profilde eksenin biraz arkasında, iskelet.ts);
//   kolun üst ucu yuvarlak OMUZ BAŞLIĞI (deltoid yayı) ile biter, başlık gövde silüetinin parçasıdır; kol gövdeye KAVİSLİ DİKİŞLE bağlanır
//   (dikiş = kol katmanının iç kenarı, kol altından omuz tepesine gövdeye doğru bombeli eğri; düz yatay çizgi yok);
//   kol kalkınca omuz eklemi ve trapez hattı kalkar (iskelet: kalk), 70°'den sonra kol altı kırışığı.
// "Figür ve el": dirsekli kol; el tek parça siluet (lgFigur incElGeo parçaları birleşik dolgu + tek dış kontur; iç dikiş/tırnak yok).
// "Çene–boyun": boyun, kafa geometrisinin baş silüeti İÇİNDEKİ tepe halkasıyla (çene altı, çene açısı arkası, mastoid, ense) dışbükey
//   zarf → yüz + boyun maskesinde delik yok; çene altı gölgesi çizgi değil ten gölgesi alanı (baş silüeti aşağı kaydırılıp boyuna kırpılır).
// Giyim yuvası: katman.{arka, govde, ust, on} render-prop'ları; çapa noktaları iskelet.capalar (omuz, dirsek, kemer, diz).
import React, { useId } from "react";
import { karistir } from "../../doku/sabitler";
import { MurekkepCizgi, murekkepRenk } from "../cizim/MurekkepCizgi";
import { TonTarama } from "../cizim/TonTarama";
import { IncEl, incElGeo, INC_POZ, kapsul } from "../sablonlar/leningrad/lgFigur";
import { daireD, egriD, elipsNokta, profil, Siluet, uzuv, yolD, zarf } from "./geo";
import { aciV, capalar, Capalar, ekle, govdeIzdus, Iskelet, lerp2, P2, Taraf, TARAFLAR, uzak, yonV } from "./iskelet";
import { Kafa, KafaIfade, kafaGeo, kafaMerkezi, KafaPalet, KAFA_PALET_ORNEK, KenarHilal } from "./Kafa";

export type FigurPalet = {
  giysi: string; giysiGolge: string; kol?: string; pantolon: string; pantolonGolge: string; ayakkabi: string;
  ten: string; tenGolge: string; kenar: string; kontur?: string; kafa: KafaPalet;
};
export const FIGUR_PALET_ORNEK: FigurPalet = {
  giysi: "#4a4458", giysiGolge: "#2c2838", pantolon: "#3a3446", pantolonGolge: "#221e2c", ayakkabi: "#2a2224",
  ten: KAFA_PALET_ORNEK.ten, tenGolge: KAFA_PALET_ORNEK.tenGolge, kenar: "#f0c995", kafa: KAFA_PALET_ORNEK,
};

/** gövde kesitleri (B): X yarı genişlik, Zf ön, Zb arka derinlik */
export const KESIT = {
  kolAlti: [0.72, 0.4, 0.32], gogus: [0.72, 0.43, 0.3], gogusAlt: [0.66, 0.42, 0.27], bel: [0.6, 0.4, 0.22],
  kalcaUst: [0.66, 0.38, 0.36], kalca: [0.72, 0.36, 0.46], kasik: [0.6, 0.32, 0.4], boyun: [0.26, 0.24, 0.2],
} as const;
/** palto: kumaş kalınlığı + bolluk; belde hafif daralma, kalçada etek açılması (tur-5: "gövde kutu" düzeltmesi) */
export const KESIT_PALTO = {
  kolAlti: [0.73, 0.45, 0.37], gogus: [0.75, 0.48, 0.35], gogusAlt: [0.71, 0.47, 0.33], bel: [0.66, 0.45, 0.3],
  kalcaUst: [0.77, 0.43, 0.41], kalca: [0.86, 0.42, 0.52], kasik: [0.8, 0.4, 0.47], boyun: [0.26, 0.24, 0.2],
} as const;
const OMUZ_R = 0.245; // deltoid yarıçapı (B)
/** giysi seçenekleri (govdeGeo / Figur) */
export type GiysiAyar = {
  tur?: "ceket" | "palto";
  /** palto boyu: belden etek ucuna (B, kumaş boyu; kalkık uyluğun üstünden dolanır) */
  boy?: number;
  /** kafa ölçeği (baş birimi çarpanı; yakın planda hafif büyük baş okunurluğu) */
  basOlcek?: number;
  /** yüz zayıflığı 0..1 (yanak/çene içe; kafaGeo) */
  zayif?: number;
};

type Fr = { u: P2; r: P2 };
const kesitNokta = (isk: Iskelet, c: P2, fr: Fr, k: readonly number[], n = 20): P2[] =>
  Array.from({ length: n }, (_, i) => { const t = (i / n) * Math.PI * 2, s = Math.sin(t); return govdeIzdus(isk, c, fr, k[0] * Math.cos(t), s * (s > 0 ? k[1] : k[2])); });
const kenarlar = (isk: Iskelet, c: P2, fr: Fr, k: readonly number[]): [P2, P2] => {
  const q = kesitNokta(isk, c, fr, k, 36);
  let a = q[0], b = q[0], la = Infinity, lb = -Infinity;
  for (const p of q) { const l = (p[0] - c[0]) * fr.r[0] + (p[1] - c[1]) * fr.r[1]; if (l < la) { la = l; a = p; } if (l > lb) { lb = l; b = p; } }
  return [a, b];
};

export type KolGeo = { parca: string[]; el: string[]; elBilek: P2; dikis: P2[]; etek: [P2, P2]; koltuk?: P2[]; omuz: P2; T: P2 };
export type BacakGeo = { parca: string[]; ayakkabi: string; paca: [P2, P2] };
export type GovdeGeo = {
  govde: string[]; etek: string; boyun: string;
  /** yaka çizgisi (boyun dibi ön yarısı, U) ve onun üstünde boyunun gövde üzerine çizildiği bölge */
  yaka: P2[]; yakaBolge: string; kol: Record<Taraf, KolGeo>; bacak: Record<Taraf, BacakGeo>;
  kafa: { merkez: P2; H: number; donus: { yaw: number; pitch: number; roll: number }; zayif: number }; capa: Capalar;
  /** palto (tur palto): etek silueti, ön açıklık çizgisi, klapalar (yakın/uzak), atkı (sarma + iki uç) */
  palto?: { etek: string; acik: P2[]; klapa: { d: string; yakin: boolean }[]; atki: { sarma: string; uclar: { d: string; eksen: P2[] }[] }; kivrim: P2[][] };
};

export function govdeGeo(isk: Iskelet, giysi: GiysiAyar = {}): GovdeGeo {
  const B = isk.B, fr = isk.cerceve, palto = giysi.tur === "palto", KS = palto ? KESIT_PALTO : KESIT, zayif = giysi.zayif ?? 0;
  const ust = (c: P2, f: Fr, U: number): P2 => ekle(c, f.u, U * B);
  // ---- kafa (boyun bağlantısı için gerekli) ----
  const donus = isk.bas, H = B * (giysi.basOlcek ?? 1);
  const kMerkez = kafaMerkezi(isk.atlas, H, donus);
  const kg = kafaGeo(kMerkez, H, donus, zayif);
  // ---- gövde ----
  const seviye: [P2, Fr, readonly number[]][] = [
    [ust(isk.gogus, fr.ust, 0.5), fr.ust, KS.kolAlti], [ust(isk.gogus, fr.ust, 0.18), fr.ust, KS.gogus], [ust(isk.gogus, fr.orta, -0.22), fr.orta, KS.gogusAlt],
    [isk.bel, fr.alt, KS.bel], [ust(isk.pelvis, fr.alt, 0.25), fr.alt, KS.kalcaUst], [isk.pelvis, fr.alt, KS.kalca], [ust(isk.pelvis, fr.alt, -0.3), fr.alt, KS.kasik],
  ];
  const kn = seviye.map(([c, f, k]) => kenarlar(isk, c, f, k));
  const sol = kn.map((e) => e[0]), sag = kn.map((e) => e[1]);
  const kasikOrta = ust(isk.pelvis, fr.alt, -0.36);
  const altGovde = egriD([...sol, kasikOrta, ...sag.slice().reverse()]);
  // omuz tepesi (trapez–deltoid buluşması) — kol kalkınca omuz ile kalkar
  const omuzT = (t: Taraf): P2 => {
    const o = isk.kol[t].omuz, l = (o[0] - isk.boyunDip[0]) * fr.ust.r[0] + (o[1] - isk.boyunDip[1]) * fr.ust.r[1];
    return ekle(ekle(o, fr.ust.u, OMUZ_R * (palto ? 0.35 : 0.75) * B), fr.ust.r, Math.sign(l) * Math.min(1, Math.abs(l) / (0.4 * B)) * OMUZ_R * 0.1 * B);
  };
  const boyunAlt = kesitNokta(isk, ust(isk.boyunDip, fr.boyun, 0.25), fr.boyun, KESIT.boyun, 14);
  // omuz hattı gövde silüetinin parçası: trapez tepesi (T) + omuz dış yuvarlağı (eklemden dışa .85·r) zarfta → top/top-yastık yok
  const omuzDis = (t: Taraf): P2[] => {
    const o = isk.kol[t].omuz, dx = o[0] - isk.boyunDip[0], dy = o[1] - isk.boyunDip[1], l = Math.hypot(dx, dy) || 1;
    return [ekle(o, [dx / l, dy / l], OMUZ_R * 0.85 * B), ekle(ekle(o, [dx / l, dy / l], OMUZ_R * 0.6 * B), fr.ust.u, OMUZ_R * 0.55 * B)];
  };
  const ustGovde = egriD(zarf([...kesitNokta(isk, seviye[0][0], fr.ust, KS.kolAlti, 24), ...boyunAlt, omuzT("sol"), omuzT("sag"), ...omuzDis("sol"), ...omuzDis("sag")]));
  // boyun: tepe halkası baş silüetinin içinde; dip yaka U'sunun altına iner (yaka içinde gövde rengi şeridi kalmaz)
  const boyun = egriD(zarf([...boyunAlt, ...kesitNokta(isk, ust(isk.boyunDip, fr.boyun, -0.12), fr.boyun, KESIT.boyun, 14), ...kg.boyunUst]));
  // yaka: boyun dibi halkası; yanlar C7 + .22, ön (göğüs çentiği) C7 − .05, arka C7 + .1 → önden U, profilde öne inen eğri
  const yakaH = (th: number) => { const s = Math.sin(th); return s > 0 ? 0.22 - 0.27 * s ** 1.5 : 0.22 - 0.12 * -s; };
  const yaka: P2[] = Array.from({ length: 13 }, (_, i) => { const th = (i / 12) * Math.PI; return govdeIzdus(isk, isk.boyunDip, fr.boyun, KESIT.boyun[0] * Math.cos(th), KESIT.boyun[1] * Math.sin(th), yakaH(th)); });
  const yUp = (p: P2): P2 => ekle(p, fr.boyun.u, 3 * B);
  const yakaBolge = yolD([yUp(yaka[0]), ...yaka, yUp(yaka[yaka.length - 1])]);
  const govde = [altGovde, ustGovde];
  // ceket eteği bölgesi (belden kasığa): öndeki bacak bunun ARKASINDA kalır (etek uyluğun üstünü örter; diz gövdenin önünde)
  const etek = egriD([...sol.slice(3), kasikOrta, ...sag.slice(3).reverse()]);
  // ---- kollar ----
  const gMerkez = ust(isk.gogus, fr.ust, 0.3);
  const kolGeo = (t: Taraf): KolGeo => {
    const k = isk.kol[t], S = k.omuz, E = k.dirsek, W = k.bilek, L1 = Math.hypot(E[0] - S[0], E[1] - S[1]);
    const a = yonV(aciV(S, E));
    let nOut: P2 = [-a[1], a[0]];
    const dd = (S[0] - gMerkez[0]) * nOut[0] + (S[1] - gMerkez[1]) * nOut[1];
    if (dd < 0) nOut = [-nOut[0], -nOut[1]];
    const nIn: P2 = [-nOut[0], -nOut[1]];
    const rd = OMUZ_R * (palto ? 0.8 : 1) * B, rU = profil([[0, 0.205], [0.3, 0.205], [0.62, 0.19], [1, 0.168]]);
    const T = omuzT(t);
    // omuz başlığı yayı: T → dış yan (nIn'den uzak yoldan)
    const aT = aciV(S, T), aO = aciV(S, ekle(S, nOut));
    let dl = ((aO - aT + 540) % 360) - 180;
    const orta = yonV(aT + dl / 2);
    if (orta[0] * nIn[0] + orta[1] * nIn[1] > 0.2) dl -= 360 * Math.sign(dl);
    // yarıçap T'de |T−S|'den başlar, yumuşakça deltoid yarıçapına açılır (omuz tepesinde basamak yok)
    const dT = Math.hypot(T[0] - S[0], T[1] - S[1]);
    const yay: P2[] = Array.from({ length: 10 }, (_, i) => { const e = Math.min(1, i / 4), r0 = dT + (rd - dT) * e * e * (3 - 2 * e); return ekle(S, yonV(aT + (dl * i) / 9), r0 * (1 - 0.05 * Math.sin((Math.PI * i) / 9))); });
    const S2 = ekle(S, a, 0.2 * L1);
    const disU = ekle(S2, nOut, rU(0.2) * B), Q = ekle(S2, nIn, rU(0.2) * B);
    const ktrl = ekle(S, nIn, rd * 0.55);
    const dikis: P2[] = Array.from({ length: 9 }, (_, i) => { const tt = i / 8, u = 1 - tt; return [u * u * Q[0] + 2 * u * tt * ktrl[0] + tt * tt * T[0], u * u * Q[1] + 2 * u * tt * ktrl[1] + tt * tt * T[1]] as P2; });
    // deltoidden üst kola yumuşak geçiş (kademe yok): yay ucu → 0.1·L1'de ara nokta → 0.2·L1
    const ara = ekle(ekle(S, a, 0.1 * L1), nOut, (rd + rU(0.2) * B) / 2 * 0.98);
    const baslik = egriD([...yay, ara, disU, ...dikis.slice(0, -1)]);
    const ustKol = yolD(uzuv(S2, E, (tt) => rU(0.2 + 0.8 * tt) * B));
    const dirsek = daireD(E, 0.168 * B);
    const L2 = Math.hypot(W[0] - E[0], W[1] - E[1]), b = yonV(aciV(E, W));
    const W2 = ekle(W, b, 0.05 * B);
    const rF = profil([[0, 0.168], [0.28, 0.178], [1, 0.128]]);
    const onKol = yolD(uzuv(E, W2, (tt) => rF(tt) * B, undefined, 12));
    void L2;
    // el (lgFigur incElGeo; E birimi = bilek → orta parmak ucu)
    const elBilek = ekle(W, b, -0.02 * B);
    const eg = incElGeo(elBilek, k.elAci, 0.68 * B, INC_POZ[k.el], k.elAyna);
    const parca = (p: { q: P2[]; w: number[] }) => p.q.slice(0, -1).map((q, j) => kapsul(q, p.q[j + 1], p.w[j], p.w[j + 1]));
    const el = [eg.avuc, ...parca(eg.bas), ...eg.parmak.flatMap(parca)];
    const bn: P2 = [-b[1], b[0]];
    const etek: [P2, P2] = [ekle(W2, bn, 0.128 * B), ekle(W2, bn, -0.128 * B)];
    // kol altı kırışığı (kol 70°+ kalkınca)
    const koltuk = k.kalk > 0.15 ? [ekle(Q, a, -0.05 * B), ekle(ekle(Q, nIn, 0.12 * B), a, -0.18 * B)] : undefined;
    return { parca: [baslik, ustKol, dirsek, onKol], el, elBilek, dikis, etek, koltuk, omuz: S, T };
  };
  // ---- bacaklar ----
  const bacakGeo = (t: Taraf): BacakGeo => {
    const g = isk.bacak[t], K = g.kalca, D = g.diz, A = g.bilek;
    const rT = profil([[0, 0.36], [0.55, 0.31], [1, 0.25]]), rS = profil([[0, 0.245], [0.35, 0.25], [1, 0.205]]);
    const uyluk = yolD(uzuv(K, D, (tt) => rT(tt) * B));
    const diz = daireD(D, 0.245 * B);
    const b = yonV(aciV(D, A)), A2 = ekle(A, b, 0.06 * B);
    const baldir = yolD(uzuv(D, A2, (tt) => rS(tt) * B));
    const f = yonV(g.ayakAci), tb: P2 = [-f[1] * isk.yon, f[0] * isk.yon];
    const ay = (x: number, y: number): P2 => ekle(ekle(A, f, x * B), tb, y * B);
    const ayakkabi = egriD([ay(-0.24, 0.02), ay(-0.28, 0.18), ay(-0.21, 0.3), ay(0.3, 0.31), ay(0.62, 0.3), ay(0.82, 0.27), ay(0.86, 0.19), ay(0.76, 0.1), ay(0.42, 0.02), ay(0.12, -0.09), ay(-0.12, -0.09)]);
    const bn: P2 = [-b[1], b[0]];
    return { parca: [uyluk, diz, baldir], ayakkabi, paca: [ekle(A2, bn, 0.205 * B), ekle(A2, bn, -0.205 * B)] };
  };
  // ---- palto: etek (kumaş boyu kalkık uyluğun üstünden dolanır, kalanı yerçekimiyle dik düşer), ön açıklık, klapalar, atkı ----
  let paltoGeo: GovdeGeo["palto"];
  if (palto) {
    const Lc = (giysi.boy ?? 2.5) * B;
    const kemerP = [sol[3], sag[3], sol[4], sag[4]].map((p) => p);
    const kalcaDis = [sol[5], sag[5]].map((p) => { const dx = p[0] - isk.pelvis[0], l = Math.abs(dx) || 1; return [p[0] + (dx / l) * 0.1 * B, p[1] + 0.05 * B] as P2; });
    const nokta: P2[] = [...kemerP, ...kalcaDis];
    const etekUc: P2[] = [];
    for (const t of TARAFLAR) {
      const b = isk.bacak[t], K = b.kalca, D = b.diz, Ldiz = uzak(K, D);
      // uyluk üstü (bacağın yukarı normali) — kumaş uyluk boyunca en çok %60'a kadar dolanır (diz ve el açıkta kalır)
      const yatik = Math.abs(D[1] - K[1]) < 0.6 * Ldiz;
      const tMax = yatik ? 0.36 : 1; // kalkık uylukta kumaş yalnız kalça yanını örter: diz ve el paltonun önünde açıkta
      const a = yonV(aciV(K, D)); let n: P2 = [a[1], -a[0]]; if (n[1] > 0) n = [-n[0], -n[1]];
      if (yatik) for (const tt of [0.2, 0.4, tMax]) nokta.push(ekle(lerp2(K, D, tt), n, 0.38 * B));
      const uc = lerp2(K, D, tMax), kalan = Math.max(0.35 * B, Lc - Ldiz * tMax);
      const alt: P2 = [uc[0] + a[0] * 0.08 * B, Math.min(uc[1] + kalan, (isk.zemin ?? 1e9) - 0.04 * B)];
      etekUc.push(alt, [alt[0] - Math.sign(a[0] || 1) * 0.34 * B, alt[1] + 0.02 * B]);
    }
    const h = zarf([...nokta, ...etekUc]);
    // etek ucu düzensiz (seed'siz deterministik dalga): alt kenar noktalarına küçük kıvrım
    const yMax = Math.max(...h.map((p) => p[1]));
    const etekD = egriD(h.flatMap((p, i) => { const q = h[(i + 1) % h.length]; const alt = p[1] > yMax - 0.5 * B && q[1] > yMax - 0.5 * B; if (!alt) return [p]; const m: P2 = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2 + 0.05 * B * ((i % 2) ? 1 : -0.6)]; return [p, m]; }));
    // ön açıklık: göğüs çentiğinden (yakın yarıya kaymış) etek ucuna
    const onX = 0.06 * isk.yon;
    const acik: P2[] = [govdeIzdus(isk, isk.gogus, fr.ust, onX, 0.46, 0.1), govdeIzdus(isk, isk.bel, fr.alt, onX, 0.46, 0), govdeIzdus(isk, isk.pelvis, fr.alt, onX * 1.4, 0.44, 0), [isk.pelvis[0] + isk.yon * 0.12 * B, yMax - 0.04 * B]];
    // klapalar (çentikli yaka): boyun dibi yan → çentik → klapa ucu (göğüs) → V
    const klapa = ([1, -1] as const).map((sx) => {
      const P = (X: number, Z: number, U: number) => govdeIzdus(isk, isk.boyunDip, fr.ust, sx * X, Z, U);
      const q: P2[] = [P(0.25, 0.16, 0.18), P(0.44, 0.22, -0.06), P(0.37, 0.3, -0.17), P(0.52, 0.27, -0.27), P(0.2, 0.46, -0.82), P(0.05, 0.48, -0.9), P(0.16, 0.36, -0.2)];
      const yakin = (isk.yon > 0 ? -1 : 1) * sx > 0; // yakın taraf: yon>0 → kişinin sağı (X −)
      return { d: egriD(q), yakin };
    });
    // atkı: boynu saran kat (iki kat binişli) + önde iki uç (biri ötekinin üstünde, 0.35 → 0.27 B daralır)
    const R = (U: number, n = 9) => Array.from({ length: n }, (_, i) => { const th = (i / (n - 1)) * Math.PI; return govdeIzdus(isk, isk.boyunDip, fr.boyun, 0.36 * Math.cos(th), 0.34 * Math.sin(th), U); });
    const sarma = egriD([...R(0.24).map((p, i) => ekle(p, fr.boyun.u, (i % 3 === 1 ? 0.03 : 0) * B)), ...R(0.0).reverse()]);
    const uclar = ([[-0.08, 1.75, 0.18], [0.12, 1.45, 0.3]] as const).map(([X, Lu, Zk]) => {
      const a0 = govdeIzdus(isk, isk.boyunDip, fr.ust, X, 0.44, -0.02), a1 = govdeIzdus(isk, isk.gogus, fr.orta, X + 0.04, 0.48 + Zk * 0.1, 0.3 - Lu + 0.9);
      const eksen: P2[] = [a0, lerp2(a0, a1, 0.5), a1];
      const d = yonV(aciV(a0, a1)), nn: P2 = [-d[1], d[0]], w0 = 0.175 * B, w1 = 0.14 * B;
      const pus: P2[] = Array.from({ length: 9 }, (_, i) => ekle(ekle(a1, nn, w1 - (2 * w1 * i) / 8), d, (i % 2 ? 0.07 : 0) * B));
      return { d: yolD([ekle(a0, nn, w0), ekle(eksen[1], nn, (w0 + w1) / 2), ...pus, ekle(eksen[1], nn, -(w0 + w1) / 2), ekle(a0, nn, -w0)]), eksen };
    });
    // kumaş kıvrımları: belden etek ucuna yerçekimi kıvrımları (3) + kalkık dizden kalçaya gerilim kıvrımı (2)
    const kivrim: P2[][] = [];
    [-0.42, -0.1, 0.3].forEach((X, i) => { const a = govdeIzdus(isk, isk.pelvis, fr.alt, X, 0.4, 0.1 + 0.08 * i); kivrim.push([a, [a[0] + 0.03 * B * (i - 1), a[1] + 0.7 * B], [a[0] + 0.02 * B * i, Math.min(yMax - 0.15 * B, a[1] + (1.2 + 0.25 * i) * B)]]); });
    for (const t of TARAFLAR) { const b = isk.bacak[t]; if (Math.abs(b.diz[1] - b.kalca[1]) < 0.6 * uzak(b.kalca, b.diz)) { const D = lerp2(b.kalca, b.diz, 0.55); kivrim.push([[D[0], D[1] - 0.3 * B], lerp2([D[0], D[1] - 0.3 * B], isk.pelvis, 0.5), [isk.pelvis[0], isk.pelvis[1] - 0.2 * B]]); kivrim.push([[D[0], D[1] - 0.1 * B], lerp2([D[0], D[1] - 0.1 * B], isk.pelvis, 0.55), [isk.pelvis[0] + 0.1 * B, isk.pelvis[1] + 0.05 * B]]); } }
    paltoGeo = { etek: etekD, acik, klapa, atki: { sarma, uclar }, kivrim };
  }
  return {
    govde, etek, boyun, yaka, yakaBolge, kol: { sol: kolGeo("sol"), sag: kolGeo("sag") }, bacak: { sol: bacakGeo("sol"), sag: bacakGeo("sag") },
    kafa: { merkez: kMerkez, H, donus, zayif }, capa: capalar(isk), palto: paltoGeo,
  };
}

export type FigurKatman = Partial<Record<"arka" | "govde" | "ust" | "on", (c: Capalar, geo: GovdeGeo) => React.ReactNode>>;
export type FigurProps = {
  isk: Iskelet; P?: FigurPalet; ifade?: KafaIfade;
  /** ışığın EKRANDA gittiği yön (kit sözleşmesi) */
  isik?: P2;
  katman?: FigurKatman;
  /** gölge yanı gravür taraması (TonTarama) */
  tarama?: boolean;
  /** kenar ışığını sahne ışık çokgeniyle kırp (src/kit/isik IsikClip id) */
  isikClipId?: string;
  seed?: number;
  /** temas gölgesi rengi (zemin verilmiş iskelette) */
  temasRenk?: string;
  /** giysi (palto: bel/kalça silueti + etek + klapa + atkı + kumaş kıvrımı), baş ölçeği, yüz zayıflığı */
  giysi?: GiysiAyar;
  /** palto/atkı renkleri (giysi.tur palto) */
  atkiRenk?: string;
  /** palto eteğinin ÖNÜNDE çizilen bacaklar (kameraya doğru kalkık diz: kumaş açılır, uyluk önde) */
  paltoOnunde?: Taraf[];
  /** yalnız bu kolu çiz (sahnede araya giren nesnenin ÖNÜNE düşen kol: ör. örtünün üstüne konan el; aynı iskelet, aynı tanımlar) */
  sadeceKol?: Taraf;
};

export const Figur: React.FC<FigurProps> = ({ isk, P = FIGUR_PALET_ORNEK, ifade, isik = [0.75, 0.66], katman, tarama = true, isikClipId, seed = 101, temasRenk = "#1e171c", giysi = {}, atkiRenk = "#5a4a52", paltoOnunde = [], sadeceKol }) => {
  const uid = "fg" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const g = govdeGeo(isk, { ...giysi, zayif: giysi.zayif ?? ifade?.zayif }), B = isk.B;
  const il = Math.hypot(isik[0], isik[1]) || 1, lx = isik[0] / il, ly = isik[1] / il;
  const kontur = (dolgu: string) => P.kontur ?? murekkepRenk(dolgu, 0.74);
  const KA = { isik: [lx, ly] as P2, kalinlik: [Math.max(1.1, 0.007 * B), Math.min(7, Math.max(2.6, 0.022 * B))] as [number, number], kayip: 0.5 };
  const kolRenk = P.kol ?? P.giysi;
  const golgeK = 0.11 * B, kenarK = 0.025 * B;
  const Hacim = ({ d, golge, ton, s }: { d: string[]; golge: string; ton?: boolean; s: number }) => (
    <g>
      <KenarHilal d={d} renk={golge} dx={-lx * golgeK} dy={-ly * golgeK} alfa={0.85} />
      {tarama && ton && <TonTarama d={d} isik={[lx, ly]} ton={0.8} renk={murekkepRenk(golge, 0.5)} seed={seed + s} aralik={Math.min(8, Math.max(4.5, 0.045 * B))} kalinlik={Math.min(2.4, Math.max(1.3, 0.014 * B))} gecis={[0.15, 0.95]} alfa={0.55} />}
      <g clipPath={isikClipId ? `url(#${isikClipId})` : undefined}><KenarHilal d={d} renk={P.kenar} dx={lx * kenarK} dy={ly * kenarK} alfa={0.55} /></g>
    </g>
  );
  const Kol = ({ t }: { t: Taraf }) => {
    const k = g.kol[t], ki = isk.kol[t];
    // dirsek kıvrımları (tur-5: "kol tüp"): bükülmenin iç yanında, dirsek çapasından 4 kısa kavisli mürekkep (üst kol 2 + ön kol 2)
    const a = yonV(aciV(ki.omuz, ki.dirsek)), b = yonV(aciV(ki.dirsek, ki.bilek)), cz = a[0] * b[1] - a[1] * b[0];
    const bukum = Math.abs(aciV(ki.omuz, ki.dirsek) - aciV(ki.dirsek, ki.bilek)) % 360;
    const nA: P2 = [-a[1] * Math.sign(cz || 1), a[0] * Math.sign(cz || 1)], nB: P2 = [-b[1] * Math.sign(cz || 1), b[0] * Math.sign(cz || 1)];
    const kiv: P2[][] = Math.min(bukum, 360 - bukum) > 18 ? [
      ...[0.16, 0.34].map((f, i) => { const c = ekle(ki.dirsek, a, -f * B); return [ekle(c, nA, 0.19 * B), ekle(ekle(c, nA, 0.06 * B), a, 0.05 * B), ekle(ekle(c, nA, -(0.04 + 0.03 * i) * B), a, 0.02 * B)]; }),
      ...[0.14, 0.3].map((f, i) => { const c = ekle(ki.dirsek, b, f * B); return [ekle(c, nB, 0.17 * B), ekle(ekle(c, nB, 0.05 * B), b, -0.05 * B), ekle(ekle(c, nB, -(0.03 + 0.03 * i) * B), b, -0.02 * B)]; }),
    ] : [];
    const kenarYon: P2 = [-lx, -ly];
    return (
      <g>
        {/* el: parmaklı tek siluet + öndeki parmağın ince ayrım konturu (lgFigur IncEl; eldiven okunmasın) — kol ağzının ALTINDA */}
        <IncEl bilek={k.elBilek} aci={ki.elAci} E={0.68 * B} poz={INC_POZ[ki.el]} ayna={ki.elAyna} ten={P.ten} golge={P.tenGolge} kontur={kontur(P.ten)} kenar={P.kenar} isik={kenarYon} murekkep={{ ton: 0.6, seed: seed + (t === "sol" ? 21 : 22) }} />
        {/* omuz bölgesinde gövde üstüne düşen kontur maskelenir; dikiş ayrıca ince ve kavisli çizilir (bant gibi kalın kenar yok) */}
        <Siluet d={k.parca} dolgu={kolRenk} kontur={kontur(kolRenk)} ayar={{ ...KA, seed: seed + (t === "sol" ? 3 : 4) }} konturMaske={`${uid}om${t}`} />
        <Hacim d={k.parca} golge={P.giysiGolge} ton s={t === "sol" ? 5 : 6} />
        {kiv.map((q, i) => <MurekkepCizgi key={i} q={q} egri renk={kontur(kolRenk)} alfa={0.85} kalinlik={Math.max(1.6, 0.02 * B)} ucBas={0.04 * B} ucSon={0.07 * B} seed={seed + 70 + i} />)}
        {/* kol ağzı (manşet kenarı) — elin üstündeki tek gerçek kenar */}
        <MurekkepCizgi q={[k.etek[0], [(k.etek[0][0] + k.etek[1][0]) / 2, (k.etek[0][1] + k.etek[1][1]) / 2], k.etek[1]]} renk={kontur(kolRenk)} kalinlik={KA.kalinlik[1] * 0.8} ucBas={2} ucSon={2} seed={seed + 7} />
        <MurekkepCizgi q={k.dikis} egri renk={karistir(kontur(kolRenk), kolRenk, 0.35)} kalinlik={KA.kalinlik[1] * 0.55} ucBas={0.25 * B} ucSon={0.06 * B} seed={seed + 9} />
        {k.koltuk && <MurekkepCizgi q={k.koltuk} egri renk={P.giysiGolge} alfa={0.6} kalinlik={0.022 * B} seed={seed + 8} />}
      </g>
    );
  };
  const Bacak = ({ t, maske }: { t: Taraf; maske?: string }) => {
    const b = g.bacak[t];
    return (
      <g mask={maske ? `url(#${maske})` : undefined}>
        <Siluet d={[b.ayakkabi, ...b.parca]} dolgu={[P.ayakkabi, ...b.parca.map(() => P.pantolon)]} kontur={kontur(P.pantolon)} ayar={{ ...KA, seed: seed + (t === "sol" ? 13 : 14) }} />
        <Hacim d={b.parca} golge={P.pantolonGolge} ton s={t === "sol" ? 15 : 16} />
        <MurekkepCizgi q={[b.paca[0], b.paca[1]]} renk={kontur(P.pantolon)} kalinlik={KA.kalinlik[1] * 0.7} ucBas={2} ucSon={2} seed={seed + 17} />
      </g>
    );
  };
  const temas = TARAFLAR.flatMap((t) => isk.bacak[t].temas);
  const zemin = isk.zemin;
  const tanim = (
      <defs>
        <filter id={`${uid}bl`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={0.02 * B} /></filter>
        <clipPath id={`${uid}by`}><path d={g.boyun} /></clipPath>
        <clipPath id={`${uid}yk`}><path d={g.yakaBolge} /></clipPath>
        <clipPath id={`${uid}gv`}>{g.govde.map((d, i) => <path key={i} d={d} />)}</clipPath>
        {/* öndeki bacak: ceket eteğinin arkasında */}
        <mask id={`${uid}etek`} maskUnits="userSpaceOnUse" x={-4000} y={-4000} width={9000} height={9000}>
          <rect x={-4000} y={-4000} width={9000} height={9000} fill="#fff" /><path d={g.etek} fill="#000" />
        </mask>
        {/* gövde konturu: arkadaki kolun omuz başlığında yok → omuz silüeti kesintisiz deltoid yayı */}
        <mask id={`${uid}gk`} maskUnits="userSpaceOnUse" x={-4000} y={-4000} width={9000} height={9000}>
          <rect x={-4000} y={-4000} width={9000} height={9000} fill="#fff" />
          {TARAFLAR.filter((t) => !isk.kol[t].onde).map((t) => <circle key={t} cx={isk.kol[t].omuz[0]} cy={isk.kol[t].omuz[1]} r={OMUZ_R * 1.05 * B} fill="#000" />)}
        </mask>
        {/* kol konturu: omuz çevresinde gövdenin içine düşen kısım yok (dikiş ayrıca) */}
        {TARAFLAR.map((t) => (
          <mask key={t} id={`${uid}om${t}`} maskUnits="userSpaceOnUse" x={-4000} y={-4000} width={9000} height={9000}>
            <rect x={-4000} y={-4000} width={9000} height={9000} fill="#fff" />
            <g clipPath={`url(#${uid}gv)`}><circle cx={isk.kol[t].omuz[0]} cy={isk.kol[t].omuz[1]} r={0.62 * B} fill="#000" /></g>
          </mask>
        ))}
      </defs>);
  if (sadeceKol) return <g>{tanim}<Kol t={sadeceKol} /></g>;
  return (
    <g>
      {tanim}
      {/* temas gölgesi: zemine değen her noktada koyu, dar leke (ışığın tersine hafif uzanır) */}
      {zemin !== undefined && temas.map((p, i) => (
        <g key={i}>
          <ellipse cx={p[0] + lx * 0.12 * B} cy={zemin + 0.01 * B} rx={0.42 * B} ry={0.07 * B} fill={temasRenk} opacity={0.28} filter={`url(#${uid}bl)`} />
          <ellipse cx={p[0]} cy={zemin} rx={0.2 * B} ry={0.03 * B} fill={temasRenk} opacity={0.6} />
        </g>
      ))}
      {katman?.arka?.(g.capa, g)}
      {TARAFLAR.filter((t) => !isk.bacak[t].onde && !paltoOnunde.includes(t)).map((t) => <Bacak key={t} t={t} />)}
      {TARAFLAR.filter((t) => !isk.kol[t].onde).map((t) => <Kol key={t} t={t} />)}
      {/* boyun: gövdenin ARKASINDA (yaka/trapez hattı boynun dibini örter); tepesi baş silüetinin içinde → delik yok */}
      <Siluet d={[g.boyun]} dolgu={P.ten} kontur={kontur(P.ten)} ayar={{ ...KA, seed: seed + 2 }} />
      <g clipPath={`url(#${uid}by)`}>
        {/* çene altı: baş silüetinin boyuna düşen gölgesi (ton alanı, çizgi değil) + boyun gölge yanı */}
        <KenarHilal d={[g.boyun]} renk={P.tenGolge} dx={-lx * 0.1 * B} dy={-ly * 0.1 * B} alfa={0.7} />
        <g transform={`translate(${lx * 0.03 * B} ${0.085 * B})`} filter={`url(#${uid}bl)`}>{kafaGeo(g.kafa.merkez, g.kafa.H, g.kafa.donus, g.kafa.zayif).parcalar.map((d, i) => <path key={i} d={d} fill={P.tenGolge} opacity={0.75} />)}</g>
      </g>
      <Siluet d={g.govde} dolgu={P.giysi} kontur={kontur(P.giysi)} ayar={{ ...KA, seed: seed + 1 }} konturMaske={`${uid}gk`} />
      <g mask={`url(#${uid}gk)`}><Hacim d={g.govde} golge={P.giysiGolge} ton s={1} /></g>
      {/* boynun gövde üstündeki kısmı (yaka U'sunun üstü): boyun gövdeye dikişsiz iner; yaka kenarı tek kumaş kenarı */}
      <g clipPath={`url(#${uid}yk)`}>
        <Siluet d={[g.boyun]} dolgu={P.ten} kontur={kontur(P.ten)} ayar={{ ...KA, seed: seed + 2 }} />
        <g clipPath={`url(#${uid}by)`}>
          <KenarHilal d={[g.boyun]} renk={P.tenGolge} dx={-lx * 0.1 * B} dy={-ly * 0.1 * B} alfa={0.7} />
          <g transform={`translate(${lx * 0.03 * B} ${0.085 * B})`} filter={`url(#${uid}bl)`}>{kafaGeo(g.kafa.merkez, g.kafa.H, g.kafa.donus, g.kafa.zayif).parcalar.map((d, i) => <path key={i} d={d} fill={P.tenGolge} opacity={0.75} />)}</g>
        </g>
      </g>
      <MurekkepCizgi q={g.yaka} egri renk={kontur(P.giysi)} kalinlik={KA.kalinlik[1] * 0.75} ucBas={0.08 * B} ucSon={0.08 * B} seed={seed + 19} />
      {g.palto && <PaltoUst g={g} P={P} KA={KA} atkiRenk={atkiRenk} lx={lx} ly={ly} B={B} seed={seed} isikClipId={isikClipId} />}
      {katman?.govde?.(g.capa, g)}
      <Kafa merkez={g.kafa.merkez} H={g.kafa.H} donus={g.kafa.donus} ifade={ifade} P={P.kafa} isik={isik} boyunD={g.boyun} isikClipId={isikClipId} seed={seed + 30} />
      {TARAFLAR.filter((t) => isk.bacak[t].onde && !paltoOnunde.includes(t)).map((t) => <Bacak key={t} t={t} maske={`${uid}etek`} />)}
      {g.palto && <PaltoEtek g={g} P={P} KA={KA} lx={lx} ly={ly} B={B} seed={seed} tarama={tarama} isikClipId={isikClipId} />}
      {paltoOnunde.map((t) => <Bacak key={`po${t}`} t={t} />)}
      {katman?.ust?.(g.capa, g)}
      {TARAFLAR.filter((t) => isk.kol[t].onde).sort((a, b) => Number(isk.kol[a].yakin) - Number(isk.kol[b].yakin)).map((t) => <Kol key={t} t={t} />)}
      {katman?.on?.(g.capa, g)}
    </g>
  );
};

type PaltoP = { g: GovdeGeo; P: FigurPalet; KA: { isik: P2; kalinlik: [number, number]; kayip: number }; lx: number; ly: number; B: number; seed: number; isikClipId?: string };
/** palto eteği: belden yere/dizden düşen kumaş; gölge yanı TonTarama (kumaş boyunca), yerçekimi + gerilim kıvrımları ince mürekkep */
const PaltoEtek: React.FC<PaltoP & { tarama: boolean }> = ({ g, P, KA, lx, ly, B, seed, tarama, isikClipId }) => {
  const pg = g.palto!, kontur = P.kontur ?? murekkepRenk(P.giysi, 0.74);
  // etek gövdeyle tek kumaş: bel hattının üstünde kontur yok (kemer/dikiş çizgisi okunmasın)
  const belY = Math.max(g.capa.kemer.sol[1], g.capa.kemer.sag[1]) + 0.35 * B;
  return <g>
    <defs><mask id={"pk" + seed} maskUnits="userSpaceOnUse" x={-4000} y={-4000} width={9000} height={9000}><rect x={-4000} y={belY} width={9000} height={9000} fill="#fff" /></mask></defs>
    <Siluet d={[pg.etek]} dolgu={P.giysi} kontur={kontur} ayar={{ ...KA, seed: seed + 81 }} konturMaske={"pk" + seed} />
    <g mask={`url(#${"pk" + seed})`}><KenarHilal d={[pg.etek]} renk={P.giysiGolge} dx={-lx * 0.16 * B} dy={-ly * 0.16 * B} alfa={0.85} /></g>
    {tarama && <TonTarama d={pg.etek} isik={[lx, ly]} ton={0.85} renk={murekkepRenk(P.giysiGolge, 0.5)} seed={seed + 82} mod="egri" eksen={pg.kivrim[1]} aralik={Math.max(4.5, 0.03 * B)} kalinlik={Math.min(2.4, Math.max(1.4, 0.013 * B))} gecis={[-0.1, 0.9]} alfa={0.6} />}
    <g clipPath={`url(#${"pe" + seed})`}>
      <defs><clipPath id={"pe" + seed}><path d={pg.etek} /></clipPath></defs>
      {pg.kivrim.map((q, i) => <g key={i}>
        <path d={egriD([...q.map((p) => [p[0] + 0.03 * B, p[1]] as P2), ...q.slice().reverse().map((p) => [p[0] - 0.03 * B, p[1]] as P2)])} fill={P.giysiGolge} opacity={0.45} />
        <MurekkepCizgi q={q} egri renk={kontur} alfa={0.8} kalinlik={Math.max(1.6, 0.018 * B)} ucBas={0.08 * B} ucSon={0.2 * B} seed={seed + 83 + i} />
      </g>)}
      <MurekkepCizgi q={pg.acik.slice(2)} egri renk={kontur} kalinlik={Math.max(2, 0.022 * B)} ucBas={0.05 * B} ucSon={0.1 * B} seed={seed + 89} />
    </g>
    <g clipPath={isikClipId ? `url(#${isikClipId})` : undefined}><g mask={`url(#${"pk" + seed})`}><KenarHilal d={[pg.etek]} renk={P.kenar} dx={lx * 0.03 * B} dy={ly * 0.03 * B} alfa={0.5} /></g></g>
  </g>;
};
/** palto üst: ön açıklık, çentikli klapalar (yakın önde), atkı (sarma + iki uç, kaburga örgü çizgisi, püskül) */
const PaltoUst: React.FC<PaltoP & { atkiRenk: string }> = ({ g, P, KA, lx, ly, B, seed, atkiRenk, isikClipId }) => {
  const pg = g.palto!, kontur = P.kontur ?? murekkepRenk(P.giysi, 0.74), ak = murekkepRenk(atkiRenk, 0.6);
  const klapa = pg.klapa.slice().sort((a, b) => Number(a.yakin) - Number(b.yakin));
  return <g>
    {/* göğüste V: kazak (koyu) */}
    <MurekkepCizgi q={pg.acik.slice(0, 3)} egri renk={kontur} kalinlik={Math.max(2, 0.022 * B)} ucBas={0.05 * B} ucSon={0.05 * B} seed={seed + 90} />
    {pg.atki.uclar.map((u, i) => <g key={`u${i}`}>
      <Siluet d={[u.d]} dolgu={i ? atkiRenk : karistir(atkiRenk, "#000", 0.18)} kontur={ak} ayar={{ ...KA, kalinlik: [KA.kalinlik[0], KA.kalinlik[1] * 0.8], seed: seed + 91 + i }} />
      {[-0.09, -0.03, 0.03, 0.09].map((o, j) => { const d = yonV(aciV(u.eksen[0], u.eksen[2])), n: P2 = [-d[1], d[0]]; return <MurekkepCizgi key={j} q={u.eksen.map((p, m) => ekle(p, n, o * B * (1 - 0.2 * m)))} egri renk={ak} alfa={0.5} kalinlik={Math.max(1.3, 0.011 * B)} ucBas={4} ucSon={4} seed={seed + 93 + j + i * 7} />; })}
      <KenarHilal d={[u.d]} renk={ak} dx={-lx * 0.07 * B} dy={-ly * 0.07 * B} alfa={0.6} />
    </g>)}
    {klapa.map((k, i) => <g key={i}>
      <Siluet d={[k.d]} dolgu={k.yakin ? P.giysi : P.giysiGolge} kontur={kontur} ayar={{ ...KA, seed: seed + 96 + i }} />
      <KenarHilal d={[k.d]} renk={P.giysiGolge} dx={-lx * 0.06 * B} dy={-ly * 0.06 * B} alfa={0.7} />
      <g clipPath={isikClipId ? `url(#${isikClipId})` : undefined}><KenarHilal d={[k.d]} renk={P.kenar} dx={lx * 0.025 * B} dy={ly * 0.025 * B} alfa={0.6} /></g>
    </g>)}
    {/* sarma: boynu saran kat, sarma yönünde 3 kıvrım */}
    <Siluet d={[pg.atki.sarma]} dolgu={atkiRenk} kontur={ak} ayar={{ ...KA, seed: seed + 99 }} />
    <g clipPath={`url(#${"pa" + seed})`}>
      <defs><clipPath id={"pa" + seed}><path d={pg.atki.sarma} /></clipPath></defs>
      {/* örgü: sarma boyunca kaburga çizgileri (dikey kısa) + iki katın binişi */}
      {Array.from({ length: 14 }, (_, i) => { const x = g.capa.boyun[0] - 0.42 * B + (i / 13) * 0.84 * B, y = g.capa.boyun[1] - 0.45 * B; return <MurekkepCizgi key={i} q={[[x, y], [x + 0.01 * B, y + 0.3 * B], [x - 0.01 * B, y + 0.6 * B]]} egri renk={ak} alfa={0.45} kalinlik={Math.max(1.2, 0.011 * B)} ucBas={3} ucSon={3} seed={seed + 120 + i} />; })}
      <MurekkepCizgi q={[[g.capa.boyun[0] - 0.4 * B, g.capa.boyun[1] - 0.18 * B], [g.capa.boyun[0], g.capa.boyun[1] - 0.1 * B], [g.capa.boyun[0] + 0.4 * B, g.capa.boyun[1] - 0.2 * B]]} egri renk={ak} kalinlik={Math.max(2, 0.02 * B)} seed={seed + 140} />
    </g>
    <KenarHilal d={[pg.atki.sarma]} renk={ak} dx={-lx * 0.09 * B} dy={-ly * 0.09 * B} alfa={0.65} />
    <g clipPath={isikClipId ? `url(#${isikClipId})` : undefined}><KenarHilal d={[pg.atki.sarma]} renk={karistir(atkiRenk, P.kenar, 0.55)} dx={lx * 0.04 * B} dy={ly * 0.04 * B} alfa={0.8} /></g>
  </g>;
};

/** Hata ayıklama: iskelet kemikleri + çapalar (kalibrasyon karesi için) */
export const IskeletCiz: React.FC<{ isk: Iskelet; renk?: string }> = ({ isk, renk = "#c0392b" }) => {
  const c = (p: P2, r = 5) => <circle cx={p[0]} cy={p[1]} r={r} fill={renk} />;
  const ln = (q: P2[], k: string) => <polyline key={k} points={q.map((p) => p.join(",")).join(" ")} fill="none" stroke={renk} strokeWidth={3} opacity={0.8} />;
  return <g>
    {ln([isk.pelvis, isk.bel, isk.gogus, isk.boyunDip, isk.atlas], "o")}
    {TARAFLAR.map((t) => ln([isk.boyunDip, isk.kol[t].omuz, isk.kol[t].dirsek, isk.kol[t].bilek, isk.kol[t].elUc], `k${t}`))}
    {TARAFLAR.map((t) => ln([isk.pelvis, isk.bacak[t].kalca, isk.bacak[t].diz, isk.bacak[t].bilek, isk.bacak[t].ayakUc], `b${t}`))}
    {[isk.pelvis, isk.bel, isk.gogus, isk.boyunDip, isk.atlas, ...TARAFLAR.flatMap((t) => [isk.kol[t].omuz, isk.kol[t].dirsek, isk.kol[t].bilek, isk.bacak[t].kalca, isk.bacak[t].diz, isk.bacak[t].bilek])].map((p, i) => <g key={i}>{c(p)}</g>)}
  </g>;
};
export { karistir, elipsNokta };
