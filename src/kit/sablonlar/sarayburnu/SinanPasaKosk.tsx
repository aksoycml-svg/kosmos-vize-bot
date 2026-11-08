// ===== Sinan Paşa (İncili) Köşkü — mekanlar.md §1.1 mimari kart =====
// Tek geometri METRE cinsinden; görünümler ölçek (px/m) ve konumla çağırır (kıyı 17 px/m, köşk 85 px/m).
// Orijin = su çizgisi, gövde ortası; +y aşağı. Kat düzeni [T]: rıhtım 1.0 m · altyapı 5.0 m (çifte kemer + çeşme) · ana kat 5.0 m ·
// örtü 2.4 m (basık piramit-kubbe arası nötr siluet, alem yok) · bacalar korniş +2.0 m (dört köşe, kare kesit, taş başlık).
// Gövde 11.1 m. Cumba 5.6 m, 3 pencere (orta = padişah penceresi), saçak 1.2 m taşar. Kemer tipi `osmanli` (Kemer.tsx).
// Kitabe, çini, kalem işi, arma, kafes, cam YOK (kanıtsız → nötr). Gece cephe düz iki ton, tarama yok (§0.5).
import React from "react";
import { kemerEgri } from "../../../doku/Kemer";
import { ink, poly, P } from "../../../doku/sabitler";

export const KOSK_M = {
  gen: 11.1, rihtim: 1.0, altyapi: 5.0, anaKat: 5.0, ortu: 2.4, baca: 2.0, bacaGen: 0.6,
  kemerW: 2.8, kemerH: 4.0, kemerX: 3.0, cesmeW: 0.8, cesmeH: 1.5,
  cumbaW: 5.6, cumbaH: 4.0, sacak: 1.2, sacakKalin: 0.45, cumbaPenW: 1.0, cumbaPenH: 1.4, cumbaPenY: 2.0, cumbaPenX: 1.9,
  penW: 1.0, penH: 1.6, penY: 1.1, penX: 4.47, ortuYari: 3.88,
};

export type KoskSaat = "gece" | "gun";
const RENK = {
  gece: { cephe: "#4e4a46", cepheIsik: "#8a7458", rihtim: "#55545a", kemerIc: "#1e1c22", pencere: "#2a2830", isik: "#f2c070", cumba: "#3a2a1e", cumbaKoyu: "#2a1e16", ortu: "#3c4046", baca: "#46423e" },
  gun: { cephe: "#b4a88e", cepheIsik: "#b4a88e", rihtim: "#a09682", kemerIc: "#3a3430", pencere: "#3a3430", isik: "#3a3430", cumba: "#6a4a30", cumbaKoyu: "#3a2a1e", ortu: "#7c8288", baca: "#9e9380" },
};

