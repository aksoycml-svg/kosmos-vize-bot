import React, { useId } from "react";
import { useCurrentFrame } from "remotion";
import { EN_KOYU, P, poly, rnd } from "./sabitler";

// ===== TEK KAYNAKTAN IŞIK (eleştiri A, sistemik 2) =====
// Her sahne ışığını BİR kez tanımlar; huzme, zemin yaması / ışık havuzu ve tüm gölgeler (yön, uzunluk, genişlik)
// aynı tanımdan türetilir. Gölge vektörleri geri çizildiğinde tek kaynakta kesişir: çelişki imkânsız.
//
// "yonlu"  (güneş/gün ışığı): yon = yüksekliği h px olan bir noktanın ZEMİN izdüşümünün ekrandaki kayması / h.
//          (ışığın yol aldığı yön; gölgeler bu yöne düşer)
// "nokta"  (réverbère, fener, mum): zemin = kaynağın zemindeki izdüşümü (ekran), yukseklik = kaynağın o noktadaki ekran px yüksekliği.
export type Isik =
  | { tip: "yonlu"; yon: P; renk: string; ad: string }
  | { tip: "nokta"; zemin: P; yukseklik: number; renk: string; ad: string; havuz?: { rx: number; ry: number; alfa: number } };

// Ayak noktası `ayak` (zeminde) üzerinde h px yükseklikteki noktanın zemindeki gölge izdüşümü
export const izdusum = (isik: Isik, ayak: P, h: number): P => {
  if (isik.tip === "yonlu") return [ayak[0] + isik.yon[0] * h, ayak[1] + isik.yon[1] * h];
  const H = isik.yukseklik;
  const k = h >= H * 0.92 ? 11.5 : h / (H - h); // benzer üçgenler: gölge boyu = d·h/(H−h)
  return [ayak[0] + (ayak[0] - isik.zemin[0]) * k, ayak[1] + (ayak[1] - isik.zemin[1]) * k];
};

// Dışbükey zarf (huzme hacmi = açıklık + yaması)
const zarf = (pts: P[]): P[] => {
  const s = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cr = (o: P, a: P, b: P) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo: P[] = [], up: P[] = [];
  for (const p of s) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
  for (const p of [...s].reverse()) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop(); up.push(p); }
  return [...lo.slice(0, -1), ...up.slice(0, -1)];
};

// Bir ışık açıklığının (pencere) zemindeki yaması ve huzme hacmi. kose: açıklık köşeleri {ekran noktası, zemindeki ayağı, yükseklik px}
export type Aciklik = { p: P; ayak: P; h: number }[];
export const aciklikYamasi = (isik: Isik, kose: Aciklik) => {
  const yama = kose.map((k) => izdusum(isik, k.ayak, k.h));
  return { yama, huzme: zarf([...kose.map((k) => k.p), ...yama]) };
};

// --- Çizim: pencere yaması (kayıt gölgeli) + huzme (toz) ---
export const AciklikIsigi: React.FC<{ isik: Isik; kose: Aciklik; kayit?: [number, number]; alfa?: number; yamaAlfa?: number; toz?: { sayi: number; seed: number }; huzmeYok?: boolean; clip?: string }> = ({ isik, kose, kayit = [0, 0], alfa = 0.16, yamaAlfa = 0.38, toz, huzmeYok, clip }) => {
  const frame = useCurrentFrame();
  const id = "ak" + useId().replace(/:/g, "");
  const { yama, huzme } = aciklikYamasi(isik, kose);
  const n = 1 + Math.sin((frame / 60) * Math.PI * 0.5) * 0.03; // 0.25 Hz nefes
  const lp = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  // yama köşeleri sırası kose ile aynı: 0 sol-üst, 1 sağ-üst, 2 sağ-alt, 3 sol-alt (açıklıkta)
  const [a, b, c, d] = yama;
  const xs = huzme.map((p) => p[0]), ys = huzme.map((p) => p[1]);
  const bx = Math.min(...xs), by = Math.min(...ys), bw = Math.max(...xs) - bx, bh = Math.max(...ys) - by;
  const ort = (q: P[]) => q.reduce<P>((s, p) => [s[0] + p[0] / q.length, s[1] + p[1] / q.length], [0, 0]);
  const ac = ort(kose.map((k) => k.p)), ya = ort(yama);
  return (
    <g clipPath={clip}>
      <defs>
        <filter id={`${id}b`} x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation={5} /></filter>
        <filter id={`${id}h`} x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation={10} /></filter>
        <linearGradient id={`${id}g`} gradientUnits="userSpaceOnUse" x1={ac[0]} y1={ac[1]} x2={ya[0]} y2={ya[1]}><stop offset="0" stopColor={isik.renk} stopOpacity={alfa * n} /><stop offset="1" stopColor={isik.renk} stopOpacity={alfa * 0.4 * n} /></linearGradient>
        <clipPath id={`${id}c`}><polygon points={poly(huzme)} /></clipPath>
        <mask id={`${id}m`} maskUnits="userSpaceOnUse" x={bx - 50} y={by - 50} width={bw + 100} height={bh + 100}>
          <polygon points={poly(yama)} fill="#fff" />
          {Array.from({ length: Math.max(0, kayit[0] - 1) }).map((_, i) => { const t = (i + 1) / kayit[0]; return <polyline key={`v${i}`} points={poly([lp(a, b, t), lp(d, c, t)])} stroke="#000" strokeWidth={10} fill="none" />; })}
          {Array.from({ length: Math.max(0, kayit[1] - 1) }).map((_, i) => { const t = (i + 1) / kayit[1]; return <polyline key={`h${i}`} points={poly([lp(a, d, t), lp(b, c, t)])} stroke="#000" strokeWidth={9} fill="none" />; })}
        </mask>
      </defs>
      {/* zemin/masa yaması: pencere biçimli, kayıt gölgeleri ışığın içinde */}
      <g mask={`url(#${id}m)`} style={{ mixBlendMode: "screen" }}><polygon points={poly(yama)} fill={isik.renk} opacity={yamaAlfa} filter={`url(#${id}b)`} /></g>
      {!huzmeYok && <polygon points={poly(huzme)} fill={`url(#${id}g)`} style={{ mixBlendMode: "screen" }} filter={`url(#${id}h)`} />}
      {toz && (
        <g clipPath={`url(#${id}c)`} style={{ mixBlendMode: "screen" }}>
          {Array.from({ length: toz.sayi }).map((_, i) => {
            const x = bx + ((rnd(toz.seed, `x${i}`) * bw + frame * (rnd(toz.seed, `vx${i}`) - 0.5) * 0.4) % bw + bw) % bw;
            const y = by + ((rnd(toz.seed, `y${i}`) * bh - frame * (0.1 + rnd(toz.seed, `vy${i}`) * 0.25)) % bh + bh) % bh;
            return <circle key={i} cx={x} cy={y} r={1 + rnd(toz.seed, `s${i}`) * 2} fill="#fff6dc" opacity={0.4 + 0.5 * Math.abs(Math.sin(frame * 0.03 + i))} />;
          })}
        </g>
      )}
    </g>
  );
};

