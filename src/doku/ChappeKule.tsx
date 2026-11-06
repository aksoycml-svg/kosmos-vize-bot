import React, { useId } from "react";
import { BL, ink, karistir, P, poly } from "./sabitler";

// ===== Chappe optik telgraf kulesi (ChappeTower.tsx'in dönem-doğru halefi) =====
// [donem-dogrulama 2a–c, tasarim.md 1.5] Direk gök mavisi, regülatör + 2 gösterge SİYAH, sabit jaluzili,
// karşı ağırlıklar GRİ; oran regülatör : gösterge = 4.6 : 2.0 = 2.3 : 1; direk ≈ 7 m ≈ 1.5 × regülatör.
// T biçimli — asla yel değirmeni. Kırmızı yok (yalnız "fazladan çentik" halosunda, bu bileşen dışında).
//
// Açı sözleşmesi (gösterge): 0 = regülatör boyunca İÇE katlı, 90 = dik YUKARI, 180 = dışa uzanık, −90 = dik aşağı.
// Sol gösterge sol uçta, sağ gösterge sağ uçta; sağ aynalıdır (aynı sayı = simetrik poz).
export type KolKonum = { reg: number; sol: number; sag: number };
export const KONUMLAR = {
  ILK: { reg: 0, sol: 45, sag: -45 },
  SAK: { reg: 0, sol: 90, sag: -45 },
  MESAJ: { reg: 0, sol: 90, sag: -90 },
  HATA: { reg: 0, sol: 135, sag: -90 },
  DINLEN: { reg: 0, sol: 0, sag: 0 },
} satisfies Record<string, KolKonum>;
export type KonumAdi = keyof typeof KONUMLAR;
export type KuleDetay = "yakin" | "orta" | "siluet";

// Oran sabitleri (regülatör uzunluğu L cinsinden)
export const CHAPPE_ORAN = { gosterge: 1 / 2.3, regKalin: 0.35 / 4.6, gosKalin: 0.3 / 4.6, direk: 1.52, direkGen: 0.065, karsi: 0.34 };

// Tek kol (yerel: pivot (0,0), +x boyunca uzunluk len, kalınlık th) — jaluzi
const Kanat: React.FC<{ len: number; th: number; x0?: number; detay: KuleDetay; renk: string; kenar: string; seed: string }> = ({ len, th, x0 = 0, detay, renk, kenar, seed }) => {
  const y0 = -th / 2;
  if (detay === "siluet") return <rect x={x0} y={y0} width={len} height={th} fill={renk} />;
  if (detay === "orta") {
    return (
      <g>
        <rect x={x0} y={y0} width={len} height={th} fill={renk} stroke={ink(renk)} strokeWidth={1.2} />
        {Array.from({ length: 5 }).map((_, i) => { const x = x0 + (len * (i + 1)) / 6; return <line key={i} x1={x - th * 0.4} y1={y0 + th} x2={x + th * 0.4} y2={y0} stroke="#cfc6b0" strokeWidth={1} opacity={0.25} />; })}
        <line x1={x0} y1={y0 + 0.8} x2={x0 + len} y2={y0 + 0.8} stroke={kenar} strokeWidth={1} opacity={0.6} />
      </g>
    );
  }
  // yakın: koyu dolu kanat (siluet önce okunmalı) + 45° eğik sabit lamellerin arasındaki ince ışık yarıkları (gök görünür: maske = delik)
  const f = Math.max(2.5, th * 0.2);
  // sade jaluzi: 3–5 yarık (telefonda dolu siyah siluet okunur)
  const n = Math.min(4, Math.max(2, Math.round(len / (th * 4))));
  const step = (len - 2 * f) / n;
  const ih = th - 2 * f;
  const yarik: React.ReactNode[] = [];
  for (let i = 0; i < n; i++) {
    const x = x0 + f + i * step + step * 0.45;
    yarik.push(<polygon key={i} points={poly([[x, y0 + th - f], [x + step * 0.09, y0 + th - f], [x + step * 0.09 + ih * 0.5, y0 + f], [x + ih * 0.5, y0 + f]])} fill="#000" />);
  }
  return (
    <g>
      <defs>
        <mask id={`kl${seed}`} maskUnits="userSpaceOnUse" x={x0 - 4} y={y0 - 4} width={len + 8} height={th + 8}>
          <rect x={x0 - 4} y={y0 - 4} width={len + 8} height={th + 8} fill="#fff" />
          <g>{yarik}</g>
          <rect x={x0} y={y0} width={f} height={th} fill="#fff" /><rect x={x0 + len - f} y={y0} width={f} height={th} fill="#fff" />
        </mask>
      </defs>
      <rect x={x0} y={y0} width={len} height={th} fill={renk} mask={`url(#kl${seed})`} />
      <line x1={x0 + f} y1={y0 + 1} x2={x0 + len - f} y2={y0 + 1} stroke={kenar} strokeWidth={1.4} opacity={0.8} />
    </g>
  );
};