// pencereIsik: orta cumba penceresi içten ışıklı (gece) — tek ışıklı pencere = tek göz
export const SinanPasaKosk: React.FC<{ x: number; suY: number; pxm: number; saat?: KoskSaat; pencereIsik?: boolean; kontur?: number }> = ({ x, suY, pxm, saat = "gece", pencereIsik = true, kontur = 3 }) => {
  const R = RENK[saat], M = KOSK_M;
  const X = (m: number) => x + m * pxm, Y = (m: number) => suY - m * pxm; // m: su çizgisinden yükseklik
  const k = (c: string) => ({ stroke: ink(c), strokeWidth: kontur, strokeLinejoin: "round" as const });
  const zeminUst = M.rihtim, katAlt = M.rihtim + M.altyapi, korniş = katAlt + M.anaKat, sirt = korniş + M.ortu;
  const g2 = M.gen / 2;
  // osmanlı kemer ağzı (metre → px)
  const kemer = (cx: number, W: number, H: number, taban: number): P[] => {
    const e = kemerEgri("osmanli", W, H);
    const pts: P[] = [[X(cx - W / 2), Y(taban)]];
    for (let i = 0; i <= 16; i++) { const u = i / 16; pts.push([X(cx - W / 2 + u * W), Y(taban + e(u))]); }
    pts.push([X(cx + W / 2), Y(taban)]);
    return pts;
  };
  // örtü: basık, hafif şişkin (kenarlar dışbükey), yükseklik/genişlik ≈ 0.31
  const ortu = `M ${X(-M.ortuYari)} ${Y(korniş)} Q ${X(-M.ortuYari * 0.62)} ${Y(korniş + M.ortu * 0.78)} ${X(0)} ${Y(sirt)} Q ${X(M.ortuYari * 0.62)} ${Y(korniş + M.ortu * 0.78)} ${X(M.ortuYari)} ${Y(korniş)} Z`;
  const baca = (cx: number, dx: number, dy: number, arka: boolean) => {
    const w = M.bacaGen * pxm, h = M.baca * pxm, x0 = X(cx) - w / 2 + dx, y1 = Y(korniş) - dy, y0 = y1 - h;
    const c = arka ? R.kemerIc : R.baca;
    return (
      <g key={`${cx}${arka}`}>
        <rect x={x0} y={y0} width={w} height={h} fill={c} {...k(R.baca)} strokeWidth={Math.max(1, kontur * 0.6)} />
        {/* taş başlık (dışa taşar) + küçük piramit kapak — silindir değil, kum tonunda değil */}
        <rect x={x0 - w * 0.18} y={y0 - h * 0.1} width={w * 1.36} height={h * 0.1} fill={c} />
        <polygon points={poly([[x0 - w * 0.1, y0 - h * 0.1], [x0 + w / 2, y0 - h * 0.22], [x0 + w * 1.1, y0 - h * 0.1]])} fill={c} />
      </g>
    );
  };
  const cumbaUst = katAlt + M.cumbaH;
  return (
    <g>
      {/* arka bacalar (6 px içeride, 4 px yukarıda @17 px/m) örtünün arkasında */}
      {[-(g2 - 0.3), g2 - 0.3].map((cx) => baca(cx, (cx < 0 ? 1 : -1) * 0.35 * pxm, 0.24 * pxm, true))}
      {/* örtü (yalnız sırt silueti görünür; alçak kamera) */}
      <path d={ortu} fill={R.ortu} {...k(R.ortu)} />
      {/* ana kat gövdesi + altyapı */}
      <rect x={X(-g2)} y={Y(korniş)} width={M.gen * pxm} height={M.anaKat * pxm} fill={R.cephe} {...k(R.cephe)} />
      <rect x={X(-g2)} y={Y(katAlt)} width={M.gen * pxm} height={M.altyapi * pxm} fill={R.cephe} {...k(R.cephe)} />
      {/* korniş + kat silmesi (tek çizgi) */}
      <line x1={X(-g2 - 0.2)} y1={Y(korniş)} x2={X(g2 + 0.2)} y2={Y(korniş)} stroke={ink(R.cephe)} strokeWidth={kontur * 1.2} />
      <line x1={X(-g2)} y1={Y(katAlt)} x2={X(g2)} y2={Y(katAlt)} stroke={ink(R.cephe)} strokeWidth={kontur * 0.8} />
      {/* ön bacalar (köşelerde) */}
      {[-(g2 - 0.3), g2 - 0.3].map((cx) => baca(cx, 0, 0, false))}
      {/* çifte kemer (denize bakan) + aradaki çeşme nişi + yalak */}
      {[-M.kemerX, M.kemerX].map((cx) => <polygon key={cx} points={poly(kemer(cx, M.kemerW, M.kemerH, zeminUst))} fill={R.kemerIc} {...k(R.cephe)} />)}
      <polygon points={poly(kemer(0, M.cesmeW, M.cesmeH, zeminUst + 0.5))} fill={R.kemerIc} />
      <rect x={X(-M.cesmeW / 2 - 0.1)} y={Y(zeminUst + 0.5)} width={(M.cesmeW + 0.2) * pxm} height={Math.max(1.5, 0.15 * pxm)} fill={R.cephe} stroke={ink(R.cephe)} strokeWidth={kontur * 0.5} />
      {/* ana kat pencereleri (cumba dışında kalanlar), içi koyu — cam/kafes yok */}
      {[-M.penX, M.penX].map((cx) => <rect key={cx} x={X(cx - M.penW / 2)} y={Y(katAlt + M.penY + M.penH)} width={M.penW * pxm} height={M.penH * pxm} fill={R.pencere} />)}
      {/* cumba: ahşap gövde + taşıyıcı kiriş + 3 pencere; saçak altı derin gölge (imza 2) */}
      <rect x={X(-M.cumbaW / 2)} y={Y(cumbaUst)} width={M.cumbaW * pxm} height={M.cumbaH * pxm} fill={R.cumba} {...k(R.cumba)} />
      <rect x={X(-M.cumbaW / 2 - 0.1)} y={Y(katAlt + 0.1)} width={(M.cumbaW + 0.2) * pxm} height={Math.max(2, 0.25 * pxm)} fill={R.cumbaKoyu} />
      {[-M.cumbaPenX, 0, M.cumbaPenX].map((cx) => (
        <rect key={cx} x={X(cx - M.cumbaPenW / 2)} y={Y(katAlt + M.cumbaPenY + M.cumbaPenH)} width={M.cumbaPenW * pxm} height={M.cumbaPenH * pxm}
          fill={cx === 0 && pencereIsik ? R.isik : R.pencere} />
      ))}
      <rect x={X(-M.cumbaW / 2 - M.sacak)} y={Y(cumbaUst + M.sacakKalin)} width={(M.cumbaW + 2 * M.sacak) * pxm} height={Math.max(2.5, M.sacakKalin * pxm)} fill={R.cumbaKoyu} {...k(R.cumbaKoyu)} strokeWidth={kontur * 0.6} />
      {/* rıhtım şeridi (köşk önü, 1 m) */}
      <rect x={X(-g2 - 0.6)} y={Y(zeminUst)} width={(M.gen + 1.2) * pxm} height={zeminUst * pxm} fill={R.rihtim} />
    </g>
  );
};

// Padişah penceresinin dekor noktası (ışık kaynağı/yansıma kolonu için)
export const koskPencere = (x: number, suY: number, pxm: number): P => [x, suY - (KOSK_M.rihtim + KOSK_M.altyapi + KOSK_M.cumbaPenY + KOSK_M.cumbaPenH / 2) * pxm];
