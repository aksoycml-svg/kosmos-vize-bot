// ===== Sinan Paşa (İncili) Köşkü — mekanlar.md §1.1 mimari kart =====
// Tek geometri METRE cinsinden; görünümler ölçek (px/m) ve konumla çağırır (kıyı 17 px/m, köşk 85 px/m).
// Orijin = su çizgisi, gövde ortası; +y aşağı. Kat düzeni [T]: rıhtım 1.0 m · altyapı 5.0 m (çifte kemer + çeşme) · ana kat 5.0 m ·
// örtü 2.4 m (basık piramit-kubbe arası nötr siluet, alem yok) · bacalar korniş +2.0 m (dört köşe, kare kesit, taş başlık).
// Gövde 11.1 m. Cumba 5.6 m, 3 pencere (orta = padişah penceresi), saçak 1.2 m taşar. Kemer tipi `osmanli` (Kemer.tsx).
// Kitabe, çini, kalem işi, arma, kafes, cam YOK (kanıtsız → nötr). Gece cephe düz iki ton, tarama yok (§0.5).
import React from "react";
import { kemerEgri } from "../../../doku/Kemer";
import { ink, karistir, poly, P } from "../../../doku/sabitler";

export const KOSK_M = {
  gen: 11.1, rihtim: 1.0, altyapi: 5.0, anaKat: 5.0, ortu: 2.4, sacakTasma: 0.6, plato: 3.0,
  baca: 1.6, bacaGen: 0.8, bacaBaslik: 1.2, bacaBaslikH: 0.15, bacaOnX: 4.53, bacaArkaX: 3.35, bacaArkaYukari: 0.3,
  kemerW: 2.8, kemerH: 4.0, kemerX: 3.0, cesmeW: 0.8, cesmeH: 1.5,
  cumbaW: 5.6, cumbaH: 4.0, sacak: 1.2, sacakKalin: 0.45, cumbaPenW: 1.0, cumbaPenH: 1.4, cumbaPenY: 2.0, cumbaPenX: 1.9,
  penW: 1.0, penH: 1.6, penY: 1.1, penX: 4.47,
};

export type KoskSaat = "gece" | "gun";
const RENK = {
  gece: { cephe: "#4e4a46", rihtim: "#55545a", kemerIc: "#1e1c22", pencere: "#2a2830", isik: "#f2c070", isikKenar: "#ffd890", cumba: "#3a2a1e", cumbaKoyu: "#2a1e16", ortu: "#3a3e46", sacak: "#2a2830", baca: "#46423e", basamak: "#4a4950" },
  gun: { cephe: "#b4a88e", rihtim: "#a09682", kemerIc: "#3a3430", pencere: "#3a3430", isik: "#3a3430", isikKenar: "#3a3430", cumba: "#6a4a30", cumbaKoyu: "#3a2a1e", ortu: "#7c8288", sacak: "#3a2a1e", baca: "#9e9380", basamak: "#a09682" },
};