// --- Nokta ışığın zemin havuzu (fener/réverbère önündeki ışık dairesi) ---
export const IsikHavuzu: React.FC<{ isik: Isik; guc?: number }> = ({ isik, guc = 1 }) => {
  const id = "ih" + useId().replace(/:/g, "");
  if (isik.tip !== "nokta" || !isik.havuz) return null;
  const { rx, ry, alfa } = isik.havuz;
  return (
    <g style={{ mixBlendMode: "screen" }}>
      <defs><radialGradient id={id}><stop offset="0" stopColor={isik.renk} stopOpacity={alfa * guc} /><stop offset="0.6" stopColor={isik.renk} stopOpacity={alfa * 0.55 * guc} /><stop offset="1" stopColor={isik.renk} stopOpacity={0} /></radialGradient></defs>
      <ellipse cx={isik.zemin[0]} cy={isik.zemin[1]} rx={rx} ry={ry} fill={`url(#${id})`} />
    </g>
  );
};

// --- Gölge: ayaktan ışığın tersine koni (uzunluk/yön ışıktan), uca doğru açılır ve yumuşar + temas çekirdeği ---
export const Golge: React.FC<{ isik: Isik; ayak: P; h: number; genislik: number; alfa?: number; renk?: string; yassi?: number; cekirdek?: boolean }> = ({ isik, ayak, h, genislik, alfa = 0.45, renk = EN_KOYU, yassi = 0.2, cekirdek = true }) => {
  const id = "gl" + useId().replace(/:/g, "");
  const uc = izdusum(isik, ayak, h);
  const dx = uc[0] - ayak[0], dy = uc[1] - ayak[1], L = Math.hypot(dx, dy) || 1;
  const nx = -dy / L, ny = dx / L;
  const w0 = genislik / 2, w1 = genislik * 0.8;
  const koni: P[] = [[ayak[0] + nx * w0, ayak[1] + ny * w0 * 0.4], [uc[0] + nx * w1, uc[1] + ny * w1 * 0.4], [uc[0] - nx * w1, uc[1] - ny * w1 * 0.4], [ayak[0] - nx * w0, ayak[1] - ny * w0 * 0.4]];
  return (
    <g>
      <defs>
        <linearGradient id={`${id}g`} gradientUnits="userSpaceOnUse" x1={ayak[0]} y1={ayak[1]} x2={uc[0]} y2={uc[1]}><stop offset="0" stopColor={renk} stopOpacity={alfa} /><stop offset="1" stopColor={renk} stopOpacity={0} /></linearGradient>
        <filter id={`${id}b`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={Math.max(2, genislik * 0.06)} /></filter>
      </defs>
      {L > 2 && <polygon points={poly(koni)} fill={`url(#${id}g)`} filter={`url(#${id}b)`} />}
      {cekirdek && <ellipse cx={ayak[0]} cy={ayak[1]} rx={genislik / 2} ry={genislik * yassi * 0.5} fill={renk} opacity={alfa * 0.9} filter={`url(#${id}b)`} />}
      {cekirdek && <ellipse cx={ayak[0]} cy={ayak[1]} rx={genislik * 0.3} ry={genislik * yassi * 0.2} fill={renk} opacity={alfa} />}
    </g>
  );
};