export const ChappeKule: React.FC<{
  x: number; y: number; L: number; konum: KonumAdi | KolKonum; detay?: KuleDetay;
  direkRenk?: string; kolRenk?: string; karsiAgirlik?: string; kenarIsik?: string;
  sicakIsik?: number; siluetRenk?: string; payanda?: boolean; direkGorunen?: number; direkKalin?: number; topuz?: number;
}> = ({ x, y, L, konum, detay = "orta", direkRenk = BL.direkMavi, kolRenk = BL.kolSiyah, karsiAgirlik = BL.karsiAgirlik, kenarIsik = BL.kolKenar, sicakIsik = 0, siluetRenk, payanda = true, direkGorunen = 1, direkKalin = 1, topuz = 1 }) => {
  const id = "ck" + useId().replace(/:/g, "");
  const k: KolKonum = typeof konum === "string" ? KONUMLAR[konum] : konum;
  const O = CHAPPE_ORAN;
  const Li = L * O.gosterge, tR = L * O.regKalin, tG = L * O.gosKalin;
  const H = L * O.direk, dw = L * O.direkGen * direkKalin;
  const sil = detay === "siluet";
  const dR = sil ? siluetRenk ?? kolRenk : karistir(direkRenk, "#b0a090", sicakIsik);
  const dG = sil ? dR : karistir(BL.direkGolge, "#6a5a50", sicakIsik * 0.6);
  const kR = sil ? siluetRenk ?? kolRenk : kolRenk;
  const aR = sil ? siluetRenk ?? kolRenk : karsiAgirlik;
  const top: P = [x, y - H];
  const yHalf = L / 2 - tG * 0.3;
  const gos = (side: -1 | 1) => {
    const a = side === -1 ? -k.sol : 180 + k.sag; // ekran açısı (derece, +x'ten saat yönü)
    return (
      <g transform={`translate(${side * yHalf},0) rotate(${a})`}>
        {/* karşı ağırlık: pivotun ters tarafında kısa çubuk + gri çatal ağırlık */}
        <rect x={-Li * O.karsi} y={-tG * 0.16} width={Li * O.karsi} height={tG * 0.32} fill={aR} />
        <rect x={-Li * O.karsi - tG * 0.5} y={-tG * 0.42} width={tG * 0.6} height={tG * 0.84} rx={tG * 0.12} fill={aR} stroke={sil ? "none" : ink(aR)} strokeWidth={1} />
        <Kanat len={Li} th={tG} x0={tG * 0.2} detay={detay} renk={kR} kenar={kenarIsik} seed={`${id}${side}`} />
      </g>
    );
  };
  const pirinc = (cx: number, r: number) => sil ? null : <g><circle cx={cx} cy={0} r={r} fill={BL.brass} stroke={BL.brassDark} strokeWidth={1} /><circle cx={cx - r * 0.3} cy={-r * 0.3} r={r * 0.35} fill={BL.brassLight} opacity={0.8} /></g>;
  const yDip = y - H * (1 - direkGorunen);
  return (
    <g>
      {/* payandalar (direk dibinde iki ahşap destek) */}
      {payanda && direkGorunen >= 1 && [-1, 1].map((s) => <polygon key={s} points={poly([[x + s * dw * 0.5, y - H * 0.24], [x + s * (dw * 0.5 + L * 0.2), y], [x + s * (dw * 0.5 + L * 0.2) - s * dw * 0.6, y], [x + s * dw * 0.5, y - H * 0.24 + dw * 1.2]])} fill={dG} stroke={sil ? "none" : ink(dG)} strokeWidth={1.2} />)}
      {/* direk: gök mavisi boyalı ahşap; gölge şeridi; boya çatlakları; dipte aşınma */}
      <rect x={x - dw / 2} y={top[1] - tR * 0.6} width={dw} height={yDip - top[1] + tR * 0.6} fill={dR} stroke={sil ? "none" : ink(dG)} strokeWidth={2.2} />
      {!sil && <rect x={x + dw * 0.12} y={top[1] - tR * 0.6} width={dw * 0.38} height={yDip - top[1] + tR * 0.6} fill={dG} opacity={0.95} />}
      {!sil && detay === "yakin" && Array.from({ length: 9 }).map((_, i) => { const yy = top[1] + ((yDip - top[1]) * (i + 0.5)) / 9; return <line key={i} x1={x - dw * 0.3} y1={yy} x2={x - dw * 0.3} y2={yy + dw * 0.5} stroke={ink(dR)} strokeWidth={1} opacity={0.3} />; })}
      {!sil && direkGorunen >= 1 && <rect x={x - dw / 2} y={y - dw * 1.5} width={dw} height={dw * 1.5} fill={BL.direkAsinma} opacity={0.35} />}
      {/* regülatör + göstergeler */}
      <g transform={`translate(${top[0]},${top[1]}) rotate(${k.reg})`}>
        <Kanat len={L} th={tR} x0={-L / 2} detay={detay} renk={kR} kenar={kenarIsik} seed={`${id}r`} />
        {gos(-1)}
        {gos(1)}
        {pirinc(0, tR * 0.38 * topuz)}
        {pirinc(-yHalf, tG * 0.26)}
        {pirinc(yHalf, tG * 0.26)}
      </g>
    </g>
  );
};