// mekanlar §1.1 (R1, K1 O1): örtü KESİK KIRMA PİRAMİT (düz kenar, 0.6 m saçak, 3.0 m düz plato, alem yok) — kubbe değil.
// Bacalar 0.8 × 0.8 m küt, çatı yüzeyini delerek çıkar, tepeleri korniş +1.6 m (plato altında), düz başlık plakası 1.2 × 0.15 m.
// Arka çift ≥ 18 px (kıyı) içeride: dört baca ayrı görünür. Pencere: hale YOK; düz dolgu + iç açık kenar + yalnız altına 2 basamaklı havuz (§1.2a).
// basamak: köşk rıhtımından denize inen basamaklar {x: [x0, x1] dekor px, adim} (P06 kapanışında ıslak el tutunur).
export const SinanPasaKosk: React.FC<{ x: number; suY: number; pxm: number; saat?: KoskSaat; pencereIsik?: boolean; kontur?: number; basamak?: { x: [number, number]; adim: number } }> = ({ x, suY, pxm, saat = "gece", pencereIsik = true, kontur = 3, basamak }) => {
  const R = RENK[saat], M = KOSK_M;
  const X = (m: number) => x + m * pxm, Y = (m: number) => suY - m * pxm; // m: su çizgisinden yükseklik
  const k = (c: string) => ({ stroke: ink(c), strokeWidth: kontur, strokeLinejoin: "round" as const });
  const zeminUst = M.rihtim, katAlt = M.rihtim + M.altyapi, kornis = katAlt + M.anaKat, sirt = kornis + M.ortu;
  const g2 = M.gen / 2, t2 = g2 + M.sacakTasma, p2 = M.plato / 2;
  const kemer = (cx: number, W: number, H: number, taban: number): P[] => {
    const e = kemerEgri("osmanli", W, H);
    const pts: P[] = [[X(cx - W / 2), Y(taban)]];
    for (let i = 0; i <= 16; i++) { const u = i / 16; pts.push([X(cx - W / 2 + u * W), Y(taban + e(u))]); }
    pts.push([X(cx + W / 2), Y(taban)]);
    return pts;
  };
  const ortu: P[] = [[X(-t2), Y(kornis)], [X(-p2), Y(sirt)], [X(p2), Y(sirt)], [X(t2), Y(kornis)]];
  // örtü kenarının yüksekliği (baca tabanı çatı yüzeyinde)
  const catiY = (m: number) => kornis + M.ortu * Math.max(0, Math.min(1, (t2 - Math.abs(m)) / (t2 - p2)));
  const baca = (cx: number, arka: boolean) => {
    const w = M.bacaGen * pxm, tepe = kornis + M.baca + (arka ? M.bacaArkaYukari : 0), taban = catiY(cx) - (arka ? 0 : 0.35);
    const c = arka ? karistir(R.baca, R.kemerIc, 0.35) : R.baca;
    const bw = M.bacaBaslik * pxm, bh = Math.max(2, M.bacaBaslikH * pxm);
    return (
      <g key={`${cx}${arka}`}>
        <rect x={X(cx) - w / 2} y={Y(tepe)} width={w} height={Math.max(2, (tepe - taban) * pxm)} fill={c} {...k(R.baca)} strokeWidth={Math.max(1, kontur * 0.6)} />
        <line x1={X(cx) - w / 2} y1={Y((tepe + taban) / 2)} x2={X(cx) + w / 2} y2={Y((tepe + taban) / 2)} stroke={ink(R.baca)} strokeWidth={Math.max(0.8, kontur * 0.35)} />
        <rect x={X(cx) - bw / 2} y={Y(tepe) - bh} width={bw} height={bh} fill={c} {...k(R.baca)} strokeWidth={Math.max(0.8, kontur * 0.5)} />
      </g>
    );
  };
  const cumbaUst = katAlt + M.cumbaH;
  const pen = { x: X(-M.cumbaPenW / 2), y: Y(katAlt + M.cumbaPenY + M.cumbaPenH), w: M.cumbaPenW * pxm, h: M.cumbaPenH * pxm };
  return (
    <g>
      {/* örtü (kesik kırma piramit, düz kenar) + arka/ön bacalar çatıdan çıkar */}
      <polygon points={poly(ortu)} fill={R.ortu} {...k(R.ortu)} />
      {[-M.bacaArkaX, M.bacaArkaX].map((cx) => baca(cx, true))}
      {[-M.bacaOnX, M.bacaOnX].map((cx) => baca(cx, false))}
      {/* ana kat gövdesi + altyapı */}
      <rect x={X(-g2)} y={Y(kornis)} width={M.gen * pxm} height={M.anaKat * pxm} fill={R.cephe} {...k(R.cephe)} />
      <rect x={X(-g2)} y={Y(katAlt)} width={M.gen * pxm} height={M.altyapi * pxm} fill={R.cephe} {...k(R.cephe)} />
      {/* boydan boya koyu saçak bandı (imza 2): ana saçak, dekor ≥ 8 px */}
      <rect x={X(-t2)} y={Y(kornis)} width={2 * t2 * pxm} height={Math.max(8, 0.47 * pxm)} fill={R.sacak} />
      <line x1={X(-g2)} y1={Y(katAlt)} x2={X(g2)} y2={Y(katAlt)} stroke={ink(R.cephe)} strokeWidth={kontur * 0.8} />
      {/* çifte kemer + çeşme nişi + yalak */}
      {[-M.kemerX, M.kemerX].map((cx) => <polygon key={cx} points={poly(kemer(cx, M.kemerW, M.kemerH, zeminUst))} fill={R.kemerIc} {...k(R.cephe)} />)}
      <polygon points={poly(kemer(0, M.cesmeW, M.cesmeH, zeminUst + 0.5))} fill={R.kemerIc} />
      <rect x={X(-M.cesmeW / 2 - 0.1)} y={Y(zeminUst + 0.5)} width={(M.cesmeW + 0.2) * pxm} height={Math.max(1.5, 0.15 * pxm)} fill={R.cephe} stroke={ink(R.cephe)} strokeWidth={kontur * 0.5} />
      {[-M.penX, M.penX].map((cx) => <rect key={cx} x={X(cx - M.penW / 2)} y={Y(katAlt + M.penY + M.penH)} width={M.penW * pxm} height={M.penH * pxm} fill={R.pencere} />)}
      {/* cumba */}
      <rect x={X(-M.cumbaW / 2)} y={Y(cumbaUst)} width={M.cumbaW * pxm} height={M.cumbaH * pxm} fill={R.cumba} {...k(R.cumba)} />
      <rect x={X(-M.cumbaW / 2 - 0.1)} y={Y(katAlt + 0.1)} width={(M.cumbaW + 0.2) * pxm} height={Math.max(2, 0.25 * pxm)} fill={R.cumbaKoyu} />
      {[-M.cumbaPenX, M.cumbaPenX].map((cx) => <rect key={cx} x={X(cx - M.cumbaPenW / 2)} y={pen.y} width={pen.w} height={pen.h} fill={R.pencere} />)}
      {pencereIsik ? <g>
        {/* §1.2a: pencerenin altına basık yarım elips havuz, 2 düz basamak (gradyan/hale yok); üstüne ve yanına ışık düşmez */}
        <path d={`M ${X(0) - pen.w * 1.92} ${pen.y + pen.h} A ${pen.w * 1.92} ${pen.h * 0.5} 0 0 0 ${X(0) + pen.w * 1.92} ${pen.y + pen.h} Z`} fill={R.isik} opacity={0.08} />
        <path d={`M ${X(0) - pen.w * 1.2} ${pen.y + pen.h} A ${pen.w * 1.2} ${pen.h * 0.5} 0 0 0 ${X(0) + pen.w * 1.2} ${pen.y + pen.h} Z`} fill={R.isik} opacity={0.2} />
        <rect x={pen.x} y={pen.y} width={pen.w} height={pen.h} fill={R.isikKenar} />
        <rect x={pen.x + pen.w * 0.15} y={pen.y + pen.w * 0.15} width={pen.w * 0.7} height={pen.h - pen.w * 0.3} fill={R.isik} />
      </g> : <rect x={pen.x} y={pen.y} width={pen.w} height={pen.h} fill={R.pencere} />}
      <rect x={X(-M.cumbaW / 2 - M.sacak)} y={Y(cumbaUst + M.sacakKalin)} width={(M.cumbaW + 2 * M.sacak) * pxm} height={Math.max(2.5, M.sacakKalin * pxm)} fill={R.sacak} {...k(R.sacak)} strokeWidth={kontur * 0.6} />
      {/* rıhtım şeridi (köşk önü, 1 m) */}
      <rect x={X(-g2 - 0.6)} y={Y(zeminUst)} width={(M.gen + 1.2) * pxm} height={zeminUst * pxm} fill={R.rihtim} />
      {/* basamaklar: rıhtım üstünden suya inen `adim` basamak (her biri 1/adim m), ön yüz koyu, üst yüz açık */}
      {basamak && Array.from({ length: basamak.adim }).map((_, i) => {
        const h = M.rihtim / basamak.adim, bx0 = basamak.x[0] + (i * (basamak.x[1] - basamak.x[0])) / (2 * basamak.adim), bx1 = basamak.x[1] - (i * (basamak.x[1] - basamak.x[0])) / (2 * basamak.adim);
        const ust = Y(zeminUst - i * h), on = Math.max(1.5, h * pxm);
        return <g key={`b${i}`}><rect x={bx0} y={ust} width={bx1 - bx0} height={Math.max(1, on * 0.3)} fill={karistir(R.basamak, "#c8c8cc", 0.15)} /><rect x={bx0} y={ust + on * 0.3} width={bx1 - bx0} height={on * 0.7} fill={R.basamak} stroke={ink(R.basamak)} strokeWidth={Math.max(0.6, kontur * 0.3)} /></g>;
      })}
    </g>
  );
};

// Padişah penceresinin dekor noktası (yansıma kolonu için) ve basamak tutunma noktası
export const koskPencere = (x: number, suY: number, pxm: number): P => [x, suY - (KOSK_M.rihtim + KOSK_M.altyapi + KOSK_M.cumbaPenY + KOSK_M.cumbaPenH / 2) * pxm];
